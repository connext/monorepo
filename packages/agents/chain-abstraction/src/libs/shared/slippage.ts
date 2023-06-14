import { BigNumberish } from "ethers";
import { chainIdToDomain } from "@connext/nxtp-utils";

import { getCoingeckoID, getTokenVSusdPrice } from "../../helpers/asset";

import { getEstimateAmountRecieved } from "./quote";

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
    //   const _inputToken = inputToken;
    //   const _outputToken = outputToken;
    //   const _amountIn = amountIn;
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

    // now calculate for the final price

    return quoteAmountOut;
  } catch (err: unknown) {
    throw Error(`Failed to get Price Impact ${(err as Error).message}`);
  }
};
