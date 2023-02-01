// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapStagingArbitrumGoerliTypes {
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
  stagingarbitrumgoerli_swap_BigDecimal: any;
  BigInt: any;
  stagingarbitrumgoerli_swap_Bytes: any;
};

export type stagingarbitrumgoerli_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingarbitrumgoerli_swap_Block_height = {
  hash?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type stagingarbitrumgoerli_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingarbitrumgoerli_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingarbitrumgoerli_swap_Bytes'];
};

export type stagingarbitrumgoerli_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingarbitrumgoerli_swap_systemInfo?: Maybe<stagingarbitrumgoerli_swap_SystemInfo>;
  stagingarbitrumgoerli_swap_systemInfos: Array<stagingarbitrumgoerli_swap_SystemInfo>;
  stagingarbitrumgoerli_swap_pooledToken?: Maybe<stagingarbitrumgoerli_swap_PooledToken>;
  stagingarbitrumgoerli_swap_pooledTokens: Array<stagingarbitrumgoerli_swap_PooledToken>;
  stagingarbitrumgoerli_swap_stableSwap?: Maybe<stagingarbitrumgoerli_swap_StableSwap>;
  stagingarbitrumgoerli_swap_stableSwaps: Array<stagingarbitrumgoerli_swap_StableSwap>;
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapExchange?: Maybe<stagingarbitrumgoerli_swap_StableSwapExchange>;
  stagingarbitrumgoerli_swap_stableSwapExchanges: Array<stagingarbitrumgoerli_swap_StableSwapExchange>;
  stagingarbitrumgoerli_swap_swapDailyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapDailyVolume>;
  stagingarbitrumgoerli_swap_swapDailyVolumes: Array<stagingarbitrumgoerli_swap_SwapDailyVolume>;
  stagingarbitrumgoerli_swap_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapHourlyVolume>;
  stagingarbitrumgoerli_swap_swapHourlyVolumes: Array<stagingarbitrumgoerli_swap_SwapHourlyVolume>;
  stagingarbitrumgoerli_swap_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swap_swapWeeklyVolumes: Array<stagingarbitrumgoerli_swap_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swap_stableSwapEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapEvent>;
  stagingarbitrumgoerli_swap_stableSwapEvents: Array<stagingarbitrumgoerli_swap_StableSwapEvent>;
  stagingarbitrumgoerli_swap_swapTradeVolume?: Maybe<stagingarbitrumgoerli_swap_SwapTradeVolume>;
  stagingarbitrumgoerli_swap_swapTradeVolumes: Array<stagingarbitrumgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli_swap__meta?: Maybe<stagingarbitrumgoerli_swap__Meta_>;
};


export type Querystagingarbitrumgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swap__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
};

export type stagingarbitrumgoerli_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['stagingarbitrumgoerli_swap_Bytes'];
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken?: Maybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<stagingarbitrumgoerli_swap_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<stagingarbitrumgoerli_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<stagingarbitrumgoerli_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<stagingarbitrumgoerli_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<stagingarbitrumgoerli_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<stagingarbitrumgoerli_swap_SwapWeeklyVolume>>;
};


export type stagingarbitrumgoerli_swap_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_filter>;
};


export type stagingarbitrumgoerli_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_filter>;
};


export type stagingarbitrumgoerli_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_filter>;
};


export type stagingarbitrumgoerli_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_filter>;
};


export type stagingarbitrumgoerli_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_filter>;
};


export type stagingarbitrumgoerli_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_filter>;
};

export type stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent = stagingarbitrumgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_swap_Bytes'];
};

export type stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_swap_Bytes'];
};

export type stagingarbitrumgoerli_swap_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  buyer: Scalars['stagingarbitrumgoerli_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_swap_Bytes'];
};

export type stagingarbitrumgoerli_swap_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_StableSwapExchange_orderBy =
  | 'id'
  | 'stableSwap'
  | 'buyer'
  | 'boughtId'
  | 'tokensBought'
  | 'soldId'
  | 'tokensSold'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent = stagingarbitrumgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_swap_Bytes'];
};

export type stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_swap_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
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
  pooledTokens?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pooledTokens_?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_filter>;
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
  events_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_StableSwap_orderBy =
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
  stagingarbitrumgoerli_swap_systemInfo?: Maybe<stagingarbitrumgoerli_swap_SystemInfo>;
  stagingarbitrumgoerli_swap_systemInfos: Array<stagingarbitrumgoerli_swap_SystemInfo>;
  stagingarbitrumgoerli_swap_pooledToken?: Maybe<stagingarbitrumgoerli_swap_PooledToken>;
  stagingarbitrumgoerli_swap_pooledTokens: Array<stagingarbitrumgoerli_swap_PooledToken>;
  stagingarbitrumgoerli_swap_stableSwap?: Maybe<stagingarbitrumgoerli_swap_StableSwap>;
  stagingarbitrumgoerli_swap_stableSwaps: Array<stagingarbitrumgoerli_swap_StableSwap>;
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_swap_stableSwapExchange?: Maybe<stagingarbitrumgoerli_swap_StableSwapExchange>;
  stagingarbitrumgoerli_swap_stableSwapExchanges: Array<stagingarbitrumgoerli_swap_StableSwapExchange>;
  stagingarbitrumgoerli_swap_swapDailyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapDailyVolume>;
  stagingarbitrumgoerli_swap_swapDailyVolumes: Array<stagingarbitrumgoerli_swap_SwapDailyVolume>;
  stagingarbitrumgoerli_swap_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapHourlyVolume>;
  stagingarbitrumgoerli_swap_swapHourlyVolumes: Array<stagingarbitrumgoerli_swap_SwapHourlyVolume>;
  stagingarbitrumgoerli_swap_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swap_swapWeeklyVolumes: Array<stagingarbitrumgoerli_swap_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swap_stableSwapEvent?: Maybe<stagingarbitrumgoerli_swap_StableSwapEvent>;
  stagingarbitrumgoerli_swap_stableSwapEvents: Array<stagingarbitrumgoerli_swap_StableSwapEvent>;
  stagingarbitrumgoerli_swap_swapTradeVolume?: Maybe<stagingarbitrumgoerli_swap_SwapTradeVolume>;
  stagingarbitrumgoerli_swap_swapTradeVolumes: Array<stagingarbitrumgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli_swap__meta?: Maybe<stagingarbitrumgoerli_swap__Meta_>;
};


export type Subscriptionstagingarbitrumgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_swap_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swap__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_swap_Block_height>;
};

export type stagingarbitrumgoerli_swap_SwapDailyVolume = stagingarbitrumgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_swap_BigDecimal'];
};

export type stagingarbitrumgoerli_swap_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_swap_SwapHourlyVolume = stagingarbitrumgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_swap_BigDecimal'];
};

export type stagingarbitrumgoerli_swap_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_swap_SwapTradeVolume = {
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_swap_BigDecimal'];
};

export type stagingarbitrumgoerli_swap_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_swap_SwapWeeklyVolume = stagingarbitrumgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_swap_BigDecimal'];
};

export type stagingarbitrumgoerli_swap_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type stagingarbitrumgoerli_swap_SystemInfo_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumgoerli_swap_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type stagingarbitrumgoerli_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingarbitrumgoerli_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingarbitrumgoerli_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingarbitrumgoerli_swap__Block_;
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
  stagingarbitrumgoerli_swap_systemInfo: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_systemInfo'], Querystagingarbitrumgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_systemInfos: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_systemInfos'], Querystagingarbitrumgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_pooledToken: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_pooledToken'], Querystagingarbitrumgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_pooledTokens: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_pooledTokens'], Querystagingarbitrumgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwap: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwap'], Querystagingarbitrumgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwaps: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwaps'], Querystagingarbitrumgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent'], Querystagingarbitrumgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents'], Querystagingarbitrumgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent'], Querystagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents'], Querystagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapExchange: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapExchange'], Querystagingarbitrumgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapExchanges: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapExchanges'], Querystagingarbitrumgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapDailyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapDailyVolume'], Querystagingarbitrumgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapDailyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapDailyVolumes'], Querystagingarbitrumgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapHourlyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapHourlyVolume'], Querystagingarbitrumgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapHourlyVolumes'], Querystagingarbitrumgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapWeeklyVolume'], Querystagingarbitrumgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapWeeklyVolumes'], Querystagingarbitrumgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapEvent'], Querystagingarbitrumgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_stableSwapEvents'], Querystagingarbitrumgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapTradeVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapTradeVolume'], Querystagingarbitrumgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapTradeVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swap_swapTradeVolumes'], Querystagingarbitrumgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli_swap__meta: InContextSdkMethod<Query['stagingarbitrumgoerli_swap__meta'], Querystagingarbitrumgoerli_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingarbitrumgoerli_swap_systemInfo: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_systemInfo'], Subscriptionstagingarbitrumgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_systemInfos: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_systemInfos'], Subscriptionstagingarbitrumgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_pooledToken: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_pooledToken'], Subscriptionstagingarbitrumgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_pooledTokens: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_pooledTokens'], Subscriptionstagingarbitrumgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwap: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwap'], Subscriptionstagingarbitrumgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwaps: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwaps'], Subscriptionstagingarbitrumgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvent'], Subscriptionstagingarbitrumgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapAddLiquidityEvents'], Subscriptionstagingarbitrumgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvent'], Subscriptionstagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEvents'], Subscriptionstagingarbitrumgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapExchange: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapExchange'], Subscriptionstagingarbitrumgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapExchanges: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapExchanges'], Subscriptionstagingarbitrumgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapDailyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapDailyVolume'], Subscriptionstagingarbitrumgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapDailyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapDailyVolumes'], Subscriptionstagingarbitrumgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapHourlyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapHourlyVolume'], Subscriptionstagingarbitrumgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapHourlyVolumes'], Subscriptionstagingarbitrumgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapWeeklyVolume'], Subscriptionstagingarbitrumgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapWeeklyVolumes'], Subscriptionstagingarbitrumgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapEvent'], Subscriptionstagingarbitrumgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_stableSwapEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_stableSwapEvents'], Subscriptionstagingarbitrumgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapTradeVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapTradeVolume'], Subscriptionstagingarbitrumgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swap_swapTradeVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap_swapTradeVolumes'], Subscriptionstagingarbitrumgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli_swap__meta: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swap__meta'], Subscriptionstagingarbitrumgoerli_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
