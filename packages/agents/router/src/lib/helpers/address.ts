import { constants } from "ethers";
import { getContext } from "../../router";

export const getTransactionManagerAddress = (domain: string): string => {
  const { config } = getContext();
  const nxtpContractAddress = config.chains[domain].deployments.transactionManager;
  if (!nxtpContractAddress) {
    throw new Error(`No transactionManager contract exists for chain ${domain}`);
  }
  return nxtpContractAddress;
};

export const getStableSwapAddress = (domain: string): string => {
  // Not implemented yet
  return constants.AddressZero;
};
