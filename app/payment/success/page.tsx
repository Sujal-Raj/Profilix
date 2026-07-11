"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "original";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-black">Payment successful</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your premium template unlock has been confirmed. You can now use it from your dashboard.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/create/portfolio" className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white">
            Continue to dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/preview/${slug}`} className="text-sm font-medium text-gray-600 hover:text-black">
            Preview template
          </Link>
        </div>
      </div>
    </div>
  );
}
