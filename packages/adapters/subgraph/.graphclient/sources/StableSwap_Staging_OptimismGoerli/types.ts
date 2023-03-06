// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapStagingOptimismGoerliTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  stagingoptimismgoerli_swap_BigDecimal: any;
  BigInt: any;
  stagingoptimismgoerli_swap_Bytes: any;
};

export type stagingoptimismgoerli_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingoptimismgoerli_swap_Block_height = {
  hash?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type stagingoptimismgoerli_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingoptimismgoerli_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingoptimismgoerli_swap_Bytes'];
};

export type stagingoptimismgoerli_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_PooledToken_filter>>>;
};

export type stagingoptimismgoerli_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingoptimismgoerli_swap_systemInfo?: Maybe<stagingoptimismgoerli_swap_SystemInfo>;
  stagingoptimismgoerli_swap_systemInfos: Array<stagingoptimismgoerli_swap_SystemInfo>;
  stagingoptimismgoerli_swap_pooledToken?: Maybe<stagingoptimismgoerli_swap_PooledToken>;
  stagingoptimismgoerli_swap_pooledTokens: Array<stagingoptimismgoerli_swap_PooledToken>;
  stagingoptimismgoerli_swap_stableSwap?: Maybe<stagingoptimismgoerli_swap_StableSwap>;
  stagingoptimismgoerli_swap_stableSwaps: Array<stagingoptimismgoerli_swap_StableSwap>;
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents: Array<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents: Array<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapExchange?: Maybe<stagingoptimismgoerli_swap_StableSwapExchange>;
  stagingoptimismgoerli_swap_stableSwapExchanges: Array<stagingoptimismgoerli_swap_StableSwapExchange>;
  stagingoptimismgoerli_swap_swapDailyVolume?: Maybe<stagingoptimismgoerli_swap_SwapDailyVolume>;
  stagingoptimismgoerli_swap_swapDailyVolumes: Array<stagingoptimismgoerli_swap_SwapDailyVolume>;
  stagingoptimismgoerli_swap_swapHourlyVolume?: Maybe<stagingoptimismgoerli_swap_SwapHourlyVolume>;
  stagingoptimismgoerli_swap_swapHourlyVolumes: Array<stagingoptimismgoerli_swap_SwapHourlyVolume>;
  stagingoptimismgoerli_swap_swapWeeklyVolume?: Maybe<stagingoptimismgoerli_swap_SwapWeeklyVolume>;
  stagingoptimismgoerli_swap_swapWeeklyVolumes: Array<stagingoptimismgoerli_swap_SwapWeeklyVolume>;
  stagingoptimismgoerli_swap_stableSwapEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapEvent>;
  stagingoptimismgoerli_swap_stableSwapEvents: Array<stagingoptimismgoerli_swap_StableSwapEvent>;
  stagingoptimismgoerli_swap_swapTradeVolume?: Maybe<stagingoptimismgoerli_swap_SwapTradeVolume>;
  stagingoptimismgoerli_swap_swapTradeVolumes: Array<stagingoptimismgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli_swap__meta?: Maybe<stagingoptimismgoerli_swap__Meta_>;
};


export type Querystagingoptimismgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swap__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
};

export type stagingoptimismgoerli_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['stagingoptimismgoerli_swap_Bytes'];
  canonicalId?: Maybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken?: Maybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<stagingoptimismgoerli_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<stagingoptimismgoerli_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<stagingoptimismgoerli_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<stagingoptimismgoerli_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<stagingoptimismgoerli_swap_SwapWeeklyVolume>>;
};


export type stagingoptimismgoerli_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>;
};


export type stagingoptimismgoerli_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>;
};


export type stagingoptimismgoerli_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>;
};


export type stagingoptimismgoerli_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>;
};


export type stagingoptimismgoerli_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>;
};

export type stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent = stagingoptimismgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  provider: Scalars['stagingoptimismgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_swap_Bytes'];
};

export type stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  tokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
};

export type stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'lpTokenAmount'
  | 'balances'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingoptimismgoerli_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_swap_Bytes'];
};

export type stagingoptimismgoerli_swap_StableSwapEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>>>;
};

export type stagingoptimismgoerli_swap_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingoptimismgoerli_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  buyer: Scalars['stagingoptimismgoerli_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  fee: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_swap_Bytes'];
};

export type stagingoptimismgoerli_swap_StableSwapExchange_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  boughtId?: InputMaybe<Scalars['BigInt']>;
  boughtId_not?: InputMaybe<Scalars['BigInt']>;
  boughtId_gt?: InputMaybe<Scalars['BigInt']>;
  boughtId_lt?: InputMaybe<Scalars['BigInt']>;
  boughtId_gte?: InputMaybe<Scalars['BigInt']>;
  boughtId_lte?: InputMaybe<Scalars['BigInt']>;
  boughtId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  boughtId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensBought?: InputMaybe<Scalars['BigInt']>;
  tokensBought_not?: InputMaybe<Scalars['BigInt']>;
  tokensBought_gt?: InputMaybe<Scalars['BigInt']>;
  tokensBought_lt?: InputMaybe<Scalars['BigInt']>;
  tokensBought_gte?: InputMaybe<Scalars['BigInt']>;
  tokensBought_lte?: InputMaybe<Scalars['BigInt']>;
  tokensBought_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensBought_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldId?: InputMaybe<Scalars['BigInt']>;
  soldId_not?: InputMaybe<Scalars['BigInt']>;
  soldId_gt?: InputMaybe<Scalars['BigInt']>;
  soldId_lt?: InputMaybe<Scalars['BigInt']>;
  soldId_gte?: InputMaybe<Scalars['BigInt']>;
  soldId_lte?: InputMaybe<Scalars['BigInt']>;
  soldId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensSold?: InputMaybe<Scalars['BigInt']>;
  tokensSold_not?: InputMaybe<Scalars['BigInt']>;
  tokensSold_gt?: InputMaybe<Scalars['BigInt']>;
  tokensSold_lt?: InputMaybe<Scalars['BigInt']>;
  tokensSold_gte?: InputMaybe<Scalars['BigInt']>;
  tokensSold_lte?: InputMaybe<Scalars['BigInt']>;
  tokensSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokensSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>>>;
};

export type stagingoptimismgoerli_swap_StableSwapExchange_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'buyer'
  | 'boughtId'
  | 'tokensBought'
  | 'soldId'
  | 'tokensSold'
  | 'balances'
  | 'fee'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent = stagingoptimismgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  provider: Scalars['stagingoptimismgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_swap_Bytes'];
};

export type stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  tokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
};

export type stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'lpTokenAmount'
  | 'balances'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingoptimismgoerli_swap_StableSwap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  key?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  initialA?: InputMaybe<Scalars['BigInt']>;
  initialA_not?: InputMaybe<Scalars['BigInt']>;
  initialA_gt?: InputMaybe<Scalars['BigInt']>;
  initialA_lt?: InputMaybe<Scalars['BigInt']>;
  initialA_gte?: InputMaybe<Scalars['BigInt']>;
  initialA_lte?: InputMaybe<Scalars['BigInt']>;
  initialA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureA?: InputMaybe<Scalars['BigInt']>;
  futureA_not?: InputMaybe<Scalars['BigInt']>;
  futureA_gt?: InputMaybe<Scalars['BigInt']>;
  futureA_lt?: InputMaybe<Scalars['BigInt']>;
  futureA_gte?: InputMaybe<Scalars['BigInt']>;
  futureA_lte?: InputMaybe<Scalars['BigInt']>;
  futureA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialATime?: InputMaybe<Scalars['BigInt']>;
  initialATime_not?: InputMaybe<Scalars['BigInt']>;
  initialATime_gt?: InputMaybe<Scalars['BigInt']>;
  initialATime_lt?: InputMaybe<Scalars['BigInt']>;
  initialATime_gte?: InputMaybe<Scalars['BigInt']>;
  initialATime_lte?: InputMaybe<Scalars['BigInt']>;
  initialATime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialATime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureATime?: InputMaybe<Scalars['BigInt']>;
  futureATime_not?: InputMaybe<Scalars['BigInt']>;
  futureATime_gt?: InputMaybe<Scalars['BigInt']>;
  futureATime_lt?: InputMaybe<Scalars['BigInt']>;
  futureATime_gte?: InputMaybe<Scalars['BigInt']>;
  futureATime_lte?: InputMaybe<Scalars['BigInt']>;
  futureATime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  futureATime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapFee?: InputMaybe<Scalars['BigInt']>;
  swapFee_not?: InputMaybe<Scalars['BigInt']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFee?: InputMaybe<Scalars['BigInt']>;
  adminFee_not?: InputMaybe<Scalars['BigInt']>;
  adminFee_gt?: InputMaybe<Scalars['BigInt']>;
  adminFee_lt?: InputMaybe<Scalars['BigInt']>;
  adminFee_gte?: InputMaybe<Scalars['BigInt']>;
  adminFee_lte?: InputMaybe<Scalars['BigInt']>;
  adminFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pooledTokens?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_Bytes']>>;
  tokenPrecisionMultipliers?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenPrecisionMultipliers_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  adminFees_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  virtualPrice?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_not?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_gt?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_lt?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_gte?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_lte?: InputMaybe<Scalars['BigInt']>;
  virtualPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  virtualPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  events_?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>>>;
};

export type stagingoptimismgoerli_swap_StableSwap_orderBy =
  | 'id'
  | 'isActive'
  | 'key'
  | 'canonicalId'
  | 'domain'
  | 'swapPool'
  | 'lpToken'
  | 'initialA'
  | 'futureA'
  | 'initialATime'
  | 'futureATime'
  | 'swapFee'
  | 'adminFee'
  | 'pooledTokens'
  | 'tokenPrecisionMultipliers'
  | 'balances'
  | 'adminFees'
  | 'virtualPrice'
  | 'invariant'
  | 'lpTokenSupply'
  | 'events'
  | 'exchanges'
  | 'hourlyVolumes'
  | 'dailyVolumes'
  | 'weeklyVolumes';

export type Subscription = {
  stagingoptimismgoerli_swap_systemInfo?: Maybe<stagingoptimismgoerli_swap_SystemInfo>;
  stagingoptimismgoerli_swap_systemInfos: Array<stagingoptimismgoerli_swap_SystemInfo>;
  stagingoptimismgoerli_swap_pooledToken?: Maybe<stagingoptimismgoerli_swap_PooledToken>;
  stagingoptimismgoerli_swap_pooledTokens: Array<stagingoptimismgoerli_swap_PooledToken>;
  stagingoptimismgoerli_swap_stableSwap?: Maybe<stagingoptimismgoerli_swap_StableSwap>;
  stagingoptimismgoerli_swap_stableSwaps: Array<stagingoptimismgoerli_swap_StableSwap>;
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents: Array<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents: Array<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_swap_stableSwapExchange?: Maybe<stagingoptimismgoerli_swap_StableSwapExchange>;
  stagingoptimismgoerli_swap_stableSwapExchanges: Array<stagingoptimismgoerli_swap_StableSwapExchange>;
  stagingoptimismgoerli_swap_swapDailyVolume?: Maybe<stagingoptimismgoerli_swap_SwapDailyVolume>;
  stagingoptimismgoerli_swap_swapDailyVolumes: Array<stagingoptimismgoerli_swap_SwapDailyVolume>;
  stagingoptimismgoerli_swap_swapHourlyVolume?: Maybe<stagingoptimismgoerli_swap_SwapHourlyVolume>;
  stagingoptimismgoerli_swap_swapHourlyVolumes: Array<stagingoptimismgoerli_swap_SwapHourlyVolume>;
  stagingoptimismgoerli_swap_swapWeeklyVolume?: Maybe<stagingoptimismgoerli_swap_SwapWeeklyVolume>;
  stagingoptimismgoerli_swap_swapWeeklyVolumes: Array<stagingoptimismgoerli_swap_SwapWeeklyVolume>;
  stagingoptimismgoerli_swap_stableSwapEvent?: Maybe<stagingoptimismgoerli_swap_StableSwapEvent>;
  stagingoptimismgoerli_swap_stableSwapEvents: Array<stagingoptimismgoerli_swap_StableSwapEvent>;
  stagingoptimismgoerli_swap_swapTradeVolume?: Maybe<stagingoptimismgoerli_swap_SwapTradeVolume>;
  stagingoptimismgoerli_swap_swapTradeVolumes: Array<stagingoptimismgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli_swap__meta?: Maybe<stagingoptimismgoerli_swap__Meta_>;
};


export type Subscriptionstagingoptimismgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swap__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_swap_Block_height>;
};

export type stagingoptimismgoerli_swap_SwapDailyVolume = stagingoptimismgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_swap_BigDecimal'];
};

export type stagingoptimismgoerli_swap_SwapDailyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapDailyVolume_filter>>>;
};

export type stagingoptimismgoerli_swap_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_swap_SwapHourlyVolume = stagingoptimismgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_swap_BigDecimal'];
};

export type stagingoptimismgoerli_swap_SwapHourlyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapHourlyVolume_filter>>>;
};

export type stagingoptimismgoerli_swap_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_swap_SwapTradeVolume = {
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_swap_BigDecimal'];
};

export type stagingoptimismgoerli_swap_SwapTradeVolume_filter = {
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapTradeVolume_filter>>>;
};

export type stagingoptimismgoerli_swap_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_swap_SwapWeeklyVolume = stagingoptimismgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_swap_BigDecimal'];
};

export type stagingoptimismgoerli_swap_SwapWeeklyVolume_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  stableSwap?: InputMaybe<Scalars['String']>;
  stableSwap_not?: InputMaybe<Scalars['String']>;
  stableSwap_gt?: InputMaybe<Scalars['String']>;
  stableSwap_lt?: InputMaybe<Scalars['String']>;
  stableSwap_gte?: InputMaybe<Scalars['String']>;
  stableSwap_lte?: InputMaybe<Scalars['String']>;
  stableSwap_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_not_in?: InputMaybe<Array<Scalars['String']>>;
  stableSwap_contains?: InputMaybe<Scalars['String']>;
  stableSwap_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains?: InputMaybe<Scalars['String']>;
  stableSwap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with?: InputMaybe<Scalars['String']>;
  stableSwap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  stableSwap_?: InputMaybe<stagingoptimismgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SwapWeeklyVolume_filter>>>;
};

export type stagingoptimismgoerli_swap_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type stagingoptimismgoerli_swap_SystemInfo_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  exchangeCount?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_not?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_gt?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_lt?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_gte?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_lte?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapCount?: InputMaybe<Scalars['BigInt']>;
  swapCount_not?: InputMaybe<Scalars['BigInt']>;
  swapCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SystemInfo_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingoptimismgoerli_swap_SystemInfo_filter>>>;
};

export type stagingoptimismgoerli_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type stagingoptimismgoerli_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingoptimismgoerli_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingoptimismgoerli_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingoptimismgoerli_swap__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  stagingoptimismgoerli_swap_systemInfo: InContextSdkMethod<Query['stagingoptimismgoerli_swap_systemInfo'], Querystagingoptimismgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_systemInfos: InContextSdkMethod<Query['stagingoptimismgoerli_swap_systemInfos'], Querystagingoptimismgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_pooledToken: InContextSdkMethod<Query['stagingoptimismgoerli_swap_pooledToken'], Querystagingoptimismgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_pooledTokens: InContextSdkMethod<Query['stagingoptimismgoerli_swap_pooledTokens'], Querystagingoptimismgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwap: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwap'], Querystagingoptimismgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwaps: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwaps'], Querystagingoptimismgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent'], Querystagingoptimismgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents'], Querystagingoptimismgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent'], Querystagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents'], Querystagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapExchange: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapExchange'], Querystagingoptimismgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapExchanges: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapExchanges'], Querystagingoptimismgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapDailyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapDailyVolume'], Querystagingoptimismgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapDailyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapDailyVolumes'], Querystagingoptimismgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapHourlyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapHourlyVolume'], Querystagingoptimismgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapHourlyVolumes'], Querystagingoptimismgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapWeeklyVolume'], Querystagingoptimismgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapWeeklyVolumes'], Querystagingoptimismgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapEvent: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapEvent'], Querystagingoptimismgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapEvents: InContextSdkMethod<Query['stagingoptimismgoerli_swap_stableSwapEvents'], Querystagingoptimismgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapTradeVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapTradeVolume'], Querystagingoptimismgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapTradeVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swap_swapTradeVolumes'], Querystagingoptimismgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli_swap__meta: InContextSdkMethod<Query['stagingoptimismgoerli_swap__meta'], Querystagingoptimismgoerli_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingoptimismgoerli_swap_systemInfo: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_systemInfo'], Subscriptionstagingoptimismgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_systemInfos: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_systemInfos'], Subscriptionstagingoptimismgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_pooledToken: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_pooledToken'], Subscriptionstagingoptimismgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_pooledTokens: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_pooledTokens'], Subscriptionstagingoptimismgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwap: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwap'], Subscriptionstagingoptimismgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwaps: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwaps'], Subscriptionstagingoptimismgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapAddLiquidityEvent'], Subscriptionstagingoptimismgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapAddLiquidityEvents'], Subscriptionstagingoptimismgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvent'], Subscriptionstagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapRemoveLiquidityEvents'], Subscriptionstagingoptimismgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapExchange: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapExchange'], Subscriptionstagingoptimismgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapExchanges: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapExchanges'], Subscriptionstagingoptimismgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapDailyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapDailyVolume'], Subscriptionstagingoptimismgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapDailyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapDailyVolumes'], Subscriptionstagingoptimismgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapHourlyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapHourlyVolume'], Subscriptionstagingoptimismgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapHourlyVolumes'], Subscriptionstagingoptimismgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapWeeklyVolume'], Subscriptionstagingoptimismgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapWeeklyVolumes'], Subscriptionstagingoptimismgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapEvent'], Subscriptionstagingoptimismgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_stableSwapEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_stableSwapEvents'], Subscriptionstagingoptimismgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapTradeVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapTradeVolume'], Subscriptionstagingoptimismgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swap_swapTradeVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap_swapTradeVolumes'], Subscriptionstagingoptimismgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli_swap__meta: InContextSdkMethod<Subscription['stagingoptimismgoerli_swap__meta'], Subscriptionstagingoptimismgoerli_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
