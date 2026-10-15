import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { getProgram } from "@/lib/program";
import { findLoyaltyProgramPda, findPointsMintPda } from "@/lib/pda";

export interface LoyaltyProgramData {
  name: string;
  rewardCost: number;
  totalAwarded: number;
  totalRedeemed: number;
  redemptionCount: number;
  programPda: PublicKey;
  mintPda: PublicKey;
}

export function useLoyaltyProgram(merchant: PublicKey | null) {
  const { connection } = useConnection();
  const [data, setData] = useState<LoyaltyProgramData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const merchantKey = merchant ? merchant.toBase58() : null;

  const fetchProgramData = useCallback(async () => {
    if (!merchantKey) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    try {
      const merchantPubkey = new PublicKey(merchantKey);
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchantPubkey);
      const [mintPda] = findPointsMintPda(loyaltyProgramPda);
      const program = getProgram(connection);

      const account = await program.account.loyaltyProgram.fetchNullable(
        loyaltyProgramPda
      );

      if (!account) {
        setData(null);
      } else {
        setData({
          name: account.name,
          rewardCost: account.rewardCost.toNumber(),
          totalAwarded: account.totalAwarded.toNumber(),
          totalRedeemed: account.totalRedeemed.toNumber(),
          redemptionCount: account.redemptionCount.toNumber(),
          programPda: loyaltyProgramPda,
          mintPda,
        });
      }
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching loyalty program:", err);
      setError(err instanceof Error ? err.message : String(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [connection, merchantKey]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchProgramData();
  }, [fetchProgramData]);

  useEffect(() => {
    let ignore = false;
    fetchProgramData().finally(() => {
      if (!ignore) {
        setLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchProgramData]);

  return { data, loading, error, refresh };
}
