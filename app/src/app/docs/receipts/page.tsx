"use client";

import Link from "next/link";

export default function DocsReceiptsPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          Proof-of-Burn Receipts
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          PointPass ensures that reward redemptions cannot be forged or double-spent by burning SPL tokens and recording a permanent on-chain receipt PDA.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">Receipt PDA Layout</h2>
        <pre className="p-4 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
{`#[account]
pub struct RedemptionReceipt {
    pub customer: Pubkey,         // 32 bytes (customer who burned)
    pub loyalty_program: Pubkey,  // 32 bytes (issuing store)
    pub receipt_number: u64,      // 8 bytes (monotonic counter)
    pub points_burned: u64,       // 8 bytes (points burned)
    pub timestamp: i64,           // 8 bytes (Solana Clock unix timestamp)
    pub bump: u8,                 // 1 byte (canonical PDA bump)
}`}
        </pre>
      </div>

      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">NEXT SECTION</span>
          <h3 className="text-base font-normal text-white">Security &amp; Invariants</h3>
        </div>
        <Link href="/docs/security" className="btn-primary text-xs py-2 px-4 shrink-0 text-center">
          Read Security Guide &gt;
        </Link>
      </div>
    </div>
  );
}
