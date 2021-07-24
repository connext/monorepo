import {
  arrayToBuffer,
  decrypt as libDecrypt,
  deserialize,
  encrypt as libEncrypt,
  hexToBuffer,
  serialize,
  utf8ToBuffer,
} from "eccrypto-js";
import { utils } from "ethers";

import { isValidHexString } from "./hexStrings";

/**
 * Converts some input into a buffer
 *
 * @param input - Information to convert to a bugger
 * @returns Bufferified version of the provided input
 */
export const bufferify = (input: Uint8Array | Buffer | string): Buffer =>
  typeof input === "string"
    ? isValidHexString(input)
      ? hexToBuffer(input)
      : utf8ToBuffer(input)
    : !Buffer.isBuffer(input)
    ? arrayToBuffer(utils.arrayify(input))
    : input;

/**
 * Encrypts some message with the provided public key
 *
 * @param message - Information to encrypt
 * @param publicKey - Public key to encrypt with
 * @returns Encrypted message
 */
export const encrypt = async (message: string, publicKey: string): Promise<string> =>
  utils.hexlify(serialize(await libEncrypt(bufferify(publicKey), utf8ToBuffer(message))));

/**
 * Decrypts some information that was encrypted using a public key corresponding to the private key
 *
 * @param encrypted - Information to decrypt
 * @param privateKey - Key that had encrypted the message
 * @returns Unencrypted string
 */
export const decrypt = async (encrypted: string, privateKey: string): Promise<string> =>
  utils.toUtf8String(
    await libDecrypt(bufferify(privateKey), deserialize(bufferify(`0x${encrypted.replace(/^0x/, "")}`))),
  );
