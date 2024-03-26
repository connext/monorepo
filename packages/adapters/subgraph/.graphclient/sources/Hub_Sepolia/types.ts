// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubSepoliaTypes {
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
  sepolia_BigDecimal: any;
  BigInt: any;
  sepolia_Bytes: any;
  sepolia_Int8: any;
};

export type sepolia_AggregateRootSavedSlow = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  count: Scalars['BigInt'];
  aggregatedRoots?: Maybe<Array<Scalars['sepolia_Bytes']>>;
  rootTimestamp: Scalars['BigInt'];
};

export type sepolia_AggregateRootSavedSlow_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedRoots?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregatedRoots_not?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregatedRoots_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregatedRoots_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregatedRoots_not_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregatedRoots_not_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AggregateRootSavedSlow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AggregateRootSavedSlow_filter>>>;
};

export type sepolia_AggregateRootSavedSlow_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'count'
  | 'aggregatedRoots'
  | 'rootTimestamp';

export type sepolia_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['sepolia_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_AggregatedMessageRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AggregatedMessageRoot_filter>>>;
};

export type sepolia_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain'
  | 'blockNumber';

export type sepolia_Aggregation_interval =
  | 'hour'
  | 'day';

export type sepolia_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_ArbitrumConnectorMeta_filter>>>;
};

export type sepolia_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_AvalancheConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_AvalancheConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_AvalancheConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_AvalancheConnectorMeta_filter>>>;
};

export type sepolia_AvalancheConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_BaseConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_BaseConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_BaseConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_BaseConnectorMeta_filter>>>;
};

export type sepolia_BaseConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type sepolia_Block_height = {
  hash?: InputMaybe<Scalars['sepolia_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type sepolia_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_BnbConnectorMeta_filter>>>;
};

export type sepolia_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_GnosisConnectorMeta_filter>>>;
};

export type sepolia_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_HubDomain = {
  id: Scalars['ID'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type sepolia_HubDomain_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_HubDomain_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_HubDomain_filter>>>;
};

export type sepolia_HubDomain_orderBy =
  | 'id'
  | 'domain';

export type sepolia_HubOptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_HubOptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_HubOptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_HubOptimisticRootFinalized_filter>>>;
};

export type sepolia_HubOptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

export type sepolia_LineaConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_LineaConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_LineaConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_LineaConnectorMeta_filter>>>;
};

export type sepolia_LineaConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_MantleConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_MantleConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_MantleConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_MantleConnectorMeta_filter>>>;
};

export type sepolia_MantleConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_MetisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_MetisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_MetisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_MetisConnectorMeta_filter>>>;
};

export type sepolia_MetisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_ModeConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_ModeConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_ModeConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_ModeConnectorMeta_filter>>>;
};

export type sepolia_ModeConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OptimismConnectorMeta_filter>>>;
};

export type sepolia_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_OptimisticRootPropagated = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  domainsHash: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_OptimisticRootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootPropagated_filter>>>;
};

export type sepolia_OptimisticRootPropagated_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'domainsHash'
  | 'timestamp'
  | 'blockNumber';

export type sepolia_OptimisticRootProposed = {
  id: Scalars['ID'];
  disputeCliff: Scalars['BigInt'];
  aggregateRoot: Scalars['sepolia_Bytes'];
  snapshotsRoots?: Maybe<Array<Scalars['sepolia_Bytes']>>;
  domains?: Maybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot: Scalars['sepolia_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_OptimisticRootProposed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  disputeCliff?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_not?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_gt?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_lt?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_gte?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_lte?: InputMaybe<Scalars['BigInt']>;
  disputeCliff_in?: InputMaybe<Array<Scalars['BigInt']>>;
  disputeCliff_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  snapshotsRoots?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  snapshotsRoots_not?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  snapshotsRoots_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  snapshotsRoots_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  snapshotsRoots_not_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  snapshotsRoots_not_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  baseAggregateRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  baseAggregateRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  baseAggregateRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_OptimisticRootProposed_filter>>>;
};

export type sepolia_OptimisticRootProposed_orderBy =
  | 'id'
  | 'disputeCliff'
  | 'aggregateRoot'
  | 'snapshotsRoots'
  | 'domains'
  | 'baseAggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type sepolia_OrderDirection =
  | 'asc'
  | 'desc';

export type sepolia_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_PolygonConnectorMeta_filter>>>;
};

export type sepolia_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_PolygonZkConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_PolygonZkConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_PolygonZkConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_PolygonZkConnectorMeta_filter>>>;
};

export type sepolia_PolygonZkConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  sepolia_rootAggregated?: Maybe<sepolia_RootAggregated>;
  sepolia_rootAggregateds: Array<sepolia_RootAggregated>;
  sepolia_rootPropagated?: Maybe<sepolia_RootPropagated>;
  sepolia_rootPropagateds: Array<sepolia_RootPropagated>;
  sepolia_aggregatedMessageRoot?: Maybe<sepolia_AggregatedMessageRoot>;
  sepolia_aggregatedMessageRoots: Array<sepolia_AggregatedMessageRoot>;
  sepolia_rootManagerMeta?: Maybe<sepolia_RootManagerMeta>;
  sepolia_rootManagerMetas: Array<sepolia_RootManagerMeta>;
  sepolia_rootManagerMode?: Maybe<sepolia_RootManagerMode>;
  sepolia_rootManagerModes: Array<sepolia_RootManagerMode>;
  sepolia_optimisticRootProposed?: Maybe<sepolia_OptimisticRootProposed>;
  sepolia_optimisticRootProposeds: Array<sepolia_OptimisticRootProposed>;
  sepolia_hubOptimisticRootFinalized?: Maybe<sepolia_HubOptimisticRootFinalized>;
  sepolia_hubOptimisticRootFinalizeds: Array<sepolia_HubOptimisticRootFinalized>;
  sepolia_optimisticRootPropagated?: Maybe<sepolia_OptimisticRootPropagated>;
  sepolia_optimisticRootPropagateds: Array<sepolia_OptimisticRootPropagated>;
  sepolia_polygonConnectorMeta?: Maybe<sepolia_PolygonConnectorMeta>;
  sepolia_polygonConnectorMetas: Array<sepolia_PolygonConnectorMeta>;
  sepolia_optimismConnectorMeta?: Maybe<sepolia_OptimismConnectorMeta>;
  sepolia_optimismConnectorMetas: Array<sepolia_OptimismConnectorMeta>;
  sepolia_bnbConnectorMeta?: Maybe<sepolia_BnbConnectorMeta>;
  sepolia_bnbConnectorMetas: Array<sepolia_BnbConnectorMeta>;
  sepolia_arbitrumConnectorMeta?: Maybe<sepolia_ArbitrumConnectorMeta>;
  sepolia_arbitrumConnectorMetas: Array<sepolia_ArbitrumConnectorMeta>;
  sepolia_gnosisConnectorMeta?: Maybe<sepolia_GnosisConnectorMeta>;
  sepolia_gnosisConnectorMetas: Array<sepolia_GnosisConnectorMeta>;
  sepolia_lineaConnectorMeta?: Maybe<sepolia_LineaConnectorMeta>;
  sepolia_lineaConnectorMetas: Array<sepolia_LineaConnectorMeta>;
  sepolia_metisConnectorMeta?: Maybe<sepolia_MetisConnectorMeta>;
  sepolia_metisConnectorMetas: Array<sepolia_MetisConnectorMeta>;
  sepolia_mantleConnectorMeta?: Maybe<sepolia_MantleConnectorMeta>;
  sepolia_mantleConnectorMetas: Array<sepolia_MantleConnectorMeta>;
  sepolia_avalancheConnectorMeta?: Maybe<sepolia_AvalancheConnectorMeta>;
  sepolia_avalancheConnectorMetas: Array<sepolia_AvalancheConnectorMeta>;
  sepolia_baseConnectorMeta?: Maybe<sepolia_BaseConnectorMeta>;
  sepolia_baseConnectorMetas: Array<sepolia_BaseConnectorMeta>;
  sepolia_polygonZkConnectorMeta?: Maybe<sepolia_PolygonZkConnectorMeta>;
  sepolia_polygonZkConnectorMetas: Array<sepolia_PolygonZkConnectorMeta>;
  sepolia_x1ConnectorMeta?: Maybe<sepolia_X1ConnectorMeta>;
  sepolia_x1ConnectorMetas: Array<sepolia_X1ConnectorMeta>;
  sepolia_zkSyncConnectorMeta?: Maybe<sepolia_ZkSyncConnectorMeta>;
  sepolia_zkSyncConnectorMetas: Array<sepolia_ZkSyncConnectorMeta>;
  sepolia_modeConnectorMeta?: Maybe<sepolia_ModeConnectorMeta>;
  sepolia_modeConnectorMetas: Array<sepolia_ModeConnectorMeta>;
  sepolia_scrollConnectorMeta?: Maybe<sepolia_ScrollConnectorMeta>;
  sepolia_scrollConnectorMetas: Array<sepolia_ScrollConnectorMeta>;
  sepolia_rootMessageProcessed?: Maybe<sepolia_RootMessageProcessed>;
  sepolia_rootMessageProcesseds: Array<sepolia_RootMessageProcessed>;
  sepolia_aggregateRootSavedSlow?: Maybe<sepolia_AggregateRootSavedSlow>;
  sepolia_aggregateRootSavedSlows: Array<sepolia_AggregateRootSavedSlow>;
  sepolia_hubDomain?: Maybe<sepolia_HubDomain>;
  sepolia_hubDomains: Array<sepolia_HubDomain>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<sepolia__Meta_>;
};


export type Querysepolia_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootAggregated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootPropagated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregatedMessageRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootManagerMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootManagerMode_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootProposed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootPropagated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_PolygonConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimismConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_BnbConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_GnosisConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_LineaConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_metisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_metisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_MetisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_MetisConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_mantleConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_mantleConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_MantleConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_MantleConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_avalancheConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_avalancheConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AvalancheConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AvalancheConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_BaseConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_polygonZkConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_polygonZkConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_PolygonZkConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_PolygonZkConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_x1ConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_x1ConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_X1ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_X1ConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_modeConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_modeConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ModeConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ModeConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_scrollConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_scrollConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ScrollConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ScrollConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootMessageProcessed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_HubDomain_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_HubDomain_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia__metaArgs = {
  block?: InputMaybe<sepolia_Block_height>;
};

export type sepolia_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['sepolia_Bytes'];
  index: Scalars['BigInt'];
};

export type sepolia_RootAggregated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  receivedRoot?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootAggregated_filter>>>;
};

export type sepolia_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type sepolia_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['sepolia_Bytes']>>;
};

export type sepolia_RootManagerMeta_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  connectors?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootManagerMeta_filter>>>;
};

export type sepolia_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type sepolia_RootManagerMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type sepolia_RootManagerMode_filter = {
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootManagerMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootManagerMode_filter>>>;
};

export type sepolia_RootManagerMode_orderBy =
  | 'id'
  | 'mode';

export type sepolia_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['sepolia_Bytes']>;
  caller?: Maybe<Scalars['sepolia_Bytes']>;
  transactionHash?: Maybe<Scalars['sepolia_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  root_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
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
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootMessageProcessed_filter>>>;
};

export type sepolia_RootMessageProcessed_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'root'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type sepolia_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['sepolia_Bytes'];
  domainsHash: Scalars['sepolia_Bytes'];
  count: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type sepolia_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_RootPropagated_filter>>>;
};

export type sepolia_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count'
  | 'blockNumber';

export type sepolia_ScrollConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_ScrollConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_ScrollConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_ScrollConnectorMeta_filter>>>;
};

export type sepolia_ScrollConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Subscription = {
  sepolia_rootAggregated?: Maybe<sepolia_RootAggregated>;
  sepolia_rootAggregateds: Array<sepolia_RootAggregated>;
  sepolia_rootPropagated?: Maybe<sepolia_RootPropagated>;
  sepolia_rootPropagateds: Array<sepolia_RootPropagated>;
  sepolia_aggregatedMessageRoot?: Maybe<sepolia_AggregatedMessageRoot>;
  sepolia_aggregatedMessageRoots: Array<sepolia_AggregatedMessageRoot>;
  sepolia_rootManagerMeta?: Maybe<sepolia_RootManagerMeta>;
  sepolia_rootManagerMetas: Array<sepolia_RootManagerMeta>;
  sepolia_rootManagerMode?: Maybe<sepolia_RootManagerMode>;
  sepolia_rootManagerModes: Array<sepolia_RootManagerMode>;
  sepolia_optimisticRootProposed?: Maybe<sepolia_OptimisticRootProposed>;
  sepolia_optimisticRootProposeds: Array<sepolia_OptimisticRootProposed>;
  sepolia_hubOptimisticRootFinalized?: Maybe<sepolia_HubOptimisticRootFinalized>;
  sepolia_hubOptimisticRootFinalizeds: Array<sepolia_HubOptimisticRootFinalized>;
  sepolia_optimisticRootPropagated?: Maybe<sepolia_OptimisticRootPropagated>;
  sepolia_optimisticRootPropagateds: Array<sepolia_OptimisticRootPropagated>;
  sepolia_polygonConnectorMeta?: Maybe<sepolia_PolygonConnectorMeta>;
  sepolia_polygonConnectorMetas: Array<sepolia_PolygonConnectorMeta>;
  sepolia_optimismConnectorMeta?: Maybe<sepolia_OptimismConnectorMeta>;
  sepolia_optimismConnectorMetas: Array<sepolia_OptimismConnectorMeta>;
  sepolia_bnbConnectorMeta?: Maybe<sepolia_BnbConnectorMeta>;
  sepolia_bnbConnectorMetas: Array<sepolia_BnbConnectorMeta>;
  sepolia_arbitrumConnectorMeta?: Maybe<sepolia_ArbitrumConnectorMeta>;
  sepolia_arbitrumConnectorMetas: Array<sepolia_ArbitrumConnectorMeta>;
  sepolia_gnosisConnectorMeta?: Maybe<sepolia_GnosisConnectorMeta>;
  sepolia_gnosisConnectorMetas: Array<sepolia_GnosisConnectorMeta>;
  sepolia_lineaConnectorMeta?: Maybe<sepolia_LineaConnectorMeta>;
  sepolia_lineaConnectorMetas: Array<sepolia_LineaConnectorMeta>;
  sepolia_metisConnectorMeta?: Maybe<sepolia_MetisConnectorMeta>;
  sepolia_metisConnectorMetas: Array<sepolia_MetisConnectorMeta>;
  sepolia_mantleConnectorMeta?: Maybe<sepolia_MantleConnectorMeta>;
  sepolia_mantleConnectorMetas: Array<sepolia_MantleConnectorMeta>;
  sepolia_avalancheConnectorMeta?: Maybe<sepolia_AvalancheConnectorMeta>;
  sepolia_avalancheConnectorMetas: Array<sepolia_AvalancheConnectorMeta>;
  sepolia_baseConnectorMeta?: Maybe<sepolia_BaseConnectorMeta>;
  sepolia_baseConnectorMetas: Array<sepolia_BaseConnectorMeta>;
  sepolia_polygonZkConnectorMeta?: Maybe<sepolia_PolygonZkConnectorMeta>;
  sepolia_polygonZkConnectorMetas: Array<sepolia_PolygonZkConnectorMeta>;
  sepolia_x1ConnectorMeta?: Maybe<sepolia_X1ConnectorMeta>;
  sepolia_x1ConnectorMetas: Array<sepolia_X1ConnectorMeta>;
  sepolia_zkSyncConnectorMeta?: Maybe<sepolia_ZkSyncConnectorMeta>;
  sepolia_zkSyncConnectorMetas: Array<sepolia_ZkSyncConnectorMeta>;
  sepolia_modeConnectorMeta?: Maybe<sepolia_ModeConnectorMeta>;
  sepolia_modeConnectorMetas: Array<sepolia_ModeConnectorMeta>;
  sepolia_scrollConnectorMeta?: Maybe<sepolia_ScrollConnectorMeta>;
  sepolia_scrollConnectorMetas: Array<sepolia_ScrollConnectorMeta>;
  sepolia_rootMessageProcessed?: Maybe<sepolia_RootMessageProcessed>;
  sepolia_rootMessageProcesseds: Array<sepolia_RootMessageProcessed>;
  sepolia_aggregateRootSavedSlow?: Maybe<sepolia_AggregateRootSavedSlow>;
  sepolia_aggregateRootSavedSlows: Array<sepolia_AggregateRootSavedSlow>;
  sepolia_hubDomain?: Maybe<sepolia_HubDomain>;
  sepolia_hubDomains: Array<sepolia_HubDomain>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<sepolia__Meta_>;
};


export type Subscriptionsepolia_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootAggregated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootPropagated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregatedMessageRoot_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootManagerMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootManagerMode_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootProposed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimisticRootPropagated_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_PolygonConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_OptimismConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_BnbConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_GnosisConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_LineaConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_metisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_metisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_MetisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_MetisConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_mantleConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_mantleConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_MantleConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_MantleConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_avalancheConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_avalancheConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AvalancheConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AvalancheConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_BaseConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_polygonZkConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_polygonZkConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_PolygonZkConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_PolygonZkConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_x1ConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_x1ConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_X1ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_X1ConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_modeConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_modeConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ModeConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ModeConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_scrollConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_scrollConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_ScrollConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_ScrollConnectorMeta_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_RootMessageProcessed_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sepolia_HubDomain_orderBy>;
  orderDirection?: InputMaybe<sepolia_OrderDirection>;
  where?: InputMaybe<sepolia_HubDomain_filter>;
  block?: InputMaybe<sepolia_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia__metaArgs = {
  block?: InputMaybe<sepolia_Block_height>;
};

export type sepolia_X1ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_X1ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_X1ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_X1ConnectorMeta_filter>>>;
};

export type sepolia_X1ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['sepolia_Bytes'];
  rootManager: Scalars['sepolia_Bytes'];
  mirrorConnector: Scalars['sepolia_Bytes'];
};

export type sepolia_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['sepolia_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['sepolia_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<sepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<sepolia_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<sepolia_ZkSyncConnectorMeta_filter>>>;
};

export type sepolia_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type sepolia__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['sepolia_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['sepolia_Bytes']>;
};

/** The type for the top-level _meta field */
export type sepolia__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: sepolia__Block_;
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
  sepolia_rootAggregated: InContextSdkMethod<Query['sepolia_rootAggregated'], Querysepolia_rootAggregatedArgs, MeshContext>,
  /** null **/
  sepolia_rootAggregateds: InContextSdkMethod<Query['sepolia_rootAggregateds'], Querysepolia_rootAggregatedsArgs, MeshContext>,
  /** null **/
  sepolia_rootPropagated: InContextSdkMethod<Query['sepolia_rootPropagated'], Querysepolia_rootPropagatedArgs, MeshContext>,
  /** null **/
  sepolia_rootPropagateds: InContextSdkMethod<Query['sepolia_rootPropagateds'], Querysepolia_rootPropagatedsArgs, MeshContext>,
  /** null **/
  sepolia_aggregatedMessageRoot: InContextSdkMethod<Query['sepolia_aggregatedMessageRoot'], Querysepolia_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  sepolia_aggregatedMessageRoots: InContextSdkMethod<Query['sepolia_aggregatedMessageRoots'], Querysepolia_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMeta: InContextSdkMethod<Query['sepolia_rootManagerMeta'], Querysepolia_rootManagerMetaArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMetas: InContextSdkMethod<Query['sepolia_rootManagerMetas'], Querysepolia_rootManagerMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMode: InContextSdkMethod<Query['sepolia_rootManagerMode'], Querysepolia_rootManagerModeArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerModes: InContextSdkMethod<Query['sepolia_rootManagerModes'], Querysepolia_rootManagerModesArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootProposed: InContextSdkMethod<Query['sepolia_optimisticRootProposed'], Querysepolia_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootProposeds: InContextSdkMethod<Query['sepolia_optimisticRootProposeds'], Querysepolia_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  sepolia_hubOptimisticRootFinalized: InContextSdkMethod<Query['sepolia_hubOptimisticRootFinalized'], Querysepolia_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  sepolia_hubOptimisticRootFinalizeds: InContextSdkMethod<Query['sepolia_hubOptimisticRootFinalizeds'], Querysepolia_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootPropagated: InContextSdkMethod<Query['sepolia_optimisticRootPropagated'], Querysepolia_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootPropagateds: InContextSdkMethod<Query['sepolia_optimisticRootPropagateds'], Querysepolia_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  sepolia_polygonConnectorMeta: InContextSdkMethod<Query['sepolia_polygonConnectorMeta'], Querysepolia_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_polygonConnectorMetas: InContextSdkMethod<Query['sepolia_polygonConnectorMetas'], Querysepolia_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_optimismConnectorMeta: InContextSdkMethod<Query['sepolia_optimismConnectorMeta'], Querysepolia_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_optimismConnectorMetas: InContextSdkMethod<Query['sepolia_optimismConnectorMetas'], Querysepolia_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_bnbConnectorMeta: InContextSdkMethod<Query['sepolia_bnbConnectorMeta'], Querysepolia_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_bnbConnectorMetas: InContextSdkMethod<Query['sepolia_bnbConnectorMetas'], Querysepolia_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_arbitrumConnectorMeta: InContextSdkMethod<Query['sepolia_arbitrumConnectorMeta'], Querysepolia_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_arbitrumConnectorMetas: InContextSdkMethod<Query['sepolia_arbitrumConnectorMetas'], Querysepolia_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_gnosisConnectorMeta: InContextSdkMethod<Query['sepolia_gnosisConnectorMeta'], Querysepolia_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_gnosisConnectorMetas: InContextSdkMethod<Query['sepolia_gnosisConnectorMetas'], Querysepolia_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_lineaConnectorMeta: InContextSdkMethod<Query['sepolia_lineaConnectorMeta'], Querysepolia_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_lineaConnectorMetas: InContextSdkMethod<Query['sepolia_lineaConnectorMetas'], Querysepolia_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_metisConnectorMeta: InContextSdkMethod<Query['sepolia_metisConnectorMeta'], Querysepolia_metisConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_metisConnectorMetas: InContextSdkMethod<Query['sepolia_metisConnectorMetas'], Querysepolia_metisConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_mantleConnectorMeta: InContextSdkMethod<Query['sepolia_mantleConnectorMeta'], Querysepolia_mantleConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_mantleConnectorMetas: InContextSdkMethod<Query['sepolia_mantleConnectorMetas'], Querysepolia_mantleConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_avalancheConnectorMeta: InContextSdkMethod<Query['sepolia_avalancheConnectorMeta'], Querysepolia_avalancheConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_avalancheConnectorMetas: InContextSdkMethod<Query['sepolia_avalancheConnectorMetas'], Querysepolia_avalancheConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_baseConnectorMeta: InContextSdkMethod<Query['sepolia_baseConnectorMeta'], Querysepolia_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_baseConnectorMetas: InContextSdkMethod<Query['sepolia_baseConnectorMetas'], Querysepolia_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_polygonZkConnectorMeta: InContextSdkMethod<Query['sepolia_polygonZkConnectorMeta'], Querysepolia_polygonZkConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_polygonZkConnectorMetas: InContextSdkMethod<Query['sepolia_polygonZkConnectorMetas'], Querysepolia_polygonZkConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_x1ConnectorMeta: InContextSdkMethod<Query['sepolia_x1ConnectorMeta'], Querysepolia_x1ConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_x1ConnectorMetas: InContextSdkMethod<Query['sepolia_x1ConnectorMetas'], Querysepolia_x1ConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_zkSyncConnectorMeta: InContextSdkMethod<Query['sepolia_zkSyncConnectorMeta'], Querysepolia_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_zkSyncConnectorMetas: InContextSdkMethod<Query['sepolia_zkSyncConnectorMetas'], Querysepolia_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_modeConnectorMeta: InContextSdkMethod<Query['sepolia_modeConnectorMeta'], Querysepolia_modeConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_modeConnectorMetas: InContextSdkMethod<Query['sepolia_modeConnectorMetas'], Querysepolia_modeConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_scrollConnectorMeta: InContextSdkMethod<Query['sepolia_scrollConnectorMeta'], Querysepolia_scrollConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_scrollConnectorMetas: InContextSdkMethod<Query['sepolia_scrollConnectorMetas'], Querysepolia_scrollConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageProcessed: InContextSdkMethod<Query['sepolia_rootMessageProcessed'], Querysepolia_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageProcesseds: InContextSdkMethod<Query['sepolia_rootMessageProcesseds'], Querysepolia_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootSavedSlow: InContextSdkMethod<Query['sepolia_aggregateRootSavedSlow'], Querysepolia_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootSavedSlows: InContextSdkMethod<Query['sepolia_aggregateRootSavedSlows'], Querysepolia_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  sepolia_hubDomain: InContextSdkMethod<Query['sepolia_hubDomain'], Querysepolia_hubDomainArgs, MeshContext>,
  /** null **/
  sepolia_hubDomains: InContextSdkMethod<Query['sepolia_hubDomains'], Querysepolia_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Query['sepolia__meta'], Querysepolia__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  sepolia_rootAggregated: InContextSdkMethod<Subscription['sepolia_rootAggregated'], Subscriptionsepolia_rootAggregatedArgs, MeshContext>,
  /** null **/
  sepolia_rootAggregateds: InContextSdkMethod<Subscription['sepolia_rootAggregateds'], Subscriptionsepolia_rootAggregatedsArgs, MeshContext>,
  /** null **/
  sepolia_rootPropagated: InContextSdkMethod<Subscription['sepolia_rootPropagated'], Subscriptionsepolia_rootPropagatedArgs, MeshContext>,
  /** null **/
  sepolia_rootPropagateds: InContextSdkMethod<Subscription['sepolia_rootPropagateds'], Subscriptionsepolia_rootPropagatedsArgs, MeshContext>,
  /** null **/
  sepolia_aggregatedMessageRoot: InContextSdkMethod<Subscription['sepolia_aggregatedMessageRoot'], Subscriptionsepolia_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  sepolia_aggregatedMessageRoots: InContextSdkMethod<Subscription['sepolia_aggregatedMessageRoots'], Subscriptionsepolia_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMeta: InContextSdkMethod<Subscription['sepolia_rootManagerMeta'], Subscriptionsepolia_rootManagerMetaArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMetas: InContextSdkMethod<Subscription['sepolia_rootManagerMetas'], Subscriptionsepolia_rootManagerMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerMode: InContextSdkMethod<Subscription['sepolia_rootManagerMode'], Subscriptionsepolia_rootManagerModeArgs, MeshContext>,
  /** null **/
  sepolia_rootManagerModes: InContextSdkMethod<Subscription['sepolia_rootManagerModes'], Subscriptionsepolia_rootManagerModesArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootProposed: InContextSdkMethod<Subscription['sepolia_optimisticRootProposed'], Subscriptionsepolia_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootProposeds: InContextSdkMethod<Subscription['sepolia_optimisticRootProposeds'], Subscriptionsepolia_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  sepolia_hubOptimisticRootFinalized: InContextSdkMethod<Subscription['sepolia_hubOptimisticRootFinalized'], Subscriptionsepolia_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  sepolia_hubOptimisticRootFinalizeds: InContextSdkMethod<Subscription['sepolia_hubOptimisticRootFinalizeds'], Subscriptionsepolia_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootPropagated: InContextSdkMethod<Subscription['sepolia_optimisticRootPropagated'], Subscriptionsepolia_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  sepolia_optimisticRootPropagateds: InContextSdkMethod<Subscription['sepolia_optimisticRootPropagateds'], Subscriptionsepolia_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  sepolia_polygonConnectorMeta: InContextSdkMethod<Subscription['sepolia_polygonConnectorMeta'], Subscriptionsepolia_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_polygonConnectorMetas: InContextSdkMethod<Subscription['sepolia_polygonConnectorMetas'], Subscriptionsepolia_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_optimismConnectorMeta: InContextSdkMethod<Subscription['sepolia_optimismConnectorMeta'], Subscriptionsepolia_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_optimismConnectorMetas: InContextSdkMethod<Subscription['sepolia_optimismConnectorMetas'], Subscriptionsepolia_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_bnbConnectorMeta: InContextSdkMethod<Subscription['sepolia_bnbConnectorMeta'], Subscriptionsepolia_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_bnbConnectorMetas: InContextSdkMethod<Subscription['sepolia_bnbConnectorMetas'], Subscriptionsepolia_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_arbitrumConnectorMeta: InContextSdkMethod<Subscription['sepolia_arbitrumConnectorMeta'], Subscriptionsepolia_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_arbitrumConnectorMetas: InContextSdkMethod<Subscription['sepolia_arbitrumConnectorMetas'], Subscriptionsepolia_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_gnosisConnectorMeta: InContextSdkMethod<Subscription['sepolia_gnosisConnectorMeta'], Subscriptionsepolia_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_gnosisConnectorMetas: InContextSdkMethod<Subscription['sepolia_gnosisConnectorMetas'], Subscriptionsepolia_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_lineaConnectorMeta: InContextSdkMethod<Subscription['sepolia_lineaConnectorMeta'], Subscriptionsepolia_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_lineaConnectorMetas: InContextSdkMethod<Subscription['sepolia_lineaConnectorMetas'], Subscriptionsepolia_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_metisConnectorMeta: InContextSdkMethod<Subscription['sepolia_metisConnectorMeta'], Subscriptionsepolia_metisConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_metisConnectorMetas: InContextSdkMethod<Subscription['sepolia_metisConnectorMetas'], Subscriptionsepolia_metisConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_mantleConnectorMeta: InContextSdkMethod<Subscription['sepolia_mantleConnectorMeta'], Subscriptionsepolia_mantleConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_mantleConnectorMetas: InContextSdkMethod<Subscription['sepolia_mantleConnectorMetas'], Subscriptionsepolia_mantleConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_avalancheConnectorMeta: InContextSdkMethod<Subscription['sepolia_avalancheConnectorMeta'], Subscriptionsepolia_avalancheConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_avalancheConnectorMetas: InContextSdkMethod<Subscription['sepolia_avalancheConnectorMetas'], Subscriptionsepolia_avalancheConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_baseConnectorMeta: InContextSdkMethod<Subscription['sepolia_baseConnectorMeta'], Subscriptionsepolia_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_baseConnectorMetas: InContextSdkMethod<Subscription['sepolia_baseConnectorMetas'], Subscriptionsepolia_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_polygonZkConnectorMeta: InContextSdkMethod<Subscription['sepolia_polygonZkConnectorMeta'], Subscriptionsepolia_polygonZkConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_polygonZkConnectorMetas: InContextSdkMethod<Subscription['sepolia_polygonZkConnectorMetas'], Subscriptionsepolia_polygonZkConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_x1ConnectorMeta: InContextSdkMethod<Subscription['sepolia_x1ConnectorMeta'], Subscriptionsepolia_x1ConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_x1ConnectorMetas: InContextSdkMethod<Subscription['sepolia_x1ConnectorMetas'], Subscriptionsepolia_x1ConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_zkSyncConnectorMeta: InContextSdkMethod<Subscription['sepolia_zkSyncConnectorMeta'], Subscriptionsepolia_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_zkSyncConnectorMetas: InContextSdkMethod<Subscription['sepolia_zkSyncConnectorMetas'], Subscriptionsepolia_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_modeConnectorMeta: InContextSdkMethod<Subscription['sepolia_modeConnectorMeta'], Subscriptionsepolia_modeConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_modeConnectorMetas: InContextSdkMethod<Subscription['sepolia_modeConnectorMetas'], Subscriptionsepolia_modeConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_scrollConnectorMeta: InContextSdkMethod<Subscription['sepolia_scrollConnectorMeta'], Subscriptionsepolia_scrollConnectorMetaArgs, MeshContext>,
  /** null **/
  sepolia_scrollConnectorMetas: InContextSdkMethod<Subscription['sepolia_scrollConnectorMetas'], Subscriptionsepolia_scrollConnectorMetasArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageProcessed: InContextSdkMethod<Subscription['sepolia_rootMessageProcessed'], Subscriptionsepolia_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  sepolia_rootMessageProcesseds: InContextSdkMethod<Subscription['sepolia_rootMessageProcesseds'], Subscriptionsepolia_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootSavedSlow: InContextSdkMethod<Subscription['sepolia_aggregateRootSavedSlow'], Subscriptionsepolia_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  sepolia_aggregateRootSavedSlows: InContextSdkMethod<Subscription['sepolia_aggregateRootSavedSlows'], Subscriptionsepolia_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  sepolia_hubDomain: InContextSdkMethod<Subscription['sepolia_hubDomain'], Subscriptionsepolia_hubDomainArgs, MeshContext>,
  /** null **/
  sepolia_hubDomains: InContextSdkMethod<Subscription['sepolia_hubDomains'], Subscriptionsepolia_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Subscription['sepolia__meta'], Subscriptionsepolia__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
