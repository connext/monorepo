import { fastify, FastifyInstance } from 'fastify';
import { BidHandler } from './handlers/bid';
import pino from 'pino';
import { Wallet, Contract, utils as ethersUtils } from 'ethers';
import { Logger } from "@connext/nxtp-utils";
import { getConfig, Config} from './utils';
import { Bid } from './lib/types';
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager  } from "@connext/nxtp-contracts/typechain-types";
import fp from 'fastify-plugin';
import { env } from 'process';


// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';


export default class Auctioneer {
  server!: FastifyInstance;
  logger!: Logger;
  bidHandler!: BidHandler;

  wallet!: Wallet;
  txManagerContract!: Contract;

  auctioneerAddress: string = "0x";
  config:Config;

  constructor() {
    this.logger = new Logger({ level: 'debug' });
    this.config = getConfig();
    if (this.config) {
      this.wallet = Wallet.fromMnemonic(this.config.mnemonic);
    }
    this.bidHandler = new BidHandler(this.config);
  }

  async fastifyStart(): Promise<FastifyInstance> {
    //nxtp logger

    //fastify logger
    const pino_logger = pino({ level: LOG_LEVEL });
    this.server = fastify({ logger: pino_logger });

    try {
      //register bid routes;
      this.server.register(fp(this.bidHandler.bidRoute));
      await this.server.listen(LISTEN_PORT);
  
      this.server.log.info({},
        `Auctioneer Listening @ ${LISTEN_PORT}`
      );
    }
    catch (e) {
      this.server.log.error(e);
      process.exit(1);
    }
  
    return this.server;
   }
  
}
