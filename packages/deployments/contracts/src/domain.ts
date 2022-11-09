import { utils } from "ethers";
import fetch, { Headers, Request, Response } from "node-fetch";

if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
  (globalThis as any).Request = Request;
  (globalThis as any).Response = Response;
}

export type Address = string;

// Hex domains calculated using `getHexDomainFromString`
const chainIdToDomainMapping: Map<number, number> = new Map([
  // mainnets
  [1, 0x657468], // Ethereum ('eth interpreted as int) 6648936
  [10, 0x6f707469], // Optimism (opti interpreted as int) 1869640809
  [56, 0x626e62], // BNB Chain ('bnb interpreted as int) 6450786
  [100, 0x676e6f], // Gnosis Chain ('gno interpreted as int) 6778479
  [137, 0x706f6c79], // Polygon (poly interpreted as int) 1886350457
  [1284, 0x6265616d], // Moonbeam ('beam interpreted as int) 1650811245
  [42161, 0x6172626f], // Arbitrum One ('arbo interpreted as int) 1634886255
  // testnets
  [42, 0x6b6f7661], // Kovan (kovan interpreted as int) 1802466913
  [5, 0x676f6572], // Goerli (goerli interpreted as int) 1735353714
  [420, 0x676f7074], // optimism-goerli (gopti interpreted as int) 1735356532
  [69, 0x6b6f7074], // optimism-kovan (kopti interpreted as int) 1802465396
  [80001, 0x2707], // mumbai 9991
  [421613, 0x67617262], // arbitrum-goerli (garb interpreted as int) 1734439522
  [10200, 0x63686961], // gnosis-chiado (chiado interpreted as int) 1667787105
  [97, 0x63686170], // chapel (chapel interpreted as int) 1667785072
  // local
  [1337, 1337],
  [1338, 1338],
]);

/**
 * Converts a chain id (listed at at chainlist.org) to a domain.
 *
 * @param chainId A chain id number
 * @returns A domain number in decimal
 */
export function chainIdToDomain(chainId: number): number {
  const domain = chainIdToDomainMapping.get(chainId);
  if (!domain) throw new Error(`Cannot find corresponding domain for chainId ${chainId}`);

  return domain;
}

/**
 * Converts a domain id  to a chain id. (listed at at chainlist.org)
 *
 * @param domainId A domain id number
 * @returns A chain id
 */
export function domainToChainId(domainId: number): number {
  const keys = chainIdToDomainMapping.keys();
  let chainId;
  for (const key of keys) {
    if (chainIdToDomainMapping.get(key) == domainId) chainId = key;
  }

  if (!chainId) {
    throw new Error(`Cannot find corresponding chainId for domain ${domainId}`);
  }

  return chainId;
}

/**
 * Converts a string (e.g. "eth" for Ethereum) to a domain displayed as
 * a hex string.
 * @dev Interprets string bytes as int.
 * @param name The chain string
 * @returns A 0x prefixed domain in hex (string)
 */
export function getHexDomainFromString(name: string): string {
  const domain = getDomainFromString(name);
  return "0x" + domain.toString(16);
}

/**
 * Converts a string (e.g. "eth" for Ethereum) to a decimal formatted domain.
 * @dev Interprets string bytes as int.
 * @param name The chain string
 * @returns A domain number in decimal
 */
export function getDomainFromString(name: string): number {
  const buf = Buffer.alloc(4);
  const offset = 4 - name.length;
  buf.write(name, offset > 0 ? offset : 0, "utf8");
  return buf.readUInt32BE(0);
}

/**
 * Converts a 20-byte (or other length) ID to a 32-byte ID.
 * Ensures that a bytes-like is 32 long. left-padding with 0s if not.
 *
 * @param data A string or array of bytes to canonize
 * @returns A Uint8Array of length 32
 * @throws if the input is undefined, or not exactly 20 or 32 bytes long
 */
export function canonizeId(data?: utils.BytesLike): Uint8Array {
  if (!data) throw new Error("Bad input. Undefined");

  const buf = utils.arrayify(data);
  if (buf.length > 32) throw new Error("Too long");
  if (buf.length !== 20 && buf.length != 32) {
    throw new Error("bad input, expect address or bytes32");
  }
  return utils.zeroPad(buf, 32);
}

/**
 * Converts an ID of 20 or 32 bytes to the corresponding EVM Address.
 *
 * For 32-byte IDs this enforces the EVM convention of using the LAST 20 bytes.
 *
 * @param data The data to truncate
 * @returns A 20-byte, 0x-prepended hex string representing the EVM Address
 * @throws if the data is not 20 or 32 bytes
 */
export function evmId(data: utils.BytesLike): Address {
  const u8a = utils.arrayify(data);

  if (u8a.length === 32) {
    return utils.hexlify(u8a.slice(12, 32));
  } else if (u8a.length === 20) {
    return utils.hexlify(u8a);
  } else {
    throw new Error(`Invalid id length. expected 20 or 32. Got ${u8a.length}`);
  }
}

/**
 * Sleep async for some time.
 *
 * @param ms the number of milliseconds to sleep
 * @returns A delay promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
