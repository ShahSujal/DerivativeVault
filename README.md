# Derivative Vault POC

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install Dependencies
Run the following command to install all dependencies:
```bash
yarn install
```

### Build the Project
To build the project for production, run:
```bash
yarn build
```

### Start the Server
To start the production server, run:
```bash
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Before running the project, make sure to create a `.env` file in the root directory. Use the `.env.example` file as a template.

### `.env.example`
```properties
# Public Project ID for the application
NEXT_PUBLIC_PROJECT_ID="your_project_id_here"

# Mock Rate Oracle Contract Address
NEXT_PUBLIC_MOCKRATEORACLE_CONTRACT_ADDRESS="your_mock_rate_oracle_contract_address_here"

# Mock Token Contract Address
NEXT_PUBLIC_MOCKTOKEN_CONTRACT_ADDRESS="your_mock_token_contract_address_here"

# Mock Uniswap V3 Position Manager Contract Address
NEXT_PUBLIC_MOCKUNISWAPV3POSITIONMANAGER_CONTRACT_ADDRESS="your_mock_uniswap_v3_position_manager_contract_address_here"

# Derivative Vault Contract Address
NEXT_PUBLIC_DERIVATIVEVAULT_CONTRACT_ADDRESS="your_derivative_vault_contract_address_here"

# Uniswap V3 Factory Contract Address
NEXT_PUBLIC_UNISWAPV3_FACTORY_CONTRACT_ADDRESS="your_uniswap_v3_factory_contract_address_here"

# Sepolia RPC URL (Alchemy or other provider)
NEXT_PUBLIC_SEPOLIA_RPC="your_sepolia_rpc_url_here"

# The Graph API Key
GRAPH_API_KEY="your_graph_api_key_here"

# The Graph URL
GRAPH_URL="your_graph_url_here"

# Sepolia Uniswap Contract Address
NEXT_PUBLIC_SEPOLIA_UNISWAP="your_sepolia_uniswap_contract_address_here"
```

Copy the `.env.example` file to `.env` and replace the placeholder values with your actual environment variables:
```bash
cp .env.example .env
```

## Deployed on Vercel
- [Derivative Vault](https://derivativevault.vercel.app/)
