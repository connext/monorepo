import { ChainData, getChainData } from "..";

export const DEFAULT_GAS_ESTIMATES = {
  xcall: "190000",
  execute: "190000",
  xcallL1: "190000",
  executeL1: "190000",
  gasPriceFactor: "1000000000000000000",
};

export type GasEstimates = {
  xcall: string;
  execute: string;
  xcallL1: string;
  executeL1: string;
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
  const xcallL1 = chainInfo.gasEstimates?.xcallL1 ?? DEFAULT_GAS_ESTIMATES.xcallL1;
  const executeL1 = chainInfo.gasEstimates?.executeL1 ?? DEFAULT_GAS_ESTIMATES.executeL1;
  const gasPriceFactor = chainInfo.gasEstimates?.gasPriceFactor ?? DEFAULT_GAS_ESTIMATES.gasPriceFactor;
  const res = {
    xcall,
    execute,
    xcallL1,
    executeL1,
    gasPriceFactor,
  } as GasEstimates;
  return res;
};
