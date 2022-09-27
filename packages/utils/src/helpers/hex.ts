import { utils } from "ethers";
////////////////////////////////////////
// Validators

/**
 * Does some validation on a value that should be a hex string of a given length. Validates that the hex string is a string, has the proper prefix, passes ethers validation, and has the specified length
 *
 * @param value - Value to validate
 * @param length - (optional) Length the hex string should be
 * @returns undefined if validation passes, or a string representing the appropriate error
 */
export const getHexStringError = (value: any, length?: number): string | undefined => {
  if (typeof value !== "string") {
    return `Invalid hex string: ${value} is a ${typeof value}, expected a string`;
  }
  if (!value.startsWith("0x")) {
    return `Invalid hex string: ${value} doesn't start with 0x`;
  }
  if (!utils.isHexString(value)) {
    return `Invalid hex string: ${value}`;
  }
  if (length && utils.hexDataLength(value) !== length) {
    return `Invalid hex string of length ${length}: ${value} is ${utils.hexDataLength(value)} bytes long`;
  }
  return undefined;
};

/**
 * Returns a boolean representing if the hex string is valid
 *
 * @param value - Value to validate
 * @returns True if it is a valid hex string, or false otherwise
 */
export const isValidHexString = (value: any): boolean => !getHexStringError(value);

/**
 * Returns a string if the value is not an address, or undefined if it is a valid address
 *
 * @param value - Value to validate
 * @returns undefined if validation passes, or a string representing the appropriate error
 */
export const getAddressError = (value: any): string | undefined => {
  const hexError = getHexStringError(value, 20);
  if (hexError) return hexError;
  utils.getAddress(value as string);
  return undefined;
};

/**
 * Returns a boolean representing if the address is valid
 *
 * @param value - Value to validate
 * @returns True if it is a valid address, or false otherwise
 */
export const isValidAddress = (value: any): boolean => !getAddressError(value);

/**
 * Returns a string if the value is not bytes32, or undefined if it is valid bytes32
 *
 * @param value - Value to validate
 * @returns undefined if validation passes, or a string representing the appropriate error
 */
export const getBytes32Error = (value: any): string | undefined => {
  const hexStringError = getHexStringError(value, 32);
  if (hexStringError) return hexStringError;
  return undefined;
};

/**
 * Returns a boolean representing if the value is valid bytes32
 *
 * @param value - Value to validate
 * @returns True if it is a valid bytes32, or false otherwise
 */
export const isValidBytes32 = (value: any): boolean => !getBytes32Error(value);

////////////////////////////////////////
// Generators

/**
 * Gets a random valid address
 *
 * @returns An eth address
 */
export const getRandomAddress = (): string => utils.getAddress(utils.hexlify(utils.randomBytes(20)));

/**
 * Gets a random bytes32
 *
 * @returns A random/valid bytes32 string
 */
export const getRandomBytes32 = (): string => utils.hexlify(utils.randomBytes(32));

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
