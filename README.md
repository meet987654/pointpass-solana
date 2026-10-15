# PointPass

Merchant-issued loyalty points as SPL tokens on Solana devnet, built with Anchor (Rust) and a Next.js wallet UI. Customers earn non-inflationary loyalty tokens and burn them for on-chain verifiable redemption receipts.

Demo video: [Coming soon]
Devnet Program ID: `[Pending deployment in Phase 4]`

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

> **Note on Program IDs**: `anchor keys sync` generates a local development keypair in `target/deploy/pointpass-keypair.json` (which is gitignored) and updates `declare_id!` in `programs/pointpass/src/lib.rs` and `Anchor.toml` to match. This ensures tests pass out of the box on any machine. Maintainers deploying canonical devnet releases keep their authoritative deployment keypair stored securely outside the repository (e.g. `~/.config/solana/pointpass-program-keypair.json`).


