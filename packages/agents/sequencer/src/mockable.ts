import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;
export const getEstimatedFee = GelatoRelaySDK.getEstimatedFee;
