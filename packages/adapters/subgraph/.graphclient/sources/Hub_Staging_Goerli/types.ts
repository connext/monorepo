// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubStagingGoerliTypes {
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
  staginggoerli_BigDecimal: any;
  BigInt: any;
  staginggoerli_Bytes: any;
  staginggoerli_Int8: any;
};

export type staginggoerli_AggregateRootSavedSlow = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['staginggoerli_Bytes'];
  count: Scalars['BigInt'];
  aggregatedRoots?: Maybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootTimestamp: Scalars['BigInt'];
};

export type staginggoerli_AggregateRootSavedSlow_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  aggregatedRoots?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregatedRoots_not?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregatedRoots_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregatedRoots_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregatedRoots_not_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregatedRoots_not_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootTimestamp?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rootTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rootTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_AggregateRootSavedSlow_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_AggregateRootSavedSlow_filter>>>;
};

export type staginggoerli_AggregateRootSavedSlow_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'count'
  | 'aggregatedRoots'
  | 'rootTimestamp';

export type staginggoerli_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['staginggoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_AggregatedMessageRoot_filter>>>;
};

export type staginggoerli_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain'
  | 'blockNumber';

export type staginggoerli_Aggregation_interval =
  | 'hour'
  | 'day';

export type staginggoerli_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_ArbitrumConnectorMeta_filter>>>;
};

export type staginggoerli_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginggoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerli_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerli_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_BnbConnectorMeta_filter>>>;
};

export type staginggoerli_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginggoerli_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_GnosisConnectorMeta_filter>>>;
};

export type staginggoerli_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginggoerli_HubDomain = {
  id: Scalars['ID'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_HubDomain_filter = {
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_HubDomain_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_HubDomain_filter>>>;
};

export type staginggoerli_HubDomain_orderBy =
  | 'id'
  | 'domain';

export type staginggoerli_HubOptimisticRootFinalized = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['staginggoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_HubOptimisticRootFinalized_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_HubOptimisticRootFinalized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_HubOptimisticRootFinalized_filter>>>;
};

export type staginggoerli_HubOptimisticRootFinalized_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'timestamp'
  | 'blockNumber';

export type staginggoerli_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_OptimismConnectorMeta_filter>>>;
};

export type staginggoerli_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginggoerli_OptimisticRootPropagated = {
  id: Scalars['ID'];
  aggregateRoot: Scalars['staginggoerli_Bytes'];
  domainsHash: Scalars['staginggoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_OptimisticRootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregateRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_OptimisticRootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_OptimisticRootPropagated_filter>>>;
};

export type staginggoerli_OptimisticRootPropagated_orderBy =
  | 'id'
  | 'aggregateRoot'
  | 'domainsHash'
  | 'timestamp'
  | 'blockNumber';

export type staginggoerli_OptimisticRootProposed = {
  id: Scalars['ID'];
  disputeCliff: Scalars['BigInt'];
  aggregateRoot: Scalars['staginggoerli_Bytes'];
  snapshotsRoots?: Maybe<Array<Scalars['staginggoerli_Bytes']>>;
  domains?: Maybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot: Scalars['staginggoerli_Bytes'];
  timestamp: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_OptimisticRootProposed_filter = {
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
  aggregateRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregateRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregateRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  snapshotsRoots?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  snapshotsRoots_not?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  snapshotsRoots_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  snapshotsRoots_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  snapshotsRoots_not_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  snapshotsRoots_not_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  baseAggregateRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  baseAggregateRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  baseAggregateRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  baseAggregateRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_OptimisticRootProposed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_OptimisticRootProposed_filter>>>;
};

export type staginggoerli_OptimisticRootProposed_orderBy =
  | 'id'
  | 'disputeCliff'
  | 'aggregateRoot'
  | 'snapshotsRoots'
  | 'domains'
  | 'baseAggregateRoot'
  | 'timestamp'
  | 'blockNumber';

/** Defines the order direction, either ascending or descending */
export type staginggoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerli_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_PolygonConnectorMeta_filter>>>;
};

export type staginggoerli_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  staginggoerli_rootAggregated?: Maybe<staginggoerli_RootAggregated>;
  staginggoerli_rootAggregateds: Array<staginggoerli_RootAggregated>;
  staginggoerli_rootPropagated?: Maybe<staginggoerli_RootPropagated>;
  staginggoerli_rootPropagateds: Array<staginggoerli_RootPropagated>;
  staginggoerli_aggregatedMessageRoot?: Maybe<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_aggregatedMessageRoots: Array<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_rootManagerMeta?: Maybe<staginggoerli_RootManagerMeta>;
  staginggoerli_rootManagerMetas: Array<staginggoerli_RootManagerMeta>;
  staginggoerli_rootManagerMode?: Maybe<staginggoerli_RootManagerMode>;
  staginggoerli_rootManagerModes: Array<staginggoerli_RootManagerMode>;
  staginggoerli_optimisticRootProposed?: Maybe<staginggoerli_OptimisticRootProposed>;
  staginggoerli_optimisticRootProposeds: Array<staginggoerli_OptimisticRootProposed>;
  staginggoerli_hubOptimisticRootFinalized?: Maybe<staginggoerli_HubOptimisticRootFinalized>;
  staginggoerli_hubOptimisticRootFinalizeds: Array<staginggoerli_HubOptimisticRootFinalized>;
  staginggoerli_optimisticRootPropagated?: Maybe<staginggoerli_OptimisticRootPropagated>;
  staginggoerli_optimisticRootPropagateds: Array<staginggoerli_OptimisticRootPropagated>;
  staginggoerli_polygonConnectorMeta?: Maybe<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_polygonConnectorMetas: Array<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_optimismConnectorMeta?: Maybe<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_optimismConnectorMetas: Array<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_bnbConnectorMeta?: Maybe<staginggoerli_BnbConnectorMeta>;
  staginggoerli_bnbConnectorMetas: Array<staginggoerli_BnbConnectorMeta>;
  staginggoerli_arbitrumConnectorMeta?: Maybe<staginggoerli_ArbitrumConnectorMeta>;
  staginggoerli_arbitrumConnectorMetas: Array<staginggoerli_ArbitrumConnectorMeta>;
  staginggoerli_gnosisConnectorMeta?: Maybe<staginggoerli_GnosisConnectorMeta>;
  staginggoerli_gnosisConnectorMetas: Array<staginggoerli_GnosisConnectorMeta>;
  staginggoerli_zkSyncConnectorMeta?: Maybe<staginggoerli_ZkSyncConnectorMeta>;
  staginggoerli_zkSyncConnectorMetas: Array<staginggoerli_ZkSyncConnectorMeta>;
  staginggoerli_rootMessageProcessed?: Maybe<staginggoerli_RootMessageProcessed>;
  staginggoerli_rootMessageProcesseds: Array<staginggoerli_RootMessageProcessed>;
  staginggoerli_aggregateRootSavedSlow?: Maybe<staginggoerli_AggregateRootSavedSlow>;
  staginggoerli_aggregateRootSavedSlows: Array<staginggoerli_AggregateRootSavedSlow>;
  staginggoerli_hubDomain?: Maybe<staginggoerli_HubDomain>;
  staginggoerli_hubDomains: Array<staginggoerli_HubDomain>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Querystaginggoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootAggregated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootManagerMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootManagerMode_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimisticRootProposed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimisticRootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_HubDomain_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_HubDomain_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['staginggoerli_Bytes'];
  index: Scalars['BigInt'];
};

export type staginggoerli_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_RootAggregated_filter>>>;
};

export type staginggoerli_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type staginggoerli_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['staginggoerli_Bytes']>>;
};

export type staginggoerli_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_RootManagerMeta_filter>>>;
};

export type staginggoerli_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type staginggoerli_RootManagerMode = {
  id: Scalars['ID'];
  mode: Scalars['String'];
};

export type staginggoerli_RootManagerMode_filter = {
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_RootManagerMode_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_RootManagerMode_filter>>>;
};

export type staginggoerli_RootManagerMode_orderBy =
  | 'id'
  | 'mode';

export type staginggoerli_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['staginggoerli_Bytes']>;
  caller?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_RootMessageProcessed_filter>>>;
};

export type staginggoerli_RootMessageProcessed_orderBy =
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

export type staginggoerli_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['staginggoerli_Bytes'];
  domainsHash: Scalars['staginggoerli_Bytes'];
  count: Scalars['BigInt'];
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_RootPropagated_filter>>>;
};

export type staginggoerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count'
  | 'blockNumber';

export type Subscription = {
  staginggoerli_rootAggregated?: Maybe<staginggoerli_RootAggregated>;
  staginggoerli_rootAggregateds: Array<staginggoerli_RootAggregated>;
  staginggoerli_rootPropagated?: Maybe<staginggoerli_RootPropagated>;
  staginggoerli_rootPropagateds: Array<staginggoerli_RootPropagated>;
  staginggoerli_aggregatedMessageRoot?: Maybe<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_aggregatedMessageRoots: Array<staginggoerli_AggregatedMessageRoot>;
  staginggoerli_rootManagerMeta?: Maybe<staginggoerli_RootManagerMeta>;
  staginggoerli_rootManagerMetas: Array<staginggoerli_RootManagerMeta>;
  staginggoerli_rootManagerMode?: Maybe<staginggoerli_RootManagerMode>;
  staginggoerli_rootManagerModes: Array<staginggoerli_RootManagerMode>;
  staginggoerli_optimisticRootProposed?: Maybe<staginggoerli_OptimisticRootProposed>;
  staginggoerli_optimisticRootProposeds: Array<staginggoerli_OptimisticRootProposed>;
  staginggoerli_hubOptimisticRootFinalized?: Maybe<staginggoerli_HubOptimisticRootFinalized>;
  staginggoerli_hubOptimisticRootFinalizeds: Array<staginggoerli_HubOptimisticRootFinalized>;
  staginggoerli_optimisticRootPropagated?: Maybe<staginggoerli_OptimisticRootPropagated>;
  staginggoerli_optimisticRootPropagateds: Array<staginggoerli_OptimisticRootPropagated>;
  staginggoerli_polygonConnectorMeta?: Maybe<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_polygonConnectorMetas: Array<staginggoerli_PolygonConnectorMeta>;
  staginggoerli_optimismConnectorMeta?: Maybe<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_optimismConnectorMetas: Array<staginggoerli_OptimismConnectorMeta>;
  staginggoerli_bnbConnectorMeta?: Maybe<staginggoerli_BnbConnectorMeta>;
  staginggoerli_bnbConnectorMetas: Array<staginggoerli_BnbConnectorMeta>;
  staginggoerli_arbitrumConnectorMeta?: Maybe<staginggoerli_ArbitrumConnectorMeta>;
  staginggoerli_arbitrumConnectorMetas: Array<staginggoerli_ArbitrumConnectorMeta>;
  staginggoerli_gnosisConnectorMeta?: Maybe<staginggoerli_GnosisConnectorMeta>;
  staginggoerli_gnosisConnectorMetas: Array<staginggoerli_GnosisConnectorMeta>;
  staginggoerli_zkSyncConnectorMeta?: Maybe<staginggoerli_ZkSyncConnectorMeta>;
  staginggoerli_zkSyncConnectorMetas: Array<staginggoerli_ZkSyncConnectorMeta>;
  staginggoerli_rootMessageProcessed?: Maybe<staginggoerli_RootMessageProcessed>;
  staginggoerli_rootMessageProcesseds: Array<staginggoerli_RootMessageProcessed>;
  staginggoerli_aggregateRootSavedSlow?: Maybe<staginggoerli_AggregateRootSavedSlow>;
  staginggoerli_aggregateRootSavedSlows: Array<staginggoerli_AggregateRootSavedSlow>;
  staginggoerli_hubDomain?: Maybe<staginggoerli_HubDomain>;
  staginggoerli_hubDomains: Array<staginggoerli_HubDomain>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Subscriptionstaginggoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootAggregated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootManagerMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootManagerModeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootManagerModesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootManagerMode_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootManagerMode_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimisticRootProposedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimisticRootProposedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimisticRootProposed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimisticRootProposed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_hubOptimisticRootFinalizedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_hubOptimisticRootFinalizedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_HubOptimisticRootFinalized_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_HubOptimisticRootFinalized_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimisticRootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimisticRootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimisticRootPropagated_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimisticRootPropagated_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregateRootSavedSlowArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_aggregateRootSavedSlowsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AggregateRootSavedSlow_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AggregateRootSavedSlow_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_hubDomainArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_hubDomainsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_HubDomain_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_HubDomain_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['staginggoerli_Bytes'];
  rootManager: Scalars['staginggoerli_Bytes'];
  mirrorConnector: Scalars['staginggoerli_Bytes'];
};

export type staginggoerli_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<staginggoerli_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<staginggoerli_ZkSyncConnectorMeta_filter>>>;
};

export type staginggoerli_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type staginggoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type staginggoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: staginggoerli__Block_;
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
  staginggoerli_rootAggregated: InContextSdkMethod<Query['staginggoerli_rootAggregated'], Querystaginggoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootAggregateds: InContextSdkMethod<Query['staginggoerli_rootAggregateds'], Querystaginggoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagated: InContextSdkMethod<Query['staginggoerli_rootPropagated'], Querystaginggoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagateds: InContextSdkMethod<Query['staginggoerli_rootPropagateds'], Querystaginggoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoot: InContextSdkMethod<Query['staginggoerli_aggregatedMessageRoot'], Querystaginggoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoots: InContextSdkMethod<Query['staginggoerli_aggregatedMessageRoots'], Querystaginggoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMeta: InContextSdkMethod<Query['staginggoerli_rootManagerMeta'], Querystaginggoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMetas: InContextSdkMethod<Query['staginggoerli_rootManagerMetas'], Querystaginggoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMode: InContextSdkMethod<Query['staginggoerli_rootManagerMode'], Querystaginggoerli_rootManagerModeArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerModes: InContextSdkMethod<Query['staginggoerli_rootManagerModes'], Querystaginggoerli_rootManagerModesArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootProposed: InContextSdkMethod<Query['staginggoerli_optimisticRootProposed'], Querystaginggoerli_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootProposeds: InContextSdkMethod<Query['staginggoerli_optimisticRootProposeds'], Querystaginggoerli_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  staginggoerli_hubOptimisticRootFinalized: InContextSdkMethod<Query['staginggoerli_hubOptimisticRootFinalized'], Querystaginggoerli_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  staginggoerli_hubOptimisticRootFinalizeds: InContextSdkMethod<Query['staginggoerli_hubOptimisticRootFinalizeds'], Querystaginggoerli_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootPropagated: InContextSdkMethod<Query['staginggoerli_optimisticRootPropagated'], Querystaginggoerli_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootPropagateds: InContextSdkMethod<Query['staginggoerli_optimisticRootPropagateds'], Querystaginggoerli_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMeta: InContextSdkMethod<Query['staginggoerli_polygonConnectorMeta'], Querystaginggoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMetas: InContextSdkMethod<Query['staginggoerli_polygonConnectorMetas'], Querystaginggoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMeta: InContextSdkMethod<Query['staginggoerli_optimismConnectorMeta'], Querystaginggoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMetas: InContextSdkMethod<Query['staginggoerli_optimismConnectorMetas'], Querystaginggoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_bnbConnectorMeta: InContextSdkMethod<Query['staginggoerli_bnbConnectorMeta'], Querystaginggoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_bnbConnectorMetas: InContextSdkMethod<Query['staginggoerli_bnbConnectorMetas'], Querystaginggoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_arbitrumConnectorMeta: InContextSdkMethod<Query['staginggoerli_arbitrumConnectorMeta'], Querystaginggoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_arbitrumConnectorMetas: InContextSdkMethod<Query['staginggoerli_arbitrumConnectorMetas'], Querystaginggoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_gnosisConnectorMeta: InContextSdkMethod<Query['staginggoerli_gnosisConnectorMeta'], Querystaginggoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_gnosisConnectorMetas: InContextSdkMethod<Query['staginggoerli_gnosisConnectorMetas'], Querystaginggoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_zkSyncConnectorMeta: InContextSdkMethod<Query['staginggoerli_zkSyncConnectorMeta'], Querystaginggoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_zkSyncConnectorMetas: InContextSdkMethod<Query['staginggoerli_zkSyncConnectorMetas'], Querystaginggoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcessed: InContextSdkMethod<Query['staginggoerli_rootMessageProcessed'], Querystaginggoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcesseds: InContextSdkMethod<Query['staginggoerli_rootMessageProcesseds'], Querystaginggoerli_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregateRootSavedSlow: InContextSdkMethod<Query['staginggoerli_aggregateRootSavedSlow'], Querystaginggoerli_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregateRootSavedSlows: InContextSdkMethod<Query['staginggoerli_aggregateRootSavedSlows'], Querystaginggoerli_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  staginggoerli_hubDomain: InContextSdkMethod<Query['staginggoerli_hubDomain'], Querystaginggoerli_hubDomainArgs, MeshContext>,
  /** null **/
  staginggoerli_hubDomains: InContextSdkMethod<Query['staginggoerli_hubDomains'], Querystaginggoerli_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<Query['staginggoerli__meta'], Querystaginggoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  staginggoerli_rootAggregated: InContextSdkMethod<Subscription['staginggoerli_rootAggregated'], Subscriptionstaginggoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootAggregateds: InContextSdkMethod<Subscription['staginggoerli_rootAggregateds'], Subscriptionstaginggoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagated: InContextSdkMethod<Subscription['staginggoerli_rootPropagated'], Subscriptionstaginggoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootPropagateds: InContextSdkMethod<Subscription['staginggoerli_rootPropagateds'], Subscriptionstaginggoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoot: InContextSdkMethod<Subscription['staginggoerli_aggregatedMessageRoot'], Subscriptionstaginggoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregatedMessageRoots: InContextSdkMethod<Subscription['staginggoerli_aggregatedMessageRoots'], Subscriptionstaginggoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMeta: InContextSdkMethod<Subscription['staginggoerli_rootManagerMeta'], Subscriptionstaginggoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMetas: InContextSdkMethod<Subscription['staginggoerli_rootManagerMetas'], Subscriptionstaginggoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerMode: InContextSdkMethod<Subscription['staginggoerli_rootManagerMode'], Subscriptionstaginggoerli_rootManagerModeArgs, MeshContext>,
  /** null **/
  staginggoerli_rootManagerModes: InContextSdkMethod<Subscription['staginggoerli_rootManagerModes'], Subscriptionstaginggoerli_rootManagerModesArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootProposed: InContextSdkMethod<Subscription['staginggoerli_optimisticRootProposed'], Subscriptionstaginggoerli_optimisticRootProposedArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootProposeds: InContextSdkMethod<Subscription['staginggoerli_optimisticRootProposeds'], Subscriptionstaginggoerli_optimisticRootProposedsArgs, MeshContext>,
  /** null **/
  staginggoerli_hubOptimisticRootFinalized: InContextSdkMethod<Subscription['staginggoerli_hubOptimisticRootFinalized'], Subscriptionstaginggoerli_hubOptimisticRootFinalizedArgs, MeshContext>,
  /** null **/
  staginggoerli_hubOptimisticRootFinalizeds: InContextSdkMethod<Subscription['staginggoerli_hubOptimisticRootFinalizeds'], Subscriptionstaginggoerli_hubOptimisticRootFinalizedsArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootPropagated: InContextSdkMethod<Subscription['staginggoerli_optimisticRootPropagated'], Subscriptionstaginggoerli_optimisticRootPropagatedArgs, MeshContext>,
  /** null **/
  staginggoerli_optimisticRootPropagateds: InContextSdkMethod<Subscription['staginggoerli_optimisticRootPropagateds'], Subscriptionstaginggoerli_optimisticRootPropagatedsArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_polygonConnectorMeta'], Subscriptionstaginggoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_polygonConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_polygonConnectorMetas'], Subscriptionstaginggoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_optimismConnectorMeta'], Subscriptionstaginggoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_optimismConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_optimismConnectorMetas'], Subscriptionstaginggoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_bnbConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_bnbConnectorMeta'], Subscriptionstaginggoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_bnbConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_bnbConnectorMetas'], Subscriptionstaginggoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_arbitrumConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_arbitrumConnectorMeta'], Subscriptionstaginggoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_arbitrumConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_arbitrumConnectorMetas'], Subscriptionstaginggoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_gnosisConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_gnosisConnectorMeta'], Subscriptionstaginggoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_gnosisConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_gnosisConnectorMetas'], Subscriptionstaginggoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_zkSyncConnectorMeta: InContextSdkMethod<Subscription['staginggoerli_zkSyncConnectorMeta'], Subscriptionstaginggoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  staginggoerli_zkSyncConnectorMetas: InContextSdkMethod<Subscription['staginggoerli_zkSyncConnectorMetas'], Subscriptionstaginggoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcessed: InContextSdkMethod<Subscription['staginggoerli_rootMessageProcessed'], Subscriptionstaginggoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  staginggoerli_rootMessageProcesseds: InContextSdkMethod<Subscription['staginggoerli_rootMessageProcesseds'], Subscriptionstaginggoerli_rootMessageProcessedsArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregateRootSavedSlow: InContextSdkMethod<Subscription['staginggoerli_aggregateRootSavedSlow'], Subscriptionstaginggoerli_aggregateRootSavedSlowArgs, MeshContext>,
  /** null **/
  staginggoerli_aggregateRootSavedSlows: InContextSdkMethod<Subscription['staginggoerli_aggregateRootSavedSlows'], Subscriptionstaginggoerli_aggregateRootSavedSlowsArgs, MeshContext>,
  /** null **/
  staginggoerli_hubDomain: InContextSdkMethod<Subscription['staginggoerli_hubDomain'], Subscriptionstaginggoerli_hubDomainArgs, MeshContext>,
  /** null **/
  staginggoerli_hubDomains: InContextSdkMethod<Subscription['staginggoerli_hubDomains'], Subscriptionstaginggoerli_hubDomainsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<Subscription['staginggoerli__meta'], Subscriptionstaginggoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Staging_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
