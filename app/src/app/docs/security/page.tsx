"use client";

import Link from "next/link";

export default function DocsSecurityPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          SECURITY
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          Security Model &amp; Cryptographic Invariants
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          PointPass implements multiple defense-in-depth security layers to prevent unauthorized minting, double spending, and overflow vulnerabilities.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">Security Guarantees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="render-card p-5 space-y-2">
            <span className="text-xs font-mono text-purple-400 font-semibold block">AUTHORITY ISOLATION</span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Only the merchant signer can award points for their own program. Customers can only burn tokens that belong to their own Associated Token Account.
            </p>
          </div>
          <div className="render-card p-5 space-y-2">
            <span className="text-xs font-mono text-purple-400 font-semibold block">MATH OVERFLOW DEFENSE</span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Every addition and counter increment uses checked_add() with explicit PointPassError::MathOverflow reversion.
            </p>
          </div>
          <div className="render-card p-5 space-y-2">
            <span className="text-xs font-mono text-purple-400 font-semibold block">ZERO FRACTIONAL TOKENS</span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              SPL mint decimals are fixed to 0. It is impossible to split or mint fractional loyalty points.
            </p>
          </div>
          <div className="render-card p-5 space-y-2">
            <span className="text-xs font-mono text-purple-400 font-semibold block">DETERMINISTIC PDA REPLAY DEFENSE</span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Receipts use monotonic receipt_number seed. Replaying a transaction fails at the Solana runtime account initialization check.
            </p>
          </div>
        </div>
      </div>

      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">NEXT SECTION</span>
          <h3 className="text-base font-normal text-white">TypeScript SDK Reference</h3>
        </div>
        <Link href="/docs/sdk" className="btn-primary text-xs py-2 px-4 shrink-0 text-center">
          Read SDK Reference &gt;
        </Link>
      </div>
    </div>
  );
}
