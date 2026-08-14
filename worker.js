/* ==========================================
   3:17 AM — CLOUDFLARE WORKER REALTIME PRESENCE
========================================== */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Handle WebSocket Upgrade
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

        return new Response("3:17 AM Realtime Presence Worker Active 🌙", {
            headers: { "Access-Control-Allow-Origin": "*" }
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

        // Handle HTTP GET count request
        if (url.pathname === "/api/presence") {
            return new Response(JSON.stringify({ count: this.sessions.size }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        // Handle WebSocket connection
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);

        this.state.acceptWebSocket(server);
        this.sessions.add(server);

        // Broadcast updated count to all connected night owls
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
