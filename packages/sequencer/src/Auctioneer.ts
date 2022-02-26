import { fastify, FastifyInstance } from "fastify";
import pino from "pino";
import { Logger, ChainData, getChainData } from "@connext/nxtp-utils";
import { SubgraphReader, ReadSubgraphConfig } from "@connext/nxtp-adapters-subgraph";
import { StoreManager } from "@connext/nxtp-adapters-cache";

import { getConfig, Config } from "./utils";
import { BidHandler } from "./handlers/bid";
import { setupReadSubgraph } from "./helpers/subgraph";

// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || "debug";
export default class Auctioneer {
  config: Config;
  server!: FastifyInstance;
  logger!: Logger;
  bidHandler!: BidHandler;
  subgraph!: SubgraphReader;
  store!: StoreManager;
  chainData: Map<string, ChainData> | undefined;

  constructor() {
    this.logger = new Logger({ level: "debug" });
    this.config = getConfig();
    this.bidHandler = new BidHandler(this.config);
    const pino_logger = pino({ level: LOG_LEVEL });
    this.server = fastify({ logger: pino_logger });
  }

  async start() {
    // read chaindata
    this.chainData = await getChainData();

    if (!this.chainData) {
      throw new Error(`Getting chainData failed`);
    }

    // setup subgraph
    this.subgraph = await setupReadSubgraph(this.chainData);

    // setup redis

    // setup fastify
    await this.fastifyStart();
  }

  async fastifyStart(): Promise<FastifyInstance> {
    try {
      await this.server.listen(LISTEN_PORT);
      this.bidHandler.route(this.server);
      this.logger.info(`Auctioneer Listening @ ${LISTEN_PORT}`);
    } catch (e) {
      this.logger.error(e as string);
      process.exit(1);
    }

    return this.server;
  }
}
