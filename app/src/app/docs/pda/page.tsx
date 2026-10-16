"use client";

import Link from "next/link";

export default function DocsPdaPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          Architecture Deep Dive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          Program Derived Addresses (PDAs)
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          A Program Derived Address is an account on Solana that is mathematically guaranteed to have no private key. It is owned and controlled strictly by the smart contract.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">How Solana Derives PDAs</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Solana creates a PDA by hashing user seeds and the program ID with a search for a canonical &quot;bump&quot; (a number from 255 down to 0) that pushes the address off the Ed25519 elliptic curve. Because the point lies off the curve, no corresponding private key exists. Only the smart contract can sign on behalf of this account via CPI seeds.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Seed Derivations in PointPass</h2>
        
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
            <h3 className="text-base font-bold text-emerald-400 mb-2">1. Loyalty Program PDA</h3>
            <p className="text-sm text-neutral-400 mb-3">
              One loyalty program per merchant wallet. Guarantees that each merchant has isolated state and mint authority.
            </p>
            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-emerald-300 overflow-x-auto">
seeds = [b&quot;loyalty&quot;, merchant.key().as_ref()]
            </pre>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
            <h3 className="text-base font-bold text-purple-400 mb-2">2. Points Mint PDA</h3>
            <p className="text-sm text-neutral-400 mb-3">
              The SPL Token Mint is keyed by the loyalty program address, preventing unauthorized external minting.
            </p>
            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-purple-300 overflow-x-auto">
seeds = [b&quot;mint&quot;, loyalty_program.key().as_ref()]
            </pre>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
            <h3 className="text-base font-bold text-amber-400 mb-2">3. Redemption Receipt PDA</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Each redemption receipt incorporates a monotonic 64-bit sequence counter (<code className="text-neutral-200">redemption_count</code>) to prevent seed collisions.
            </p>
            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono text-amber-300 overflow-x-auto">
seeds = [
    b&quot;redemption&quot;,
    loyalty_program.key().as_ref(),
    customer.key().as_ref(),
    &amp;redemption_index.to_le_bytes()
]
            </pre>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        <Link href="/docs" className="text-sm text-neutral-400 hover:text-white">
          ← Overview
        </Link>
        <Link href="/docs/cpi" className="text-sm text-emerald-400 font-semibold hover:underline">
          CPI &amp; Token Minting →
        </Link>
      </div>
    </div>
  );
}
