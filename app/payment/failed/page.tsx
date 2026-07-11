"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <XCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-black">Payment was not completed</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your payment could not be completed. No charges were made. You can try again from the dashboard.
        </p>
        <div className="mt-6">
          <Link href="/create/portfolio" className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
