import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import fp from 'fastify-plugin';

async function dbStuff(req:any) {
  console.log(req);
  return `database response text`;
  
}
const BidRoute: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.post('/bid', {}, async (req, res) => {
    //single bid no cache
    try {
      const dbResponse = await dbStuff(req);
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
export default fp(BidRoute);