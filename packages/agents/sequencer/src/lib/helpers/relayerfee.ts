import { XTransfer, createLoggingContext, domainToChainId } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { calculateRelayerFee, safeGetConversionRate, getDecimalsForAsset } from "../../mockable";
import { getContext } from "../../sequencer";

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
  const originChainId = domainToChainId(+originDomain);
  // origin native token to usdc
  const prices: Record<string, number> = {};
  prices[constants.AddressZero] = await safeGetConversionRate(originChainId, undefined, logger);
  for (const asset of relayerFeeAssets) {
    if (asset === constants.AddressZero) {
      const nativeFee = BigNumber.from(origin.relayerFees[asset]);
      const relayerFeePaid = nativeFee.mul(Math.floor(prices[asset] * 1000)).div(1000);
      relayerFeePaidUsd = relayerFeePaidUsd.add(relayerFeePaid);
    } else if (asset.toLowerCase() === origin.assets.transacting.asset.toLowerCase()) {
      // origin native token to asset price
      // get adopted asset for the origin domain
      let adoptedAsset = asset;
      if (origin.assets.transacting.asset.toLowerCase() === origin.assets.bridged.asset.toLowerCase()) {
        adoptedAsset = await getOriginAdoptedAsset(originDomain, origin.assets.bridged.asset);
      }
      const originPriceAsset = await getConversionRate(originChainId, adoptedAsset, logger);

      prices[asset] = originPriceAsset === 0 ? 0 : prices[constants.AddressZero] / originPriceAsset;
      const relayerFeeDecimals = await getDecimalsForAsset(asset, originChainId, undefined, chainData, () =>
        chainreader.getDecimalsForAsset(+originDomain, asset),
      );
      const relayerFeePaid = BigNumber.from(origin.relayerFees[asset])
        .mul(Math.floor(prices[asset] * 1000))
        .div(1000)
        .mul(BigNumber.from(10).pow(18 - relayerFeeDecimals));
      relayerFeePaidUsd = relayerFeePaidUsd.add(relayerFeePaid);
    }
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

export const getOriginAdoptedAsset = async (_originDomain: string, _originLocalAsset: string): Promise<string> => {
  const {
    adapters: { subgraph },
  } = getContext();
  // handle address(0) default case
  if (_originLocalAsset === constants.AddressZero) {
    return constants.AddressZero;
  }

  // get canonical asset from orgin domain.
  const sendingDomainAsset = await subgraph.getAssetByLocal(_originDomain, _originLocalAsset);
  const adopterAsset = sendingDomainAsset!.adoptedAsset;

  return adopterAsset;
};
