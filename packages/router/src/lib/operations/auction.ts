import {
  ajv,
  AuctionBid,
  AuctionPayloadSchema,
  AuctionPayload,
  RequestContext,
  signAuctionBid,
  createLoggingContext,
  AuctionResponse,
} from "@connext/nxtp-utils";
import { formatEther, getAddress, parseEther } from "ethers/lib/utils";
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
  NotEnoughAmount,
} from "../errors";
import { getBidExpiry, AUCTION_EXPIRY_BUFFER, getReceiverAmount, getNtpTimeSeconds } from "../helpers";
import { AuctionRateExceeded, SubgraphNotSynced } from "../errors/auction";
import { receivedAuction } from "../../bindings/metrics";
import { AUCTION_REQUEST_MAP } from "../helpers/auction";
import { getOracleContractAddress } from "../../adapters/contract/contract";
import { calculateGasFeeInReceivingTokenForPrepare } from "@connext/nxtp-txservice";

export const newAuction = async (
  data: AuctionPayload,
  _requestContext: RequestContext<string>,
): Promise<AuctionResponse> => {
  const { requestContext, methodContext } = createLoggingContext(newAuction.name, _requestContext);
  receivedAuction.inc({
    sendingAssetId: data.sendingAssetId,
    receivingAssetId: data.receivingAssetId,
    sendingChainId: data.receivingChainId,
    receivingChainId: data.receivingChainId,
  });

  const { logger, config, contractReader, txService, wallet, chainData } = getContext();
  logger.debug("Method started", requestContext, methodContext, { data });

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

  const currentTime = await getNtpTimeSeconds();
  const routerAddress = await wallet.getAddress();

  // Validate request limit
  const lastAttemptTime = AUCTION_REQUEST_MAP.get(
    `${user}-${sendingAssetId}-${sendingChainId}-${receivingAssetId}-${receivingChainId}`,
  ) as number;
  if (lastAttemptTime && lastAttemptTime + config.requestLimit > currentTime * 1000) {
    throw new AuctionRateExceeded(currentTime - lastAttemptTime, {
      methodContext,
      requestContext,
      lastAttemptTime,
      currentTime,
      minimalPeriod: config.requestLimit,
    });
  }

  // Validate expiry is valid (greater than current time plus a buffer).
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
  logger.debug("Got decimals", requestContext, methodContext, { inputDecimals, outputDecimals });

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
  const receivingSyncRecords = await contractReader.getSyncRecords(receivingChainId, requestContext);
  if (!receivingSyncRecords.some((record) => record.synced)) {
    throw new SubgraphNotSynced(receivingChainId, receivingSyncRecords, {
      methodContext,
      requestContext,
      transactionId,
    });
  }

  const sendingSyncRecords = await contractReader.getSyncRecords(sendingChainId, requestContext);
  if (!sendingSyncRecords.some((record) => record.synced)) {
    throw new SubgraphNotSynced(sendingChainId, sendingSyncRecords, {
      methodContext,
      requestContext,
      transactionId,
    });
  }

  // getting the swap rate from the receiver side config
  let { receivingAmount: amountReceived } = await getReceiverAmount(amount, inputDecimals, outputDecimals);

  // (TODO in what other scenarios would auction fail here? We should make sure
  // that router does not bid unless it is *sure* it's doing ok)
  // If you can support the transfer:
  // Next, prepare bid
  // Get fee rate
  // estimate gas for contract
  // - TODO: Get price from AMM
  const amountReceivedInBigNum = BigNumber.from(amountReceived);

  const sendingOracleContractAddress = getOracleContractAddress(sendingChainId, requestContext);
  const receivingOracleContractAddress = getOracleContractAddress(receivingChainId, requestContext);
  const gasFeeInReceivingToken = await calculateGasFeeInReceivingTokenForPrepare(
    sendingAssetId,
    sendingChainId,
    receivingAssetId,
    receivingChainId,
    outputDecimals,
    txService,
    sendingOracleContractAddress,
    receivingOracleContractAddress,
    requestContext,
    logger,
  );
  logger.debug("Got gas fee in receiving token", requestContext, methodContext, {
    gasFeeInReceivingToken: gasFeeInReceivingToken.toString(),
  });

  if (amountReceivedInBigNum.lt(gasFeeInReceivingToken)) {
    throw new NotEnoughAmount({
      methodContext,
      requestContext,
      amount,
      amountReceived: amountReceived,
      gasFeeInReceivingToken: gasFeeInReceivingToken.toString(),
    });
  }

  amountReceived = amountReceivedInBigNum.sub(gasFeeInReceivingToken).toString();

  const balance = await contractReader.getAssetBalance(receivingAssetId, receivingChainId);
  logger.debug("Got asset balance", requestContext, methodContext, { balance: balance.toString() });
  if (balance.lt(amountReceived)) {
    throw new NotEnoughLiquidity(receivingChainId, receivingAssetId, balance.toString(), amountReceived, {
      methodContext,
      requestContext,
    });
  }

  const [senderBalance, receiverBalance] = await Promise.all([
    txService.getBalance(sendingChainId, routerAddress),
    txService.getBalance(receivingChainId, routerAddress),
  ]);
  logger.debug("Got balances", requestContext, methodContext, {
    senderBalance: senderBalance.toString(),
    receiverBalance: receiverBalance.toString(),
  });

  // Log if gas is low, but above min
  const LOW_GAS = parseEther("0.1");
  if (senderBalance.lt(LOW_GAS) || receiverBalance.lt(LOW_GAS)) {
    logger.warn("Router has low gas", requestContext, methodContext, {
      sendingChainId,
      receivingChainId,
      senderBalance: formatEther(senderBalance),
      receiverBalance: formatEther(receiverBalance),
    });
  }

  if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
    throw new NotEnoughGas(sendingChainId, senderBalance, receivingChainId, receiverBalance, {
      methodContext,
      requestContext,
    });
  }
  logger.info("Auction validation complete, generating bid", requestContext, methodContext);

  // - Create bid object
  const bidExpiry = getBidExpiry(currentTime);
  const bid: AuctionBid = {
    user,
    router: routerAddress,
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

  AUCTION_REQUEST_MAP.set(
    `${user}-${sendingAssetId}-${sendingChainId}-${receivingAssetId}-${receivingChainId}`,
    currentTime * 1000,
  );
  return {
    bid,
    bidSignature: dryRun ? undefined : bidSignature,
    gasFeeInReceivingToken: gasFeeInReceivingToken.toString(),
  };
};
