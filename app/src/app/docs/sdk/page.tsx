"use client";

import Link from "next/link";

export default function DocsSdkPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          Developer Reference
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          TypeScript Client SDK Reference
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          The PointPass client library (<code className="text-emerald-400">@/lib/actions</code>) exposes pure functions taking Anchor <code className="text-neutral-200">Program</code> instances, allowing seamless execution across both browser wallets and headless CLI automation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">awardPoints(...)</h2>
          <p className="text-sm text-neutral-400">
            Awards zero-decimal SPL loyalty tokens from a merchant to a customer. Automatically provisions the customer ATA if necessary.
          </p>
          <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-emerald-300 overflow-x-auto">
{`const txSignature = await awardPoints(
  program,
  merchantPublicKey,
  customerPublicKey,
  10 // Amount of points
);`}
          </pre>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">redeemPoints(...)</h2>
          <p className="text-sm text-neutral-400">
            Burns reward points from the customer token account and creates a cryptographic RedemptionReceipt PDA. Includes automatic retry on sequence race conditions.
          </p>
          <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-purple-300 overflow-x-auto">
{`const txSignature = await redeemPoints(
  program,
  customerPublicKey,
  merchantPublicKey
);`}
          </pre>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">initializeProgram(...)</h2>
          <p className="text-sm text-neutral-400">
            Initializes a new on-chain loyalty program and dedicated points mint for a merchant.
          </p>
          <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-cyan-300 overflow-x-auto">
{`const txSignature = await initializeProgram(
  program,
  merchantPublicKey,
  "Bean There Cafe", // Store name (max 32 bytes)
  10                 // Reward cost threshold
);`}
          </pre>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        <Link href="/docs/security" className="text-sm text-neutral-400 hover:text-white">
          ← Security &amp; Invariants
        </Link>
        <Link href="/" className="text-sm text-emerald-400 font-semibold hover:underline">
          Return to Overview →
        </Link>
      </div>
    </div>
  );
}
