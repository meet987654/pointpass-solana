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

      // Refresh all dependent states
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
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c1c22] pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block mb-1">
            CUSTOMER PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
            Loyalty Pass &amp; Rewards
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefreshAll}
            className="btn-secondary text-xs py-1.5 px-3 cursor-pointer"
          >
            Refresh State
          </button>
        </div>
      </div>

      {/* Merchant Address Search Bar */}
      <div className="render-card p-5 sm:p-6 space-y-3">
        <form onSubmit={handleMerchantSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="merchantInput" className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">
              Target Merchant Authority
            </label>
            <button
              type="button"
              onClick={() => {
                setInputAddress(DEMO_MERCHANT);
                setAddressError(null);
                router.push(`/customer?merchant=${DEMO_MERCHANT}`);
              }}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono transition-colors text-left"
            >
              [ Use Demo: Bean There Cafe ]
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="merchantInput"
              type="text"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value);
                setAddressError(null);
              }}
              placeholder="Paste merchant public key..."
              className="flex-1 px-3.5 py-2 text-xs rounded-[4px] border border-[#27272a] bg-[#0c0c0e] text-neutral-100 font-mono focus:outline-none focus:border-neutral-400"
            />
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-5 cursor-pointer whitespace-nowrap"
            >
              Load Store
            </button>
          </div>
          {addressError && (
            <p className="text-xs text-rose-400 font-mono">{addressError}</p>
          )}
        </form>
      </div>

      {/* Program Details Card */}
      <div className="render-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#1c1c22] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
              PROGRAM PROFILE
            </span>
            {programData && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-[3px] bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                Available
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-[#71717a]">Devnet Cluster</span>
        </div>

        {programError && (
          <div className="p-3.5 rounded-[4px] bg-rose-950/30 border border-rose-900/80 text-xs font-mono text-rose-300">
            {programError}
          </div>
        )}

        {programLoading ? (
          <div className="space-y-3 animate-pulse py-4">
            <div className="h-5 bg-[#18181b] rounded w-1/4" />
            <div className="h-4 bg-[#18181b] rounded w-1/2" />
          </div>
        ) : !merchantPubkey ? (
          <p className="text-xs font-mono text-[#71717a]">Enter a valid Solana public key above.</p>
        ) : !programData ? (
          <div className="p-8 rounded-[4px] bg-[#0c0c0e] text-center border border-dashed border-[#222228] space-y-1">
            <p className="text-xs font-mono text-neutral-300">
              No loyalty program found for this merchant address.
            </p>
            <p className="text-xs text-[#71717a]">
              Ensure the merchant has initialized their program on Solana Devnet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-normal tracking-tight text-white">
                {programData.name}
              </h2>
              <p className="text-xs text-[#a1a1aa] font-mono mt-1">
                Threshold: {programData.rewardCost} points per redemption reward
              </p>
            </div>

            {/* 3 Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Lifetime Issued
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.totalAwarded} pts
                </span>
              </div>
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Total Burned
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.totalRedeemed} pts
                </span>
              </div>
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Proof-of-Burn Receipts
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.redemptionCount}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-mono pt-1 text-[#71717a] border-t border-[#1c1c22]">
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

      {/* Customer Points & Redeem Card */}
      <div className="render-card p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#1c1c22] pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
            YOUR POINTS BALANCE
          </span>
          {connected && (
            <span className="text-xs font-mono text-neutral-400">
              {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </span>
          )}
        </div>

        {balanceError && (
          <div className="p-3.5 rounded-[4px] bg-rose-950/30 border border-rose-900/80 text-xs font-mono text-rose-300">
            {balanceError}
          </div>
        )}

        {!connected ? (
          <div className="p-8 rounded-[4px] bg-[#0c0c0e] text-center border border-dashed border-[#222228] space-y-2">
            <p className="text-xs font-mono text-neutral-300">
              Connect your Solana wallet to view balance and redeem rewards.
            </p>
          </div>
        ) : !programData ? (
          <p className="text-xs font-mono text-[#71717a]">Select an active merchant program above.</p>
        ) : balanceLoading ? (
          <div className="space-y-4 animate-pulse py-3">
            <div className="h-8 bg-[#18181b] rounded w-1/4" />
            <div className="h-3 bg-[#18181b] rounded w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#71717a] block mb-1">
                  Available Points
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-normal font-mono text-white">
                    {balance}
                  </span>
                  <span className="text-xs font-mono text-[#71717a]">
                    / {rewardCost} required for reward
                  </span>
                </div>
              </div>

              <button
                onClick={handleRedeem}
                disabled={!canRedeem}
                className={
                  canRedeem
                    ? "btn-primary cursor-pointer"
                    : "px-4 py-2 rounded-[4px] bg-[#18181b] border border-[#27272a] text-[#71717a] text-xs font-mono cursor-not-allowed"
                }
              >
                {isRedeeming
                  ? "Burning Points on Solana..."
                  : balance < rewardCost
                  ? `Need ${rewardCost - balance} More Points`
                  : `Redeem Reward (Burn ${rewardCost} Points)`}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#71717a]">
                <span>Reward Threshold</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-[#18181b] rounded-sm overflow-hidden border border-[#27272a]">
                <div
                  className="h-full bg-purple-600 transition-all duration-300 rounded-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs font-mono text-[#a1a1aa]">
                {balance >= rewardCost
                  ? "Reward unlocked. You have sufficient points to burn for an on-chain receipt."
                  : `Earn ${rewardCost - balance} more points to trigger an on-chain reward burn.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Redemption History */}
      <div className="render-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c1c22] pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
            VERIFIABLE PROOF-OF-BURN RECEIPTS
          </span>
          {receipts && receipts.length > 0 && (
            <span className="text-xs font-mono text-[#71717a]">{receipts.length} receipt(s)</span>
          )}
        </div>

        {receiptsError && (
          <div className="p-3.5 rounded-[4px] bg-rose-950/30 border border-rose-900/80 text-xs font-mono text-rose-300">
            {receiptsError}
          </div>
        )}

        {!connected ? (
          <p className="text-xs font-mono text-[#71717a]">Connect wallet to audit personal receipts.</p>
        ) : receiptsLoading ? (
          <div className="space-y-2 animate-pulse py-2">
            <div className="h-10 bg-[#18181b] rounded" />
            <div className="h-10 bg-[#18181b] rounded" />
          </div>
        ) : !receipts || receipts.length === 0 ? (
          <div className="p-8 rounded-[4px] bg-[#0c0c0e] text-center border border-dashed border-[#222228]">
            <p className="text-xs font-mono text-[#71717a]">
              No redemptions found. Burning points mints an immutable on-chain proof-of-burn receipt.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#1c1c22]">
            {receipts.map((r) => (
              <div
                key={r.pubkey.toBase58()}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#18181b] border border-[#27272a] text-neutral-300">
                    #{r.receiptNumber}
                  </span>
                  <span className="text-neutral-200">
                    Burned {r.pointsBurned} Points
                  </span>
                  <span className="text-[#71717a]">
                    {new Date(r.timestamp * 1000).toLocaleString()}
                  </span>
                </div>

                <a
                  href={getExplorerAddressUrl(r.pubkey, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
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
