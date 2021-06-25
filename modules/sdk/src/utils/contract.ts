import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { Contract, providers, utils, constants } from "ethers";

export const getTransactionManagerContract = (
  chainId: number,
  userWebProvider: providers.Web3Provider,
): { address: string; abi: any; instance: Contract } => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  console.log(record, name);
  if (!name) {
    throw new Error("Chain not supported yet, please contact connext team");
  }

  // TODO: fix me!
  if (name === "hardhat") {
    return { address: constants.AddressZero, abi: TransactionManagerArtifact.abi, instance: {} as Contract };
  }

  const abi = record[name]?.contracts?.TransactionManager?.abi;
  const address = record[name]?.contracts?.TransactionManager?.address;

  const instance = new Contract(address, abi, userWebProvider);

  return { address, abi, instance };
};

export const getRandomBytes32 = () => {
  return utils.hexlify(utils.randomBytes(32));
};
