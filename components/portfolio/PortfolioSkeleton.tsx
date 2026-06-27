import React from "react";

function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800/60 ${className}`}
      style={style}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" />
    </div>
  );
}

export default function PortfolioSkeleton() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg ml-2" />
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative pt-32 pb-20">
        <section className="pt-16 pb-32">
          <Skeleton className="h-7 w-48 rounded-full mb-8" />
          <Skeleton className="h-16 w-3/4 mb-3" />
          <Skeleton className="h-10 w-1/2 mb-6" />
          <Skeleton className="h-5 w-full max-w-2xl mb-2" />
          <Skeleton className="h-5 w-5/6 max-w-xl mb-2" />
          <Skeleton className="h-5 w-4/6 max-w-lg mb-8" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </section>

        <section className="mb-32">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </main>
  );
}