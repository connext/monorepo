// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace StableSwapStagingGoerliTypes {
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
  staginggoerli_swap_BigDecimal: any;
  BigInt: any;
  staginggoerli_swap_Bytes: any;
  staginggoerli_swap_Int8: any;
};

export type staginggoerli_swap_Aggregation_interval =
  | 'hour'
  | 'day';

export type staginggoerli_swap_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerli_swap_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerli_swap_LpAccount = {
  id: Scalars['ID'];
  address: Scalars['staginggoerli_swap_Bytes'];
  balances: Array<staginggoerli_swap_LpAccountBalance>;
};


export type staginggoerli_swap_LpAccountbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpAccountBalance_filter>;
};

export type staginggoerli_swap_LpAccountBalance = {
  id: Scalars['ID'];
  account: staginggoerli_swap_LpAccount;
  token: staginggoerli_swap_LpToken;
  amount: Scalars['staginggoerli_swap_BigDecimal'];
  block?: Maybe<Scalars['BigInt']>;
  modified?: Maybe<Scalars['BigInt']>;
  transaction?: Maybe<Scalars['staginggoerli_swap_Bytes']>;
};

export type staginggoerli_swap_LpAccountBalance_filter = {
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
  account_?: InputMaybe<staginggoerli_swap_LpAccount_filter>;
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
  token_?: InputMaybe<staginggoerli_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpAccountBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpAccountBalance_filter>>>;
};

export type staginggoerli_swap_LpAccountBalance_orderBy =
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

export type staginggoerli_swap_LpAccount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  balances_?: InputMaybe<staginggoerli_swap_LpAccountBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpAccount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpAccount_filter>>>;
};

export type staginggoerli_swap_LpAccount_orderBy =
  | 'id'
  | 'address'
  | 'balances';

export type staginggoerli_swap_LpToken = {
  id: Scalars['ID'];
  address: Scalars['staginggoerli_swap_Bytes'];
  stableSwap: staginggoerli_swap_StableSwap;
  decimals: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply: Scalars['staginggoerli_swap_BigDecimal'];
  events: Array<staginggoerli_swap_LpTokenEvent>;
};


export type staginggoerli_swap_LpTokeneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpTokenEvent_filter>;
};

export type staginggoerli_swap_LpTokenEvent = {
  id: Scalars['ID'];
  token: staginggoerli_swap_LpToken;
  amount: Scalars['staginggoerli_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_LpTokenEvent_filter = {
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
  token_?: InputMaybe<staginggoerli_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpTokenEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpTokenEvent_filter>>>;
};

export type staginggoerli_swap_LpTokenEvent_orderBy =
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

export type staginggoerli_swap_LpToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  address_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  address_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
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
  totalSupply?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  events_?: InputMaybe<staginggoerli_swap_LpTokenEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpToken_filter>>>;
};

export type staginggoerli_swap_LpToken_orderBy =
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

export type staginggoerli_swap_LpTransferEvent = staginggoerli_swap_LpTokenEvent & {
  id: Scalars['ID'];
  token: staginggoerli_swap_LpToken;
  amount: Scalars['staginggoerli_swap_BigDecimal'];
  from: Scalars['staginggoerli_swap_Bytes'];
  to: Scalars['staginggoerli_swap_Bytes'];
  fromBalance: Scalars['staginggoerli_swap_BigDecimal'];
  toBalance: Scalars['staginggoerli_swap_BigDecimal'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_LpTransferEvent_filter = {
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
  token_?: InputMaybe<staginggoerli_swap_LpToken_filter>;
  amount?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  from?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  from_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  from_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  fromBalance?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  fromBalance_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  toBalance?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  toBalance_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  toBalance_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpTransferEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_LpTransferEvent_filter>>>;
};

export type staginggoerli_swap_LpTransferEvent_orderBy =
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
export type staginggoerli_swap_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerli_swap_PooledToken = {
  id: Scalars['ID'];
  asset: Scalars['staginggoerli_swap_Bytes'];
};

export type staginggoerli_swap_PooledToken_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  asset?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_PooledToken_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_PooledToken_filter>>>;
};

export type staginggoerli_swap_PooledToken_orderBy =
  | 'id'
  | 'asset';

export type Query = {
  staginggoerli_swap_systemInfo?: Maybe<staginggoerli_swap_SystemInfo>;
  staginggoerli_swap_systemInfos: Array<staginggoerli_swap_SystemInfo>;
  staginggoerli_swap_pooledToken?: Maybe<staginggoerli_swap_PooledToken>;
  staginggoerli_swap_pooledTokens: Array<staginggoerli_swap_PooledToken>;
  staginggoerli_swap_stableSwap?: Maybe<staginggoerli_swap_StableSwap>;
  staginggoerli_swap_stableSwaps: Array<staginggoerli_swap_StableSwap>;
  staginggoerli_swap_stableSwapAddLiquidityEvent?: Maybe<staginggoerli_swap_StableSwapAddLiquidityEvent>;
  staginggoerli_swap_stableSwapAddLiquidityEvents: Array<staginggoerli_swap_StableSwapAddLiquidityEvent>;
  staginggoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent>;
  staginggoerli_swap_stableSwapRemoveLiquidityEvents: Array<staginggoerli_swap_StableSwapRemoveLiquidityEvent>;
  staginggoerli_swap_stableSwapExchange?: Maybe<staginggoerli_swap_StableSwapExchange>;
  staginggoerli_swap_stableSwapExchanges: Array<staginggoerli_swap_StableSwapExchange>;
  staginggoerli_swap_swapDailyVolume?: Maybe<staginggoerli_swap_SwapDailyVolume>;
  staginggoerli_swap_swapDailyVolumes: Array<staginggoerli_swap_SwapDailyVolume>;
  staginggoerli_swap_swapHourlyVolume?: Maybe<staginggoerli_swap_SwapHourlyVolume>;
  staginggoerli_swap_swapHourlyVolumes: Array<staginggoerli_swap_SwapHourlyVolume>;
  staginggoerli_swap_swapWeeklyVolume?: Maybe<staginggoerli_swap_SwapWeeklyVolume>;
  staginggoerli_swap_swapWeeklyVolumes: Array<staginggoerli_swap_SwapWeeklyVolume>;
  staginggoerli_swap_lpAccount?: Maybe<staginggoerli_swap_LpAccount>;
  staginggoerli_swap_lpAccounts: Array<staginggoerli_swap_LpAccount>;
  staginggoerli_swap_lpAccountBalance?: Maybe<staginggoerli_swap_LpAccountBalance>;
  staginggoerli_swap_lpAccountBalances: Array<staginggoerli_swap_LpAccountBalance>;
  staginggoerli_swap_lpToken?: Maybe<staginggoerli_swap_LpToken>;
  staginggoerli_swap_lpTokens: Array<staginggoerli_swap_LpToken>;
  staginggoerli_swap_lpTransferEvent?: Maybe<staginggoerli_swap_LpTransferEvent>;
  staginggoerli_swap_lpTransferEvents: Array<staginggoerli_swap_LpTransferEvent>;
  staginggoerli_swap_stableSwapEvent?: Maybe<staginggoerli_swap_StableSwapEvent>;
  staginggoerli_swap_stableSwapEvents: Array<staginggoerli_swap_StableSwapEvent>;
  staginggoerli_swap_swapTradeVolume?: Maybe<staginggoerli_swap_SwapTradeVolume>;
  staginggoerli_swap_swapTradeVolumes: Array<staginggoerli_swap_SwapTradeVolume>;
  staginggoerli_swap_lpTokenEvent?: Maybe<staginggoerli_swap_LpTokenEvent>;
  staginggoerli_swap_lpTokenEvents: Array<staginggoerli_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  staginggoerli_swap__meta?: Maybe<staginggoerli_swap__Meta_>;
};


export type Querystaginggoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_PooledToken_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpAccount_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpAccountBalance_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpToken_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpTransferEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpTokenEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_swap__metaArgs = {
  block?: InputMaybe<staginggoerli_swap_Block_height>;
};

export type staginggoerli_swap_StableSwap = {
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  key: Scalars['staginggoerli_swap_Bytes'];
  canonicalId?: Maybe<Scalars['staginggoerli_swap_Bytes']>;
  domain?: Maybe<Scalars['BigInt']>;
  swapPool?: Maybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken?: Maybe<Scalars['staginggoerli_swap_Bytes']>;
  initialA?: Maybe<Scalars['BigInt']>;
  futureA?: Maybe<Scalars['BigInt']>;
  initialATime?: Maybe<Scalars['BigInt']>;
  futureATime?: Maybe<Scalars['BigInt']>;
  swapFee?: Maybe<Scalars['BigInt']>;
  adminFee?: Maybe<Scalars['BigInt']>;
  pooledTokens: Array<Scalars['staginggoerli_swap_Bytes']>;
  tokenPrecisionMultipliers: Array<Scalars['BigInt']>;
  balances: Array<Scalars['BigInt']>;
  adminFees: Array<Scalars['BigInt']>;
  virtualPrice: Scalars['BigInt'];
  invariant: Scalars['BigInt'];
  lpTokenSupply: Scalars['BigInt'];
  events?: Maybe<Array<staginggoerli_swap_StableSwapEvent>>;
  exchanges?: Maybe<Array<staginggoerli_swap_StableSwapExchange>>;
  hourlyVolumes?: Maybe<Array<staginggoerli_swap_SwapHourlyVolume>>;
  dailyVolumes?: Maybe<Array<staginggoerli_swap_SwapDailyVolume>>;
  weeklyVolumes?: Maybe<Array<staginggoerli_swap_SwapWeeklyVolume>>;
};


export type staginggoerli_swap_StableSwapeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapEvent_filter>;
};


export type staginggoerli_swap_StableSwapexchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapExchange_filter>;
};


export type staginggoerli_swap_StableSwaphourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>;
};


export type staginggoerli_swap_StableSwapdailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>;
};


export type staginggoerli_swap_StableSwapweeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>;
};

export type staginggoerli_swap_StableSwapAddLiquidityEvent = staginggoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  provider: Scalars['staginggoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees: Array<Scalars['BigInt']>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_StableSwapAddLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_filter>>>;
};

export type staginggoerli_swap_StableSwapAddLiquidityEvent_orderBy =
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

export type staginggoerli_swap_StableSwapEvent = {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_StableSwapEvent_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapEvent_filter>>>;
};

export type staginggoerli_swap_StableSwapEvent_orderBy =
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

export type staginggoerli_swap_StableSwapExchange = {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  buyer: Scalars['staginggoerli_swap_Bytes'];
  boughtId: Scalars['BigInt'];
  tokensBought: Scalars['BigInt'];
  soldId: Scalars['BigInt'];
  tokensSold: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  fee: Scalars['BigInt'];
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_StableSwapExchange_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  buyer?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapExchange_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapExchange_filter>>>;
};

export type staginggoerli_swap_StableSwapExchange_orderBy =
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

export type staginggoerli_swap_StableSwapRemoveLiquidityEvent = staginggoerli_swap_StableSwapEvent & {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  provider: Scalars['staginggoerli_swap_Bytes'];
  tokenAmounts: Array<Scalars['BigInt']>;
  fees?: Maybe<Array<Scalars['BigInt']>>;
  invariant?: Maybe<Scalars['BigInt']>;
  lpTokenSupply: Scalars['BigInt'];
  lpTokenAmount: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  block: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['staginggoerli_swap_Bytes'];
  nonce: Scalars['BigInt'];
};

export type staginggoerli_swap_StableSwapRemoveLiquidityEvent_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  provider?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  provider_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  provider_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  provider_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
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
  transaction?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  transaction_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_filter>>>;
};

export type staginggoerli_swap_StableSwapRemoveLiquidityEvent_orderBy =
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

export type staginggoerli_swap_StableSwap_filter = {
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
  key?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  key_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapPool?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  swapPool_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  swapPool_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  swapPool_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_not?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_gt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_lt?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_gte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_lte?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  lpToken_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  lpToken_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
  lpToken_not_contains?: InputMaybe<Scalars['staginggoerli_swap_Bytes']>;
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
  pooledTokens?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  pooledTokens_not?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  pooledTokens_contains?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  pooledTokens_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  pooledTokens_not_contains?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
  pooledTokens_not_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_swap_Bytes']>>;
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
  events_?: InputMaybe<staginggoerli_swap_StableSwapEvent_filter>;
  exchanges_?: InputMaybe<staginggoerli_swap_StableSwapExchange_filter>;
  hourlyVolumes_?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>;
  dailyVolumes_?: InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>;
  weeklyVolumes_?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwap_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_StableSwap_filter>>>;
};

export type staginggoerli_swap_StableSwap_orderBy =
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
  staginggoerli_swap_systemInfo?: Maybe<staginggoerli_swap_SystemInfo>;
  staginggoerli_swap_systemInfos: Array<staginggoerli_swap_SystemInfo>;
  staginggoerli_swap_pooledToken?: Maybe<staginggoerli_swap_PooledToken>;
  staginggoerli_swap_pooledTokens: Array<staginggoerli_swap_PooledToken>;
  staginggoerli_swap_stableSwap?: Maybe<staginggoerli_swap_StableSwap>;
  staginggoerli_swap_stableSwaps: Array<staginggoerli_swap_StableSwap>;
  staginggoerli_swap_stableSwapAddLiquidityEvent?: Maybe<staginggoerli_swap_StableSwapAddLiquidityEvent>;
  staginggoerli_swap_stableSwapAddLiquidityEvents: Array<staginggoerli_swap_StableSwapAddLiquidityEvent>;
  staginggoerli_swap_stableSwapRemoveLiquidityEvent?: Maybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent>;
  staginggoerli_swap_stableSwapRemoveLiquidityEvents: Array<staginggoerli_swap_StableSwapRemoveLiquidityEvent>;
  staginggoerli_swap_stableSwapExchange?: Maybe<staginggoerli_swap_StableSwapExchange>;
  staginggoerli_swap_stableSwapExchanges: Array<staginggoerli_swap_StableSwapExchange>;
  staginggoerli_swap_swapDailyVolume?: Maybe<staginggoerli_swap_SwapDailyVolume>;
  staginggoerli_swap_swapDailyVolumes: Array<staginggoerli_swap_SwapDailyVolume>;
  staginggoerli_swap_swapHourlyVolume?: Maybe<staginggoerli_swap_SwapHourlyVolume>;
  staginggoerli_swap_swapHourlyVolumes: Array<staginggoerli_swap_SwapHourlyVolume>;
  staginggoerli_swap_swapWeeklyVolume?: Maybe<staginggoerli_swap_SwapWeeklyVolume>;
  staginggoerli_swap_swapWeeklyVolumes: Array<staginggoerli_swap_SwapWeeklyVolume>;
  staginggoerli_swap_lpAccount?: Maybe<staginggoerli_swap_LpAccount>;
  staginggoerli_swap_lpAccounts: Array<staginggoerli_swap_LpAccount>;
  staginggoerli_swap_lpAccountBalance?: Maybe<staginggoerli_swap_LpAccountBalance>;
  staginggoerli_swap_lpAccountBalances: Array<staginggoerli_swap_LpAccountBalance>;
  staginggoerli_swap_lpToken?: Maybe<staginggoerli_swap_LpToken>;
  staginggoerli_swap_lpTokens: Array<staginggoerli_swap_LpToken>;
  staginggoerli_swap_lpTransferEvent?: Maybe<staginggoerli_swap_LpTransferEvent>;
  staginggoerli_swap_lpTransferEvents: Array<staginggoerli_swap_LpTransferEvent>;
  staginggoerli_swap_stableSwapEvent?: Maybe<staginggoerli_swap_StableSwapEvent>;
  staginggoerli_swap_stableSwapEvents: Array<staginggoerli_swap_StableSwapEvent>;
  staginggoerli_swap_swapTradeVolume?: Maybe<staginggoerli_swap_SwapTradeVolume>;
  staginggoerli_swap_swapTradeVolumes: Array<staginggoerli_swap_SwapTradeVolume>;
  staginggoerli_swap_lpTokenEvent?: Maybe<staginggoerli_swap_LpTokenEvent>;
  staginggoerli_swap_lpTokenEvents: Array<staginggoerli_swap_LpTokenEvent>;
  /** Access to subgraph metadata */
  staginggoerli_swap__meta?: Maybe<staginggoerli_swap__Meta_>;
};


export type Subscriptionstaginggoerli_swap_systemInfoArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_systemInfosArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SystemInfo_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SystemInfo_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_pooledTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_pooledTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_PooledToken_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_PooledToken_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwap_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapAddLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapAddLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapAddLiquidityEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapRemoveLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapRemoveLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapRemoveLiquidityEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapExchangeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapExchangesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapExchange_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapExchange_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapDailyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapDailyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapDailyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapHourlyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapHourlyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapWeeklyVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapWeeklyVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpAccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpAccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpAccount_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpAccount_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpAccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpAccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpAccountBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpAccountBalance_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpToken_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpToken_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpTransferEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpTransferEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_stableSwapEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_StableSwapEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_StableSwapEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapTradeVolumeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_swapTradeVolumesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_SwapTradeVolume_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_SwapTradeVolume_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap_lpTokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_swap_LpTokenEvent_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_swap_OrderDirection>;
  where?: InputMaybe<staginggoerli_swap_LpTokenEvent_filter>;
  block?: InputMaybe<staginggoerli_swap_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_swap__metaArgs = {
  block?: InputMaybe<staginggoerli_swap_Block_height>;
};

export type staginggoerli_swap_SwapDailyVolume = staginggoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['staginggoerli_swap_BigDecimal'];
};

export type staginggoerli_swap_SwapDailyVolume_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapDailyVolume_filter>>>;
};

export type staginggoerli_swap_SwapDailyVolume_orderBy =
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

export type staginggoerli_swap_SwapHourlyVolume = staginggoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['staginggoerli_swap_BigDecimal'];
};

export type staginggoerli_swap_SwapHourlyVolume_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapHourlyVolume_filter>>>;
};

export type staginggoerli_swap_SwapHourlyVolume_orderBy =
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

export type staginggoerli_swap_SwapTradeVolume = {
  stableSwap: staginggoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['staginggoerli_swap_BigDecimal'];
};

export type staginggoerli_swap_SwapTradeVolume_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapTradeVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapTradeVolume_filter>>>;
};

export type staginggoerli_swap_SwapTradeVolume_orderBy =
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

export type staginggoerli_swap_SwapWeeklyVolume = staginggoerli_swap_SwapTradeVolume & {
  id: Scalars['ID'];
  stableSwap: staginggoerli_swap_StableSwap;
  timestamp: Scalars['BigInt'];
  volume: Scalars['staginggoerli_swap_BigDecimal'];
};

export type staginggoerli_swap_SwapWeeklyVolume_filter = {
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
  stableSwap_?: InputMaybe<staginggoerli_swap_StableSwap_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_not?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lt?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['staginggoerli_swap_BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  volume_not_in?: InputMaybe<Array<Scalars['staginggoerli_swap_BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SwapWeeklyVolume_filter>>>;
};

export type staginggoerli_swap_SwapWeeklyVolume_orderBy =
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

export type staginggoerli_swap_SystemInfo = {
  id: Scalars['ID'];
  exchangeCount: Scalars['BigInt'];
  swapCount: Scalars['BigInt'];
};

export type staginggoerli_swap_SystemInfo_filter = {
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
  _change_block?: InputMaybe<staginggoerli_swap_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SystemInfo_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_swap_SystemInfo_filter>>>;
};

export type staginggoerli_swap_SystemInfo_orderBy =
  | 'id'
  | 'exchangeCount'
  | 'swapCount';

export type staginggoerli_swap__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerli_swap_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type staginggoerli_swap__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: staginggoerli_swap__Block_;
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
  staginggoerli_swap_systemInfo: InContextSdkMethod<Query['staginggoerli_swap_systemInfo'], Querystaginggoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_systemInfos: InContextSdkMethod<Query['staginggoerli_swap_systemInfos'], Querystaginggoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_pooledToken: InContextSdkMethod<Query['staginggoerli_swap_pooledToken'], Querystaginggoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_pooledTokens: InContextSdkMethod<Query['staginggoerli_swap_pooledTokens'], Querystaginggoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwap: InContextSdkMethod<Query['staginggoerli_swap_stableSwap'], Querystaginggoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwaps: InContextSdkMethod<Query['staginggoerli_swap_stableSwaps'], Querystaginggoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Query['staginggoerli_swap_stableSwapAddLiquidityEvent'], Querystaginggoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Query['staginggoerli_swap_stableSwapAddLiquidityEvents'], Querystaginggoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Query['staginggoerli_swap_stableSwapRemoveLiquidityEvent'], Querystaginggoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Query['staginggoerli_swap_stableSwapRemoveLiquidityEvents'], Querystaginggoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapExchange: InContextSdkMethod<Query['staginggoerli_swap_stableSwapExchange'], Querystaginggoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapExchanges: InContextSdkMethod<Query['staginggoerli_swap_stableSwapExchanges'], Querystaginggoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapDailyVolume: InContextSdkMethod<Query['staginggoerli_swap_swapDailyVolume'], Querystaginggoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapDailyVolumes: InContextSdkMethod<Query['staginggoerli_swap_swapDailyVolumes'], Querystaginggoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapHourlyVolume: InContextSdkMethod<Query['staginggoerli_swap_swapHourlyVolume'], Querystaginggoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapHourlyVolumes: InContextSdkMethod<Query['staginggoerli_swap_swapHourlyVolumes'], Querystaginggoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapWeeklyVolume: InContextSdkMethod<Query['staginggoerli_swap_swapWeeklyVolume'], Querystaginggoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Query['staginggoerli_swap_swapWeeklyVolumes'], Querystaginggoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccount: InContextSdkMethod<Query['staginggoerli_swap_lpAccount'], Querystaginggoerli_swap_lpAccountArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccounts: InContextSdkMethod<Query['staginggoerli_swap_lpAccounts'], Querystaginggoerli_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccountBalance: InContextSdkMethod<Query['staginggoerli_swap_lpAccountBalance'], Querystaginggoerli_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccountBalances: InContextSdkMethod<Query['staginggoerli_swap_lpAccountBalances'], Querystaginggoerli_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpToken: InContextSdkMethod<Query['staginggoerli_swap_lpToken'], Querystaginggoerli_swap_lpTokenArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokens: InContextSdkMethod<Query['staginggoerli_swap_lpTokens'], Querystaginggoerli_swap_lpTokensArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTransferEvent: InContextSdkMethod<Query['staginggoerli_swap_lpTransferEvent'], Querystaginggoerli_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTransferEvents: InContextSdkMethod<Query['staginggoerli_swap_lpTransferEvents'], Querystaginggoerli_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapEvent: InContextSdkMethod<Query['staginggoerli_swap_stableSwapEvent'], Querystaginggoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapEvents: InContextSdkMethod<Query['staginggoerli_swap_stableSwapEvents'], Querystaginggoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapTradeVolume: InContextSdkMethod<Query['staginggoerli_swap_swapTradeVolume'], Querystaginggoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapTradeVolumes: InContextSdkMethod<Query['staginggoerli_swap_swapTradeVolumes'], Querystaginggoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokenEvent: InContextSdkMethod<Query['staginggoerli_swap_lpTokenEvent'], Querystaginggoerli_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokenEvents: InContextSdkMethod<Query['staginggoerli_swap_lpTokenEvents'], Querystaginggoerli_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli_swap__meta: InContextSdkMethod<Query['staginggoerli_swap__meta'], Querystaginggoerli_swap__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  staginggoerli_swap_systemInfo: InContextSdkMethod<Subscription['staginggoerli_swap_systemInfo'], Subscriptionstaginggoerli_swap_systemInfoArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_systemInfos: InContextSdkMethod<Subscription['staginggoerli_swap_systemInfos'], Subscriptionstaginggoerli_swap_systemInfosArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_pooledToken: InContextSdkMethod<Subscription['staginggoerli_swap_pooledToken'], Subscriptionstaginggoerli_swap_pooledTokenArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_pooledTokens: InContextSdkMethod<Subscription['staginggoerli_swap_pooledTokens'], Subscriptionstaginggoerli_swap_pooledTokensArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwap: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwap'], Subscriptionstaginggoerli_swap_stableSwapArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwaps: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwaps'], Subscriptionstaginggoerli_swap_stableSwapsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapAddLiquidityEvent: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapAddLiquidityEvent'], Subscriptionstaginggoerli_swap_stableSwapAddLiquidityEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapAddLiquidityEvents: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapAddLiquidityEvents'], Subscriptionstaginggoerli_swap_stableSwapAddLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapRemoveLiquidityEvent: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapRemoveLiquidityEvent'], Subscriptionstaginggoerli_swap_stableSwapRemoveLiquidityEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapRemoveLiquidityEvents: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapRemoveLiquidityEvents'], Subscriptionstaginggoerli_swap_stableSwapRemoveLiquidityEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapExchange: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapExchange'], Subscriptionstaginggoerli_swap_stableSwapExchangeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapExchanges: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapExchanges'], Subscriptionstaginggoerli_swap_stableSwapExchangesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapDailyVolume: InContextSdkMethod<Subscription['staginggoerli_swap_swapDailyVolume'], Subscriptionstaginggoerli_swap_swapDailyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapDailyVolumes: InContextSdkMethod<Subscription['staginggoerli_swap_swapDailyVolumes'], Subscriptionstaginggoerli_swap_swapDailyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapHourlyVolume: InContextSdkMethod<Subscription['staginggoerli_swap_swapHourlyVolume'], Subscriptionstaginggoerli_swap_swapHourlyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapHourlyVolumes: InContextSdkMethod<Subscription['staginggoerli_swap_swapHourlyVolumes'], Subscriptionstaginggoerli_swap_swapHourlyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapWeeklyVolume: InContextSdkMethod<Subscription['staginggoerli_swap_swapWeeklyVolume'], Subscriptionstaginggoerli_swap_swapWeeklyVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapWeeklyVolumes: InContextSdkMethod<Subscription['staginggoerli_swap_swapWeeklyVolumes'], Subscriptionstaginggoerli_swap_swapWeeklyVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccount: InContextSdkMethod<Subscription['staginggoerli_swap_lpAccount'], Subscriptionstaginggoerli_swap_lpAccountArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccounts: InContextSdkMethod<Subscription['staginggoerli_swap_lpAccounts'], Subscriptionstaginggoerli_swap_lpAccountsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccountBalance: InContextSdkMethod<Subscription['staginggoerli_swap_lpAccountBalance'], Subscriptionstaginggoerli_swap_lpAccountBalanceArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpAccountBalances: InContextSdkMethod<Subscription['staginggoerli_swap_lpAccountBalances'], Subscriptionstaginggoerli_swap_lpAccountBalancesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpToken: InContextSdkMethod<Subscription['staginggoerli_swap_lpToken'], Subscriptionstaginggoerli_swap_lpTokenArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokens: InContextSdkMethod<Subscription['staginggoerli_swap_lpTokens'], Subscriptionstaginggoerli_swap_lpTokensArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTransferEvent: InContextSdkMethod<Subscription['staginggoerli_swap_lpTransferEvent'], Subscriptionstaginggoerli_swap_lpTransferEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTransferEvents: InContextSdkMethod<Subscription['staginggoerli_swap_lpTransferEvents'], Subscriptionstaginggoerli_swap_lpTransferEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapEvent: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapEvent'], Subscriptionstaginggoerli_swap_stableSwapEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_stableSwapEvents: InContextSdkMethod<Subscription['staginggoerli_swap_stableSwapEvents'], Subscriptionstaginggoerli_swap_stableSwapEventsArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapTradeVolume: InContextSdkMethod<Subscription['staginggoerli_swap_swapTradeVolume'], Subscriptionstaginggoerli_swap_swapTradeVolumeArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_swapTradeVolumes: InContextSdkMethod<Subscription['staginggoerli_swap_swapTradeVolumes'], Subscriptionstaginggoerli_swap_swapTradeVolumesArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokenEvent: InContextSdkMethod<Subscription['staginggoerli_swap_lpTokenEvent'], Subscriptionstaginggoerli_swap_lpTokenEventArgs, MeshContext>,
  /** null **/
  staginggoerli_swap_lpTokenEvents: InContextSdkMethod<Subscription['staginggoerli_swap_lpTokenEvents'], Subscriptionstaginggoerli_swap_lpTokenEventsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli_swap__meta: InContextSdkMethod<Subscription['staginggoerli_swap__meta'], Subscriptionstaginggoerli_swap__metaArgs, MeshContext>
  };

  export type Context = {
      ["StableSwap_Staging_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
