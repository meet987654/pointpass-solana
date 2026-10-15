import * as anchor from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { getProgram } from "../src/lib/program";
import { awardPoints, redeemPoints } from "../src/lib/actions";
import {
  findLoyaltyProgramPda,
  findPointsMintPda,
  findCustomerAta,
} from "../src/lib/pda";
import { RPC_URL, getExplorerTxUrl, getExplorerAddressUrl } from "../src/lib/constants";

function loadKeypair(): Keypair {
  const keypairPath =
    process.env.KEYPAIR_PATH ||
    path.join(os.homedir(), ".config", "solana", "id.json");
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  return Keypair.fromSecretKey(new Uint8Array(secretKey));
}

async function main() {
  console.log("=== PointPass Headless Redeem Verification (app/scripts/check-redeem.ts) ===");

  const connection = new Connection(RPC_URL, "confirmed");
  const merchantKeypair = loadKeypair();
  const merchantWallet = new anchor.Wallet(merchantKeypair);
  const merchantProgram = getProgram(connection, merchantWallet);

  console.log(`Merchant CLI Wallet: ${merchantKeypair.publicKey.toBase58()}`);

  // 1. Generate a fresh customer keypair
  const customerKeypair = Keypair.generate();
  console.log(`Generated Fresh Customer: ${customerKeypair.publicKey.toBase58()}`);

  // 2. Fund customer 0.02 SOL from merchant wallet (no airdrops)
  console.log("Funding customer with 0.02 SOL from merchant wallet...");
  const fundTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: merchantKeypair.publicKey,
      toPubkey: customerKeypair.publicKey,
      lamports: 0.02 * LAMPORTS_PER_SOL,
    })
  );
  const fundSig = await sendAndConfirmTransaction(connection, fundTx, [merchantKeypair]);
  console.log(`✔ Funding confirmed: ${fundSig}`);
  console.log(`  Explorer: ${getExplorerTxUrl(fundSig, "devnet")}`);

  // 3. Award 10 points with actions.awardPoints
  console.log("Awarding 10 points using actions.awardPoints...");
  const awardSig = await awardPoints(
    merchantProgram,
    merchantKeypair.publicKey,
    customerKeypair.publicKey,
    10
  );
  console.log(`✔ Award confirmed: ${awardSig}`);
  console.log(`  Explorer: ${getExplorerTxUrl(awardSig, "devnet")}`);

  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchantKeypair.publicKey);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda);
  const customerAta = findCustomerAta(pointsMintPda, customerKeypair.publicKey);

  const balAfterAward = await getAccount(connection, customerAta);
  console.log(`Customer balance after award: ${balAfterAward.amount.toString()}`);

  // 4. Redeem with actions.redeemPoints (customer signs)
  console.log("Redeeming points using actions.redeemPoints (customer signing)...");
  const customerWallet = new anchor.Wallet(customerKeypair);
  const customerProgram = getProgram(connection, customerWallet);

  const redeemSig = await redeemPoints(
    customerProgram,
    customerKeypair.publicKey,
    merchantKeypair.publicKey
  );
  console.log(`✔ Redeem confirmed: ${redeemSig}`);
  console.log(`  Explorer: ${getExplorerTxUrl(redeemSig, "devnet")}`);

  // 5. ASSERT customer points balance is 0
  const balAfterRedeem = await getAccount(connection, customerAta);
  console.log(`Customer balance after redeem: ${balAfterRedeem.amount.toString()}`);
  if (balAfterRedeem.amount !== BigInt(0)) {
    console.error(`FAIL: Expected balance 0, got ${balAfterRedeem.amount.toString()}`);
    process.exit(1);
  }
  console.log("✔ ASSERTION PASSED: Customer balance is 0.");

  // 6. ASSERT a new receipt exists for that customer via memcmp filters
  console.log("Verifying receipt on devnet via memcmp filters (offset 8 = customer, offset 40 = loyalty_program)...");
  const receipts = await merchantProgram.account.redemptionReceipt.all([
    {
      memcmp: {
        offset: 8,
        bytes: customerKeypair.publicKey.toBase58(),
      },
    },
    {
      memcmp: {
        offset: 40,
        bytes: loyaltyProgramPda.toBase58(),
      },
    },
  ]);

  if (receipts.length === 0) {
    console.error("FAIL: No redemption receipt found on devnet for customer!");
    process.exit(1);
  }

  const latestReceipt = receipts[0];
  console.log(`✔ ASSERTION PASSED: Found receipt #${latestReceipt.account.receiptNumber.toString()}!`);
  console.log(`  Receipt PDA:   ${latestReceipt.publicKey.toBase58()}`);
  console.log(`  Points burned: ${latestReceipt.account.pointsBurned.toString()}`);
  console.log(`  Timestamp:     ${new Date(latestReceipt.account.timestamp.toNumber() * 1000).toISOString()}`);
  console.log(`  Explorer:      ${getExplorerAddressUrl(latestReceipt.publicKey, "devnet")}`);

  console.log("\n✔ All headless redeem checks completed successfully!");
}

main().catch((err) => {
  console.error("check-redeem error:", err);
  process.exit(1);
});
