import fastify, { FastifyInstance } from "fastify";
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
    expirationTime?: number;
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
    const signer = ethers.Wallet.createRandom();
    const signerAddress = await signer.getAddress();

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
      signerAddress: signerAddress,
      network: context.config.network,
      environment: context.config.environment,
    };

    const { sdkBase, sdkPool, sdkUtils, sdkRouter, sdkShared } = await create(nxtpConfig);

    // Server configuration - setup redis plugin if enabled, CORS, register routes
    const server = fastify();

    if (context.config.redis?.enabled) {
      server.register(fastifyRedis, {
        host: context.config.redis?.host,
        port: context.config.redis?.port,
      });
    }

    server.register(cors, {
      origin: "*",
    });

    server.setErrorHandler(function (error, request, reply) {
      context.logger.error(`Error: ${error.message}`, requestContext, methodContext);
      reply.status(500).send(jsonifyError(error as Error));
    });

    server.get("/ping", async (_, reply) => {
      return reply.status(200).send("pong\n");
    });

    server.post<{
      Params: { domainId: string };
      Body: providers.TransactionRequest;
    }>("/sendTransaction/:domainId", async (request, reply) => {
      const feeData = await configuredProviders[request.params.domainId].getFeeData();
      // request.body.gasLimit = ethers.BigNumber.from("20000");
      request.body.gasPrice = feeData.gasPrice!;
      const txRes = await signer.connect(configuredProviders[request.params.domainId]).sendTransaction(request.body);
      const txRec = await txRes.wait();
      reply.status(200).send(txRec);
    });

    server.register(baseRoutes, {
      sdkBaseInstance: sdkBase,
      logger: context.logger,
      cacheConfig: context.config.redis,
    });
    server.register(poolRoutes, { sdkPoolInstance: sdkPool, logger: context.logger });
    server.register(utilsRoutes, { sdkUtilsInstance: sdkUtils, logger: context.logger });
    server.register(routerRoutes, { sdkRouterInstance: sdkRouter, logger: context.logger });
    server.register(sharedRoutes, { sdkSharedInstance: sdkShared, logger: context.logger });

    server.listen({ host: context.config.server.http.host, port: context.config.server.http.port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      context.logger.info(`Server listening at ${address}`);
    });

    context.logger.info("SDK Server boot complete!", requestContext, methodContext, {
      config: { ...context.config },
    });

    return server;
  } catch (err: unknown) {
    console.error("Error starting SDK Server", err);
    process.exit(1);
  }
};
