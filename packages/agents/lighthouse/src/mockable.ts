import * as fs from "fs";

import {
  getGelatoRelayerAddress as _getGelatoRelayerAddress,
  gelatoSend as _gelatoSend,
  isChainSupportedByGelato as _isChainSupportedByGelato,
} from "@connext/nxtp-utils";
import axios from "axios";

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const getGelatoRelayerAddress = _getGelatoRelayerAddress;

export const gelatoSend = _gelatoSend;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

// eslint-disable-next-line @typescript-eslint/unbound-method
export const axiosGet = axios.get;
