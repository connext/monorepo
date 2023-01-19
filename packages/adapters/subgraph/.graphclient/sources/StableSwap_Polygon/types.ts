// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapPolygonTypes {
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
  polygon_BigDecimal: any;
  BigInt: any;
  polygon_Bytes: any;
};

export type polygon_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type polygon_Block_height = {
  hash?: InputMaybe<Scalars['polygon_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type polygon_OrderDirection =
  | 'asc'
  | 'desc';

export type polygon_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['polygon_Bytes'];
};

export type polygon_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  polygon_systemInfo?: Maybe<polygon_SystemInfo>;
  polygon_systemInfos: Array<polygon_SystemInfo>;
  polygon_pooledToken?: Maybe<polygon_PooledToken>;
  polygon_pooledTokens: Array<polygon_PooledToken>;
  polygon_stableSwap?: Maybe<polygon_StableSwap>;
  polygon_stableSwaps: Array<polygon_StableSwap>;
  polygon_stableSwapAddLiquidityEvent?: Maybe<polygon_StableSwapAddLiquidityEvent>;
  polygon_stableSwapAddLiquidityEvents: Array<polygon_StableSwapAddLiquidityEvent>;
  polygon_stableSwapRemoveLiquidityEvent?: Maybe<polygon_StableSwapRemoveLiquidityEvent>;
  polygon_stableSwapRemoveLiquidityEvents: Array<polygon_StableSwapRemoveLiquidityEvent>;
  polygon_stableSwapExchange?: Maybe<polygon_StableSwapExchange>;
  polygon_stableSwapExchanges: Array<polygon_StableSwapExchange>;
  polygon_swapDailyVolume?: Maybe<polygon_SwapDailyVolume>;
  polygon_swapDailyVolumes: Array<polygon_SwapDailyVolume>;
  polygon_swapHourlyVolume?: Maybe<polygon_SwapHourlyVolume>;
  polygon_swapHourlyVolumes: Array<polygon_SwapHourlyVolume>;
  polygon_swapWeeklyVolume?: Maybe<polygon_SwapWeeklyVolume>;
  polygon_swapWeeklyVolumes: Array<polygon_SwapWeeklyVolume>;
  polygon_stableSwapEvent?: Maybe<polygon_StableSwapEvent>;
  polygon_stableSwapEvents: Array<polygon_StableSwapEvent>;
  polygon_swapTradeVolume?: Maybe<polygon_SwapTradeVolume>;
  polygon_swapTradeVolumes: Array<polygon_SwapTradeVolume>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Querypolygon_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SystemInfo_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwap_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwap_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapExchange_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapDailyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapHourlyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapWeeklyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapTradeVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querypolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['polygon_Bytes'];
  canonicalId?: Maybe<Scalars['polygon_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['polygon_Bytes']>;
  lpToken?: Maybe<Scalars['polygon_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<polygon_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<polygon_StableSwapEvent>>;
  exchanges?: Maybe<Array<polygon_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<polygon_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<polygon_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<polygon_SwapWeeklyVolume>>;
};


export type polygon_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
};


export type polygon_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapEvent_filter>;
};


export type polygon_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapExchange_filter>;
};


export type polygon_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapHourlyVolume_filter>;
};


export type polygon_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapDailyVolume_filter>;
};


export type polygon_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapWeeklyVolume_filter>;
};

export type polygon_StableSwapAddLiquidityEvent = polygon_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  provider: Scalars['polygon_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['polygon_Bytes'];
};

export type polygon_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  provider?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  transaction?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwapAddLiquidityEvent_orderBy =
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

export type polygon_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['polygon_Bytes'];
};

export type polygon_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type polygon_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  buyer: Scalars['polygon_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['polygon_Bytes'];
};

export type polygon_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_not?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  transaction?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwapExchange_orderBy =
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

export type polygon_StableSwapRemoveLiquidityEvent = polygon_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  provider: Scalars['polygon_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['polygon_Bytes'];
};

export type polygon_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  provider?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  transaction?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwapRemoveLiquidityEvent_orderBy =
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

export type polygon_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not?: InputMaybe<Scalars['polygon_Bytes']>;
  key_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  key_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  key_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  key_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  key_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['polygon_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['polygon_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['polygon_Bytes']>;
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
  pooledTokens_?: InputMaybe<polygon_PooledToken_filter>;
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
  events_?: InputMaybe<polygon_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<polygon_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<polygon_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<polygon_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<polygon_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_StableSwap_orderBy =
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
  polygon_systemInfo?: Maybe<polygon_SystemInfo>;
  polygon_systemInfos: Array<polygon_SystemInfo>;
  polygon_pooledToken?: Maybe<polygon_PooledToken>;
  polygon_pooledTokens: Array<polygon_PooledToken>;
  polygon_stableSwap?: Maybe<polygon_StableSwap>;
  polygon_stableSwaps: Array<polygon_StableSwap>;
  polygon_stableSwapAddLiquidityEvent?: Maybe<polygon_StableSwapAddLiquidityEvent>;
  polygon_stableSwapAddLiquidityEvents: Array<polygon_StableSwapAddLiquidityEvent>;
  polygon_stableSwapRemoveLiquidityEvent?: Maybe<polygon_StableSwapRemoveLiquidityEvent>;
  polygon_stableSwapRemoveLiquidityEvents: Array<polygon_StableSwapRemoveLiquidityEvent>;
  polygon_stableSwapExchange?: Maybe<polygon_StableSwapExchange>;
  polygon_stableSwapExchanges: Array<polygon_StableSwapExchange>;
  polygon_swapDailyVolume?: Maybe<polygon_SwapDailyVolume>;
  polygon_swapDailyVolumes: Array<polygon_SwapDailyVolume>;
  polygon_swapHourlyVolume?: Maybe<polygon_SwapHourlyVolume>;
  polygon_swapHourlyVolumes: Array<polygon_SwapHourlyVolume>;
  polygon_swapWeeklyVolume?: Maybe<polygon_SwapWeeklyVolume>;
  polygon_swapWeeklyVolumes: Array<polygon_SwapWeeklyVolume>;
  polygon_stableSwapEvent?: Maybe<polygon_StableSwapEvent>;
  polygon_stableSwapEvents: Array<polygon_StableSwapEvent>;
  polygon_swapTradeVolume?: Maybe<polygon_SwapTradeVolume>;
  polygon_swapTradeVolumes: Array<polygon_SwapTradeVolume>;
  /** Access to subgraph metadata */
  polygon__meta?: Maybe<polygon__Meta_>;
};


export type Subscriptionpolygon_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SystemInfo_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_PooledToken_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_PooledToken_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwap_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwap_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapExchange_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapDailyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapHourlyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapWeeklyVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_StableSwapEvent_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<polygon_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<polygon_OrderDirection>;
  where?: InputMaybe<polygon_SwapTradeVolume_filter>;
  block?: InputMaybe<polygon_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionpolygon__metaArgs = {
  block?: InputMaybe<polygon_Block_height>;
};

export type polygon_SwapDailyVolume = polygon_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['polygon_BigDecimal'];
};

export type polygon_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type polygon_SwapHourlyVolume = polygon_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['polygon_BigDecimal'];
};

export type polygon_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type polygon_SwapTradeVolume = {
  stableSwap: polygon_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['polygon_BigDecimal'];
};

export type polygon_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type polygon_SwapWeeklyVolume = polygon_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: polygon_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['polygon_BigDecimal'];
};

export type polygon_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<polygon_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['polygon_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['polygon_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type polygon_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type polygon_SystemInfo_filter = {
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
  _change_block?: InputMaybe<polygon_BlockChangedFilter>;
};

export type polygon_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type polygon__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['polygon_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type polygon__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: polygon__Block_;
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
  polygon_systemInfo: InContextSdkMethod<Query['polygon_systemInfo'], Querypolygon_systemInfoArgs, MeshContext>,
  /** null **/
  polygon_systemInfos: InContextSdkMethod<Query['polygon_systemInfos'], Querypolygon_systemInfosArgs, MeshContext>,
  /** null **/
  polygon_pooledToken: InContextSdkMethod<Query['polygon_pooledToken'], Querypolygon_pooledTokenArgs, MeshContext>,
  /** null **/
  polygon_pooledTokens: InContextSdkMethod<Query['polygon_pooledTokens'], Querypolygon_pooledTokensArgs, MeshContext>,
  /** null **/
  polygon_stableSwap: InContextSdkMethod<Query['polygon_stableSwap'], Querypolygon_stableSwapArgs, MeshContext>,
  /** null **/
  polygon_stableSwaps: InContextSdkMethod<Query['polygon_stableSwaps'], Querypolygon_stableSwapsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['polygon_stableSwapAddLiquidityEvent'], Querypolygon_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['polygon_stableSwapAddLiquidityEvents'], Querypolygon_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['polygon_stableSwapRemoveLiquidityEvent'], Querypolygon_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['polygon_stableSwapRemoveLiquidityEvents'], Querypolygon_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapExchange: InContextSdkMethod<Query['polygon_stableSwapExchange'], Querypolygon_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  polygon_stableSwapExchanges: InContextSdkMethod<Query['polygon_stableSwapExchanges'], Querypolygon_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  polygon_swapDailyVolume: InContextSdkMethod<Query['polygon_swapDailyVolume'], Querypolygon_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapDailyVolumes: InContextSdkMethod<Query['polygon_swapDailyVolumes'], Querypolygon_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  polygon_swapHourlyVolume: InContextSdkMethod<Query['polygon_swapHourlyVolume'], Querypolygon_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapHourlyVolumes: InContextSdkMethod<Query['polygon_swapHourlyVolumes'], Querypolygon_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  polygon_swapWeeklyVolume: InContextSdkMethod<Query['polygon_swapWeeklyVolume'], Querypolygon_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapWeeklyVolumes: InContextSdkMethod<Query['polygon_swapWeeklyVolumes'], Querypolygon_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  polygon_stableSwapEvent: InContextSdkMethod<Query['polygon_stableSwapEvent'], Querypolygon_stableSwapEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapEvents: InContextSdkMethod<Query['polygon_stableSwapEvents'], Querypolygon_stableSwapEventsArgs, MeshContext>,
  /** null **/
  polygon_swapTradeVolume: InContextSdkMethod<Query['polygon_swapTradeVolume'], Querypolygon_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapTradeVolumes: InContextSdkMethod<Query['polygon_swapTradeVolumes'], Querypolygon_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Query['polygon__meta'], Querypolygon__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  polygon_systemInfo: InContextSdkMethod<Subscription['polygon_systemInfo'], Subscriptionpolygon_systemInfoArgs, MeshContext>,
  /** null **/
  polygon_systemInfos: InContextSdkMethod<Subscription['polygon_systemInfos'], Subscriptionpolygon_systemInfosArgs, MeshContext>,
  /** null **/
  polygon_pooledToken: InContextSdkMethod<Subscription['polygon_pooledToken'], Subscriptionpolygon_pooledTokenArgs, MeshContext>,
  /** null **/
  polygon_pooledTokens: InContextSdkMethod<Subscription['polygon_pooledTokens'], Subscriptionpolygon_pooledTokensArgs, MeshContext>,
  /** null **/
  polygon_stableSwap: InContextSdkMethod<Subscription['polygon_stableSwap'], Subscriptionpolygon_stableSwapArgs, MeshContext>,
  /** null **/
  polygon_stableSwaps: InContextSdkMethod<Subscription['polygon_stableSwaps'], Subscriptionpolygon_stableSwapsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['polygon_stableSwapAddLiquidityEvent'], Subscriptionpolygon_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['polygon_stableSwapAddLiquidityEvents'], Subscriptionpolygon_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['polygon_stableSwapRemoveLiquidityEvent'], Subscriptionpolygon_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['polygon_stableSwapRemoveLiquidityEvents'], Subscriptionpolygon_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  polygon_stableSwapExchange: InContextSdkMethod<Subscription['polygon_stableSwapExchange'], Subscriptionpolygon_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  polygon_stableSwapExchanges: InContextSdkMethod<Subscription['polygon_stableSwapExchanges'], Subscriptionpolygon_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  polygon_swapDailyVolume: InContextSdkMethod<Subscription['polygon_swapDailyVolume'], Subscriptionpolygon_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapDailyVolumes: InContextSdkMethod<Subscription['polygon_swapDailyVolumes'], Subscriptionpolygon_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  polygon_swapHourlyVolume: InContextSdkMethod<Subscription['polygon_swapHourlyVolume'], Subscriptionpolygon_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapHourlyVolumes: InContextSdkMethod<Subscription['polygon_swapHourlyVolumes'], Subscriptionpolygon_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  polygon_swapWeeklyVolume: InContextSdkMethod<Subscription['polygon_swapWeeklyVolume'], Subscriptionpolygon_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapWeeklyVolumes: InContextSdkMethod<Subscription['polygon_swapWeeklyVolumes'], Subscriptionpolygon_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  polygon_stableSwapEvent: InContextSdkMethod<Subscription['polygon_stableSwapEvent'], Subscriptionpolygon_stableSwapEventArgs, MeshContext>,
  /** null **/
  polygon_stableSwapEvents: InContextSdkMethod<Subscription['polygon_stableSwapEvents'], Subscriptionpolygon_stableSwapEventsArgs, MeshContext>,
  /** null **/
  polygon_swapTradeVolume: InContextSdkMethod<Subscription['polygon_swapTradeVolume'], Subscriptionpolygon_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  polygon_swapTradeVolumes: InContextSdkMethod<Subscription['polygon_swapTradeVolumes'], Subscriptionpolygon_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  polygon__meta: InContextSdkMethod<Subscription['polygon__meta'], Subscriptionpolygon__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Polygon"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
