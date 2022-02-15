import { fastify, FastifyInstance } from 'fastify';
import { gelatoSend, gelatoFulfill, isChainSupportedByGelato } from '@connext/nxtp-utils';
import bidRoute from './handlers/bid';
import pino from 'pino';


const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';

const pino_logger = pino({ level: LOG_LEVEL });

export async function fastifyStart(): Promise<FastifyInstance> {
  const server = fastify({ logger: pino_logger });
  try {

    //register bid routes;
    server.register(bidRoute);
    await server.listen(LISTEN_PORT);

    server.log.info({},
      `Auctioneer Listening @ ${LISTEN_PORT}`
    );
  }
  catch (e) {
    server.log.error(e);
  }

  return server;
}