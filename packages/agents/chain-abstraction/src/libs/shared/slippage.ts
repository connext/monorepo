import { BigNumberish } from "ethers";
import { chainIdToDomain, domainToChainId } from "@connext/nxtp-utils";

import { getCoingeckoID, getTokenVSusdPrice } from "../../helpers/asset";

import { getEstimateAmountRecieved } from "./quote";
import { DEPLOYED_ADDRESSES } from "../../helpers";

/**
 * Returns the `price` from the swaps
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
    const tokenId = await getCoingeckoID(inputToken);
    // calculate USD price of input token using amount in
    const initialPriceInUSD = await getTokenVSusdPrice(tokenId, amountIn, inputDecimal);
    console.log(initialPriceInUSD);
    // now calculate for the final price

    const outputTokenID = await getCoingeckoID(outputToken);
    const finalPriceInUSD = await getTokenVSusdPrice(outputTokenID, quoteAmountOut, outputDecimal);
    return ((initialPriceInUSD - finalPriceInUSD) * 100) / initialPriceInUSD;
  } catch (err: unknown) {
    throw Error(`Failed to get Price Impact ${(err as Error).message}`);
  }
};

export const getSlippageDistribution = async (
  _slippage: string = "300",
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
  const _underlyingAssetDecimal = 18;
  const originPriceImpact = await getPriceImpactForSwaps(
    inputToken,
    inputDecimal,
    domainToChainId(+originDomain),
    originRpc,
    _underlyingAsset,
    _underlyingAssetDecimal,
    amountIn,
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
  );

  const destinationSlippage = destinationPriceImpact + destinationPriceImpact * 0.2;

  const connextSlippage = slippage - originSlippage - destinationSlippage;
  return {
    originSlippage,
    destinationSlippage,
    connextSlippage,
  };
};
