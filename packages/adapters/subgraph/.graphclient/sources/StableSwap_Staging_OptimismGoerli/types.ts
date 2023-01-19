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
  stagingoptimismgoerli_BigDecimal: any;
  BigInt: any;
  stagingoptimismgoerli_Bytes: any;
};

export type stagingoptimismgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingoptimismgoerli_Block_height = {
  hash?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type stagingoptimismgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingoptimismgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  stagingoptimismgoerli_systemInfo?: Maybe<stagingoptimismgoerli_SystemInfo>;
  stagingoptimismgoerli_systemInfos: Array<stagingoptimismgoerli_SystemInfo>;
  stagingoptimismgoerli_pooledToken?: Maybe<stagingoptimismgoerli_PooledToken>;
  stagingoptimismgoerli_pooledTokens: Array<stagingoptimismgoerli_PooledToken>;
  stagingoptimismgoerli_stableSwap?: Maybe<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwaps: Array<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_stableSwapAddLiquidityEvents: Array<stagingoptimismgoerli_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvents: Array<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_stableSwapExchange?: Maybe<stagingoptimismgoerli_StableSwapExchange>;
  stagingoptimismgoerli_stableSwapExchanges: Array<stagingoptimismgoerli_StableSwapExchange>;
  stagingoptimismgoerli_swapDailyVolume?: Maybe<stagingoptimismgoerli_SwapDailyVolume>;
  stagingoptimismgoerli_swapDailyVolumes: Array<stagingoptimismgoerli_SwapDailyVolume>;
  stagingoptimismgoerli_swapHourlyVolume?: Maybe<stagingoptimismgoerli_SwapHourlyVolume>;
  stagingoptimismgoerli_swapHourlyVolumes: Array<stagingoptimismgoerli_SwapHourlyVolume>;
  stagingoptimismgoerli_swapWeeklyVolume?: Maybe<stagingoptimismgoerli_SwapWeeklyVolume>;
  stagingoptimismgoerli_swapWeeklyVolumes: Array<stagingoptimismgoerli_SwapWeeklyVolume>;
  stagingoptimismgoerli_stableSwapEvent?: Maybe<stagingoptimismgoerli_StableSwapEvent>;
  stagingoptimismgoerli_stableSwapEvents: Array<stagingoptimismgoerli_StableSwapEvent>;
  stagingoptimismgoerli_swapTradeVolume?: Maybe<stagingoptimismgoerli_SwapTradeVolume>;
  stagingoptimismgoerli_swapTradeVolumes: Array<stagingoptimismgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Querystagingoptimismgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SystemInfo_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['stagingoptimismgoerli_Bytes'];
  canonicalId?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<stagingoptimismgoerli_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<stagingoptimismgoerli_StableSwapEvent>>;
  exchanges?: Maybe<Array<stagingoptimismgoerli_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<stagingoptimismgoerli_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<stagingoptimismgoerli_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<stagingoptimismgoerli_SwapWeeklyVolume>>;
};


export type stagingoptimismgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_PooledToken_filter>;
};


export type stagingoptimismgoerli_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_filter>;
};


export type stagingoptimismgoerli_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_filter>;
};


export type stagingoptimismgoerli_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_filter>;
};


export type stagingoptimismgoerli_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_filter>;
};


export type stagingoptimismgoerli_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_filter>;
};

export type stagingoptimismgoerli_StableSwapAddLiquidityEvent = stagingoptimismgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  provider: Scalars['stagingoptimismgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwapAddLiquidityEvent_orderBy =
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

export type stagingoptimismgoerli_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type stagingoptimismgoerli_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  buyer: Scalars['stagingoptimismgoerli_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwapExchange_orderBy =
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

export type stagingoptimismgoerli_StableSwapRemoveLiquidityEvent = stagingoptimismgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  provider: Scalars['stagingoptimismgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['stagingoptimismgoerli_Bytes'];
};

export type stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_orderBy =
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

export type stagingoptimismgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['stagingoptimismgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<stagingoptimismgoerli_PooledToken_filter>;
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
  events_?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_StableSwap_orderBy =
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
  stagingoptimismgoerli_systemInfo?: Maybe<stagingoptimismgoerli_SystemInfo>;
  stagingoptimismgoerli_systemInfos: Array<stagingoptimismgoerli_SystemInfo>;
  stagingoptimismgoerli_pooledToken?: Maybe<stagingoptimismgoerli_PooledToken>;
  stagingoptimismgoerli_pooledTokens: Array<stagingoptimismgoerli_PooledToken>;
  stagingoptimismgoerli_stableSwap?: Maybe<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwaps: Array<stagingoptimismgoerli_StableSwap>;
  stagingoptimismgoerli_stableSwapAddLiquidityEvent?: Maybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_stableSwapAddLiquidityEvents: Array<stagingoptimismgoerli_StableSwapAddLiquidityEvent>;
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvent?: Maybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvents: Array<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent>;
  stagingoptimismgoerli_stableSwapExchange?: Maybe<stagingoptimismgoerli_StableSwapExchange>;
  stagingoptimismgoerli_stableSwapExchanges: Array<stagingoptimismgoerli_StableSwapExchange>;
  stagingoptimismgoerli_swapDailyVolume?: Maybe<stagingoptimismgoerli_SwapDailyVolume>;
  stagingoptimismgoerli_swapDailyVolumes: Array<stagingoptimismgoerli_SwapDailyVolume>;
  stagingoptimismgoerli_swapHourlyVolume?: Maybe<stagingoptimismgoerli_SwapHourlyVolume>;
  stagingoptimismgoerli_swapHourlyVolumes: Array<stagingoptimismgoerli_SwapHourlyVolume>;
  stagingoptimismgoerli_swapWeeklyVolume?: Maybe<stagingoptimismgoerli_SwapWeeklyVolume>;
  stagingoptimismgoerli_swapWeeklyVolumes: Array<stagingoptimismgoerli_SwapWeeklyVolume>;
  stagingoptimismgoerli_stableSwapEvent?: Maybe<stagingoptimismgoerli_StableSwapEvent>;
  stagingoptimismgoerli_stableSwapEvents: Array<stagingoptimismgoerli_StableSwapEvent>;
  stagingoptimismgoerli_swapTradeVolume?: Maybe<stagingoptimismgoerli_SwapTradeVolume>;
  stagingoptimismgoerli_swapTradeVolumes: Array<stagingoptimismgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  stagingoptimismgoerli__meta?: Maybe<stagingoptimismgoerli__Meta_>;
};


export type Subscriptionstagingoptimismgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SystemInfo_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_PooledToken_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingoptimismgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<stagingoptimismgoerli_OrderDirection>;
  where?: InputMaybe<stagingoptimismgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingoptimismgoerli__metaArgs = {
  block?: InputMaybe<stagingoptimismgoerli_Block_height>;
};

export type stagingoptimismgoerli_SwapDailyVolume = stagingoptimismgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_BigDecimal'];
};

export type stagingoptimismgoerli_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_SwapHourlyVolume = stagingoptimismgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_BigDecimal'];
};

export type stagingoptimismgoerli_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_SwapTradeVolume = {
  stableSwap: stagingoptimismgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_BigDecimal'];
};

export type stagingoptimismgoerli_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_SwapWeeklyVolume = stagingoptimismgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: stagingoptimismgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['stagingoptimismgoerli_BigDecimal'];
};

export type stagingoptimismgoerli_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<stagingoptimismgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['stagingoptimismgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['stagingoptimismgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type stagingoptimismgoerli_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type stagingoptimismgoerli_SystemInfo_filter = {
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
  _change_block?: InputMaybe<stagingoptimismgoerli_BlockChangedFilter>;
};

export type stagingoptimismgoerli_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type stagingoptimismgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingoptimismgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingoptimismgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingoptimismgoerli__Block_;
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
  stagingoptimismgoerli_systemInfo: InContextSdkMethod<Query['stagingoptimismgoerli_systemInfo'], Querystagingoptimismgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_systemInfos: InContextSdkMethod<Query['stagingoptimismgoerli_systemInfos'], Querystagingoptimismgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_pooledToken: InContextSdkMethod<Query['stagingoptimismgoerli_pooledToken'], Querystagingoptimismgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_pooledTokens: InContextSdkMethod<Query['stagingoptimismgoerli_pooledTokens'], Querystagingoptimismgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwap: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwap'], Querystagingoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwaps: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwaps'], Querystagingoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapAddLiquidityEvent'], Querystagingoptimismgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapAddLiquidityEvents'], Querystagingoptimismgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapRemoveLiquidityEvent'], Querystagingoptimismgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapRemoveLiquidityEvents'], Querystagingoptimismgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapExchange: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapExchange'], Querystagingoptimismgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapExchanges: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapExchanges'], Querystagingoptimismgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapDailyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swapDailyVolume'], Querystagingoptimismgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapDailyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swapDailyVolumes'], Querystagingoptimismgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapHourlyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swapHourlyVolume'], Querystagingoptimismgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapHourlyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swapHourlyVolumes'], Querystagingoptimismgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapWeeklyVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swapWeeklyVolume'], Querystagingoptimismgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapWeeklyVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swapWeeklyVolumes'], Querystagingoptimismgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapEvent: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapEvent'], Querystagingoptimismgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapEvents: InContextSdkMethod<Query['stagingoptimismgoerli_stableSwapEvents'], Querystagingoptimismgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapTradeVolume: InContextSdkMethod<Query['stagingoptimismgoerli_swapTradeVolume'], Querystagingoptimismgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapTradeVolumes: InContextSdkMethod<Query['stagingoptimismgoerli_swapTradeVolumes'], Querystagingoptimismgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<Query['stagingoptimismgoerli__meta'], Querystagingoptimismgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingoptimismgoerli_systemInfo: InContextSdkMethod<Subscription['stagingoptimismgoerli_systemInfo'], Subscriptionstagingoptimismgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_systemInfos: InContextSdkMethod<Subscription['stagingoptimismgoerli_systemInfos'], Subscriptionstagingoptimismgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_pooledToken: InContextSdkMethod<Subscription['stagingoptimismgoerli_pooledToken'], Subscriptionstagingoptimismgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_pooledTokens: InContextSdkMethod<Subscription['stagingoptimismgoerli_pooledTokens'], Subscriptionstagingoptimismgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwap: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwap'], Subscriptionstagingoptimismgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwaps: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwaps'], Subscriptionstagingoptimismgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapAddLiquidityEvent'], Subscriptionstagingoptimismgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapAddLiquidityEvents'], Subscriptionstagingoptimismgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapRemoveLiquidityEvent'], Subscriptionstagingoptimismgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapRemoveLiquidityEvents'], Subscriptionstagingoptimismgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapExchange: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapExchange'], Subscriptionstagingoptimismgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapExchanges: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapExchanges'], Subscriptionstagingoptimismgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapDailyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapDailyVolume'], Subscriptionstagingoptimismgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapDailyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapDailyVolumes'], Subscriptionstagingoptimismgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapHourlyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapHourlyVolume'], Subscriptionstagingoptimismgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapHourlyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapHourlyVolumes'], Subscriptionstagingoptimismgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapWeeklyVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapWeeklyVolume'], Subscriptionstagingoptimismgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapWeeklyVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapWeeklyVolumes'], Subscriptionstagingoptimismgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapEvent: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapEvent'], Subscriptionstagingoptimismgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_stableSwapEvents: InContextSdkMethod<Subscription['stagingoptimismgoerli_stableSwapEvents'], Subscriptionstagingoptimismgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapTradeVolume: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapTradeVolume'], Subscriptionstagingoptimismgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  stagingoptimismgoerli_swapTradeVolumes: InContextSdkMethod<Subscription['stagingoptimismgoerli_swapTradeVolumes'], Subscriptionstagingoptimismgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingoptimismgoerli__meta: InContextSdkMethod<Subscription['stagingoptimismgoerli__meta'], Subscriptionstagingoptimismgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_OptimismGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
