// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapArbitrumSepoliaTypes {
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
  arbitrumsepolia_swap_BigDecimal: any;
  BigInt: any;
  arbitrumsepolia_swap_Bytes: any;
  arbitrumsepolia_swap_Int8: any;
};

export type arbitrumsepolia_swap_Aggregation_interval =
  | 'hour'
  | 'day';

export type arbitrumsepolia_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type arbitrumsepolia_swap_Block_height = {
  hash?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type arbitrumsepolia_swap_LpAccount = {
  id: Scalars['ID'];
  address: Scalars['arbitrumsepolia_swap_Bytes'];
  balances: Array<arbitrumsepolia_swap_LpAccountBalance>;
};


export type arbitrumsepolia_swap_LpAccountbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>;
};

export type arbitrumsepolia_swap_LpAccountBalance = {
  id: Scalars['ID'];
  account: arbitrumsepolia_swap_LpAccount;
  token: arbitrumsepolia_swap_LpToken;
  amount: Scalars['arbitrumsepolia_swap_BigDecimal'];
  block?: Maybe<Scalars['BigInt']>;
  modified?: Maybe<Scalars['BigInt']>;
  transaction?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
};

export type arbitrumsepolia_swap_LpAccountBalance_filter = {
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
  account_?: InputMaybe<arbitrumsepolia_swap_LpAccount_filter>;
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
  token_?: InputMaybe<arbitrumsepolia_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>>>;
};

export type arbitrumsepolia_swap_LpAccountBalance_orderBy =
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

export type arbitrumsepolia_swap_LpAccount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  balances_?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpAccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpAccount_filter>>>;
};

export type arbitrumsepolia_swap_LpAccount_orderBy =
  | 'id'
  | 'address'
  | 'balances';

export type arbitrumsepolia_swap_LpToken = {
  id: Scalars['ID'];
  address: Scalars['arbitrumsepolia_swap_Bytes'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['arbitrumsepolia_swap_BigDecimal'];
  events: Array<arbitrumsepolia_swap_LpTokenEvent>;
};


export type arbitrumsepolia_swap_LpTokeneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>;
};

export type arbitrumsepolia_swap_LpTokenEvent = {
  id: Scalars['ID'];
  token: arbitrumsepolia_swap_LpToken;
  amount: Scalars['arbitrumsepolia_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_LpTokenEvent_filter = {
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
  token_?: InputMaybe<arbitrumsepolia_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>>>;
};

export type arbitrumsepolia_swap_LpTokenEvent_orderBy =
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

export type arbitrumsepolia_swap_LpToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
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
  totalSupply?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  events_?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpToken_filter>>>;
};

export type arbitrumsepolia_swap_LpToken_orderBy =
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

export type arbitrumsepolia_swap_LpTransferEvent = arbitrumsepolia_swap_LpTokenEvent & {
  id: Scalars['ID'];
  token: arbitrumsepolia_swap_LpToken;
  amount: Scalars['arbitrumsepolia_swap_BigDecimal'];
  from: Scalars['arbitrumsepolia_swap_Bytes'];
  to: Scalars['arbitrumsepolia_swap_Bytes'];
  fromBalance: Scalars['arbitrumsepolia_swap_BigDecimal'];
  toBalance: Scalars['arbitrumsepolia_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_LpTransferEvent_filter = {
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
  token_?: InputMaybe<arbitrumsepolia_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  from?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  from_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  from_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  to_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  fromBalance?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  fromBalance_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  toBalance?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  toBalance_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  toBalance_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpTransferEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_LpTransferEvent_filter>>>;
};

export type arbitrumsepolia_swap_LpTransferEvent_orderBy =
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
export type arbitrumsepolia_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type arbitrumsepolia_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['arbitrumsepolia_swap_Bytes'];
};

export type arbitrumsepolia_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_PooledToken_filter>>>;
};

export type arbitrumsepolia_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  arbitrumsepolia_swap_systemInfo?: Maybe<arbitrumsepolia_swap_SystemInfo>;
  arbitrumsepolia_swap_systemInfos: Array<arbitrumsepolia_swap_SystemInfo>;
  arbitrumsepolia_swap_pooledToken?: Maybe<arbitrumsepolia_swap_PooledToken>;
  arbitrumsepolia_swap_pooledTokens: Array<arbitrumsepolia_swap_PooledToken>;
  arbitrumsepolia_swap_stableSwap?: Maybe<arbitrumsepolia_swap_StableSwap>;
  arbitrumsepolia_swap_stableSwaps: Array<arbitrumsepolia_swap_StableSwap>;
  arbitrumsepolia_swap_stableSwapAddLiquidityEvent?: Maybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapAddLiquidityEvents: Array<arbitrumsepolia_swap_StableSwapAddLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents: Array<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapExchange?: Maybe<arbitrumsepolia_swap_StableSwapExchange>;
  arbitrumsepolia_swap_stableSwapExchanges: Array<arbitrumsepolia_swap_StableSwapExchange>;
  arbitrumsepolia_swap_swapDailyVolume?: Maybe<arbitrumsepolia_swap_SwapDailyVolume>;
  arbitrumsepolia_swap_swapDailyVolumes: Array<arbitrumsepolia_swap_SwapDailyVolume>;
  arbitrumsepolia_swap_swapHourlyVolume?: Maybe<arbitrumsepolia_swap_SwapHourlyVolume>;
  arbitrumsepolia_swap_swapHourlyVolumes: Array<arbitrumsepolia_swap_SwapHourlyVolume>;
  arbitrumsepolia_swap_swapWeeklyVolume?: Maybe<arbitrumsepolia_swap_SwapWeeklyVolume>;
  arbitrumsepolia_swap_swapWeeklyVolumes: Array<arbitrumsepolia_swap_SwapWeeklyVolume>;
  arbitrumsepolia_swap_lpAccount?: Maybe<arbitrumsepolia_swap_LpAccount>;
  arbitrumsepolia_swap_lpAccounts: Array<arbitrumsepolia_swap_LpAccount>;
  arbitrumsepolia_swap_lpAccountBalance?: Maybe<arbitrumsepolia_swap_LpAccountBalance>;
  arbitrumsepolia_swap_lpAccountBalances: Array<arbitrumsepolia_swap_LpAccountBalance>;
  arbitrumsepolia_swap_lpToken?: Maybe<arbitrumsepolia_swap_LpToken>;
  arbitrumsepolia_swap_lpTokens: Array<arbitrumsepolia_swap_LpToken>;
  arbitrumsepolia_swap_lpTransferEvent?: Maybe<arbitrumsepolia_swap_LpTransferEvent>;
  arbitrumsepolia_swap_lpTransferEvents: Array<arbitrumsepolia_swap_LpTransferEvent>;
  arbitrumsepolia_swap_stableSwapEvent?: Maybe<arbitrumsepolia_swap_StableSwapEvent>;
  arbitrumsepolia_swap_stableSwapEvents: Array<arbitrumsepolia_swap_StableSwapEvent>;
  arbitrumsepolia_swap_swapTradeVolume?: Maybe<arbitrumsepolia_swap_SwapTradeVolume>;
  arbitrumsepolia_swap_swapTradeVolumes: Array<arbitrumsepolia_swap_SwapTradeVolume>;
  arbitrumsepolia_swap_lpTokenEvent?: Maybe<arbitrumsepolia_swap_LpTokenEvent>;
  arbitrumsepolia_swap_lpTokenEvents: Array<arbitrumsepolia_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  arbitrumsepolia_swap__meta?: Maybe<arbitrumsepolia_swap__Meta_>;
};


export type Queryarbitrumsepolia_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SystemInfo_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_PooledToken_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpAccount_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpToken_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpTransferEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrumsepolia_swap__metaArgs = {
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
};

export type arbitrumsepolia_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['arbitrumsepolia_swap_Bytes'];
  canonicalId?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<Scalars['arbitrumsepolia_swap_Bytes']>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<arbitrumsepolia_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<arbitrumsepolia_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<arbitrumsepolia_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<arbitrumsepolia_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<arbitrumsepolia_swap_SwapWeeklyVolume>>;
};


export type arbitrumsepolia_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>;
};


export type arbitrumsepolia_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>;
};


export type arbitrumsepolia_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>;
};


export type arbitrumsepolia_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>;
};


export type arbitrumsepolia_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>;
};

export type arbitrumsepolia_swap_StableSwapAddLiquidityEvent = arbitrumsepolia_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  provider: Scalars['arbitrumsepolia_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_filter>>>;
};

export type arbitrumsepolia_swap_StableSwapAddLiquidityEvent_orderBy =
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

export type arbitrumsepolia_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>>>;
};

export type arbitrumsepolia_swap_StableSwapEvent_orderBy =
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

export type arbitrumsepolia_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  buyer: Scalars['arbitrumsepolia_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  fee: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>>>;
};

export type arbitrumsepolia_swap_StableSwapExchange_orderBy =
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

export type arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent = arbitrumsepolia_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  provider: Scalars['arbitrumsepolia_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['arbitrumsepolia_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_filter>>>;
};

export type arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_orderBy =
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

export type arbitrumsepolia_swap_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['arbitrumsepolia_swap_Bytes']>;
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
  pooledTokens?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_Bytes']>>;
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
  events_?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_StableSwap_filter>>>;
};

export type arbitrumsepolia_swap_StableSwap_orderBy =
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
  arbitrumsepolia_swap_systemInfo?: Maybe<arbitrumsepolia_swap_SystemInfo>;
  arbitrumsepolia_swap_systemInfos: Array<arbitrumsepolia_swap_SystemInfo>;
  arbitrumsepolia_swap_pooledToken?: Maybe<arbitrumsepolia_swap_PooledToken>;
  arbitrumsepolia_swap_pooledTokens: Array<arbitrumsepolia_swap_PooledToken>;
  arbitrumsepolia_swap_stableSwap?: Maybe<arbitrumsepolia_swap_StableSwap>;
  arbitrumsepolia_swap_stableSwaps: Array<arbitrumsepolia_swap_StableSwap>;
  arbitrumsepolia_swap_stableSwapAddLiquidityEvent?: Maybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapAddLiquidityEvents: Array<arbitrumsepolia_swap_StableSwapAddLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent?: Maybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents: Array<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent>;
  arbitrumsepolia_swap_stableSwapExchange?: Maybe<arbitrumsepolia_swap_StableSwapExchange>;
  arbitrumsepolia_swap_stableSwapExchanges: Array<arbitrumsepolia_swap_StableSwapExchange>;
  arbitrumsepolia_swap_swapDailyVolume?: Maybe<arbitrumsepolia_swap_SwapDailyVolume>;
  arbitrumsepolia_swap_swapDailyVolumes: Array<arbitrumsepolia_swap_SwapDailyVolume>;
  arbitrumsepolia_swap_swapHourlyVolume?: Maybe<arbitrumsepolia_swap_SwapHourlyVolume>;
  arbitrumsepolia_swap_swapHourlyVolumes: Array<arbitrumsepolia_swap_SwapHourlyVolume>;
  arbitrumsepolia_swap_swapWeeklyVolume?: Maybe<arbitrumsepolia_swap_SwapWeeklyVolume>;
  arbitrumsepolia_swap_swapWeeklyVolumes: Array<arbitrumsepolia_swap_SwapWeeklyVolume>;
  arbitrumsepolia_swap_lpAccount?: Maybe<arbitrumsepolia_swap_LpAccount>;
  arbitrumsepolia_swap_lpAccounts: Array<arbitrumsepolia_swap_LpAccount>;
  arbitrumsepolia_swap_lpAccountBalance?: Maybe<arbitrumsepolia_swap_LpAccountBalance>;
  arbitrumsepolia_swap_lpAccountBalances: Array<arbitrumsepolia_swap_LpAccountBalance>;
  arbitrumsepolia_swap_lpToken?: Maybe<arbitrumsepolia_swap_LpToken>;
  arbitrumsepolia_swap_lpTokens: Array<arbitrumsepolia_swap_LpToken>;
  arbitrumsepolia_swap_lpTransferEvent?: Maybe<arbitrumsepolia_swap_LpTransferEvent>;
  arbitrumsepolia_swap_lpTransferEvents: Array<arbitrumsepolia_swap_LpTransferEvent>;
  arbitrumsepolia_swap_stableSwapEvent?: Maybe<arbitrumsepolia_swap_StableSwapEvent>;
  arbitrumsepolia_swap_stableSwapEvents: Array<arbitrumsepolia_swap_StableSwapEvent>;
  arbitrumsepolia_swap_swapTradeVolume?: Maybe<arbitrumsepolia_swap_SwapTradeVolume>;
  arbitrumsepolia_swap_swapTradeVolumes: Array<arbitrumsepolia_swap_SwapTradeVolume>;
  arbitrumsepolia_swap_lpTokenEvent?: Maybe<arbitrumsepolia_swap_LpTokenEvent>;
  arbitrumsepolia_swap_lpTokenEvents: Array<arbitrumsepolia_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  arbitrumsepolia_swap__meta?: Maybe<arbitrumsepolia_swap__Meta_>;
};


export type Subscriptionarbitrumsepolia_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SystemInfo_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_PooledToken_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapExchange_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpAccount_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpAccountBalance_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpToken_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpTransferEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_StableSwapEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<arbitrumsepolia_swap_OrderDirection>;
  where?: InputMaybe<arbitrumsepolia_swap_LpTokenEvent_filter>;
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrumsepolia_swap__metaArgs = {
  block?: InputMaybe<arbitrumsepolia_swap_Block_height>;
};

export type arbitrumsepolia_swap_SwapDailyVolume = arbitrumsepolia_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumsepolia_swap_BigDecimal'];
};

export type arbitrumsepolia_swap_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapDailyVolume_filter>>>;
};

export type arbitrumsepolia_swap_SwapDailyVolume_orderBy =
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

export type arbitrumsepolia_swap_SwapHourlyVolume = arbitrumsepolia_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumsepolia_swap_BigDecimal'];
};

export type arbitrumsepolia_swap_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapHourlyVolume_filter>>>;
};

export type arbitrumsepolia_swap_SwapHourlyVolume_orderBy =
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

export type arbitrumsepolia_swap_SwapTradeVolume = {
  stableSwap: arbitrumsepolia_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumsepolia_swap_BigDecimal'];
};

export type arbitrumsepolia_swap_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapTradeVolume_filter>>>;
};

export type arbitrumsepolia_swap_SwapTradeVolume_orderBy =
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

export type arbitrumsepolia_swap_SwapWeeklyVolume = arbitrumsepolia_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: arbitrumsepolia_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['arbitrumsepolia_swap_BigDecimal'];
};

export type arbitrumsepolia_swap_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<arbitrumsepolia_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['arbitrumsepolia_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['arbitrumsepolia_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SwapWeeklyVolume_filter>>>;
};

export type arbitrumsepolia_swap_SwapWeeklyVolume_orderBy =
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

export type arbitrumsepolia_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type arbitrumsepolia_swap_SystemInfo_filter = {
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
  _change_block?: InputMaybe<arbitrumsepolia_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SystemInfo_filter>>>;
  or?: InputMaybe<Array<InputMaybe<arbitrumsepolia_swap_SystemInfo_filter>>>;
};

export type arbitrumsepolia_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type arbitrumsepolia_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['arbitrumsepolia_swap_Bytes']>;
};

/** The type for the top-level _meta field */
export type arbitrumsepolia_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: arbitrumsepolia_swap__Block_;
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
  arbitrumsepolia_swap_systemInfo: InContextSdkMethod<Query['arbitrumsepolia_swap_systemInfo'], Queryarbitrumsepolia_swap_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_systemInfos: InContextSdkMethod<Query['arbitrumsepolia_swap_systemInfos'], Queryarbitrumsepolia_swap_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_pooledToken: InContextSdkMethod<Query['arbitrumsepolia_swap_pooledToken'], Queryarbitrumsepolia_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_pooledTokens: InContextSdkMethod<Query['arbitrumsepolia_swap_pooledTokens'], Queryarbitrumsepolia_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwap: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwap'], Queryarbitrumsepolia_swap_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwaps: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwaps'], Queryarbitrumsepolia_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapAddLiquidityEvent'], Queryarbitrumsepolia_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapAddLiquidityEvents'], Queryarbitrumsepolia_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent'], Queryarbitrumsepolia_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents'], Queryarbitrumsepolia_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapExchange: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapExchange'], Queryarbitrumsepolia_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapExchanges: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapExchanges'], Queryarbitrumsepolia_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapDailyVolume: InContextSdkMethod<Query['arbitrumsepolia_swap_swapDailyVolume'], Queryarbitrumsepolia_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapDailyVolumes: InContextSdkMethod<Query['arbitrumsepolia_swap_swapDailyVolumes'], Queryarbitrumsepolia_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapHourlyVolume: InContextSdkMethod<Query['arbitrumsepolia_swap_swapHourlyVolume'], Queryarbitrumsepolia_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapHourlyVolumes: InContextSdkMethod<Query['arbitrumsepolia_swap_swapHourlyVolumes'], Queryarbitrumsepolia_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapWeeklyVolume: InContextSdkMethod<Query['arbitrumsepolia_swap_swapWeeklyVolume'], Queryarbitrumsepolia_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapWeeklyVolumes: InContextSdkMethod<Query['arbitrumsepolia_swap_swapWeeklyVolumes'], Queryarbitrumsepolia_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccount: InContextSdkMethod<Query['arbitrumsepolia_swap_lpAccount'], Queryarbitrumsepolia_swap_lpAccountArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccounts: InContextSdkMethod<Query['arbitrumsepolia_swap_lpAccounts'], Queryarbitrumsepolia_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccountBalance: InContextSdkMethod<Query['arbitrumsepolia_swap_lpAccountBalance'], Queryarbitrumsepolia_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccountBalances: InContextSdkMethod<Query['arbitrumsepolia_swap_lpAccountBalances'], Queryarbitrumsepolia_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpToken: InContextSdkMethod<Query['arbitrumsepolia_swap_lpToken'], Queryarbitrumsepolia_swap_lpTokenArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokens: InContextSdkMethod<Query['arbitrumsepolia_swap_lpTokens'], Queryarbitrumsepolia_swap_lpTokensArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTransferEvent: InContextSdkMethod<Query['arbitrumsepolia_swap_lpTransferEvent'], Queryarbitrumsepolia_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTransferEvents: InContextSdkMethod<Query['arbitrumsepolia_swap_lpTransferEvents'], Queryarbitrumsepolia_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapEvent: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapEvent'], Queryarbitrumsepolia_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapEvents: InContextSdkMethod<Query['arbitrumsepolia_swap_stableSwapEvents'], Queryarbitrumsepolia_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapTradeVolume: InContextSdkMethod<Query['arbitrumsepolia_swap_swapTradeVolume'], Queryarbitrumsepolia_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapTradeVolumes: InContextSdkMethod<Query['arbitrumsepolia_swap_swapTradeVolumes'], Queryarbitrumsepolia_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokenEvent: InContextSdkMethod<Query['arbitrumsepolia_swap_lpTokenEvent'], Queryarbitrumsepolia_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokenEvents: InContextSdkMethod<Query['arbitrumsepolia_swap_lpTokenEvents'], Queryarbitrumsepolia_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumsepolia_swap__meta: InContextSdkMethod<Query['arbitrumsepolia_swap__meta'], Queryarbitrumsepolia_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  arbitrumsepolia_swap_systemInfo: InContextSdkMethod<Subscription['arbitrumsepolia_swap_systemInfo'], Subscriptionarbitrumsepolia_swap_systemInfoArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_systemInfos: InContextSdkMethod<Subscription['arbitrumsepolia_swap_systemInfos'], Subscriptionarbitrumsepolia_swap_systemInfosArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_pooledToken: InContextSdkMethod<Subscription['arbitrumsepolia_swap_pooledToken'], Subscriptionarbitrumsepolia_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_pooledTokens: InContextSdkMethod<Subscription['arbitrumsepolia_swap_pooledTokens'], Subscriptionarbitrumsepolia_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwap: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwap'], Subscriptionarbitrumsepolia_swap_stableSwapArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwaps: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwaps'], Subscriptionarbitrumsepolia_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapAddLiquidityEvent'], Subscriptionarbitrumsepolia_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapAddLiquidityEvents'], Subscriptionarbitrumsepolia_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapRemoveLiquidityEvent'], Subscriptionarbitrumsepolia_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapRemoveLiquidityEvents'], Subscriptionarbitrumsepolia_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapExchange: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapExchange'], Subscriptionarbitrumsepolia_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapExchanges: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapExchanges'], Subscriptionarbitrumsepolia_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapDailyVolume: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapDailyVolume'], Subscriptionarbitrumsepolia_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapDailyVolumes: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapDailyVolumes'], Subscriptionarbitrumsepolia_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapHourlyVolume: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapHourlyVolume'], Subscriptionarbitrumsepolia_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapHourlyVolumes'], Subscriptionarbitrumsepolia_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapWeeklyVolume'], Subscriptionarbitrumsepolia_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapWeeklyVolumes'], Subscriptionarbitrumsepolia_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccount: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpAccount'], Subscriptionarbitrumsepolia_swap_lpAccountArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccounts: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpAccounts'], Subscriptionarbitrumsepolia_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccountBalance: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpAccountBalance'], Subscriptionarbitrumsepolia_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpAccountBalances: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpAccountBalances'], Subscriptionarbitrumsepolia_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpToken: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpToken'], Subscriptionarbitrumsepolia_swap_lpTokenArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokens: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpTokens'], Subscriptionarbitrumsepolia_swap_lpTokensArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTransferEvent: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpTransferEvent'], Subscriptionarbitrumsepolia_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTransferEvents: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpTransferEvents'], Subscriptionarbitrumsepolia_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapEvent: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapEvent'], Subscriptionarbitrumsepolia_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_stableSwapEvents: InContextSdkMethod<Subscription['arbitrumsepolia_swap_stableSwapEvents'], Subscriptionarbitrumsepolia_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapTradeVolume: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapTradeVolume'], Subscriptionarbitrumsepolia_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_swapTradeVolumes: InContextSdkMethod<Subscription['arbitrumsepolia_swap_swapTradeVolumes'], Subscriptionarbitrumsepolia_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokenEvent: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpTokenEvent'], Subscriptionarbitrumsepolia_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  arbitrumsepolia_swap_lpTokenEvents: InContextSdkMethod<Subscription['arbitrumsepolia_swap_lpTokenEvents'], Subscriptionarbitrumsepolia_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  arbitrumsepolia_swap__meta: InContextSdkMethod<Subscription['arbitrumsepolia_swap__meta'], Subscriptionarbitrumsepolia_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_ArbitrumSepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
