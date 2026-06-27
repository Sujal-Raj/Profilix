import Link from "next/link";
import { FileText, ChevronRight, ArrowLeft } from "lucide-react";

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
    id: "acceptance",
    title: "Acceptance of terms",
    content: (
      <>
        <p>
          By accessing or using Profilix ("the Service"), you agree to be bound by these
          Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use
          the Service.
        </p>
        <p className="mt-3">
          These Terms apply to all visitors, users, and anyone who accesses or uses the
          Service. We may update these Terms from time to time — continued use after changes
          are posted constitutes acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    id: "description",
    title: "What Profilix is",
    content: (
      <>
        <p>
          Profilix is a web-based platform that allows you to build, customise, and publish a
          professional portfolio website. You can create a portfolio by filling in a form or
          by uploading a resume which the platform parses using AI to pre-fill your content.
          Your portfolio is then published at a unique Profilix URL.
        </p>
        <p className="mt-3">
          Profilix is currently an independent open-source project. Features and availability
          may change at any time without prior notice.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts",
    content: (
      <>
        <p>
          To use Profilix you must create an account using a valid email address. You are
          responsible for:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            "Keeping your password secure and confidential",
            "All activity that occurs under your account",
            "Notifying us promptly if you suspect unauthorised access",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          You must be at least 13 years old to create an account. By creating an account,
          you represent that you meet this requirement.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your content",
    content: (
      <>
        <p>
          You retain full ownership of the content you submit to Profilix — your name,
          professional history, projects, and any other material you add to your portfolio
          ("Your Content").
        </p>
        <p className="mt-3">
          By publishing a portfolio, you grant Profilix a non-exclusive, royalty-free,
          worldwide licence to host, display, and distribute Your Content solely for the
          purpose of operating the Service (i.e. serving your public portfolio page to
          visitors).
        </p>
        <p className="mt-3">
          You are solely responsible for ensuring that Your Content does not violate any
          third-party rights or applicable laws. You represent and warrant that you own or
          have the necessary rights to submit and publish Your Content.
        </p>
      </>
    ),
  },
  {
    id: "prohibited",
    title: "Prohibited uses",
    content: (
      <>
        <p>You agree not to use Profilix to:</p>
        <ul className="mt-3 space-y-2">
          {[
            "Publish false, misleading, or fraudulent portfolio content",
            "Impersonate another person or entity",
            "Upload content that infringes copyright, trademarks, or other intellectual property rights",
            "Distribute malware, spam, or any harmful code",
            "Scrape, crawl, or extract data from the platform in an automated manner without our written consent",
            "Attempt to gain unauthorised access to any part of the Service or its infrastructure",
            "Use the Service for any illegal purpose or in violation of any applicable law",
            "Harass, abuse, or harm another person using the platform",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Violation of these prohibitions may result in immediate suspension or termination
          of your account without notice.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Profilix platform itself — including the code, design, templates, logos, and
          branding — is owned by Profilix and its contributors. The source code is available
          on GitHub under its respective open-source licence.
        </p>
        <p className="mt-3">
          Nothing in these Terms transfers ownership of the Profilix platform to you, and
          nothing gives you a right to use the Profilix name, logo, or branding outside of
          reasonable attribution.
        </p>
        <p className="mt-3">
          If you believe content on Profilix infringes your copyright, please contact us at{" "}
          <a
            href="mailto:developersujal4@gmail.com"
            className="text-black dark:text-white underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            developersujal4@gmail.com
          </a>{" "}
          with details of the alleged infringement.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    content: (
      <p>
        Profilix integrates with third-party services including Clerk (authentication) and
        MongoDB (data storage). Your use of the Service is also subject to those services'
        terms and privacy policies. We are not responsible for the practices or content of
        any third-party services.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability and changes",
    content: (
      <>
        <p>
          We do our best to keep Profilix available and working, but we make no guarantees
          about uptime, reliability, or continued availability of any feature. We may at any
          time:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            "Modify, suspend, or discontinue any part of the Service",
            "Change or remove features without notice",
            "Impose limits on usage or storage",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          We will make reasonable efforts to notify users of significant changes, but we are
          not liable for any disruption or loss resulting from changes to the Service.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          You may delete your account at any time from your dashboard settings, which will
          remove your portfolio from the platform.
        </p>
        <p className="mt-3">
          We reserve the right to suspend or terminate your account, without prior notice or
          liability, if we reasonably believe you have violated these Terms or if your use of
          the Service harms other users or Profilix.
        </p>
        <p className="mt-3">
          Upon termination, your right to use the Service ceases immediately. Sections of
          these Terms that by their nature should survive termination will survive, including
          but not limited to intellectual property, disclaimers, and limitations of liability.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer of warranties",
    content: (
      <>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 px-5 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The Service is provided <strong className="text-black dark:text-white font-medium">"as is"</strong> and{" "}
            <strong className="text-black dark:text-white font-medium">"as available"</strong>, without warranties of
            any kind, express or implied. We do not warrant that the Service will be
            uninterrupted, error-free, secure, or free of viruses or other harmful components.
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Your use of the Service is at your sole risk. To the fullest extent permitted by
          applicable law, Profilix disclaims all warranties, express or implied, including
          but not limited to implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement.
        </p>
      </>
    ),
  },
  {
    id: "limitation",
    title: "Limitation of liability",
    content: (
      <p>
        To the maximum extent permitted by law, Profilix and its contributors shall not be
        liable for any indirect, incidental, special, consequential, or punitive damages —
        including loss of data, loss of revenue, or loss of goodwill — arising out of or in
        connection with your use of, or inability to use, the Service, even if we have been
        advised of the possibility of such damages. Our total liability to you for any claim
        shall not exceed the amount you paid us in the 12 months prior to the claim (which,
        for a free service, is zero).
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with applicable laws. Any
        disputes arising under or in connection with these Terms shall be subject to the
        jurisdiction of the courts relevant to the location of the service operator. If any
        provision of these Terms is found to be unenforceable, the remaining provisions will
        continue in full force and effect.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>
          Questions about these Terms? We're happy to help — reach out anytime:
        </p>
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

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── Top nav strip ── */}
      <div className="border-b border-gray-100 dark:border-gray-900 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors font-medium text-gray-500 dark:text-gray-200">
            Profilix
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Terms of Service</span>
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
                  href="/privacy-policy"
                  className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  Privacy Policy ↗
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
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
                Terms of Service
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                Please read these terms carefully before using Profilix. By using the
                platform, you agree to be bound by them.
              </p>
            </div>

            {/* Important summary callout */}
            <div className="mb-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-2">
                Summary
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                You own your content. We provide the platform as-is. Don't misuse the
                service or publish content that harms others. You can delete your account
                anytime. We can terminate access for violations. Questions? Email us.
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
                <Link href="/privacy-policy" className="hover:text-black dark:hover:text-white transition-colors">
                  Privacy Policy
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