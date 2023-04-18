import { providers } from "ethers";

import { SwapAndXCallParams } from "../../types";

/**
 * Prepares `SwapAndXCall` inputs and encodes the calldata. Returns `providers.TransactionRequest` object to be sent to the RPC provider.
 *
 * @param originDomain - The origin domain ID.
 * @param destinationDomain - The destination domain ID.
 * @param fromAsset - The address of the asset to swap from.
 * @param toAsset - The address of the asset to swap to.
 * @param amountIn - The number of `fromAsset` tokens.
 * @param to - The address to send the asset and call with the calldata on the destination.
 * @param delegate - (optional) The fallback address on the destination domain which defaults to `to`.
 * @param slippage - (optional) Maximum acceptable slippage in BPS which defaults to 300. For example, a value of 300 means 3% slippage.
 * @param swapper - (optional) The address of the swapper contract.
 * @param swapData - (optional) The data to call the swapper contract with.
 * @param calldata - (optional) The calldata to execute (can be empty: "0x").
 */
export const prepareSwapAndXCall = async (params: SwapAndXCallParams): Promise<providers.TransactionRequest> => {
  throw new Error("ToDo");
};
