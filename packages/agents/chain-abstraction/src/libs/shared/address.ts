import { DestinationSwapperPerDomain, OriginSwapperPerDomain, DEPLOYED_ADDRESSES } from "../../helpers";
import { Swapper } from "../../types";

/**
 * Returns the SwapAndXcall contract address of given domainId
 *
 */
export const getSwapAndXcallAddress = (domainId: string): string => {
  return DEPLOYED_ADDRESSES.swapandxcall[domainId];
};

/**
 * Returns the Swapper config contract address of given domainId
 *
 */
export const getSwapperConfig = (
  domainId: string,
  isOrigin = true,
): { type: Swapper; address: string; quoter: string } => {
  return isOrigin ? OriginSwapperPerDomain[domainId] : DestinationSwapperPerDomain[domainId];
};
