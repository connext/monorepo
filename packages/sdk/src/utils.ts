import { constants, providers, Contract, BigNumber } from "ethers";
import {
  generateMessagingInbox as _generateMessagingInbox,
  recoverAuctionBid as _recoverAuctionBid,
  signFulfillTransactionPayload as _signFulfillTransactionPayload,
  getFulfillTransactionHashToSign as _getFulfillTransactionHashToSign,
  ERC20Abi,
  getOnchainBalance as _getOnchainBalance,
  getNtpTimeSeconds,
  encodeAuctionBid as _encodeAuctionBid,
  ethereumRequest as _ethereumRequest,
  encrypt as _encrypt,
  PriceOracleAbi,
} from "@connext/nxtp-utils";

/**
 * Utility to convert the number of hours into seconds
 *
 * @param hours - Number of hours to convert
 * @returns Equivalent seconds
 */
export const hoursToSeconds = (hours: number) => hours * 60 * 60;

/**
 * Utility to convert the number of days into seconds
 *
 * @param days - Number of days to convert
 * @returns Equivalent seconds
 */
export const daysToSeconds = (days: number) => hoursToSeconds(days * 24);

/**
 * Gets the expiry to use for new transfers
 *
 * @param latestBlockTimestamp - Timestamp of the latest block on the sending chain (from `getTimestampInSeconds`)
 * @returns Default expiry of 3 days + 3 hours (in seconds)
 */
export const getExpiry = (latestBlockTimestamp: number) => latestBlockTimestamp + daysToSeconds(3) + hoursToSeconds(3);

/**
 * Gets the minimum expiry buffer
 *
 * @returns Equivalent of 2days + 1 hour in seconds
 */
export const getMinExpiryBuffer = () => daysToSeconds(2) + hoursToSeconds(1); // 2 days + 1 hour

/**
 * Gets the maximum expiry buffer
 *
 * @remarks This is *not* the same as the contract maximum of 30days
 *
 * @returns Equivalent of 4 days
 */
export const getMaxExpiryBuffer = () => daysToSeconds(4); // 4 days

export const getDecimals = async (assetId: string, provider: providers.FallbackProvider) => {
  if (assetId === constants.AddressZero) {
    return 18;
  }
  const decimals = await new Contract(assetId, ERC20Abi, provider).decimals();
  return decimals;
};

/**
 * Gets token price in usd.
 *
 * @param oracleAddress The price oracle address
 * @param tokenAddress The token address to get the price
 *
 * @returns price in usd by decimals 18.
 */
export const getTokenPrice = async (
  oracleAddress: string,
  tokenAddress: string,
  provider: providers.FallbackProvider,
): Promise<BigNumber> => {
  const priceOracleContract = new Contract(oracleAddress, PriceOracleAbi, provider);
  const tokenPriceInBigNum = await priceOracleContract.getTokenPrice(tokenAddress);
  return tokenPriceInBigNum;
};

// FOR TEST MOCKING
/**
 * This is only here to make it easier for sinon mocks to happen in the tests. Otherwise, this is a very dumb thing.
 *
 */
export const signFulfillTransactionPayload = _signFulfillTransactionPayload;

export const getFulfillTransactionHashToSign = _getFulfillTransactionHashToSign;

/**
 * This is only here to make it easier for sinon mocks to happen in the tests. Otherwise, this is a very dumb thing.
 *
 */
export const generateMessagingInbox = _generateMessagingInbox;

/**
 * This is only here to make it easier for sinon mocks to happen in the tests. Otherwise, this is a very dumb thing.
 *
 */
export const recoverAuctionBid = _recoverAuctionBid;

/**
 * Gets the current timestamp. Uses the latest block.timestamp instead of a
 * local clock to avoid issues with time when router is validating
 *
 * @remarks User should use the timestamp on the chain they are preparing on (sending chain)
 *
 * @returns Timestamp on latest block in seconds
 */
export const getTimestampInSeconds = getNtpTimeSeconds;

export const getOnchainBalance = _getOnchainBalance;

export const encodeAuctionBid = _encodeAuctionBid;

export const ethereumRequest = _ethereumRequest;

export const encrypt = _encrypt;
