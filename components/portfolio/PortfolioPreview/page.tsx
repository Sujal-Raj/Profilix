import { Mail, Github, Linkedin, Briefcase, Code2, GraduationCap, Award, Calendar, ExternalLink, ArrowUpRight } from "lucide-react";

interface PortfolioPreviewProps {
  portfolio: any;
  theme: "light" | "dark";
}

export default function PortfolioPreview({ portfolio, theme }: PortfolioPreviewProps) {
  const isDark = theme === "dark";

  return (
    <>
    <main className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-gray-900"} transition-colors duration-300 border rounded-2xl p-2`}>
      {/* Header */}
      <header className={` top-0 z-50 ${isDark ? "bg-black/80" : "bg-white/80"} backdrop-blur-xl border-b ${isDark ? "border-gray-900" : "border-gray-100"}`}>
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight">{portfolio.name}</div>
          <div className="flex items-center gap-3">
            {portfolio?.socialLinks?.github && (
              <a href={portfolio.socialLinks.github} className={`p-2 ${isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"} rounded-lg transition-all duration-300`}>
                <Github className="w-4 h-4" />
              </a>
            )}
            {portfolio?.socialLinks?.linkedin && (
              <a href={portfolio.socialLinks.linkedin} className={`p-2 ${isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"} rounded-lg transition-all duration-300`}>
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a href={`mailto:${portfolio?.email}`} className={`ml-2 px-5 py-2 ${isDark ? "bg-white text-black" : "bg-gray-900 text-white"} rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300`}>
              Contact
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative pt-32 pb-20">
        {/* Hero Section */}
        <section className="pt-16 pb-32 relative">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"} rounded-full mb-8 border`}>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
            <span className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {portfolio?.status || "Available for opportunities"}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 tracking-tight leading-[1.1]">
            {portfolio?.name}
          </h1>
          
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold ${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
            {portfolio?.title}
          </h2>

          <p className={`text-base sm:text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mb-5 leading-relaxed`}>
            {portfolio?.about}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <a href={`mailto:${portfolio?.email}`} className={`inline-flex items-center gap-2 px-6 py-3 ${isDark ? "bg-white text-black" : "bg-gray-900 text-white"} rounded-lg font-medium hover:opacity-90 transition-all duration-300 group`}>
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
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
                <div key={i} className={`group relative p-8 rounded-xl ${isDark ? "bg-gray-950 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"} border transition-all duration-500 hover:shadow-xl`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className={`text-xl font-semibold mb-1 ${isDark ? "group-hover:text-gray-300" : "group-hover:text-gray-600"} transition-colors`}>
                        {exp.role}
                      </h3>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} font-medium`}>{exp.company}</p>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-500" : "text-gray-500"} shrink-0`}>
                      <Calendar className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                    {exp.description}
                  </p>
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
                <div key={i} onClick={() => proj.link && window.open(proj.link, '_blank')} className={`group relative p-8 rounded-xl ${isDark ? "bg-gray-950 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"} border transition-all duration-500 hover:shadow-xl cursor-pointer`}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className={`text-xl font-semibold ${isDark ? "group-hover:text-gray-300" : "group-hover:text-gray-600"} transition-colors`}>
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <ExternalLink className={`w-5 h-5 ${isDark ? "text-gray-400 group-hover:text-white" : "text-gray-400 group-hover:text-gray-900"} transition-all duration-300 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1`} />
                    )}
                  </div>
                  
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed mb-5`}>
                    {proj.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {proj.tech?.map((tech: string, j: number) => (
                      <span key={j} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${isDark ? "bg-gray-900 text-gray-300 border-gray-800" : "bg-gray-50 text-gray-700 border-gray-200"} border`}>
                        {tech}
                      </span>
                    ))}
                  </div>
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
                <div key={i} className={`group p-8 rounded-xl ${isDark ? "bg-gray-950 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"} border transition-all duration-500 hover:shadow-xl`}>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? "group-hover:text-gray-300" : "group-hover:text-gray-600"} transition-colors`}>
                    {edu.degree}
                  </h3>
                  <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>{edu.school}</p>
                  <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>{edu.year}</p>
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
                <span key={i} className={`px-5 py-3 text-sm font-medium rounded-lg ${isDark ? "bg-gray-950 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-gray-300"} border hover:shadow-lg transition-all duration-300`}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="relative rounded-3xl bg-gradient-to-br from-sky-950 to-slate-900 dark:from-slate-50 dark:to-sky-100 p-12 sm:p-16 text-center overflow-hidden">
  {/* subtle overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/20" />

  {/* floating blobs */}
  <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

  <div className="relative z-10">
    <h2
      className={`text-4xl sm:text-5xl font-bold mb-4 ${
        isDark ? "text-slate-900" : "text-slate-900"
      }`}
    >
      Let&apos;s Build Something Amazing
    </h2>

    <p
      className={`text-lg mb-10 max-w-2xl mx-auto ${
        isDark ? "text-slate-600" : "text-slate-600"
      }`}
    >
      I&apos;m always excited to work on new projects and collaborate with
      talented people.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* email button */}
      <a
        href={`mailto:${portfolio?.email || portfolio?.userEmail}`}
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium hover:scale-105 transition-all duration-300 group
          ${
            isDark
              ? "bg-white text-slate-900 shadow-lg shadow-cyan-500/30 hover:shadow-xl"
              : "bg-slate-900 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl"
          }`}
      >
        <Mail className="w-5 h-5" />
        <span>Send me an email</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>

      {/* LinkedIn button if present */}
      {portfolio?.socialLinks?.linkedin && (
        <a
          href={portfolio.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium border-2 transition-all duration-300
            ${
              isDark
                ? "border-white/30 text-slate-900 hover:bg-white/10"
                : "border-slate-300 text-slate-900 hover:bg-slate-100"
            }`}
        >
          <Linkedin className="w-5 h-5" />
          <span>Connect on LinkedIn</span>
        </a>
      )}
    </div>
  </div>
</section>

      </div>
    </main>
    </>
  );
}