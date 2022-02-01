import { signRouterFulfillTransactionPayload as _signRouterFulfillTransactionPayload } from "@connext/nxtp-utils";

export const signRouterFulfillTransactionPayload = _signRouterFulfillTransactionPayload;

// Safe buffer (distance from tx expiry) within which we are willing to delegate a
// transaction to the Watchtower. Value is in seconds.
// NOTE: This does not include the time it takes for the Watchtower to send the transaction
// batch. Use the Watchtower batch status API to get the batch TTL separately.
export const WATCHTOWER_CALL_BUFFER = 2 * 60 * 60; // 2 hours.
