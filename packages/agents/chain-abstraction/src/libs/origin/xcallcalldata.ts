import { defaultAbiCoder, formatEther } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";

import {
  DestinationSwapDataFns,
  DestinationSwapperPerDomain,
  UniV3FactoryABI,
  UniV3PoolABI,
  UniV3RouterABI,
  UniV3SwapperABI,
} from "../../helpers";
import { DestinationCallDataParams, Swapper } from "../../types";
import { getContract } from "../../mockable";

/**
 * Generates the `calldata` to be put into the `xcall` on the origin domain for a given target
 *
 * @param domainId - The destination domain ID.
 * @param rpc - The RPC endpoint for the destination domain.
 * @param target - The name of xReceive target.
 * @param swapper - The swapper type which can be either of univ2, univ3 and oneinch.
 * @param params - The destination calldata params.
 *
 * @returns encoded calldata
 */
export const getXCallCallData = async (
  domainId: string,
  swapper: Swapper,
  forwardCallData: string,
  params: DestinationCallDataParams,
): Promise<string> => {
  const swapperConfig = DestinationSwapperPerDomain[domainId];
  const destinationSwapDataCallbackFn = DestinationSwapDataFns[swapper];
  const encodedSwapperData = await destinationSwapDataCallbackFn(params.swapForwarderData.swapData);

  const swapForwarderData = defaultAbiCoder.encode(
    ["address", "address", "bytes", "bytes"],
    [swapperConfig.address, params.swapForwarderData.toAsset, encodedSwapperData, forwardCallData],
  );
  return defaultAbiCoder.encode(["address", "bytes"], [params.fallback, swapForwarderData]);
};

const AVAILABLE_POOL_FEES = ["100", "500", "2500", "3000", "10000"];
/**
 * Returns the `poolFee` of the univ3 pool for a given token pair which would be used in the univ3 router execution.
 *
 * @param domainId - The target domain ID.
 * @param rpc - The RPC endpoint for a given domain.
 * @param token0 - The first token address
 * @param token1 - The second token address
 */
export const getPoolFeeForUniV3 = async (
  domainId: string,
  rpc: string,
  token0: string,
  token1: string,
): Promise<string> => {
  // TODO: This method requires more than 10 rpc calls. You need to think of a way to reduce the number of rpc requests
  // That would be better to do it without using rpc like using sdk.
  const swapperConfig = DestinationSwapperPerDomain[domainId];
  const rpcProvider = new providers.JsonRpcProvider(rpc);
  const swapperContract = getContract(swapperConfig.address, UniV3SwapperABI, rpcProvider);
  const univ3Router = await swapperContract.uniswapV3Router();
  const uniV3RouterContract = getContract(univ3Router as string, UniV3RouterABI, rpcProvider);
  const univ3Factory = await uniV3RouterContract.factory();
  const univ3FactoryContract = getContract(univ3Factory as string, UniV3FactoryABI, rpcProvider);

  const res = await Promise.all(
    AVAILABLE_POOL_FEES.map(async (poolFee) => {
      const pool = await univ3FactoryContract.getPool(token0, token1, poolFee);
      let liquidity = 0;
      if (pool != constants.AddressZero) {
        const poolContract = getContract(pool as string, UniV3PoolABI, rpcProvider);
        const liqInBigNum = await poolContract.liquidity();
        liquidity = Number(formatEther(liqInBigNum as BigNumber));
      }
      return { pool, poolFee, liquidity };
    }),
  );

  const validPools = res.filter((item) => item.pool != constants.AddressZero);
  const sorted = validPools.sort((a, b) => b.liquidity - a.liquidity);

  if (validPools.length == 0) {
    throw new Error("No pool exist for a given pair");
  }
  return sorted[0].poolFee;
};
