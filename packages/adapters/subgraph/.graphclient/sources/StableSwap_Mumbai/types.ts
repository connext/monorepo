// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapMumbaiTypes {
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
  mumbai_BigDecimal: any;
  BigInt: any;
  mumbai_Bytes: any;
};

export type mumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mumbai_Block_height = {
  hash?: InputMaybe<Scalars['mumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type mumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type mumbai_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['mumbai_Bytes'];
};

export type mumbai_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  mumbai_systemInfo?: Maybe<mumbai_SystemInfo>;
  mumbai_systemInfos: Array<mumbai_SystemInfo>;
  mumbai_pooledToken?: Maybe<mumbai_PooledToken>;
  mumbai_pooledTokens: Array<mumbai_PooledToken>;
  mumbai_stableSwap?: Maybe<mumbai_StableSwap>;
  mumbai_stableSwaps: Array<mumbai_StableSwap>;
  mumbai_stableSwapAddLiquidityEvent?: Maybe<mumbai_StableSwapAddLiquidityEvent>;
  mumbai_stableSwapAddLiquidityEvents: Array<mumbai_StableSwapAddLiquidityEvent>;
  mumbai_stableSwapRemoveLiquidityEvent?: Maybe<mumbai_StableSwapRemoveLiquidityEvent>;
  mumbai_stableSwapRemoveLiquidityEvents: Array<mumbai_StableSwapRemoveLiquidityEvent>;
  mumbai_stableSwapExchange?: Maybe<mumbai_StableSwapExchange>;
  mumbai_stableSwapExchanges: Array<mumbai_StableSwapExchange>;
  mumbai_swapDailyVolume?: Maybe<mumbai_SwapDailyVolume>;
  mumbai_swapDailyVolumes: Array<mumbai_SwapDailyVolume>;
  mumbai_swapHourlyVolume?: Maybe<mumbai_SwapHourlyVolume>;
  mumbai_swapHourlyVolumes: Array<mumbai_SwapHourlyVolume>;
  mumbai_swapWeeklyVolume?: Maybe<mumbai_SwapWeeklyVolume>;
  mumbai_swapWeeklyVolumes: Array<mumbai_SwapWeeklyVolume>;
  mumbai_stableSwapEvent?: Maybe<mumbai_StableSwapEvent>;
  mumbai_stableSwapEvents: Array<mumbai_StableSwapEvent>;
  mumbai_swapTradeVolume?: Maybe<mumbai_SwapTradeVolume>;
  mumbai_swapTradeVolumes: Array<mumbai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Querymumbai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SystemInfo_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_PooledToken_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwap_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapExchange_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapDailyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapHourlyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapTradeVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['mumbai_Bytes'];
  canonicalId?: Maybe<Scalars['mumbai_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['mumbai_Bytes']>;
  lpToken?: Maybe<Scalars['mumbai_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<mumbai_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<mumbai_StableSwapEvent>>;
  exchanges?: Maybe<Array<mumbai_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<mumbai_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<mumbai_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<mumbai_SwapWeeklyVolume>>;
};


export type mumbai_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_PooledToken_filter>;
};


export type mumbai_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapEvent_filter>;
};


export type mumbai_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapExchange_filter>;
};


export type mumbai_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapHourlyVolume_filter>;
};


export type mumbai_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapDailyVolume_filter>;
};


export type mumbai_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapWeeklyVolume_filter>;
};

export type mumbai_StableSwapAddLiquidityEvent = mumbai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  provider: Scalars['mumbai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['mumbai_Bytes'];
};

export type mumbai_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwapAddLiquidityEvent_orderBy =
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

export type mumbai_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['mumbai_Bytes'];
};

export type mumbai_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type mumbai_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  buyer: Scalars['mumbai_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['mumbai_Bytes'];
};

export type mumbai_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwapExchange_orderBy =
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

export type mumbai_StableSwapRemoveLiquidityEvent = mumbai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  provider: Scalars['mumbai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['mumbai_Bytes'];
};

export type mumbai_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwapRemoveLiquidityEvent_orderBy =
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

export type mumbai_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['mumbai_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['mumbai_Bytes']>;
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
  pooledTokens_?: InputMaybe<mumbai_PooledToken_filter>;
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
  events_?: InputMaybe<mumbai_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<mumbai_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<mumbai_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<mumbai_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<mumbai_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_StableSwap_orderBy =
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
  mumbai_systemInfo?: Maybe<mumbai_SystemInfo>;
  mumbai_systemInfos: Array<mumbai_SystemInfo>;
  mumbai_pooledToken?: Maybe<mumbai_PooledToken>;
  mumbai_pooledTokens: Array<mumbai_PooledToken>;
  mumbai_stableSwap?: Maybe<mumbai_StableSwap>;
  mumbai_stableSwaps: Array<mumbai_StableSwap>;
  mumbai_stableSwapAddLiquidityEvent?: Maybe<mumbai_StableSwapAddLiquidityEvent>;
  mumbai_stableSwapAddLiquidityEvents: Array<mumbai_StableSwapAddLiquidityEvent>;
  mumbai_stableSwapRemoveLiquidityEvent?: Maybe<mumbai_StableSwapRemoveLiquidityEvent>;
  mumbai_stableSwapRemoveLiquidityEvents: Array<mumbai_StableSwapRemoveLiquidityEvent>;
  mumbai_stableSwapExchange?: Maybe<mumbai_StableSwapExchange>;
  mumbai_stableSwapExchanges: Array<mumbai_StableSwapExchange>;
  mumbai_swapDailyVolume?: Maybe<mumbai_SwapDailyVolume>;
  mumbai_swapDailyVolumes: Array<mumbai_SwapDailyVolume>;
  mumbai_swapHourlyVolume?: Maybe<mumbai_SwapHourlyVolume>;
  mumbai_swapHourlyVolumes: Array<mumbai_SwapHourlyVolume>;
  mumbai_swapWeeklyVolume?: Maybe<mumbai_SwapWeeklyVolume>;
  mumbai_swapWeeklyVolumes: Array<mumbai_SwapWeeklyVolume>;
  mumbai_stableSwapEvent?: Maybe<mumbai_StableSwapEvent>;
  mumbai_stableSwapEvents: Array<mumbai_StableSwapEvent>;
  mumbai_swapTradeVolume?: Maybe<mumbai_SwapTradeVolume>;
  mumbai_swapTradeVolumes: Array<mumbai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  mumbai__meta?: Maybe<mumbai__Meta_>;
};


export type Subscriptionmumbai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SystemInfo_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_PooledToken_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwap_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapExchange_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapDailyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapHourlyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_StableSwapEvent_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mumbai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<mumbai_OrderDirection>;
  where?: InputMaybe<mumbai_SwapTradeVolume_filter>;
  block?: InputMaybe<mumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmumbai__metaArgs = {
  block?: InputMaybe<mumbai_Block_height>;
};

export type mumbai_SwapDailyVolume = mumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['mumbai_BigDecimal'];
};

export type mumbai_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type mumbai_SwapHourlyVolume = mumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['mumbai_BigDecimal'];
};

export type mumbai_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type mumbai_SwapTradeVolume = {
  stableSwap: mumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['mumbai_BigDecimal'];
};

export type mumbai_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type mumbai_SwapWeeklyVolume = mumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: mumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['mumbai_BigDecimal'];
};

export type mumbai_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<mumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['mumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['mumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type mumbai_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type mumbai_SystemInfo_filter = {
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
  _change_block?: InputMaybe<mumbai_BlockChangedFilter>;
};

export type mumbai_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type mumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type mumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mumbai__Block_;
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
  mumbai_systemInfo: InContextSdkMethod<Query['mumbai_systemInfo'], Querymumbai_systemInfoArgs, MeshContext>,
  /** null **/
  mumbai_systemInfos: InContextSdkMethod<Query['mumbai_systemInfos'], Querymumbai_systemInfosArgs, MeshContext>,
  /** null **/
  mumbai_pooledToken: InContextSdkMethod<Query['mumbai_pooledToken'], Querymumbai_pooledTokenArgs, MeshContext>,
  /** null **/
  mumbai_pooledTokens: InContextSdkMethod<Query['mumbai_pooledTokens'], Querymumbai_pooledTokensArgs, MeshContext>,
  /** null **/
  mumbai_stableSwap: InContextSdkMethod<Query['mumbai_stableSwap'], Querymumbai_stableSwapArgs, MeshContext>,
  /** null **/
  mumbai_stableSwaps: InContextSdkMethod<Query['mumbai_stableSwaps'], Querymumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['mumbai_stableSwapAddLiquidityEvent'], Querymumbai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['mumbai_stableSwapAddLiquidityEvents'], Querymumbai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['mumbai_stableSwapRemoveLiquidityEvent'], Querymumbai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['mumbai_stableSwapRemoveLiquidityEvents'], Querymumbai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapExchange: InContextSdkMethod<Query['mumbai_stableSwapExchange'], Querymumbai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapExchanges: InContextSdkMethod<Query['mumbai_stableSwapExchanges'], Querymumbai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  mumbai_swapDailyVolume: InContextSdkMethod<Query['mumbai_swapDailyVolume'], Querymumbai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapDailyVolumes: InContextSdkMethod<Query['mumbai_swapDailyVolumes'], Querymumbai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_swapHourlyVolume: InContextSdkMethod<Query['mumbai_swapHourlyVolume'], Querymumbai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapHourlyVolumes: InContextSdkMethod<Query['mumbai_swapHourlyVolumes'], Querymumbai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_swapWeeklyVolume: InContextSdkMethod<Query['mumbai_swapWeeklyVolume'], Querymumbai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapWeeklyVolumes: InContextSdkMethod<Query['mumbai_swapWeeklyVolumes'], Querymumbai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapEvent: InContextSdkMethod<Query['mumbai_stableSwapEvent'], Querymumbai_stableSwapEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapEvents: InContextSdkMethod<Query['mumbai_stableSwapEvents'], Querymumbai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  mumbai_swapTradeVolume: InContextSdkMethod<Query['mumbai_swapTradeVolume'], Querymumbai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapTradeVolumes: InContextSdkMethod<Query['mumbai_swapTradeVolumes'], Querymumbai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<Query['mumbai__meta'], Querymumbai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mumbai_systemInfo: InContextSdkMethod<Subscription['mumbai_systemInfo'], Subscriptionmumbai_systemInfoArgs, MeshContext>,
  /** null **/
  mumbai_systemInfos: InContextSdkMethod<Subscription['mumbai_systemInfos'], Subscriptionmumbai_systemInfosArgs, MeshContext>,
  /** null **/
  mumbai_pooledToken: InContextSdkMethod<Subscription['mumbai_pooledToken'], Subscriptionmumbai_pooledTokenArgs, MeshContext>,
  /** null **/
  mumbai_pooledTokens: InContextSdkMethod<Subscription['mumbai_pooledTokens'], Subscriptionmumbai_pooledTokensArgs, MeshContext>,
  /** null **/
  mumbai_stableSwap: InContextSdkMethod<Subscription['mumbai_stableSwap'], Subscriptionmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  mumbai_stableSwaps: InContextSdkMethod<Subscription['mumbai_stableSwaps'], Subscriptionmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['mumbai_stableSwapAddLiquidityEvent'], Subscriptionmumbai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['mumbai_stableSwapAddLiquidityEvents'], Subscriptionmumbai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['mumbai_stableSwapRemoveLiquidityEvent'], Subscriptionmumbai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['mumbai_stableSwapRemoveLiquidityEvents'], Subscriptionmumbai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapExchange: InContextSdkMethod<Subscription['mumbai_stableSwapExchange'], Subscriptionmumbai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapExchanges: InContextSdkMethod<Subscription['mumbai_stableSwapExchanges'], Subscriptionmumbai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  mumbai_swapDailyVolume: InContextSdkMethod<Subscription['mumbai_swapDailyVolume'], Subscriptionmumbai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapDailyVolumes: InContextSdkMethod<Subscription['mumbai_swapDailyVolumes'], Subscriptionmumbai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_swapHourlyVolume: InContextSdkMethod<Subscription['mumbai_swapHourlyVolume'], Subscriptionmumbai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapHourlyVolumes: InContextSdkMethod<Subscription['mumbai_swapHourlyVolumes'], Subscriptionmumbai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_swapWeeklyVolume: InContextSdkMethod<Subscription['mumbai_swapWeeklyVolume'], Subscriptionmumbai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapWeeklyVolumes: InContextSdkMethod<Subscription['mumbai_swapWeeklyVolumes'], Subscriptionmumbai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapEvent: InContextSdkMethod<Subscription['mumbai_stableSwapEvent'], Subscriptionmumbai_stableSwapEventArgs, MeshContext>,
  /** null **/
  mumbai_stableSwapEvents: InContextSdkMethod<Subscription['mumbai_stableSwapEvents'], Subscriptionmumbai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  mumbai_swapTradeVolume: InContextSdkMethod<Subscription['mumbai_swapTradeVolume'], Subscriptionmumbai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  mumbai_swapTradeVolumes: InContextSdkMethod<Subscription['mumbai_swapTradeVolumes'], Subscriptionmumbai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mumbai__meta: InContextSdkMethod<Subscription['mumbai__meta'], Subscriptionmumbai__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Mumbai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
