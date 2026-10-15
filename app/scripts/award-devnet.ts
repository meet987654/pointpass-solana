import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { getProgram } from "../src/lib/program";
import { awardPoints } from "../src/lib/actions";
import { RPC_URL, getExplorerTxUrl } from "../src/lib/constants";

function loadKeypair(): Keypair {
  const keypairPath =
    process.env.KEYPAIR_PATH ||
    path.join(os.homedir(), ".config", "solana", "id.json");
  const secretKey = JSON.parse(fs.readFileSync(keypairPath, "utf8"));
  return Keypair.fromSecretKey(new Uint8Array(secretKey));
}

async function main() {
  const customerArg = process.argv[2];
  const amountArg = process.argv[3];

  if (!customerArg || !amountArg) {
    console.error("Usage: yarn award:devnet <customerPubkey> <amount>");
    process.exit(1);
  }

  const customerPubkey = new PublicKey(customerArg);
  const amount = parseInt(amountArg, 10);
  if (isNaN(amount) || amount <= 0) {
    console.error("Amount must be a positive integer.");
    process.exit(1);
  }

  const merchantKeypair = loadKeypair();
  const connection = new Connection(RPC_URL, "confirmed");
  const wallet = new anchor.Wallet(merchantKeypair);
  const program = getProgram(connection, wallet);

  console.log(`=== Awarding Points on Devnet ===`);
  console.log(`Merchant: ${merchantKeypair.publicKey.toBase58()}`);
  console.log(`Customer: ${customerPubkey.toBase58()}`);
  console.log(`Amount:   ${amount} points`);

  const sig = await awardPoints(
    program,
    merchantKeypair.publicKey,
    customerPubkey,
    amount
  );

  console.log(`✔ Points awarded successfully!`);
  console.log(`  Signature: ${sig}`);
  console.log(`  Explorer:  ${getExplorerTxUrl(sig, "devnet")}`);
}

main().catch((err) => {
  console.error("Failed to award points:", err);
  process.exit(1);
});
