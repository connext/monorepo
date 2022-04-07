import fastify, { FastifyInstance } from "fastify";
import pino from "pino";
import { Bid, createLoggingContext, jsonifyError, mock } from "@connext/nxtp-utils";

import { handleBid } from "../../lib/operations";
import { getContext } from "../../sequencer";

export const bindServer = () =>
  new Promise<FastifyInstance>((res) => {
    const {
      config,
      logger,
      adapters: { cache },
    } = getContext();
    const server = fastify({ logger: pino({ level: config.logLevel }) });

    server.get("/ping", async (_req, res) => {
      return res.code(200).send("pong\n");
    });

    server.post("/bid", {}, async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("POST /bid endpoint");
      try {
        const { body: req } = request;
        const bid = (req as any).bid as Bid;
        await handleBid(bid, requestContext);
        return response.status(200).send({ message: "Sent bid to auctioneer", bid });
      } catch (error: unknown) {
        logger.error(`Bid Post Error`, requestContext, methodContext, jsonifyError(error as Error));
        return response.code(500).send({ err: jsonifyError(error as Error) });
      }
    });

    server.get("/pending", {}, async (_, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /pending endpoint");
      try {
        const pending = await cache.auctions.getAllTransactionsIdsWithPendingBids();
        return response.status(200).send({ pending });
      } catch (error: unknown) {
        logger.error(`Pending Bid Get Error`, requestContext, methodContext);
        return response.code(500).send({ err: jsonifyError(error as Error) });
      }
    });

    server.get<{ Params: { transferId: string } }>("/bid/:transferId", {}, async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /bid/:transferId endpoint");
      try {
        const bids = await cache.auctions.getBidsByTransactionId(request.params.transferId);
        return response.status(200).send({ bids });
      } catch (error: unknown) {
        logger.error(`Bids by TransferId Get Error`, requestContext, methodContext);
        return response.code(500).send({ err: jsonifyError(error as Error) });
      }
    });

    server.post("/test/cache/fakebid", {}, async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("POST /bid endpoint");
      try {
        const bid: Bid = mock.entities.bid();
        const { transferId } = bid;
        await handleBid(bid, requestContext);
        const res = await cache.auctions.storeBid(bid);
        logger.info("Stored bid to cache", requestContext, methodContext, {
          res,
        });
        return response.status(200).send({ message: `Stored a fake bid under transfer ID: ${transferId}` });
      } catch (error: unknown) {
        logger.error(`Bid Post Error`, requestContext, methodContext, jsonifyError(error as Error));
        return response.code(500).send({ err: jsonifyError(error as Error) });
      }
    });

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res(server);
    });
  });
