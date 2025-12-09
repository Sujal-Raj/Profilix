"use client";

import { useEffect, useState } from "react";
import { Upload, FileText, Sparkles, Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastContext";

interface ParsedData {
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
}

export default function CreatePortfolioPage() {
  const { user } = useUser();
  // console.log(user)
  const currentUser = user?.primaryEmailAddress?.emailAddress;
  // const currentUser = "bhumi.sahayata10@gmail.com";
  console.log(currentUser);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<
    "upload" | "manual" | null
  >(null);
    const router = useRouter();
    const { showToast } = useToast();


  const [formData, setFormData] = useState<ParsedData>({
    name: "",
    title: "",
    email: "",
    about: "",
    status: "Open to opportunities",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    socialLinks: {
      github: null,
      linkedin: null,
      twitter: null,
    },
  });

  // useEffect(() => {
  //   const fetchPortfolio = async () => {
  //     const res = await fetch("/api/v1/user", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: currentUser }),
  //     });
  //     // console.log(res);
  //     const data = await res.json();
  //     console.log(data.user);
  //     if(data.user){
  //        sessionStorage.setItem("portfolioData", JSON.stringify(data.user));
  //           showToast("Loading your existing portfolio...");
  //           router.push("/preview-portfolio");
  //     }
  //       //       setFormData({ ...data.user });
  //       //       showToast("You have already a parsed data from resume")
  //       // setShowForm(true);
  //       setSelectedOption("upload");
  //   };

  //   // fetchPortfolio();
  //    if (currentUser) fetchPortfolio()


  // }, [currentUser]);


  useEffect(() => {
  let isMounted = true;

  const fetchPortfolio = async () => {
    if (!currentUser) return;
    
    try {
      console.log("Fetching for:", currentUser); // Debug
      const res = await fetch("/api/v1/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser }),
      });

      if (!res.ok) {
        console.error("API Error:", res.status); // Check Network tab
        return;
      }

      const data = await res.json();
      console.log("Full response:", data); // Debug

      if (data.user && isMounted) {
        sessionStorage.setItem("portfolioData", JSON.stringify(data.user));
        showToast("Loading your existing portfolio...");
        
        // Test with known route first
        setTimeout(() => {
          if (isMounted) {
            // router.push("/"); // ← Test this works first
            router.push("/preview/portfolio"); // Then uncomment
          }
        }, 100);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  fetchPortfolio();

  return () => { isMounted = false; };
}, [currentUser]);

  // ================== Drag & Drop ==================

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  // ================== AI Parse Resume ==================

  const handleParseResume = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("resume", file);
      if (currentUser) {
        formDataToSend.append("currentUser", currentUser);
      }

      const response = await fetch("/api/v1/ai/parse", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.portfolio) {
        // data.portfolio must match ParsedData shape
        router.push("/preview/portfolio")
        // setFormData({ ...data.portfolio });
        // setShowForm(true);
        // setSelectedOption("upload");
      } else {
        setError("No portfolio data found in the response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualEntry = () => {
    setSelectedOption("manual");
    setShowForm(true);
  };

  // ================== Generic Field Handlers ==================

  const handleInputChange = (field: keyof ParsedData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---- Skills ----
  const handleSkillChange = (index: number, value: string) => {
    setFormData((prev) => {
      const skills = [...prev.skills];
      skills[index] = value;
      return { ...prev, skills };
    });
  };

  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => {
      const skills = [...prev.skills];
      skills.splice(index, 1);
      return { ...prev, skills };
    });
  };

  // ---- Experience ----
  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "", company: "", duration: "", description: "" },
      ],
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof ParsedData["experience"][number],
    value: string
  ) => {
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => {
      const experience = [...prev.experience];
      experience.splice(index, 1);
      return { ...prev, experience };
    });
  };

  // ---- Education ----
  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof ParsedData["education"][number],
    value: string
  ) => {
    setFormData((prev) => {
      const education = [...prev.education];
      education[index] = { ...education[index], [field]: value };
      return { ...prev, education };
    });
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => {
      const education = [...prev.education];
      education.splice(index, 1);
      return { ...prev, education };
    });
  };

  // ---- Projects ----
  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", description: "", tech: [], link: "" },
      ],
    }));
  };

  const handleProjectChange = (
    index: number,
    field: keyof ParsedData["projects"][number],
    value: string
  ) => {
    setFormData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  // tech as comma-separated string in UI → string[] in state
  const handleProjectTechChange = (index: number, value: string) => {
    const techArray = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setFormData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], tech: techArray };
      return { ...prev, projects };
    });
  };

  const handleRemoveProject = (index: number) => {
    setFormData((prev) => {
      const projects = [...prev.projects];
      projects.splice(index, 1);
      return { ...prev, projects };
    });
  };

  // ---- Social Links ----
  const handleSocialLinkChange = (
    platform: keyof ParsedData["socialLinks"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value || null,
      },
    }));
  };

  // ================== Submit / Reset ==================


  const handleCreatePortfolio = async () => {
    console.log("Creating portfolio with data:", formData);

    // Here you’d POST to your /api/portfolio endpoint with:
    // { ...formData, userEmail: currentUser, slug: ... }
    alert("Portfolio creation logic to be implemented!");

    const res = await fetch("/api/v1/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: currentUser }),
    });

    const data = await res.json();
    // console.log(data)
    console.log(data.user.slug);
    const slug = data.user.slug;

    router.push(`/${slug}`);
  };

  const handleStartOver = () => {
    setShowForm(false);
    setFile(null);
    setSelectedOption(null);
    setError(null);
    setFormData({
      name: "",
      title: "",
      email: "",
      about: "",
      status: "Open to opportunities",
      skills: [],
      experience: [],
      education: [],
      projects: [],
      socialLinks: {
        github: null,
        linkedin: null,
        twitter: null,
      },
    });
  };

  // ================== FULL FORM VIEW ==================

  if (showForm) {
    return (
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2">
              Customize Your Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and edit your information before creating
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Full Stack Developer"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>
              </div>

              {/* Email & Status */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    placeholder="Open to opportunities"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>
              </div>

              {/* About */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  About
                </label>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition resize-none"
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Skills
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="e.g., React, Node.js"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200 hover:scale-110"
                      aria-label="Delete skill"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddSkill}
                  className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition font-medium text-sm"
                >
                  + Add Skill
                </button>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Experience
                </label>
                {formData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="mb-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) =>
                          handleExperienceChange(index, "role", e.target.value)
                        }
                        placeholder="Role (e.g., Senior Software Engineer)"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="Duration (e.g., 2022 - Present)"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description of your responsibilities and achievements"
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveExperience(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200 hover:scale-110"
                        aria-label="Delete experience"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddExperience}
                  className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition font-medium text-sm"
                >
                  + Add Experience
                </button>
              </div>

              {/* Education */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Education
                </label>
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3"
                  >
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) =>
                          handleEducationChange(index, "school", e.target.value)
                        }
                        placeholder="School / University"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) =>
                          handleEducationChange(index, "year", e.target.value)
                        }
                        placeholder="Year (e.g., 2020)"
                        className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveEducation(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200 hover:scale-110"
                        aria-label="Delete education"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddEducation}
                  className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition font-medium text-sm"
                >
                  + Add Education
                </button>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Projects
                </label>
                {formData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="mb-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3"
                  >
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        handleProjectChange(index, "title", e.target.value)
                      }
                      placeholder="Project title"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Project description"
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm resize-none"
                    />
                    <input
                      type="text"
                      value={project.tech.join(", ")}
                      onChange={(e) =>
                        handleProjectTechChange(index, e.target.value)
                      }
                      placeholder="Technologies (comma separated e.g., React, Node.js)"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                    />
                    <input
                      type="url"
                      value={project.link || ""}
                      onChange={(e) =>
                        handleProjectChange(index, "link", e.target.value)
                      }
                      placeholder="Project link (optional)"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveProject(index)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-200 hover:scale-110"
                        aria-label="Delete project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddProject}
                  className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition font-medium text-sm"
                >
                  + Add Project
                </button>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Social Links
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.socialLinks.github || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("github", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.socialLinks.linkedin || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("linkedin", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={formData.socialLinks.twitter || ""}
                    onChange={(e) =>
                      handleSocialLinkChange("twitter", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartOver}
                className="flex-1 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                Start Over
              </button>
              {/* <Link href={`/${slug}`}> */}
              <button
                onClick={handleCreatePortfolio}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Create Portfolio
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================== FIRST SCREEN (UPLOAD / MANUAL) ==================

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Create Your Portfolio
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose how you&apos;d like to get started
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6 lg:gap-8 w-[95%] md:w-[70%] mx-auto">
          {/* Upload Resume Option */}
          <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-10 hover:border-gray-300 dark:hover:border-gray-700 transition">
            <div className="flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-2 mx-auto">
              <Sparkles className="w-8 h-8 text-white dark:text-black" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-1 text-center">
              Upload Resume
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Let AI parse your resume and auto-fill the form
            </p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("resume-upload")?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                isDragging
                  ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900"
                  : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <p className="text-base font-semibold text-black dark:text-white mb-2">
                {file ? file.name : "Drop your resume here"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                or click to browse (PDF only)
              </p>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {file && (
              <button
                onClick={handleParseResume}
                disabled={isLoading}
                className="w-full mt-6 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
                    Parsing Resume...
                  </span>
                ) : (
                  "Continue with Resume"
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-400 text-sm font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <button
          onClick={()=>{
            setShowForm(true);
          }} className="w-[90%] mx-auto mt-0 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
            Don&apos;t have a resume. Start entering manually
          </button>

          {/* Manual Entry Form (preview) */}
          {/* <div className="border-2 border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-10">
            <div className="flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6 mx-auto">
              <FileText className="w-8 h-8 text-white dark:text-black" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3 text-center">
              Fill Manually
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Enter your information step by step
            </p> */}

            {/* <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"> */}
              {/* Name */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition text-sm"
                />
              </div> */}

              {/* Title */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Full Stack Developer"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition text-sm"
                />
              </div> */}

              {/* Email */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition text-sm"
                />
              </div> */}

              {/* About */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  About
                </label>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={3}
                  placeholder="Brief description..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition resize-none text-sm"
                />
              </div> */}

              {/* Skills (preview, first 2) */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Skills
                </label>
                {formData.skills.slice(0, 2).map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="e.g., React"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition mb-2 text-sm"
                  />
                ))}
                {formData.skills.length < 2 && (
                  <button
                    onClick={handleAddSkill}
                    className="text-sm text-black dark:text-white hover:underline"
                  >
                    + Add skill
                  </button>
                )}
              </div> */}

              {/* Social Links Preview */}
              {/* <div>
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Social Links
                </label>
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.socialLinks.github || ""}
                  onChange={(e) =>
                    handleSocialLinkChange("github", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition mb-2 text-sm"
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={formData.socialLinks.linkedin || ""}
                  onChange={(e) =>
                    handleSocialLinkChange("linkedin", e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleManualEntry}
              className="w-full mt-6 bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              Continue to Full Form
            </button>
          </div>
        </div> */}

        <div className="mt-1 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Both options let you review and edit before creating your portfolio
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
