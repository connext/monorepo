import * as fs from "fs";

import {
  gelatoSend as _gelatoSend,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  getGelatoRelayerAddress as _getGelatoRelayerAddress,
} from "@connext/nxtp-utils";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const gelatoSend = _gelatoSend;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

export const getGelatoRelayerAddress = _getGelatoRelayerAddress;
