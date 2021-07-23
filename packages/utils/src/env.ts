/**
 * Helper to determine if the current environment is node or not
 *
 * @returns True if it is a node env, false otherwise
 */
export const isNode = (): boolean =>
  typeof process !== "undefined" &&
  typeof process.versions !== "undefined" &&
  typeof process.versions.node !== "undefined";
