import { HardhatUserConfig } from "hardhat/config";

import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.5",
  },
};

export default config;
