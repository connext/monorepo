import { utils } from "ethers";

import { SwapAndXCallABI } from "../../helpers";

/**
 * Returns the `ethers.utils.Interface` of the `SwapAndXCall` contract.
 */
export const getSwapAndXCallInterface = (): utils.Interface => {
  return new utils.Interface(SwapAndXCallABI);
};
