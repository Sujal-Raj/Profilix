"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
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

// ─── Grid row: label col + content col ────────────────────────────────────────
// Swiss grid: 2px top rule, left narrow label col, right wide content col.

function GridRow({
  label,
  children,
  className = "",
  noBorder = false,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-x-8 pt-5 pb-8 ${
        noBorder ? "" : "border-t-2 border-black"
      } ${className}`}
    >
      <div className="pt-0.5">
        {label && (
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase text-black block leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {label}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function SwissSkeleton() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Barlow', sans-serif" }}>
      {/* Nav */}
      <nav className="border-b-2 border-black px-8 py-4 flex justify-between items-center">
        <div className="h-4 w-36 bg-black/10 animate-pulse" />
        <div className="flex gap-6">
          <div className="h-4 w-16 bg-black/10 animate-pulse" />
          <div className="h-4 w-16 bg-black/10 animate-pulse" />
        </div>
      </nav>
      {/* Hero name block */}
      <div className="border-b-2 border-black px-8 py-12">
        <div className="h-32 w-full bg-black/5 animate-pulse mb-4" />
        <div className="h-6 w-64 bg-black/10 animate-pulse" />
      </div>
      {/* Grid rows */}
      <div className="px-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="grid grid-cols-[140px_1fr] gap-x-8 pt-5 pb-8 border-t-2 border-black">
            <div className="h-3 w-20 bg-black/10 animate-pulse mt-1" />
            <div className="space-y-3">
              <div className="h-5 w-56 bg-black/10 animate-pulse" />
              <div className="h-4 w-full bg-black/5 animate-pulse" />
              <div className="h-4 w-4/5 bg-black/5 animate-pulse" />
            </div>
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <SwissSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="border-2 border-black p-12 max-w-sm w-full">
          <p
            className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4 text-black/40"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Error
          </p>
          <h1
            className="text-4xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Not found
          </h1>
          <p className="text-sm text-black/50">{error}</p>
        </div>
      </div>
    );
  }

  const email = portfolio?.email || portfolio?.userEmail;
  // Split name for the giant display treatment
  const nameParts = portfolio?.name?.split(" ") ?? ["Name"];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=Barlow:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-white text-black"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >

        {/* ── NAV ── */}
        <header
          className={`sticky top-0 z-50 bg-white border-b-2 border-black transition-none`}
        >
          <nav className="max-w-screen-xl mx-auto px-6 sm:px-10 h-12 flex items-center justify-between gap-4">
            {/* Left: name mark */}
            <span
              className="text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {portfolio?.name}
            </span>

            {/* Right: links */}
            <div className="flex items-center gap-6">
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  GitHub
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  LinkedIn
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-[11px] font-bold tracking-[0.15em] uppercase bg-black text-white px-4 py-2 hover:bg-black/80 transition-colors duration-100"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Contact
                </a>
              )}
            </div>
          </nav>
        </header>

        <div className="max-w-screen-xl mx-auto">

          {/* ── HERO POSTER BLOCK ── */}
          {/* Signature: condensed name at poster scale, sliced by a rule */}
          <section className="border-b-2 border-black px-6 sm:px-10 pt-10 pb-0 overflow-hidden">

            {/* Status bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-2 bg-black" />
              <span
                className="text-[10px] font-bold tracking-[0.22em] uppercase text-black/50"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {portfolio?.status || "Available for work"}
              </span>
              <div className="flex-1 h-px bg-black/15" />
              {portfolio?.title && (
                <span
                  className="text-[10px] font-bold tracking-[0.15em] uppercase text-black/50"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {portfolio.title}
                </span>
              )}
            </div>

            {/* Giant name — condensed grotesque, poster-press style */}
            <div className="relative">
              <h1
                className="font-black uppercase leading-[0.88] tracking-tight text-black select-none"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(72px, 14vw, 180px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {nameParts.map((part, i) => (
                  <span key={i} className="block">{part}</span>
                ))}
              </h1>
              {/* The signature rule: a 3px black bar that slices across the name */}
              <div
                className="absolute left-0 right-0 h-[3px] bg-black pointer-events-none"
                style={{ top: "52%" }}
              />
            </div>

            {/* About + CTA below name */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 mt-10 pb-10 border-t-2 border-black pt-6">
              {portfolio?.about && (
                <p className="text-[15px] font-light text-black/60 max-w-xl leading-relaxed">
                  {portfolio.about}
                </p>
              )}
              <div className="flex flex-col gap-2 items-start sm:items-end shrink-0 justify-center">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-bold tracking-[0.08em] uppercase hover:bg-black/80 transition-colors duration-100 group"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <Mail className="w-4 h-4" />
                    Get in touch
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {portfolio?.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-black text-black px-6 py-3 text-sm font-bold tracking-[0.08em] uppercase hover:bg-black hover:text-white transition-colors duration-100"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ── CONTENT GRID ── */}
          <div className="px-6 sm:px-10">

            {/* ── EXPERIENCE ── */}
            {portfolio?.experience && portfolio.experience.length > 0 && (
              <section id="work">
                {/* Section label row */}
                <div className="border-t-2 border-black pt-5 pb-3">
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-2 py-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Experience
                  </span>
                </div>

                {portfolio.experience.map((exp, i) => (
                  <GridRow
                    key={i}
                    label={
                      <span
                        className="font-mono text-[10px] text-black/40 block"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {exp.duration}
                      </span>
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                      <h3
                        className="text-2xl font-black uppercase tracking-tight leading-none"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <span
                        className="text-sm font-bold tracking-[0.12em] uppercase text-black/40 shrink-0"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-[14px] font-light text-black/60 leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>
                  </GridRow>
                ))}
              </section>
            )}

            {/* ── PROJECTS ── */}
            {portfolio?.projects && portfolio.projects.length > 0 && (
              <section id="projects">
                <div className="border-t-2 border-black pt-5 pb-3">
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-2 py-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Projects
                  </span>
                </div>

                {portfolio.projects.map((proj, i) => (
                  <GridRow
                    key={i}
                    label={
                      proj.tech?.[0] ? (
                        <span
                          className="text-[10px] text-black/40 block leading-tight"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {proj.tech[0]}
                          {proj.tech.length > 1 && (
                            <> +{proj.tech.length - 1}</>
                          )}
                        </span>
                      ) : null
                    }
                  >
                    <div
                      className={`group ${proj.link ? "cursor-pointer" : ""}`}
                      onClick={() => proj.link && window.open(proj.link, "_blank")}
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3
                          className="text-2xl font-black uppercase tracking-tight leading-none group-hover:underline decoration-2 underline-offset-4"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {proj.title}
                        </h3>
                        {proj.link && (
                          <ExternalLink className="w-3.5 h-3.5 text-black/30 group-hover:text-black shrink-0 transition-colors" />
                        )}
                      </div>
                      <p className="text-[14px] font-light text-black/60 leading-relaxed max-w-2xl mb-4">
                        {proj.description}
                      </p>
                      {proj.tech && proj.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {proj.tech.map((tech, j) => (
                            <span
                              key={j}
                              className="text-[10px] font-bold tracking-[0.12em] uppercase border border-black px-2 py-1 text-black/60"
                              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </GridRow>
                ))}
              </section>
            )}

            {/* ── EDUCATION ── */}
            {portfolio?.education && portfolio.education.length > 0 && (
              <section id="education">
                <div className="border-t-2 border-black pt-5 pb-3">
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-2 py-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Education
                  </span>
                </div>

                {portfolio.education.map((edu, i) => (
                  <GridRow
                    key={i}
                    label={
                      <span
                        className="text-[10px] text-black/40 block"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {edu.year}
                      </span>
                    }
                  >
                    <h3
                      className="text-2xl font-black uppercase tracking-tight leading-none mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className="text-sm font-bold tracking-[0.1em] uppercase text-black/40"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {edu.school}
                    </p>
                  </GridRow>
                ))}
              </section>
            )}

            {/* ── SKILLS ── */}
            {portfolio?.skills && portfolio.skills.length > 0 && (
              <section id="skills">
                <div className="border-t-2 border-black pt-5 pb-3">
                  <span
                    className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-2 py-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Skills
                  </span>
                </div>

                <GridRow label="Stack">
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 transition-colors duration-100 cursor-default
                          ${i % 7 === 0
                            ? "bg-black text-white"
                            : "border border-black text-black/70 hover:bg-black hover:text-white"
                          }`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GridRow>
              </section>
            )}

            {/* ── CTA ── */}
            <section>
              <div className="border-t-2 border-black" />

              {/* Full-width CTA — Swiss poster style */}
              <div className="py-16 sm:py-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 border-b-2 border-black">
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/30 mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Next step
                  </p>
                  <h2
                    className="font-black uppercase leading-[0.9] tracking-tight text-black"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "clamp(48px, 8vw, 120px)",
                    }}
                  >
                    Let&apos;s<br />work.
                  </h2>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-bold tracking-[0.1em] uppercase hover:bg-black/80 transition-colors duration-100 group"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      <Mail className="w-4 h-4" />
                      Send an email
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {portfolio?.socialLinks?.linkedin && (
                    <a
                      href={portfolio.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border-2 border-black text-black px-8 py-4 text-sm font-bold tracking-[0.1em] uppercase hover:bg-black hover:text-white transition-colors duration-100"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                © 2024 {portfolio?.name}
              </p>
              <div className="flex gap-6">
                {portfolio?.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 hover:text-black transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    GitHub
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 hover:text-black transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    LinkedIn
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 hover:text-black transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Email
                  </a>
                )}
              </div>
            </footer>

          </div>
        </div>
      </main>
    </>
  );
}