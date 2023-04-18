import { providers, constants, BigNumber } from "ethers";

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
 * @param route - (optional) The address of the `swapper` contract and the data to call the swapper contract with
 * @param calldata - (optional) The calldata to execute (can be empty: "0x").
 */
export const prepareSwapAndXCall = async (params: SwapAndXCallParams): Promise<providers.TransactionRequest> => {
  const {
    originDomain,
    destinationDomain,
    fromAsset,
    toAsset,
    amountIn,
    to,
    delegate: _delegate,
    slippage: _slippage,
    route: _route,
    callData: _callData,
    relayerFeeInNativeAsset: _relayerFeeInNativeAsset,
    relayerFeeInTransactingAsset: _relayerFeeInTransactingAsset,
  } = params;

  const delegate = _delegate ?? to;
  const slippage = _slippage ?? "300";
  const relayerFeeInNativeAsset = _relayerFeeInNativeAsset ? BigNumber.from(_relayerFeeInNativeAsset) : constants.Zero;
  const relayerFeeInTransactingAsset = _relayerFeeInTransactingAsset
    ? BigNumber.from(_relayerFeeInTransactingAsset)
    : constants.Zero;

  const originRoute =
    _route ?? (await calculateRouteForSwapAndXCall(originDomain, fromAsset, toAsset, amountIn, slippage));

  throw new Error("ToDo");
};

/**
 * Calculates the best route (swapper and swapdata) for the `SwapAndXCall` contract call.
 *
 * @param domainId - The origin domain
 * @param fromAsset - The address of the asset to swap from.
 * @param toAsset - The address of the asset to swap to.
 * @param amountIn - The number of `fromAsset` tokens.
 * @param slippage - Maximum acceptable slippage in BPS which defaults to 300. For example, a value of 300 means 3% slippage.
 */
export const calculateRouteForSwapAndXCall = async (
  domainId: string,
  fromAsset: string,
  toAsset: string,
  amountIn: string,
  slippage: string,
): Promise<{ swapper: string; swapData: string }> => {
  throw new Error("ToDo");
};
