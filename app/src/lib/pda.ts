import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";
import { PROGRAM_ID } from "./constants";

// Canonical PDA seed prefixes.
// CRITICAL: These seed constants MUST match programs/pointpass/src/constants.rs exactly:
//   LOYALTY_PROGRAM_SEED: &[u8] = b"loyalty"
//   POINTS_MINT_SEED: &[u8] = b"mint"
//   REDEMPTION_SEED: &[u8] = b"redemption"
export const LOYALTY_PROGRAM_SEED = Buffer.from("loyalty");
export const POINTS_MINT_SEED = Buffer.from("mint");
export const REDEMPTION_SEED = Buffer.from("redemption");

export function findLoyaltyProgramPda(
  merchant: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [LOYALTY_PROGRAM_SEED, merchant.toBuffer()],
    programId
  );
}

export function findPointsMintPda(
  loyaltyProgram: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [POINTS_MINT_SEED, loyaltyProgram.toBuffer()],
    programId
  );
}

export function findReceiptPda(
  loyaltyProgram: PublicKey,
  customer: PublicKey,
  index: number | bigint | anchor.BN,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  const countBuffer = Buffer.alloc(8);
  const bn = new anchor.BN(index.toString());
  bn.toBuffer("le", 8).copy(countBuffer);

  return PublicKey.findProgramAddressSync(
    [REDEMPTION_SEED, loyaltyProgram.toBuffer(), customer.toBuffer(), countBuffer],
    programId
  );
}

export function findCustomerAta(
  mint: PublicKey,
  owner: PublicKey
): PublicKey {
  return getAssociatedTokenAddressSync(mint, owner, true);
}
