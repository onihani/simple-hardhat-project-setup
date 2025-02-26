// core
import fs from "fs";
// imports
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const devWalletPrivateKey = fs.readFileSync(".secret").toString().trim();
const infuraProjectId = fs.readFileSync(".infura").toString().trim();
const etherScanKey = fs.readFileSync(".etherscan").toString().trim();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: etherScanKey,
    customChains: [],
  },
  sourcify: {
    enabled: true,
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: [devWalletPrivateKey],
      // accounts: {
      //   mnemonic,
      //   path: "m/44'/60'/0'/0",
      //   initialIndex: 0,
      //   count: 20,
      // },
    },
    somnia: {
      url: "https://dream-rpc.somnia.network",
      accounts: [devWalletPrivateKey],
      // accounts: {
      //   mnemonic,
      //   path: "m/44'/60'/0'/0",
      //   initialIndex: 0,
      //   count: 20,
      // },
    },
  },
};

export default config;
