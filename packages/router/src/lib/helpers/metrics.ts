import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { constants, BigNumber, utils } from "ethers";
import { getContext } from "../../router";
import {
  ExpressiveAssetBalance,
  feesCollected,
  gasConsumed,
  totalTransferredVolume,
  TransactionReason,
} from "../entities";

const getDecimals = async (assetId: string, chainId: number): Promise<number> => {
  const { chainData, txService } = getContext();

  const entry =
    chainData.get(chainId.toString())?.assetId[utils.getAddress(assetId)] ??
    chainData.get(chainId.toString())?.assetId[assetId.toLowerCase()] ??
    chainData.get(chainId.toString())?.assetId[assetId.toUpperCase()];
  let decimals = entry?.decimals;
  if (!decimals) {
    decimals = await txService.getDecimalsForAsset(chainId, assetId);
  }
  return decimals;
};

export const convertToUsd = async (
  assetId: string,
  chainId: number,
  amount: string,
  requestContext: RequestContext,
): Promise<number> => {
  const { txService, logger } = getContext();

  // Get token price
  const price = await txService.getTokenPrice(chainId, assetId, requestContext);
  if (price.isZero()) {
    // Do nothing
    return 0;
  }

  // Convert to USD
  const decimals = await getDecimals(assetId, chainId);
  const usdWei = BigNumber.from(amount).mul(price).div(BigNumber.from(10).pow(18));
  logger.debug("Got value in wei", requestContext, undefined, {
    assetId,
    chainId,
    decimals,
    amount,
    usdWei,
  });

  // Convert to correct decimals
  return +utils.formatUnits(usdWei, decimals);
};

export const getAssetName = (assetId: string, chainId: number): string | undefined => {
  const { config } = getContext();

  // Find matching swap pool
  const match = config.swapPools.find((pool) => {
    const idx = pool.assets.findIndex((asset) => chainId === asset.chainId && asset.assetId === assetId.toLowerCase());
    return idx !== -1;
  });

  return match?.name;
};

const collectExpressiveLiquidityCache: { retrieved: number; value?: Record<number, ExpressiveAssetBalance<number>[]> } =
  {
    retrieved: 0,
    value: undefined,
  };
export const collectExpressiveLiquidity = async (): Promise<Record<number, ExpressiveAssetBalance<number>[]>> => {
  // For each chain, get current router balances
  const { logger, contractReader, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(collectOnchainLiquidity.name);
  logger.debug("Method start", requestContext, methodContext);

  const elapsed = Date.now() - collectExpressiveLiquidityCache.retrieved;
  if (elapsed < 5_000 && collectExpressiveLiquidityCache.value) {
    return collectExpressiveLiquidityCache.value;
  }

  // Get all the supported chains
  const chainIds = Object.keys(config.chainConfig).map((c) => parseInt(c));

  // Get all the asset balances for that chain
  const assetBalances: Record<number, ExpressiveAssetBalance[]> = {};
  await Promise.all(
    chainIds.map(async (chainId) => {
      assetBalances[chainId] = await contractReader.getExpressiveAssetBalances(chainId);
    }),
  );

  // Convert all balances to USD
  const converted: Record<string, ExpressiveAssetBalance<number>[]> = {};
  await Promise.all(
    Object.entries(assetBalances).map(async ([chainId, assetValues]) => {
      converted[chainId] = [];
      await Promise.all(
        assetValues.map(async (value) => {
          const amount = await convertToUsd(value.assetId, +chainId, value.amount.toString(), requestContext);
          const supplied = await convertToUsd(value.assetId, +chainId, value.supplied.toString(), requestContext);
          const locked = await convertToUsd(value.assetId, +chainId, value.locked.toString(), requestContext);
          const removed = await convertToUsd(value.assetId, +chainId, value.removed.toString(), requestContext);
          const volume = await convertToUsd(value.assetId, +chainId, value.volume.toString(), requestContext);
          const volumeIn = await convertToUsd(value.assetId, +chainId, value.volumeIn.toString(), requestContext);
          converted[chainId].push({ assetId: value.assetId, amount, supplied, locked, removed, volume, volumeIn });
        }),
      );
    }),
  );

  collectExpressiveLiquidityCache.retrieved = Date.now();
  collectExpressiveLiquidityCache.value = converted;
  return converted;
};

export const collectOnchainLiquidity = async (): Promise<Record<number, { assetId: string; balance: number }[]>> => {
  // For each chain, get current router balances
  const { logger, contractReader, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(collectOnchainLiquidity.name);
  logger.debug("Method start", requestContext, methodContext);

  // Get all the supported chains
  const chainIds = Object.keys(config.chainConfig).map((c) => parseInt(c));

  // Get all the asset balances for that chain
  const assetBalances: Record<number, { assetId: string; amount: BigNumber }[]> = {};
  await Promise.all(
    chainIds.map(async (chainId) => {
      assetBalances[chainId] = await contractReader.getAssetBalances(chainId);
    }),
  );

  // Convert all balances to USD
  const converted: Record<string, { assetId: string; balance: number }[]> = {};
  await Promise.all(
    Object.entries(assetBalances).map(async ([chainId, assetValues]) => {
      converted[chainId] = [];
      await Promise.all(
        assetValues.map(async (value) => {
          const usd = await convertToUsd(value.assetId, parseInt(chainId), value.amount.toString(), requestContext);
          converted[chainId].push({ assetId: value.assetId, balance: usd });
        }),
      );
    }),
  );

  return converted;
};

export const incrementFees = async (
  assetId: string,
  chainId: number,
  amount: string,
  _requestContext: RequestContext,
) => {
  const { logger } = getContext();

  const { requestContext, methodContext } = createLoggingContext(incrementFees.name, _requestContext);
  logger.debug("Method start", requestContext, methodContext, {
    assetId,
    chainId,
    amount,
  });

  const fees = await convertToUsd(assetId, chainId, amount, requestContext);

  logger.debug("Got fees in usd", requestContext, methodContext, {
    assetId,
    chainId,
    amount,
    fees,
  });

  // Update counter
  feesCollected.inc(
    {
      assetId,
      chainId,
      assetName: getAssetName(assetId, chainId),
    },
    fees,
  );
};

export const incrementGasConsumed = async (
  chainId: number,
  gas: BigNumber,
  reason: TransactionReason,
  _requestContext: RequestContext,
) => {
  const { logger } = getContext();

  const { requestContext, methodContext } = createLoggingContext(incrementGasConsumed.name, _requestContext);
  logger.debug("Method start", requestContext, methodContext, {
    chainId,
    gas: gas.toString(),
  });

  const usd = await convertToUsd(constants.AddressZero, chainId, gas.toString(), requestContext);

  logger.debug("Got gas fees in usd", requestContext, methodContext, {
    chainId,
    gas: gas.toString(),
    usd: usd.toString(),
  });

  // Update counter
  // TODO: reason type
  gasConsumed.inc({ chainId, reason }, usd);
};

export const incrementTotalTransferredVolume = async (
  assetId: string,
  chainId: number,
  amount: string,
  _requestContext: RequestContext,
) => {
  const { logger } = getContext();

  const { requestContext, methodContext } = createLoggingContext(incrementTotalTransferredVolume.name, _requestContext);
  logger.debug("Method start", requestContext, methodContext, {
    chainId,
    assetId,
    amount,
  });

  const usd = await convertToUsd(assetId, chainId, amount, requestContext);

  logger.debug("Got transferred volume in usd", requestContext, methodContext, {
    assetId,
    chainId,
    amount,
    usd: usd.toString(),
  });

  totalTransferredVolume.inc({ assetId, chainId, assetName: getAssetName(assetId, chainId) }, usd);
};
