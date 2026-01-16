import { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type SocialLinks = {
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
};

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
};

type Education = {
  degree: string;
  school: string;
  year: string;
};

type Portfolio = {
  name: string;
  title: string | null;
  email: string | null;
  about: string;
  status: string | null;
  userEmail?: string;

  socialLinks: SocialLinks;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: string[];
};

interface PortfolioPreviewProps {
  portfolio: Portfolio;
  theme: "light" | "dark";
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function PortfolioPreview({
  portfolio,
  theme,
}: PortfolioPreviewProps) {
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrolled(target.scrollTop > 20);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const previewContainer = document.getElementById('preview-container');
    previewContainer?.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      previewContainer?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main
      id="preview-container"
      className={`min-h-screen border border-white ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors duration-300 rounded-xl sm:rounded-2xl relative overflow-hidden`}
    >
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}>
      </div>

      {/* Subtle cursor glow */}
      <div 
        className="fixed w-[400px] h-[400px] pointer-events-none opacity-0 md:opacity-20 dark:opacity-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-0"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: 'radial-gradient(circle, rgba(100, 100, 100, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Header */}
      <header className={` top-0 z-50 transition-all duration-500 ${scrolled ? (isDark ? 'bg-black/80' : 'bg-white/80') + ' backdrop-blur-xl border-b ' + (isDark ? 'border-gray-900' : 'border-gray-100') : ''}`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="font-bold text-base sm:text-lg tracking-tight transition-all duration-300 hover:opacity-60">
            {portfolio.name}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {portfolio.socialLinks.github && (
              <a
                href={portfolio.socialLinks.github}
                className={`p-2 ${
                  isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"
                } rounded-lg transition-all duration-300`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {portfolio.socialLinks.linkedin && (
              <a
                href={portfolio.socialLinks.linkedin}
                className={`p-2 ${
                  isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"
                } rounded-lg transition-all duration-300`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${portfolio.email}`}
              className={`ml-2 px-4 sm:px-5 py-2 ${
                isDark
                  ? "bg-white text-black"
                  : "bg-gray-900 text-white"
              } rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-all duration-300`}
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-20">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-16 pb-16 sm:pb-24 lg:pb-32 relative">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${
            isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
          } rounded-full mb-6 sm:mb-8 border animate-fade-in`}>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
            <span className="text-xs font-medium">
              {portfolio.status || "Available for opportunities"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 tracking-tight leading-[1.1] animate-fade-in-up">
            {portfolio.name}
          </h1>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 sm:mb-6 text-gray-600 dark:text-gray-400 animate-fade-in-up animation-delay-100">
            {portfolio.title}
          </h2>

          <p className="max-w-2xl mb-4 sm:mb-5 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up animation-delay-200">
            {portfolio.about}
          </p>

          <div className="flex flex-wrap gap-4 items-center animate-fade-in-up animation-delay-300">
            <a
              href={`mailto:${portfolio.email}`}
              className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 ${
                isDark ? "bg-white text-black" : "bg-gray-900 text-white"
              } rounded-lg font-medium text-sm sm:text-base hover:opacity-90 transition-all duration-300 group`}
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </section>

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <section className="mb-16 sm:mb-24 lg:mb-32">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Experience</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {portfolio.experience.map((exp: Experience, i: number) => (
                <div
                  key={i}
                  className={`group relative p-5 sm:p-6 lg:p-8 rounded-xl ${
                    isDark ? "bg-black border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"
                  } border transition-all duration-500 hover:shadow-xl ${
                    isDark ? "hover:shadow-gray-900/50" : "hover:shadow-gray-100"
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-3 sm:mb-4 gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl dark:group-hover:text-gray-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white shrink-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r ${
                    isDark ? "from-gray-800 via-gray-700" : "from-gray-200 via-gray-300"
                  } to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <section className="mb-16 sm:mb-24 lg:mb-32">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1">
              {portfolio.projects.map((proj: Project, i: number) => (
                <div
                  key={i}
                  onClick={() => proj.link && window.open(proj.link, "_blank")}
                  className={`group relative p-5 sm:p-6 lg:p-8 rounded-xl ${
                    isDark ? "bg-black border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"
                  } border cursor-pointer transition-all duration-500 hover:shadow-xl ${
                    isDark ? "hover:shadow-gray-900/50" : "hover:shadow-gray-100"
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl dark:group-hover:text-gray-300 transition-colors">
                      {proj.title}
                    </h3>
                    {proj.link && <ExternalLink className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </div>
                  <p className="mb-3 sm:mb-5 text-sm sm:text-base text-gray-500 dark:text-gray-500 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((tech: string, j: number) => (
                      <span
                        key={j}
                        className={`px-3 py-1.5 text-xs font-sans rounded-lg bg-black text-white dark:bg-white dark:text-black border border-gray-200 dark:border-gray-800 hover:scale-110 transition-all ease-out hover:font-semibold`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r ${
                    isDark ? "from-gray-800 via-gray-700" : "from-gray-200 via-gray-300"
                  } to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <section className="mb-16 sm:mb-24 lg:mb-32">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Education</h2>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1">
              {portfolio.education.map((edu: Education, i: number) => (
                <div 
                  key={i} 
                  className={`group relative p-5 sm:p-6 lg:p-8 rounded-xl ${
                    isDark ? "bg-black border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"
                  } border transition-all duration-500 hover:shadow-xl ${
                    isDark ? "hover:shadow-gray-900/50" : "hover:shadow-gray-100"
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="text-base sm:text-lg mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    {edu.school}
                  </p>
                  <p className="text-sm bg-black text-white border inline-block rounded-md py-1 px-2  dark:bg-white dark:text-black hover:scale-110 transition-all ease-out  cursor-pointer">
                    {edu.year}
                  </p>

                  <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r ${
                    isDark ? "from-gray-800 via-gray-700" : "from-gray-200 via-gray-300"
                  } to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="mb-16 sm:mb-24 lg:mb-32">
            <div className="flex items-center gap-3 mb-8 sm:mb-12">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Skills & Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {portfolio.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className={`px-3 sm:px-5 py-2 sm:py-3 text-sm font-medium rounded-lg ${
                    isDark ? "bg-white text-black border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"
                  } border hover:shadow-lg transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className={`relative rounded-2xl sm:rounded-3xl bg-gradient-to-br ${
          isDark ? "from-white to-gray-100" : "from-gray-900 to-black"
        } p-8 sm:p-12 lg:p-16 text-center overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>
          
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              isDark ? "text-black" : "text-white"
            }`}>
              Let&apos;s Build Something Amazing
            </h2>
            <p className={`text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto ${
              isDark ? "text-gray-700" : "text-gray-300"
            }`}>
              I&apos;m always excited to work on new projects and collaborate with talented people.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${portfolio.email}`}
                className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 ${
                  isDark ? "bg-black text-white" : "bg-white text-black"
                } rounded-xl font-medium hover:scale-105 transition-all duration-300 hover:shadow-2xl ${
                  isDark ? "hover:shadow-black/20" : "hover:shadow-white/20"
                } group`}
              >
                <Mail className="w-5 h-5" />
                <span>Send me an email</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              {portfolio.socialLinks.linkedin && (
                <a 
                  href={portfolio.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 ${
                    isDark ? "border-black/20 text-black hover:bg-black/10" : "border-white/20 text-white hover:bg-white/10"
                  } rounded-xl font-medium transition-all duration-300`}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-20 pt-8 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2024 {portfolio.name}. All rights reserved.</p>
            <div className="flex gap-6">
              {portfolio.socialLinks.github && (
                <a 
                  href={portfolio.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`transition-colors ${
                    isDark ? "hover:text-white" : "hover:text-gray-900"
                  }`}
                >
                  GitHub
                </a>
              )}
              {portfolio.socialLinks.linkedin && (
                <a 
                  href={portfolio.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    isDark ? "hover:text-white" : "hover:text-gray-900"
                  }`}
                >
                  LinkedIn
                </a>
              )}
              <a 
                href={`mailto:${portfolio.email}`}
                className={`transition-colors ${
                  isDark ? "hover:text-white" : "hover:text-gray-900"
                }`}
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}