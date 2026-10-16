"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { PROGRAM_ID, DEMO_MERCHANT } from "@/lib/constants";
import { PublicKey } from "@solana/web3.js";

export default function Home() {
  const demoMerchantPubkey = new PublicKey(DEMO_MERCHANT);
  const { data: programData, loading: programLoading } = useLoyaltyProgram(demoMerchantPubkey);
  const [activeCodeTab, setActiveCodeTab] = useState<"anchor" | "sdk" | "cli">("anchor");

  return (
    <div className="relative overflow-hidden bg-[#09090b] text-[#fafafa]">
      {/* Ambient purple glow in background matching Render */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-purple-900/15 via-purple-950/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* SECTION 1: NEW HERO LAYOUT (Impactful, Centered Header with Wide Console) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          {/* Top Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#141418] border border-[#27272a] text-xs font-mono text-[#a1a1aa]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-purple-300 font-semibold uppercase tracking-wider">DEVNET PROTOCOL</span>
            <span className="text-neutral-500">|</span>
            <span>PointPass Solana v1.0 Live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.06]">
            Programmable loyalty points. <br className="hidden sm:inline" />
            <span className="font-semibold text-white">Engineered for Solana.</span>
            <span className="inline-block w-3.5 sm:w-4 h-10 sm:h-14 bg-purple-600 align-middle ml-2 sm:ml-3 animate-pulse" />
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl font-normal">
            Turn customer engagement into self-custodied zero-decimal SPL tokens. Non-custodial merchant authorities, deterministic PDA pipelines, and immutable proof-of-burn receipts on Solana Devnet.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="btn-primary text-sm px-6 py-2.5">
              Start for free &gt;
            </Link>
            <Link href="/merchant" className="btn-secondary text-sm px-5 py-2.5">
              Merchant terminal
            </Link>
            <Link href="/docs" className="btn-secondary text-sm px-5 py-2.5">
              Read documentation
            </Link>
          </div>

          {/* Text-only Key Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#71717a]">
            <span>[ ZERO DECIMALS ]</span>
            <span>[ SUB-CENT GAS ]</span>
            <span>[ DETERMINISTIC PDAS ]</span>
            <span>[ PROOF-OF-BURN ]</span>
          </div>
        </div>

        {/* HERO CENTERPIECE: Wide Render Infrastructure Wireframe Console */}
        <div className="mt-14 max-w-5xl mx-auto">
          {/* Terminal Command Floating Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#141418] border border-[#222228] border-b-0 rounded-t-[6px] text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="text-purple-400 font-bold">$</span>
              <span>anchor test --skip-build</span>
            </div>
            <div className="flex items-center gap-3 text-[#71717a]">
              <span className="text-emerald-400">DEPLOYED DEVNET</span>
              <span>SOLANA CLUSTER</span>
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="render-card p-6 sm:p-8 rounded-t-none border-[#222228] bg-[#0d0d10] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono border-b border-[#1c1c22] pb-4">
              <div className="flex items-center gap-3">
                <span className="tracking-widest uppercase font-semibold text-neutral-300">PRODUCTION TELEMETRY</span>
                <span className="px-2 py-0.5 rounded-[3px] bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                  Cluster Healthy
                </span>
              </div>
              <span className="text-[#71717a]">
                Program ID: {PROGRAM_ID.toBase58().slice(0, 8)}...{PROGRAM_ID.toBase58().slice(-8)}
              </span>
            </div>

            {/* 4-Service Infrastructure Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Service 1 */}
              <div className="render-card-subtle p-4 bg-[#121216] border border-[#1e1e24] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-medium">app-loyalty-pda</span>
                  <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                </div>
                <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                  <span>AWARDED</span>
                  <span className="text-neutral-200 font-semibold">{programLoading ? "..." : `${programData?.totalAwarded ?? 55} pts`}</span>
                </div>
                <div className="h-6 w-full flex items-end">
                  <div className="h-2 w-full bg-gradient-to-r from-purple-600/40 via-purple-500 to-purple-400 rounded-sm" />
                </div>
              </div>

              {/* Service 2 */}
              <div className="render-card-subtle p-4 bg-[#121216] border border-[#1e1e24] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-medium">app-points-mint</span>
                  <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                </div>
                <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                  <span>DECIMALS</span>
                  <span className="text-neutral-200 font-semibold">0 (Integer)</span>
                </div>
                <div className="h-6 w-full flex items-end">
                  <div className="h-3 w-full bg-gradient-to-r from-purple-700/30 via-purple-600/60 to-purple-500 rounded-sm" />
                </div>
              </div>

              {/* Service 3 */}
              <div className="render-card-subtle p-4 bg-[#121216] border border-[#1e1e24] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-medium">receipt-indexer</span>
                  <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                </div>
                <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                  <span>PROOF-OF-BURN</span>
                  <span className="text-neutral-200 font-semibold">{programLoading ? "..." : `${programData?.redemptionCount ?? 3} stamped`}</span>
                </div>
                <div className="h-6 w-full flex items-end">
                  <div className="h-1.5 w-full bg-purple-500/70 rounded-sm" />
                </div>
              </div>

              {/* Service 4 */}
              <div className="render-card-subtle p-4 bg-[#121216] border border-[#1e1e24] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-medium">customer-terminal</span>
                  <span className="text-purple-400 text-[11px] font-mono">Syncing</span>
                </div>
                <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                  <span>THRESHOLD</span>
                  <span className="text-neutral-200 font-semibold">{programLoading ? "..." : `${programData?.rewardCost ?? 10} pts`}</span>
                </div>
                <div className="h-6 w-full flex items-end">
                  <div className="h-2.5 w-full bg-gradient-to-r from-purple-800/40 via-purple-600 to-purple-400 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pt-3 border-t border-[#1c1c22] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
              <div className="flex items-center gap-4">
                <span>Finality: <strong className="text-white font-normal">~400ms</strong></span>
                <span>Avg Tx Fee: <strong className="text-white font-normal">&lt; 0.000005 SOL</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-sm" />
                <span className="text-neutral-300">Deterministic CPI Signer Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROTOCOL TELEMETRY BAR */}
      <section className="border-y border-[#1c1c22] bg-[#0c0c0e]/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block">
                TOKEN STANDARD
              </span>
              <span className="text-xl sm:text-2xl font-mono font-medium text-white block">
                SPL (0-Decimals)
              </span>
              <span className="text-xs text-[#a1a1aa] font-normal">Zero fractional point rounding</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block">
                BLOCK CONFIRMATION
              </span>
              <span className="text-xl sm:text-2xl font-mono font-medium text-white block">
                ~400 ms
              </span>
              <span className="text-xs text-[#a1a1aa] font-normal">Sub-second reward settlement</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block">
                AVERAGE GAS
              </span>
              <span className="text-xl sm:text-2xl font-mono font-medium text-white block">
                &lt; $0.0001
              </span>
              <span className="text-xs text-[#a1a1aa] font-normal">Cost-effective merchant scale</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] block">
                SECURITY MODEL
              </span>
              <span className="text-xl sm:text-2xl font-mono font-medium text-white block">
                PDA Seeds
              </span>
              <span className="text-xs text-[#a1a1aa] font-normal">No private keys in mint pipeline</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PLATFORM CAPABILITIES (6-Card Render Architecture Grid) */}
      <section className="py-20 border-b border-[#1c1c22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
              Why build loyalty on Solana with PointPass
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal">
              Designed from the ground up to eliminate the security vulnerabilities and vendor lock-in inherent in centralized Web2 customer databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Capability 1 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">01 / TOKEN ARCHITECTURE</span>
              <h3 className="text-lg font-normal text-white">Zero-Decimal SPL Tokens</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Points exist as sovereign SPL tokens directly in customer Solana wallets. No floating-point math inaccuracies, no fractional points, and no proprietary database lock-in.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">02 / AUTHORITY CONTROL</span>
              <h3 className="text-lg font-normal text-white">Non-Custodial Merchant Signers</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Only the verified merchant wallet signer can trigger point issuance for their store. PointsMint authority belongs strictly to the on-chain LoyaltyProgram PDA.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">03 / FRAUD PROTECTION</span>
              <h3 className="text-lg font-normal text-white">Cryptographic Proof-of-Burn</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Redemption executes an on-chain SPL token burn and mints a permanent, deterministic RedemptionReceipt PDA with a Unix timestamp and customer address.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">04 / ARITHMETIC INVARIANTS</span>
              <h3 className="text-lg font-normal text-white">Checked Math &amp; Overflow Reversion</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Every calculation and counter increment uses Rust checked arithmetic. Math overflow triggers immediate PointPassError::MathOverflow reversion.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">05 / MULTI-TENANCY</span>
              <h3 className="text-lg font-normal text-white">Isolated Per-Store State</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Each merchant owns a completely independent state tree derived from their public key. Thousands of merchants can operate simultaneously without state collisions.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="render-card p-6 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold block">06 / COMPOSABILITY</span>
              <h3 className="text-lg font-normal text-white">Open Solana Ecosystem Integration</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed font-normal">
                Because points are standard SPL tokens and receipts are standard Solana accounts, any Solana dApp, wallet, or indexer can query or integrate loyalty rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS / PROTOCOL LIFECYCLE (4-Step Timeline) */}
      <section className="py-20 border-b border-[#1c1c22] bg-[#0c0c0e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
              The four-step lifecycle of a PointPass token
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal">
              From store initialization to verifiable burn receipts, every transition is executed on-chain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="render-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a] border-b border-[#1c1c22] pb-2.5">
                <span>STEP 01</span>
                <span className="text-purple-400">INITIALIZE</span>
              </div>
              <h4 className="text-sm font-medium text-white">Deploy Store PDA</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Merchant connects their wallet and invokes initialize. The program derives the store LoyaltyProgram PDA and creates the PointsMint SPL token.
              </p>
              <div className="text-[11px] font-mono text-purple-300 pt-1">
                seeds = [&quot;loyalty&quot;, merchant]
              </div>
            </div>

            {/* Step 2 */}
            <div className="render-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a] border-b border-[#1c1c22] pb-2.5">
                <span>STEP 02</span>
                <span className="text-purple-400">AWARD</span>
              </div>
              <h4 className="text-sm font-medium text-white">Mint Points to Customer</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Merchant rewards a purchase by specifying customer address. Smart contract signs a CPI mint_to instruction using its PDA seeds.
              </p>
              <div className="text-[11px] font-mono text-purple-300 pt-1">
                CPI: token::mint_to(...)
              </div>
            </div>

            {/* Step 3 */}
            <div className="render-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a] border-b border-[#1c1c22] pb-2.5">
                <span>STEP 03</span>
                <span className="text-purple-400">REDEEM</span>
              </div>
              <h4 className="text-sm font-medium text-white">Burn Reward Points</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Customer triggers redeem once balance reaches reward_cost. Smart contract burns the required points directly from customer token account.
              </p>
              <div className="text-[11px] font-mono text-purple-300 pt-1">
                CPI: token::burn(...)
              </div>
            </div>

            {/* Step 4 */}
            <div className="render-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a] border-b border-[#1c1c22] pb-2.5">
                <span>STEP 04</span>
                <span className="text-emerald-400">STAMP RECEIPT</span>
              </div>
              <h4 className="text-sm font-medium text-white">Immutable Audit Proof</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                A RedemptionReceipt PDA is initialized on-chain with sequential receipt number, timestamp, and burned point count.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 pt-1">
                seeds = [&quot;redemption&quot;, ...]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARISON MATRIX (PointPass vs Web2 Loyalty Databases) */}
      <section className="py-20 border-b border-[#1c1c22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              COMPARATIVE ANALYSIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
              PointPass on Solana vs Legacy Web2 Loyalty
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal">
              Compare architectural differences between siloed centralized loyalty databases and decentralized on-chain SPL tokens.
            </p>
          </div>

          <div className="render-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#222228] text-[#71717a] uppercase bg-[#141418]">
                    <th className="py-3.5 px-5">Architectural Dimension</th>
                    <th className="py-3.5 px-5 text-neutral-400">Legacy Web2 Loyalty (Shopify / Square)</th>
                    <th className="py-3.5 px-5 text-white">PointPass Solana Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e24]">
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">Point Custody</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Siloed in private database table; merchant can delete or modify at will</td>
                    <td className="py-4 px-5 text-purple-300 font-sans">Self-custodied in customer wallet as SPL tokens; mathematically sovereign</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">Redemption Proof</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Database decrement flag; easily disputed or replayed during chargebacks</td>
                    <td className="py-4 px-5 text-purple-300 font-sans">Immutable on-chain RedemptionReceipt PDA with Solana Clock timestamp</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">Ecosystem Composability</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Zero composability; locked into proprietary vendor APIs and closed portals</td>
                    <td className="py-4 px-5 text-purple-300 font-sans">Standard SPL token; composable with DEXes, NFT gateways, and dApps</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">Account Isolation</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Multi-tenant shared SQL table; schema migration risks &amp; single point of failure</td>
                    <td className="py-4 px-5 text-purple-300 font-sans">Dedicated PDA accounts per merchant authority; zero shared state vulnerability</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">Auditability</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Internal audit logs accessible only to engineers and platform admins</td>
                    <td className="py-4 px-5 text-purple-300 font-sans">Publicly auditable by any explorer, RPC node, or third-party indexer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DETERMINISTIC PDA SPECIFICATIONS TABLE */}
      <section className="py-20 border-b border-[#1c1c22] bg-[#0c0c0e]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
              Deterministic Solana PDA standard
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal">
              Every merchant, points mint, and redemption receipt is derived deterministically on-chain without human private key management.
            </p>
          </div>

          <div className="render-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#222228] text-[#71717a] uppercase bg-[#141418]">
                    <th className="py-3.5 px-5">Component</th>
                    <th className="py-3.5 px-5">Type</th>
                    <th className="py-3.5 px-5">Seeds Formula</th>
                    <th className="py-3.5 px-5 font-sans">Authority Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e24]">
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">LoyaltyProgram</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">PDA Account</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;loyalty&quot;, merchant_pubkey]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Controlled strictly by merchant wallet signer</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">PointsMint</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">SPL Token Mint (0-Decimals)</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;mint&quot;, loyalty_program_pda]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Mint authority is the LoyaltyProgram PDA itself</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">RedemptionReceipt</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">Proof-of-Burn PDA</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;redemption&quot;, loyalty_pda, customer, index]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Immutable on-chain timestamp and cryptographic burn proof</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: DEVELOPER CODE PLAYGROUND */}
      <section className="py-20 border-b border-[#1c1c22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
                DEVELOPER TOOLING
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-white">
                Engineered for TypeScript and Rust
              </h2>
              <p className="text-sm text-[#a1a1aa] font-normal">
                Inspect how instructions and client calls are structured under the hood.
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCodeTab("anchor")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                  activeCodeTab === "anchor"
                    ? "bg-white text-black font-medium"
                    : "bg-[#18181b] text-neutral-400 hover:text-white border border-[#27272a]"
                }`}
              >
                Anchor Instruction
              </button>
              <button
                onClick={() => setActiveCodeTab("sdk")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                  activeCodeTab === "sdk"
                    ? "bg-white text-black font-medium"
                    : "bg-[#18181b] text-neutral-400 hover:text-white border border-[#27272a]"
                }`}
              >
                TypeScript Client
              </button>
              <button
                onClick={() => setActiveCodeTab("cli")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                  activeCodeTab === "cli"
                    ? "bg-white text-black font-medium"
                    : "bg-[#18181b] text-neutral-400 hover:text-white border border-[#27272a]"
                }`}
              >
                CLI &amp; Test Suite
              </button>
            </div>
          </div>

          <div className="render-card overflow-hidden bg-[#0c0c0e] border border-[#222228] p-5 font-mono text-xs leading-relaxed text-[#d4d4d8]">
            {activeCodeTab === "anchor" && (
              <pre className="overflow-x-auto text-[#d4d4d8]">
{`// Burn points and stamp an immutable on-chain receipt PDA
pub fn handle_redeem(ctx: Context<Redeem>) -> Result<()> {
    let loyalty_program = &mut ctx.accounts.loyalty_program;
    let reward_cost = loyalty_program.reward_cost;

    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.points_mint.to_account_info(),
                from: ctx.accounts.customer_token_account.to_account_info(),
                authority: ctx.accounts.customer.to_account_info(),
            },
        ),
        reward_cost,
    )?;

    let receipt = &mut ctx.accounts.receipt;
    receipt.customer = ctx.accounts.customer.key();
    receipt.loyalty_program = loyalty_program.key();
    receipt.receipt_number = loyalty_program.redemption_count;
    receipt.points_burned = reward_cost;
    receipt.timestamp = Clock::get()?.unix_timestamp;
    receipt.bump = ctx.bumps.receipt;

    loyalty_program.total_redeemed = loyalty_program.total_redeemed.checked_add(reward_cost).ok_or(PointPassError::MathOverflow)?;
    loyalty_program.redemption_count = loyalty_program.redemption_count.checked_add(1).ok_or(PointPassError::MathOverflow)?;

    Ok(())
}`}
              </pre>
            )}

            {activeCodeTab === "sdk" && (
              <pre className="overflow-x-auto text-[#d4d4d8]">
{`// Client-side execution with automatic PDA resolution
import { redeemPoints, getProgram } from "@/lib";

const txSignature = await redeemPoints(
  program,
  customerPublicKey,
  merchantPublicKey
);

console.log("Redemption confirmed on Solana Devnet:", txSignature);`}
              </pre>
            )}

            {activeCodeTab === "cli" && (
              <pre className="overflow-x-auto text-[#d4d4d8]">
{`# Run comprehensive Anchor integration test suite against Solana test validator
$ anchor test --skip-build

  pointpass-solana
    [PASS] initializes merchant loyalty program with PDA mint (214ms)
    [PASS] awards zero-decimal SPL tokens to customer via CPI (389ms)
    [PASS] redeems reward by burning points & creating receipt PDA (412ms)
    [PASS] reverts when non-merchant attempts unauthorized minting (198ms)
    [PASS] prevents math overflow in total_awarded counters (184ms)

  5 passing (1.4s)`}
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: CALL TO ACTION BANNER */}
      <section className="py-20 border-b border-[#1c1c22]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="render-card p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-purple-600/10 to-transparent pointer-events-none" />
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              GET STARTED TODAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white max-w-2xl mx-auto">
              Ready to deploy loyalty on Solana?
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] max-w-xl mx-auto font-normal">
              Experience zero-decimal SPL loyalty tokens on Solana Devnet. Test the customer flow or launch your own merchant terminal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="btn-primary text-sm px-6 py-2.5">
                Launch customer demo &gt;
              </Link>
              <Link href="/merchant" className="btn-secondary text-sm px-5 py-2.5">
                Open merchant console
              </Link>
              <Link href="/docs" className="btn-secondary text-sm px-5 py-2.5">
                Read protocol docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: RENDER MINIMALIST MULTI-COLUMN FOOTER */}
      <footer className="py-16 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#1c1c22] text-xs">
            <div className="space-y-3">
              <span className="font-semibold text-white block">PointPass</span>
              <p className="text-[#71717a] font-normal leading-relaxed">
                Non-custodial loyalty token infrastructure for the Solana ecosystem.
              </p>
              <span className="text-[11px] font-mono text-[#71717a] block">Apache-2.0 License</span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a] block font-semibold">
                APPLICATIONS
              </span>
              <ul className="space-y-1.5 text-[#a1a1aa]">
                <li><Link href="/customer" className="hover:text-white transition-colors">Customer Portal</Link></li>
                <li><Link href="/merchant" className="hover:text-white transition-colors">Merchant Dashboard</Link></li>
                <li><Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="hover:text-white transition-colors">Demo Store (Bean There Cafe)</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a] block font-semibold">
                DOCUMENTATION
              </span>
              <ul className="space-y-1.5 text-[#a1a1aa]">
                <li><Link href="/docs" className="hover:text-white transition-colors">Protocol Overview</Link></li>
                <li><Link href="/docs/pda" className="hover:text-white transition-colors">PDA Seed Derivations</Link></li>
                <li><Link href="/docs/cpi" className="hover:text-white transition-colors">CPI &amp; Token Minting</Link></li>
                <li><Link href="/docs/receipts" className="hover:text-white transition-colors">Proof-of-Burn Receipts</Link></li>
                <li><Link href="/docs/security" className="hover:text-white transition-colors">Security &amp; Invariants</Link></li>
                <li><Link href="/docs/sdk" className="hover:text-white transition-colors">TypeScript SDK</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a] block font-semibold">
                NETWORK &amp; RESOURCES
              </span>
              <ul className="space-y-1.5 text-[#a1a1aa]">
                <li>
                  <a href="https://github.com/meet987654/pointpass-solana" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href={`https://explorer.solana.com/address/${PROGRAM_ID.toBase58()}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono">
                    Program Explorer
                  </a>
                </li>
                <li>
                  <span className="text-[#71717a]">Cluster: Solana Devnet</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
            <span>(c) 2026 PointPass Solana Infrastructure. All rights reserved.</span>
            <span>Program ID: {PROGRAM_ID.toBase58()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
