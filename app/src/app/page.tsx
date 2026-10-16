"use client";

import { useState } from "react";
import Link from "next/link";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { PROGRAM_ID, DEMO_MERCHANT } from "@/lib/constants";
import { PublicKey } from "@solana/web3.js";

export default function Home() {
  const demoMerchantPubkey = new PublicKey(DEMO_MERCHANT);
  const { data: programData, loading: programLoading } = useLoyaltyProgram(demoMerchantPubkey);
  const [activeCodeTab, setActiveCodeTab] = useState<"anchor" | "sdk">("anchor");

  return (
    <div className="relative overflow-hidden bg-[#09090b]">
      {/* Top ambient purple gradient matching Render screenshot */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-gradient-to-br from-purple-900/20 via-purple-950/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-8">
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Your fastest path to <br />
              production for <br />
              <span className="font-semibold text-white">loyalty</span>
              <span className="inline-block w-3.5 h-10 sm:h-12 bg-purple-600 align-middle ml-2.5 animate-pulse" />
            </h1>

            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed max-w-lg font-normal">
              Intuitive loyalty infrastructure to issue, earn, and burn zero-decimal SPL tokens. From your first devnet test to nationwide merchant scale.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href={`/customer?merchant=${DEMO_MERCHANT}`} className="btn-primary">
                Start for free &gt;
              </Link>
              <Link href="/merchant" className="btn-secondary">
                Merchant terminal
              </Link>
            </div>
          </div>

          {/* Right Hero Column: Render-Style Infrastructure Wireframe Graphic */}
          <div className="lg:col-span-6 relative">
            {/* Command pill connecting to production wireframe */}
            <div className="relative pl-6 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#18181b] border border-[#27272a] text-xs font-mono text-neutral-200">
                <span className="text-purple-400 font-bold">$</span>
                <span>anchor test --skip-build</span>
              </div>
              {/* Connecting line to wireframe */}
              <div className="absolute left-10 top-8 bottom-0 w-[1px] bg-purple-500/40" />
            </div>

            {/* Wireframe Container */}
            <div className="render-card p-5 sm:p-6 border border-[#222228] bg-[#0d0d10] space-y-4 relative">
              <div className="flex items-center justify-between text-xs font-mono text-[#71717a] border-b border-[#1c1c22] pb-3">
                <span className="tracking-widest uppercase font-semibold text-neutral-400">PRODUCTION</span>
                <span>SOLANA DEVNET</span>
              </div>

              {/* 2x2 Infrastructure Grid matching Render Screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Panel 1 */}
                <div className="render-card-subtle p-3.5 bg-[#121216] border border-[#1e1e24] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-300 font-medium">app-loyalty-pda</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                  </div>
                  <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                    <span>AWARDED</span>
                    <span className="text-neutral-200">{programLoading ? "..." : `${programData?.totalAwarded ?? 55} pts`}</span>
                  </div>
                  <div className="h-6 w-full flex items-end">
                    <div className="h-2 w-full bg-gradient-to-r from-purple-600/40 via-purple-500 to-purple-400 rounded-sm" />
                  </div>
                </div>

                {/* Panel 2 */}
                <div className="render-card-subtle p-3.5 bg-[#121216] border border-[#1e1e24] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-300 font-medium">app-points-mint</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                  </div>
                  <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                    <span>DECIMALS</span>
                    <span className="text-neutral-200">0 (Integer)</span>
                  </div>
                  <div className="h-6 w-full flex items-end">
                    <div className="h-3 w-full bg-gradient-to-r from-purple-700/30 via-purple-600/60 to-purple-500 rounded-sm" />
                  </div>
                </div>

                {/* Panel 3 */}
                <div className="render-card-subtle p-3.5 bg-[#121216] border border-[#1e1e24] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-300 font-medium">receipt-indexer</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Available</span>
                  </div>
                  <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                    <span>MEMCMP(40)</span>
                    <span className="text-neutral-200">{programLoading ? "..." : `${programData?.redemptionCount ?? 3} receipts`}</span>
                  </div>
                  <div className="h-6 w-full flex items-end">
                    <div className="h-1.5 w-full bg-purple-500/70 rounded-sm" />
                  </div>
                </div>

                {/* Panel 4 */}
                <div className="render-card-subtle p-3.5 bg-[#121216] border border-[#1e1e24] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-300 font-medium">customer-terminal</span>
                    <span className="text-purple-400 text-[11px] font-mono">Syncing</span>
                  </div>
                  <div className="text-[11px] text-[#71717a] font-mono flex justify-between">
                    <span>REWARD COST</span>
                    <span className="text-neutral-200">{programLoading ? "..." : `${programData?.rewardCost ?? 10} pts`}</span>
                  </div>
                  <div className="h-6 w-full flex items-end">
                    <div className="h-2.5 w-full bg-gradient-to-r from-purple-800/40 via-purple-600 to-purple-400 rounded-sm" />
                  </div>
                </div>
              </div>

              {/* Bottom purple geometric graphic matching Render screenshot */}
              <div className="pt-2 flex items-center justify-between">
                <div className="w-12 h-10 bg-purple-600 rounded-[3px] flex items-center justify-center font-mono text-xs font-bold text-white">
                  PP
                </div>
                <span className="text-[11px] font-mono text-[#71717a]">
                  Program ID: {PROGRAM_ID.toBase58().slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Architecture Table (Render Clean Table Style) */}
      <div className="border-t border-[#1c1c22] bg-[#0c0c0e]/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
              INFRASTRUCTURE ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
              Deterministic Solana PDA standard
            </h2>
            <p className="text-sm text-[#a1a1aa] max-w-2xl font-normal">
              Every merchant, points mint, and redemption receipt is derived deterministically on-chain without human private key management.
            </p>
          </div>

          <div className="render-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-normal">
                <thead>
                  <tr className="border-b border-[#222228] text-xs font-mono text-[#71717a] uppercase bg-[#141418]">
                    <th className="py-3 px-5">Component</th>
                    <th className="py-3 px-5">Type</th>
                    <th className="py-3 px-5">Seeds</th>
                    <th className="py-3 px-5">Authority Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e24] text-xs font-mono">
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">LoyaltyProgram</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">PDA Account</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;loyalty&quot;, merchant_pubkey]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Controlled by merchant wallet signer</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">PointsMint</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">SPL Token Mint (0-Decimals)</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;mint&quot;, loyalty_program_pda]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Mint authority is the LoyaltyProgram PDA</td>
                  </tr>
                  <tr className="hover:bg-[#141418]/50 transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">RedemptionReceipt</td>
                    <td className="py-4 px-5 text-[#a1a1aa]">Proof-of-Burn PDA</td>
                    <td className="py-4 px-5 text-purple-300">[&quot;redemption&quot;, loyalty_pda, customer, index]</td>
                    <td className="py-4 px-5 text-[#a1a1aa] font-sans">Immutable on-chain timestamp &amp; burn proof</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Code Sandbox Section */}
      <div className="border-t border-[#1c1c22] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
                DEVELOPER TOOLING
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-white">
                Engineered for TypeScript and Rust
              </h2>
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
            </div>
          </div>

          <div className="render-card overflow-hidden bg-[#0c0c0e] border border-[#222228] p-5 font-mono text-xs leading-relaxed text-[#d4d4d8]">
            {activeCodeTab === "anchor" ? (
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
            ) : (
              <pre className="overflow-x-auto text-[#d4d4d8]">
{`// Client-side execution with automatic seed resolution
const txSignature = await redeemPoints(
  program,
  customerPublicKey,
  merchantPublicKey
);

console.log("Redemption confirmed:", txSignature);`}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Render Minimalist Footer (ZERO ICONS) */}
      <footer className="border-t border-[#1c1c22] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#71717a] font-normal">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">PointPass</span>
            <span>Solana Devnet Loyalty Protocol</span>
            <span>Apache-2.0</span>
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
        </div>
      </footer>
    </div>
  );
}
