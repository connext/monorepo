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

  /**
   * Set last active time for a given router.
   * @param router - Router address.
   */
  public async setLastActive(router: string): Promise<void> {
    const key = `${this.prefix}:active`;
    await this.data.hset(key, router, getNtpTimeSeconds().toString());
  }

  /**
   * Get the recorded last active time for a given router.
   * @param router - Router address.
   * @returns The timestamp if recorded, 0 if not found.
   */
  public async getLastActive(router: string): Promise<number> {
    const key = `${this.prefix}:active`;
    const res = await this.data.hget(key, router);
    const lastActiveTime = res ? +res : 0;
    return lastActiveTime;
  }

  /**
   * Set the last bid time for a given router.
   * @param router - Router address.
   * @param bid - The bid instance.
   */
  public async setLastBidTime(
    router: string,
    bid: { originDomain: string; destinationDomain: string; asset: string },
  ): Promise<void> {
    const key = `${this.prefix}:bid`;
    const bidKey = `${bid.originDomain}:${bid.destinationDomain}:${bid.asset}`;
    let lastBids: Record<string, string> = {};
    const currentTimestamp = getNtpTimeSeconds().toString();
    const res = await this.data.hget(key, router);
    if (res) {
      lastBids = JSON.parse(res);
    }
    lastBids[bidKey] = currentTimestamp;
    await this.data.hset(key, router, JSON.stringify(lastBids));
  }

  /**
   * Get the recorded last bid time for a given router.
   * @param router - Router address.
   * @returns A record of transfer path, undefined if not found
   */
  public async getLastBidTime(router: string): Promise<Record<string, string> | undefined> {
    const key = `${this.prefix}:bid`;
    const res = await this.data.hget(key, router);
    return res ? JSON.parse(res) : undefined;
  }

  /**
   * Add a router to the list.
   * @param router - Router address.
   */
  public async addRouter(router: string): Promise<void> {
    const activeKey = `${this.prefix}:active`;
    const addressKey = `${this.prefix}:address`;
    const res = await this.data.hget(activeKey, router);
    if (!res) {
      await this.data.hset(activeKey, router, getNtpTimeSeconds().toString());
      await this.data.rpush(addressKey, router);
    }
  }

  /**
   * Get the recorded router addresses.
   * @param offset - The start index.
   * @param limit - The number of items to fetch.
   * @returns The list of router address.
   */
  public async getRouters(offset = 0, limit = 100): Promise<string[]> {
    const addressKey = `${this.prefix}:address`;
    const routers = await this.data.lrange(addressKey, offset, offset + limit - 1);
    return routers;
  }
}
