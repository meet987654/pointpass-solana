"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { PROGRAM_ID, DEMO_MERCHANT, getExplorerAddressUrl } from "@/lib/constants";
import { PublicKey } from "@solana/web3.js";

export default function Home() {
  const demoMerchantPubkey = new PublicKey(DEMO_MERCHANT);
  const { data: programData, loading: programLoading } = useLoyaltyProgram(demoMerchantPubkey);

  // Active step in interactive visualizer (1, 2, or 3)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Active code tab (rust, ts, or schema)
  const [codeTab, setCodeTab] = useState<"rust" | "ts" | "schema">("rust");

  return (
    <div className="relative overflow-hidden">
      {/* Background Radial Glow Meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Solana Devnet Live</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">Anchor 0.31.1</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Decentralized Loyalty, <br className="hidden sm:block" />
            <span className="gradient-text-emerald">Verifiable On-Chain</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            PointPass turns brand reward points into self-custodied zero-decimal SPL tokens on Solana. Customers truly own their rewards, and burn them on-chain for immutable redemption receipts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={`/customer?merchant=${DEMO_MERCHANT}`}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all glow-emerald hover:scale-105 active:scale-95 duration-200"
            >
              Launch Customer App →
            </Link>
            <Link
              href="/merchant"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] transition-all hover:scale-105 active:scale-95 duration-200"
            >
              Merchant Terminal
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Read Docs ↗
            </Link>
          </div>
        </div>

        {/* Live Protocol Stats Ticker */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
                Live Devnet State: Bean There Cafe
              </span>
            </div>
            <a
              href={getExplorerAddressUrl(PROGRAM_ID, "devnet")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}</span>
              <span>↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                Points Awarded
              </span>
              <span className="text-3xl font-extrabold font-mono text-white">
                {programLoading ? "..." : `${programData?.totalAwarded ?? 55} pts`}
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                Points Burned
              </span>
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                {programLoading ? "..." : `${programData?.totalRedeemed ?? 30} pts`}
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                Redemption Receipts
              </span>
              <span className="text-3xl font-extrabold font-mono text-purple-400">
                {programLoading ? "..." : `${programData?.redemptionCount ?? 3} receipts`}
              </span>
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                Reward Threshold
              </span>
              <span className="text-3xl font-extrabold font-mono text-white">
                {programLoading ? "..." : `${programData?.rewardCost ?? 10} pts`}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Protocol Lifecycle Visualizer */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
              Architecture &amp; Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The 3-Step Trustless Lifecycle
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Click any step to inspect on-chain state transitions and cryptographic proofs.
            </p>
          </div>

          {/* Step Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveStep(1)}
              className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
                activeStep === 1
                  ? "bg-emerald-500/10 border-2 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                  : "glass-panel border border-white/[0.08] text-neutral-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">Step 1</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06]">CPI Mint</span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">Merchant Issues Points</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tokens minted via Cross-Program Invocation to the customer ATA. Authority is the LoyaltyProgram PDA.
              </p>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
                activeStep === 2
                  ? "bg-emerald-500/10 border-2 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                  : "glass-panel border border-white/[0.08] text-neutral-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">Step 2</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06]">SPL Token</span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">Customer Wallet Ownership</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero-decimal SPL loyalty tokens live in the customer wallet (Phantom/Solflare). 100% self-custodial.
              </p>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
                activeStep === 3
                  ? "bg-emerald-500/10 border-2 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                  : "glass-panel border border-white/[0.08] text-neutral-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">Step 3</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06]">Proof-of-Burn</span>
              </div>
              <h3 className="font-bold text-base text-white mb-1">Redeem &amp; Stamp Receipt</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tokens are destroyed on-chain and a dedicated RedemptionReceipt PDA is created with timestamp.
              </p>
            </button>
          </div>

          {/* Active Step Deep-Dive Box */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Merchant Issues Points via CPI</h4>
                    <span className="text-xs font-mono text-neutral-400">Instruction: award_points(amount)</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  The merchant signs the transaction, and the smart contract verifies merchant authority against the <code className="text-emerald-400 font-mono">LoyaltyProgram</code> PDA. The program derives seeds <code className="text-neutral-300 font-mono">[&quot;loyalty&quot;, merchant]</code> and issues a Cross-Program Invocation to the SPL Token Program to mint zero-decimal tokens into the customer ATA.
                </p>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-neutral-300">
                  <span className="text-neutral-500 block mb-1"># Program Derived Signer Seeds</span>
                  <span className="text-emerald-400">seeds = [b&quot;loyalty&quot;, merchant.key().as_ref(), &amp;[bump]]</span>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Self-Custodial SPL Token Balance</h4>
                    <span className="text-xs font-mono text-neutral-400">Account: Customer Associated Token Account</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Points are not entries in a centralized SQL table. They exist as standard SPL token balances directly tied to the customer&apos;s public key. The customer can inspect their balance in any Solana explorer or wallet without trusting the merchant&apos;s server.
                </p>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-neutral-300">
                  <span className="text-neutral-500 block mb-1"># SPL Token Mint Specification</span>
                  <span className="text-purple-400">decimals: 0 (non-fractional integer points) • mint_authority: LoyaltyProgram PDA</span>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Proof-of-Burn &amp; Monotonic Receipt Indexing</h4>
                    <span className="text-xs font-mono text-neutral-400">Instruction: redeem()</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  When the customer redeems a reward, the program burns exactly <code className="text-amber-400 font-mono">reward_cost</code> tokens from the customer&apos;s balance and creates an on-chain <code className="text-amber-400 font-mono">RedemptionReceipt</code> PDA. This receipt holds the customer address, timestamp, points burned, and receipt sequence number.
                </p>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-neutral-300">
                  <span className="text-neutral-500 block mb-1"># Receipt PDA Seeds (Collision Resistant)</span>
                  <span className="text-amber-400">seeds = [b&quot;redemption&quot;, loyalty_program, customer, &amp;redemption_index.to_le_bytes()]</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Developer Interactive Code Sandbox */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
              Developer Reference
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Anchor Rust &amp; Client TypeScript SDK
            </h2>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08]">
            {/* Tab header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.08] bg-black/40">
              <div className="flex gap-2">
                <button
                  onClick={() => setCodeTab("rust")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    codeTab === "rust" ? "bg-white/[0.1] text-emerald-400" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Anchor Rust (redeem.rs)
                </button>
                <button
                  onClick={() => setCodeTab("ts")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    codeTab === "ts" ? "bg-white/[0.1] text-purple-400" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  TypeScript SDK (actions.ts)
                </button>
                <button
                  onClick={() => setCodeTab("schema")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    codeTab === "schema" ? "bg-white/[0.1] text-amber-400" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  On-Chain Account Schema
                </button>
              </div>
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">Anchor 0.31.1</span>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto bg-[#07090e] font-mono text-xs leading-relaxed">
              {codeTab === "rust" && (
                <pre className="text-neutral-300">
{`// Burn points and create an immutable on-chain receipt PDA
pub fn handle_redeem(ctx: Context<Redeem>) -> Result<()> {
    let loyalty_program = &mut ctx.accounts.loyalty_program;
    let reward_cost = loyalty_program.reward_cost;

    // 1. Burn reward_cost tokens from customer ATA
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

    // 2. Initialize receipt PDA with monotonic counter & clock timestamp
    let receipt = &mut ctx.accounts.receipt;
    receipt.customer = ctx.accounts.customer.key();
    receipt.loyalty_program = loyalty_program.key();
    receipt.receipt_number = loyalty_program.redemption_count;
    receipt.points_burned = reward_cost;
    receipt.timestamp = Clock::get()?.unix_timestamp;
    receipt.bump = ctx.bumps.receipt;

    // 3. Update lifetime counters with checked arithmetic
    loyalty_program.total_redeemed = loyalty_program
        .total_redeemed
        .checked_add(reward_cost)
        .ok_or(PointPassError::MathOverflow)?;
    loyalty_program.redemption_count = loyalty_program
        .redemption_count
        .checked_add(1)
        .ok_or(PointPassError::MathOverflow)?;

    Ok(())
}`}
                </pre>
              )}

              {codeTab === "ts" && (
                <pre className="text-neutral-300">
{`// Client-side pure action taking an Anchor Program instance
export async function redeemPoints(
  program: Program<Pointpass>,
  customer: PublicKey,
  merchant: PublicKey
): Promise<string> {
  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant, program.programId);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);
  const customerTokenAccount = findCustomerAta(pointsMintPda, customer);

  const attemptRedeem = async (): Promise<string> => {
    const loyaltyProgramAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
    const [receiptPda] = findReceiptPda(
      loyaltyProgramPda,
      customer,
      loyaltyProgramAccount.redemptionCount,
      program.programId
    );

    return await program.methods
      .redeem()
      .accountsStrict({
        customer,
        loyaltyProgram: loyaltyProgramPda,
        pointsMint: pointsMintPda,
        customerTokenAccount,
        receipt: receiptPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  };

  return await attemptRedeem();
}`}
                </pre>
              )}

              {codeTab === "schema" && (
                <pre className="text-neutral-300">
{`#[account]
pub struct LoyaltyProgram {
    pub merchant: Pubkey,         // 32 bytes
    pub points_mint: Pubkey,      // 32 bytes
    pub name: String,             // 4 + 32 = 36 bytes (max 32 chars)
    pub reward_cost: u64,         // 8 bytes
    pub total_awarded: u64,       // 8 bytes
    pub total_redeemed: u64,      // 8 bytes
    pub redemption_count: u64,    // 8 bytes
    pub bump: u8,                 // 1 byte
    pub mint_bump: u8,            // 1 byte
}

#[account]
pub struct RedemptionReceipt {
    pub customer: Pubkey,         // 32 bytes (offset 8)
    pub loyalty_program: Pubkey,  // 32 bytes (offset 40)
    pub receipt_number: u64,      // 8 bytes  (offset 72)
    pub points_burned: u64,       // 8 bytes  (offset 80)
    pub timestamp: i64,           // 8 bytes  (offset 88)
    pub bump: u8,                 // 1 byte   (offset 96)
}`}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              0
            </div>
            <h3 className="font-bold text-white text-base">Zero-Decimal Standard</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Points behave like physical punch card stamps: integer units only, fully compatible with standard Solana wallets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-white text-base">Sub-Second Finality</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Instant POS checkout experience powered by Solana 400ms block times with sub-cent transaction fees.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              📜
            </div>
            <h3 className="font-bold text-white text-base">Permanent Proofs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every token burn generates a permanent on-chain receipt PDA with timestamp, preventing merchant disputes.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="font-bold text-white text-base">PDA Mint Control</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No private keys can mint points arbitrarily. The SPL mint authority belongs strictly to the smart contract PDA.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] pt-12 pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-4">
            <span className="text-neutral-300 font-bold font-sans text-sm">PointPass Protocol</span>
            <span>•</span>
            <span>Apache-2.0 Licensed</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/customer" className="hover:text-white transition-colors">Customer Portal</Link>
            <Link href="/merchant" className="hover:text-white transition-colors">Merchant Dashboard</Link>
            <a
              href="https://github.com/meet987654/pointpass-solana"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
