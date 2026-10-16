"use client";

import Link from "next/link";

export default function DocsSecurityPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          Architecture Deep Dive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          Security Guarantees &amp; Invariants
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          PointPass enforces rigorous smart contract security guarantees, certified across 16 integration tests on Solana Devnet.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Core Security Invariants</h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">1. Arithmetic Overflow Immunity</span>
            <p className="text-sm text-neutral-400">
              All counters (<code className="text-neutral-200">total_awarded</code>, <code className="text-neutral-200">total_redeemed</code>, <code className="text-neutral-200">redemption_count</code>) use <code className="text-emerald-300 font-mono">checked_add</code>. Transactions encountering numeric overflow reject with custom error <code className="text-neutral-300 font-mono">MathOverflow (6006)</code>.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">2. Signer Authority Verification</span>
            <p className="text-sm text-neutral-400">
              Only the authenticated merchant can award points for their own loyalty program. Unauthorized signers attempting to pass a target program PDA fail with Anchor authorization errors.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">3. Customer ATA Ownership Check</span>
            <p className="text-sm text-neutral-400">
              Anchor constraint <code className="text-neutral-200 font-mono">associated_token::authority = customer</code> guarantees points cannot be burned from another customer&apos;s token balance.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        <Link href="/docs/receipts" className="text-sm text-neutral-400 hover:text-white">
          ← Proof-of-Burn Receipts
        </Link>
        <Link href="/docs/sdk" className="text-sm text-emerald-400 font-semibold hover:underline">
          TypeScript Client SDK →
        </Link>
      </div>
    </div>
  );
}
