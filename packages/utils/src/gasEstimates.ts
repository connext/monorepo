import { ChainData, getChainData } from ".";

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
};

export const getHardcodedGasLimits = async (
  chainId: number,
  chainData?: Map<string, ChainData>,
): Promise<GasEstimates> => {
  const chaindata = chainData ?? (await getChainData());
  const chainInfo = chaindata?.get(chainId.toString()) ?? chainData?.get("0");
  const res = chainInfo && chainInfo.gasEstimates ? chainInfo.gasEstimates : DEFAULT_GAS_ESTIMATES;
  return res;
};
