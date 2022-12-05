import fastify from "fastify";
import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  jsonifyError,
  NxtpError,
} from "@connext/nxtp-utils";
import { ReportEventType } from "@connext/nxtp-adapters-watcher";

import { getContext } from "../../watcher";

import {
  ConfigResponse,
  ConfigResponseSchema,
  PauseRequest,
  PauseRequestSchema,
  PauseResponse,
  PauseResponseSchema,
  WatcherApiErrorResponse,
  WatcherApiErrorResponseSchema,
} from "./schema";

export const bindServer = async (): Promise<void> => {
  const {
    config,
    logger,
    adapters: { wallet, watcher },
  } = getContext();
  const server = fastify();

  server.get("/ping", async (_, res) => {
    return res.status(200).send("pong\n");
  });

  server.get<{ Reply: ConfigResponse | WatcherApiErrorResponse }>(
    "/config",
    {
      schema: {
        response: {
          200: ConfigResponseSchema,
          500: WatcherApiErrorResponseSchema,
        },
      },
    },
    async (_, res) => {
      try {
        const address = await wallet.getAddress();
        return res.status(200).send({ address });
      } catch (err: unknown) {
        return res.status(500).send({ error: jsonifyError(err as NxtpError), message: "Error getting config" });
      }
    },
  );

  server.post<{
    Body: PauseRequest;
    Reply: PauseResponse | WatcherApiErrorResponse;
  }>(
    "/pause",
    {
      schema: {
        body: PauseRequestSchema,
        response: {
          200: PauseResponseSchema,
          500: WatcherApiErrorResponseSchema,
        },
      },
    },
    async (req, res) => {
      const { requestContext, methodContext } = createLoggingContext("GET /pause endpoint");
      try {
        const { adminToken } = req.body;
        if (adminToken !== config.server.adminToken) {
          return res.status(401).send({ message: "Unauthorized to perform this operation" });
        }

        const domains = Object.keys(config.chains);
        logger.warn("Pausing contracts!!!", requestContext, methodContext);
        const paused = await watcher.pause(requestContext, "TODO", domains);
        logger.warn("Paused contracts", requestContext, methodContext, { paused });
        await watcher.alert(requestContext, ReportEventType.Pause, {
          domains,
          errors: [],
          reason: "", // TODO: need to return this from checkInvariants
          timestamp: Date.now(),
          event: ReportEventType.Pause,
          logger,
          methodContext,
          relevantTransactions: [], // TODO: need to return this from pause function
          requestContext,
          rpcs: Object.entries(config.chains)
            .map((chain) => chain[1].providers)
            .flat(),
        });
        return res.status(200).send({ paused, domains });
      } catch (err: unknown) {
        return res.status(500).send({ error: jsonifyError(err as NxtpError), message: "Error pausing" });
      }
    },
  );

  try {
    await server.listen({ port: config.server.port, host: config.server.host });
  } catch (err: unknown) {
    logger.error(
      "Error starting server",
      createRequestContext(""),
      createMethodContext(""),
      jsonifyError(err as NxtpError),
    );
  }
};
