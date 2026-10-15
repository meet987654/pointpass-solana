# PointPass

Merchant-issued loyalty points as SPL tokens on Solana devnet, built with Anchor (Rust) and a Next.js wallet UI. Customers earn non-inflationary loyalty tokens and burn them for on-chain verifiable redemption receipts.

Demo video: [Coming soon]

- **Devnet Program ID**: [`E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg`](https://explorer.solana.com/address/E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg?cluster=devnet)
- **Solana Explorer**: [View on Solana Explorer (Devnet)](https://explorer.solana.com/address/E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg?cluster=devnet)

## Program Architecture

- **`LoyaltyProgram` PDA**: Derived from `["loyalty", merchant_pubkey]`. Stores merchant authority, points SPL mint address, reward cost, name (up to 32 bytes UTF-8 payload), lifetime counters (`total_awarded`, `total_redeemed`, `redemption_count`), and canonical bump seeds.
- **`PointsMint` PDA**: Zero-decimal SPL token mint derived from `["mint", loyalty_program_pda]`. Authority is the `LoyaltyProgram` PDA.
- **`RedemptionReceipt` PDA**: Verifiable proof of burn derived from `["redemption", loyalty_program_pda, customer_pubkey, redemption_count_le_bytes]`.

## Setup & Toolchain

### Required Versions
- **Solana / Agave CLI:** `2.1.0` (installed via `sh -c "$(curl -sSfL https://release.anza.xyz/v2.1.0/install)"`)
- **Anchor CLI:** `0.31.1` (`avm use 0.31.1`)
- **Anchor Crates:** `anchor-lang = "=0.31.1"`, `anchor-spl = "=0.31.1"`
- **Rust Toolchain:** `1.99.0` (pinned via `rust-toolchain.toml`)
- **Node.js:** `v20.20.2` (or Node `20+`)
- **Package Manager:** `yarn 1.22+`

### Machine & Environment Prerequisites
1. **Solana CLI PATH**: Agave installer places binaries in `~/.local/share/solana/install/active_release/bin` (or symlinked into `/usr/local/bin`).
2. **SBF Platform Tools (v1.43)**:
   - When building Solana programs, Agave's `cargo-build-sbf` targets `~/.cache/solana/v1.43/platform-tools`.
   - `cargo-build-sbf` attempts to download this release automatically from GitHub on first build. However, on restricted networks or certain WSL2 environments, the internal downloader frequently stalls or hangs.
   - If the automatic download hangs, install it manually:
     ```bash
     mkdir -p ~/.cache/solana/v1.43
     curl -L -o /tmp/platform-tools-linux-x86_64.tar.bz2 https://github.com/anza-xyz/platform-tools/releases/download/v1.43/platform-tools-linux-x86_64.tar.bz2
     tar -xjf /tmp/platform-tools-linux-x86_64.tar.bz2 -C ~/.cache/solana/v1.43/
     rm /tmp/platform-tools-linux-x86_64.tar.bz2
     ```
3. **Reproducible Builds**:
   - `Cargo.lock` pins `zeroize = "=1.8.1"` and `zeroize_derive = "=1.4.2"` to ensure SBF compiler compatibility without requiring any modifications to cargo registry caches.

---

## Getting Started (Clean Clone / Any Contributor)

Anyone cloning this repository can build and run tests without needing any pre-existing private keypairs:

```bash
# 1. Clone the repository
git clone https://github.com/meet987654/pointpass-solana.git
cd pointpass-solana

# 2. Install TypeScript / JS test dependencies
yarn install

# 3. Generate a local development program keypair and sync declare_id!
anchor keys sync

# 4. Compile the Anchor program & generate IDL
anchor build

# 5. Run the local integration test suite
anchor test
```

> **Note on Program IDs**: A fresh clone runs `anchor keys sync` so anyone can build and run tests locally with their own ephemeral keypair without needing access to private keys. The canonical Devnet deployment ID (`E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg`) belongs to the project maintainer's secure keypair (`~/.config/solana/pointpass-program-keypair.json`), which is kept strictly outside the repository to ensure stable on-chain program address upgrades.

---

## Devnet Smoke Test

To verify program instructions (`initialize_program`, `award_points`, `redeem`) against live Solana Devnet:

```bash
yarn smoke:devnet
```

This script connects to Solana Devnet, verifies the merchant loyalty program, generates a fresh customer funded directly with a small SOL transfer from the merchant wallet (no airdrops required), awards loyalty points, redeems a reward, and prints Solana Explorer verification links for every transaction and on-chain receipt.

---

## Frontend (Next.js App)

The web client is located in `app/`, built with Next.js (App Router), Tailwind CSS, and Solana Wallet Adapter.

### Running Locally

```bash
# 1. Sync the latest Anchor IDL and TypeScript types from root
yarn sync:idl

# 2. Enter app directory and install dependencies
cd app
yarn install

# 3. Start local development server
yarn dev
```

### Environment Variables

Configure `app/.env.local` (see `app/.env.example`):
- `NEXT_PUBLIC_PROGRAM_ID`: Deployed PointPass program ID (defaults to `E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg`).
- `NEXT_PUBLIC_RPC_URL`: Solana RPC endpoint (defaults to `https://api.devnet.solana.com`).

### Client Devnet Verification

To verify read-only program fetching, PDA derivations, and memcmp receipt filters without connecting a wallet:

```bash
cd app
yarn check:devnet
```

> **Note on PDA Seeds**: The seed constants in `app/src/lib/pda.ts` (`"loyalty"`, `"mint"`, `"redemption"`) are duplicated client-side from the on-chain Rust constants (`programs/pointpass/src/constants.rs`). Any changes to on-chain PDA seeds must be manually synchronized in `app/src/lib/pda.ts`.
