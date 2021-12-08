import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  MethodContext,
  multicall as _multicall,
  Call,
} from "@connext/nxtp-utils";
import { getAddress } from "ethers/lib/utils";
import { BigNumber, utils, constants } from "ethers";

import { NxtpRouterSwapPool } from "../../config";
import { getContext } from "../../router";
import { SwapValidInput } from "../entities";
import { SwapInvalid } from "../errors";

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

/**
 * Returns the mainnet equivalent of the given asset on the given chain from chain data.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalentFromChainData = async (assetId: string, chainId: number): Promise<string | null> => {
  const { chainData } = getContext();
  if (!chainData || !chainData.has(chainId.toString())) {
    return null;
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[utils.getAddress(assetId)] ??
    chain.assetId[assetId.toLowerCase()] ??
    chain.assetId[assetId.toUpperCase()] ??
    chain.assetId[assetId];

  if (!equiv || !equiv.mainnetEquivalent) {
    return null;
  }
  return utils.getAddress(equiv.mainnetEquivalent);
};

/**
 * Returns the mainnet equivalent of the given asset on the given chain
 * Reads from config first, if it fails, tries to read from chain data.
 *
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string | null> => {
  const { config } = getContext();
  const allowedSwapPool = config.swapPools.find((pool) =>
    pool.assets.find((a) => getAddress(a.assetId) === getAddress(assetId) && a.chainId === chainId),
  );
  if (allowedSwapPool && allowedSwapPool.mainnetEquivalent) {
    return allowedSwapPool.mainnetEquivalent;
  } else {
    return await getMainnetEquivalentFromChainData(assetId, chainId);
  }
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param _outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const sendingAssetIdOnMainnet = await getMainnetEquivalent(sendingAssetId, sendingChainId);
  const tokenPricingSendingChain = sendingAssetIdOnMainnet ? 1 : sendingChainId;
  const tokenPricingAssetIdSendingChain = sendingAssetIdOnMainnet ? sendingAssetIdOnMainnet : sendingAssetId;

  const sendingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, sendingChainId);
  const nativeTokenPricingSendingChain = sendingNativeAssetIdOnMainnet ? 1 : sendingChainId;
  const nativeTokenPricingAssetIdSendingChain = sendingNativeAssetIdOnMainnet
    ? sendingNativeAssetIdOnMainnet
    : constants.AddressZero;

  const receivingAssetIdOnMainnet = await getMainnetEquivalent(receivingAssetId, receivingChainId);
  const tokenPricingReceivingChain = receivingAssetIdOnMainnet ? 1 : receivingChainId;
  const tokenPricingAssetIdReceivingChain = receivingAssetIdOnMainnet ? receivingAssetIdOnMainnet : receivingAssetId;

  const receicingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, receivingChainId);
  const nativeTokenPricingReceivingChain = receicingNativeAssetIdOnMainnet ? 1 : receivingChainId;
  const nativeTokenPricingAssetIdReceivingChain = receicingNativeAssetIdOnMainnet
    ? receicingNativeAssetIdOnMainnet
    : receivingAssetId;

  return txService.calculateGasFeeInReceivingToken(
    tokenPricingSendingChain,
    sendingChainId,
    tokenPricingAssetIdSendingChain,
    nativeTokenPricingSendingChain,
    nativeTokenPricingAssetIdSendingChain,
    tokenPricingReceivingChain,
    receivingChainId,
    tokenPricingAssetIdReceivingChain,
    nativeTokenPricingReceivingChain,
    nativeTokenPricingAssetIdReceivingChain,
    outputDecimals,
    requestContext,
  );
};

/**
 * Helper to calculate router gas fee in token for meta transaction
 *
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingTokenForFulfill = async (
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();

  const receivingAssetIdOnMainnet = await getMainnetEquivalent(receivingAssetId, receivingChainId);
  const tokenPricingReceivingChain = receivingAssetIdOnMainnet ? 1 : receivingChainId;
  const tokenPricingAssetIdReceivingChain = receivingAssetIdOnMainnet ? receivingAssetIdOnMainnet : receivingAssetId;

  const receicingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, receivingChainId);
  const nativeTokenPricingReceivingChain = receicingNativeAssetIdOnMainnet ? 1 : receivingChainId;
  const nativeTokenPricingAssetIdReceivingChain = receicingNativeAssetIdOnMainnet
    ? receicingNativeAssetIdOnMainnet
    : constants.AddressZero;

  return txService.calculateGasFeeInReceivingTokenForFulfill(
    tokenPricingReceivingChain,
    receivingChainId,
    tokenPricingAssetIdReceivingChain,
    nativeTokenPricingReceivingChain,
    nativeTokenPricingAssetIdReceivingChain,
    outputDecimals,
    requestContext,
  );
};

export const getTokenPriceFromOnChain = async (
  chainId: number,
  assetId: string,
  requestContext?: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  return txService.getTokenPriceFromOnChain(chainId, assetId, requestContext);
};

/**
 * Runs multiple calls at a time, call data should be read methods. used to make it easier for sinon mocks to happen in test cases.
 *
 * @param abi - The ABI data of target contract
 * @param calls - The call data what you want to read from contract
 * @param multicallAddress - The address of multicall contract deployed to configured chain
 * @param rpcUrl - The rpc endpoints what you want to call with
 *
 * @returns Array in ethers.BigNumber
 */
export const multicall = async (abi: any[], calls: Call[], multicallAddress: string, rpcUrl: string) => {
  return await _multicall(abi, calls, multicallAddress, rpcUrl);
};

/**
 * Gets decimals of asset.
 */
export const getDecimalsForAsset = async (chainId: number, assetId: string): Promise<number> => {
  const { chainData, txService } = getContext();
  let decimals = chainData.get(chainId.toString())?.assetId[assetId]?.decimals;
  if (!decimals) {
    decimals = await txService.getDecimalsForAsset(chainId, assetId);
  }
  return decimals;
};

/**
 * Gets sendingChainIdx, receivingChainIdx and swapPoolIdx
 *
 * @returns {sendingChainIdx: number, receivingChainIdx: number, swapPoolIdx: number}
 */
export const getSwapIdxList = (
  sendingChainId: number,
  sendingAssetId: string,
  receivingChainId: number,
  receivingAssetId: string,
  requestContext: RequestContext,
  methodContext: MethodContext,
): SwapValidInput => {
  const { config } = getContext();

  let sendingChainIdx: number = -1;
  let receivingChainIdx: number = -1;
  let swapPoolIdx: number = -1;
  const allowedSwap = config.swapPools.find((pool, index) => {
    const existSwap =
      pool.assets.find(
        (a) => utils.getAddress(a.assetId) === utils.getAddress(sendingAssetId) && a.chainId === sendingChainId,
      ) &&
      pool.assets.find(
        (a) => utils.getAddress(a.assetId) === utils.getAddress(receivingAssetId) && a.chainId === receivingChainId,
      );

    if (existSwap) {
      sendingChainIdx = pool.assets.findIndex(
        (a) => utils.getAddress(a.assetId) === utils.getAddress(sendingAssetId) && a.chainId === sendingChainId,
      );

      receivingChainIdx = pool.assets.findIndex(
        (a) => utils.getAddress(a.assetId) === utils.getAddress(receivingAssetId) && a.chainId === receivingChainId,
      );
      swapPoolIdx = index;
    }

    return existSwap;
  });
  if (!allowedSwap || sendingChainIdx == -1 || receivingChainIdx == -1 || swapPoolIdx == -1) {
    throw new SwapInvalid(sendingChainId, sendingAssetId, receivingChainId, receivingAssetId, {
      methodContext,
      requestContext,
      sendingChainIdx,
      receivingChainIdx,
      swapPoolIdx,
    });
  }

  return {
    sendingChainIdx,
    receivingChainIdx,
    swapPoolIdx,
  };
};

/**
 * Gets router balances from swap pool for each chain.
 *
 * @param swapPool - The swap pool config of router
 * @param liquidityMap - The funds locked up in `prepare` transactions
 */
export const getRouterBalancesFromSwapPool = async (
  swapPool: NxtpRouterSwapPool,
  liquidityMap: Map<string, BigNumber>,
): Promise<BigNumber[]> => {
  const { contractReader, config } = getContext();
  const routerBalancesInEther = await Promise.all(
    swapPool.assets.map(async (asset) => {
      const assetLiquidity = await contractReader.getAssetBalance(asset.assetId, asset.chainId);
      let assetDecimals = await getDecimalsForAsset(asset.chainId, asset.assetId);
      let poolWeight = config.chainConfig[asset.chainId].weight;
      // convert asset liquidity into 18 decimal value.
      const assetBalanceFromSubgraph = assetLiquidity.mul(BigNumber.from(10).pow(18 - assetDecimals));
      let pendingBalance = liquidityMap.get(asset.chainId.toString().concat("-").concat(asset.assetId));
      if (!pendingBalance) {
        pendingBalance = BigNumber.from(0);
      }

      // multiply pool weight
      const res = assetBalanceFromSubgraph.add(pendingBalance).mul(BigNumber.from(poolWeight));
      return res;
    }),
  );

  return routerBalancesInEther;
};
