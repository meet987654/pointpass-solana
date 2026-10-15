use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, Mint, Token, TokenAccount};
use crate::constants::*;
use crate::error::PointPassError;
use crate::events::PointsRedeemed;
use crate::state::{LoyaltyProgram, RedemptionReceipt};

#[derive(Accounts)]
pub struct Redeem<'info> {
    #[account(mut)]
    pub customer: Signer<'info>,

    #[account(
        mut,
        seeds = [LOYALTY_PROGRAM_SEED, loyalty_program.merchant.as_ref()],
        bump = loyalty_program.bump,
    )]
    pub loyalty_program: Account<'info, LoyaltyProgram>,

    #[account(
        mut,
        address = loyalty_program.points_mint,
    )]
    pub points_mint: Account<'info, Mint>,

    #[account(
        mut,
        token::mint = points_mint,
        token::authority = customer,
    )]
    pub customer_token_account: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = customer,
        space = RedemptionReceipt::LEN,
        seeds = [
            REDEMPTION_SEED,
            loyalty_program.key().as_ref(),
            customer.key().as_ref(),
            &loyalty_program.redemption_count.to_le_bytes(),
        ],
        bump,
    )]
    pub receipt: Account<'info, RedemptionReceipt>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handle_redeem(ctx: Context<Redeem>) -> Result<()> {
    let reward_cost = ctx.accounts.loyalty_program.reward_cost;

    // 1. Verify customer has enough points to cover reward_cost
    require!(
        ctx.accounts.customer_token_account.amount >= reward_cost,
        PointPassError::InsufficientPoints
    );

    // 2. CPI to Token Program to burn reward_cost tokens from customer account
    // Customer is authority over customer_token_account, so customer signs directly
    let cpi_accounts = Burn {
        mint: ctx.accounts.points_mint.to_account_info(),
        from: ctx.accounts.customer_token_account.to_account_info(),
        authority: ctx.accounts.customer.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::burn(cpi_ctx, reward_cost)?;

    let loyalty_program_key = ctx.accounts.loyalty_program.key();
    let customer_key = ctx.accounts.customer.key();
    let current_redemption_index = ctx.accounts.loyalty_program.redemption_count;
    let clock = Clock::get()?;

    // 3. Populate verifiable on-chain redemption receipt
    let receipt = &mut ctx.accounts.receipt;
    receipt.customer = customer_key;
    receipt.loyalty_program = loyalty_program_key;
    receipt.points_burned = reward_cost;
    receipt.receipt_number = current_redemption_index;
    receipt.timestamp = clock.unix_timestamp;
    receipt.bump = ctx.bumps.receipt;

    // 4. Update program accounting with checked arithmetic
    let loyalty_program = &mut ctx.accounts.loyalty_program;
    loyalty_program.total_redeemed = loyalty_program
        .total_redeemed
        .checked_add(reward_cost)
        .ok_or(PointPassError::MathOverflow)?;

    loyalty_program.redemption_count = loyalty_program
        .redemption_count
        .checked_add(1)
        .ok_or(PointPassError::MathOverflow)?;

    // 5. Emit event for off-chain indexing and audit trail
    emit!(PointsRedeemed {
        loyalty_program: loyalty_program_key,
        customer: customer_key,
        amount: reward_cost,
        index: current_redemption_index,
    });

    msg!(
        "Redeemed {} points for customer {}. Receipt #{}",
        reward_cost,
        customer_key,
        current_redemption_index
    );

    Ok(())
}
