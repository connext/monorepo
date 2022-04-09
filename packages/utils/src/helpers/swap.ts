import { BigNumber } from "ethers";

import { DEFAULT_ROUTER_FEE } from "../";

import { getRateFromPercentage, calculateExchangeAmount, calculateExchangeWad } from ".";

/**
 * Returns the swapRate
 *
 * @param TODO
 * @returns The swapRate, determined by the AMM
 *
 * @remarks
 * TODO: getSwapRate using AMM
 */
export const getSwapRate = async (): Promise<string> => {
  return "1";
};

/**
 * Returns the amount * swapRate to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the swapRate
 *
 * @remarks
 * Router executes on sending chain, so gets `amount`, and user executes on receiving chain so gets `amount * swapRate`
 */
export const getReceiverAmount = async (
  amount: string,
  inputDecimals: number,
  outputDecimals: number,
): Promise<{ receivingAmount: string; routerFee: string; amountAfterSwapRate: string }> => {
  // 1. swap rate from AMM
  const swapRate = await getSwapRate();
  const amountAfterSwapRate = calculateExchangeWad(BigNumber.from(amount), inputDecimals, swapRate, outputDecimals);

  // 2. flat fee by Router
  const routerFeeRate = getRateFromPercentage(DEFAULT_ROUTER_FEE);
  const receivingAmountFloat = calculateExchangeAmount(amountAfterSwapRate.toString(), routerFeeRate);

  const receivingAmount = receivingAmountFloat.split(".")[0];

  const routerFee = amountAfterSwapRate.sub(receivingAmount);

  return { receivingAmount, routerFee: routerFee.toString(), amountAfterSwapRate: amountAfterSwapRate.toString() };
};
