import { constants } from "ethers";
import { getContext } from "../../router";

export const getTransactionManagerAddress = (chainId: number): string => {
  const { config } = getContext();
  const nxtpContractAddress = config.chains[chainId].deployments.transactionManager;
  if (!nxtpContractAddress) {
    throw new Error(`No transactionManager contract exists for chain ${chainId}`);
  }
  return nxtpContractAddress;
};

export const getStableSwapAddress = (chainId: number): string => {
  // Not implemented yet
  return constants.AddressZero;
};
