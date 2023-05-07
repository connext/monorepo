import { BigNumber, utils } from "ethers";
import { DEFAULT_ROUTER_FEE, calculateExchangeWad, domainToChainId } from "@connext/nxtp-utils";

import { DestinationSwapperPerDomain, OriginSwapperPerDomain, SwapQuoteFns } from "../../helpers";
import { SwapQuoteParams, Swapper } from "../../types";
import { getPoolFeeForUniV3 } from "../origin";

/**
 * Returns the amount out received after swapping
 *
 * @param params: SwapQuoteParams object
 */
export const getSwapAmountOut = async (params: SwapQuoteParams, isOrigin = true): Promise<string> => {
  const { domainId, rpc, fromAsset, toAsset, amountIn, fee: _fee } = params;

  // If same asset, return amountIn
  if (utils.getAddress(fromAsset) == utils.getAddress(toAsset)) {
    return amountIn;
  }

  const quoterConfig = isOrigin ? OriginSwapperPerDomain[domainId] : DestinationSwapperPerDomain[domainId];

  if (!quoterConfig) {
    throw new Error(`No quoter config for domain: ${domainId}`);
  }
  const chainId = domainToChainId(+domainId);

  const swapQuoteCallbackFn = SwapQuoteFns[quoterConfig.type];

  let fee = _fee;
  if (quoterConfig.type === Swapper.UniV3 && !fee) {
    fee = await getPoolFeeForUniV3(domainId, rpc, fromAsset, toAsset);
  }

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

/**
 * Returns the amount out received after bridging
 *
 * @param originParams: SwapQuoteParams object of origin chain
 * @param destinationParams: SwapQuoteParams object of destination chain
 * @param originToDecimals: The decimals of the to token on origin side
 * @param destinationFromDecimals: The decimals of the from token on destination side
 */
export const getBridgeAmountOut = async (
  originParams: SwapQuoteParams,
  destinationParams: SwapQuoteParams,
  originToDecimals = 18,
  destinationFromDecimals = 18,
): Promise<string> => {
  const amountOutAfterOriginSwap = await getSwapAmountOut(originParams, true);

  // calculate router fee
  const feeBps = +DEFAULT_ROUTER_FEE * 100;
  const destinationAmount = calculateExchangeWad(
    BigNumber.from(amountOutAfterOriginSwap),
    originToDecimals,
    "1",
    destinationFromDecimals,
  )
    .mul(10000 - feeBps)
    .div(10000);

  const amountOut = await getSwapAmountOut(
    {
      ...destinationParams,
      amountIn: destinationAmount.toString(),
    },
    false,
  );

  return amountOut;
};
