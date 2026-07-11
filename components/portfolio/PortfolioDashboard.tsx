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
  Layout,
  Lock,
  Eye,
  ShoppingCart,
  Star,
  Crown,
  ImageOff,
} from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
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

interface ApiTemplate {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  isActive: boolean;
  isPurchased?: boolean;
  isAccessible?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Preview Map (local SVG fallback thumbnails) ──────────────────────────────
// Only used if thumbnail image fails to load

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
    </svg>
  );
}

const PREVIEW_MAP: Record<string, React.FC> = {
  original: OriginalPreview,
};

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

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  isActive,
  onSelect,
  onPreview,
  onPurchase,
  isPurchasing,
}: {
  template: ApiTemplate;
  isActive: boolean;
  onSelect: (slug: string) => void;
  onPreview: (slug: string) => void;
  onPurchase: (slug: string) => void;
  isPurchasing: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const FallbackPreview = PREVIEW_MAP[template.slug];
  const isLocked = !template.isFree && !template.isAccessible;

  const handleSelect = async () => {
    if (isActive) return;
    setSelecting(true);
    await onSelect(template.slug);
    setSelecting(false);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border-2 overflow-hidden bg-white dark:bg-black transition-all duration-200 ${
        isActive
          ? "border-black dark:border-white shadow-lg"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
      }`}
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-950 flex-shrink-0">
        {!imgError ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : FallbackPreview ? (
          <FallbackPreview />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-600">
            <ImageOff className="w-6 h-6" />
            <span className="text-xs">No preview</span>
          </div>
        )}

        {/* Active badge */}
        {isActive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold shadow-lg">
            <CheckCircle2 className="w-3 h-3" />
            Active
          </div>
        )}

        {/* Pricing badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg ${
            template.isFree
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
          }`}
        >
          {template.isFree ? (
            <>
              <Check className="w-3 h-3" />
              Free
            </>
          ) : (
            <>
              <Crown className="w-3 h-3" />
              ${template.price}
            </>
          )}
        </div>

        {/* Hover overlay with preview CTA */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onPreview(template.slug)}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white leading-tight">
              {template.name}
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 font-mono">
              /{template.slug}
            </p>
          </div>
          {!template.isFree && (
            <div className="flex-shrink-0 flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-bold">${template.price}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => onPreview(template.slug)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-all duration-150"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>

          {template.isFree || template.isAccessible ? (
            <button
              onClick={handleSelect}
              disabled={isActive || selecting}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-black dark:bg-white text-white dark:text-black cursor-default"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {selecting ? (
                <span className="w-3.5 h-3.5 border-2 border-current/40 border-t-current rounded-full animate-spin" />
              ) : isActive ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Applied
                </>
              ) : (
                template.isFree ? "Use this" : "Use this"
              )}
            </button>
          ) : (
            <button
              onClick={() => onPurchase(template.slug)}
              disabled={isPurchasing}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-150 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPurchasing ? (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Buy · ${template.price}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Template Section Skeleton ────────────────────────────────────────────────

function TemplateSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black">
          <div className="h-44 bg-gray-100 dark:bg-gray-900" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="flex gap-2 pt-1">
              <div className="flex-1 h-9 rounded-xl bg-gray-100 dark:bg-gray-800" />
              <div className="flex-1 h-9 rounded-xl bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
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
  const [templates, setTemplates] = useState<ApiTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState(data.selectedTemplate || "original");
  const [templateSaveToast, setTemplateSaveToast] = useState(false);
  const [purchasingSlug, setPurchasingSlug] = useState<string | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 50);
    const t2 = setTimeout(() => setBannerVisible(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Fetch templates ──
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/v2/all-templates");
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        const list: ApiTemplate[] = Array.isArray(json) ? json : json.data ?? [];
        setTemplates(list.filter((t) => t.isActive));
      } catch (err) {
        console.error("Templates fetch failed:", err);
      } finally {
        setTemplatesLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const initials = data.name
    ? data.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const activeTemplateMeta = templates.find((t) => t.slug === activeTemplate);

  // ── Template select handler ──
  const handleTemplateSelect = async (slug: string) => {
    try {
      const res = await fetch("/api/v1/user/portfolio/template", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      setActiveTemplate(slug);
      setTemplates((prev) =>
        prev.map((template) =>
          template.slug === slug ? { ...template, isAccessible: true, isPurchased: true } : template
        )
      );
      setTemplateSaveToast(true);
      setTimeout(() => setTemplateSaveToast(false), 3000);
    } catch {
      alert("Failed to update template. Please try again.");
    }
  };

  const handlePurchaseTemplate = async (slug: string) => {
    const selectedTemplate = templates.find((template) => template.slug === slug);
    if (!selectedTemplate) return;

    setPurchasingSlug(slug);

    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = async () => {
        try {
          const res = await fetch("/api/v1/user/portfolio/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ templateSlug: slug }),
          });
          const data = await res.json();
          console.log(data.order);

          if (!res.ok || !data.success || !data.order?.id) {
            throw new Error(data.message || "Checkout failed");
          }
          console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
            amount: data.order.amount,
            currency: data.order.currency,
            order_id: data.order.id,
            name: "Profilix",
            description: `Unlock ${selectedTemplate.name}`,
            prefill: {
              email: data.userEmail || "",
            },
            handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
              try {
                const verifyRes = await fetch("/api/v1/user/portfolio/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(response),
                });
                const verifyData = await verifyRes.json();
                if (!verifyRes.ok || !verifyData.success) {
                  throw new Error(verifyData.message || "Payment verification failed");
                }
                setTemplates((prev) =>
                  prev.map((template) =>
                    template.slug === slug ? { ...template, isAccessible: true, isPurchased: true } : template
                  )
                );
                setActiveTemplate(slug);
                setTemplateSaveToast(true);
                setTimeout(() => setTemplateSaveToast(false), 3000);
                router.push(`/payment/success?slug=${slug}`);
              } catch {
                alert("Payment succeeded but access could not be unlocked. Please contact support.");
              }
            },
            modal: {
              ondismiss: () => {
                router.push("/payment/failed");
              },
            },
            theme: { color: "#000000" },
          };

          const RazorpayCtor = (window as Window & { Razorpay?: any }).Razorpay;
          if (!RazorpayCtor) {
            throw new Error("Razorpay checkout is unavailable in this browser");
          }
          const rzp = new RazorpayCtor(options);
          rzp.on("payment.failed", function (response: any) {
  console.log("Payment Failed:", response.error);
  alert(JSON.stringify(response.error, null, 2));
});
          rzp.open();
        } catch (error) {
          alert(error instanceof Error ? error.message : "Checkout failed");
        } finally {
          setPurchasingSlug(null);
        }
      };
      script.onerror = () => {
        alert("Unable to load Razorpay checkout. Please try again.");
        setPurchasingSlug(null);
      };
      document.body.appendChild(script);
    } catch {
      alert("Unable to start payment checkout.");
      setPurchasingSlug(null);
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
              {activeTemplateMeta
                ? <>Using <span className="font-semibold text-black dark:text-white">{activeTemplateMeta.name}</span> template — publish now to go live, or pick a different design below.</>
                : "Your portfolio is ready — publish now to get a live URL, or edit any section first."
              }
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Code2}         label="Skills"     value={data.skills?.length ?? 0}     delay={100} />
          <StatCard icon={Briefcase}     label="Experience" value={data.experience?.length ?? 0}  delay={150} />
          <StatCard icon={GraduationCap} label="Education"  value={data.education?.length ?? 0}   delay={200} />
          <StatCard icon={User}          label="Projects"   value={data.projects?.length ?? 0}    delay={250} />
        </div>

        {/* ── Templates section ── */}
        <div
          className={`space-y-4 transition-all duration-500 ${
            bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm">
                <Layout className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-black dark:text-white">Choose a Template</h2>
                <p className="text-xs text-gray-400 dark:text-gray-600">
                  {templatesLoading
                    ? "Loading templates…"
                    : `${templates.length} template${templates.length !== 1 ? "s" : ""} available · ${templates.filter(t => t.isFree).length} free`}
                </p>
              </div>
            </div>
            {!templatesLoading && templates.some(t => !t.isFree) && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800">
                <Crown className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  Premium templates available
                </span>
              </div>
            )}
          </div>

          {/* Template grid */}
          {templatesLoading ? (
            <TemplateSkeleton />
          ) : templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600">
              <Layout className="w-8 h-8 mb-3" />
              <p className="text-sm font-medium">No templates available</p>
              <p className="text-xs mt-1">Check back soon — more are on the way.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tmpl) => (
                <TemplateCard
                  key={tmpl._id}
                  template={tmpl}
                  isActive={activeTemplate === tmpl.slug}
                  onSelect={handleTemplateSelect}
                  onPreview={(slug) => window.open(`/preview/${slug}`, "_blank")}
                  onPurchase={handlePurchaseTemplate}
                  isPurchasing={purchasingSlug === tmpl.slug}
                />
              ))}
            </div>
          )}
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
          <hr className="border-gray-200 dark:border-gray-800" />
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

      {/* ── Template saved toast ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium shadow-xl transition-all duration-300 whitespace-nowrap ${
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