// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubTestGoerliTypes {
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
  testgoerli_BigDecimal: any;
  BigInt: any;
  testgoerli_Bytes: any;
};

export type testgoerli_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['testgoerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type testgoerli_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_AggregatedMessageRoot_filter>>>;
};

export type testgoerli_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

export type testgoerli_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_ArbitrumConnectorMeta_filter>>>;
};

export type testgoerli_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type testgoerli_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_BnbConnectorMeta_filter>>>;
};

export type testgoerli_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testgoerli_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_GnosisConnectorMeta_filter>>>;
};

export type testgoerli_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testgoerli_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_OptimismConnectorMeta_filter>>>;
};

export type testgoerli_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type testgoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type testgoerli_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_PolygonConnectorMeta_filter>>>;
};

export type testgoerli_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  testgoerli_rootAggregated?: Maybe<testgoerli_RootAggregated>;
  testgoerli_rootAggregateds: Array<testgoerli_RootAggregated>;
  testgoerli_rootPropagated?: Maybe<testgoerli_RootPropagated>;
  testgoerli_rootPropagateds: Array<testgoerli_RootPropagated>;
  testgoerli_aggregatedMessageRoot?: Maybe<testgoerli_AggregatedMessageRoot>;
  testgoerli_aggregatedMessageRoots: Array<testgoerli_AggregatedMessageRoot>;
  testgoerli_rootManagerMeta?: Maybe<testgoerli_RootManagerMeta>;
  testgoerli_rootManagerMetas: Array<testgoerli_RootManagerMeta>;
  testgoerli_polygonConnectorMeta?: Maybe<testgoerli_PolygonConnectorMeta>;
  testgoerli_polygonConnectorMetas: Array<testgoerli_PolygonConnectorMeta>;
  testgoerli_optimismConnectorMeta?: Maybe<testgoerli_OptimismConnectorMeta>;
  testgoerli_optimismConnectorMetas: Array<testgoerli_OptimismConnectorMeta>;
  testgoerli_bnbConnectorMeta?: Maybe<testgoerli_BnbConnectorMeta>;
  testgoerli_bnbConnectorMetas: Array<testgoerli_BnbConnectorMeta>;
  testgoerli_arbitrumConnectorMeta?: Maybe<testgoerli_ArbitrumConnectorMeta>;
  testgoerli_arbitrumConnectorMetas: Array<testgoerli_ArbitrumConnectorMeta>;
  testgoerli_gnosisConnectorMeta?: Maybe<testgoerli_GnosisConnectorMeta>;
  testgoerli_gnosisConnectorMetas: Array<testgoerli_GnosisConnectorMeta>;
  testgoerli_zkSyncConnectorMeta?: Maybe<testgoerli_ZkSyncConnectorMeta>;
  testgoerli_zkSyncConnectorMetas: Array<testgoerli_ZkSyncConnectorMeta>;
  testgoerli_rootMessageProcessed?: Maybe<testgoerli_RootMessageProcessed>;
  testgoerli_rootMessageProcesseds: Array<testgoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Querytestgoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootAggregated_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootPropagated_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootManagerMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querytestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['testgoerli_Bytes'];
  index: Scalars['BigInt'];
};

export type testgoerli_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootAggregated_filter>>>;
};

export type testgoerli_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type testgoerli_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['testgoerli_Bytes']>>;
};

export type testgoerli_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootManagerMeta_filter>>>;
};

export type testgoerli_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type testgoerli_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['testgoerli_Bytes']>;
  caller?: Maybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['testgoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type testgoerli_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootMessageProcessed_filter>>>;
};

export type testgoerli_RootMessageProcessed_orderBy =
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

export type testgoerli_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['testgoerli_Bytes'];
  domainsHash: Scalars['testgoerli_Bytes'];
  count: Scalars['BigInt'];
};

export type testgoerli_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_RootPropagated_filter>>>;
};

export type testgoerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count';

export type Subscription = {
  testgoerli_rootAggregated?: Maybe<testgoerli_RootAggregated>;
  testgoerli_rootAggregateds: Array<testgoerli_RootAggregated>;
  testgoerli_rootPropagated?: Maybe<testgoerli_RootPropagated>;
  testgoerli_rootPropagateds: Array<testgoerli_RootPropagated>;
  testgoerli_aggregatedMessageRoot?: Maybe<testgoerli_AggregatedMessageRoot>;
  testgoerli_aggregatedMessageRoots: Array<testgoerli_AggregatedMessageRoot>;
  testgoerli_rootManagerMeta?: Maybe<testgoerli_RootManagerMeta>;
  testgoerli_rootManagerMetas: Array<testgoerli_RootManagerMeta>;
  testgoerli_polygonConnectorMeta?: Maybe<testgoerli_PolygonConnectorMeta>;
  testgoerli_polygonConnectorMetas: Array<testgoerli_PolygonConnectorMeta>;
  testgoerli_optimismConnectorMeta?: Maybe<testgoerli_OptimismConnectorMeta>;
  testgoerli_optimismConnectorMetas: Array<testgoerli_OptimismConnectorMeta>;
  testgoerli_bnbConnectorMeta?: Maybe<testgoerli_BnbConnectorMeta>;
  testgoerli_bnbConnectorMetas: Array<testgoerli_BnbConnectorMeta>;
  testgoerli_arbitrumConnectorMeta?: Maybe<testgoerli_ArbitrumConnectorMeta>;
  testgoerli_arbitrumConnectorMetas: Array<testgoerli_ArbitrumConnectorMeta>;
  testgoerli_gnosisConnectorMeta?: Maybe<testgoerli_GnosisConnectorMeta>;
  testgoerli_gnosisConnectorMetas: Array<testgoerli_GnosisConnectorMeta>;
  testgoerli_zkSyncConnectorMeta?: Maybe<testgoerli_ZkSyncConnectorMeta>;
  testgoerli_zkSyncConnectorMetas: Array<testgoerli_ZkSyncConnectorMeta>;
  testgoerli_rootMessageProcessed?: Maybe<testgoerli_RootMessageProcessed>;
  testgoerli_rootMessageProcesseds: Array<testgoerli_RootMessageProcessed>;
  /** Access to subgraph metadata */
  testgoerli__meta?: Maybe<testgoerli__Meta_>;
};


export type Subscriptiontestgoerli_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootAggregated_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootPropagated_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_AggregatedMessageRoot_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootManagerMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_PolygonConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_OptimismConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_BnbConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_GnosisConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<testgoerli_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<testgoerli_OrderDirection>;
  where?: InputMaybe<testgoerli_RootMessageProcessed_filter>;
  block?: InputMaybe<testgoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiontestgoerli__metaArgs = {
  block?: InputMaybe<testgoerli_Block_height>;
};

export type testgoerli_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['testgoerli_Bytes'];
  rootManager: Scalars['testgoerli_Bytes'];
  mirrorConnector: Scalars['testgoerli_Bytes'];
};

export type testgoerli_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lt?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_gte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_lte?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<testgoerli_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<testgoerli_ZkSyncConnectorMeta_filter>>>;
};

export type testgoerli_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type testgoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['testgoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type testgoerli__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: testgoerli__Block_;
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
  testgoerli_rootAggregated: InContextSdkMethod<Query['testgoerli_rootAggregated'], Querytestgoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootAggregateds: InContextSdkMethod<Query['testgoerli_rootAggregateds'], Querytestgoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagated: InContextSdkMethod<Query['testgoerli_rootPropagated'], Querytestgoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagateds: InContextSdkMethod<Query['testgoerli_rootPropagateds'], Querytestgoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  testgoerli_aggregatedMessageRoot: InContextSdkMethod<Query['testgoerli_aggregatedMessageRoot'], Querytestgoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  testgoerli_aggregatedMessageRoots: InContextSdkMethod<Query['testgoerli_aggregatedMessageRoots'], Querytestgoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  testgoerli_rootManagerMeta: InContextSdkMethod<Query['testgoerli_rootManagerMeta'], Querytestgoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  testgoerli_rootManagerMetas: InContextSdkMethod<Query['testgoerli_rootManagerMetas'], Querytestgoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMeta: InContextSdkMethod<Query['testgoerli_polygonConnectorMeta'], Querytestgoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMetas: InContextSdkMethod<Query['testgoerli_polygonConnectorMetas'], Querytestgoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMeta: InContextSdkMethod<Query['testgoerli_optimismConnectorMeta'], Querytestgoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMetas: InContextSdkMethod<Query['testgoerli_optimismConnectorMetas'], Querytestgoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_bnbConnectorMeta: InContextSdkMethod<Query['testgoerli_bnbConnectorMeta'], Querytestgoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_bnbConnectorMetas: InContextSdkMethod<Query['testgoerli_bnbConnectorMetas'], Querytestgoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_arbitrumConnectorMeta: InContextSdkMethod<Query['testgoerli_arbitrumConnectorMeta'], Querytestgoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_arbitrumConnectorMetas: InContextSdkMethod<Query['testgoerli_arbitrumConnectorMetas'], Querytestgoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_gnosisConnectorMeta: InContextSdkMethod<Query['testgoerli_gnosisConnectorMeta'], Querytestgoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_gnosisConnectorMetas: InContextSdkMethod<Query['testgoerli_gnosisConnectorMetas'], Querytestgoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_zkSyncConnectorMeta: InContextSdkMethod<Query['testgoerli_zkSyncConnectorMeta'], Querytestgoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_zkSyncConnectorMetas: InContextSdkMethod<Query['testgoerli_zkSyncConnectorMetas'], Querytestgoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcessed: InContextSdkMethod<Query['testgoerli_rootMessageProcessed'], Querytestgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcesseds: InContextSdkMethod<Query['testgoerli_rootMessageProcesseds'], Querytestgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<Query['testgoerli__meta'], Querytestgoerli__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  testgoerli_rootAggregated: InContextSdkMethod<Subscription['testgoerli_rootAggregated'], Subscriptiontestgoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootAggregateds: InContextSdkMethod<Subscription['testgoerli_rootAggregateds'], Subscriptiontestgoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagated: InContextSdkMethod<Subscription['testgoerli_rootPropagated'], Subscriptiontestgoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagateds: InContextSdkMethod<Subscription['testgoerli_rootPropagateds'], Subscriptiontestgoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  testgoerli_aggregatedMessageRoot: InContextSdkMethod<Subscription['testgoerli_aggregatedMessageRoot'], Subscriptiontestgoerli_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  testgoerli_aggregatedMessageRoots: InContextSdkMethod<Subscription['testgoerli_aggregatedMessageRoots'], Subscriptiontestgoerli_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  testgoerli_rootManagerMeta: InContextSdkMethod<Subscription['testgoerli_rootManagerMeta'], Subscriptiontestgoerli_rootManagerMetaArgs, MeshContext>,
  /** null **/
  testgoerli_rootManagerMetas: InContextSdkMethod<Subscription['testgoerli_rootManagerMetas'], Subscriptiontestgoerli_rootManagerMetasArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMeta: InContextSdkMethod<Subscription['testgoerli_polygonConnectorMeta'], Subscriptiontestgoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMetas: InContextSdkMethod<Subscription['testgoerli_polygonConnectorMetas'], Subscriptiontestgoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMeta: InContextSdkMethod<Subscription['testgoerli_optimismConnectorMeta'], Subscriptiontestgoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMetas: InContextSdkMethod<Subscription['testgoerli_optimismConnectorMetas'], Subscriptiontestgoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_bnbConnectorMeta: InContextSdkMethod<Subscription['testgoerli_bnbConnectorMeta'], Subscriptiontestgoerli_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_bnbConnectorMetas: InContextSdkMethod<Subscription['testgoerli_bnbConnectorMetas'], Subscriptiontestgoerli_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_arbitrumConnectorMeta: InContextSdkMethod<Subscription['testgoerli_arbitrumConnectorMeta'], Subscriptiontestgoerli_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_arbitrumConnectorMetas: InContextSdkMethod<Subscription['testgoerli_arbitrumConnectorMetas'], Subscriptiontestgoerli_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_gnosisConnectorMeta: InContextSdkMethod<Subscription['testgoerli_gnosisConnectorMeta'], Subscriptiontestgoerli_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_gnosisConnectorMetas: InContextSdkMethod<Subscription['testgoerli_gnosisConnectorMetas'], Subscriptiontestgoerli_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_zkSyncConnectorMeta: InContextSdkMethod<Subscription['testgoerli_zkSyncConnectorMeta'], Subscriptiontestgoerli_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_zkSyncConnectorMetas: InContextSdkMethod<Subscription['testgoerli_zkSyncConnectorMetas'], Subscriptiontestgoerli_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcessed: InContextSdkMethod<Subscription['testgoerli_rootMessageProcessed'], Subscriptiontestgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcesseds: InContextSdkMethod<Subscription['testgoerli_rootMessageProcesseds'], Subscriptiontestgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<Subscription['testgoerli__meta'], Subscriptiontestgoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Test_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
