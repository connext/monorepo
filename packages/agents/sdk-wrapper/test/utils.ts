import { BigNumber } from "ethers";

type HexNumber = {
  type: "BigNumber";
  hex: string;
};

export function convertBigNumberObject<T extends Record<string, any>>(
  res: T,
): { [K in keyof T]: T[K] extends HexNumber ? BigNumber : T[K] } {
  const result: any = {};

  for (const key in res) {
    const value = res[key];

    // If value is an object and not an array, recurse
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (value.type === "BigNumber") {
        result[key] = BigNumber.from(value.hex);
      } else {
        result[key] = convertBigNumberObject(value);
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
