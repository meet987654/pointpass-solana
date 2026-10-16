"use client";

import Link from "next/link";

export default function DocsSdkPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          TOOLING
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          TypeScript Client SDK
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          PointPass ships with client helper functions that resolve PDA seeds, find Associated Token Accounts, and construct Anchor transactions.
        </p>
      </div>

      <div className="space-y-6">
        <div className="render-card p-5 space-y-3">
          <span className="text-xs font-mono text-purple-400 font-semibold block">AWARD POINTS CPI</span>
          <pre className="p-3.5 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
{`import { awardPoints, getProgram } from "@/lib";

const txSig = await awardPoints(
  program,
  merchantWallet.publicKey,
  customerPubkey,
  50 // 50 loyalty points
);`}
          </pre>
        </div>

        <div className="render-card p-5 space-y-3">
          <span className="text-xs font-mono text-purple-400 font-semibold block">REDEEM POINTS &amp; RECEIPT PDA</span>
          <pre className="p-3.5 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
{`import { redeemPoints } from "@/lib";

const txSig = await redeemPoints(
  program,
  customerWallet.publicKey,
  merchantPubkey
);`}
          </pre>
        </div>
      </div>

      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">TERMINAL</span>
          <h3 className="text-base font-normal text-white">Test Customer Loyalty Pass</h3>
        </div>
        <Link href="/customer" className="btn-primary text-xs py-2 px-4 shrink-0 text-center">
          Open Customer Portal &gt;
        </Link>
      </div>
    </div>
  );
}
