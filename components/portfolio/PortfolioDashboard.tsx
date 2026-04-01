"use client";

import { useEffect, useState } from "react";
import { Upload, Sparkles, ArrowRight, Briefcase, GraduationCap, Code2, User, ExternalLink, Github, Linkedin, Twitter, CheckCircle2, Save, Check, Copy } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastContext";
import Link from "next/link";

interface PortfolioData {
  name: string;
  title: string;
  email: string;
  about: string;
  status: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  projects: {
    title: string;
    description: string;
    tech: string[];
    link?: string | null;
  }[];
  socialLinks: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  };
  slug?: string;
}

// ──────────────────────────────────────────
// Stat Card
// ──────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5 overflow-hidden transition-all duration-500 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
          {label}
        </span>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-900 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
        </div>
      </div>
      <span className="text-3xl font-bold text-black dark:text-white tabular-nums">
        {value}
      </span>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-black dark:bg-white group-hover:w-full transition-all duration-500 rounded-full" />
    </div>
  );
}

// ──────────────────────────────────────────
// Section Block
// ──────────────────────────────────────────
function SectionBlock({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────
// Dashboard Component
// ──────────────────────────────────────────
export function PortfolioDashboard({ data, onPreview }: { data: PortfolioData; onPreview: () => void }) {
  const router = useRouter();
  const [headerVisible, setHeaderVisible] = useState(false);

  // ── Publish state ──
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const initials = data.name
    ? data.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  // ── Publish handler ──
  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/v1/user/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        alert(resData.message || "Something went wrong");
        return;
      }

      setPublishedSlug(resData.slug);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to publish portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Copy URL handler ──
  const handleCopy = async () => {
    const portfolioUrl = `${window.location.origin}/${publishedSlug}`;
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // ── Modal OK handler ──
  const handleModalOk = () => {
    setShowSuccessModal(false);
    router.push(`/${publishedSlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-500 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-lg font-bold shadow-md">
              {initials}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-50 dark:border-[#0a0a0a]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white leading-tight">
                {data.name || "—"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.title || "No title set"}
              </p>
            </div>
          </div>

          {/* Status pill + CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onPreview}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:gap-3 cursor-pointer"
            >
              Edit Portfolio
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 hover:gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <Save size={14} className="flex-shrink-0" />
              {isSaving ? "Publishing..." : "Publish Portfolio"}
            </button>
          </div>
        </div>

        <div>
          <p className="mt-2 text-sm text-gray-900 dark:text-white font-semibold">
            Your portfolio is already set up and live. You can preview it or edit any section. Publish your changes to update the portfolio.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Code2} label="Skills" value={data.skills?.length ?? 0} delay={100} />
          <StatCard icon={Briefcase} label="Experience" value={data.experience?.length ?? 0} delay={150} />
          <StatCard icon={GraduationCap} label="Education" value={data.education?.length ?? 0} delay={200} />
          <StatCard icon={User} label="Projects" value={data.projects?.length ?? 0} delay={250} />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-3 gap-4">

          {/* Left col (2/3) */}
          <div className="lg:col-span-2 space-y-4">

            {/* About */}
            {data.about && (
              <SectionBlock title="About" delay={300}>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
                  {data.about}
                </p>
              </SectionBlock>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
              <SectionBlock title="Experience" delay={350}>
                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative pl-4 border-l border-gray-200 dark:border-gray-800 group">
                      <div className="absolute -left-1 top-1 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300" />
                      <p className="text-sm font-semibold text-black dark:text-white">{exp.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {exp.company}
                        {exp.duration ? ` · ${exp.duration}` : ""}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
              <SectionBlock title="Projects" delay={400}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="group rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-[#0f0f0f] p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-black dark:text-white leading-tight">
                          {proj.title}
                        </p>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                      {proj.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {proj.tech.slice(0, 4).map((t, j) => (
                            <span
                              key={j}
                              className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.tech.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-gray-400">
                              +{proj.tech.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}
          </div>

          {/* Right col (1/3) */}
          <div className="space-y-4">

            {/* Skills */}
            {data.skills?.length > 0 && (
              <SectionBlock title="Skills" delay={320}>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
              <SectionBlock title="Education" delay={370}>
                <div className="space-y-3">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-black dark:text-white leading-snug">
                        {edu.degree}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {edu.school}
                        {edu.year ? ` · ${edu.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Contact & Socials */}
            <SectionBlock title="Contact" delay={420}>
              <div className="space-y-3">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors truncate"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                    {data.email}
                  </a>
                )}
                <div className="flex items-center gap-3 pt-1">
                  {data.socialLinks?.github && (
                    <a
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {data.socialLinks?.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {data.socialLinks?.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </SectionBlock>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-10 text-sm text-gray-400">
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4">
            <div>
              <p className="font-medium text-gray-100">Profilix</p>
              <p className="font-extralight text-gray-500">
                Build, customize, and showcase your portfolio effortlessly.
              </p>
            </div>
            <div className="flex gap-4 mt-3 md:mt-0">
              <Link href={"/"} className="hover:text-gray-200">Home</Link>
              <a href="https://github.com/Sujal-Raj/Profilix" target="_blank" className="hover:text-gray-200">GitHub</a>
              <a href="https://www.linkedin.com/in/sujalraj1/" target="_blank" className="hover:text-gray-200">LinkedIn</a>
            </div>
          </div>
          <div className="text-center pb-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Profilix. All rights reserved.
          </div>
        </footer>
      </div>

      {/* ── Success Modal (identical to PreviewPortfolioPage) ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md animate-fadeIn"
            onClick={handleModalOk}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div className="p-8">
              {/* Success icon */}
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce-once relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500" />
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-gray-900" />
                <Check
                  className="w-8 h-8 relative z-10 text-black dark:text-white"
                  strokeWidth={3}
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-2">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Portfolio is Live!
                </span>
              </h2>

              {/* Description */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                Your portfolio has been successfully published
              </p>

              {/* Link box */}
              <div className="relative group mb-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium">
                    YOUR PORTFOLIO URL
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white truncate">
                      {`${typeof window !== "undefined" ? window.location.origin : ""}/${publishedSlug}`}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="flex-shrink-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-all active:scale-95"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* View button */}
              <button
                onClick={handleModalOk}
                className="w-full py-3 px-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-black font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-bounce-once { animation: bounceOnce 0.6s ease-in-out; }
      `}</style>
    </div>
  );
}