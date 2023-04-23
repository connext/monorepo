import { defaultAbiCoder } from "ethers/lib/utils";
import { Contract, constants, providers } from "ethers";

import {
  DestinationSwapDataFns,
  DestinationSwapperPerDomain,
  UniV3FactoryABI,
  UniV3RouterABI,
  UniV3SwapperABI,
} from "../../helpers";
import { DestinationCallDataParams, Swapper, XReceiveTarget } from "../../types";
import { ForwardCallDataFns } from "../destination";

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
  target: XReceiveTarget,
  swapper: Swapper,
  params: DestinationCallDataParams,
): Promise<string> => {
  const swapperConfig = DestinationSwapperPerDomain[domainId];
  const forwardCallDataCallbackFn = ForwardCallDataFns[target];
  const destinationSwapDataCallbackFn = DestinationSwapDataFns[swapper];
  const forwardCallData = forwardCallDataCallbackFn(params.swapForwarderData.forwardCallData);
  const encodedSwapperData = await destinationSwapDataCallbackFn(params.swapForwarderData.swapData);

  console.log({
    swapper: swapperConfig.address,
    toAsset: params.swapForwarderData.toAsset,
    encodedSwapperData: encodedSwapperData,
    forwardCallData: forwardCallData,
  });
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
  // TODO: This method requires around 7 rpc calls. You need to think of a way to reduce the number of rpc requests
  // That would be better to do it without using rpc.
  const swapperConfig = DestinationSwapperPerDomain[domainId];
  const rpcProvider = new providers.JsonRpcProvider(rpc);
  const swapperContract = new Contract(swapperConfig.address, UniV3SwapperABI, rpcProvider);
  const univ3Router = await swapperContract.uniswapV3Router();
  const uniV3RouterContract = new Contract(univ3Router as string, UniV3RouterABI, rpcProvider);
  const univ3Factory = await uniV3RouterContract.factory();
  const univ3FactoryContract = new Contract(univ3Factory as string, UniV3FactoryABI, rpcProvider);

  const res = await Promise.all(
    AVAILABLE_POOL_FEES.map(async (poolFee) => {
      const pool = await univ3FactoryContract.getPool(token0, token1, poolFee);
      return { pool, poolFee };
    }),
  );

  const validPools = res.filter((item) => item.pool != constants.AddressZero);

  if (validPools.length == 0) {
    throw new Error("No pool exist for a given pair");
  }

  // TODO: Ideally, we should iterate all the valid pools and choose the best pool.
  return validPools[0].pool;
};