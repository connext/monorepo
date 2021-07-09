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
