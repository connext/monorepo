import { jsonifyError, NxtpError, NxtpErrorJson, Values } from "@connext/nxtp-utils";
import Redis from "ioredis";
import { errAsync, ResultAsync } from "neverthrow";
import { BigNumber, constants } from "ethers";
import hyperid from "hyperid";

const hId = hyperid();

export class CacheError extends NxtpError {
  static readonly type = "CacheError";
  static readonly reasons = {
    ClientError: "Client error",
    ParamsError: "Params error",
  };

  constructor(
    public readonly message: Values<typeof CacheError.reasons> | string,
    public readonly context: {
      methodId: string;
      method: string;
      clientErr?: NxtpErrorJson;
      paramsErr?: string;
    },
  ) {
    super(message, context, CacheError.type);
  }
}

export class RedisCache {
  private redis: Redis.Redis;

  constructor(host: string, port = 6379, private readonly prefix?: string, _redis?: Redis.Redis) {
    this.redis = _redis
      ? _redis
      : Redis({
          host,
          port,
        });
  }

  /**
   * Add outstanding liquidity to the cache. This is an expiring value that can keep track of locked up liquidity.
   * @param chainId
   * @param assetId
   * @param transactionId
   * @param amount
   * @param expiry
   * @returns A ResultAsync with a string for "OK" (matching the Redis client response), or a CacheError
   */
  addOutstandingLiquidity(
    chainId: number,
    assetId: string,
    transactionId: string,
    amount: string,
    expiry: number,
  ): ResultAsync<"OK", CacheError> {
    const method = this.addOutstandingLiquidity.name;
    const methodId = hId();

    const secondsFromNow = expiry - Math.floor(Date.now() / 1000);
    if (secondsFromNow < 0) {
      return errAsync(
        new CacheError(CacheError.reasons.ParamsError, { method, methodId, paramsErr: "Invalid expiry" }),
      );
    }

    // key by prefix-chainId-asset
    const key = [this.prefix, chainId, assetId, transactionId].join(":");
    return ResultAsync.fromPromise(
      this.redis.setex(key, secondsFromNow, amount), // set expiring key
      (err) =>
        new CacheError(CacheError.reasons.ClientError, { method, methodId, clientErr: jsonifyError(err as Error) }),
    );
  }

  /**
   * Get a number representing the cached outstanding liquidity for a particular chain/asset combo.
   * @param chainId
   * @param assetId
   * @returns A ResultAsync with a BigNumber for the total liquidity, or a CacheError
   */
  getOutstandingLiquidity(chainId: number, assetId: string): ResultAsync<BigNumber, CacheError> {
    const method = this.getOutstandingLiquidity.name;
    const methodId = hId();

    const scanKey = [this.prefix, chainId, assetId, "*"].join(":");

    return ResultAsync.fromPromise(
      this.redis.scan(0, "MATCH", scanKey),
      (err) =>
        new CacheError(CacheError.reasons.ClientError, { method, methodId, clientErr: jsonifyError(err as Error) }),
    )
      .andThen(([, liquidityResults]) =>
        ResultAsync.fromPromise(
          this.redis.mget(liquidityResults),
          (err) =>
            new CacheError(CacheError.reasons.ClientError, { method, methodId, clientErr: jsonifyError(err as Error) }),
        ),
      )
      .map((liquidityResults) =>
        liquidityResults.filter((x) => !!x).reduce((sum, liq) => sum.add(liq!), constants.Zero),
      );
  }
}
