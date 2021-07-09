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

////////////////////////////////////////
// Validators

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isValidHexString = (value: any): boolean => !getHexStringError(value);

export const bufferify = (input: Uint8Array | Buffer | string): Buffer =>
  typeof input === "string"
    ? isValidHexString(input)
      ? hexToBuffer(input)
      : utf8ToBuffer(input)
    : !Buffer.isBuffer(input)
    ? arrayToBuffer(utils.arrayify(input))
    : input;

export const encrypt = async (message: string, publicKey: string): Promise<string> =>
  utils.hexlify(serialize(await libEncrypt(bufferify(publicKey), utf8ToBuffer(message))));

export const decrypt = async (encrypted: string, privateKey: string): Promise<string> =>
  utils.toUtf8String(
    await libDecrypt(bufferify(privateKey), deserialize(bufferify(`0x${encrypted.replace(/^0x/, "")}`))),
  );
