import { Contract, utils, Wallet } from "ethers";

import _Deployments from "../../../deployments.json";
import { ConnextHandlerInterface } from "../../contracts";
import { Router__factory } from "../../typechain-types";

import { Deployment, DomainDeployments, NetworkStack } from "./types";

const Deployments = _Deployments as any;

export const getDeployments = (args: {
  deployer: Wallet;
  network: NetworkStack;
  isHub: boolean;
  useStaging: boolean;
}): DomainDeployments => {
  const { network, isHub, useStaging, deployer: _deployer } = args;
  const chain = network.chain;
  const deployments = Deployments[chain];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chain}!`);
  }
  const contracts = deployments[0]["contracts"] as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chain}!`);
  }
  const env = useStaging ? "Staging" : "";

  const deployer = _deployer.connect(network.rpc);

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
          contract: new Contract(contract.address as string, contract.abi as any[], deployer),
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
          contract: new Contract(contract.address as string, contract.abi as any[], deployer),
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
    const isConnextHandler = contract.includes("ConnextHandler");
    const key = isConnextHandler ? `ConnextHandler${env}_DiamondProxy` : contract + env;
    const result = contracts[key];
    if (!result) {
      throw new Error(`Contract ${key} was not found in deployments.json!`);
    } else if (!result.address || !result.abi) {
      throw new Error(`Contract ${key} was missing address or ABI in deployments.json!`);
    }

    // Use the ABI of the implementation contract, if applicable.
    let abi = result.abi as any[];
    const implementation = contract.includes("UpgradeBeaconProxy")
      ? contract.replace("UpgradeBeaconProxy", "")
      : undefined;
    if (implementation) {
      const found = contracts[implementation];
      if (found && found.abi) {
        abi = found.abi as any[];
      }
    }

    // If this is a Router/Handler contract, append the core Router ABI.
    if (contract.includes("Router")) {
      abi = abi.concat((Router__factory.createInterface() as utils.Interface).fragments);
    }

    return {
      proxy: key,
      name: isConnextHandler ? "Connext" : implementation ?? contract,
      address: result.address,
      abi,
      contract: new Contract(
        result.address as string,
        // Special case if this is the Connext diamond.
        isConnextHandler ? ConnextHandlerInterface : abi,
        deployer,
      ),
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
          MainnetConnector: getContract("MainnetSpokeConnector"),
          HubConnectors: connectors,
        }
      : {
          SpokeConnector: connectors[0],
        },
    TokenRegistry: getContract("TokenRegistryUpgradeBeaconProxy"),
  };
};
