"use client";

import Link from "next/link";

export default function DocsOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          PointPass Protocol Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          Protocol Architecture & Overview
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          PointPass is a decentralized customer loyalty protocol built on the Solana blockchain. It transforms opaque, proprietary store punch cards into self-custodied zero-decimal SPL tokens on Solana Devnet.
        </p>
      </div>

      {/* Core Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="text-emerald-400 font-bold text-lg mb-1">Zero-Decimal SPL Tokens</div>
          <p className="text-sm text-neutral-400">
            Points are real tokens in customer wallets with supply capped strictly to merchant awards. No fractional points, no database lock-in.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="text-purple-400 font-bold text-lg mb-1">Cryptographic Proof-of-Burn</div>
          <p className="text-sm text-neutral-400">
            Redeeming a reward burns tokens on-chain and generates an immutable <code className="text-xs font-mono text-neutral-300">RedemptionReceipt</code> PDA with Unix timestamp.
          </p>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">The Three-Account Architecture</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The PointPass smart contract relies on three deterministic Program Derived Addresses (PDAs) to enforce trustless state transitions:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs font-mono text-neutral-400 uppercase">
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Seeds</th>
                <th className="py-3 px-4">Role & Responsibilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-emerald-400">LoyaltyProgram</td>
                <td className="py-3.5 px-4 text-neutral-300">[&quot;loyalty&quot;, merchant]</td>
                <td className="py-3.5 px-4 text-neutral-400 font-sans">
                  Holds store configuration, reward cost threshold, lifetime awarded/redeemed counters, and mint authority bump.
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-purple-400">PointsMint</td>
                <td className="py-3.5 px-4 text-neutral-300">[&quot;mint&quot;, loyalty_program]</td>
                <td className="py-3.5 px-4 text-neutral-400 font-sans">
                  Standard SPL Token Mint with 0 decimals. Authority is the LoyaltyProgram PDA (no human has private key access).
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-amber-400">RedemptionReceipt</td>
                <td className="py-3.5 px-4 text-neutral-300">[&quot;redemption&quot;, loyalty_pda, customer, index]</td>
                <td className="py-3.5 px-4 text-neutral-400 font-sans">
                  Permanent proof of reward claim created when points are burned. Stores points burned, customer address, and timestamp.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Callout */}
      <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 block mb-1">Deep Dive</span>
          <h3 className="text-lg font-bold text-white">Understand PDA Derivation & Collision Resistance</h3>
        </div>
        <Link
          href="/docs/pda"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-neutral-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shrink-0 text-center"
        >
          Explore PDA Guide →
        </Link>
      </div>
    </div>
  );
}
