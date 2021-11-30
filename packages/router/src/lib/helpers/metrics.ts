import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { constants } from "ethers";
import { getContext } from "../../router";
import { feesCollected, gasConsumed, liquidityAdded, totalTransferredVolume } from "../entities";
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

export const collectLiquidityAdded = async (): Promise<Record<number, { assetId: string; balance: number }[]>> => {
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
  feesCollected.inc({ assetId, chainId }, usd);
};

export const incrementGasConsumed = async (chainId: number, gas: BigNumber, _requestContext: RequestContext) => {
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
  gasConsumed.inc({ chainId }, usd);
};

export const updateLiquidityGauge = async (
  assetId: string,
  chainId: number,
  amount: string,
  type: "add" | "remove",
  _requestContext: RequestContext,
) => {
  const { logger } = getContext();

  const { requestContext, methodContext } = createLoggingContext(updateLiquidityGauge.name, _requestContext);
  logger.debug("Method start", requestContext, methodContext, {
    chainId,
    assetId,
    amount,
  });

  const usd = await convertToUsd(assetId, chainId, amount, requestContext);

  logger.debug("Got updated liquidity in usd", requestContext, methodContext, {
    assetId,
    chainId,
    amount,
    usd: usd.toString(),
  });

  liquidityAdded[type === "add" ? "inc" : "dec"]({ assetId, chainId }, usd);
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

  totalTransferredVolume.inc({ assetId, chainId }, usd);
};
