import { SwapDataFns } from "../../helpers";
import { DestinationCallDataParams, Swapper, XReceiveTarget } from "../../types";
import { ForwardCallDataFns } from "../destination";

/**
 * Generates the `calldata` to be put into the `xcall` on the origin domain for a given target
 * @param target - The name of xReceive target
 * @param swapper - The swapper type which can be either of univ2, univ3 and oneinch
 * @param params - The destination calldata params
 *
 * @returns encoded calldata
 */
export const getXCallCallData = async (
  target: XReceiveTarget,
  swapper: Swapper,
  params: DestinationCallDataParams,
): Promise<string> => {
  const forwardCallDataCallbackFn = ForwardCallDataFns[target];
  const OriginSwapDataCallbackFn = SwapDataFns[swapper];
  const fowardCallData = forwardCallDataCallbackFn(params.swapForwarderData.forwardCallData);
  const swapperData = 
};
