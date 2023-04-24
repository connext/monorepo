import { defaultAbiCoder } from "ethers/lib/utils";

import { MidasForwardCallData } from "../../types";

/**
 * Returns the forward calldata for the `MidasProtocolTarget` contract.
 */
export const generateForwardCallData = (args: any): string => {
  const params = args as MidasForwardCallData;
  return defaultAbiCoder.encode(
    ["address", "address", "address"],
    [params.cTokenAddress, params.underlying, params.minter],
  );
};
