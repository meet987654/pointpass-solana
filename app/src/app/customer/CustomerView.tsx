"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { DEMO_MERCHANT, getExplorerAddressUrl } from "@/lib/constants";
import { getProgram } from "@/lib/program";
import { redeemPoints } from "@/lib/actions";
import { friendlyError } from "@/lib/errors";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { usePointsBalance } from "@/hooks/usePointsBalance";
import { useReceipts } from "@/hooks/useReceipts";
import { useToast } from "@/components/ToastProvider";

export function CustomerView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawMerchantParam = searchParams.get("merchant") || DEMO_MERCHANT;

  const [inputAddress, setInputAddress] = useState(rawMerchantParam);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState<boolean>(false);

  const { connection } = useConnection();
  const { connected, publicKey, signTransaction, signAllTransactions } = useWallet();
  const { showToast } = useToast();

  // Validate and parse merchant address
  const merchantPubkey: PublicKey | null = useMemo(() => {
    try {
      return new PublicKey(rawMerchantParam.trim());
    } catch {
      return null;
    }
  }, [rawMerchantParam]);

  // Query hooks
  const {
    data: programData,
    loading: programLoading,
    error: programError,
    refresh: refreshProgram,
  } = useLoyaltyProgram(merchantPubkey);

  const {
    data: pointsBalance,
    loading: balanceLoading,
    error: balanceError,
    refresh: refreshBalance,
  } = usePointsBalance(merchantPubkey, publicKey);

  const {
    data: receipts,
    loading: receiptsLoading,
    error: receiptsError,
    refresh: refreshReceipts,
  } = useReceipts(merchantPubkey, publicKey);

  const handleRefreshAll = async () => {
    await Promise.all([refreshProgram(), refreshBalance(), refreshReceipts()]);
    showToast({ message: "Refreshed program and points data", type: "info" });
  };

  const handleMerchantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = new PublicKey(inputAddress.trim());
      setAddressError(null);
      router.push(`/customer?merchant=${parsed.toBase58()}`);
    } catch {
      setAddressError("Invalid Solana public key format.");
    }
  };

  const handleRedeem = async () => {
    if (!connected || !publicKey || !merchantPubkey || !programData) return;
    if (!signTransaction || !signAllTransactions) {
      showToast({ message: "Connected wallet does not support signing.", type: "error" });
      return;
    }

    setIsRedeeming(true);
    try {
      const adapterWallet = { publicKey, signTransaction, signAllTransactions };
      const program = getProgram(connection, adapterWallet);

      const sig = await redeemPoints(program, publicKey, merchantPubkey);
      showToast({
        message: `Redemption confirmed: Burned ${programData.rewardCost} points.`,
        type: "success",
        txSignature: sig,
      });

      await Promise.all([refreshProgram(), refreshBalance(), refreshReceipts()]);
    } catch (err: unknown) {
      console.error("Redemption error:", err);
      showToast({ message: friendlyError(err), type: "error" });
    } finally {
      setIsRedeeming(false);
    }
  };

  const balance = pointsBalance ?? 0;
  const rewardCost = programData?.rewardCost ?? 10;
  const progressPercent = Math.min(100, Math.round((balance / rewardCost) * 100));
  const canRedeem = connected && balance >= rewardCost && !isRedeeming;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3c9bc3] font-semibold block mb-1">
            CUSTOMER TERMINAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
            Loyalty Pass &amp; Rewards
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefreshAll}
            className="btn-glass-secondary text-xs py-1.5 px-4 cursor-pointer"
          >
            Refresh State
          </button>
        </div>
      </div>

      {/* Target Merchant Search Bar Card */}
      <div className="glass-card p-6 sm:p-7 space-y-4">
        <form onSubmit={handleMerchantSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="merchantInput" className="text-xs font-mono text-blue-200/80 uppercase tracking-wider font-semibold">
              Target Merchant Authority
            </label>
            <button
              type="button"
              onClick={() => {
                setInputAddress(DEMO_MERCHANT);
                setAddressError(null);
                router.push(`/customer?merchant=${DEMO_MERCHANT}`);
              }}
              className="text-xs text-[#3c9bc3] hover:text-blue-300 font-mono transition-colors text-left"
            >
              [ Use Demo Store: Bean There Cafe ]
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="merchantInput"
              type="text"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value);
                setAddressError(null);
              }}
              placeholder="Paste merchant public key..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-[#d3dde2]/15 bg-[#07131b]/60 text-white font-mono focus:outline-none focus:border-[#3c9bc3] focus:ring-1 focus:ring-[#3c9bc3] backdrop-blur-md"
            />
            <button
              type="submit"
              className="btn-glass-primary text-xs py-2.5 px-6 cursor-pointer whitespace-nowrap"
            >
              Load Store
            </button>
          </div>
          {addressError && (
            <p className="text-xs text-rose-400 font-mono">{addressError}</p>
          )}
        </form>
      </div>

      {/* Program Details Glass Card */}
      <div className="glass-card p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-200/70">
              PROGRAM PROFILE
            </span>
            {programData && (
              <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                Available
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-blue-200/60">Solana Devnet</span>
        </div>

        {programError && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300">
            {programError}
          </div>
        )}

        {programLoading ? (
          <div className="space-y-3 animate-pulse py-4">
            <div className="h-6 bg-white/10 rounded w-1/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        ) : !merchantPubkey ? (
          <p className="text-xs font-mono text-blue-200/60">Enter a valid Solana public key above.</p>
        ) : !programData ? (
          <div className="p-8 rounded-2xl bg-[#07131b]/40 text-center border border-dashed border-[#d3dde2]/15 space-y-1">
            <p className="text-xs font-mono text-white/80">
              No loyalty program found for this merchant address.
            </p>
            <p className="text-xs text-blue-200/60">
              Ensure the merchant has initialized their program on Solana Devnet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">
                {programData.name}
              </h2>
              <p className="text-xs text-blue-200/70 font-mono mt-1">
                Threshold: {programData.rewardCost} points per redemption reward
              </p>
            </div>

            {/* 3 Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-card-subtle p-4 space-y-1 bg-[#07131b]/50">
                <span className="text-[11px] font-mono text-blue-200/60 uppercase tracking-wider block">
                  Lifetime Issued
                </span>
                <span className="text-xl font-mono font-semibold text-white">
                  {programData.totalAwarded} pts
                </span>
              </div>
              <div className="glass-card-subtle p-4 space-y-1 bg-[#07131b]/50">
                <span className="text-[11px] font-mono text-blue-200/60 uppercase tracking-wider block">
                  Total Burned
                </span>
                <span className="text-xl font-mono font-semibold text-white">
                  {programData.totalRedeemed} pts
                </span>
              </div>
              <div className="glass-card-subtle p-4 space-y-1 bg-[#07131b]/50">
                <span className="text-[11px] font-mono text-blue-200/60 uppercase tracking-wider block">
                  Proof-of-Burn Receipts
                </span>
                <span className="text-xl font-mono font-semibold text-white">
                  {programData.redemptionCount}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-mono pt-2 text-blue-200/70 border-t border-white/[0.08]">
              <a
                href={getExplorerAddressUrl(programData.programPda, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                PDA: {programData.programPda.toBase58().slice(0, 6)}...{programData.programPda.toBase58().slice(-4)} [Explorer]
              </a>
              <a
                href={getExplorerAddressUrl(programData.mintPda, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Mint: {programData.mintPda.toBase58().slice(0, 6)}...{programData.mintPda.toBase58().slice(-4)} [Explorer]
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Customer Points & Redeem Glass Card */}
      <div className="glass-card p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-200/70">
            YOUR POINTS BALANCE
          </span>
          {connected && (
            <span className="text-xs font-mono text-blue-300">
              {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </span>
          )}
        </div>

        {balanceError && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300">
            {balanceError}
          </div>
        )}

        {!connected ? (
          <div className="p-8 rounded-2xl bg-[#07131b]/40 text-center border border-dashed border-[#d3dde2]/15 space-y-2">
            <p className="text-xs font-mono text-blue-100/80">
              Connect your Solana wallet to view balance and redeem rewards.
            </p>
          </div>
        ) : !programData ? (
          <p className="text-xs font-mono text-blue-200/60">Select an active merchant program above.</p>
        ) : balanceLoading ? (
          <div className="space-y-4 animate-pulse py-3">
            <div className="h-8 bg-white/10 rounded w-1/4" />
            <div className="h-3 bg-white/10 rounded w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-blue-200/60 block mb-1">
                  Available Points
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold font-mono text-white">
                    {balance}
                  </span>
                  <span className="text-xs font-mono text-blue-200/60">
                    / {rewardCost} required for reward
                  </span>
                </div>
              </div>

              <button
                onClick={handleRedeem}
                disabled={!canRedeem}
                className={
                  canRedeem
                    ? "btn-glass-primary cursor-pointer font-medium"
                    : "px-5 py-2.5 rounded-full bg-white/5 border border-[#d3dde2]/10 text-white/40 text-xs font-mono cursor-not-allowed"
                }
              >
                {isRedeeming
                  ? "Burning Points on Solana..."
                  : balance < rewardCost
                  ? `Need ${rewardCost - balance} More Points`
                  : `Redeem Reward (Burn ${rewardCost} Points)`}
              </button>
            </div>

            {/* Glowing Luminous Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-blue-200/70">
                <span>Reward Threshold</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#07131b] rounded-full overflow-hidden border border-[#d3dde2]/10 p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-[#3c9bc3] to-blue-400 rounded-full transition-all duration-500 shadow-[0_0_12px_#3c9bc3]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs font-mono text-blue-100/70">
                {balance >= rewardCost
                  ? "Reward unlocked. You have sufficient points to burn for an on-chain receipt."
                  : `Earn ${rewardCost - balance} more points to trigger an on-chain reward burn.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Proof-of-Burn Receipts Glass Card */}
      <div className="glass-card p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-blue-200/70">
            VERIFIABLE PROOF-OF-BURN RECEIPTS
          </span>
          {receipts && receipts.length > 0 && (
            <span className="text-xs font-mono text-blue-200/60">{receipts.length} receipt(s)</span>
          )}
        </div>

        {receiptsError && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-300">
            {receiptsError}
          </div>
        )}

        {!connected ? (
          <p className="text-xs font-mono text-blue-200/60">Connect wallet to audit personal receipts.</p>
        ) : receiptsLoading ? (
          <div className="space-y-2 animate-pulse py-2">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
          </div>
        ) : !receipts || receipts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#07131b]/40 text-center border border-dashed border-[#d3dde2]/15">
            <p className="text-xs font-mono text-blue-200/60">
              No redemptions found. Burning points mints an immutable on-chain proof-of-burn receipt.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {receipts.map((r) => (
              <div
                key={r.pubkey.toBase58()}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-[#d3dde2]/10 text-white/90">
                    #{r.receiptNumber}
                  </span>
                  <span className="text-white font-medium">
                    Burned {r.pointsBurned} Points
                  </span>
                  <span className="text-blue-200/60">
                    {new Date(r.timestamp * 1000).toLocaleString()}
                  </span>
                </div>

                <a
                  href={getExplorerAddressUrl(r.pubkey, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3c9bc3] hover:text-blue-300 underline underline-offset-2"
                >
                  Receipt: {r.pubkey.toBase58().slice(0, 6)}...{r.pubkey.toBase58().slice(-4)} [Explorer]
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
