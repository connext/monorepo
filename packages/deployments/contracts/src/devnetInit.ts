import fs from "fs";
import { config as dotenvConfig } from "dotenv";
import { Wallet, utils } from "ethers";
import commandLineArgs from "command-line-args";

import { InitConfig } from "./cli/init/helpers";
import { getContract } from "./cli/helpers";
import { runCommand } from ".";

dotenvConfig();

const { MNEMONIC } = process.env;

const runInit = async () => {
  const sender = Wallet.fromMnemonic(MNEMONIC!).address;
  console.log("deployer", sender);

  // Generate init.json file
  const initConfig: InitConfig = {
    hub: "6648936",
    supportedDomains: [
      "6648936", // MAINNET
      "1869640809", // OPTIMISM
      "6778479", // GNOSIS
    ],
    assets: [
      {
        name: "TEST",
        canonical: {
          domain: "6648936",
          address: getContract("TestERC20", "1", false, undefined, true).address,
          decimals: 18,
          cap: utils.parseEther("1000000000").toString(),
        },
        representations: {
          "1869640809": {
            local: getContract("TestERC20", "10", false, undefined, true).address,
            adopted: getContract("TestERC20", "10", false, undefined, true).address,
          },
          "6778479": {
            local: getContract("TestERC20", "100", false, undefined, true).address,
            adopted: getContract("TestERC20", "100", false, undefined, true).address,
          },
        },
      },
    ],
    agents: {
      relayerFeeVaults: {
        "6648936": sender,
        "1869640809": sender,
        "6778479": sender,
      },
      watchers: {
        allowlist: [sender],
      },
      routers: {
        allowlist: [sender],
      },
      sequencers: {
        allowlist: [sender],
      },
      relayers: {
        allowlist: [sender],
      },
    },
  };

  fs.writeFileSync("devnet-init.json", JSON.stringify(initConfig, null, "  "));

  const cmd = `yarn workspace @connext/smart-contracts run initialize --name all --network devnet --env production --apply false`;
  await runCommand(cmd);
};

runInit();
