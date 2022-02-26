import { FastifyInstance } from "fastify";
import { SignedBid } from "@connext/nxtp-utils";

import { AppContext } from "../context";

import { handleBid } from "./bid";

export const setupHandlers = (context: AppContext, server: FastifyInstance) => {
  server.get("/ping", async (req, res) => {
    return res.code(200).send("pong\n");
  });

  server.post("/bid", {}, async (req, res) => {
    try {
      const bid = JSON.parse(req.body as string) as SignedBid;
      const result = await handleBid(context, bid);
      return res.code(201).send(result);
    } catch (e) {
      server.log.error(`Bid Post Error: ${e}`);
      return res.code(500);
    }
  });
};
