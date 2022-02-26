import { getReceiverAmount as _getReceiverAmount } from "@connext/nxtp-utils";
import { AmountInvalid } from "../errors";

/**
 * Returns the amount * swapRate to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the swapRate
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * swapRate`
 */
export const getReceiverAmount = async (
  amount: string,
  inputDecimals: number,
  outputDecimals: number,
): Promise<{ receivingAmount: string; routerFee: string; amountAfterSwapRate: string }> => {
  if (amount.includes(".")) {
    throw new AmountInvalid(amount);
  }
  return await _getReceiverAmount(amount, inputDecimals, outputDecimals);
};
