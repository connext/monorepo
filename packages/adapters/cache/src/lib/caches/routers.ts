import { BigNumber } from "ethers";
import { getNtpTimeSeconds } from "@connext/nxtp-utils";

import { TimestampedCacheValue } from "../entities";

import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Router Liquidity:
 *   key: $router:$domain:liquidity:$asset | value: string;
 * NOTE: Router Liquidity will expire after a set amount of time.
 */
export class RoutersCache extends Cache {
  // TODO: Implement configurable expiry times per domain.
  // Default expiry time (in seconds) after which liquidity data is considered stale.
  public static readonly DEFAULT_LIQUIDITY_EXPIRY = 30; // 30 seconds.
  public static readonly DEFAULT_APPROVAL_EXPIRY = 24 * 60 * 60; // 24 hours.
  private readonly prefix = "routers";

  /**
   * Get recorded liquidity amount for a given router on a given domain for a given asset.
   * @param domain - Domain number.
   * @param router - Router address.
   * @param asset - Token address.
   * @returns BigNumber value if found, undefined if not found.
   */
  public async getLiquidity(domain: string, router: string, asset: string): Promise<BigNumber | undefined> {
    const key = `${this.prefix}:${domain}:${router}:liquidity`;
    const res = await this.data.hget(key, asset);
    const parsed = res ? (JSON.parse(res) as TimestampedCacheValue<string>) : undefined;
    // Only return the value if it's not expired.
    return parsed && getNtpTimeSeconds() - parsed.timestamp < RoutersCache.DEFAULT_LIQUIDITY_EXPIRY
      ? BigNumber.from(parsed.value)
      : undefined;
  }

  /**
   * Set recorded liquidity amount for a given router on a given domain for a given asset.
   * @param domain - Domain number.
   * @param router - Router address.
   * @param asset - Token address.
   * @param amount - Amount of liquidity to set.
   * @returns 1 if added, 0 if updated.
   */
  public async setLiquidity(
    domain: string,
    router: string,
    asset: string,
    amount: BigNumber | string,
  ): Promise<number> {
    const key = `${this.prefix}:${domain}:${router}:liquidity`;
    return await this.data.hset(
      key,
      asset,
      JSON.stringify({
        timestamp: getNtpTimeSeconds(),
        value: BigNumber.from(amount).toString(),
      }),
    );
  }
}
