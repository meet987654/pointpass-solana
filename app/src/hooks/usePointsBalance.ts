import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import {
  findLoyaltyProgramPda,
  findPointsMintPda,
  findCustomerAta,
} from "@/lib/pda";

export function usePointsBalance(
  merchant: PublicKey | null,
  customer: PublicKey | null
) {
  const { connection } = useConnection();
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const merchantKey = merchant ? merchant.toBase58() : null;
  const customerKey = customer ? customer.toBase58() : null;

  const fetchBalanceData = useCallback(async () => {
    if (!merchantKey || !customerKey) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    try {
      const merchantPubkey = new PublicKey(merchantKey);
      const customerPubkey = new PublicKey(customerKey);
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchantPubkey);
      const [mintPda] = findPointsMintPda(loyaltyProgramPda);
      const customerAta = findCustomerAta(mintPda, customerPubkey);

      try {
        const tokenAccount = await getAccount(connection, customerAta);
        setData(Number(tokenAccount.amount));
      } catch (err: unknown) {
        // Missing token account means 0 balance, not an error
        if (
          err instanceof TokenAccountNotFoundError ||
          err instanceof TokenInvalidAccountOwnerError ||
          (typeof err === "object" &&
            err !== null &&
            (err as { name?: string }).name === "TokenAccountNotFoundError") ||
          (err instanceof Error &&
            (err.message.includes("could not find account") ||
              err.message.includes("does not exist") ||
              err.message.includes("could not find")))
        ) {
          setData(0);
        } else {
          throw err;
        }
      }
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching points balance:", err);
      setError(err instanceof Error ? err.message : String(err));
      setData(0);
    } finally {
      setLoading(false);
    }
  }, [connection, merchantKey, customerKey]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchBalanceData();
  }, [fetchBalanceData]);

  useEffect(() => {
    let ignore = false;
    fetchBalanceData().finally(() => {
      if (!ignore) {
        setLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchBalanceData]);

  return { data, loading, error, refresh };
}
