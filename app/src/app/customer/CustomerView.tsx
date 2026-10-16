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
        message: `Redemption successful! Burned ${programData.rewardCost} points.`,
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Merchant Address Search Bar */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] p-6 shadow-sm">
        <form onSubmit={handleMerchantSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="merchantInput" className="text-sm font-semibold">
              Merchant Address
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setInputAddress(DEMO_MERCHANT);
                  setAddressError(null);
                  router.push(`/customer?merchant=${DEMO_MERCHANT}`);
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline"
              >
                Use Demo Merchant
              </button>
              <button
                type="button"
                onClick={handleRefreshAll}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                title="Refresh on-chain data"
              >
                ↻ Refresh
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              id="merchantInput"
              type="text"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value);
                setAddressError(null);
              }}
              placeholder="Paste merchant public key..."
              className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              Load
            </button>
          </div>
          {addressError && (
            <p className="text-xs text-rose-500 font-medium">{addressError}</p>
          )}
        </form>
      </div>

      {/* Program Details Card */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Loyalty Program</h2>
          {programData && (
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Active
            </span>
          )}
        </div>

        {programError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            {programError}
          </div>
        )}
        {programLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
            <div className="h-16 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl mt-4" />
          </div>
        ) : !merchantPubkey ? (
          <p className="text-sm text-neutral-500">Please provide a valid merchant public key.</p>
        ) : !programData ? (
          <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-center border border-dashed border-neutral-300 dark:border-neutral-800">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              No loyalty program registered for this merchant.
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Ensure the merchant has initialized their program on Solana Devnet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {programData.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Reward unlocks every{" "}
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {programData.rewardCost} points
                </span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Awarded</span>
                <span className="text-lg font-bold font-mono">{programData.totalAwarded}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Redeemed</span>
                <span className="text-lg font-bold font-mono">{programData.totalRedeemed}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Redemptions</span>
                <span className="text-lg font-bold font-mono">{programData.redemptionCount}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-neutral-500">
              <a
                href={getExplorerAddressUrl(programData.programPda, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-500 underline underline-offset-2"
              >
                Program PDA: {programData.programPda.toBase58().slice(0, 4)}...{programData.programPda.toBase58().slice(-4)} ↗
              </a>
              <a
                href={getExplorerAddressUrl(programData.mintPda, "devnet")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-500 underline underline-offset-2"
              >
                Points Mint: {programData.mintPda.toBase58().slice(0, 4)}...{programData.mintPda.toBase58().slice(-4)} ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Customer Points & Redeem Card */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Your Points & Rewards</h2>

        {balanceError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            {balanceError}
          </div>
        )}
        {!connected ? (
          <div className="p-8 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-center border border-dashed border-neutral-300 dark:border-neutral-800 space-y-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Connect your wallet to see your points balance and redeem rewards.
            </p>
          </div>
        ) : !programData ? (
          <p className="text-sm text-neutral-500">Connect to an active merchant program above.</p>
        ) : balanceLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">
                  Current Balance
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono text-neutral-900 dark:text-white">
                    {balance}
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    / {rewardCost} points required
                  </span>
                </div>
              </div>

              <button
                onClick={handleRedeem}
                disabled={!canRedeem}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                  isRedeeming
                    ? "bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-wait"
                    : canRedeem
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-emerald-900/20"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                }`}
              >
                {isRedeeming
                  ? "Redeeming..."
                  : balance < rewardCost
                  ? `Need ${rewardCost - balance} More Points`
                  : `Redeem Reward (Burn ${rewardCost} Points)`}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-neutral-500">
                <span>Reward Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-neutral-500">
                {balance >= rewardCost
                  ? "🎉 Reward unlocked! You have enough points to redeem."
                  : `Earn ${rewardCost - balance} more points on your next purchase to unlock a reward.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Redemption History */}
      <div className="glass-panel rounded-2xl border border-white/[0.08] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Redemption History</h2>
          {receipts && receipts.length > 0 && (
            <span className="text-xs text-neutral-500">{receipts.length} receipt(s)</span>
          )}
        </div>

        {receiptsError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            {receiptsError}
          </div>
        )}
        {!connected ? (
          <p className="text-sm text-neutral-500">Connect wallet to view your receipts.</p>
        ) : receiptsLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
            <div className="h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
          </div>
        ) : !receipts || receipts.length === 0 ? (
          <div className="p-8 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-center border border-dashed border-neutral-300 dark:border-neutral-800">
            <p className="text-sm text-neutral-500">
              No redemptions yet. Redeem your points to receive a verifiable on-chain receipt!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {receipts.map((r) => (
              <div
                key={r.pubkey.toBase58()}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center">
                    #{r.receiptNumber}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white block">
                      Burned {r.pointsBurned} Points
                    </span>
                    <span className="text-xs text-neutral-500">
                      {new Date(r.timestamp * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>

                <a
                  href={getExplorerAddressUrl(r.pubkey, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Receipt: {r.pubkey.toBase58().slice(0, 6)}...{r.pubkey.toBase58().slice(-4)} ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
