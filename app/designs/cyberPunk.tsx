"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  Calendar,
  Award,
  Terminal,
  Zap,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   TYPES  (unchanged)
───────────────────────────────────────────────────────────── */
interface SocialLinks { github?: string; linkedin?: string; }
interface Experience { role: string; company: string; duration: string; description: string; }
interface Project { title: string; description: string; link?: string; tech?: string[]; }
interface Education { degree: string; school: string; year: string; }
interface Portfolio {
  name: string; title?: string; about?: string; status?: string;
  email?: string; userEmail?: string; socialLinks?: SocialLinks;
  experience?: Experience[]; projects?: Project[];
  education?: Education[]; skills?: string[];
}

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const C = {
  void:    "#050510",
  panel:   "#0A0A1A",
  surface: "#0F0F20",
  border:  "#1A1A3A",
  cyan:    "#00F5FF",
  cyanDim: "rgba(0,245,255,0.12)",
  cyanGlow:"rgba(0,245,255,0.35)",
  red:     "#FF003C",
  redDim:  "rgba(255,0,60,0.12)",
  violet:  "#7B00FF",
  text:    "#C8D8E8",
  muted:   "rgba(200,216,232,0.4)",
  dim:     "rgba(200,216,232,0.18)",
};

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body { background: #050510; font-family: 'Rajdhani', sans-serif; color: #C8D8E8; }

  /* ── Glitch hero ── */
  @keyframes glitch-main {
    0%,100%   { clip-path: inset(0 0 100% 0); transform: none; }
    4%         { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px) skewX(-1deg); }
    8%         { clip-path: inset(40% 0 30% 0); transform: translate(4px,-2px) skewX(1deg); }
    12%        { clip-path: inset(70% 0 5%  0); transform: translate(-2px,1px); }
    16%,100%   { clip-path: inset(0 0 100% 0); transform: none; }
  }
  @keyframes glitch-red {
    0%,100%  { clip-path: inset(0 0 100% 0); opacity:0; }
    5%        { clip-path: inset(20% 0 50% 0); opacity:0.7; transform: translate(6px,0); }
    10%       { clip-path: inset(60% 0 15% 0); opacity:0.5; transform: translate(-6px,0); }
    14%,100%  { clip-path: inset(0 0 100% 0); opacity:0; }
  }
  @keyframes glitch-cyan {
    0%,100%  { clip-path: inset(0 0 100% 0); opacity:0; }
    6%        { clip-path: inset(35% 0 40% 0); opacity:0.6; transform: translate(-8px,0); }
    11%       { clip-path: inset(75% 0 3%  0); opacity:0.4; transform: translate(8px,0); }
    15%,100%  { clip-path: inset(0 0 100% 0); opacity:0; }
  }

  /* ── Scan line sweep ── */
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  /* ── HUD pulse border ── */
  @keyframes hud-pulse {
    0%,100% { opacity: 0.6; }
    50%     { opacity: 1; }
  }

  /* ── Ticker march ── */
  @keyframes tick-march {
    0%   { background-position: 0 0; }
    100% { background-position: 32px 0; }
  }

  /* ── Fade-slide in ── */
  @keyframes fadeSlideIn {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── Cursor blink ── */
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

  /* ── Corner tick ── */
  @keyframes corner-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .glitch-wrapper { position: relative; display: inline-block; line-height: 1; }
  .glitch-layer-r {
    position: absolute; inset: 0;
    color: #FF003C;
    animation: glitch-red 6s infinite 1s;
    pointer-events: none;
  }
  .glitch-layer-c {
    position: absolute; inset: 0;
    color: #00F5FF;
    animation: glitch-cyan 6s infinite 1.2s;
    pointer-events: none;
  }

  .scanline-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,245,255,0.015) 2px,
      rgba(0,245,255,0.015) 4px
    );
    pointer-events: none;
  }
  .scan-sweep {
    position: fixed; left:0; right:0; height: 3px; z-index: 9998;
    background: linear-gradient(180deg, transparent, rgba(0,245,255,0.4), transparent);
    animation: scanline 8s linear infinite;
    pointer-events: none;
  }

  .hud-corner {
    position: absolute;
    width: 14px; height: 14px;
    border-color: #00F5FF;
    border-style: solid;
    opacity: 0.8;
    animation: hud-pulse 3s ease-in-out infinite;
  }
  .hud-tl { top:0; left:0;  border-width: 2px 0 0 2px; }
  .hud-tr { top:0; right:0; border-width: 2px 2px 0 0; }
  .hud-bl { bottom:0; left:0;  border-width: 0 0 2px 2px; }
  .hud-br { bottom:0; right:0; border-width: 0 2px 2px 0; }

  .ticker-border {
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      #00F5FF 0px, #00F5FF 8px,
      transparent 8px, transparent 16px,
      #7B00FF 16px, #7B00FF 24px,
      transparent 24px, transparent 32px
    );
    background-size: 32px 2px;
    animation: tick-march 1.2s linear infinite;
  }

  .clip-card {
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
  }
  .clip-card-sm {
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  }
  .clip-btn {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  .mono { font-family: 'Share Tech Mono', monospace; }

  .fade-in { animation: fadeSlideIn 0.7s cubic-bezier(0.25,0.1,0.25,1) both; }
  .cursor::after { content:'_'; animation: blink 1s step-end infinite; }

  .skill-tag:hover { background: rgba(0,245,255,0.15); border-color: #00F5FF; color: #00F5FF; }
  .exp-card:hover  { border-color: rgba(0,245,255,0.5); background: rgba(0,245,255,0.04); }
  .proj-card:hover { border-color: rgba(0,245,255,0.5); }
  .proj-card:hover .proj-num { color: #00F5FF; text-shadow: 0 0 30px rgba(0,245,255,0.6); }

  .nav-link { position:relative; }
  .nav-link::after {
    content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px;
    background:#00F5FF; transform:scaleX(0); transform-origin:left;
    transition: transform 0.25s ease;
  }
  .nav-link:hover::after { transform:scaleX(1); }

  /* shimmer for skeleton */
  @keyframes shimmer { 100% { transform: translateX(100%); } }
`;

/* ─────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────── */
function Sk({ w = "100%", h = "1rem", r = "4px" }: { w?: string; h?: string; r?: string }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r, background: "#0F0F20", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", inset:0, transform:"translateX(-100%)", animation:"shimmer 1.6s infinite", background:"linear-gradient(90deg,transparent,rgba(0,245,255,0.05),transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HUD CORNERS decorator
───────────────────────────────────────────────────────────── */
function HudCorners() {
  return (
    <>
      <span className="hud-corner hud-tl" />
      <span className="hud-corner hud-tr" />
      <span className="hud-corner hud-bl" />
      <span className="hud-corner hud-br" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION EYEBROW tag
───────────────────────────────────────────────────────────── */
function SysTag({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"2rem" }}>
      <span className="mono" style={{ color: C.cyan, fontSize:"0.7rem", letterSpacing:"0.2em" }}>
        [ SYS_{label.toUpperCase().replace(/\s/g,"_")} //
      </span>
      {icon && <span style={{ color: C.cyan }}>{icon}</span>}
      <span className="mono" style={{ color: C.muted, fontSize:"0.7rem" }}>INITIALIZED ]</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FADE-IN on scroll
───────────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { rootMargin: "0px 0px -50px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.25,0.1,0.25,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLITCH HERO NAME — the signature element
───────────────────────────────────────────────────────────── */
function GlitchName({ name }: { name: string }) {
  return (
    <div className="glitch-wrapper" style={{ display:"block", lineHeight:0.9 }}>
      <h1 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(4rem,14vw,13rem)", letterSpacing:"-0.02em", textTransform:"uppercase", color: C.text, lineHeight:0.9 }}>
        {name}
      </h1>
      <div className="glitch-layer-r" aria-hidden style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(4rem,14vw,13rem)", letterSpacing:"-0.02em", textTransform:"uppercase", lineHeight:0.9 }}>
        {name}
      </div>
      <div className="glitch-layer-c" aria-hidden style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(4rem,14vw,13rem)", letterSpacing:"-0.02em", textTransform:"uppercase", lineHeight:0.9 }}>
        {name}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADING with cyan left-bar
───────────────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"3rem" }}>
      <div style={{ width:"4px", height:"3rem", background:`linear-gradient(180deg, ${C.cyan}, ${C.violet})`, borderRadius:"2px", flexShrink:0 }} />
      <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(2rem,5vw,3.5rem)", textTransform:"uppercase", letterSpacing:"0.05em", color: C.text }}>
        {children}
      </h2>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA BUTTON — clipped polygon cyberpunk style
───────────────────────────────────────────────────────────── */
function CyberBtn({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="clip-btn"
      style={{
        display:"inline-flex", alignItems:"center", gap:"8px",
        padding:"0.75rem 2rem",
        fontFamily:"'Share Tech Mono',monospace",
        fontSize:"0.8rem", letterSpacing:"0.1em", textDecoration:"none",
        textTransform:"uppercase",
        color: primary ? C.void : (hov ? C.cyan : C.text),
        background: primary
          ? (hov ? "#00dde8" : C.cyan)
          : (hov ? C.cyanDim : "transparent"),
        border: `1px solid ${primary ? C.cyan : (hov ? C.cyan : C.border)}`,
        transition:"all 0.2s ease",
        fontWeight: 600,
        boxShadow: primary && hov ? `0 0 24px ${C.cyanGlow}` : "none",
      }}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────────────────────────────── */
function ExpCard({ exp, index }: { exp: Experience; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={index * 0.08}>
      <div
        className="exp-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:"relative", padding:"1.75rem 2rem",
          background: hov ? "rgba(0,245,255,0.03)" : C.panel,
          border: `1px solid ${hov ? "rgba(0,245,255,0.4)" : C.border}`,
          transition:"all 0.25s ease",
          marginBottom:"1px",
        }}
      >
        <HudCorners />
        {/* Index badge */}
        <span className="mono" style={{ position:"absolute", top:"1rem", right:"1.5rem", fontSize:"0.65rem", color: C.dim, letterSpacing:"0.15em" }}>
          /{String(index + 1).padStart(2,"0")}
        </span>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", marginBottom:"0.75rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexWrap:"wrap" }}>
            <ChevronRight size={14} color={C.cyan} style={{ flexShrink:0 }} />
            <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(1.1rem,2.5vw,1.5rem)", textTransform:"uppercase", letterSpacing:"0.05em", color: C.text }}>
              {exp.role}
            </h3>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem" }}>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.78rem", color: C.cyan, letterSpacing:"0.08em" }}>
              {exp.company}
            </span>
            <span style={{ display:"flex", alignItems:"center", gap:"5px", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color: C.muted }}>
              <Calendar size={12} /> {exp.duration}
            </span>
          </div>
        </div>
        <div style={{ width:"100%", height:"1px", background:`linear-gradient(90deg, ${C.cyan}, transparent)`, marginBottom:"0.75rem", opacity:0.3 }} />
        <p style={{ fontSize:"clamp(0.85rem,1.5vw,0.95rem)", color: C.muted, lineHeight:1.7, fontWeight:400 }}>
          {exp.description}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD — clipped corner, full row
───────────────────────────────────────────────────────────── */
function ProjectCard({ proj, index }: { proj: Project; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className="proj-card clip-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:"relative",
          background: C.panel,
          border: `1px solid ${hov ? "rgba(0,245,255,0.5)" : C.border}`,
          padding:"2rem 2.5rem",
          transition:"border-color 0.25s ease, background 0.25s ease",
          marginBottom:"2px",
        }}
      >
        {/* Top row */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem", marginBottom:"1.25rem", flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"1.25rem" }}>
            <span className="proj-num mono" style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:700, color: hov ? C.cyan : "rgba(200,216,232,0.15)", transition:"color 0.3s ease, text-shadow 0.3s ease", lineHeight:1 }}>
              {String(index + 1).padStart(2,"0")}
            </span>
            <div>
              <p className="mono" style={{ fontSize:"0.65rem", letterSpacing:"0.2em", color: C.muted, textTransform:"uppercase", marginBottom:"0.2rem" }}>
                // PROJECT
              </p>
              <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(1.2rem,3vw,1.8rem)", textTransform:"uppercase", letterSpacing:"0.04em", color: C.text }}>
                {proj.title}
              </h3>
            </div>
          </div>
          {proj.link && (
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-btn"
              style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"0.5rem 1.25rem", border:`1px solid ${hov ? C.cyan : C.border}`, color: hov ? C.cyan : C.muted, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", letterSpacing:"0.1em", textDecoration:"none", textTransform:"uppercase", transition:"all 0.25s ease", flexShrink:0 }}
            >
              EXECUTE <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="ticker-border" style={{ marginBottom:"1.25rem", opacity: hov ? 1 : 0.4, transition:"opacity 0.3s ease" }} />

        <p style={{ fontSize:"clamp(0.85rem,1.5vw,0.98rem)", color: C.muted, lineHeight:1.75, maxWidth:"700px", marginBottom:"1.5rem" }}>
          {proj.description}
        </p>

        {/* Tech stack */}
        {proj.tech && proj.tech.length > 0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {proj.tech.map((t, j) => (
              <span
                key={j}
                className="mono"
                style={{ padding:"0.3rem 0.8rem", border:`1px solid rgba(123,0,255,0.4)`, color:"rgba(123,0,255,0.9)", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase", background:"rgba(123,0,255,0.07)" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────────
   EDUCATION CARD
───────────────────────────────────────────────────────────── */
function EduCard({ edu, index }: { edu: Education; index: number }) {
  return (
    <FadeIn delay={index * 0.08}>
      <div className="clip-card-sm" style={{ position:"relative", background: C.panel, border:`1px solid ${C.border}`, padding:"1.75rem 2rem", transition:"border-color 0.25s ease" }}>
        <HudCorners />
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.4rem" }}>
              <GraduationCap size={16} color={C.cyan} />
              <h3 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(1rem,2.2vw,1.35rem)", textTransform:"uppercase", letterSpacing:"0.04em", color: C.text }}>
                {edu.degree}
              </h3>
            </div>
            <p className="mono" style={{ fontSize:"0.78rem", color: C.cyan, letterSpacing:"0.08em" }}>{edu.school}</p>
          </div>
          <span className="mono clip-btn" style={{ padding:"0.4rem 1rem", border:`1px solid ${C.violet}`, color: C.violet, fontSize:"0.7rem", letterSpacing:"0.12em", flexShrink:0 }}>
            {edu.year}
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function PortfolioPage({ portfolio }: { portfolio: Portfolio }) {
  const [scrolled, setScrolled] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (portfolio?.name) document.title = `${portfolio.name} | SYS`;
  }, [portfolio]);

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 800);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const email = portfolio?.email || portfolio?.userEmail || "#";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* CRT scanline overlays */}
      {/* <div className="scanline-overlay" />
      <div className="scan-sweep" /> */}

      <div style={{ background: C.void, minHeight:"100vh", overflowX:"clip" }}>

        {/* ── NAV ── */}
        <header style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          background: scrolled ? "rgba(5,5,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition:"all 0.4s ease",
        }}>
          <nav style={{ maxWidth:"1100px", margin:"0 auto", padding:"1.25rem 2rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            {/* Wordmark */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <Terminal size={16} color={C.cyan} />
              <span className="mono" style={{ color: C.cyan, fontSize:"0.85rem", letterSpacing:"0.15em" }}>
                {(portfolio?.name || "SYS").toUpperCase().replace(/\s+/g,"_")}.EXE
              </span>
            </div>

            {/* Links */}
            <div style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
              {["Experience","Projects","Skills","Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link mono" style={{ color: C.muted, fontSize:"0.72rem", letterSpacing:"0.12em", textDecoration:"none", textTransform:"uppercase", transition:"color 0.2s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.cyan)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                >
                  {l}
                </a>
              ))}
              <div style={{ display:"flex", gap:"0.75rem" }}>
                {portfolio?.socialLinks?.github && (
                  <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, transition:"color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                    <Github size={18} />
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, transition:"color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* ── HERO ── */}
        <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"8rem 2rem 4rem", maxWidth:"1100px", margin:"0 auto", position:"relative" }}>

          {/* Grid background */}
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"60px 60px", opacity:0.3, pointerEvents:"none" }} />

          {/* Status chip */}
          <div className="fade-in mono" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.5rem", padding:"0.4rem 1rem", border:`1px solid rgba(0,245,255,0.3)`, background: C.cyanDim, width:"fit-content", fontSize:"0.7rem", letterSpacing:"0.18em", color: C.cyan, animationDelay:"0.1s" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background: C.cyan, display:"inline-block", boxShadow:`0 0 8px ${C.cyan}`, animation:"hud-pulse 2s ease-in-out infinite" }} />
            {portfolio?.status || "AVAILABLE // ACCEPTING_NEW_MISSIONS"}
          </div>

          {/* Glitch name */}
          <div className="fade-in" style={{ animationDelay:"0.2s", position:"relative", zIndex:1 }}>
            <GlitchName name={portfolio?.name || "PORTFOLIO"} />
          </div>

          {/* Title line */}
          <div className="fade-in mono" style={{ marginTop:"1rem", fontSize:"clamp(0.85rem,2vw,1.15rem)", color: C.cyan, letterSpacing:"0.15em", textTransform:"uppercase", animationDelay:"0.35s" }}>
            &gt;_ {portfolio?.title || "DEVELOPER"}
            <span className="cursor" />
          </div>

          {/* Ticker divider */}
          <div className="ticker-border fade-in" style={{ margin:"2rem 0", animationDelay:"0.45s" }} />

          {/* About + CTA row */}
          <div className="fade-in" style={{ display:"flex", flexDirection:"column", gap:"2rem", animationDelay:"0.55s" }}>
            <p style={{ fontSize:"clamp(0.9rem,1.8vw,1.05rem)", color: C.muted, lineHeight:1.8, maxWidth:"560px", fontWeight:400 }}>
              {portfolio?.about}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"center" }}>
              <CyberBtn href={`mailto:${email}`} primary>
                <Mail size={14} /> INITIATE_CONTACT
              </CyberBtn>
              <CyberBtn href={`mailto:${email}`}>
                <Zap size={14} /> DOWNLOAD_RESUME
              </CyberBtn>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mono fade-in" style={{ position:"absolute", bottom:"2rem", right:"2rem", fontSize:"0.62rem", color: C.dim, letterSpacing:"0.15em", animationDelay:"1s" }}>
            SCROLL_TO_NAVIGATE ↓
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        {portfolio?.experience && portfolio.experience.length > 0 && (
          <section id="experience" style={{ padding:"5rem 2rem", maxWidth:"1100px", margin:"0 auto" }}>
            <FadeIn>
              <SysTag label="EXPERIENCE" icon={<Briefcase size={14} />} />
              <SectionHeading>Work History</SectionHeading>
            </FadeIn>
            <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
              {portfolio.experience.map((exp, i) => (
                <ExpCard key={i} exp={exp} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── PROJECTS ── */}
        {portfolio?.projects && portfolio.projects.length > 0 && (
          <section id="projects" style={{ padding:"5rem 2rem", background: C.surface, position:"relative" }}>
            <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
              <FadeIn>
                <SysTag label="PROJECTS" icon={<Code2 size={14} />} />
                <SectionHeading>Selected Work</SectionHeading>
              </FadeIn>
              <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
                {portfolio.projects.map((proj, i) => (
                  <ProjectCard key={i} proj={proj} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── EDUCATION ── */}
        {portfolio?.education && portfolio.education.length > 0 && (
          <section id="education" style={{ padding:"5rem 2rem", maxWidth:"1100px", margin:"0 auto" }}>
            <FadeIn>
              <SysTag label="EDUCATION" icon={<GraduationCap size={14} />} />
              <SectionHeading>Education</SectionHeading>
            </FadeIn>
            <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
              {portfolio.education.map((edu, i) => (
                <EduCard key={i} edu={edu} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── SKILLS ── */}
        {portfolio?.skills && portfolio.skills.length > 0 && (
          <section id="skills" style={{ padding:"5rem 2rem", background: C.surface }}>
            <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
              <FadeIn>
                <SysTag label="SKILLS" icon={<Award size={14} />} />
                <SectionHeading>Tech Stack</SectionHeading>
              </FadeIn>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
                {portfolio.skills.map((skill, i) => (
                  <FadeIn key={i} delay={i * 0.025}>
                    <span
                      className="skill-tag mono"
                      style={{ display:"inline-block", padding:"0.55rem 1.1rem", border:`1px solid ${C.border}`, color: C.muted, fontSize:"0.72rem", letterSpacing:"0.12em", textTransform:"uppercase", background: C.panel, cursor:"default", transition:"all 0.2s ease" }}
                    >
                      {skill}
                    </span>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CONTACT CTA ── */}
        <section id="contact" style={{ padding:"5rem 2rem" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <FadeIn>
              <div className="clip-card" style={{ position:"relative", background: C.panel, border:`1px solid ${C.border}`, padding:"4rem 3rem", textAlign:"center", overflow:"hidden" }}>
                <HudCorners />

                {/* Glow blobs */}
                <div style={{ position:"absolute", top:"-80px", left:"50%", transform:"translateX(-50%)", width:"500px", height:"300px", background:`radial-gradient(ellipse, ${C.cyanDim} 0%, transparent 70%)`, pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:"-80px", right:"-60px", width:"300px", height:"200px", background:`radial-gradient(ellipse, rgba(123,0,255,0.1) 0%, transparent 70%)`, pointerEvents:"none" }} />

                <div style={{ position:"relative", zIndex:1 }}>
                  <p className="mono" style={{ fontSize:"0.7rem", letterSpacing:"0.2em", color: C.cyan, marginBottom:"1rem" }}>
                    // READY TO COLLABORATE
                  </p>
                  <h2 style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:"clamp(2rem,6vw,4rem)", textTransform:"uppercase", letterSpacing:"0.04em", color: C.text, marginBottom:"1rem" }}>
                    Let&apos;s Build Something<br />
                    <span style={{ color: C.cyan }}>Worth Remembering</span>
                  </h2>
                  <p style={{ fontSize:"clamp(0.85rem,1.5vw,1rem)", color: C.muted, lineHeight:1.75, maxWidth:"480px", margin:"0 auto 2.5rem" }}>
                    Open to new missions, freelance contracts, and full-time roles.
                    Drop a transmission and I&apos;ll respond within 24 hours.
                  </p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center" }}>
                    <CyberBtn href={`mailto:${email}`} primary>
                      <Mail size={14} /> SEND_TRANSMISSION
                    </CyberBtn>
                    {portfolio?.socialLinks?.linkedin && (
                      <CyberBtn href={portfolio.socialLinks.linkedin}>
                        <Linkedin size={14} /> CONNECT_ON_LINKEDIN
                        <ArrowUpRight size={13} />
                      </CyberBtn>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop:`1px solid ${C.border}`, padding:"1.5rem 2rem" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }} className="sm:flex-row">
            <p className="mono" style={{ fontSize:"0.65rem", color: C.dim, letterSpacing:"0.12em" }}>
              © {new Date().getFullYear()} {portfolio?.name?.toUpperCase()} // ALL_RIGHTS_RESERVED
            </p>
            <div style={{ display:"flex", gap:"1.5rem" }}>
              {portfolio?.socialLinks?.github && (
                <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize:"0.65rem", color: C.dim, letterSpacing:"0.1em", textDecoration:"none", textTransform:"uppercase", transition:"color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.dim)}>
                  GITHUB
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize:"0.65rem", color: C.dim, letterSpacing:"0.1em", textDecoration:"none", textTransform:"uppercase", transition:"color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.dim)}>
                  LINKEDIN
                </a>
              )}
              <a href={`mailto:${email}`} className="mono" style={{ fontSize:"0.65rem", color: C.dim, letterSpacing:"0.1em", textDecoration:"none", textTransform:"uppercase", transition:"color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.cyan)} onMouseLeave={e => (e.currentTarget.style.color = C.dim)}>
                EMAIL
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}