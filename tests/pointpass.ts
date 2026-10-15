import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Pointpass } from "../target/types/pointpass";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getMint,
  getAccount,
} from "@solana/spl-token";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import {
  findLoyaltyProgramPda,
  findPointsMintPda,
  findCustomerTokenAccount,
  findRedemptionReceiptPda,
} from "./pda";

describe("pointpass", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Pointpass as Program<Pointpass>;

  // Helper to create and fund a fresh keypair
  async function createFundedKeypair(sol = 2): Promise<Keypair> {
    const keypair = Keypair.generate();
    const sig = await provider.connection.requestAirdrop(
      keypair.publicKey,
      sol * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig);
    return keypair;
  }

  // Helper to initialize a program for a given merchant
  async function initializeMerchantProgram(
    merchant: Keypair,
    name = "Bean There Cafe",
    rewardCost = new anchor.BN(100)
  ) {
    const [loyaltyProgramPda, loyaltyBump] = findLoyaltyProgramPda(
      merchant.publicKey,
      program.programId
    );
    const [pointsMintPda, mintBump] = findPointsMintPda(
      loyaltyProgramPda,
      program.programId
    );

    await program.methods
      .initializeProgram(name, rewardCost)
      .accountsStrict({
        merchant: merchant.publicKey,
        loyaltyProgram: loyaltyProgramPda,
        pointsMint: pointsMintPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([merchant])
      .rpc();

    return { loyaltyProgramPda, loyaltyBump, pointsMintPda, mintBump };
  }

  describe("Phase 1: initialize_program", () => {
    it("Initializes loyalty program and zero-decimal points mint successfully", async () => {
      const merchant = await createFundedKeypair();
      const programName = "Bean There Cafe";
      const rewardCost = new anchor.BN(100);

      const { loyaltyProgramPda, loyaltyBump, pointsMintPda, mintBump } =
        await initializeMerchantProgram(merchant, programName, rewardCost);

      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.merchant.toBase58()).to.equal(merchant.publicKey.toBase58());
      expect(loyaltyAccount.pointsMint.toBase58()).to.equal(pointsMintPda.toBase58());
      expect(loyaltyAccount.name).to.equal(programName);
      expect(loyaltyAccount.rewardCost.toNumber()).to.equal(100);
      expect(loyaltyAccount.totalAwarded.toNumber()).to.equal(0);
      expect(loyaltyAccount.totalRedeemed.toNumber()).to.equal(0);
      expect(loyaltyAccount.redemptionCount.toNumber()).to.equal(0);
      expect(loyaltyAccount.bump).to.equal(loyaltyBump);
      expect(loyaltyAccount.mintBump).to.equal(mintBump);

      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.decimals).to.equal(0);
      expect(mintInfo.mintAuthority?.toBase58()).to.equal(loyaltyProgramPda.toBase58());
      expect(mintInfo.isInitialized).to.be.true;
      expect(mintInfo.supply).to.equal(0n);
    });

    it("Fails to re-initialize an existing loyalty program for the same merchant", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      try {
        await program.methods
          .initializeProgram("Bean There Cafe Second Attempt", new anchor.BN(50))
          .accountsStrict({
            merchant: merchant.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([merchant])
          .rpc();
        expect.fail("Should have failed to re-initialize existing program");
      } catch (err: any) {
        const isAlreadyInUse =
          err.message?.includes("already in use") ||
          err.logs?.some((log: string) => log.includes("already in use"));
        expect(isAlreadyInUse, "Expected 'already in use' collision error").to.be.true;
      }
    });

    it("Fails to initialize with an empty merchant name", async () => {
      const merchant = await createFundedKeypair();
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant.publicKey, program.programId);
      const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);

      try {
        await program.methods
          .initializeProgram("", new anchor.BN(100))
          .accountsStrict({
            merchant: merchant.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([merchant])
          .rpc();
        expect.fail("Should have failed with NameEmpty error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("NameEmpty");
        expect(err.error?.errorCode?.number).to.equal(6000);
      }
    });

    it("Fails to initialize with name exceeding maximum length (32 bytes)", async () => {
      const merchant = await createFundedKeypair();
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant.publicKey, program.programId);
      const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);

      const overlyLongName = "A".repeat(33); // 33 ASCII bytes > 32 MAX_NAME_LENGTH

      try {
        await program.methods
          .initializeProgram(overlyLongName, new anchor.BN(100))
          .accountsStrict({
            merchant: merchant.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([merchant])
          .rpc();
        expect.fail("Should have failed with NameTooLong error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("NameTooLong");
        expect(err.error?.errorCode?.number).to.equal(6001);
      }
    });

    it("Fails to initialize with zero reward cost", async () => {
      const merchant = await createFundedKeypair();
      const [loyaltyProgramPda] = findLoyaltyProgramPda(merchant.publicKey, program.programId);
      const [pointsMintPda] = findPointsMintPda(loyaltyProgramPda, program.programId);

      try {
        await program.methods
          .initializeProgram("Bean There Cafe", new anchor.BN(0))
          .accountsStrict({
            merchant: merchant.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([merchant])
          .rpc();
        expect.fail("Should have failed with InvalidRewardCost error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("InvalidRewardCost");
        expect(err.error?.errorCode?.number).to.equal(6002);
      }
    });
  });

  describe("Phase 2: award_points", () => {
    it("Award succeeds: customer token balance, mint supply, and total_awarded match amount", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      const customer = Keypair.generate();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      const awardAmount = new anchor.BN(50);

      await program.methods
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

      const tokenAccountInfo = await getAccount(provider.connection, customerTokenAccount);
      expect(tokenAccountInfo.amount).to.equal(50n);

      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(50n);

      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalAwarded.toNumber()).to.equal(50);
    });

    it("Two awards to the same customer: balance and total_awarded are the sum, and token account is created only once", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      const customer = Keypair.generate();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      // First award (creates ATA)
      await program.methods
        .awardPoints(new anchor.BN(40))
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

      const accountAfterFirst = await getAccount(provider.connection, customerTokenAccount);
      expect(accountAfterFirst.amount).to.equal(40n);

      // Second award (reuses existing ATA)
      await program.methods
        .awardPoints(new anchor.BN(60))
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

      const accountAfterSecond = await getAccount(provider.connection, customerTokenAccount);
      expect(accountAfterSecond.amount).to.equal(100n);

      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(100n);

      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalAwarded.toNumber()).to.equal(100);
    });

    it("Award to a second customer: balances are independent", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      const customer1 = Keypair.generate();
      const customer2 = Keypair.generate();

      const ata1 = findCustomerTokenAccount(pointsMintPda, customer1.publicKey);
      const ata2 = findCustomerTokenAccount(pointsMintPda, customer2.publicKey);

      await program.methods
        .awardPoints(new anchor.BN(30))
        .accountsStrict({
          merchant: merchant.publicKey,
          loyaltyProgram: loyaltyProgramPda,
          pointsMint: pointsMintPda,
          customer: customer1.publicKey,
          customerTokenAccount: ata1,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([merchant])
        .rpc();

      await program.methods
        .awardPoints(new anchor.BN(70))
        .accountsStrict({
          merchant: merchant.publicKey,
          loyaltyProgram: loyaltyProgramPda,
          pointsMint: pointsMintPda,
          customer: customer2.publicKey,
          customerTokenAccount: ata2,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([merchant])
        .rpc();

      const account1 = await getAccount(provider.connection, ata1);
      const account2 = await getAccount(provider.connection, ata2);

      expect(account1.amount).to.equal(30n);
      expect(account2.amount).to.equal(70n);

      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(100n);

      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalAwarded.toNumber()).to.equal(100);
    });

    it("Unauthorized: a different signer using the real loyalty_program PDA fails with Unauthorized", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      const unauthorizedSigner = await createFundedKeypair();
      const customer = Keypair.generate();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      try {
        await program.methods
          .awardPoints(new anchor.BN(25))
          .accountsStrict({
            merchant: unauthorizedSigner.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            customer: customer.publicKey,
            customerTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([unauthorizedSigner])
          .rpc();
        expect.fail("Should have failed with Unauthorized error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("Unauthorized");
        expect(err.error?.errorCode?.number).to.equal(6003);
      }
    });

    it("Zero amount fails with InvalidAmount", async () => {
      const merchant = await createFundedKeypair();
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(merchant);

      const customer = Keypair.generate();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      try {
        await program.methods
          .awardPoints(new anchor.BN(0))
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
        expect.fail("Should have failed with InvalidAmount error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("InvalidAmount");
        expect(err.error?.errorCode?.number).to.equal(6004);
      }
    });
  });

  describe("Phase 3: redeem", () => {
    it("Redeem below cost fails with InsufficientPoints (assert code)", async () => {
      const merchant = await createFundedKeypair();
      const rewardCost = new anchor.BN(100);
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(
        merchant,
        "Bean There Cafe",
        rewardCost
      );

      const customer = await createFundedKeypair();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      // Award only 50 points (less than 100 reward_cost)
      await program.methods
        .awardPoints(new anchor.BN(50))
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

      const [receiptPda] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customer.publicKey,
        0,
        program.programId
      );

      try {
        await program.methods
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
        expect.fail("Should have failed with InsufficientPoints error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("InsufficientPoints");
        expect(err.error?.errorCode?.number).to.equal(6005);
      }
    });

    it("Success: token balance drops by exactly reward_cost, mint supply drops by the same amount, receipt fields are correct, total_redeemed and redemption_count updated", async () => {
      const merchant = await createFundedKeypair();
      const rewardCost = new anchor.BN(100);
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(
        merchant,
        "Bean There Cafe",
        rewardCost
      );

      const customer = await createFundedKeypair();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      // Award 150 points
      await program.methods
        .awardPoints(new anchor.BN(150))
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

      const [receiptPda, receiptBump] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customer.publicKey,
        0,
        program.programId
      );

      await program.methods
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

      // Verify token account balance dropped by 100
      const tokenAccount = await getAccount(provider.connection, customerTokenAccount);
      expect(tokenAccount.amount).to.equal(50n);

      // Verify mint supply dropped by 100
      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(50n);

      // Verify receipt stored state
      const receipt = await program.account.redemptionReceipt.fetch(receiptPda);
      expect(receipt.customer.toBase58()).to.equal(customer.publicKey.toBase58());
      expect(receipt.loyaltyProgram.toBase58()).to.equal(loyaltyProgramPda.toBase58());
      expect(receipt.pointsBurned.toNumber()).to.equal(100);
      expect(receipt.receiptNumber.toNumber()).to.equal(0);
      expect(receipt.timestamp.toNumber()).to.be.greaterThan(0);
      expect(receipt.bump).to.equal(receiptBump);

      // Verify loyalty_program counters
      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalRedeemed.toNumber()).to.equal(100);
      expect(loyaltyAccount.redemptionCount.toNumber()).to.equal(1);
    });

    it("Two redemptions by the same customer create two distinct receipts (index 0 and 1), counters are 2, and balance dropped by 2 x reward_cost", async () => {
      const merchant = await createFundedKeypair();
      const rewardCost = new anchor.BN(40);
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(
        merchant,
        "Bean There Cafe",
        rewardCost
      );

      const customer = await createFundedKeypair();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      // Award 100 points
      await program.methods
        .awardPoints(new anchor.BN(100))
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

      // First redemption (index 0)
      const [receiptPda0] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customer.publicKey,
        0,
        program.programId
      );
      await program.methods
        .redeem()
        .accountsStrict({
          customer: customer.publicKey,
          loyaltyProgram: loyaltyProgramPda,
          pointsMint: pointsMintPda,
          customerTokenAccount,
          receipt: receiptPda0,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([customer])
        .rpc();

      const accountAfterFirst = await getAccount(provider.connection, customerTokenAccount);
      expect(accountAfterFirst.amount).to.equal(60n);

      // Second redemption (index 1)
      const [receiptPda1] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customer.publicKey,
        1,
        program.programId
      );
      await program.methods
        .redeem()
        .accountsStrict({
          customer: customer.publicKey,
          loyaltyProgram: loyaltyProgramPda,
          pointsMint: pointsMintPda,
          customerTokenAccount,
          receipt: receiptPda1,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([customer])
        .rpc();

      const accountAfterSecond = await getAccount(provider.connection, customerTokenAccount);
      expect(accountAfterSecond.amount).to.equal(20n); // 100 - (2 * 40) = 20

      // Verify two distinct receipts
      const receipt0 = await program.account.redemptionReceipt.fetch(receiptPda0);
      const receipt1 = await program.account.redemptionReceipt.fetch(receiptPda1);
      expect(receipt0.receiptNumber.toNumber()).to.equal(0);
      expect(receipt1.receiptNumber.toNumber()).to.equal(1);
      expect(receipt0.pointsBurned.toNumber()).to.equal(40);
      expect(receipt1.pointsBurned.toNumber()).to.equal(40);

      // Verify global counters
      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalRedeemed.toNumber()).to.equal(80);
      expect(loyaltyAccount.redemptionCount.toNumber()).to.equal(2);

      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(20n);
    });

    it("Customer cannot burn from another customer token account (constraint error asserted)", async () => {
      const merchant = await createFundedKeypair();
      const rewardCost = new anchor.BN(50);
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(
        merchant,
        "Bean There Cafe",
        rewardCost
      );

      const customerA = await createFundedKeypair();
      const ataA = findCustomerTokenAccount(pointsMintPda, customerA.publicKey);

      // Award 100 points to customer A
      await program.methods
        .awardPoints(new anchor.BN(100))
        .accountsStrict({
          merchant: merchant.publicKey,
          loyaltyProgram: loyaltyProgramPda,
          pointsMint: pointsMintPda,
          customer: customerA.publicKey,
          customerTokenAccount: ataA,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .signers([merchant])
        .rpc();

      // Customer B (attacker) attempts to burn from Customer A's token account
      const customerB = await createFundedKeypair();
      const [receiptPda] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customerB.publicKey,
        0,
        program.programId
      );

      try {
        await program.methods
          .redeem()
          .accountsStrict({
            customer: customerB.publicKey,
            loyaltyProgram: loyaltyProgramPda,
            pointsMint: pointsMintPda,
            customerTokenAccount: ataA, // Customer A's token account!
            receipt: receiptPda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .signers([customerB])
          .rpc();
        expect.fail("Should have failed with token authority constraint error");
      } catch (err: any) {
        expect(err.error?.errorCode?.code).to.equal("ConstraintTokenOwner");
        expect(err.error?.errorCode?.number).to.equal(2015);
      }
    });

    it("Redeem with exactly reward_cost points leaves balance 0 and succeeds", async () => {
      const merchant = await createFundedKeypair();
      const rewardCost = new anchor.BN(75);
      const { loyaltyProgramPda, pointsMintPda } = await initializeMerchantProgram(
        merchant,
        "Bean There Cafe",
        rewardCost
      );

      const customer = await createFundedKeypair();
      const customerTokenAccount = findCustomerTokenAccount(pointsMintPda, customer.publicKey);

      // Award exactly 75 points
      await program.methods
        .awardPoints(rewardCost)
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

      const [receiptPda, receiptBump] = findRedemptionReceiptPda(
        loyaltyProgramPda,
        customer.publicKey,
        0,
        program.programId
      );

      await program.methods
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

      // Verify token account balance is exactly 0
      const tokenAccount = await getAccount(provider.connection, customerTokenAccount);
      expect(tokenAccount.amount).to.equal(0n);

      // Verify mint supply is 0
      const mintInfo = await getMint(provider.connection, pointsMintPda);
      expect(mintInfo.supply).to.equal(0n);

      // Verify receipt state
      const receipt = await program.account.redemptionReceipt.fetch(receiptPda);
      expect(receipt.pointsBurned.toNumber()).to.equal(75);
      expect(receipt.receiptNumber.toNumber()).to.equal(0);
      expect(receipt.bump).to.equal(receiptBump);

      const loyaltyAccount = await program.account.loyaltyProgram.fetch(loyaltyProgramPda);
      expect(loyaltyAccount.totalRedeemed.toNumber()).to.equal(75);
      expect(loyaltyAccount.redemptionCount.toNumber()).to.equal(1);
    });
  });
});
