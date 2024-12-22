use tokio;
use solana_client::rpc_client::RpcClient;
use solana_sdk::{signature::Keypair};
use std::error::Error;

mod solana_cli;
use solana_cli::deploy_contract;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Deploy contract
    let result = deploy_contract().await?;
    Ok(())
}
