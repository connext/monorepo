import { utils, BigNumber, BigNumberish } from "ethers";
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

/**
 * Converts the given amount to WAD units (with the provided number of decimals)
 *
 * @param amount - Amount to convert
 * @param decimals - (optional) Precision of WAD units (defaults to 18)
 * @returns BigNumber representation of converted to wad units
 */
export const toWad = (amount: string, decimals = 18): BigNumber => {
  return utils.parseUnits(sanitizeDecimals(amount, decimals), decimals);
};

/**
 * Converts a wad amount to normal units (using the provided number of decimals as the wad precision)
 *
 * @param wad - The wad units to convert to normal units
 * @param decimals - (optional) The wad decimal precision (defaults to 18)
 * @returns The amount in normal units
 */
export const fromWad = (wad: BigNumberish, decimals = 18): string => {
  return sanitizeDecimals(utils.formatUnits(wad, decimals), decimals);
};

/**
 * Inverts the given value with the provided precision
 *
 * @param value - Value to invert
 * @param precision - (optional) The precision to use. Defaults to 18
 * @returns
 */
export const inverse = (value: string, precision = 18): string =>
  fromWad(toWad("1", precision * 2).div(toWad(value, precision)), precision);

/**
 * Drops decimals past the provided prevision
 *
 * @param value Value to sanitize
 * @param decimals - (optional) The precision to use. Defaults to 18
 * @returns
 */
export const sanitizeDecimals = (value: string, decimals = 18): string => {
  const [integer, fractional] = value.split(".");
  const _fractional = fractional ? fractional.substring(0, decimals).replace(/0+$/gi, "") : undefined;
  return _fractional ? [integer, _fractional].join(".") : integer;
};

/**
 * Drops all decimals from a string number
 *
 * @param value - Value to drop decimals from
 * @returns The floor integer of the provided value
 */
export const removeDecimals = (value: string): string => {
  const [integer] = value.split(".");
  return integer;
};

/**
 * Calculates an exchange with the given amount of precision using wad math
 *
 * @remarks Will not round properly, prefer wad calculations
 *
 * @param inputAmount - Amount to exchange
 * @param swapRate - Exchange rate
 * @param precision - (optional) The precision to use in the output amount. Defaults to 18
 * @returns
 */
export const calculateExchangeAmount = (inputAmount: string, swapRate: string, precision = 18): string => {
  const swapRateWad = toWad(swapRate, precision);
  const inputWad = toWad(inputAmount, precision * 2);
  const outputWad = inputWad.mul(swapRateWad);
  const outputAmount = fromWad(outputWad, precision * 3);
  return outputAmount;
};

/**
 * Calculates the exchanged amount from the given inputs.
 *
 * @param inputWad - Wad input units to exchange for output
 * @param inputDecimals - Decimals used on input
 * @param swapRate - String rate of input units to output units
 * @param outputDecimals - Precision to use for exchanged amount
 * @returns Equivalent amount of `output` in provided decimal precisions
 */
export const calculateExchangeWad = (
  inputWad: BigNumber,
  inputDecimals: number,
  swapRate: string,
  outputDecimals: number,
): BigNumber => {
  const inputAmount = fromWad(inputWad, inputDecimals);
  const outputAmount = calculateExchangeAmount(inputAmount, swapRate);
  const outputWad = toWad(outputAmount, outputDecimals);
  return outputWad;
};

export const getRateFromPercentage = (percentage: string): string => {
  const rate = (1 - parseFloat(percentage) / 100).toString();
  return rate;
};
