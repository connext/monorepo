import _Deployments from "../../../deployments.json";

import { Deployment, DomainDeployments } from "./types";

const Deployments = _Deployments as any;

export const getDeployments = (chain: string, isHub: boolean, useStaging: boolean): DomainDeployments => {
  const deployments = Deployments[chain];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chain}!`);
  }
  const contracts = deployments[0]["contracts"] as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chain}!`);
  }
  const env = useStaging ? "Staging" : "";

  // Get all the Hub connectors, if applicable.
  const connectors: Deployment[] = [];
  if (isHub) {
    for (const key of Object.keys(contracts)) {
      // TODO: Use regex? Or a more flexible method?
      // Ignore accidental L2 or Spoke Connector deployments...
      if (key.includes("L2") || key.includes("Spoke")) {
        continue;
      }
      if (key.endsWith("Connector" + env) && !key.includes("Mainnet")) {
        const contract = contracts[key];
        connectors.push({
          name: key,
          address: contract.address,
          abi: contract.abi,
        });
      }
    }
  } else {
    for (const key of Object.keys(contracts)) {
      if (key.endsWith("L2Connector" + env) || key.endsWith("SpokeConnector" + env)) {
        const contract = contracts[key];
        connectors.push({
          name: key,
          address: contract.address,
          abi: contract.abi,
        });
      }
    }
    if (connectors.length > 1) {
      throw new Error(
        `Multiple L2/Spoke Connectors found on spoke chain ${chain} while consulting deployments.json! ` +
          "Please ensure outdated Connector deployment is deleted and removed.",
      );
    }
  }

  // Custom function to format lookup by env and double check that the contract retrieved is not null.
  const getContract = (contract: string): any => {
    const key = contract.includes("ConnextHandler") ? `ConnextHandler${env}_DiamondProxy` : contract + env;
    const result = contracts[key];
    if (!result) {
      throw new Error(`Contract ${key} was not found in deployments.json!`);
    } else if (!result.address || !result.abi) {
      throw new Error(`Contract ${key} was missing address or ABI in deployments.json!`);
    }
    return {
      name: key,
      address: result.address,
      abi: result.abi,
    };
  };

  return {
    Connext: getContract("ConnextHandler_DiamondProxy"),
    handlers: {
      BridgeRouter: getContract("BridgeRouterUpgradeBeaconProxy"),
      PromiseRouter: getContract("PromiseRouterUpgradeBeaconProxy"),
      RelayerFeeRouter: getContract("RelayerFeeRouterUpgradeBeaconProxy"),
    },
    messaging: isHub
      ? {
          RootManager: getContract("RootManager"),
          MainnetConnector: getContract("MainnetL1Connector"),
          HubConnectors: connectors,
        }
      : {
          SpokeConnector: connectors[0],
        },
    TokenRegistry: getContract("TokenRegistryUpgradeBeaconProxy"),
  };
};
