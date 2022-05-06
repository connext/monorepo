import fastify, { FastifyInstance } from "fastify";

import { getContext } from "../../backend";

export const bindServer = () =>
  new Promise<FastifyInstance>((res) => {
    const { config, logger } = getContext();

    const server = fastify();

    server.get("/ping", (_, res) => {
      res.status(200).send("pong\n");
    });

    server.get("/users/:address/transfers", (_, res) => {
      // TODO: Implement
      res.status(500).send("Not implemented");
    });

    server.get("/users/:address/volume", (_, res) => {
      // TODO: Implement
      res.status(500).send("Not implemented");
    });

    server.get("/routers/:address/volume", (_, res) => {
      // TODO: Implement
      res.status(500).send("Not implemented");
    });

    server.get("/domains/:domainId/transfers", (_, res) => {
      // Should take timespan as a req param. E.g. get all transfers in last 24 hours.
      // Should take status as req param. E.g. get all 'pending' status transfers (i.e. only XCalls) for given domain.
      // TODO: Implement
      res.status(500).send("Not implemented");
    });

    server.get("/domains/:domainId/volume", (_, res) => {
      // Should take timespan as req param. E.g. get volume for last 24 hours, weekly, etc.
      // Should take inflowOnly or outflowOnly as a param (otherwise will get sum total volume).
      // TODO: Implement
      res.status(500).send("Not implemented");
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
