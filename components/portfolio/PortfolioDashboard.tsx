"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code2,
  User,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Check,
  Copy,
  ChevronRight,
  Layers,
  Pencil,
  Globe,
  Sparkles,
  CheckCircle2,
  Eye,
  Layout,
  ChevronDown,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioData {
  name: string;
  title: string;
  email: string;
  about: string;
  status: string;
  skills: string[];
  experience: { role: string; company: string; duration: string; description: string }[];
  education: { degree: string; school: string; year: string }[];
  projects: { title: string; description: string; tech: string[]; link?: string | null }[];
  socialLinks: { github?: string | null; linkedin?: string | null; twitter?: string | null };
  slug?: string;
  selectedTemplate?: string;
}

interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  tag: string;
  palette: string[];   // 3 hex colors shown as swatches
  preview: React.FC;   // inline SVG preview
}

// ─── Template Previews (SVG thumbnails) ───────────────────────────────────────

function OriginalPreview() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* bg */}
      <rect width="200" height="130" fill="#0a0a0a" />
      {/* top bar */}
      <rect x="0" y="0" width="200" height="18" fill="#111111" />
      <rect x="12" y="6" width="28" height="5" rx="2" fill="#333" />
      <rect x="152" y="5" width="36" height="7" rx="3" fill="#ffffff" opacity="0.9" />
      {/* hero area */}
      <rect x="12" y="28" width="40" height="40" rx="8" fill="#1e1e1e" />
      <rect x="16" y="32" width="32" height="32" rx="6" fill="#2a2a2a" />
      <text x="32" y="52" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">AB</text>
      <rect x="60" y="32" width="60" height="6" rx="2" fill="#fff" opacity="0.9" />
      <rect x="60" y="42" width="40" height="4" rx="1.5" fill="#555" />
      <rect x="60" y="50" width="50" height="4" rx="1.5" fill="#444" />
      {/* stats row */}
      <rect x="12" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="60" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="108" y="76" width="42" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <rect x="156" y="76" width="32" height="22" rx="5" fill="#1a1a1a" stroke="#222" strokeWidth="0.5" />
      <text x="33" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">8</text>
      <text x="81" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">3</text>
      <text x="129" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">2</text>
      <text x="172" y="91" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">4</text>
      {/* content blocks */}
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
      {/* bg */}
      <rect width="200" height="130" fill="#fafafa" />
      {/* top nav line */}
      <rect x="0" y="0" width="200" height="1" fill="#e5e5e5" />
      <rect x="16" y="8" width="24" height="4" rx="1" fill="#111" />
      <rect x="160" y="6" width="24" height="8" rx="2" fill="#111" />
      {/* hero - centered */}
      <rect x="75" y="28" width="50" height="50" rx="25" fill="#f0f0f0" />
      <text x="100" y="57" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">AB</text>
      <rect x="55" y="82" width="90" height="6" rx="2" fill="#111" />
      <rect x="70" y="92" width="60" height="4" rx="1.5" fill="#aaa" />
      {/* divider */}
      <rect x="16" y="104" width="168" height="0.5" fill="#e5e5e5" />
      {/* skill pills */}
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
    <svg
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* background */}
      <rect width="200" height="130" fill="#FFD60A" />

      {/* navbar */}
      <rect x="15" y="10" width="170" height="16" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="22" y="15" width="30" height="4" fill="#000" />
      <rect x="152" y="13" width="24" height="8" fill="#FF4D6D" stroke="#000" strokeWidth="2" />

      {/* avatar shadow */}
      <rect x="79" y="34" width="42" height="42" fill="#000" />
      {/* avatar */}
      <rect
        x="74"
        y="29"
        width="42"
        height="42"
        fill="#00E5FF"
        stroke="#000"
        strokeWidth="2"
      />
      <text
        x="95"
        y="54"
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontWeight="900"
      >
        AB
      </text>

      {/* title shadow */}
      <rect x="58" y="82" width="84" height="8" fill="#000" />
      {/* title */}
      <rect
        x="54"
        y="78"
        width="84"
        height="8"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />

      {/* subtitle */}
      <rect
        x="68"
        y="92"
        width="56"
        height="6"
        fill="#FF4D6D"
        stroke="#000"
        strokeWidth="2"
      />

      {/* skill tags */}
      <rect
        x="16"
        y="108"
        width="30"
        height="12"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="50"
        y="108"
        width="40"
        height="12"
        fill="#00E5FF"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="94"
        y="108"
        width="28"
        height="12"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="126"
        y="108"
        width="46"
        height="12"
        fill="#FF4D6D"
        stroke="#000"
        strokeWidth="2"
      />

      <text x="31" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">
        React
      </text>
      <text x="70" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">
        TS
      </text>
      <text x="108" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">
        Next
      </text>
      <text x="149" y="116" textAnchor="middle" fill="#000" fontSize="5" fontWeight="700">
        Tailwind
      </text>
    </svg>
  );
}

function ClaymorphismPreview() {
  return (
    <svg
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* background */}
      <rect width="200" height="130" fill="#F6F7FB" />

      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* nav */}
      <g filter="url(#shadow)">
        <rect x="16" y="10" width="168" height="16" rx="8" fill="#FFFFFF" />
      </g>

      <rect x="24" y="15" width="24" height="4" rx="2" fill="#8B5CF6" />

      <g filter="url(#shadow)">
        <rect x="154" y="12" width="22" height="10" rx="5" fill="#DBEAFE" />
      </g>

      {/* avatar */}
      <g filter="url(#shadow)">
        <circle cx="100" cy="52" r="24" fill="#DBEAFE" />
      </g>

      <text
        x="100"
        y="57"
        textAnchor="middle"
        fill="#4C1D95"
        fontSize="11"
        fontWeight="bold"
      >
        AB
      </text>

      {/* title */}
      <g filter="url(#shadow)">
        <rect x="55" y="82" width="90" height="8" rx="4" fill="#FFFFFF" />
      </g>

      {/* subtitle */}
      <g filter="url(#shadow)">
        <rect x="70" y="95" width="60" height="6" rx="3" fill="#E9D5FF" />
      </g>

      {/* skill pills */}
      <g filter="url(#shadow)">
        <rect x="16" y="110" width="30" height="10" rx="5" fill="#FFFFFF" />
        <rect x="50" y="110" width="40" height="10" rx="5" fill="#DBEAFE" />
        <rect x="94" y="110" width="28" height="10" rx="5" fill="#FFFFFF" />
        <rect x="126" y="110" width="48" height="10" rx="5" fill="#E9D5FF" />
      </g>

      <text x="31" y="117" textAnchor="middle" fill="#555" fontSize="5">
        React
      </text>
      <text x="70" y="117" textAnchor="middle" fill="#555" fontSize="5">
        TS
      </text>
      <text x="108" y="117" textAnchor="middle" fill="#555" fontSize="5">
        Next
      </text>
      <text x="150" y="117" textAnchor="middle" fill="#555" fontSize="5">
        Tailwind
      </text>
    </svg>
  );
}


function SwissStylePreview() {
  return (
    <svg
      viewBox="0 0 200 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background */}
      <rect width="200" height="130" fill="#FFFFFF" />

      {/* Swiss accent bar */}
      <rect x="16" y="0" width="6" height="130" fill="#E11D48" />

      {/* Grid lines */}
      <rect x="40" y="0" width="0.5" height="130" fill="#E5E7EB" />
      <rect x="120" y="0" width="0.5" height="130" fill="#E5E7EB" />

      {/* Header */}
      <rect x="50" y="16" width="70" height="7" fill="#111111" />
      <rect x="50" y="28" width="90" height="3" fill="#9CA3AF" />

      {/* Editorial image block */}
      <rect x="50" y="42" width="55" height="55" fill="#F3F4F6" />
      <text
        x="77.5"
        y="72"
        textAnchor="middle"
        fill="#6B7280"
        fontSize="10"
        fontWeight="700"
      >
        IMAGE
      </text>

      {/* Text column */}
      <rect x="115" y="42" width="45" height="4" fill="#111111" />
      <rect x="115" y="50" width="35" height="2" fill="#9CA3AF" />
      <rect x="115" y="56" width="40" height="2" fill="#9CA3AF" />
      <rect x="115" y="62" width="30" height="2" fill="#9CA3AF" />

      <rect x="115" y="74" width="38" height="4" fill="#111111" />
      <rect x="115" y="82" width="42" height="2" fill="#9CA3AF" />
      <rect x="115" y="88" width="28" height="2" fill="#9CA3AF" />

      {/* Footer tags */}
      <rect x="50" y="108" width="24" height="8" fill="#111111" />
      <rect x="80" y="108" width="30" height="8" fill="#E5E7EB" />
      <rect x="116" y="108" width="38" height="8" fill="#E5E7EB" />

      <text x="62" y="114" textAnchor="middle" fill="#FFF" fontSize="4.5">
        UI
      </text>
      <text x="95" y="114" textAnchor="middle" fill="#555" fontSize="4.5">
        Type
      </text>
      <text x="135" y="114" textAnchor="middle" fill="#555" fontSize="4.5">
        Grid
      </text>
    </svg>
  );
}

// ─── Template Registry (client-side metadata only) ────────────────────────────

const TEMPLATES: TemplateDefinition[] = [
  {
    id: "original",
    name: "Original",
    description: "Dark, editorial dashboard layout with stat cards and glassmorphism accents.",
    tag: "Dark · Grid",
    palette: ["#0a0a0a", "#ffffff", "#1a1a1a"],
    preview: OriginalPreview,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean white canvas, centered hero, and generous whitespace — lets the work speak.",
    tag: "Light · Centered",
    palette: ["#fafafa", "#111111", "#f0f0f0"],
    preview: MinimalPreview,
  },
  {
  id: "neobrutalism",
  name: "Neo Brutalism",
  description: "Bold colors, thick borders, hard shadows, and playful geometry that demand attention.",
  tag: "Bold · Playful",
  palette: ["#ffde59", "#111111", "#ff5c8a"],
  preview: NeoBrutalismPreview,
},
{
  id: "claymorphism",
  name: "Claymorphism",
  description: "Soft, pillowy surfaces with gentle shadows, rounded shapes, and a playful tactile feel.",
  tag: "Soft · Tactile",
  palette: ["#f6f7fb", "#8b5cf6", "#dbeafe"],
  preview: ClaymorphismPreview,
},
{
  id: "swissstyle",
  name: "Swiss Style",
  description: "Grid-driven layouts, bold typography, precise alignment, and timeless editorial clarity.",
  tag: "Editorial · Grid",
  palette: ["#ffffff", "#111111", "#e11d48"],
  preview: SwissStylePreview,
},
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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
      <span className="text-3xl font-bold text-black dark:text-white tabular-nums">{value}</span>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-black dark:bg-white group-hover:w-full transition-all duration-500 rounded-full" />
    </div>
  );
}

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

// ─── Template Picker Modal ────────────────────────────────────────────────────

function TemplatePickerModal({
  currentTemplate,
  onSelect,
  onClose,
}: {
  currentTemplate: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState(currentTemplate);

  const handleConfirm = async () => {
    if (selected === currentTemplate) { onClose(); return; }
    setSaving(true);
    await onSelect(selected);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-900">
          <div>
            <h2 className="text-base font-bold text-black dark:text-white">Choose a Template</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Pick a design — you can switch anytime without losing content.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-lg leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Template grid */}
        <div className="p-6 grid sm:grid-cols-3 gap-4">
  {TEMPLATES.map((tmpl) => {
    const isSelected = selected === tmpl.id;
    const Preview = tmpl.preview;

    return (
      <div
        key={tmpl.id}
        onMouseEnter={() => setHovered(tmpl.id)}
        onMouseLeave={() => setHovered(null)}
        className={`group relative rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
          isSelected
            ? "border-black dark:border-white shadow-md"
            : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
        }`}
      >
        {/* Preview area */}
        <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-gray-950">
          <Preview />

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${
              hovered === tmpl.id && !isSelected
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow">
              {isSelected ? "Selected" : "Preview Available"}
            </span>
          </div>

          {/* Selected badge */}
          {isSelected && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold shadow">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-4 py-3 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-black dark:text-white">
              {tmpl.name}
            </span>

            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded-full">
              {tmpl.tag}
            </span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {tmpl.description}
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() =>
                window.open(`/preview/${tmpl.id}`, "_blank")
              }
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              Preview
            </button>

            <button
              type="button"
              onClick={() => setSelected(tmpl.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                isSelected
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {isSelected ? "Selected" : "Select"}
            </button>
          </div>

          {/* Palette */}
          <div className="flex items-center gap-1.5 mt-3">
            {tmpl.palette.map((hex) => (
              <span
                key={hex}
                className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        </div>
      </div>
    );
  })}
</div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between gap-3 bg-gray-50 dark:bg-[#0a0a0a]">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            More templates coming soon.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 dark:border-black/40 border-t-white dark:border-t-black rounded-full animate-spin" />
                  Applying…
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Apply Template
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function PortfolioDashboard({
  data,
  onPreview,
}: {
  data: PortfolioData;
  onPreview: () => void;
}) {
  const router = useRouter();

  const [headerVisible, setHeaderVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  // Publish state
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Template state
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(data.selectedTemplate || "original");
  const [templateSaveToast, setTemplateSaveToast] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 50);
    const t2 = setTimeout(() => setBannerVisible(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const initials = data.name
    ? data.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const currentTemplateMeta = TEMPLATES.find((t) => t.id === activeTemplate) ?? TEMPLATES[0];

  // ── Template select handler ──
  const handleTemplateSelect = async (templateId: string) => {
    try {
      const res = await fetch("/api/v1/user/portfolio/template", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: templateId }),
      });
      if (!res.ok) throw new Error("Failed");
      setActiveTemplate(templateId);
      setShowTemplatePicker(false);
      setTemplateSaveToast(true);
      setTimeout(() => setTemplateSaveToast(false), 3000);
    } catch {
      alert("Failed to update template. Please try again.");
    }
  };

  // ── Publish handler ──
  const handlePublish = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/v1/user/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, selectedTemplate: activeTemplate }),
      });
      const resData = await res.json();
      if (!res.ok) { alert(resData.message || "Something went wrong"); return; }
      setPublishedSlug(resData.slug);
      setShowSuccessModal(true);
    } catch {
      alert("Failed to publish portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${publishedSlug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleModalOk = () => {
    setShowSuccessModal(false);
    router.push(`/${publishedSlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Nav ── */}
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-widest hover:cursor-pointer">
                Profilix
              </span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-400" />
            <span className="text-xs text-gray-400 dark:text-gray-300">Dashboard</span>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* ── Publish banner ── */}
        <div
          className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden transition-all duration-500 ${
            bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="h-0.5 w-full bg-emerald-500" />
          <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Identity */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-base font-bold">
                {initials}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base font-bold text-black dark:text-white leading-tight truncate">
                    {data.name || "—"}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Ready to publish
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {data.title || "No title set"}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
              <button
                onClick={onPreview}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white text-sm font-medium hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-200 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                Edit sections
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                {isSaving ? "Publishing…" : "Publish & Go Live"}
                {!isSaving && (
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                )}
              </button>
            </div>
          </div>
          <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-[#0a0a0a] flex items-center gap-2">
            <Layers className="w-3 h-3 text-gray-400 dark:text-gray-300 flex-shrink-0" />
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Your portfolio is ready — publish now to get a live URL, or edit any section first.
            </p>
          </div>
        </div>

        {/* ── Template Selector Card ── */}
        <div
          className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden transition-all duration-500 ${
            bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <Layout className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-black dark:text-white">Portfolio Template</h2>
                <p className="text-xs text-gray-400 dark:text-gray-600">Design applied to your public page</p>
              </div>
            </div>
            <button
              onClick={() => setShowTemplatePicker(true)}
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              Change template
            </button>
          </div>

          {/* Active template display */}
          <div className="p-6">
            <div className="flex items-start gap-5">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-40 h-26 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="w-40 h-26">
                  <currentTemplateMeta.preview />
                </div>
                {/* live badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[9px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Current
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base font-bold text-black dark:text-white">
                    {currentTemplateMeta.name}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded-full">
                    {currentTemplateMeta.tag}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {currentTemplateMeta.description}
                </p>
                {/* Palette row */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-600">Palette</span>
                  <div className="flex items-center gap-1.5">
                    {currentTemplateMeta.palette.map((hex) => (
                      <span
                        key={hex}
                        className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Template list — quick switcher (desktop) */}
              <div className="hidden lg:flex flex-col gap-1.5 flex-shrink-0">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() =>
                      tmpl.id !== activeTemplate
                        ? handleTemplateSelect(tmpl.id)
                        : undefined
                    }
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                      tmpl.id === activeTemplate
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: tmpl.palette[0] }}
                    />
                    {tmpl.name}
                    {tmpl.id === activeTemplate && (
                      <Check className="w-3 h-3 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Code2} label="Skills" value={data.skills?.length ?? 0} delay={100} />
          <StatCard icon={Briefcase} label="Experience" value={data.experience?.length ?? 0} delay={150} />
          <StatCard icon={GraduationCap} label="Education" value={data.education?.length ?? 0} delay={200} />
          <StatCard icon={User} label="Projects" value={data.projects?.length ?? 0} delay={250} />
        </div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {data.about && (
              <SectionBlock title="About" delay={300}>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
                  {data.about}
                </p>
              </SectionBlock>
            )}

            {data.experience?.length > 0 && (
              <SectionBlock title="Experience" delay={350}>
                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative pl-4 border-l border-gray-200 dark:border-gray-800 group">
                      <div className="absolute -left-1 top-1 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300" />
                      <p className="text-sm font-semibold text-black dark:text-white">{exp.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {exp.company}{exp.duration ? ` · ${exp.duration}` : ""}
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

            {data.projects?.length > 0 && (
              <SectionBlock title="Projects" delay={400}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="group rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-[#0f0f0f] p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-black dark:text-white leading-tight">{proj.title}</p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{proj.description}</p>
                      {proj.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {proj.tech.slice(0, 4).map((t, j) => (
                            <span key={j} className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
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

          <div className="space-y-4">
            {data.skills?.length > 0 && (
              <SectionBlock title="Skills" delay={320}>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionBlock>
            )}

            {data.education?.length > 0 && (
              <SectionBlock title="Education" delay={370}>
                <div className="space-y-3">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-black dark:text-white leading-snug">{edu.degree}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {edu.school}{edu.year ? ` · ${edu.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}

            <SectionBlock title="Contact" delay={420}>
              <div className="space-y-3">
                {data.email && (
                  <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                    {data.email}
                  </a>
                )}
                <div className="flex items-center gap-3 pt-1">
                  {data.socialLinks?.github && (
                    <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105" aria-label="GitHub">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {data.socialLinks?.linkedin && (
                    <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {data.socialLinks?.twitter && (
                    <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 hover:scale-105" aria-label="Twitter">
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
              <p className="font-extralight text-gray-500">Build, customize, and showcase your portfolio effortlessly.</p>
            </div>
            <div className="flex gap-4 mt-3 md:mt-0">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <a href="https://github.com/Sujal-Raj/Profilix" target="_blank" className="hover:text-gray-200">GitHub</a>
              <a href="https://www.linkedin.com/in/sujalraj1/" target="_blank" className="hover:text-gray-200">LinkedIn</a>
            </div>
          </div>
          <div className="text-center pb-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Profilix. All rights reserved.
          </div>
        </footer>
      </div>

      {/* ── Template picker modal ── */}
      {showTemplatePicker && (
        <TemplatePickerModal
          currentTemplate={activeTemplate}
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      {/* ── Template saved toast ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium shadow-xl transition-all duration-300 ${
          templateSaveToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
        Template updated successfully
      </div>

      {/* ── Publish success modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md animate-fadeIn" onClick={handleModalOk} />
          <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div className="p-8">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce-once relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500" />
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-gray-900" />
                <Check className="w-8 h-8 relative z-10 text-black dark:text-white" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Portfolio is Live!
                </span>
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                Your portfolio has been successfully published
              </p>
              <div className="relative group mb-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 font-medium">YOUR PORTFOLIO URL</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white truncate">
                      {`${typeof window !== "undefined" ? window.location.origin : ""}/${publishedSlug}`}
                    </code>
                    <button onClick={handleCopy} className="flex-shrink-0 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-all active:scale-95" title="Copy to clipboard">
                      {copied ? <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> : <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handleModalOk} className="w-full py-3 px-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-black font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes bounceOnce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-bounce-once { animation: bounceOnce 0.6s ease-in-out; }
      `}</style>
    </div>
  );
}