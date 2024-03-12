// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubGoerliTypes {
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
  goerli_Int8: any;
};

export type goerli_AggregateRootSavedSlow = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['goerli_Bytes'];
  count: Scalars['BigInt'];
  aggregatedRoots?: Maybe<Array<Scalars['goerli_Bytes']>>;
  rootTimestamp: Scalars['BigInt'];
};

export type goerli_AggregateRootSavedSlow_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedRoots?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregatedRoots_not?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregatedRoots_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregatedRoots_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregatedRoots_not_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregatedRoots_not_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AggregateRootSavedSlow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AggregateRootSavedSlow_filter>>>;
};

export type goerli_AggregateRootSavedSlow_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'count'
  | 'aggregatedRoots'
  | 'rootTimestamp';

export type goerli_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['goerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AggregatedMessageRoot_filter>>>;
};

export type goerli_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain'
  | 'blockNumber';

export type goerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type goerli_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_ArbitrumConnectorMeta_filter>>>;
};

export type goerli_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_BaseConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_BaseConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_BaseConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_BaseConnectorMeta_filter>>>;
};

export type goerli_BaseConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type goerli_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_BnbConnectorMeta_filter>>>;
};

export type goerli_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_GnosisConnectorMeta_filter>>>;
};

export type goerli_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_HubDomain = {
  id: Scalars['ID'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type goerli_HubDomain_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_HubDomain_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_HubDomain_filter>>>;
};

export type goerli_HubDomain_orderBy =
  | 'id'
  | 'domain';

export type goerli_HubOptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_HubOptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_HubOptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_HubOptimisticRootFinalized_filter>>>;
};

export type goerli_HubOptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

export type goerli_LineaConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_LineaConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_LineaConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_LineaConnectorMeta_filter>>>;
};

export type goerli_LineaConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OptimismConnectorMeta_filter>>>;
};

export type goerli_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_OptimisticRootPropagated = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['goerli_Bytes'];
  domainsHash: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OptimisticRootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootPropagated_filter>>>;
};

export type goerli_OptimisticRootPropagated_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'domainsHash'
  | 'timestamp'
  | 'blockNumber';

export type goerli_OptimisticRootProposed = {
  id: Scalars['ID'];
  disputeCliff: Scalars['BigInt'];
  aggregateRoot: Scalars['goerli_Bytes'];
  snapshotsRoots?: Maybe<Array<Scalars['goerli_Bytes']>>;
  domains?: Maybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot: Scalars['goerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OptimisticRootProposed_filter = {
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
  aggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  snapshotsRoots?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  snapshotsRoots_not?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  snapshotsRoots_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  snapshotsRoots_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  snapshotsRoots_not_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  snapshotsRoots_not_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  baseAggregateRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  baseAggregateRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  baseAggregateRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_OptimisticRootProposed_filter>>>;
};

export type goerli_OptimisticRootProposed_orderBy =
  | 'id'
  | 'disputeCliff'
  | 'aggregateRoot'
  | 'snapshotsRoots'
  | 'domains'
  | 'baseAggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_PolygonConnectorMeta_filter>>>;
};

export type goerli_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  goerli_rootAggregated?: Maybe<goerli_RootAggregated>;
  goerli_rootAggregateds: Array<goerli_RootAggregated>;
  goerli_rootPropagated?: Maybe<goerli_RootPropagated>;
  goerli_rootPropagateds: Array<goerli_RootPropagated>;
  goerli_aggregatedMessageRoot?: Maybe<goerli_AggregatedMessageRoot>;
  goerli_aggregatedMessageRoots: Array<goerli_AggregatedMessageRoot>;
  goerli_rootManagerMeta?: Maybe<goerli_RootManagerMeta>;
  goerli_rootManagerMetas: Array<goerli_RootManagerMeta>;
  goerli_rootManagerMode?: Maybe<goerli_RootManagerMode>;
  goerli_rootManagerModes: Array<goerli_RootManagerMode>;
  goerli_optimisticRootProposed?: Maybe<goerli_OptimisticRootProposed>;
  goerli_optimisticRootProposeds: Array<goerli_OptimisticRootProposed>;
  goerli_hubOptimisticRootFinalized?: Maybe<goerli_HubOptimisticRootFinalized>;
  goerli_hubOptimisticRootFinalizeds: Array<goerli_HubOptimisticRootFinalized>;
  goerli_optimisticRootPropagated?: Maybe<goerli_OptimisticRootPropagated>;
  goerli_optimisticRootPropagateds: Array<goerli_OptimisticRootPropagated>;
  goerli_polygonConnectorMeta?: Maybe<goerli_PolygonConnectorMeta>;
  goerli_polygonConnectorMetas: Array<goerli_PolygonConnectorMeta>;
  goerli_optimismConnectorMeta?: Maybe<goerli_OptimismConnectorMeta>;
  goerli_optimismConnectorMetas: Array<goerli_OptimismConnectorMeta>;
  goerli_bnbConnectorMeta?: Maybe<goerli_BnbConnectorMeta>;
  goerli_bnbConnectorMetas: Array<goerli_BnbConnectorMeta>;
  goerli_arbitrumConnectorMeta?: Maybe<goerli_ArbitrumConnectorMeta>;
  goerli_arbitrumConnectorMetas: Array<goerli_ArbitrumConnectorMeta>;
  goerli_gnosisConnectorMeta?: Maybe<goerli_GnosisConnectorMeta>;
  goerli_gnosisConnectorMetas: Array<goerli_GnosisConnectorMeta>;
  goerli_zkSyncConnectorMeta?: Maybe<goerli_ZkSyncConnectorMeta>;
  goerli_zkSyncConnectorMetas: Array<goerli_ZkSyncConnectorMeta>;
  goerli_lineaConnectorMeta?: Maybe<goerli_LineaConnectorMeta>;
  goerli_lineaConnectorMetas: Array<goerli_LineaConnectorMeta>;
  goerli_baseConnectorMeta?: Maybe<goerli_BaseConnectorMeta>;
  goerli_baseConnectorMetas: Array<goerli_BaseConnectorMeta>;
  goerli_x1ConnectorMeta?: Maybe<goerli_X1ConnectorMeta>;
  goerli_x1ConnectorMetas: Array<goerli_X1ConnectorMeta>;
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
  goerli_aggregateRootSavedSlow?: Maybe<goerli_AggregateRootSavedSlow>;
  goerli_aggregateRootSavedSlows: Array<goerli_AggregateRootSavedSlow>;
  goerli_hubDomain?: Maybe<goerli_HubDomain>;
  goerli_hubDomains: Array<goerli_HubDomain>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Querygoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootAggregated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootPropagated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootManagerMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootManagerMode_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootProposed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootPropagated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_LineaConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_BaseConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_x1ConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_x1ConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_X1ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_X1ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageProcessed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_HubDomain_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_HubDomain_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['goerli_Bytes'];
  index: Scalars['BigInt'];
};

export type goerli_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootAggregated_filter>>>;
};

export type goerli_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type goerli_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['goerli_Bytes']>>;
};

export type goerli_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootManagerMeta_filter>>>;
};

export type goerli_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type goerli_RootManagerMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type goerli_RootManagerMode_filter = {
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootManagerMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootManagerMode_filter>>>;
};

export type goerli_RootManagerMode_orderBy =
  | 'id'
  | 'mode';

export type goerli_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['goerli_Bytes']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootMessageProcessed_filter>>>;
};

export type goerli_RootMessageProcessed_orderBy =
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

export type goerli_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['goerli_Bytes'];
  domainsHash: Scalars['goerli_Bytes'];
  count: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
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
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootPropagated_filter>>>;
};

export type goerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count'
  | 'blockNumber';

export type Subscription = {
  goerli_rootAggregated?: Maybe<goerli_RootAggregated>;
  goerli_rootAggregateds: Array<goerli_RootAggregated>;
  goerli_rootPropagated?: Maybe<goerli_RootPropagated>;
  goerli_rootPropagateds: Array<goerli_RootPropagated>;
  goerli_aggregatedMessageRoot?: Maybe<goerli_AggregatedMessageRoot>;
  goerli_aggregatedMessageRoots: Array<goerli_AggregatedMessageRoot>;
  goerli_rootManagerMeta?: Maybe<goerli_RootManagerMeta>;
  goerli_rootManagerMetas: Array<goerli_RootManagerMeta>;
  goerli_rootManagerMode?: Maybe<goerli_RootManagerMode>;
  goerli_rootManagerModes: Array<goerli_RootManagerMode>;
  goerli_optimisticRootProposed?: Maybe<goerli_OptimisticRootProposed>;
  goerli_optimisticRootProposeds: Array<goerli_OptimisticRootProposed>;
  goerli_hubOptimisticRootFinalized?: Maybe<goerli_HubOptimisticRootFinalized>;
  goerli_hubOptimisticRootFinalizeds: Array<goerli_HubOptimisticRootFinalized>;
  goerli_optimisticRootPropagated?: Maybe<goerli_OptimisticRootPropagated>;
  goerli_optimisticRootPropagateds: Array<goerli_OptimisticRootPropagated>;
  goerli_polygonConnectorMeta?: Maybe<goerli_PolygonConnectorMeta>;
  goerli_polygonConnectorMetas: Array<goerli_PolygonConnectorMeta>;
  goerli_optimismConnectorMeta?: Maybe<goerli_OptimismConnectorMeta>;
  goerli_optimismConnectorMetas: Array<goerli_OptimismConnectorMeta>;
  goerli_bnbConnectorMeta?: Maybe<goerli_BnbConnectorMeta>;
  goerli_bnbConnectorMetas: Array<goerli_BnbConnectorMeta>;
  goerli_arbitrumConnectorMeta?: Maybe<goerli_ArbitrumConnectorMeta>;
  goerli_arbitrumConnectorMetas: Array<goerli_ArbitrumConnectorMeta>;
  goerli_gnosisConnectorMeta?: Maybe<goerli_GnosisConnectorMeta>;
  goerli_gnosisConnectorMetas: Array<goerli_GnosisConnectorMeta>;
  goerli_zkSyncConnectorMeta?: Maybe<goerli_ZkSyncConnectorMeta>;
  goerli_zkSyncConnectorMetas: Array<goerli_ZkSyncConnectorMeta>;
  goerli_lineaConnectorMeta?: Maybe<goerli_LineaConnectorMeta>;
  goerli_lineaConnectorMetas: Array<goerli_LineaConnectorMeta>;
  goerli_baseConnectorMeta?: Maybe<goerli_BaseConnectorMeta>;
  goerli_baseConnectorMetas: Array<goerli_BaseConnectorMeta>;
  goerli_x1ConnectorMeta?: Maybe<goerli_X1ConnectorMeta>;
  goerli_x1ConnectorMetas: Array<goerli_X1ConnectorMeta>;
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
  goerli_aggregateRootSavedSlow?: Maybe<goerli_AggregateRootSavedSlow>;
  goerli_aggregateRootSavedSlows: Array<goerli_AggregateRootSavedSlow>;
  goerli_hubDomain?: Maybe<goerli_HubDomain>;
  goerli_hubDomains: Array<goerli_HubDomain>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Subscriptiongoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootAggregated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootPropagated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootManagerMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootManagerMode_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootProposed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimisticRootPropagated_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_LineaConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_baseConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_baseConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_BaseConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_BaseConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_x1ConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_x1ConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_X1ConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_X1ConnectorMeta_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_RootMessageProcessed_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_HubDomain_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_HubDomain_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_X1ConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_X1ConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_X1ConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_X1ConnectorMeta_filter>>>;
};

export type goerli_X1ConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type goerli_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['goerli_Bytes'];
  rootManager: Scalars['goerli_Bytes'];
  mirrorConnector: Scalars['goerli_Bytes'];
};

export type goerli_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_ZkSyncConnectorMeta_filter>>>;
};

export type goerli_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

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
  goerli_rootAggregated: InContextSdkMethod<Query['goerli_rootAggregated'], Querygoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  goerli_rootAggregateds: InContextSdkMethod<Query['goerli_rootAggregateds'], Querygoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  goerli_rootPropagated: InContextSdkMethod<Query['goerli_rootPropagated'], Querygoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  goerli_rootPropagateds: InContextSdkMethod<Query['goerli_rootPropagateds'], Querygoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  goerli_aggregatedMessageRoot: InContextSdkMethod<Query['goerli_aggregatedMessageRoot'], Querygoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  goerli_aggregatedMessageRoots: InContextSdkMethod<Query['goerli_aggregatedMessageRoots'], Querygoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMeta: InContextSdkMethod<Query['goerli_rootManagerMeta'], Querygoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMetas: InContextSdkMethod<Query['goerli_rootManagerMetas'], Querygoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMode: InContextSdkMethod<Query['goerli_rootManagerMode'], Querygoerli_rootManagerModeArgs, MeshContext>,
  /** null **/
  goerli_rootManagerModes: InContextSdkMethod<Query['goerli_rootManagerModes'], Querygoerli_rootManagerModesArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootProposed: InContextSdkMethod<Query['goerli_optimisticRootProposed'], Querygoerli_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootProposeds: InContextSdkMethod<Query['goerli_optimisticRootProposeds'], Querygoerli_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  goerli_hubOptimisticRootFinalized: InContextSdkMethod<Query['goerli_hubOptimisticRootFinalized'], Querygoerli_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  goerli_hubOptimisticRootFinalizeds: InContextSdkMethod<Query['goerli_hubOptimisticRootFinalizeds'], Querygoerli_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootPropagated: InContextSdkMethod<Query['goerli_optimisticRootPropagated'], Querygoerli_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootPropagateds: InContextSdkMethod<Query['goerli_optimisticRootPropagateds'], Querygoerli_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  goerli_polygonConnectorMeta: InContextSdkMethod<Query['goerli_polygonConnectorMeta'], Querygoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_polygonConnectorMetas: InContextSdkMethod<Query['goerli_polygonConnectorMetas'], Querygoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_optimismConnectorMeta: InContextSdkMethod<Query['goerli_optimismConnectorMeta'], Querygoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_optimismConnectorMetas: InContextSdkMethod<Query['goerli_optimismConnectorMetas'], Querygoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_bnbConnectorMeta: InContextSdkMethod<Query['goerli_bnbConnectorMeta'], Querygoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_bnbConnectorMetas: InContextSdkMethod<Query['goerli_bnbConnectorMetas'], Querygoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_arbitrumConnectorMeta: InContextSdkMethod<Query['goerli_arbitrumConnectorMeta'], Querygoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_arbitrumConnectorMetas: InContextSdkMethod<Query['goerli_arbitrumConnectorMetas'], Querygoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_gnosisConnectorMeta: InContextSdkMethod<Query['goerli_gnosisConnectorMeta'], Querygoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_gnosisConnectorMetas: InContextSdkMethod<Query['goerli_gnosisConnectorMetas'], Querygoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_zkSyncConnectorMeta: InContextSdkMethod<Query['goerli_zkSyncConnectorMeta'], Querygoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_zkSyncConnectorMetas: InContextSdkMethod<Query['goerli_zkSyncConnectorMetas'], Querygoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_lineaConnectorMeta: InContextSdkMethod<Query['goerli_lineaConnectorMeta'], Querygoerli_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_lineaConnectorMetas: InContextSdkMethod<Query['goerli_lineaConnectorMetas'], Querygoerli_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_baseConnectorMeta: InContextSdkMethod<Query['goerli_baseConnectorMeta'], Querygoerli_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_baseConnectorMetas: InContextSdkMethod<Query['goerli_baseConnectorMetas'], Querygoerli_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_x1ConnectorMeta: InContextSdkMethod<Query['goerli_x1ConnectorMeta'], Querygoerli_x1ConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_x1ConnectorMetas: InContextSdkMethod<Query['goerli_x1ConnectorMetas'], Querygoerli_x1ConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcessed: InContextSdkMethod<Query['goerli_rootMessageProcessed'], Querygoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<Query['goerli_rootMessageProcesseds'], Querygoerli_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootSavedSlow: InContextSdkMethod<Query['goerli_aggregateRootSavedSlow'], Querygoerli_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootSavedSlows: InContextSdkMethod<Query['goerli_aggregateRootSavedSlows'], Querygoerli_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  goerli_hubDomain: InContextSdkMethod<Query['goerli_hubDomain'], Querygoerli_hubDomainArgs, MeshContext>,
  /** null **/
  goerli_hubDomains: InContextSdkMethod<Query['goerli_hubDomains'], Querygoerli_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Query['goerli__meta'], Querygoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  goerli_rootAggregated: InContextSdkMethod<Subscription['goerli_rootAggregated'], Subscriptiongoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  goerli_rootAggregateds: InContextSdkMethod<Subscription['goerli_rootAggregateds'], Subscriptiongoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  goerli_rootPropagated: InContextSdkMethod<Subscription['goerli_rootPropagated'], Subscriptiongoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  goerli_rootPropagateds: InContextSdkMethod<Subscription['goerli_rootPropagateds'], Subscriptiongoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  goerli_aggregatedMessageRoot: InContextSdkMethod<Subscription['goerli_aggregatedMessageRoot'], Subscriptiongoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  goerli_aggregatedMessageRoots: InContextSdkMethod<Subscription['goerli_aggregatedMessageRoots'], Subscriptiongoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMeta: InContextSdkMethod<Subscription['goerli_rootManagerMeta'], Subscriptiongoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMetas: InContextSdkMethod<Subscription['goerli_rootManagerMetas'], Subscriptiongoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  goerli_rootManagerMode: InContextSdkMethod<Subscription['goerli_rootManagerMode'], Subscriptiongoerli_rootManagerModeArgs, MeshContext>,
  /** null **/
  goerli_rootManagerModes: InContextSdkMethod<Subscription['goerli_rootManagerModes'], Subscriptiongoerli_rootManagerModesArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootProposed: InContextSdkMethod<Subscription['goerli_optimisticRootProposed'], Subscriptiongoerli_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootProposeds: InContextSdkMethod<Subscription['goerli_optimisticRootProposeds'], Subscriptiongoerli_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  goerli_hubOptimisticRootFinalized: InContextSdkMethod<Subscription['goerli_hubOptimisticRootFinalized'], Subscriptiongoerli_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  goerli_hubOptimisticRootFinalizeds: InContextSdkMethod<Subscription['goerli_hubOptimisticRootFinalizeds'], Subscriptiongoerli_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootPropagated: InContextSdkMethod<Subscription['goerli_optimisticRootPropagated'], Subscriptiongoerli_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  goerli_optimisticRootPropagateds: InContextSdkMethod<Subscription['goerli_optimisticRootPropagateds'], Subscriptiongoerli_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  goerli_polygonConnectorMeta: InContextSdkMethod<Subscription['goerli_polygonConnectorMeta'], Subscriptiongoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_polygonConnectorMetas: InContextSdkMethod<Subscription['goerli_polygonConnectorMetas'], Subscriptiongoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_optimismConnectorMeta: InContextSdkMethod<Subscription['goerli_optimismConnectorMeta'], Subscriptiongoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_optimismConnectorMetas: InContextSdkMethod<Subscription['goerli_optimismConnectorMetas'], Subscriptiongoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_bnbConnectorMeta: InContextSdkMethod<Subscription['goerli_bnbConnectorMeta'], Subscriptiongoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_bnbConnectorMetas: InContextSdkMethod<Subscription['goerli_bnbConnectorMetas'], Subscriptiongoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_arbitrumConnectorMeta: InContextSdkMethod<Subscription['goerli_arbitrumConnectorMeta'], Subscriptiongoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_arbitrumConnectorMetas: InContextSdkMethod<Subscription['goerli_arbitrumConnectorMetas'], Subscriptiongoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_gnosisConnectorMeta: InContextSdkMethod<Subscription['goerli_gnosisConnectorMeta'], Subscriptiongoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_gnosisConnectorMetas: InContextSdkMethod<Subscription['goerli_gnosisConnectorMetas'], Subscriptiongoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_zkSyncConnectorMeta: InContextSdkMethod<Subscription['goerli_zkSyncConnectorMeta'], Subscriptiongoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_zkSyncConnectorMetas: InContextSdkMethod<Subscription['goerli_zkSyncConnectorMetas'], Subscriptiongoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_lineaConnectorMeta: InContextSdkMethod<Subscription['goerli_lineaConnectorMeta'], Subscriptiongoerli_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_lineaConnectorMetas: InContextSdkMethod<Subscription['goerli_lineaConnectorMetas'], Subscriptiongoerli_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_baseConnectorMeta: InContextSdkMethod<Subscription['goerli_baseConnectorMeta'], Subscriptiongoerli_baseConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_baseConnectorMetas: InContextSdkMethod<Subscription['goerli_baseConnectorMetas'], Subscriptiongoerli_baseConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_x1ConnectorMeta: InContextSdkMethod<Subscription['goerli_x1ConnectorMeta'], Subscriptiongoerli_x1ConnectorMetaArgs, MeshContext>,
  /** null **/
  goerli_x1ConnectorMetas: InContextSdkMethod<Subscription['goerli_x1ConnectorMetas'], Subscriptiongoerli_x1ConnectorMetasArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcessed: InContextSdkMethod<Subscription['goerli_rootMessageProcessed'], Subscriptiongoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<Subscription['goerli_rootMessageProcesseds'], Subscriptiongoerli_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootSavedSlow: InContextSdkMethod<Subscription['goerli_aggregateRootSavedSlow'], Subscriptiongoerli_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  goerli_aggregateRootSavedSlows: InContextSdkMethod<Subscription['goerli_aggregateRootSavedSlows'], Subscriptiongoerli_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  goerli_hubDomain: InContextSdkMethod<Subscription['goerli_hubDomain'], Subscriptiongoerli_hubDomainArgs, MeshContext>,
  /** null **/
  goerli_hubDomains: InContextSdkMethod<Subscription['goerli_hubDomains'], Subscriptiongoerli_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Subscription['goerli__meta'], Subscriptiongoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
