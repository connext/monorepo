import { utils, providers, BigNumber, BigNumberish, constants } from "ethers";
import {
  Logger,
  ChainData,
  formatUrl,
  XTransferStatus,
  transfersCastForUrl,
  XTransferErrorStatus,
  axiosGet,
  axiosPost,
  getNtpTimeSeconds,
  StableSwapExchange,
} from "@connext/nxtp-utils";

import { SdkConfig } from "@connext/sdk-core";
import { SdkShared } from "./sdkShared";
import { PriceFeed } from "./lib/priceFeed";
import { Pool } from "./interfaces";
import { validateUri, axiosGetRequest } from "./lib/helpers";
import memoize from "memoizee";
import { SignerAddressMissing, ParamsInvalid } from "./lib/errors";

/**
 * @classdesc SDK class encapsulating utility functions.
 *
 */

export class SdkPool extends SdkShared {
  private static _instance: SdkPool;
  private readonly priceFeed: PriceFeed;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
    this.priceFeed = new PriceFeed();
  }

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkPool> {
    const logger = _logger ? _logger.child({ name: "SdkPool" }) : new Logger({ name: "SdkPool" });

    return (this._instance = new SdkPool(_config, logger, _chainData || new Map()));
  }

  async calculateSwap(
    domainId: string,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: BigNumberish,
  ): Promise<BigNumber> {
    const params: {
      domainId: string;
      tokenAddress: string;
      tokenIndexFrom: number;
      tokenIndexTo: number;
      amount: BigNumberish;
    } = {
      domainId,
      tokenAddress,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
    };
    const response = await axiosPost(`${this.baseUri}/calculateSwap`, params);
    return response.data;
  }

  getSwapOut(pool: Pool, x: BigNumber, xp: BigNumber[], tokenIndexFrom = 0, tokenIndexTo = 1): BigNumber {
    const d = pool.invariant;
    let c = d;
    let s = BigNumber.from(0);
    const nT = pool.balances.length;
    const nA = pool.currentA.mul(BigNumber.from(nT));
    const A_PRECISION = BigNumber.from(100);

    let _x = BigNumber.from(0);
    for (let i = 0; i < nT; i++) {
      if (i === tokenIndexFrom) {
        _x = x;
      } else if (i !== tokenIndexTo) {
        _x = xp[i];
      } else {
        continue;
      }
      s = s.add(_x);
      c = c.mul(d).div(_x.mul(nT));
    }
    c = c.mul(d).mul(A_PRECISION).div(nA.mul(nT));
    const b = s.add(d.mul(A_PRECISION).div(nA));
    let yPrev = BigNumber.from(0);
    let y = d;

    for (let i = 0; i < 255; i++) {
      yPrev = y;
      y = y.mul(y).add(c).div(y.mul(2).add(b).sub(d));
      if (y.sub(yPrev).abs().lte(1)) {
        return y;
      }
    }

    throw new Error("Approximation did not converge");
  }

  scientificToBigInt(scientificNotationString: string) {
    const parts = scientificNotationString.split("e");
    const coeff = parseFloat(parts[0]);
    const exp = parts.length > 1 ? parseFloat(parts[1]) : 0;

    const decimalParts = coeff.toString().split(".");
    const numDecimals = decimalParts[1]?.length || 0;

    const bigIntCoeff = BigInt(decimalParts.join(""));
    const bigIntExp = BigInt(exp - numDecimals);

    return bigIntCoeff * BigInt(10) ** bigIntExp;
  }

  async calculateSwapLocal(
    domainId: string,
    pool: Pool,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: BigNumberish,
  ): Promise<BigNumber> {
    let minAmount = BigNumber.from(0);

    if (pool) {
      const fee = BigNumber.from(pool.swapFee);
      const xp = pool.balances.map((balance: BigNumber, index: number) =>
        balance.mul(BigNumber.from(10).pow(18 - pool.decimals[index])),
      );
      const x = xp[tokenIndexFrom].add(
        BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - pool.decimals[tokenIndexFrom])),
      );
      const y = this.getSwapOut(pool, x, xp, tokenIndexFrom, tokenIndexTo);
      const dy = xp[tokenIndexTo].sub(y).div(BigNumber.from(10).pow(18 - pool.decimals[tokenIndexTo]));
      const dyFee = fee ? dy.mul(fee).div(BigNumber.from(1e10)) : 0;
      minAmount = dy.gt(dyFee) ? dy.sub(dyFee) : BigNumber.from(0);
    } else {
      minAmount = await this.calculateSwap(domainId, tokenAddress, tokenIndexFrom, tokenIndexTo, amount);
    }

    return minAmount;
  }

  // Should be done after SDK shared
  //   async calculateAmountReceived(
  //     originDomain: string,
  //     destinationDomain: string,
  //     originTokenAddress: string,
  //     amount: BigNumberish,
  //     receiveLocal = false,
  //     checkFastLiquidity = false,
  //   ): Promise<{
  //     amountReceived: BigNumberish;
  //     originSlippage: BigNumberish;
  //     routerFee: BigNumberish;
  //     destinationSlippage: BigNumberish;
  //     isFastPath: boolean;
  //   }> {
  //     const { requestContext, methodContext } = createLoggingContext(this.calculateAmountReceived.name);
  //     const _originTokenAddress = utils.getAddress(originTokenAddress);
  //     this.logger.info("Method start", requestContext, methodContext, {
  //       originDomain,
  //       destinationDomain,
  //       _originTokenAddress,
  //       amount,
  //     });
  //     const [originPool, [canonicalDomain, canonicalId]] = await Promise.all([
  //       this.getPool(originDomain, _originTokenAddress),
  //       this.getCanonicalTokenId(originDomain, _originTokenAddress),
  //     ]);
  //     const isNextAsset = originPool ? utils.getAddress(originPool.local.address) === _originTokenAddress : undefined;

  //     const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
  //     const destinationAssetData = await this.getAssetsDataByDomainAndKey(destinationDomain, key);
  //     if (!destinationAssetData) {
  //       throw new Error("Origin token cannot be bridged to any token on this destination domain");
  //     }

  //     // Swap IFF supplied origin token is an adopted asset
  //     let originAmountReceived = amount;
  //     if (!isNextAsset && originPool) {
  //       originAmountReceived = await this.calculateSwapLocal(
  //         originDomain,
  //         originPool,
  //         _originTokenAddress,
  //         originPool.adopted.index,
  //         originPool.local.index,
  //         amount,
  //       );
  //     }

  //     const originSlippage = BigNumber.from(amount).sub(originAmountReceived).mul(10000).div(amount);
  //     const feeBps = BigNumber.from(+DEFAULT_ROUTER_FEE * 100);
  //     const routerFee = BigNumber.from(originAmountReceived).mul(feeBps).div(10000);

  //     const destinationPool = await this.getPool(destinationDomain, destinationAssetData.local);
  //     const destinationAmount = BigNumber.from(originAmountReceived).sub(routerFee);
  //     let destinationAmountReceived = destinationAmount;

  //     const promises: Promise<any>[] = [];

  //     // Swap IFF desired destination token is an adopted asset
  //     if (!receiveLocal && destinationPool) {
  //       promises.push(
  //         this.calculateSwapLocal(
  //           destinationDomain,
  //           destinationPool,
  //           destinationAssetData.local,
  //           destinationPool.local.index,
  //           destinationPool.adopted.index,
  //           destinationAmount,
  //         ),
  //       );
  //     } else {
  //       promises.push(Promise.resolve(undefined));
  //     }

  //     // Determine if fast liquidity is available (pre-destination-swap amount)
  //     if (checkFastLiquidity) {
  //       promises.push(this.getActiveLiquidity(destinationDomain, destinationAssetData.local));
  //     }

  //     const [destinationAmountReceivedSwap, activeLiquidity] = await Promise.all(promises);
  //     destinationAmountReceived = destinationAmountReceivedSwap ?? destinationAmountReceived;

  //     // Default true, set to false if fast liquidity is not available
  //     let isFastPath = true;
  //     if (activeLiquidity?.length > 0) {
  //       const total_balance: string = activeLiquidity[0].total_balance.toString();
  //       isFastPath = BigNumber.from(this.scientificToBigInt(total_balance)).mul(70).div(100).gt(destinationAmount);
  //     }

  //     const destinationSlippage = BigNumber.from(
  //       destinationAmount
  //         .sub(destinationAmountReceived ?? destinationAmount)
  //         .mul(10000)
  //         .div(destinationAmount),
  //     );

  //     return {
  //       amountReceived: destinationAmountReceived,
  //       originSlippage,
  //       routerFee,
  //       destinationSlippage,
  //       isFastPath,
  //     };
  //   }

  async calculateTokenAmount(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    isDeposit = true,
  ): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string; amounts: string[]; isDeposit: boolean } = {
      domainId,
      tokenAddress,
      amounts,
      isDeposit,
    };
    const response = await axiosPost(`${this.baseUri}/calculateTokenAmount`, params);
    return response.data;
  }

  async calculateRemoveSwapLiquidity(domainId: string, tokenAddress: string, amount: string): Promise<BigNumber[]> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/calculateRemoveSwapLiquidity`, params);
    return response.data;
  }

  async calculateRemoveSwapLiquidityOneToken(
    domainId: string,
    tokenAddress: string,
    amount: string,
    index: number,
  ): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string; amount: string; index: number } = {
      domainId,
      tokenAddress,
      amount,
      index,
    };
    const response = await axiosPost(`${this.baseUri}/calculateRemoveSwapLiquidityOneToken`, params);
    return response.data;
  }

  calculatePriceImpact(
    tokenInputAmount: BigNumber, // assumed to be 18d precision
    tokenOutputAmount: BigNumber,
    virtualPrice = BigNumber.from(10).pow(18),
    isDeposit = true,
  ): BigNumber {
    // We want to multiply the lpTokenAmount by virtual price
    // Deposits: (VP * output) / input - 1
    // Swaps: (1 * output) / input - 1
    // Withdraws: output / (input * VP) - 1
    if (tokenInputAmount.lte(0)) return constants.Zero;

    return isDeposit
      ? virtualPrice.mul(tokenOutputAmount).div(tokenInputAmount).sub(BigNumber.from(10).pow(18))
      : tokenOutputAmount
          .mul(BigNumber.from(10).pow(36))
          .div(tokenInputAmount.mul(virtualPrice))
          .sub(BigNumber.from(10).pow(18));
  }

  async calculateAddLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const params: { domainId: string; tokenAddress: string; amountX: string; amountY: string } = {
      domainId,
      tokenAddress,
      amountX,
      amountY,
    };
    const response = await axiosPost(`${this.baseUri}/calculateAddLiquidityPriceImpact`, params);
    return response.data;
  }

  async calculateRemoveLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const params: { domainId: string; tokenAddress: string; amountX: string; amountY: string } = {
      domainId,
      tokenAddress,
      amountX,
      amountY,
    };
    const response = await axiosPost(`${this.baseUri}/calculateRemoveLiquidityPriceImpact`, params);
    return response.data;
  }

  async calculateSwapPriceImpact(
    domainId: string,
    amountX: string,
    tokenX: string,
    tokenY: string,
  ): Promise<BigNumber> {
    const params: { domainId: string; amountX: string; tokenX: string; tokenY: string } = {
      domainId,
      amountX,
      tokenX,
      tokenY,
    };
    const response = await axiosPost(`${this.baseUri}/calculateSwapPriceImpact`, params);
    return response.data;
  }

  async getTokenPrice(tokenSymbol: string) {
    const response = await axiosGet(`${this.baseUri}/getTokenPrice/:tokenSymbol`, tokenSymbol);
    return response.data;
  }

  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosGet(`${this.baseUri}/getLPTokenAddress/:domainId/tokenAddress:`, params);
    return response.data;
  }

  async getTokenSupply(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosGet(`${this.baseUri}/getTokenSupply/:domainId/:lpTokenAddress`, params);
    return response.data;
  }

  async getTokenUserBalance(domainId: string, tokenAddress: string, userAddress: string): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string; userAddress: string } = {
      domainId,
      tokenAddress,
      userAddress,
    };
    const response = await axiosGet(
      `${this.baseUri}/getTokenUserBalance/:domainId/:lpTokenAddress/:userAddress`,
      params,
    );
    return response.data;
  }

  async getPoolTokenIndex(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const params: { domainId: string; tokenAddress: string; poolTokenAddress: string } = {
      domainId,
      tokenAddress,
      poolTokenAddress,
    };
    const response = await axiosGet(
      `${this.baseUri}/getPoolTokenIndex/:domainId/:tokenAddress/:poolTokenAddress`,
      params,
    );
    return response.data;
  }

  async getPoolTokenDecimals(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const _tokenAddress = utils.getAddress(tokenAddress);
    const _poolTokenAddress = utils.getAddress(poolTokenAddress);
    const pool = await this.getPool(domainId, _tokenAddress);

    if (pool) {
      if (pool.local.address === _poolTokenAddress) return pool.local.decimals;
      else if (pool.adopted.address === _poolTokenAddress) return pool.adopted.decimals;
    }

    return -1;
  }

  async getPoolTokenBalance(
    domainId: string,
    tokenAddress: string,
    poolTokenAddress: string,
    _index?: number,
  ): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string; poolTokenAddress: string; _index?: number } = {
      domainId,
      tokenAddress,
      poolTokenAddress,
      _index,
    };
    const response = await axiosGet(
      `${this.baseUri}/getPoolTokenBalance/:domainId/:tokenAddress/:poolTokenAddress`,
      params,
    );
    return response.data;
  }

  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const params: { domainId: string; tokenAddress: string; index: number } = {
      domainId,
      tokenAddress,
      index,
    };
    const response = await axiosGet(`${this.baseUri}/getPoolTokenAddress/:domainId/:tokenAddress/:index`, params);
    return response.data;
  }

  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosGet(`${this.baseUri}/getVirtualPrice/:domainId/:tokenAddress`, params);
    return response.data;
  }

  //   async getRepresentation(domainId: string, tokenAddress: string): Promise<string> {
  //     const asset = await this.getAssetsDataByDomainAndAddress(domainId, tokenAddress);

  //     if (asset) {
  //       return asset.canonical_domain == domainId ? asset.adopted : asset.local;
  //     }

  //     return constants.AddressZero;
  //   }

  //   async getAdopted(domainId: string, tokenAddress: string): Promise<string> {
  //     const asset = await this.getAssetsDataByDomainAndAddress(domainId, tokenAddress);

  //     if (asset) {
  //       return asset.adopted;
  //     }

  //     return constants.AddressZero;
  //   }

  async getTokenSwapEvents(params: {
    key?: string;
    buyer?: string;
    transactionHash?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    range?: { limit?: number; offset?: number };
  }): Promise<StableSwapExchange[]> {
    const response = await axiosPost(`${this.baseUri}/getVirtualPrice/:domainId/:tokenAddress`, params);
    return response.data;
  }

  getPoolData = memoize(
    async (params: { key?: string; domainId?: string; lpTokenAddress?: string }): Promise<any> => {
      const { key, domainId, lpTokenAddress } = params;

      const poolIdentifier = key ? `key=eq.${key}&` : "";
      const domainIdentifier = domainId ? `domain=eq.${domainId}&` : "";
      const lpTokenIdentifier = lpTokenAddress ? `lp_token=eq.${lpTokenAddress}&` : "";

      const uri = formatUrl(
        this.config.cartographerUrl!,
        "stableswap_pools?",
        poolIdentifier + domainIdentifier + lpTokenIdentifier,
      );
      validateUri(uri);

      return await axiosGetRequest(uri);
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  async addLiquidity(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    minToMint = "0",
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const params: { domainId: string; tokenAddress: string; amounts: string[]; minToMint: string; deadline: number } = {
      domainId,
      tokenAddress,
      amounts,
      minToMint,
      deadline,
    };
    const response = await axiosPost(`${this.baseUri}/addLiquidity`, params);
    return response.data;
  }

  async removeLiquidityOneToken(
    domainId: string,
    tokenAddress: string,
    withdrawTokenAddress: string,
    amount: string,
    minAmount = "0",
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const params: {
      domainId: string;
      tokenAddress: string;
      withdrawTokenAddress: string;
      amount: string;
      minAmount: string;
      deadline: number;
    } = {
      domainId,
      tokenAddress,
      withdrawTokenAddress,
      amount,
      minAmount,
      deadline,
    };
    const response = await axiosPost(`${this.baseUri}/removeLiquidityOneToken`, params);
    return response.data;
  }

  async removeLiquidity(
    domainId: string,
    tokenAddress: string,
    amount: string,
    minAmounts = ["0", "0"],
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const params: {
      domainId: string;
      tokenAddress: string;
      amount: string;
      minAmounts: string[];
      deadline: number;
    } = {
      domainId,
      tokenAddress,
      amount,
      minAmounts,
      deadline,
    };
    const response = await axiosPost(`${this.baseUri}/removeLiquidity`, params);
    return response.data;
  }

  async removeLiquidityImbalance(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    maxBurnAmount = "0",
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const params: {
      domainId: string;
      tokenAddress: string;
      amounts: string[];
      maxBurnAmount: string;
      deadline: number;
    } = {
      domainId,
      tokenAddress,
      amounts,
      maxBurnAmount,
      deadline,
    };
    const response = await axiosPost(`${this.baseUri}/removeLiquidityImbalance`, params);
    return response.data;
  }

  async swap(
    domainId: string,
    tokenAddress: string,
    from: string,
    to: string,
    amount: string,
    minDy = 0,
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const params: {
      domainId: string;
      tokenAddress: string;
      from: string;
      to: string;
      amount: string;
      minDy: number;
      deadline: number;
    } = {
      domainId,
      tokenAddress,
      from,
      to,
      amount,
      minDy,
      deadline,
    };
    const response = await axiosPost(`${this.baseUri}/swap`, params);
    return response.data;
  }

  async getPool(domainId: string, tokenAddress: string): Promise<Pool | undefined> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getPool`, params);
    return response.data;
  }

  async getUserPools(
    domainId: string,
    userAddress: string,
  ): Promise<{ info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[]> {
    const params: { domainId: string; userAddress: string } = {
      domainId,
      userAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getUserPools`, params);
    return response.data;
  }

  async getYieldStatsForDays(
    domainId: string,
    tokenAddress: string,
    unixTimestamp: number,
    days: number,
  ): Promise<
    | {
        totalFeesFormatted: number;
        totalLiquidityFormatted: number;
        totalVolume: BigNumber;
        totalVolumeFormatted: number;
      }
    | undefined
  > {
    if (days <= 0) {
      throw new ParamsInvalid({
        paramsError: "Cannot get yield for less than 1 day",
        days: days,
      });
    }

    const _tokenAddress = utils.getAddress(tokenAddress);

    const pool = await this.getPool(domainId, _tokenAddress);

    if (pool) {
      let volumes;
      if (days == 1) {
        // Get more precise data for last 24 hrs
        volumes = await this.getHourlySwapVolume({
          key: pool.canonicalHash,
          domainId: pool.domainId,
          endTimestamp: unixTimestamp,
          range: { limit: 24 },
        });
      } else {
        volumes = await this.getDailySwapVolume({
          key: pool.canonicalHash,
          domainId: pool.domainId,
          endTimestamp: unixTimestamp,
          range: { limit: days },
        });
      }

      const basisPoints = pool.swapFee;
      const FEE_DENOMINATOR = 1e10;

      let totalVolume = BigNumber.from(0);
      let totalFees = BigNumber.from(0);
      for (const volumeData of volumes) {
        totalVolume = totalVolume.add(utils.parseEther(Number(volumeData.volume).toFixed(18)));
      }
      totalFees = totalVolume.mul(BigNumber.from(basisPoints)).div(BigNumber.from(FEE_DENOMINATOR));

      const reserve0 = BigNumber.from(pool.local.balance).mul(BigNumber.from(10).pow(18 - pool.local.decimals));
      const reserve1 = BigNumber.from(pool.adopted.balance).mul(BigNumber.from(10).pow(18 - pool.adopted.decimals));
      const totalLiquidity = reserve0.add(reserve1);
      const totalLiquidityFormatted = Number(utils.formatUnits(totalLiquidity, 18));
      const totalFeesFormatted = Number(utils.formatUnits(totalFees, 18));
      const totalVolumeFormatted = Number(utils.formatUnits(totalVolume, 18));

      // all data formatted as decimal 18
      return {
        totalFeesFormatted,
        totalLiquidityFormatted,
        totalVolume,
        totalVolumeFormatted,
      };
    }

    return;
  }

  async getHourlySwapVolume(params: {
    key?: string;
    domainId?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getHourlySwapVolume`, params);
    return response.data;
  }

  async getDailySwapVolume(params: {
    key?: string;
    domainId?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getDailySwapVolume`, params);
    return response.data;
  }

  calculateYield(
    feesEarned: number,
    principal: number,
    days: number,
  ): {
    apr: number;
    apy: number;
  } {
    const rate = feesEarned / principal;
    const period = 365 / days;
    const apr = rate * period;
    const apy = (1 + rate) ** period - 1;
    return { apr, apy };
  }

  async getYieldData(domainId: string, tokenAddress: string, days: number = 1) {
    const params = {
      domainId,
      tokenAddress,
      days,
    };
    const response = await axiosPost(`${this.baseUri}/getYieldData`, params);
    return response.data;
  }

  getLiquidityMiningAprPerPool = memoize(
    async (totalTokens: number, totalBlocks: number, numPools: number, tokenSymbol: string, poolTVL: number) => {
      // Numbers for Optimism:
      //  totalTokens = 250_000
      //  totalBlocks = 657_436 // 3 months
      //  numPools = 2
      const blocksPerDay = 7160;
      const period = 365 / (totalBlocks / blocksPerDay);
      const tokenPrice = await this.getTokenPrice(tokenSymbol);
      const tokenValuePerPool = (totalTokens / numPools) * tokenPrice;
      const rate = tokenValuePerPool / poolTVL;
      const apr = rate * period;

      return apr;
    },
    { promise: true },
  );
}
