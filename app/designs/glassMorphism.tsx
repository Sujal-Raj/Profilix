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
  Sparkles,
  MapPin,
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

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function GlassSkeleton() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      {/* Nav skeleton */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center">
        <div className="h-5 w-32 rounded-lg bg-white/10 animate-pulse" />
        <div className="flex gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-8 w-8 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-8 w-24 rounded-xl bg-white/10 animate-pulse" />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-40 pb-20">
        {/* Hero skeleton */}
        <div className="mb-32">
          <div className="h-6 w-48 rounded-full bg-white/10 animate-pulse mb-8" />
          <div className="h-20 w-3/4 rounded-2xl bg-white/10 animate-pulse mb-4" />
          <div className="h-10 w-1/2 rounded-xl bg-white/10 animate-pulse mb-6" />
          <div className="h-4 w-full max-w-2xl rounded-lg bg-white/10 animate-pulse mb-2" />
          <div className="h-4 w-4/5 max-w-xl rounded-lg bg-white/10 animate-pulse mb-8" />
          <div className="h-12 w-44 rounded-xl bg-white/10 animate-pulse" />
        </div>

        {/* Card skeletons */}
        {[1, 2, 3].map((s) => (
          <div key={s} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-white/10 animate-pulse" />
              <div className="h-8 w-40 rounded-xl bg-white/10 animate-pulse" />
            </div>
            {[1, 2].map((c) => (
              <div
                key={c}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 animate-pulse"
              >
                <div className="h-6 w-48 rounded-lg bg-white/10 mb-3" />
                <div className="h-4 w-36 rounded-lg bg-white/10 mb-4" />
                <div className="h-3 w-full rounded-lg bg-white/10 mb-2" />
                <div className="h-3 w-5/6 rounded-lg bg-white/10" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Orb backgrounds ───────────────────────────────────────────────────────────

function AuroraOrbs({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary violet orb — follows mouse subtly */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-violet-600/25 blur-[140px] transition-transform duration-[2000ms] ease-out"
        style={{
          top: `calc(-15% + ${mouse.y * 0.02}px)`,
          left: `calc(-10% + ${mouse.x * 0.02}px)`,
        }}
      />
      {/* Cyan orb — right side */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full bg-cyan-400/20 blur-[130px] transition-transform duration-[2500ms] ease-out"
        style={{
          top: `calc(25% - ${mouse.y * 0.015}px)`,
          right: `calc(-12% - ${mouse.x * 0.01}px)`,
        }}
      />
      {/* Indigo orb — bottom center */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full bg-indigo-500/20 blur-[110px] transition-transform duration-[3000ms] ease-out"
        style={{
          bottom: `calc(-8% + ${mouse.y * 0.01}px)`,
          left: `calc(28% + ${mouse.x * 0.008}px)`,
        }}
      />
      {/* Pink accent — small */}
      <div className="absolute top-[55%] left-[15%] w-[280px] h-[280px] rounded-full bg-fuchsia-500/15 blur-[90px]" />
      {/* Subtle star-dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

// ─── Glass card wrapper ────────────────────────────────────────────────────────

function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/[0.06] border border-white/[0.12]
        rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
        transition-all duration-300
        ${hover ? "hover:bg-white/[0.1] hover:border-white/[0.2] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-1" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className={`p-3 rounded-xl ${gradient} shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-4" />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });


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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleMouseMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (loading) return <GlassSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
        <AuroraOrbs mouse={{ x: 0, y: 0 }} />
        <GlassCard className="p-12 text-center max-w-md relative z-10" hover={false}>
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-3">Portfolio not found</h1>
          <p className="text-white/50 text-sm font-mono">{error}</p>
        </GlassCard>
      </div>
    );
  }

  const email = portfolio?.email || portfolio?.userEmail;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <AuroraOrbs mouse={mouse} />

        {/* ── NAVBAR ── */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
          <nav
            className={`
              backdrop-blur-2xl border rounded-2xl px-6 py-3
              flex justify-between items-center
              transition-all duration-500
              ${
                scrolled
                  ? "bg-white/[0.08] border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.04] border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              }
            `}
          >
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {portfolio?.name}
            </span>
            <div className="flex items-center gap-2">
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="ml-1 px-5 py-2 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-violet-500 to-indigo-500
                    hover:from-violet-400 hover:to-indigo-400
                    shadow-[0_0_20px_rgba(139,92,246,0.4)]
                    hover:shadow-[0_0_28px_rgba(139,92,246,0.6)]
                    transition-all duration-300"
                >
                  Contact
                </a>
              )}
            </div>
          </nav>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className="max-w-5xl mx-auto px-6 pt-36 pb-24 relative z-10">

          {/* ── HERO ── */}
          <section className="pt-16 pb-32 relative">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
              backdrop-blur-xl bg-white/[0.06] border border-white/[0.12]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-white/70">
                {portfolio?.status || "Available for opportunities"}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-3 tracking-tight leading-[1.0]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <span className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                {portfolio?.name}
              </span>
            </h1>

            {/* Title */}
            {portfolio?.title && (
              <h2
                className="text-2xl sm:text-3xl font-semibold mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {portfolio.title}
              </h2>
            )}

            {/* About */}
            {portfolio?.about && (
              <p className="text-base sm:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed">
                {portfolio.about}
              </p>
            )}

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 items-center">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                    bg-gradient-to-r from-violet-500 to-indigo-500
                    hover:from-violet-400 hover:to-indigo-400
                    shadow-[0_0_24px_rgba(139,92,246,0.45)]
                    hover:shadow-[0_0_36px_rgba(139,92,246,0.65)]
                    transition-all duration-300 group"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                    backdrop-blur-xl bg-white/[0.06] border border-white/[0.12]
                    hover:bg-white/[0.1] hover:border-white/[0.2]
                    shadow-[0_4px_16px_rgba(0,0,0,0.3)]
                    transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>

            {/* Decorative glow line below hero */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          </section>

          {/* ── EXPERIENCE ── */}
          {portfolio?.experience && portfolio.experience.length > 0 && (
            <section className="mb-28" id="work">
              <SectionHeader
                icon={Briefcase}
                title="Experience"
                gradient="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
              />
              <div className="space-y-4">
                {portfolio.experience.map((exp, i) => (
                  <GlassCard key={i} className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="text-lg font-semibold text-white mb-1"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <p className="text-violet-300/80 font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg
                        bg-white/[0.05] border border-white/[0.08] text-white/50 text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <Calendar className="w-3 h-3" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-white/50 leading-relaxed text-sm">{exp.description}</p>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {portfolio?.projects && portfolio.projects.length > 0 && (
            <section className="mb-28" id="projects">
              <SectionHeader
                icon={Code2}
                title="Featured Projects"
                gradient="bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30"
              />
              <div className="space-y-4">
                {portfolio.projects.map((proj, i) => (
                  <GlassCard
                    key={i}
                    className="p-6 sm:p-8 group"
                    onClick={() => proj.link && window.open(proj.link, "_blank")}
                    hover={true}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-violet-400 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      )}
                    </div>
                    <p className="text-white/50 leading-relaxed text-sm mb-5">{proj.description}</p>
                    {proj.tech && proj.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((tech, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 text-xs font-medium rounded-lg
                              backdrop-blur-sm bg-white/[0.06] border border-white/[0.1]
                              text-white/60 group-hover:text-violet-300/80
                              group-hover:border-violet-400/20 group-hover:bg-violet-500/10
                              transition-all duration-300"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {portfolio?.education && portfolio.education.length > 0 && (
            <section className="mb-28" id="education">
              <SectionHeader
                icon={GraduationCap}
                title="Education"
                gradient="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30"
              />
              <div className="space-y-4">
                {portfolio.education.map((edu, i) => (
                  <GlassCard key={i} className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3
                          className="text-lg font-semibold text-white mb-1"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          {edu.degree}
                        </h3>
                        <p className="text-white/50 text-sm flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.school}
                        </p>
                      </div>
                      <span
                        className="shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold
                          bg-gradient-to-r from-emerald-500/20 to-teal-500/20
                          border border-emerald-400/20 text-emerald-300"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {portfolio?.skills && portfolio.skills.length > 0 && (
            <section className="mb-28" id="skills">
              <SectionHeader
                icon={Award}
                title="Skills & Technologies"
                gradient="bg-gradient-to-br from-orange-500 to-rose-500 shadow-orange-500/30"
              />
              <GlassCard className="p-6 sm:p-8" hover={false}>
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl text-sm font-medium
                        backdrop-blur-sm bg-white/[0.06] border border-white/[0.1]
                        text-white/70
                        hover:bg-violet-500/15 hover:border-violet-400/25 hover:text-violet-200
                        hover:shadow-[0_0_16px_rgba(139,92,246,0.25)]
                        transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </section>
          )}

          {/* ── CTA ── */}
          <section className="relative">
            {/* Glow behind the CTA card */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-indigo-600/20 blur-3xl rounded-3xl" />

            <GlassCard
              className="relative p-12 sm:p-16 text-center overflow-hidden"
              hover={false}
            >
              {/* Inner shimmer border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

              {/* Sparkle icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                bg-gradient-to-br from-violet-500 to-indigo-600
                shadow-[0_0_28px_rgba(139,92,246,0.5)] mb-6 mx-auto"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <h2
                className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Let&apos;s build something amazing
                </span>
              </h2>

              <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Always looking for meaningful projects and sharp collaborators. Let&apos;s talk.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
                      bg-gradient-to-r from-violet-500 to-indigo-500
                      hover:from-violet-400 hover:to-indigo-400
                      shadow-[0_0_28px_rgba(139,92,246,0.5)]
                      hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]
                      transition-all duration-300 group text-white"
                  >
                    <Mail className="w-5 h-5" />
                    Send me an email
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold
                      backdrop-blur-xl bg-white/[0.06] border border-white/[0.15]
                      hover:bg-white/[0.1] hover:border-white/[0.25]
                      shadow-[0_4px_16px_rgba(0,0,0,0.3)]
                      transition-all duration-300 text-white/80 hover:text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            </GlassCard>
          </section>

          {/* ── FOOTER ── */}
          <footer className="mt-20 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4
              text-sm text-white/30"
            >
              <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                © 2024 {portfolio?.name}. All rights reserved.
              </p>
              <div className="flex gap-6">
                {portfolio?.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-white/70 transition-colors"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </footer>
        </div>


      </main>
    </>
  );
}