import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `${process.env.ALCHEMY_URL_SEPOLIA}`,
      accounts: [
        `${process.env.PRIVATE_KEY}`
      ]
    },
    goerli: {
      url: `${process.env.ALCHEMY_URL_GOERLI}`,
      accounts: [
        `${process.env.PRIVATE_KEY}`
      ]
    }
  }
};

module.exports = config;
