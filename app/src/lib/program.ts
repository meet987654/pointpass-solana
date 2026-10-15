import { Connection, Keypair, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Pointpass } from "../idl/pointpass";
import idl from "../idl/pointpass.json";
import { PROGRAM_ID } from "./constants";

export interface WalletAdapterInterface {
  publicKey: PublicKey | null;
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
}

// Dummy read-only wallet so account fetches and RPC simulation work without an active wallet connection
class ReadOnlyWallet implements anchor.Wallet {
  payer: Keypair = Keypair.generate();

  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(): Promise<T> {
    throw new Error("Read-only wallet cannot sign transactions. Please connect a real wallet.");
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(): Promise<T[]> {
    throw new Error("Read-only wallet cannot sign transactions. Please connect a real wallet.");
  }
}

export function getProgram(
  connection: Connection,
  wallet?: anchor.Wallet | WalletAdapterInterface | null
): Program<Pointpass> {
  const effectiveWallet: anchor.Wallet =
    wallet && wallet.publicKey
      ? (wallet as anchor.Wallet)
      : new ReadOnlyWallet();

  const provider = new AnchorProvider(connection, effectiveWallet, {
    commitment: "confirmed",
  });

  // Construct typed Program from synced IDL, overriding address with PROGRAM_ID
  const typedIdl: Idl = {
    ...(idl as unknown as Idl),
    address: PROGRAM_ID.toBase58(),
  };

  return new Program<Pointpass>(typedIdl as Pointpass, provider);
}
