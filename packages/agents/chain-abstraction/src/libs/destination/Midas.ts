type TargetArgs = {
  cTokenAddress: string;
  underlying: string;
  minter: string;
};

/**
 * Returns the forward calldata for the `MidasProtocolTarget` contract.
 */
export const generateForwardCallData = async (targetArgs: TargetArgs): Promise<string> => {
  throw new Error("ToDo");
};
