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
  optimism_swap_BigDecimal: any;
  BigInt: any;
  optimism_swap_Bytes: any;
  optimism_swap_Int8: any;
};

export type optimism_swap_Aggregation_interval =
  | 'hour'
  | 'day';

export type optimism_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type optimism_swap_Block_height = {
  hash?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type optimism_swap_LpAccount = {
  id: Scalars['ID'];
  address: Scalars['optimism_swap_Bytes'];
  balances: Array<optimism_swap_LpAccountBalance>;
};


export type optimism_swap_LpAccountbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpAccountBalance_filter>;
};

export type optimism_swap_LpAccountBalance = {
  id: Scalars['ID'];
  account: optimism_swap_LpAccount;
  token: optimism_swap_LpToken;
  amount: Scalars['optimism_swap_BigDecimal'];
  block?: Maybe<Scalars['BigInt']>;
  modified?: Maybe<Scalars['BigInt']>;
  transaction?: Maybe<Scalars['optimism_swap_Bytes']>;
};

export type optimism_swap_LpAccountBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<optimism_swap_LpAccount_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<optimism_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modified?: InputMaybe<Scalars['BigInt']>;
  modified_not?: InputMaybe<Scalars['BigInt']>;
  modified_gt?: InputMaybe<Scalars['BigInt']>;
  modified_lt?: InputMaybe<Scalars['BigInt']>;
  modified_gte?: InputMaybe<Scalars['BigInt']>;
  modified_lte?: InputMaybe<Scalars['BigInt']>;
  modified_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modified_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_LpAccountBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_LpAccountBalance_filter>>>;
};

export type optimism_swap_LpAccountBalance_orderBy =
  | 'id'
  | 'account'
  | 'account__id'
  | 'account__address'
  | 'token'
  | 'token__id'
  | 'token__address'
  | 'token__decimals'
  | 'token__name'
  | 'token__symbol'
  | 'token__totalSupply'
  | 'amount'
  | 'block'
  | 'modified'
  | 'transaction';

export type optimism_swap_LpAccount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  balances_?: InputMaybe<optimism_swap_LpAccountBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_LpAccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_LpAccount_filter>>>;
};

export type optimism_swap_LpAccount_orderBy =
  | 'id'
  | 'address'
  | 'balances';

export type optimism_swap_LpToken = {
  id: Scalars['ID'];
  address: Scalars['optimism_swap_Bytes'];
  stableSwap: optimism_swap_StableSwap;
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['optimism_swap_BigDecimal'];
  events: Array<optimism_swap_LpTokenEvent>;
};


export type optimism_swap_LpTokeneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpTokenEvent_filter>;
};

export type optimism_swap_LpTokenEvent = {
  id: Scalars['ID'];
  token: optimism_swap_LpToken;
  amount: Scalars['optimism_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_LpTokenEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<optimism_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_LpTokenEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_LpTokenEvent_filter>>>;
};

export type optimism_swap_LpTokenEvent_orderBy =
  | 'id'
  | 'token'
  | 'token__id'
  | 'token__address'
  | 'token__decimals'
  | 'token__name'
  | 'token__symbol'
  | 'token__totalSupply'
  | 'amount'
  | 'block'
  | 'timestamp'
  | 'transaction'
  | 'nonce';

export type optimism_swap_LpToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  totalSupply?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  events_?: InputMaybe<optimism_swap_LpTokenEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_LpToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_LpToken_filter>>>;
};

export type optimism_swap_LpToken_orderBy =
  | 'id'
  | 'address'
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
  | 'decimals'
  | 'name'
  | 'symbol'
  | 'totalSupply'
  | 'events';

export type optimism_swap_LpTransferEvent = optimism_swap_LpTokenEvent & {
  id: Scalars['ID'];
  token: optimism_swap_LpToken;
  amount: Scalars['optimism_swap_BigDecimal'];
  from: Scalars['optimism_swap_Bytes'];
  to: Scalars['optimism_swap_Bytes'];
  fromBalance: Scalars['optimism_swap_BigDecimal'];
  toBalance: Scalars['optimism_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_LpTransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<optimism_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  from?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  from_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  from_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  to_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  fromBalance?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  fromBalance_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  toBalance?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  toBalance_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  toBalance_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_LpTransferEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_LpTransferEvent_filter>>>;
};

export type optimism_swap_LpTransferEvent_orderBy =
  | 'id'
  | 'token'
  | 'token__id'
  | 'token__address'
  | 'token__decimals'
  | 'token__name'
  | 'token__symbol'
  | 'token__totalSupply'
  | 'amount'
  | 'from'
  | 'to'
  | 'fromBalance'
  | 'toBalance'
  | 'block'
  | 'timestamp'
  | 'transaction'
  | 'nonce';

/** Defines the order direction, either ascending or descending */
export type optimism_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type optimism_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['optimism_swap_Bytes'];
};

export type optimism_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_PooledToken_filter>>>;
};

export type optimism_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  optimism_swap_systemInfo?: Maybe<optimism_swap_SystemInfo>;
  optimism_swap_systemInfos: Array<optimism_swap_SystemInfo>;
  optimism_swap_pooledToken?: Maybe<optimism_swap_PooledToken>;
  optimism_swap_pooledTokens: Array<optimism_swap_PooledToken>;
  optimism_swap_stableSwap?: Maybe<optimism_swap_StableSwap>;
  optimism_swap_stableSwaps: Array<optimism_swap_StableSwap>;
  optimism_swap_stableSwapAddLiquidityEvent?: Maybe<optimism_swap_StableSwapAddLiquidityEvent>;
  optimism_swap_stableSwapAddLiquidityEvents: Array<optimism_swap_StableSwapAddLiquidityEvent>;
  optimism_swap_stableSwapRemoveLiquidityEvent?: Maybe<optimism_swap_StableSwapRemoveLiquidityEvent>;
  optimism_swap_stableSwapRemoveLiquidityEvents: Array<optimism_swap_StableSwapRemoveLiquidityEvent>;
  optimism_swap_stableSwapExchange?: Maybe<optimism_swap_StableSwapExchange>;
  optimism_swap_stableSwapExchanges: Array<optimism_swap_StableSwapExchange>;
  optimism_swap_swapDailyVolume?: Maybe<optimism_swap_SwapDailyVolume>;
  optimism_swap_swapDailyVolumes: Array<optimism_swap_SwapDailyVolume>;
  optimism_swap_swapHourlyVolume?: Maybe<optimism_swap_SwapHourlyVolume>;
  optimism_swap_swapHourlyVolumes: Array<optimism_swap_SwapHourlyVolume>;
  optimism_swap_swapWeeklyVolume?: Maybe<optimism_swap_SwapWeeklyVolume>;
  optimism_swap_swapWeeklyVolumes: Array<optimism_swap_SwapWeeklyVolume>;
  optimism_swap_lpAccount?: Maybe<optimism_swap_LpAccount>;
  optimism_swap_lpAccounts: Array<optimism_swap_LpAccount>;
  optimism_swap_lpAccountBalance?: Maybe<optimism_swap_LpAccountBalance>;
  optimism_swap_lpAccountBalances: Array<optimism_swap_LpAccountBalance>;
  optimism_swap_lpToken?: Maybe<optimism_swap_LpToken>;
  optimism_swap_lpTokens: Array<optimism_swap_LpToken>;
  optimism_swap_lpTransferEvent?: Maybe<optimism_swap_LpTransferEvent>;
  optimism_swap_lpTransferEvents: Array<optimism_swap_LpTransferEvent>;
  optimism_swap_stableSwapEvent?: Maybe<optimism_swap_StableSwapEvent>;
  optimism_swap_stableSwapEvents: Array<optimism_swap_StableSwapEvent>;
  optimism_swap_swapTradeVolume?: Maybe<optimism_swap_SwapTradeVolume>;
  optimism_swap_swapTradeVolumes: Array<optimism_swap_SwapTradeVolume>;
  optimism_swap_lpTokenEvent?: Maybe<optimism_swap_LpTokenEvent>;
  optimism_swap_lpTokenEvents: Array<optimism_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  optimism_swap__meta?: Maybe<optimism_swap__Meta_>;
};


export type Queryoptimism_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SystemInfo_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_PooledToken_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwap_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapExchange_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpAccount_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpAccountBalance_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpToken_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpTransferEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpTokenEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryoptimism_swap__metaArgs = {
  block?: InputMaybe<optimism_swap_Block_height>;
};

export type optimism_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['optimism_swap_Bytes'];
  canonicalId?: Maybe<Scalars['optimism_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['optimism_swap_Bytes']>;
  lpToken?: Maybe<Scalars['optimism_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<Scalars['optimism_swap_Bytes']>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<optimism_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<optimism_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<optimism_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<optimism_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<optimism_swap_SwapWeeklyVolume>>;
};


export type optimism_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapEvent_filter>;
};


export type optimism_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapExchange_filter>;
};


export type optimism_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapHourlyVolume_filter>;
};


export type optimism_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapDailyVolume_filter>;
};


export type optimism_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapWeeklyVolume_filter>;
};

export type optimism_swap_StableSwapAddLiquidityEvent = optimism_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  provider: Scalars['optimism_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_filter>>>;
};

export type optimism_swap_StableSwapAddLiquidityEvent_orderBy =
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
  | 'transaction'
  | 'nonce';

export type optimism_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapEvent_filter>>>;
};

export type optimism_swap_StableSwapEvent_orderBy =
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
  | 'transaction'
  | 'nonce';

export type optimism_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  buyer: Scalars['optimism_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  fee: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapExchange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapExchange_filter>>>;
};

export type optimism_swap_StableSwapExchange_orderBy =
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
  | 'transaction'
  | 'nonce';

export type optimism_swap_StableSwapRemoveLiquidityEvent = optimism_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  provider: Scalars['optimism_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['optimism_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type optimism_swap_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_filter>>>;
};

export type optimism_swap_StableSwapRemoveLiquidityEvent_orderBy =
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
  | 'transaction'
  | 'nonce';

export type optimism_swap_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['optimism_swap_Bytes']>;
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
  pooledTokens?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['optimism_swap_Bytes']>>;
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
  events_?: InputMaybe<optimism_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<optimism_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<optimism_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<optimism_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<optimism_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_StableSwap_filter>>>;
};

export type optimism_swap_StableSwap_orderBy =
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
  optimism_swap_systemInfo?: Maybe<optimism_swap_SystemInfo>;
  optimism_swap_systemInfos: Array<optimism_swap_SystemInfo>;
  optimism_swap_pooledToken?: Maybe<optimism_swap_PooledToken>;
  optimism_swap_pooledTokens: Array<optimism_swap_PooledToken>;
  optimism_swap_stableSwap?: Maybe<optimism_swap_StableSwap>;
  optimism_swap_stableSwaps: Array<optimism_swap_StableSwap>;
  optimism_swap_stableSwapAddLiquidityEvent?: Maybe<optimism_swap_StableSwapAddLiquidityEvent>;
  optimism_swap_stableSwapAddLiquidityEvents: Array<optimism_swap_StableSwapAddLiquidityEvent>;
  optimism_swap_stableSwapRemoveLiquidityEvent?: Maybe<optimism_swap_StableSwapRemoveLiquidityEvent>;
  optimism_swap_stableSwapRemoveLiquidityEvents: Array<optimism_swap_StableSwapRemoveLiquidityEvent>;
  optimism_swap_stableSwapExchange?: Maybe<optimism_swap_StableSwapExchange>;
  optimism_swap_stableSwapExchanges: Array<optimism_swap_StableSwapExchange>;
  optimism_swap_swapDailyVolume?: Maybe<optimism_swap_SwapDailyVolume>;
  optimism_swap_swapDailyVolumes: Array<optimism_swap_SwapDailyVolume>;
  optimism_swap_swapHourlyVolume?: Maybe<optimism_swap_SwapHourlyVolume>;
  optimism_swap_swapHourlyVolumes: Array<optimism_swap_SwapHourlyVolume>;
  optimism_swap_swapWeeklyVolume?: Maybe<optimism_swap_SwapWeeklyVolume>;
  optimism_swap_swapWeeklyVolumes: Array<optimism_swap_SwapWeeklyVolume>;
  optimism_swap_lpAccount?: Maybe<optimism_swap_LpAccount>;
  optimism_swap_lpAccounts: Array<optimism_swap_LpAccount>;
  optimism_swap_lpAccountBalance?: Maybe<optimism_swap_LpAccountBalance>;
  optimism_swap_lpAccountBalances: Array<optimism_swap_LpAccountBalance>;
  optimism_swap_lpToken?: Maybe<optimism_swap_LpToken>;
  optimism_swap_lpTokens: Array<optimism_swap_LpToken>;
  optimism_swap_lpTransferEvent?: Maybe<optimism_swap_LpTransferEvent>;
  optimism_swap_lpTransferEvents: Array<optimism_swap_LpTransferEvent>;
  optimism_swap_stableSwapEvent?: Maybe<optimism_swap_StableSwapEvent>;
  optimism_swap_stableSwapEvents: Array<optimism_swap_StableSwapEvent>;
  optimism_swap_swapTradeVolume?: Maybe<optimism_swap_SwapTradeVolume>;
  optimism_swap_swapTradeVolumes: Array<optimism_swap_SwapTradeVolume>;
  optimism_swap_lpTokenEvent?: Maybe<optimism_swap_LpTokenEvent>;
  optimism_swap_lpTokenEvents: Array<optimism_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  optimism_swap__meta?: Maybe<optimism_swap__Meta_>;
};


export type Subscriptionoptimism_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SystemInfo_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_PooledToken_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwap_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapExchange_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpAccount_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpAccountBalance_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpToken_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpTransferEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_StableSwapEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<optimism_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<optimism_swap_OrderDirection>;
  where?: InputMaybe<optimism_swap_LpTokenEvent_filter>;
  block?: InputMaybe<optimism_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionoptimism_swap__metaArgs = {
  block?: InputMaybe<optimism_swap_Block_height>;
};

export type optimism_swap_SwapDailyVolume = optimism_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_swap_BigDecimal'];
};

export type optimism_swap_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_SwapDailyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_SwapDailyVolume_filter>>>;
};

export type optimism_swap_SwapDailyVolume_orderBy =
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

export type optimism_swap_SwapHourlyVolume = optimism_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_swap_BigDecimal'];
};

export type optimism_swap_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_SwapHourlyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_SwapHourlyVolume_filter>>>;
};

export type optimism_swap_SwapHourlyVolume_orderBy =
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

export type optimism_swap_SwapTradeVolume = {
  stableSwap: optimism_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_swap_BigDecimal'];
};

export type optimism_swap_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_SwapTradeVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_SwapTradeVolume_filter>>>;
};

export type optimism_swap_SwapTradeVolume_orderBy =
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

export type optimism_swap_SwapWeeklyVolume = optimism_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: optimism_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['optimism_swap_BigDecimal'];
};

export type optimism_swap_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<optimism_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['optimism_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['optimism_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_SwapWeeklyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_SwapWeeklyVolume_filter>>>;
};

export type optimism_swap_SwapWeeklyVolume_orderBy =
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

export type optimism_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type optimism_swap_SystemInfo_filter = {
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
  _change_block?: InputMaybe<optimism_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<optimism_swap_SystemInfo_filter>>>;
  or?: InputMaybe<Array<InputMaybe<optimism_swap_SystemInfo_filter>>>;
};

export type optimism_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type optimism_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['optimism_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type optimism_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: optimism_swap__Block_;
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
  optimism_swap_systemInfo: InContextSdkMethod<Query['optimism_swap_systemInfo'], Queryoptimism_swap_systemInfoArgs, MeshContext>,
  /** null **/
  optimism_swap_systemInfos: InContextSdkMethod<Query['optimism_swap_systemInfos'], Queryoptimism_swap_systemInfosArgs, MeshContext>,
  /** null **/
  optimism_swap_pooledToken: InContextSdkMethod<Query['optimism_swap_pooledToken'], Queryoptimism_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_swap_pooledTokens: InContextSdkMethod<Query['optimism_swap_pooledTokens'], Queryoptimism_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwap: InContextSdkMethod<Query['optimism_swap_stableSwap'], Queryoptimism_swap_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwaps: InContextSdkMethod<Query['optimism_swap_stableSwaps'], Queryoptimism_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['optimism_swap_stableSwapAddLiquidityEvent'], Queryoptimism_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['optimism_swap_stableSwapAddLiquidityEvents'], Queryoptimism_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['optimism_swap_stableSwapRemoveLiquidityEvent'], Queryoptimism_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['optimism_swap_stableSwapRemoveLiquidityEvents'], Queryoptimism_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapExchange: InContextSdkMethod<Query['optimism_swap_stableSwapExchange'], Queryoptimism_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapExchanges: InContextSdkMethod<Query['optimism_swap_stableSwapExchanges'], Queryoptimism_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapDailyVolume: InContextSdkMethod<Query['optimism_swap_swapDailyVolume'], Queryoptimism_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapDailyVolumes: InContextSdkMethod<Query['optimism_swap_swapDailyVolumes'], Queryoptimism_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapHourlyVolume: InContextSdkMethod<Query['optimism_swap_swapHourlyVolume'], Queryoptimism_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapHourlyVolumes: InContextSdkMethod<Query['optimism_swap_swapHourlyVolumes'], Queryoptimism_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapWeeklyVolume: InContextSdkMethod<Query['optimism_swap_swapWeeklyVolume'], Queryoptimism_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapWeeklyVolumes: InContextSdkMethod<Query['optimism_swap_swapWeeklyVolumes'], Queryoptimism_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccount: InContextSdkMethod<Query['optimism_swap_lpAccount'], Queryoptimism_swap_lpAccountArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccounts: InContextSdkMethod<Query['optimism_swap_lpAccounts'], Queryoptimism_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccountBalance: InContextSdkMethod<Query['optimism_swap_lpAccountBalance'], Queryoptimism_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccountBalances: InContextSdkMethod<Query['optimism_swap_lpAccountBalances'], Queryoptimism_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpToken: InContextSdkMethod<Query['optimism_swap_lpToken'], Queryoptimism_swap_lpTokenArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokens: InContextSdkMethod<Query['optimism_swap_lpTokens'], Queryoptimism_swap_lpTokensArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTransferEvent: InContextSdkMethod<Query['optimism_swap_lpTransferEvent'], Queryoptimism_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTransferEvents: InContextSdkMethod<Query['optimism_swap_lpTransferEvents'], Queryoptimism_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapEvent: InContextSdkMethod<Query['optimism_swap_stableSwapEvent'], Queryoptimism_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapEvents: InContextSdkMethod<Query['optimism_swap_stableSwapEvents'], Queryoptimism_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_swapTradeVolume: InContextSdkMethod<Query['optimism_swap_swapTradeVolume'], Queryoptimism_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapTradeVolumes: InContextSdkMethod<Query['optimism_swap_swapTradeVolumes'], Queryoptimism_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokenEvent: InContextSdkMethod<Query['optimism_swap_lpTokenEvent'], Queryoptimism_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokenEvents: InContextSdkMethod<Query['optimism_swap_lpTokenEvents'], Queryoptimism_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism_swap__meta: InContextSdkMethod<Query['optimism_swap__meta'], Queryoptimism_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  optimism_swap_systemInfo: InContextSdkMethod<Subscription['optimism_swap_systemInfo'], Subscriptionoptimism_swap_systemInfoArgs, MeshContext>,
  /** null **/
  optimism_swap_systemInfos: InContextSdkMethod<Subscription['optimism_swap_systemInfos'], Subscriptionoptimism_swap_systemInfosArgs, MeshContext>,
  /** null **/
  optimism_swap_pooledToken: InContextSdkMethod<Subscription['optimism_swap_pooledToken'], Subscriptionoptimism_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  optimism_swap_pooledTokens: InContextSdkMethod<Subscription['optimism_swap_pooledTokens'], Subscriptionoptimism_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwap: InContextSdkMethod<Subscription['optimism_swap_stableSwap'], Subscriptionoptimism_swap_stableSwapArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwaps: InContextSdkMethod<Subscription['optimism_swap_stableSwaps'], Subscriptionoptimism_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['optimism_swap_stableSwapAddLiquidityEvent'], Subscriptionoptimism_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['optimism_swap_stableSwapAddLiquidityEvents'], Subscriptionoptimism_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['optimism_swap_stableSwapRemoveLiquidityEvent'], Subscriptionoptimism_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['optimism_swap_stableSwapRemoveLiquidityEvents'], Subscriptionoptimism_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapExchange: InContextSdkMethod<Subscription['optimism_swap_stableSwapExchange'], Subscriptionoptimism_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapExchanges: InContextSdkMethod<Subscription['optimism_swap_stableSwapExchanges'], Subscriptionoptimism_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapDailyVolume: InContextSdkMethod<Subscription['optimism_swap_swapDailyVolume'], Subscriptionoptimism_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapDailyVolumes: InContextSdkMethod<Subscription['optimism_swap_swapDailyVolumes'], Subscriptionoptimism_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapHourlyVolume: InContextSdkMethod<Subscription['optimism_swap_swapHourlyVolume'], Subscriptionoptimism_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['optimism_swap_swapHourlyVolumes'], Subscriptionoptimism_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['optimism_swap_swapWeeklyVolume'], Subscriptionoptimism_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['optimism_swap_swapWeeklyVolumes'], Subscriptionoptimism_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccount: InContextSdkMethod<Subscription['optimism_swap_lpAccount'], Subscriptionoptimism_swap_lpAccountArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccounts: InContextSdkMethod<Subscription['optimism_swap_lpAccounts'], Subscriptionoptimism_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccountBalance: InContextSdkMethod<Subscription['optimism_swap_lpAccountBalance'], Subscriptionoptimism_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  optimism_swap_lpAccountBalances: InContextSdkMethod<Subscription['optimism_swap_lpAccountBalances'], Subscriptionoptimism_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpToken: InContextSdkMethod<Subscription['optimism_swap_lpToken'], Subscriptionoptimism_swap_lpTokenArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokens: InContextSdkMethod<Subscription['optimism_swap_lpTokens'], Subscriptionoptimism_swap_lpTokensArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTransferEvent: InContextSdkMethod<Subscription['optimism_swap_lpTransferEvent'], Subscriptionoptimism_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTransferEvents: InContextSdkMethod<Subscription['optimism_swap_lpTransferEvents'], Subscriptionoptimism_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapEvent: InContextSdkMethod<Subscription['optimism_swap_stableSwapEvent'], Subscriptionoptimism_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  optimism_swap_stableSwapEvents: InContextSdkMethod<Subscription['optimism_swap_stableSwapEvents'], Subscriptionoptimism_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  optimism_swap_swapTradeVolume: InContextSdkMethod<Subscription['optimism_swap_swapTradeVolume'], Subscriptionoptimism_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  optimism_swap_swapTradeVolumes: InContextSdkMethod<Subscription['optimism_swap_swapTradeVolumes'], Subscriptionoptimism_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokenEvent: InContextSdkMethod<Subscription['optimism_swap_lpTokenEvent'], Subscriptionoptimism_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  optimism_swap_lpTokenEvents: InContextSdkMethod<Subscription['optimism_swap_lpTokenEvents'], Subscriptionoptimism_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  optimism_swap__meta: InContextSdkMethod<Subscription['optimism_swap__meta'], Subscriptionoptimism_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Optimism"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
