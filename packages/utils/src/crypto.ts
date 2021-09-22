import { encrypt as libEncrypt } from "eth-sig-util";

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
