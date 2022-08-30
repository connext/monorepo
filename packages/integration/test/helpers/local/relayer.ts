/**
 * SourceConnector.sol
 * Gets the latest outboundRoot and packages into a message
 */
export const send = async () => {};

/**
 * RootManager.sol
 * This is called by relayers to generate + send the mixed root from mainnet via AMB to spoke domains
 */
export const propagate = async () => {};

/**
 * DestConnector.sol
 * This is called on the destination domain to handle incoming messages.
 */
export const proveAndProcess = async () => {};
