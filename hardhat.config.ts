import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "dotenv/config";
import "@nomiclabs/hardhat-solhint";
import "@fireblocks/hardhat-fireblocks";
import { ApiBaseUrl } from "@fireblocks/fireblocks-web3-provider";

const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      default: 0,
    },
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    excludeContracts: ["contracts/libraries/"],
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: `http://0.0.0.0:8545`,
      accounts,
      gasPrice: 5000000000,
      live: true,
      saveDeployments: true,
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
        privateKey: `${process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH}`,
        apiKey: `${process.env.FIREBLOCKS_API_KEY}`,
        vaultAccountIds: `${process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS}`
      },
      chainId: 11155111,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`,
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
        privateKey: `${process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH}`,
        apiKey: `${process.env.FIREBLOCKS_API_KEY}`,
        vaultAccountIds: `${process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS}`
      },
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 20000,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
};

export default config;
