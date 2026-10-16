import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Pointpass } from "../idl/pointpass";
import {
  findLoyaltyProgramPda,
  findPointsMintPda,
  findCustomerAta,
  findReceiptPda,
} from "./pda";

export async function initializeProgram(
  program: Program<Pointpass>,
  merchant: PublicKey,
  name: string,
  rewardCost: number | bigint | anchor.BN
): Promise<string> {
  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant, program.programId);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);
  const bnRewardCost = new anchor.BN(rewardCost.toString());

  return await program.methods
    .initializeProgram(name, bnRewardCost)
    .accountsStrict({
      merchant,
      loyaltyProgram: loyaltyProgramPda,
      pointsMint: pointsMintPda,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

export async function awardPoints(
  program: Program<Pointpass>,
  merchant: PublicKey,
  customer: PublicKey,
  amount: number | bigint | anchor.BN
): Promise<string> {
  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant, program.programId);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);
  const customerTokenAccount = findCustomerAta(pointsMintPda, customer);
  const bnAmount = new anchor.BN(amount.toString());

  return await program.methods
    .awardPoints(bnAmount)
    .accountsStrict({
      merchant,
      loyaltyProgram: loyaltyProgramPda,
      pointsMint: pointsMintPda,
      customer,
      customerTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

export async function redeemPoints(
  program: Program<Pointpass>,
  customer: PublicKey,
  merchant: PublicKey
): Promise<string> {
  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant, program.programId);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);
  const customerTokenAccount = findCustomerAta(pointsMintPda, customer);

  const attemptRedeem = async (): Promise<string> => {
    // Read the CURRENT redemption_count right before building the transaction
    const loyaltyProgramAccount = await program.account.loyaltyProgram.fetch(
      loyaltyProgramPda
    );
    const redemptionIndex = loyaltyProgramAccount.redemptionCount;
    const [receiptPda] = findReceiptPda(
      loyaltyProgramPda,
      customer,
      redemptionIndex,
      program.programId
    );

    return await program.methods
      .redeem()
      .accountsStrict({
        customer,
        loyaltyProgram: loyaltyProgramPda,
        pointsMint: pointsMintPda,
        customerTokenAccount,
        receipt: receiptPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  };

  try {
    return await attemptRedeem();
  } catch (err: unknown) {
    if (isConstraintSeedsError(err)) {
      // Stale redemption_count because another redemption landed first; retry exactly once
      return await attemptRedeem();
    }
    throw err;
  }
}

function isConstraintSeedsError(err: unknown): boolean {
  if (!err) return false;
  const errObj = typeof err === "object" ? (err as Record<string, unknown>) : {};
  const nestedError = errObj.error as
    | { errorCode?: { code?: string; number?: number } }
    | undefined;

  if (
    nestedError?.errorCode?.code === "ConstraintSeeds" ||
    nestedError?.errorCode?.number === 2006
  ) {
    return true;
  }

  if (errObj.code === "ConstraintSeeds" || errObj.code === 2006) {
    return true;
  }

  const msg =
    typeof err === "string" ? err : (errObj.message as string) || String(err);
  if (msg.includes("ConstraintSeeds") || msg.includes("2006")) {
    return true;
  }

  if (Array.isArray(errObj.logs)) {
    const logs = errObj.logs as string[];
    return logs.some((l) => l.includes("ConstraintSeeds") || l.includes("2006"));
  }

  return false;
}
