import { AuctionBid, AuctionPayload, getUuid, RequestContext, signAuctionBid } from "@connext/nxtp-utils";
import { getAddress } from "ethers/lib/utils";

import { getContext } from "../../router";
import { NotEnoughGas, NotEnoughLiquidity, ProvidersNotAvailable, SwapInvalid } from "../errors";
import { getBidExpiry, getReceiverAmount } from "../helpers";

export const newAuction = async (
  data: AuctionPayload,
  requestContext: RequestContext,
): Promise<{ bid: AuctionBid; bidSignature?: string }> => {
  const method = "newAuction";
  const methodId = getUuid();

  const { logger, config, contractReader, txService, wallet } = getContext();
  logger.info({ method, methodId, requestContext, data }, "Method start");

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

  // validate that assets/chains are supported and there is enough liquidity
  // and gas on both sender and receiver side.
  // TODO: will need to track this offchain
  const amountReceived = getReceiverAmount(amount);
  console.log("amountReceived: ", amountReceived);

  const balance = await contractReader.getAssetBalance(receivingAssetId, receivingChainId);
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

  // validate config
  const sendingConfig = config.chainConfig[sendingChainId];
  const receivingConfig = config.chainConfig[receivingChainId];
  if (
    !sendingConfig.providers ||
    sendingConfig.providers.length === 0 ||
    !receivingConfig.providers ||
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

  const [senderBalance, receiverBalance] = await Promise.all([
    txService.getBalance(sendingChainId, wallet.address),
    txService.getBalance(receivingChainId, wallet.address),
  ]);
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
    bidExpiry: getBidExpiry(),
  };
  logger.info({ methodId, method, requestContext, bid }, "Generated bid");

  const bidSignature = await signAuctionBid(bid, wallet);
  logger.info({ methodId, method, requestContext, bidSignature }, "Method complete");
  return { bid, bidSignature: dryRun ? undefined : bidSignature };
};
