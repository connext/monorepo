import { providers, BigNumber, BigNumberish, constants } from "ethers";
import { Logger, ChainData, StableSwapExchange } from "@connext/nxtp-utils";

import type { SdkConfig, Pool, Options } from "./sdk-types";
import { axiosPost } from "./mockable";
import { SdkShared } from "./sdkShared";
import { PriceFeed } from "./lib/priceFeed";

/**
 * @classdesc Class that wraps all async SdkPool functions with requests to hosted server.
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

    return (this._instance = new SdkPool(_config, logger, _chainData || new Map<string, ChainData>()));
  }

  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  async calculateSwap(
    domainId: string,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: BigNumberish,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/calculateSwap`, params);

    return BigNumber.from(response.data);
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

  async calculateAmountReceived(
    originDomain: string,
    destinationDomain: string,
    originTokenAddress: string,
    amount: BigNumberish,
    receiveLocal = false,
    checkFastLiquidity = false,
  ): Promise<{
    amountReceived: BigNumberish;
    originSlippage: BigNumberish;
    routerFee: BigNumberish;
    destinationSlippage: BigNumberish;
    isFastPath: boolean;
  }> {
    const params = {
      originDomain,
      destinationDomain,
      originTokenAddress,
      amount,
      receiveLocal,
      checkFastLiquidity,
    };

    const response = await axiosPost(`${this.baseUri}/calculateAmountReceived`, params);
    const data = response.data;

    return {
      amountReceived: BigNumber.from(data.amountReceived),
      originSlippage: BigNumber.from(data.originSlippage),
      routerFee: BigNumber.from(data.routerFee),
      destinationSlippage: BigNumber.from(data.destinationSlippage),
      isFastPath: data.isFastPath,
    };
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

  async calculateTokenAmount(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    isDeposit = true,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amounts,
      isDeposit,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/calculateTokenAmount`, params);

    return BigNumber.from(response.data);
  }

  async calculateRemoveSwapLiquidity(
    domainId: string,
    tokenAddress: string,
    amount: string,
    options?: Options,
  ): Promise<BigNumber[]> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amount,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/calculateRemoveSwapLiquidity`, params);

    return response.data.map((amount: string) => BigNumber.from(amount));
  }

  async calculateRemoveSwapLiquidityOneToken(
    domainId: string,
    tokenAddress: string,
    amount: string,
    index: number,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amount,
      index,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/calculateRemoveSwapLiquidityOneToken`, params);

    return BigNumber.from(response.data);
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

    return response.data ? BigNumber.from(response.data) : undefined;
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

    return response.data ? BigNumber.from(response.data) : undefined;
  }

  async calculateSwapPriceImpact(
    domainId: string,
    amountX: string,
    tokenX: string,
    tokenY: string,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      amountX,
      tokenX,
      tokenY,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/calculateSwapPriceImpact`, params);

    return BigNumber.from(response.data);
  }

  async getTokenPrice(tokenSymbol: string) {
    const params: { tokenSymbol: string } = {
      tokenSymbol,
    };
    const response = await axiosPost(`${this.baseUri}/getTokenPrice`, params);
    return response.data;
  }

  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getLPTokenAddress`, params);
    return response.data;
  }

  async getTokenSupply(domainId: string, tokenAddress: string, options?: Options): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
      originProviderUrl: this.config.chains[domainId].providers?.[0],
    };
    const params = {
      domainId,
      tokenAddress,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/getTokenSupply`, params);

    return BigNumber.from(response.data);
  }

  async getTokenUserBalance(
    domainId: string,
    tokenAddress: string,
    userAddress: string,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
      originProviderUrl: this.config.chains[domainId].providers?.[0],
    };
    const params = {
      domainId,
      tokenAddress,
      userAddress,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/getTokenUserBalance`, params);

    return BigNumber.from(response.data);
  }

  async getPoolTokenIndex(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const params: { domainId: string; tokenAddress: string; poolTokenAddress: string } = {
      domainId,
      tokenAddress,
      poolTokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getPoolTokenIndex`, params);
    return response.data;
  }

  async getPoolTokenDecimals(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const params: { domainId: string; tokenAddress: string; poolTokenAddress: string } = {
      domainId,
      tokenAddress,
      poolTokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getPoolTokenDecimals`, params);
    return response.data;
  }

  async getPoolTokenBalance(
    domainId: string,
    tokenAddress: string,
    poolTokenAddress: string,
    _index?: number,
    options?: Options,
  ): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      poolTokenAddress,
      _index,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/getPoolTokenBalance`, params);

    return BigNumber.from(response.data);
  }

  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const params: { domainId: string; tokenAddress: string; index: number } = {
      domainId,
      tokenAddress,
      index,
    };
    const response = await axiosPost(`${this.baseUri}/getPoolTokenAddress`, params);
    return response.data;
  }

  async getVirtualPrice(domainId: string, tokenAddress: string, options?: Options): Promise<BigNumber> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/getVirtualPrice`, params);

    return BigNumber.from(response.data);
  }

  async getRepresentation(domainId: string, tokenAddress: string): Promise<string> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getRepresentation`, params);
    return response.data;
  }

  async getAdopted(domainId: string, tokenAddress: string): Promise<string> {
    const params: { domainId: string; tokenAddress: string } = {
      domainId,
      tokenAddress,
    };
    const response = await axiosPost(`${this.baseUri}/getAdopted`, params);
    return response.data;
  }

  async getTokenSwapEvents(params: {
    key?: string;
    buyer?: string;
    transactionHash?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    range?: { limit?: number; offset?: number };
  }): Promise<StableSwapExchange[]> {
    const response = await axiosPost(`${this.baseUri}/getTokenSwapEvents`, params);
    return response.data;
  }

  async getPoolData(params: { key?: string; domainId?: string; lpTokenAddress?: string }): Promise<any> {
    const response = await axiosPost(`${this.baseUri}/getPoolData`, params);
    return response.data;
  }

  async addLiquidity(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    minToMint = "0",
    deadline = this.getDefaultDeadline(),
    options?: Options,
  ): Promise<providers.TransactionRequest> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amounts,
      minToMint,
      deadline,
      options: _options,
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
    options?: Options,
  ): Promise<providers.TransactionRequest> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      withdrawTokenAddress,
      amount,
      minAmount,
      deadline,
      options: _options,
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
    options?: Options,
  ): Promise<providers.TransactionRequest> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amount,
      minAmounts,
      deadline,
      options: _options,
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
    options?: Options,
  ): Promise<providers.TransactionRequest> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      amounts,
      maxBurnAmount,
      deadline,
      options: _options,
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
    options?: Options,
  ): Promise<providers.TransactionRequest> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
    };
    const params = {
      domainId,
      tokenAddress,
      from,
      to,
      amount,
      minDy,
      deadline,
      options: _options,
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
    const data = response.data;

    if (data) {
      data.balances = data.balances.map((balance: string) => BigNumber.from(balance));
      data.invariant = BigNumber.from(data.invariant);
      data.initialA = BigNumber.from(data.initialA);
      data.futureA = BigNumber.from(data.futureA);
      data.currentA = BigNumber.from(data.currentA);

      if (data.local && data.local.balance) {
        data.local.balance = BigNumber.from(data.local.balance);
      }

      if (data.adopted && data.adopted.balance) {
        data.adopted.balance = BigNumber.from(data.adopted.balance);
      }
    }

    return data;
  }

  async getUserPools(
    domainId: string,
    userAddress: string,
    options?: Options,
  ): Promise<{ info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[]> {
    const _options = options ?? {
      chains: this.config.chains,
      signerAddress: this.config.signerAddress,
      originProviderUrl: this.config.chains[domainId].providers?.[0],
    };
    const params = {
      domainId,
      userAddress,
      options: _options,
    };
    const response = await axiosPost(`${this.baseUri}/getUserPools`, params);

    return response.data.map((data: any) => {
      const info = data.info;
      info.balances = info.balances.map((balance: string) => BigNumber.from(balance));
      info.invariant = BigNumber.from(info.invariant);
      info.initialA = BigNumber.from(info.initialA);
      info.futureA = BigNumber.from(info.futureA);
      info.currentA = BigNumber.from(info.currentA);

      if (info.local && info.local.balance) {
        info.local.balance = BigNumber.from(info.local.balance);
      }

      if (info.adopted && info.adopted.balance) {
        info.adopted.balance = BigNumber.from(info.adopted.balance);
      }

      return {
        ...data,
        info,
        lpTokenBalance: BigNumber.from(data.lpTokenBalance),
        poolTokenBalances: data.poolTokenBalances.map((balance: string) => BigNumber.from(balance)),
      };
    });
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
    const params: { domainId: string; tokenAddress: string; unixTimestamp: number; days: number } = {
      domainId,
      tokenAddress,
      unixTimestamp,
      days,
    };
    const response = await axiosPost(`${this.baseUri}/getYieldStatsForDays`, params);
    const data = response.data;

    if (data && data.totalVolume) {
      data.totalVolume = BigNumber.from(data.totalVolume);
    }

    return data;
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

  async getYieldData(domainId: string, tokenAddress: string, days = 1) {
    const params = {
      domainId,
      tokenAddress,
      days,
    };
    const response = await axiosPost(`${this.baseUri}/getYieldData`, params);
    return response.data;
  }

  async getLiquidityMiningAprPerPool(
    totalTokens: number,
    totalBlocks: number,
    numPools: number,
    tokenSymbol: string,
    poolTVL: number,
  ) {
    const params = {
      totalTokens: totalTokens,
      totalBlocks: totalBlocks,
      numPools: numPools,
      tokenSymbol,
      poolTVL,
    };
    const response = await axiosPost(`${this.baseUri}/getLiquidityMiningAprPerPool`, params);
    return response.data;
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
}
