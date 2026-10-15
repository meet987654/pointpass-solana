import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { getProgram } from "@/lib/program";
import { findLoyaltyProgramPda } from "@/lib/pda";

export interface ReceiptItem {
  pubkey: PublicKey;
  receiptNumber: number;
  pointsBurned: number;
  timestamp: number;
}

export function useReceipts(
  merchant: PublicKey | null,
  customer: PublicKey | null
) {
  const { connection } = useConnection();
  const [data, setData] = useState<ReceiptItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const merchantKey = merchant ? merchant.toBase58() : null;
  const customerKey = customer ? customer.toBase58() : null;

  const fetchReceiptsData = useCallback(async () => {
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
      const program = getProgram(connection);

      // Filter customer at byte offset 8, and loyalty_program at byte offset 40
      const accounts = await program.account.redemptionReceipt.all([
        {
          memcmp: {
            offset: 8,
            bytes: customerPubkey.toBase58(),
          },
        },
        {
          memcmp: {
            offset: 40,
            bytes: loyaltyProgramPda.toBase58(),
          },
        },
      ]);

      // Sort newest first
      accounts.sort(
        (a, b) =>
          b.account.receiptNumber.toNumber() -
          a.account.receiptNumber.toNumber()
      );

      const items: ReceiptItem[] = accounts.map((acc) => ({
        pubkey: acc.publicKey,
        receiptNumber: acc.account.receiptNumber.toNumber(),
        pointsBurned: acc.account.pointsBurned.toNumber(),
        timestamp: acc.account.timestamp.toNumber(),
      }));

      setData(items);
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching redemption receipts:", err);
      setError(err instanceof Error ? err.message : String(err));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [connection, merchantKey, customerKey]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchReceiptsData();
  }, [fetchReceiptsData]);

  useEffect(() => {
    let ignore = false;
    fetchReceiptsData().finally(() => {
      if (!ignore) {
        setLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchReceiptsData]);

  return { data, loading, error, refresh };
}
