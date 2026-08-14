/* ==========================================
   3:17 AM — DIGITAL ENVIRONMENT SCRIPT ENGINE
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) lucide.createIcons();

    // ------------------------------------------
    // 1. REAL-TIME DYNAMIC SYSTEM CLOCK & TIME-BASED GEN-Z HEADER
    // ------------------------------------------
    const realtimeClockSpot = document.getElementById('realtimeClockSpot');
    const radioRoomLabel = document.getElementById('radioRoomLabel');
    const currentRoomName = document.getElementById('currentRoomName');

    function updateRealtimeClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = String(hours).padStart(2, '0');
        const timeString = `${formattedHours}:${minutes} ${ampm}`;

        if (realtimeClockSpot) realtimeClockSpot.innerText = timeString;
        if (radioRoomLabel) radioRoomLabel.innerText = `🌙 ${timeString} RADIO`;

        const actualHour = now.getHours();
        let genzVibeText = "";
        if (actualHour >= 5 && actualHour < 12) {
            genzVibeText = `☀️ ${timeString} MORNING COFFEE & BREAD`;
        } else if (actualHour >= 12 && actualHour < 17) {
            genzVibeText = `☕ ${timeString} AFTERNOON BRAIN DRAIN`;
        } else if (actualHour >= 17 && actualHour < 22) {
            genzVibeText = `🌆 ${timeString} EVENING COMMUTE VIBES`;
        } else {
            genzVibeText = `🌙 3:17 AM BEDROOM (NIGHT OWL)`;
        }

        if (currentRoomName && (currentRoomName.innerText.includes('AFTERNOON') || currentRoomName.innerText.includes('MORNING') || currentRoomName.innerText.includes('EVENING') || currentRoomName.innerText.includes('BEDROOM'))) {
            currentRoomName.innerText = genzVibeText;
        }
    }

    updateRealtimeClock();
    setInterval(updateRealtimeClock, 1000);

    // ------------------------------------------
    // 2. 3:17 AM LISTENING ROOMS & METADATA
    // ------------------------------------------
    const listeningRooms = {
        bedroom: {
            name: "🌙 3:17 AM BEDROOM (NIGHT OWL)",
            label: "🌙 3:17 AM RADIO",
            listeners: "1,284",
            imgIdx: 0,
            hasCRT: false,
            trackTitle: "After Dark",
            trackArtist: "Mr.Kitty · Midnight Mix"
        },
        drive: {
            name: "🚗 NIGHT DRIVE",
            label: "🚗 3:17 FM DRIVE",
            listeners: "842",
            imgIdx: 1,
            hasCRT: false,
            trackTitle: "Midnight City",
            trackArtist: "M83 · Night Highway Synth"
        },
        cafe: {
            name: "☕ 1:30 PM AFTERNOON BRAIN DRAIN",
            label: "☕ CAFE JAZZ RADIO",
            listeners: "419",
            imgIdx: 3,
            hasCRT: false,
            trackTitle: "Cold Espresso Jazz",
            trackArtist: "3:17 AM Lounge Band"
        },
        study: {
            name: "📚 8:00 AM MORNING COFFEE",
            label: "📚 STUDY TAPE 2:48 AM",
            listeners: "612",
            imgIdx: 2,
            hasCRT: true,
            trackTitle: "2:48 AM Focus Beats",
            trackArtist: "Lo-Fi Study Tape"
        },
        city: {
            name: "🌆 7:15 PM EVENING COMMUTE",
            label: "🌆 CITY LIGHTS RADIO",
            listeners: "953",
            imgIdx: 4,
            hasCRT: false,
            trackTitle: "Space Song",
            trackArtist: "Beach House · Skyline Mix"
        },
        escape: {
            name: "🌊 MIDNIGHT ESCAPE",
            label: "🌊 OCEAN WAVES RADIO",
            listeners: "320",
            imgIdx: 6,
            hasCRT: false,
            trackTitle: "Ocean Resonance",
            trackArtist: "HOME · Ambient Waves"
        }
    };

    let currentRoomKey = 'bedroom';

    // Room Image Backdrops
    const roomImages = [
        'public/images/1rNv1NucX7g2aL5nSc0r0h5sYOdP2zoDBdNplZU9AY5Lc2pk4ulSYlj5ggWcuIF3HBVZ8Tafe8_4-bVKAe5R-bGndwq9P0FAqRvbduLf9HHYHRPnCY4aOnx3B3rZQKIWuH2lVSEB-ZNzbIKTLHoNet10QZiTGFfvGtCPDNTvmlTMM5e3SdozXA0ezoDEh_io.jpg',
        'public/images/6wX2KWqJvGW-N99NHMR0Nyj1DhPkVc_2QRHkpnLousEgON93WBuZCV9ZwFvqGpByg2BA7OXoxAgUKJbVt4OZ-iMrrJ8vIPxbSJDatJrtYYg2mV9Q8oLYh-n5f0xVYSQj4Fy3iAFuISnUF0ywUPEmsPDnySeq0EDpz3_WpC7O2i90y1LZonhrW5PX8oKfQVGu.jpg',
        'public/images/IBQhAXTTf8SYu1BmYF6s5QUG5_ZRl3Ci0was5DjgGbVP9STVfUtpaweo_hcHXJSBxqDG3WlOmIznvTE6xWJgAfo9DEaZ-C8Q0bhAgXCGkNQzcgq1jCD61GhMtopgQ58zE21u_BHt1XrNf2lxvp6WiNxFnotOKovyHYUBhVzXiuZrCcgrb8IZ5FdkppiRkLYj.jpg',
        'public/images/QChnWDkbQ26xvQ3azrnOD-w0mFPBN8VVUPSlw1OC6I0GxDkKc-pavKpJIxnnc8aoFvOsHPYdmErVmO3vGBNPWNHqZQMDiKyBWFo2W0fXv1N7elRds9D2yTn36mlDoYETTrntu2-fRV8DItcFTBQ3eSjBBN3eQ-8x96rmWeX_8o33pOQe56rALbvZ4nMPgNA8.jpg',
        'public/images/WIHbnxPjGrpKQkBVyO6eJoEay5z3Ud27zm2sprxmeSkEiprL7Uo1pG5Af7nEo9UYL-Vt7i9osKodJmx1DreSaAd9OyoRSksYCKfHQYglNGWV4-RpLpv4pIEk9TwdZHdWFTXtPZfaXacvTExLuz9UdjOEQv14OmPsZX_jMrRUgsKlqNNaJvIF0nR_ScEKgQDk.jpg',
        'public/images/h5zIFEmIjDbag0ktcp0Xx1NpPEnHH4vuhu75nJlh5rP6LkvjxZbWev-QT6whZYBccL1j4cEaXBIcbc2Cln0gyt9qViQPjmPEBSZft5iL7RLfX0z8lV8JXb95fYhgFoGTsKpUGE0C7rzRo1I3rjvaEOCTsXX_x4FBpFnjTh5dj-RI-66oUMYVM9vRxvYAsy_J.jpg',
        'public/images/wGYlGCDgu9BmJ_K29Puc3OLmvA94X6vc5FPUhtJ3Yyiy9f4h6myfAE0GTpQakXpLc-xjG7aIyukZyJIVWc5C4EaOy5GupyOJeEfFSoDTUzqSodhG8jo6u6VTI-J_WxU62BTJeKS1uleWF7kJs8svMXna6J_v3eL7je-JVSg-gFcvC9T_RfQE-2yD6npSfOD7.jpg'
    ];

    const bgSlideA = document.getElementById('bgSlideA');
    const bgSlideB = document.getElementById('bgSlideB');
    const crtOverlay = document.getElementById('crtOverlay');

    if (bgSlideA && roomImages.length > 0) {
        bgSlideA.style.backgroundImage = `url('${roomImages[0]}')`;
    }

    function switchListeningRoom(roomKey, customData = null) {
        let rm = listeningRooms[roomKey];
        if (customData) rm = customData;
        if (!rm) return;
        currentRoomKey = roomKey;

        document.getElementById('currentRoomName').innerText = rm.name;
        document.getElementById('roomListenerCount').innerText = `${rm.listeners} listening`;
        document.getElementById('owlCountNum').innerText = rm.listeners;
        document.getElementById('trackTitle').innerText = rm.trackTitle;
        document.getElementById('trackArtist').innerText = rm.trackArtist;

        if (rm.hasCRT) crtOverlay.classList.remove('hidden');
        else crtOverlay.classList.add('hidden');

        // Swap Background Image
        const isAShowing = bgSlideA.classList.contains('opacity-100');
        const imgUrl = roomImages[rm.imgIdx % roomImages.length];

        if (isAShowing) {
            bgSlideB.style.backgroundImage = `url('${imgUrl}')`;
            bgSlideB.classList.replace('opacity-0', 'opacity-100');
            bgSlideA.classList.replace('opacity-100', 'opacity-0');
        } else {
            bgSlideA.style.backgroundImage = `url('${imgUrl}')`;
            bgSlideA.classList.replace('opacity-0', 'opacity-100');
            bgSlideB.classList.replace('opacity-100', 'opacity-0');
        }
    }

    // Room Selector Dropdown Listeners
    const roomSelectorBtn = document.getElementById('roomSelectorBtn');
    const roomDropdown = document.getElementById('roomDropdown');

    if (roomSelectorBtn) {
        roomSelectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            roomDropdown.classList.toggle('hidden');
        });
    }

    document.addEventListener('click', () => {
        if (roomDropdown && !roomDropdown.classList.contains('hidden')) {
            roomDropdown.classList.add('hidden');
        }
    });

    document.querySelectorAll('.room-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-room');
            switchListeningRoom(key);
            roomDropdown.classList.add('hidden');
        });
    });

    // ------------------------------------------
    // 3. RIGHT SLIDE-OVER DRAWER WITH NOTIFICATION BELL TOGGLE & DIRECT CHAT
    // ------------------------------------------
    const openRightDrawerBtn = document.getElementById('openRightDrawerBtn');
    const sameSongBar = document.getElementById('sameSongBar');
    const rightSlideDrawer = document.getElementById('rightSlideDrawer');
    const closeRightDrawerBtn = document.getElementById('closeRightDrawerBtn');
    const drawerNotifToggleBtn = document.getElementById('drawerNotifToggleBtn');
    const drawerNotifIcon = document.getElementById('drawerNotifIcon');
    const drawerNotifLabel = document.getElementById('drawerNotifLabel');
    const tabChatBtn = document.getElementById('tabChatBtn');
    const tabOwlsBtn = document.getElementById('tabOwlsBtn');
    const tabContentChat = document.getElementById('tabContentChat');
    const tabContentOwls = document.getElementById('tabContentOwls');

    const chatNameInput = document.getElementById('chatNameInput');
    const chatCityInput = document.getElementById('chatCityInput');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendChatMessageBtn = document.getElementById('sendChatMessageBtn');

    let isDrawerNotifEnabled = true;

    if (drawerNotifToggleBtn) {
        drawerNotifToggleBtn.addEventListener('click', () => {
            isDrawerNotifEnabled = !isDrawerNotifEnabled;
            if (isDrawerNotifEnabled) {
                drawerNotifLabel.innerText = "Notifs ON";
                drawerNotifIcon.setAttribute('data-lucide', 'bell');
                showPresenceToast("Gen-Z notifications enabled 🔔");
            } else {
                drawerNotifLabel.innerText = "Notifs OFF";
                drawerNotifIcon.setAttribute('data-lucide', 'bell-off');
            }
            if (window.lucide) lucide.createIcons();
        });
    }

    function openRightDrawer() {
        if (rightSlideDrawer) rightSlideDrawer.classList.remove('translate-x-full');
    }

    function closeRightDrawer() {
        if (rightSlideDrawer) rightSlideDrawer.classList.add('translate-x-full');
    }

    if (openRightDrawerBtn) openRightDrawerBtn.addEventListener('click', openRightDrawer);
    if (sameSongBar) sameSongBar.addEventListener('click', openRightDrawer);
    if (closeRightDrawerBtn) closeRightDrawerBtn.addEventListener('click', closeRightDrawer);

    if (tabChatBtn && tabOwlsBtn) {
        tabChatBtn.addEventListener('click', () => {
            tabChatBtn.className = 'flex-1 py-2 rounded-xl text-xs font-mono font-semibold text-amber-200 bg-amber-500/20 transition';
            tabOwlsBtn.className = 'flex-1 py-2 rounded-xl text-xs font-mono font-semibold text-slate-400 hover:text-white transition';
            tabContentChat.classList.remove('hidden');
            tabContentOwls.classList.add('hidden');
        });

        tabOwlsBtn.addEventListener('click', () => {
            tabOwlsBtn.className = 'flex-1 py-2 rounded-xl text-xs font-mono font-semibold text-amber-200 bg-amber-500/20 transition';
            tabChatBtn.className = 'flex-1 py-2 rounded-xl text-xs font-mono font-semibold text-slate-400 hover:text-white transition';
            tabContentOwls.classList.remove('hidden');
            tabContentChat.classList.add('hidden');
        });
    }

    // DIRECT CHAT SEND HANDLER
    function handleSendChatMessage() {
        const nameVal = chatNameInput ? (chatNameInput.value.trim() || 'Unknown') : 'Unknown';
        const cityVal = chatCityInput ? (chatCityInput.value.trim() || 'Unknown') : 'Unknown';
        const msgVal = chatMessageInput ? chatMessageInput.value.trim() : '';

        if (!msgVal) return;

        chatMessageInput.value = '';

        const chatCard = document.createElement('div');
        chatCard.className = 'p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 space-y-1 animate-fade-in';
        chatCard.innerHTML = `
            <div class="flex items-center justify-between text-xs font-mono">
                <span class="text-amber-300 font-bold">${nameVal} · ${cityVal}</span>
                <span class="text-[10px] text-slate-500">just now</span>
            </div>
            <p class="text-xs text-slate-200">"${msgVal}"</p>
        `;

        if (tabContentChat) tabContentChat.prepend(chatCard);

        const owlCard = document.createElement('div');
        owlCard.className = 'p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between animate-fade-in';
        owlCard.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-xs text-slate-950">${nameVal.charAt(0).toUpperCase()}</div>
                <div>
                    <div class="text-xs font-bold text-white">${nameVal}</div>
                    <div class="text-[10px] font-mono text-slate-400">${cityVal} · listening now</div>
                </div>
            </div>
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        `;
        if (tabContentOwls) tabContentOwls.prepend(owlCard);

        if (isDrawerNotifEnabled) {
            showPresenceToast(`✨ ${nameVal} in ${cityVal} sent a chat message.`);
        }
    }

    if (sendChatMessageBtn) sendChatMessageBtn.addEventListener('click', handleSendChatMessage);
    if (chatMessageInput) {
        chatMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendChatMessage();
        });
    }

    // ------------------------------------------
    // 4. WEB AUDIO ENGINE & ROCK-SOLID RAIN SOUND ON/OFF TOGGLE
    // ------------------------------------------
    let audioCtx = null;
    let muffleFilter = null;
    let masterGainNode = null;
    let rainGainNode = null;
    let fanGainNode = null;
    let isAudioStarted = false;
    let isRainAudioMuted = false;
    let isRadioPlaying = false;
    let synthChordTimer = null;
    let currentTrackIdx = 0;
    let powerLevel = 60;

    function initAudioEngine() {
        if (isAudioStarted && audioCtx) {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            return;
        }

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();

        masterGainNode = audioCtx.createGain();
        masterGainNode.gain.setValueAtTime(1, audioCtx.currentTime);

        muffleFilter = audioCtx.createBiquadFilter();
        muffleFilter.type = 'lowpass';
        muffleFilter.frequency.value = 20000;
        
        muffleFilter.connect(masterGainNode);
        masterGainNode.connect(audioCtx.destination);

        // Rain Noise Generator
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * 0.04;

        const rainNoise = audioCtx.createBufferSource();
        rainNoise.buffer = noiseBuffer;
        rainNoise.loop = true;

        const rainFilter = audioCtx.createBiquadFilter();
        rainFilter.type = 'lowpass';
        rainFilter.frequency.value = 1100;

        rainGainNode = audioCtx.createGain();
        rainGainNode.gain.setValueAtTime(0.22, audioCtx.currentTime);

        rainNoise.connect(rainFilter);
        rainFilter.connect(rainGainNode);
        rainGainNode.connect(muffleFilter);
        rainNoise.start();

        // Room Rumble Fan Generator
        const fanOsc = audioCtx.createOscillator();
        fanOsc.type = 'sawtooth';
        fanOsc.frequency.value = 52;

        const fanFilter = audioCtx.createBiquadFilter();
        fanFilter.type = 'lowpass';
        fanFilter.frequency.value = 130;

        fanGainNode = audioCtx.createGain();
        fanGainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

        fanOsc.connect(fanFilter);
        fanFilter.connect(fanGainNode);
        fanGainNode.connect(muffleFilter);
        fanOsc.start();

        isAudioStarted = true;
    }

    const toggleAudioBtn = document.getElementById('toggleAudioBtn');
    const audioToggleLabel = document.getElementById('audioToggleLabel');
    const audioToggleIcon = document.getElementById('audioToggleIcon');
    const mixerAudioToggleBtn = document.getElementById('mixerAudioToggleBtn');

    function toggleRainAudio(forceState) {
        initAudioEngine();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (forceState !== undefined) {
            isRainAudioMuted = !forceState;
        } else {
            isRainAudioMuted = !isRainAudioMuted;
        }

        if (isRainAudioMuted) {
            // MUTE RAIN SOUND COMPLETELY
            if (rainGainNode) {
                rainGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                rainGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            }
            if (fanGainNode) {
                fanGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                fanGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            }
            if (audioToggleLabel) audioToggleLabel.innerText = "Rain Sound OFF";
            if (audioToggleIcon) audioToggleIcon.setAttribute('data-lucide', 'volume-x');
            if (mixerAudioToggleBtn) mixerAudioToggleBtn.innerText = "OFF";
        } else {
            // UNMUTE & RESTORE RAIN SOUND
            const rVal = (rainSlider ? rainSlider.value / 100 : 0.7) * 0.3;
            const fVal = (fanSlider ? fanSlider.value / 100 : 0.4) * 0.2;
            if (rainGainNode) {
                rainGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                rainGainNode.gain.setValueAtTime(rVal, audioCtx.currentTime);
            }
            if (fanGainNode) {
                fanGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                fanGainNode.gain.setValueAtTime(fVal, audioCtx.currentTime);
            }
            if (audioToggleLabel) audioToggleLabel.innerText = "Rain Sound ON";
            if (audioToggleIcon) audioToggleIcon.setAttribute('data-lucide', 'volume-2');
            if (mixerAudioToggleBtn) mixerAudioToggleBtn.innerText = "ON";
        }

        if (window.lucide) lucide.createIcons();
    }

    if (toggleAudioBtn) toggleAudioBtn.addEventListener('click', () => toggleRainAudio());
    if (mixerAudioToggleBtn) mixerAudioToggleBtn.addEventListener('click', () => toggleRainAudio());

    const synthTracks = [
        { freqs: [220, 261.63, 329.63, 392.00] },
        { freqs: [174.61, 220, 261.63, 329.63] },
        { freqs: [196.00, 246.94, 293.66, 349.23] },
        { freqs: [164.81, 196.00, 246.94, 293.66] }
    ];

    function playLoFiChord() {
        if (!audioCtx || !isRadioPlaying || !muffleFilter) return;
        const track = synthTracks[currentTrackIdx % synthTracks.length];

        track.freqs.forEach((freq) => {
            const osc = audioCtx.createOscillator();
            const noteGain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            noteGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 1.2);
            noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4.5);

            osc.connect(noteGain);
            noteGain.connect(muffleFilter);

            osc.start();
            osc.stop(audioCtx.currentTime + 4.6);
        });
    }

    function toggleRadioPlayback(play) {
        initAudioEngine();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (play === undefined) isRadioPlaying = !isRadioPlaying;
        else isRadioPlaying = play;

        const playIcon = document.getElementById('playIcon');
        const discIcon = document.getElementById('discIcon');

        if (isRadioPlaying) {
            if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
            if (window.lucide) lucide.createIcons();
            if (discIcon) discIcon.classList.add('animate-spin-slow');
            if (!synthChordTimer) {
                playLoFiChord();
                synthChordTimer = setInterval(playLoFiChord, 4200);
            }
        } else {
            if (playIcon) playIcon.setAttribute('data-lucide', 'play');
            if (window.lucide) lucide.createIcons();
            if (discIcon) discIcon.classList.remove('animate-spin-slow');
            if (synthChordTimer) {
                clearInterval(synthChordTimer);
                synthChordTimer = null;
            }
        }
    }

    document.getElementById('playPauseBtn').addEventListener('click', () => toggleRadioPlayback());
    document.getElementById('nextTrackBtn').addEventListener('click', () => {
        currentTrackIdx = (currentTrackIdx + 1) % synthTracks.length;
        if (isRadioPlaying) playLoFiChord();
    });
    document.getElementById('prevTrackBtn').addEventListener('click', () => {
        currentTrackIdx = (currentTrackIdx - 1 + synthTracks.length) % synthTracks.length;
        if (isRadioPlaying) playLoFiChord();
    });

    const rainSlider = document.getElementById('rainSlider');
    const fanSlider = document.getElementById('fanSlider');

    if (rainSlider) {
        rainSlider.addEventListener('input', (e) => {
            document.getElementById('rainVal').innerText = e.target.value + '%';
            if (rainGainNode && !isRainAudioMuted) {
                rainGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                rainGainNode.gain.setValueAtTime((e.target.value / 100) * 0.3, audioCtx.currentTime);
            }
        });
    }
    if (fanSlider) {
        fanSlider.addEventListener('input', (e) => {
            document.getElementById('fanVal').innerText = e.target.value + '%';
            if (fanGainNode && !isRainAudioMuted) {
                fanGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
                fanGainNode.gain.setValueAtTime((e.target.value / 100) * 0.2, audioCtx.currentTime);
            }
        });
    }

    // ------------------------------------------
    // 5. CLOSE MUSIC PLAYER CARD FROM WEBSITE ITSELF
    // ------------------------------------------
    const customPlayerCard = document.getElementById('customPlayerCard');
    const closePlayerCardBtn = document.getElementById('closePlayerCardBtn');

    if (closePlayerCardBtn && customPlayerCard) {
        closePlayerCardBtn.addEventListener('click', () => {
            customPlayerCard.classList.add('hidden');
            toggleRadioPlayback(false);
        });
    }

    // ------------------------------------------
    // 6. CUSTOM ROOM BUILDER MODAL
    // ------------------------------------------
    const openCustomRoomModalBtn = document.getElementById('openCustomRoomModalBtn');
    const customRoomModal = document.getElementById('customRoomModal');
    const closeCustomRoomModal = document.getElementById('closeCustomRoomModal');
    const submitCustomRoomBtn = document.getElementById('submitCustomRoomBtn');
    const customRoomTitleInput = document.getElementById('customRoomTitleInput');
    const customTrackInput = document.getElementById('customTrackInput');

    if (openCustomRoomModalBtn) {
        openCustomRoomModalBtn.addEventListener('click', () => {
            roomDropdown.classList.add('hidden');
            customRoomModal.classList.remove('hidden');
        });
    }

    if (closeCustomRoomModal) closeCustomRoomModal.addEventListener('click', () => customRoomModal.classList.add('hidden'));

    if (submitCustomRoomBtn) {
        submitCustomRoomBtn.addEventListener('click', () => {
            const title = customRoomTitleInput.value.trim() || "✨ Custom Night Room";
            const trackVal = customTrackInput.value.trim() || "Midnight Synthwave";

            customRoomModal.classList.add('hidden');
            customRoomTitleInput.value = '';
            customTrackInput.value = '';

            const customRoomObj = {
                name: title.toUpperCase(),
                label: `✨ ${title}`,
                listeners: "1",
                imgIdx: Math.floor(Math.random() * roomImages.length),
                hasCRT: false,
                trackTitle: trackVal,
                trackArtist: "Night Owl Creator"
            };

            listeningRooms['custom_' + Date.now()] = customRoomObj;
            switchListeningRoom('custom_' + Date.now(), customRoomObj);
        });
    }

    // ------------------------------------------
    // 7. PASSING CAR LIGHT SWEEP ANIMATION
    // ------------------------------------------
    const carLightSweep = document.getElementById('carLightSweep');
    setInterval(() => {
        if (!carLightSweep) return;
        carLightSweep.style.opacity = '0.7';
        carLightSweep.style.transform = 'skewX(-12deg) translateX(100vw)';
        setTimeout(() => {
            carLightSweep.style.opacity = '0';
            carLightSweep.style.transform = 'skewX(-12deg) translateX(-100vw)';
        }, 3200);
    }, 18000);

    // ------------------------------------------
    // 8. CANVAS ANIMATION (RAIN, STEAM & NIGHT DUST FIREFLIES)
    // ------------------------------------------
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    let drops = [];
    let fireflies = [];
    let steamparticles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Drop {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.length = Math.random() * 24 + 12;
            this.speed = Math.random() * 7 + 5;
            this.opacity = Math.random() * 0.35 + 0.15;
            this.width = Math.random() * 1.4 + 0.7;
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - 0.8, this.y + this.length);
            ctx.strokeStyle = `rgba(180, 210, 255, ${this.opacity})`;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    class Firefly {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.fade = Math.random() * 0.01 + 0.005;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha += this.fade;
            if (this.alpha > 0.8 || this.alpha < 0.2) this.fade = -this.fade;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 100, ${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 183, 77, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    class CoffeeSteam {
        constructor() { this.reset(); }
        reset() {
            this.x = canvas.width * 0.38 + (Math.random() * 10 - 5);
            this.y = canvas.height * 0.60;
            this.radius = Math.random() * 6 + 3;
            this.vy = -Math.random() * 0.8 - 0.4;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.4 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.radius += 0.15;
            this.alpha -= 0.006;
            if (this.alpha <= 0) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 90; i++) drops.push(new Drop());
    for (let i = 0; i < 30; i++) fireflies.push(new Firefly());
    for (let i = 0; i < 15; i++) steamparticles.push(new CoffeeSteam());

    function animateEnvironment() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drops.forEach((d) => { d.update(); d.draw(); });
        fireflies.forEach((f) => { f.update(); f.draw(); });
        steamparticles.forEach((s) => { s.update(); s.draw(); });
        requestAnimationFrame(animateEnvironment);
    }
    animateEnvironment();

    // BOOM SMOKE PARTICLES CANVAS
    const boomCanvas = document.getElementById('boomCanvas');
    const boomCtx = boomCanvas ? boomCanvas.getContext('2d') : null;
    let smokeParticles = [];

    function triggerBoomSmoke() {
        if (!boomCanvas || !boomCtx) return;
        boomCanvas.width = window.innerWidth;
        boomCanvas.height = window.innerHeight;
        smokeParticles = [];

        for (let i = 0; i < 90; i++) {
            smokeParticles.push({
                x: canvas.width / 2 + (Math.random() * 120 - 60),
                y: canvas.height + 20,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 9 - 4,
                radius: Math.random() * 30 + 15,
                alpha: 0.85,
                color: Math.random() > 0.35 ? 'rgba(245, 158, 11, ' : 'rgba(156, 163, 175, '
            });
        }

        function renderSmoke() {
            boomCtx.clearRect(0, 0, boomCanvas.width, boomCanvas.height);
            let alive = false;
            smokeParticles.forEach((p) => {
                if (p.alpha > 0.01) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.radius += 0.5;
                    p.alpha *= 0.95;

                    boomCtx.beginPath();
                    boomCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    boomCtx.fillStyle = p.color + p.alpha + ')';
                    boomCtx.fill();
                }
            });
            if (alive) requestAnimationFrame(renderSmoke);
        }
        renderSmoke();
    }

    // ------------------------------------------
    // 9. INTERACTIVE HOTSPOTS MULTI-STAGE SEQUENCES
    // ------------------------------------------
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

    const spotCurrentStage = {};
    const dialogueToast = document.getElementById('dialogueToast');
    const dialogueText = document.getElementById('dialogueText');
    const dialogueSubtext = document.getElementById('dialogueSubtext');
    let dialogueTimeout = null;

    document.querySelectorAll('.hotspot').forEach((btn) => {
        btn.addEventListener('click', () => {
            const spotKey = btn.getAttribute('data-spot');
            const stages = hotspotStages[spotKey];
            if (!stages) return;

            if (spotCurrentStage[spotKey] === undefined) {
                spotCurrentStage[spotKey] = 0;
            } else {
                spotCurrentStage[spotKey] = (spotCurrentStage[spotKey] + 1) % stages.length;
            }

            const current = stages[spotCurrentStage[spotKey]];
            dialogueText.innerText = current.text;
            dialogueSubtext.innerText = current.sub;

            dialogueToast.classList.remove('hidden', 'opacity-0');
            dialogueToast.classList.add('opacity-100');

            if (dialogueTimeout) clearTimeout(dialogueTimeout);
            dialogueTimeout = setTimeout(() => {
                dialogueToast.classList.add('opacity-0');
                setTimeout(() => dialogueToast.classList.add('hidden'), 300);
            }, 3200);
        });
    });

    // ------------------------------------------
    // 10. INTRO SCREEN & LAUNCH ENGINE
    // ------------------------------------------
    const enterBtn = document.getElementById('enterBtn');
    const introScreen = document.getElementById('introScreen');
    const mainApp = document.getElementById('mainApp');
    const roomContainer = document.getElementById('roomContainer');

    function launchApp() {
        if (introScreen) {
            introScreen.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => { introScreen.style.display = 'none'; }, 1000);
        }

        if (mainApp) {
            mainApp.classList.remove('opacity-0');
            mainApp.classList.add('opacity-100');
        }
        if (roomContainer) {
            roomContainer.classList.remove('pointer-events-none');
        }

        initAudioEngine();
        toggleRadioPlayback(true);
    }

    if (enterBtn) enterBtn.addEventListener('click', launchApp);

    // ------------------------------------------
    // 11. POWER GRID DECAY (1% EVERY 10 MINUTES)
    // ------------------------------------------
    const vignetteOverlay = document.getElementById('vignetteOverlay');
    const roomGlow = document.getElementById('roomGlow');
    const lightsVal = document.getElementById('lightsVal');
    const powerBar = document.getElementById('powerBar');

    function updatePowerDegradation(pct) {
        powerLevel = Math.max(20, Math.min(100, pct));
        lightsVal.innerText = `${powerLevel}%`;

        const blocks = Math.round((powerLevel / 100) * 10);
        powerBar.innerText = '█'.repeat(blocks) + '░'.repeat(10 - blocks);

        if (powerLevel >= 75) {
            vignetteOverlay.style.opacity = '0.5';
            roomGlow.style.opacity = '0.7';
            if (muffleFilter && audioCtx) muffleFilter.frequency.value = 20000;
        } else if (powerLevel >= 50) {
            vignetteOverlay.style.opacity = '0.65';
            roomGlow.style.opacity = '0.5';
            if (muffleFilter && audioCtx) muffleFilter.frequency.value = 10000;
        } else if (powerLevel >= 30) {
            vignetteOverlay.style.opacity = '0.8';
            roomGlow.style.opacity = '0.3';
            if (muffleFilter && audioCtx) muffleFilter.frequency.value = 4000;
        } else {
            vignetteOverlay.style.opacity = '0.9';
            roomGlow.style.opacity = '0.15';
            if (muffleFilter && audioCtx) muffleFilter.frequency.value = 1500;
        }
    }

    setInterval(() => {
        if (powerLevel > 20) {
            updatePowerDegradation(powerLevel - 1);
        }
    }, 600000);

    const lightsBtn = document.getElementById('lightsBtn');
    const lightsModal = document.getElementById('lightsModal');
    const closeLightsModal = document.getElementById('closeLightsModal');

    lightsBtn.addEventListener('click', () => lightsModal.classList.remove('hidden'));
    closeLightsModal.addEventListener('click', () => lightsModal.classList.add('hidden'));

    const generatorOverlay = document.getElementById('generatorOverlay');
    const genStatusText = document.getElementById('genStatusText');
    const genSubtext = document.getElementById('genSubtext');
    const genProgressBar = document.getElementById('genProgressBar');

    document.querySelectorAll('.pay-option').forEach((btn) => {
        btn.addEventListener('click', () => {
            lightsModal.classList.add('hidden');

            generatorOverlay.classList.remove('hidden');
            genStatusText.innerText = "payment received.";
            genSubtext.innerText = "confirming grid connection...";
            genProgressBar.style.width = '35%';

            setTimeout(() => {
                mainApp.classList.add('animate-shake');
                triggerBoomSmoke();

                genStatusText.innerText = "💥 BOOM! GENERATOR FIRED UP ⚡";
                genSubtext.innerText = "heavy smoke rising... power grid engaging!";
                genProgressBar.style.width = '85%';
            }, 1400);

            setTimeout(() => {
                genProgressBar.style.width = '100%';
                genStatusText.innerText = "⚡ THE LIGHTS ARE BACK!";
                genSubtext.innerText = "room power restored to 100%";
            }, 2600);

            setTimeout(() => {
                mainApp.classList.remove('animate-shake');
                generatorOverlay.classList.add('hidden');
                updatePowerDegradation(100);
            }, 3700);
        });
    });

    // ------------------------------------------
    // 12. PRESENCE TOASTS CONTROLLED BY NOTIFICATION BELL TOGGLE
    // ------------------------------------------
    const presenceToast = document.getElementById('presenceToast');
    const presenceToastText = document.getElementById('presenceToastText');
    let presenceTimeout = null;

    function showPresenceToast(msg) {
        if (!isDrawerNotifEnabled) return;
        presenceToastText.innerText = msg;
        presenceToast.classList.remove('opacity-0', 'translate-y-2');
        presenceToast.classList.add('opacity-100', 'translate-y-0');

        if (presenceTimeout) clearTimeout(presenceTimeout);
        presenceTimeout = setTimeout(() => {
            presenceToast.classList.remove('opacity-100', 'translate-y-0');
            presenceToast.classList.add('opacity-0', 'translate-y-2');
        }, 4000);
    }

    const presenceEvents = [
        "✨ someone in Chandigarh just entered the room.",
        "🌙 someone in Delhi posted a chat message.",
        "☕ someone in NYC is listening to focus beats.",
        "✨ another night owl joined the room."
    ];

    setInterval(() => {
        if (isDrawerNotifEnabled) {
            const randomEvt = presenceEvents[Math.floor(Math.random() * presenceEvents.length)];
            showPresenceToast(randomEvt);
        }
    }, 22000);

    // ------------------------------------------
    // 13. LEAVE A NOTE MODAL & MIXER
    // ------------------------------------------
    const leaveThoughtBtn = document.getElementById('leaveThoughtBtn');
    const thoughtModal = document.getElementById('thoughtModal');
    const closeThoughtModal = document.getElementById('closeThoughtModal');
    const submitThoughtBtn = document.getElementById('submitThoughtBtn');
    const thoughtInput = document.getElementById('thoughtInput');

    leaveThoughtBtn.addEventListener('click', () => thoughtModal.classList.remove('hidden'));
    closeThoughtModal.addEventListener('click', () => thoughtModal.classList.add('hidden'));

    submitThoughtBtn.addEventListener('click', () => {
        const text = thoughtInput.value.trim();
        if (!text) return;

        thoughtModal.classList.add('hidden');
        thoughtInput.value = '';

        const particle = document.createElement('div');
        particle.className = 'sky-thought-particle';
        particle.innerText = `"${text}"`;
        particle.style.left = '50%';
        particle.style.bottom = '120px';
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 6000);
    });

    const wakeOwlBtn = document.getElementById('wakeOwlBtn');
    wakeOwlBtn.addEventListener('click', () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}?from=nightowl`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast("link copied! send to another night owl 🌙");
        }).catch(() => {
            showToast("3-17-am.com/?from=nightowl");
        });
    });

    const openMixerBtn = document.getElementById('openMixerBtn');
    const mixerModal = document.getElementById('mixerModal');
    const closeMixerModal = document.getElementById('closeMixerModal');
    openMixerBtn.addEventListener('click', () => mixerModal.classList.remove('hidden'));
    closeMixerModal.addEventListener('click', () => mixerModal.classList.add('hidden'));

    const toast = document.getElementById('toast');
    let toastTimeout = null;
    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.remove('hidden', 'opacity-0');
        toast.classList.add('opacity-100');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3500);
    }

    updatePowerDegradation(60);
});
