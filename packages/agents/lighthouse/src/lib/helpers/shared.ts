import * as fs from "fs";

import {
  gelatoSend as _gelatoSend,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  getGelatoRelayerAddress as _getGelatoRelayerAddress,
  getSubgraphHealth as _getSubgraphHealth,
  getSubgraphName as _getSubgraphName,
} from "@connext/nxtp-utils";
import { utils } from "ethers";

import { getContext } from "../../lighthouse";

export const getTransactionId = (nonce: string, domain: string): string => {
  return utils.keccak256(utils.hexlify(utils.concat([utils.toUtf8Bytes(nonce), utils.toUtf8Bytes(domain)])));
};

export const getSubgraphHealth = _getSubgraphHealth;

export const getSubgraphName = _getSubgraphName;

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;

export const gelatoSend = _gelatoSend;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

export const getGelatoRelayerAddress = _getGelatoRelayerAddress;
