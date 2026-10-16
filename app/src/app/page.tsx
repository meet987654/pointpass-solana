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

      {/* SECTION 1B: SHOWCASE GLASS CARDS (EXACT REFERENCE LAYOUT & DESIGNING) */}
      <section className="relative py-16 max-w-7xl mx-auto px-4 sm:px-8 mb-16 overflow-hidden rounded-[44px]">
        {/* Swirling Silky Blue Ribbon Background Layer */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[44px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 scale-105"
            style={{ backgroundImage: `url('/blue-ribbon-vortex-bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/30 via-[#050814]/10 to-[#050814]/40" />
        </div>

        {/* 3-Column Exact Reference Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          
          {/* Card 1: Reference Design Master Card */}
          <div className="glass-card-reference p-7 sm:p-9 flex flex-col justify-between min-h-[480px] relative group">
            {/* Top Row: Description + Bracketed Tag */}
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                High-end aesthetics—featuring fully editable layers to optimize workflow and enhance visual quality by 100%.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [4K resolution]
              </span>
            </div>

            {/* Middle: Prominent 3-line statement + italic subtitle */}
            <div className="my-auto py-8 space-y-2.5">
              <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-[1.12]">
                Design deep,<br />
                build better,<br />
                refine quicker.
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 italic font-light">
                Modern glassmorphism style.
              </p>
            </div>

            {/* Bottom Row: Pill with arrow + 2-line metadata + asterisk starburst */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>SOCIAL MEDIA USE</div>
                  <div className="text-white/60">2500×3200</div>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl text-white font-light select-none leading-none">
                ✱
              </span>
            </div>
          </div>

          {/* Card 2: Sovereign Loyalty Token Standard */}
          <div className="glass-card-reference p-7 sm:p-9 flex flex-col justify-between min-h-[480px] relative group">
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Non-custodial loyalty—featuring deterministic PDA pipelines to eliminate state lock-in and guarantee sovereign custody.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [SPL STANDARD]
              </span>
            </div>

            {/* Middle */}
            <div className="my-auto py-8 space-y-2.5">
              <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-[1.12]">
                Mint freely,<br />
                custody truly,<br />
                redeem instantly.
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 italic font-light">
                Deterministic PDA seed architecture.
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <Link href="/merchant" className="w-11 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light hover:bg-white/20 transition-colors">
                  →
                </Link>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>TOTAL AWARDED: {programLoading ? "..." : `${programData?.totalAwarded ?? 55} PTS`}</div>
                  <div className="text-white/60">ZERO-DECIMAL MINT</div>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl text-white font-light select-none leading-none">
                ✱
              </span>
            </div>
          </div>

          {/* Card 3: Cryptographic Proof-of-Burn Receipts */}
          <div className="glass-card-reference p-7 sm:p-9 flex flex-col justify-between min-h-[480px] relative group">
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Cryptographic proof-of-burn—featuring permanent on-chain receipts stamped with Unix timestamps and customer public keys.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [0.0004 SOL]
              </span>
            </div>

            {/* Middle */}
            <div className="my-auto py-8 space-y-2.5">
              <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-[1.12]">
                Burn cleanly,<br />
                verify openly,<br />
                scale infinitely.
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 italic font-light">
                Immutable on-chain receipts.
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <Link href="/docs/receipts" className="w-11 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light hover:bg-white/20 transition-colors">
                  →
                </Link>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>PROOF-OF-BURN PDA</div>
                  <div className="text-white/60">SOLANA DEVNET</div>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl text-white font-light select-none leading-none">
                ✱
              </span>
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

      {/* SECTION 3: CORE CAPABILITIES (6 EXACT REFERENCE GLASS CARDS) */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Capability Card 1 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Sovereign wallet custody—minted as standard SPL tokens with integer units and deterministic accounts.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [01 / SPL]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Zero decimals,<br />
                zero slippage,<br />
                true ownership.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                Pure integer arithmetic standard.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>TOKEN PIPELINE</div>
                  <div className="text-white/60">SPL STANDARD</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>

          {/* Capability Card 2 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Verified authority control—only authorized merchant wallet signers can trigger reward minting.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [02 / PDA]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Non-custodial,<br />
                signer-gated,<br />
                sovereign state.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                Cryptographic signer verification.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>AUTHORITY CONTROL</div>
                  <div className="text-white/60">PROGRAM SIGNER</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>

          {/* Capability Card 3 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Cryptographic proof-of-burn—redemption executes an SPL burn and stamps an immutable on-chain receipt PDA.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [03 / BURN]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Proof-of-burn,<br />
                atomic execution,<br />
                zero fraud.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                Deterministic receipt stamps.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>RECEIPT PDA</div>
                  <div className="text-white/60">ON-CHAIN AUDIT</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>

          {/* Capability Card 4 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Rust checked arithmetic—math overflow triggers immediate transaction reversion across counters.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [04 / MATH]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Checked math,<br />
                safe counters,<br />
                provable state.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                PointPassError invariant guarantees.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>SAFETY INVARIANT</div>
                  <div className="text-white/60">ANCHOR REVERSION</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>

          {/* Capability Card 5 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Deterministic multi-tenancy—thousands of stores run simultaneously on isolated PDA seed trees.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [05 / MULTI]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Isolated state,<br />
                merchant seeds,<br />
                infinite scale.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                Zero cross-program state contention.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>PDA ISOLATION</div>
                  <div className="text-white/60">PER-STORE TREE</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>

          {/* Capability Card 6 */}
          <div className="glass-card-reference p-8 sm:p-9 flex flex-col justify-between min-h-[440px] relative group">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs text-white/85 font-light leading-relaxed max-w-[210px]">
                Open Solana composability—all accounts, tokens, and receipts are standard Solana primitives.
              </p>
              <span className="text-xs font-mono text-white/75 tracking-wider font-light shrink-0">
                [06 / CPI]
              </span>
            </div>
            <div className="my-auto py-6 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-[1.15]">
                Composable dApps,<br />
                wallet native,<br />
                ecosystem wide.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/85 italic font-light">
                Instant wallet & explorer indexing.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-xs font-light">
                  →
                </div>
                <div className="text-[10px] font-mono tracking-wider text-white/85 uppercase leading-tight font-light">
                  <div>COMPOSABILITY</div>
                  <div className="text-white/60">SOLANA ECOSYSTEM</div>
                </div>
              </div>
              <span className="text-3xl text-white font-light select-none leading-none">✱</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS / 4-STEP TIMELINE (EXACT LUMINOUS GRADIENT CARD DESIGN) */}
      <section className="relative py-24 max-w-7xl mx-auto px-4 sm:px-8 my-16 overflow-hidden rounded-[44px]">
        {/* Luminous Gradient Aurora Curtains Background Layer */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[44px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 scale-105"
            style={{ backgroundImage: `url('/luminous-gradient-bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/35 via-transparent to-[#050814]/45" />
        </div>

        <div className="space-y-12 relative z-10">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 Card: Initialize */}
            <div className="glass-card-reference p-6 sm:p-7 flex flex-col justify-between min-h-[420px] relative group">
              {/* Top Row: Oval Pill with 2-line uppercase text + Starburst */}
              <div className="flex items-start justify-between gap-3">
                <div className="px-4 py-1.5 rounded-full border border-white/50 bg-white/[0.08] backdrop-blur-md text-center inline-flex flex-col items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-white/90 uppercase font-light leading-tight">
                    01 / LIFECYCLE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#67baf4] uppercase font-light leading-tight">
                    INITIALIZE
                  </span>
                </div>
                <span className="text-3xl text-white font-light select-none leading-none">
                  ✱
                </span>
              </div>

              {/* Middle: Pill badge cluster */}
              <div className="space-y-2 pt-10 pb-3">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    MERCHANT SEED
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    DEVNET
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    ZERO DECIMALS
                  </span>
                </div>
              </div>

              {/* Bottom: Huge bold uppercase title */}
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase leading-[1.08]">
                  DEPLOY STORE<br />
                  PDA MINT
                </h3>
              </div>
            </div>

            {/* Step 2 Card: Award */}
            <div className="glass-card-reference p-6 sm:p-7 flex flex-col justify-between min-h-[420px] relative group">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="px-4 py-1.5 rounded-full border border-white/50 bg-white/[0.08] backdrop-blur-md text-center inline-flex flex-col items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-white/90 uppercase font-light leading-tight">
                    02 / LIFECYCLE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#67baf4] uppercase font-light leading-tight">
                    AWARD POINTS
                  </span>
                </div>
                <span className="text-3xl text-white font-light select-none leading-none">
                  ✱
                </span>
              </div>

              {/* Middle */}
              <div className="space-y-2 pt-10 pb-3">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    SIGNER GATED
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    CPI INSTRUCTION
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    SOVEREIGN
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase leading-[1.08]">
                  MINT POINTS<br />
                  VIA CPI
                </h3>
              </div>
            </div>

            {/* Step 3 Card: Redeem */}
            <div className="glass-card-reference p-6 sm:p-7 flex flex-col justify-between min-h-[420px] relative group">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="px-4 py-1.5 rounded-full border border-white/50 bg-white/[0.08] backdrop-blur-md text-center inline-flex flex-col items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-white/90 uppercase font-light leading-tight">
                    03 / LIFECYCLE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#67baf4] uppercase font-light leading-tight">
                    REDEEM REWARD
                  </span>
                </div>
                <span className="text-3xl text-white font-light select-none leading-none">
                  ✱
                </span>
              </div>

              {/* Middle */}
              <div className="space-y-2 pt-10 pb-3">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    ATOMIC BURN
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    SPL TOKEN ENGINE
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    NON-FRACTIONAL
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase leading-[1.08]">
                  BURN TOKENS<br />
                  FOR REWARDS
                </h3>
              </div>
            </div>

            {/* Step 4 Card: Stamp Receipt */}
            <div className="glass-card-reference p-6 sm:p-7 flex flex-col justify-between min-h-[420px] relative group">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="px-4 py-1.5 rounded-full border border-white/50 bg-white/[0.08] backdrop-blur-md text-center inline-flex flex-col items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest text-white/90 uppercase font-light leading-tight">
                    04 / LIFECYCLE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase font-light leading-tight">
                    STAMP RECEIPT
                  </span>
                </div>
                <span className="text-3xl text-white font-light select-none leading-none">
                  ✱
                </span>
              </div>

              {/* Middle */}
              <div className="space-y-2 pt-10 pb-3">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    IMMUTABLE PROOF
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    CLOCK TIMESTAMP
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-white/[0.06] backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 uppercase font-light">
                    PERMANENT PDA
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase leading-[1.08]">
                  IMMUTABLE<br />
                  RECEIPT PDA
                </h3>
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
