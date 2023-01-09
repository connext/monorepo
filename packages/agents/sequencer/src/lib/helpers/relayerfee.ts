import { XTransfer } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import { calculateRelayerFee } from "../../mockable";
import { getContext } from "../../sequencer";

/**
 * @dev Relayer fee paid by user would be checked whether its enough or not
 * @param transfer - The origin transfer entity
 */
export const canSubmitToRelayer = async (transfer: XTransfer): Promise<{ canSubmit: boolean; needed: string }> => {
  const { logger, chainData, config } = getContext();

  const {
    xparams: { originDomain, destinationDomain },
    origin,
  } = transfer;

  if (!origin?.relayerFee) {
    return { canSubmit: false, needed: "0" };
  }

  const estimatedRelayerFee = await calculateRelayerFee(
    {
      originDomain,
      destinationDomain,
      originNativeToken: constants.AddressZero,
      destinationNativeToken: constants.AddressZero,
    },
    chainData,
    logger,
  );

  const minimumFeeNeeded = estimatedRelayerFee.mul(Math.floor(100 - config.relayerFeeTolerance)).div(100);
  const canSubmit = BigNumber.from(origin.relayerFee).gte(minimumFeeNeeded);

  return { canSubmit, needed: minimumFeeNeeded.toString() };
};
