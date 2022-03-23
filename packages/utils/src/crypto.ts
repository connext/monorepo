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
    if (
      e.message === "public key length is invalid" ||
      e.message === "Expected public key to be an Uint8Array with length [33, 65]" ||
      e.code === "INVALID_ARGUMENT"
    ) {
      throw new Error("The public key must be a string representing 64 bytes");
    }
    throw e;
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
