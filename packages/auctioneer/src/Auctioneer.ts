import { fastify, FastifyInstance } from 'fastify';
import { gelatoSend, gelatoFulfill, isChainSupportedByGelato, ethereumRequest } from '@connext/nxtp-utils';
import bidRoute from './handlers/bid';
import pino from 'pino';
import { StoreManager } from './adapters/RedisStoreManager';
import Redis from 'ioredis';
import { Wallet } from 'ethers';
import { Logger } from "@connext/nxtp-utils";
import { getConfig } from './utils';
import { ChainReader } from '@connext/nxtp-txservice';
import { Bid } from './lib/types';


// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';


export default class Auctioneer {
  store!: StoreManager;
  server!: FastifyInstance;
  logger!: Logger;
  chainReader!: ChainReader;
  wallet!: Wallet;

  auctioneerAddress: string = "0x";

  constructor() {

    this.logger = new Logger({ level: 'debug' });
    const config = getConfig();
    if (config) {
      this.wallet = Wallet.fromMnemonic(config.mnemonic);
      this.chainReader = new ChainReader(this.logger, config, this.wallet)
    }
  }

  async fastifyStart(): Promise<FastifyInstance> {
    //nxtp logger

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


  async validateTx(bid: Bid) {
    
    this.chainReader.getGasEstimate()
    
  }
}
