"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Save,
  MoveLeft,
  Eye,
  Edit3,
  Check,
  Copy,
  ChevronRight,
} from "lucide-react";
import EditForm from "@/components/portfolio/EditForm/page";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview/page";
import Link from "next/link";

// Import your components (simulated here)
// import PortfolioPreview from "@/components/portfolio/PortfolioPreview/page";
// import EditForm from "@/components/portfolio/EditForm/page";

/* ------------------------------------------------------------------ */
/*  SAFE UI TYPE (used everywhere in UI)                               */
/* ------------------------------------------------------------------ */
export interface Portfolio {
  _id?: string;
  userEmail?: string;
  slug?: string;
  name: string;
  title: string;
  email: string;
  about: string;
  status: string | null;
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
    link: string | null;
  }[];
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  UNSAFE INPUT TYPE (storage / backend only)                         */
/* ------------------------------------------------------------------ */
interface ParsedData {
  _id?: string;
  userEmail?: string;
  slug?: string;
  name: string;
  title: string;
  email: string;
  about: string;
  status?: string | null;
  skills?: string[];
  experience?: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  projects?: {
    title: string;
    description: string;
    tech: string[];
    link?: string | null;
  }[];
  socialLinks?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  NORMALIZER: ParsedData → Portfolio                                 */
/* ------------------------------------------------------------------ */
function toPortfolio(data: ParsedData): Portfolio {
  return {
    _id: data._id,
    userEmail: data.userEmail,
    slug: data.slug,
    name: data.name,
    title: data.title,
    email: data.email,
    about: data.about,
    status: data.status ?? null,
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    education: data.education ?? [],
    projects:
      data.projects?.map((p) => ({
        title: p.title,
        description: p.description,
        tech: p.tech,
        link: p.link ?? null,
      })) ?? [],
    socialLinks: {
      github: data.socialLinks?.github ?? null,
      linkedin: data.socialLinks?.linkedin ?? null,
      twitter: data.socialLinks?.twitter ?? null,
    },
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function PreviewPortfolioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Portfolio | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSaving, setIsSaving] = useState(false);
  const [showMobileEditor, setShowMobileEditor] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (formData) {
      sessionStorage.setItem("portfolioData", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("portfolioData");

    if (!storedData) {
      router.push("/create/portfolio");
      return;
    }

    const parsed: ParsedData = JSON.parse(storedData);
    const portfolio = toPortfolio(parsed);

    setFormData(portfolio);
  }, [router]);

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

  const handleModalOk = () => {
    setShowSuccessModal(false);
    router.push(`/${publishedSlug}`);
  };

  const handlePublish = async () => {
    if (!formData) return;

    setIsSaving(true);

    try {
      const res = await fetch("/api/v1/user/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setPublishedSlug(data.slug);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to publish portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="h-screen bg-gray-50 dark:bg-black flex flex-col overflow-hidden">
      {/* Navbar - Fixed */}
      <nav className="flex-shrink-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          {/* <button
            onClick={() => router.push("/create/portfolio")}
            className="p-2"
          >
            <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button> */}

          <div className="flex items-center gap-2">
            <Link href={"/"}>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-widest hover:cursor-pointer">
              Profilix
            </span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-400" />
            <Link href={"/create/portfolio"}>
            <span className="text-xs text-gray-400 dark:text-gray-300">Dashboard</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-400" />
            <span className="text-xs text-gray-400 dark:text-gray-300 ">Preview</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-1 text-[10px] sm:text-xs bg-black text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-full">
            <Eye size={12} className="sm:w-4.5 sm:h-4.5" />
            <span className="hidden sm:inline text-base tracking-tight">Preview mode</span>
            <span className="sm:hidden">Preview</span>
          </div>

         <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowMobileEditor(!showMobileEditor)}
              className="lg:hidden inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-600 transition-all"
            >
              {showMobileEditor ? (
                <>
                  <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>Preview</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 text-gray-700 dark:text-gray-200" />
                  <span>Edit</span>
                </>
              )}
            </button>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs sm:text-base"
            >
              <Save size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {isSaving ? "Publishing..." : "Publish Portfolio"}
              </span>
              <span className="sm:hidden">
                {isSaving ? "Publishing..." : "Publish"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content - Flexible with scroll */}
      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Desktop Editor - Fixed, no scroll on its own */}
        <div className="hidden lg:block flex-shrink-0">
          <EditForm formData={formData} setFormData={setFormData} />
          {/* <div className="h-full">Edit Form Here (Fixed)</div> */}
        </div>

        {/* Mobile Editor - Overlay/Modal */}
        {showMobileEditor && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileEditor(false)}
            />
            <div className="relative h-full bg-white dark:bg-black overflow-y-auto">
              <EditForm formData={formData} setFormData={setFormData} />
              {/* <div className="p-6">Mobile Edit Form Here</div> */}
            </div>
          </div>
        )}

        {/* Preview - Scrollable with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-6">
          <PortfolioPreview portfolio={formData} theme={theme} />
          {/* <div className="min-h-[200vh] bg-white dark:bg-gray-900 rounded-xl p-6">
            <h1 className="text-3xl font-bold mb-4">Portfolio Preview</h1>
            <p>This section scrolls independently. The edit form stays fixed.</p>
            <div className="mt-8 space-y-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  Content block {i + 1}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md animate-fadeIn"
            onClick={handleModalOk}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1" />

            <div className="p-8">
              {/* Success icon */}
              {/* <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-full flex items-center justify-center mb-6 animate-bounce-once">
                <Check className="w-8 h-8 text-white dark:text-black" strokeWidth={3} />
              </div> */}
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-bounce-once relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500" />
                <div className="absolute inset-[3px] rounded-full bg-white dark:bg-gray-900" />
                <Check
                  className="w-8 h-8 relative z-10 text-black dark:text-white"
                  strokeWidth={3}
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-2 ">
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

              {/* OK button */}
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
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceOnce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-bounce-once {
          animation: bounceOnce 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
