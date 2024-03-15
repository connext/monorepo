import { ChainData, getChainData } from "..";

export const NATIVE_TOKEN = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const DEFAULT_GAS_ESTIMATES = {
  execute: "400000",
  executeL1: "20000",
  // average gas of reconcile tx to L2 / batch size (n=10)
  // - 350,000 for 1 tx batch
  // - 1,200,000 for 10 tx batch
  proveAndProcess: "120000",
  // average gas of reconcile tx L1 costs on op
  // - 43,000 1 tx batch
  // - 220,000 10 tx batch
  proveAndProcessL1: "20000",
  // monthly costs in weth / monthly transfer count = weth cost per transfer
  // weth. chaindata should be updated when switching between op and slow mode
  messaging: "4500",
  gasPriceFactor: "1000000000000000000",
};

export type GasEstimates = {
  execute: string;
  executeL1: string;
  proveAndProcess: string;
  proveAndProcessL1: string;
  messaging: string;
  gasPriceFactor: string;
};

export const getHardcodedGasLimits = async (
  domainId: string,
  chainData?: Map<string, ChainData>,
): Promise<GasEstimates> => {
  const chaindata = chainData ?? (await getChainData());
  const chainInfo = chaindata?.get(domainId) ?? chainData?.get("0");
  if (!chainInfo) return DEFAULT_GAS_ESTIMATES;

  const execute = chainInfo.gasEstimates?.execute ?? DEFAULT_GAS_ESTIMATES.execute;
  const executeL1 = chainInfo.gasEstimates?.executeL1 ?? DEFAULT_GAS_ESTIMATES.executeL1;
  const proveAndProcess = chainInfo.gasEstimates?.proveAndProcess ?? DEFAULT_GAS_ESTIMATES.proveAndProcess;
  const proveAndProcessL1 = chainInfo.gasEstimates?.proveAndProcessL1 ?? DEFAULT_GAS_ESTIMATES.proveAndProcessL1;
  const messaging = chainInfo.gasEstimates?.messaging ?? DEFAULT_GAS_ESTIMATES.messaging;
  const gasPriceFactor = chainInfo.gasEstimates?.gasPriceFactor ?? DEFAULT_GAS_ESTIMATES.gasPriceFactor;
  const res = {
    execute,
    executeL1,
    gasPriceFactor,
    proveAndProcess,
    proveAndProcessL1,
    messaging,
  } as GasEstimates;
  return res;
};
