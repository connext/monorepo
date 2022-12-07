import fastify from "fastify";
import {
  createLoggingContext,
  createMethodContext,
  createRequestContext,
  jsonifyError,
  NxtpError,
} from "@connext/nxtp-utils";

import { getContext } from "../../watcher";
import { pauseAndAlert } from "../../operations/validateAndPause";

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
    adapters: { wallet },
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
      const { requestContext } = createLoggingContext("GET /pause endpoint");
      try {
        const { adminToken } = req.body;
        if (adminToken !== config.server.adminToken) {
          return res.status(401).send({ message: "Unauthorized to perform this operation" });
        }

        const paused = await pauseAndAlert(requestContext, "TODO");
        return res.status(200).send(paused);
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
