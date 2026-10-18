"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PROGRAM_ID, DEMO_MERCHANT } from "@/lib/constants";

function AsteriskIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

function ArrowCircle() {
  return (
    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-white/50 group-hover:text-white transition-all">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 7h12M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [activeCodeTab, setActiveCodeTab] = useState<"anchor" | "sdk" | "cli">("anchor");

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const offset = direction === "left" ? -460 : 460;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative text-[#ffffff]">
      
      {/* =========================================================================
          SECTION 1: HERO (FULL SCREEN DIGITAL ICE MOUNTAIN + POINTPASS ONLY)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden select-none border-b border-white/[0.08]">
        {/* Full Screen Background Digital Ice Mountain */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/digital-ice-mountain.png"
          alt="Digital Ice Mountain"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />

        {/* Atmospheric Vignette & Contrast Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#07131b]/50 via-transparent to-[#07131b]/80 z-0" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(45,122,180,0.22)_0%,transparent_75%)] z-0" />

        {/* Only Text: PointPass with 8-ray asterisk logo replacing letter 'o' */}
        <h1 className="relative z-10 font-display text-8xl sm:text-[130px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-light text-white tracking-[-0.035em] leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center px-4 select-none inline-flex items-center justify-center">
          <span>P</span>
          <span className="inline-flex items-center justify-center mx-[0.03em] relative top-[0.03em]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="square"
              className="w-[0.54em] h-[0.54em] text-white drop-shadow-[0_0_24px_rgba(142,185,203,0.95)] transition-transform duration-700 hover:rotate-90 hover:scale-110 cursor-pointer"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
            </svg>
          </span>
          <span>intPass</span>
        </h1>
      </section>

      {/* =========================================================================
          SECTION 2: PROTOCOL TELEMETRY RIBBON
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
          SECTION 5: CORE PROTOCOL CAPABILITIES (SMOOTH SLIDABLE CAROUSEL)
          ========================================================================= */}
      <section className="relative w-full py-24 bg-[#07131b] border-y border-[#d3dde2]/10 my-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Header Row with Navigation Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Scroll left"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Scroll right"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Smooth Slidable Carousel Track */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-6 pt-2 select-none"
            style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
          >
            {/* Capability Card 1: SPL STANDARD */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 194, 218, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0c273a 35%, #184e6e 65%, #347c9d 85%, #6ea8bf 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  01 / SPL STANDARD
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  TOKEN PIPELINE
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Zero decimals,<br />
                  zero slippage,<br />
                  true ownership.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  Pure integer arithmetic standard.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Sovereign wallet custody—minted as standard SPL tokens with integer units and deterministic accounts.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">TOKEN PIPELINE</span>
                    <span className="text-[10px] font-mono text-white/70 block">SPL STANDARD</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
              </div>
            </div>

            {/* Capability Card 2: PDA AUTHORITY */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(91, 189, 229, 0.45) 0%, transparent 60%), linear-gradient(180deg, #06141e 0%, #0a2334 35%, #154663 65%, #2e7394 85%, #629cb6 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  02 / PDA SEEDS
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  PROGRAM SIGNER
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Non-custodial,<br />
                  signer-gated,<br />
                  sovereign state.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  Cryptographic signer verification.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Verified authority control—only authorized merchant wallet signers can trigger reward minting via PDA derivation.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">AUTHORITY CONTROL</span>
                    <span className="text-[10px] font-mono text-white/70 block">PROGRAM SIGNER</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
              </div>
            </div>

            {/* Capability Card 3: PROOF-OF-BURN */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 185, 203, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0d293d 35%, #195272 65%, #3882a5 85%, #76b1c8 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  03 / PROOF-OF-BURN
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  RECEIPT PDA
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Proof-of-burn,<br />
                  atomic execution,<br />
                  zero fraud.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  Deterministic receipt stamps.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Cryptographic proof-of-burn—redemption executes an SPL burn and stamps an immutable on-chain receipt PDA with clock timestamp.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">RECEIPT PDA</span>
                    <span className="text-[10px] font-mono text-white/70 block">ON-CHAIN AUDIT</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
              </div>
            </div>

            {/* Capability Card 4: CHECKED MATH */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(91, 189, 229, 0.4) 0%, transparent 60%), linear-gradient(180deg, #05121b 0%, #092030 35%, #13425f 65%, #2a6f90 85%, #5995b0 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  04 // CHECKED MATH
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  SAFETY INVARIANT
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Checked math,<br />
                  safe counters,<br />
                  provable state.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  PointPassError invariant guarantees.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Rust checked arithmetic—math overflow triggers immediate transaction reversion across reward counters and circulation limits.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">SAFETY INVARIANT</span>
                    <span className="text-[10px] font-mono text-white/70 block">ANCHOR REVERSION</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
              </div>
            </div>

            {/* Capability Card 5: MULTI-TENANCY */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 194, 218, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0c273a 35%, #184e6e 65%, #347c9d 85%, #6ea8bf 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  05 // MULTI-TENANCY
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  PDA ISOLATION
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Isolated state,<br />
                  merchant seeds,<br />
                  infinite scale.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  Zero cross-program state contention.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Deterministic multi-tenancy—thousands of stores run simultaneously on isolated PDA seed trees with parallel Sealevel runtime.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">PDA ISOLATION</span>
                    <span className="text-[10px] font-mono text-white/70 block">PER-STORE TREE</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
              </div>
            </div>

            {/* Capability Card 6: CPI COMPOSABILITY */}
            <div
              className="min-w-[340px] sm:min-w-[410px] max-w-[410px] flex-shrink-0 rounded-[28px] border border-white/20 p-8 sm:p-9 flex flex-col justify-between min-h-[460px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group hover:border-white/40 transition-all duration-300"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(91, 189, 229, 0.45) 0%, transparent 60%), linear-gradient(180deg, #06141e 0%, #0a2334 35%, #154663 65%, #2e7394 85%, #629cb6 100%)",
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-xs font-mono text-white/95 font-medium">
                  06 // COMPOSABILITY
                </span>
                <span className="text-xs font-mono text-white/80 tracking-wider">
                  SOLANA ECOSYSTEM
                </span>
              </div>

              <div className="my-auto py-6 z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
                  Composable dApps,<br />
                  wallet native,<br />
                  ecosystem wide.
                </h3>
                <p className="text-xs font-mono text-[#d3dde2] italic">
                  Instant wallet &amp; explorer indexing.
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Open Solana composability—all accounts, tokens, and receipts are standard Solana primitives, immediately visible in Phantom and Solflare.
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/20 z-10">
                <div className="flex items-center gap-3">
                  <ArrowCircle />
                  <div>
                    <span className="text-[11px] font-mono tracking-wider text-white font-semibold block">COMPOSABILITY</span>
                    <span className="text-[10px] font-mono text-white/70 block">SOLANA ECOSYSTEM</span>
                  </div>
                </div>
                <div className="text-white/80 group-hover:text-white transition-colors">
                  <AsteriskIcon size={26} />
                </div>
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

          {/* Right Column: 2x2 Grid with 3 VIBRANT HORIZON GRADIENT CARDS + 1 LIGHT ASH CARD */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Top-Left Card with VISIBLE Horizon Gradient (matching reference image) */}
            <div
              className="rounded-[22px] border border-[#d3dde2]/25 p-6 sm:p-7 flex flex-col justify-between min-h-[225px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] group hover:border-white/40 transition-all duration-300 relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 194, 218, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0c273a 35%, #184e6e 65%, #347c9d 85%, #6ea8bf 100%)",
              }}
            >
              <span className="text-xs font-mono text-[#d3dde2]/85 block font-normal z-10">
                01 // Program Init
              </span>
              <div className="space-y-1.5 pt-6 z-10">
                <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                  1 PDA
                </div>
                <p className="text-xs font-mono text-white font-medium leading-snug drop-shadow-sm">
                  initialize_loyalty_program
                </p>
                <p className="text-[11px] text-white/85 font-sans leading-normal">
                  Merchant configuration and zero-decimal SPL mint genesis
                </p>
              </div>
            </div>

            {/* Card 2: Top-Right Card with VISIBLE Horizon Gradient (matching reference image) */}
            <div
              className="rounded-[22px] border border-[#d3dde2]/25 p-6 sm:p-7 flex flex-col justify-between min-h-[225px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] group hover:border-white/40 transition-all duration-300 relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 194, 218, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0c273a 35%, #184e6e 65%, #347c9d 85%, #6ea8bf 100%)",
              }}
            >
              <span className="text-xs font-mono text-[#d3dde2]/85 block font-normal z-10">
                02 // Pass Derivation
              </span>
              <div className="space-y-1.5 pt-6 z-10">
                <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                  0 Rent
                </div>
                <p className="text-xs font-mono text-white font-medium leading-snug drop-shadow-sm">
                  get_or_create_ata
                </p>
                <p className="text-[11px] text-white/85 font-sans leading-normal">
                  Customer pass derived deterministically; zero custodial liability
                </p>
              </div>
            </div>

            {/* Card 3: Bottom-Left Card with VISIBLE Horizon Gradient (matching reference image) */}
            <div
              className="rounded-[22px] border border-[#d3dde2]/25 p-6 sm:p-7 flex flex-col justify-between min-h-[225px] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85)] group hover:border-white/40 transition-all duration-300 relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 85% 90%, rgba(142, 194, 218, 0.45) 0%, transparent 60%), linear-gradient(180deg, #071622 0%, #0c273a 35%, #184e6e 65%, #347c9d 85%, #6ea8bf 100%)",
              }}
            >
              <span className="text-xs font-mono text-[#d3dde2]/85 block font-normal z-10">
                03 // Point Accrual
              </span>
              <div className="space-y-1.5 pt-6 z-10">
                <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                  ~400ms
                </div>
                <p className="text-xs font-mono text-white font-medium leading-snug drop-shadow-sm">
                  award_points (CPI)
                </p>
                <p className="text-[11px] text-white/85 font-sans leading-normal">
                  Program signer mints integer tokens to customer ATA atomically
                </p>
              </div>
            </div>

            {/* Card 4: Bottom-Right HIGH-CONTRAST LIGHT CARD (Exact match to Card 4 in reference) */}
            <div
              className="rounded-[22px] border border-white/60 p-6 sm:p-7 flex flex-col justify-between min-h-[225px] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] group hover:bg-[#d9e4e8] transition-all duration-300 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #f2f6f8 0%, #e3ecf0 60%, #cee0e7 100%)",
              }}
            >
              <span className="text-xs font-mono text-[#071622]/70 font-semibold block z-10">
                04 // Proof-of-Burn
              </span>
              <div className="space-y-1.5 pt-6 z-10">
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#071622] tracking-tight">
                  100%
                </div>
                <p className="text-xs font-mono text-[#071622] font-semibold leading-snug">
                  redeem (Receipt PDA)
                </p>
                <p className="text-[11px] text-[#071622]/75 font-sans leading-normal">
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
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.0"
                  strokeLinecap="square"
                  className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(142,185,203,0.8)]"
                >
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                </svg>
                <span className="font-display font-bold text-white text-base">PointPass</span>
              </div>
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
