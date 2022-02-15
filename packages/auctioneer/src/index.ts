import { fastify, FastifyInstance } from 'fastify';
import { Server } from 'http';
import pino from 'pino';

const REDIS_URL = process.env.REDIS_URL || 'http://localhost:6379';
const LISTEN_PORT = process.env.PORT || 1234;
const LOG_LEVEL = process.env.loglevel || 'debug';

const pino_logger = pino({ level: LOG_LEVEL });

async function fastifyStart(): Promise<FastifyInstance>{
  const server = fastify({ logger: pino_logger});
  try {
    await server.listen(LISTEN_PORT);
    server.log.info({},
      `Auctioneer Listening @ ${LISTEN_PORT}`
    );
    return server;
  }
  catch (e) {
    server.log.error(e);
  }

}
export async function makeAuctioneer() {
  const serverInstance = await fastifyStart();
}