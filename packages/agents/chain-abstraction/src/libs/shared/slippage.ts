import { BigNumber, BigNumberish } from "ethers";
import { chainIdToDomain, domainToChainId } from "@connext/nxtp-utils";

import { getCoingeckoID, getTokenVSusdPrice } from "../../helpers/asset";
import { DEPLOYED_ADDRESSES } from "../../helpers";

import { getEstimateAmountRecieved } from "./quote";

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
    const quoteAmountOut = await getEstimateAmountRecieved({
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
    const tokens = await getCoingeckoID(inputToken, outputToken);
    const initialPriceInUSD = await getTokenVSusdPrice(tokens[0], amountIn, inputDecimal);
    const finalPriceInUSD = await getTokenVSusdPrice(tokens[1], quoteAmountOut, outputDecimal);
    return (Math.abs(initialPriceInUSD - finalPriceInUSD) * 100) / initialPriceInUSD;
  } catch (err: unknown) {
    throw Error(`Failed to get Price Impact ${(err as Error).message}`);
  }
};

/**
 * Returns the `slippgae Distribution` among the swaps
 */
export const getSlippageDistribution = async (
  _slippage = "300",
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
) => {
  const slippage = +_slippage;
  const _underlyingAsset = DEPLOYED_ADDRESSES.USDCAddress[originDomain];
  const _underlyingAssetDecimal = 6;
  const originPriceImpact = await getPriceImpactForSwaps(
    inputToken,
    inputDecimal,
    domainToChainId(+originDomain),
    originRpc,
    _underlyingAsset,
    _underlyingAssetDecimal,
    amountIn.toString(),
    signerAddress,
  );
  const originSlippage = originPriceImpact + originPriceImpact * 0.2; // origin slippage
  const _destinationUnderlying = DEPLOYED_ADDRESSES.USDCAddress[destinationDomain];

  const quoteDestinationAmount = await getEstimateAmountRecieved({
    originDomain,
    destinationDomain,
    originRpc,
    destinationRpc,
    amountIn: amountIn.toString(),
    fromAsset: inputToken,
    toAsset: _destinationUnderlying,
    signerAddress,
  });

  const destinationPriceImpact = await getPriceImpactForSwaps(
    _destinationUnderlying,
    6,
    domainToChainId(+destinationDomain),
    destinationRpc,
    outputToken,
    outputDecimal,
    quoteDestinationAmount,
    signerAddress,
  ); // error here

  const destinationSlippage = destinationPriceImpact + destinationPriceImpact * 0.2;

  const connextSlippage = slippage - originSlippage - destinationSlippage;
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
) => {
  try {
    const quoteAmountOut = await getEstimateAmountRecieved({
      originDomain: domainID,
      destinationDomain: domainID,
      amountIn: amountIn.toString(),
      originRpc: rpc,
      destinationRpc: rpc,
      fromAsset: inputToken,
      toAsset: outputToken,
      signerAddress,
    });

    return BigNumber.from(quoteAmountOut)
      .mul(1 - slippage)
      .toString();
  } catch (err: unknown) {
    throw Error("Failed to get Minimum Amount Out for UniV3");
  }
};
