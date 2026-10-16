"use client";

import Link from "next/link";

export default function DocsOverviewPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      {/* Title Header */}
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          DOCUMENTATION
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          PointPass Protocol Architecture
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          PointPass is a non-custodial customer loyalty protocol built on the Solana blockchain. It transforms opaque, proprietary store punch cards into self-custodied zero-decimal SPL tokens on Solana Devnet.
        </p>
      </div>

      {/* Core Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="render-card p-5 space-y-2">
          <div className="text-white font-medium text-sm font-mono">Zero-Decimal SPL Tokens</div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Points are real tokens in customer wallets with supply capped strictly to merchant awards. No fractional points, no database lock-in.
          </p>
        </div>

        <div className="render-card p-5 space-y-2">
          <div className="text-white font-medium text-sm font-mono">Cryptographic Proof-of-Burn</div>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Redeeming a reward burns tokens on-chain and generates an immutable RedemptionReceipt PDA with Unix timestamp.
          </p>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">The Three-Account Architecture</h2>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          The PointPass smart contract relies on three deterministic Program Derived Addresses (PDAs) to enforce trustless state transitions:
        </p>

        <div className="render-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#222228] text-[#71717a] uppercase bg-[#141418]">
                  <th className="py-3 px-4">Account</th>
                  <th className="py-3 px-4">Seeds</th>
                  <th className="py-3 px-4 font-sans">Role &amp; Invariants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c22]">
                <tr className="hover:bg-[#141418]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">LoyaltyProgram</td>
                  <td className="py-3 px-4 text-purple-300">[&quot;loyalty&quot;, merchant]</td>
                  <td className="py-3 px-4 text-[#a1a1aa] font-sans">
                    Holds store configuration, reward cost threshold, lifetime counters, and mint authority bump.
                  </td>
                </tr>
                <tr className="hover:bg-[#141418]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">PointsMint</td>
                  <td className="py-3 px-4 text-purple-300">[&quot;mint&quot;, loyalty_program]</td>
                  <td className="py-3 px-4 text-[#a1a1aa] font-sans">
                    Standard SPL Token Mint with 0 decimals. Authority is the LoyaltyProgram PDA (no human has private key access).
                  </td>
                </tr>
                <tr className="hover:bg-[#141418]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">RedemptionReceipt</td>
                  <td className="py-3 px-4 text-purple-300">[&quot;redemption&quot;, loyalty_pda, customer, index]</td>
                  <td className="py-3 px-4 text-[#a1a1aa] font-sans">
                    Permanent proof of reward claim created when points are burned. Stores points burned, customer address, and timestamp.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Navigation Callout */}
      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">DEEP DIVE</span>
          <h3 className="text-base font-normal text-white">Understand PDA Derivation &amp; Collision Resistance</h3>
        </div>
        <Link
          href="/docs/pda"
          className="btn-primary text-xs py-2 px-4 shrink-0 text-center"
        >
          Explore PDA Guide &gt;
        </Link>
      </div>
    </div>
  );
}
