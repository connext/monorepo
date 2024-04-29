// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextMainnetTypes {
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
  mainnet_BigDecimal: any;
  BigInt: any;
  mainnet_Bytes: any;
  mainnet_Int8: any;
  Timestamp: any;
};

export type mainnet_AggregateRoot = {
  id: Scalars['ID'];
  root: Scalars['mainnet_Bytes'];
  blockNumber: Scalars['BigInt'];
};

export type mainnet_AggregateRootProposed = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mainnet_Bytes'];
  rootTimestamp: Scalars['BigInt'];
  endOfDispute: Scalars['BigInt'];
  domain: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mainnet_AggregateRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endOfDispute?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_not?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_gt?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_lt?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_gte?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_lte?: InputMaybe<Scalars['BigInt']>;
  endOfDispute_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endOfDispute_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_AggregateRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_AggregateRootProposed_filter>>>;
};

export type mainnet_AggregateRootProposed_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'rootTimestamp'
  | 'endOfDispute'
  | 'domain'
  | 'timestamp'
  | 'blockNumber';

export type mainnet_AggregateRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  root?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_AggregateRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_AggregateRoot_filter>>>;
};

export type mainnet_AggregateRoot_orderBy =
  | 'id'
  | 'root'
  | 'blockNumber';

export type mainnet_Aggregation_interval =
  | 'hour'
  | 'day';

export type mainnet_Asset = {
  id: Scalars['ID'];
  key?: Maybe<Scalars['mainnet_Bytes']>;
  decimal?: Maybe<Scalars['BigInt']>;
  adoptedDecimal?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mainnet_Bytes']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  adoptedAsset?: Maybe<Scalars['mainnet_Bytes']>;
  localAsset?: Maybe<Scalars['mainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mainnet_AssetStatus>;
};

export type mainnet_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  locked: Scalars['BigInt'];
  supplied: Scalars['BigInt'];
  removed: Scalars['BigInt'];
  router: mainnet_Router;
  asset: mainnet_Asset;
  feesEarned: Scalars['BigInt'];
};

export type mainnet_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  locked?: InputMaybe<Scalars['BigInt']>;
  locked_not?: InputMaybe<Scalars['BigInt']>;
  locked_gt?: InputMaybe<Scalars['BigInt']>;
  locked_lt?: InputMaybe<Scalars['BigInt']>;
  locked_gte?: InputMaybe<Scalars['BigInt']>;
  locked_lte?: InputMaybe<Scalars['BigInt']>;
  locked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  locked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied?: InputMaybe<Scalars['BigInt']>;
  supplied_not?: InputMaybe<Scalars['BigInt']>;
  supplied_gt?: InputMaybe<Scalars['BigInt']>;
  supplied_lt?: InputMaybe<Scalars['BigInt']>;
  supplied_gte?: InputMaybe<Scalars['BigInt']>;
  supplied_lte?: InputMaybe<Scalars['BigInt']>;
  supplied_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supplied_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed?: InputMaybe<Scalars['BigInt']>;
  removed_not?: InputMaybe<Scalars['BigInt']>;
  removed_gt?: InputMaybe<Scalars['BigInt']>;
  removed_lt?: InputMaybe<Scalars['BigInt']>;
  removed_gte?: InputMaybe<Scalars['BigInt']>;
  removed_lte?: InputMaybe<Scalars['BigInt']>;
  removed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_?: InputMaybe<mainnet_Router_filter>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<mainnet_Asset_filter>;
  feesEarned?: InputMaybe<Scalars['BigInt']>;
  feesEarned_not?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lt?: InputMaybe<Scalars['BigInt']>;
  feesEarned_gte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_lte?: InputMaybe<Scalars['BigInt']>;
  feesEarned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feesEarned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_AssetBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_AssetBalance_filter>>>;
};

export type mainnet_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'locked'
  | 'supplied'
  | 'removed'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'feesEarned';

export type mainnet_AssetStatus = {
  id: Scalars['ID'];
  status?: Maybe<Scalars['Boolean']>;
};

export type mainnet_AssetStatus_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<Scalars['Boolean']>;
  status_not?: InputMaybe<Scalars['Boolean']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_AssetStatus_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_AssetStatus_filter>>>;
};

export type mainnet_AssetStatus_orderBy =
  | 'id'
  | 'status';

export type mainnet_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  key?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  key_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  key_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  key_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  decimal?: InputMaybe<Scalars['BigInt']>;
  decimal_not?: InputMaybe<Scalars['BigInt']>;
  decimal_gt?: InputMaybe<Scalars['BigInt']>;
  decimal_lt?: InputMaybe<Scalars['BigInt']>;
  decimal_gte?: InputMaybe<Scalars['BigInt']>;
  decimal_lte?: InputMaybe<Scalars['BigInt']>;
  decimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedDecimal?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_not?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_gt?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_lt?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_gte?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_lte?: InputMaybe<Scalars['BigInt']>;
  adoptedDecimal_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedDecimal_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adoptedAsset?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_?: InputMaybe<mainnet_AssetStatus_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_Asset_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_Asset_filter>>>;
};

export type mainnet_Asset_orderBy =
  | 'id'
  | 'key'
  | 'decimal'
  | 'adoptedDecimal'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'adoptedAsset'
  | 'localAsset'
  | 'blockNumber'
  | 'status'
  | 'status__id'
  | 'status__status';

export type mainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mainnet_Block_height = {
  hash?: InputMaybe<Scalars['mainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mainnet_ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  amb?: Maybe<Scalars['mainnet_Bytes']>;
  rootManager?: Maybe<Scalars['mainnet_Bytes']>;
  mirrorConnector?: Maybe<Scalars['mainnet_Bytes']>;
};

export type mainnet_ConnectorMeta_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain?: InputMaybe<Scalars['BigInt']>;
  hubDomain_not?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amb?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_ConnectorMeta_filter>>>;
};

export type mainnet_ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mainnet_TransferStatus>;
  routers?: Maybe<Array<mainnet_Router>>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mainnet_Bytes']>;
  delegate?: Maybe<Scalars['mainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  bumpSlippageCount?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mainnet_Bytes']>;
  asset?: Maybe<mainnet_Asset>;
  amount?: Maybe<Scalars['BigInt']>;
  routersFee?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  executedTxOrigin?: Maybe<Scalars['mainnet_Bytes']>;
  executedTxNonce?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledTxOrigin?: Maybe<Scalars['mainnet_Bytes']>;
  reconciledTxNonce?: Maybe<Scalars['BigInt']>;
};


export type mainnet_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Router_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Router_filter>;
};

export type mainnet_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mainnet_TransferStatus>;
  status_not?: InputMaybe<mainnet_TransferStatus>;
  status_in?: InputMaybe<Array<mainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mainnet_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_?: InputMaybe<mainnet_Router_filter>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpSlippageCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpSlippageCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  bridgedAmt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_not?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<mainnet_Asset_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee?: InputMaybe<Scalars['BigInt']>;
  routersFee_not?: InputMaybe<Scalars['BigInt']>;
  routersFee_gt?: InputMaybe<Scalars['BigInt']>;
  routersFee_lt?: InputMaybe<Scalars['BigInt']>;
  routersFee_gte?: InputMaybe<Scalars['BigInt']>;
  routersFee_lte?: InputMaybe<Scalars['BigInt']>;
  routersFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routersFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxOrigin?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedTxOrigin_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  executedTxOrigin_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxOrigin_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  executedTxNonce?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  executedTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxOrigin?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledTxOrigin_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  reconciledTxOrigin_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxOrigin_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  reconciledTxNonce?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTxNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTxNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_DestinationTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_DestinationTransfer_filter>>>;
};

export type mainnet_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'status'
  | 'routers'
  | 'originDomain'
  | 'destinationDomain'
  | 'canonicalDomain'
  | 'to'
  | 'delegate'
  | 'receiveLocal'
  | 'callData'
  | 'slippage'
  | 'bumpSlippageCount'
  | 'originSender'
  | 'bridgedAmt'
  | 'normalizedIn'
  | 'canonicalId'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'amount'
  | 'routersFee'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'executedTxOrigin'
  | 'executedTxNonce'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber'
  | 'reconciledTxOrigin'
  | 'reconciledTxNonce';

export type mainnet_OptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['mainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mainnet_OptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_OptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_OptimisticRootFinalized_filter>>>;
};

export type mainnet_OptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type mainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type mainnet_OriginMessage = {
  id: Scalars['ID'];
  transferId?: Maybe<Scalars['mainnet_Bytes']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  leaf?: Maybe<Scalars['mainnet_Bytes']>;
  index?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['mainnet_Bytes']>;
  root?: Maybe<Scalars['mainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  rootCount?: Maybe<mainnet_RootCount>;
};

export type mainnet_OriginMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferId?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  leaf?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  leaf_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  leaf_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  leaf_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  message_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  root?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootCount?: InputMaybe<Scalars['String']>;
  rootCount_not?: InputMaybe<Scalars['String']>;
  rootCount_gt?: InputMaybe<Scalars['String']>;
  rootCount_lt?: InputMaybe<Scalars['String']>;
  rootCount_gte?: InputMaybe<Scalars['String']>;
  rootCount_lte?: InputMaybe<Scalars['String']>;
  rootCount_in?: InputMaybe<Array<Scalars['String']>>;
  rootCount_not_in?: InputMaybe<Array<Scalars['String']>>;
  rootCount_contains?: InputMaybe<Scalars['String']>;
  rootCount_contains_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_contains?: InputMaybe<Scalars['String']>;
  rootCount_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rootCount_starts_with?: InputMaybe<Scalars['String']>;
  rootCount_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_starts_with?: InputMaybe<Scalars['String']>;
  rootCount_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_ends_with?: InputMaybe<Scalars['String']>;
  rootCount_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_not_ends_with?: InputMaybe<Scalars['String']>;
  rootCount_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rootCount_?: InputMaybe<mainnet_RootCount_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_OriginMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_OriginMessage_filter>>>;
};

export type mainnet_OriginMessage_orderBy =
  | 'id'
  | 'transferId'
  | 'destinationDomain'
  | 'leaf'
  | 'index'
  | 'message'
  | 'root'
  | 'transactionHash'
  | 'blockNumber'
  | 'rootCount'
  | 'rootCount__id'
  | 'rootCount__count';

export type mainnet_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['mainnet_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  status?: Maybe<mainnet_TransferStatus>;
  messageHash?: Maybe<Scalars['mainnet_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  canonicalDomain?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['mainnet_Bytes']>;
  delegate?: Maybe<Scalars['mainnet_Bytes']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  callData?: Maybe<Scalars['mainnet_Bytes']>;
  slippage?: Maybe<Scalars['BigInt']>;
  originSender?: Maybe<Scalars['mainnet_Bytes']>;
  bridgedAmt?: Maybe<Scalars['BigInt']>;
  normalizedIn?: Maybe<Scalars['BigInt']>;
  canonicalId?: Maybe<Scalars['mainnet_Bytes']>;
  asset?: Maybe<mainnet_Asset>;
  transactingAsset?: Maybe<Scalars['mainnet_Bytes']>;
  message?: Maybe<mainnet_OriginMessage>;
  bumpRelayerFeeCount?: Maybe<Scalars['BigInt']>;
  relayerFees?: Maybe<Array<mainnet_RelayerFee>>;
  initialRelayerFeeAsset?: Maybe<Scalars['mainnet_Bytes']>;
  caller?: Maybe<Scalars['mainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  txOrigin?: Maybe<Scalars['mainnet_Bytes']>;
  txNonce?: Maybe<Scalars['BigInt']>;
};


export type mainnet_OriginTransferrelayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RelayerFee_filter>;
};

export type mainnet_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<mainnet_TransferStatus>;
  status_not?: InputMaybe<mainnet_TransferStatus>;
  status_in?: InputMaybe<Array<mainnet_TransferStatus>>;
  status_not_in?: InputMaybe<Array<mainnet_TransferStatus>>;
  messageHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  messageHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  messageHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  messageHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  to_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  delegate_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  delegate_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  callData?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originSender?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  bridgedAmt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_not?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lt?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_gte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_lte?: InputMaybe<Scalars['BigInt']>;
  normalizedIn_in?: InputMaybe<Array<Scalars['BigInt']>>;
  normalizedIn_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalId?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<mainnet_Asset_filter>;
  transactingAsset?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  message?: InputMaybe<Scalars['String']>;
  message_not?: InputMaybe<Scalars['String']>;
  message_gt?: InputMaybe<Scalars['String']>;
  message_lt?: InputMaybe<Scalars['String']>;
  message_gte?: InputMaybe<Scalars['String']>;
  message_lte?: InputMaybe<Scalars['String']>;
  message_in?: InputMaybe<Array<Scalars['String']>>;
  message_not_in?: InputMaybe<Array<Scalars['String']>>;
  message_contains?: InputMaybe<Scalars['String']>;
  message_contains_nocase?: InputMaybe<Scalars['String']>;
  message_not_contains?: InputMaybe<Scalars['String']>;
  message_not_contains_nocase?: InputMaybe<Scalars['String']>;
  message_starts_with?: InputMaybe<Scalars['String']>;
  message_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_starts_with?: InputMaybe<Scalars['String']>;
  message_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  message_ends_with?: InputMaybe<Scalars['String']>;
  message_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_not_ends_with?: InputMaybe<Scalars['String']>;
  message_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  message_?: InputMaybe<mainnet_OriginMessage_filter>;
  bumpRelayerFeeCount?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_not?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lt?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_gte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_lte?: InputMaybe<Scalars['BigInt']>;
  bumpRelayerFeeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bumpRelayerFeeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFees?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFees_?: InputMaybe<mainnet_RelayerFee_filter>;
  initialRelayerFeeAsset?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  initialRelayerFeeAsset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  initialRelayerFeeAsset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  initialRelayerFeeAsset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txOrigin?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  txOrigin_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  txOrigin_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  txOrigin_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  txNonce?: InputMaybe<Scalars['BigInt']>;
  txNonce_not?: InputMaybe<Scalars['BigInt']>;
  txNonce_gt?: InputMaybe<Scalars['BigInt']>;
  txNonce_lt?: InputMaybe<Scalars['BigInt']>;
  txNonce_gte?: InputMaybe<Scalars['BigInt']>;
  txNonce_lte?: InputMaybe<Scalars['BigInt']>;
  txNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_OriginTransfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_OriginTransfer_filter>>>;
};

export type mainnet_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'status'
  | 'messageHash'
  | 'originDomain'
  | 'destinationDomain'
  | 'canonicalDomain'
  | 'to'
  | 'delegate'
  | 'receiveLocal'
  | 'callData'
  | 'slippage'
  | 'originSender'
  | 'bridgedAmt'
  | 'normalizedIn'
  | 'canonicalId'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'transactingAsset'
  | 'message'
  | 'message__id'
  | 'message__transferId'
  | 'message__destinationDomain'
  | 'message__leaf'
  | 'message__index'
  | 'message__message'
  | 'message__root'
  | 'message__transactionHash'
  | 'message__blockNumber'
  | 'bumpRelayerFeeCount'
  | 'relayerFees'
  | 'initialRelayerFeeAsset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber'
  | 'txOrigin'
  | 'txNonce';

export type Query = {
  mainnet_asset?: Maybe<mainnet_Asset>;
  mainnet_assets: Array<mainnet_Asset>;
  mainnet_assetStatus?: Maybe<mainnet_AssetStatus>;
  mainnet_assetStatuses: Array<mainnet_AssetStatus>;
  mainnet_assetBalance?: Maybe<mainnet_AssetBalance>;
  mainnet_assetBalances: Array<mainnet_AssetBalance>;
  mainnet_router?: Maybe<mainnet_Router>;
  mainnet_routers: Array<mainnet_Router>;
  mainnet_routerDailyTVL?: Maybe<mainnet_RouterDailyTVL>;
  mainnet_routerDailyTVLs: Array<mainnet_RouterDailyTVL>;
  mainnet_routerLiquidityEvent?: Maybe<mainnet_RouterLiquidityEvent>;
  mainnet_routerLiquidityEvents: Array<mainnet_RouterLiquidityEvent>;
  mainnet_setting?: Maybe<mainnet_Setting>;
  mainnet_settings: Array<mainnet_Setting>;
  mainnet_relayer?: Maybe<mainnet_Relayer>;
  mainnet_relayers: Array<mainnet_Relayer>;
  mainnet_sequencer?: Maybe<mainnet_Sequencer>;
  mainnet_sequencers: Array<mainnet_Sequencer>;
  mainnet_relayerFee?: Maybe<mainnet_RelayerFee>;
  mainnet_relayerFees: Array<mainnet_RelayerFee>;
  mainnet_originTransfer?: Maybe<mainnet_OriginTransfer>;
  mainnet_originTransfers: Array<mainnet_OriginTransfer>;
  mainnet_destinationTransfer?: Maybe<mainnet_DestinationTransfer>;
  mainnet_destinationTransfers: Array<mainnet_DestinationTransfer>;
  mainnet_originMessage?: Maybe<mainnet_OriginMessage>;
  mainnet_originMessages: Array<mainnet_OriginMessage>;
  mainnet_aggregateRoot?: Maybe<mainnet_AggregateRoot>;
  mainnet_aggregateRoots: Array<mainnet_AggregateRoot>;
  mainnet_connectorMeta?: Maybe<mainnet_ConnectorMeta>;
  mainnet_connectorMetas: Array<mainnet_ConnectorMeta>;
  mainnet_rootCount?: Maybe<mainnet_RootCount>;
  mainnet_rootCounts: Array<mainnet_RootCount>;
  mainnet_rootMessageSent?: Maybe<mainnet_RootMessageSent>;
  mainnet_rootMessageSents: Array<mainnet_RootMessageSent>;
  mainnet_relayerFeesIncrease?: Maybe<mainnet_RelayerFeesIncrease>;
  mainnet_relayerFeesIncreases: Array<mainnet_RelayerFeesIncrease>;
  mainnet_slippageUpdate?: Maybe<mainnet_SlippageUpdate>;
  mainnet_slippageUpdates: Array<mainnet_SlippageUpdate>;
  mainnet_snapshotRoot?: Maybe<mainnet_SnapshotRoot>;
  mainnet_snapshotRoots: Array<mainnet_SnapshotRoot>;
  mainnet_spokeConnectorMode?: Maybe<mainnet_SpokeConnectorMode>;
  mainnet_spokeConnectorModes: Array<mainnet_SpokeConnectorMode>;
  mainnet_aggregateRootProposed?: Maybe<mainnet_AggregateRootProposed>;
  mainnet_aggregateRootProposeds: Array<mainnet_AggregateRootProposed>;
  mainnet_optimisticRootFinalized?: Maybe<mainnet_OptimisticRootFinalized>;
  mainnet_optimisticRootFinalizeds: Array<mainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mainnet__meta?: Maybe<mainnet__Meta_>;
};


export type Querymainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Asset_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AssetStatus_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AssetBalance_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Router_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Router_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Setting_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Relayer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Sequencer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RelayerFee_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OriginTransfer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_DestinationTransfer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OriginMessage_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregateRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootCount_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootMessageSent_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SlippageUpdate_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SnapshotRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet__metaArgs = {
  block?: InputMaybe<mainnet_Block_height>;
};

export type mainnet_Relayer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  relayer?: Maybe<Scalars['mainnet_Bytes']>;
};

export type mainnet_RelayerFee = {
  id: Scalars['ID'];
  transfer: mainnet_OriginTransfer;
  fee: Scalars['BigInt'];
  asset: Scalars['mainnet_Bytes'];
};

export type mainnet_RelayerFee_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<mainnet_OriginTransfer_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RelayerFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RelayerFee_filter>>>;
};

export type mainnet_RelayerFee_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__messageHash'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__transactingAsset'
  | 'transfer__bumpRelayerFeeCount'
  | 'transfer__initialRelayerFeeAsset'
  | 'transfer__caller'
  | 'transfer__transactionHash'
  | 'transfer__timestamp'
  | 'transfer__gasPrice'
  | 'transfer__gasLimit'
  | 'transfer__blockNumber'
  | 'transfer__txOrigin'
  | 'transfer__txNonce'
  | 'fee'
  | 'asset';

export type mainnet_RelayerFeesIncrease = {
  id: Scalars['ID'];
  transfer: mainnet_OriginTransfer;
  increase?: Maybe<Scalars['BigInt']>;
  asset?: Maybe<Scalars['mainnet_Bytes']>;
  caller: Scalars['mainnet_Bytes'];
  transactionHash: Scalars['mainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mainnet_RelayerFeesIncrease_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<mainnet_OriginTransfer_filter>;
  increase?: InputMaybe<Scalars['BigInt']>;
  increase_not?: InputMaybe<Scalars['BigInt']>;
  increase_gt?: InputMaybe<Scalars['BigInt']>;
  increase_lt?: InputMaybe<Scalars['BigInt']>;
  increase_gte?: InputMaybe<Scalars['BigInt']>;
  increase_lte?: InputMaybe<Scalars['BigInt']>;
  increase_in?: InputMaybe<Array<Scalars['BigInt']>>;
  increase_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  asset?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  asset_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  asset_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RelayerFeesIncrease_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RelayerFeesIncrease_filter>>>;
};

export type mainnet_RelayerFeesIncrease_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__messageHash'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__transactingAsset'
  | 'transfer__bumpRelayerFeeCount'
  | 'transfer__initialRelayerFeeAsset'
  | 'transfer__caller'
  | 'transfer__transactionHash'
  | 'transfer__timestamp'
  | 'transfer__gasPrice'
  | 'transfer__gasLimit'
  | 'transfer__blockNumber'
  | 'transfer__txOrigin'
  | 'transfer__txNonce'
  | 'increase'
  | 'asset'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type mainnet_Relayer_filter = {
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
  relayer?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  relayer_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  relayer_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  relayer_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_Relayer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_Relayer_filter>>>;
};

export type mainnet_Relayer_orderBy =
  | 'id'
  | 'isActive'
  | 'relayer';

export type mainnet_RootCount = {
  id: Scalars['ID'];
  count?: Maybe<Scalars['BigInt']>;
};

export type mainnet_RootCount_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RootCount_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootCount_filter>>>;
};

export type mainnet_RootCount_orderBy =
  | 'id'
  | 'count';

export type mainnet_RootMessageSent = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  hubDomain?: Maybe<Scalars['BigInt']>;
  root?: Maybe<Scalars['mainnet_Bytes']>;
  count?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['mainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mainnet_RootMessageSent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain?: InputMaybe<Scalars['BigInt']>;
  hubDomain_not?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lt?: InputMaybe<Scalars['BigInt']>;
  hubDomain_gte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_lte?: InputMaybe<Scalars['BigInt']>;
  hubDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hubDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RootMessageSent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootMessageSent_filter>>>;
};

export type mainnet_RootMessageSent_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'root'
  | 'count'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type mainnet_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['mainnet_Bytes']>;
  recipient?: Maybe<Scalars['mainnet_Bytes']>;
  proposedOwner?: Maybe<Scalars['mainnet_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<mainnet_AssetBalance>;
};


export type mainnet_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AssetBalance_filter>;
};

export type mainnet_RouterDailyTVL = {
  id: Scalars['ID'];
  router: mainnet_Router;
  asset: mainnet_Asset;
  timestamp: Scalars['BigInt'];
  balance: Scalars['BigInt'];
};

export type mainnet_RouterDailyTVL_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_?: InputMaybe<mainnet_Router_filter>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<mainnet_Asset_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RouterDailyTVL_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RouterDailyTVL_filter>>>;
};

export type mainnet_RouterDailyTVL_orderBy =
  | 'id'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'timestamp'
  | 'balance';

export type mainnet_RouterLiquidityEvent = {
  id: Scalars['ID'];
  type?: Maybe<mainnet_RouterLiquidityEventType>;
  router: mainnet_Router;
  asset: mainnet_Asset;
  amount: Scalars['BigInt'];
  balance: Scalars['BigInt'];
  caller?: Maybe<Scalars['mainnet_Bytes']>;
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['mainnet_Bytes'];
  nonce: Scalars['BigInt'];
};

export type mainnet_RouterLiquidityEventType =
  | 'Add'
  | 'Remove';

export type mainnet_RouterLiquidityEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<mainnet_RouterLiquidityEventType>;
  type_not?: InputMaybe<mainnet_RouterLiquidityEventType>;
  type_in?: InputMaybe<Array<mainnet_RouterLiquidityEventType>>;
  type_not_in?: InputMaybe<Array<mainnet_RouterLiquidityEventType>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_?: InputMaybe<mainnet_Router_filter>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_?: InputMaybe<mainnet_Asset_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RouterLiquidityEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RouterLiquidityEvent_filter>>>;
};

export type mainnet_RouterLiquidityEvent_orderBy =
  | 'id'
  | 'type'
  | 'router'
  | 'router__id'
  | 'router__isActive'
  | 'router__owner'
  | 'router__recipient'
  | 'router__proposedOwner'
  | 'router__proposedTimestamp'
  | 'asset'
  | 'asset__id'
  | 'asset__key'
  | 'asset__decimal'
  | 'asset__adoptedDecimal'
  | 'asset__canonicalId'
  | 'asset__canonicalDomain'
  | 'asset__adoptedAsset'
  | 'asset__localAsset'
  | 'asset__blockNumber'
  | 'amount'
  | 'balance'
  | 'caller'
  | 'blockNumber'
  | 'timestamp'
  | 'transactionHash'
  | 'nonce';

export type mainnet_Router_filter = {
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
  owner?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalances_?: InputMaybe<mainnet_AssetBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_Router_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_Router_filter>>>;
};

export type mainnet_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type mainnet_Sequencer = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  sequencer?: Maybe<Scalars['mainnet_Bytes']>;
};

export type mainnet_Sequencer_filter = {
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
  sequencer?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  sequencer_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  sequencer_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  sequencer_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_Sequencer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_Sequencer_filter>>>;
};

export type mainnet_Sequencer_orderBy =
  | 'id'
  | 'isActive'
  | 'sequencer';

export type mainnet_Setting = {
  id: Scalars['ID'];
  maxRoutersPerTransfer: Scalars['BigInt'];
  caller: Scalars['mainnet_Bytes'];
};

export type mainnet_Setting_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxRoutersPerTransfer?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_not?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_gt?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_lt?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_gte?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_lte?: InputMaybe<Scalars['BigInt']>;
  maxRoutersPerTransfer_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxRoutersPerTransfer_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_Setting_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_Setting_filter>>>;
};

export type mainnet_Setting_orderBy =
  | 'id'
  | 'maxRoutersPerTransfer'
  | 'caller';

export type mainnet_SlippageUpdate = {
  id: Scalars['ID'];
  transfer: mainnet_DestinationTransfer;
  slippage: Scalars['BigInt'];
  caller: Scalars['mainnet_Bytes'];
  transactionHash: Scalars['mainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mainnet_SlippageUpdate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transfer?: InputMaybe<Scalars['String']>;
  transfer_not?: InputMaybe<Scalars['String']>;
  transfer_gt?: InputMaybe<Scalars['String']>;
  transfer_lt?: InputMaybe<Scalars['String']>;
  transfer_gte?: InputMaybe<Scalars['String']>;
  transfer_lte?: InputMaybe<Scalars['String']>;
  transfer_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_not_in?: InputMaybe<Array<Scalars['String']>>;
  transfer_contains?: InputMaybe<Scalars['String']>;
  transfer_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_contains?: InputMaybe<Scalars['String']>;
  transfer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transfer_starts_with?: InputMaybe<Scalars['String']>;
  transfer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with?: InputMaybe<Scalars['String']>;
  transfer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_ends_with?: InputMaybe<Scalars['String']>;
  transfer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with?: InputMaybe<Scalars['String']>;
  transfer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transfer_?: InputMaybe<mainnet_DestinationTransfer_filter>;
  slippage?: InputMaybe<Scalars['BigInt']>;
  slippage_not?: InputMaybe<Scalars['BigInt']>;
  slippage_gt?: InputMaybe<Scalars['BigInt']>;
  slippage_lt?: InputMaybe<Scalars['BigInt']>;
  slippage_gte?: InputMaybe<Scalars['BigInt']>;
  slippage_lte?: InputMaybe<Scalars['BigInt']>;
  slippage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  slippage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_SlippageUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_SlippageUpdate_filter>>>;
};

export type mainnet_SlippageUpdate_orderBy =
  | 'id'
  | 'transfer'
  | 'transfer__id'
  | 'transfer__chainId'
  | 'transfer__transferId'
  | 'transfer__nonce'
  | 'transfer__status'
  | 'transfer__originDomain'
  | 'transfer__destinationDomain'
  | 'transfer__canonicalDomain'
  | 'transfer__to'
  | 'transfer__delegate'
  | 'transfer__receiveLocal'
  | 'transfer__callData'
  | 'transfer__slippage'
  | 'transfer__bumpSlippageCount'
  | 'transfer__originSender'
  | 'transfer__bridgedAmt'
  | 'transfer__normalizedIn'
  | 'transfer__canonicalId'
  | 'transfer__amount'
  | 'transfer__routersFee'
  | 'transfer__executedCaller'
  | 'transfer__executedTransactionHash'
  | 'transfer__executedTimestamp'
  | 'transfer__executedGasPrice'
  | 'transfer__executedGasLimit'
  | 'transfer__executedBlockNumber'
  | 'transfer__executedTxOrigin'
  | 'transfer__executedTxNonce'
  | 'transfer__reconciledCaller'
  | 'transfer__reconciledTransactionHash'
  | 'transfer__reconciledTimestamp'
  | 'transfer__reconciledGasPrice'
  | 'transfer__reconciledGasLimit'
  | 'transfer__reconciledBlockNumber'
  | 'transfer__reconciledTxOrigin'
  | 'transfer__reconciledTxNonce'
  | 'slippage'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type mainnet_SnapshotRoot = {
  id: Scalars['ID'];
  spokeDomain?: Maybe<Scalars['BigInt']>;
  root: Scalars['mainnet_Bytes'];
  count: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type mainnet_SnapshotRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spokeDomain?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_not?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lt?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_gte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_lte?: InputMaybe<Scalars['BigInt']>;
  spokeDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  spokeDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  root?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_SnapshotRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_SnapshotRoot_filter>>>;
};

export type mainnet_SnapshotRoot_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'root'
  | 'count'
  | 'timestamp'
  | 'blockNumber';

export type mainnet_SpokeConnectorMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type mainnet_SpokeConnectorMode_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mode?: InputMaybe<Scalars['String']>;
  mode_not?: InputMaybe<Scalars['String']>;
  mode_gt?: InputMaybe<Scalars['String']>;
  mode_lt?: InputMaybe<Scalars['String']>;
  mode_gte?: InputMaybe<Scalars['String']>;
  mode_lte?: InputMaybe<Scalars['String']>;
  mode_in?: InputMaybe<Array<Scalars['String']>>;
  mode_not_in?: InputMaybe<Array<Scalars['String']>>;
  mode_contains?: InputMaybe<Scalars['String']>;
  mode_contains_nocase?: InputMaybe<Scalars['String']>;
  mode_not_contains?: InputMaybe<Scalars['String']>;
  mode_not_contains_nocase?: InputMaybe<Scalars['String']>;
  mode_starts_with?: InputMaybe<Scalars['String']>;
  mode_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mode_not_starts_with?: InputMaybe<Scalars['String']>;
  mode_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mode_ends_with?: InputMaybe<Scalars['String']>;
  mode_ends_with_nocase?: InputMaybe<Scalars['String']>;
  mode_not_ends_with?: InputMaybe<Scalars['String']>;
  mode_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_SpokeConnectorMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_SpokeConnectorMode_filter>>>;
};

export type mainnet_SpokeConnectorMode_orderBy =
  | 'id'
  | 'mode';

export type Subscription = {
  mainnet_asset?: Maybe<mainnet_Asset>;
  mainnet_assets: Array<mainnet_Asset>;
  mainnet_assetStatus?: Maybe<mainnet_AssetStatus>;
  mainnet_assetStatuses: Array<mainnet_AssetStatus>;
  mainnet_assetBalance?: Maybe<mainnet_AssetBalance>;
  mainnet_assetBalances: Array<mainnet_AssetBalance>;
  mainnet_router?: Maybe<mainnet_Router>;
  mainnet_routers: Array<mainnet_Router>;
  mainnet_routerDailyTVL?: Maybe<mainnet_RouterDailyTVL>;
  mainnet_routerDailyTVLs: Array<mainnet_RouterDailyTVL>;
  mainnet_routerLiquidityEvent?: Maybe<mainnet_RouterLiquidityEvent>;
  mainnet_routerLiquidityEvents: Array<mainnet_RouterLiquidityEvent>;
  mainnet_setting?: Maybe<mainnet_Setting>;
  mainnet_settings: Array<mainnet_Setting>;
  mainnet_relayer?: Maybe<mainnet_Relayer>;
  mainnet_relayers: Array<mainnet_Relayer>;
  mainnet_sequencer?: Maybe<mainnet_Sequencer>;
  mainnet_sequencers: Array<mainnet_Sequencer>;
  mainnet_relayerFee?: Maybe<mainnet_RelayerFee>;
  mainnet_relayerFees: Array<mainnet_RelayerFee>;
  mainnet_originTransfer?: Maybe<mainnet_OriginTransfer>;
  mainnet_originTransfers: Array<mainnet_OriginTransfer>;
  mainnet_destinationTransfer?: Maybe<mainnet_DestinationTransfer>;
  mainnet_destinationTransfers: Array<mainnet_DestinationTransfer>;
  mainnet_originMessage?: Maybe<mainnet_OriginMessage>;
  mainnet_originMessages: Array<mainnet_OriginMessage>;
  mainnet_aggregateRoot?: Maybe<mainnet_AggregateRoot>;
  mainnet_aggregateRoots: Array<mainnet_AggregateRoot>;
  mainnet_connectorMeta?: Maybe<mainnet_ConnectorMeta>;
  mainnet_connectorMetas: Array<mainnet_ConnectorMeta>;
  mainnet_rootCount?: Maybe<mainnet_RootCount>;
  mainnet_rootCounts: Array<mainnet_RootCount>;
  mainnet_rootMessageSent?: Maybe<mainnet_RootMessageSent>;
  mainnet_rootMessageSents: Array<mainnet_RootMessageSent>;
  mainnet_relayerFeesIncrease?: Maybe<mainnet_RelayerFeesIncrease>;
  mainnet_relayerFeesIncreases: Array<mainnet_RelayerFeesIncrease>;
  mainnet_slippageUpdate?: Maybe<mainnet_SlippageUpdate>;
  mainnet_slippageUpdates: Array<mainnet_SlippageUpdate>;
  mainnet_snapshotRoot?: Maybe<mainnet_SnapshotRoot>;
  mainnet_snapshotRoots: Array<mainnet_SnapshotRoot>;
  mainnet_spokeConnectorMode?: Maybe<mainnet_SpokeConnectorMode>;
  mainnet_spokeConnectorModes: Array<mainnet_SpokeConnectorMode>;
  mainnet_aggregateRootProposed?: Maybe<mainnet_AggregateRootProposed>;
  mainnet_aggregateRootProposeds: Array<mainnet_AggregateRootProposed>;
  mainnet_optimisticRootFinalized?: Maybe<mainnet_OptimisticRootFinalized>;
  mainnet_optimisticRootFinalizeds: Array<mainnet_OptimisticRootFinalized>;
  /** Access to subgraph metadata */
  mainnet__meta?: Maybe<mainnet__Meta_>;
};


export type Subscriptionmainnet_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Asset_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Asset_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_assetStatusArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_assetStatusesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AssetStatus_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AssetStatus_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AssetBalance_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Router_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Router_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routerDailyTVLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routerDailyTVLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RouterDailyTVL_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RouterDailyTVL_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routerLiquidityEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_routerLiquidityEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RouterLiquidityEvent_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RouterLiquidityEvent_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_settingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_settingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Setting_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Setting_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Relayer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Relayer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_sequencerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_sequencersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_Sequencer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_Sequencer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayerFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayerFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RelayerFee_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RelayerFee_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OriginTransfer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_DestinationTransfer_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_originMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_originMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OriginMessage_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OriginMessage_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregateRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregateRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregateRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregateRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_connectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_connectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootCountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootCountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootCount_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootCount_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootMessageSentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootMessageSentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootMessageSent_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootMessageSent_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayerFeesIncreaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_relayerFeesIncreasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RelayerFeesIncrease_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RelayerFeesIncrease_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_slippageUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_slippageUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SlippageUpdate_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SlippageUpdate_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_snapshotRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_snapshotRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SnapshotRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SnapshotRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_spokeConnectorModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_spokeConnectorModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_SpokeConnectorMode_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_SpokeConnectorMode_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregateRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregateRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregateRootProposed_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregateRootProposed_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_optimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_optimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OptimisticRootFinalized_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet__metaArgs = {
  block?: InputMaybe<mainnet_Block_height>;
};

export type mainnet_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'CompletedSlow'
  | 'CompletedFast';

export type mainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['mainnet_Bytes']>;
};

/** The type for the top-level _meta field */
export type mainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: mainnet__Block_;
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
  mainnet_asset: InContextSdkMethod<Query['mainnet_asset'], Querymainnet_assetArgs, MeshContext>,
  /** null **/
  mainnet_assets: InContextSdkMethod<Query['mainnet_assets'], Querymainnet_assetsArgs, MeshContext>,
  /** null **/
  mainnet_assetStatus: InContextSdkMethod<Query['mainnet_assetStatus'], Querymainnet_assetStatusArgs, MeshContext>,
  /** null **/
  mainnet_assetStatuses: InContextSdkMethod<Query['mainnet_assetStatuses'], Querymainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  mainnet_assetBalance: InContextSdkMethod<Query['mainnet_assetBalance'], Querymainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  mainnet_assetBalances: InContextSdkMethod<Query['mainnet_assetBalances'], Querymainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  mainnet_router: InContextSdkMethod<Query['mainnet_router'], Querymainnet_routerArgs, MeshContext>,
  /** null **/
  mainnet_routers: InContextSdkMethod<Query['mainnet_routers'], Querymainnet_routersArgs, MeshContext>,
  /** null **/
  mainnet_routerDailyTVL: InContextSdkMethod<Query['mainnet_routerDailyTVL'], Querymainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mainnet_routerDailyTVLs: InContextSdkMethod<Query['mainnet_routerDailyTVLs'], Querymainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mainnet_routerLiquidityEvent: InContextSdkMethod<Query['mainnet_routerLiquidityEvent'], Querymainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mainnet_routerLiquidityEvents: InContextSdkMethod<Query['mainnet_routerLiquidityEvents'], Querymainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mainnet_setting: InContextSdkMethod<Query['mainnet_setting'], Querymainnet_settingArgs, MeshContext>,
  /** null **/
  mainnet_settings: InContextSdkMethod<Query['mainnet_settings'], Querymainnet_settingsArgs, MeshContext>,
  /** null **/
  mainnet_relayer: InContextSdkMethod<Query['mainnet_relayer'], Querymainnet_relayerArgs, MeshContext>,
  /** null **/
  mainnet_relayers: InContextSdkMethod<Query['mainnet_relayers'], Querymainnet_relayersArgs, MeshContext>,
  /** null **/
  mainnet_sequencer: InContextSdkMethod<Query['mainnet_sequencer'], Querymainnet_sequencerArgs, MeshContext>,
  /** null **/
  mainnet_sequencers: InContextSdkMethod<Query['mainnet_sequencers'], Querymainnet_sequencersArgs, MeshContext>,
  /** null **/
  mainnet_relayerFee: InContextSdkMethod<Query['mainnet_relayerFee'], Querymainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  mainnet_relayerFees: InContextSdkMethod<Query['mainnet_relayerFees'], Querymainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  mainnet_originTransfer: InContextSdkMethod<Query['mainnet_originTransfer'], Querymainnet_originTransferArgs, MeshContext>,
  /** null **/
  mainnet_originTransfers: InContextSdkMethod<Query['mainnet_originTransfers'], Querymainnet_originTransfersArgs, MeshContext>,
  /** null **/
  mainnet_destinationTransfer: InContextSdkMethod<Query['mainnet_destinationTransfer'], Querymainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  mainnet_destinationTransfers: InContextSdkMethod<Query['mainnet_destinationTransfers'], Querymainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  mainnet_originMessage: InContextSdkMethod<Query['mainnet_originMessage'], Querymainnet_originMessageArgs, MeshContext>,
  /** null **/
  mainnet_originMessages: InContextSdkMethod<Query['mainnet_originMessages'], Querymainnet_originMessagesArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRoot: InContextSdkMethod<Query['mainnet_aggregateRoot'], Querymainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRoots: InContextSdkMethod<Query['mainnet_aggregateRoots'], Querymainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  mainnet_connectorMeta: InContextSdkMethod<Query['mainnet_connectorMeta'], Querymainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_connectorMetas: InContextSdkMethod<Query['mainnet_connectorMetas'], Querymainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_rootCount: InContextSdkMethod<Query['mainnet_rootCount'], Querymainnet_rootCountArgs, MeshContext>,
  /** null **/
  mainnet_rootCounts: InContextSdkMethod<Query['mainnet_rootCounts'], Querymainnet_rootCountsArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageSent: InContextSdkMethod<Query['mainnet_rootMessageSent'], Querymainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageSents: InContextSdkMethod<Query['mainnet_rootMessageSents'], Querymainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mainnet_relayerFeesIncrease: InContextSdkMethod<Query['mainnet_relayerFeesIncrease'], Querymainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mainnet_relayerFeesIncreases: InContextSdkMethod<Query['mainnet_relayerFeesIncreases'], Querymainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mainnet_slippageUpdate: InContextSdkMethod<Query['mainnet_slippageUpdate'], Querymainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  mainnet_slippageUpdates: InContextSdkMethod<Query['mainnet_slippageUpdates'], Querymainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mainnet_snapshotRoot: InContextSdkMethod<Query['mainnet_snapshotRoot'], Querymainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  mainnet_snapshotRoots: InContextSdkMethod<Query['mainnet_snapshotRoots'], Querymainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  mainnet_spokeConnectorMode: InContextSdkMethod<Query['mainnet_spokeConnectorMode'], Querymainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mainnet_spokeConnectorModes: InContextSdkMethod<Query['mainnet_spokeConnectorModes'], Querymainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRootProposed: InContextSdkMethod<Query['mainnet_aggregateRootProposed'], Querymainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRootProposeds: InContextSdkMethod<Query['mainnet_aggregateRootProposeds'], Querymainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mainnet_optimisticRootFinalized: InContextSdkMethod<Query['mainnet_optimisticRootFinalized'], Querymainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mainnet_optimisticRootFinalizeds: InContextSdkMethod<Query['mainnet_optimisticRootFinalizeds'], Querymainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mainnet__meta: InContextSdkMethod<Query['mainnet__meta'], Querymainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mainnet_asset: InContextSdkMethod<Subscription['mainnet_asset'], Subscriptionmainnet_assetArgs, MeshContext>,
  /** null **/
  mainnet_assets: InContextSdkMethod<Subscription['mainnet_assets'], Subscriptionmainnet_assetsArgs, MeshContext>,
  /** null **/
  mainnet_assetStatus: InContextSdkMethod<Subscription['mainnet_assetStatus'], Subscriptionmainnet_assetStatusArgs, MeshContext>,
  /** null **/
  mainnet_assetStatuses: InContextSdkMethod<Subscription['mainnet_assetStatuses'], Subscriptionmainnet_assetStatusesArgs, MeshContext>,
  /** null **/
  mainnet_assetBalance: InContextSdkMethod<Subscription['mainnet_assetBalance'], Subscriptionmainnet_assetBalanceArgs, MeshContext>,
  /** null **/
  mainnet_assetBalances: InContextSdkMethod<Subscription['mainnet_assetBalances'], Subscriptionmainnet_assetBalancesArgs, MeshContext>,
  /** null **/
  mainnet_router: InContextSdkMethod<Subscription['mainnet_router'], Subscriptionmainnet_routerArgs, MeshContext>,
  /** null **/
  mainnet_routers: InContextSdkMethod<Subscription['mainnet_routers'], Subscriptionmainnet_routersArgs, MeshContext>,
  /** null **/
  mainnet_routerDailyTVL: InContextSdkMethod<Subscription['mainnet_routerDailyTVL'], Subscriptionmainnet_routerDailyTVLArgs, MeshContext>,
  /** null **/
  mainnet_routerDailyTVLs: InContextSdkMethod<Subscription['mainnet_routerDailyTVLs'], Subscriptionmainnet_routerDailyTVLsArgs, MeshContext>,
  /** null **/
  mainnet_routerLiquidityEvent: InContextSdkMethod<Subscription['mainnet_routerLiquidityEvent'], Subscriptionmainnet_routerLiquidityEventArgs, MeshContext>,
  /** null **/
  mainnet_routerLiquidityEvents: InContextSdkMethod<Subscription['mainnet_routerLiquidityEvents'], Subscriptionmainnet_routerLiquidityEventsArgs, MeshContext>,
  /** null **/
  mainnet_setting: InContextSdkMethod<Subscription['mainnet_setting'], Subscriptionmainnet_settingArgs, MeshContext>,
  /** null **/
  mainnet_settings: InContextSdkMethod<Subscription['mainnet_settings'], Subscriptionmainnet_settingsArgs, MeshContext>,
  /** null **/
  mainnet_relayer: InContextSdkMethod<Subscription['mainnet_relayer'], Subscriptionmainnet_relayerArgs, MeshContext>,
  /** null **/
  mainnet_relayers: InContextSdkMethod<Subscription['mainnet_relayers'], Subscriptionmainnet_relayersArgs, MeshContext>,
  /** null **/
  mainnet_sequencer: InContextSdkMethod<Subscription['mainnet_sequencer'], Subscriptionmainnet_sequencerArgs, MeshContext>,
  /** null **/
  mainnet_sequencers: InContextSdkMethod<Subscription['mainnet_sequencers'], Subscriptionmainnet_sequencersArgs, MeshContext>,
  /** null **/
  mainnet_relayerFee: InContextSdkMethod<Subscription['mainnet_relayerFee'], Subscriptionmainnet_relayerFeeArgs, MeshContext>,
  /** null **/
  mainnet_relayerFees: InContextSdkMethod<Subscription['mainnet_relayerFees'], Subscriptionmainnet_relayerFeesArgs, MeshContext>,
  /** null **/
  mainnet_originTransfer: InContextSdkMethod<Subscription['mainnet_originTransfer'], Subscriptionmainnet_originTransferArgs, MeshContext>,
  /** null **/
  mainnet_originTransfers: InContextSdkMethod<Subscription['mainnet_originTransfers'], Subscriptionmainnet_originTransfersArgs, MeshContext>,
  /** null **/
  mainnet_destinationTransfer: InContextSdkMethod<Subscription['mainnet_destinationTransfer'], Subscriptionmainnet_destinationTransferArgs, MeshContext>,
  /** null **/
  mainnet_destinationTransfers: InContextSdkMethod<Subscription['mainnet_destinationTransfers'], Subscriptionmainnet_destinationTransfersArgs, MeshContext>,
  /** null **/
  mainnet_originMessage: InContextSdkMethod<Subscription['mainnet_originMessage'], Subscriptionmainnet_originMessageArgs, MeshContext>,
  /** null **/
  mainnet_originMessages: InContextSdkMethod<Subscription['mainnet_originMessages'], Subscriptionmainnet_originMessagesArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRoot: InContextSdkMethod<Subscription['mainnet_aggregateRoot'], Subscriptionmainnet_aggregateRootArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRoots: InContextSdkMethod<Subscription['mainnet_aggregateRoots'], Subscriptionmainnet_aggregateRootsArgs, MeshContext>,
  /** null **/
  mainnet_connectorMeta: InContextSdkMethod<Subscription['mainnet_connectorMeta'], Subscriptionmainnet_connectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_connectorMetas: InContextSdkMethod<Subscription['mainnet_connectorMetas'], Subscriptionmainnet_connectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_rootCount: InContextSdkMethod<Subscription['mainnet_rootCount'], Subscriptionmainnet_rootCountArgs, MeshContext>,
  /** null **/
  mainnet_rootCounts: InContextSdkMethod<Subscription['mainnet_rootCounts'], Subscriptionmainnet_rootCountsArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageSent: InContextSdkMethod<Subscription['mainnet_rootMessageSent'], Subscriptionmainnet_rootMessageSentArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageSents: InContextSdkMethod<Subscription['mainnet_rootMessageSents'], Subscriptionmainnet_rootMessageSentsArgs, MeshContext>,
  /** null **/
  mainnet_relayerFeesIncrease: InContextSdkMethod<Subscription['mainnet_relayerFeesIncrease'], Subscriptionmainnet_relayerFeesIncreaseArgs, MeshContext>,
  /** null **/
  mainnet_relayerFeesIncreases: InContextSdkMethod<Subscription['mainnet_relayerFeesIncreases'], Subscriptionmainnet_relayerFeesIncreasesArgs, MeshContext>,
  /** null **/
  mainnet_slippageUpdate: InContextSdkMethod<Subscription['mainnet_slippageUpdate'], Subscriptionmainnet_slippageUpdateArgs, MeshContext>,
  /** null **/
  mainnet_slippageUpdates: InContextSdkMethod<Subscription['mainnet_slippageUpdates'], Subscriptionmainnet_slippageUpdatesArgs, MeshContext>,
  /** null **/
  mainnet_snapshotRoot: InContextSdkMethod<Subscription['mainnet_snapshotRoot'], Subscriptionmainnet_snapshotRootArgs, MeshContext>,
  /** null **/
  mainnet_snapshotRoots: InContextSdkMethod<Subscription['mainnet_snapshotRoots'], Subscriptionmainnet_snapshotRootsArgs, MeshContext>,
  /** null **/
  mainnet_spokeConnectorMode: InContextSdkMethod<Subscription['mainnet_spokeConnectorMode'], Subscriptionmainnet_spokeConnectorModeArgs, MeshContext>,
  /** null **/
  mainnet_spokeConnectorModes: InContextSdkMethod<Subscription['mainnet_spokeConnectorModes'], Subscriptionmainnet_spokeConnectorModesArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRootProposed: InContextSdkMethod<Subscription['mainnet_aggregateRootProposed'], Subscriptionmainnet_aggregateRootProposedArgs, MeshContext>,
  /** null **/
  mainnet_aggregateRootProposeds: InContextSdkMethod<Subscription['mainnet_aggregateRootProposeds'], Subscriptionmainnet_aggregateRootProposedsArgs, MeshContext>,
  /** null **/
  mainnet_optimisticRootFinalized: InContextSdkMethod<Subscription['mainnet_optimisticRootFinalized'], Subscriptionmainnet_optimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  mainnet_optimisticRootFinalizeds: InContextSdkMethod<Subscription['mainnet_optimisticRootFinalizeds'], Subscriptionmainnet_optimisticRootFinalizedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mainnet__meta: InContextSdkMethod<Subscription['mainnet__meta'], Subscriptionmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Connext_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
