import { Suspense } from "react";
import { CustomerView } from "./CustomerView";

function CustomerLoadingFallback() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="h-32 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 animate-pulse" />
      <div className="h-48 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 animate-pulse" />
      <div className="h-48 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 animate-pulse" />
    </div>
  );
}

export default function CustomerPage() {
  return (
    <Suspense fallback={<CustomerLoadingFallback />}>
      <CustomerView />
    </Suspense>
  );
}
