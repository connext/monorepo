import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { Contract, providers, constants, BigNumberish } from "ethers";

export const getTransactionManagerContract = (
  chainId: number,
  userWebProvider?: providers.Web3Provider,
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

  let instance: Contract;
  if (userWebProvider) {
    instance = new Contract(address, abi, userWebProvider);
  } else {
    instance = new Contract(address, abi);
  }

  return { address, abi, instance };
};

export type VariableTransactionData = {
  user: string;
  amount: BigNumberish;
  expiry: string;
  blockNumber: string;
  digest: string;
};

export const getActiveTransactionsByUser = async (
  chainId: number,
  userAddress: string,
): Promise<VariableTransactionData[]> => {
  const { instance } = getTransactionManagerContract(chainId);

  const res = await instance.getActiveTransactionsByUser(userAddress);
  console.log(res);

  return res;
};
