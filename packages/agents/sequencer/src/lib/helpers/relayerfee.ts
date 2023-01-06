import { XTransfer } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";
import { calculateRelayerFee } from "../../mockable";
import { getContext } from "../../sequencer";

const domainToNativeToken: Record<string, string> = {
  "9991": "0x0000000000000000000000000000000000001010",
  "1886350457": "0x0000000000000000000000000000000000001010",
};
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

  const originNativeToken = domainToNativeToken[originDomain] ?? constants.AddressZero;
  const destinationNativeToken = domainToNativeToken[originDomain] ?? constants.AddressZero;
  const estimatedRelayerFee = await calculateRelayerFee(
    { originDomain, destinationDomain, originNativeToken, destinationNativeToken },
    chainData,
    logger,
  );

  const minimumFeeNeeded = estimatedRelayerFee.mul(Math.floor(100 - config.relayerFeeTolerance));
  const canSubmit = BigNumber.from(origin.relayerFee).gte(minimumFeeNeeded);

  return { canSubmit, needed: minimumFeeNeeded.toString() };
};
