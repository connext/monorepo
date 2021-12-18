// All utilities for swap calculations, including fees.
import { BigNumber, constants } from "ethers";

import { getRateFromPercentage } from "./util";
import { calculateExchangeAmount, calculateExchangeWad } from "./math";
import { GAS_ESTIMATES } from "./gasEstimates";

const ROUTER_FEE = "0.05"; // 0.05%
const L1_GAS_LIMIT_CHAINS = [10];

export enum TaxedMethod {
  SenderFulfill,
  ReceiverPrepare,
  ReceiverFulfill,
}

const DEFAULT_METATX_METHODS = [TaxedMethod.SenderFulfill, TaxedMethod.ReceiverFulfill];

type ChainInfo = {
  id: number;
  // Gas price in wei of native token.
  gasPrice: BigNumber;
  // Native token price in USD wei.
  ethPrice: BigNumber;
};

type AssetInfo = {
  id: number;
  decimals: number;
  // Price in USD wei.
  price: BigNumber;
};

type TransferOutput = {
  id: string; // Target asset ID, will be redundant but good for sanity check.
  amount: string; // What the resulting amount will be in target asset, after swap rate and fees are applied.
  swapRate: string; // Applied vAMM swap rate, if applicable (in fee estimates, this won't be).
  fees: {
    total: string; // Amount of asset deducted from initial receiving amount; the sum of everything in `details`.
    details: {
      gas: {
        router: string; // Amount of asset === value in USD for the gas cost for all router-executed transactions.
        relayer: string; // Amount of asset === value in USD for the gas cost + relayer fee for all relayer-executed transactions.
      };
      lp: string; // This is the 0.05% router fee in target asset.
    };
  };
};

/**
 * Returns the exchange rate, which is the market price of receiving token divided by the
 * market price of the sending token.
 *
 * @param sendingTokenPrice - The price of the sending token in USD Wei (18 decimals).
 * @param receivingTokenPrice - The price of the receiving token in USD Wei (18 decimals).
 *
 * @returns BigNumber - The exchange rate.
 */
export const getExchangeRate = (sendingTokenPrice: BigNumber, receivingTokenPrice: BigNumber): BigNumber => {
  return receivingTokenPrice.div(sendingTokenPrice);
};

/**
 * Calculates the vAMM swap rate, which is determined by the ratio between the router's respective liquidity
 * balances on the sending and receiving chains.
 *
 * @param TODO
 * @returns string - The vAMM swap rate.
 *
 * @remarks
 * TODO: getSwapRate using AMM
 */
export const getSwapRate = async (): Promise<string> => {
  return "1";
};

/**
 * Returns the meta tx buffer in percentage points (integer). The buffer is
 * a flat fee that is applied to the gas fee used to incentivize relayers.
 *
 * @returns Percentage value to be added.
 */
export const getMetaTxBuffer = () => {
  return 10; // 10%
};

/**
 * Get gas fee total in target token amount.
 *
 * @param tokenPrice - Target token price in USD Wei (18 decimals).
 * @param tokenDecimals - Target token decimals.
 * @param sendingChainInfo - Relevant info needed for sending chain.
 * @param receivingChainInfo - Relevant info needed for receiving chain.
 * @param metaTxMethods - Methods to which the additional flat relayer fee is applied.
 *
 * @returns BigNumber - Gas fee total in target token amount.
 *
 * @remarks
 * Math for calculating gas fee in target token amount for a given method:
 *
 *            gasPriceWei * methodGasLimit * nativeTokenPriceUSD
 * gasFee  = ---------------------------------------------------- * relayerFee? * 10^(tokenDecimals - 18)
 *                       targetTokenPriceUSD
 *
 */
export const getGasFees = (
  tokenPrice: BigNumber,
  tokenDecimals: number,
  sendingChainInfo: ChainInfo,
  receivingChainInfo: ChainInfo,
  metaTxMethods: TaxedMethod[] = DEFAULT_METATX_METHODS,
): BigNumber => {
  const operations = [
    {
      method: TaxedMethod.SenderFulfill,
      chain: sendingChainInfo,
    },
    {
      method: TaxedMethod.ReceiverPrepare,
      chain: receivingChainInfo,
    },
    {
      method: TaxedMethod.ReceiverFulfill,
      chain: receivingChainInfo,
    },
  ];
  let total = BigNumber.from(0);
  for (const operation of operations) {
    const { id, gasPrice, ethPrice } = operation.chain;
    // Get estimate in gas units for this method.
    const gasLimit = getGasEstimateForMethod(id, operation.method);
    // Get the gas price in USD. It will be in wei units - 18 decimals.
    const gasPriceUsd = gasPrice.mul(gasLimit).mul(ethPrice);
    // Token amount = (gasPriceUsd / tokenPriceUsd) / 10^(18 - tokenDecimals)
    const tokenAmount = tokenPrice.isZero()
      ? constants.Zero
      : gasPriceUsd.div(tokenPrice).div(BigNumber.from(10).pow(18 - tokenDecimals));
    // Apply relayer fee if applicable.
    const final = metaTxMethods.includes(operation.method)
      ? tokenAmount.add(tokenAmount.mul(getMetaTxBuffer()).div(100))
      : tokenAmount;
    // Add to the total fees.
    total = total.add(final);
  }
  return total;
};

const getGasEstimateForMethod = (chainId: number, method: TaxedMethod): string => {
  if (L1_GAS_LIMIT_CHAINS.includes(chainId)) {
    switch (method) {
      case TaxedMethod.SenderFulfill:
        return GAS_ESTIMATES.fulfillL1;
      case TaxedMethod.ReceiverFulfill:
        return GAS_ESTIMATES.fulfillL1;
      case TaxedMethod.ReceiverPrepare:
        return GAS_ESTIMATES.prepareL1;
    }
  }
  switch (method) {
    case TaxedMethod.SenderFulfill:
      return GAS_ESTIMATES.fulfill;
    case TaxedMethod.ReceiverFulfill:
      return GAS_ESTIMATES.fulfill;
    case TaxedMethod.ReceiverPrepare:
      return GAS_ESTIMATES.prepare;
  }
};

/**
 * Calculates gas fees, get vAMM swap rate, and applies router fee. Returns an object with the total receiving amount as well as
 * all the details for fees, swap rate, etc.
 *
 * If sendingAmount is 0 (which is valid for fee estimation), the
 * receiving `amount` will be negative, and only the gas fees will be calculated.
 *
 * Additionally, caller should specify which methods to apply relayer fees to.
 *
 * If router balances aren't supplied, swap rate will default to 1 (which is valid for fee estimation).
 */
// TODO: Convert below getReceivingAmount method to use this signature:
// export const getReceivingAmount = (
//   sendingAmount: BigNumberish,
//   sendingChain: ChainInfo,
//   sendingAsset: AssetInfo,
//   receivingChain: ChainInfo,
//   receivingAsset: AssetInfo,
// ): TransferOutput => {

// };

/**
 * Returns the amount * swapRate to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the swapRate
 *
 * @remarks
 * Here is the math:
 *                                                  sendingAssetValueUSD
 *   receivingAssetTokens = sendingAssetTokens *  ------------------------ * (ammSwapRate) - gasFeesInReceivingAssetTokens
 *                                                 receivingAssetValueUSD
 */
export const getReceivingAmount = async (
  amount: string,
  inputDecimals: number,
  outputDecimals: number,
): Promise<{ receivingAmount: string; routerFee: string; amountAfterSwapRate: string }> => {
  // 1. swap rate from AMM
  const swapRate = await getSwapRate();
  const amountAfterSwapRate = calculateExchangeWad(BigNumber.from(amount), inputDecimals, swapRate, outputDecimals);

  // 2. flat fee by Router
  const routerFeeRate = getRateFromPercentage(ROUTER_FEE);
  const receivingAmountFloat = calculateExchangeAmount(amountAfterSwapRate.toString(), routerFeeRate);

  const receivingAmount = receivingAmountFloat.split(".")[0];

  const routerFee = amountAfterSwapRate.sub(receivingAmount);

  return { receivingAmount, routerFee: routerFee.toString(), amountAfterSwapRate: amountAfterSwapRate.toString() };
};
