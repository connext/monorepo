import { utils } from "ethers";
import { publicKeyConvert } from "secp256k1";

/**
 * Function to derive the address from an EC public key
 *
 * @param publicKey the public key to derive
 *
 * @returns the address
 */
export const getAddressFromPublicKey = (publicKey: string): string => {
  try {
    return utils.computeAddress(compressPublicKey(publicKey));
  } catch (e: any) {
    throw new Error(`Invalid public key, errorMsg: ${e.toString()}`);
  }
};

/**
 * Converts a public key to its compressed form.
 */
export const compressPublicKey = (publicKey: string): Uint8Array => {
  publicKey = publicKey.replace(/^0x/, "");
  // if there are more bytes than the key itself, it means there is already a prefix
  if (publicKey.length % 32 === 0) {
    publicKey = `04${publicKey}`;
  }
  return publicKeyConvert(Buffer.from(publicKey, "hex"));
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
  } catch (error: unknown) {
    throw new Error(`${address} is not a valid address.`);
  }
}
