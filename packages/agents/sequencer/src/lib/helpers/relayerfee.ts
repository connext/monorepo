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
  );

  let relayerFeePaidUsd = constants.Zero;

  // Convert the amount of relayer fee for each asset into a corresponding USD value, and sum
  // NOTE: `safeGetConversionRate` will give you the price of the native asset on the provided chain,
  // to the provided asset (or USDC if not provided).

  // Store all retrieved prices for easy logging
  const prices: Record<string, number> = {};

  // Get the price of native asset in USDC for conversions.
  const originChainId = domainToChainId(+originDomain);
  const originNativeAssetPrice = await safeGetConversionRate(originChainId, undefined, logger);
  prices[constants.AddressZero] = originNativeAssetPrice;
  for (const asset of relayerFeeAssets) {
    // The relayer fee can technically be paid in any whitelisted asset, but will generally be
    // one of the three options:
    // - origin chain native asset
    // - local asset (e.g. nextWETH)
    // - adopted asset (e.g. WETH)
    // where local / adopted assets are be the transacting asset on the origin chain.

    // Get the price of the asset in USDC
    // NOTE: when using the local asset, should get the price of the canonical counterpart
    let assetPriceUsd;
    if (asset.toLowerCase() === constants.AddressZero) {
      assetPriceUsd = originNativeAssetPrice;
    } else if (
      asset.toLowerCase() === origin.assets.transacting.asset.toLowerCase() &&
      origin.assets.transacting.asset.toLowerCase() === origin.assets.bridged.asset.toLowerCase()
    ) {
      logger.debug("Relayer fee is in local asset", requestContext, methodContext, {
        asset,
        local: origin.assets.bridged.asset,
      });
      // relayer fee is in transacting asset && transacting asset is the local asset.
      // get the USD price of the canonical counterpart
      const { canonicalAsset, canonicalChain } = await getCanonicalAssetAndChainFromLocal(
        originDomain,
        asset,
        requestContext,
      );
      // get the price of the native asset on canonical chain in USDC; and canonical asset in canonical native
      const [canonicalNativeUsd, canonicalAssetCanonicalNative] = await Promise.all([
        safeGetConversionRate(canonicalChain, undefined, logger),
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
      assetPriceUsd = canonicalNativeUsd === 0 ? 0 : canonicalAssetCanonicalNative / canonicalNativeUsd;
    } else {
      // otherwise it is the adopted (or unknown) asset, query the price of the asset directly
      const assetPriceNative = await safeGetConversionRate(originChainId, asset, logger);
      assetPriceUsd = assetPriceNative / originNativeAssetPrice;
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

const getCanonicalAssetAndChainFromLocal = async (
  _domain: string,
  _local: string,
  _requestContext: RequestContextWithTransactionId,
): Promise<{ canonicalAsset: string; canonicalChain: number }> => {
  const {
    logger,
    adapters: { subgraph },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(
    getCanonicalAssetAndChainFromLocal.name,
    _requestContext,
    _requestContext.id,
  );
  logger.debug("Method start", requestContext, methodContext, { domain: _domain, local: _local });

  // get asset record from given domain/local asset combo
  const sendingDomainAsset = await subgraph.getAssetByLocal(_domain, _local);
  if (!sendingDomainAsset) {
    throw new CanonicalAssetNotFound({ domain: _domain, local: _local });
  }

  const canonicalAsset = evmId(sendingDomainAsset.canonicalId);
  const canonicalChain = domainToChainId(+sendingDomainAsset.canonicalDomain);

  logger.debug("Method complete", requestContext, methodContext, {
    domain: _domain,
    local: _local,
    canonicalAsset,
    canonicalChain,
  });

  return { canonicalAsset, canonicalChain };
};
