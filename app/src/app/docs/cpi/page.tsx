"use client";

import Link from "next/link";

export default function DocsCpiPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.08] pb-6">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 block mb-2">
          Architecture Deep Dive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          Cross-Program Invocations (CPI)
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          Cross-Program Invocations allow PointPass to securely execute instructions on the official Solana SPL Token Program without human private key intervention.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">How Points Are Minted via PDA Signer</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          The <code className="text-emerald-400">PointsMint</code> SPL token mint authority belongs exclusively to the <code className="text-emerald-400">LoyaltyProgram</code> PDA. During <code className="text-white font-mono">award_points</code>, PointPass calls the SPL Token Program using <code className="text-neutral-200 font-mono">token::mint_to</code> signed with the PDA seeds and bump.
        </p>

        <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-emerald-300 overflow-x-auto">
{`let loyalty_seeds: &[&[u8]] = &[
    LOYALTY_PROGRAM_SEED,
    merchant_key.as_ref(),
    &[ctx.accounts.loyalty_program.bump],
];
let signer_seeds = &[&loyalty_seeds[..]];

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
    amount,
)?;`}
        </pre>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Why Redeem Does Not Require PDA Signing</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">
          In <code className="text-white font-mono">redeem</code>, tokens are burned directly from the customer&apos;s Associated Token Account (ATA). Because the customer is the authority of their own ATA and is a direct transaction signer, the CPI call uses standard <code className="text-neutral-200 font-mono">CpiContext::new</code> without PDA signing seeds.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-white/[0.08]">
        <Link href="/docs/pda" className="text-sm text-neutral-400 hover:text-white">
          ← PDA Seed Derivation
        </Link>
        <Link href="/docs/receipts" className="text-sm text-emerald-400 font-semibold hover:underline">
          Proof-of-Burn Receipts →
        </Link>
      </div>
    </div>
  );
}
