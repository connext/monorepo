/* eslint-disable @typescript-eslint/no-inferrable-types */
import { providers, BigNumber, BigNumberish, constants, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  formatUrl,
  StableSwapExchange,
  DEFAULT_ROUTER_FEE,
} from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";
import memoize from "memoizee";

import { SdkConfig, getConfig } from "./config";
import { SignerAddressMissing, ParamsInvalid } from "./lib/errors";
import { validateUri, axiosGetRequest } from "./lib/helpers";
import { Pool, PoolAsset, AssetData } from "./interfaces";
import { PriceFeed } from "./lib/priceFeed";
import { SdkShared } from "./sdkShared";

/**
 * @classdesc SDK class encapsulating stableswap pool functions.
 *
 * @remarks This class will either interact with internal StableSwapFacet pools or external StableSwap pools
 *      depending on which type of pool is being used for each asset.
 *      Note: SDK currently only supports internal StableSwapFacet pools.
 *
 */
export class SdkPool extends SdkShared {
  private static _instance: SdkPool;
  private readonly priceFeed: PriceFeed;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
    this.priceFeed = new PriceFeed();
  }

  /**
   * Create a singleton instance of the SdkPool class.
   *
   * @param _config - SdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) Logging severity level.
   * @param _config.network - (optional) Blockchain environment to interact with.
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { SdkPool } from "@connext/sdk";
   *
   * const config = {
   *   "chains": {
   *     "6648936": {
   *       "providers": ["https://rpc.ankr.com/eth"]
   *     },
   *     "1869640809": {
   *       "providers": ["https://mainnet.optimism.io"]
   *     },
   *     "1886350457": {
   *       "providers": ["https://polygon-rpc.com"]
   *     },
   *   },
   *   "signerAddress": "<wallet_address>",
   * }
   *
   * const sdkPool = await SdkPool.create(config);
   * ```
   */
  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkPool> {
    const { nxtpConfig, chainData } = await getConfig(_config, contractDeployments, _chainData);

    const logger = _logger
      ? _logger.child({ name: "SdkPool" })
      : new Logger({ name: "SdkPool", level: nxtpConfig.logLevel });

    return this._instance || (this._instance = new SdkPool(nxtpConfig, logger, chainData));
  }

  // ------------------- Utils ------------------- //

  /**
   * Set to 1 hour from current time.
   *
   * @returns The default deadline, in unix time.
   */
  getDefaultDeadline(): number {
    const now = new Date();
    return now.setHours(now.getHours() + 1);
  }

  /**
   * Calculates the amount of tokens received on a swap.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param tokenIndexFrom - The index of the token to sell.
   * @param tokenIndexTo - The index of the token to buy.
   * @param amount - The number of tokens to sell, in the "From" token's native decimal precision.
   * @returns Minimum amount received, in the "To" token's native decimal precision.
   */
  async calculateSwap(
    domainId: string,
    tokenAddress: string,
    tokenIndexFrom: number,
    tokenIndexTo: number,
    amount: BigNumberish,
  ): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const minAmount = await connextContract.calculateSwap(key, tokenIndexFrom, tokenIndexTo, amount);

    return minAmount;
  }

  /**
   * Calculates the estimated amount received on the destination domain for a bridge transaction.
   *
   * @param originDomain - The domain ID of the origin chain.
   * @param destinationDomain - The domain ID of the destination chain.
   * @param originTokenAddress - The address of the token to be bridged from origin.
   * @param amount - The amount of the origin token to bridge, in the origin token's native decimal precision.
   * @param receiveLocal - (optional) Whether the desired destination token is the local asset ("nextAsset").
   * @returns Estimated amount received for local/adopted assets, if applicable, in their native decimal precisions.
   */
  async calculateAmountReceived(
    originDomain: string,
    destinationDomain: string,
    originTokenAddress: string,
    amount: BigNumberish,
    receiveLocal = false,
  ): Promise<{
    amountReceived: BigNumberish;
    originSlippage: BigNumberish;
    routerFee: BigNumberish;
    destinationSlippage: BigNumberish;
    isFastPath: boolean;
  }> {
    const { requestContext, methodContext } = createLoggingContext(this.calculateAmountReceived.name);
    const _originTokenAddress = utils.getAddress(originTokenAddress);
    this.logger.info("Method start", requestContext, methodContext, {
      originDomain,
      destinationDomain,
      _originTokenAddress,
      amount,
    });

    const [originPool, [canonicalDomain, canonicalId], isNextAsset] = await Promise.all([
      this.getPool(originDomain, _originTokenAddress),
      this.getCanonicalTokenId(originDomain, _originTokenAddress),
      this.isNextAsset(_originTokenAddress),
    ]);

    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const destinationAssetData = await this.getAssetsDataByDomainAndKey(destinationDomain, key);
    if (!destinationAssetData) {
      throw new Error("Origin token cannot be bridged to any token on this destination domain");
    }

    // Swap IFF supplied origin token is an adopted asset
    let originAmountReceived = amount;
    if (!isNextAsset && originPool) {
      originAmountReceived = await this.calculateSwap(
        originDomain,
        _originTokenAddress,
        originPool.adopted.index,
        originPool.local.index,
        amount,
      );
    }

    const originSlippage = BigNumber.from(amount).sub(originAmountReceived).mul(10000).div(amount);
    const feeBps = BigNumber.from(+DEFAULT_ROUTER_FEE * 100);
    const routerFee = BigNumber.from(originAmountReceived).mul(feeBps).div(10000);

    const destinationPool = await this.getPool(destinationDomain, destinationAssetData.local);
    const destinationAmount = BigNumber.from(originAmountReceived).sub(routerFee);
    let destinationAmountReceived = destinationAmount;

    const promises: Promise<any>[] = [];

    // Determine if fast liquidity is available (pre-destination-swap amount)
    promises.push(this.getActiveLiquidity(destinationDomain, destinationAssetData.local));

    // Swap IFF desired destination token is an adopted asset
    if (!receiveLocal && destinationPool) {
      promises.push(
        this.calculateSwap(
          destinationDomain,
          destinationAssetData.local,
          destinationPool.local.index,
          destinationPool.adopted.index,
          destinationAmount,
        ),
      );
    }

    const [activeLiquidity, destinationAmountReceivedSwap] = await Promise.all(promises);
    destinationAmountReceived = destinationAmountReceivedSwap ?? destinationAmountReceived;
    let isFastPath = false;
    if (activeLiquidity.length > 0) {
      isFastPath = BigNumber.from(activeLiquidity[0].total_balance).mul(70).div(100).gt(destinationAmount);
    }
    const destinationSlippage = BigNumber.from(
      destinationAmount.sub(destinationAmountReceived).mul(10000).div(destinationAmount),
    );

    return {
      amountReceived: destinationAmountReceived,
      originSlippage,
      routerFee,
      destinationSlippage,
      isFastPath,
    };
  }

  /**
   * Calculates the minimum LP token amount from deposits or withdrawals.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amounts - The amounts of the tokens to deposit/withdraw, in the correct index order and
   * in each token's native precision.
   * @param isDeposit - (optional) Whether this is a deposit or withdrawal.
   * @returns Minimum LP tokens received, in 1e18 precision.
   */
  async calculateTokenAmount(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    isDeposit = true,
  ): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const amount = await connextContract.calculateSwapTokenAmount(key, amounts, isDeposit);

    return amount;
  }

  /**
   * Calculates the amounts of underlying tokens returned.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amount - The amount of the LP token to burn on withdrawal.
   * @returns Array containing amount of each underlying token returned, in correct index order.
   */
  async calculateRemoveSwapLiquidity(domainId: string, tokenAddress: string, amount: string): Promise<BigNumber[]> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const amounts = await connextContract.calculateRemoveSwapLiquidity(key, amount);

    return amounts;
  }

  /**
   * Calculates the price impact depending on whether liquidity is being deposited or withdrawn.
   *
   * @param tokenInputAmount - The amount of inbound tokens (LP tokens for withdrawals, total tokens for deposits,
   * dx for swaps), in 1e18 precision.
   * @param tokenOutputAmount - The amount of outbound tokens (total tokens for withdrawals, LP tokens for deposits,
   * dy for swaps), in 1e18 precision.
   * @param virtualPrice - (optional) The current virtual price of the pool.
   * @param isDeposit - (optional) Whether this is a deposit or withdrawal.
   * @returns The price impact.
   */
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

  /**
   * Calculates the price impact of adding liquidity to a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amountX - The amount of token X (index 0 of the pool), in the token's native precision.
   * @param amountY - The amount of token Y (index 1 of the pool), in the token's native precision.
   * @returns Price impact for adding liquidity, in 1e18 precision.
   */
  async calculateAddLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, _tokenAddress),
      this.calculateTokenAmount(domainId, _tokenAddress, [amountX, amountY]),
    ]);

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, _tokenAddress);
    if (pool) {
      let decimals = [pool.local.decimals, pool.adopted.decimals];
      decimals = pool.local.index == 0 ? decimals : decimals.reverse();
      const totalAmount = [amountX, amountY].reduce(
        (sum, amount, index) => sum.add(BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - decimals[index]))),
        BigNumber.from("0"),
      );
      return this.calculatePriceImpact(totalAmount, lpTokenAmount, virtualPrice);
    }

    return;
  }

  /**
   * Returns the price impact of removing liquidity from a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amountX - The amount of asset X (index 0 of the pool), in the token's native precision.
   * @param amountY - The amount of asset Y (index 1 of the pool), in the token's native precision.
   * @returns The price impact for removing liquidity, in 1e18 precision.
   */
  async calculateRemoveLiquidityPriceImpact(
    domainId: string,
    tokenAddress: string,
    amountX: string,
    amountY: string,
  ): Promise<BigNumber | undefined> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [virtualPrice, lpTokenAmount] = await Promise.all([
      this.getVirtualPrice(domainId, _tokenAddress),
      this.calculateTokenAmount(domainId, _tokenAddress, [amountX, amountY], false),
    ]);

    // Normalize to 18 decimals
    const pool = await this.getPool(domainId, _tokenAddress);
    if (pool) {
      let decimals = [pool.local.decimals, pool.adopted.decimals];
      decimals = pool.local.index == 0 ? decimals : decimals.reverse();
      const totalAmount = [amountX, amountY].reduce(
        (sum, amount, index) => sum.add(BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - decimals[index]))),
        BigNumber.from("0"),
      );
      return this.calculatePriceImpact(lpTokenAmount, totalAmount, virtualPrice, false);
    }

    return;
  }

  /**
   * Calculates the price impact of a swap.
   *
   * @param domainId - The domain id of the pool.
   * @param amountX - The amount of tokens to swap, in the token's native precision.
   * @param tokenX - The address of the token to swap from.
   * @param tokenY - The address of the token to swap to.
   * @returns The price impact for swapping, in 1e18 precision.
   */
  async calculateSwapPriceImpact(
    domainId: string,
    amountX: string,
    tokenX: string,
    tokenY: string,
  ): Promise<BigNumber> {
    const _tokenX = utils.getAddress(tokenX);
    const _tokenY = utils.getAddress(tokenY);

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, tokenX),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);

    const [tokenXIndex, tokenYIndex, tokenXDecimals, tokenYDecimals] = await Promise.all([
      this.getPoolTokenIndex(domainId, _tokenX, _tokenX),
      this.getPoolTokenIndex(domainId, _tokenX, _tokenY),
      this.getPoolTokenDecimals(domainId, _tokenX, _tokenX),
      this.getPoolTokenDecimals(domainId, _tokenX, _tokenY),
    ]);

    const amountY = await connextContract.calculateSwap(key, tokenXIndex, tokenYIndex, amountX);

    return this.calculatePriceImpact(
      BigNumber.from(amountX).mul(BigNumber.from(10).pow(18 - tokenXDecimals)),
      amountY.mul(BigNumber.from(10).pow(18 - tokenYDecimals)),
      BigNumber.from(10).pow(18),
      false,
    );
  }

  /**
   * Fetches the current price of a token.
   *
   * @param tokenSymbol - The symbol for the token.
   * @returns The price of the token.
   */
  async getTokenPrice(tokenSymbol: string) {
    const price = await this.priceFeed.getPriceByTokenSymbol(tokenSymbol);

    return price;
  }

  // ------------------- Read Operations ------------------- //

  /**
   * Reads the LP token address of a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The LP token address.
   */
  async getLPTokenAddress(domainId: string, tokenAddress: string): Promise<string> {
    const _tokenAddress = utils.getAddress(tokenAddress);
    const pool = await this.getPool(domainId, _tokenAddress);

    if (pool) {
      return pool.lpTokenAddress;
    }

    return constants.AddressZero;
  }

  /**
   * Reads the ERC20 token supply.
   *
   * @param domainId - The domain id of the ERC20 token.
   * @param tokenAddress - The address of the ERC20 token.
   * @returns The balance of the address.
   */
  async getTokenSupply(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const erc20Contract = await this.getERC20(domainId, _tokenAddress);
    const amount = erc20Contract.totalSupply();

    return amount;
  }

  /**
   * Reads the ERC20 token balance of an address.
   *
   * @param domainId - The domain id of the ERC20 token.
   * @param tokenAddress - The address of the ERC20 token.
   * @param userAddress - The address to get the balance of.
   * @returns The balance of the address.
   */
  async getTokenUserBalance(domainId: string, tokenAddress: string, userAddress: string): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const erc20Contract = await this.getERC20(domainId, _tokenAddress);
    const balance = erc20Contract.balanceOf(userAddress);

    return balance;
  }

  /**
   * Reads the index of a token in a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param poolTokenAddress - The address of the token in the pool to get the index for.
   * @returns The index of the specified token in the pool or -1 if not found.
   */
  async getPoolTokenIndex(domainId: string, tokenAddress: string, poolTokenAddress: string): Promise<number> {
    const _tokenAddress = utils.getAddress(tokenAddress);
    const _poolTokenAddress = utils.getAddress(poolTokenAddress);
    const pool = await this.getPool(domainId, _tokenAddress);

    if (pool) {
      if (pool.local.address === _poolTokenAddress) return pool.local.index;
      else if (pool.adopted.address === _poolTokenAddress) return pool.adopted.index;
    }

    return -1;
  }

  /**
   * Reads the decimal precision of a token in a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param poolTokenAddress - The address of the token in the pool to get the precision for.
   * @returns The decimal precision of the specified token in the pool or -1 if not found.
   */
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

  /**
   * Reads the balance of a pool token.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param poolTokenAddress - The address of the pool token.
   * @returns The balance of the pool token.
   */
  async getPoolTokenBalance(
    domainId: string,
    tokenAddress: string,
    poolTokenAddress: string,
    _index?: number,
  ): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [connextContract, index, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      _index ?? this.getPoolTokenIndex(domainId, _tokenAddress, poolTokenAddress),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const balance = await connextContract.getSwapTokenBalance(key, index);

    return balance;
  }

  /**
   * Reads the token address of a specified index in a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param index - The index of the token in the pool.
   * @returns The address of the specified token in the pool.
   */
  async getPoolTokenAddress(domainId: string, tokenAddress: string, index: number) {
    const _tokenAddress = utils.getAddress(tokenAddress);
    const pool = await this.getPool(domainId, _tokenAddress);

    if (pool) {
      if (pool.local.index === index) return pool.local.address;
      else if (pool.adopted.index === index) return pool.adopted.address;
    }

    return constants.AddressZero;
  }

  /**
   * Reads the virtual price of a pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param index - The index of the token in the pool.
   * @returns The virtual price, scaled to the pool's decimal precision (10^18).
   */
  async getVirtualPrice(domainId: string, tokenAddress: string): Promise<BigNumber> {
    const _tokenAddress = utils.getAddress(tokenAddress);

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const price = await connextContract.getSwapVirtualPrice(key);

    return price;
  }

  /**
   * Reads the representation asset of the pool. The representation asset is the adopted
   * asset on the canonical domain and local (nextAsset) otherwise.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The representation asset or zero address for unregistered assets.
   */
  async getRepresentation(domainId: string, tokenAddress: string): Promise<string> {
    const asset = await this.getAssetsDataByDomainAndAddress(domainId, tokenAddress);

    if (asset) {
      return asset.canonical_domain == domainId ? asset.adopted : asset.local;
    }

    return constants.AddressZero;
  }

  /**
   * Reads the adopted asset of the pool.
   *
   * @param domainId - The domain id of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns The adopted asset or zero address for unregistered assets.
   */
  async getAdopted(domainId: string, tokenAddress: string): Promise<string> {
    const asset = await this.getAssetsDataByDomainAndAddress(domainId, tokenAddress);

    if (asset) {
      return asset.adopted;
    }

    return constants.AddressZero;
  }

  /**
   * Retrieve the "TokenSwap" events for StableSwap pools.
   *
   * @param params - (optional) Parameters object.
   * @param params.key - (optional) Canonical hash (key) of the pool.
   * @param params.buyer - (optional) The address executing the swap transaction.
   * @param params.transactionHash - (optional) The transaction hash of the swap.
   * @param params.range - (optional) The object with limit and offset options.
   * @param params.range.limit - (optional) The number of results to get.
   * @param params.range.offset - (optional) The offset in the returned data to start from.
   * @returns The array of objects containing TokenSwap event data in the form of:
   *
   * ```ts
   * {
   *   "id": "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f-0x5f9c237682049e4efe7f4bc4bfb9bd5174fccb9e86241254ea3e369515943e59-4",
   *   "pool_id": "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
   *   "domain": "9991",
   *   "buyer": "0xba05138df56ea700435448fba4a8cf9a716ed252",
   *   "bought_id": 1,
   *   "sold_id": 0,
   *   "tokens_sold": 9.8e-17,
   *   "tokens_bought": 9.7e-17,
   *   "block_number": 29904034,
   *   "transaction_hash": "0x5f9c237682049e4efe7f4bc4bfb9bd5174fccb9e86241254ea3e369515943e59",
   *   "timestamp": 1671493053
   * }
   * ```
   */
  async getTokenSwapEvents(params: {
    key?: string;
    buyer?: string;
    transactionHash?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    range?: { limit?: number; offset?: number };
  }): Promise<StableSwapExchange[]> {
    const { key, buyer, transactionHash, startTimestamp, endTimestamp, range } = params;

    const poolIdentifier = key ? `pool_id=eq.${key}&` : "";
    const buyerIdentifier = buyer ? `buyer=eq.${buyer.toLowerCase()}&` : "";
    const transactionHashIdentifier = transactionHash ? `transaction_hash=eq.${transactionHash.toLowerCase()}&` : "";

    const searchIdentifier = poolIdentifier + buyerIdentifier + transactionHashIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const startTimestampIdentifier = startTimestamp ? `timestamp=gt.${startTimestamp}&` : "";
    const endTimestampIdentifier = endTimestamp ? `timestamp=lt.${endTimestamp}&` : "";

    const rangeIdentifier = `limit=${limit}&offset=${offset}&`;
    const orderIdentifier = `order=timestamp.desc`;

    const uri = formatUrl(
      this.config.cartographerUrl!,
      "stableswap_exchanges?",
      searchIdentifier + startTimestampIdentifier + endTimestampIdentifier + rangeIdentifier + orderIdentifier,
    );
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  /**
   * Fetches a list of StableSwap Pools data that match filter criteria.
   *
   * @param params - (optional) Parameters object.
   * @param params.key - (optional) Canonical hash (key) of the pool.
   * @param params.domainId - (optional) The address executing the swap transaction.
   * @param params.lpTokenAddress - (optional) The address of the pool's LP token.
   * @returns The array of objects containing TokenSwap event data in the form of:
   *
   * ```ts
   * {
   *   "key": "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
   *   "domain": "9991",
   *   "is_active": true,
   *   "lp_token": "0x0d01021c481921cfc93959819dfe8096a46bef3c",
   *   "initial_a": 20000,
   *   "future_a": 20000,
   *   "initial_a_time": 0,
   *   "future_a_time": 0,
   *   "swap_fee": "4000000",
   *   "admin_fee": "0",
   *   "pooled_tokens": [
   *     "0x1e5341e4b7ed5d0680d9066aac0396f0b1bd1e69",
   *     "0xfd2ab41e083c75085807c4a65c0a14fdd93d55a9"
   *   ],
   *   "token_precision_multipliers": [
   *     "1",
   *     "1"
   *   ],
   *   "pool_token_decimals": [
   *     18,
   *     18
   *   ],
   *   "balances": [
   *     "32093905049107612",
   *     "7968595774217088"
   *   ],
   *   "virtual_price": "1000163379884851791",
   *   "invariant": "40006038276095726",
   *   "lp_token_supply": "39999503161875010"
   * }
   * ```
   */
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

  // ------------------- Pool Operations ------------------- //

  /**
   * Prepares the transaction request for adding liquidity to a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amounts - The amounts of the tokens to swap.
   * @param minToMint - (optional) The minimum acceptable amount of LP tokens to mint.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async addLiquidity(
    domainId: string,
    tokenAddress: string,
    amounts: string[],
    minToMint = "0",
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amounts, deadline });

    const _tokenAddress = utils.getAddress(tokenAddress);

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const txRequest = await connextContract.populateTransaction.addSwapLiquidity(key, amounts, minToMint, deadline);

    this.logger.info(`${this.addLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  /**
   * Returns the transaction request for removing liquidity from a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param amount - The amount of the token to swap.
   * @param minAmounts - (optional) The minimum acceptable amounts of each token to burn.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async removeLiquidity(
    domainId: string,
    tokenAddress: string,
    amount: string,
    minAmounts = ["0", "0"],
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.removeLiquidity.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, amount, deadline });

    const _tokenAddress = utils.getAddress(tokenAddress);

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId]] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);
    const txRequest = await connextContract.populateTransaction.removeSwapLiquidity(key, amount, minAmounts, deadline);

    this.logger.info(`${this.removeLiquidity.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  /**
   * Returns the transaction request for performing a swap in a pool.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param from - The address of the token to sell.
   * @param to - The address of the token to buy.
   * @param amount - The amount of the selling token to swap.
   * @param minDy - (optional) The minimum amount of the buying token to receive.
   * @param deadline - (optional) The deadline for the swap.
   * @returns providers.TransactionRequest object.
   */
  async swap(
    domainId: string,
    tokenAddress: string,
    from: string,
    to: string,
    amount: string,
    minDy = 0,
    deadline = this.getDefaultDeadline(),
  ): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.swap.name);
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      tokenAddress,
      from,
      to,
      amount,
      deadline,
    });

    const _tokenAddress = utils.getAddress(tokenAddress);

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const [connextContract, [canonicalDomain, canonicalId], tokenIndexFrom, tokenIndexTo] = await Promise.all([
      this.getConnext(domainId),
      this.getCanonicalTokenId(domainId, _tokenAddress),
      this.getPoolTokenIndex(domainId, _tokenAddress, from),
      this.getPoolTokenIndex(domainId, _tokenAddress, to),
    ]);
    const key = this.calculateCanonicalKey(canonicalDomain, canonicalId);

    const txRequest = await connextContract.populateTransaction.swap(
      key,
      tokenIndexFrom,
      tokenIndexTo,
      amount,
      minDy,
      deadline,
    );

    this.logger.info(`${this.swap.name} transaction created `, requestContext, methodContext);

    return txRequest;
  }

  // ------------------- Pool Data ------------------- //

  /**
   * Retrieves the StableSwap Pool details for a given asset.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @returns Pool object of which the token is an underlying asset.
   */
  getPool = memoize(
    async (domainId: string, tokenAddress: string): Promise<Pool | undefined> => {
      const { requestContext, methodContext } = createLoggingContext(this.getPool.name);
      this.logger.info("Method start", requestContext, methodContext, {
        domainId,
        tokenAddress,
      });

      const _tokenAddress = utils.getAddress(tokenAddress);

      // Fetch asset data
      const assetsData = await this.getAssetsData();
      const asset = assetsData.find((assetData) => {
        return (
          domainId === assetData.domain &&
          (utils.getAddress(assetData.local) == _tokenAddress || utils.getAddress(assetData.adopted) == _tokenAddress)
        );
      });

      if (!asset) {
        this.logger.debug(`No asset data found for token ${_tokenAddress} on domain ${domainId}`);
        return;
      }

      // Fetch pool data
      const poolDataResults = await this.getPoolData({ key: asset.key, domainId: domainId });
      if (!poolDataResults || poolDataResults.length == 0) {
        this.logger.debug(`No Pool for token ${_tokenAddress} on domain ${domainId}`);
        return;
      }
      const poolData = poolDataResults[0]; // there should only be one pool

      // Construct pool object
      const assetXAddress = utils.getAddress(String(poolData.pooled_tokens[0]));
      const assetYAddress = utils.getAddress(String(poolData.pooled_tokens[1]));
      const checkSummedLocalAsset = utils.getAddress(asset.local);

      const assetX: PoolAsset = {
        address: assetXAddress,
        name: this.chainData.get(domainId)?.assetId[assetXAddress].name ?? "",
        symbol: this.chainData.get(domainId)?.assetId[assetXAddress].symbol ?? "",
        decimals: poolData.pool_token_decimals[0],
        index: 0,
        balance: poolData.balances[0],
      };

      const assetY: PoolAsset = {
        address: assetYAddress,
        name: this.chainData.get(domainId)?.assetId[assetYAddress].name ?? "",
        symbol: this.chainData.get(domainId)?.assetId[assetYAddress].symbol ?? "",
        decimals: poolData.pool_token_decimals[1],
        index: 1,
        balance: poolData.balances[1],
      };

      const pool: Pool = {
        domainId: domainId,
        name: checkSummedLocalAsset == assetX.address ? `${assetY.symbol} Pool` : `${assetX.symbol} Pool`,
        symbol:
          checkSummedLocalAsset == assetX.address
            ? `${assetY.symbol}-${assetX.symbol}`
            : `${assetX.symbol}-${assetY.symbol}`,
        local: checkSummedLocalAsset == assetX.address ? assetX : assetY,
        adopted: checkSummedLocalAsset == assetX.address ? assetY : assetX,
        lpTokenAddress: poolData.lp_token,
        canonicalHash: poolData.key,
        swapFee: poolData.swap_fee,
        adminFee: poolData.admin_fee,
      };

      return pool;
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Retrieves the Pools that a user has LP tokens for.
   *
   * @param domainId - The domain ID of the pool.
   * @param userAddress - The address of the user to get the pools for.
   * @returns Array of Pool objects.
   */
  async getUserPools(
    domainId: string,
    userAddress: string,
  ): Promise<{ info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[]> {
    const { requestContext, methodContext } = createLoggingContext(this.swap.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, userAddress });

    const result: { info: Pool; lpTokenBalance: BigNumber; poolTokenBalances: BigNumber[] }[] = [];

    const assetsData: AssetData[] = await this.getAssetsData();

    await Promise.all(
      Object.values(assetsData).map(async (data) => {
        if (data.domain === domainId) {
          const pool = await this.getPool(domainId, data.local);
          if (pool) {
            const lpTokenUserBalance = await this.getTokenUserBalance(domainId, pool.lpTokenAddress, userAddress);
            const adoptedTokenUserBalance = await this.getTokenUserBalance(domainId, pool.adopted.address, userAddress);
            const localTokenUserBalance = await this.getTokenUserBalance(domainId, pool.local.address, userAddress);

            if (lpTokenUserBalance.gt(0)) {
              result.push({
                info: pool,
                lpTokenBalance: lpTokenUserBalance,
                poolTokenBalances: [adoptedTokenUserBalance, localTokenUserBalance],
              });
            }
          } else {
            this.logger.info("No pool for asset", requestContext, methodContext, { data });
          }
        }
      }),
    );

    return result;
  }

  /**
   * Calculates the fees, liquidity, and volume of a pool for the days prior to the specified unix time.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of local or adopted token.
   * @param unixTimestamp - The unix time to start the look back from.
   * @param days - The number of days to look back.
   * @returns Object containing fees, liquidity, and volume, in 1e18 precision.
   */
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
    const { requestContext, methodContext } = createLoggingContext(this.getYieldStatsForDays.name);
    this.logger.info("Method start", requestContext, methodContext, { domainId, tokenAddress, days });
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

  /**
   * Calculates apr and apy.
   *
   * @param feesEarned - The total fees earned in the period.
   * @param principal - The principal amount at the start of the period.
   * @param days - The number of days to look back.
   * @returns Object containing apr and apy.
   */
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

  /**
   * Calculates the apr, apy, and volume of a pool for the last specified number of days.
   *
   * @param domainId - The domain ID of the pool.
   * @param tokenAddress - The address of the user to get the pools for.
   * @param days - (optional) The number of days to look back.
   * @returns Object containing apr, apy. Also fees, liquidity, and volume in 1e18 precision.
   */
  getYieldData = memoize(
    async (
      domainId: string,
      tokenAddress: string,
      days: number = 1,
    ): Promise<
      | {
          fees: number;
          liquidity: number;
          apr: number;
          apy: number;
          volume: BigNumber;
          volumeFormatted: number;
        }
      | undefined
    > => {
      const _tokenAddress = utils.getAddress(tokenAddress);

      const provider = this.getProvider(domainId);
      const block = await provider.getBlock("latest");
      const endTimestamp = block.timestamp;

      const yieldStats = await this.getYieldStatsForDays(domainId, _tokenAddress, endTimestamp, days);

      if (yieldStats) {
        const {
          totalFeesFormatted: feesEarnedToday,
          totalLiquidityFormatted: totalLiquidity,
          totalVolume,
          totalVolumeFormatted,
        } = yieldStats;

        const { apr, apy } = this.calculateYield(feesEarnedToday, totalLiquidity, days);

        return {
          fees: feesEarnedToday,
          liquidity: totalLiquidity,
          apr: Math.max(apr, 0),
          apy: Math.max(apy, 0),
          volume: totalVolume,
          volumeFormatted: totalVolumeFormatted,
        };
      }

      return;
    },
    { promise: true, length: false, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Calculates the apr, apy, and volume of a pool for the last specified number of days.
   *
   * @param totalTokens - The number of reward tokens to be distributed.
   * @param totalBlocks - The total number of blocks to distribute over.
   * @param numPools - The number of pools in the domain for distribution.
   * @param tokenSymbol - The token symbol for price data.
   * @param poolTVL - The current pool TVL.
   * @returns The apr calculated from inputs.
   */
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

  /**
   * Fetches hourly StableSwap volume.
   *
   * @param params - (optional) Parameters object.
   * @param params.key - (optional) The canonical hash (key) of the pool.
   * @param params.domainId - (optional) The domain ID.
   * @param params.startTimestamp - (optional) The lower bound unix timestamp, inclusive.
   * @param params.endTimestamp - (optional) The upper bound unix timestamp, inclusive.
   * @param params.range - (optional) The object with limit and offset options.
   * @param params.range.limit - (optional) The number of results to get.
   * @param params.range.offset - (optional) The offset in the returned data to start from.
   * @returns The object containing hourly swap volume data, in the form of:
   *
   * ```ts
   * {
   *   "pool_id": "0x292e02936c5b0f88fab7f755caac58d92cd10b13f484cd46f6dd45468cb23e3f",
   *   "domain": "9991",
   *   "swap_hour": "2022-12-19T23:00:00+00:00",
   *   "volume": 0.000099882586128429500000000000000000,
   *   "swap_count": 2,
   * }
   * ```
   */
  getHourlySwapVolume = memoize(
    async (params: {
      key?: string;
      domainId?: string;
      startTimestamp?: number;
      endTimestamp?: number;
      range?: { limit?: number; offset?: number };
    }): Promise<any> => {
      const { key, domainId, startTimestamp, endTimestamp, range } = params;

      const poolIdentifier = key ? `pool_id=eq.${key.toLowerCase()}&` : "";
      const domainIdentifier = domainId ? `domain=eq.${domainId}&` : "";

      const limit = range?.limit ? range.limit : 10;
      const offset = range?.offset ? range.offset : 0;

      const millis = 1000;
      const start = startTimestamp ? new Date(startTimestamp * millis).toISOString() : undefined;
      const end = endTimestamp ? new Date(endTimestamp * millis).toISOString() : undefined;
      const startTimestampIdentifier = start ? `swap_hour=gt.${start}&` : "";
      const endTimestampIdentifier = end ? `swap_hour=lt.${end}&` : "";

      const rangeIdentifier = `limit=${limit}&offset=${offset}&`;
      const orderIdentifier = `order=swap_hour.desc`;

      const uri = formatUrl(
        this.config.cartographerUrl!,
        "hourly_swap_volume?",
        poolIdentifier +
          startTimestampIdentifier +
          endTimestampIdentifier +
          domainIdentifier +
          rangeIdentifier +
          orderIdentifier,
      );
      validateUri(uri);

      return await axiosGetRequest(uri);
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );

  /**
   * Fetches daily StableSwap volume.
   *
   * @param params - (optional) Parameters object.
   * @param params.key - (optional) The canonical hash (key) of the pool.
   * @param params.domainId - (optional) The domain ID.
   * @param params.startTimestamp - (optional) The lower bound unix timestamp, inclusive.
   * @param params.endTimestamp - (optional) The upper bound unix timestamp, inclusive.
   * @param params.range - (optional) The object with limit and offset options.
   * @param params.range.limit - (optional) The number of results to get.
   * @param params.range.offset - (optional) The offset in the returned data to start from.
   * @returns The object containing daily swap volume data, in the form of:
   *
   * ```ts
   * {
   *   "pool_id": "0x12acadfa38ab02479ae587196a9043ee4d8bf52fcb96b7f8d2ba240f03bcd08a",
   *   "domain": "1634886255",
   *   "swap_day": "2022-12-22",
   *   "volume": 0.05993787732028597,
   *   "swap_count": 6
   * }
   * ```
   */
  getDailySwapVolume = memoize(
    async (params: {
      key?: string;
      domainId?: string;
      startTimestamp?: number;
      endTimestamp?: number;
      range?: { limit?: number; offset?: number };
    }): Promise<any> => {
      const { key, domainId, startTimestamp, endTimestamp, range } = params;

      const poolIdentifier = key ? `pool_id=eq.${key.toLowerCase()}&` : "";
      const domainIdentifier = domainId ? `domain=eq.${domainId}&` : "";

      const limit = range?.limit ? range.limit : 10;
      const offset = range?.offset ? range.offset : 0;

      const millis = 1000;
      const start = startTimestamp ? new Date(startTimestamp * millis).toISOString() : undefined;
      const end = endTimestamp ? new Date(endTimestamp * millis).toISOString() : undefined;
      const startTimestampIdentifier = start ? `swap_day=gt.${start}&` : "";
      const endTimestampIdentifier = end ? `swap_day=lt.${end}&` : "";

      const rangeIdentifier = `limit=${limit}&offset=${offset}&`;
      const orderIdentifier = `order=swap_day.desc`;

      const uri = formatUrl(
        this.config.cartographerUrl!,
        "daily_swap_volume?",
        poolIdentifier +
          startTimestampIdentifier +
          endTimestampIdentifier +
          domainIdentifier +
          rangeIdentifier +
          orderIdentifier,
      );
      validateUri(uri);

      return await axiosGetRequest(uri);
    },
    { promise: true, maxAge: 5 * 60 * 1000 }, // 5 min
  );
}
