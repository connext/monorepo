import * as zk from "zksync-ethers";
import { Contract, providers, Wallet } from "ethers";

import _Deployments from "../../../deployments.json";
import _DevnetDeployments from "../../../devnet.deployments.json";
import _LocalDeployments from "../../../local.deployments.json";

import { Deployment } from "./types";
import { ProtocolNetwork } from "../..";

const Deployments = _Deployments as any;
const DevnetDeployments = _DevnetDeployments as any;
const LocalDeployments = _LocalDeployments as any;

// Custom function to format lookup by env and double check that the contract retrieved is not null.
export const getContract = (
  name: string,
  chain: string,
  useStaging: boolean,
  connection?: Wallet | providers.JsonRpcProvider | zk.Wallet,
  network?: string,
): Deployment => {
  const contracts = getDeployedContracts(+chain, network);

  const envSuffix = useStaging ? "Staging" : "";
  const isConnext = name.includes("Connext");
  const key = isConnext ? `Connext${envSuffix}_DiamondProxy` : name + envSuffix;
  const result = contracts[key];
  if (!result) {
    throw new Error(`Contract ${key} on ${chain} was not found in deployments.json!`);
  } else if (!result.address || !result.abi) {
    throw new Error(`Contract ${key} was missing address or ABI in deployments.json!`);
  }

  // Use the ABI of the implementation contract, if applicable.
  let abi = result.abi as any[];
  const implementation = name.includes("UpgradeBeaconProxy") ? name.replace("UpgradeBeaconProxy", "") : undefined;

  if (implementation) {
    const implementation_with_env = useStaging ? implementation?.concat("Staging") : implementation;
    const found = contracts[implementation_with_env];
    if (found && found.abi) {
      abi = found.abi as any[];
    }
  }

  return {
    proxy: key,
    name: isConnext ? "Connext" : implementation ?? name,
    address: result.address,
    abi,
    contract: new Contract(result.address as string, abi, connection),
  };
};

export const getDeployedContracts = (chainId: number, network?: string): { [contract: string]: any } => {
  // get list of all deployments for chain
  const [deployments] = (
    network === ProtocolNetwork.LOCAL
      ? LocalDeployments
      : network === ProtocolNetwork.DEVNET
      ? DevnetDeployments
      : Deployments
  )[chainId];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chainId}!`);
  }
  const contracts = deployments.contracts as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chainId}!`);
  }
  return contracts;
};

export const getHubConnectors = (
  chainId: number,
  env: string,
  connection?: providers.JsonRpcProvider | Wallet,
  network?: string,
): Deployment[] => {
  const contracts = getDeployedContracts(chainId, network);

  const suffix = env === "staging" ? "Staging" : "";

  const connectors: Deployment[] = [];
  for (const key of Object.keys(contracts)) {
    // TODO: Use regex? Or a more flexible method?
    // Ignore accidental L2 or Spoke Connector deployments...
    if (key.includes("L2") || key.includes("Spoke")) {
      continue;
    }
    if (key.endsWith("Connector" + suffix) && !key.includes("Mainnet")) {
      const contract = contracts[key];
      connectors.push({
        name: key,
        address: contract.address,
        abi: contract.abi,
        contract: new Contract(contract.address as string, contract.abi as any[], connection),
      });
    }
  }

  return connectors;
};

export const getSpokeConnector = (
  chainId: number,
  env: string,
  connection?: providers.JsonRpcProvider | Wallet,
  network?: string,
): Deployment => {
  const contracts = getDeployedContracts(chainId, network);

  const suffix = env === "staging" ? "Staging" : "";

  const connectors: Deployment[] = [];
  for (const key of Object.keys(contracts)) {
    if (key.endsWith("L2Connector" + env) || key.endsWith("SpokeConnector" + suffix)) {
      const contract = contracts[key];
      connectors.push({
        name: key,
        address: contract.address,
        abi: contract.abi,
        contract: new Contract(contract.address as string, contract.abi as any[], connection),
      });
    }
  }
  if (connectors.length > 1) {
    throw new Error(
      `Multiple L2/Spoke Connectors found on spoke chain ${chainId} while consulting deployments.json! ` +
        "Please ensure outdated Connector deployment is deleted and removed.",
    );
  }
  if (connectors.length == 0) {
    throw new Error(`No L2/Spoke Connectors found on spoke chain ${chainId} while consulting deployments.json!`);
  }
  return connectors[0];
};
