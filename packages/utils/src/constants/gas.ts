import { ChainData, getChainData } from "..";

export const DEFAULT_GAS_ESTIMATES = {
  prepare: "190000",
  fulfill: "200000",
  cancel: "204271",
  removeLiquidity: "45000",
  prepareL1: "20623",
  fulfillL1: "13965",
  cancelL1: "13965",
  removeLiquidityL1: "45000",
  prepareRouterContract: "190000",
  fulfillRouterContract: "200000",
  cancelRouterContract: "204271",
  removeLiquidityRouterContract: "48000",
  gasPriceFactor: "1000000000000000000",
};

export type GasEstimates = {
  prepare: string;
  fulfill: string;
  cancel: string;
  removeLiquidity: string;
  prepareRouterContract: string;
  fulfillRouterContract: string;
  cancelRouterContract: string;
  removeLiquidityRouterContract: string;
  prepareL1?: string;
  fulfillL1?: string;
  cancelL1?: string;
  removeLiquidityL1?: string;
  gasPriceFactor: string;
};

export const getHardcodedGasLimits = async (
  chainId: number,
  chainData?: Map<string, ChainData>,
): Promise<GasEstimates> => {
  const chaindata = chainData ?? (await getChainData());
  const chainInfo = chaindata?.get(chainId.toString()) ?? chainData?.get("0");
  if (!chainInfo) return DEFAULT_GAS_ESTIMATES;

  const prepare = chainInfo.gasEstimates?.prepare ?? DEFAULT_GAS_ESTIMATES.prepare;
  const fulfill = chainInfo.gasEstimates?.fulfill ?? DEFAULT_GAS_ESTIMATES.fulfill;
  const cancel = chainInfo.gasEstimates?.cancel ?? DEFAULT_GAS_ESTIMATES.cancel;
  const removeLiquidity = chainInfo.gasEstimates?.removeLiquidity ?? DEFAULT_GAS_ESTIMATES.removeLiquidity;
  const prepareRouterContract =
    chainInfo.gasEstimates?.prepareRouterContract ?? DEFAULT_GAS_ESTIMATES.prepareRouterContract;
  const fulfillRouterContract =
    chainInfo.gasEstimates?.fulfillRouterContract ?? DEFAULT_GAS_ESTIMATES.fulfillRouterContract;
  const cancelRouterContract =
    chainInfo.gasEstimates?.cancelRouterContract ?? DEFAULT_GAS_ESTIMATES.cancelRouterContract;
  const removeLiquidityRouterContract =
    chainInfo.gasEstimates?.removeLiquidityRouterContract ?? DEFAULT_GAS_ESTIMATES.removeLiquidityRouterContract;
  const prepareL1 = chainInfo.gasEstimates?.prepareL1 ?? DEFAULT_GAS_ESTIMATES.prepareL1;
  const fulfillL1 = chainInfo.gasEstimates?.fulfillL1 ?? DEFAULT_GAS_ESTIMATES.fulfillL1;
  const cancelL1 = chainInfo.gasEstimates?.cancelL1 ?? DEFAULT_GAS_ESTIMATES.cancelL1;
  const removeLiquidityL1 = chainInfo.gasEstimates?.removeLiquidityL1 ?? DEFAULT_GAS_ESTIMATES.removeLiquidityL1;
  const gasPriceFactor = chainInfo.gasEstimates?.gasPriceFactor ?? DEFAULT_GAS_ESTIMATES.gasPriceFactor;
  const res = {
    prepare,
    fulfill,
    cancel,
    removeLiquidity,
    prepareRouterContract,
    fulfillRouterContract,
    cancelRouterContract,
    removeLiquidityRouterContract,
    prepareL1,
    fulfillL1,
    cancelL1,
    removeLiquidityL1,
    gasPriceFactor,
  } as GasEstimates;
  return res;
};
