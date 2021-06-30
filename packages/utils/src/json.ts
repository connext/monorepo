const nullify = (_key: string, value: any) => (typeof value === "undefined" ? null : value);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const safeJsonStringify = (value: any): string => {
  try {
    return typeof value === "string" ? value : JSON.stringify(value, nullify);
  } catch (e) {
    return value;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function safeJsonParse<T = any>(value: any): T {
  try {
    return typeof value === "string" ? JSON.parse(value, nullify) : value;
  } catch (e) {
    return value;
  }
}
