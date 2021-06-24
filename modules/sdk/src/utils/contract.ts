import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import { constants } from "ethers";

export const getTransactionManagerContract = (chainId: number): { address: string; abi: any } => {
  const record = (contractDeployments as any)[chainId] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    throw new Error("Chain not supported yet, please contact connext team");
  }

  // TODO: fix me!
  if (name === "hardhat") {
    return { address: constants.AddressZero, abi: TransactionManagerArtifact.abi };
  }

  const abi = record[name]?.contracts?.TransactionManager?.abi;
  const address = record[name]?.contracts?.TransactionManager?.address;

  return { address, abi };
};
