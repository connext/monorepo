import {
  gelatoSDKSend as _gelatoSDKSend,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  getGelatoRelayerAddress as _getGelatoRelayerAddress,
  getTaskStatusFromGelato as _getTaskStatusFromGelato,
  getTaskStatusFromBackupRelayer as _getTaskStatusFromBackupRelayer,
  connextRelayerSend as _connextRelayerSend,
} from "@connext/nxtp-utils";

export const gelatoSDKSend = _gelatoSDKSend;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

export const getGelatoRelayerAddress = _getGelatoRelayerAddress;

export const getTaskStatusFromGelato = _getTaskStatusFromGelato;

export const connextRelayerSend = _connextRelayerSend;

export const getTaskStatusFromBackupRelayer = _getTaskStatusFromBackupRelayer;
