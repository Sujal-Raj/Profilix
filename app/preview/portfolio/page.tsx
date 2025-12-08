"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Smartphone, Sun, Moon, Save,MoveLeft,Eye } from "lucide-react";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview/page";
import EditForm from "@/components/portfolio/EditForm/page";
import Link from "next/link";
// import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
// import EditForm from "@/components/portfolio/EditForm";

interface ParsedData {
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
    link?: string | null;
  }[];
  socialLinks: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export default function PreviewPortfolioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ParsedData | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSaving, setIsSaving] = useState(false);
  const [slug, setSlug] = useState<string>("");
  useEffect(() => {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem("portfolioData");
     const parsed = JSON.parse(storedData!);
      setSlug(parsed.slug);
      console.log(parsed.slug)
    // console.log(storedData?.slug)
    if (storedData) {
      setFormData(JSON.parse(storedData));
      // console.log(formData)
    } else {
      // If no data, redirect back
      router.push("/create");
    }
  }, [router]);

  const handleSave = async () => {
    if (!formData) return;
    
    setIsSaving(true);
    try {
      // Check if this is an update (has _id) or new portfolio
      const isUpdate = formData._id;
      
      const response = await fetch("/api/v1/portfolio", {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the user's portfolio page
        router.push(`/${data.slug || formData.slug}`);
      } else {
        const error = await response.json();
        console.error("Error saving portfolio:", error);
        alert("Failed to save portfolio. Please try again.");
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Failed to save portfolio. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/create/portfilio")}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <MoveLeft/>
            {/* ← Back */}
          </button>

          {/* View Mode Toggle */}
          {/* <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1"> */}
          <div className="flex items-center gap-2 rounded-lg p-1 pt-0">
            {/* <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === "desktop"
                  ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Monitor size={16} />
              <span className="text-sm font-medium">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                viewMode === "mobile"
                  ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Smartphone size={16} />
              <span className="text-sm font-medium">Mobile</span>
            </button> */}
            {/* Preview badge - positioned above the card */}
        <div className="inline-flex items-center gap-1.5 bg-black/95 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full shadow-xl border border-gray-800/50 ml-40">
          <Eye size={14} />
          <span>Preview mode</span>
        </div>
      </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg border-2 border-gray-700 transition-all duration-200 group cursor-pointer"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <Sun size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Save Button */}
            <Link href={`/${slug}`}>
            <button
              // onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
              <Save size={16} />
              {isSaving ? "Publishing..." : "Publish Portfolio"}
            </button>
              </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-18 flex">

        {/* Right Side - Edit Form */}
        <div className="h-[calc(100vh-80px)] bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800">
          <EditForm formData={formData} setFormData={setFormData} />
        </div>
        {/* Left Side - Portfolio Preview */}
        <div className="flex-1 flex items-start justify-center p-6 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
          <div
            className={`transition-all duration-500 ${
              viewMode === "mobile"
                ? "w-[375px] border-8 border-gray-900 dark:border-gray-300 rounded-[3rem] overflow-hidden shadow-2xl"
                : "w-full max-w-6xl"
            }`}
          >
            <div
              className={`${
                viewMode === "mobile" ? "h-[667px] overflow-y-auto custom-scrollbar" : ""
              }`}
            >
              <PortfolioPreview portfolio={formData} theme={theme} />
            </div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
          transition: background 0.2s;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }

        .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }

        .custom-scrollbar:not(:hover) {
          scrollbar-color: transparent transparent;
        }
      `}</style>
    </div>
  );
}