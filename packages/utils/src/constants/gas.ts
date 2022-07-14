import { ChainData, getChainData } from "..";

export const DEFAULT_GAS_ESTIMATES = {
  xcall: "190000",
  execute: "190000",
  gasPriceFactor: "1000000000000000000",
};

export type GasEstimates = {
  xcall: string;
  execute: string;
  gasPriceFactor: string;
};

export const getHardcodedGasLimits = async (
  chainId: number,
  chainData?: Map<string, ChainData>,
): Promise<GasEstimates> => {
  const chaindata = chainData ?? (await getChainData());
  const chainInfo = chaindata?.get(chainId.toString()) ?? chainData?.get("0");
  if (!chainInfo) return DEFAULT_GAS_ESTIMATES;

  const xcall = chainInfo.gasEstimates?.xcall ?? DEFAULT_GAS_ESTIMATES.xcall;
  const execute = chainInfo.gasEstimates?.execute ?? DEFAULT_GAS_ESTIMATES.execute;
  const gasPriceFactor = chainInfo.gasEstimates?.gasPriceFactor ?? DEFAULT_GAS_ESTIMATES.gasPriceFactor;
  const res = {
    xcall,
    execute,
    gasPriceFactor,
  } as GasEstimates;
  return res;
};
