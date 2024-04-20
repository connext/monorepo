import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { RoutesOptions } from "./server";
import { DEFAULT_CACHE_EXPIRATION_SECS } from "./config";

export const getCacheExpirationTimeForRoute = (route: string, options: RoutesOptions): number => {
  return options.cacheConfig?.cacheExpirationTimes?.[route] || DEFAULT_CACHE_EXPIRATION_SECS;
};

export async function cacheMiddleware(
    server: FastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    handleRequest: () => Promise<any>,
    routeName: string,
    options: RoutesOptions,
) {
    const cacheKey = JSON.stringify(request.body);
    const cacheConfig = options.cacheConfig || { enabled: false };

    if (cacheConfig?.enabled) {
      const cacheExpiration = getCacheExpirationTimeForRoute(routeName, options);
      const cachedResult = await server.redis.get(cacheKey);

      if (cachedResult) {
        reply.status(200).send(JSON.parse(cachedResult));
        return;
      }

      const result = await handleRequest();
      await server.redis.set(cacheKey, JSON.stringify(result), "EX", cacheExpiration);
      reply.status(200).send(result);
    } else {
      const result = await handleRequest();
      reply.status(200).send(result);
    }
}
