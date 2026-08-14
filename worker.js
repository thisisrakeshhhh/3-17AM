/* ==========================================
   3:17 AM — CLOUDFLARE WORKER REALTIME PRESENCE & D1 DATABASE
========================================== */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // CORS headers
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        // D1 Database Routes for Listener Song Suggestions
        if (url.pathname === "/api/suggest-song") {
            if (request.method === "GET") {
                try {
                    const { results } = await env.DB.prepare(
                        "SELECT id, song_title as songTitle, artist, suggested_by as suggestedBy, city, note, created_at as createdAt FROM song_suggestions ORDER BY created_at DESC LIMIT 50"
                    ).all();

                    return new Response(JSON.stringify({ success: true, suggestions: results }), {
                        headers: { ...corsHeaders, "Content-Type": "application/json" }
                    });
                } catch (err) {
                    return new Response(JSON.stringify({ success: false, error: err.message }), {
                        status: 500,
                        headers: { ...corsHeaders, "Content-Type": "application/json" }
                    });
                }
            }

            if (request.method === "POST") {
                try {
                    const body = await request.json();
                    const { songTitle, artist, suggestedBy, city, note } = body;

                    if (!songTitle) {
                        return new Response(JSON.stringify({ success: false, error: "Song title is required" }), {
                            status: 400,
                            headers: { ...corsHeaders, "Content-Type": "application/json" }
                        });
                    }

                    const id = Date.now().toString();
                    const titleVal = songTitle.trim();
                    const artistVal = (artist || "Unknown Artist").trim();
                    const nameVal = (suggestedBy || "Anonymous Owl").trim();
                    const cityVal = (city || "Unknown City").trim();
                    const noteVal = (note || "").trim();

                    await env.DB.prepare(
                        "INSERT INTO song_suggestions (id, song_title, artist, suggested_by, city, note) VALUES (?, ?, ?, ?, ?, ?)"
                    ).bind(id, titleVal, artistVal, nameVal, cityVal, noteVal).run();

                    const newObj = { id, songTitle: titleVal, artist: artistVal, suggestedBy: nameVal, city: cityVal, note: noteVal, createdAt: new Date().toISOString() };

                    return new Response(JSON.stringify({ success: true, message: "Saved to Cloudflare D1 Database!", suggestion: newObj }), {
                        headers: { ...corsHeaders, "Content-Type": "application/json" }
                    });
                } catch (err) {
                    return new Response(JSON.stringify({ success: false, error: err.message }), {
                        status: 500,
                        headers: { ...corsHeaders, "Content-Type": "application/json" }
                    });
                }
            }
        }

        // WebSocket Upgrade for Realtime Presence
        if (request.headers.get("Upgrade") === "websocket") {
            const id = env.PRESENCE_DO.idFromName("global_night_owls");
            const obj = env.PRESENCE_DO.get(id);
            return obj.fetch(request);
        }

        // HTTP Fallback API Endpoint
        if (url.pathname === "/api/presence") {
            const id = env.PRESENCE_DO.idFromName("global_night_owls");
            const obj = env.PRESENCE_DO.get(id);
            return obj.fetch(request);
        }

        return new Response("3:17 AM Realtime Presence & Cloudflare D1 DB Worker Active 🌙", {
            headers: corsHeaders
        });
    }
};

// Cloudflare Durable Object for Live Connection Management
export class PresenceDurableObject {
    constructor(state, env) {
        this.state = state;
        this.sessions = new Set();
    }

    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/api/presence") {
            return new Response(JSON.stringify({ count: this.sessions.size }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);

        this.state.acceptWebSocket(server);
        this.sessions.add(server);

        this.broadcastCount();

        server.addEventListener("close", () => {
            this.sessions.delete(server);
            this.broadcastCount();
        });

        server.addEventListener("error", () => {
            this.sessions.delete(server);
            this.broadcastCount();
        });

        return new Response(null, { status: 101, webSocket: client });
    }

    broadcastCount() {
        const count = this.sessions.size;
        const payload = JSON.stringify({ type: "PRESENCE_COUNT", count });

        for (const session of this.sessions) {
            try {
                session.send(payload);
            } catch (err) {
                this.sessions.delete(session);
            }
        }
    }
}
