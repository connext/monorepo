import { fastify, FastifyInstance } from 'fastify';
import { gelatoSend, gelatoFulfill, isChainSupportedByGelato } from '@connext/nxtp-utils';
import bidRoute from './handlers/bid';
import pino from 'pino';
import { StoreManager } from './adapters/RedisStoreManager';
import Redis from 'ioredis';

import { Logger } from "@connext/nxtp-utils";


// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';


export class Auctioneer {
  store: StoreManager;
  server: FastifyInstance;
  logger: Logger;

  constructor() {
    
  }

  async fastifyStart(): Promise<FastifyInstance> {
    //nxtp logger
    this.logger = new Logger({ level: 'debug' });

    //fastify logger
    const pino_logger = pino({ level: LOG_LEVEL });
    this.server = fastify({ logger: pino_logger });

    try {
  
      //register bid routes;
      this.server.register(bidRoute);
      await this.server.listen(LISTEN_PORT);
  
      this.server.log.info({},
        `Auctioneer Listening @ ${LISTEN_PORT}`
      );
    }
    catch (e) {
      this.server.log.error(e);
    }
  
    return this.server;
   }
  
  async redisStart() {
    const redis = new Redis();
    let sManager: StoreManager;
    sManager = StoreManager.getInstance({ redisUrl: "", logger: this.logger, redis });
    
    if (sManager) {
      this.store = sManager;
    }
  }
}
