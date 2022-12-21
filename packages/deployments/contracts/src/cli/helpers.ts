import { Contract, Wallet } from "ethers";

import _Deployments from "../../deployments.json";
import { ConnextInterface } from "../contracts";

import { Deployment } from "./types";

const Deployments = _Deployments as any;

// Custom function to format lookup by env and double check that the contract retrieved is not null.
export const getContract = (name: string, chain: string, useStaging: boolean, wallet?: Wallet): Deployment => {
  const deployments = Deployments[chain];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chain}!`);
  }
  const contracts = deployments[0]["contracts"] as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chain}!`);
  }

  const envSuffix = useStaging ? "Staging" : "";
  const isConnext = name.includes("Connext");
  const key = isConnext ? `Connext${envSuffix}_DiamondProxy` : name + envSuffix;
  const result = contracts[key];
  if (!result) {
    throw new Error(`Contract ${key} was not found in deployments.json!`);
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
    contract: new Contract(
      result.address as string,
      // Special case if this is the Connext diamond.
      isConnext ? ConnextInterface : abi,
      wallet,
    ),
  };
};
