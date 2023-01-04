import { ChainData, getChainData } from "..";

export const NATIVE_TOKEN = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const DEFAULT_GAS_ESTIMATES = {
  execute: "250000",
  executeL1: "250000",
  gasPriceFactor: "1000000000000000000",
};

export type GasEstimates = {
  execute: string;
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

  const execute = chainInfo.gasEstimates?.execute ?? DEFAULT_GAS_ESTIMATES.execute;
  const executeL1 = chainInfo.gasEstimates?.executeL1 ?? DEFAULT_GAS_ESTIMATES.executeL1;
  const gasPriceFactor = chainInfo.gasEstimates?.gasPriceFactor ?? DEFAULT_GAS_ESTIMATES.gasPriceFactor;
  const res = {
    execute,
    executeL1,
    gasPriceFactor,
  } as GasEstimates;
  return res;
};
