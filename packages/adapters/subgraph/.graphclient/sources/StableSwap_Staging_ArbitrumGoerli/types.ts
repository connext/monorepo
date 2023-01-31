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
  stagingarbitrumgoerli_BigDecimal: any;
  BigInt: any;
  stagingarbitrumgoerli_Bytes: any;
};

export type stagingarbitrumgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingarbitrumgoerli_Block_height = {
  hash?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type stagingarbitrumgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingarbitrumgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingarbitrumgoerli_systemInfo?: Maybe<stagingarbitrumgoerli_SystemInfo>;
  stagingarbitrumgoerli_systemInfos: Array<stagingarbitrumgoerli_SystemInfo>;
  stagingarbitrumgoerli_pooledToken?: Maybe<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_stableSwap?: Maybe<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwaps: Array<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapExchange?: Maybe<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_stableSwapExchanges: Array<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_swapDailyVolume?: Maybe<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapDailyVolumes: Array<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapHourlyVolumes: Array<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolumes: Array<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_stableSwapEvent?: Maybe<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_stableSwapEvents: Array<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_swapTradeVolume?: Maybe<stagingarbitrumgoerli_SwapTradeVolume>;
  stagingarbitrumgoerli_swapTradeVolumes: Array<stagingarbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli__meta?: Maybe<stagingarbitrumgoerli__Meta_>;
};


export type Querystagingarbitrumgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SystemInfo_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingarbitrumgoerli__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
};

export type stagingarbitrumgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['stagingarbitrumgoerli_Bytes'];
  canonicalId?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<stagingarbitrumgoerli_StableSwapEvent>>;
  exchanges?: Maybe<Array<stagingarbitrumgoerli_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<stagingarbitrumgoerli_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<stagingarbitrumgoerli_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<stagingarbitrumgoerli_SwapWeeklyVolume>>;
};


export type stagingarbitrumgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
};


export type stagingarbitrumgoerli_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
};


export type stagingarbitrumgoerli_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
};


export type stagingarbitrumgoerli_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
};


export type stagingarbitrumgoerli_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
};


export type stagingarbitrumgoerli_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent = stagingarbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy =
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

export type stagingarbitrumgoerli_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingarbitrumgoerli_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  buyer: Scalars['stagingarbitrumgoerli_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapExchange_orderBy =
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

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent = stagingarbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  provider: Scalars['stagingarbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingarbitrumgoerli_Bytes'];
};

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy =
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

export type stagingarbitrumgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingarbitrumgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
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
  events_?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_StableSwap_orderBy =
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
  stagingarbitrumgoerli_systemInfo?: Maybe<stagingarbitrumgoerli_SystemInfo>;
  stagingarbitrumgoerli_systemInfos: Array<stagingarbitrumgoerli_SystemInfo>;
  stagingarbitrumgoerli_pooledToken?: Maybe<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_pooledTokens: Array<stagingarbitrumgoerli_PooledToken>;
  stagingarbitrumgoerli_stableSwap?: Maybe<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwaps: Array<stagingarbitrumgoerli_StableSwap>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapAddLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  stagingarbitrumgoerli_stableSwapExchange?: Maybe<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_stableSwapExchanges: Array<stagingarbitrumgoerli_StableSwapExchange>;
  stagingarbitrumgoerli_swapDailyVolume?: Maybe<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapDailyVolumes: Array<stagingarbitrumgoerli_SwapDailyVolume>;
  stagingarbitrumgoerli_swapHourlyVolume?: Maybe<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapHourlyVolumes: Array<stagingarbitrumgoerli_SwapHourlyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolume?: Maybe<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_swapWeeklyVolumes: Array<stagingarbitrumgoerli_SwapWeeklyVolume>;
  stagingarbitrumgoerli_stableSwapEvent?: Maybe<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_stableSwapEvents: Array<stagingarbitrumgoerli_StableSwapEvent>;
  stagingarbitrumgoerli_swapTradeVolume?: Maybe<stagingarbitrumgoerli_SwapTradeVolume>;
  stagingarbitrumgoerli_swapTradeVolumes: Array<stagingarbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingarbitrumgoerli__meta?: Maybe<stagingarbitrumgoerli__Meta_>;
};


export type Subscriptionstagingarbitrumgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SystemInfo_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingarbitrumgoerli_OrderDirection>;
  where?: InputMaybe<stagingarbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingarbitrumgoerli__metaArgs = {
  block?: InputMaybe<stagingarbitrumgoerli_Block_height>;
};

export type stagingarbitrumgoerli_SwapDailyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapHourlyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapTradeVolume = {
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SwapWeeklyVolume = stagingarbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingarbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingarbitrumgoerli_BigDecimal'];
};

export type stagingarbitrumgoerli_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingarbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingarbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingarbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingarbitrumgoerli_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type stagingarbitrumgoerli_SystemInfo_filter = {
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
  _change_block?: InputMaybe<stagingarbitrumgoerli_BlockChangedFilter>;
};

export type stagingarbitrumgoerli_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type stagingarbitrumgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingarbitrumgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingarbitrumgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingarbitrumgoerli__Block_;
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
  stagingarbitrumgoerli_systemInfo: InContextSdkMethod<Query['stagingarbitrumgoerli_systemInfo'], Querystagingarbitrumgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_systemInfos: InContextSdkMethod<Query['stagingarbitrumgoerli_systemInfos'], Querystagingarbitrumgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledToken: InContextSdkMethod<Query['stagingarbitrumgoerli_pooledToken'], Querystagingarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledTokens: InContextSdkMethod<Query['stagingarbitrumgoerli_pooledTokens'], Querystagingarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwap: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwap'], Querystagingarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwaps: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwaps'], Querystagingarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapAddLiquidityEvent'], Querystagingarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapAddLiquidityEvents'], Querystagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent'], Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents'], Querystagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchange: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapExchange'], Querystagingarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapExchanges'], Querystagingarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapDailyVolume'], Querystagingarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapDailyVolumes'], Querystagingarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapHourlyVolume'], Querystagingarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapHourlyVolumes'], Querystagingarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapWeeklyVolume'], Querystagingarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapWeeklyVolumes'], Querystagingarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvent: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapEvent'], Querystagingarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvents: InContextSdkMethod<Query['stagingarbitrumgoerli_stableSwapEvents'], Querystagingarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolume: InContextSdkMethod<Query['stagingarbitrumgoerli_swapTradeVolume'], Querystagingarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Query['stagingarbitrumgoerli_swapTradeVolumes'], Querystagingarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli__meta: InContextSdkMethod<Query['stagingarbitrumgoerli__meta'], Querystagingarbitrumgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingarbitrumgoerli_systemInfo: InContextSdkMethod<Subscription['stagingarbitrumgoerli_systemInfo'], Subscriptionstagingarbitrumgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_systemInfos: InContextSdkMethod<Subscription['stagingarbitrumgoerli_systemInfos'], Subscriptionstagingarbitrumgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledToken: InContextSdkMethod<Subscription['stagingarbitrumgoerli_pooledToken'], Subscriptionstagingarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_pooledTokens: InContextSdkMethod<Subscription['stagingarbitrumgoerli_pooledTokens'], Subscriptionstagingarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwap: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwap'], Subscriptionstagingarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwaps: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwaps'], Subscriptionstagingarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapAddLiquidityEvent'], Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapAddLiquidityEvents'], Subscriptionstagingarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvent'], Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapRemoveLiquidityEvents'], Subscriptionstagingarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchange: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapExchange'], Subscriptionstagingarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapExchanges'], Subscriptionstagingarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapDailyVolume'], Subscriptionstagingarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapDailyVolumes'], Subscriptionstagingarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapHourlyVolume'], Subscriptionstagingarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapHourlyVolumes'], Subscriptionstagingarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapWeeklyVolume'], Subscriptionstagingarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapWeeklyVolumes'], Subscriptionstagingarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvent: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapEvent'], Subscriptionstagingarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_stableSwapEvents: InContextSdkMethod<Subscription['stagingarbitrumgoerli_stableSwapEvents'], Subscriptionstagingarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolume: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapTradeVolume'], Subscriptionstagingarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingarbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Subscription['stagingarbitrumgoerli_swapTradeVolumes'], Subscriptionstagingarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingarbitrumgoerli__meta: InContextSdkMethod<Subscription['stagingarbitrumgoerli__meta'], Subscriptionstagingarbitrumgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
