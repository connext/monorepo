import { domainToChainId } from "@connext/nxtp-utils";

import { DestinationSwapperPerDomain, OriginSwapperPerDomain, SwapQuoteFns } from "../../helpers";

/**
 * Returns the amount out received for a given exact input
 *
 * @param domainId - The target domain ID.
 * @param rpc - The RPC endpoint for a given domain.
 * @param fromAsset - The from token address
 * @param toAsset - The to token address
 * @param amountIn - The amount of the from token
 */
export const getAmountOut = async (
  domainId: string,
  rpc: string,
  fromAsset: string,
  toAsset: string,
  amountIn: string,
  fee?: string,
  isOrigin = true,
): Promise<string> => {
  const quoterConfig = isOrigin ? OriginSwapperPerDomain[domainId] : DestinationSwapperPerDomain[domainId];

  if (!quoterConfig) {
    throw new Error(`No quoter config for domain: ${domainId}`);
  }
  const chainId = domainToChainId(+domainId);

  const swapQuoteCallbackFn = SwapQuoteFns[quoterConfig.type];
  const amountOut = await swapQuoteCallbackFn({
    chainId,
    quoter: quoterConfig.quoter,
    rpc,
    fromAsset,
    toAsset,
    amountIn,
    fee,
  });

  return amountOut;
};
