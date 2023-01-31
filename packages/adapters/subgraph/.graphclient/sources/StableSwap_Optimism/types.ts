// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapOptimismTypes {
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
  optimism_BigDecimal: any;
  BigInt: any;
  optimism_Bytes: any;
};

export type optimism_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimism_Block_height = {
  hash?: InputMaybe<Scalars['optimism_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type optimism_OrderDirection =
  | 'asc'
  | 'desc';

export type optimism_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['optimism_Bytes'];
};

export type optimism_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  optimism_systemInfo?: Maybe<optimism_SystemInfo>;
  optimism_systemInfos: Array<optimism_SystemInfo>;
  optimism_pooledToken?: Maybe<optimism_PooledToken>;
  optimism_pooledTokens: Array<optimism_PooledToken>;
  optimism_stableSwap?: Maybe<optimism_StableSwap>;
  optimism_stableSwaps: Array<optimism_StableSwap>;
  optimism_stableSwapAddLiquidityEvent?: Maybe<optimism_StableSwapAddLiquidityEvent>;
  optimism_stableSwapAddLiquidityEvents: Array<optimism_StableSwapAddLiquidityEvent>;
  optimism_stableSwapRemoveLiquidityEvent?: Maybe<optimism_StableSwapRemoveLiquidityEvent>;
  optimism_stableSwapRemoveLiquidityEvents: Array<optimism_StableSwapRemoveLiquidityEvent>;
  optimism_stableSwapExchange?: Maybe<optimism_StableSwapExchange>;
  optimism_stableSwapExchanges: Array<optimism_StableSwapExchange>;
  optimism_swapDailyVolume?: Maybe<optimism_SwapDailyVolume>;
  optimism_swapDailyVolumes: Array<optimism_SwapDailyVolume>;
  optimism_swapHourlyVolume?: Maybe<optimism_SwapHourlyVolume>;
  optimism_swapHourlyVolumes: Array<optimism_SwapHourlyVolume>;
  optimism_swapWeeklyVolume?: Maybe<optimism_SwapWeeklyVolume>;
  optimism_swapWeeklyVolumes: Array<optimism_SwapWeeklyVolume>;
  optimism_stableSwapEvent?: Maybe<optimism_StableSwapEvent>;
  optimism_stableSwapEvents: Array<optimism_StableSwapEvent>;
  optimism_swapTradeVolume?: Maybe<optimism_SwapTradeVolume>;
  optimism_swapTradeVolumes: Array<optimism_SwapTradeVolume>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Queryoptimism_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SystemInfo_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwap_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapExchange_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapDailyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapHourlyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapWeeklyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapTradeVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['optimism_Bytes'];
  canonicalId?: Maybe<Scalars['optimism_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['optimism_Bytes']>;
  lpToken?: Maybe<Scalars['optimism_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<optimism_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<optimism_StableSwapEvent>>;
  exchanges?: Maybe<Array<optimism_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<optimism_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<optimism_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<optimism_SwapWeeklyVolume>>;
};


export type optimism_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
};


export type optimism_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapEvent_filter>;
};


export type optimism_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapExchange_filter>;
};


export type optimism_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapHourlyVolume_filter>;
};


export type optimism_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapDailyVolume_filter>;
};


export type optimism_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapWeeklyVolume_filter>;
};

export type optimism_StableSwapAddLiquidityEvent = optimism_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  provider: Scalars['optimism_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_Bytes'];
};

export type optimism_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  provider?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwapAddLiquidityEvent_orderBy =
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

export type optimism_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_Bytes'];
};

export type optimism_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type optimism_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  buyer: Scalars['optimism_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_Bytes'];
};

export type optimism_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_not?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwapExchange_orderBy =
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

export type optimism_StableSwapRemoveLiquidityEvent = optimism_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  provider: Scalars['optimism_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_Bytes'];
};

export type optimism_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  provider?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwapRemoveLiquidityEvent_orderBy =
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

export type optimism_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not?: InputMaybe<Scalars['optimism_Bytes']>;
  key_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  key_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  key_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  key_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['optimism_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['optimism_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['optimism_Bytes']>;
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
  pooledTokens_?: InputMaybe<optimism_PooledToken_filter>;
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
  events_?: InputMaybe<optimism_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<optimism_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<optimism_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<optimism_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<optimism_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_StableSwap_orderBy =
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
  optimism_systemInfo?: Maybe<optimism_SystemInfo>;
  optimism_systemInfos: Array<optimism_SystemInfo>;
  optimism_pooledToken?: Maybe<optimism_PooledToken>;
  optimism_pooledTokens: Array<optimism_PooledToken>;
  optimism_stableSwap?: Maybe<optimism_StableSwap>;
  optimism_stableSwaps: Array<optimism_StableSwap>;
  optimism_stableSwapAddLiquidityEvent?: Maybe<optimism_StableSwapAddLiquidityEvent>;
  optimism_stableSwapAddLiquidityEvents: Array<optimism_StableSwapAddLiquidityEvent>;
  optimism_stableSwapRemoveLiquidityEvent?: Maybe<optimism_StableSwapRemoveLiquidityEvent>;
  optimism_stableSwapRemoveLiquidityEvents: Array<optimism_StableSwapRemoveLiquidityEvent>;
  optimism_stableSwapExchange?: Maybe<optimism_StableSwapExchange>;
  optimism_stableSwapExchanges: Array<optimism_StableSwapExchange>;
  optimism_swapDailyVolume?: Maybe<optimism_SwapDailyVolume>;
  optimism_swapDailyVolumes: Array<optimism_SwapDailyVolume>;
  optimism_swapHourlyVolume?: Maybe<optimism_SwapHourlyVolume>;
  optimism_swapHourlyVolumes: Array<optimism_SwapHourlyVolume>;
  optimism_swapWeeklyVolume?: Maybe<optimism_SwapWeeklyVolume>;
  optimism_swapWeeklyVolumes: Array<optimism_SwapWeeklyVolume>;
  optimism_stableSwapEvent?: Maybe<optimism_StableSwapEvent>;
  optimism_stableSwapEvents: Array<optimism_StableSwapEvent>;
  optimism_swapTradeVolume?: Maybe<optimism_SwapTradeVolume>;
  optimism_swapTradeVolumes: Array<optimism_SwapTradeVolume>;
  /** Access to subgraph metadata */
  optimism__meta?: Maybe<optimism__Meta_>;
};


export type Subscriptionoptimism_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SystemInfo_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_PooledToken_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwap_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapExchange_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapDailyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapHourlyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapWeeklyVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_StableSwapEvent_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_OrderDirection>;
  where?: InputMaybe<optimism_SwapTradeVolume_filter>;
  block?: InputMaybe<optimism_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism__metaArgs = {
  block?: InputMaybe<optimism_Block_height>;
};

export type optimism_SwapDailyVolume = optimism_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_BigDecimal'];
};

export type optimism_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type optimism_SwapHourlyVolume = optimism_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_BigDecimal'];
};

export type optimism_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type optimism_SwapTradeVolume = {
  stableSwap: optimism_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_BigDecimal'];
};

export type optimism_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type optimism_SwapWeeklyVolume = optimism_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_BigDecimal'];
};

export type optimism_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type optimism_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type optimism_SystemInfo_filter = {
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
  _change_block?: InputMaybe<optimism_BlockChangedFilter>;
};

export type optimism_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type optimism__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimism_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimism__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimism__Block_;
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
  optimism_systemInfo: InContextSdkMethod<Query['optimism_systemInfo'], Queryoptimism_systemInfoArgs, MeshContext>,
  /** null **/
  optimism_systemInfos: InContextSdkMethod<Query['optimism_systemInfos'], Queryoptimism_systemInfosArgs, MeshContext>,
  /** null **/
  optimism_pooledToken: InContextSdkMethod<Query['optimism_pooledToken'], Queryoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_pooledTokens: InContextSdkMethod<Query['optimism_pooledTokens'], Queryoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_stableSwap: InContextSdkMethod<Query['optimism_stableSwap'], Queryoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_stableSwaps: InContextSdkMethod<Query['optimism_stableSwaps'], Queryoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['optimism_stableSwapAddLiquidityEvent'], Queryoptimism_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['optimism_stableSwapAddLiquidityEvents'], Queryoptimism_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['optimism_stableSwapRemoveLiquidityEvent'], Queryoptimism_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['optimism_stableSwapRemoveLiquidityEvents'], Queryoptimism_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapExchange: InContextSdkMethod<Query['optimism_stableSwapExchange'], Queryoptimism_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  optimism_stableSwapExchanges: InContextSdkMethod<Query['optimism_stableSwapExchanges'], Queryoptimism_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  optimism_swapDailyVolume: InContextSdkMethod<Query['optimism_swapDailyVolume'], Queryoptimism_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapDailyVolumes: InContextSdkMethod<Query['optimism_swapDailyVolumes'], Queryoptimism_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swapHourlyVolume: InContextSdkMethod<Query['optimism_swapHourlyVolume'], Queryoptimism_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapHourlyVolumes: InContextSdkMethod<Query['optimism_swapHourlyVolumes'], Queryoptimism_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swapWeeklyVolume: InContextSdkMethod<Query['optimism_swapWeeklyVolume'], Queryoptimism_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapWeeklyVolumes: InContextSdkMethod<Query['optimism_swapWeeklyVolumes'], Queryoptimism_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  optimism_stableSwapEvent: InContextSdkMethod<Query['optimism_stableSwapEvent'], Queryoptimism_stableSwapEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapEvents: InContextSdkMethod<Query['optimism_stableSwapEvents'], Queryoptimism_stableSwapEventsArgs, MeshContext>,
  /** null **/
  optimism_swapTradeVolume: InContextSdkMethod<Query['optimism_swapTradeVolume'], Queryoptimism_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapTradeVolumes: InContextSdkMethod<Query['optimism_swapTradeVolumes'], Queryoptimism_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Query['optimism__meta'], Queryoptimism__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimism_systemInfo: InContextSdkMethod<Subscription['optimism_systemInfo'], Subscriptionoptimism_systemInfoArgs, MeshContext>,
  /** null **/
  optimism_systemInfos: InContextSdkMethod<Subscription['optimism_systemInfos'], Subscriptionoptimism_systemInfosArgs, MeshContext>,
  /** null **/
  optimism_pooledToken: InContextSdkMethod<Subscription['optimism_pooledToken'], Subscriptionoptimism_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_pooledTokens: InContextSdkMethod<Subscription['optimism_pooledTokens'], Subscriptionoptimism_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_stableSwap: InContextSdkMethod<Subscription['optimism_stableSwap'], Subscriptionoptimism_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_stableSwaps: InContextSdkMethod<Subscription['optimism_stableSwaps'], Subscriptionoptimism_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['optimism_stableSwapAddLiquidityEvent'], Subscriptionoptimism_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['optimism_stableSwapAddLiquidityEvents'], Subscriptionoptimism_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['optimism_stableSwapRemoveLiquidityEvent'], Subscriptionoptimism_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['optimism_stableSwapRemoveLiquidityEvents'], Subscriptionoptimism_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_stableSwapExchange: InContextSdkMethod<Subscription['optimism_stableSwapExchange'], Subscriptionoptimism_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  optimism_stableSwapExchanges: InContextSdkMethod<Subscription['optimism_stableSwapExchanges'], Subscriptionoptimism_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  optimism_swapDailyVolume: InContextSdkMethod<Subscription['optimism_swapDailyVolume'], Subscriptionoptimism_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapDailyVolumes: InContextSdkMethod<Subscription['optimism_swapDailyVolumes'], Subscriptionoptimism_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swapHourlyVolume: InContextSdkMethod<Subscription['optimism_swapHourlyVolume'], Subscriptionoptimism_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapHourlyVolumes: InContextSdkMethod<Subscription['optimism_swapHourlyVolumes'], Subscriptionoptimism_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swapWeeklyVolume: InContextSdkMethod<Subscription['optimism_swapWeeklyVolume'], Subscriptionoptimism_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapWeeklyVolumes: InContextSdkMethod<Subscription['optimism_swapWeeklyVolumes'], Subscriptionoptimism_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  optimism_stableSwapEvent: InContextSdkMethod<Subscription['optimism_stableSwapEvent'], Subscriptionoptimism_stableSwapEventArgs, MeshContext>,
  /** null **/
  optimism_stableSwapEvents: InContextSdkMethod<Subscription['optimism_stableSwapEvents'], Subscriptionoptimism_stableSwapEventsArgs, MeshContext>,
  /** null **/
  optimism_swapTradeVolume: InContextSdkMethod<Subscription['optimism_swapTradeVolume'], Subscriptionoptimism_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  optimism_swapTradeVolumes: InContextSdkMethod<Subscription['optimism_swapTradeVolumes'], Subscriptionoptimism_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism__meta: InContextSdkMethod<Subscription['optimism__meta'], Subscriptionoptimism__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
