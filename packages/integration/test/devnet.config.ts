import * as fs from "fs";
import { chainIdToDomain } from "@connext/nxtp-utils";
import devnetDeployments from "@connext/smart-contracts/devnet.deployments.json";

/**
 * Generates the config.json dynamically for agents(router, sequencer and lighthouse).
 */
const generateConfigForDevnets = async () => {
  const cmdArg = process.argv.slice(2);
  const agent = cmdArg[0];

  // Read the contents from the pre-compiled config file.
  const configPath = `../../../docker/${agent}/config.json`;
  let preConfig: any = {};
  try {
    if (fs.existsSync(configPath)) {
      preConfig = JSON.parse(fs.readFileSync(configPath, { encoding: "utf-8" }));
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    return;
  }

  // Reassemble the json by extracting necessary data from the deployments file.
  const deployments = devnetDeployments as Record<string, any>;
  const chains: Record<string, any> = {};
  const chainIds = Object.keys(deployments);
  for (const chainId of chainIds) {
    const deploymentsForChain = deployments[chainId][0];
    const connextAddress = deploymentsForChain.contracts.Connext.address;
    const relayerProxyAddress =
      deploymentsForChain.contracts.RelayerProxyHub ?? deploymentsForChain.contracts.RelayerProxy;
    const assets = [{ name: "TEST", address: deploymentsForChain.contracts.TestERC20 }];
    const domainId = chainIdToDomain(+chainId);
    chains[domainId] = {
      providers: preConfig[domainId].providers,
      deployments: {
        connext: connextAddress,
        relayerProxy: relayerProxyAddress,
      },
      assets,
    };
  }

  const jsonToWrite = { ...preConfig, chains };

  try {
    fs.writeFileSync(configPath, jsonToWrite.toString(), { encoding: "utf-8" });
  } catch (e: unknown) {
    console.error("Error writing config file!");
  }
};

generateConfigForDevnets();
