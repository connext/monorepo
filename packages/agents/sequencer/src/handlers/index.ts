import { FastifyInstance } from "fastify";
import { createLoggingContext, jsonifyError, SignedBid } from "@connext/nxtp-utils";

import { handleBid } from "./bid";

export const setupHandlers = (server: FastifyInstance) => {
  server.get("/ping", async (_req, res) => {
    return res.code(200).send("pong\n");
  });

  server.post("/bid", {}, async (request, response) => {
    try {
      const { requestContext } = createLoggingContext("/bid endpoint");
      const { body: req } = request;
      const result = await handleBid((req as any).bid as SignedBid, requestContext);
      return response.status(200).send(result);
    } catch (e) {
      server.log.error(`Bid Post Error: ${e}`);
      return response.code(500).send({ err: jsonifyError(e) });
    }
  });
};
