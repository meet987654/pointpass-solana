use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};
use crate::constants::*;
use crate::error::PointPassError;
use crate::events::PointsAwarded;
use crate::state::LoyaltyProgram;

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct AwardPoints<'info> {
    #[account(mut)]
    pub merchant: Signer<'info>,

    #[account(
        mut,
        seeds = [LOYALTY_PROGRAM_SEED, loyalty_program.merchant.as_ref()],
        bump = loyalty_program.bump,
        has_one = merchant @ PointPassError::Unauthorized,
    )]
    pub loyalty_program: Account<'info, LoyaltyProgram>,

    #[account(
        mut,
        seeds = [POINTS_MINT_SEED, loyalty_program.key().as_ref()],
        bump = loyalty_program.mint_bump,
        address = loyalty_program.points_mint,
    )]
    pub points_mint: Account<'info, Mint>,

    /// CHECK: The customer wallet receiving points; does not sign.
    pub customer: UncheckedAccount<'info>,

    #[account(
        init_if_needed,
        payer = merchant,
        associated_token::mint = points_mint,
        associated_token::authority = customer,
    )]
    pub customer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn handle_award_points(ctx: Context<AwardPoints>, amount: u64) -> Result<()> {
    // 1. Validate that the points amount is strictly positive
    require!(amount > 0, PointPassError::InvalidAmount);

    // 2. Prepare PDA signer seeds for mint authority CPI
    let merchant_key = ctx.accounts.loyalty_program.merchant;
    let bump = ctx.accounts.loyalty_program.bump;
    let seeds = &[
        LOYALTY_PROGRAM_SEED,
        merchant_key.as_ref(),
        &[bump],
    ];
    let signer_seeds = &[&seeds[..]];

    // 3. Mint points tokens to the customer's associated token account
    let cpi_accounts = MintTo {
        mint: ctx.accounts.points_mint.to_account_info(),
        to: ctx.accounts.customer_token_account.to_account_info(),
        authority: ctx.accounts.loyalty_program.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
    token::mint_to(cpi_ctx, amount)?;

    let loyalty_program_key = ctx.accounts.loyalty_program.key();
    let customer_key = ctx.accounts.customer.key();

    // 4. Update program accounting using checked math to avoid overflow
    let loyalty_program = &mut ctx.accounts.loyalty_program;
    loyalty_program.total_awarded = loyalty_program
        .total_awarded
        .checked_add(amount)
        .ok_or(PointPassError::MathOverflow)?;

    // 5. Emit event for off-chain indexing and UI notifications
    emit!(PointsAwarded {
        loyalty_program: loyalty_program_key,
        customer: customer_key,
        amount,
    });

    msg!(
        "Awarded {} points to customer {} (total awarded: {})",
        amount,
        customer_key,
        loyalty_program.total_awarded
    );

    Ok(())
}
