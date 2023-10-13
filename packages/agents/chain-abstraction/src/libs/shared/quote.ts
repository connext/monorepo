import { BigNumber, utils } from "ethers";
import { DEFAULT_ROUTER_FEE, calculateExchangeWad, domainToChainId } from "@connext/nxtp-utils";

import {
  DestinationSwapperPerDomain,
  OriginSwapperPerDomain,
  SwapQuoteFns,
  DEPLOYED_ADDRESSES,
  initCoreSDK,
  getSwapPathForUniV3 as _getSwapPathForUniV3,
  getSwapPathForUniV2 as _getSwapPathForUniV2,
  // getSwapPathForHoneySwap as _getSwapPathForHoneySwap,
  getPathForPanCake as _getPathForPanCake,
} from "../../helpers";
import { SwapQuoteParams, Swapper, EstimateQuoteAmountArgs, SwapQuoteCallbackArgs } from "../../types";
import { getPoolFeeForUniV3 } from "../origin";

/**
 * Returns the amount out received after swapping
 *
 * @param params: SwapQuoteParams object
 */

export const getSwapPathForUniV3 = _getSwapPathForUniV3;
export const getSwapPathForUniV2 = _getSwapPathForUniV2;
// export const getSwapPathForHoneySwap = _getSwapPathForHoneySwap;
export const getPathForPanCake = _getPathForPanCake;

export const getSwapAmountOut = async (params: SwapQuoteParams, isOrigin = true): Promise<string> => {
  const { domainId, rpc, fromAsset, toAsset, amountIn, fee: _fee, config } = params;

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
    config,
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

export const getEstimateAmountReceived = async (args: EstimateQuoteAmountArgs): Promise<string> => {
  const {
    originDomain,
    destinationDomain,
    originRpc,
    destinationRpc,
    fromAsset,
    toAsset,
    amountIn,
    fee,
    signerAddress,
    config,
  } = args;
  // checking the swapper

  const originChainID = domainToChainId(originDomain);
  const destinationChainID = domainToChainId(destinationDomain);
  const originQuoter = OriginSwapperPerDomain[originDomain];
  const destinationQuoter = DestinationSwapperPerDomain[destinationDomain];

  const originSwapFunction = SwapQuoteFns[originQuoter.type];

  // just check for the swap

  const originUnderlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[originDomain.toString()];
  const destinationUnderlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[destinationDomain.toString()];

  const _toAsset = originDomain === destinationDomain ? toAsset : originUnderlyingAsset; // origin Side
  try {
    let _fee = fee;
    if (originQuoter.type === Swapper.UniV3 && !_fee) {
      _fee = await getPoolFeeForUniV3(
        originDomain.toString(),
        originRpc,
        utils.getAddress(fromAsset),
        utils.getAddress(_toAsset),
      );
    }

    const args: SwapQuoteCallbackArgs = {
      chainId: originChainID,
      quoter: originQuoter.quoter,
      rpc: originRpc,
      fromAsset,
      toAsset: _toAsset,
      amountIn,
      fee: _fee,
      config,
    };

    // Step 1: Calculate amountOut after origin swaps

    const originSwapAmountOut = fromAsset !== _toAsset ? await originSwapFunction(args) : amountIn;
    if (originDomain === destinationDomain) return originSwapAmountOut;

    // initing the core sdk for calculating amount Received after bridging
    const { sdkBase } = await initCoreSDK(signerAddress, originDomain, destinationDomain, originRpc, destinationRpc);

    // Step 2: Calculate amount after bridge.
    const { amountReceived } =
      (await sdkBase.calculateAmountReceived(
        originDomain.toString(),
        destinationDomain.toString(),
        _toAsset,
        originSwapAmountOut,
      )) || {};

    if (!amountReceived) {
      throw Error("Failed to fetch estimate bridging amountOut");
    }
    if (toAsset === destinationUnderlyingAsset) return amountReceived.toString();

    if (destinationQuoter.type === Swapper.UniV3 && !_fee) {
      _fee = await getPoolFeeForUniV3(
        destinationDomain.toString(),
        destinationRpc,
        utils.getAddress(destinationUnderlyingAsset),
        utils.getAddress(toAsset),
      );
    }

    // check for the destination swaps quote
    // Step 3: Calculate amount after destination swap
    const destinationArgs: SwapQuoteCallbackArgs = {
      chainId: destinationChainID,
      quoter: destinationQuoter.quoter,
      rpc: destinationRpc,
      amountIn: amountReceived.toString(),
      fromAsset: destinationUnderlyingAsset,
      toAsset,
      fee: _fee,
      config,
    };
    const destinationSwapFunction = SwapQuoteFns[destinationQuoter.type];
    const amountOut =
      destinationUnderlyingAsset !== toAsset
        ? await destinationSwapFunction(destinationArgs)
        : amountReceived.toString();
    return amountOut;
  } catch (err: unknown) {
    throw Error(`Failed to swap with Error: ${(err as Error).message}`);
  }
};
