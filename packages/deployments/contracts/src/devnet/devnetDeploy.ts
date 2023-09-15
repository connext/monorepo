import util from "util";
import { exec as _exec } from "child_process";
import { config as dotenvConfig } from "dotenv";
import { Wallet } from "ethers";
import commandLineArgs from "command-line-args";

import { runCommand } from "..";

dotenvConfig();

const exec = util.promisify(_exec);

const { MAINNET_DEVNET_RPC_URL, OPTIMISM_DEVNET_RPC_URL, GNOSIS_DEVNET_RPC_URL, MNEMONIC, TENDERLY_ACCOUNT_ID } =
  process.env;

const chainConfigs = [
  {
    network: "mainnet",
    rpc: MAINNET_DEVNET_RPC_URL,
  },
  {
    network: "optimism",
    rpc: OPTIMISM_DEVNET_RPC_URL,
  },
  {
    network: "gnosis",
    rpc: GNOSIS_DEVNET_RPC_URL,
  },
];

const optionDefinitions = [{ name: "network", type: String, defaultValue: "all" }];

const deployToDevnets = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // Validate command line arguments
  const { network } = cmdArgs;

  if (network != "all" && !chainConfigs.map((c) => c.network).includes(network as string)) {
    throw new Error(
      `Network should be either all, ${chainConfigs.map((c) => c.network).join(",")}, network: ${network}`,
    );
  }

  const sender = Wallet.fromMnemonic(MNEMONIC!).address;
  console.log("deployer", sender);

  const configs = network === "all" ? chainConfigs : [chainConfigs.find((c) => c.network === network)!];

  const commands = [];
  for (const config of configs) {
    //funds to sender
    const { stdout } = await exec(
      `curl -H "Content-Type: application/json" -X POST --data '{
        "jsonrpc": "2.0",
        "method": "tenderly_setBalance",
        "params": [
          "${sender}",
          "0x8AC7230489E8000000"
        ],
        "id": "${TENDERLY_ACCOUNT_ID}"
      }' ${config.rpc}`,
    );

    console.log("set balance: ", stdout);
    if (!JSON.parse(stdout)?.result) {
      throw new Error(`failed to tenderly_setBalance, ${sender}, ${config.network}`);
    }

    const deployCmd = `yarn workspace @connext/smart-contracts hardhat deploy --tags devnet --network devnet-${config.network}`;

    if (config.network === "mainnet") {
      await runCommand(deployCmd, 3);
    } else {
      commands.push(runCommand(deployCmd, 3));
    }
  }

  // Deploy spoke chains at once
  await Promise.all(commands);

  const exportCmd = `run export`;
  await runCommand(exportCmd, 3);
};

deployToDevnets();
