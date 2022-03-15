import fastify from "fastify";
import pino from "pino";
import { Bid, createLoggingContext, jsonifyError } from "@connext/nxtp-utils";

import { handleBid } from "../../lib/operations";
import { getContext } from "../../sequencer";

export const bindServer = () =>
  new Promise<void>((res) => {
    const { config, logger } = getContext();
    const server = fastify({ logger: pino({ level: config.logLevel }) });

    server.get("/ping", async (_req, res) => {
      return res.code(200).send("pong\n");
    });

    server.post("/bid", {}, async (request, response) => {
      try {
        const { requestContext } = createLoggingContext("/bid endpoint");
        const { body: req } = request;
        const bid = (req as any).bid as Bid;
        await handleBid(bid, requestContext);
        return response.status(200).send({ message: "Sent bid to auctioneer", bid });
      } catch (error: any) {
        logger.error(`Bid Post Error: ${error}`);
        return response.code(500).send({ err: jsonifyError(error) });
      }
    });

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res();
    });
  });
