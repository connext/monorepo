// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapXdaiTypes {
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
  xdai_BigDecimal: any;
  BigInt: any;
  xdai_Bytes: any;
};

export type xdai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type xdai_Block_height = {
  hash?: InputMaybe<Scalars['xdai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type xdai_OrderDirection =
  | 'asc'
  | 'desc';

export type xdai_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['xdai_Bytes'];
};

export type xdai_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  xdai_systemInfo?: Maybe<xdai_SystemInfo>;
  xdai_systemInfos: Array<xdai_SystemInfo>;
  xdai_pooledToken?: Maybe<xdai_PooledToken>;
  xdai_pooledTokens: Array<xdai_PooledToken>;
  xdai_stableSwap?: Maybe<xdai_StableSwap>;
  xdai_stableSwaps: Array<xdai_StableSwap>;
  xdai_stableSwapAddLiquidityEvent?: Maybe<xdai_StableSwapAddLiquidityEvent>;
  xdai_stableSwapAddLiquidityEvents: Array<xdai_StableSwapAddLiquidityEvent>;
  xdai_stableSwapRemoveLiquidityEvent?: Maybe<xdai_StableSwapRemoveLiquidityEvent>;
  xdai_stableSwapRemoveLiquidityEvents: Array<xdai_StableSwapRemoveLiquidityEvent>;
  xdai_stableSwapExchange?: Maybe<xdai_StableSwapExchange>;
  xdai_stableSwapExchanges: Array<xdai_StableSwapExchange>;
  xdai_swapDailyVolume?: Maybe<xdai_SwapDailyVolume>;
  xdai_swapDailyVolumes: Array<xdai_SwapDailyVolume>;
  xdai_swapHourlyVolume?: Maybe<xdai_SwapHourlyVolume>;
  xdai_swapHourlyVolumes: Array<xdai_SwapHourlyVolume>;
  xdai_swapWeeklyVolume?: Maybe<xdai_SwapWeeklyVolume>;
  xdai_swapWeeklyVolumes: Array<xdai_SwapWeeklyVolume>;
  xdai_stableSwapEvent?: Maybe<xdai_StableSwapEvent>;
  xdai_stableSwapEvents: Array<xdai_StableSwapEvent>;
  xdai_swapTradeVolume?: Maybe<xdai_SwapTradeVolume>;
  xdai_swapTradeVolumes: Array<xdai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Queryxdai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SystemInfo_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwap_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapExchange_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapDailyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapHourlyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapTradeVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['xdai_Bytes'];
  canonicalId?: Maybe<Scalars['xdai_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['xdai_Bytes']>;
  lpToken?: Maybe<Scalars['xdai_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<xdai_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<xdai_StableSwapEvent>>;
  exchanges?: Maybe<Array<xdai_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<xdai_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<xdai_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<xdai_SwapWeeklyVolume>>;
};


export type xdai_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
};


export type xdai_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapEvent_filter>;
};


export type xdai_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapExchange_filter>;
};


export type xdai_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapHourlyVolume_filter>;
};


export type xdai_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapDailyVolume_filter>;
};


export type xdai_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapWeeklyVolume_filter>;
};

export type xdai_StableSwapAddLiquidityEvent = xdai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  provider: Scalars['xdai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['xdai_Bytes'];
};

export type xdai_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwapAddLiquidityEvent_orderBy =
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

export type xdai_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['xdai_Bytes'];
};

export type xdai_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type xdai_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  buyer: Scalars['xdai_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['xdai_Bytes'];
};

export type xdai_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_not?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwapExchange_orderBy =
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

export type xdai_StableSwapRemoveLiquidityEvent = xdai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  provider: Scalars['xdai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['xdai_Bytes'];
};

export type xdai_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwapRemoveLiquidityEvent_orderBy =
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

export type xdai_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not?: InputMaybe<Scalars['xdai_Bytes']>;
  key_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  key_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  key_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  key_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['xdai_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['xdai_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['xdai_Bytes']>;
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
  pooledTokens_?: InputMaybe<xdai_PooledToken_filter>;
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
  events_?: InputMaybe<xdai_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<xdai_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<xdai_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<xdai_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<xdai_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_StableSwap_orderBy =
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
  xdai_systemInfo?: Maybe<xdai_SystemInfo>;
  xdai_systemInfos: Array<xdai_SystemInfo>;
  xdai_pooledToken?: Maybe<xdai_PooledToken>;
  xdai_pooledTokens: Array<xdai_PooledToken>;
  xdai_stableSwap?: Maybe<xdai_StableSwap>;
  xdai_stableSwaps: Array<xdai_StableSwap>;
  xdai_stableSwapAddLiquidityEvent?: Maybe<xdai_StableSwapAddLiquidityEvent>;
  xdai_stableSwapAddLiquidityEvents: Array<xdai_StableSwapAddLiquidityEvent>;
  xdai_stableSwapRemoveLiquidityEvent?: Maybe<xdai_StableSwapRemoveLiquidityEvent>;
  xdai_stableSwapRemoveLiquidityEvents: Array<xdai_StableSwapRemoveLiquidityEvent>;
  xdai_stableSwapExchange?: Maybe<xdai_StableSwapExchange>;
  xdai_stableSwapExchanges: Array<xdai_StableSwapExchange>;
  xdai_swapDailyVolume?: Maybe<xdai_SwapDailyVolume>;
  xdai_swapDailyVolumes: Array<xdai_SwapDailyVolume>;
  xdai_swapHourlyVolume?: Maybe<xdai_SwapHourlyVolume>;
  xdai_swapHourlyVolumes: Array<xdai_SwapHourlyVolume>;
  xdai_swapWeeklyVolume?: Maybe<xdai_SwapWeeklyVolume>;
  xdai_swapWeeklyVolumes: Array<xdai_SwapWeeklyVolume>;
  xdai_stableSwapEvent?: Maybe<xdai_StableSwapEvent>;
  xdai_stableSwapEvents: Array<xdai_StableSwapEvent>;
  xdai_swapTradeVolume?: Maybe<xdai_SwapTradeVolume>;
  xdai_swapTradeVolumes: Array<xdai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  xdai__meta?: Maybe<xdai__Meta_>;
};


export type Subscriptionxdai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SystemInfo_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_PooledToken_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwap_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapExchange_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapDailyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapHourlyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_StableSwapEvent_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<xdai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<xdai_OrderDirection>;
  where?: InputMaybe<xdai_SwapTradeVolume_filter>;
  block?: InputMaybe<xdai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionxdai__metaArgs = {
  block?: InputMaybe<xdai_Block_height>;
};

export type xdai_SwapDailyVolume = xdai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['xdai_BigDecimal'];
};

export type xdai_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type xdai_SwapHourlyVolume = xdai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['xdai_BigDecimal'];
};

export type xdai_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type xdai_SwapTradeVolume = {
  stableSwap: xdai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['xdai_BigDecimal'];
};

export type xdai_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type xdai_SwapWeeklyVolume = xdai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: xdai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['xdai_BigDecimal'];
};

export type xdai_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<xdai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['xdai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['xdai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type xdai_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type xdai_SystemInfo_filter = {
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
  _change_block?: InputMaybe<xdai_BlockChangedFilter>;
};

export type xdai_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type xdai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['xdai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type xdai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: xdai__Block_;
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
  xdai_systemInfo: InContextSdkMethod<Query['xdai_systemInfo'], Queryxdai_systemInfoArgs, MeshContext>,
  /** null **/
  xdai_systemInfos: InContextSdkMethod<Query['xdai_systemInfos'], Queryxdai_systemInfosArgs, MeshContext>,
  /** null **/
  xdai_pooledToken: InContextSdkMethod<Query['xdai_pooledToken'], Queryxdai_pooledTokenArgs, MeshContext>,
  /** null **/
  xdai_pooledTokens: InContextSdkMethod<Query['xdai_pooledTokens'], Queryxdai_pooledTokensArgs, MeshContext>,
  /** null **/
  xdai_stableSwap: InContextSdkMethod<Query['xdai_stableSwap'], Queryxdai_stableSwapArgs, MeshContext>,
  /** null **/
  xdai_stableSwaps: InContextSdkMethod<Query['xdai_stableSwaps'], Queryxdai_stableSwapsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['xdai_stableSwapAddLiquidityEvent'], Queryxdai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['xdai_stableSwapAddLiquidityEvents'], Queryxdai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['xdai_stableSwapRemoveLiquidityEvent'], Queryxdai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['xdai_stableSwapRemoveLiquidityEvents'], Queryxdai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapExchange: InContextSdkMethod<Query['xdai_stableSwapExchange'], Queryxdai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  xdai_stableSwapExchanges: InContextSdkMethod<Query['xdai_stableSwapExchanges'], Queryxdai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  xdai_swapDailyVolume: InContextSdkMethod<Query['xdai_swapDailyVolume'], Queryxdai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapDailyVolumes: InContextSdkMethod<Query['xdai_swapDailyVolumes'], Queryxdai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  xdai_swapHourlyVolume: InContextSdkMethod<Query['xdai_swapHourlyVolume'], Queryxdai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapHourlyVolumes: InContextSdkMethod<Query['xdai_swapHourlyVolumes'], Queryxdai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  xdai_swapWeeklyVolume: InContextSdkMethod<Query['xdai_swapWeeklyVolume'], Queryxdai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapWeeklyVolumes: InContextSdkMethod<Query['xdai_swapWeeklyVolumes'], Queryxdai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  xdai_stableSwapEvent: InContextSdkMethod<Query['xdai_stableSwapEvent'], Queryxdai_stableSwapEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapEvents: InContextSdkMethod<Query['xdai_stableSwapEvents'], Queryxdai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  xdai_swapTradeVolume: InContextSdkMethod<Query['xdai_swapTradeVolume'], Queryxdai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapTradeVolumes: InContextSdkMethod<Query['xdai_swapTradeVolumes'], Queryxdai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Query['xdai__meta'], Queryxdai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  xdai_systemInfo: InContextSdkMethod<Subscription['xdai_systemInfo'], Subscriptionxdai_systemInfoArgs, MeshContext>,
  /** null **/
  xdai_systemInfos: InContextSdkMethod<Subscription['xdai_systemInfos'], Subscriptionxdai_systemInfosArgs, MeshContext>,
  /** null **/
  xdai_pooledToken: InContextSdkMethod<Subscription['xdai_pooledToken'], Subscriptionxdai_pooledTokenArgs, MeshContext>,
  /** null **/
  xdai_pooledTokens: InContextSdkMethod<Subscription['xdai_pooledTokens'], Subscriptionxdai_pooledTokensArgs, MeshContext>,
  /** null **/
  xdai_stableSwap: InContextSdkMethod<Subscription['xdai_stableSwap'], Subscriptionxdai_stableSwapArgs, MeshContext>,
  /** null **/
  xdai_stableSwaps: InContextSdkMethod<Subscription['xdai_stableSwaps'], Subscriptionxdai_stableSwapsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['xdai_stableSwapAddLiquidityEvent'], Subscriptionxdai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['xdai_stableSwapAddLiquidityEvents'], Subscriptionxdai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['xdai_stableSwapRemoveLiquidityEvent'], Subscriptionxdai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['xdai_stableSwapRemoveLiquidityEvents'], Subscriptionxdai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  xdai_stableSwapExchange: InContextSdkMethod<Subscription['xdai_stableSwapExchange'], Subscriptionxdai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  xdai_stableSwapExchanges: InContextSdkMethod<Subscription['xdai_stableSwapExchanges'], Subscriptionxdai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  xdai_swapDailyVolume: InContextSdkMethod<Subscription['xdai_swapDailyVolume'], Subscriptionxdai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapDailyVolumes: InContextSdkMethod<Subscription['xdai_swapDailyVolumes'], Subscriptionxdai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  xdai_swapHourlyVolume: InContextSdkMethod<Subscription['xdai_swapHourlyVolume'], Subscriptionxdai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapHourlyVolumes: InContextSdkMethod<Subscription['xdai_swapHourlyVolumes'], Subscriptionxdai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  xdai_swapWeeklyVolume: InContextSdkMethod<Subscription['xdai_swapWeeklyVolume'], Subscriptionxdai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapWeeklyVolumes: InContextSdkMethod<Subscription['xdai_swapWeeklyVolumes'], Subscriptionxdai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  xdai_stableSwapEvent: InContextSdkMethod<Subscription['xdai_stableSwapEvent'], Subscriptionxdai_stableSwapEventArgs, MeshContext>,
  /** null **/
  xdai_stableSwapEvents: InContextSdkMethod<Subscription['xdai_stableSwapEvents'], Subscriptionxdai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  xdai_swapTradeVolume: InContextSdkMethod<Subscription['xdai_swapTradeVolume'], Subscriptionxdai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  xdai_swapTradeVolumes: InContextSdkMethod<Subscription['xdai_swapTradeVolumes'], Subscriptionxdai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  xdai__meta: InContextSdkMethod<Subscription['xdai__meta'], Subscriptionxdai__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Xdai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
