import { Signer, Wallet, BigNumber, providers } from "ethers";
import { arrayify, solidityKeccak256, splitSignature, verifyMessage } from "ethers/lib/utils";

import { encodeHandleRelayerFeeData } from ".";

/**
 * Occasionally have seen metamask return signatures with v = 00 or v = 01.
 * Signatures having these values will revert when used onchain. Ethers handles
 * these cases in the `splitSignature` function, where it regenerates an
 * appropriate `v` value:
 * https://github.com/ethers-io/ethers.js/blob/c2c0ce75039e7256b287f9a764188d08ed0b7296/packages/bytes/src.ts/index.ts#L348-L355
 *
 * This function will rely on the edgecase handling there to ensure any
 * signatures are properly formatted. This has been tested manually against
 * offending signatures.
 *
 * @param sig Signature to sanitize
 */
const sanitizeSignature = (sig: string): string => {
  if (sig.endsWith("1c") || sig.endsWith("1b")) {
    return sig;
  }

  // Must be sanitized
  const { v } = splitSignature(sig);
  const hex = BigNumber.from(v).toHexString();
  return sig.slice(0, sig.length - 2) + hex.slice(2);
};

export const sign = async (hash: string, signer: Wallet | Signer): Promise<string> => {
  const msg = arrayify(hash);
  const addr = await signer.getAddress();
  if (typeof (signer.provider as providers.Web3Provider)?.send === "function") {
    try {
      return sanitizeSignature(
        (await (signer.provider as providers.Web3Provider).send("personal_sign", [hash, addr])) as string,
      );
    } catch (err: unknown) {
      // console.error("Error using personal_sign, falling back to signer.signMessage: ", err);
    }
  }

  return sanitizeSignature(await signer.signMessage(msg));
};

/**
 * Generates a signature on the handleRelayerFee payload in `execute` transaction
 *
 * @param transferId - The nonce of the origin domain at the time the transaction was prepared. Used to generate
 * the transaction id for the crosschain transaction
 * @param feePercentage - The amount over the BASEFEE to tip the relayer
 * @returns Signature of the payload from the signer
 */
export const signHandleRelayerFeePayload = async (
  transferId: string,
  feePercentage: string,
  signer: Wallet | Signer,
): Promise<string> => {
  const hash = getHandleRelayerFeeHashToSign(transferId, feePercentage);

  return sign(hash, signer);
};

/**
 * Generates a hash to sign of the handleRelayerFee payload in `execute` transaction
 *
 * @param transferId - The nonce of the origin domain at the time the transaction was prepared. Used to generate
 * the transaction id for the crosschain transaction
 * @param feePercentage - The amount over the BASEFEE to tip the relayer
 * @returns Hash that should be signed
 */
export const getHandleRelayerFeeHashToSign = (transferId: string, feePercentage: string): string => {
  const payload = encodeHandleRelayerFeeData(transferId, feePercentage);
  const hash = solidityKeccak256(["bytes"], [payload]);
  return hash;
};

/**
 * Returns the recovered signer from the handleRelayerFee payload
 *
 * @param transferId - The transferId generated on the origin domain
 * @param feePercentage - The amount over the BASEFEE to tip the relayer
 * @returns Recovered address of signer
 */
export const recoverHandleRelayerFeePayload = (
  transferId: string,
  feePercentage: string,
  signature: string,
): string => {
  const payload = encodeHandleRelayerFeeData(transferId, feePercentage);
  const hashed = solidityKeccak256(["bytes"], [payload]);
  return verifyMessage(arrayify(hashed), signature);
};
