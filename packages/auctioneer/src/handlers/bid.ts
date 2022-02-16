import { Logger } from "@connext/nxtp-utils";
import {
   FastifyInstance,
   FastifyPluginAsync,
   FastifyPluginOptions,
   FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";
import Redis from "ioredis";
import { StoreManager } from "../adapters/RedisStoreManager";
import { Bid } from '../lib/types';
import { Wallet, Contract, utils as ethersUtils } from 'ethers';
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager as TTransactionManager  } from "@connext/nxtp-contracts/typechain-types";
import { getConfig, Config} from '../utils';
import { ChainReader } from '@connext/nxtp-txservice';




export class BidHandler {

  store!: StoreManager;
  logger = new Logger({ level: 'debug' });
  chainReader!: ChainReader;
  config:Config;

  redisStart() {
    const redis = new Redis();
    let sManager: StoreManager;
    sManager = StoreManager.getInstance({ redisUrl: "", logger: this.logger, redis });

    if (sManager) {
      this.store = sManager;
    }
  }

  constructor(chainConfig: Config) {
    this.config = chainConfig;

    this.chainReader = new ChainReader(this.logger,this.config)
 
    this.redisStart();
  }

  async validateTx(bid: Bid, chainId: number):Promise<boolean> {    
    const contractInterface = new ethersUtils.Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
    const data =  contractInterface.encodeFunctionData("fulfill", [
      { ...bid }
    ]);
    
    const isValid = await this.chainReader.getGasEstimate(chainId,{
      chainId: chainId, to: "0x", data: data
    });
    return true;
  }

  async  dbStuff(req: any) {
    console.log(req);
    return `database response text`;
  }

  async handleBid(bid:Bid) {
    const isValid = await this.validateTx(bid, 4);
    if (isValid) {
      this.store.save(bid);
    }
    
  }

  async bidRoute(server: FastifyInstance, opts: FastifyPluginOptions) {
    server.post("/bid", {}, async (req, res) => {
      //single bid no cache
      try {
        const dbResponse = await this.dbStuff(req);
        if (dbResponse) {
          server.log.debug(`Database Response: ${dbResponse}`);
        }
        return res.code(201).send(dbResponse);
      } catch (e) {
        server.log.error(`Bid Post Error: ${e}`);
        return res.code(500);
      }
    });
  }


}
