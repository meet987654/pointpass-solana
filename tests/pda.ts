import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";

export const LOYALTY_SEED = Buffer.from("loyalty");
export const MINT_SEED = Buffer.from("mint");
export const REDEMPTION_SEED = Buffer.from("redemption");

export function findLoyaltyProgramPda(merchant: PublicKey, programId: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([LOYALTY_SEED, merchant.toBuffer()], programId);
}

export function findPointsMintPda(loyaltyProgramPda: PublicKey, programId: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([MINT_SEED, loyaltyProgramPda.toBuffer()], programId);
}

export function findCustomerTokenAccount(mint: PublicKey, customer: PublicKey): PublicKey {
  return getAssociatedTokenAddressSync(mint, customer, true);
}

export function findRedemptionReceiptPda(
  loyaltyProgramPda: PublicKey,
  customer: PublicKey,
  redemptionCount: number | bigint | anchor.BN,
  programId: PublicKey
): [PublicKey, number] {
  const countBuffer = Buffer.alloc(8);
  const bn = new anchor.BN(redemptionCount.toString());
  bn.toBuffer("le", 8).copy(countBuffer);
  return PublicKey.findProgramAddressSync(
    [REDEMPTION_SEED, loyaltyProgramPda.toBuffer(), customer.toBuffer(), countBuffer],
    programId
  );
}
