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
  try {
    const hexError = getHexStringError(value, 20);
    if (hexError) return hexError;
    utils.getAddress(value);
    return undefined;
  } catch (e) {
    return e.message;
  }
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
