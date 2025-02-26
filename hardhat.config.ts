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
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectId}`,
      accounts: [devWalletPrivateKey],
    },
    somnia: {
      url: "https://dream-rpc.somnia.network",
      accounts: [devWalletPrivateKey], // put dev menomonic or PK here,
    },
  }
};

export default config;
