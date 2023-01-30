// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapArbitrumGoerliTypes {
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
  arbitrumgoerli_BigDecimal: any;
  BigInt: any;
  arbitrumgoerli_Bytes: any;
};

export type arbitrumgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumgoerli_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type arbitrumgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumgoerli_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  arbitrumgoerli_systemInfo?: Maybe<arbitrumgoerli_SystemInfo>;
  arbitrumgoerli_systemInfos: Array<arbitrumgoerli_SystemInfo>;
  arbitrumgoerli_pooledToken?: Maybe<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_pooledTokens: Array<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_stableSwap?: Maybe<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwaps: Array<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<arbitrumgoerli_StableSwapAddLiquidityEvent>;
  arbitrumgoerli_stableSwapAddLiquidityEvents: Array<arbitrumgoerli_StableSwapAddLiquidityEvent>;
  arbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  arbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<arbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  arbitrumgoerli_stableSwapExchange?: Maybe<arbitrumgoerli_StableSwapExchange>;
  arbitrumgoerli_stableSwapExchanges: Array<arbitrumgoerli_StableSwapExchange>;
  arbitrumgoerli_swapDailyVolume?: Maybe<arbitrumgoerli_SwapDailyVolume>;
  arbitrumgoerli_swapDailyVolumes: Array<arbitrumgoerli_SwapDailyVolume>;
  arbitrumgoerli_swapHourlyVolume?: Maybe<arbitrumgoerli_SwapHourlyVolume>;
  arbitrumgoerli_swapHourlyVolumes: Array<arbitrumgoerli_SwapHourlyVolume>;
  arbitrumgoerli_swapWeeklyVolume?: Maybe<arbitrumgoerli_SwapWeeklyVolume>;
  arbitrumgoerli_swapWeeklyVolumes: Array<arbitrumgoerli_SwapWeeklyVolume>;
  arbitrumgoerli_stableSwapEvent?: Maybe<arbitrumgoerli_StableSwapEvent>;
  arbitrumgoerli_stableSwapEvents: Array<arbitrumgoerli_StableSwapEvent>;
  arbitrumgoerli_swapTradeVolume?: Maybe<arbitrumgoerli_SwapTradeVolume>;
  arbitrumgoerli_swapTradeVolumes: Array<arbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  arbitrumgoerli__meta?: Maybe<arbitrumgoerli__Meta_>;
};


export type Queryarbitrumgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SystemInfo_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumgoerli__metaArgs = {
  block?: InputMaybe<arbitrumgoerli_Block_height>;
};

export type arbitrumgoerli_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['arbitrumgoerli_Bytes'];
  canonicalId?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<arbitrumgoerli_PooledToken>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<arbitrumgoerli_StableSwapEvent>>;
  exchanges?: Maybe<Array<arbitrumgoerli_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<arbitrumgoerli_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<arbitrumgoerli_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<arbitrumgoerli_SwapWeeklyVolume>>;
};


export type arbitrumgoerli_StableSwappooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
};


export type arbitrumgoerli_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapEvent_filter>;
};


export type arbitrumgoerli_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapExchange_filter>;
};


export type arbitrumgoerli_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_filter>;
};


export type arbitrumgoerli_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapDailyVolume_filter>;
};


export type arbitrumgoerli_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_filter>;
};

export type arbitrumgoerli_StableSwapAddLiquidityEvent = arbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  provider: Scalars['arbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwapAddLiquidityEvent_orderBy =
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

export type arbitrumgoerli_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type arbitrumgoerli_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  buyer: Scalars['arbitrumgoerli_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwapExchange_orderBy =
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

export type arbitrumgoerli_StableSwapRemoveLiquidityEvent = arbitrumgoerli_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  provider: Scalars['arbitrumgoerli_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumgoerli_Bytes'];
};

export type arbitrumgoerli_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy =
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

export type arbitrumgoerli_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['arbitrumgoerli_Bytes']>;
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
  pooledTokens_?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
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
  events_?: InputMaybe<arbitrumgoerli_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<arbitrumgoerli_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<arbitrumgoerli_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_StableSwap_orderBy =
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
  arbitrumgoerli_systemInfo?: Maybe<arbitrumgoerli_SystemInfo>;
  arbitrumgoerli_systemInfos: Array<arbitrumgoerli_SystemInfo>;
  arbitrumgoerli_pooledToken?: Maybe<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_pooledTokens: Array<arbitrumgoerli_PooledToken>;
  arbitrumgoerli_stableSwap?: Maybe<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwaps: Array<arbitrumgoerli_StableSwap>;
  arbitrumgoerli_stableSwapAddLiquidityEvent?: Maybe<arbitrumgoerli_StableSwapAddLiquidityEvent>;
  arbitrumgoerli_stableSwapAddLiquidityEvents: Array<arbitrumgoerli_StableSwapAddLiquidityEvent>;
  arbitrumgoerli_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  arbitrumgoerli_stableSwapRemoveLiquidityEvents: Array<arbitrumgoerli_StableSwapRemoveLiquidityEvent>;
  arbitrumgoerli_stableSwapExchange?: Maybe<arbitrumgoerli_StableSwapExchange>;
  arbitrumgoerli_stableSwapExchanges: Array<arbitrumgoerli_StableSwapExchange>;
  arbitrumgoerli_swapDailyVolume?: Maybe<arbitrumgoerli_SwapDailyVolume>;
  arbitrumgoerli_swapDailyVolumes: Array<arbitrumgoerli_SwapDailyVolume>;
  arbitrumgoerli_swapHourlyVolume?: Maybe<arbitrumgoerli_SwapHourlyVolume>;
  arbitrumgoerli_swapHourlyVolumes: Array<arbitrumgoerli_SwapHourlyVolume>;
  arbitrumgoerli_swapWeeklyVolume?: Maybe<arbitrumgoerli_SwapWeeklyVolume>;
  arbitrumgoerli_swapWeeklyVolumes: Array<arbitrumgoerli_SwapWeeklyVolume>;
  arbitrumgoerli_stableSwapEvent?: Maybe<arbitrumgoerli_StableSwapEvent>;
  arbitrumgoerli_stableSwapEvents: Array<arbitrumgoerli_StableSwapEvent>;
  arbitrumgoerli_swapTradeVolume?: Maybe<arbitrumgoerli_SwapTradeVolume>;
  arbitrumgoerli_swapTradeVolumes: Array<arbitrumgoerli_SwapTradeVolume>;
  /** Access to subgraph metadata */
  arbitrumgoerli__meta?: Maybe<arbitrumgoerli__Meta_>;
};


export type Subscriptionarbitrumgoerli_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SystemInfo_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_PooledToken_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumgoerli_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumgoerli_OrderDirection>;
  where?: InputMaybe<arbitrumgoerli_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumgoerli__metaArgs = {
  block?: InputMaybe<arbitrumgoerli_Block_height>;
};

export type arbitrumgoerli_SwapDailyVolume = arbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumgoerli_BigDecimal'];
};

export type arbitrumgoerli_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumgoerli_SwapHourlyVolume = arbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumgoerli_BigDecimal'];
};

export type arbitrumgoerli_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumgoerli_SwapTradeVolume = {
  stableSwap: arbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumgoerli_BigDecimal'];
};

export type arbitrumgoerli_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumgoerli_SwapWeeklyVolume = arbitrumgoerli_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumgoerli_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumgoerli_BigDecimal'];
};

export type arbitrumgoerli_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumgoerli_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumgoerli_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumgoerli_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'timestamp'
  | 'volume';

export type arbitrumgoerli_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type arbitrumgoerli_SystemInfo_filter = {
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
  _change_block?: InputMaybe<arbitrumgoerli_BlockChangedFilter>;
};

export type arbitrumgoerli_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type arbitrumgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type arbitrumgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumgoerli__Block_;
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
  arbitrumgoerli_systemInfo: InContextSdkMethod<Query['arbitrumgoerli_systemInfo'], Queryarbitrumgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_systemInfos: InContextSdkMethod<Query['arbitrumgoerli_systemInfos'], Queryarbitrumgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledToken: InContextSdkMethod<Query['arbitrumgoerli_pooledToken'], Queryarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledTokens: InContextSdkMethod<Query['arbitrumgoerli_pooledTokens'], Queryarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwap: InContextSdkMethod<Query['arbitrumgoerli_stableSwap'], Queryarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwaps: InContextSdkMethod<Query['arbitrumgoerli_stableSwaps'], Queryarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['arbitrumgoerli_stableSwapAddLiquidityEvent'], Queryarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['arbitrumgoerli_stableSwapAddLiquidityEvents'], Queryarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['arbitrumgoerli_stableSwapRemoveLiquidityEvent'], Queryarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['arbitrumgoerli_stableSwapRemoveLiquidityEvents'], Queryarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapExchange: InContextSdkMethod<Query['arbitrumgoerli_stableSwapExchange'], Queryarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Query['arbitrumgoerli_stableSwapExchanges'], Queryarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapDailyVolume: InContextSdkMethod<Query['arbitrumgoerli_swapDailyVolume'], Queryarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Query['arbitrumgoerli_swapDailyVolumes'], Queryarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Query['arbitrumgoerli_swapHourlyVolume'], Queryarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Query['arbitrumgoerli_swapHourlyVolumes'], Queryarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Query['arbitrumgoerli_swapWeeklyVolume'], Queryarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Query['arbitrumgoerli_swapWeeklyVolumes'], Queryarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapEvent: InContextSdkMethod<Query['arbitrumgoerli_stableSwapEvent'], Queryarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapEvents: InContextSdkMethod<Query['arbitrumgoerli_stableSwapEvents'], Queryarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapTradeVolume: InContextSdkMethod<Query['arbitrumgoerli_swapTradeVolume'], Queryarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Query['arbitrumgoerli_swapTradeVolumes'], Queryarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumgoerli__meta: InContextSdkMethod<Query['arbitrumgoerli__meta'], Queryarbitrumgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumgoerli_systemInfo: InContextSdkMethod<Subscription['arbitrumgoerli_systemInfo'], Subscriptionarbitrumgoerli_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_systemInfos: InContextSdkMethod<Subscription['arbitrumgoerli_systemInfos'], Subscriptionarbitrumgoerli_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledToken: InContextSdkMethod<Subscription['arbitrumgoerli_pooledToken'], Subscriptionarbitrumgoerli_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_pooledTokens: InContextSdkMethod<Subscription['arbitrumgoerli_pooledTokens'], Subscriptionarbitrumgoerli_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwap: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwap'], Subscriptionarbitrumgoerli_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwaps: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwaps'], Subscriptionarbitrumgoerli_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapAddLiquidityEvent'], Subscriptionarbitrumgoerli_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapAddLiquidityEvents'], Subscriptionarbitrumgoerli_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapRemoveLiquidityEvent'], Subscriptionarbitrumgoerli_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapRemoveLiquidityEvents'], Subscriptionarbitrumgoerli_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapExchange: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapExchange'], Subscriptionarbitrumgoerli_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapExchanges: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapExchanges'], Subscriptionarbitrumgoerli_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapDailyVolume: InContextSdkMethod<Subscription['arbitrumgoerli_swapDailyVolume'], Subscriptionarbitrumgoerli_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapDailyVolumes: InContextSdkMethod<Subscription['arbitrumgoerli_swapDailyVolumes'], Subscriptionarbitrumgoerli_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapHourlyVolume: InContextSdkMethod<Subscription['arbitrumgoerli_swapHourlyVolume'], Subscriptionarbitrumgoerli_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapHourlyVolumes: InContextSdkMethod<Subscription['arbitrumgoerli_swapHourlyVolumes'], Subscriptionarbitrumgoerli_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapWeeklyVolume: InContextSdkMethod<Subscription['arbitrumgoerli_swapWeeklyVolume'], Subscriptionarbitrumgoerli_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapWeeklyVolumes: InContextSdkMethod<Subscription['arbitrumgoerli_swapWeeklyVolumes'], Subscriptionarbitrumgoerli_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapEvent: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapEvent'], Subscriptionarbitrumgoerli_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_stableSwapEvents: InContextSdkMethod<Subscription['arbitrumgoerli_stableSwapEvents'], Subscriptionarbitrumgoerli_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapTradeVolume: InContextSdkMethod<Subscription['arbitrumgoerli_swapTradeVolume'], Subscriptionarbitrumgoerli_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumgoerli_swapTradeVolumes: InContextSdkMethod<Subscription['arbitrumgoerli_swapTradeVolumes'], Subscriptionarbitrumgoerli_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumgoerli__meta: InContextSdkMethod<Subscription['arbitrumgoerli__meta'], Subscriptionarbitrumgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_ArbitrumGoerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
