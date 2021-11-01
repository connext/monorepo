import { encrypt as libEncrypt } from "eth-sig-util";
import { utils } from "ethers";
import { publicKeyConvert } from "secp256k1";

declare const ethereum: any;
// /**
//  * Encrypts some message with the provided public key
//  *
//  * @param message - Information to encrypt
//  * @param publicKey - Public key to encrypt with
//  * @returns Encrypted message
//  */
export const encrypt = async (message: string, publicKey: string) => {
  const buf = Buffer.from(JSON.stringify(libEncrypt(publicKey, { data: message }, "x25519-xsalsa20-poly1305")), "utf8");
  return "0x" + buf.toString("hex");
};

export const ethereumRequest = async (method: string, params: string[]): Promise<any> => {
  // If ethereum.request() exists, the provider is probably EIP-1193 compliant.
  return await ethereum.request({
    method,
    params,
  });
};

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
  } catch (e) {
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
