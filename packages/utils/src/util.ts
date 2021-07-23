import { utils } from "ethers";

/**
 * Creates an eth-address compatible string with given prefix
 *
 * @param prefix  - (optional) String prefix
 * @returns 24 byte string
 */
export const mkAddress = (prefix = "0x0"): string => {
  return prefix.padEnd(42, "0");
};

/**
 * Creates a 32-byte string
 *
 * @param prefix - (optional) String prefix
 * @returns 32 byte string with provided prefix
 */
export const mkHash = (prefix = "0x"): string => {
  return prefix.padEnd(66, "0");
};

/**
 * Creates a 32-byte hex string for tests
 *
 * @param prefix - (optional) Prefix of the hex string to pad
 * @returns 32-byte hex string
 */
export const mkBytes32 = (prefix = "0xa"): string => {
  return prefix.padEnd(66, "0");
};

/**
 * Generates a string the same length as a signature
 *
 * @param prefix - (optional) Prefix of signature to create
 * @returns A string the same length as a signature
 */
export const mkSig = (prefix = "0xa"): string => {
  return prefix.padEnd(132, "0");
};

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 *
 * @param address the unchecksummed hex address
 * @returns The checksummed address
 */
export function validateAndParseAddress(address: string): string {
  try {
    return utils.getAddress(address);
  } catch (error) {
    throw new Error(`${address} is not a valid address.`);
  }
}
