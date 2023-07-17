import { BigNumber, BigNumberish } from "ethers";

export function convertBigNumberObject<T extends Record<string, any>>(
  obj: T,
): { [K in keyof T]: T[K] extends BigNumberish ? BigNumber : T[K] } {
  const result: any = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && value !== null && "type" in value && "hex" in value) {
      result[key] = BigNumber.from(value.hex);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item: any) =>
        typeof item === "object" && item !== null && "type" in item && "hex" in item ? BigNumber.from(item.hex) : item,
      );
    } else if (typeof value === "object" && !Array.isArray(value)) {
      result[key] = convertBigNumberObject(value);
    } else {
      result[key] = value;
    }
  }

  return result as { [K in keyof T]: T[K] extends BigNumberish ? BigNumber : T[K] };
}
