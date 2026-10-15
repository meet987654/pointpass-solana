use anchor_lang::prelude::*;

#[account]
pub struct RedemptionReceipt {
    /// The customer who redeemed loyalty points
    pub customer: Pubkey,
    /// The loyalty program where redemption occurred
    pub loyalty_program: Pubkey,
    /// Number of points burned for this redemption
    pub points_burned: u64,
    /// Monotonically increasing redemption counter index
    pub receipt_number: u64,
    /// Unix timestamp of redemption
    pub timestamp: i64,
    /// Canonical bump seed for this RedemptionReceipt PDA
    pub bump: u8,
}

impl RedemptionReceipt {
    pub const LEN: usize = 8  // 8-byte Anchor discriminator
        + 32                  // customer (Pubkey)
        + 32                  // loyalty_program (Pubkey)
        + 8                   // points_burned (u64)
        + 8                   // receipt_number (u64)
        + 8                   // timestamp (i64)
        + 1;                  // bump (u8)
}
