import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { constants } from "ethers";
import { getContext } from "../../router";
import { feesCollected, gasConsumed, totalTransferredVolume, TransactionReason } from "../entities";
import { getTokenPrice } from "./shared";

const convertToUsd = async (
  assetId: string,
  chainId: number,
  amount: string,
  requestContext: RequestContext,
): Promise<number> => {
  const { chainData, txService } = getContext();

  // Get token price
  const price = await getTokenPrice(chainId, assetId, requestContext);
  if (price.isZero()) {
    // Do nothing
    return 0;
  }

  // Convert to USD
  const entry =
    chainData.get(chainId.toString())?.assetId[getAddress(assetId)] ??
    chainData.get(chainId.toString())?.assetId[assetId.toLowerCase()] ??
    chainData.get(chainId.toString())?.assetId[assetId.toUpperCase()];
  let decimals = entry?.decimals;
  if (!decimals) {
    decimals = await txService.getDecimalsForAsset(chainId, assetId);
  }
  const usdWei = BigNumber.from(amount)
    .mul(price)
    .div(BigNumber.from(10).pow(18 - decimals));

  // Convert to correct decimals
  return +formatUnits(usdWei, decimals);
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

export const collectExpressiveLiquidity = async (): Promise<
  Record<number, { assetId: string; amount: number; supplied: number; locked: number }[]>
> => {
  // For each chain, get current router balances
  const { logger, contractReader, config } = getContext();

  const { requestContext, methodContext } = createLoggingContext(collectOnchainLiquidity.name);
  logger.debug("Method start", requestContext, methodContext);

  // Get all the supported chains
  const chainIds = Object.keys(config.chainConfig).map((c) => parseInt(c));

  // Get all the asset balances for that chain
  const assetBalances: Record<
    number,
    { assetId: string; amount: BigNumber; supplied: BigNumber; locked: BigNumber }[]
  > = {};
  await Promise.all(
    chainIds.map(async (chainId) => {
      assetBalances[chainId] = await contractReader.getExpressiveAssetBalances(chainId);
    }),
  );

  // Convert all balances to USD
  const converted: Record<number, { assetId: string; amount: number; supplied: number; locked: number }[]> = {};
  await Promise.all(
    Object.entries(assetBalances).map(async ([chainId, value]) => {
      const usd = await Promise.all(
        value.map(async ({ assetId, supplied, amount, locked }) => {
          const suppliedUsd = await convertToUsd(assetId, parseInt(chainId), supplied.toString(), requestContext);
          const amountUsd = await convertToUsd(assetId, parseInt(chainId), amount.toString(), requestContext);
          const lockedUsd = await convertToUsd(assetId, parseInt(chainId), locked.toString(), requestContext);
          return { assetId, supplied: suppliedUsd, amount: amountUsd, locked: lockedUsd };
        }),
      );
      return { chainId, converted: usd };
    }),
  );

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
  const converted: Record<number, { assetId: string; balance: number }[]> = {};
  await Promise.all(
    Object.entries(assetBalances).map(async ([chainId, value]) => {
      const usd = await Promise.all(
        value.map(async ({ assetId, amount }) => {
          const balance = await convertToUsd(assetId, parseInt(chainId), amount.toString(), requestContext);
          return { assetId, balance };
        }),
      );
      return { chainId, converted: usd };
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

  const usd = await convertToUsd(assetId, chainId, amount, requestContext);

  logger.debug("Got fees in usd", requestContext, methodContext, {
    assetId,
    chainId,
    amount,
    usd: usd.toString(),
  });

  // Update counter
  feesCollected.inc({ assetId, chainId, assetName: getAssetName(assetId, chainId) }, usd);
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
