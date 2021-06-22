import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
  },
  defaultNetwork: "hardhat",
};

export default config;
