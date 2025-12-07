"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap, Code2, Mail, Github, Linkedin, ExternalLink, ArrowUpRight, Sparkles, Calendar, Award } from "lucide-react";

export default function PortfolioPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch portfolio by slug
  const getPortfolio = async () => {
    try {
      const res = await fetch(`/api/v1/user/${slug}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch portfolio");
      }
      setPortfolio(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolio();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-[3px] border-gray-100 dark:border-gray-900 rounded-full"></div>
          <div className="absolute inset-0 w-20 h-20 border-[3px] border-transparent border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-7xl">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Portfolio Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900' : ''}`}>
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight transition-all duration-300 hover:opacity-60">
            {portfolio.name}
            {/* {portfolio?.name?.split(' ').map((word: string, i: number) => i === 0 ? word : word[0]).join('')} */}
          </div>
          <div className="flex items-center gap-3">
            {portfolio?.socialLinks?.github && (
              <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
            )}
            {portfolio?.socialLinks?.linkedin && (
              <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a href={`mailto:${portfolio?.email || portfolio?.userEmail}`}
              className="ml-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative pt-32 pb-20">
        {/* Hero Section */}
        <section className="pt-16 pb-32 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-full mb-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {portfolio?.status || "Available for opportunities"}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 tracking-tight leading-[1.1] animate-fade-in-up">
            {portfolio?.name}
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-6 animate-fade-in-up animation-delay-100">
            {portfolio?.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-5 leading-relaxed animate-fade-in-up animation-delay-200">
            {portfolio?.about}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center animate-fade-in-up animation-delay-300">
            <a href={`mailto:${portfolio?.email || portfolio?.userEmail}`} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-all duration-300 group">
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Decorative gradient line */}
          {/* <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-gray-900 to-transparent dark:from-white animate-fade-in animation-delay-400"></div> */}
        </section>

        {/* Work Experience */}
        {portfolio?.experience && portfolio.experience.length > 0 && (
          <section id="work" className="mb-32">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
            </div>
            
            <div className="space-y-6">
              {portfolio.experience.map((exp: any, i: number) => (
                <div key={i} 
                  className="group relative p-8 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-900/50 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 shrink-0">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent dark:from-gray-800 dark:via-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio?.projects && portfolio.projects.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((proj: any, i: number) => (
                <div key={i}
                  onClick={() => proj.link && window.open(proj.link, '_blank')}
                  className="group relative p-8 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-900/50 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-xl font-semibold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                    {proj.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {proj.tech?.map((tech: string, j: number) => (
                      <span key={j} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent dark:from-gray-800 dark:via-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio?.education && portfolio.education.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Education</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.education.map((edu: any, i: number) => (
                <div key={i}
                  className="group p-8 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-900/50 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{edu.school}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>

                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent dark:from-gray-800 dark:via-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolio?.skills && portfolio.skills.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Skills & Technologies</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill: string, i: number) => (
                <span key={i}
                  className="px-5 py-3 text-sm font-medium rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        {/* <section className="relative rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-16 text-center overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Open to new opportunities and exciting projects. Let's create something great.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`mailto:${portfolio?.email || portfolio?.userEmail}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-all duration-300 group">
                <Mail className="w-5 h-5" />
                <span>Send an Email</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              {portfolio?.socialLinks?.linkedin && (
                <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </section> */}

        <section className="relative rounded-3xl bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-100 p-12 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>
          
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white dark:text-black">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-700 mb-10 max-w-2xl mx-auto">
              I&apos;m always excited to work on new projects and collaborate with talented people.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`mailto:${portfolio?.email || portfolio?.userEmail}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 dark:hover:shadow-black/20 group">
                <Mail className="w-5 h-5" />
                <span>Send me an email</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              {portfolio?.socialLinks?.linkedin && (
                <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 dark:border-black/20 text-white dark:text-black rounded-xl font-medium hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <p>© 2024 {portfolio?.name}. All rights reserved.</p>
            <div className="flex gap-6">
              {portfolio?.socialLinks?.github && (
                <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                  className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  GitHub
                </a>
              )}
              {portfolio?.socialLinks?.linkedin && (
                <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  LinkedIn
                </a>
              )}
              <a href={`mailto:${portfolio?.email || portfolio?.userEmail}`}
                className="hover:text-gray-900 dark:hover:text-white transition-colors">
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
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

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </main>
  );
}