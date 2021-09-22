export const AUCTION_EXPIRY_BUFFER = 5 * 60;

/**
 * Gets the expiry on a given auction bid
 *
 * @remarks Fine for bid expiry to use local clock, since only router will be validating the bid timestamp
 *
 * @returns Expiry time of a given bid in s
 */
export const getBidExpiry = (currentTime: number) => currentTime + 60 * 5;

export const AUCTION_REQUEST_MAP = new Map();
