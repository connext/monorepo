/**
 * Converts all undefined values within an object to null
 *
 * @param _key - Key of the object
 * @param value - Value to potentially be converted from undefined to null
 * @returns
 */
const nullify = (_key: string, value: any) => (typeof value === "undefined" ? null : value);

/**
 * Converts a JSON object to a string safely
 *
 * @param value - JSON to convert to a string
 * @returns string representation of the provied json
 */
export const safeJsonStringify = (value: any): string => {
  try {
    return typeof value === "string" ? value : JSON.stringify(value, nullify);
  } catch (e: unknown) {
    return value;
  }
};

/**
 * Parses a json string safely
 *
 * @param value - JSON string to parse
 * @returns a JSON
 */
export function safeJsonParse<T = any>(value: any): T {
  try {
    return typeof value === "string" ? JSON.parse(value, nullify) : value;
  } catch (e: unknown) {
    return value;
  }
}
