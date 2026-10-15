import { Connection, PublicKey } from "@solana/web3.js";
import { findLoyaltyProgramPda, findPointsMintPda } from "../src/lib/pda";
import { getProgram } from "../src/lib/program";
import { RPC_URL } from "../src/lib/constants";

async function main() {
  console.log("=== Running Devnet Client Verification (app/scripts/check-devnet.ts) ===");

  const connection = new Connection(RPC_URL, "confirmed");
  const merchantPubkey = new PublicKey("9uLNjJt3aqNARjYz87NLL1EuYzrnD3hcqpEHnS6q2zy1");

  // (a) Derive Loyalty PDA and Mint PDA and ASSERT they equal expected values
  const [loyaltyProgramPda] = findLoyaltyProgramPda(merchantPubkey);
  const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda);

  const EXPECTED_LOYALTY_PDA = "5zD7UunBieDtugGufZghXxgAprXbZYsh7g8pqVqq33Pw";
  const EXPECTED_MINT_PDA = "2igXN98F6MWzAn8V9ey9moTK8ik7U1fMDaWLbJjXU2ER";

  console.log("\n(a) Asserting PDA Derivation:");
  console.log(`  Derived Loyalty Program PDA: ${loyaltyProgramPda.toBase58()}`);
  console.log(`  Expected Loyalty Program PDA: ${EXPECTED_LOYALTY_PDA}`);
  if (loyaltyProgramPda.toBase58() !== EXPECTED_LOYALTY_PDA) {
    console.error("FAIL: Loyalty Program PDA does not match expected address!");
    process.exit(1);
  }
  console.log("  ✔ Loyalty Program PDA matches expected address.");

  console.log(`  Derived Points Mint PDA:     ${pointsMintPda.toBase58()}`);
  console.log(`  Expected Points Mint PDA:     ${EXPECTED_MINT_PDA}`);
  if (pointsMintPda.toBase58() !== EXPECTED_MINT_PDA) {
    console.error("FAIL: Points Mint PDA does not match expected address!");
    process.exit(1);
  }
  console.log("  ✔ Points Mint PDA matches expected address.");

  // (b) Fetch LoyaltyProgram account from devnet using read-only getProgram
  console.log("\n(b) Fetching LoyaltyProgram account from Devnet (Read-only client):");
  const program = getProgram(connection); // No wallet provided
  const programAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);

  console.log(`  Name:             "${programAccount.name}"`);
  console.log(`  Reward cost:      ${programAccount.rewardCost.toString()}`);
  console.log(`  Total awarded:    ${programAccount.totalAwarded.toString()}`);
  console.log(`  Total redeemed:   ${programAccount.totalRedeemed.toString()}`);
  console.log(`  Redemption count: ${programAccount.redemptionCount.toString()}`);

  if (programAccount.name !== "Bean There Cafe") {
    console.error(`FAIL: Expected name "Bean There Cafe", got "${programAccount.name}"`);
    process.exit(1);
  }
  if (programAccount.rewardCost.toNumber() !== 10) {
    console.error(`FAIL: Expected reward_cost 10, got ${programAccount.rewardCost.toString()}`);
    process.exit(1);
  }
  console.log("  ✔ LoyaltyProgram state matches expected values.");

  // (c) Fetch all RedemptionReceipt accounts for that program using memcmp filters
  // Account layout:
  //   Offset 0..8: Anchor 8-byte discriminator
  //   Offset 8..40: customer (Pubkey, 32 bytes)
  //   Offset 40..72: loyalty_program (Pubkey, 32 bytes)
  console.log("\n(c) Fetching RedemptionReceipt accounts via memcmp filters:");
  console.log(`  Filtering by loyalty_program at byte offset 40 (${loyaltyProgramPda.toBase58()})...`);
  const receipts = await program.account.redemptionReceipt.all([
    {
      memcmp: {
        offset: 40,
        bytes: loyaltyProgramPda.toBase58(),
      },
    },
  ]);

  console.log(`  Found ${receipts.length} receipt(s) on Devnet:`);
  receipts.sort(
    (a, b) => a.account.receiptNumber.toNumber() - b.account.receiptNumber.toNumber()
  );

  for (const r of receipts) {
    console.log(
      `  - Receipt #${r.account.receiptNumber.toString()}: Customer=${r.account.customer.toBase58()} PointsBurned=${r.account.pointsBurned.toString()} (Timestamp=${new Date(
        r.account.timestamp.toNumber() * 1000
      ).toISOString()})`
    );
  }

  // If receipts exist, also verify customer filter at offset 8
  if (receipts.length > 0) {
    const sampleCustomer = receipts[0].account.customer;
    console.log(`\n  Verifying customer memcmp filter at byte offset 8 for ${sampleCustomer.toBase58()}...`);
    const customerReceipts = await program.account.redemptionReceipt.all([
      { memcmp: { offset: 8, bytes: sampleCustomer.toBase58() } },
      { memcmp: { offset: 40, bytes: loyaltyProgramPda.toBase58() } },
    ]);
    console.log(`  ✔ Found ${customerReceipts.length} matching receipt(s) with compound filters.`);
  }

  console.log("\n✔ All assertions passed successfully!");
}

main().catch((err) => {
  console.error("Error executing check-devnet.ts:", err);
  process.exit(1);
});
