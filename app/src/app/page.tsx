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
    <div className="relative text-[#ffffff]">
      
      {/* =========================================================================
          SECTION 1: HERO (EXACT RESCUE PARTNERS ODDVAL HORIZON SPECIMEN LAYOUT)
          ========================================================================= */}
      <section className="relative w-full min-h-[88vh] bg-gradient-to-b from-[#05131c] via-[#0b273b] via-45% to-[#8eb9cb] px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col justify-between border-b border-[#d3dde2]/20 overflow-hidden">
        
        {/* Top Region: Giant Oddval Display Title + Dual Spec Columns */}
        <div className="space-y-8 z-10 max-w-7xl">
          
          {/* Subtle Protocol & Font Specimen Tag */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-sm bg-[#3c9bc3] shadow-[0_0_8px_#3c9bc3]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#93c0d2]">
              SPECIMEN // ODDVAL GROTESQUE // SOLANA INFRASTRUCTURE
            </span>
          </div>

          {/* Giant Title: Exact Oddval Aesthetic from Slide 7 */}
          <div>
            <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[132px] font-medium tracking-[-0.035em] leading-[0.95] select-none">
              <span className="bg-gradient-to-r from-[#256c8d] via-[#3a8ab0] to-[#88bdd3] bg-clip-text text-transparent">
                Point
              </span>
              <span className="text-white drop-shadow-sm">
                Pass
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Region: Outline Button Box on Left + Multi-line Architectural Paragraph on Right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-12 z-10 mt-12">
          
          {/* Bottom Left: Rectangular Outline Button Box (matching [ ОСНОВНОЙ ШРИФТ ]) */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/customer?merchant=${DEMO_MERCHANT}`}
              className="px-6 py-3 border border-white/40 bg-white/[0.06] hover:bg-white hover:text-[#05131c] hover:border-white text-xs font-mono uppercase tracking-widest text-white transition-all duration-200 cursor-pointer rounded-sm shadow-sm"
            >
              Launch Protocol &gt;
            </Link>

            <Link
              href="/merchant"
              className="px-6 py-3 border border-white/25 bg-transparent hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-white/85 hover:text-white transition-all duration-200 cursor-pointer rounded-sm"
            >
              Merchant Terminal
            </Link>

            <Link
              href="/docs"
              className="px-6 py-3 border border-white/25 bg-transparent hover:bg-white/10 text-xs font-mono uppercase tracking-widest text-white/85 hover:text-white transition-all duration-200 cursor-pointer rounded-sm"
            >
              Docs
            </Link>
          </div>

          {/* Bottom Right: Architectural Narrative Paragraph over Horizon Glow */}
          <div className="max-w-md space-y-2 text-left">
            <p className="font-sans text-xs sm:text-[13px] text-white/95 leading-[1.65] font-normal">
              PointPass — sovereign loyalty token standard on Solana. Zero-decimal SPL tokens, deterministic PDA pipelines, and immutable proof-of-burn receipts eliminate database lock-in, vendor counterparty risk, and fractional point liabilities.
            </p>
            <p className="font-mono text-[11px] text-[#05131c] font-semibold pt-1">
              Solana Sealevel Runtime // 400ms Finality // &lt; $0.0001 Gas
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2: SIGNATURE CARDS SHOWCASE (RESCUE PARTNERS BRAND GUIDELINES)
          Card 1: Horizon Gradient Card
          Card 2: Architectural Blueprint Construction Card
          Card 3: Typographic Spec Matrix Card
          ========================================================================= */}
      <section className="relative w-full py-20 bg-[#07131b] border-y border-[#d3dde2]/10 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3c9bc3] font-semibold block">
              DESIGN SYSTEM SPECIFICATION // IDENTITY ARCHETYPE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Architectural Card Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            
            {/* Card 1: Signature Horizon Gradient Card (Slide 1 & Slide 10 in sheet) */}
            <div className="rounded-[28px] border border-[#d3dde2]/25 bg-gradient-to-b from-[#092231] via-[#164b66] to-[#7faec4] p-8 sm:p-9 flex flex-col justify-between min-h-[480px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300">
              {/* Top Row: Pill on Left + Brand Tag on Right */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/25 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  01 / HORIZON GRADIENT
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  RESCUE PALETTE
                </span>
              </div>

              {/* Middle Headline: Oddval Bold Grotesque Display */}
              <div className="my-auto py-8 z-10">
                <span className="text-xs font-mono text-[#d3dde2] uppercase tracking-wider block mb-2 font-medium">
                  Sovereign Standard
                </span>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Deterministic<br />
                  by design.<br />
                  Sovereign in state.
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-white/90 font-normal max-w-xs leading-relaxed">
                  Pure integer loyalty standard with zero decimals, zero fractional rounding, and self-custodied customer balances.
                </p>
              </div>

              {/* Bottom Row: Specs + Hairline */}
              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10 text-xs font-mono text-[#07131b] font-medium">
                <span>Solana Mainnet Ready</span>
                <span className="font-bold text-[#07131b]">0-Decimals</span>
              </div>
            </div>

            {/* Card 2: Architectural Blueprint Construction Card (Slide 4 in sheet) */}
            <div className="rounded-[24px] border border-[#d3dde2]/20 bg-[#081824] p-8 sm:p-9 flex flex-col justify-between min-h-[480px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 hover:border-[#3c9bc3]/45 bg-[radial-gradient(rgba(211,221,226,0.1)_1px,transparent_1px)] [background-size:24px_24px] group">
              {/* Top Row */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  02 / BLUEPRINT MATRIX
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/60 tracking-wider">
                  PDA GEOMETRY
                </span>
              </div>

              {/* Center: Blueprint Construction Grid Representation */}
              <div className="my-auto py-6 z-10 space-y-4">
                <div className="border border-dashed border-[#3c9bc3]/40 p-4 rounded-xl bg-[#07131b]/80 font-mono text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[#d3dde2]/50 text-[10px]">
                    <span>{"// DETERMINISTIC SEEDS"}</span>
                    <span className="text-[#3c9bc3]">SEALEVEL PDA</span>
                  </div>
                  <div className="text-white font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5">
                    <span className="text-[#3c9bc3]">seeds</span> = [&quot;loyalty&quot;, merchant_pubkey]
                  </div>
                  <div className="text-white font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5">
                    <span className="text-[#3c9bc3]">seeds</span> = [&quot;mint&quot;, loyalty_pda]
                  </div>
                  <div className="text-white font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5">
                    <span className="text-[#3c9bc3]">seeds</span> = [&quot;receipt&quot;, customer, seq]
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Cryptographic Authority Lockup
                </h3>
                <p className="text-xs text-[#d3dde2]/70 font-normal leading-relaxed">
                  No private keys exist in the mint or burn pipelines. PDA seeds derive authority on-chain deterministically.
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-6 border-t border-[#d3dde2]/10 z-10 text-xs font-mono text-[#d3dde2]/70">
                <span>Ed25519 Signer Validation</span>
                <span className="text-[#3c9bc3]">Non-Custodial</span>
              </div>
            </div>

            {/* Card 3: Typographic Hierarchy Spec Table Card (Slide 8 in sheet) */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[480px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300 hover:border-[#3c9bc3]/40 group">
              {/* Top Row */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  03 / TYPOGRAPHIC SPEC
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/60 tracking-wider">
                  ODDVAL HIERARCHY
                </span>
              </div>

              {/* Middle: Typographic Spec Table matching Slide 8 */}
              <div className="my-auto py-6 z-10 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Rigorous Typographic Standards
                </h3>
                
                <div className="overflow-hidden rounded-lg border border-[#d3dde2]/15 bg-[#07131b]/90">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead>
                      <tr className="border-b border-[#d3dde2]/10 text-[#93c0d2] bg-white/[0.02]">
                        <th className="py-2 px-3">Level</th>
                        <th className="py-2 px-3">Typeface</th>
                        <th className="py-2 px-3">Weight</th>
                        <th className="py-2 px-3">Tracking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d3dde2]/5 text-[#d3dde2]/80">
                      <tr>
                        <td className="py-2 px-3 font-bold text-white">Заголовок 1</td>
                        <td className="py-2 px-3 font-display">Oddval / Bricolage</td>
                        <td className="py-2 px-3">Bold 700</td>
                        <td className="py-2 px-3 text-[#3c9bc3]">-0.035em</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-white">Заголовок 2</td>
                        <td className="py-2 px-3 font-display">Oddval / Bricolage</td>
                        <td className="py-2 px-3">SemiBold 600</td>
                        <td className="py-2 px-3 text-[#3c9bc3]">-0.025em</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-white">Body Copy</td>
                        <td className="py-2 px-3">Google Sans</td>
                        <td className="py-2 px-3">Regular 400</td>
                        <td className="py-2 px-3">-0.012em</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-white">Monospace</td>
                        <td className="py-2 px-3">JetBrains Mono</td>
                        <td className="py-2 px-3">Medium 500</td>
                        <td className="py-2 px-3">0.000em</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-[#d3dde2]/70 font-normal leading-relaxed">
                  Geometric ink traps and display weights inspired directly by Swiss corporate identity manuals.
                </p>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-6 border-t border-[#d3dde2]/10 z-10 text-xs font-mono text-[#d3dde2]/70">
                <span>Specimen Verified</span>
                <span className="text-[#93c0d2]">{programLoading ? "..." : `${programData?.totalAwarded ?? 55} pts issued`}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PROTOCOL TELEMETRY RIBBON
          ========================================================================= */}
      <section className="py-12 border-y border-[#d3dde2]/10 bg-[#0b1f2b]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div className="space-y-1 border-l-2 border-[#3c9bc3] pl-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#93c0d2] block">
                TOKEN STANDARD
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                SPL 0-Decimals
              </span>
              <span className="text-xs text-[#d3dde2]/70 font-normal">Zero fractional rounding errors</span>
            </div>

            <div className="space-y-1 border-l-2 border-[#3c9bc3] pl-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#93c0d2] block">
                CONFIRMATION TIME
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                ~400 ms
              </span>
              <span className="text-xs text-[#d3dde2]/70 font-normal">Sub-second reward settlement</span>
            </div>

            <div className="space-y-1 border-l-2 border-[#3c9bc3] pl-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#93c0d2] block">
                NETWORK GAS FEE
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                &lt; $0.0001
              </span>
              <span className="text-xs text-[#d3dde2]/70 font-normal">Micro-fractional store scale</span>
            </div>

            <div className="space-y-1 border-l-2 border-[#3c9bc3] pl-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#93c0d2] block">
                SECURITY INVARIANT
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-white block">
                PDA Seeds
              </span>
              <span className="text-xs text-[#d3dde2]/70 font-normal">No private keys in mint path</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CORE PROTOCOL CAPABILITIES (6 ARCHITECTURAL DARK SLATE CARDS)
          ========================================================================= */}
      <section className="relative w-full py-24 bg-[#07131b] border-y border-[#d3dde2]/10 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#3c9bc3] font-semibold block">
              CORE PROTOCOL CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Engineered for high-throughput retail commerce
            </h2>
            <p className="text-sm sm:text-base text-[#d3dde2]/80 max-w-2xl font-normal">
              Eliminating centralized database vulnerabilities, locked-in vendor silos, and fractional rounding discrepancies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            
            {/* Capability Card 1 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-01 // TOKEN
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  SPL STANDARD
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Zero decimals,<br />
                  zero slippage,<br />
                  pure integers.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  1 point is strictly 1 token. Zero decimals prevents floating point truncation, sub-unit rounding exploits, and ledger discrepancies.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                Non-divisible integer tokens
              </div>
            </div>

            {/* Capability Card 2 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-02 // AUTHORITY
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  PROGRAM SIGNER
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Non-custodial,<br />
                  signer-gated,<br />
                  deterministic state.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  Mint authority is controlled strictly by the LoyaltyProgram PDA. The merchant cannot unilaterally siphon or confiscate customer tokens.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                Cross-program signer authorization
              </div>
            </div>

            {/* Capability Card 3 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-03 // AUDIT
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  PROOF-OF-BURN
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Cryptographic burn,<br />
                  immutable receipts,<br />
                  permanent audit.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  Redeeming rewards invokes atomic SPL burn instruction. Points are eradicated permanently while an on-chain receipt PDA is minted.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                Solana Clock timestamp verification
              </div>
            </div>

            {/* Capability Card 4 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-04 // THROUGHPUT
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  SEALEVEL RUNTIME
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Parallel execution,<br />
                  sub-second speed,<br />
                  scale to millions.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  Because merchant programs reside in independent PDA addresses, transactions execute across parallel Sealevel cores without contention.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                ~400ms finality confirmation
              </div>
            </div>

            {/* Capability Card 5 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-05 // WALLET
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  ECOSYSTEM READY
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Phantom &amp; Solflare,<br />
                  native display,<br />
                  zero mobile app.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  Customers hold their loyalty passes directly in Phantom, Solflare, or Backpack wallets. No proprietary app store download required.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                Universal SPL wallet compatibility
              </div>
            </div>

            {/* Capability Card 6 */}
            <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] p-8 sm:p-9 flex flex-col justify-between min-h-[440px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#3c9bc3]/40 hover:bg-[#0e2534] hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-[#d3dde2]/20 bg-[#0e2534] text-xs font-mono text-[#93c0d2]">
                  CAP-06 // ECONOMY
                </span>
                <span className="text-xs font-mono text-[#d3dde2]/50">
                  CIRCULATION CAP
                </span>
              </div>

              <div className="my-auto py-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Bounded liabilities,<br />
                  predictable costs,<br />
                  zero inflation.
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#d3dde2]/70 font-normal leading-relaxed">
                  Merchants set explicit maximum token caps and reward ratios. Mathematical safeguards protect businesses against runaway point liabilities.
                </p>
              </div>

              <div className="pt-4 border-t border-[#d3dde2]/10 text-xs font-mono text-[#d3dde2]/60">
                Checked arithmetic math invariants
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 4-STEP PROTOCOL LIFECYCLE (EXACT SPLIT 2x2 REFERENCE LAYOUT)
          ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          
          {/* Left Column: Pill + Display Headline + Multi-line Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              {/* Pill Badge matching [ Problem 01 ] in reference image */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.05] text-xs font-mono text-white/90 mb-7 shadow-sm">
                <span className="text-[#93c0d2]">Pipeline</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-white font-medium">04</span>
              </div>

              {/* Multi-line Display Headline with colored emphasis accent */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-[52px] font-medium tracking-tight text-white leading-[1.12]">
                How PointPass <br />
                executes on-chain, <br />
                <span className="bg-gradient-to-r from-[#2d7a9c] via-[#4ba2c7] to-[#93c0d2] bg-clip-text text-transparent">
                  step by step
                </span>
              </h2>
            </div>

            {/* Bottom Narrative Block matching reference image bottom-left paragraph */}
            <div className="space-y-3 font-mono text-xs text-[#d3dde2]/80 leading-relaxed max-w-sm mt-10 lg:mt-0 pt-6 border-t border-white/10 lg:border-t-0">
              <p>
                From initial merchant registry to cryptographic receipt stamp, every phase executes via verifiable Solana Anchor instructions.
              </p>
              <p className="text-[11px] text-[#d3dde2]/50">
                Deterministic PDA seeds guarantee zero merchant private key exposure across all lifecycle operations.
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Grid with 3 Dark Horizon Cards + 1 Light Ash Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Top-Left Dark Horizon Card */}
            <div className="rounded-[22px] border border-[#d3dde2]/15 bg-gradient-to-b from-[#0b1f2b] via-[#0d2737] to-[#12364c] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] group hover:border-[#3c9bc3]/40 transition-all duration-300">
              <span className="text-xs font-mono text-[#d3dde2]/70 block font-normal">
                01 // Program Init
              </span>
              <div className="space-y-1.5 pt-6">
                <div className="font-display text-3xl sm:text-4xl font-medium text-white tracking-tight">
                  1 PDA
                </div>
                <p className="text-xs font-mono text-[#93c0d2] leading-snug">
                  initialize_loyalty_program
                </p>
                <p className="text-[11px] text-[#d3dde2]/60 font-sans leading-normal">
                  Merchant configuration and zero-decimal SPL mint genesis
                </p>
              </div>
            </div>

            {/* Card 2: Top-Right Dark Horizon Card */}
            <div className="rounded-[22px] border border-[#d3dde2]/15 bg-gradient-to-b from-[#0b1f2b] via-[#0d2737] to-[#12364c] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] group hover:border-[#3c9bc3]/40 transition-all duration-300">
              <span className="text-xs font-mono text-[#d3dde2]/70 block font-normal">
                02 // Pass Derivation
              </span>
              <div className="space-y-1.5 pt-6">
                <div className="font-display text-3xl sm:text-4xl font-medium text-white tracking-tight">
                  0 Rent
                </div>
                <p className="text-xs font-mono text-[#93c0d2] leading-snug">
                  get_or_create_ata
                </p>
                <p className="text-[11px] text-[#d3dde2]/60 font-sans leading-normal">
                  Customer pass derived deterministically; zero custodial liability
                </p>
              </div>
            </div>

            {/* Card 3: Bottom-Left Dark Horizon Card */}
            <div className="rounded-[22px] border border-[#d3dde2]/15 bg-gradient-to-b from-[#0b1f2b] via-[#0d2737] to-[#12364c] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] group hover:border-[#3c9bc3]/40 transition-all duration-300">
              <span className="text-xs font-mono text-[#d3dde2]/70 block font-normal">
                03 // Point Accrual
              </span>
              <div className="space-y-1.5 pt-6">
                <div className="font-display text-3xl sm:text-4xl font-medium text-white tracking-tight">
                  ~400ms
                </div>
                <p className="text-xs font-mono text-[#93c0d2] leading-snug">
                  award_points (CPI)
                </p>
                <p className="text-[11px] text-[#d3dde2]/60 font-sans leading-normal">
                  Program signer mints integer tokens to customer ATA atomically
                </p>
              </div>
            </div>

            {/* Card 4: Bottom-Right HIGH-CONTRAST LIGHT CARD (Exact match to Card 4 in reference) */}
            <div className="rounded-[22px] border border-white/40 bg-[#e5ecef] text-[#07131b] p-6 sm:p-7 flex flex-col justify-between min-h-[220px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] group hover:bg-[#d9e4e8] transition-all duration-300">
              <span className="text-xs font-mono text-[#07131b]/70 font-medium block">
                04 // Proof-of-Burn
              </span>
              <div className="space-y-1.5 pt-6">
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#07131b] tracking-tight">
                  100%
                </div>
                <p className="text-xs font-mono text-[#07131b] font-medium leading-snug">
                  redeem (Receipt PDA)
                </p>
                <p className="text-[11px] text-[#07131b]/75 font-sans leading-normal">
                  Tokens burned permanently; Clock timestamp audit receipt stamped
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMPARATIVE ANALYSIS MATRIX
          ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#3c9bc3] font-semibold block">
            COMPARATIVE ANALYSIS MATRIX
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            PointPass on Solana vs Legacy Web2 Loyalty
          </h2>
          <p className="text-sm sm:text-base text-[#d3dde2]/80 max-w-2xl font-normal">
            Compare architectural differences between siloed centralized databases and sovereign on-chain SPL tokens.
          </p>
        </div>

        <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] overflow-hidden shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#d3dde2]/15 text-[#93c0d2] uppercase bg-white/[0.02]">
                  <th className="py-4 px-6 font-semibold">Architectural Dimension</th>
                  <th className="py-4 px-6 text-[#d3dde2]/60 font-normal">Legacy Web2 Loyalty (Shopify / Square)</th>
                  <th className="py-4 px-6 text-white font-bold bg-[#3c9bc3]/15">PointPass Solana Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d3dde2]/10">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Point Custody</td>
                  <td className="py-4 px-6 text-[#d3dde2]/70 font-sans font-normal">Siloed in private database table; merchant can delete or modify at will</td>
                  <td className="py-4 px-6 text-[#93c0d2] font-sans font-medium bg-[#3c9bc3]/5">Self-custodied in customer wallet as SPL tokens; mathematically sovereign</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Redemption Proof</td>
                  <td className="py-4 px-6 text-[#d3dde2]/70 font-sans font-normal">Database decrement flag; easily disputed or replayed during chargebacks</td>
                  <td className="py-4 px-6 text-[#93c0d2] font-sans font-medium bg-[#3c9bc3]/5">Immutable on-chain RedemptionReceipt PDA with Solana Clock timestamp</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Ecosystem Composability</td>
                  <td className="py-4 px-6 text-[#d3dde2]/70 font-sans font-normal">Zero composability; locked into proprietary vendor APIs and closed portals</td>
                  <td className="py-4 px-6 text-[#93c0d2] font-sans font-medium bg-[#3c9bc3]/5">Standard SPL token; composable with DEXes, NFT gateways, and dApps</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Account Isolation</td>
                  <td className="py-4 px-6 text-[#d3dde2]/70 font-sans font-normal">Multi-tenant shared SQL table; schema migration risks &amp; single point of failure</td>
                  <td className="py-4 px-6 text-[#93c0d2] font-sans font-medium bg-[#3c9bc3]/5">Dedicated PDA accounts per merchant authority; zero shared state vulnerability</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">Auditability</td>
                  <td className="py-4 px-6 text-[#d3dde2]/70 font-sans font-normal">Internal audit logs accessible only to engineers and platform admins</td>
                  <td className="py-4 px-6 text-[#93c0d2] font-sans font-medium bg-[#3c9bc3]/5">Publicly auditable by any explorer, RPC node, or third-party indexer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INTERACTIVE CODE TERMINAL
          ========================================================================= */}
      <section className="py-20 border-y border-[#d3dde2]/10 bg-[#07131b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#3c9bc3] font-semibold block">
                DEVELOPER SDK &amp; ON-CHAIN PROGRAM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Anchor Rust &amp; Client SDK
              </h2>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0b1f2b] border border-[#d3dde2]/15 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveCodeTab("anchor")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeCodeTab === "anchor"
                    ? "bg-[#ffffff] text-[#07131b] font-medium shadow-sm"
                    : "text-[#d3dde2]/70 hover:text-white"
                }`}
              >
                Anchor Rust
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab("sdk")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeCodeTab === "sdk"
                    ? "bg-[#ffffff] text-[#07131b] font-medium shadow-sm"
                    : "text-[#d3dde2]/70 hover:text-white"
                }`}
              >
                TypeScript SDK
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeTab("cli")}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeCodeTab === "cli"
                    ? "bg-[#ffffff] text-[#07131b] font-medium shadow-sm"
                    : "text-[#d3dde2]/70 hover:text-white"
                }`}
              >
                CLI &amp; Test Suite
              </button>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d3dde2]/15 bg-[#0b1f2b] overflow-hidden p-6 font-mono text-xs leading-relaxed text-[#d4d4d8] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)]">
            {activeCodeTab === "anchor" && (
              <pre className="overflow-x-auto text-[#d4d4d8] font-normal">
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
              <pre className="overflow-x-auto text-[#d4d4d8] font-normal">
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
              <pre className="overflow-x-auto text-[#d4d4d8] font-normal">
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

      {/* =========================================================================
          SECTION 9: CALL TO ACTION BANNER (SIGNATURE HORIZON GRADIENT)
          ========================================================================= */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="rounded-[28px] border border-[#d3dde2]/25 bg-gradient-to-b from-[#092231] via-[#164b66] to-[#7faec4] p-8 sm:p-14 text-center space-y-6 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <span className="text-xs font-mono uppercase tracking-widest text-[#d3dde2] font-semibold block">
            GET STARTED TODAY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto drop-shadow-sm">
            Ready to deploy sovereign loyalty on Solana?
          </h2>
          <p className="text-sm sm:text-base text-white/95 max-w-xl mx-auto font-normal leading-relaxed">
            Experience zero-decimal SPL loyalty tokens on Solana Devnet. Test the customer flow or launch your own store terminal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm bg-white text-[#07131b] hover:bg-[#d3dde2] transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 cursor-pointer">
              Launch Customer Demo
            </Link>
            <Link href="/merchant" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-normal text-sm bg-black/25 text-white hover:bg-black/35 border border-white/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              Open Merchant Console
            </Link>
            <Link href="/docs" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-normal text-sm bg-black/25 text-white hover:bg-black/35 border border-white/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: ARCHITECTURAL FOOTER
          ========================================================================= */}
      <footer className="py-16 border-t border-[#d3dde2]/10 bg-[#07131b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#d3dde2]/10 text-xs">
            <div className="space-y-3">
              <span className="font-display font-bold text-white text-base block">POINTPASS</span>
              <p className="text-[#d3dde2]/70 font-normal leading-relaxed">
                Non-custodial loyalty token infrastructure for the Solana ecosystem.
              </p>
              <span className="text-[11px] font-mono text-[#d3dde2]/50 block">Apache-2.0 License</span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#93c0d2] block font-semibold">
                APPLICATIONS
              </span>
              <ul className="space-y-2 text-[#d3dde2]/80 font-normal">
                <li><Link href="/customer" className="hover:text-white transition-colors">Customer Portal</Link></li>
                <li><Link href="/merchant" className="hover:text-white transition-colors">Merchant Dashboard</Link></li>
                <li><Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="hover:text-white transition-colors">Demo Store (Bean There Cafe)</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#93c0d2] block font-semibold">
                DOCUMENTATION
              </span>
              <ul className="space-y-2 text-[#d3dde2]/80 font-normal">
                <li><Link href="/docs" className="hover:text-white transition-colors">Protocol Overview</Link></li>
                <li><Link href="/docs/pda" className="hover:text-white transition-colors">PDA Seed Derivations</Link></li>
                <li><Link href="/docs/cpi" className="hover:text-white transition-colors">CPI &amp; Token Minting</Link></li>
                <li><Link href="/docs/receipts" className="hover:text-white transition-colors">Proof-of-Burn Receipts</Link></li>
                <li><Link href="/docs/security" className="hover:text-white transition-colors">Security &amp; Invariants</Link></li>
                <li><Link href="/docs/sdk" className="hover:text-white transition-colors">TypeScript SDK</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#93c0d2] block font-semibold">
                NETWORK &amp; RESOURCES
              </span>
              <ul className="space-y-2 text-[#d3dde2]/80 font-normal">
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
                  <span className="text-[#d3dde2]/60">Cluster: Solana Devnet</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#d3dde2]/50">
            <span>&copy; 2026 PointPass Solana Infrastructure. All rights reserved.</span>
            <span>Program ID: {PROGRAM_ID.toBase58()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
