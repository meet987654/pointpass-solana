"use client";

import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { useReceipts } from "@/hooks/useReceipts";
import { initializeProgram, awardPoints } from "@/lib/actions";
import { getProgram } from "@/lib/program";
import { friendlyError } from "@/lib/errors";
import { getExplorerAddressUrl } from "@/lib/constants";
import { useToast } from "@/components/ToastProvider";
import { WalletMultiButtonDynamic } from "@/components/WalletButton";

export function MerchantView() {
  const { connection } = useConnection();
  const { connected, publicKey, signTransaction, signAllTransactions } = useWallet();
  const { showToast } = useToast();

  // Load loyalty program data for connected wallet
  const {
    data: programData,
    loading: programLoading,
    error: programError,
    refresh: refreshProgram,
  } = useLoyaltyProgram(publicKey);

  // Load all receipts for this merchant
  const {
    data: receipts,
    loading: receiptsLoading,
    error: receiptsError,
    refresh: refreshReceipts,
  } = useReceipts(publicKey, null);

  // Form states: Initialize
  const [initName, setInitName] = useState("Bean There Cafe");
  const [initRewardCost, setInitRewardCost] = useState("10");
  const [isInitializing, setIsInitializing] = useState(false);

  // Form states: Award
  const [awardCustomer, setAwardCustomer] = useState("");
  const [awardAmount, setAwardAmount] = useState("10");
  const [isAwarding, setIsAwarding] = useState(false);
  const [awardAddressError, setAwardAddressError] = useState<string | null>(null);

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !signTransaction || !signAllTransactions) {
      showToast({ message: "Please connect your wallet first", type: "error" });
      return;
    }

    const trimmedName = initName.trim();
    if (!trimmedName) {
      showToast({ message: "Store name cannot be empty", type: "error" });
      return;
    }
    const cost = parseInt(initRewardCost, 10);
    if (isNaN(cost) || cost <= 0) {
      showToast({ message: "Reward cost must be a positive number", type: "error" });
      return;
    }

    setIsInitializing(true);
    try {
      const adapterWallet = { publicKey, signTransaction, signAllTransactions };
      const program = getProgram(connection, adapterWallet);
      const sig = await initializeProgram(program, publicKey, trimmedName, cost);

      showToast({
        message: `Loyalty program "${trimmedName}" initialized successfully!`,
        type: "success",
        txSignature: sig,
      });

      await refreshProgram();
    } catch (err: unknown) {
      console.error("Initialize error:", err);
      showToast({ message: friendlyError(err), type: "error" });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !signTransaction || !signAllTransactions || !programData) {
      showToast({ message: "Please connect your wallet first", type: "error" });
      return;
    }

    let customerPubkey: PublicKey;
    try {
      customerPubkey = new PublicKey(awardCustomer.trim());
      setAwardAddressError(null);
    } catch {
      setAwardAddressError("Invalid Solana public key format.");
      return;
    }

    const amount = parseInt(awardAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      showToast({ message: "Award amount must be a positive integer", type: "error" });
      return;
    }

    setIsAwarding(true);
    try {
      const adapterWallet = { publicKey, signTransaction, signAllTransactions };
      const program = getProgram(connection, adapterWallet);
      const sig = await awardPoints(program, publicKey, customerPubkey, amount);

      showToast({
        message: `Successfully awarded ${amount} points to ${customerPubkey.toBase58().slice(0, 4)}...${customerPubkey.toBase58().slice(-4)}!`,
        type: "success",
        txSignature: sig,
      });

      setAwardCustomer("");
      await Promise.all([refreshProgram(), refreshReceipts()]);
    } catch (err: unknown) {
      console.error("Award error:", err);
      showToast({ message: friendlyError(err), type: "error" });
    } finally {
      setIsAwarding(false);
    }
  };

  const handleRefreshAll = async () => {
    await Promise.all([refreshProgram(), refreshReceipts()]);
    showToast({ message: "Refreshed merchant data", type: "info" });
  };

  if (!connected || !publicKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="render-card p-8 sm:p-12 text-center max-w-lg mx-auto space-y-6">
          <div className="inline-block px-3 py-1 rounded-[4px] bg-[#18181b] border border-[#27272a] text-xs font-mono text-purple-400">
            MERCHANT CONSOLE
          </div>
          <h1 className="text-2xl font-normal tracking-tight text-white">Merchant Authority Terminal</h1>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Connect your merchant wallet to initialize your on-chain store loyalty program, issue zero-decimal SPL loyalty tokens to customers, and audit redemption receipts.
          </p>
          <div className="flex justify-center pt-2">
            <WalletMultiButtonDynamic />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-6">
      {/* Merchant Header Bar */}
      <div className="render-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block">
            CONNECTED MERCHANT WALLET
          </span>
          <span className="text-xs font-mono text-neutral-200 break-all">
            {publicKey.toBase58()}
          </span>
        </div>
        <button
          onClick={handleRefreshAll}
          className="btn-secondary text-xs py-1.5 px-3 self-start sm:self-auto cursor-pointer"
        >
          Refresh State
        </button>
      </div>

      {programLoading ? (
        <div className="render-card p-8 animate-pulse space-y-3">
          <div className="h-5 bg-[#18181b] rounded w-1/4" />
          <div className="h-4 bg-[#18181b] rounded w-1/2" />
        </div>
      ) : programError ? (
        <div className="render-card p-6 bg-rose-950/20 border-rose-900/80 text-xs font-mono text-rose-300">
          <p className="font-semibold mb-1">Error querying program:</p>
          <p>{programError}</p>
        </div>
      ) : !programData ? (
        /* Uninitialized State: Initialize Form */
        <div className="render-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#71717a] font-semibold block">
              STATUS: UNINITIALIZED
            </span>
            <h2 className="text-2xl font-normal tracking-tight text-white">
              Initialize Your Store Loyalty Program
            </h2>
            <p className="text-xs text-[#a1a1aa] max-w-xl">
              Deploys your on-chain LoyaltyProgram PDA and custom Points SPL Mint on Solana Devnet.
            </p>
          </div>

          <form onSubmit={handleInitialize} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                Business / Store Name
              </label>
              <input
                type="text"
                value={initName}
                maxLength={32}
                onChange={(e) => setInitName(e.target.value)}
                placeholder="e.g. Bean There Cafe"
                className="w-full px-3.5 py-2 text-xs rounded-[4px] border border-[#27272a] bg-[#0c0c0e] text-neutral-100 font-mono focus:outline-none focus:border-neutral-400"
                required
              />
              <span className="text-[11px] font-mono text-[#71717a] mt-1 block">Maximum 32 bytes UTF-8 string.</span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                Reward Threshold (Points to Burn)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={initRewardCost}
                onChange={(e) => setInitRewardCost(e.target.value)}
                placeholder="10"
                className="w-full px-3.5 py-2 text-xs rounded-[4px] border border-[#27272a] bg-[#0c0c0e] text-neutral-100 font-mono focus:outline-none focus:border-neutral-400"
                required
              />
              <span className="text-[11px] font-mono text-[#71717a] mt-1 block">Number of points required for customer to claim a reward.</span>
            </div>

            <button
              type="submit"
              disabled={isInitializing}
              className="btn-primary text-xs py-2 px-6 cursor-pointer disabled:opacity-50"
            >
              {isInitializing ? "Initializing On-Chain..." : "Initialize Loyalty Program"}
            </button>
          </form>
        </div>
      ) : (
        /* Initialized State: Program Stats & Award Points Form */
        <>
          {/* Program Overview Card */}
          <div className="render-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c22] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717a] block mb-1">
                  REGISTERED LOYALTY PROGRAM
                </span>
                <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
                  {programData.name}
                </h1>
              </div>
              <span className="px-2.5 py-1 rounded-[3px] text-xs font-mono bg-purple-950/60 border border-purple-800 text-purple-300 self-start sm:self-auto">
                Threshold: {programData.rewardCost} Points
              </span>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Total Points Awarded
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.totalAwarded} pts
                </span>
              </div>
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Total Points Burned
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.totalRedeemed} pts
                </span>
              </div>
              <div className="render-card-subtle p-3.5 space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider block">
                  Redemption Receipts
                </span>
                <span className="text-xl font-mono font-medium text-white">
                  {programData.redemptionCount}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono text-[#71717a] border-t border-[#1c1c22] pt-4">
              <div className="flex-1 truncate">
                <span className="text-[#71717a] block mb-0.5">Program PDA:</span>
                <a
                  href={getExplorerAddressUrl(programData.programPda, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {programData.programPda.toBase58()} [Explorer]
                </a>
              </div>
              <div className="flex-1 truncate">
                <span className="text-[#71717a] block mb-0.5">Points Mint PDA:</span>
                <a
                  href={getExplorerAddressUrl(programData.mintPda, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  {programData.mintPda.toBase58()} [Explorer]
                </a>
              </div>
            </div>
          </div>

          {/* Award Points Form */}
          <div className="render-card p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold block mb-1">
                ISSUE REWARDS
              </span>
              <h2 className="text-xl font-normal tracking-tight text-white">
                Award Points to Customer
              </h2>
              <p className="text-xs text-[#a1a1aa] mt-1 font-mono">
                Mints zero-decimal SPL tokens directly into the customer&apos;s associated token account.
              </p>
            </div>

            <form onSubmit={handleAward} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                  Customer Wallet Address
                </label>
                <input
                  type="text"
                  value={awardCustomer}
                  onChange={(e) => {
                    setAwardCustomer(e.target.value);
                    if (awardAddressError) setAwardAddressError(null);
                  }}
                  placeholder="Paste customer public key..."
                  className="w-full px-3.5 py-2 text-xs rounded-[4px] border border-[#27272a] bg-[#0c0c0e] text-neutral-100 font-mono focus:outline-none focus:border-neutral-400"
                  required
                />
                {awardAddressError && (
                  <span className="text-xs font-mono text-rose-400 mt-1 block">{awardAddressError}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                  Points Amount
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={awardAmount}
                  onChange={(e) => setAwardAmount(e.target.value)}
                  placeholder="10"
                  className="w-full px-3.5 py-2 text-xs rounded-[4px] border border-[#27272a] bg-[#0c0c0e] text-neutral-100 font-mono focus:outline-none focus:border-neutral-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAwarding}
                className="btn-primary text-xs py-2 px-6 cursor-pointer disabled:opacity-50"
              >
                {isAwarding ? "Minting Points on Solana..." : "Award Points"}
              </button>
            </form>
          </div>

          {/* Store Redemption Audit History */}
          <div className="render-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c1c22] pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#71717a] block mb-1">
                  ON-CHAIN AUDIT LOG
                </span>
                <h2 className="text-xl font-normal tracking-tight text-white">
                  Customer Redemption Receipts
                </h2>
              </div>
              <span className="text-xs font-mono text-[#71717a]">
                {receipts ? `${receipts.length} total` : "Loading..."}
              </span>
            </div>

            {receiptsLoading ? (
              <div className="py-6 text-center text-xs font-mono text-[#71717a] animate-pulse">
                Auditing on-chain receipts...
              </div>
            ) : receiptsError ? (
              <div className="py-6 text-center text-xs font-mono text-rose-400">
                Error loading receipts: {receiptsError}
              </div>
            ) : !receipts || receipts.length === 0 ? (
              <div className="py-8 text-center rounded-[4px] bg-[#0c0c0e] border border-dashed border-[#222228] text-xs font-mono text-[#71717a]">
                No redemptions recorded yet for this store.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#222228] text-[#71717a] uppercase bg-[#141418]">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Burned</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3 text-right">Receipt PDA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c22]">
                    {receipts.map((r) => (
                      <tr key={r.pubkey.toBase58()} className="hover:bg-[#141418]/60 transition-colors">
                        <td className="py-3 px-3 text-white">
                          #{r.receiptNumber}
                        </td>
                        <td className="py-3 px-3">
                          <a
                            href={getExplorerAddressUrl(r.customer, "devnet")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {r.customer.toBase58().slice(0, 4)}...{r.customer.toBase58().slice(-4)}
                          </a>
                        </td>
                        <td className="py-3 px-3 text-emerald-400">
                          {r.pointsBurned} pts
                        </td>
                        <td className="py-3 px-3 text-[#a1a1aa] font-sans">
                          {new Date(r.timestamp * 1000).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <a
                            href={getExplorerAddressUrl(r.pubkey, "devnet")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 underline"
                          >
                            {r.pubkey.toBase58().slice(0, 6)}...{r.pubkey.toBase58().slice(-4)}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
