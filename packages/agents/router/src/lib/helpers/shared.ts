import { signHandleRelayerFeePayload as _signHandleRelayerFeePayload } from "@connext/nxtp-utils";
import { utils } from "ethers";

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
  // use origin domain to get subgraph
  // run query to get asset by originLocalAsset
  // get canonical
  // use destination domain to get subgraph
  // query local asset on destination

  // TODO: Not implemented yet

  // const encoded = getTokenRegistryInterface().encodeFunctionData("getLocalAddress(uint32,address)", [
  //   originDomain,
  //   originLocalAsset
  // ]);

  return "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2";
};

export const getTransactionId = (nonce: string, domain: string): string => {
  return utils.keccak256(utils.hexlify(utils.concat([utils.toUtf8Bytes(nonce), utils.toUtf8Bytes(domain)])));
};

export const signHandleRelayerFeePayload = _signHandleRelayerFeePayload;
