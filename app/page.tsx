"use client"

import { useState, useRef, useEffect } from "react"
import { Home, Gamepad2, History, Radio, ChevronRight, Zap, Sparkles, Layers, Play, Pause } from "lucide-react"

type Category = "SKILL" | "CHANCE" | "SLOTS" | "SOON"

interface Game {
  name: string
  category: Category
  rtp: string
  featured?: boolean
  hot?: boolean
  sceneKey?: string
}

const GAME_BASE_URL = "https://zero-934.github.io/jett-game/"

// MODIFIED: launchGame now sets activeGame state for iframe overlay
function launchGame(sceneKey?: string, setActiveGame?: (url: string | null) => void) {
  if (!sceneKey || !setActiveGame) return
  setActiveGame(`${GAME_BASE_URL}?scene=${sceneKey}`)
}

const games: Game[] = [
  { name: "Jett", sceneKey: "JettScene", category: "SKILL", rtp: "96%", featured: true, hot: true },
  { name: "Shatter Step", sceneKey: "ShatterStepScene", category: "SKILL", rtp: "97%", hot: true },
  { name: "Flap Fortune", sceneKey: "FlapFortuneScene", category: "SKILL", rtp: "95%" },
  { name: "Dice", sceneKey: "DiceScene", category: "CHANCE", rtp: "98%", hot: true },
  { name: "Dice Duel", sceneKey: "DiceDuelScene", category: "CHANCE", rtp: "97%" },
  { name: "Mines", sceneKey: "MinesScene", category: "CHANCE", rtp: "97%" },
  { name: "Ball Drop", sceneKey: "BallDropScene", category: "CHANCE", rtp: "96%" },
  { name: "The Alchemist", sceneKey: "AlchemistScene", category: "SLOTS", rtp: "96%", hot: true },
  { name: "Midnight Masquerade", sceneKey: "MasqueradeScene", category: "SLOTS", rtp: "97%" },
  { name: "Surge", sceneKey: "SurgeScene", category: "SLOTS", rtp: "95%" },
  { name: "Inferno", sceneKey: "InfernoScene", category: "SLOTS", rtp: "94%" },
  { name: "Doom Crash", sceneKey: "DoomCrashScene", category: "SKILL", rtp: "96%", hot: true },
  { name: "Shadow Roulette", category: "SOON", rtp: "97%" },
  { name: "Phantom Poker", category: "SOON", rtp: "98%" },
  { name: "Obsidian Blackjack", category: "SOON", rtp: "99%" },
  { name: "Neon Keno", category: "SOON", rtp: "92%" },
  { name: "Dark Horse Racing", category: "SOON", rtp: "94%" },
  { name: "Lunar Crash", category: "SOON", rtp: "97%" },
  { name: "Void Plinko", category: "SOON", rtp: "96%" },
  { name: "Cipher Wheel", category: "SOON", rtp: "95%" },
  { name: "Spectre Scratch", category: "SOON", rtp: "93%" },
  { name: "Abyss Baccarat", category: "SOON", rtp: "98%" },
]

const categoryIcons: Record<Category, typeof Zap> = {
  SKILL: Zap,
  CHANCE: Sparkles,
  SLOTS: Layers,
  SOON: Sparkles,
}

// Pass setActiveGame prop to FeaturedCard
function FeaturedCard({ game, setActiveGame }: { game: Game, setActiveGame: (url: string | null) => void }) {
  return (
    <button onClick={() => launchGame(game.sceneKey, setActiveGame)} className="relative w-full aspect-[16/9] bg-card rounded-[16px] border border-border overflow-hidden transition-transform duration-150 active:scale-[0.98]">
      <div className="absolute inset-0 bg-[#0a0a0a] pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gold/20 text-gold text-[10px] font-semibold uppercase rounded-full">
              Featured
            </span>
            {game.hot && (
              <span className="px-2 py-1 bg-danger/20 text-danger text-[10px] font-semibold uppercase rounded-full">
                Hot
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted">{game.rtp} RTP</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] text-muted uppercase tracking-wider">{game.category}</span>
            <h2 className="text-2xl font-semibold text-foreground">{game.name}</h2>
          </div>
          <div className="px-5 py-2.5 bg-gold text-black text-sm font-semibold rounded-[10px]">
            PLAY NOW
          </div>
        </div>
      </div>
    </button>
  )
}

// Pass setActiveGame prop to CompactCard
function CompactCard({ game, setActiveGame }: { game: Game, setActiveGame: (url: string | null) => void }) {
  const isSoon = game.category === "SOON"
  const Icon = categoryIcons[game.category]

  return (
    <button
      onClick={() => !isSoon && launchGame(game.sceneKey, setActiveGame)}
      className="flex-shrink-0 w-[140px] text-left bg-card rounded-[12px] border border-border overflow-hidden transition-transform duration-150 active:scale-[0.97]"
      disabled={isSoon}
    >
      <div className="relative aspect-square bg-[#0a0a0a] flex items-center justify-center">
        <Icon className={`w-8 h-8 ${isSoon ? 'text-inactive' : 'text-muted'}`} />
        {game.hot && !isSoon && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-foreground truncate">{game.name}</span>
        </div>
        <span className="text-[10px] text-muted">{game.rtp}</span>
      </div>
    </button>
  )
}

// Pass setActiveGame prop to GameCard
function GameCard({ game, size = "normal", setActiveGame }: { game: Game; size?: "normal" | "large", setActiveGame: (url: string | null) => void }) {
  const isSoon = game.category === "SOON"
  const Icon = categoryIcons[game.category]

  if (size === "large") {
    return (
      <button
        onClick={() => !isSoon && launchGame(game.sceneKey, setActiveGame)}
        className="col-span-2 text-left bg-card rounded-[14px] border border-border overflow-hidden transition-transform duration-150 active:scale-[0.98]"
        disabled={isSoon}
      >
        <div className="flex">
          <div className="relative w-1/2 aspect-[4/3] bg-[#0a0a0a] flex items-center justify-center">
            <Icon className={`w-12 h-12 ${isSoon ? 'text-inactive' : 'text-muted'}`} />
            {game.hot && !isSoon && (
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-danger/20 text-danger text-[9px] font-semibold uppercase rounded-full">
                Hot
              </span>
            )}
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-muted uppercase tracking-wider">{game.category}</span>
              <h3 className="text-lg font-semibold text-foreground mt-0.5">{game.name}</h3>
              <span className="text-xs text-muted">{game.rtp} RTP</span>
            </div>
            <div
              className={`w-full py-2 rounded-[8px] text-center text-xs font-semibold ${
                isSoon
                  ? "bg-surface text-inactive"
                  : "bg-gold text-black"
              }`}
            >
              {isSoon ? "Coming Soon" : "PLAY"}
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={() => !isSoon && launchGame(game.sceneKey, setActiveGame)}
      className="text-left bg-card rounded-[12px] border border-border overflow-hidden transition-transform duration-150 active:scale-[0.97]"
      disabled={isSoon}
    >
      <div className="relative aspect-[4/3] bg-[#0a0a0a] flex items-center justify-center">
        <Icon className={`w-10 h-10 ${isSoon ? 'text-inactive' : 'text-muted'}`} />
        {game.hot && !isSoon && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{game.name}</span>
          <span className="text-[10px] text-muted">{game.rtp}</span>
        </div>
        <div
          className={`w-full py-2 rounded-[8px] text-center text-xs font-semibold ${
            isSoon
              ? "bg-surface text-inactive"
              : "bg-gold text-black"
          }`}
        >
          {isSoon ? "Coming Soon" : "PLAY"}
        </div>
      </div>
    </button>
  )
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <span className="text-xs text-muted">({count})</span>
      </div>
      <button className="flex items-center gap-1 text-xs text-gold">
        See all <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  )
}

interface RadioStation {
  id: string;
  name: string;
  genre: string;
  stream: string;
}

// MODIFIED: Updated radio stations list
const radioStations: RadioStation[] = [
  { id: "lofi", name: "Lo-Fi Hip Hop", genre: "CHILL", stream: "https://streams.ilovemusic.de/iloveradio17.mp3" },
  { id: "chillout", name: "Chillout Lounge", genre: "AMBIENT", stream: "https://streams.ilovemusic.de/iloveradio2.mp3" },
  { id: "deephouse", name: "Deep House", genre: "HOUSE", stream: "https://streams.ilovemusic.de/iloveradio10.mp3" },
  { id: "jazz", name: "Smooth Jazz", genre: "JAZZ", stream: "https://streams.ilovemusic.de/iloveradio15.mp3" },
  { id: "hiphop", name: "Hip Hop", genre: "HIP HOP", stream: "https://streams.ilovemusic.de/iloveradio7.mp3" },
  { id: "rnb", name: "R&B Soul", genre: "R&B", stream: "https://streams.ilovemusic.de/iloveradio6.mp3" },
  { id: "rock", name: "Classic Rock", genre: "ROCK", stream: "https://streams.ilovemusic.de/iloveradio21.mp3" },
  { id: "edm", name: "EDM / Electronic", genre: "EDM", stream: "https://streams.ilovemusic.de/iloveradio9.mp3" },
];

function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (station: RadioStation) => {
    if (audioRef.current) {
      if (currentStation?.id === station.id && isPlaying) {
        // Stop current station
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentStation(null);
      } else {
        // Play new station or resume
        audioRef.current.src = station.stream;
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        setIsPlaying(true);
        setCurrentStation(station);
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.6; // Set a default volume
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear source to stop buffering
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {currentStation && isPlaying && (
        <div className="text-sm text-gold mb-2 text-center">
          Now Playing: <span className="font-semibold">{currentStation.name}</span>
        </div>
      )}
      {radioStations.map((station) => (
        <div
          key={station.id}
          className={`bg-surface rounded-[12px] border ${
            currentStation?.id === station.id && isPlaying ? "border-gold" : "border-border"
          } p-4 flex items-center justify-between transition-all duration-200`}
        >
          <div>
            <h3 className="text-base font-medium text-foreground">{station.name}</h3>
            <span className="text-xs text-muted">{station.genre}</span>
          </div>
          <button
            onClick={() => handlePlayPause(station)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStation?.id === station.id && isPlaying ? "bg-gold text-black" : "bg-card text-gold"
            }`}
          >
            {currentStation?.id === station.id && isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}


export default function CasinoLobby() {
  const [activeNav, setActiveNav] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)
  // MODIFIED: State for iframe overlay
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Check if already authenticated
  const STORAGE_KEY = "jg_auth"
  const CORRECT_PIN = "9340"

  // On mount, check sessionStorage
  if (typeof window !== "undefined" && !unlocked) {
    if (sessionStorage.getItem(STORAGE_KEY) === "ok") {
      // already auth — will render lobby
    }
  }

  const handlePin = (digit: string) => {
    if (error) { setError(false); setPin(""); return; }
    const next = pin + digit
    if (next.length <= 4) {
      setPin(next)
      if (next.length === 4) {
        setTimeout(() => {
          if (next === CORRECT_PIN) {
            sessionStorage.setItem(STORAGE_KEY, "ok")
            setUnlocked(true)
          } else {
            setError(true)
            setTimeout(() => { setError(false); setPin(""); }, 1000)
          }
        }, 120)
      }
    }
  }

  const isAuth = unlocked || (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "ok")

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
        <div className="mb-8 text-center">
          <span className="text-3xl font-light text-gold tracking-widest uppercase">jett</span>
          <p className="text-muted text-sm mt-2 tracking-wider uppercase">Enter Access Code</p>
        </div>
        <div className="flex gap-4 mb-8">
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-colors ${
              error ? "border-danger bg-danger" :
              i < pin.length ? "border-gold bg-gold" : "border-border bg-transparent"
            }`} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
            <button key={i}
              onClick={() => k === "⌫" ? setPin(p => p.slice(0,-1)) : k ? handlePin(k) : null}
              className={`aspect-square rounded-[12px] text-xl font-semibold transition-colors ${
                k ? "bg-surface border border-border text-foreground active:bg-card" : "invisible"
              }`}
            >{k}</button>
          ))}
        </div>
      </div>
    )
  }

  const featuredGame = games.find(g => g.featured)!
  const skillGames = games.filter(g => g.category === "SKILL")  // includes featured
  const chanceGames = games.filter(g => g.category === "CHANCE")
  const slotGames = games.filter(g => g.category === "SLOTS")
  const soonGames = games.filter(g => g.category === "SOON")
  const hotGames = games.filter(g => g.hot && !g.featured)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* MODIFIED: Iframe Overlay */}
      {activeGame && (
        <div className="fixed inset-0 z-100 bg-black flex items-center justify-center">
          <button
            onClick={() => setActiveGame(null)}
            className="absolute top-2 left-2 z-101 bg-black/50 text-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-gold backdrop-blur-sm"
          >
            ← LOBBY
          </button>
          <iframe src={activeGame} width="100%" height="100%" frameBorder="0" allowFullScreen />
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-border">
        {activeNav === 3 ? (
          <span className="text-xl font-light text-gold tracking-widest uppercase">
            PROFILE
          </span>
        ) : (
          <span className="text-xl font-light text-foreground tracking-widest uppercase">
            jett
          </span>
        )}


        <div className="flex items-center gap-3">
          <div className="bg-surface px-3 py-1.5 rounded-full border border-border">
            <span className="text-gold text-sm font-semibold">◎ 2.40</span>
          </div>
          <button className="px-3 py-1.5 rounded-[8px] border border-gold text-gold text-xs font-semibold hover:bg-gold/10 transition-colors">
            Connect
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {activeNav === 3 ? (
          <RadioPlayer />
        ) : (
          <>
            {/* Featured Hero */}
            <section className="px-4 pt-4 pb-6">
              <FeaturedCard game={featuredGame} setActiveGame={setActiveGame} />
            </section>

            {/* Hot Games - Horizontal Scroll */}
            <section className="pb-6">
              <div className="px-4">
                <SectionHeader title="Hot Right Now" count={hotGames.length} />
              </div>
              <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {hotGames.map((game) => (
                  <CompactCard key={game.name} game={game} setActiveGame={setActiveGame} />
                ))}
              </div>
            </section>

            {/* Skill Games */}
            <section className="px-4 pb-6">
              <SectionHeader title="Skill Games" count={skillGames.length} />
              <div className="grid grid-cols-2 gap-3">
                {skillGames.slice(0, 1).map((game) => (
                  <GameCard key={game.name} game={game} size="large" setActiveGame={setActiveGame} />
                ))}
                {skillGames.slice(1).map((game) => (
                  <GameCard key={game.name} game={game} setActiveGame={setActiveGame} />
                ))}
              </div>
            </section>

            {/* Chance Games */}
            <section className="px-4 pb-6">
              <SectionHeader title="Games of Chance" count={chanceGames.length} />
              <div className="grid grid-cols-2 gap-3">
                {chanceGames.map((game, i) => (
                  <GameCard key={game.name} game={game} size={i === 0 ? "large" : "normal"} setActiveGame={setActiveGame} />
                ))}
              </div>
            </section>

            {/* Slots */}
            <section className="pb-6">
              <div className="px-4">
                <SectionHeader title="Slots" count={slotGames.length} />
              </div>
              <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {slotGames.map((game) => (
                  <CompactCard key={game.name} game={game} setActiveGame={setActiveGame} />
                ))}
              </div>
            </section>

            {/* Coming Soon */}
            <section className="px-4 pb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Coming Soon</h2>
                  <span className="text-xs text-muted">({soonGames.length})</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {soonGames.slice(0, 6).map((game) => (
                  <div key={game.name} className="bg-card rounded-[10px] border border-border p-3 opacity-60">
                    <div className="aspect-square bg-[#0a0a0a] rounded-[6px] mb-2 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-inactive" />
                    </div>
                    <span className="text-[11px] font-medium text-muted truncate block">{game.name}</span>
                  </div>
                ))}
              </div>
              {soonGames.length > 6 && (
                <button className="w-full mt-3 py-2.5 border border-border rounded-[10px] text-xs font-medium text-muted">
                  +{soonGames.length - 6} more coming
                </button>
              )}
            </section>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: "Home" },
            { icon: Gamepad2, label: "Games" },
            { icon: History, label: "History" },
            { icon: Radio, label: "Radio" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveNav(index)}
              className="flex flex-col items-center gap-1 p-2"
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  activeNav === index ? "text-gold" : "text-inactive"
                }`}
              />
              <span className={`text-[10px] transition-colors ${
                activeNav === index ? "text-gold" : "text-inactive"
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
