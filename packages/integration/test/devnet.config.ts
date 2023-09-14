import * as fs from "fs";
import path from "path";

import { chainIdToDomain } from "@connext/nxtp-utils";
import devnetDeployments from "@connext/smart-contracts/devnet.deployments.json";

const connectorNamesByChains: Record<string, string> = {
  "1": "MainnetSpokeConnector",
  "10": "OptimismSpokeConnector",
  "100": "GnosisSpokeConnector",
};
/**
 * Generates the config.json dynamically for agents(router, sequencer and lighthouse).
 */
const generateConfigForDevnets = async () => {
  console.log("Started generating configs for devnets");

  const cmdArg = process.argv.slice(2);
  const agent = cmdArg[0];

  if (!agent) {
    console.error("Specify an agent name (router,sequencer,lighthouse...) ");
    return;
  }

  // Read the contents from the pre-compiled config file.
  const configPath = path.join(__dirname, `../../../docker/${agent}/config.json`);
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
    const relayerProxyAddress = deploymentsForChain.contracts.RelayerProxyHub
      ? deploymentsForChain.contracts.RelayerProxyHub.address
      : deploymentsForChain.contracts.RelayerProxy.address;
    const spokeConnectorName = connectorNamesByChains[chainId];
    const assets = [{ name: "TEST", address: deploymentsForChain.contracts.TestERC20.address }];
    const domainId = chainIdToDomain(+chainId);

    chains[domainId] = {
      providers: preConfig.chains[domainId].providers,
      deployments: {
        connext: connextAddress,
        relayerProxy: relayerProxyAddress,
        spokeConnector: deploymentsForChain.contracts[spokeConnectorName].address,
      },
      assets,
    };
  }

  const jsonToWrite = { ...preConfig, chains };

  try {
    fs.writeFileSync(configPath, JSON.stringify(jsonToWrite), { encoding: "utf-8" });
  } catch (e: unknown) {
    console.error("Error writing config file!");
  }
};

generateConfigForDevnets();
