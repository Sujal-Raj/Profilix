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

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-neutral-200/80 to-transparent" />
    </div>
  );
}

function MinimalSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-100 bg-white px-8 py-5 flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <div className="flex gap-6">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-8 pt-40 pb-32">
        <Skeleton className="h-3 w-32 mb-16" />
        <Skeleton className="h-16 w-4/5 mb-3" />
        <Skeleton className="h-16 w-3/5 mb-10" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6 mb-14" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="mt-32 space-y-24">
          {[1, 2, 3].map((s) => (
            <div key={s}>
              <Skeleton className="h-3 w-24 mb-10" />
              {[1, 2].map((c) => (
                <div key={c} className="py-8 border-t border-neutral-100">
                  <Skeleton className="h-5 w-56 mb-2" />
                  <Skeleton className="h-4 w-36 mb-4" />
                  <Skeleton className="h-3 w-full mb-1.5" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-full h-px bg-neutral-100" />;
}

// ─── Section Label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-10">
      {children}
    </p>
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

  if (loading) return <MinimalSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="text-center max-w-sm">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-300 mb-4">
            Error
          </p>
          <h1 className="text-2xl font-light text-black mb-3 tracking-tight">
            Portfolio not found
          </h1>
          <p className="text-sm text-neutral-400 font-mono">{error}</p>
        </div>
      </div>
    );
  }

  const email = portfolio?.email || portfolio?.userEmail;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-white text-black"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* ── NAV ── */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
            scrolled ? "border-b border-neutral-100" : ""
          }`}
        >
          <nav className="max-w-3xl mx-auto px-8 py-5 flex justify-between items-center">
            <span className="text-sm font-medium tracking-tight text-black">
              {portfolio?.name}
            </span>
            <div className="flex items-center gap-6">
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-black transition-colors duration-200"
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
                  className="text-neutral-400 hover:text-black transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-neutral-400 hover:text-black transition-colors duration-200"
                >
                  Contact
                </a>
              )}
            </div>
          </nav>
        </header>

        <div className="max-w-3xl mx-auto px-8 pt-32 pb-32">

          {/* ── HERO ── */}
          <section className="pt-16 pb-32">

            {/* Status */}
            <div className="flex items-center gap-2 mb-14">
              <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
              <span
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-neutral-400"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {portfolio?.status || "Available for work"}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-[-3px] leading-[0.95] text-black mb-6"
            >
              {portfolio?.name}
            </h1>

            {/* Title */}
            {portfolio?.title && (
              <p
                className="text-lg font-light text-neutral-400 mb-10 tracking-tight"
              >
                {portfolio.title}
              </p>
            )}

            <Divider />

            {/* About */}
            {portfolio?.about && (
              <p className="text-base font-light text-neutral-600 max-w-xl leading-relaxed mt-10 mb-12">
                {portfolio.about}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium
                    hover:bg-neutral-800 transition-colors duration-200 group"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Get in touch
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              )}
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-sm font-medium text-neutral-600
                    hover:border-black hover:text-black transition-colors duration-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          {portfolio?.experience && portfolio.experience.length > 0 && (
            <section className="mb-28" id="work">
              <SectionLabel>Experience</SectionLabel>
              <div>
                {portfolio.experience.map((exp, i) => (
                  <div key={i} className="group py-8 border-t border-neutral-100 last:border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-base font-medium text-black leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-0.5">{exp.company}</p>
                      </div>
                      <span
                        className="text-[11px] text-neutral-300 shrink-0 mt-0.5 flex items-center gap-1.5"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        <Calendar className="w-3 h-3" />
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm font-light text-neutral-500 leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── PROJECTS ── */}
          {portfolio?.projects && portfolio.projects.length > 0 && (
            <section className="mb-28" id="projects">
              <SectionLabel>Projects</SectionLabel>
              <div>
                {portfolio.projects.map((proj, i) => (
                  <div
                    key={i}
                    onClick={() => proj.link && window.open(proj.link, "_blank")}
                    className={`group py-8 border-t border-neutral-100 last:border-b ${
                      proj.link ? "cursor-pointer" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-base font-medium text-black group-hover:text-neutral-500 transition-colors duration-200 leading-snug">
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-300 group-hover:text-black shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                      )}
                    </div>
                    <p className="text-sm font-light text-neutral-500 leading-relaxed max-w-xl mb-5">
                      {proj.description}
                    </p>
                    {proj.tech && proj.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((tech, j) => (
                          <span
                            key={j}
                            className="text-[11px] text-neutral-400 border border-neutral-100 px-2.5 py-1 group-hover:border-neutral-200 transition-colors duration-200"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── EDUCATION ── */}
          {portfolio?.education && portfolio.education.length > 0 && (
            <section className="mb-28" id="education">
              <SectionLabel>Education</SectionLabel>
              <div>
                {portfolio.education.map((edu, i) => (
                  <div key={i} className="py-8 border-t border-neutral-100 last:border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <h3 className="text-base font-medium text-black leading-snug">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-neutral-400 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {edu.school}
                        </p>
                      </div>
                      <span
                        className="text-[11px] text-neutral-300 shrink-0"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── SKILLS ── */}
          {portfolio?.skills && portfolio.skills.length > 0 && (
            <section className="mb-28" id="skills">
              <SectionLabel>Skills</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-neutral-500 border border-neutral-100 px-3 py-1.5
                      hover:border-black hover:text-black transition-colors duration-200 cursor-default"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ── CTA ── */}
          <section className="pt-16 border-t border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-300 mb-4">
                  What&apos;s next
                </p>
                <h2 className="text-4xl sm:text-5xl font-light tracking-[-2px] text-black leading-[1.05]">
                  Let&apos;s work<br />together.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:items-end shrink-0">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium
                      hover:bg-neutral-800 transition-colors duration-200 group whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send an email
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                )}
                {portfolio?.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-sm font-medium text-neutral-500
                      hover:border-black hover:text-black transition-colors duration-200 whitespace-nowrap"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="mt-20 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className="text-[11px] text-neutral-300"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              © 2024 {portfolio?.name}
            </p>
            <div className="flex gap-6">
              {portfolio?.socialLinks?.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-neutral-300 hover:text-black transition-colors duration-200"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  GitHub
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-neutral-300 hover:text-black transition-colors duration-200"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  LinkedIn
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-[11px] text-neutral-300 hover:text-black transition-colors duration-200"
                  style={{ fontFamily: "'DM Mono', monospace" }}
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