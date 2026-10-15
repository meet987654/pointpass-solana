import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Pointpass } from "../target/types/pointpass";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
} from "@solana/spl-token";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  findLoyaltyProgramPda,
  findPointsMintPda,
  findCustomerTokenAccount,
  findRedemptionReceiptPda,
} from "../tests/pda";

function loadWalletKeypair(): Keypair {
  const walletPath =
    process.env.ANCHOR_WALLET ||
    path.join(os.homedir(), ".config", "solana", "id.json");
  const secretKey = JSON.parse(fs.readFileSync(walletPath, "utf8"));
  return Keypair.fromSecretKey(new Uint8Array(secretKey));
}

async function main() {
  console.log("=== PointPass Devnet Smoke Test ===");

  const idlPath = path.join(__dirname, "../target/idl/pointpass.json");
  const idl = JSON.parse(fs.readFileSync(idlPath, "utf8"));

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const merchant = loadWalletKeypair();
  const wallet = new anchor.Wallet(merchant);
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);

  const program = new Program<Pointpass>(idl as any, provider);
  console.log(`Program ID: ${program.programId.toBase58()}`);
  console.log(`Merchant wallet: ${merchant.publicKey.toBase58()}`);

  const balance = await connection.getBalance(merchant.publicKey);
  console.log(`Merchant balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`);

  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant.publicKey, program.programId);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);
  console.log(`Loyalty Program PDA: ${loyaltyProgramPda.toBase58()}`);
  console.log(`Points Mint PDA: ${pointsMintPda.toBase58()}`);

  // 1. initialize_program (or reuse existing)
  const existingAccount = await connection.getAccountInfo(loyaltyProgramPda);
  if (existingAccount) {
    console.log(
      `\nNotice: Loyalty program already exists on devnet for this merchant at ${loyaltyProgramPda.toBase58()}. Reusing existing program.`
    );
    const existingData = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
    console.log(`  Name: "${existingData.name}"`);
    console.log(`  Reward cost: ${existingData.rewardCost.toString()}`);
    console.log(`  Total awarded: ${existingData.totalAwarded.toString()}`);
    console.log(`  Total redeemed: ${existingData.totalRedeemed.toString()}`);
    console.log(`  Redemption count: ${existingData.redemptionCount.toString()}`);
  } else {
    console.log("\n1. Calling initialize_program on Devnet...");
    const initTx = await program.methods
      .initializeProgram("Bean There Cafe", new anchor.BN(10))
      .accountsStrict({
        merchant: merchant.publicKey,
        loyaltyProgram: loyaltyProgramPda,
        pointsMint: pointsMintPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([merchant])
      .rpc();

    console.log(`✔ initialize_program confirmed: ${initTx}`);
    console.log(`  Explorer: https://explorer.solana.com/tx/${initTx}?cluster=devnet`);
  }

  // 2. Generate and fund a fresh customer
  console.log("\n2. Generating fresh customer...");
  const customer = Keypair.generate();
  console.log(`  Customer pubkey: ${customer.publicKey.toBase58()}`);

  console.log("  Funding customer with 0.02 SOL from merchant wallet (no airdrops)...");
  const fundTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: merchant.publicKey,
      toPubkey: customer.publicKey,
      lamports: 0.02 * LAMPORTS_PER_SOL,
    })
  );
  const fundSig = await sendAndConfirmTransaction(connection, fundTx, [merchant]);
  console.log(`✔ Customer funded: ${fundSig}`);
  console.log(`  Explorer: https://explorer.solana.com/tx/${fundSig}?cluster=devnet`);

  // 3. Award points
  const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);
  const awardAmount = new anchor.BN(20);
  console.log(`\n3. Calling award_points (${awardAmount.toString()} points)...`);
  const awardTx = await program.methods
    .awardPoints(awardAmount)
    .accountsStrict({
      merchant: merchant.publicKey,
      loyaltyProgram: loyaltyProgramPda,
      pointsMint: pointsMintPda,
      customer: customer.publicKey,
      customerTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([merchant])
    .rpc();

  console.log(`✔ award_points confirmed: ${awardTx}`);
  console.log(`  Explorer: https://explorer.solana.com/tx/${awardTx}?cluster=devnet`);

  const balAfterAward = await getAccount(connection, customerTokenAccount);
  console.log(`  Customer points balance: ${balAfterAward.amount.toString()}`);

  // 4. Redeem points
  const currentProgram = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
  const redemptionIndex = currentProgram.redemptionCount;
  const [receiptPda, receiptBump] = findRedemptionReceiptPda(
    loyaltyProgramPda,
    customer.publicKey,
    redemptionIndex,
    program.programId
  );

  console.log(`\n4. Calling redeem (Receipt #${redemptionIndex.toString()})...`);
  const redeemTx = await program.methods
    .redeem()
    .accountsStrict({
      customer: customer.publicKey,
      loyaltyProgram: loyaltyProgramPda,
      pointsMint: pointsMintPda,
      customerTokenAccount,
      receipt: receiptPda,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([customer])
    .rpc();

  console.log(`✔ redeem confirmed: ${redeemTx}`);
  console.log(`  Explorer: https://explorer.solana.com/tx/${redeemTx}?cluster=devnet`);

  const balAfterRedeem = await getAccount(connection, customerTokenAccount);
  console.log(`  Customer points balance after redeem: ${balAfterRedeem.amount.toString()}`);

  const receipt = await program.account.redemptionReceipt.fetch(receiptPda);
  console.log("\n=== Receipt Verification ===");
  console.log(`  Customer: ${receipt.customer.toBase58()}`);
  console.log(`  Points burned: ${receipt.pointsBurned.toString()}`);
  console.log(`  Receipt number: ${receipt.receiptNumber.toString()}`);
  console.log(`  Timestamp: ${new Date(receipt.timestamp.toNumber() * 1000).toISOString()}`);
  console.log(`  Receipt PDA: https://explorer.solana.com/address/${receiptPda.toBase58()}?cluster=devnet`);

  console.log("\n✔ Devnet smoke test completed successfully!");
}

main().catch((err) => {
  console.error("Error during devnet smoke test:", err);
  process.exit(1);
});
