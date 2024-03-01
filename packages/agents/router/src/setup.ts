import { StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainData, createMethodContext, getNtpTimeSeconds, Logger, RequestContext } from "@connext/nxtp-utils";
import rabbit, { retry } from "foo-foo-mq";

import { MQConnectionClosed, MQConnectionFailed } from "./errors";
import { DEFAULT_ROUTER_MQ_RETRY_LIMIT } from "./config";

export const XCALL_QUEUE = "xcalls";
export const MQ_EXCHANGE = "router";
export const XCALL_MESSAGE_TYPE = "xcall";

let routerRetryMaxTime = 0;

export const setupCache = async (
  host: string | undefined,
  port: number | undefined,
  logger: Logger,
  requestContext: RequestContext,
): Promise<StoreManager> => {
  const methodContext = createMethodContext("setupCache");
  logger.info("Cache instance setup in progress...", requestContext, methodContext, {});
  const cacheInstance = StoreManager.getInstance({
    redis: { host, port, instance: undefined },
    mock: !host || !port,
    logger: logger.child({ module: "StoreManager" }),
  });

  logger.info("Cache instance setup is done!", requestContext, methodContext, {
    host,
    port,
  });
  return cacheInstance;
};

export const setupMq = async (
  uri: string,
  limit: number,
  heartbeat: number,
  failAfter: number,
  retryLimit: number,
  logger: Logger,
  requestContext: RequestContext,
): Promise<typeof rabbit> => {
  const methodContext = createMethodContext("setupMq");
  // Disable reply queues
  const replyQueue = false;
  routerRetryMaxTime = getNtpTimeSeconds() + retryLimit * failAfter;
  let retryActive = false;

  logger.info("Message queue setup in progress...", requestContext, methodContext, { uri });

  await rabbit.configure({
    connection: { uri, replyQueue, heartbeat, failAfter, retryLimit },
    queues: [{ name: XCALL_QUEUE, limit }],
    exchanges: [{ name: MQ_EXCHANGE, type: "direct" }],
    bindings: [{ exchange: MQ_EXCHANGE, target: XCALL_QUEUE, keys: [XCALL_QUEUE] }],
  });

  await rabbit.on("closed", async function () {
    if (routerRetryMaxTime === 0) {
      routerRetryMaxTime = getNtpTimeSeconds() + retryLimit * failAfter;
    }
    if (!retryActive && routerRetryMaxTime > getNtpTimeSeconds()) {
      retryActive = true;
      logger.warn("MQ connection closed, retrying", requestContext, methodContext, {
        uri,
      });
      try {
        await rabbit.configure({
          connection: { uri, replyQueue, heartbeat, failAfter, retryLimit },
          queues: [{ name: XCALL_QUEUE, limit }],
          exchanges: [{ name: MQ_EXCHANGE, type: "direct" }],
          bindings: [{ exchange: MQ_EXCHANGE, target: XCALL_QUEUE, keys: [XCALL_QUEUE] }],
        });
        await new Promise((f) => setTimeout(f, failAfter * 1000));
      } catch (err: unknown) {
        logger.warn("Error retrying connection", requestContext, methodContext, {
          error: err,
        });
        retryActive = false;
        return;
      }
    } else if (routerRetryMaxTime <= getNtpTimeSeconds()) {
      throw new MQConnectionClosed();
    }
  });

  await rabbit.on("failed", async function () {
    if (routerRetryMaxTime === 0) {
      routerRetryMaxTime = getNtpTimeSeconds() + retryLimit * failAfter;
    }
    if (!retryActive && routerRetryMaxTime > getNtpTimeSeconds()) {
      retryActive = true;
      logger.warn("MQ connection failed, retrying", requestContext, methodContext, {
        uri,
      });
      try {
        await rabbit.configure({
          connection: { uri, replyQueue, heartbeat, failAfter, retryLimit },
          queues: [{ name: XCALL_QUEUE, limit }],
          exchanges: [{ name: MQ_EXCHANGE, type: "direct" }],
          bindings: [{ exchange: MQ_EXCHANGE, target: XCALL_QUEUE, keys: [XCALL_QUEUE] }],
        });
        await new Promise((f) => setTimeout(f, failAfter * 1000));
      } catch (err: unknown) {
        logger.warn("Error retrying connection", requestContext, methodContext, {
          error: err,
        });
        retryActive = false;
        return;
      }
    } else if (routerRetryMaxTime <= getNtpTimeSeconds()) {
      throw new MQConnectionFailed();
    }
  });

  await rabbit.on("unreachable", async function () {
    if (routerRetryMaxTime === 0) {
      routerRetryMaxTime = getNtpTimeSeconds() + retryLimit * failAfter;
    }
    logger.warn("MQ is unreachable, retrying connection", requestContext, methodContext, {
      uri,
    });
    if (!retryActive && routerRetryMaxTime > getNtpTimeSeconds()) {
      retryActive = true;
      logger.warn("MQ connection unreachable, retrying", requestContext, methodContext, {
        uri,
      });
      try {
        retryActive = false;
        await rabbit.configure({
          connection: { uri, replyQueue, heartbeat, failAfter, retryLimit },
          queues: [{ name: XCALL_QUEUE, limit }],
          exchanges: [{ name: MQ_EXCHANGE, type: "direct" }],
          bindings: [{ exchange: MQ_EXCHANGE, target: XCALL_QUEUE, keys: [XCALL_QUEUE] }],
        });
        await new Promise((f) => setTimeout(f, failAfter * 1000));
      } catch (err: unknown) {
        logger.warn("Error retrying connection", requestContext, methodContext, {
          error: err,
        });
        retryActive = false;
        return;
      }
    } else if (routerRetryMaxTime <= getNtpTimeSeconds()) {
      throw new MQConnectionFailed();
    }
  });

  await rabbit.on("connected", function () {
    routerRetryMaxTime = 0;
    retryActive = false;
    logger.info("Connected to MQ!", requestContext, methodContext, {
      uri,
    });
  });

  logger.info("Message queue setup is done!", requestContext, methodContext, {
    uri,
  });

  return rabbit;
};

export const setupSubgraphReader = async (
  logger: Logger,
  chainData: Map<string, ChainData>,
  allowedDomains: string[],
  environment: "staging" | "production" | undefined,
  subgraphPrefix: string | undefined,
  requestContext: RequestContext,
): Promise<SubgraphReader> => {
  const methodContext = createMethodContext(setupSubgraphReader.name);

  const allowedChainData: Map<string, ChainData> = new Map();
  for (const allowedDomain of allowedDomains) {
    if (chainData.has(allowedDomain)) {
      allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
    }
  }
  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, { allowedChainData });
  const subgraphReader = await SubgraphReader.create(allowedChainData, environment, subgraphPrefix);

  // Pull support for domains that don't have a subgraph.
  const supported: Record<string, boolean> = subgraphReader.supported;
  for (const domain of Object.keys(supported)) {
    // If the domain is set to false, it indicates the SubgraphReader did not find active subgraphs for that domain.
    if (!supported[domain]) {
      throw new Error(`No subgraph found for domain ${domain}`);
    }
  }

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});

  return subgraphReader;
};
