"use client";

import Link from "next/link";

export default function DocsCpiPage() {
  return (
    <div className="space-y-8 text-neutral-200">
      <div className="border-b border-[#1c1c22] pb-6 space-y-2">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 block">
          ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
          Cross-Program Invocations (CPI)
        </h1>
        <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
          PointPass delegates token minting and burning to the Solana SPL Token program using Cross-Program Invocations signed with PDA seeds.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-normal text-white tracking-tight">Signing with PDA Seeds (CpiContext::new_with_signer)</h2>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          Because the mint authority is the LoyaltyProgram PDA, the program signs the SPL token instruction without a private key:
        </p>
        <pre className="p-4 rounded-[4px] bg-[#0c0c0e] border border-[#1c1c22] text-xs font-mono text-[#d4d4d8] overflow-x-auto leading-relaxed">
{`let seeds: &[&[u8]] = &[
    b"loyalty",
    merchant_key.as_ref(),
    &[loyalty_program.bump],
];
let signer_seeds = &[seeds];

token::mint_to(
    CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        MintTo {
            mint: ctx.accounts.points_mint.to_account_info(),
            to: ctx.accounts.customer_token_account.to_account_info(),
            authority: ctx.accounts.loyalty_program.to_account_info(),
        },
        signer_seeds,
    ),
    points,
)?;`}
        </pre>
      </div>

      <div className="render-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-l-purple-500">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">NEXT SECTION</span>
          <h3 className="text-base font-normal text-white">Proof-of-Burn Receipts</h3>
        </div>
        <Link href="/docs/receipts" className="btn-primary text-xs py-2 px-4 shrink-0 text-center">
          Read Receipts Guide &gt;
        </Link>
      </div>
    </div>
  );
}
