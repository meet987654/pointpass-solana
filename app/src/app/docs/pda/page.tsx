"use client";

import Link from "next/link";

export default function DocsPdaPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          Program Derived Addresses (PDAs)
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          A Program Derived Address is an account on Solana mathematically guaranteed to have no private key. It is owned and controlled strictly by the smart contract.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">How Solana Derives PDAs</h2>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          Solana creates a PDA by hashing user seeds and the program ID with a search for a canonical bump (a number from 255 down to 0) that pushes the address off the Ed25519 elliptic curve. Because the point lies off the curve, no corresponding private key exists. Only the smart contract can sign on behalf of this account via CPI seeds.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">Seed Derivations in PointPass</h2>
        
        <div className="space-y-4">
          <div className="render-card p-5 space-y-2">
            <h3 className="text-sm font-medium font-mono text-white">1. Loyalty Program PDA</h3>
            <p className="text-xs text-[#a1a1aa]">
              One loyalty program per merchant wallet. Guarantees that each merchant has isolated state and mint authority.
            </p>
            <pre className="p-3.5 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-purple-300 overflow-x-auto">
seeds = [b&quot;loyalty&quot;, merchant.key().as_ref()]
            </pre>
          </div>

          <div className="render-card p-5 space-y-2">
            <h3 className="text-sm font-medium font-mono text-white">2. Points Mint PDA</h3>
            <p className="text-xs text-[#a1a1aa]">
              The SPL Token Mint account whose mint authority is the LoyaltyProgram PDA itself.
            </p>
            <pre className="p-3.5 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-purple-300 overflow-x-auto">
seeds = [b&quot;mint&quot;, loyalty_program.key().as_ref()]
            </pre>
          </div>

          <div className="render-card p-5 space-y-2">
            <h3 className="text-sm font-medium font-mono text-white">3. Redemption Receipt PDA</h3>
            <p className="text-xs text-[#a1a1aa]">
              Created upon burning points. Uses an incremental redemption_count index seed to prevent replay and enforce ordering.
            </p>
            <pre className="p-3.5 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-purple-300 overflow-x-auto">
seeds = [
    b&quot;redemption&quot;,
    loyalty_program.key().as_ref(),
    customer.key().as_ref(),
    receipt_number.to_le_bytes().as_ref()
]
            </pre>
          </div>
        </div>
      </div>

      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">NEXT SECTION</span>
          <h3 className="text-base font-normal text-white">Cross-Program Invocations (CPI)</h3>
        </div>
        <Link href="/docs/cpi" className="btn-primary text-xs py-2 px-4 shrink-0 text-center">
          Read CPI Guide &gt;
        </Link>
      </div>
    </div>
  );
}
