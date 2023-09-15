import fs from "fs";
import { config as dotenvConfig } from "dotenv";
import { Wallet, utils } from "ethers";

import { InitConfig } from "../cli/init/helpers";
import { getContract } from "../cli/helpers";
import { ProtocolNetwork, runCommand } from "..";

dotenvConfig();

const { MNEMONIC } = process.env;

const runInit = async () => {
  const sender = Wallet.fromMnemonic(MNEMONIC!).address;
  console.log("deployer", sender);

  // Generate init.json file
  const initConfig: InitConfig = {
    hub: "31337",
    supportedDomains: [
      "31337", // MAINNET
      "31338", // OPTIMISM
      "31339", // ARBITRUM
    ],
    assets: [
      {
        name: "TEST",
        canonical: {
          domain: "31337",
          address: getContract("TestERC20", "31337", false, undefined, ProtocolNetwork.LOCAL).address,
          decimals: 18,
          cap: utils.parseEther("1000000000").toString(),
        },
        representations: {
          "31338": {
            local: "",
            adopted: getContract("TestERC20", "31338", false, undefined, ProtocolNetwork.LOCAL).address,
          },
          "31339": {
            local: "",
            adopted: getContract("TestERC20", "31339", false, undefined, ProtocolNetwork.LOCAL).address,
          },
        },
      },
    ],
    agents: {
      relayerFeeVaults: {
        "31337": sender,
        "31338": sender,
        "31339": sender,
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

  fs.writeFileSync("local.init.json", JSON.stringify(initConfig, null, "  "));

  const cmd = `yarn workspace @connext/smart-contracts run initialize --name all --network local --env production --apply true`;
  await runCommand(cmd);
};

runInit();
