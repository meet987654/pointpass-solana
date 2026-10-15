pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

#[allow(unused_imports)]
pub use constants::*;
pub use instructions::*;
#[allow(unused_imports)]
pub use state::*;

declare_id!("E46pY2xe8ZHeVjuxiHac4Mctey7rwLP8ZAWasMU7ykUg");

#[program]
pub mod pointpass {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize::handler(ctx)
    }
}
