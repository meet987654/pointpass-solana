use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};
use crate::constants::*;
use crate::error::PointPassError;
use crate::state::LoyaltyProgram;

#[derive(Accounts)]
#[instruction(name: String, reward_cost: u64)]
pub struct InitializeProgram<'info> {
    #[account(mut)]
    pub merchant: Signer<'info>,

    #[account(
        init,
        payer = merchant,
        space = LoyaltyProgram::LEN,
        seeds = [LOYALTY_PROGRAM_SEED, merchant.key().as_ref()],
        bump,
    )]
    pub loyalty_program: Account<'info, LoyaltyProgram>,

    #[account(
        init,
        payer = merchant,
        seeds = [POINTS_MINT_SEED, loyalty_program.key().as_ref()],
        bump,
        mint::decimals = 0,
        mint::authority = loyalty_program,
    )]
    pub points_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handle_initialize_program(
    ctx: Context<InitializeProgram>,
    name: String,
    reward_cost: u64,
) -> Result<()> {
    require!(!name.is_empty(), PointPassError::NameEmpty);
    require!(name.as_bytes().len() <= MAX_NAME_LENGTH, PointPassError::NameTooLong);
    require!(reward_cost > 0, PointPassError::InvalidRewardCost);

    let loyalty_program = &mut ctx.accounts.loyalty_program;
    loyalty_program.merchant = ctx.accounts.merchant.key();
    loyalty_program.points_mint = ctx.accounts.points_mint.key();
    loyalty_program.name = name;
    loyalty_program.reward_cost = reward_cost;
    loyalty_program.total_awarded = 0;
    loyalty_program.total_redeemed = 0;
    loyalty_program.redemption_count = 0;
    loyalty_program.bump = ctx.bumps.loyalty_program;
    loyalty_program.mint_bump = ctx.bumps.points_mint;

    msg!(
        "LoyaltyProgram initialized: name='{}', mint={}, reward_cost={}",
        loyalty_program.name,
        loyalty_program.points_mint,
        loyalty_program.reward_cost
    );

    Ok(())
}
