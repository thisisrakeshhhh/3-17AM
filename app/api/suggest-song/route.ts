import { NextResponse } from "next/server";

// Simple in-memory fallback store for demo/free tier + database ready hook
const songSuggestionsStore: Array<{
  id: string;
  songTitle: string;
  artist: string;
  suggestedBy: string;
  city: string;
  note: string;
  createdAt: string;
}> = [
  {
    id: "1",
    songTitle: "Nights",
    artist: "Frank Ocean",
    suggestedBy: "Arjun",
    city: "Chandigarh",
    note: "this song hits different at 2:13 AM",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    songTitle: "Resonance",
    artist: "HOME",
    suggestedBy: "Riya",
    city: "Delhi",
    note: "cozy late night drive vibes",
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    suggestions: songSuggestionsStore
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { songTitle, artist, suggestedBy, city, note } = body;

    if (!songTitle) {
      return NextResponse.json(
        { success: false, error: "Song title is required" },
        { status: 400 }
      );
    }

    const newSuggestion = {
      id: Date.now().toString(),
      songTitle: songTitle.trim(),
      artist: (artist || "Unknown Artist").trim(),
      suggestedBy: (suggestedBy || "Anonymous Owl").trim(),
      city: (city || "Unknown City").trim(),
      note: (note || "").trim(),
      createdAt: new Date().toISOString()
    };

    songSuggestionsStore.unshift(newSuggestion);

    // OPTIONAL: If environment variable SUPABASE_URL / VERCEL_POSTGRES is provided, save to DB here!
    console.log("🎵 New Song Suggestion Received:", newSuggestion);

    return NextResponse.json({
      success: true,
      message: "Song suggestion saved successfully!",
      suggestion: newSuggestion
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
