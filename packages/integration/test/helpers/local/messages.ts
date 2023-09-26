/**
 * Sends the spoke root via AMB.
 *
 * Even though we don't have the AMB configured in local test, we need to create an transaction for an event
 */
export const sendSpokeRootToHub = async () => {};

/**
 * Receives the spoke root on AdminHubConnector
 */
export const receiveSpokeRootOnHub = async () => {};

/**
 * Sends the aggregated root to the spoke domains via AMBs.
 *
 * The onchain events are needed for the message processing on offchain
 */
export const propagateAggregatedRootToSpokes = async () => {};

/**
 * Receives the aggregated root from the hub domain on AdminSpokeConnector
 */
export const receiveAggregatedRootOnSpoke = async () => {};
