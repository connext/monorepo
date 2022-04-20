import { getNtpTimeSeconds } from "@connext/nxtp-utils";
import { TimestampedCacheValue } from "../entities";
import { Cache } from "./cache";

/**
 * Redis Store Details:
 * Router Liquidity:
 *   key: $router:$domain:liquidity:$asset | value: string;
 *
 * Router Approval:
 *   key: $router:$domain:approval | value: boolean;
 *
 * NOTE: Both of the above stored items do expire after a set amount of time.
 */
export class RoutersCache extends Cache {
  // TODO: Implement configurable expiry times per domain.
  // Default expiry time (in seconds) after which liquidity data is considered stale.
  public static readonly DEFAULT_EXPIRY = 10 * 60; // 10 minutes.
  private readonly prefix = "routers";

  /**
   * Get recorded liquidity amount for a given router on a given domain for a given asset.
   * @param domain - Domain number.
   * @param router - Router address.
   * @param asset - Token address.
   * @returns String of a BigNumber value if found, undefined if not found.
   */
  public async getLiquidity(domain: string, router: string, asset: string): Promise<string | undefined> {
    const key = `${this.prefix}:${domain}:${router}:liquidity`;
    const res = await this.data.hget(key, asset);
    const parsed = res ? (JSON.parse(res) as TimestampedCacheValue<string>) : undefined;
    // Only return the value if it's not expired.
    return parsed && getNtpTimeSeconds() - parsed.timestamp < RoutersCache.DEFAULT_EXPIRY ? parsed.value : undefined;
  }

  /**
   * Set recorded liquidity amount for a given router on a given domain for a given asset.
   * @param domain - Domain number.
   * @param router - Router address.
   * @param asset - Token address.
   * @param amount - Amount of liquidity to set.
   * @returns 1 if added, 0 if updated.
   */
  public async setLiquidity(domain: string, router: string, asset: string, amount: string): Promise<number> {
    const key = `${this.prefix}:${domain}:${router}:liquidity`;
    return await this.data.hset(
      key,
      asset,
      JSON.stringify({
        timestamp: getNtpTimeSeconds(),
        value: amount,
      }),
    );
  }

  /**
   * Get the approval status of a given router in a given domain.
   * @param domain - Domain number.
   * @param router - Router address.
   * @returns True if router is approved, false if router is not approved, undefined if record not found.
   */
  public async getApproval(domain: string, router: string): Promise<boolean | undefined> {
    const key = `${this.prefix}:${domain}:${router}`;
    const res = await this.data.hget(key, "approval");
    const parsed = res ? (JSON.parse(res) as TimestampedCacheValue<boolean>) : undefined;
    // Only return the value if it's not expired.
    return parsed && getNtpTimeSeconds() - parsed.timestamp < RoutersCache.DEFAULT_EXPIRY ? parsed.value : undefined;
  }

  /**
   * Set the approval status of a given router in a given domain.
   * @param domain - Domain number.
   * @param router - Router address.
   * @returns 1 if added, 0 if updated.
   */
  public async setApproval(domain: string, router: string, approval: boolean): Promise<number> {
    const key = `${this.prefix}:${domain}:${router}`;
    return await this.data.hset(
      key,
      "approval",
      JSON.stringify({
        timestamp: getNtpTimeSeconds(),
        value: approval,
      }),
    );
  }
}
