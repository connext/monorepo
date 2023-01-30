// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapGoerliTypes {
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
  goerli_BigDecimal: any;
  BigInt: any;
  goerli_Bytes: any;
};

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['goerli_Bytes'];
};

export type goerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  goerli_systemInfo?: Maybe<goerli_SystemInfo>;
  goerli_systemInfos: Array<goerli_SystemInfo>;
  goerli_pooledToken?: Maybe<goerli_PooledToken>;
  goerli_pooledTokens: Array<goerli_PooledToken>;
  goerli_stableSwap?: Maybe<goerli_StableSwap>;
  goerli_stableSwaps: Array<goerli_StableSwap>;
  goerli_stableSwapAddLiquidityEvent?: Maybe<goerli_StableSwapAddLiquidityEvent>;
  goerli_stableSwapAddLiquidityEvents: Array<goerli_StableSwapAddLiquidityEvent>;
  goerli_stableSwapRemoveLiquidityEvent?: Maybe<goerli_StableSwapRemoveLiquidityEvent>;
  goerli_stableSwapRemoveLiquidityEvents: Array<goerli_StableSwapRemoveLiquidityEvent>;
  goerli_stableSwapExchange?: Maybe<goerli_StableSwapExchange>;
  goerli_stableSwapExchanges: Array<goerli_StableSwapExchange>;
  goerli_swapDailyVolume?: Maybe<goerli_SwapDailyVolume>;
  goerli_swapDailyVolumes: Array<goerli_SwapDailyVolume>;
  goerli_swapHourlyVolume?: Maybe<goerli_SwapHourlyVolume>;
  goerli_swapHourlyVolumes: Array<goerli_SwapHourlyVolume>;
  goerli_swapWeeklyVolume?: Maybe<goerli_SwapWeeklyVolume>;
  goerli_swapWeeklyVolumes: Array<goerli_SwapWeeklyVolume>;
  goerli_stableSwapEvent?: Maybe<goerli_StableSwapEvent>;
  goerli_stableSwapEvents: Array<goerli_StableSwapEvent>;
  goerli_swapTradeVolume?: Maybe<goerli_SwapTradeVolume>;
  goerli_swapTradeVolumes: Array<goerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Querygoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SystemInfo_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_PooledToken_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwap_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapExchange_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapDailyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapTradeVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['goerli_Bytes'];
  canonicalId?: Maybe<Scalars['goerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['goerli_Bytes']>;
  lpToken?: Maybe<Scalars['goerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<goerli_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<goerli_StableSwapEvent>>;
  exchanges?: Maybe<Array<goerli_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<goerli_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<goerli_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<goerli_SwapWeeklyVolume>>;
};


export type goerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_PooledToken_filter>;
};


export type goerli_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapEvent_filter>;
};


export type goerli_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapExchange_filter>;
};


export type goerli_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapHourlyVolume_filter>;
};


export type goerli_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapDailyVolume_filter>;
};


export type goerli_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapWeeklyVolume_filter>;
};

export type goerli_StableSwapAddLiquidityEvent = goerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  provider: Scalars['goerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['goerli_Bytes'];
};

export type goerli_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwapAddLiquidityEvent_orderBy =
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

export type goerli_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['goerli_Bytes'];
};

export type goerli_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type goerli_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  buyer: Scalars['goerli_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['goerli_Bytes'];
};

export type goerli_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_not?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwapExchange_orderBy =
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

export type goerli_StableSwapRemoveLiquidityEvent = goerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  provider: Scalars['goerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['goerli_Bytes'];
};

export type goerli_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwapRemoveLiquidityEvent_orderBy =
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

export type goerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not?: InputMaybe<Scalars['goerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<goerli_PooledToken_filter>;
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
  events_?: InputMaybe<goerli_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<goerli_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<goerli_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<goerli_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<goerli_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_StableSwap_orderBy =
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
  goerli_systemInfo?: Maybe<goerli_SystemInfo>;
  goerli_systemInfos: Array<goerli_SystemInfo>;
  goerli_pooledToken?: Maybe<goerli_PooledToken>;
  goerli_pooledTokens: Array<goerli_PooledToken>;
  goerli_stableSwap?: Maybe<goerli_StableSwap>;
  goerli_stableSwaps: Array<goerli_StableSwap>;
  goerli_stableSwapAddLiquidityEvent?: Maybe<goerli_StableSwapAddLiquidityEvent>;
  goerli_stableSwapAddLiquidityEvents: Array<goerli_StableSwapAddLiquidityEvent>;
  goerli_stableSwapRemoveLiquidityEvent?: Maybe<goerli_StableSwapRemoveLiquidityEvent>;
  goerli_stableSwapRemoveLiquidityEvents: Array<goerli_StableSwapRemoveLiquidityEvent>;
  goerli_stableSwapExchange?: Maybe<goerli_StableSwapExchange>;
  goerli_stableSwapExchanges: Array<goerli_StableSwapExchange>;
  goerli_swapDailyVolume?: Maybe<goerli_SwapDailyVolume>;
  goerli_swapDailyVolumes: Array<goerli_SwapDailyVolume>;
  goerli_swapHourlyVolume?: Maybe<goerli_SwapHourlyVolume>;
  goerli_swapHourlyVolumes: Array<goerli_SwapHourlyVolume>;
  goerli_swapWeeklyVolume?: Maybe<goerli_SwapWeeklyVolume>;
  goerli_swapWeeklyVolumes: Array<goerli_SwapWeeklyVolume>;
  goerli_stableSwapEvent?: Maybe<goerli_StableSwapEvent>;
  goerli_stableSwapEvents: Array<goerli_StableSwapEvent>;
  goerli_swapTradeVolume?: Maybe<goerli_SwapTradeVolume>;
  goerli_swapTradeVolumes: Array<goerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Subscriptiongoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SystemInfo_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_PooledToken_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwap_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapExchange_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapDailyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_StableSwapEvent_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_SwapTradeVolume_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_SwapDailyVolume = goerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['goerli_BigDecimal'];
};

export type goerli_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type goerli_SwapHourlyVolume = goerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['goerli_BigDecimal'];
};

export type goerli_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type goerli_SwapTradeVolume = {
  stableSwap: goerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['goerli_BigDecimal'];
};

export type goerli_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type goerli_SwapWeeklyVolume = goerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: goerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['goerli_BigDecimal'];
};

export type goerli_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<goerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['goerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['goerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type goerli_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type goerli_SystemInfo_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type goerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['goerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type goerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: goerli__Block_;
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
  goerli_systemInfo: InContextSdkMethod<Query['goerli_systemInfo'], Querygoerli_systemInfoArgs, MeshContext>,
  /** null **/
  goerli_systemInfos: InContextSdkMethod<Query['goerli_systemInfos'], Querygoerli_systemInfosArgs, MeshContext>,
  /** null **/
  goerli_pooledToken: InContextSdkMethod<Query['goerli_pooledToken'], Querygoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  goerli_pooledTokens: InContextSdkMethod<Query['goerli_pooledTokens'], Querygoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  goerli_stableSwap: InContextSdkMethod<Query['goerli_stableSwap'], Querygoerli_stableSwapArgs, MeshContext>,
  /** null **/
  goerli_stableSwaps: InContextSdkMethod<Query['goerli_stableSwaps'], Querygoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['goerli_stableSwapAddLiquidityEvent'], Querygoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['goerli_stableSwapAddLiquidityEvents'], Querygoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['goerli_stableSwapRemoveLiquidityEvent'], Querygoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['goerli_stableSwapRemoveLiquidityEvents'], Querygoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapExchange: InContextSdkMethod<Query['goerli_stableSwapExchange'], Querygoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  goerli_stableSwapExchanges: InContextSdkMethod<Query['goerli_stableSwapExchanges'], Querygoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  goerli_swapDailyVolume: InContextSdkMethod<Query['goerli_swapDailyVolume'], Querygoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapDailyVolumes: InContextSdkMethod<Query['goerli_swapDailyVolumes'], Querygoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  goerli_swapHourlyVolume: InContextSdkMethod<Query['goerli_swapHourlyVolume'], Querygoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapHourlyVolumes: InContextSdkMethod<Query['goerli_swapHourlyVolumes'], Querygoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  goerli_swapWeeklyVolume: InContextSdkMethod<Query['goerli_swapWeeklyVolume'], Querygoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapWeeklyVolumes: InContextSdkMethod<Query['goerli_swapWeeklyVolumes'], Querygoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  goerli_stableSwapEvent: InContextSdkMethod<Query['goerli_stableSwapEvent'], Querygoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapEvents: InContextSdkMethod<Query['goerli_stableSwapEvents'], Querygoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  goerli_swapTradeVolume: InContextSdkMethod<Query['goerli_swapTradeVolume'], Querygoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapTradeVolumes: InContextSdkMethod<Query['goerli_swapTradeVolumes'], Querygoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Query['goerli__meta'], Querygoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  goerli_systemInfo: InContextSdkMethod<Subscription['goerli_systemInfo'], Subscriptiongoerli_systemInfoArgs, MeshContext>,
  /** null **/
  goerli_systemInfos: InContextSdkMethod<Subscription['goerli_systemInfos'], Subscriptiongoerli_systemInfosArgs, MeshContext>,
  /** null **/
  goerli_pooledToken: InContextSdkMethod<Subscription['goerli_pooledToken'], Subscriptiongoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  goerli_pooledTokens: InContextSdkMethod<Subscription['goerli_pooledTokens'], Subscriptiongoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  goerli_stableSwap: InContextSdkMethod<Subscription['goerli_stableSwap'], Subscriptiongoerli_stableSwapArgs, MeshContext>,
  /** null **/
  goerli_stableSwaps: InContextSdkMethod<Subscription['goerli_stableSwaps'], Subscriptiongoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['goerli_stableSwapAddLiquidityEvent'], Subscriptiongoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['goerli_stableSwapAddLiquidityEvents'], Subscriptiongoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['goerli_stableSwapRemoveLiquidityEvent'], Subscriptiongoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['goerli_stableSwapRemoveLiquidityEvents'], Subscriptiongoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  goerli_stableSwapExchange: InContextSdkMethod<Subscription['goerli_stableSwapExchange'], Subscriptiongoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  goerli_stableSwapExchanges: InContextSdkMethod<Subscription['goerli_stableSwapExchanges'], Subscriptiongoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  goerli_swapDailyVolume: InContextSdkMethod<Subscription['goerli_swapDailyVolume'], Subscriptiongoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapDailyVolumes: InContextSdkMethod<Subscription['goerli_swapDailyVolumes'], Subscriptiongoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  goerli_swapHourlyVolume: InContextSdkMethod<Subscription['goerli_swapHourlyVolume'], Subscriptiongoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapHourlyVolumes: InContextSdkMethod<Subscription['goerli_swapHourlyVolumes'], Subscriptiongoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  goerli_swapWeeklyVolume: InContextSdkMethod<Subscription['goerli_swapWeeklyVolume'], Subscriptiongoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapWeeklyVolumes: InContextSdkMethod<Subscription['goerli_swapWeeklyVolumes'], Subscriptiongoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  goerli_stableSwapEvent: InContextSdkMethod<Subscription['goerli_stableSwapEvent'], Subscriptiongoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  goerli_stableSwapEvents: InContextSdkMethod<Subscription['goerli_stableSwapEvents'], Subscriptiongoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  goerli_swapTradeVolume: InContextSdkMethod<Subscription['goerli_swapTradeVolume'], Subscriptiongoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  goerli_swapTradeVolumes: InContextSdkMethod<Subscription['goerli_swapTradeVolumes'], Subscriptiongoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Subscription['goerli__meta'], Subscriptiongoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
