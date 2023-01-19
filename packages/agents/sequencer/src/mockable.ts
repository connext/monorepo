import { sendWithRelayerWithBackup as _sendWithRelayerWithBackup } from "@connext/nxtp-adapters-relayer";
import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import { calculateRelayerFee as _calculateRelayerFee } from "@connext/nxtp-utils";

export const sendWithRelayerWithBackup = _sendWithRelayerWithBackup;
export const getEstimatedFee = GelatoRelaySDK.getEstimatedFee;
export const calculateRelayerFee = _calculateRelayerFee;
