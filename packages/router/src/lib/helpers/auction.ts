export const AUCTION_EXPIRY_BUFFER = 5 * 60;

/**
 * Gets the expiry on a given auction bid
 *
 * @remarks Fine for bid expiry to use local clock, since only router will be validating the bid timestamp
 *
 * @returns Expiry time of a given bid in s
 */
export const getBidExpiry = (currentTime: number) => currentTime + AUCTION_EXPIRY_BUFFER;

export const AUCTION_REQUEST_MAP = new Map();

// Percentage number reflects the quotient of our total liquidity we are willing to overbid by
// on receiving chain. In other words, if we're willing to bid more funds on receiving chain than
// we actually have, this number will be >100. A value of 150, for example, means we are willing to
// "promise" up to 150% of our liquidity on receiving chain to
// This is similar in concept to airlines overbooking their seats, ISPs oversubscribing, or short
// positions on GME; except in our case, we must also take into account that our bids compete
// with many other routers on the network. Theoretically, most of our bids should expire without
// being selected (unless this router somehow has >=50% share of the network).
export const MAX_OUTSTANDING_LIQUIDITY_PERC = 150;
