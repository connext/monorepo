import { chainIdToDomain } from "@connext/nxtp-utils";
import devnetDeployments from "@connext/smart-contracts/devnet.deployments.json";

/**
 * Generates the config.json dynamically for agents(router, sequencer and lighthouse).
 */
const generateConfigForDevnets = async () => {
  const cmdArg = process.argv.slice(2);
  const agent = cmdArg[0];

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
      deployments: {
        connext: connextAddress,
        relayerProxy: relayerProxyAddress,
      },
      assets,
    };
  }

  // Read the template config for the `agentName` agent.
};

generateConfigForDevnets();
