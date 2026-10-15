import { PublicKey } from "@solana/web3.js";

export const DEFAULT_PROGRAM_ID = "E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg";
export const DEFAULT_RPC_URL = "https://api.devnet.solana.com";
export const DEMO_MERCHANT = "9uLNjJt3aqNARjYz87NLL1EuYzrnD3hcqpEHnS6q2zy1";

export const PROGRAM_ID: PublicKey = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || DEFAULT_PROGRAM_ID
);

export const RPC_URL: string =
  process.env.NEXT_PUBLIC_RPC_URL || DEFAULT_RPC_URL;

export function getExplorerTxUrl(txSignature: string, cluster = "devnet"): string {
  return `https://explorer.solana.com/tx/${txSignature}?cluster=${cluster}`;
}

export function getExplorerAddressUrl(address: string | PublicKey, cluster = "devnet"): string {
  const addr = typeof address === "string" ? address : address.toBase58();
  return `https://explorer.solana.com/address/${addr}?cluster=${cluster}`;
}
