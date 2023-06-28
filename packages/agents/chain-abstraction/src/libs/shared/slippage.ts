import { BigNumberish, ethers } from "ethers";
import { chainIdToDomain, domainToChainId } from "@connext/nxtp-utils";

import { getCoingeckoIDs, getTokenPricesInUsd } from "../../helpers/asset";
import { DEPLOYED_ADDRESSES } from "../../helpers";

import { getEstimateAmountReceived } from "./quote";

/**
 * Returns the `priceImpact` from the swaps
 */
export const getPriceImpactForSwaps = async (
  inputToken: string,
  inputDecimal: number,
  chainID: number,
  rpc: string,
  outputToken: string,
  outputDecimal: number,
  amountIn: BigNumberish,
  signerAddress: string,
) => {
  try {
    const domainID = chainIdToDomain(chainID);
    const quoteAmountOut = await getEstimateAmountReceived({
      originDomain: domainID,
      destinationDomain: domainID,
      amountIn: amountIn.toString(),
      originRpc: rpc,
      destinationRpc: rpc,
      fromAsset: inputToken,
      toAsset: outputToken,
      signerAddress,
    });
    // get coingecko tokenID against address
    const tokenIds = await getCoingeckoIDs([inputToken, outputToken]);
    const tokenPrices = await getTokenPricesInUsd(
      [tokenIds[inputToken], tokenIds[outputToken]],
      [amountIn, quoteAmountOut],
      [inputDecimal, outputDecimal],
    );
    const initialPriceInUSD = tokenPrices[0];
    const finalPriceInUSD = tokenPrices[1];
    return (Math.abs(initialPriceInUSD - finalPriceInUSD) * 100) / initialPriceInUSD;
  } catch (err: unknown) {
    throw Error(`Failed to get Price Impact ${(err as Error).message}`);
  }
};

/**
 * Returns the `slippage distribution` among the swaps
 */
export const getSlippageDistribution = async (
  inputToken: string,
  originDomain: number,
  destinationDomain: number,
  originRpc: string,
  destinationRpc: string,
  outputToken: string,
  outputDecimal: number,
  amountIn: BigNumberish,
  signerAddress: string,
  inputDecimal: number,
  _slippage?: string,
) => {
  if (inputToken === outputToken) {
    throw new Error("Slippage cannot be calculated in same tokens");
  }
  const slippage = _slippage ?? "300";
  const _underlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[originDomain];
  const _underlyingAssetDecimal = 6;
  console.log(inputToken, _underlyingAsset, "tokens");
  const originPriceImpact =
    inputToken !== _underlyingAsset
      ? await getPriceImpactForSwaps(
          inputToken,
          inputDecimal,
          domainToChainId(+originDomain),
          originRpc,
          _underlyingAsset,
          _underlyingAssetDecimal,
          amountIn.toString(),
          signerAddress,
        )
      : 0;
  const originSlippage = originPriceImpact + originPriceImpact * 0.2; // origin slippage
  if (originDomain === destinationDomain) {
    return {
      originSlippage,
      destinationSlippage: 0,
      connextSlippage: 0,
    };
  }
  const _destinationUnderlying = DEPLOYED_ADDRESSES.USDCAddress[destinationDomain];
  console.log(inputToken, _destinationUnderlying, "destination estimate");

  const quoteDestinationAmount = await getEstimateAmountReceived({
    originDomain,
    destinationDomain,
    originRpc,
    destinationRpc,
    amountIn: amountIn.toString(),
    fromAsset: inputToken,
    toAsset: _destinationUnderlying,
    signerAddress,
  });

  const destinationPriceImpact =
    _destinationUnderlying !== outputToken
      ? await getPriceImpactForSwaps(
          _destinationUnderlying,
          6,
          domainToChainId(+destinationDomain),
          destinationRpc,
          outputToken,
          outputDecimal,
          quoteDestinationAmount,
          signerAddress,
        )
      : 0;

  const destinationSlippage = destinationPriceImpact + destinationPriceImpact * 0.2;

  const connextSlippage = +slippage - originSlippage - destinationSlippage;
  return {
    originSlippage,
    destinationSlippage,
    connextSlippage,
  };
};

/**
 * Returns the `amountOutMin` from the uniswap V3.
 * Should be passed in getXCallCallData in destination params
 */
export const getAmountOutMinForUniV3 = async (
  inputToken: string,
  outputToken: string,
  rpc: string,
  domainID: number,
  amountIn: BigNumberish,
  signerAddress: string,
  slippage: number, // slippage needs to pass after slippage calculation
  outputDecimal: number,
) => {
  try {
    const quoteAmountOut = await getEstimateAmountReceived({
      originDomain: domainID,
      destinationDomain: domainID,
      amountIn: amountIn.toString(),
      originRpc: rpc,
      destinationRpc: rpc,
      fromAsset: inputToken,
      toAsset: outputToken,
      signerAddress,
    });

    return parseFloat(ethers.utils.formatUnits(quoteAmountOut, outputDecimal)) * (1 - slippage);
  } catch (err: unknown) {
    throw Error("Failed to get Minimum Amount Out for UniV3");
  }
};
