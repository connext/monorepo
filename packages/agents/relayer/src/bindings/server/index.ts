import fastify, { FastifyInstance } from "fastify";
import pino from "pino";
import {
  RelayerApiPostTaskRequestParams,
  RelayerApiPostTaskResponse,
  createLoggingContext,
  jsonifyError,
  NxtpError,
  RelayerApiPostTaskRequestParamsSchema,
  RelayerApiPostTaskResponseSchema,
  RelayerApiErrorResponseSchema,
  RelayerApiErrorResponse,
} from "@connext/nxtp-utils";

import { getContext } from "../../relayer";
import { getOperations } from "../../lib/operations";

export const bindServer = () =>
  new Promise<FastifyInstance>((res) => {
    const { config, logger } = getContext();
    const server = fastify({ logger: pino({ level: config.logLevel === "debug" ? "debug" : "warn" }) });

    server.get("/ping", async (_req, res) => {
      return res.code(200).send("pong\n");
    });

    server.post<{
      Params: { chainId: string };
      Body: RelayerApiPostTaskRequestParams;
      Reply: RelayerApiPostTaskResponse | RelayerApiErrorResponse;
    }>(
      "/relays/:chainId",
      {
        schema: {
          body: RelayerApiPostTaskRequestParamsSchema,
          response: {
            200: RelayerApiPostTaskResponseSchema,
            500: RelayerApiErrorResponseSchema,
          },
        },
      },
      async (request, response) => {
        const { requestContext, methodContext } = createLoggingContext("POST /relays/:chainId endpoint");
        const {
          tasks: { createTask },
        } = getOperations();
        try {
          const { chainId } = request.params;
          const chain = Number(chainId);
          if (isNaN(chain)) {
            throw new NxtpError("Invalid chainId, must be numeric", { chainId });
          }
          const task = request.body;
          const taskId = await createTask(chain, task, requestContext);
          return response.status(200).send({ message: "Task created", taskId });
        } catch (error: unknown) {
          const type = (error as NxtpError).type;
          logger.error("Create Task Post Error", requestContext, methodContext, jsonifyError(error as Error));
          return response.code(500).send({ message: type, error: jsonifyError(error as Error) });
        }
      },
    );

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res(server);
    });
  });
