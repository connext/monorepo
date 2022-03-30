import { signHandleRelayerFeePayload as _signHandleRelayerFeePayload } from "@connext/nxtp-utils";
import { utils } from "ethers";

/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param originDomain
 * @param originLocalAsset The asset sent over the bridge
 * @param destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  originDomain: string,
  originLocalAsset: string,
  destinationDomain: string,
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

  return originLocalAsset ?? "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d";
};

export const getTransactionId = (nonce: string, domain: string): string => {
  return utils.keccak256(utils.hexlify(utils.concat([utils.toUtf8Bytes(nonce), utils.toUtf8Bytes(domain)])));
};

export const signHandleRelayerFeePayload = _signHandleRelayerFeePayload;
