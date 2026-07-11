"use client";

import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Rocket,
  Eye,
  Layout,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TemplateDefinition {
  id: string;
  name: string;
  tag: string;
  filter: string;
  description: string;
  palette: string[];
  Preview: React.FC;
}

// ─── SVG Previews ─────────────────────────────────────────────────────────────

function OriginalPreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="130" fill="#0a0a0a" />
      <rect x="0" y="0" width="200" height="18" fill="#111111" />
      <rect x="12" y="6" width="28" height="5" rx="2" fill="#333" />
      <rect x="152" y="5" width="36" height="7" rx="3" fill="#ffffff" opacity="0.9" />
      <rect x="12" y="28" width="40" height="40" rx="8" fill="#1e1e1e" />
      <rect x="16" y="32" width="32" height="32" rx="6" fill="#2a2a2a" />
      <text x="32" y="52" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">AB</text>
      <rect x="60" y="32" width="60" height="6" rx="2" fill="#fff" opacity="0.9" />
      <rect x="60" y="42" width="40" height="4" rx="1.5" fill="#555" />
      <rect x="60" y="50" width="50" height="4" rx="1.5" fill="#444" />
      <rect x="12" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="60" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="108" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="156" y="76" width="32" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <text x="33" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">8</text>
      <text x="81" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">3</text>
      <text x="129" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">2</text>
      <text x="172" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">4</text>
      <rect x="12" y="106" width="118" height="18" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="138" y="106" width="50" height="18" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="16" y="110" width="40" height="3" rx="1" fill="#444" />
      <rect x="16" y="116" width="55" height="3" rx="1" fill="#333" />
      <rect x="142" y="110" width="30" height="3" rx="1" fill="#444" />
      <rect x="142" y="116" width="20" height="3" rx="1" fill="#333" />
    </svg>
  );
}

function MinimalPreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="130" fill="#fafafa" />
      <rect x="0" y="0" width="200" height="1" fill="#e5e5e5" />
      <rect x="16" y="8" width="24" height="4" rx="1" fill="#111" />
      <rect x="160" y="6" width="24" height="8" rx="2" fill="#111" />
      <rect x="75" y="28" width="50" height="50" rx="25" fill="#f0f0f0" />
      <text x="100" y="57" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">AB</text>
      <rect x="55" y="82" width="90" height="6" rx="2" fill="#111" />
      <rect x="70" y="92" width="60" height="4" rx="1.5" fill="#aaa" />
      <rect x="16" y="104" width="168" height="0.5" fill="#e5e5e5" />
      <rect x="16" y="110" width="28" height="10" rx="5" fill="#f0f0f0" />
      <rect x="48" y="110" width="36" height="10" rx="5" fill="#f0f0f0" />
      <rect x="88" y="110" width="28" height="10" rx="5" fill="#f0f0f0" />
      <rect x="120" y="110" width="44" height="10" rx="5" fill="#f0f0f0" />
      <text x="30" y="117" textAnchor="middle" fill="#555" fontSize="5">React</text>
      <text x="66" y="117" textAnchor="middle" fill="#555" fontSize="5">TypeScript</text>
      <text x="104" y="117" textAnchor="middle" fill="#555" fontSize="5">Next</text>
      <text x="142" y="117" textAnchor="middle" fill="#555" fontSize="5">Tailwind</text>
    </svg>
  );
}

function NeoBrutalismPreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="130" fill="#FFD60A" />
      <rect x="15" y="10" width="170" height="16" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="22" y="15" width="30" height="4" fill="#000" />
      <rect x="152" y="13" width="24" height="8" fill="#FF4D6D" stroke="#000" strokeWidth="2" />
      <rect x="79" y="34" width="42" height="42" fill="#000" />
      <rect x="74" y="29" width="42" height="42" fill="#00E5FF" stroke="#000" strokeWidth="2" />
      <text x="95" y="54" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900">AB</text>
      <rect x="58" y="82" width="84" height="8" fill="#000" />
      <rect x="54" y="78" width="84" height="8" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="68" y="92" width="56" height="6" fill="#FF4D6D" stroke="#000" strokeWidth="2" />
      <rect x="16" y="108" width="30" height="12" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="50" y="108" width="40" height="12" fill="#00E5FF" stroke="#000" strokeWidth="2" />
      <rect x="94" y="108" width="28" height="12" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="126" y="108" width="46" height="12" fill="#FF4D6D" stroke="#000" strokeWidth="2" />
      <text x="31" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">React</text>
      <text x="70" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">TS</text>
      <text x="108" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">Next</text>
      <text x="149" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">Tailwind</text>
    </svg>
  );
}

function ClaymorphismPreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="sh-clay">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>
      <rect width="200" height="130" fill="#F6F7FB" />
      <g filter="url(#sh-clay)">
        <rect x="16" y="10" width="168" height="16" rx="8" fill="#FFFFFF" />
      </g>
      <rect x="24" y="15" width="24" height="4" rx="2" fill="#8B5CF6" />
      <g filter="url(#sh-clay)">
        <rect x="154" y="12" width="22" height="10" rx="5" fill="#DBEAFE" />
      </g>
      <g filter="url(#sh-clay)">
        <circle cx="100" cy="52" r="24" fill="#DBEAFE" />
      </g>
      <text x="100" y="57" textAnchor="middle" fill="#4C1D95" fontSize="11" fontWeight="bold">AB</text>
      <g filter="url(#sh-clay)">
        <rect x="55" y="82" width="90" height="8" rx="4" fill="#FFFFFF" />
      </g>
      <g filter="url(#sh-clay)">
        <rect x="70" y="95" width="60" height="6" rx="3" fill="#E9D5FF" />
      </g>
      <g filter="url(#sh-clay)">
        <rect x="16" y="110" width="30" height="10" rx="5" fill="#FFFFFF" />
        <rect x="50" y="110" width="40" height="10" rx="5" fill="#DBEAFE" />
        <rect x="94" y="110" width="28" height="10" rx="5" fill="#FFFFFF" />
        <rect x="126" y="110" width="48" height="10" rx="5" fill="#E9D5FF" />
      </g>
      <text x="31" y="117" textAnchor="middle" fill="#555" fontSize="5">React</text>
      <text x="70" y="117" textAnchor="middle" fill="#555" fontSize="5">TS</text>
      <text x="108" y="117" textAnchor="middle" fill="#555" fontSize="5">Next</text>
      <text x="150" y="117" textAnchor="middle" fill="#555" fontSize="5">Tailwind</text>
    </svg>
  );
}

function SwissStylePreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="130" fill="#FFFFFF" />
      <rect x="16" y="0" width="6" height="130" fill="#E11D48" />
      <rect x="40" y="0" width="0.5" height="130" fill="#E5E7EB" />
      <rect x="120" y="0" width="0.5" height="130" fill="#E5E7EB" />
      <rect x="50" y="16" width="70" height="7" fill="#111111" />
      <rect x="50" y="28" width="90" height="3" fill="#9CA3AF" />
      <rect x="50" y="42" width="55" height="55" fill="#F3F4F6" />
      <text x="77.5" y="72" textAnchor="middle" fill="#6B7280" fontSize="10" fontWeight="700">IMAGE</text>
      <rect x="115" y="42" width="45" height="4" fill="#111111" />
      <rect x="115" y="50" width="35" height="2" fill="#9CA3AF" />
      <rect x="115" y="56" width="40" height="2" fill="#9CA3AF" />
      <rect x="115" y="62" width="30" height="2" fill="#9CA3AF" />
      <rect x="115" y="74" width="38" height="4" fill="#111111" />
      <rect x="115" y="82" width="42" height="2" fill="#9CA3AF" />
      <rect x="115" y="88" width="28" height="2" fill="#9CA3AF" />
      <rect x="50" y="108" width="24" height="8" fill="#111111" />
      <rect x="80" y="108" width="30" height="8" fill="#E5E7EB" />
      <rect x="116" y="108" width="38" height="8" fill="#E5E7EB" />
      <text x="62" y="114" textAnchor="middle" fill="#FFF" fontSize="4.5">UI</text>
      <text x="95" y="114" textAnchor="middle" fill="#555" fontSize="4.5">Type</text>
      <text x="135" y="114" textAnchor="middle" fill="#555" fontSize="4.5">Grid</text>
    </svg>
  );
}

// ─── Template Registry ─────────────────────────────────────────────────────────

const TEMPLATES: TemplateDefinition[] = [
  {
    id: "original",
    name: "Original",
    tag: "Dark · Grid",
    filter: "Dark",
    description: "Dark editorial dashboard with stat cards and glassmorphism accents.",
    palette: ["#0a0a0a", "#ffffff", "#1a1a1a"],
    Preview: OriginalPreview,
  },
  {
    id: "minimal",
    name: "Minimal",
    tag: "Light · Centered",
    filter: "Light",
    description: "Clean white canvas, centered hero, and generous whitespace.",
    palette: ["#fafafa", "#111111", "#f0f0f0"],
    Preview: MinimalPreview,
  },
  {
    id: "neobrutalism",
    name: "Neo Brutalism",
    tag: "Bold · Playful",
    filter: "Bold",
    description: "Thick borders, hard shadows, and bold geometry that demands attention.",
    palette: ["#FFD60A", "#111111", "#FF4D6D"],
    Preview: NeoBrutalismPreview,
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    tag: "Soft · Tactile",
    filter: "Soft",
    description: "Pillowy surfaces, gentle depth, and a warm, rounded aesthetic.",
    palette: ["#f6f7fb", "#8b5cf6", "#dbeafe"],
    Preview: ClaymorphismPreview,
  },
  {
    id: "swissstyle",
    name: "Swiss Style",
    tag: "Editorial · Grid",
    filter: "Editorial",
    description: "Grid-driven layout, bold typography, and timeless editorial clarity.",
    palette: ["#ffffff", "#111111", "#e11d48"],
    Preview: SwissStylePreview,
  },
];

const FILTERS = ["All", "Dark", "Light", "Bold", "Soft", "Editorial"];

// ─── Template Card ─────────────────────────────────────────────────────────────

function TemplateCard({
  tmpl,
  animationDelay,
}: {
  tmpl: TemplateDefinition;
  animationDelay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const { Preview } = tmpl;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), animationDelay);
    return () => clearTimeout(t);
  }, [animationDelay]);

  return (
    <a
      href={`/preview/${tmpl.id}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-md`}
      style={{ transitionDelay: visible ? "0ms" : `${animationDelay}ms` }}
    >
      {/* Preview area */}
      <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-gray-950">
        <Preview />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow">
            <Eye className="w-3 h-3" />
            Live preview
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-semibold text-black dark:text-white">{tmpl.name}</span>
          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded-full">
            {tmpl.tag}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
          {tmpl.description}
        </p>

        {/* Preview button */}
        {/* <div className="mb-3">
          <span className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-900 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Eye className="w-3 h-3" />
            Preview
          </span>
        </div> */}

        {/* Palette swatches */}
        <div className="flex items-center gap-1.5">
          {tmpl.palette.map((hex) => (
            <span
              key={hex}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-gray-700 transition-transform duration-150 hover:scale-125"
              style={{ backgroundColor: hex }}
              title={hex}
            />
          ))}
        </div>
      </div>
    </a>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TemplateShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeFilter === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.filter === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="templates"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div
          className={`text-center mb-9 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="group rounded-full border border-black/5 bg-neutral-100 dark:bg-neutral-900 dark:border-white/5 inline-flex items-center gap-2 px-4 py-1 mb-5 text-sm text-gray-600 dark:text-gray-400">
            <Layout className="w-3.5 h-3.5" />
            {TEMPLATES.length} templates available
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 leading-tighter">
            Pick your perfect <br className="hidden sm:block" />
            portfolio style
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Switch anytime — your content stays exactly as you left it.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? "bg-black dark:bg-white text-white dark:text-black border-transparent"
                  : "bg-white dark:bg-black text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:text-black dark:hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Template grid ── */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12 transition-all duration-700 delay-150 ${
            sectionVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {filtered.map((tmpl, i) => (
            <TemplateCard
              key={tmpl.id}
              tmpl={tmpl}
              animationDelay={sectionVisible ? i * 60 : 0}
            />
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-700 delay-300 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link href="/create/portfolio">
            <button className="group relative inline-flex items-center gap-2.5 bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Start Building
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </button>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Switch templates anytime from your dashboard
          </p>
        </div>

        {/* ── Coming soon hint ── */}
        <p
          className={`text-center text-xs text-gray-400 dark:text-gray-600 mt-6 transition-all duration-700 delay-400 ${
            sectionVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          More templates dropping soon ✦
        </p>
      </div>
    </section>
  );
}