pub mod constants;
pub mod error;
pub mod events;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use error::*;
pub use events::*;
pub use instructions::*;
pub use state::*;

declare_id!("E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg");

#[program]
pub mod pointpass {
    use super::*;

    pub fn initialize_program(
        ctx: Context<InitializeProgram>,
        name: String,
        reward_cost: u64,
    ) -> Result<()> {
        instructions::initialize_program::handle_initialize_program(ctx, name, reward_cost)
    }

    pub fn award_points(
        ctx: Context<AwardPoints>,
        amount: u64,
    ) -> Result<()> {
        instructions::award_points::handle_award_points(ctx, amount)
    }

    pub fn redeem(
        ctx: Context<Redeem>,
    ) -> Result<()> {
        instructions::redeem::handle_redeem(ctx)
    }
}
