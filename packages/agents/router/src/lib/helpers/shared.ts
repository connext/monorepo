import * as fs from "fs";

import {
  signHandleRelayerFeePayload as _signHandleRelayerFeePayload,
  getSubgraphHealth as _getSubgraphHealth,
  getSubgraphName as _getSubgraphName,
} from "@connext/nxtp-utils";
import { utils } from "ethers";

import { getContext } from "../../router";

/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param _originDomain
 * @param _originLocalAsset The asset sent over the bridge
 * @param _destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  _originDomain: string,
  _originLocalAsset: string,
  _destinationDomain: string,
): Promise<string> => {
  const {
    adapters: { subgraph },
  } = getContext();

  // get canonical asset from orgin domain.
  const sendingDomainAsset = await subgraph.getAssetByLocal(_originDomain, _originLocalAsset);

  const canonicalId = sendingDomainAsset!.canonicalId as string;

  const destinationDomainAsset = await subgraph.getAssetByCanonicalId(Number(_destinationDomain), canonicalId);

  const localAddress = destinationDomainAsset!.local;
  return localAddress;
};

export const getTransactionId = (nonce: string, domain: string): string => {
  return utils.keccak256(utils.hexlify(utils.concat([utils.toUtf8Bytes(nonce), utils.toUtf8Bytes(domain)])));
};

export const signHandleRelayerFeePayload = _signHandleRelayerFeePayload;

export const getSubgraphHealth = _getSubgraphHealth;

export const getSubgraphName = _getSubgraphName;

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;
