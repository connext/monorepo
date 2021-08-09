/**
 * Gets the expiry on a given auction bid
 *
 * @returns Expiry time of a given bid in s
 */
export const getBidExpiry = () => Math.floor(Date.now() / 1000) + 60 * 5;
