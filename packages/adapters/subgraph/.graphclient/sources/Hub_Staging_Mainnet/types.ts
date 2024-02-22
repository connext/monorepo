// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubStagingMainnetTypes {
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
  stagingmainnet_BigDecimal: any;
  BigInt: any;
  stagingmainnet_Bytes: any;
  stagingmainnet_Int8: any;
};

export type stagingmainnet_AggregateRootSavedSlow = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  count: Scalars['BigInt'];
  aggregatedRoots?: Maybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootTimestamp: Scalars['BigInt'];
};

export type stagingmainnet_AggregateRootSavedSlow_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedRoots?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregatedRoots_not?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregatedRoots_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregatedRoots_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregatedRoots_not_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregatedRoots_not_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRootSavedSlow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregateRootSavedSlow_filter>>>;
};

export type stagingmainnet_AggregateRootSavedSlow_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'count'
  | 'aggregatedRoots'
  | 'rootTimestamp';

export type stagingmainnet_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['stagingmainnet_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AggregatedMessageRoot_filter>>>;
};

export type stagingmainnet_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain'
  | 'blockNumber';

export type stagingmainnet_Aggregation_interval =
  | 'hour'
  | 'day';

export type stagingmainnet_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_ArbitrumConnectorMeta_filter>>>;
};

export type stagingmainnet_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_AvalancheConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_AvalancheConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_AvalancheConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_AvalancheConnectorMeta_filter>>>;
};

export type stagingmainnet_AvalancheConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_BaseConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_BaseConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_BaseConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_BaseConnectorMeta_filter>>>;
};

export type stagingmainnet_BaseConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingmainnet_Block_height = {
  hash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingmainnet_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_BnbConnectorMeta_filter>>>;
};

export type stagingmainnet_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_GnosisConnectorMeta_filter>>>;
};

export type stagingmainnet_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_HubDomain = {
  id: Scalars['ID'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_HubDomain_filter = {
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_HubDomain_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_HubDomain_filter>>>;
};

export type stagingmainnet_HubDomain_orderBy =
  | 'id'
  | 'domain';

export type stagingmainnet_HubOptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_HubOptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_HubOptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_HubOptimisticRootFinalized_filter>>>;
};

export type stagingmainnet_HubOptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

export type stagingmainnet_LineaConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_LineaConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_LineaConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_LineaConnectorMeta_filter>>>;
};

export type stagingmainnet_LineaConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_MantleConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_MantleConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_MantleConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_MantleConnectorMeta_filter>>>;
};

export type stagingmainnet_MantleConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_MetisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_MetisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_MetisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_MetisConnectorMeta_filter>>>;
};

export type stagingmainnet_MetisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_ModeConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_ModeConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_ModeConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_ModeConnectorMeta_filter>>>;
};

export type stagingmainnet_ModeConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimismConnectorMeta_filter>>>;
};

export type stagingmainnet_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_OptimisticRootPropagated = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  domainsHash: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_OptimisticRootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootPropagated_filter>>>;
};

export type stagingmainnet_OptimisticRootPropagated_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'domainsHash'
  | 'timestamp'
  | 'blockNumber';

export type stagingmainnet_OptimisticRootProposed = {
  id: Scalars['ID'];
  disputeCliff: Scalars['BigInt'];
  aggregateRoot: Scalars['stagingmainnet_Bytes'];
  snapshotsRoots?: Maybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domains?: Maybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot: Scalars['stagingmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_OptimisticRootProposed_filter = {
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
  aggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  snapshotsRoots?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  snapshotsRoots_not?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  snapshotsRoots_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  snapshotsRoots_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  snapshotsRoots_not_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  snapshotsRoots_not_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  baseAggregateRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  baseAggregateRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  baseAggregateRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_OptimisticRootProposed_filter>>>;
};

export type stagingmainnet_OptimisticRootProposed_orderBy =
  | 'id'
  | 'disputeCliff'
  | 'aggregateRoot'
  | 'snapshotsRoots'
  | 'domains'
  | 'baseAggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingmainnet_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_PolygonConnectorMeta_filter>>>;
};

export type stagingmainnet_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet_PolygonZkConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_PolygonZkConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_PolygonZkConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_PolygonZkConnectorMeta_filter>>>;
};

export type stagingmainnet_PolygonZkConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  stagingmainnet_rootAggregated?: Maybe<stagingmainnet_RootAggregated>;
  stagingmainnet_rootAggregateds: Array<stagingmainnet_RootAggregated>;
  stagingmainnet_rootPropagated?: Maybe<stagingmainnet_RootPropagated>;
  stagingmainnet_rootPropagateds: Array<stagingmainnet_RootPropagated>;
  stagingmainnet_aggregatedMessageRoot?: Maybe<stagingmainnet_AggregatedMessageRoot>;
  stagingmainnet_aggregatedMessageRoots: Array<stagingmainnet_AggregatedMessageRoot>;
  stagingmainnet_rootManagerMeta?: Maybe<stagingmainnet_RootManagerMeta>;
  stagingmainnet_rootManagerMetas: Array<stagingmainnet_RootManagerMeta>;
  stagingmainnet_rootManagerMode?: Maybe<stagingmainnet_RootManagerMode>;
  stagingmainnet_rootManagerModes: Array<stagingmainnet_RootManagerMode>;
  stagingmainnet_optimisticRootProposed?: Maybe<stagingmainnet_OptimisticRootProposed>;
  stagingmainnet_optimisticRootProposeds: Array<stagingmainnet_OptimisticRootProposed>;
  stagingmainnet_hubOptimisticRootFinalized?: Maybe<stagingmainnet_HubOptimisticRootFinalized>;
  stagingmainnet_hubOptimisticRootFinalizeds: Array<stagingmainnet_HubOptimisticRootFinalized>;
  stagingmainnet_optimisticRootPropagated?: Maybe<stagingmainnet_OptimisticRootPropagated>;
  stagingmainnet_optimisticRootPropagateds: Array<stagingmainnet_OptimisticRootPropagated>;
  stagingmainnet_polygonConnectorMeta?: Maybe<stagingmainnet_PolygonConnectorMeta>;
  stagingmainnet_polygonConnectorMetas: Array<stagingmainnet_PolygonConnectorMeta>;
  stagingmainnet_optimismConnectorMeta?: Maybe<stagingmainnet_OptimismConnectorMeta>;
  stagingmainnet_optimismConnectorMetas: Array<stagingmainnet_OptimismConnectorMeta>;
  stagingmainnet_bnbConnectorMeta?: Maybe<stagingmainnet_BnbConnectorMeta>;
  stagingmainnet_bnbConnectorMetas: Array<stagingmainnet_BnbConnectorMeta>;
  stagingmainnet_arbitrumConnectorMeta?: Maybe<stagingmainnet_ArbitrumConnectorMeta>;
  stagingmainnet_arbitrumConnectorMetas: Array<stagingmainnet_ArbitrumConnectorMeta>;
  stagingmainnet_gnosisConnectorMeta?: Maybe<stagingmainnet_GnosisConnectorMeta>;
  stagingmainnet_gnosisConnectorMetas: Array<stagingmainnet_GnosisConnectorMeta>;
  stagingmainnet_lineaConnectorMeta?: Maybe<stagingmainnet_LineaConnectorMeta>;
  stagingmainnet_lineaConnectorMetas: Array<stagingmainnet_LineaConnectorMeta>;
  stagingmainnet_metisConnectorMeta?: Maybe<stagingmainnet_MetisConnectorMeta>;
  stagingmainnet_metisConnectorMetas: Array<stagingmainnet_MetisConnectorMeta>;
  stagingmainnet_mantleConnectorMeta?: Maybe<stagingmainnet_MantleConnectorMeta>;
  stagingmainnet_mantleConnectorMetas: Array<stagingmainnet_MantleConnectorMeta>;
  stagingmainnet_avalancheConnectorMeta?: Maybe<stagingmainnet_AvalancheConnectorMeta>;
  stagingmainnet_avalancheConnectorMetas: Array<stagingmainnet_AvalancheConnectorMeta>;
  stagingmainnet_baseConnectorMeta?: Maybe<stagingmainnet_BaseConnectorMeta>;
  stagingmainnet_baseConnectorMetas: Array<stagingmainnet_BaseConnectorMeta>;
  stagingmainnet_polygonZkConnectorMeta?: Maybe<stagingmainnet_PolygonZkConnectorMeta>;
  stagingmainnet_polygonZkConnectorMetas: Array<stagingmainnet_PolygonZkConnectorMeta>;
  stagingmainnet_zkSyncConnectorMeta?: Maybe<stagingmainnet_ZkSyncConnectorMeta>;
  stagingmainnet_zkSyncConnectorMetas: Array<stagingmainnet_ZkSyncConnectorMeta>;
  stagingmainnet_modeConnectorMeta?: Maybe<stagingmainnet_ModeConnectorMeta>;
  stagingmainnet_modeConnectorMetas: Array<stagingmainnet_ModeConnectorMeta>;
  stagingmainnet_rootMessageProcessed?: Maybe<stagingmainnet_RootMessageProcessed>;
  stagingmainnet_rootMessageProcesseds: Array<stagingmainnet_RootMessageProcessed>;
  stagingmainnet_aggregateRootSavedSlow?: Maybe<stagingmainnet_AggregateRootSavedSlow>;
  stagingmainnet_aggregateRootSavedSlows: Array<stagingmainnet_AggregateRootSavedSlow>;
  stagingmainnet_hubDomain?: Maybe<stagingmainnet_HubDomain>;
  stagingmainnet_hubDomains: Array<stagingmainnet_HubDomain>;
  /** Access to subgraph metadata */
  stagingmainnet__meta?: Maybe<stagingmainnet__Meta_>;
};


export type Querystagingmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootAggregated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootPropagated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootManagerMode_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootProposed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootPropagated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_LineaConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_metisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_metisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_MetisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_MetisConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_mantleConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_mantleConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_MantleConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_MantleConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_avalancheConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_avalancheConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AvalancheConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AvalancheConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_BaseConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_polygonZkConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_polygonZkConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_PolygonZkConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_PolygonZkConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_modeConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_modeConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ModeConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ModeConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_HubDomain_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_HubDomain_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingmainnet__metaArgs = {
  block?: InputMaybe<stagingmainnet_Block_height>;
};

export type stagingmainnet_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['stagingmainnet_Bytes'];
  index: Scalars['BigInt'];
};

export type stagingmainnet_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootAggregated_filter>>>;
};

export type stagingmainnet_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type stagingmainnet_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['stagingmainnet_Bytes']>>;
};

export type stagingmainnet_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootManagerMeta_filter>>>;
};

export type stagingmainnet_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type stagingmainnet_RootManagerMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type stagingmainnet_RootManagerMode_filter = {
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootManagerMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootManagerMode_filter>>>;
};

export type stagingmainnet_RootManagerMode_orderBy =
  | 'id'
  | 'mode';

export type stagingmainnet_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['stagingmainnet_Bytes']>;
  caller?: Maybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootMessageProcessed_filter>>>;
};

export type stagingmainnet_RootMessageProcessed_orderBy =
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

export type stagingmainnet_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['stagingmainnet_Bytes'];
  domainsHash: Scalars['stagingmainnet_Bytes'];
  count: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingmainnet_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
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
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_RootPropagated_filter>>>;
};

export type stagingmainnet_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count'
  | 'blockNumber';

export type Subscription = {
  stagingmainnet_rootAggregated?: Maybe<stagingmainnet_RootAggregated>;
  stagingmainnet_rootAggregateds: Array<stagingmainnet_RootAggregated>;
  stagingmainnet_rootPropagated?: Maybe<stagingmainnet_RootPropagated>;
  stagingmainnet_rootPropagateds: Array<stagingmainnet_RootPropagated>;
  stagingmainnet_aggregatedMessageRoot?: Maybe<stagingmainnet_AggregatedMessageRoot>;
  stagingmainnet_aggregatedMessageRoots: Array<stagingmainnet_AggregatedMessageRoot>;
  stagingmainnet_rootManagerMeta?: Maybe<stagingmainnet_RootManagerMeta>;
  stagingmainnet_rootManagerMetas: Array<stagingmainnet_RootManagerMeta>;
  stagingmainnet_rootManagerMode?: Maybe<stagingmainnet_RootManagerMode>;
  stagingmainnet_rootManagerModes: Array<stagingmainnet_RootManagerMode>;
  stagingmainnet_optimisticRootProposed?: Maybe<stagingmainnet_OptimisticRootProposed>;
  stagingmainnet_optimisticRootProposeds: Array<stagingmainnet_OptimisticRootProposed>;
  stagingmainnet_hubOptimisticRootFinalized?: Maybe<stagingmainnet_HubOptimisticRootFinalized>;
  stagingmainnet_hubOptimisticRootFinalizeds: Array<stagingmainnet_HubOptimisticRootFinalized>;
  stagingmainnet_optimisticRootPropagated?: Maybe<stagingmainnet_OptimisticRootPropagated>;
  stagingmainnet_optimisticRootPropagateds: Array<stagingmainnet_OptimisticRootPropagated>;
  stagingmainnet_polygonConnectorMeta?: Maybe<stagingmainnet_PolygonConnectorMeta>;
  stagingmainnet_polygonConnectorMetas: Array<stagingmainnet_PolygonConnectorMeta>;
  stagingmainnet_optimismConnectorMeta?: Maybe<stagingmainnet_OptimismConnectorMeta>;
  stagingmainnet_optimismConnectorMetas: Array<stagingmainnet_OptimismConnectorMeta>;
  stagingmainnet_bnbConnectorMeta?: Maybe<stagingmainnet_BnbConnectorMeta>;
  stagingmainnet_bnbConnectorMetas: Array<stagingmainnet_BnbConnectorMeta>;
  stagingmainnet_arbitrumConnectorMeta?: Maybe<stagingmainnet_ArbitrumConnectorMeta>;
  stagingmainnet_arbitrumConnectorMetas: Array<stagingmainnet_ArbitrumConnectorMeta>;
  stagingmainnet_gnosisConnectorMeta?: Maybe<stagingmainnet_GnosisConnectorMeta>;
  stagingmainnet_gnosisConnectorMetas: Array<stagingmainnet_GnosisConnectorMeta>;
  stagingmainnet_lineaConnectorMeta?: Maybe<stagingmainnet_LineaConnectorMeta>;
  stagingmainnet_lineaConnectorMetas: Array<stagingmainnet_LineaConnectorMeta>;
  stagingmainnet_metisConnectorMeta?: Maybe<stagingmainnet_MetisConnectorMeta>;
  stagingmainnet_metisConnectorMetas: Array<stagingmainnet_MetisConnectorMeta>;
  stagingmainnet_mantleConnectorMeta?: Maybe<stagingmainnet_MantleConnectorMeta>;
  stagingmainnet_mantleConnectorMetas: Array<stagingmainnet_MantleConnectorMeta>;
  stagingmainnet_avalancheConnectorMeta?: Maybe<stagingmainnet_AvalancheConnectorMeta>;
  stagingmainnet_avalancheConnectorMetas: Array<stagingmainnet_AvalancheConnectorMeta>;
  stagingmainnet_baseConnectorMeta?: Maybe<stagingmainnet_BaseConnectorMeta>;
  stagingmainnet_baseConnectorMetas: Array<stagingmainnet_BaseConnectorMeta>;
  stagingmainnet_polygonZkConnectorMeta?: Maybe<stagingmainnet_PolygonZkConnectorMeta>;
  stagingmainnet_polygonZkConnectorMetas: Array<stagingmainnet_PolygonZkConnectorMeta>;
  stagingmainnet_zkSyncConnectorMeta?: Maybe<stagingmainnet_ZkSyncConnectorMeta>;
  stagingmainnet_zkSyncConnectorMetas: Array<stagingmainnet_ZkSyncConnectorMeta>;
  stagingmainnet_modeConnectorMeta?: Maybe<stagingmainnet_ModeConnectorMeta>;
  stagingmainnet_modeConnectorMetas: Array<stagingmainnet_ModeConnectorMeta>;
  stagingmainnet_rootMessageProcessed?: Maybe<stagingmainnet_RootMessageProcessed>;
  stagingmainnet_rootMessageProcesseds: Array<stagingmainnet_RootMessageProcessed>;
  stagingmainnet_aggregateRootSavedSlow?: Maybe<stagingmainnet_AggregateRootSavedSlow>;
  stagingmainnet_aggregateRootSavedSlows: Array<stagingmainnet_AggregateRootSavedSlow>;
  stagingmainnet_hubDomain?: Maybe<stagingmainnet_HubDomain>;
  stagingmainnet_hubDomains: Array<stagingmainnet_HubDomain>;
  /** Access to subgraph metadata */
  stagingmainnet__meta?: Maybe<stagingmainnet__Meta_>;
};


export type Subscriptionstagingmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootAggregated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootPropagated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootManagerMode_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootProposed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimisticRootPropagated_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_LineaConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_metisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_metisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_MetisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_MetisConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_mantleConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_mantleConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_MantleConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_MantleConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_avalancheConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_avalancheConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AvalancheConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AvalancheConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_BaseConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_polygonZkConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_polygonZkConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_PolygonZkConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_PolygonZkConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_modeConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_modeConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_ModeConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_ModeConnectorMeta_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingmainnet_HubDomain_orderBy>;
  orderDirection?: InputMaybe<stagingmainnet_OrderDirection>;
  where?: InputMaybe<stagingmainnet_HubDomain_filter>;
  block?: InputMaybe<stagingmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingmainnet__metaArgs = {
  block?: InputMaybe<stagingmainnet_Block_height>;
};

export type stagingmainnet_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['stagingmainnet_Bytes'];
  rootManager: Scalars['stagingmainnet_Bytes'];
  mirrorConnector: Scalars['stagingmainnet_Bytes'];
};

export type stagingmainnet_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['stagingmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['stagingmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<stagingmainnet_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<stagingmainnet_ZkSyncConnectorMeta_filter>>>;
};

export type stagingmainnet_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type stagingmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type stagingmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingmainnet__Block_;
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
  stagingmainnet_rootAggregated: InContextSdkMethod<Query['stagingmainnet_rootAggregated'], Querystagingmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootAggregateds: InContextSdkMethod<Query['stagingmainnet_rootAggregateds'], Querystagingmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootPropagated: InContextSdkMethod<Query['stagingmainnet_rootPropagated'], Querystagingmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootPropagateds: InContextSdkMethod<Query['stagingmainnet_rootPropagateds'], Querystagingmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregatedMessageRoot: InContextSdkMethod<Query['stagingmainnet_aggregatedMessageRoot'], Querystagingmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregatedMessageRoots: InContextSdkMethod<Query['stagingmainnet_aggregatedMessageRoots'], Querystagingmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMeta: InContextSdkMethod<Query['stagingmainnet_rootManagerMeta'], Querystagingmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMetas: InContextSdkMethod<Query['stagingmainnet_rootManagerMetas'], Querystagingmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMode: InContextSdkMethod<Query['stagingmainnet_rootManagerMode'], Querystagingmainnet_rootManagerModeArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerModes: InContextSdkMethod<Query['stagingmainnet_rootManagerModes'], Querystagingmainnet_rootManagerModesArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootProposed: InContextSdkMethod<Query['stagingmainnet_optimisticRootProposed'], Querystagingmainnet_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootProposeds: InContextSdkMethod<Query['stagingmainnet_optimisticRootProposeds'], Querystagingmainnet_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubOptimisticRootFinalized: InContextSdkMethod<Query['stagingmainnet_hubOptimisticRootFinalized'], Querystagingmainnet_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubOptimisticRootFinalizeds: InContextSdkMethod<Query['stagingmainnet_hubOptimisticRootFinalizeds'], Querystagingmainnet_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootPropagated: InContextSdkMethod<Query['stagingmainnet_optimisticRootPropagated'], Querystagingmainnet_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootPropagateds: InContextSdkMethod<Query['stagingmainnet_optimisticRootPropagateds'], Querystagingmainnet_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonConnectorMeta: InContextSdkMethod<Query['stagingmainnet_polygonConnectorMeta'], Querystagingmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonConnectorMetas: InContextSdkMethod<Query['stagingmainnet_polygonConnectorMetas'], Querystagingmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimismConnectorMeta: InContextSdkMethod<Query['stagingmainnet_optimismConnectorMeta'], Querystagingmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimismConnectorMetas: InContextSdkMethod<Query['stagingmainnet_optimismConnectorMetas'], Querystagingmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_bnbConnectorMeta: InContextSdkMethod<Query['stagingmainnet_bnbConnectorMeta'], Querystagingmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_bnbConnectorMetas: InContextSdkMethod<Query['stagingmainnet_bnbConnectorMetas'], Querystagingmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_arbitrumConnectorMeta: InContextSdkMethod<Query['stagingmainnet_arbitrumConnectorMeta'], Querystagingmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_arbitrumConnectorMetas: InContextSdkMethod<Query['stagingmainnet_arbitrumConnectorMetas'], Querystagingmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_gnosisConnectorMeta: InContextSdkMethod<Query['stagingmainnet_gnosisConnectorMeta'], Querystagingmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_gnosisConnectorMetas: InContextSdkMethod<Query['stagingmainnet_gnosisConnectorMetas'], Querystagingmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_lineaConnectorMeta: InContextSdkMethod<Query['stagingmainnet_lineaConnectorMeta'], Querystagingmainnet_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_lineaConnectorMetas: InContextSdkMethod<Query['stagingmainnet_lineaConnectorMetas'], Querystagingmainnet_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_metisConnectorMeta: InContextSdkMethod<Query['stagingmainnet_metisConnectorMeta'], Querystagingmainnet_metisConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_metisConnectorMetas: InContextSdkMethod<Query['stagingmainnet_metisConnectorMetas'], Querystagingmainnet_metisConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_mantleConnectorMeta: InContextSdkMethod<Query['stagingmainnet_mantleConnectorMeta'], Querystagingmainnet_mantleConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_mantleConnectorMetas: InContextSdkMethod<Query['stagingmainnet_mantleConnectorMetas'], Querystagingmainnet_mantleConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_avalancheConnectorMeta: InContextSdkMethod<Query['stagingmainnet_avalancheConnectorMeta'], Querystagingmainnet_avalancheConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_avalancheConnectorMetas: InContextSdkMethod<Query['stagingmainnet_avalancheConnectorMetas'], Querystagingmainnet_avalancheConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_baseConnectorMeta: InContextSdkMethod<Query['stagingmainnet_baseConnectorMeta'], Querystagingmainnet_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_baseConnectorMetas: InContextSdkMethod<Query['stagingmainnet_baseConnectorMetas'], Querystagingmainnet_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonZkConnectorMeta: InContextSdkMethod<Query['stagingmainnet_polygonZkConnectorMeta'], Querystagingmainnet_polygonZkConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonZkConnectorMetas: InContextSdkMethod<Query['stagingmainnet_polygonZkConnectorMetas'], Querystagingmainnet_polygonZkConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_zkSyncConnectorMeta: InContextSdkMethod<Query['stagingmainnet_zkSyncConnectorMeta'], Querystagingmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_zkSyncConnectorMetas: InContextSdkMethod<Query['stagingmainnet_zkSyncConnectorMetas'], Querystagingmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_modeConnectorMeta: InContextSdkMethod<Query['stagingmainnet_modeConnectorMeta'], Querystagingmainnet_modeConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_modeConnectorMetas: InContextSdkMethod<Query['stagingmainnet_modeConnectorMetas'], Querystagingmainnet_modeConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageProcessed: InContextSdkMethod<Query['stagingmainnet_rootMessageProcessed'], Querystagingmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageProcesseds: InContextSdkMethod<Query['stagingmainnet_rootMessageProcesseds'], Querystagingmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootSavedSlow: InContextSdkMethod<Query['stagingmainnet_aggregateRootSavedSlow'], Querystagingmainnet_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootSavedSlows: InContextSdkMethod<Query['stagingmainnet_aggregateRootSavedSlows'], Querystagingmainnet_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubDomain: InContextSdkMethod<Query['stagingmainnet_hubDomain'], Querystagingmainnet_hubDomainArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubDomains: InContextSdkMethod<Query['stagingmainnet_hubDomains'], Querystagingmainnet_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmainnet__meta: InContextSdkMethod<Query['stagingmainnet__meta'], Querystagingmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  stagingmainnet_rootAggregated: InContextSdkMethod<Subscription['stagingmainnet_rootAggregated'], Subscriptionstagingmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootAggregateds: InContextSdkMethod<Subscription['stagingmainnet_rootAggregateds'], Subscriptionstagingmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootPropagated: InContextSdkMethod<Subscription['stagingmainnet_rootPropagated'], Subscriptionstagingmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootPropagateds: InContextSdkMethod<Subscription['stagingmainnet_rootPropagateds'], Subscriptionstagingmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregatedMessageRoot: InContextSdkMethod<Subscription['stagingmainnet_aggregatedMessageRoot'], Subscriptionstagingmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregatedMessageRoots: InContextSdkMethod<Subscription['stagingmainnet_aggregatedMessageRoots'], Subscriptionstagingmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMeta: InContextSdkMethod<Subscription['stagingmainnet_rootManagerMeta'], Subscriptionstagingmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMetas: InContextSdkMethod<Subscription['stagingmainnet_rootManagerMetas'], Subscriptionstagingmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerMode: InContextSdkMethod<Subscription['stagingmainnet_rootManagerMode'], Subscriptionstagingmainnet_rootManagerModeArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootManagerModes: InContextSdkMethod<Subscription['stagingmainnet_rootManagerModes'], Subscriptionstagingmainnet_rootManagerModesArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootProposed: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootProposed'], Subscriptionstagingmainnet_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootProposeds: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootProposeds'], Subscriptionstagingmainnet_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubOptimisticRootFinalized: InContextSdkMethod<Subscription['stagingmainnet_hubOptimisticRootFinalized'], Subscriptionstagingmainnet_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubOptimisticRootFinalizeds: InContextSdkMethod<Subscription['stagingmainnet_hubOptimisticRootFinalizeds'], Subscriptionstagingmainnet_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootPropagated: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootPropagated'], Subscriptionstagingmainnet_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimisticRootPropagateds: InContextSdkMethod<Subscription['stagingmainnet_optimisticRootPropagateds'], Subscriptionstagingmainnet_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_polygonConnectorMeta'], Subscriptionstagingmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_polygonConnectorMetas'], Subscriptionstagingmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimismConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_optimismConnectorMeta'], Subscriptionstagingmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_optimismConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_optimismConnectorMetas'], Subscriptionstagingmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_bnbConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_bnbConnectorMeta'], Subscriptionstagingmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_bnbConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_bnbConnectorMetas'], Subscriptionstagingmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_arbitrumConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_arbitrumConnectorMeta'], Subscriptionstagingmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_arbitrumConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_arbitrumConnectorMetas'], Subscriptionstagingmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_gnosisConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_gnosisConnectorMeta'], Subscriptionstagingmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_gnosisConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_gnosisConnectorMetas'], Subscriptionstagingmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_lineaConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_lineaConnectorMeta'], Subscriptionstagingmainnet_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_lineaConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_lineaConnectorMetas'], Subscriptionstagingmainnet_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_metisConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_metisConnectorMeta'], Subscriptionstagingmainnet_metisConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_metisConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_metisConnectorMetas'], Subscriptionstagingmainnet_metisConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_mantleConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_mantleConnectorMeta'], Subscriptionstagingmainnet_mantleConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_mantleConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_mantleConnectorMetas'], Subscriptionstagingmainnet_mantleConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_avalancheConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_avalancheConnectorMeta'], Subscriptionstagingmainnet_avalancheConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_avalancheConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_avalancheConnectorMetas'], Subscriptionstagingmainnet_avalancheConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_baseConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_baseConnectorMeta'], Subscriptionstagingmainnet_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_baseConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_baseConnectorMetas'], Subscriptionstagingmainnet_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonZkConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_polygonZkConnectorMeta'], Subscriptionstagingmainnet_polygonZkConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_polygonZkConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_polygonZkConnectorMetas'], Subscriptionstagingmainnet_polygonZkConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_zkSyncConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_zkSyncConnectorMeta'], Subscriptionstagingmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_zkSyncConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_zkSyncConnectorMetas'], Subscriptionstagingmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_modeConnectorMeta: InContextSdkMethod<Subscription['stagingmainnet_modeConnectorMeta'], Subscriptionstagingmainnet_modeConnectorMetaArgs, MeshContext>,
  /** null **/
  stagingmainnet_modeConnectorMetas: InContextSdkMethod<Subscription['stagingmainnet_modeConnectorMetas'], Subscriptionstagingmainnet_modeConnectorMetasArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageProcessed: InContextSdkMethod<Subscription['stagingmainnet_rootMessageProcessed'], Subscriptionstagingmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  stagingmainnet_rootMessageProcesseds: InContextSdkMethod<Subscription['stagingmainnet_rootMessageProcesseds'], Subscriptionstagingmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootSavedSlow: InContextSdkMethod<Subscription['stagingmainnet_aggregateRootSavedSlow'], Subscriptionstagingmainnet_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  stagingmainnet_aggregateRootSavedSlows: InContextSdkMethod<Subscription['stagingmainnet_aggregateRootSavedSlows'], Subscriptionstagingmainnet_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubDomain: InContextSdkMethod<Subscription['stagingmainnet_hubDomain'], Subscriptionstagingmainnet_hubDomainArgs, MeshContext>,
  /** null **/
  stagingmainnet_hubDomains: InContextSdkMethod<Subscription['stagingmainnet_hubDomains'], Subscriptionstagingmainnet_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingmainnet__meta: InContextSdkMethod<Subscription['stagingmainnet__meta'], Subscriptionstagingmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Staging_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
