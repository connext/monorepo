import { utils } from "ethers";

export const mkAddress = (prefix = "0x0"): string => {
  return prefix.padEnd(42, "0");
};

export const mkPublicIdentifier = (prefix = "vectorA"): string => {
  return prefix.padEnd(56, "0");
};

export const mkHash = (prefix = "0x"): string => {
  return prefix.padEnd(66, "0");
};

export const mkBytes32 = (prefix = "0xa"): string => {
  return prefix.padEnd(66, "0");
};

export const mkSig = (prefix = "0xa"): string => {
  return prefix.padEnd(132, "0");
};

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
export function validateAndParseAddress(address: string): string {
  try {
    return utils.getAddress(address);
  } catch (error) {
    throw new Error(`${address} is not a valid address.`);
  }
}
