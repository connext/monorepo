import { defaultAbiCoder } from "ethers/lib/utils";

import { DestinationSwapDataFns, SwapperPerDomain } from "../../helpers";
import { DestinationCallDataParams, Swapper, XReceiveTarget } from "../../types";
import { ForwardCallDataFns } from "../destination";

/**
 * Generates the `calldata` to be put into the `xcall` on the origin domain for a given target
 * @param domainId - The destination domain ID.
 * @param target - The name of xReceive target.
 * @param swapper - The swapper type which can be either of univ2, univ3 and oneinch.
 * @param params - The destination calldata params.
 *
 * @returns encoded calldata
 */
export const getXCallCallData = async (
  domainId: string,
  target: XReceiveTarget,
  swapper: Swapper,
  params: DestinationCallDataParams,
): Promise<string> => {
  const forwardCallDataCallbackFn = ForwardCallDataFns[target];
  const destinationSwapDataCallbackFn = DestinationSwapDataFns[swapper];
  const forwardCallData = forwardCallDataCallbackFn(params.swapForwarderData.forwardCallData);
  const encodedSwapperData = destinationSwapDataCallbackFn(params.swapForwarderData.swapData);

  const swapperConfig = SwapperPerDomain[domainId];

  const swapForwarderData = defaultAbiCoder.encode(
    ["address", "address", "bytes", "bytes"],
    [swapperConfig.address, params.swapForwarderData.toAsset, encodedSwapperData, forwardCallData],
  );
  return defaultAbiCoder.encode(["address", "bytes"], [params.fallback, swapForwarderData]);
};
