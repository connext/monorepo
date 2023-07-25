import util from "util";
import { exec as _exec } from "child_process";

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const exec = util.promisify(_exec);

const { MAINNET_DEVNET_RPC_URL, OPTIMISM_DEVNET_RPC_URL, ARBITRUM_DEVNET_RPC_URL, MNEMONIC } = process.env;

const deployToDevnets = async () => {
  const { stdout: out } = await exec(`yarn workspace @connext/smart-contracts spawn-devnet`);
  console.log("devnet rpcs: ", out);

  const rpcUrls = [MAINNET_DEVNET_RPC_URL, OPTIMISM_DEVNET_RPC_URL, ARBITRUM_DEVNET_RPC_URL];

  for (const rpc of rpcUrls) {
    const cmd = `DEPLOYMENT_CONTEXT=localhost forge script script/Deploy.s.sol --rpc-url ${rpc} --broadcast --mnemonics ${MNEMONIC} -v && forge-deploy sync;`;

    const { stdout: out, stderr: err } = await exec(cmd);
    console.log("out", out);
    console.log("error", err);
  }
};

deployToDevnets();
