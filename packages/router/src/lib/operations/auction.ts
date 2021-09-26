import {
  ajv,
  AuctionBid,
  AuctionPayloadSchema,
  AuctionPayload,
  RequestContext,
  signAuctionBid,
  createLoggingContext,
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
import { SubgraphNotSynced } from "../errors/auction";
import { receivedAuction } from "../../bindings/metrics";

export const newAuction = async (
  data: AuctionPayload,
  _requestContext: RequestContext<string>,
): Promise<{ bid: AuctionBid; bidSignature?: string }> => {
  const { requestContext, methodContext } = createLoggingContext(newAuction.name, _requestContext);
  receivedAuction.inc({
    sendingAssetId: data.sendingAssetId,
    receivingAssetId: data.receivingAssetId,
    sendingChainId: data.receivingChainId,
    receivingChainId: data.receivingChainId,
  });

  const { logger, config, contractReader, txService, wallet, chainData } = getContext();
  logger.info("Method context", requestContext, methodContext, { data });

  // Validate params
  const validateInput = ajv.compile(AuctionPayloadSchema);
  const validInput = validateInput(data);
  if (!validInput) {
    const error = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      methodContext,
      paramsError: error,
      data,
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
    initiator,
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
      methodContext,
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
      methodContext,
      requestContext,
      expiry,
      currentTime,
      auctionExpiryBuffer: AUCTION_EXPIRY_BUFFER,
    });
  }

  // validate that assets/chains are supported and there is enough liquidity
  // and gas on both sender and receiver side.
  // TODO: will need to track this offchain
  let inputDecimals = chainData.get(sendingChainId.toString())?.assetId[sendingAssetId]?.decimals;
  if (!inputDecimals) {
    inputDecimals = await txService.getDecimalsForAsset(sendingChainId, sendingAssetId);
  }

  let outputDecimals = chainData.get(receivingChainId.toString())?.assetId[receivingAssetId]?.decimals;
  if (!outputDecimals) {
    outputDecimals = await txService.getDecimalsForAsset(receivingChainId, receivingAssetId);
  }
  logger.info("Got decimals", requestContext, methodContext, { inputDecimals, outputDecimals });

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
      methodContext,
      requestContext,
      sendingChainId,
      receivingChainId,
    });
  }

  // Make sure subgraphs are synced
  const receivingSyncRecord = await contractReader.getSyncRecord(receivingChainId, requestContext);
  if (!receivingSyncRecord.synced) {
    throw new SubgraphNotSynced(receivingChainId, receivingSyncRecord, {
      methodContext,
      requestContext,
      transactionId,
    });
  }

  const sendingSyncRecord = await contractReader.getSyncRecord(sendingChainId, requestContext);
  if (!sendingSyncRecord.synced) {
    throw new SubgraphNotSynced(sendingChainId, sendingSyncRecord, {
      methodContext,
      requestContext,
      transactionId,
    });
  }

  const allowedSwap = config.swapPools.find(
    (pool) =>
      pool.assets.find((a) => getAddress(a.assetId) === getAddress(sendingAssetId) && a.chainId === sendingChainId) &&
      pool.assets.find((a) => getAddress(a.assetId) === getAddress(receivingAssetId) && a.chainId === receivingChainId),
  );
  if (!allowedSwap) {
    throw new SwapInvalid(sendingChainId, sendingAssetId, receivingChainId, receivingAssetId, {
      methodContext,
      requestContext,
    });
  }

  // getting the swap rate from the receiver side config
  const amountReceived = await getReceiverAmount(amount, inputDecimals, outputDecimals);

  const balance = await contractReader.getAssetBalance(receivingAssetId, receivingChainId);
  logger.info("Got asset balance", requestContext, methodContext, { balance: balance.toString() });
  if (balance.lt(amountReceived)) {
    throw new NotEnoughLiquidity(receivingChainId, {
      methodContext,
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
  logger.info("Got balances", requestContext, methodContext, {
    senderBalance: senderBalance.toString(),
    receiverBalance: receiverBalance.toString(),
  });
  if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
    throw new NotEnoughGas(sendingChainId, senderBalance, receivingChainId, receiverBalance, {
      methodContext,
      requestContext,
    });
  }
  logger.info("Auction validation complete, generating bid", requestContext, methodContext);
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
    initiator,
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
  logger.info("Generated bid", requestContext, methodContext, { bid });

  const bidSignature = await signAuctionBid(bid, wallet);
  logger.info("Method complete", requestContext, methodContext, { bidSignature });
  return { bid, bidSignature: dryRun ? undefined : bidSignature };
};
