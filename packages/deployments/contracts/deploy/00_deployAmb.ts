import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { getProtocolNetwork, getProviderFromHardhatConfig } from "../src";
import { MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig";

const HARBOR_CHAINS = [
  { chain: 1337, parent: 1 },
  { chain: 1338, parent: 137 },
];

/**
 * Hardhat task for deploying the AMB Messaging Layer contracts.
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = +(await hre.getChainId());

  // const harborChains: { chain: number; parent: number }[] = [];
  // harborConfig.chains.forEach((c) =>
  //   c.config.networks.forEach((n) => {
  //     if (n.chainId) {
  //       harborChains.push({ chain: n.chainId, parent: n.parentChainId });
  //     }
  //   }),
  // );

  if (!HARBOR_CHAINS.map((h) => h.chain).includes(chainId)) {
    // Skip deployment on non-harbor chain
    return;
  }

  console.log(`\n============================= Establishing AMBs on ${chainId} ===============================`);

  // Find the harbor chain that acts as the hub
  // NOTE: if harbor config intermingles messaging networks (ie testnets and mainnet and local in the
  // same config), this will fail
  const parentNetwork = getProtocolNetwork(HARBOR_CHAINS[0].parent);
  const hubChain = MESSAGING_PROTOCOL_CONFIGS[parentNetwork]?.hub ?? 0;
  if (!hubChain) {
    throw new Error(`Network ${parentNetwork} is not supported! (no messaging config)`);
  }
  const harborHub = HARBOR_CHAINS.find((h) => h.parent === hubChain);
  if (!harborHub) {
    throw new Error(`Could not find parent chain ${hubChain} in harbor config!`);
  }

  // For each harbor chain, map out the code that needs to be set.
  // - On the harbor chain mimicing the hub, all hub-side AMBs must be set.
  // - On all other harbor chains, only the spoke-side AMB must be set.
  const harborChain = HARBOR_CHAINS.find((h) => h.chain === chainId);
  if (!harborChain) {
    throw new Error(`Could not find chain ${chainId} in harbor config!`);
  }

  // Is current chain hub?
  const isHub = harborChain.chain === harborHub.chain;

  // Get the messaging protocol
  const protocol = MESSAGING_PROTOCOL_CONFIGS[parentNetwork];
  if (!protocol.configs[harborChain.parent]) {
    throw new Error(`Network ${parentNetwork} is not supported for ${harborChain.parent}!`);
  }
  const provider = getProviderFromHardhatConfig(harborChain.parent);

  // Set all the AMB code
  if (isHub) {
    console.log("setting code for hub-side AMBs");
    // Get all of the hub-side spoke AMBs
    for (const _chain of Object.keys(protocol.configs)) {
      const chain = +_chain;
      if (chain === protocol.hub) {
        // No ambs to set for hub
        continue;
      }
      const { hub } = protocol.configs[chain].ambs;
      const code = await provider.getCode(hub);
      const success = await hre.network.provider.send("hardhat_setCode", [hub, code]);
      if (!success) {
        throw new Error(`Could not set hub-side AMB code for chain ${harborChain.chain}!`);
      }
    }
  } else {
    console.log("setting code for spoke-side AMBs");
    // Set spoke-side AMB for only this chain
    const { spoke } = protocol.configs[harborChain.parent].ambs;
    const code = await provider.getCode(spoke);
    const success = await hre.network.provider.send("hardhat_setCode", [spoke, code]);
    if (!success) {
      throw new Error(`Could not set spoke-side AMB code for chain ${harborChain.chain}!`);
    }
  }
};

export default func;

func.tags = ["local"];
