"use client";

import Link from "next/link";

export default function DocsReceiptsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          Architecture Deep Dive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          Proof-of-Burn Redemption Receipts
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          Traditional loyalty programs hide reward redemptions in private databases. PointPass generates an immutable on-chain cryptographic receipt on Solana Devnet whenever loyalty tokens are burned.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Account Structure</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Each receipt is stored as a dedicated on-chain account with a fixed byte footprint:
        </p>

        <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-purple-300 overflow-x-auto">
{`#[account]
pub struct RedemptionReceipt {
    pub customer: Pubkey,         // 32 bytes (offset 8)
    pub loyalty_program: Pubkey,  // 32 bytes (offset 40)
    pub receipt_number: u64,      // 8 bytes (offset 72)
    pub points_burned: u64,       // 8 bytes (offset 80)
    pub timestamp: i64,           // 8 bytes (offset 88)
    pub bump: u8,                 // 1 byte  (offset 96)
}`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Querying with memcmp Compound Filters</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Because the customer address is fixed at byte offset 8 and the loyalty program at byte offset 40, clients query Solana RPC nodes with memory comparison filters (<code className="text-neutral-200">memcmp</code>) for sub-second indexed receipt lookups without indexing servers:
        </p>

        <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-emerald-300 overflow-x-auto">
{`const receipts = await program.account.redemptionReceipt.all([
  { memcmp: { offset: 8, bytes: customerPublicKey.toBase58() } },
  { memcmp: { offset: 40, bytes: loyaltyProgramPda.toBase58() } },
]);`}
        </pre>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        <Link href="/docs/cpi" className="text-sm text-neutral-400 hover:text-white">
          ← CPI &amp; Token Minting
        </Link>
        <Link href="/docs/security" className="text-sm text-emerald-400 font-semibold hover:underline">
          Security &amp; Invariants →
        </Link>
      </div>
    </div>
  );
}
