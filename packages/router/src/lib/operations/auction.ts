import {
  ajv,
  AuctionBid,
  AuctionPayloadSchema,
  AuctionPayload,
  getUuid,
  RequestContext,
  signAuctionBid,
} from "@connext/nxtp-utils";
import { getAddress } from "ethers/lib/utils";
import { BigNumber } from "ethers";

import { getContext } from "../../router";
import {
  NotEnoughGas,
  NotEnoughLiquidity,
  ProvidersNotAvailable,
  SwapInvalid,
  ZeroValueBid,
  AuctionExpired,
  ParamsInvalid,
} from "../errors";
import { getBidExpiry, AUCTION_EXPIRY_BUFFER, getReceiverAmount, getNtpTimeSeconds } from "../helpers";

export const newAuction = async (
  data: AuctionPayload,
  requestContext: RequestContext,
): Promise<{ bid: AuctionBid; bidSignature?: string }> => {
  const method = "newAuction";
  const methodId = getUuid();

  const { logger, config, contractReader, txService, wallet } = getContext();
  logger.info({ method, methodId, requestContext, data }, "Method start");

  // Validate params
  const validateInput = ajv.compile(AuctionPayloadSchema);
  const validInput = validateInput(data);
  if (!validInput) {
    const error = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    logger.error({ method, methodId, error: validateInput.errors, data }, "Invalid params");
    throw new ParamsInvalid({
      method,
      methodId,
      paramsError: error,
      requestContext,
    });
  }

  const {
    user,
    sendingChainId,
    sendingAssetId,
    amount,
    receivingAssetId,
    receivingChainId,
    expiry,
    encryptedCallData,
    callDataHash,
    callTo,
    transactionId,
    receivingAddress,
    dryRun,
  } = data;

  // TODO: Implement rate limit per user (approximately 1/5s ?).

  try {
    // Using try/catch in case amount is invalid number (e.g. negative, decimal, etc).
    const amountBigNumber = BigNumber.from(amount);
    // Validate that amount > 0. This would fail when later calling the contract,
    // thus exposing a potential gas griefing attack vector w/o this step.
    if (amountBigNumber.isZero()) {
      // Throwing empty error as the ZeroValueBid error below will override it.
      throw new Error("Amount was zero.");
    }
  } catch (e) {
    throw new ZeroValueBid({
      methodId,
      method,
      requestContext,
      amount,
      receivingAssetId,
      receivingChainId,
      error: e.message,
    });
  }

  // Validate expiry is valid (greater than current time plus a buffer).
  const currentTime = await getNtpTimeSeconds();
  if (expiry <= currentTime + AUCTION_EXPIRY_BUFFER) {
    throw new AuctionExpired(expiry, {
      methodId,
      method,
      requestContext,
      expiry,
      currentTime,
      auctionExpiryBuffer: AUCTION_EXPIRY_BUFFER,
    });
  }

  // validate that assets/chains are supported and there is enough liquidity
  // and gas on both sender and receiver side.
  // TODO: will need to track this offchain
  const [inputDecimals, outputDecimals] = await Promise.all([
    txService.getDecimalsForAsset(sendingChainId, sendingAssetId),
    txService.getDecimalsForAsset(receivingChainId, receivingAssetId),
  ]);
  logger.info({ method, methodId, inputDecimals, outputDecimals }, "Got decimals");

  // validate config
  const sendingConfig = config.chainConfig[sendingChainId];
  const receivingConfig = config.chainConfig[receivingChainId];
  if (
    !sendingConfig?.providers ||
    sendingConfig.providers.length === 0 ||
    !receivingConfig?.providers ||
    receivingConfig.providers.length === 0
  ) {
    throw new ProvidersNotAvailable([sendingChainId, receivingChainId], {
      methodId,
      method,
      requestContext,
      sendingChainId,
      receivingChainId,
    });
  }

  const allowedSwap = config.swapPools.find(
    (pool) =>
      pool.assets.find((a) => getAddress(a.assetId) === getAddress(sendingAssetId) && a.chainId === sendingChainId) &&
      pool.assets.find((a) => getAddress(a.assetId) === getAddress(receivingAssetId) && a.chainId === receivingChainId),
  );
  if (!allowedSwap) {
    throw new SwapInvalid(sendingChainId, sendingAssetId, receivingChainId, receivingAssetId, {
      methodId,
      method,
      requestContext,
    });
  }

  // getting the swap rate from the receiver side config
  const amountReceived = await getReceiverAmount(amount, inputDecimals, outputDecimals);

  const balance = await contractReader.getAssetBalance(receivingAssetId, receivingChainId);
  logger.info({ method, methodId, balance: balance.toString() }, "Got asset balance");
  if (balance.lt(amountReceived)) {
    throw new NotEnoughLiquidity(receivingChainId, {
      methodId,
      method,
      requestContext,
      balance: balance.toString(),
      amount,
      receivingAssetId,
      receivingChainId,
    });
  }

  const [senderBalance, receiverBalance] = await Promise.all([
    txService.getBalance(sendingChainId, wallet.address),
    txService.getBalance(receivingChainId, wallet.address),
  ]);
  logger.info({ method, methodId }, "Got balances");
  if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
    throw new NotEnoughGas(sendingChainId, senderBalance, receivingChainId, receiverBalance, {
      methodId,
      method,
      requestContext,
    });
  }
  logger.info({ method, methodId, requestContext }, "Auction validation complete, generating bid");
  // (TODO in what other scenarios would auction fail here? We should make sure
  // that router does not bid unless it is *sure* it's doing ok)
  // If you can support the transfer:
  // Next, prepare bid
  // - TODO: Get price from AMM
  // - TODO: Get fee rate
  // estimate gas for contract
  // amountReceived = amountReceived.sub(gasFee)

  // - Create bid object
  const bidExpiry = getBidExpiry(currentTime);
  const bid: AuctionBid = {
    user,
    router: wallet.address,
    sendingChainId,
    sendingAssetId,
    amount,
    receivingChainId,
    receivingAssetId,
    amountReceived,
    receivingAddress,
    transactionId,
    expiry,
    callDataHash,
    callTo,
    encryptedCallData,
    sendingChainTxManagerAddress: sendingConfig.transactionManagerAddress,
    receivingChainTxManagerAddress: receivingConfig.transactionManagerAddress,
    bidExpiry,
  };
  logger.info({ methodId, method, requestContext, bid }, "Generated bid");

  const bidSignature = await signAuctionBid(bid, wallet);
  logger.info({ methodId, method, requestContext, bidSignature }, "Method complete");
  return { bid, bidSignature: dryRun ? undefined : bidSignature };
};
