import * as fs from "fs";

import {
  getGelatoRelayerAddress as _getGelatoRelayerAddress,
  gelatoSend as _gelatoSend,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  getTransactionHashFromGelato as _getTransactionHashFromGelato,
  gelatoSDKSend as _gelatoSDKSend,
  generateExitPayload as _generateExitPayload,
} from "@connext/nxtp-utils";
import { CrossChainMessenger as _CrossChainMessenger } from "@eth-optimism/sdk";
import axios from "axios";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const getGelatoRelayerAddress = _getGelatoRelayerAddress;

export const gelatoSend = _gelatoSend;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

export const getTransactionHashFromGelato = _getTransactionHashFromGelato;

export const gelatoSDKSend = _gelatoSDKSend;

// eslint-disable-next-line @typescript-eslint/unbound-method
export const axiosGet = axios.get;

export const CrossChainMessenger = _CrossChainMessenger;

export const generateExitPayload = _generateExitPayload;
