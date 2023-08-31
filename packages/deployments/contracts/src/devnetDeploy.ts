import util from "util";
import { exec as _exec, spawn } from "child_process";

import { config as dotenvConfig } from "dotenv";
import { Wallet } from "ethers";
import commandLineArgs from "command-line-args";

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

const runCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, {
      stdio: "inherit",
      shell: true,
    });
    let stdout = "";
    let stderr = "";

    childProcess.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    childProcess.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
};

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

    const deployCmd = `DEPLOYMENT_CONTEXT=tenderly-${config.network} forge script scripts/Deploy.s.sol --rpc-url ${config.rpc} --broadcast --slow --mnemonics "${MNEMONIC}" --sender ${sender}  -vvv`;
    const syncCmd = `DEPLOYMENT_CONTEXT=tenderly-${config.network} forge script scripts/Deploy.s.sol --sig 'sync()' --rpc-url ${config.rpc} -v`;
    const exportCmd = `run export`;

    commands.push(runCommand(`${deployCmd} && ${syncCmd} && ${exportCmd}`));
  }

  await Promise.all(commands);
};

deployToDevnets();
