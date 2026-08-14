"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sun,
  ChevronDown,
  Volume2,
  VolumeX,
  Users,
  Sliders,
  Moon,
  CloudRain,
  Laptop,
  Smartphone,
  Clock,
  Coffee,
  Bed,
  Cat,
  X,
  Disc,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Headphones,
  Bell,
  BellOff,
  Plus,
  Sparkles,
  Zap,
  Cpu,
  Feather,
  ChevronRight,
  Wind,
  Music,
  Heart,
  Send,
  Maximize2,
  ChevronUp,
  Minus
} from "lucide-react";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [realtimeClock, setRealtimeClock] = useState("03:17 AM");
  const [headerTitle, setHeaderTitle] = useState("🌙 3:17 AM BEDROOM (NIGHT OWL)");
  const [currentRoomKey, setCurrentRoomKey] = useState("bedroom");
  
  // UI Expansion States (Bottom Sheets for Mobile First)
  const [isMoodSheetOpen, setIsMoodSheetOpen] = useState(false);
  const [isCommunitySheetOpen, setIsCommunitySheetOpen] = useState(false);
  const [isRadioSheetOpen, setIsRadioSheetOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isPlayerCardMinimized, setIsPlayerCardMinimized] = useState(false);
  
  // Audio & Power States — BOTH SOUND & RAIN OFF BY DEFAULT
  const [isDrawerNotifEnabled, setIsDrawerNotifEnabled] = useState(true);
  const [isRainAudioMuted, setIsRainAudioMuted] = useState(true);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [powerLevel, setPowerLevel] = useState(60);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  const [audioProgress, setAudioProgress] = useState(35);
  const [musicVolume, setMusicVolume] = useState(80);

  // Modals
  const [isCustomRoomModalOpen, setIsCustomRoomModalOpen] = useState(false);
  const [isThoughtModalOpen, setIsThoughtModalOpen] = useState(false);
  const [isLightsModalOpen, setIsLightsModalOpen] = useState(false);
  const [isMixerModalOpen, setIsMixerModalOpen] = useState(false);
  const [isGeneratorOverlayOpen, setIsGeneratorOverlayOpen] = useState(false);
  const [isSuggestSongModalOpen, setIsSuggestSongModalOpen] = useState(false);

  // Custom Inputs
  const [customRoomTitle, setCustomRoomTitle] = useState("");
  const [customTrackName, setCustomTrackName] = useState("");
  const [chatName, setChatName] = useState("");
  const [chatCity, setChatCity] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [thoughtText, setThoughtText] = useState("");

  // Song Suggestion Inputs
  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestArtist, setSuggestArtist] = useState("");
  const [suggestName, setSuggestName] = useState("");
  const [suggestCity, setSuggestCity] = useState("");
  const [suggestNote, setSuggestNote] = useState("");
  const [suggestedSongsList, setSuggestedSongsList] = useState<any[]>([]);

  // Sound Mix Sliders
  const [rainVolumePct, setRainVolumePct] = useState(70);
  const [fanVolumePct, setFanVolumePct] = useState(40);

  // Chat & Owls State
  const [chatList, setChatList] = useState([
    { name: "Arjun", city: "Chandigarh", time: "just now", text: "this song hits different when everyone is asleep." },
    { name: "Riya", city: "Delhi", time: "2m ago", text: "windows down, empty highway at 3am." },
    { name: "Unknown", city: "NYC", time: "5m ago", text: "anyone else overthinking about life right now?" }
  ]);

  const [owlsList, setOwlsList] = useState([
    { name: "Riya", city: "Delhi", bg: "bg-indigo-500" },
    { name: "Arjun", city: "Chandigarh", bg: "bg-purple-500" },
    { name: "Sarah", city: "NYC", bg: "bg-emerald-500" },
    { name: "Kenji", city: "Tokyo", bg: "bg-amber-500" },
    { name: "Emma", city: "London", bg: "bg-rose-500" }
  ]);

  // Dialogue Toast
  const [dialogue, setDialogue] = useState<{ text: string; sub: string } | null>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Presence & General Toast
  const [presenceToast, setPresenceToast] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cinematic Note Particle Rising Effect
  const [risingParticleNote, setRisingParticleNote] = useState<string | null>(null);

  // Audio Player Ref for Real Custom MP3 Playback
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync music volume with audio element
  useEffect(() => {
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Rooms metadata & custom MP3 audio URLs
  const [rooms, setRooms] = useState<Record<string, any>>({
    bedroom: {
      name: "🌙 3:17 AM BEDROOM (NIGHT OWL)",
      label: "can't sleep",
      listeners: "1,284",
      imgIdx: 0,
      trackTitle: "After Dark",
      trackArtist: "Mr.Kitty · Midnight Mix",
      audioUrl: "/music/after_dark.mp3"
    },
    drive: {
      name: "🚗 NIGHT DRIVE",
      label: "driving nowhere",
      listeners: "842",
      imgIdx: 1,
      trackTitle: "Midnight City",
      trackArtist: "M83 · Night Highway Synth",
      audioUrl: "/music/midnight_city.mp3"
    },
    cafe: {
      name: "☕ 1:30 PM AFTERNOON BRAIN DRAIN",
      label: "cafe jazz",
      listeners: "419",
      imgIdx: 3,
      trackTitle: "Cold Espresso Jazz",
      trackArtist: "3:17 AM Lounge Band",
      audioUrl: "/music/cold_espresso.mp3"
    },
    study: {
      name: "📚 8:00 AM MORNING COFFEE",
      label: "studying",
      listeners: "612",
      imgIdx: 2,
      trackTitle: "2:48 AM Focus Beats",
      trackArtist: "Lo-Fi Study Tape",
      audioUrl: "/music/study_beats.mp3"
    },
    city: {
      name: "🌆 7:15 PM EVENING COMMUTE",
      label: "evening commute",
      listeners: "953",
      imgIdx: 4,
      trackTitle: "Space Song",
      trackArtist: "Beach House · Skyline Mix",
      audioUrl: "/music/space_song.mp3"
    },
    escape: {
      name: "🌊 MIDNIGHT ESCAPE",
      label: "just listening",
      listeners: "320",
      imgIdx: 6,
      trackTitle: "Ocean Resonance",
      trackArtist: "HOME · Ambient Waves",
      audioUrl: "/music/ocean_waves.mp3"
    }
  });

  const roomImages = [
    "/images/1rNv1NucX7g2aL5nSc0r0h5sYOdP2zoDBdNplZU9AY5Lc2pk4ulSYlj5ggWcuIF3HBVZ8Tafe8_4-bVKAe5R-bGndwq9P0FAqRvbduLf9HHYHRPnCY4aOnx3B3rZQKIWuH2lVSEB-ZNzbIKTLHoNet10QZiTGFfvGtCPDNTvmlTMM5e3SdozXA0ezoDEh_io.jpg",
    "/images/6wX2KWqJvGW-N99NHMR0Nyj1DhPkVc_2QRHkpnLousEgON93WBuZCV9ZwFvqGpByg2BA7OXoxAgUKJbVt4OZ-iMrrJ8vIPxbSJDatJrtYYg2mV9Q8oLYh-n5f0xVYSQj4Fy3iAFuISnUF0ywUPEmsPDnySeq0EDpz3_WpC7O2i90y1LZonhrW5PX8oKfQVGu.jpg",
    "/images/IBQhAXTTf8SYu1BmYF6s5QUG5_ZRl3Ci0was5DjgGbVP9STVfUtpaweo_hcHXJSBxqDG3WlOmIznvTE6xWJgAfo9DEaZ-C8Q0bhAgXCGkNQzcgq1jCD61GhMtopgQ58zE21u_BHt1XrNf2lxvp6WiNxFnotOKovyHYUBhVzXiuZrCcgrb8IZ5FdkppiRkLYj.jpg",
    "/images/QChnWDkbQ26xvQ3azrnOD-w0mFPBN8VVUPSlw1OC6I0GxDkKc-pavKpJIxnnc8aoFvOsHPYdmErVmO3vGBNPWNHqZQMDiKyBWFo2W0fXv1N7elRds9D2yTn36mlDoYETTrntu2-fRV8DItcFTBQ3eSjBBN3eQ-8x96rmWeX_8o33pOQe56rALbvZ4nMPgNA8.jpg",
    "/images/WIHbnxPjGrpKQkBVyO6eJoEay5z3Ud27zm2sprxmeSkEiprL7Uo1pG5Af7nEo9UYL-Vt7i9osKodJmx1DreSaAd9OyoRSksYCKfHQYglNGWV4-RpLpv4pIEk9TwdZHdWFTXtPZfaXacvTExLuz9UdjOEQv14OmPsZX_jMrRUgsKlqNNaJvIF0nR_ScEKgQDk.jpg",
    "/images/h5zIFEmIjDbag0ktcp0Xx1NpPEnHH4vuhu75nJlh5rP6LkvjxZbWev-QT6whZYBccL1j4cEaXBIcbc2Cln0gyt9qViQPjmPEBSZft5iL7RLfX0z8lV8JXb95fYhgFoGTsKpUGE0C7rzRo1I3rjvaEOCTsXX_x4FBpFnjTh5dj-RI-66oUMYVM9vRxvYAsy_J.jpg",
    "/images/wGYlGCDgu9BmJ_K29Puc3OLmvA94X6vc5FPUhtJ3Yyiy9f4h6myfAE0GTpQakXpLc-xjG7aIyukZyJIVWc5C4EaOy5GupyOJeEfFSoDTUzqSodhG8jo6u6VTI-J_WxU62BTJeKS1uleWF7kJs8svMXna6J_v3eL7je-JVSg-gFcvC9T_RfQE-2yD6npSfOD7.jpg"
  ];

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const fanGainRef = useRef<GainNode | null>(null);
  const muffleFilterRef = useRef<BiquadFilterNode | null>(null);

  // Canvas Refs
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const boomCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hotspots Multi-Stage State
  const hotspotStages = {
    laptop: [
      { text: "you have 17 tabs open.", sub: "computer glow..." },
      { text: "17 tabs you'll never close.", sub: "1.5s later..." },
      { text: "one of them is playing music.", sub: "somewhere." }
    ],
    phone: [
      { text: "no notifications.", sub: "screen dark..." },
      { text: "why did you check anyway?", sub: "it's 3:17 AM." }
    ],
    bed: [
      { text: "absolutely not.", sub: "pillows waiting..." },
      { text: "you know you're not sleeping.", sub: "not yet." }
    ],
    clock: [
      { text: "real time clock.", sub: "digital pulse..." },
      { text: "again.", sub: "time stands still." }
    ],
    window: [
      { text: "it's raining outside.", sub: "drops on glass..." },
      { text: "the city is asleep.", sub: "distant lights." }
    ],
    cat: [
      { text: "soft purring...", sub: "curled up cozy..." },
      { text: "meow.", sub: "he's dreaming." }
    ],
    mug: [
      { text: "cold coffee at 3 am.", sub: "steam rising..." },
      { text: "hits different.", sub: "quiet comfort." }
    ]
  };

  const spotCurrentStageRef = useRef<Record<string, number>>({});

  // 1. Fetch Suggestions from Database / API Route
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("/api/suggest-song");
        const data = await res.json();
        if (data.success && data.suggestions) {
          setSuggestedSongsList(data.suggestions);
        }
      } catch (err) {
        console.log("Could not fetch song suggestions:", err);
      }
    };
    fetchSuggestions();
  }, []);

  // 2. Clock Engine
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedHours = String(hours).padStart(2, "0");
      const timeStr = `${formattedHours}:${minutes} ${ampm}`;
      setRealtimeClock(timeStr);

      const actualHour = now.getHours();
      if (actualHour >= 5 && actualHour < 12) {
        setHeaderTitle(`☀️ ${timeStr} MORNING COFFEE & BREAD`);
      } else if (actualHour >= 12 && actualHour < 17) {
        setHeaderTitle(`☕ ${timeStr} AFTERNOON BRAIN DRAIN`);
      } else if (actualHour >= 17 && actualHour < 22) {
        setHeaderTitle(`🌆 ${timeStr} EVENING COMMUTE VIBES`);
      } else {
        setHeaderTitle(`🌙 3:17 AM BEDROOM (NIGHT OWL)`);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Power Degradation Engine (1% drop every 10 mins)
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerLevel((prev) => Math.max(20, prev - 1));
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  // 4. Floating Presence Toast Loop
  useEffect(() => {
    if (!isDrawerNotifEnabled) return;
    const events = [
      "✨ someone in Chandigarh just entered the room.",
      "🌙 someone in Delhi posted a chat message.",
      "☕ someone in NYC is listening to focus beats.",
      "✨ another night owl joined the room."
    ];

    const interval = setInterval(() => {
      if (isDrawerNotifEnabled) {
        const evt = events[Math.floor(Math.random() * events.length)];
        setPresenceToast(evt);
        setTimeout(() => setPresenceToast(null), 4000);
      }
    }, 22000);

    return () => clearInterval(interval);
  }, [isDrawerNotifEnabled]);

  // 5. Web Audio API Engine — Rain & Fan Audio Start OFF by Default
  const initAudioEngine = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(1, ctx.currentTime);
    masterGainRef.current = master;

    const muffle = ctx.createBiquadFilter();
    muffle.type = "lowpass";
    muffle.frequency.value = 20000;
    muffleFilterRef.current = muffle;

    muffle.connect(master);
    master.connect(ctx.destination);

    // Rain Noise Generator — STARTS OFF (GAIN 0) BY DEFAULT
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.04;

    const rainNoise = ctx.createBufferSource();
    rainNoise.buffer = noiseBuffer;
    rainNoise.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = "lowpass";
    rainFilter.frequency.value = 1100;

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0, ctx.currentTime); // DEFAULT OFF
    rainGainRef.current = rainGain;

    rainNoise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(muffle);
    rainNoise.start();

    // Room Rumble Fan — STARTS OFF (GAIN 0) BY DEFAULT
    const fanOsc = ctx.createOscillator();
    fanOsc.type = "sawtooth";
    fanOsc.frequency.value = 52;

    const fanFilter = ctx.createBiquadFilter();
    fanFilter.type = "lowpass";
    fanFilter.frequency.value = 130;

    const fanGain = ctx.createGain();
    fanGain.gain.setValueAtTime(0, ctx.currentTime); // DEFAULT OFF
    fanGainRef.current = fanGain;

    fanOsc.connect(fanFilter);
    fanFilter.connect(fanGain);
    fanGain.connect(muffle);
    fanOsc.start();
  };

  const toggleRainAudio = (forceState?: boolean) => {
    initAudioEngine();
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume();

    const nextMutedState = forceState !== undefined ? !forceState : !isRainAudioMuted;
    setIsRainAudioMuted(nextMutedState);

    if (nextMutedState) {
      if (rainGainRef.current && ctx) {
        rainGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        rainGainRef.current.gain.setValueAtTime(0, ctx.currentTime);
      }
      if (fanGainRef.current && ctx) {
        fanGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        fanGainRef.current.gain.setValueAtTime(0, ctx.currentTime);
      }
    } else {
      if (rainGainRef.current && ctx) {
        rainGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        rainGainRef.current.gain.setValueAtTime((rainVolumePct / 100) * 0.3, ctx.currentTime);
      }
      if (fanGainRef.current && ctx) {
        fanGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        fanGainRef.current.gain.setValueAtTime((fanVolumePct / 100) * 0.2, ctx.currentTime);
      }
    }
  };

  const toggleRadioPlayback = (play?: boolean) => {
    initAudioEngine();
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") ctx.resume();

    const nextState = play !== undefined ? play : !isRadioPlaying;
    setIsRadioPlaying(nextState);

    if (htmlAudioRef.current) {
      if (nextState) {
        htmlAudioRef.current.play().catch(() => {});
      } else {
        htmlAudioRef.current.pause();
      }
    }
  };

  // 6. Canvas Rain & Particles
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drops = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      length: Math.random() * 24 + 12,
      speed: Math.random() * 7 + 5,
      opacity: Math.random() * 0.35 + 0.15,
      width: Math.random() * 1.4 + 0.7
    }));

    const fireflies = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      fade: Math.random() * 0.01 + 0.005
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((d) => {
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.x = Math.random() * canvas.width;
          d.y = Math.random() * -canvas.height;
        }
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 0.8, d.y + d.length);
        ctx.strokeStyle = `rgba(180, 210, 255, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      fireflies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        f.alpha += f.fade;
        if (f.alpha > 0.8 || f.alpha < 0.2) f.fade = -f.fade;
        if (f.x < 0 || f.x > canvas.width || f.y < 0 || f.y > canvas.height) {
          f.x = Math.random() * canvas.width;
          f.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 100, ${f.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Enter App Launch — DO NOT AUTOPLAY ANY SOUND
  const handleEnterApp = () => {
    setIsEntered(true);
    initAudioEngine();
    // Both rain sound & radio music start OFF by default as requested!
  };

  // Hotspot Click Multi-stage Dialogue
  const handleHotspotClick = (spotKey: keyof typeof hotspotStages) => {
    const stages = hotspotStages[spotKey];
    if (!stages) return;

    const currentIdx = spotCurrentStageRef.current[spotKey] ?? 0;
    const nextIdx = (currentIdx + 1) % stages.length;
    spotCurrentStageRef.current[spotKey] = nextIdx;

    const current = stages[nextIdx];
    setDialogue(current);

    if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    dialogueTimerRef.current = setTimeout(() => {
      setDialogue(null);
    }, 3200);
  };

  // Direct Chat Send
  const handleSendChatMessage = () => {
    const finalName = chatName.trim() || "Unknown";
    const finalCity = chatCity.trim() || "Unknown";
    const finalMsg = chatMessage.trim();

    if (!finalMsg) return;

    setChatMessage("");

    setChatList((prev) => [
      { name: finalName, city: finalCity, time: "just now", text: finalMsg },
      ...prev
    ]);

    setOwlsList((prev) => [
      { name: finalName, city: finalCity, bg: "bg-amber-500" },
      ...prev
    ]);

    if (isDrawerNotifEnabled) {
      setPresenceToast(`✨ ${finalName} in ${finalCity} sent a chat message.`);
      setTimeout(() => setPresenceToast(null), 4000);
    }
  };

  // Submit Song Suggestion to Database API
  const handleSuggestSongSubmit = async () => {
    if (!suggestTitle.trim()) {
      showToast("Please enter a song title 🎵");
      return;
    }

    try {
      const res = await fetch("/api/suggest-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songTitle: suggestTitle,
          artist: suggestArtist,
          suggestedBy: suggestName,
          city: suggestCity,
          note: suggestNote
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsSuggestSongModalOpen(false);
        setSuggestTitle("");
        setSuggestArtist("");
        setSuggestNote("");

        if (data.suggestion) {
          setSuggestedSongsList((prev) => [data.suggestion, ...prev]);
        }

        showToast("🎵 Song suggestion sent to host database!");
      }
    } catch (err) {
      showToast("Submitted suggestion!");
      setIsSuggestSongModalOpen(false);
    }
  };

  // Release Note into the Night (Particle Animation)
  const handleReleaseNote = () => {
    if (!thoughtText.trim()) return;

    const note = thoughtText.trim();
    setIsThoughtModalOpen(false);
    setThoughtText("");

    setRisingParticleNote(`" ${note} "`);
    showToast("it's somewhere out there now ✨");

    setTimeout(() => {
      setRisingParticleNote(null);
    }, 5500);
  };

  // Generator Payment Explosion
  const handlePayGenerator = () => {
    setIsLightsModalOpen(false);
    setIsGeneratorOverlayOpen(true);

    setTimeout(() => {
      triggerGeneratorSmoke();
    }, 1400);

    setTimeout(() => {
      setIsGeneratorOverlayOpen(false);
      setPowerLevel(100);
    }, 3700);
  };

  const triggerGeneratorSmoke = () => {
    const canvas = boomCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() * 120 - 60),
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 9 - 4,
      radius: Math.random() * 30 + 15,
      alpha: 0.85,
      color: Math.random() > 0.35 ? "rgba(245, 158, 11, " : "rgba(156, 163, 175, "
    }));

    const renderSmoke = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha > 0.01) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.radius += 0.5;
          p.alpha *= 0.95;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha + ")";
          ctx.fill();
        }
      });
      if (alive) requestAnimationFrame(renderSmoke);
    };
    renderSmoke();
  };

  // Toast Popup
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleTrackLike = (title: string) => {
    if (likedTracks.includes(title)) {
      setLikedTracks(likedTracks.filter((t) => t !== title));
      showToast("Removed from my night list");
    } else {
      setLikedTracks([...likedTracks, title]);
      showToast("♡ Added to my night");
    }
  };

  const currentRoom = rooms[currentRoomKey] || rooms.bedroom;

  return (
    <div className="fixed inset-0 w-full h-dvh bg-[#05070d] text-slate-100 font-sans overflow-hidden select-none">
      {/* HTML5 Audio Element for Real Custom MP3 Playback */}
      <audio ref={htmlAudioRef} src={currentRoom.audioUrl} loop />

      {/* LAYER 0 & 1: 100% CINEMATIC VIEWPORT BACKGROUND & ATMOSPHERE */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="room-bg-layer absolute inset-0 bg-cover transition-all duration-1000 animate-kenburns opacity-100"
          style={{ backgroundImage: `url('${roomImages[currentRoom.imgIdx % roomImages.length]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/95 via-[#05070d]/50 to-[#05070d]/35 opacity-90" />
        <div className="absolute inset-0 bg-radial-lamp opacity-40 animate-lamp-pulse" />

        <canvas ref={rainCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75" />
        <canvas ref={boomCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-15" />
      </div>

      {/* LAYER 2: INTRO SCREEN */}
      {!isEntered && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070d]/95 backdrop-blur-xl px-6 text-center transition-all duration-1000">
          <div className="max-w-md w-full flex flex-col items-center space-y-6">
            <div className="space-y-2">
              <h1 className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
                3:17 AM
              </h1>
              <p className="font-sans text-lg sm:text-xl text-slate-300 font-light">
                you're awake. <span className="text-slate-500 italic">again.</span>
              </p>
            </div>

            <p className="text-xs text-slate-400 max-w-xs font-mono">
              for people who should probably be asleep.
            </p>

            <button
              onClick={handleEnterApp}
              className="group relative mt-6 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-lg text-sm font-medium text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>enter quietly</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* LAYER 3: MAIN APP INTERFACE */}
      <main className={`relative z-20 h-full w-full flex flex-col justify-between p-3 sm:p-6 pt-safe pb-safe transition-opacity duration-1000 ${isEntered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        
        {/* ==================================================
            1. MINIMAL TOP BAR (ENVIRONMENT FIRST 70/20/10 RULE)
           ================================================== */}
        <header className="w-full flex items-center justify-between pointer-events-auto relative z-30 pt-1 px-1">
          {/* Top Left: Branding & Compact Mood Selector Trigger */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider">3:17 AM</span>
            
            <button
              onClick={() => setIsMoodSheetOpen(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400/30 backdrop-blur-md text-[11px] sm:text-xs font-mono text-amber-200 transition shadow-md active:scale-95"
            >
              <Moon className="w-3 h-3 text-amber-300" />
              <span>☾ {currentRoom.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Top Right: Tiny Listener Count Trigger (No heavy cards) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommunitySheetOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-emerald-400/30 backdrop-blur-md text-xs font-mono text-slate-200 transition shadow-md active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-semibold text-emerald-300">{currentRoom.listeners}</span>
            </button>

            <button
              onClick={() => toggleRainAudio()}
              title="Toggle Rain Audio"
              className="cursor-pointer p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition active:scale-95"
            >
              {isRainAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-sky-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-300" />}
            </button>
          </div>
        </header>

        {/* ==================================================
            2. HOTSPOTS CONTAINER (SELECTIVE 3-4 ON MOBILE)
           ================================================== */}
        <div className="absolute inset-0 z-20 pointer-events-auto flex items-center justify-center">
          {/* WINDOW (Mobile + Desktop) */}
          <button onClick={() => handleHotspotClick("window")} className="hotspot absolute left-[10%] top-[22%] sm:left-[20%] sm:top-[22%]" title="Window">
            <div className="spot-pulse" />
            <div className="spot-card">
              <CloudRain className="w-3 h-3 text-sky-300" />
              <span className="hidden sm:inline">window</span>
            </div>
          </button>

          {/* LAPTOP (Mobile + Desktop) */}
          <button onClick={() => handleHotspotClick("laptop")} className="hotspot absolute left-[42%] top-[48%] sm:left-[48%] sm:top-[52%]" title="Laptop">
            <div className="spot-pulse" />
            <div className="spot-card animate-flicker">
              <Laptop className="w-3 h-3 text-purple-300" />
              <span className="hidden sm:inline">laptop</span>
            </div>
          </button>

          {/* MUG (Mobile + Desktop) */}
          <button onClick={() => handleHotspotClick("mug")} className="hotspot absolute left-[26%] top-[60%] sm:left-[38%] sm:top-[58%]" title="Coffee Mug">
            <div className="spot-pulse" />
            <div className="spot-card">
              <Coffee className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">mug</span>
            </div>
          </button>

          {/* CAT (Mobile + Desktop) */}
          <button onClick={() => handleHotspotClick("cat")} className="hotspot absolute right-[12%] bottom-[28%] sm:right-[22%] sm:bottom-[30%]" title="Sleeping Cat">
            <div className="spot-pulse" />
            <div className="spot-card">
              <Cat className="w-3 h-3 text-orange-300" />
              <span className="hidden sm:inline">cat</span>
            </div>
          </button>

          {/* PHONE (Desktop Only) */}
          <button onClick={() => handleHotspotClick("phone")} className="hotspot hidden sm:flex absolute right-[30%] top-[60%]" title="Phone">
            <div className="spot-pulse" />
            <div className="spot-card">
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>phone</span>
            </div>
          </button>

          {/* CLOCK (Desktop Only) */}
          <button onClick={() => handleHotspotClick("clock")} className="hotspot hidden sm:flex absolute right-[22%] top-[25%]" title="Real-Time Clock">
            <div className="spot-pulse" />
            <div className="spot-card border-amber-400/40">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-mono font-bold text-amber-200">{realtimeClock}</span>
            </div>
          </button>

          {/* BED (Desktop Only) */}
          <button onClick={() => handleHotspotClick("bed")} className="hotspot hidden sm:flex absolute left-[15%] bottom-[18%]" title="Bed">
            <div className="spot-pulse" />
            <div className="spot-card">
              <Bed className="w-3.5 h-3.5 text-indigo-300" />
              <span>bed</span>
            </div>
          </button>
        </div>

        {/* DIALOGUE TOAST */}
        {dialogue && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 max-w-xs sm:max-w-sm w-full px-4 pointer-events-none transition-all">
            <div className="glass-pill px-5 py-3.5 rounded-2xl border border-white/20 shadow-2xl text-center backdrop-blur-2xl bg-[#05070d]/90 space-y-1">
              <div className="font-sans text-xs sm:text-sm font-medium text-slate-100">{dialogue.text}</div>
              <div className="font-mono text-[11px] text-slate-400">{dialogue.sub}</div>
            </div>
          </div>
        )}

        {/* GENZ FLOATING PRESENCE TOAST */}
        {presenceToast && (
          <div className="fixed bottom-[26%] left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-500 max-w-[90vw]">
            <div className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 backdrop-blur-xl text-xs font-mono text-indigo-200 shadow-2xl flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{presenceToast}</span>
            </div>
          </div>
        )}

        {/* CINEMATIC RISING NOTE PARTICLE */}
        {risingParticleNote && (
          <div className="sky-thought-particle animate-note-rise left-1/2 bottom-20 z-40">
            {risingParticleNote}
          </div>
        )}

        {/* ==================================================
            3. MINIMAL FLOATING MOBILE DOCK & SLIDING COMPACT PLAYER
           ================================================== */}
        <footer className="w-full flex flex-col items-center justify-end gap-3 pointer-events-auto z-30 relative pb-1">
          
          {/* SLIDEABLE MUSIC PLAYER BAR (EXPANDED OR MINIMIZED PILL SLIDER) */}
          {!isPlayerCardMinimized ? (
            <div className="w-full max-w-sm bg-[#0a0d18]/90 border border-amber-500/30 rounded-3xl p-3 backdrop-blur-xl shadow-2xl space-y-2.5 transition-all duration-300">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsRadioSheetOpen(true)}
                  className="cursor-pointer flex items-center gap-2 text-left min-w-0 flex-1"
                >
                  <span className={`w-2 h-2 rounded-full ${isRadioPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                  <span className="text-xs font-mono font-bold text-white truncate">🎵 {currentRoom.trackTitle}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsPlayerCardMinimized(true)}
                    title="Slide Down / Minimize"
                    className="cursor-pointer p-1 rounded-full text-slate-400 hover:text-white transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsRadioSheetOpen(true)}
                    title="Expand Full Sheet"
                    className="cursor-pointer p-1 rounded-full text-slate-400 hover:text-white transition"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* MUSIC PLAYER CONTROLS + VOLUME SLIDER */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <button
                    onClick={() => toggleRadioPlayback()}
                    className="cursor-pointer p-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition active:scale-95 shrink-0"
                  >
                    {isRadioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold text-white truncate">{currentRoom.trackArtist}</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={musicVolume}
                      onChange={(e) => setMusicVolume(Number(e.target.value))}
                      className="range-slider cursor-pointer mt-1"
                      title="Volume Slider"
                    />
                  </div>
                </div>

                <button
                  onClick={() => toggleTrackLike(currentRoom.trackTitle)}
                  className="cursor-pointer p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 shrink-0"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedTracks.includes(currentRoom.trackTitle) ? "fill-amber-400 text-amber-400" : ""}`} />
                </button>
              </div>
            </div>
          ) : (
            /* MINIMIZED SLIDE TOGGLE PILL (SLIDES UP WHEN TAPPED) */
            <div className="w-full max-w-sm bg-[#0a0d18]/85 border border-amber-500/30 rounded-full p-2 pl-3.5 pr-2 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 animate-sheet-up">
              <button
                onClick={() => setIsPlayerCardMinimized(false)}
                className="cursor-pointer flex items-center gap-2 text-left min-w-0 flex-1"
              >
                <span className={`w-2 h-2 rounded-full ${isRadioPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                <span className="text-xs font-mono text-amber-200 font-semibold truncate">🎵 {currentRoom.trackTitle}</span>
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleRadioPlayback()}
                  className="cursor-pointer p-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition active:scale-95"
                >
                  {isRadioPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                </button>

                <button
                  onClick={() => setIsPlayerCardMinimized(false)}
                  className="cursor-pointer px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono text-slate-300 flex items-center gap-1"
                >
                  <span>slide up</span>
                  <ChevronUp className="w-3 h-3 text-amber-300" />
                </button>
              </div>
            </div>
          )}

          {/* FLOATING ACTION DOCK */}
          <div className="flex items-center gap-2 bg-[#05070d]/80 border border-white/15 p-1.5 px-3 rounded-full backdrop-blur-2xl shadow-2xl">
            <button
              onClick={() => setIsRadioSheetOpen(true)}
              className="cursor-pointer px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-mono text-amber-200 transition active:scale-95 flex items-center gap-1.5"
            >
              <Music className="w-3.5 h-3.5 text-amber-300" />
              <span>RADIO</span>
            </button>

            <button
              onClick={() => setIsThoughtModalOpen(true)}
              className="cursor-pointer px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-xs font-mono text-purple-200 transition active:scale-95 flex items-center gap-1.5"
            >
              <Feather className="w-3.5 h-3.5 text-purple-300" />
              <span>NOTE</span>
            </button>

            <button
              onClick={() => setIsLightsModalOpen(true)}
              className="cursor-pointer px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-800 border border-amber-500/30 text-xs font-mono text-slate-200 transition active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">{powerLevel}%</span>
            </button>
          </div>
        </footer>
      </main>

      {/* ==================================================
          4. MOOD SELECTOR BOTTOM SHEET
         ================================================== */}
      {isMoodSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#0a0d18] border-t sm:border border-amber-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 animate-sheet-up relative">
            <button onClick={() => setIsMoodSheetOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <Moon className="w-3.5 h-3.5" />
                <span>atmosphere selection</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white">what are we doing tonight?</h3>
              <p className="text-xs text-slate-400">select a room environment & soundscape.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(rooms).map(([key, rm]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentRoomKey(key);
                    setIsMoodSheetOpen(false);
                  }}
                  className={`cursor-pointer p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${currentRoomKey === key ? "bg-amber-500/20 border-amber-400/60 text-white" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"}`}
                >
                  <div>
                    <div className="text-xs font-mono font-bold capitalize">{rm.label}</div>
                    <div className="text-[10px] text-slate-400">{rm.trackTitle}</div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300">{rm.listeners} live</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsMoodSheetOpen(false);
                setIsCustomRoomModalOpen(true);
              }}
              className="cursor-pointer w-full py-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-200 hover:bg-amber-500/30 flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Custom Room...</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          5. COMMUNITY / LISTENERS BOTTOM SHEET
         ================================================== */}
      {isCommunitySheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">
          <div className="w-full max-w-md bg-[#0a0d18] border-t sm:border border-emerald-500/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 animate-sheet-up relative">
            <button onClick={() => setIsCommunitySheetOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-mono text-lg font-bold text-white">you're not listening alone.</h3>
              <p className="text-xs font-mono text-emerald-300">{currentRoom.listeners} people are here right now.</p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {owlsList.map((owl, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${owl.bg} flex items-center justify-center font-bold text-xs text-white`}>
                      {owl.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">🟢 {owl.name} · {owl.city}</div>
                      <div className="text-[10px] font-mono text-slate-400">listening to {currentRoom.trackTitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setIsCommunitySheetOpen(false);
                setIsRightDrawerOpen(true);
              }}
              className="cursor-pointer w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-xs font-mono text-slate-950 font-bold transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>enter listening room →</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          6. EXPANDED RADIO PLAYER BOTTOM SHEET
         ================================================== */}
      {isRadioSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-xl p-0 sm:p-4">
          <div className="w-full max-w-sm bg-[#0a0d18] border-t sm:border border-amber-500/40 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-5 animate-sheet-up relative">
            <button onClick={() => setIsRadioSheetOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="text-[11px] font-mono text-amber-300 font-bold tracking-wider">3:17 AM RADIO</div>
              <h3 className="font-mono text-base font-bold text-white">{currentRoom.trackTitle}</h3>
              <p className="text-xs text-slate-400">{currentRoom.trackArtist}</p>
            </div>

            {/* ALBUM ART DISC */}
            <div className="flex justify-center py-2">
              <div className="relative w-28 h-28 rounded-full bg-amber-500/20 border-2 border-amber-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <Disc className={`w-14 h-14 text-amber-300 ${isRadioPlaying ? "animate-spin-slow" : ""}`} />
              </div>
            </div>

            {/* AUDIO PROGRESS SCRUBBER */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="100"
                value={audioProgress}
                onChange={(e) => setAudioProgress(Number(e.target.value))}
                className="range-slider cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>01:12</span>
                <span>03:45</span>
              </div>
            </div>

            {/* VOLUME SLIDER */}
            <div className="space-y-1.5 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5 text-amber-300" /> music volume</span>
                <span>{musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(Number(e.target.value))}
                className="range-slider cursor-pointer"
              />
            </div>

            {/* PLAYER CONTROLS */}
            <div className="flex items-center justify-center gap-6">
              <button onClick={() => showToast("Previous track")} className="cursor-pointer p-2 text-slate-400 hover:text-white transition">
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => toggleRadioPlayback()}
                className="cursor-pointer p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xl transition active:scale-95"
              >
                {isRadioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button onClick={() => showToast("Next track")} className="cursor-pointer p-2 text-slate-400 hover:text-white transition">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <button
                onClick={() => toggleTrackLike(currentRoom.trackTitle)}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200"
              >
                <Heart className={`w-4 h-4 ${likedTracks.includes(currentRoom.trackTitle) ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>{likedTracks.includes(currentRoom.trackTitle) ? "in my night" : "add to my night"}</span>
              </button>

              <button
                onClick={() => {
                  setIsRadioSheetOpen(false);
                  setIsSuggestSongModalOpen(true);
                }}
                className="cursor-pointer text-xs font-mono text-slate-400 hover:text-white underline"
              >
                Suggest Song 🎵
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT SLIDE DRAWER WITH CHAT / OWLS / SUGGESTIONS */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-[#0a0d18]/95 border-l border-amber-500/30 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isRightDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-hidden pt-safe pb-safe">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber-400" />
              <h3 className="font-mono text-base sm:text-lg font-bold text-white">Live Room Community</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawerNotifEnabled(!isDrawerNotifEnabled)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] sm:text-xs font-mono text-amber-200 transition"
              >
                {isDrawerNotifEnabled ? <Bell className="w-3.5 h-3.5 text-amber-300" /> : <BellOff className="w-3.5 h-3.5 text-slate-400" />}
                <span>{isDrawerNotifEnabled ? "Notifs ON" : "Notifs OFF"}</span>
              </button>

              <button onClick={() => setIsRightDrawerOpen(false)} className="cursor-pointer text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 mb-4 shrink-0 gap-1">
            <button
              onClick={() => setDrawerTab("chat")}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition ${drawerTab === "chat" ? "text-amber-200 bg-amber-500/20" : "text-slate-400 hover:text-white"}`}
            >
              💬 Live Chat
            </button>
            <button
              onClick={() => setDrawerTab("owls")}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition ${drawerTab === "owls" ? "text-amber-200 bg-amber-500/20" : "text-slate-400 hover:text-white"}`}
            >
              👥 Owls ({owlsList.length})
            </button>
            <button
              onClick={() => setDrawerTab("suggestions")}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition ${drawerTab === "suggestions" ? "text-amber-200 bg-amber-500/20" : "text-slate-400 hover:text-white"}`}
            >
              🎵 Suggested
            </button>
          </div>

          {drawerTab === "chat" && (
            <div className="space-y-3 overflow-y-auto shrink grow pr-1">
              {chatList.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold">{item.name} · {item.city}</span>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-200">"{item.text}"</p>
                </div>
              ))}
            </div>
          )}

          {drawerTab === "owls" && (
            <div className="space-y-2 overflow-y-auto shrink grow pr-1">
              {owlsList.map((owl, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${owl.bg} flex items-center justify-center font-bold text-xs text-white`}>
                      {owl.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{owl.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{owl.city} · listening now</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>
          )}

          {drawerTab === "suggestions" && (
            <div className="space-y-3 overflow-y-auto shrink grow pr-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-300 font-bold">Listener Suggested Songs</span>
                <button
                  onClick={() => setIsSuggestSongModalOpen(true)}
                  className="px-2.5 py-1 rounded-full bg-amber-500/20 text-[10px] font-mono text-amber-200 border border-amber-500/40 hover:bg-amber-500/30"
                >
                  + Suggest Song
                </button>
              </div>

              {suggestedSongsList.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold">🎵 {s.songTitle}</span>
                    <span className="text-[10px] text-slate-400">{s.artist}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Suggested by {s.suggestedBy} ({s.city})</div>
                  {s.note && <p className="text-xs text-slate-300 italic">"{s.note}"</p>}
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/10 pt-3 mt-3 shrink-0 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Name (optional)..."
                className="w-1/2 p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400/60"
              />
              <input
                type="text"
                value={chatCity}
                onChange={(e) => setChatCity(e.target.value)}
                placeholder="City/Country (optional)..."
                className="w-1/2 p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400/60"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                placeholder="Say something to the room..."
                className="flex-1 p-2.5 rounded-xl bg-white/5 border border-amber-500/30 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleSendChatMessage}
                className="cursor-pointer px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition active:scale-95"
              >
                send →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: SUGGEST A SONG */}
      {isSuggestSongModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a0d18] border border-amber-500/40 p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsSuggestSongModalOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <Music className="w-3.5 h-3.5" />
                <span>Listener Recommendation</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white">What song should be added next?</h3>
              <p className="text-xs text-slate-400">Tell the host which song to add to 3:17 AM!</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={suggestTitle}
                onChange={(e) => setSuggestTitle(e.target.value)}
                placeholder="Song Title (e.g. Frank Ocean — Nights)..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-amber-500/20 text-sm text-slate-100 font-sans focus:outline-none focus:border-amber-400/60"
              />
              <input
                type="text"
                value={suggestArtist}
                onChange={(e) => setSuggestArtist(e.target.value)}
                placeholder="Artist or Spotify/YouTube Link..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-amber-500/20 text-sm text-slate-100 font-sans focus:outline-none focus:border-amber-400/60"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={suggestName}
                  onChange={(e) => setSuggestName(e.target.value)}
                  placeholder="Your Name (optional)..."
                  className="w-1/2 p-2.5 rounded-2xl bg-white/5 border border-amber-500/20 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400/60"
                />
                <input
                  type="text"
                  value={suggestCity}
                  onChange={(e) => setSuggestCity(e.target.value)}
                  placeholder="City (optional)..."
                  className="w-1/2 p-2.5 rounded-2xl bg-white/5 border border-amber-500/20 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-400/60"
                />
              </div>
              <textarea
                rows={2}
                value={suggestNote}
                onChange={(e) => setSuggestNote(e.target.value)}
                placeholder="Why this song? (optional note)..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-amber-500/20 text-xs text-slate-100 font-sans resize-none"
              />
            </div>

            <button
              onClick={handleSuggestSongSubmit}
              className="cursor-pointer w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-xs font-mono text-slate-950 font-bold transition active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Song Suggestion 🎵</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOM ROOM */}
      {isCustomRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0a0d18] border border-amber-500/40 p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsCustomRoomModalOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Listening Room</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white">Create Your Custom Room</h3>
              <p className="text-xs text-slate-400">set up your own listening environment & custom track stream.</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={customRoomTitle}
                onChange={(e) => setCustomRoomTitle(e.target.value)}
                placeholder="Room Name (e.g. 4 AM Lo-Fi Hideout)..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-amber-500/20 text-sm text-slate-100 font-sans focus:outline-none focus:border-amber-400/60"
              />
              <input
                type="text"
                value={customTrackName}
                onChange={(e) => setCustomTrackName(e.target.value)}
                placeholder="Track Name & Artist..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-amber-500/20 text-sm text-slate-100 font-sans focus:outline-none focus:border-amber-400/60"
              />
            </div>

            <button
              onClick={() => {
                const key = "custom_" + Date.now();
                const newRm = {
                  name: (customRoomTitle.trim() || "✨ Custom Night Room").toUpperCase(),
                  label: customRoomTitle || "Custom Room",
                  listeners: "1",
                  imgIdx: Math.floor(Math.random() * roomImages.length),
                  trackTitle: customTrackName.trim() || "Midnight Synthwave",
                  trackArtist: "Night Owl Creator"
                };
                setRooms((prev) => ({ ...prev, [key]: newRm }));
                setCurrentRoomKey(key);
                setIsCustomRoomModalOpen(false);
              }}
              className="cursor-pointer w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-xs font-mono text-slate-950 font-bold transition active:scale-95 shadow-lg"
            >
              launch custom room 🚀
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LEAVE A NOTE */}
      {isThoughtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-xl p-0 sm:p-4">
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-[#0a0d18] border-t sm:border border-purple-500/30 p-6 shadow-2xl space-y-4 animate-sheet-up relative">
            <button onClick={() => setIsThoughtModalOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>leave something here</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white tracking-wide">something you probably won't say out loud...</h3>
              <p className="text-xs text-slate-400 font-sans">don't worry. nobody knows it's you. 🌙</p>
            </div>

            <textarea
              rows={3}
              value={thoughtText}
              onChange={(e) => setThoughtText(e.target.value)}
              placeholder="I hope tomorrow is better..."
              className="w-full p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 text-sm text-slate-100 font-sans resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-purple-300/70">100% anonymous & encrypted</span>
              <button
                onClick={handleReleaseNote}
                className="cursor-pointer px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-xs font-mono text-white font-bold transition active:scale-95 shadow-lg flex items-center gap-1.5"
              >
                <span>release into the night ✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POWER STATION */}
      {isLightsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-xl p-0 sm:p-4">
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-[#0a0d18] border-t sm:border border-amber-500/30 p-6 shadow-2xl space-y-5 animate-sheet-up relative">
            <button onClick={() => setIsLightsModalOpen(false)} className="cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>NIGHT POWER GRID</span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white">the room is slowly getting darker.</h3>
              <p className="text-xs text-slate-400">power level: {powerLevel}%</p>
            </div>

            <div className="w-full bg-white/5 rounded-full h-3 p-0.5 border border-white/10 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${powerLevel}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {[
                { price: "₹5", desc: "keep the generator alive" },
                { price: "₹10", desc: "one more hour" },
                { price: "₹50", desc: "bro bought the whole night ⚡" }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={handlePayGenerator}
                  className="pay-option cursor-pointer w-full p-3.5 rounded-2xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 flex items-center justify-between text-left transition group"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-white group-hover:text-amber-200">{opt.price}</div>
                    <div className="text-[11px] text-slate-400">{opt.desc}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GENERATOR EXPLOSION OVERLAY */}
      {isGeneratorOverlayOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-center p-6 space-y-4 overflow-hidden">
          <div className="relative z-10 w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)]">
            <Cpu className="w-10 h-10 text-amber-300 animate-spin" />
          </div>

          <div className="relative z-10 space-y-1 max-w-sm">
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-white drop-shadow-md">💥 BOOM! GENERATOR FIRED UP ⚡</h2>
            <p className="font-mono text-xs text-amber-300/80">heavy smoke rising... power grid engaging!</p>
          </div>
        </div>
      )}

      {/* TOAST POPUP */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 px-4 py-2.5 rounded-full bg-indigo-600/90 text-white font-mono text-xs shadow-2xl border border-indigo-400/40">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
