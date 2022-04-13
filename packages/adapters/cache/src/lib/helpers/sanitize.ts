/**
 * Remove null or undefined values from the specified object. This function is shallow, not recursive! It will
 * return a copy of the provided object with all null or undefined values removed.
 *
 * @param obj
 * @returns
 */
export const sanitizeNull = (obj: { [s: string]: any }): any => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};
