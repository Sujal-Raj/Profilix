import Link from "next/link";
import { Shield, ChevronRight, ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LAST_UPDATED = "June 1, 2025";

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          Profilix ("we", "us", or "our") is a portfolio generation platform that helps you
          turn your resume into a professional portfolio website. This Privacy Policy explains
          what data we collect, why we collect it, and how we handle it.
        </p>
        <p className="mt-3">
          By using Profilix, you agree to the collection and use of information as described
          in this policy. If you disagree with any part of it, please discontinue use of the
          service.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>We collect information in three ways:</p>
        <div className="mt-4 space-y-4">
          <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-black dark:text-white mb-1">
              Information you provide directly
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              When you create an account or build your portfolio, we collect your name, email
              address, professional title, bio, work experience, education, project details,
              social links, and any other content you add to your portfolio.
            </p>
          </div>
          <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-black dark:text-white mb-1">
              Information from uploaded files
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If you upload a resume (PDF or document), we process its contents to extract
              relevant portfolio data. Uploaded files are used solely for this parsing purpose
              and are not stored permanently beyond the session.
            </p>
          </div>
          <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-800">
            <p className="text-sm font-semibold text-black dark:text-white mb-1">
              Automatically collected data
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We collect standard log data including your IP address, browser type, pages
              visited, referring URLs, and timestamps. This helps us maintain security and
              understand how the service is used.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-3 space-y-2">
          {[
            "Create and maintain your account and portfolio",
            "Generate and publish your public portfolio page at your chosen URL",
            "Send transactional emails (account confirmation, password resets)",
            "Improve the quality and reliability of the service",
            "Detect and prevent fraud, abuse, or security incidents",
            "Comply with legal obligations",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          We do not use your personal data to train AI models, and we do not sell your data
          to third parties.
        </p>
      </>
    ),
  },
  {
    id: "public-portfolio",
    title: "Your public portfolio",
    content: (
      <>
        <p>
          When you publish your portfolio, the information you have added — your name, title,
          bio, experience, education, projects, skills, and social links — becomes publicly
          accessible at your chosen Profilix URL.
        </p>
        <p className="mt-3">
          You are in full control of what you include. You can unpublish your portfolio or
          delete your account at any time, which will remove your public page from Profilix.
          Note that content indexed by search engines prior to deletion may persist in their
          caches for a period outside our control.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    content: (
      <>
        <p>Profilix uses a small number of third-party services to operate:</p>
        <div className="mt-4 space-y-3">
          {[
            {
              name: "Clerk",
              purpose: "Authentication and account management. Clerk handles sign-up, sign-in, and session management on our behalf.",
              link: "https://clerk.com/privacy",
            },
            {
              name: "MongoDB Atlas",
              purpose: "Database storage for your portfolio data, hosted on MongoDB's cloud infrastructure.",
              link: "https://www.mongodb.com/legal/privacy-policy",
            },
            {
              name: "Vercel",
              purpose: "Hosting and deployment of the Profilix web application.",
              link: "https://vercel.com/legal/privacy-policy",
            },
          ].map((svc) => (
            <div key={svc.name} className="rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-4 py-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold text-black dark:text-white">{svc.name}</span>
                <a
                  href={svc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-2"
                >
                  Privacy policy ↗
                </a>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{svc.purpose}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Each of these services has its own privacy policy governing how they handle data.
          We encourage you to review them.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          Profilix uses essential cookies required for authentication sessions (managed by
          Clerk) and basic site functionality. We do not use advertising cookies or
          third-party tracking cookies.
        </p>
        <p className="mt-3">
          You can configure your browser to refuse cookies, though this may affect your
          ability to log in or use certain features.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    content: (
      <>
        <p>
          We retain your account and portfolio data for as long as your account is active. If
          you delete your account, we will delete your personal data within 30 days, except
          where we are required to retain it for legal or compliance purposes.
        </p>
        <p className="mt-3">
          Anonymised, aggregated analytics data (with no link to individual users) may be
          retained indefinitely for product improvement.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="mt-3 space-y-2">
          {[
            "Access the personal data we hold about you",
            "Correct inaccurate or incomplete data",
            "Request deletion of your data",
            "Object to or restrict how we process your data",
            "Export your data in a portable format",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:developersujal4@gmail.com"
            className="text-black dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            developersujal4@gmail.com
          </a>
          . We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We take reasonable technical and organisational measures to protect your data,
        including HTTPS encryption, secure database access controls, and authentication
        through Clerk. However, no method of transmission over the internet is 100% secure.
        We encourage you to use a strong, unique password for your account.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    content: (
      <p>
        Profilix is not directed at anyone under the age of 13. We do not knowingly collect
        personal data from children. If you believe a child has provided us with personal
        information, please contact us and we will delete it promptly.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the
        "last updated" date at the top of this page. For material changes, we will notify
        registered users by email. Continued use of the service after changes take effect
        constitutes acceptance of the revised policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>If you have any questions or concerns about this Privacy Policy, reach out:</p>
        <div className="mt-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-5 py-4 space-y-1.5">
          <p className="text-sm font-semibold text-black dark:text-white">Profilix</p>
          <a
            href="mailto:developersujal4@gmail.com"
            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            developersujal4@gmail.com
          </a>
          <a
            href="https://github.com/Sujal-Raj/Profilix"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            github.com/Sujal-Raj/Profilix ↗
          </a>
        </div>
      </>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── Top nav strip ── */}
      <div className="border-b border-gray-100 dark:border-gray-900 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors font-medium text-gray-500 dark:text-gray-200">
            Profilix
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Privacy Policy</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 xl:gap-24">

          {/* ── Sidebar TOC (desktop) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-10 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4 px-3">
                Contents
              </p>
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block px-3 py-1.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-all duration-150"
                >
                  {s.title}
                </a>
              ))}
              <div className="pt-4 px-3">
                <Link
                  href="/terms-of-service"
                  className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  Terms of Service ↗
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main>
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                    Legal
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    Last updated: {LAST_UPDATED}
                  </p>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white leading-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                We built Profilix to be simple and transparent. This policy tells you exactly
                what data we collect and what we do with it — in plain language.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {SECTIONS.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-semibold tabular-nums text-gray-300 dark:text-gray-700 w-6 text-right flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-9 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-12 ml-9 h-px bg-gray-100 dark:bg-gray-900" />
                  )}
                </section>
              ))}
            </div>

            {/* Footer strip */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Profilix
              </Link>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <Link href="/terms-of-service" className="hover:text-black dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <a href="mailto:developersujal4@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}