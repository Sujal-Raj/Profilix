"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SocialLinks {
  github?: string;
  linkedin?: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  link?: string;
  tech?: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Portfolio {
  name: string;
  title?: string;
  about?: string;
  status?: string;
  email?: string;
  userEmail?: string;
  socialLinks?: SocialLinks;
  experience?: Experience[];
  projects?: Project[];
  education?: Education[];
  skills?: string[];
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={style}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <main className="min-h-screen" style={{ background: "#FAFAFA", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav skeleton */}
      <nav style={{ background: "#F5E642", borderBottom: "3px solid #0D0D0D", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-28" />
        </div>
      </nav>
      {/* Hero skeleton */}
      <div style={{ padding: "48px 24px", borderBottom: "3px solid #0D0D0D" }}>
        <Skeleton className="h-7 w-52 mb-6" />
        <Skeleton className="h-24 w-3/4 mb-4" />
        <Skeleton className="h-7 w-1/2 mb-6" />
        <Skeleton className="h-5 w-full max-w-xl mb-2" />
        <Skeleton className="h-5 w-4/5 max-w-lg mb-8" />
        <div className="flex gap-3">
          <Skeleton className="h-12 w-44" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
      {/* Tape */}
      <Skeleton className="h-8 w-full" />
      {/* Sections */}
      {[1, 2, 3].map((s) => (
        <div key={s} style={{ padding: "40px 24px 48px", borderBottom: "3px solid #0D0D0D" }}>
          <div className="flex items-center gap-4 mb-8 pb-4" style={{ borderBottom: "3px solid #0D0D0D" }}>
            <Skeleton className="h-7 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-44" />
          </div>
          {[1, 2].map((c) => (
            <div key={c} style={{ border: "3px solid #0D0D0D", padding: "24px", marginBottom: "16px", boxShadow: "5px 5px 0 #0D0D0D" }}>
              <Skeleton className="h-6 w-56 mb-2" />
              <Skeleton className="h-5 w-36 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`@keyframes shimmer{100%{transform:translateX(100%)}}`}</style>
    </main>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (slug) {
      const readable = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      document.title = `${readable} | Portfolio`;
    }
  }, [slug]);

  useEffect(() => {
    if (portfolio?.name) document.title = `${portfolio.name} | Portfolio`;
  }, [portfolio]);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const res = await fetch(`/api/v1/user/${slug}`, { method: "GET", cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch portfolio");
        setPortfolio(data.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };
    getPortfolio();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <PortfolioSkeleton />;

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              border: "3px solid #0D0D0D",
              background: "#F5E642",
              padding: "48px",
              boxShadow: "8px 8px 0 #0D0D0D",
              maxWidth: "440px",
            }}
          >
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 600, marginBottom: "16px", letterSpacing: "2px" }}>
              ERROR 404
            </p>
            <h1 style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-1px", marginBottom: "12px" }}>
              PORTFOLIO NOT FOUND
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "#555" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const email = portfolio?.email || portfolio?.userEmail;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <main style={{ minHeight: "100vh", background: "#FAFAFA", color: "#0D0D0D", fontFamily: "'Space Grotesk', sans-serif", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#F5E642",
            borderBottom: "3px solid #0D0D0D",
            transition: "box-shadow 0.3s",
            boxShadow: scrolled ? "0 4px 0 #0D0D0D" : "none",
          }}
        >
          <nav
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-0.5px" }}>
              {portfolio?.name?.toUpperCase()}
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {portfolio?.socialLinks?.github && (
                <NavIconBtn href={portfolio.socialLinks.github} label="GH" />
              )}
              {portfolio?.socialLinks?.linkedin && (
                <NavIconBtn href={portfolio.socialLinks.linkedin} label="LI" />
              )}
              {email && (
                <a href={`mailto:${email}`} style={navBtnStyle}>
                  ✉ CONTACT
                </a>
              )}
            </div>
          </nav>
        </header>

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* ── HERO ── */}
          <section
            style={{
              padding: "48px 24px",
              borderBottom: "3px solid #0D0D0D",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background ghost text */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "-10px",
                top: "20px",
                fontSize: "clamp(80px, 18vw, 150px)",
                fontWeight: 900,
                color: "transparent",
                WebkitTextStroke: "2px #e0e0e0",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-6px",
              }}
            >
              DEV
            </span>

            {/* Status badge */}
            <div style={statusTagStyle}>
              <span style={statusDotStyle} />
              {portfolio?.status?.toUpperCase() || "OPEN TO WORK — AVAILABLE NOW"}
            </div>

            <h1
              style={{
                fontSize: "clamp(52px, 10vw, 88px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-3px",
                marginBottom: "4px",
              }}
            >
              {portfolio?.name?.toUpperCase()}
            </h1>

            {portfolio?.title && (
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "clamp(15px, 2.5vw, 20px)",
                  fontWeight: 500,
                  color: "#555",
                  marginBottom: "20px",
                  borderLeft: "5px solid #F5E642",
                  paddingLeft: "12px",
                }}
              >
                {portfolio.title}
              </p>
            )}

            {portfolio?.about && (
              <p style={{ fontSize: "16px", maxWidth: "560px", lineHeight: 1.7, marginBottom: "32px", color: "#333" }}>
                {portfolio.about}
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {email && (
                <a href={`mailto:${email}`} style={btnPrimaryStyle}>
                  ✉ GET IN TOUCH →
                </a>
              )}
              <a href="#projects" style={btnGhostStyle}>
                ↓ VIEW PROJECTS
              </a>
            </div>
          </section>

          {/* ── TICKER TAPE ── */}
          <div style={tapeStyle}>
            ▶ WORK EXPERIENCE &nbsp;&nbsp;&nbsp; ▶ PROJECTS &nbsp;&nbsp;&nbsp; ▶ EDUCATION &nbsp;&nbsp;&nbsp; ▶ SKILLS &nbsp;&nbsp;&nbsp;
            ▶ WORK EXPERIENCE &nbsp;&nbsp;&nbsp; ▶ PROJECTS &nbsp;&nbsp;&nbsp; ▶ SKILLS
          </div>

          {/* ── EXPERIENCE ── */}
          {portfolio?.experience && portfolio.experience.length > 0 && (
            <section style={sectionStyle} id="work">
              <SectionHeader num="01" icon="💼" title="EXPERIENCE" />
              {portfolio.experience.map((exp, i) => (
                <ExperienceCard key={i} exp={exp} />
              ))}
            </section>
          )}

          {/* ── PROJECTS ── */}
          {portfolio?.projects && portfolio.projects.length > 0 && (
            <section style={sectionStyle} id="projects">
              <SectionHeader num="02" icon="⚙" title="FEATURED PROJECTS" />
              {portfolio.projects.map((proj, i) => (
                <ProjectCard key={i} proj={proj} />
              ))}
            </section>
          )}

          {/* ── EDUCATION ── */}
          {portfolio?.education && portfolio.education.length > 0 && (
            <section style={sectionStyle} id="education">
              <SectionHeader num="03" icon="🎓" title="EDUCATION" />
              {portfolio.education.map((edu, i) => (
                <EducationCard key={i} edu={edu} />
              ))}
            </section>
          )}

          {/* ── SKILLS ── */}
          {portfolio?.skills && portfolio.skills.length > 0 && (
            <section style={sectionStyle} id="skills">
              <SectionHeader num="04" icon="⚡" title="SKILLS & TECH" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {portfolio.skills.map((skill, i) => (
                  <SkillTag key={i} skill={skill} />
                ))}
              </div>
            </section>
          )}

          <div style={{ height: "40px" }} />

          {/* ── CTA ── */}
          <div style={{ padding: "0 24px" }}>
            <div style={ctaSectionStyle}>
              {/* Rotated stamp */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  border: "3px solid #F5E642",
                  padding: "8px 14px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  color: "#F5E642",
                  letterSpacing: "2px",
                  fontWeight: 600,
                  transform: "rotate(6deg)",
                }}
              >
                OPEN FOR HIRE
              </div>

              <h2
                style={{
                  fontSize: "clamp(32px, 6vw, 56px)",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                LET&apos;S BUILD<br />
                <span style={{ color: "#F5E642" }}>SOMETHING.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "14px",
                  color: "#aaa",
                  marginBottom: "36px",
                  maxWidth: "480px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Always excited to work on new projects and collaborate with sharp people. Don&apos;t be shy.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                {email && (
                  <a href={`mailto:${email}`} style={btnYellowStyle}>
                    ✉ SEND AN EMAIL →
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={btnOutlineWhiteStyle}
                  >
                    ↗ LINKEDIN
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer
            style={{
              borderTop: "3px solid #0D0D0D",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              background: "#F5E642",
              marginTop: "0",
            }}
          >
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500 }}>
              © 2024 {portfolio?.name?.toUpperCase()} — ALL RIGHTS RESERVED
            </span>
            <div style={{ display: "flex", gap: "16px" }}>
              {portfolio?.socialLinks?.github && (
                <FooterLink href={portfolio.socialLinks.github} label="GITHUB" />
              )}
              {portfolio?.socialLinks?.linkedin && (
                <FooterLink href={portfolio.socialLinks.linkedin} label="LINKEDIN" />
              )}
              {email && <FooterLink href={`mailto:${email}`} label="EMAIL" />}
            </div>
          </footer>
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
          @keyframes shimmer { 100% { transform: translateX(100%); } }
          @keyframes brutalist-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
        `}</style>
      </main>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ num, icon, title }: { num: string; icon: string; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "32px",
        paddingBottom: "16px",
        borderBottom: "3px solid #0D0D0D",
      }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          fontWeight: 600,
          background: "#0D0D0D",
          color: "#F5E642",
          padding: "6px 12px",
          marginRight: "16px",
          borderRight: "3px solid #0D0D0D",
        }}
      >
        {num}
      </span>
      <div
        style={{
          width: "42px",
          height: "42px",
          border: "3px solid #0D0D0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "16px",
          flexShrink: 0,
          fontSize: "18px",
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-1px" }}>{title}</h2>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div
      style={{
        border: "3px solid #0D0D0D",
        padding: "24px",
        marginBottom: "16px",
        background: "#FAFAFA",
        boxShadow: "5px 5px 0 #0D0D0D",
        position: "relative",
        transition: "transform 0.12s, box-shadow 0.12s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(-3px, -3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0 #0D0D0D";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0 #0D0D0D";
      }}
    >
      {/* Yellow left accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "5px", height: "100%", background: "#F5E642" }} />
      <div style={{ paddingLeft: "8px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{exp.role}</h3>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "#555", marginBottom: "8px" }}>
          {exp.company.toUpperCase()}
        </p>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            fontWeight: 600,
            background: "#0D0D0D",
            color: "#FAFAFA",
            display: "inline-block",
            padding: "3px 10px",
            marginBottom: "12px",
          }}
        >
          {exp.duration.toUpperCase()}
        </span>
        <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.7 }}>{exp.description}</p>
      </div>
    </div>
  );
}

function ProjectCard({ proj }: { proj: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => proj.link && window.open(proj.link, "_blank")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid #0D0D0D",
        padding: "24px",
        marginBottom: "16px",
        background: hovered ? "#F5E642" : "#FAFAFA",
        boxShadow: hovered ? "8px 8px 0 #0D0D0D" : "5px 5px 0 #0D0D0D",
        transform: hovered ? "translate(-3px, -3px)" : "translate(0, 0)",
        cursor: proj.link ? "pointer" : "default",
        transition: "background 0.12s, transform 0.12s, box-shadow 0.12s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 700 }}>{proj.title}</h3>
        {proj.link ? (
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              border: "2px solid #0D0D0D",
              padding: "4px 10px",
              background: "#0D0D0D",
              color: "#FAFAFA",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            ↗ LIVE
          </span>
        ) : (
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              border: "2px solid #ccc",
              padding: "4px 10px",
              color: "#888",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            PRIVATE
          </span>
        )}
      </div>
      <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.7, marginBottom: "16px" }}>{proj.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {proj.tech?.map((tech, j) => (
          <span
            key={j}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 500,
              border: "2px solid #0D0D0D",
              padding: "4px 10px",
              background: hovered ? "#0D0D0D" : "#FAFAFA",
              color: hovered ? "#F5E642" : "#0D0D0D",
              transition: "background 0.12s, color 0.12s",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function EducationCard({ edu }: { edu: Education }) {
  return (
    <div
      style={{
        border: "3px solid #0D0D0D",
        padding: "24px",
        marginBottom: "16px",
        background: "#FAFAFA",
        boxShadow: "5px 5px 0 #0D0D0D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        transition: "transform 0.12s, box-shadow 0.12s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(-3px, -3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0 #0D0D0D";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0 #0D0D0D";
      }}
    >
      <div>
        <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "4px" }}>{edu.degree}</h3>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "13px", color: "#555" }}>
          {edu.school.toUpperCase()}
        </p>
      </div>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          fontWeight: 600,
          border: "3px solid #0D0D0D",
          padding: "6px 16px",
          background: "#F5E642",
          boxShadow: "3px 3px 0 #0D0D0D",
          whiteSpace: "nowrap",
        }}
      >
        {edu.year}
      </span>
    </div>
  );
}

function SkillTag({ skill }: { skill: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "12px",
        fontWeight: 600,
        border: "3px solid #0D0D0D",
        padding: "8px 18px",
        background: hovered ? "#F5E642" : "#FAFAFA",
        boxShadow: hovered ? "5px 5px 0 #0D0D0D" : "3px 3px 0 #0D0D0D",
        transform: hovered ? "translate(-2px, -2px)" : "translate(0,0)",
        transition: "background 0.12s, transform 0.12s, box-shadow 0.12s",
        cursor: "default",
        display: "inline-block",
      }}
    >
      {skill}
    </span>
  );
}

function NavIconBtn({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid #0D0D0D",
        padding: "6px 12px",
        background: hovered ? "#0D0D0D" : "#FAFAFA",
        color: hovered ? "#F5E642" : "#0D0D0D",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hovered ? "5px 5px 0 #555" : "3px 3px 0 #555",
        transform: hovered ? "translate(-2px, -2px)" : "translate(0,0)",
        transition: "background 0.1s, color 0.1s, transform 0.1s, box-shadow 0.1s",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        fontWeight: 700,
      }}
    >
      {label}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "11px",
        fontWeight: 600,
        textDecoration: "none",
        color: "#0D0D0D",
        borderBottom: hovered ? "none" : "2px solid #0D0D0D",
        padding: hovered ? "2px 6px" : "0 0 1px 0",
        background: hovered ? "#0D0D0D" : "transparent",
        transition: "background 0.1s, color 0.1s, padding 0.1s",
      }}
    >
      {label}
    </a>
  );
}

// ─── Style constants ───────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  borderBottom: "3px solid #0D0D0D",
  padding: "40px 24px 48px",
};

const tapeStyle: React.CSSProperties = {
  background: "#0D0D0D",
  color: "#F5E642",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "3px",
  padding: "8px 24px",
  borderBottom: "3px solid #0D0D0D",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

const statusTagStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "11px",
  fontWeight: 600,
  border: "3px solid #0D0D0D",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 14px",
  background: "#F5E642",
  marginBottom: "24px",
  boxShadow: "3px 3px 0 #0D0D0D",
};

const statusDotStyle: React.CSSProperties = {
  width: "8px",
  height: "8px",
  background: "#0D0D0D",
  display: "inline-block",
  animation: "brutalist-blink 1.2s step-end infinite",
  flexShrink: 0,
};

const navBtnStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "11px",
  fontWeight: 600,
  border: "3px solid #0D0D0D",
  padding: "6px 14px",
  background: "#0D0D0D",
  color: "#FAFAFA",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "3px 3px 0 #555",
};

const btnPrimaryStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "13px",
  fontWeight: 600,
  border: "3px solid #0D0D0D",
  padding: "12px 24px",
  background: "#0D0D0D",
  color: "#FAFAFA",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "5px 5px 0 #0D0D0D",
};

const btnGhostStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "13px",
  fontWeight: 600,
  border: "3px solid #0D0D0D",
  padding: "12px 24px",
  background: "#FAFAFA",
  color: "#0D0D0D",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "5px 5px 0 #0D0D0D",
};

const ctaSectionStyle: React.CSSProperties = {
  border: "3px solid #0D0D0D",
  padding: "48px 32px",
  background: "#0D0D0D",
  color: "#FAFAFA",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  boxShadow: "8px 8px 0 #F5E642",
};

const btnYellowStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "13px",
  fontWeight: 700,
  border: "3px solid #F5E642",
  padding: "12px 28px",
  background: "#F5E642",
  color: "#0D0D0D",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "5px 5px 0 #F5E642aa",
};

const btnOutlineWhiteStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "13px",
  fontWeight: 700,
  border: "3px solid #FAFAFA",
  padding: "12px 28px",
  background: "transparent",
  color: "#FAFAFA",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "5px 5px 0 #ffffff33",
};