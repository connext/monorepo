import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  MethodContext,
  GAS_ESTIMATES,
  getChainData,
} from "@connext/nxtp-utils";
import { BigNumber, constants, utils } from "ethers";

import { getOracleContractAddress, getPriceOracleInterface } from "../../adapters/contract/contract";
import { getDeployedChainIdsForGasFee, NxtpRouterSwapPool } from "../../config";
import { getContext } from "../../router";
import { SwapValidInput } from "../entities";
import { SwapInvalid } from "../errors";

const NO_ORACLE_CHAINS = [10];

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

/**
 * Returns the mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string> => {
  const chainData = await getChainData();
  if (!chainData || !chainData.has(chainId.toString())) {
    throw new Error(`No chain data found for ${chainId}`);
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[utils.getAddress(assetId)] ??
    chain.assetId[assetId.toLowerCase()] ??
    chain.assetId[assetId.toUpperCase()] ??
    chain.assetId[assetId];

  if (!equiv || !equiv.mainnetEquivalent) {
    throw new Error(`No mainnet equivalent found for ${assetId} on ${chainId}`);
  }
  return utils.getAddress(equiv.mainnetEquivalent);
};

/**
 * Returns the decimals of mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Decimals of equivalent asset on mainnet
 */
export const getMainnetDecimals = async (assetId: string, chainId: number): Promise<number> => {
  const mainnet = await getMainnetEquivalent(assetId, chainId);

  const { txService } = getContext();
  const decimals = await txService.getDecimalsForAsset(1, mainnet);
  return decimals;
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
  _outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  // NOTE: hardcoding in optimism to allow for fees before oracle can be
  // properly deployed
  const chaindIdsForGasFee = [...getChainIdForGasFee(), 10];

  if (!chaindIdsForGasFee.includes(sendingChainId) && !chaindIdsForGasFee.includes(receivingChainId))
    return constants.Zero;
  let totalCost = constants.Zero;
  // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
  // is not configured for goerli so theres no way to translate the price to goerli
  // TODO: we can combine these into just 2 if statements and remove the repeated logic
  // calculate receiving token amount for gas fee
  // if chaindIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
  // if chaindIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

  // NOTE: to handle optimism gas fees before oracle is deployed, use mainnet
  // oracle token pricing and optimism gas price
  const tokenPricingSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId) ? 1 : sendingChainId;
  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  const tokenPricingAssetIdSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId)
    ? await getMainnetEquivalent(sendingAssetId, sendingChainId)
    : sendingAssetId;
  const tokenPricingAssetIdReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetEquivalent(receivingAssetId, receivingChainId)
    : receivingAssetId;
  const outputDecimals = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetDecimals(receivingAssetId, receivingChainId)
    : _outputDecimals;

  if (chaindIdsForGasFee.includes(sendingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
      getTokenPrice(tokenPricingSendingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingSendingChain, tokenPricingAssetIdSendingChain, requestContext),
      getGasPrice(sendingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (sendingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.fulfillL1).mul(ethPriceInSendingChain);
    }
    const gasAmountInUsd = gasPriceInSendingChain.mul(gasLimitForFulfill).mul(ethPriceInSendingChain).add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForPrepare = BigNumber.from(GAS_ESTIMATES.prepare);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingReceivingChain, tokenPricingAssetIdReceivingChain, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
    }
    const gasAmountInUsd = gasPriceInReceivingChain
      .mul(gasLimitForPrepare)
      .mul(ethPriceInReceivingChain)
      .add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  // convert back to the intended decimals
  return totalCost.div(BigNumber.from(10).pow(18 - _outputDecimals));
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
  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
  let totalCost = constants.Zero;

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(receivingChainId, constants.AddressZero, requestContext),
      getTokenPrice(receivingChainId, receivingAssetId, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    const gasAmountInUsd = gasPriceInReceivingChain.mul(gasLimitForFulfill).mul(ethPriceInReceivingChain);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  return totalCost;
};

/**
 * Gets token price in usd from price oracle
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const oracleContractAddress = getOracleContractAddress(chainId, requestContext);
  const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
  const tokenPrice = await txService.readTx({ chainId, to: oracleContractAddress, data: encodedTokenPriceData });
  return BigNumber.from(tokenPrice);
};

/**
 * Gets gas price in usd
 *
 * @param chainId The network identifier
 * @param requestContext Request context
 * @returns Gas price
 */
export const getGasPrice = async (chainId: number, requestContext: RequestContext): Promise<BigNumber> => {
  const { txService } = getContext();
  const gasPrice = await txService.getGasPrice(chainId, requestContext);
  return gasPrice;
};

/**
 * Gets chain ids to take fee from
 */
export const getChainIdForGasFee = (): number[] => {
  return getDeployedChainIdsForGasFee();
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
 * @param pendingLiquidityMap - The sendingChain funds locked in `prepare` transactions
 */
export const getRouterBalancesFromSwapPool = async (
  swapPool: NxtpRouterSwapPool,
  pendingLiquidityMap: Map<number, BigNumber>,
): Promise<BigNumber[]> => {
  const { contractReader, config } = getContext();
  const routerBalancesInEther = await Promise.all(
    swapPool.assets.map(async (asset) => {
      const assetLiquidity = await contractReader.getAssetBalance(asset.assetId, asset.chainId);
      let assetDecimals = await getDecimalsForAsset(asset.chainId, asset.assetId);
      let poolWeight = config.chainConfig[asset.chainId].weight;
      // convert asset liquidity into 18 decimal value.
      const assetBalanceFromSubgraph = assetLiquidity.mul(BigNumber.from(10).pow(18 - assetDecimals));
      let pendingBalance = pendingLiquidityMap.get(asset.chainId);
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
