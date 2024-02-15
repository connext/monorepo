import { BigNumber, constants } from "ethers";
import {
  Bid,
  RequestContext,
  createLoggingContext,
  ExecStatus,
  getNtpTimeSeconds,
  jsonifyError,
  OriginTransfer,
  XTransferErrorStatus,
} from "@connext/nxtp-utils";

import { AuctionExpired, MissingXCall, NoBidsSent, SlippageToleranceExceeded } from "../../errors";
import { getContext, SlippageErrorPatterns } from "../../../sequencer";
import { getHelpers } from "../../helpers";
import { Message, MessageType } from "../../entities";
import { getOperations } from "..";

export const storeFastPathData = async (bid: Bid, _requestContext: RequestContext): Promise<void> => {
  const {
    logger,
    config,
    adapters: { cache, subgraph, mqClient },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(storeFastPathData.name, _requestContext);
  logger.debug(`Method start: ${storeFastPathData.name}`, requestContext, methodContext, { bid });

  const { transferId, origin } = bid;

  // Ensure that the auction for this transfer hasn't expired.
  let status = await cache.auctions.getExecStatus(transferId);
  if (
    status !== ExecStatus.None &&
    status !== ExecStatus.Enqueued &&
    status !== ExecStatus.Dequeued &&
    status !== ExecStatus.Sent
  ) {
    throw new AuctionExpired(status, {
      transferId,
      bid,
    });
  }

  // TODO: Check that a relayer is configured/approved for this chain (?).

  // Get the XCall from the subgraph for this transfer.
  const transfer = await subgraph.getOriginTransferById(origin, transferId);
  if (!transfer || !transfer.origin) {
    // Router shouldn't be bidding on a transfer that doesn't exist.
    throw new MissingXCall(origin, transferId, {
      bid,
    });
  }

  if (transfer.destination?.execute || transfer.destination?.reconcile) {
    // This transfer has already been Executed or Reconciled, so fast liquidity is no longer valid.
    throw new AuctionExpired(status, {
      transferId,
      bid,
    });
  }

  // Update and/or create the auction instance in the cache if necessary.
  const res = await cache.auctions.upsertAuction({
    transferId,
    origin: transfer.xparams!.originDomain,
    destination: transfer.xparams!.destinationDomain!,
    bid,
  });
  logger.info("Updated auction", requestContext, methodContext, {
    new: res === 0,
    auction: await cache.auctions.getAuction(transferId),
    status: await cache.auctions.getExecStatus(transferId),
  });

  // Enqueue only once to dedup, when the first bid for the transfer is stored.
  const execStatus = await cache.auctions.getExecStatusWithTime(transferId);
  if (execStatus && execStatus.status !== ExecStatus.None) {
    const startTime = Number(execStatus.timestamp);
    const elapsed = (getNtpTimeSeconds() - startTime) * 1000;
    if (elapsed > config.executionWaitTime) {
      logger.info("Auction merits retry", requestContext, methodContext, { transferId: transferId });
      // Publish this transferId to sequencer subscriber to retry execution
      status = ExecStatus.None;
      await cache.auctions.setExecStatus(transferId, status);
    } else {
      logger.info("Transfer awaiting execution", requestContext, methodContext, {
        elapsed,
        waitTime: config.executionWaitTime,
      });
      status = execStatus.status as ExecStatus;
    }
  }
  if (status === ExecStatus.None) {
    const message: Message = {
      transferId: transfer.transferId,
      originDomain: transfer.xparams!.originDomain,
      type: MessageType.ExecuteFast,
    };

    const channel = await mqClient.createChannel();
    await channel.assertExchange(config.messageQueue.exchanges[0].name, config.messageQueue.exchanges[0].type, {
      durable: config.messageQueue.exchanges[0].durable,
    });
    // Set status before publish
    // Avoid a race condition where the message is consumed before the status is set
    // If publish fails we we will have bad state, but publish is HA so we should be fine
    await cache.auctions.setExecStatus(transferId, ExecStatus.Enqueued);

    // Store the transfer locally. We will use this as a reference later when we execute this transfer
    // in the auction cycle, for both encoding data and passing relayer fee to the relayer.
    await cache.transfers.storeTransfers([transfer]);

    channel.publish(
      config.messageQueue.exchanges[0].name,
      transfer.xparams!.originDomain,
      Buffer.from(JSON.stringify(message)),
      { persistent: config.messageQueue.exchanges[0].persistent },
    );
    await channel.close();
    logger.info("Enqueued transfer", requestContext, methodContext, {
      message: message,
    });
  } else {
    logger.debug("No need to enqueue transfer", requestContext, methodContext, {
      transferId: transferId,
      status: status,
    });
  }

  return;
};

export const executeFastPathData = async (
  transferId: string,
  _requestContext: RequestContext,
): Promise<{ taskId: string | undefined }> => {
  const {
    config,
    logger,
    adapters: { cache, subgraph, database },
  } = getContext();
  // TODO: Bit of an antipattern here.
  const {
    relayer: { sendExecuteFastToRelayer },
  } = getOperations();
  let taskId: string | undefined;
  const {
    auctions: { getDestinationLocalAsset, getBidsRoundMap, getAllSubsets, getMinimumBidsCountForRound },
    relayerfee: { canSubmitToRelayer },
  } = getHelpers();
  const { requestContext, methodContext } = createLoggingContext(executeFastPathData.name, _requestContext);
  logger.debug(`Method start: ${executeFastPathData.name}`, requestContext, methodContext);

  if (!transferId) {
    logger.debug("No auction to execute", requestContext, methodContext);
    return { taskId };
  }

  // Validate if transfer has exceeded the auction period and merits execution.
  let auction = await cache.auctions.getAuction(transferId);
  if (auction) {
    const startTime = Number(auction.timestamp);
    const elapsed = (getNtpTimeSeconds() - startTime) * 1000;
    if (elapsed > config.auctionWaitTime) {
      logger.info("Auction merits execution", requestContext, methodContext, { transferId: transferId });
    } else {
      logger.info("Waiting for auction timeout", requestContext, methodContext, {
        elapsed,
        waitTime: config.auctionWaitTime,
      });
      const remainingTime = config.auctionWaitTime - elapsed;
      if (remainingTime > 0) {
        await new Promise((f) => setTimeout(f, remainingTime));
        auction = await cache.auctions.getAuction(transferId);
      }
    }
  } else {
    logger.error("Auction data not found for transfer!", requestContext, methodContext, undefined, {
      transferId: transferId,
    });
    return { taskId };
  }

  // Handling each domain in parallel, but each individual transfer synchronously. This is to account
  // for the fact that one transfer's auction might affect another. For instance, a router might have
  // 100 tokens to LP, but bid on 2 100-token transfers. We shouldn't send both of those bids.

  const { bids, origin, destination } = auction!;
  logger.info("Started selecting bids", requestContext, methodContext, {
    bids,
    origin,
    destination,
    transferId,
  });

  // NOTE: Should be an OriginTransfer, but we will sanity check below.
  let transfer = (await cache.transfers.getTransfer(transferId)) as OriginTransfer | undefined;
  if (!transfer) {
    // This can happen in a race between concurrent previous and current attempts that are inflight
    logger.error("Transfer data not found for transfer!", requestContext, methodContext, undefined, {
      transferId,
      origin,
      destination,
      bids,
    });

    // Try to resolve it by rehydrating from the subgraph
    // Get the XCall from the subgraph for this transfer.
    transfer = await subgraph.getOriginTransferById(origin, transferId);
    if (!transfer || !transfer.origin) {
      // Router shouldn't be bidding on a transfer that doesn't exist.
      throw new MissingXCall(origin, transferId, {
        bids,
      });
    }
    await cache.transfers.storeTransfers([transfer]);
  } else if (!transfer.origin) {
    // TODO: Same as above!
    // Again, shouldn't happen: sequencer should not have accepted an auction for a transfer with no xcall.
    logger.error("XCall or Relayer Fee not found for transfer!", requestContext, methodContext, undefined, {
      transferId,
      transfer,
      bids,
    });
    return { taskId };
  }

  const destTx = await subgraph.getDestinationTransferById(transfer.xparams!.destinationDomain!, transferId);
  if (destTx) {
    logger.error("Transfer already executed", requestContext, methodContext, undefined, {
      transferId,
      transfer,
      bids,
    });
    await cache.auctions.setExecStatus(transferId, ExecStatus.Completed);
    return { taskId };
  }

  let { canSubmit, needed } = await canSubmitToRelayer(transfer);
  if (transfer.xparams.destinationDomain === "2016506996") {
    canSubmit = true;
    needed = constants.Zero.toString();
  }
  if (!canSubmit) {
    logger.error("Relayer fee isn't enough to submit a tx", requestContext, methodContext, undefined, {
      transferId,
      relayerFees: transfer.origin.relayerFees,
      needed,
    });

    try {
      await database.updateErrorStatus(transferId, XTransferErrorStatus.LowRelayerFee);
    } catch (e: unknown) {
      logger.error("Database error:updateErrorStatus", requestContext, methodContext, undefined, {
        transferId,
        error: e,
      });
    }
    return { taskId };
  }

  // TODO: Enforce relayer fee
  // At the time of sequencer relayer submission, check the amount that the user sent as relayer fee against the SDK-determined relayer fee.
  // If it is not enough (within a certain tolerance), sequencer should error and refuse to submit the tx, and drop the message.

  const bidsRoundMap = getBidsRoundMap(bids, config.auctionRoundDepth);
  const availableRoundIds = [...Object.keys(bidsRoundMap)].sort((a, b) => Number(a) - Number(b));
  if ([...Object.keys(bidsRoundMap)].length < 1) {
    throw new NoBidsSent({ bidsRoundMap });
  }

  for (const roundIdx of availableRoundIds) {
    const roundIdInNum = Number(roundIdx);
    const totalBids = bidsRoundMap[roundIdInNum];
    const _combinedBidsForRound = getAllSubsets(totalBids, getMinimumBidsCountForRound(roundIdInNum)) as Bid[][];
    // shuffle the bids
    const combinedBidsForRound = _combinedBidsForRound
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    logger.debug(`Selecting the round ${roundIdx}`, requestContext, methodContext, {
      availableRoundIds,
      totalBidsCount: totalBids.length,
      totalBids: totalBids,
      combinationCount: combinedBidsForRound.length,
      combinations: combinedBidsForRound,
    });

    // Try every combinations until we find one that works.
    for (const randomCombination of combinedBidsForRound) {
      const asset = await getDestinationLocalAsset(
        transfer.xparams!.originDomain,
        transfer.origin.assets.bridged.asset,
        destination,
      );

      // TODO: Should use amount from router's bid.
      const amount = transfer.origin.assets.bridged.amount;
      const assignedAmount = BigNumber.from(amount).div(randomCombination.length);
      const routerLiquidityMap: Map<string, BigNumber> = new Map();

      // Native asset should always be 0 amount, no need to check for sufficient liquidity
      if (asset !== constants.AddressZero) {
        // Check the liquidity of each router whether it has enough funds
        let insufficientRouterExist = false;
        for (const randomBid of randomCombination) {
          const { router } = randomBid;
          let routerLiquidity: BigNumber | undefined = await cache.routers.getLiquidity(router, destination, asset);
          if (!routerLiquidity) {
            // Either we haven't cached the liquidity yet, or the value cached has become expired.
            routerLiquidity = await subgraph.getAssetBalance(destination, router, asset);
            if (!routerLiquidity.eq(constants.Zero)) {
              await cache.routers.setLiquidity(router, destination, asset, routerLiquidity);
            } else if (routerLiquidity.lt(assignedAmount)) {
              // NOTE: Using WARN level here as this is unexpected behavior... routers who are bidding on a transfer should
              // have added liquidity for the asset on the corresponding domain.
              logger.warn("Skipped bid from router; liquidity not found in subgraph", requestContext, methodContext, {
                transfer: {
                  transferId,
                  asset,
                  destination,
                  amount: amount.toString(),
                },
                assetBalanceId: `${asset.toLowerCase()}-${router.toLowerCase()}`,
                routerLiquidity,
                router,
              });
              insufficientRouterExist = true;
              break;
            }
          }

          routerLiquidityMap.set(router, routerLiquidity);

          if (routerLiquidity.lt(assignedAmount)) {
            logger.info("Skipped bid from router: insufficient liquidity", requestContext, methodContext, {
              transfer: {
                transferId,
                asset,
                destination,
                totalAmount: amount.toString(),
                assignedAmount,
              },
              router,
              liquidity: routerLiquidity.toString(),
            });
            insufficientRouterExist = true;
            break;
          }
        }

        // Skip this combination if there is a router which doesn't have enough liquidity
        if (insufficientRouterExist) continue;
      }

      try {
        logger.debug("Sending bid to relayer", requestContext, methodContext, {
          transferId,
          bid: {
            routers: randomCombination.map((bid) => {
              return { router: bid.router, signature: bid.signatures };
            }),
          },
        });
        // Send the relayer request based on chosen bids.
        const { taskId: _taskId } = await sendExecuteFastToRelayer(
          roundIdInNum,
          randomCombination,
          transfer,
          asset,
          requestContext,
        );
        taskId = _taskId;

        logger.info("Sent bid to relayer", requestContext, methodContext, {
          transferId,
          taskId,
          origin,
          destination,
        });

        // Update router liquidity record to reflect spending.
        for (const router of routerLiquidityMap.keys()) {
          const routerLiquidity = routerLiquidityMap.get(router)!.sub(assignedAmount);
          await cache.routers.setLiquidity(router, destination, asset, routerLiquidity);
        }

        // Break out from the bid selection loop.
        break;
      } catch (error: any) {
        const jsonError = jsonifyError(error as Error);

        logger.error(
          "Failed to send to relayer, trying next combination if possible",
          requestContext,
          methodContext,
          jsonError,
          {
            transferId,
            round: roundIdInNum,
            combinations: combinedBidsForRound,
            bidsCount: randomCombination.length,
          },
        );

        const errorMessage = jsonError.context?.message ?? jsonError.message;
        if (errorMessage && SlippageErrorPatterns.some((i) => errorMessage.includes(i))) {
          throw new SlippageToleranceExceeded({ transfer, error: jsonError });
        }
      }
    }

    if (!taskId) {
      logger.warn(`No combinations sent to relayer for the round ${roundIdInNum}`, requestContext, methodContext, {
        transferId,
        origin,
        destination,
        round: roundIdInNum,
        combinations: combinedBidsForRound,
      });
      continue;
    }

    logger.debug(`Sent combinations successfully in round ${roundIdInNum}`, requestContext, methodContext, {
      transferId,
      origin,
      destination,
      round: roundIdInNum,
      combinations: combinedBidsForRound,
    });

    // Clean up the caches upon successful transfer through the relayer
    await cache.transfers.pruneTransfersByIds([transferId]);
    await cache.auctions.pruneAuctionData(transferId);

    await cache.auctions.setExecStatus(transferId, ExecStatus.Sent);
    await cache.auctions.upsertMetaTxTask({ transferId, taskId });
    // reset error status
    transfer.origin.errorStatus = undefined;
    try {
      await database.saveTransfers([transfer]);
    } catch (err: unknown) {
      logger.error("Database error:saveTransfers", requestContext, methodContext, undefined, {
        error: err,
        transferId,
      });
    }
    return { taskId };
  }

  if (!taskId) {
    logger.warn("No rounds available for this transferId", requestContext, methodContext, {
      bidsRoundMap,
      transferId,
    });
    throw new NoBidsSent();
  }

  return { taskId };
};
