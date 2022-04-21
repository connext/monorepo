import {
  Bid,
  BidSchema,
  RequestContext,
  createLoggingContext,
  ajv,
  BidData,
  AuctionStatus,
  getNtpTimeSeconds,
  Auction,
  jsonifyError,
} from "@connext/nxtp-utils";

import { AuctionExpired, ParamsInvalid } from "../errors";
import { getContext } from "../../sequencer";

import { getOperations } from ".";

// TODO: Move elsewhere
// How long we let an auction sit queued in the DB before we handle execution.
export const AUCTION_PERIOD = 30 * 1_000;

export const storeBid = async (
  transferId: string,
  bid: Bid,
  bidData: BidData,
  _requestContext: RequestContext,
): Promise<void> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(storeBid.name, _requestContext);
  logger.info(`Method start: ${storeBid.name}`, requestContext, methodContext, { bid });

  // Validate Input schema
  const validateInput = ajv.compile(BidSchema);
  const validInput = validateInput(bid);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      bid,
    });
  }

  // Ensure that the auction for this transfer hasn't expired.
  const status = await cache.auctions.getStatus(transferId);
  if (status !== AuctionStatus.None && status !== AuctionStatus.Queued) {
    throw new AuctionExpired(status, {
      transferId,
      bid,
    });
  }

  // TODO: Verify the following (and cache it for records):
  // - Router is approved.
  // - Asset is approved.
  // - Relayer is approved for this chain (?).
  // - Router has sufficient funds (?). May want to actually check this later.

  const res = await cache.auctions.upsertAuction({
    transferId,
    origin: bidData.params.originDomain,
    destination: bidData.params.destinationDomain,
    bid,
  });
  logger.info("Updated auction", requestContext, methodContext, {
    new: res === 0,
    auction: await cache.auctions.getAuction(transferId),
    status: await cache.auctions.getStatus(transferId),
  });

  if (status === AuctionStatus.None) {
    await cache.auctions.setBidData(transferId, bidData);
  }

  return;
};

export const executeAuctions = async (_requestContext: RequestContext) => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  // TODO: Bit of an antipattern here.
  const {
    relayer: { sendToRelayer },
  } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(executeAuctions.name, _requestContext);

  logger.info(`Method start: ${executeAuctions.name}`, requestContext, methodContext);

  // Fetch all the queued transfer IDs from the cache.
  const transferIds: string[] = await cache.auctions.getQueuedTransfers();

  logger.info("Queued transfers", requestContext, methodContext, {
    transferIds,
    count: transferIds.length,
  });

  // Filter transfers by whether they have exceeded the auction period and merit execution.
  const auctions: { [domain: string]: { [transferIds: string]: Auction } } = {};
  await Promise.all(
    transferIds.map(async (transferId) => {
      const auction = await cache.auctions.getAuction(transferId);
      if (auction) {
        const startTime = Number(auction.timestamp);
        const elapsed = (getNtpTimeSeconds() - startTime) * 1000;
        if (elapsed > AUCTION_PERIOD) {
          const domain = auction.destination;
          auctions[domain] = {
            ...(auctions[domain] || {}),
            [transferId]: auction,
          };
        }
      }
    }),
  );

  // Handling each domain in parallel, but each individual transfer synchronously. This is to account
  // for the fact that one transfer's auction might affect another. For instance, a router might have
  // 100 tokens to LP, but bid on 2 100-token transfers. We shouldn't send both of those bids.
  await Promise.all(
    Object.keys(auctions).map(async (domain) => {
      for (const transferId of Object.keys(auctions[domain])) {
        const { bids, origin, destination } = auctions[domain][transferId];
        logger.info("Started selecting bids", requestContext, methodContext, {
          bids,
          origin,
          destination,
          transferId,
        });

        // TODO: deprecate eventually... necessary for now
        const bidData = await cache.auctions.getBidData(transferId);
        if (!bidData) {
          logger.error("Bid data not found for transfer!", requestContext, methodContext, undefined, {
            transferId,
            origin,
            destination,
            bids,
          });
          continue;
        }

        // TODO: Reimplement auction rounds!
        // hardcoded round 1
        const availableBids = Object.values(bids).filter((bid) => {
          // TODO: Check to make sure the router has enough funds to execute this bid!
          return Array.from(Object.keys(bid.signatures)).includes("1");
        });
        if (availableBids.length < 1) {
          logger.warn("No bids available for this round", requestContext, methodContext, {
            availableBids,
            transferId,
          });
          // Not enough router bids to form a transfer for this round.
          // (e.g. for round 3, we need 3 router bids to form a multipath transfer)
          continue;
        }

        // TODO: Sort by fee amount, selecting the best bid available.
        // Randomly sort the bids.
        const randomized = availableBids
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        let taskId: string | undefined;
        // Try every bid until we find one that works.
        for (const randomBid of randomized) {
          try {
            logger.info("Sending bid to relayer", requestContext, methodContext, {
              transferId,
              randomBid,
            });
            // Send the relayer request based on chosen bids.
            taskId = await sendToRelayer(
              [randomBid.router],
              {
                ...bidData,

                // TODO: This will be deprecated in favor of using generic router-sig proof on-chain...
                // Also dependent on #818 relayer fees.
                // For now, the on-chain check is done on the *first* router in the list for multipath.
                relayerSignature: Object.values(randomBid.signatures)[0],
              },
              requestContext,
            );
            logger.info("Sent bid to relayer", requestContext, methodContext, {
              transferId,
              taskId,
              origin,
              destination,
            });
            break;
          } catch (error: any) {
            logger.error(
              "Failed to send to relayer, trying next bid if possible",
              requestContext,
              methodContext,
              jsonifyError(error as Error),
              {
                transferId,
                availableBidsCount: availableBids.length,
              },
            );
          }
        }
        if (!taskId) {
          logger.error(
            "No bids sent to relayer",
            requestContext,
            methodContext,
            jsonifyError(new Error("No successfully sent bids")),
            {
              transferId,
              origin,
              destination,
              bids,
            },
          );
          continue;
        }
        await cache.auctions.setStatus(transferId, AuctionStatus.Sent);
        await cache.auctions.upsertTask({ transferId, taskId });
      }
    }),
  );
};
