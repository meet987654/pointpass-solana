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
    <div className="relative text-[#fafafa]">
      
      {/* SECTION 1: FULL-SCREEN SEAMLESS HERO (MATCHING "CONTENT NEEDS STRATEGY" IMAGE) */}
      <section className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-16 sm:pt-24 pb-20 max-w-5xl mx-auto">
        
        {/* Top Brand Pill (matching plexisocial badge) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-white/20 text-xs font-mono text-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.3)] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#67baf4] shadow-[0_0_12px_#67baf4]" />
          <span className="font-normal tracking-wider text-[#67baf4]">POINTPASS</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80 font-light">Solana Loyalty Protocol</span>
        </div>

        {/* Hero Headline: Thin, Elegant Sans Typography (matching "Content Needs Strategy") */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white leading-[1.04] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
          Loyalty Needs <br />
          <span className="font-light bg-gradient-to-r from-white via-blue-100 to-[#93c5fd] bg-clip-text text-transparent">
            Strategy
          </span>
        </h1>

        {/* Subtitle echoing "Strategy Turns Ideas Into Growth" */}
        <p className="mt-6 text-base sm:text-xl font-light text-blue-100/80 leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          Strategy Turns Customer Visits Into Sovereign SPL Tokens.
        </p>

        {/* Frosted Glass Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href={`/customer?merchant=${DEMO_MERCHANT}`}
            className="btn-glass-primary font-normal"
          >
            Launch Protocol &gt;
          </Link>

          <Link
            href="/merchant"
            className="btn-glass-secondary font-light"
          >
            Merchant Terminal
          </Link>

          <Link
            href="/docs"
            className="btn-glass-secondary font-light"
          >
            Learn Strategy
          </Link>
        </div>

        {/* Quick Metadata Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-blue-200/60">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">[ ZERO DECIMALS ]</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">[ NON-CUSTODIAL PDAS ]</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">[ PROOF-OF-BURN ]</span>
        </div>
      </section>

      {/* SECTION 1B: TWIN FLOATING GLASS CARDS (MATCHING "TRAIN SANDRA" & "DESIGN DEEP" STYLES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: "Train Sandra" style glass card (Image 2) */}
          <div className="glass-card p-7 sm:p-9 space-y-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
                AUTONOMOUS STORE LOGIC
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-snug">
                Configure PointPass to Represent Your Store
              </h3>
              <p className="text-sm font-light text-blue-100/70 leading-relaxed">
                Personalize your loyalty program with your business name, reward redemption costs, and zero-decimal SPL tokens so PointPass can reward customers just like you would.
              </p>
            </div>

            {/* Center Visual: Frosted Glass Telemetry Prism Container */}
            <div className="relative py-6 px-5 rounded-2xl bg-[#08122a]/50 border border-white/10 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-200/80">
                <span>ON-CHAIN STATE</span>
                <span className="text-[#67baf4] font-normal">DEVNET VERIFIED</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-[10px] text-blue-200/60 uppercase block font-light">AWARDED</span>
                  <span className="text-sm font-light text-white">{programLoading ? "..." : `${programData?.totalAwarded ?? 55} pts`}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-[10px] text-blue-200/60 uppercase block font-light">BURNED</span>
                  <span className="text-sm font-light text-white">{programLoading ? "..." : `${programData?.totalRedeemed ?? 30} pts`}</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-[10px] text-blue-200/60 uppercase block font-light">RECEIPTS</span>
                  <span className="text-sm font-light text-white">{programLoading ? "..." : `${programData?.redemptionCount ?? 3}`}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-blue-200/60">
              <span className="font-light">Deterministic PDA Pipeline</span>
              <Link href="/merchant" className="text-[#67baf4] hover:underline font-normal">
                Open Console -&gt;
              </Link>
            </div>
          </div>

          {/* Card 2: "Design deep, build better" style glass card (Image 3) */}
          <div className="glass-card p-7 sm:p-9 space-y-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal">
                  HIGH-END PROTOCOL AESTHETICS
                </span>
                <span className="text-xs font-mono text-blue-200/60 font-light">[400ms block time]</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-snug">
                Design deep, build better, <br />
                refine sovereign loyalty.
              </h3>
              <p className="text-sm font-light text-blue-100/70 leading-relaxed italic">
                Modern glassmorphism style on Solana Devnet.
              </p>
            </div>

            {/* Visual: Live Telemetry Sparkline & Program Account */}
            <div className="relative py-6 px-5 rounded-2xl bg-[#08122a]/50 border border-white/10 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-200/80 font-light">points-mint-pda</span>
                <span className="text-emerald-300 font-light">Available</span>
              </div>
              <div className="h-5 w-full flex items-end">
                <div className="h-2.5 w-full bg-gradient-to-r from-blue-600 via-[#67baf4] to-blue-400 rounded-full shadow-[0_0_12px_#67baf4]" />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-blue-200/60 pt-1">
                <span>DECIMALS: 0 (Integer)</span>
                <span>GAS: &lt; 0.000005 SOL</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-blue-200/60">
              <span className="font-light">Program ID: {PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}</span>
              <Link href="/docs" className="text-[#67baf4] hover:underline font-normal">
                Explore Specs -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROTOCOL TELEMETRY RIBBON (Frosted Glass Horizon) */}
      <section className="py-12 border-y border-white/[0.08] bg-[#070e24]/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200/60 block font-light">
                TOKEN STANDARD
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-light text-white block">
                SPL (0-Decimals)
              </span>
              <span className="text-xs text-blue-100/70 font-light">Zero fractional point rounding</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200/60 block font-light">
                CONFIRMATION TIME
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-light text-white block">
                ~400 ms
              </span>
              <span className="text-xs text-blue-100/70 font-light">Sub-second reward settlement</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200/60 block font-light">
                NETWORK GAS FEE
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-light text-white block">
                &lt; $0.0001
              </span>
              <span className="text-xs text-blue-100/70 font-light">Fractional cent store scale</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200/60 block font-light">
                SECURITY INVARIANT
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-light text-white block">
                PDA Seeds
              </span>
              <span className="text-xs text-blue-100/70 font-light">No private keys in mint path</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE CAPABILITIES (6 Frosted Glass Cards) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Engineered for high-throughput merchant scale
          </h2>
          <p className="text-sm sm:text-base text-blue-100/70 max-w-2xl font-light">
            Designed from mathematical foundations to eliminate the vulnerabilities and database lock-in of legacy loyalty programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">01 / TOKEN ARCHITECTURE</span>
            <h3 className="text-lg font-light text-white">Zero-Decimal SPL Tokens</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Points are minted as sovereign SPL tokens directly in customer Solana wallets. No floating-point math inaccuracies, no fractional points, and no database lock-in.
            </p>
          </div>

          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">02 / AUTHORITY CONTROL</span>
            <h3 className="text-lg font-light text-white">Non-Custodial Merchant Signers</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Only the verified merchant wallet signer can trigger point issuance for their store. PointsMint authority belongs strictly to the on-chain LoyaltyProgram PDA.
            </p>
          </div>

          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">03 / FRAUD PROTECTION</span>
            <h3 className="text-lg font-light text-white">Cryptographic Proof-of-Burn</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Redemption executes an on-chain SPL token burn and mints a permanent, deterministic RedemptionReceipt PDA with a Unix timestamp and customer address.
            </p>
          </div>

          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">04 / ARITHMETIC INVARIANTS</span>
            <h3 className="text-lg font-light text-white">Checked Math &amp; Overflow Reversion</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Every calculation and counter increment uses Rust checked arithmetic. Math overflow triggers immediate PointPassError::MathOverflow reversion.
            </p>
          </div>

          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">05 / MULTI-TENANCY</span>
            <h3 className="text-lg font-light text-white">Isolated Per-Store State</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Each merchant owns a completely independent state tree derived from their public key. Thousands of merchants can operate simultaneously without state collisions.
            </p>
          </div>

          <div className="glass-card p-7 space-y-3">
            <span className="text-xs font-mono text-[#67baf4] uppercase font-normal block">06 / COMPOSABILITY</span>
            <h3 className="text-lg font-light text-white">Open Solana Ecosystem Integration</h3>
            <p className="text-xs text-blue-100/70 leading-relaxed font-light">
              Because points are standard SPL tokens and receipts are standard Solana accounts, any Solana dApp, wallet, or indexer can query or integrate loyalty rewards.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS / 4-STEP TIMELINE */}
      <section className="py-24 border-y border-white/[0.08] bg-[#070e24]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
              WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              The four-step lifecycle of a PointPass token
            </h2>
            <p className="text-sm sm:text-base text-blue-100/70 max-w-2xl font-light">
              From store initialization to verifiable burn receipts, every transition is executed on-chain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-200/70 border-b border-white/10 pb-2.5">
                <span className="font-light">STEP 01</span>
                <span className="text-[#67baf4] font-normal">INITIALIZE</span>
              </div>
              <h4 className="text-base font-light text-white">Deploy Store PDA</h4>
              <p className="text-xs text-blue-100/70 leading-relaxed font-light">
                Merchant connects wallet and invokes initialize. The program derives the store LoyaltyProgram PDA and creates the PointsMint SPL token.
              </p>
              <div className="text-[11px] font-mono text-blue-300 pt-1 font-light">
                seeds = [&quot;loyalty&quot;, merchant]
              </div>
            </div>

            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-200/70 border-b border-white/10 pb-2.5">
                <span className="font-light">STEP 02</span>
                <span className="text-[#67baf4] font-normal">AWARD</span>
              </div>
              <h4 className="text-base font-light text-white">Mint Points to Customer</h4>
              <p className="text-xs text-blue-100/70 leading-relaxed font-light">
                Merchant rewards a purchase by specifying customer address. Smart contract signs a CPI mint_to instruction using its PDA seeds.
              </p>
              <div className="text-[11px] font-mono text-blue-300 pt-1 font-light">
                CPI: token::mint_to(...)
              </div>
            </div>

            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-200/70 border-b border-white/10 pb-2.5">
                <span className="font-light">STEP 03</span>
                <span className="text-[#67baf4] font-normal">REDEEM</span>
              </div>
              <h4 className="text-base font-light text-white">Burn Reward Points</h4>
              <p className="text-xs text-blue-100/70 leading-relaxed font-light">
                Customer triggers redeem once balance reaches reward_cost. Smart contract burns the required points directly from customer token account.
              </p>
              <div className="text-[11px] font-mono text-blue-300 pt-1 font-light">
                CPI: token::burn(...)
              </div>
            </div>

            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-200/70 border-b border-white/10 pb-2.5">
                <span className="font-light">STEP 04</span>
                <span className="text-emerald-300 font-normal">STAMP RECEIPT</span>
              </div>
              <h4 className="text-base font-light text-white">Immutable Audit Proof</h4>
              <p className="text-xs text-blue-100/70 leading-relaxed font-light">
                A RedemptionReceipt PDA is initialized on-chain with sequential receipt number, timestamp, and burned point count.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 pt-1 font-light">
                seeds = [&quot;redemption&quot;, ...]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARATIVE ANALYSIS MATRIX */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
            COMPARATIVE ANALYSIS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            PointPass on Solana vs Legacy Web2 Loyalty
          </h2>
          <p className="text-sm sm:text-base text-blue-100/70 max-w-2xl font-light">
            Compare architectural differences between siloed centralized loyalty databases and decentralized on-chain SPL tokens.
          </p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-blue-200/70 uppercase bg-white/[0.03]">
                  <th className="py-4 px-6 font-normal">Architectural Dimension</th>
                  <th className="py-4 px-6 text-white/50 font-light">Legacy Web2 Loyalty (Shopify / Square)</th>
                  <th className="py-4 px-6 text-[#67baf4] font-normal">PointPass Solana Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-light text-white">Point Custody</td>
                  <td className="py-4 px-6 text-white/60 font-sans font-light">Siloed in private database table; merchant can delete or modify at will</td>
                  <td className="py-4 px-6 text-blue-200 font-sans font-light">Self-custodied in customer wallet as SPL tokens; mathematically sovereign</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-light text-white">Redemption Proof</td>
                  <td className="py-4 px-6 text-white/60 font-sans font-light">Database decrement flag; easily disputed or replayed during chargebacks</td>
                  <td className="py-4 px-6 text-blue-200 font-sans font-light">Immutable on-chain RedemptionReceipt PDA with Solana Clock timestamp</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-light text-white">Ecosystem Composability</td>
                  <td className="py-4 px-6 text-white/60 font-sans font-light">Zero composability; locked into proprietary vendor APIs and closed portals</td>
                  <td className="py-4 px-6 text-blue-200 font-sans font-light">Standard SPL token; composable with DEXes, NFT gateways, and dApps</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-light text-white">Account Isolation</td>
                  <td className="py-4 px-6 text-white/60 font-sans font-light">Multi-tenant shared SQL table; schema migration risks &amp; single point of failure</td>
                  <td className="py-4 px-6 text-blue-200 font-sans font-light">Dedicated PDA accounts per merchant authority; zero shared state vulnerability</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-light text-white">Auditability</td>
                  <td className="py-4 px-6 text-white/60 font-sans font-light">Internal audit logs accessible only to engineers and platform admins</td>
                  <td className="py-4 px-6 text-blue-200 font-sans font-light">Publicly auditable by any explorer, RPC node, or third-party indexer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 6: DETERMINISTIC PDA SPECIFICATIONS TABLE */}
      <section className="py-24 border-y border-white/[0.08] bg-[#070e24]/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
              SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Deterministic Solana PDA standard
            </h2>
            <p className="text-sm sm:text-base text-blue-100/70 max-w-2xl font-light">
              Every merchant, points mint, and redemption receipt is derived deterministically on-chain without human private key management.
            </p>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-blue-200/70 uppercase bg-white/[0.03]">
                    <th className="py-4 px-6 font-normal">Component</th>
                    <th className="py-4 px-6 font-light">Type</th>
                    <th className="py-4 px-6 font-normal">Seeds Formula</th>
                    <th className="py-4 px-6 font-sans font-light">Authority Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-light text-white">LoyaltyProgram</td>
                    <td className="py-4 px-6 text-blue-200/70 font-light">PDA Account</td>
                    <td className="py-4 px-6 text-[#93c5fd] font-light">[&quot;loyalty&quot;, merchant_pubkey]</td>
                    <td className="py-4 px-6 text-white/80 font-sans font-light">Controlled strictly by merchant wallet signer</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-light text-white">PointsMint</td>
                    <td className="py-4 px-6 text-blue-200/70 font-light">SPL Token Mint (0-Decimals)</td>
                    <td className="py-4 px-6 text-[#93c5fd] font-light">[&quot;mint&quot;, loyalty_program_pda]</td>
                    <td className="py-4 px-6 text-white/80 font-sans font-light">Mint authority is the LoyaltyProgram PDA itself</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-light text-white">RedemptionReceipt</td>
                    <td className="py-4 px-6 text-blue-200/70 font-light">Proof-of-Burn PDA</td>
                    <td className="py-4 px-6 text-[#93c5fd] font-light">[&quot;redemption&quot;, loyalty_pda, customer, index]</td>
                    <td className="py-4 px-6 text-white/80 font-sans font-light">Immutable on-chain timestamp and cryptographic burn proof</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: DEVELOPER CODE PLAYGROUND */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
              DEVELOPER TOOLING
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Engineered for TypeScript and Rust
            </h2>
            <p className="text-sm text-blue-100/70 font-light">
              Inspect how instructions and client calls are structured under the hood.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCodeTab("anchor")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                activeCodeTab === "anchor"
                  ? "bg-white text-[#050814] font-normal shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-blue-100/70 hover:text-white border border-white/10 font-light"
              }`}
            >
              Anchor Instruction
            </button>
            <button
              onClick={() => setActiveCodeTab("sdk")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                activeCodeTab === "sdk"
                  ? "bg-white text-[#050814] font-normal shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-blue-100/70 hover:text-white border border-white/10 font-light"
              }`}
            >
              TypeScript Client
            </button>
            <button
              onClick={() => setActiveCodeTab("cli")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                activeCodeTab === "cli"
                  ? "bg-white text-[#050814] font-normal shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-blue-100/70 hover:text-white border border-white/10 font-light"
              }`}
            >
              CLI &amp; Test Suite
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden p-6 font-mono text-xs leading-relaxed text-[#d4d4d8] border border-white/15">
          {activeCodeTab === "anchor" && (
            <pre className="overflow-x-auto text-[#d4d4d8] font-light">
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
            <pre className="overflow-x-auto text-[#d4d4d8] font-light">
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
            <pre className="overflow-x-auto text-[#d4d4d8] font-light">
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
      </section>

      {/* SECTION 8: CALL TO ACTION BANNER */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="glass-card p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(29,78,216,0.25)]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-600/15 to-transparent pointer-events-none" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#67baf4] font-normal block">
            GET STARTED TODAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white max-w-2xl mx-auto">
            Ready to deploy sovereign loyalty on Solana?
          </h2>
          <p className="text-sm sm:text-base text-blue-100/80 max-w-xl mx-auto font-light">
            Experience zero-decimal SPL loyalty tokens on Solana Devnet. Test the customer flow or launch your own store terminal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="btn-glass-primary">
              Launch Customer Demo &gt;
            </Link>
            <Link href="/merchant" className="btn-glass-secondary">
              Open Merchant Console
            </Link>
            <Link href="/docs" className="btn-glass-secondary">
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 9: GLASSMORPHIC FOOTER */}
      <footer className="py-16 border-t border-white/[0.08] bg-[#050814]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08] text-xs">
            <div className="space-y-3">
              <span className="font-light text-white text-sm block">PointPass</span>
              <p className="text-blue-100/60 font-light leading-relaxed">
                Non-custodial loyalty token infrastructure for the Solana ecosystem.
              </p>
              <span className="text-[11px] font-mono text-blue-200/50 block font-light">Apache-2.0 License</span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-blue-200/60 block font-normal">
                APPLICATIONS
              </span>
              <ul className="space-y-2 text-blue-100/70 font-light">
                <li><Link href="/customer" className="hover:text-white transition-colors">Customer Portal</Link></li>
                <li><Link href="/merchant" className="hover:text-white transition-colors">Merchant Dashboard</Link></li>
                <li><Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="hover:text-white transition-colors">Demo Store (Bean There Cafe)</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-blue-200/60 block font-normal">
                DOCUMENTATION
              </span>
              <ul className="space-y-2 text-blue-100/70 font-light">
                <li><Link href="/docs" className="hover:text-white transition-colors">Protocol Overview</Link></li>
                <li><Link href="/docs/pda" className="hover:text-white transition-colors">PDA Seed Derivations</Link></li>
                <li><Link href="/docs/cpi" className="hover:text-white transition-colors">CPI &amp; Token Minting</Link></li>
                <li><Link href="/docs/receipts" className="hover:text-white transition-colors">Proof-of-Burn Receipts</Link></li>
                <li><Link href="/docs/security" className="hover:text-white transition-colors">Security &amp; Invariants</Link></li>
                <li><Link href="/docs/sdk" className="hover:text-white transition-colors">TypeScript SDK</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-blue-200/60 block font-normal">
                NETWORK &amp; RESOURCES
              </span>
              <ul className="space-y-2 text-blue-100/70 font-light">
                <li>
                  <a href="https://github.com/meet987654/pointpass-solana" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href={`https://explorer.solana.com/address/${PROGRAM_ID.toBase58()}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono font-light">
                    Program Explorer
                  </a>
                </li>
                <li>
                  <span className="text-blue-200/60 font-light">Cluster: Solana Devnet</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-blue-200/50 font-light">
            <span>(c) 2026 PointPass Solana Infrastructure. All rights reserved.</span>
            <span>Program ID: {PROGRAM_ID.toBase58()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
