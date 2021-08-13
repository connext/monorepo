/**
 * Gets the expiry on a given auction bid
 *
 * @remarks Fine for bid expiry to use local clock, since only router will be validating the bid timestamp
 *
 * @returns Expiry time of a given bid in s
 */
export const getBidExpiry = () => Math.floor(Date.now() / 1000) + 60 * 5;
