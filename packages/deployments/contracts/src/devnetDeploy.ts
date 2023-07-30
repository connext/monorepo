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
    // {
    //   network: "mainnet",
    //   rpc: MAINNET_DEVNET_RPC_URL,
    // },
    {
      network: "optimism",
      rpc: OPTIMISM_DEVNET_RPC_URL,
    },
    // {
    //   network: "arbitrum",
    //   rpc: ARBITRUM_DEVNET_RPC_URL,
    // },
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
          "0x8AC7230489E8000000"
        ],
        "id": "${TENDERLY_ACCOUNT_ID}"
      }' ${config.rpc}`,
    );

    console.log("set balance: ", stdout);
    if (!JSON.parse(stdout)?.result) {
      throw new Error(`failed to tenderly_setBalance, ${sender}, ${config.network}`);
    }

    const cmd = `DEPLOYMENT_CONTEXT=tenderly-${config.network} forge script scripts/Deploy.s.sol --rpc-url ${config.rpc} --broadcast --mnemonics "${MNEMONIC}" --sender ${sender}  -vvvv && DEPLOYMENT_CONTEXT=tenderly-${config.network} forge script scripts/Deploy.s.sol --sig 'sync()' --rpc-url ${config.rpc} --broadcast --mnemonics "${MNEMONIC}" --sender ${sender}  -vvvv`;

    _exec(cmd)?.stdout?.pipe(process.stdout);
  }
};

deployToDevnets();
