// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapTestGoerliTypes {
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
  testgoerli_swap_BigDecimal: any;
  BigInt: any;
  testgoerli_swap_Bytes: any;
};

export type testgoerli_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testgoerli_swap_Block_height = {
  hash?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type testgoerli_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type testgoerli_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['testgoerli_swap_Bytes'];
};

export type testgoerli_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_PooledToken_filter>>>;
};

export type testgoerli_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  testgoerli_swap_systemInfo?: Maybe<testgoerli_swap_SystemInfo>;
  testgoerli_swap_systemInfos: Array<testgoerli_swap_SystemInfo>;
  testgoerli_swap_pooledToken?: Maybe<testgoerli_swap_PooledToken>;
  testgoerli_swap_pooledTokens: Array<testgoerli_swap_PooledToken>;
  testgoerli_swap_stableSwap?: Maybe<testgoerli_swap_StableSwap>;
  testgoerli_swap_stableSwaps: Array<testgoerli_swap_StableSwap>;
  testgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<testgoerli_swap_StableSwapAddLiquidityEvent>;
  testgoerli_swap_stableSwapAddLiquidityEvents: Array<testgoerli_swap_StableSwapAddLiquidityEvent>;
  testgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<testgoerli_swap_StableSwapRemoveLiquidityEvent>;
  testgoerli_swap_stableSwapRemoveLiquidityEvents: Array<testgoerli_swap_StableSwapRemoveLiquidityEvent>;
  testgoerli_swap_stableSwapExchange?: Maybe<testgoerli_swap_StableSwapExchange>;
  testgoerli_swap_stableSwapExchanges: Array<testgoerli_swap_StableSwapExchange>;
  testgoerli_swap_swapDailyVolume?: Maybe<testgoerli_swap_SwapDailyVolume>;
  testgoerli_swap_swapDailyVolumes: Array<testgoerli_swap_SwapDailyVolume>;
  testgoerli_swap_swapHourlyVolume?: Maybe<testgoerli_swap_SwapHourlyVolume>;
  testgoerli_swap_swapHourlyVolumes: Array<testgoerli_swap_SwapHourlyVolume>;
  testgoerli_swap_swapWeeklyVolume?: Maybe<testgoerli_swap_SwapWeeklyVolume>;
  testgoerli_swap_swapWeeklyVolumes: Array<testgoerli_swap_SwapWeeklyVolume>;
  testgoerli_swap_stableSwapEvent?: Maybe<testgoerli_swap_StableSwapEvent>;
  testgoerli_swap_stableSwapEvents: Array<testgoerli_swap_StableSwapEvent>;
  testgoerli_swap_swapTradeVolume?: Maybe<testgoerli_swap_SwapTradeVolume>;
  testgoerli_swap_swapTradeVolumes: Array<testgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  testgoerli_swap__meta?: Maybe<testgoerli_swap__Meta_>;
};


export type Querytestgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_swap__metaArgs = {
  block?: InputMaybe<testgoerli_swap_Block_height>;
};

export type testgoerli_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['testgoerli_swap_Bytes'];
  canonicalId?: Maybe<Scalars['testgoerli_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken?: Maybe<Scalars['testgoerli_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<Scalars['testgoerli_swap_Bytes']>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<testgoerli_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<testgoerli_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<testgoerli_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<testgoerli_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<testgoerli_swap_SwapWeeklyVolume>>;
};


export type testgoerli_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapEvent_filter>;
};


export type testgoerli_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapExchange_filter>;
};


export type testgoerli_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>;
};


export type testgoerli_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapDailyVolume_filter>;
};


export type testgoerli_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>;
};

export type testgoerli_swap_StableSwapAddLiquidityEvent = testgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  provider: Scalars['testgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['testgoerli_swap_Bytes'];
};

export type testgoerli_swap_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
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
  lpTokenAmount?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
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
  transaction?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
};

export type testgoerli_swap_StableSwapAddLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'lpTokenAmount'
  | 'balances'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type testgoerli_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['testgoerli_swap_Bytes'];
};

export type testgoerli_swap_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapEvent_filter>>>;
};

export type testgoerli_swap_StableSwapEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type testgoerli_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  buyer: Scalars['testgoerli_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  fee: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['testgoerli_swap_Bytes'];
};

export type testgoerli_swap_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
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
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  transaction?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapExchange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapExchange_filter>>>;
};

export type testgoerli_swap_StableSwapExchange_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'buyer'
  | 'boughtId'
  | 'tokensBought'
  | 'soldId'
  | 'tokensSold'
  | 'balances'
  | 'fee'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type testgoerli_swap_StableSwapRemoveLiquidityEvent = testgoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  provider: Scalars['testgoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['testgoerli_swap_Bytes'];
};

export type testgoerli_swap_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
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
  lpTokenAmount?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  lpTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lpTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
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
  transaction?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
};

export type testgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'provider'
  | 'tokenAmounts'
  | 'fees'
  | 'invariant'
  | 'lpTokenSupply'
  | 'lpTokenAmount'
  | 'balances'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type testgoerli_swap_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['testgoerli_swap_Bytes']>;
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
  pooledTokens?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['testgoerli_swap_Bytes']>>;
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
  events_?: InputMaybe<testgoerli_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<testgoerli_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<testgoerli_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_StableSwap_filter>>>;
};

export type testgoerli_swap_StableSwap_orderBy =
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
  testgoerli_swap_systemInfo?: Maybe<testgoerli_swap_SystemInfo>;
  testgoerli_swap_systemInfos: Array<testgoerli_swap_SystemInfo>;
  testgoerli_swap_pooledToken?: Maybe<testgoerli_swap_PooledToken>;
  testgoerli_swap_pooledTokens: Array<testgoerli_swap_PooledToken>;
  testgoerli_swap_stableSwap?: Maybe<testgoerli_swap_StableSwap>;
  testgoerli_swap_stableSwaps: Array<testgoerli_swap_StableSwap>;
  testgoerli_swap_stableSwapAddLiquidityEvent?: Maybe<testgoerli_swap_StableSwapAddLiquidityEvent>;
  testgoerli_swap_stableSwapAddLiquidityEvents: Array<testgoerli_swap_StableSwapAddLiquidityEvent>;
  testgoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<testgoerli_swap_StableSwapRemoveLiquidityEvent>;
  testgoerli_swap_stableSwapRemoveLiquidityEvents: Array<testgoerli_swap_StableSwapRemoveLiquidityEvent>;
  testgoerli_swap_stableSwapExchange?: Maybe<testgoerli_swap_StableSwapExchange>;
  testgoerli_swap_stableSwapExchanges: Array<testgoerli_swap_StableSwapExchange>;
  testgoerli_swap_swapDailyVolume?: Maybe<testgoerli_swap_SwapDailyVolume>;
  testgoerli_swap_swapDailyVolumes: Array<testgoerli_swap_SwapDailyVolume>;
  testgoerli_swap_swapHourlyVolume?: Maybe<testgoerli_swap_SwapHourlyVolume>;
  testgoerli_swap_swapHourlyVolumes: Array<testgoerli_swap_SwapHourlyVolume>;
  testgoerli_swap_swapWeeklyVolume?: Maybe<testgoerli_swap_SwapWeeklyVolume>;
  testgoerli_swap_swapWeeklyVolumes: Array<testgoerli_swap_SwapWeeklyVolume>;
  testgoerli_swap_stableSwapEvent?: Maybe<testgoerli_swap_StableSwapEvent>;
  testgoerli_swap_stableSwapEvents: Array<testgoerli_swap_StableSwapEvent>;
  testgoerli_swap_swapTradeVolume?: Maybe<testgoerli_swap_SwapTradeVolume>;
  testgoerli_swap_swapTradeVolumes: Array<testgoerli_swap_SwapTradeVolume>;
  /** Access to subgraph metadata */
  testgoerli_swap__meta?: Maybe<testgoerli_swap__Meta_>;
};


export type Subscriptiontestgoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_PooledToken_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<testgoerli_swap_OrderDirection>;
  where?: InputMaybe<testgoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<testgoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_swap__metaArgs = {
  block?: InputMaybe<testgoerli_swap_Block_height>;
};

export type testgoerli_swap_SwapDailyVolume = testgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['testgoerli_swap_BigDecimal'];
};

export type testgoerli_swap_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapDailyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapDailyVolume_filter>>>;
};

export type testgoerli_swap_SwapDailyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type testgoerli_swap_SwapHourlyVolume = testgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['testgoerli_swap_BigDecimal'];
};

export type testgoerli_swap_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapHourlyVolume_filter>>>;
};

export type testgoerli_swap_SwapHourlyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type testgoerli_swap_SwapTradeVolume = {
  stableSwap: testgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['testgoerli_swap_BigDecimal'];
};

export type testgoerli_swap_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapTradeVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapTradeVolume_filter>>>;
};

export type testgoerli_swap_SwapTradeVolume_orderBy =
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type testgoerli_swap_SwapWeeklyVolume = testgoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: testgoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['testgoerli_swap_BigDecimal'];
};

export type testgoerli_swap_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<testgoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['testgoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['testgoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_SwapWeeklyVolume_filter>>>;
};

export type testgoerli_swap_SwapWeeklyVolume_orderBy =
  | 'id'
  | 'stableSwap'
  | 'stableSwap__id'
  | 'stableSwap__isActive'
  | 'stableSwap__key'
  | 'stableSwap__canonicalId'
  | 'stableSwap__domain'
  | 'stableSwap__swapPool'
  | 'stableSwap__lpToken'
  | 'stableSwap__initialA'
  | 'stableSwap__futureA'
  | 'stableSwap__initialATime'
  | 'stableSwap__futureATime'
  | 'stableSwap__swapFee'
  | 'stableSwap__adminFee'
  | 'stableSwap__virtualPrice'
  | 'stableSwap__invariant'
  | 'stableSwap__lpTokenSupply'
  | 'timestamp'
  | 'volume';

export type testgoerli_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type testgoerli_swap_SystemInfo_filter = {
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
  _change_block?: InputMaybe<testgoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_swap_SystemInfo_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_swap_SystemInfo_filter>>>;
};

export type testgoerli_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type testgoerli_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testgoerli_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testgoerli_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testgoerli_swap__Block_;
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
  testgoerli_swap_systemInfo: InContextSdkMethod<Query['testgoerli_swap_systemInfo'], Querytestgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  testgoerli_swap_systemInfos: InContextSdkMethod<Query['testgoerli_swap_systemInfos'], Querytestgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  testgoerli_swap_pooledToken: InContextSdkMethod<Query['testgoerli_swap_pooledToken'], Querytestgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  testgoerli_swap_pooledTokens: InContextSdkMethod<Query['testgoerli_swap_pooledTokens'], Querytestgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwap: InContextSdkMethod<Query['testgoerli_swap_stableSwap'], Querytestgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwaps: InContextSdkMethod<Query['testgoerli_swap_stableSwaps'], Querytestgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['testgoerli_swap_stableSwapAddLiquidityEvent'], Querytestgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['testgoerli_swap_stableSwapAddLiquidityEvents'], Querytestgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['testgoerli_swap_stableSwapRemoveLiquidityEvent'], Querytestgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['testgoerli_swap_stableSwapRemoveLiquidityEvents'], Querytestgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapExchange: InContextSdkMethod<Query['testgoerli_swap_stableSwapExchange'], Querytestgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapExchanges: InContextSdkMethod<Query['testgoerli_swap_stableSwapExchanges'], Querytestgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapDailyVolume: InContextSdkMethod<Query['testgoerli_swap_swapDailyVolume'], Querytestgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapDailyVolumes: InContextSdkMethod<Query['testgoerli_swap_swapDailyVolumes'], Querytestgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapHourlyVolume: InContextSdkMethod<Query['testgoerli_swap_swapHourlyVolume'], Querytestgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Query['testgoerli_swap_swapHourlyVolumes'], Querytestgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Query['testgoerli_swap_swapWeeklyVolume'], Querytestgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Query['testgoerli_swap_swapWeeklyVolumes'], Querytestgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapEvent: InContextSdkMethod<Query['testgoerli_swap_stableSwapEvent'], Querytestgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapEvents: InContextSdkMethod<Query['testgoerli_swap_stableSwapEvents'], Querytestgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapTradeVolume: InContextSdkMethod<Query['testgoerli_swap_swapTradeVolume'], Querytestgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapTradeVolumes: InContextSdkMethod<Query['testgoerli_swap_swapTradeVolumes'], Querytestgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli_swap__meta: InContextSdkMethod<Query['testgoerli_swap__meta'], Querytestgoerli_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testgoerli_swap_systemInfo: InContextSdkMethod<Subscription['testgoerli_swap_systemInfo'], Subscriptiontestgoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  testgoerli_swap_systemInfos: InContextSdkMethod<Subscription['testgoerli_swap_systemInfos'], Subscriptiontestgoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  testgoerli_swap_pooledToken: InContextSdkMethod<Subscription['testgoerli_swap_pooledToken'], Subscriptiontestgoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  testgoerli_swap_pooledTokens: InContextSdkMethod<Subscription['testgoerli_swap_pooledTokens'], Subscriptiontestgoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwap: InContextSdkMethod<Subscription['testgoerli_swap_stableSwap'], Subscriptiontestgoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwaps: InContextSdkMethod<Subscription['testgoerli_swap_stableSwaps'], Subscriptiontestgoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapAddLiquidityEvent'], Subscriptiontestgoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapAddLiquidityEvents'], Subscriptiontestgoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapRemoveLiquidityEvent'], Subscriptiontestgoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapRemoveLiquidityEvents'], Subscriptiontestgoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapExchange: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapExchange'], Subscriptiontestgoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapExchanges: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapExchanges'], Subscriptiontestgoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapDailyVolume: InContextSdkMethod<Subscription['testgoerli_swap_swapDailyVolume'], Subscriptiontestgoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapDailyVolumes: InContextSdkMethod<Subscription['testgoerli_swap_swapDailyVolumes'], Subscriptiontestgoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapHourlyVolume: InContextSdkMethod<Subscription['testgoerli_swap_swapHourlyVolume'], Subscriptiontestgoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['testgoerli_swap_swapHourlyVolumes'], Subscriptiontestgoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['testgoerli_swap_swapWeeklyVolume'], Subscriptiontestgoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['testgoerli_swap_swapWeeklyVolumes'], Subscriptiontestgoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapEvent: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapEvent'], Subscriptiontestgoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  testgoerli_swap_stableSwapEvents: InContextSdkMethod<Subscription['testgoerli_swap_stableSwapEvents'], Subscriptiontestgoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapTradeVolume: InContextSdkMethod<Subscription['testgoerli_swap_swapTradeVolume'], Subscriptiontestgoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  testgoerli_swap_swapTradeVolumes: InContextSdkMethod<Subscription['testgoerli_swap_swapTradeVolumes'], Subscriptiontestgoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli_swap__meta: InContextSdkMethod<Subscription['testgoerli_swap__meta'], Subscriptiontestgoerli_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Test_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
