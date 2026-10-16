"use client";

import { Suspense } from "react";
import { MerchantView } from "./MerchantView";

export default function MerchantPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-12 text-center text-sm text-neutral-500 animate-pulse">
          Loading Merchant Portal...
        </div>
      }
    >
      <MerchantView />
    </Suspense>
  );
}
