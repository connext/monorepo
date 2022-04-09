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
import { getHelpers } from "../helpers";

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
    chainData,
    adapters: { chainreader, cache },
    config,
  } = getContext();
  const {
    auctions: { encodeExecuteFromBid },
  } = getHelpers();
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

  // TODO: Should this be moved to just *before* we send an excecute to the relayer?
  // Sanity check : estimateGas.
  const destinationChainId = chainData.get(bidData.params.destinationDomain)!.chainId;

  const encodedData = encodeExecuteFromBid([bid.router], bidData);
  const destinationConnextAddress = config.chains[bidData.params.destinationDomain].deployments.connext;

  logger.info("Prepared data for sending", requestContext, methodContext, {
    encodedData,
    destinationTransactonManagerAddress: destinationConnextAddress,
    domain: bidData.params.destinationDomain,
    bid,
  });

  // Validate the bid's fulfill call will succeed on chain.
  const gas = await chainreader.getGasEstimate(Number(bidData.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationConnextAddress,
    data: encodedData,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });

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

export const selectBids = async (_requestContext: RequestContext) => {
  const {
    logger,
    adapters: { cache },
  } = getContext();
  // TODO: Bit of an antipattern here.
  const {
    relayer: { sendToRelayer },
  } = getOperations();
  const { requestContext, methodContext } = createLoggingContext(selectBids.name, _requestContext);

  logger.info(`Method start: ${selectBids.name}`, requestContext, methodContext);

  // Fetch all the queued transfer IDs from the cache.
  const transferIds: string[] = await cache.auctions.getQueuedTransfers();

  logger.info("Queued transfers", requestContext, methodContext, {
    transferIds,
    count: transferIds.length,
  });

  // Filter transfers by whether they have exceeded the auction period and merit execution.
  const auctions: { [transferIds: string]: Auction } = {};
  await Promise.all(
    transferIds.map(async (transferId) => {
      const auction = await cache.auctions.getAuction(transferId);
      if (auction) {
        const startTime = Number(auction.timestamp);
        const elapsed = getNtpTimeSeconds() - startTime;
        if (elapsed > AUCTION_PERIOD) {
          auctions[transferId] = auction;
        }
      }
    }),
  );

  for (const transferId of Object.keys(auctions)) {
    const { bids, origin, destination } = auctions[transferId];

    // TODO: deprecate... necessary for now
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

    const selected: Bid[] = [];
    for (let round = 1; round <= 5; round++) {
      // TODO: For now, selecting at random, but we should take fee % into account.
      const availableBids = bids.filter((bid) => {
        return Array.from(Object.keys(bid.signatures)).includes(round.toString());
      });
      if (availableBids.length < round) {
        // Not enough router bids to form a transfer for this round.
        // (e.g. for round 3, we need 3 router bids to form a multipath transfer)
        continue;
      }

      // Now we select the bids for this round from the available bids.
      for (let i = 0; i < round; i++) {
        const random = Math.floor(Math.random() * availableBids.length);
        const selectedBid: Bid = availableBids.splice(random, 1)[0];
        selected.push(selectedBid);
      }
      break;
    }

    if (selected.length === 0) {
      // We weren't able to select bids for this transfer.
      continue;
    }

    let taskId: string;
    try {
      // Send the relayer request based on chosen bids.
      taskId = await sendToRelayer(
        selected.map((bid) => bid.router),
        {
          ...bidData,

          // TODO: This will be deprecated in favor of using generic router-sig proof on-chain...
          // Also dependent on #818 relayer fees.
          // For now, the on-chain check is done on the *first* router in the list for multipath.
          relayerSignature: Object.values(selected[0].signatures)[0],
        },
        requestContext,
      );
    } catch (err: any) {
      logger.error("Failed to send to relayer", requestContext, methodContext, jsonifyError(err as Error), {
        transferId,
        origin,
        destination,
        bids,
      });
      continue;
    }

    await cache.auctions.setStatus(transferId, AuctionStatus.Sent);
    await cache.auctions.upsertTask({ transferId, taskId });
  }
};
