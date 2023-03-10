import {
  XTransfer,
  createLoggingContext,
  getConversionRate,
  getChainIdFromDomain,
  getDecimalsForAsset,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { calculateRelayerFee } from "../../mockable";
import { getContext } from "../../sequencer";

/**
 * @dev Relayer fee paid by user would be checked whether its enough or not
 * @param transfer - The origin transfer entity
 */
export const canSubmitToRelayer = async (transfer: XTransfer): Promise<{ canSubmit: boolean; needed: string }> => {
  const { requestContext, methodContext } = createLoggingContext(canSubmitToRelayer.name);
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

  let estimatedRelayerFeeUsd = await calculateRelayerFee(
    {
      originDomain,
      destinationDomain,
      priceIn: "usd",
      originNativeToken: constants.AddressZero,
      destinationNativeToken: constants.AddressZero,
      getGasPriceCallback: (domain: number) => chainreader.getGasPrice(domain, requestContext),
    },
    chainData,
    logger,
  );

  const relayerFeePaidUsd = constants.Zero;
  for (const asset of relayerFeeAssets) {
    if (asset === constants.AddressZero) {
      const destChainId = await getChainIdFromDomain(destinationDomain, chainData);
      const nativeUsd = await getConversionRate(destChainId, undefined, logger);
      const nativeFee = BigNumber.from(origin.relayerFees[asset]);
      const relayerFeePaid = nativeFee.mul(nativeUsd * 1000).div(1000);
      relayerFeePaidUsd.add(relayerFeePaid);
    } else {
      const originChainId = await getChainIdFromDomain(originDomain, chainData);
      const relayerFeeDecimals = await getDecimalsForAsset(asset, originChainId);
      const relayerFeePaid = BigNumber.from(origin.relayerFees[asset]).mul(
        BigNumber.from(10).pow(18 - relayerFeeDecimals),
      );
      relayerFeePaidUsd.add(relayerFeePaid);
    }
  }

  const minimumFeeNeeded = estimatedRelayerFeeUsd.mul(Math.floor(100 - config.relayerFeeTolerance)).div(100);
  const canSubmit = BigNumber.from(relayerFeePaidUsd).gte(minimumFeeNeeded);
  logger.info("Relayer fee check", requestContext, methodContext, {
    relayerFeePaidUsd: relayerFeePaidUsd.toString(),
    minimumFeeNeeded: minimumFeeNeeded.toString(),
    canSubmit,
  });

  return { canSubmit, needed: minimumFeeNeeded.toString() };
};
