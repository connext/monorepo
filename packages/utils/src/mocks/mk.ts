const hexChars = "0123456789abcdef";
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
 * Generates a random 32-byte hex string
 *
 * @returns 32-byte hex string
 */
export const mkRandomBytes32 = (): string => {
  let randomHex = "0x";
  for (let i = 0; i < 64; i++) {
    randomHex += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return randomHex;
};

/**
 * Generates a random eth-address compatible string
 *
 * @returns A valid ethereum address string
 */
export const mkRandomAddress = (): string => {
  let randomHex = "0x";
  for (let i = 0; i < 40; i++) {
    randomHex += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return randomHex;
};
