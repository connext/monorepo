import {
  generateMessagingInbox as _generateMessagingInbox,
  recoverAuctionBid as _recoverAuctionBid,
  signFulfillTransactionPayload as _signFulfillTransactionPayload,
  getFulfillTransactionHashToSign as _getFulfillTransactionHashToSign,
  getOnchainBalance as _getOnchainBalance,
  getNtpTimeSeconds,
  encodeAuctionBid as _encodeAuctionBid,
  ethereumRequest as _ethereumRequest,
  encrypt as _encrypt,
  getChainData as _getChainData,
  gelatoFulfill as _gelatoFulfill,
  isChainSupportedByGelato as _isChainSupportedByGelato,
  getDecimalsForAsset as _getDecimalsForAsset,
} from "@connext/nxtp-utils";
import { utils } from "ethers";

export const getTransactionId = (chainId: string, signerAddress: string, randomSalt: string): string => {
  return utils.keccak256(
    utils.hexlify(
      utils.concat([utils.toUtf8Bytes(chainId), utils.toUtf8Bytes(signerAddress), utils.toUtf8Bytes(randomSalt)]),
    ),
  );
};

/**
 * Get gas limit if it's hardcoded for some chains
 * @param chainId
 * @returns Gas Limit
 */
export const getGasLimit = (_chainId: number): number | undefined => {
  return undefined;
};

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

/**
 * Gets metaTxBuffer in percentage
 *
 * @returns Percentage value to be added
 */
export const getMetaTxBuffer = () => {
  return 10; // 10%
};

// FOR TEST MOCKING
export const signFulfillTransactionPayload = _signFulfillTransactionPayload;

export const getFulfillTransactionHashToSign = _getFulfillTransactionHashToSign;

export const generateMessagingInbox = _generateMessagingInbox;

export const recoverAuctionBid = _recoverAuctionBid;

export const getTimestampInSeconds = getNtpTimeSeconds;

export const getOnchainBalance = _getOnchainBalance;

export const encodeAuctionBid = _encodeAuctionBid;

export const ethereumRequest = _ethereumRequest;

export const encrypt = _encrypt;

export const gelatoFulfill = _gelatoFulfill;

export const isChainSupportedByGelato = _isChainSupportedByGelato;

export const getChainData = _getChainData;

export const getDecimalsForAsset = _getDecimalsForAsset;
