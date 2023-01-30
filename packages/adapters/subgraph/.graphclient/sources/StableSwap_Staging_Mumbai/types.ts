// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapStagingMumbaiTypes {
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
  stagingmumbai_BigDecimal: any;
  BigInt: any;
  stagingmumbai_Bytes: any;
};

export type stagingmumbai_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmumbai_Block_height = {
  hash?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type stagingmumbai_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmumbai_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingmumbai_systemInfo?: Maybe<stagingmumbai_SystemInfo>;
  stagingmumbai_systemInfos: Array<stagingmumbai_SystemInfo>;
  stagingmumbai_pooledToken?: Maybe<stagingmumbai_PooledToken>;
  stagingmumbai_pooledTokens: Array<stagingmumbai_PooledToken>;
  stagingmumbai_stableSwap?: Maybe<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwaps: Array<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwapAddLiquidityEvent?: Maybe<stagingmumbai_StableSwapAddLiquidityEvent>;
  stagingmumbai_stableSwapAddLiquidityEvents: Array<stagingmumbai_StableSwapAddLiquidityEvent>;
  stagingmumbai_stableSwapRemoveLiquidityEvent?: Maybe<stagingmumbai_StableSwapRemoveLiquidityEvent>;
  stagingmumbai_stableSwapRemoveLiquidityEvents: Array<stagingmumbai_StableSwapRemoveLiquidityEvent>;
  stagingmumbai_stableSwapExchange?: Maybe<stagingmumbai_StableSwapExchange>;
  stagingmumbai_stableSwapExchanges: Array<stagingmumbai_StableSwapExchange>;
  stagingmumbai_swapDailyVolume?: Maybe<stagingmumbai_SwapDailyVolume>;
  stagingmumbai_swapDailyVolumes: Array<stagingmumbai_SwapDailyVolume>;
  stagingmumbai_swapHourlyVolume?: Maybe<stagingmumbai_SwapHourlyVolume>;
  stagingmumbai_swapHourlyVolumes: Array<stagingmumbai_SwapHourlyVolume>;
  stagingmumbai_swapWeeklyVolume?: Maybe<stagingmumbai_SwapWeeklyVolume>;
  stagingmumbai_swapWeeklyVolumes: Array<stagingmumbai_SwapWeeklyVolume>;
  stagingmumbai_stableSwapEvent?: Maybe<stagingmumbai_StableSwapEvent>;
  stagingmumbai_stableSwapEvents: Array<stagingmumbai_StableSwapEvent>;
  stagingmumbai_swapTradeVolume?: Maybe<stagingmumbai_SwapTradeVolume>;
  stagingmumbai_swapTradeVolumes: Array<stagingmumbai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingmumbai__meta?: Maybe<stagingmumbai__Meta_>;
};


export type Querystagingmumbai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SystemInfo_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_PooledToken_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwap_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapExchange_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmumbai__metaArgs = {
  block?: InputMaybe<stagingmumbai_Block_height>;
};

export type stagingmumbai_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['stagingmumbai_Bytes'];
  canonicalId?: Maybe<Scalars['stagingmumbai_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingmumbai_Bytes']>;
  lpToken?: Maybe<Scalars['stagingmumbai_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<stagingmumbai_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<stagingmumbai_StableSwapEvent>>;
  exchanges?: Maybe<Array<stagingmumbai_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<stagingmumbai_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<stagingmumbai_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<stagingmumbai_SwapWeeklyVolume>>;
};


export type stagingmumbai_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_PooledToken_filter>;
};


export type stagingmumbai_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapEvent_filter>;
};


export type stagingmumbai_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapExchange_filter>;
};


export type stagingmumbai_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapHourlyVolume_filter>;
};


export type stagingmumbai_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapDailyVolume_filter>;
};


export type stagingmumbai_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapWeeklyVolume_filter>;
};

export type stagingmumbai_StableSwapAddLiquidityEvent = stagingmumbai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  provider: Scalars['stagingmumbai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwapAddLiquidityEvent_orderBy =
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

export type stagingmumbai_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingmumbai_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  buyer: Scalars['stagingmumbai_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwapExchange_orderBy =
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

export type stagingmumbai_StableSwapRemoveLiquidityEvent = stagingmumbai_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  provider: Scalars['stagingmumbai_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingmumbai_Bytes'];
};

export type stagingmumbai_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwapRemoveLiquidityEvent_orderBy =
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

export type stagingmumbai_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingmumbai_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingmumbai_Bytes']>;
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
  pooledTokens_?: InputMaybe<stagingmumbai_PooledToken_filter>;
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
  events_?: InputMaybe<stagingmumbai_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<stagingmumbai_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<stagingmumbai_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<stagingmumbai_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<stagingmumbai_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_StableSwap_orderBy =
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
  stagingmumbai_systemInfo?: Maybe<stagingmumbai_SystemInfo>;
  stagingmumbai_systemInfos: Array<stagingmumbai_SystemInfo>;
  stagingmumbai_pooledToken?: Maybe<stagingmumbai_PooledToken>;
  stagingmumbai_pooledTokens: Array<stagingmumbai_PooledToken>;
  stagingmumbai_stableSwap?: Maybe<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwaps: Array<stagingmumbai_StableSwap>;
  stagingmumbai_stableSwapAddLiquidityEvent?: Maybe<stagingmumbai_StableSwapAddLiquidityEvent>;
  stagingmumbai_stableSwapAddLiquidityEvents: Array<stagingmumbai_StableSwapAddLiquidityEvent>;
  stagingmumbai_stableSwapRemoveLiquidityEvent?: Maybe<stagingmumbai_StableSwapRemoveLiquidityEvent>;
  stagingmumbai_stableSwapRemoveLiquidityEvents: Array<stagingmumbai_StableSwapRemoveLiquidityEvent>;
  stagingmumbai_stableSwapExchange?: Maybe<stagingmumbai_StableSwapExchange>;
  stagingmumbai_stableSwapExchanges: Array<stagingmumbai_StableSwapExchange>;
  stagingmumbai_swapDailyVolume?: Maybe<stagingmumbai_SwapDailyVolume>;
  stagingmumbai_swapDailyVolumes: Array<stagingmumbai_SwapDailyVolume>;
  stagingmumbai_swapHourlyVolume?: Maybe<stagingmumbai_SwapHourlyVolume>;
  stagingmumbai_swapHourlyVolumes: Array<stagingmumbai_SwapHourlyVolume>;
  stagingmumbai_swapWeeklyVolume?: Maybe<stagingmumbai_SwapWeeklyVolume>;
  stagingmumbai_swapWeeklyVolumes: Array<stagingmumbai_SwapWeeklyVolume>;
  stagingmumbai_stableSwapEvent?: Maybe<stagingmumbai_StableSwapEvent>;
  stagingmumbai_stableSwapEvents: Array<stagingmumbai_StableSwapEvent>;
  stagingmumbai_swapTradeVolume?: Maybe<stagingmumbai_SwapTradeVolume>;
  stagingmumbai_swapTradeVolumes: Array<stagingmumbai_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingmumbai__meta?: Maybe<stagingmumbai__Meta_>;
};


export type Subscriptionstagingmumbai_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SystemInfo_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_PooledToken_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwap_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapExchange_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_StableSwapEvent_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmumbai_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingmumbai_OrderDirection>;
  where?: InputMaybe<stagingmumbai_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingmumbai_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmumbai__metaArgs = {
  block?: InputMaybe<stagingmumbai_Block_height>;
};

export type stagingmumbai_SwapDailyVolume = stagingmumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingmumbai_BigDecimal'];
};

export type stagingmumbai_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingmumbai_SwapHourlyVolume = stagingmumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingmumbai_BigDecimal'];
};

export type stagingmumbai_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingmumbai_SwapTradeVolume = {
  stableSwap: stagingmumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingmumbai_BigDecimal'];
};

export type stagingmumbai_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingmumbai_SwapWeeklyVolume = stagingmumbai_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingmumbai_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingmumbai_BigDecimal'];
};

export type stagingmumbai_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingmumbai_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingmumbai_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingmumbai_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingmumbai_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type stagingmumbai_SystemInfo_filter = {
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
  _change_block?: InputMaybe<stagingmumbai_BlockChangedFilter>;
};

export type stagingmumbai_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type stagingmumbai__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmumbai_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmumbai__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmumbai__Block_;
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
  stagingmumbai_systemInfo: InContextSdkMethod<Query['stagingmumbai_systemInfo'], Querystagingmumbai_systemInfoArgs, MeshContext>,
  /** null **/
  stagingmumbai_systemInfos: InContextSdkMethod<Query['stagingmumbai_systemInfos'], Querystagingmumbai_systemInfosArgs, MeshContext>,
  /** null **/
  stagingmumbai_pooledToken: InContextSdkMethod<Query['stagingmumbai_pooledToken'], Querystagingmumbai_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingmumbai_pooledTokens: InContextSdkMethod<Query['stagingmumbai_pooledTokens'], Querystagingmumbai_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwap: InContextSdkMethod<Query['stagingmumbai_stableSwap'], Querystagingmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwaps: InContextSdkMethod<Query['stagingmumbai_stableSwaps'], Querystagingmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingmumbai_stableSwapAddLiquidityEvent'], Querystagingmumbai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingmumbai_stableSwapAddLiquidityEvents'], Querystagingmumbai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingmumbai_stableSwapRemoveLiquidityEvent'], Querystagingmumbai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingmumbai_stableSwapRemoveLiquidityEvents'], Querystagingmumbai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapExchange: InContextSdkMethod<Query['stagingmumbai_stableSwapExchange'], Querystagingmumbai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapExchanges: InContextSdkMethod<Query['stagingmumbai_stableSwapExchanges'], Querystagingmumbai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapDailyVolume: InContextSdkMethod<Query['stagingmumbai_swapDailyVolume'], Querystagingmumbai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapDailyVolumes: InContextSdkMethod<Query['stagingmumbai_swapDailyVolumes'], Querystagingmumbai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapHourlyVolume: InContextSdkMethod<Query['stagingmumbai_swapHourlyVolume'], Querystagingmumbai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapHourlyVolumes: InContextSdkMethod<Query['stagingmumbai_swapHourlyVolumes'], Querystagingmumbai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapWeeklyVolume: InContextSdkMethod<Query['stagingmumbai_swapWeeklyVolume'], Querystagingmumbai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapWeeklyVolumes: InContextSdkMethod<Query['stagingmumbai_swapWeeklyVolumes'], Querystagingmumbai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapEvent: InContextSdkMethod<Query['stagingmumbai_stableSwapEvent'], Querystagingmumbai_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapEvents: InContextSdkMethod<Query['stagingmumbai_stableSwapEvents'], Querystagingmumbai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapTradeVolume: InContextSdkMethod<Query['stagingmumbai_swapTradeVolume'], Querystagingmumbai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapTradeVolumes: InContextSdkMethod<Query['stagingmumbai_swapTradeVolumes'], Querystagingmumbai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmumbai__meta: InContextSdkMethod<Query['stagingmumbai__meta'], Querystagingmumbai__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmumbai_systemInfo: InContextSdkMethod<Subscription['stagingmumbai_systemInfo'], Subscriptionstagingmumbai_systemInfoArgs, MeshContext>,
  /** null **/
  stagingmumbai_systemInfos: InContextSdkMethod<Subscription['stagingmumbai_systemInfos'], Subscriptionstagingmumbai_systemInfosArgs, MeshContext>,
  /** null **/
  stagingmumbai_pooledToken: InContextSdkMethod<Subscription['stagingmumbai_pooledToken'], Subscriptionstagingmumbai_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingmumbai_pooledTokens: InContextSdkMethod<Subscription['stagingmumbai_pooledTokens'], Subscriptionstagingmumbai_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwap: InContextSdkMethod<Subscription['stagingmumbai_stableSwap'], Subscriptionstagingmumbai_stableSwapArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwaps: InContextSdkMethod<Subscription['stagingmumbai_stableSwaps'], Subscriptionstagingmumbai_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingmumbai_stableSwapAddLiquidityEvent'], Subscriptionstagingmumbai_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingmumbai_stableSwapAddLiquidityEvents'], Subscriptionstagingmumbai_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingmumbai_stableSwapRemoveLiquidityEvent'], Subscriptionstagingmumbai_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingmumbai_stableSwapRemoveLiquidityEvents'], Subscriptionstagingmumbai_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapExchange: InContextSdkMethod<Subscription['stagingmumbai_stableSwapExchange'], Subscriptionstagingmumbai_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapExchanges: InContextSdkMethod<Subscription['stagingmumbai_stableSwapExchanges'], Subscriptionstagingmumbai_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapDailyVolume: InContextSdkMethod<Subscription['stagingmumbai_swapDailyVolume'], Subscriptionstagingmumbai_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapDailyVolumes: InContextSdkMethod<Subscription['stagingmumbai_swapDailyVolumes'], Subscriptionstagingmumbai_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapHourlyVolume: InContextSdkMethod<Subscription['stagingmumbai_swapHourlyVolume'], Subscriptionstagingmumbai_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingmumbai_swapHourlyVolumes'], Subscriptionstagingmumbai_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingmumbai_swapWeeklyVolume'], Subscriptionstagingmumbai_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingmumbai_swapWeeklyVolumes'], Subscriptionstagingmumbai_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapEvent: InContextSdkMethod<Subscription['stagingmumbai_stableSwapEvent'], Subscriptionstagingmumbai_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingmumbai_stableSwapEvents: InContextSdkMethod<Subscription['stagingmumbai_stableSwapEvents'], Subscriptionstagingmumbai_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapTradeVolume: InContextSdkMethod<Subscription['stagingmumbai_swapTradeVolume'], Subscriptionstagingmumbai_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingmumbai_swapTradeVolumes: InContextSdkMethod<Subscription['stagingmumbai_swapTradeVolumes'], Subscriptionstagingmumbai_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmumbai__meta: InContextSdkMethod<Subscription['stagingmumbai__meta'], Subscriptionstagingmumbai__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_Mumbai"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
