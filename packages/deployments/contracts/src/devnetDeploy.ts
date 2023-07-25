import util from "util";
import { exec as _exec } from "child_process";

import { config as dotenvConfig } from "dotenv";
import { Wallet } from "ethers";

dotenvConfig();

const exec = util.promisify(_exec);

const { MAINNET_DEVNET_RPC_URL, OPTIMISM_DEVNET_RPC_URL, ARBITRUM_DEVNET_RPC_URL, MNEMONIC, TENDERLY_ACCOUNT_ID } =
  process.env;

const deployToDevnets = async () => {
  if (!MAINNET_DEVNET_RPC_URL || !OPTIMISM_DEVNET_RPC_URL || !ARBITRUM_DEVNET_RPC_URL) {
    throw new Error("Not found devnet rpcs");
  }

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
      network: "arbitrum",
      rpc: ARBITRUM_DEVNET_RPC_URL,
    },
  ];

  const sender = Wallet.fromMnemonic(MNEMONIC!).address;
  console.log("deployer", sender);

  for (const config of chainConfigs) {
    //funds to sender
    const { stdout } = await exec(
      `curl -H "Content-Type: application/json" -X POST --data '{
        "jsonrpc": "2.0",
        "method": "tenderly_setBalance",
        "params": [
          "${sender}",
          "0x56BC75E2D63100000"
        ],
        "id": "${TENDERLY_ACCOUNT_ID}"
      }' ${config.rpc}`,
    );

    if (!JSON.parse(stdout)?.result) {
      throw new Error(`failed to tenderly_setBalance, ${sender}, ${config.network}`);
    }

    const cmd = `DEPLOYMENT_CONTEXT=tenderly-${config.network} forge script script/Deploy.s.sol --rpc-url ${config.rpc} --broadcast --mnemonics "${MNEMONIC}" --sender 0xa2ee8dcd2a8a3a54cf37f6590e5108bbe502b006 -vvv && yarn forge-deploy sync --artifacts artifacts_forge ;`;

    const { stdout: out, stderr: err } = await exec(cmd);
    console.log("out", out);
    console.log("error", err);
  }
};

deployToDevnets();
