import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
// @ts-ignore
import avatarImg from "@/imports/minimalist-black-hole.png";

// ── Catppuccin Mocha palette ──────────────────────────────────────────────────
const C = {
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
  surface0: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  overlay1: "#7f849c",
  subtext0: "#a6adc8",
  text: "#cdd6f4",
  lavender: "#b4befe",
  blue: "#89b4fa",
  sapphire: "#74c7ec",
  sky: "#89dceb",
  teal: "#94e2d5",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  peach: "#fab387",
  maroon: "#eba0ac",
  red: "#f38ba8",
  mauve: "#cba6f7",
  pink: "#f5c2e7",
  flamingo: "#f2cdcd",
  rosewater: "#f5e0dc",
};

// ── Sparkle SVG ───────────────────────────────────────────────────────────────
function Sparkle({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color} style={{ display: "inline", verticalAlign: "middle" }}>
      <polygon points="6,0 7,5 12,6 7,7 6,12 5,7 0,6 5,5" />
    </svg>
  );
}

// ── Pixel border component ────────────────────────────────────────────────────
function PixelBox({
  children,
  color = C.mauve,
  bg = C.mantle,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: bg,
        border: `3px solid ${color}`,
        boxShadow: `4px 4px 0 ${color}`,
        padding: "12px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Blink component ───────────────────────────────────────────────────────────
function Blink({ children, color = C.yellow }: { children: React.ReactNode; color?: string }) {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVis((v) => !v), 600);
    return () => clearInterval(id);
  }, []);
  return <span style={{ color, visibility: vis ? "visible" : "hidden" }}>{children}</span>;
}

// ── Glitch text ───────────────────────────────────────────────────────────────
function GlitchText({ text, color = C.mauve }: { text: string; color?: string }) {
  return (
    <span
      className="glitch-text"
      style={{ color, fontFamily: "'Orbitron', monospace", position: "relative" }}
      data-text={text}
    >
      {text}
    </span>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", background: C.crust, borderTop: `2px solid ${C.mauve}`, borderBottom: `2px solid ${C.mauve}`, padding: "4px 0" }}>
      <div
        style={{
          display: "inline-block",
          animation: `marquee ${speed}s linear infinite`,
          fontFamily: "'VT323', monospace",
          fontSize: "18px",
          color: C.green,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function PixelBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.subtext0, marginBottom: "2px" }}>
        {label}
      </div>
      <div style={{ background: C.surface0, border: `2px solid ${C.surface1}`, height: "16px", position: "relative" }}>
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 10px)`,
          }}
        />
      </div>
    </div>
  );
}

// ── Visitor counter ───────────────────────────────────────────────────────────
function VisitorCounter() {
  const [count, setCount] = useState("002847361");

  useEffect(() => {
    const storageKey = "sky99cents-visitor-count";
    const startingCount = 2847361;

    try {
      const stored = Number(window.localStorage.getItem(storageKey));
      const nextCount = Math.max(Number.isFinite(stored) ? stored : startingCount, startingCount) + 1;

      window.localStorage.setItem(storageKey, String(nextCount));
      setCount(String(nextCount).padStart(9, "0"));
    } catch {
      setCount(String(startingCount).padStart(9, "0"));
    }
  }, []);

  return (
    <div style={{ display: "inline-flex", gap: "2px", background: C.crust, padding: "4px", border: `2px inset ${C.surface1}` }}>
      {count.split("").map((d, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "24px",
            color: C.green,
            background: "#000",
            padding: "0 3px",
            lineHeight: 1,
          }}
        >
          {d}
        </span>
      ))}
    </div>
  );
}

// ── Star field background ─────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    color: [C.mauve, C.blue, C.pink, C.lavender, C.sky][Math.floor(Math.random() * 5)],
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            borderRadius: "50%",
            animation: `twinkle 2s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ── Nav bar ───────────────────────────────────────────────────────────────────
function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const links = ["HOME", "ABOUT", "SKILLS", "INTERESTS", "GUESTBOOK"];
  return (
    <nav
      style={{
        background: C.crust,
        borderBottom: `3px solid ${C.mauve}`,
        display: "flex",
        gap: "2px",
        padding: "4px 8px",
        flexWrap: "wrap",
      }}
    >
      {links.map((l) => (
        <button
          key={l}
          onClick={() => setActive(l)}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "9px",
            padding: "6px 10px",
            background: active === l ? C.mauve : C.surface0,
            color: active === l ? C.crust : C.text,
            border: "none",
            cursor: "pointer",
            boxShadow: active === l ? `inset 2px 2px 0 ${C.surface2}` : `2px 2px 0 ${C.surface2}`,
            transition: "all 0.1s",
          }}
          onMouseEnter={(e) => {
            if (active !== l) (e.target as HTMLElement).style.background = C.surface1;
          }}
          onMouseLeave={(e) => {
            if (active !== l) (e.target as HTMLElement).style.background = C.surface0;
          }}
        >
          {l}
        </button>
      ))}
    </nav>
  );
}

// ── Section: HOME ─────────────────────────────────────────────────────────────
function HomeSection() {
  return (
    <div className="home-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "16px", alignItems: "start" }}>
      {/* Main hero */}
      <div>
        <PixelBox color={C.mauve} style={{ marginBottom: "16px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", color: C.mauve, letterSpacing: "4px", marginBottom: "8px" }}>
            ✦ WELCOME TO MY CORNER OF THE WEB ✦
          </div>
          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(22px, 4vw, 48px)",
              fontWeight: 900,
              color: C.text,
              margin: "12px 0",
              textShadow: `0 0 20px ${C.mauve}, 2px 2px 0 ${C.crust}`,
              lineHeight: 1.2,
            }}
          >
            <GlitchText text="~* SKY99CENTS *~" color={C.mauve} />
          </h1>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "22px", color: C.pink, margin: "8px 0" }}>
            <Sparkle color={C.yellow} size={14} /> digital larper & web witch{" "}
            <Sparkle color={C.yellow} size={14} />
          </div>
          <div
            style={{
              display: "inline-block",
              background: C.surface0,
              border: `2px solid ${C.red}`,
              color: C.red,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              padding: "4px 8px",
              margin: "8px 4px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            ⚠ UNDER CONSTRUCTION ⚠
          </div>
          <div
            style={{
              display: "inline-block",
              background: C.surface0,
              border: `2px solid ${C.green}`,
              color: C.green,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              padding: "4px 8px",
              margin: "8px 4px",
            }}
          >
            ● ONLINE
          </div>
        </PixelBox>

        {/* About blurb */}
        <PixelBox color={C.blue} style={{ marginBottom: "16px" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.blue, marginBottom: "10px" }}>
            ▶ LATEST UPDATE
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "14px", color: C.text, lineHeight: 1.7 }}>
            hey everyone!! <Sparkle color={C.pink} size={10} /> just finished redesigning my page with the new y2k theme
            i've been obsessed with lately. added a guestbook, updated my interests list, and finally got the star
            background working!! leave me a message if you visit :3
            <br />
            <br />
            <span style={{ color: C.subtext0, fontSize: "12px" }}>— posted jun 15 2026 at 11:47pm</span>
          </div>
        </PixelBox>

        {/* Currently obsessed with */}
        <PixelBox color={C.teal}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.teal, marginBottom: "10px" }}>
            ★ CURRENTLY OBSESSED WITH
          </div>
          {[
            { icon: "🎵", category: "song", value: "Car Seat Headrest — I Want You To Know That I'm Awake/I Hope That You're Asleep", color: C.mauve },
            { icon: "📺", category: "anime", value: "Gurren Lagann (rewatch)", color: C.yellow },
            { icon: "🎮", category: "game", value: "Metro Exodus", color: C.peach },
            { icon: "📖", category: "reading", value: "Kingdom", color: C.green },
            { icon: "🥤", category: "drink", value: "Monster Ultra White", color: C.sapphire },
          ].map((item) => (
            <div key={item.category} className="status-row" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: `1px solid ${C.surface0}` }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span style={{ fontFamily: "'VT323', monospace", fontSize: "15px", color: C.overlay1, minWidth: "60px" }}>{item.category}:</span>
              <span className="status-value" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", color: item.color }}>{item.value}</span>
            </div>
          ))}
        </PixelBox>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Avatar */}
        <PixelBox color={C.pink} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: C.pink, marginBottom: "8px" }}>
            ☆ OWNER ☆
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 8px",
              border: `3px solid ${C.pink}`,
              overflow: "hidden",
            }}
          >
            <ImageWithFallback
              src={avatarImg}
              alt="minimalist black hole illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", color: C.text, fontWeight: 700 }}>
            SKY99CENTS
          </div>
          <div style={{ marginTop: "8px", display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
            {[
              { label: "TWITCH", href: "http://www.twitch.tv/sky99cents", color: "#9146ff" },
              { label: "YOUTUBE", href: "https://www.youtube.com/@sky99cents", color: "#ff0000" },
              { label: "OSU!", href: "https://osu.ppy.sh/users/18188678", color: "#ff66aa" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  background: C.surface0,
                  border: `2px solid ${link.color}`,
                  color: link.color,
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px",
                  padding: "4px 8px",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "15px", color: C.subtext0, marginTop: "2px" }}>
            he/him · 23 · virgo
          </div>
          <div style={{ marginTop: "8px", fontFamily: "'VT323', monospace", fontSize: "14px" }}>
            <span style={{ color: C.mauve }}>mood: </span>
            <span style={{ color: C.yellow }}>✨ dreamy ✨</span>
          </div>
        </PixelBox>

        {/* Stats */}
        <PixelBox color={C.yellow} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: C.yellow, marginBottom: "8px" }}>
            ◉ VISITOR COUNT
          </div>
          <VisitorCounter />
          <div style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: C.subtext0, marginTop: "6px" }}>
            thanks for visiting!! :D
          </div>
        </PixelBox>

        {/* Now playing */}
        <PixelBox color={C.green}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: C.green, marginBottom: "8px" }}>
            ♪ NOW PLAYING
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", color: C.text, lineHeight: 1.5 }}>
            <div style={{ color: C.green }}>
              <Blink color={C.green}>▶</Blink> EDEN
            </div>
            <div style={{ color: C.subtext0 }}>start//end</div>
            <div style={{ marginTop: "6px" }}>
              <div style={{ height: "6px", background: C.surface0, border: `1px solid ${C.surface1}` }}>
                <div style={{ width: "39%", height: "100%", background: C.green }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: C.overlay1, marginTop: "2px" }}>
                <span>1:54</span><span>5:33</span>
              </div>
            </div>
          </div>
        </PixelBox>

        {/* Best viewed */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "'VT323', monospace",
            fontSize: "13px",
            color: C.overlay1,
            border: `1px dashed ${C.surface1}`,
            padding: "6px",
          }}
        >
          best viewed in 800×600<br />
          internet explorer 6.0<br />
          <Sparkle color={C.mauve} size={10} /> 16-bit color <Sparkle color={C.mauve} size={10} />
        </div>
      </div>
    </div>
  );
}

// ── Section: ABOUT ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <PixelBox color={C.mauve}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.mauve, marginBottom: "12px" }}>
          ☽ ABOUT ME ☾
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "14px", color: C.text, lineHeight: 1.8 }}>
          <p>
            hi!! i'm <span style={{ color: C.pink }}>sky99cents</span>, a mechanical engineering student with a deep love for
            the early internet aesthetic, cats, and anything that glitters.
          </p>
          <br />
          <p>
            i've been making websites since i was 12 years old on GeoCities. this is my little shrine to that era —
            a place where the web is still handmade, weird, and <span style={{ color: C.yellow }}>full of sparkles.</span>
          </p>
          <br />
          <p>
            when i'm not coding i'm probably playing video games, reading manga, or rewatching Gurenn Lagann for the 8th time.
          </p>
        </div>
      </PixelBox>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <PixelBox color={C.blue}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.blue, marginBottom: "12px" }}>
            ⚙ QUICK INFO
          </div>
          {[
            ["name", "sky99cents"],
            ["age", "23"],
            ["pronouns", "he/him"],
            ["sign", "♍ virgo"],
            ["mbti", "infp-t"],
            ["fav color", "mauve 💜"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: "8px", fontFamily: "'VT323', monospace", fontSize: "17px", borderBottom: `1px solid ${C.surface0}`, padding: "3px 0" }}>
              <span style={{ color: C.subtext0, minWidth: "80px" }}>{k}:</span>
              <span style={{ color: C.text }}>{v}</span>
            </div>
          ))}
        </PixelBox>

        <PixelBox color={C.peach}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.peach, marginBottom: "10px" }}>
            ♡ LIKES & DISLIKES
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.green, marginBottom: "4px" }}>✓ LIKES</div>
              {["cats 🐱", "stars ✨", "caffeine ⚡", "pixel art", "j-fashion", "late nights"].map((i) => (
                <div key={i} style={{ fontFamily: "'VT323', monospace", fontSize: "15px", color: C.text }}>▸ {i}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.red, marginBottom: "4px" }}>✗ DISLIKES</div>
              {["hot weather", "loud noises", "serif fonts", "mondays", "slow wifi", "jumpscares"].map((i) => (
                <div key={i} style={{ fontFamily: "'VT323', monospace", fontSize: "15px", color: C.text }}>▸ {i}</div>
              ))}
            </div>
          </div>
        </PixelBox>
      </div>
    </div>
  );
}

// ── Section: SKILLS ───────────────────────────────────────────────────────────
function SkillsSection() {
  return (
    <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <PixelBox color={C.teal}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.teal, marginBottom: "12px" }}>
          &lt;/&gt; CODING SKILLS
        </div>
        {[
          { label: "HTML / CSS", value: 95, color: C.peach },
          { label: "JavaScript", value: 80, color: C.yellow },
          { label: "React", value: 75, color: C.blue },
          { label: "Python", value: 85, color: C.green },
          { label: "Rust", value: 40, color: C.mauve },
          { label: "SQL", value: 60, color: C.sapphire },
        ].map((s) => (
          <PixelBar key={s.label} {...s} />
        ))}
      </PixelBox>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <PixelBox color={C.pink}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.pink, marginBottom: "12px" }}>
            🎨 ART SKILLS
          </div>
          {[
            { label: "Pixel Art", value: 60, color: C.pink },
            { label: "Digital Painting", value: 60, color: C.flamingo },
            { label: "UI/UX Design", value: 80, color: C.lavender },
            { label: "3D Modeling", value: 50, color: C.rosewater },
          ].map((s) => (
            <PixelBar key={s.label} {...s} />
          ))}
        </PixelBox>

        <PixelBox color={C.mauve}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.mauve, marginBottom: "10px" }}>
            ◈ TOOLS I USE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {["VS Code", "Aseprite", "Figma", "Obsidian", "neovim", "Firefox", "Blender", "Git", "Linux", "Notion","MatLAB","Simulink","Solidworks"].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "15px",
                  background: C.surface0,
                  color: C.mauve,
                  border: `2px solid ${C.mauve}`,
                  padding: "2px 8px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </PixelBox>
      </div>
    </div>
  );
}

// ── Section: INTERESTS ────────────────────────────────────────────────────────
function InterestsSection() {
  const interests = [
    { emoji: "🌸", name: "Anime", desc: "Sailor Moon, Gurren Lagann, Madoka Magica, Neon Genesis Evangelion", color: C.pink },
    { emoji: "🎮", name: "Games", desc: "Super Mario Bros(nes), Stardew Valley, Disco Elysium, Hollow Knight, OSU!", color: C.blue },
    { emoji: "🎵", name: "Music", desc: "Evanescence, Car Seat Headrest, EDEN, Liquid DnB/Jungle Mix, Breakcore", color: C.mauve },
    { emoji: "📚", name: "Manga", desc: "Berserk, Oyasumi Punpun, Fruits Basket, Dungeon Meshi, Skip and Loafer", color: C.yellow },
    { emoji: "🐱", name: "Cats", desc: "I have two cats: Oreo (tabby) and Muffin (orange). They're my world <3", color: C.teal },
    { emoji: "💻", name: "Old Web", desc: "GeoCities archives, web 1.0 history, pixel fonts, blinkies, web rings", color: C.peach },
  ];
  return (
    <div>
      <PixelBox color={C.yellow} style={{ marginBottom: "16px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.yellow }}>
          <Sparkle color={C.yellow} size={10} /> MY INTERESTS <Sparkle color={C.yellow} size={10} />
        </div>
      </PixelBox>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
        {interests.map((item) => (
          <PixelBox key={item.name} color={item.color} style={{ transition: "transform 0.1s" }}
            className="interest-card"
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "32px", lineHeight: 1, minWidth: "36px" }}>{item.emoji}</div>
              <div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: item.color, marginBottom: "6px" }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", color: C.text, lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          </PixelBox>
        ))}
      </div>

      {/* Blinkies row */}
      <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {[
          { text: "CAT PERSON", bg: C.teal, fg: C.crust },
          { text: "ANIME NERD", bg: C.pink, fg: C.crust },
          { text: "LINUX USER", bg: C.mauve, fg: C.crust },
          { text: "PIXEL LOVER", bg: C.blue, fg: C.crust },
          { text: "NIGHT OWL 🌙", bg: C.surface0, fg: C.lavender },
          { text: "INFP", bg: C.peach, fg: C.crust },
          { text: "VIDEO GAME PRESERVATION", bg: C.sapphire, fg: C.crust }
        ].map((b) => (
          <div
            key={b.text}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "7px",
              background: b.bg,
              color: b.fg,
              padding: "3px 8px",
              border: `2px solid ${C.crust}`,
              boxShadow: `2px 2px 0 ${C.crust}`,
              lineHeight: 1.8,
              cursor: "default",
            }}
          >
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section: GUESTBOOK ────────────────────────────────────────────────────────
const INITIAL_ENTRIES = [
  { name: "starrysakura", color: C.pink, date: "jun 14 2026", msg: "omg your page is so cute!! i love the star background!! following u on neocities <3" },
  { name: "voidwalker99", color: C.mauve, date: "jun 12 2026", msg: "DUDE we have the same taste in games... Disco Elysium and Celeste my beloved 🖤 come visit my page!!" },
  { name: "pixeldreamer", color: C.blue, date: "jun 09 2026", msg: "found u through the catppuccin web ring!! your pixel art skills are incredible, the aseprite work is 🔥" },
  { name: "mooncat777", color: C.teal, date: "jun 07 2026", msg: "OREO AND MUFFIN NEED TO MEET MY CAT LUNA. anyway your site is gorgeous!!! love the y2k vibes" },
];

type GuestbookEntry = {
  name: string;
  color: string;
  date: string;
  msg: string;
};

const GUESTBOOK_STORAGE_KEY = "sky99cents-guestbook-entries";

function getGuestbookConfig() {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const url = env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  const key = env.VITE_SUPABASE_ANON_KEY;

  return url && key ? { url, key } : null;
}

function formatGuestbookDate() {
  return new Date()
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .replace(",", "")
    .toLowerCase();
}

function readLocalGuestbook() {
  try {
    const stored = window.localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (!stored) return INITIAL_ENTRIES;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : INITIAL_ENTRIES;
  } catch {
    return INITIAL_ENTRIES;
  }
}

function saveLocalGuestbook(entries: GuestbookEntry[]) {
  try {
    window.localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Private browsing or full storage should not break signing the guestbook.
  }
}

async function loadGuestbookEntries() {
  const config = getGuestbookConfig();
  if (!config) return readLocalGuestbook();

  const response = await fetch(
    `${config.url}/rest/v1/guestbook_entries?select=name,color,date,msg&order=created_at.desc&limit=50`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
    }
  );

  if (!response.ok) throw new Error("Could not load guestbook entries.");
  const entries = await response.json();

  return Array.isArray(entries) && entries.length > 0 ? entries : INITIAL_ENTRIES;
}

async function saveGuestbookEntry(entry: GuestbookEntry, currentEntries: GuestbookEntry[]) {
  const config = getGuestbookConfig();
  if (!config) {
    const entries = [entry, ...currentEntries];
    saveLocalGuestbook(entries);
    return entry;
  }

  const response = await fetch(`${config.url}/rest/v1/guestbook_entries`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) throw new Error("Could not save guestbook entry.");
  const entries = await response.json();

  return entries[0] ?? entry;
}

function GuestbookSection() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const colors = [C.pink, C.mauve, C.blue, C.teal, C.green, C.yellow, C.peach];

  useEffect(() => {
    let active = true;

    loadGuestbookEntries()
      .then((loadedEntries) => {
        if (active) setEntries(loadedEntries);
      })
      .catch(() => {
        if (active) setError("guestbook storage is offline, try again later");
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim() || isSaving) return;

    const newEntry = {
      name: name.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      date: formatGuestbookDate(),
      msg: msg.trim(),
    };

    setIsSaving(true);
    setError("");

    try {
      const savedEntry = await saveGuestbookEntry(newEntry, entries);
      setEntries([savedEntry, ...entries]);
      setName("");
      setMsg("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("message could not be saved, try again in a bit");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="guestbook-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "16px", alignItems: "start" }}>
      {/* Entries */}
      <div>
        <PixelBox color={C.mauve} style={{ marginBottom: "12px" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: C.mauve }}>
            ✉ GUESTBOOK ({entries.length} entries)
          </div>
        </PixelBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {entries.map((e, i) => (
            <PixelBox key={i} color={e.color} bg={C.mantle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", color: e.color, fontWeight: 700 }}>
                  {e.name}
                </span>
                <span style={{ fontFamily: "'VT323', monospace", fontSize: "14px", color: C.overlay1 }}>
                  {e.date}
                </span>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "13px", color: C.text, lineHeight: 1.6 }}>
                {e.msg}
              </div>
            </PixelBox>
          ))}
        </div>
      </div>

      {/* Form */}
      <div>
        <PixelBox color={C.pink}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: C.pink, marginBottom: "12px" }}>
            ✍ LEAVE A MESSAGE
          </div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <label style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.subtext0, display: "block", marginBottom: "3px" }}>
                your name:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                style={{
                  width: "100%",
                  background: C.surface0,
                  border: `2px solid ${C.pink}`,
                  color: C.text,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "13px",
                  padding: "5px 8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.subtext0, display: "block", marginBottom: "3px" }}>
                your message:
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                maxLength={200}
                rows={4}
                style={{
                  width: "100%",
                  background: C.surface0,
                  border: `2px solid ${C.pink}`,
                  color: C.text,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "13px",
                  padding: "5px 8px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "9px",
                background: C.pink,
                color: C.crust,
                border: "none",
                padding: "8px",
                cursor: isSaving ? "wait" : "pointer",
                opacity: isSaving ? 0.75 : 1,
                boxShadow: `3px 3px 0 ${C.maroon}`,
                transition: "transform 0.1s",
              }}
              onMouseDown={(e) => { (e.currentTarget.style.transform = "translate(2px, 2px)"); (e.currentTarget.style.boxShadow = "1px 1px 0 " + C.maroon); }}
              onMouseUp={(e) => { (e.currentTarget.style.transform = ""); (e.currentTarget.style.boxShadow = "3px 3px 0 " + C.maroon); }}
            >
              SIGN GUESTBOOK ♡
            </button>
            {error && (
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "17px", color: C.red, textAlign: "center" }}>
                {error}
              </div>
            )}
            {submitted && (
              <div style={{ fontFamily: "'VT323', monospace", fontSize: "17px", color: C.green, textAlign: "center" }}>
                ✓ entry added!! thank u!! <Sparkle color={C.yellow} size={12} />
              </div>
            )}
          </form>
        </PixelBox>

        {/* Affiliation badges */}
        <PixelBox color={C.teal} style={{ marginTop: "12px" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: C.teal, marginBottom: "10px" }}>
            ◈ AFFILIATES (placeholders)
          </div>
          {["mooncat777", "starrysakura", "bytewitch", "nocturnaldev"].map((a) => (
            <div key={a} style={{ fontFamily: "'VT323', monospace", fontSize: "17px", color: C.blue, display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkle color={C.teal} size={8} />
              {a}.neocities.org
            </div>
          ))}
        </PixelBox>
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("HOME");

  const sections: Record<string, React.ReactNode> = {
    HOME: <HomeSection />,
    ABOUT: <AboutSection />,
    SKILLS: <SkillsSection />,
    INTERESTS: <InterestsSection />,
    GUESTBOOK: <GuestbookSection />,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.base, color: C.text, position: "relative", display: "flex", flexDirection: "column" }}>
      <StarField />

      <style>{`
        @keyframes marquee { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }
        @keyframes twinkle { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.3); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes glitch {
          0%, 90%, 100% { clip-path: none; transform: none; }
          91% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(-3px); color: #f38ba8; }
          93% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(3px); color: #89b4fa; }
          95% { clip-path: none; transform: none; }
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          animation: glitch 4s infinite;
          color: #f38ba8;
          pointer-events: none;
        }
        .interest-card:hover { transform: translate(-2px, -2px); }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${C.crust}; }
        ::-webkit-scrollbar-thumb { background: ${C.mauve}; border: 2px solid ${C.crust}; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.pink}; }
        ::selection { background: ${C.mauve}; color: ${C.crust}; }
      `}</style>

      {/* Header */}
      <header
        className="site-header"
        style={{
          background: C.crust,
          borderBottom: `3px solid ${C.mauve}`,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="site-header-title" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "14px", color: C.mauve, textShadow: `0 0 12px ${C.mauve}` }}>
          ✦ SKY99CENTS.NET ✦
        </div>
        <div className="site-header-meta" style={{ fontFamily: "'VT323', monospace", fontSize: "16px", color: C.subtext0, display: "flex", gap: "12px" }}>
          <Blink color={C.red}>● LIVE</Blink>
          <span>☆ est. 2001</span>
          <span style={{ color: C.mauve }}>♡ made with love</span>
        </div>
      </header>

      {/* Marquee */}
      <Marquee speed={25}>
        {"★ WELCOME TO SKY99CENTS.NET ★ HOME OF CATS AND PIXELS ★ PLEASE SIGN THE GUESTBOOK ★ BEST VIEWED IN INTERNET EXPLORER 6 ★ DO NOT STEAL MY GRAPHICS ★ LINK BACK WITH LOVE ★ CATPPUCCIN MOCHA SUPREMACY ★ NEOCITIES IS FOREVER ★ ".repeat(3)}
      </Marquee>

      <NavBar active={active} setActive={setActive} />

      {/* Content */}
      <main className="site-main" style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "20px 16px", position: "relative", zIndex: 1, flex: 1, boxSizing: "border-box" }}>
        {/* Page title */}
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Sparkle color={C.mauve} size={16} />
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: C.mauve }}>
            {active}
          </span>
          <Sparkle color={C.mauve} size={16} />
          <div style={{ flex: 1, height: "2px", background: `linear-gradient(90deg, ${C.mauve}, transparent)` }} />
        </div>

        {sections[active]}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `3px solid ${C.surface0}`,
          background: C.crust,
          padding: "16px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          marginTop: "32px",
        }}
      >
        <div style={{ fontFamily: "'VT323', monospace", fontSize: "18px", color: C.subtext0, marginBottom: "6px" }}>
          <Sparkle color={C.mauve} size={10} />
          {" © 2026 sky99cents.net — all rights reserved — no hotlinking — "}
          <Sparkle color={C.mauve} size={10} />
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: C.surface2 }}>
          built with catppuccin mocha · 100% hand-coded · no AI slop · powered by spite and matcha lattes
        </div>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          {[C.rosewater, C.flamingo, C.pink, C.mauve, C.lavender, C.blue, C.sapphire, C.sky, C.teal, C.green, C.yellow, C.peach, C.maroon, C.red].map((c, i) => (
            <div key={i} style={{ width: "16px", height: "16px", background: c, border: `1px solid ${C.surface0}` }} title={c} />
          ))}
        </div>
      </footer>
    </div>
  );
}
