"use client";

import { useEffect, useState } from "react";
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
  MapPin,
  Sparkles,
} from "lucide-react";
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

// ─── Clay card primitive ───────────────────────────────────────────────────────
// Signature claymorphism look:
//   • Large border-radius
//   • Layered box-shadow: bottom thickness + diffuse ambient
//   • Inner top highlight via ring
//   • Presses down on hover (shadow shrinks, translates down)

function ClayCard({
  children,
  className = "",
  pressable = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  pressable?: boolean;
  onClick?: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => pressable && setPressed(true)}
      onMouseLeave={() => pressable && setPressed(false)}
      onMouseDown={() => pressable && setPressed(true)}
      onMouseUp={() => pressable && setPressed(false)}
      className={`
        bg-white rounded-3xl
        ring-1 ring-black/[0.04]
        transition-all duration-200 ease-out
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{
        boxShadow: pressed
          ? "0 2px 0 rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 8px 0 rgba(0,0,0,0.10), 0 12px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        transform: pressed ? "translateY(4px)" : "translateY(0px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Clay pill ─────────────────────────────────────────────────────────────────

function ClayPill({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold
        ring-1 transition-all duration-200
        ${
          dark
            ? "bg-[#1a1a1a] text-white ring-black/20"
            : "bg-[#f0f0f0] text-[#1a1a1a] ring-black/[0.06]"
        }
        ${className}
      `}
      style={{
        boxShadow: dark
          ? "0 4px 0 rgba(0,0,0,0.25), 0 6px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 4px 0 rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {children}
    </span>
  );
}

// ─── Clay button ───────────────────────────────────────────────────────────────

function ClayButton({
  href,
  children,
  dark = true,
  target,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  target?: string;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm
        ring-1 transition-all duration-150 ease-out
        ${
          dark
            ? "bg-[#1a1a1a] text-white ring-black/30"
            : "bg-white text-[#1a1a1a] ring-black/10"
        }
      `}
      style={{
        boxShadow: pressed
          ? dark
            ? "0 2px 0 rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 2px 0 rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
          : dark
          ? "0 6px 0 rgba(0,0,0,0.3), 0 10px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 6px 0 rgba(0,0,0,0.08), 0 10px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        transform: pressed ? "translateY(4px)" : "translateY(0px)",
      }}
    >
      {children}
    </a>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-10 h-10 rounded-2xl bg-[#1a1a1a] flex items-center justify-center ring-1 ring-black/20 shrink-0"
        style={{
          boxShadow:
            "0 5px 0 rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Icon className="w-4.5 h-4.5 text-white" size={18} />
      </div>
      <h2
        className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] tracking-tight"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function ClaySkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Nav */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div
          className="bg-white rounded-3xl px-6 py-4 flex justify-between items-center ring-1 ring-black/[0.04]"
          style={{ boxShadow: "0 8px 0 rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}
        >
          <div className="h-5 w-32 rounded-full bg-neutral-100 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-xl bg-neutral-100 animate-pulse" />
            <div className="h-8 w-8 rounded-xl bg-neutral-100 animate-pulse" />
            <div className="h-8 w-24 rounded-2xl bg-neutral-100 animate-pulse" />
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-10">
        <div
          className="bg-white rounded-3xl p-10 ring-1 ring-black/[0.04]"
          style={{ boxShadow: "0 8px 0 rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)" }}
        >
          <div className="h-7 w-48 rounded-full bg-neutral-100 animate-pulse mb-8" />
          <div className="h-16 w-3/4 rounded-2xl bg-neutral-100 animate-pulse mb-3" />
          <div className="h-8 w-1/2 rounded-2xl bg-neutral-100 animate-pulse mb-6" />
          <div className="h-4 w-full max-w-lg rounded-full bg-neutral-100 animate-pulse mb-2" />
          <div className="h-4 w-4/5 rounded-full bg-neutral-100 animate-pulse mb-8" />
          <div className="flex gap-3">
            <div className="h-12 w-40 rounded-2xl bg-neutral-100 animate-pulse" />
            <div className="h-12 w-32 rounded-2xl bg-neutral-100 animate-pulse" />
          </div>
        </div>
        {/* Cards */}
        {[1, 2].map((s) => (
          <div key={s} className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-2xl bg-neutral-200 animate-pulse" />
              <div className="h-7 w-40 rounded-2xl bg-neutral-100 animate-pulse" />
            </div>
            {[1, 2].map((c) => (
              <div
                key={c}
                className="bg-white rounded-3xl p-6 mb-4 ring-1 ring-black/[0.04] animate-pulse"
                style={{ boxShadow: "0 8px 0 rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06)" }}
              >
                <div className="h-5 w-48 rounded-full bg-neutral-100 mb-2" />
                <div className="h-4 w-32 rounded-full bg-neutral-100 mb-4" />
                <div className="h-3 w-full rounded-full bg-neutral-100 mb-1.5" />
                <div className="h-3 w-5/6 rounded-full bg-neutral-100" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <ClaySkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
        <ClayCard className="p-12 text-center max-w-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h1
            className="text-2xl font-extrabold text-[#1a1a1a] mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Not Found
          </h1>
          <p className="text-sm text-neutral-400">{error}</p>
        </ClayCard>
      </div>
    );
  }

  const email = portfolio?.email || portfolio?.userEmail;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#f0f0f0] text-[#1a1a1a]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Subtle dot-grid texture */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, #c8c8c8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 pt-6 pb-24">

          {/* ── NAV ── */}
          <header className="mb-8">
            <ClayCard className="px-5 sm:px-6 py-4 flex justify-between items-center">
              <span
                className="font-extrabold text-base tracking-tight text-[#1a1a1a]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {portfolio?.name}
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {portfolio?.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-9 h-9 rounded-xl bg-[#f0f0f0] flex items-center justify-center ring-1 ring-black/[0.06] hover:bg-[#e8e8e8] transition-colors duration-150 text-[#1a1a1a]"
                    style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                  >
                    <Github size={15} />
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-xl bg-[#f0f0f0] flex items-center justify-center ring-1 ring-black/[0.06] hover:bg-[#e8e8e8] transition-colors duration-150 text-[#1a1a1a]"
                    style={{ boxShadow: "0 3px 0 rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                  >
                    <Linkedin size={15} />
                  </a>
                )}
                {email && (
                  <ClayButton href={`mailto:${email}`} dark>
                    <Mail size={14} />
                    Contact
                  </ClayButton>
                )}
              </div>
            </ClayCard>
          </header>

          {/* ── HERO ── */}
          <ClayCard className="p-8 sm:p-10 mb-8">
            {/* Status pill */}
            <div className="mb-8">
              <ClayPill dark={false}>
                <span className="w-2 h-2 rounded-full bg-[#1a1a1a] inline-block" />
                {portfolio?.status || "Available for opportunities"}
              </ClayPill>
            </div>

            {/* Name */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] text-[#1a1a1a] mb-3"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {portfolio?.name}
            </h1>

            {/* Title */}
            {portfolio?.title && (
              <p
                className="text-lg sm:text-xl font-bold text-neutral-400 mb-6 tracking-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {portfolio.title}
              </p>
            )}

            {/* Divider */}
            <div
              className="w-full h-px my-6 rounded-full"
              style={{ background: "linear-gradient(90deg, #e0e0e0, transparent)" }}
            />

            {/* About */}
            {portfolio?.about && (
              <p className="text-[15px] text-neutral-500 max-w-xl leading-relaxed mb-8 font-medium">
                {portfolio.about}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {email && (
                <ClayButton href={`mailto:${email}`} dark>
                  <Mail size={15} />
                  Get in touch
                  <ArrowUpRight size={14} />
                </ClayButton>
              )}
              {portfolio?.socialLinks?.github && (
                <ClayButton href={portfolio.socialLinks.github} dark={false} target="_blank">
                  <Github size={15} />
                  GitHub
                </ClayButton>
              )}
            </div>
          </ClayCard>

          {/* ── EXPERIENCE ── */}
          {portfolio?.experience && portfolio.experience.length > 0 && (
            <section className="mb-8" id="work">
              <SectionHeader icon={Briefcase} title="Experience" />
              <div className="space-y-4">
                {portfolio.experience.map((exp, i) => (
                  <ClayCard key={i} className="p-6 sm:p-7">
                    {/* Left accent bar */}
                    <div className="flex gap-4">
                      <div
                        className="w-1 shrink-0 rounded-full bg-[#1a1a1a] mt-1"
                        style={{ minHeight: "100%", alignSelf: "stretch" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3
                              className="text-base font-bold text-[#1a1a1a] leading-snug"
                              style={{ fontFamily: "'Nunito', sans-serif" }}
                            >
                              {exp.role}
                            </h3>
                            <p className="text-sm text-neutral-400 font-medium mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                          <ClayPill dark={false} className="shrink-0 self-start">
                            <Calendar size={11} />
                            {exp.duration}
                          </ClayPill>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </ClayCard>
                ))}
              </div>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {portfolio?.projects && portfolio.projects.length > 0 && (
            <section className="mb-8" id="projects">
              <SectionHeader icon={Code2} title="Projects" />
              <div className="space-y-4">
                {portfolio.projects.map((proj, i) => (
                  <ClayCard
                    key={i}
                    className="p-6 sm:p-7 group"
                    pressable={!!proj.link}
                    onClick={() => proj.link && window.open(proj.link, "_blank")}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className="text-base font-bold text-[#1a1a1a] leading-snug"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      >
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <div
                          className="w-8 h-8 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0 ring-1 ring-black/20"
                          style={{
                            boxShadow:
                              "0 4px 0 rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
                          }}
                        >
                          <ExternalLink size={13} className="text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium mb-5">
                      {proj.description}
                    </p>
                    {proj.tech && proj.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((tech, j) => (
                          <ClayPill key={j} dark={false}>
                            {tech}
                          </ClayPill>
                        ))}
                      </div>
                    )}
                  </ClayCard>
                ))}
              </div>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {portfolio?.education && portfolio.education.length > 0 && (
            <section className="mb-8" id="education">
              <SectionHeader icon={GraduationCap} title="Education" />
              <div className="space-y-4">
                {portfolio.education.map((edu, i) => (
                  <ClayCard key={i} className="p-6 sm:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3
                          className="text-base font-bold text-[#1a1a1a] leading-snug"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        >
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-neutral-400 font-medium mt-1 flex items-center gap-1.5">
                          <MapPin size={12} />
                          {edu.school}
                        </p>
                      </div>
                      <ClayPill dark className="shrink-0 self-start sm:self-center">
                        {edu.year}
                      </ClayPill>
                    </div>
                  </ClayCard>
                ))}
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {portfolio?.skills && portfolio.skills.length > 0 && (
            <section className="mb-8" id="skills">
              <SectionHeader icon={Award} title="Skills & Tech" />
              <ClayCard className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2.5">
                  {portfolio.skills.map((skill, i) => (
                    <ClayPill key={i} dark={i % 5 === 0}>
                      {skill}
                    </ClayPill>
                  ))}
                </div>
              </ClayCard>
            </section>
          )}

          {/* ── CTA ── */}
          <section>
            <ClayCard className="p-8 sm:p-12 text-center overflow-hidden relative">
              {/* Decorative circles — claymorphism depth blobs */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#e8e8e8] ring-1 ring-black/[0.04]"
                style={{ boxShadow: "0 8px 0 rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#e8e8e8] ring-1 ring-black/[0.04]"
                style={{ boxShadow: "0 8px 0 rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mx-auto mb-6 ring-1 ring-black/20"
                  style={{
                    boxShadow:
                      "0 7px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Sparkles size={22} className="text-white" />
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1a1a] mb-3"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Let&apos;s build something great
                </h2>
                <p className="text-[15px] text-neutral-400 font-medium max-w-md mx-auto mb-8 leading-relaxed">
                  Open to new projects and meaningful collaborations. Reach out anytime.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  {email && (
                    <ClayButton href={`mailto:${email}`} dark>
                      <Mail size={15} />
                      Send an email
                      <ArrowUpRight size={14} />
                    </ClayButton>
                  )}
                  {portfolio?.socialLinks?.linkedin && (
                    <ClayButton
                      href={portfolio.socialLinks.linkedin}
                      dark={false}
                      target="_blank"
                    >
                      <Linkedin size={15} />
                      LinkedIn
                    </ClayButton>
                  )}
                </div>
              </div>
            </ClayCard>
          </section>

          {/* ── FOOTER ── */}
          <footer className="mt-8 px-2 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-neutral-400 font-medium">
              © 2024 {portfolio?.name}. All rights reserved.
            </p>
            <div className="flex gap-5">
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-[#1a1a1a] font-medium transition-colors duration-150"
                >
                  GitHub
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-[#1a1a1a] font-medium transition-colors duration-150"
                >
                  LinkedIn
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-xs text-neutral-400 hover:text-[#1a1a1a] font-medium transition-colors duration-150"
                >
                  Email
                </a>
              )}
            </div>
          </footer>

        </div>
      </main>
    </>
  );
}