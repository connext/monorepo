import { utils, constants, BigNumber, BigNumberish } from "ethers";

export const toWad = (amount: string, decimals = 18): BigNumber => {
  return utils.parseUnits(sanitizeDecimals(amount, decimals), decimals);
};

export const fromWad = (wad: BigNumberish, decimals = 18): string => {
  return sanitizeDecimals(utils.formatUnits(wad, decimals), decimals);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const maxBN = (lobn: any) =>
  lobn.reduce((max: any, current: any) => (max.gt(current) ? max : current), constants.Zero);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const minBN = (lobn: any) =>
  lobn.reduce((min: any, current: any) => (min.lt(current) ? min : current), constants.MaxUint256);

export const inverse = (value: string, precision = 18): string =>
  fromWad(toWad("1", precision * 2).div(toWad(value, precision)), precision);

export const sanitizeDecimals = (value: string, decimals = 18): string => {
  const [integer, fractional] = value.split(".");
  const _fractional = fractional ? fractional.substring(0, decimals).replace(/0+$/gi, "") : undefined;
  return _fractional ? [integer, _fractional].join(".") : integer;
};

export const removeDecimals = (value: string): string => {
  const [integer] = value.split(".");
  return integer;
};

export const calculateExchangeAmount = (inputAmount: string, swapRate: string, precision = 18): string => {
  const swapRateWad = toWad(swapRate, precision);
  const inputWad = toWad(inputAmount, precision * 2);
  const outputWad = inputWad.mul(swapRateWad);
  const outputAmount = fromWad(outputWad, precision * 3);
  return outputAmount;
};

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

const roundFractional = (fractional: string, precision = 2): string => {
  return String(
    Math.round(Number(fractional.substring(0, precision) + "." + fractional.substring(precision, precision + 1))),
  );
};

function padString(str: string, length: number, left: boolean, padding = "0"): string {
  const diff = length - str.length;
  let result = str;
  if (diff > 0) {
    const pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }
  return result;
}

function padRight(str: string, length: number, padding = "0"): string {
  return padString(str, length, false, padding);
}

export const formatDisplayAmount = (amount: string, precision = 2, symbol = ""): string => {
  const _symbol = symbol.trim() ? `${symbol.trim()} ` : "";
  const [integer, fractional] = amount.split(".");
  let _fractional = fractional
    ? fractional.length < precision
      ? fractional
      : roundFractional(fractional, precision)
    : "";
  let _integer = integer;
  if (_fractional.length > precision) {
    _fractional = _fractional.substring(_fractional.length - precision, _fractional.length);
    _integer = String(Number(integer) + 1);
  }
  _fractional = padRight(_fractional, precision);
  const _amount = [_integer, _fractional].join(".");
  return `${_symbol}${_amount}`;
};
