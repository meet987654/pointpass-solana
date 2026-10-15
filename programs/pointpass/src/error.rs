use anchor_lang::prelude::*;

#[error_code]
pub enum PointPassError {
    #[msg("Loyalty program name cannot be empty.")]
    NameEmpty,

    #[msg("Loyalty program name exceeds maximum length of 32 bytes.")]
    NameTooLong,

    #[msg("Reward cost must be greater than zero.")]
    InvalidRewardCost,

    #[msg("Action unauthorized: signer is not the merchant authority.")]
    Unauthorized,

    #[msg("Invalid points amount specified.")]
    InvalidAmount,

    #[msg("Customer has insufficient points balance.")]
    InsufficientPoints,

    #[msg("Arithmetic operation resulted in an overflow.")]
    MathOverflow,
}
