use anchor_lang::prelude::*;
use crate::constants::MAX_NAME_LENGTH;

#[account]
pub struct LoyaltyProgram {
    /// The merchant authority who controls this loyalty program
    pub merchant: Pubkey,
    /// The SPL token mint PDA for zero-decimal loyalty points
    pub points_mint: Pubkey,
    /// Points required to redeem one reward unit
    pub reward_cost: u64,
    /// Lifetime total points awarded to customers
    pub total_awarded: u64,
    /// Lifetime total points redeemed for rewards
    pub total_redeemed: u64,
    /// Lifetime number of redemptions performed
    pub redemption_count: u64,
    /// Canonical bump seed for the LoyaltyProgram PDA
    pub bump: u8,
    /// Canonical bump seed for the PointsMint PDA
    pub mint_bump: u8,
    /// Human-readable brand/business name (up to MAX_NAME_LENGTH bytes)
    pub name: String,
}

impl LoyaltyProgram {
    pub const LEN: usize = 8   // 8-byte Anchor discriminator
        + 32                   // merchant (Pubkey)
        + 32                   // points_mint (Pubkey)
        + 8                    // reward_cost (u64)
        + 8                    // total_awarded (u64)
        + 8                    // total_redeemed (u64)
        + 8                    // redemption_count (u64)
        + 1                    // bump (u8)
        + 1                    // mint_bump (u8)
        + (4 + MAX_NAME_LENGTH); // name: 4-byte Borsh string prefix + 32-byte max UTF-8 payload
}
