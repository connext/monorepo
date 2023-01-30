// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapArbitrumOneTypes {
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
  arbitrumone_BigDecimal: any;
  BigInt: any;
  arbitrumone_Bytes: any;
};

export type arbitrumone_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumone_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type arbitrumone_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumone_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  arbitrumone_systemInfo?: Maybe<arbitrumone_SystemInfo>;
  arbitrumone_systemInfos: Array<arbitrumone_SystemInfo>;
  arbitrumone_pooledToken?: Maybe<arbitrumone_PooledToken>;
  arbitrumone_pooledTokens: Array<arbitrumone_PooledToken>;
  arbitrumone_stableSwap?: Maybe<arbitrumone_StableSwap>;
  arbitrumone_stableSwaps: Array<arbitrumone_StableSwap>;
  arbitrumone_stableSwapAddLiquidityEvent?: Maybe<arbitrumone_StableSwapAddLiquidityEvent>;
  arbitrumone_stableSwapAddLiquidityEvents: Array<arbitrumone_StableSwapAddLiquidityEvent>;
  arbitrumone_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumone_StableSwapRemoveLiquidityEvent>;
  arbitrumone_stableSwapRemoveLiquidityEvents: Array<arbitrumone_StableSwapRemoveLiquidityEvent>;
  arbitrumone_stableSwapExchange?: Maybe<arbitrumone_StableSwapExchange>;
  arbitrumone_stableSwapExchanges: Array<arbitrumone_StableSwapExchange>;
  arbitrumone_swapDailyVolume?: Maybe<arbitrumone_SwapDailyVolume>;
  arbitrumone_swapDailyVolumes: Array<arbitrumone_SwapDailyVolume>;
  arbitrumone_swapHourlyVolume?: Maybe<arbitrumone_SwapHourlyVolume>;
  arbitrumone_swapHourlyVolumes: Array<arbitrumone_SwapHourlyVolume>;
  arbitrumone_swapWeeklyVolume?: Maybe<arbitrumone_SwapWeeklyVolume>;
  arbitrumone_swapWeeklyVolumes: Array<arbitrumone_SwapWeeklyVolume>;
  arbitrumone_stableSwapEvent?: Maybe<arbitrumone_StableSwapEvent>;
  arbitrumone_stableSwapEvents: Array<arbitrumone_StableSwapEvent>;
  arbitrumone_swapTradeVolume?: Maybe<arbitrumone_SwapTradeVolume>;
  arbitrumone_swapTradeVolumes: Array<arbitrumone_SwapTradeVolume>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Queryarbitrumone_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SystemInfo_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwap_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['arbitrumone_Bytes'];
  canonicalId?: Maybe<Scalars['arbitrumone_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['arbitrumone_Bytes']>;
  lpToken?: Maybe<Scalars['arbitrumone_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<arbitrumone_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<arbitrumone_StableSwapEvent>>;
  exchanges?: Maybe<Array<arbitrumone_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<arbitrumone_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<arbitrumone_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<arbitrumone_SwapWeeklyVolume>>;
};


export type arbitrumone_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
};


export type arbitrumone_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapEvent_filter>;
};


export type arbitrumone_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapExchange_filter>;
};


export type arbitrumone_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapHourlyVolume_filter>;
};


export type arbitrumone_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapDailyVolume_filter>;
};


export type arbitrumone_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapWeeklyVolume_filter>;
};

export type arbitrumone_StableSwapAddLiquidityEvent = arbitrumone_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  provider: Scalars['arbitrumone_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwapAddLiquidityEvent_orderBy =
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

export type arbitrumone_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type arbitrumone_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  buyer: Scalars['arbitrumone_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwapExchange_orderBy =
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

export type arbitrumone_StableSwapRemoveLiquidityEvent = arbitrumone_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  provider: Scalars['arbitrumone_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumone_Bytes'];
};

export type arbitrumone_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwapRemoveLiquidityEvent_orderBy =
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

export type arbitrumone_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['arbitrumone_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['arbitrumone_Bytes']>;
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
  pooledTokens_?: InputMaybe<arbitrumone_PooledToken_filter>;
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
  events_?: InputMaybe<arbitrumone_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<arbitrumone_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<arbitrumone_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<arbitrumone_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<arbitrumone_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_StableSwap_orderBy =
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
  arbitrumone_systemInfo?: Maybe<arbitrumone_SystemInfo>;
  arbitrumone_systemInfos: Array<arbitrumone_SystemInfo>;
  arbitrumone_pooledToken?: Maybe<arbitrumone_PooledToken>;
  arbitrumone_pooledTokens: Array<arbitrumone_PooledToken>;
  arbitrumone_stableSwap?: Maybe<arbitrumone_StableSwap>;
  arbitrumone_stableSwaps: Array<arbitrumone_StableSwap>;
  arbitrumone_stableSwapAddLiquidityEvent?: Maybe<arbitrumone_StableSwapAddLiquidityEvent>;
  arbitrumone_stableSwapAddLiquidityEvents: Array<arbitrumone_StableSwapAddLiquidityEvent>;
  arbitrumone_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumone_StableSwapRemoveLiquidityEvent>;
  arbitrumone_stableSwapRemoveLiquidityEvents: Array<arbitrumone_StableSwapRemoveLiquidityEvent>;
  arbitrumone_stableSwapExchange?: Maybe<arbitrumone_StableSwapExchange>;
  arbitrumone_stableSwapExchanges: Array<arbitrumone_StableSwapExchange>;
  arbitrumone_swapDailyVolume?: Maybe<arbitrumone_SwapDailyVolume>;
  arbitrumone_swapDailyVolumes: Array<arbitrumone_SwapDailyVolume>;
  arbitrumone_swapHourlyVolume?: Maybe<arbitrumone_SwapHourlyVolume>;
  arbitrumone_swapHourlyVolumes: Array<arbitrumone_SwapHourlyVolume>;
  arbitrumone_swapWeeklyVolume?: Maybe<arbitrumone_SwapWeeklyVolume>;
  arbitrumone_swapWeeklyVolumes: Array<arbitrumone_SwapWeeklyVolume>;
  arbitrumone_stableSwapEvent?: Maybe<arbitrumone_StableSwapEvent>;
  arbitrumone_stableSwapEvents: Array<arbitrumone_StableSwapEvent>;
  arbitrumone_swapTradeVolume?: Maybe<arbitrumone_SwapTradeVolume>;
  arbitrumone_swapTradeVolumes: Array<arbitrumone_SwapTradeVolume>;
  /** Access to subgraph metadata */
  arbitrumone__meta?: Maybe<arbitrumone__Meta_>;
};


export type Subscriptionarbitrumone_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SystemInfo_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_PooledToken_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwap_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumone_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumone_OrderDirection>;
  where?: InputMaybe<arbitrumone_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumone_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumone__metaArgs = {
  block?: InputMaybe<arbitrumone_Block_height>;
};

export type arbitrumone_SwapDailyVolume = arbitrumone_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumone_BigDecimal'];
};

export type arbitrumone_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumone_SwapHourlyVolume = arbitrumone_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumone_BigDecimal'];
};

export type arbitrumone_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumone_SwapTradeVolume = {
  stableSwap: arbitrumone_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumone_BigDecimal'];
};

export type arbitrumone_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumone_SwapWeeklyVolume = arbitrumone_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumone_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumone_BigDecimal'];
};

export type arbitrumone_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumone_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumone_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumone_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumone_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type arbitrumone_SystemInfo_filter = {
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
  _change_block?: InputMaybe<arbitrumone_BlockChangedFilter>;
};

export type arbitrumone_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type arbitrumone__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumone_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type arbitrumone__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumone__Block_;
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
  arbitrumone_systemInfo: InContextSdkMethod<Query['arbitrumone_systemInfo'], Queryarbitrumone_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumone_systemInfos: InContextSdkMethod<Query['arbitrumone_systemInfos'], Queryarbitrumone_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledToken: InContextSdkMethod<Query['arbitrumone_pooledToken'], Queryarbitrumone_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledTokens: InContextSdkMethod<Query['arbitrumone_pooledTokens'], Queryarbitrumone_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwap: InContextSdkMethod<Query['arbitrumone_stableSwap'], Queryarbitrumone_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwaps: InContextSdkMethod<Query['arbitrumone_stableSwaps'], Queryarbitrumone_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['arbitrumone_stableSwapAddLiquidityEvent'], Queryarbitrumone_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['arbitrumone_stableSwapAddLiquidityEvents'], Queryarbitrumone_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['arbitrumone_stableSwapRemoveLiquidityEvent'], Queryarbitrumone_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['arbitrumone_stableSwapRemoveLiquidityEvents'], Queryarbitrumone_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapExchange: InContextSdkMethod<Query['arbitrumone_stableSwapExchange'], Queryarbitrumone_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapExchanges: InContextSdkMethod<Query['arbitrumone_stableSwapExchanges'], Queryarbitrumone_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapDailyVolume: InContextSdkMethod<Query['arbitrumone_swapDailyVolume'], Queryarbitrumone_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapDailyVolumes: InContextSdkMethod<Query['arbitrumone_swapDailyVolumes'], Queryarbitrumone_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapHourlyVolume: InContextSdkMethod<Query['arbitrumone_swapHourlyVolume'], Queryarbitrumone_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapHourlyVolumes: InContextSdkMethod<Query['arbitrumone_swapHourlyVolumes'], Queryarbitrumone_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapWeeklyVolume: InContextSdkMethod<Query['arbitrumone_swapWeeklyVolume'], Queryarbitrumone_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapWeeklyVolumes: InContextSdkMethod<Query['arbitrumone_swapWeeklyVolumes'], Queryarbitrumone_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapEvent: InContextSdkMethod<Query['arbitrumone_stableSwapEvent'], Queryarbitrumone_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapEvents: InContextSdkMethod<Query['arbitrumone_stableSwapEvents'], Queryarbitrumone_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_swapTradeVolume: InContextSdkMethod<Query['arbitrumone_swapTradeVolume'], Queryarbitrumone_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapTradeVolumes: InContextSdkMethod<Query['arbitrumone_swapTradeVolumes'], Queryarbitrumone_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Query['arbitrumone__meta'], Queryarbitrumone__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumone_systemInfo: InContextSdkMethod<Subscription['arbitrumone_systemInfo'], Subscriptionarbitrumone_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumone_systemInfos: InContextSdkMethod<Subscription['arbitrumone_systemInfos'], Subscriptionarbitrumone_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledToken: InContextSdkMethod<Subscription['arbitrumone_pooledToken'], Subscriptionarbitrumone_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumone_pooledTokens: InContextSdkMethod<Subscription['arbitrumone_pooledTokens'], Subscriptionarbitrumone_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwap: InContextSdkMethod<Subscription['arbitrumone_stableSwap'], Subscriptionarbitrumone_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwaps: InContextSdkMethod<Subscription['arbitrumone_stableSwaps'], Subscriptionarbitrumone_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['arbitrumone_stableSwapAddLiquidityEvent'], Subscriptionarbitrumone_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['arbitrumone_stableSwapAddLiquidityEvents'], Subscriptionarbitrumone_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['arbitrumone_stableSwapRemoveLiquidityEvent'], Subscriptionarbitrumone_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['arbitrumone_stableSwapRemoveLiquidityEvents'], Subscriptionarbitrumone_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapExchange: InContextSdkMethod<Subscription['arbitrumone_stableSwapExchange'], Subscriptionarbitrumone_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapExchanges: InContextSdkMethod<Subscription['arbitrumone_stableSwapExchanges'], Subscriptionarbitrumone_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapDailyVolume: InContextSdkMethod<Subscription['arbitrumone_swapDailyVolume'], Subscriptionarbitrumone_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapDailyVolumes: InContextSdkMethod<Subscription['arbitrumone_swapDailyVolumes'], Subscriptionarbitrumone_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapHourlyVolume: InContextSdkMethod<Subscription['arbitrumone_swapHourlyVolume'], Subscriptionarbitrumone_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapHourlyVolumes: InContextSdkMethod<Subscription['arbitrumone_swapHourlyVolumes'], Subscriptionarbitrumone_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_swapWeeklyVolume: InContextSdkMethod<Subscription['arbitrumone_swapWeeklyVolume'], Subscriptionarbitrumone_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapWeeklyVolumes: InContextSdkMethod<Subscription['arbitrumone_swapWeeklyVolumes'], Subscriptionarbitrumone_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapEvent: InContextSdkMethod<Subscription['arbitrumone_stableSwapEvent'], Subscriptionarbitrumone_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumone_stableSwapEvents: InContextSdkMethod<Subscription['arbitrumone_stableSwapEvents'], Subscriptionarbitrumone_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumone_swapTradeVolume: InContextSdkMethod<Subscription['arbitrumone_swapTradeVolume'], Subscriptionarbitrumone_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumone_swapTradeVolumes: InContextSdkMethod<Subscription['arbitrumone_swapTradeVolumes'], Subscriptionarbitrumone_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumone__meta: InContextSdkMethod<Subscription['arbitrumone__meta'], Subscriptionarbitrumone__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_ArbitrumOne"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
