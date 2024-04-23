import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createLoggingContext, Logger, getBestProvider, jsonifyError } from "@connext/nxtp-utils";
import { fastifyRedis } from "@fastify/redis";
import cors from "@fastify/cors";
import { ethers, providers } from "ethers";
import { SdkConfig, create } from "@connext/sdk-core";

import { baseRoutes } from "./routes/base";
import { poolRoutes } from "./routes/pool";
import { utilsRoutes } from "./routes/utils";
import { routerRoutes } from "./routes/router";
import { sharedRoutes } from "./routes/shared";
import { SdkServerConfig, getConfig } from "./config";
import { SdkServerContext } from "./context";

const context: SdkServerContext = {} as any;
export const getContext = () => context;

export interface RoutesOptions {
  logger?: Logger;
  cacheConfig?: {
    enabled?: boolean;
    cacheExpirationTimes?: Record<string, number>; // route-specific expiration times, in seconds
  };
}

export const makeSdkServer = async (_configOverride?: SdkServerConfig): Promise<FastifyInstance> => {
  const { requestContext, methodContext } = createLoggingContext(makeSdkServer.name);

  try {
    context.config = _configOverride ?? (await getConfig());
    context.logger = new Logger({
      level: context.config.logLevel,
      name: "sdk-server",
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });

    // SDK configuration
    const configuredProviders: Record<string, providers.JsonRpcProvider> = {};
    const chains = context.config.chains;
    for (const key in chains) {
      const chain = chains[key];
      const url = await getBestProvider(chain.providers);
      const provider = new ethers.providers.JsonRpcProvider(url);
      configuredProviders[key] = provider;
    }
    const nxtpConfig: SdkConfig = {
      chains: chains,
      logLevel: context.config.logLevel,
      network: context.config.network,
      environment: context.config.environment,
    };

    // Server configuration - setup redis plugin if enabled, CORS, register routes
    const server = fastify();

    if (context.config.redis?.enabled) {
      await server.register(fastifyRedis, {
        host: context.config.redis?.host,
        port: context.config.redis?.port,
      });
    }

    await server.register(cors, {
      origin: "*",
    });

    await setupRoutes(server, nxtpConfig);

    server.setErrorHandler(function (error, request, reply) {
      context.logger.error(`Error: ${error.message}`, requestContext, methodContext);
      reply.status(500).send(jsonifyError(error as Error));
    });

    server.get("/ping", async (_, reply) => {
      return reply.status(200).send("pong\n");
    });

    await server.listen({ host: context.config.server.http.host, port: context.config.server.http.port });

    context.logger.info("SDK Server boot complete!", requestContext, methodContext, {
      config: { ...context.config },
    });
    context.logger.info(`Server listening at ${context.config.server.http.host}:${context.config.server.http.port}`);

    return server;
  } catch (err: unknown) {
    console.error("Error starting SDK Server", err);
    process.exit(1);
  }
};

async function setupRoutes(server: FastifyInstance, nxtpConfig: SdkConfig) {
  const { sdkBase, sdkPool, sdkUtils, sdkRouter, sdkShared } = await create(nxtpConfig);
  await server.register(baseRoutes, {
    sdkBaseInstance: sdkBase,
    logger: context.logger,
    cacheConfig: context.config.redis,
  });
  await server.register(poolRoutes, { 
    sdkPoolInstance: sdkPool,
    logger: context.logger,
    cacheConfig: context.config.redis,
  });
  await server.register(utilsRoutes, { 
    sdkUtilsInstance: sdkUtils,
    logger: context.logger,
    cacheConfig: context.config.redis,
  });
  await server.register(routerRoutes, { 
    sdkRouterInstance: sdkRouter,
    logger: context.logger,
    cacheConfig: context.config.redis,
  });
  await server.register(sharedRoutes, { 
    sdkSharedInstance: sdkShared,
    logger: context.logger,
    cacheConfig: context.config.redis,
  });
}
