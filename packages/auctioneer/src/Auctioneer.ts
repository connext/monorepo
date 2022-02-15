import { fastify, FastifyInstance } from 'fastify';
import { gelatoSend, gelatoFulfill, isChainSupportedByGelato } from '@connext/nxtp-utils';
import bidRoute from './handlers/bid';
import pino from 'pino';
import { StoreManager } from './adapters/RedisStoreManager';
import Redis from 'ioredis';
import { Wallet, Contract, utils as ethersUtils } from 'ethers';
import { Logger } from "@connext/nxtp-utils";
import { getConfig, Config} from './utils';
import { ChainReader } from '@connext/nxtp-txservice';
import { Bid } from './lib/types';
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager  } from "@connext/nxtp-contracts/typechain-types";


// const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';


export default class Auctioneer {
  store!: StoreManager;
  server!: FastifyInstance;
  logger!: Logger;
  chainReader!: ChainReader;
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


  async validateTx(bid: Bid, chainId: number) {    
    const constractInterface = new ethersUtils.Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    const data =  constractInterface.encodeFunctionData("fulfill", [
      { ...bid }
    ]);
  }
}
