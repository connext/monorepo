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
            local: getContract("TestERC20", "31338", false, undefined, ProtocolNetwork.LOCAL).address,
            adopted: getContract("TestERC20", "31338", false, undefined, ProtocolNetwork.LOCAL).address,
          },
          "31339": {
            local: getContract("TestERC20", "31339", false, undefined, ProtocolNetwork.LOCAL).address,
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
        allowlist: ["0x821aEa9a577a9b44299B9c15c88cf3087F3b5544"], // private key: 0xc88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
      },
      sequencers: {
        allowlist: ["0xf17f52151EbEF6C7334FAD080c5704D77216b732"], // private key: 0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
      },
      relayers: {
        allowlist: ["0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"], // private key: 0x0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
      },
    },
  };

  fs.writeFileSync("local.init.json", JSON.stringify(initConfig, null, "  "));

  const cmd = `yarn workspace @connext/smart-contracts run initialize --name all --network local --env production --apply true`;
  await runCommand(cmd);
};

runInit();
