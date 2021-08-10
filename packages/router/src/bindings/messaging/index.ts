import { createRequestContext, jsonifyError, MetaTxFulfillPayload, MetaTxType } from "@connext/nxtp-utils";
import { getAddress } from "ethers/lib/utils";

import { fulfill, newAuction } from "../../lib/operations";
import { getContext } from "../../router";

export const bindMessaging = async () => {
  const { messaging, logger, config } = getContext();

  // Setup Messaging Service events

  // <from>.auction.<fromChain>.<fromAsset>.<toChain>.<toAsset>
  await messaging.subscribeToAuctionRequest(async (inbox, data, err) => {
    const requestContext = createRequestContext("subscribeToAuctionRequest");
    if (err || !data) {
      logger.error({ requestContext, err, data }, "Error in auction request");
      return;
    }
    // On every new auction broadcast, route to the new auction handler
    try {
      logger.info({ requestContext }, "Received auction request");
      const { bid, bidSignature } = await newAuction(data, requestContext);
      await messaging.publishAuctionResponse(inbox, { bid, bidSignature }),
        logger.info({ requestContext }, "Handled auction request");
    } catch (err) {
      logger.error({ requestContext, err: jsonifyError(err) }, "Error in auction request");
    }
  });

  // <from>.metatx
  await messaging.subscribeToMetaTxRequest(async (inbox, data, err) => {
    const requestContext = createRequestContext("subscribeToMetaTxRequest");
    if (err || !data) {
      logger.error({ err, data, requestContext }, "Error in metatx request");
      return;
    }

    // On every metatx request (i.e. user wants router to fulfill for them)
    // route to metatx handler
    logger.info({ data, requestContext }, "Got metatx");
    const { chainId } = data;

    const chainConfig = config.chainConfig[chainId];
    if (!chainConfig) {
      logger.error({ requestContext, chainId }, "No config for chainId");
      return;
    }

    if (data.type === MetaTxType.Fulfill) {
      if (getAddress(data.to) !== getAddress(chainConfig.transactionManagerAddress)) {
        logger.error(
          { requestContext, to: data.to, transactionManagerAddress: chainConfig.transactionManagerAddress },
          "Provided transactionManagerAddress does not map to our configured transactionManagerAddress",
        );
        return;
      }

      const { txData, callData, relayerFee, signature }: MetaTxFulfillPayload = data.data;
      if (chainId !== txData.receivingChainId) {
        logger.error(
          { requestContext, chainId, receivingChainId: txData.receivingChainId },
          "Request not sent for receiving chain",
        );
        return;
      }

      logger.info({ requestContext }, "Handling fulfill request");
      try {
        logger.info({ requestContext }, "Fulfilling tx");
        const tx = await fulfill(
          {
            user: txData.user,
            router: txData.router,
            sendingChainId: txData.sendingChainId,
            sendingAssetId: txData.sendingAssetId,
            sendingChainFallback: txData.sendingChainFallback,
            receivingChainId: txData.receivingChainId,
            receivingAssetId: txData.receivingAssetId,
            receivingAddress: txData.receivingAddress,
            callDataHash: txData.callDataHash,
            callTo: txData.callTo,
            transactionId: txData.transactionId,
          },
          {
            amount: txData.amount,
            expiry: txData.expiry,
            preparedBlockNumber: txData.preparedBlockNumber,
            signature,
            relayerFee,
            callData,
            side: "receiver",
          },
          requestContext,
        );
        if (tx) {
          await messaging.publishMetaTxResponse(inbox, { chainId, transactionHash: tx.transactionHash });
        }
        logger.info({ requestContext }, "Handled fulfill request");
      } catch (err) {}
    }
  });
};
