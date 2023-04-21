import { DestinationCallDataParams, Swapper, XReceiveTarget } from "../../types";

/**
 * Generates the `calldata` to be put into the `xcall` on the origin domain for a given target
 * @param target - The name of xReceive target
 * @param params - The destination calldata params
 *
 * @returns encoded calldata
 */
export const getXCallCallData = async (
  target: XReceiveTarget,
  swapper: Swapper,
  params: DestinationCallDataParams,
): Promise<string> => {};
