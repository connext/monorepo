import util from "util";
import fs from "fs";
import os from "os";
import { exec as _exec } from "child_process";

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const exec = util.promisify(_exec);

const {
  TENDERLY_ACCESS_KEY,
  TENDERLY_PROJECT_SLUG,
  TENDERLY_ACCOUNT_ID,
  TENDERLY_MAINNET_DEVNET_TEMPLATE,
  TENDERLY_OPTIMISM_DEVNET_TEMPLATE,
  TENDERLY_ARBITRUM_DEVNET_TEMPLATE,
} = process.env;

const createDevNets = async () => {
  const mainnetCommand = `tenderly devnet spawn-rpc --project ${TENDERLY_PROJECT_SLUG} --template ${TENDERLY_MAINNET_DEVNET_TEMPLATE} --account ${TENDERLY_ACCOUNT_ID}  --access_key ${TENDERLY_ACCESS_KEY}`;
  const optimismCommand = `tenderly devnet spawn-rpc --project ${TENDERLY_PROJECT_SLUG} --template ${TENDERLY_OPTIMISM_DEVNET_TEMPLATE} --account ${TENDERLY_ACCOUNT_ID}  --access_key ${TENDERLY_ACCESS_KEY}`;
  const arbitrumCommand = `tenderly devnet spawn-rpc --project ${TENDERLY_PROJECT_SLUG} --template ${TENDERLY_ARBITRUM_DEVNET_TEMPLATE} --account ${TENDERLY_ACCOUNT_ID}  --access_key ${TENDERLY_ACCESS_KEY}`;
  const chainConfigs = [
    {
      network: "MAINNET",
      regex: /MAINNET_DEVNET_RPC_URL=.*/g,
      command: mainnetCommand,
    },
    {
      network: "OPTIMISM",
      regex: /OPTIMISM_DEVNET_RPC_URL=.*/g,
      command: optimismCommand,
    },
    {
      network: "ARBITRUM",
      regex: /ARBITRUM_DEVNET_RPC_URL=.*/g,
      command: arbitrumCommand,
    },
  ];

  for (const config of chainConfigs) {
    const { stderr } = await exec(config.command);
    const devnetUrl = stderr.trim().toString();

    console.log(`${config.network}_DEVNET_RPC_URL=` + devnetUrl);

    // if file not exists, create it
    if (!fs.existsSync(".env")) {
      fs.writeFileSync(".env", "");
    }
    const fileContent = fs.readFileSync(".env", "utf8");

    const newFileContent = fileContent.replace(config.regex, "");
    fs.writeFileSync(".env", newFileContent);
    fs.appendFileSync(".env", `${os.EOL}${config.network}_DEVNET_RPC_URL=` + devnetUrl);
  }
};

createDevNets();
