import fastify, { FastifyInstance } from "fastify";
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
  ClearCacheRequest,
  ClearCacheRequestSchema,
} from "@connext/nxtp-utils";

import { getContext } from "../../make";
import { getOperations } from "../../lib/operations";

export const bindServer = () =>
  new Promise<FastifyInstance>((res) => {
    const {
      config,
      logger,
      adapters: { cache, wallet },
    } = getContext();
    const server = fastify();

    server.get("/ping", async (_req, res) => {
      return res.code(200).send("pong\n");
    });

    server.get("/address", async (_req, res) => {
      const address = await wallet.getAddress();
      return res.code(200).send(address);
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
            401: RelayerApiErrorResponseSchema,
            500: RelayerApiErrorResponseSchema,
          },
        },
      },
      async (request, response) => {
        const { requestContext, methodContext } = createLoggingContext("POST /relays/:chainId endpoint");
        const {
          tasks: { createTask },
        } = getOperations();
        const { config } = getContext();

        try {
          const { chainId } = request.params;
          const chain = Number(chainId);
          if (isNaN(chain)) {
            throw new NxtpError("Invalid chainId, must be numeric", { chainId });
          }
          if (request.body.apiKey !== config.server.adminToken) {
            return response.status(401).send({ message: "Invalid API key" });
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

    server.post<{ Body: ClearCacheRequest }>(
      "/clear-cache",
      { schema: { body: ClearCacheRequestSchema } },
      async (req, res) => {
        const {
          adapters: { cache },
          config,
        } = getContext();
        if (config.server.adminToken !== req.body.adminToken) {
          return res.status(401).send("Unauthorized to perform this operation");
        }
        await cache.tasks.clear();
        return res.status(200).send({ message: "Cache cleared" });
      },
    );

    server.get<{ Params: { taskId: string } }>("/tasks/status/:taskId", async (request, response) => {
      const { requestContext, methodContext } = createLoggingContext("GET /tasks/status/:taskId endpoint");

      try {
        const { taskId } = request.params;
        const status = await cache.tasks.getStatus(taskId);
        return response.status(200).send({ taskId, taskState: status });
      } catch (error: unknown) {
        logger.error(`Error getting task status`, requestContext, methodContext);
        return response.code(500).send({ message: `Error getting task status`, error: jsonifyError(error as Error) });
      }
    });

    server.listen(
      {
        host: config.server.host,
        port: config.server.port,
      },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        logger.info(`Server listening at ${address}`);
        res(server);
      },
    );
  });
