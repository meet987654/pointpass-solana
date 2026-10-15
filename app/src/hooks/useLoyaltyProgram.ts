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

  const fetchProgramData = useCallback(async () => {
    if (!merchant) {
      setData(null);
      setError(null);
      return;
    }
    try {
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant);
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
    }
  }, [connection, merchant]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchProgramData();
    setLoading(false);
  }, [fetchProgramData]);

  useEffect(() => {
    let ignore = false;
    async function init() {
      setLoading(true);
      await fetchProgramData();
      if (!ignore) {
        setLoading(false);
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, [fetchProgramData]);

  return { data, loading, error, refresh };
}
