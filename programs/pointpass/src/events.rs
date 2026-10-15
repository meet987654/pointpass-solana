use anchor_lang::prelude::*;

#[event]
pub struct PointsAwarded {
    pub loyalty_program: Pubkey,
    pub customer: Pubkey,
    pub amount: u64,
}

#[event]
pub struct PointsRedeemed {
    pub loyalty_program: Pubkey,
    pub customer: Pubkey,
    pub amount: u64,
    pub index: u64,
}
