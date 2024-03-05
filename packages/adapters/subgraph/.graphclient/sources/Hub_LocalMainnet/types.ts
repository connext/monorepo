// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubLocalMainnetTypes {
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
  localmainnet_BigDecimal: any;
  BigInt: any;
  localmainnet_Bytes: any;
  localmainnet_Int8: any;
};

export type localmainnet_AggregateRootSavedSlow = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  count: Scalars['BigInt'];
  aggregatedRoots?: Maybe<Array<Scalars['localmainnet_Bytes']>>;
  rootTimestamp: Scalars['BigInt'];
};

export type localmainnet_AggregateRootSavedSlow_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedRoots?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregatedRoots_not?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregatedRoots_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregatedRoots_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregatedRoots_not_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregatedRoots_not_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRootSavedSlow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AggregateRootSavedSlow_filter>>>;
};

export type localmainnet_AggregateRootSavedSlow_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'count'
  | 'aggregatedRoots'
  | 'rootTimestamp';

export type localmainnet_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['localmainnet_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_AggregatedMessageRoot_filter>>>;
};

export type localmainnet_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain'
  | 'blockNumber';

export type localmainnet_Aggregation_interval =
  | 'hour'
  | 'day';

export type localmainnet_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_ArbitrumConnectorMeta_filter>>>;
};

export type localmainnet_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type localmainnet_Block_height = {
  hash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type localmainnet_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_BnbConnectorMeta_filter>>>;
};

export type localmainnet_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_GnosisConnectorMeta_filter>>>;
};

export type localmainnet_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet_HubDomain = {
  id: Scalars['ID'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_HubDomain_filter = {
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_HubDomain_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_HubDomain_filter>>>;
};

export type localmainnet_HubDomain_orderBy =
  | 'id'
  | 'domain';

export type localmainnet_HubOptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_HubOptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_HubOptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_HubOptimisticRootFinalized_filter>>>;
};

export type localmainnet_HubOptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

export type localmainnet_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OptimismConnectorMeta_filter>>>;
};

export type localmainnet_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet_OptimisticRootPropagated = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  domainsHash: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_OptimisticRootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootPropagated_filter>>>;
};

export type localmainnet_OptimisticRootPropagated_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'domainsHash'
  | 'timestamp'
  | 'blockNumber';

export type localmainnet_OptimisticRootProposed = {
  id: Scalars['ID'];
  disputeCliff: Scalars['BigInt'];
  aggregateRoot: Scalars['localmainnet_Bytes'];
  snapshotsRoots?: Maybe<Array<Scalars['localmainnet_Bytes']>>;
  domains?: Maybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot: Scalars['localmainnet_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_OptimisticRootProposed_filter = {
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
  aggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  snapshotsRoots?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  snapshotsRoots_not?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  snapshotsRoots_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  snapshotsRoots_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  snapshotsRoots_not_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  snapshotsRoots_not_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  baseAggregateRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  baseAggregateRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  baseAggregateRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_OptimisticRootProposed_filter>>>;
};

export type localmainnet_OptimisticRootProposed_orderBy =
  | 'id'
  | 'disputeCliff'
  | 'aggregateRoot'
  | 'snapshotsRoots'
  | 'domains'
  | 'baseAggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type localmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type localmainnet_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_PolygonConnectorMeta_filter>>>;
};

export type localmainnet_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  localmainnet_rootAggregated?: Maybe<localmainnet_RootAggregated>;
  localmainnet_rootAggregateds: Array<localmainnet_RootAggregated>;
  localmainnet_rootPropagated?: Maybe<localmainnet_RootPropagated>;
  localmainnet_rootPropagateds: Array<localmainnet_RootPropagated>;
  localmainnet_aggregatedMessageRoot?: Maybe<localmainnet_AggregatedMessageRoot>;
  localmainnet_aggregatedMessageRoots: Array<localmainnet_AggregatedMessageRoot>;
  localmainnet_rootManagerMeta?: Maybe<localmainnet_RootManagerMeta>;
  localmainnet_rootManagerMetas: Array<localmainnet_RootManagerMeta>;
  localmainnet_rootManagerMode?: Maybe<localmainnet_RootManagerMode>;
  localmainnet_rootManagerModes: Array<localmainnet_RootManagerMode>;
  localmainnet_optimisticRootProposed?: Maybe<localmainnet_OptimisticRootProposed>;
  localmainnet_optimisticRootProposeds: Array<localmainnet_OptimisticRootProposed>;
  localmainnet_hubOptimisticRootFinalized?: Maybe<localmainnet_HubOptimisticRootFinalized>;
  localmainnet_hubOptimisticRootFinalizeds: Array<localmainnet_HubOptimisticRootFinalized>;
  localmainnet_optimisticRootPropagated?: Maybe<localmainnet_OptimisticRootPropagated>;
  localmainnet_optimisticRootPropagateds: Array<localmainnet_OptimisticRootPropagated>;
  localmainnet_polygonConnectorMeta?: Maybe<localmainnet_PolygonConnectorMeta>;
  localmainnet_polygonConnectorMetas: Array<localmainnet_PolygonConnectorMeta>;
  localmainnet_optimismConnectorMeta?: Maybe<localmainnet_OptimismConnectorMeta>;
  localmainnet_optimismConnectorMetas: Array<localmainnet_OptimismConnectorMeta>;
  localmainnet_bnbConnectorMeta?: Maybe<localmainnet_BnbConnectorMeta>;
  localmainnet_bnbConnectorMetas: Array<localmainnet_BnbConnectorMeta>;
  localmainnet_arbitrumConnectorMeta?: Maybe<localmainnet_ArbitrumConnectorMeta>;
  localmainnet_arbitrumConnectorMetas: Array<localmainnet_ArbitrumConnectorMeta>;
  localmainnet_gnosisConnectorMeta?: Maybe<localmainnet_GnosisConnectorMeta>;
  localmainnet_gnosisConnectorMetas: Array<localmainnet_GnosisConnectorMeta>;
  localmainnet_zkSyncConnectorMeta?: Maybe<localmainnet_ZkSyncConnectorMeta>;
  localmainnet_zkSyncConnectorMetas: Array<localmainnet_ZkSyncConnectorMeta>;
  localmainnet_rootMessageProcessed?: Maybe<localmainnet_RootMessageProcessed>;
  localmainnet_rootMessageProcesseds: Array<localmainnet_RootMessageProcessed>;
  localmainnet_aggregateRootSavedSlow?: Maybe<localmainnet_AggregateRootSavedSlow>;
  localmainnet_aggregateRootSavedSlows: Array<localmainnet_AggregateRootSavedSlow>;
  localmainnet_hubDomain?: Maybe<localmainnet_HubDomain>;
  localmainnet_hubDomains: Array<localmainnet_HubDomain>;
  /** Access to subgraph metadata */
  localmainnet__meta?: Maybe<localmainnet__Meta_>;
};


export type Querylocalmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootAggregated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootPropagated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootManagerMode_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootProposed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootPropagated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_HubDomain_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_HubDomain_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querylocalmainnet__metaArgs = {
  block?: InputMaybe<localmainnet_Block_height>;
};

export type localmainnet_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['localmainnet_Bytes'];
  index: Scalars['BigInt'];
};

export type localmainnet_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootAggregated_filter>>>;
};

export type localmainnet_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type localmainnet_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['localmainnet_Bytes']>>;
};

export type localmainnet_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootManagerMeta_filter>>>;
};

export type localmainnet_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type localmainnet_RootManagerMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type localmainnet_RootManagerMode_filter = {
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootManagerMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootManagerMode_filter>>>;
};

export type localmainnet_RootManagerMode_orderBy =
  | 'id'
  | 'mode';

export type localmainnet_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['localmainnet_Bytes']>;
  caller?: Maybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['localmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootMessageProcessed_filter>>>;
};

export type localmainnet_RootMessageProcessed_orderBy =
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

export type localmainnet_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['localmainnet_Bytes'];
  domainsHash: Scalars['localmainnet_Bytes'];
  count: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type localmainnet_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
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
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_RootPropagated_filter>>>;
};

export type localmainnet_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count'
  | 'blockNumber';

export type Subscription = {
  localmainnet_rootAggregated?: Maybe<localmainnet_RootAggregated>;
  localmainnet_rootAggregateds: Array<localmainnet_RootAggregated>;
  localmainnet_rootPropagated?: Maybe<localmainnet_RootPropagated>;
  localmainnet_rootPropagateds: Array<localmainnet_RootPropagated>;
  localmainnet_aggregatedMessageRoot?: Maybe<localmainnet_AggregatedMessageRoot>;
  localmainnet_aggregatedMessageRoots: Array<localmainnet_AggregatedMessageRoot>;
  localmainnet_rootManagerMeta?: Maybe<localmainnet_RootManagerMeta>;
  localmainnet_rootManagerMetas: Array<localmainnet_RootManagerMeta>;
  localmainnet_rootManagerMode?: Maybe<localmainnet_RootManagerMode>;
  localmainnet_rootManagerModes: Array<localmainnet_RootManagerMode>;
  localmainnet_optimisticRootProposed?: Maybe<localmainnet_OptimisticRootProposed>;
  localmainnet_optimisticRootProposeds: Array<localmainnet_OptimisticRootProposed>;
  localmainnet_hubOptimisticRootFinalized?: Maybe<localmainnet_HubOptimisticRootFinalized>;
  localmainnet_hubOptimisticRootFinalizeds: Array<localmainnet_HubOptimisticRootFinalized>;
  localmainnet_optimisticRootPropagated?: Maybe<localmainnet_OptimisticRootPropagated>;
  localmainnet_optimisticRootPropagateds: Array<localmainnet_OptimisticRootPropagated>;
  localmainnet_polygonConnectorMeta?: Maybe<localmainnet_PolygonConnectorMeta>;
  localmainnet_polygonConnectorMetas: Array<localmainnet_PolygonConnectorMeta>;
  localmainnet_optimismConnectorMeta?: Maybe<localmainnet_OptimismConnectorMeta>;
  localmainnet_optimismConnectorMetas: Array<localmainnet_OptimismConnectorMeta>;
  localmainnet_bnbConnectorMeta?: Maybe<localmainnet_BnbConnectorMeta>;
  localmainnet_bnbConnectorMetas: Array<localmainnet_BnbConnectorMeta>;
  localmainnet_arbitrumConnectorMeta?: Maybe<localmainnet_ArbitrumConnectorMeta>;
  localmainnet_arbitrumConnectorMetas: Array<localmainnet_ArbitrumConnectorMeta>;
  localmainnet_gnosisConnectorMeta?: Maybe<localmainnet_GnosisConnectorMeta>;
  localmainnet_gnosisConnectorMetas: Array<localmainnet_GnosisConnectorMeta>;
  localmainnet_zkSyncConnectorMeta?: Maybe<localmainnet_ZkSyncConnectorMeta>;
  localmainnet_zkSyncConnectorMetas: Array<localmainnet_ZkSyncConnectorMeta>;
  localmainnet_rootMessageProcessed?: Maybe<localmainnet_RootMessageProcessed>;
  localmainnet_rootMessageProcesseds: Array<localmainnet_RootMessageProcessed>;
  localmainnet_aggregateRootSavedSlow?: Maybe<localmainnet_AggregateRootSavedSlow>;
  localmainnet_aggregateRootSavedSlows: Array<localmainnet_AggregateRootSavedSlow>;
  localmainnet_hubDomain?: Maybe<localmainnet_HubDomain>;
  localmainnet_hubDomains: Array<localmainnet_HubDomain>;
  /** Access to subgraph metadata */
  localmainnet__meta?: Maybe<localmainnet__Meta_>;
};


export type Subscriptionlocalmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootAggregated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootPropagated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootManagerMode_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootProposed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimisticRootPropagated_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<localmainnet_HubDomain_orderBy>;
  orderDirection?: InputMaybe<localmainnet_OrderDirection>;
  where?: InputMaybe<localmainnet_HubDomain_filter>;
  block?: InputMaybe<localmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionlocalmainnet__metaArgs = {
  block?: InputMaybe<localmainnet_Block_height>;
};

export type localmainnet_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['localmainnet_Bytes'];
  rootManager: Scalars['localmainnet_Bytes'];
  mirrorConnector: Scalars['localmainnet_Bytes'];
};

export type localmainnet_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['localmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['localmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<localmainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<localmainnet_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<localmainnet_ZkSyncConnectorMeta_filter>>>;
};

export type localmainnet_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type localmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['localmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type localmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: localmainnet__Block_;
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
  localmainnet_rootAggregated: InContextSdkMethod<Query['localmainnet_rootAggregated'], Querylocalmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  localmainnet_rootAggregateds: InContextSdkMethod<Query['localmainnet_rootAggregateds'], Querylocalmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  localmainnet_rootPropagated: InContextSdkMethod<Query['localmainnet_rootPropagated'], Querylocalmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  localmainnet_rootPropagateds: InContextSdkMethod<Query['localmainnet_rootPropagateds'], Querylocalmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  localmainnet_aggregatedMessageRoot: InContextSdkMethod<Query['localmainnet_aggregatedMessageRoot'], Querylocalmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  localmainnet_aggregatedMessageRoots: InContextSdkMethod<Query['localmainnet_aggregatedMessageRoots'], Querylocalmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMeta: InContextSdkMethod<Query['localmainnet_rootManagerMeta'], Querylocalmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMetas: InContextSdkMethod<Query['localmainnet_rootManagerMetas'], Querylocalmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMode: InContextSdkMethod<Query['localmainnet_rootManagerMode'], Querylocalmainnet_rootManagerModeArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerModes: InContextSdkMethod<Query['localmainnet_rootManagerModes'], Querylocalmainnet_rootManagerModesArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootProposed: InContextSdkMethod<Query['localmainnet_optimisticRootProposed'], Querylocalmainnet_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootProposeds: InContextSdkMethod<Query['localmainnet_optimisticRootProposeds'], Querylocalmainnet_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  localmainnet_hubOptimisticRootFinalized: InContextSdkMethod<Query['localmainnet_hubOptimisticRootFinalized'], Querylocalmainnet_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localmainnet_hubOptimisticRootFinalizeds: InContextSdkMethod<Query['localmainnet_hubOptimisticRootFinalizeds'], Querylocalmainnet_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootPropagated: InContextSdkMethod<Query['localmainnet_optimisticRootPropagated'], Querylocalmainnet_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootPropagateds: InContextSdkMethod<Query['localmainnet_optimisticRootPropagateds'], Querylocalmainnet_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  localmainnet_polygonConnectorMeta: InContextSdkMethod<Query['localmainnet_polygonConnectorMeta'], Querylocalmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_polygonConnectorMetas: InContextSdkMethod<Query['localmainnet_polygonConnectorMetas'], Querylocalmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_optimismConnectorMeta: InContextSdkMethod<Query['localmainnet_optimismConnectorMeta'], Querylocalmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_optimismConnectorMetas: InContextSdkMethod<Query['localmainnet_optimismConnectorMetas'], Querylocalmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_bnbConnectorMeta: InContextSdkMethod<Query['localmainnet_bnbConnectorMeta'], Querylocalmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_bnbConnectorMetas: InContextSdkMethod<Query['localmainnet_bnbConnectorMetas'], Querylocalmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_arbitrumConnectorMeta: InContextSdkMethod<Query['localmainnet_arbitrumConnectorMeta'], Querylocalmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_arbitrumConnectorMetas: InContextSdkMethod<Query['localmainnet_arbitrumConnectorMetas'], Querylocalmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_gnosisConnectorMeta: InContextSdkMethod<Query['localmainnet_gnosisConnectorMeta'], Querylocalmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_gnosisConnectorMetas: InContextSdkMethod<Query['localmainnet_gnosisConnectorMetas'], Querylocalmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_zkSyncConnectorMeta: InContextSdkMethod<Query['localmainnet_zkSyncConnectorMeta'], Querylocalmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_zkSyncConnectorMetas: InContextSdkMethod<Query['localmainnet_zkSyncConnectorMetas'], Querylocalmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageProcessed: InContextSdkMethod<Query['localmainnet_rootMessageProcessed'], Querylocalmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageProcesseds: InContextSdkMethod<Query['localmainnet_rootMessageProcesseds'], Querylocalmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootSavedSlow: InContextSdkMethod<Query['localmainnet_aggregateRootSavedSlow'], Querylocalmainnet_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootSavedSlows: InContextSdkMethod<Query['localmainnet_aggregateRootSavedSlows'], Querylocalmainnet_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  localmainnet_hubDomain: InContextSdkMethod<Query['localmainnet_hubDomain'], Querylocalmainnet_hubDomainArgs, MeshContext>,
  /** null **/
  localmainnet_hubDomains: InContextSdkMethod<Query['localmainnet_hubDomains'], Querylocalmainnet_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localmainnet__meta: InContextSdkMethod<Query['localmainnet__meta'], Querylocalmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  localmainnet_rootAggregated: InContextSdkMethod<Subscription['localmainnet_rootAggregated'], Subscriptionlocalmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  localmainnet_rootAggregateds: InContextSdkMethod<Subscription['localmainnet_rootAggregateds'], Subscriptionlocalmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  localmainnet_rootPropagated: InContextSdkMethod<Subscription['localmainnet_rootPropagated'], Subscriptionlocalmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  localmainnet_rootPropagateds: InContextSdkMethod<Subscription['localmainnet_rootPropagateds'], Subscriptionlocalmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  localmainnet_aggregatedMessageRoot: InContextSdkMethod<Subscription['localmainnet_aggregatedMessageRoot'], Subscriptionlocalmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  localmainnet_aggregatedMessageRoots: InContextSdkMethod<Subscription['localmainnet_aggregatedMessageRoots'], Subscriptionlocalmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMeta: InContextSdkMethod<Subscription['localmainnet_rootManagerMeta'], Subscriptionlocalmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMetas: InContextSdkMethod<Subscription['localmainnet_rootManagerMetas'], Subscriptionlocalmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerMode: InContextSdkMethod<Subscription['localmainnet_rootManagerMode'], Subscriptionlocalmainnet_rootManagerModeArgs, MeshContext>,
  /** null **/
  localmainnet_rootManagerModes: InContextSdkMethod<Subscription['localmainnet_rootManagerModes'], Subscriptionlocalmainnet_rootManagerModesArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootProposed: InContextSdkMethod<Subscription['localmainnet_optimisticRootProposed'], Subscriptionlocalmainnet_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootProposeds: InContextSdkMethod<Subscription['localmainnet_optimisticRootProposeds'], Subscriptionlocalmainnet_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  localmainnet_hubOptimisticRootFinalized: InContextSdkMethod<Subscription['localmainnet_hubOptimisticRootFinalized'], Subscriptionlocalmainnet_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  localmainnet_hubOptimisticRootFinalizeds: InContextSdkMethod<Subscription['localmainnet_hubOptimisticRootFinalizeds'], Subscriptionlocalmainnet_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootPropagated: InContextSdkMethod<Subscription['localmainnet_optimisticRootPropagated'], Subscriptionlocalmainnet_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  localmainnet_optimisticRootPropagateds: InContextSdkMethod<Subscription['localmainnet_optimisticRootPropagateds'], Subscriptionlocalmainnet_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  localmainnet_polygonConnectorMeta: InContextSdkMethod<Subscription['localmainnet_polygonConnectorMeta'], Subscriptionlocalmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_polygonConnectorMetas: InContextSdkMethod<Subscription['localmainnet_polygonConnectorMetas'], Subscriptionlocalmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_optimismConnectorMeta: InContextSdkMethod<Subscription['localmainnet_optimismConnectorMeta'], Subscriptionlocalmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_optimismConnectorMetas: InContextSdkMethod<Subscription['localmainnet_optimismConnectorMetas'], Subscriptionlocalmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_bnbConnectorMeta: InContextSdkMethod<Subscription['localmainnet_bnbConnectorMeta'], Subscriptionlocalmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_bnbConnectorMetas: InContextSdkMethod<Subscription['localmainnet_bnbConnectorMetas'], Subscriptionlocalmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_arbitrumConnectorMeta: InContextSdkMethod<Subscription['localmainnet_arbitrumConnectorMeta'], Subscriptionlocalmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_arbitrumConnectorMetas: InContextSdkMethod<Subscription['localmainnet_arbitrumConnectorMetas'], Subscriptionlocalmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_gnosisConnectorMeta: InContextSdkMethod<Subscription['localmainnet_gnosisConnectorMeta'], Subscriptionlocalmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_gnosisConnectorMetas: InContextSdkMethod<Subscription['localmainnet_gnosisConnectorMetas'], Subscriptionlocalmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_zkSyncConnectorMeta: InContextSdkMethod<Subscription['localmainnet_zkSyncConnectorMeta'], Subscriptionlocalmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  localmainnet_zkSyncConnectorMetas: InContextSdkMethod<Subscription['localmainnet_zkSyncConnectorMetas'], Subscriptionlocalmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageProcessed: InContextSdkMethod<Subscription['localmainnet_rootMessageProcessed'], Subscriptionlocalmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  localmainnet_rootMessageProcesseds: InContextSdkMethod<Subscription['localmainnet_rootMessageProcesseds'], Subscriptionlocalmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootSavedSlow: InContextSdkMethod<Subscription['localmainnet_aggregateRootSavedSlow'], Subscriptionlocalmainnet_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  localmainnet_aggregateRootSavedSlows: InContextSdkMethod<Subscription['localmainnet_aggregateRootSavedSlows'], Subscriptionlocalmainnet_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  localmainnet_hubDomain: InContextSdkMethod<Subscription['localmainnet_hubDomain'], Subscriptionlocalmainnet_hubDomainArgs, MeshContext>,
  /** null **/
  localmainnet_hubDomains: InContextSdkMethod<Subscription['localmainnet_hubDomains'], Subscriptionlocalmainnet_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  localmainnet__meta: InContextSdkMethod<Subscription['localmainnet__meta'], Subscriptionlocalmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_LocalMainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
