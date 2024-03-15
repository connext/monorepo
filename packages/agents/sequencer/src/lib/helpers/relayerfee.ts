import {
  RequestContextWithTransactionId,
  XTransfer,
  createLoggingContext,
  domainToChainId,
  evmId,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { calculateRelayerFee, safeGetConversionRate, getDecimalsForAsset } from "../../mockable";
import { getContext } from "../../sequencer";
import { CanonicalAssetNotFound } from "../errors";

/**
 * @dev Relayer fee paid by user would be checked whether its enough or not
 * @param transfer - The origin transfer entity
 */
export const canSubmitToRelayer = async (transfer: XTransfer): Promise<{ canSubmit: boolean; needed: string }> => {
  const { requestContext, methodContext } = createLoggingContext(
    canSubmitToRelayer.name,
    undefined,
    transfer.transferId,
  );
  const {
    logger,
    chainData,
    config,
    adapters: { chainreader },
  } = getContext();
  const {
    xparams: { originDomain, destinationDomain },
    origin,
  } = transfer;

  if (
    config.chains[transfer.xparams.originDomain].excludeListFromRelayerFee
      .map((i) => i.toLowerCase())
      .includes(transfer.xparams.originSender.toLowerCase())
  ) {
    return { canSubmit: true, needed: "0" };
  }

  if (!origin?.relayerFees) {
    return { canSubmit: false, needed: "0" };
  }

  const relayerFeeAssets = Object.keys(origin.relayerFees);

  const estimatedRelayerFeeUsd = await calculateRelayerFee(
    {
      originDomain,
      destinationDomain,
      priceIn: "usd",
      getGasPriceCallback: (domain: number) => chainreader.getGasPrice(domain, requestContext),
    },
    chainData,
    logger,
    requestContext,
    true,
  );

  let relayerFeePaidUsd = constants.Zero;

  // Convert the amount of relayer fee for each asset into a corresponding USD value, and sum
  // NOTE: `safeGetConversionRate` will give you the price of the native asset on the provided chain,
  // to the provided asset (or USDC if not provided).

  // Store all retrieved prices for easy logging
  const prices: Record<string, number> = {};

  for (const asset of relayerFeeAssets) {
    // Get origin chain
    const originChainId = domainToChainId(+originDomain);

    // The relayer fee can technically be paid in any whitelisted asset, but will generally be
    // one of the three options:
    // - origin chain native asset
    // - local asset (e.g. nextWETH)
    // - adopted asset (e.g. WETH)
    // where local / adopted assets are be the transacting asset on the origin chain.

    // NOTE: when using the transacting asset, should get the price of the canonical counterpart.
    // This is because gelato may not support adopted assets on their chain, but will generally
    // support their canonical counterpart (i.e. DAI on BSC not supported, but DAI on mainnet is)
    let assetPriceUsd;
    if (asset.toLowerCase() === constants.AddressZero) {
      assetPriceUsd = await safeGetConversionRate(originChainId, undefined, logger);
    } else {
      logger.debug("Relayer fee is not in origin native asset", requestContext, methodContext, {
        asset,
        local: origin.assets.bridged.asset,
        transacting: origin.assets.transacting.asset,
      });
      // relayer fee is in transacting asset && transacting asset is the local asset.
      // get the USD price of the canonical counterpart
      const { canonicalAsset, canonicalChain } = await getCanonicalAssetAndChain(originDomain, asset, requestContext);
      // get the price of the native asset on canonical chain in USDC; and canonical asset in canonical native i.e converstion rate of native asset on canonical chain to canonical asset
      const [canonicalNativeUsd, canonicalAssetCanonicalNative] = await Promise.all([
        // Returns the price in USD of native asset on the canonical chain
        safeGetConversionRate(canonicalChain, undefined, logger),
        // Returns the price of the asset under native token on the canonical chain
        safeGetConversionRate(canonicalChain, canonicalAsset, logger),
      ]);
      // NOTE: log here instead of at end because intermediate step could be helpful in deep dive, but only
      // end calculations will be practically useful
      logger.debug("Got canonical asset prices", requestContext, methodContext, {
        asset,
        canonicalAsset,
        canonicalChain,
        canonicalNativeUsd,
        canonicalAssetCanonicalNative,
      });
      // get pricing of asset in USD
      assetPriceUsd = canonicalAssetCanonicalNative === 0 ? 0 : canonicalNativeUsd / canonicalAssetCanonicalNative;
    }
    prices[asset] = assetPriceUsd;

    // Get the decimals of the asset
    const relayerFeeDecimals =
      asset === constants.AddressZero
        ? 18
        : await getDecimalsForAsset(asset, originChainId, undefined, chainData, () =>
            chainreader.getDecimalsForAsset(+originDomain, asset),
          );
    const relayerFeePaid = BigNumber.from(origin.relayerFees[asset])
      .mul(Math.floor(assetPriceUsd * 1000))
      .div(1000)
      .mul(BigNumber.from(10).pow(18 - relayerFeeDecimals));
    relayerFeePaidUsd = relayerFeePaidUsd.add(relayerFeePaid);
  }

  const minimumFeeNeeded = estimatedRelayerFeeUsd.mul(Math.floor(100 - config.relayerFeeTolerance)).div(100);
  const canSubmit = relayerFeePaidUsd.gte(minimumFeeNeeded);
  logger.info("Relayer fee check", requestContext, methodContext, {
    prices,
    estimatedRelayerFee: estimatedRelayerFeeUsd.toString(),
    relayerFeePaidUsd: relayerFeePaidUsd.toString(),
    minimumFeeNeeded: minimumFeeNeeded.toString(),
    canSubmit,
  });

  return { canSubmit, needed: minimumFeeNeeded.toString() };
};

const getCanonicalAssetAndChain = async (
  _domain: string,
  _asset: string,
  _requestContext: RequestContextWithTransactionId,
): Promise<{ canonicalAsset: string; canonicalChain: number }> => {
  const {
    logger,
    adapters: { subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(
    getCanonicalAssetAndChain.name,
    _requestContext,
    _requestContext.id,
  );
  logger.debug("Method start", requestContext, methodContext, { domain: _domain, asset: _asset });

  // get all assets on the given domain
  const assets = await subgraph.getAssets(_domain);
  const asset = assets.find(
    (a) => a.adoptedAsset.toLowerCase() === _asset.toLowerCase() || a.localAsset.toLowerCase() === _asset.toLowerCase(),
  );
  if (!asset) {
    throw new CanonicalAssetNotFound({ domain: _domain, asset: _asset, assets });
  }

  const canonicalAsset = evmId(asset.canonicalId);
  const canonicalChain = domainToChainId(+asset.canonicalDomain);

  logger.debug("Method complete", requestContext, methodContext, {
    domain: _domain,
    asset: _asset,
    canonicalAsset,
    canonicalChain,
  });

  return { canonicalAsset, canonicalChain };
};
