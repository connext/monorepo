// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace DevnetHubMainnetTypes {
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
  devnetmainnet_BigDecimal: any;
  BigInt: any;
  devnetmainnet_Bytes: any;
};

export type devnetmainnet_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['devnetmainnet_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type devnetmainnet_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

export type devnetmainnet_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_ArbitrumConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetmainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type devnetmainnet_Block_height = {
  hash?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type devnetmainnet_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_BnbConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetmainnet_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_GnosisConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetmainnet_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_OptimismConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type devnetmainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type devnetmainnet_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_PolygonConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  devnetmainnet_rootAggregated?: Maybe<devnetmainnet_RootAggregated>;
  devnetmainnet_rootAggregateds: Array<devnetmainnet_RootAggregated>;
  devnetmainnet_rootPropagated?: Maybe<devnetmainnet_RootPropagated>;
  devnetmainnet_rootPropagateds: Array<devnetmainnet_RootPropagated>;
  devnetmainnet_aggregatedMessageRoot?: Maybe<devnetmainnet_AggregatedMessageRoot>;
  devnetmainnet_aggregatedMessageRoots: Array<devnetmainnet_AggregatedMessageRoot>;
  devnetmainnet_rootManagerMeta?: Maybe<devnetmainnet_RootManagerMeta>;
  devnetmainnet_rootManagerMetas: Array<devnetmainnet_RootManagerMeta>;
  devnetmainnet_polygonConnectorMeta?: Maybe<devnetmainnet_PolygonConnectorMeta>;
  devnetmainnet_polygonConnectorMetas: Array<devnetmainnet_PolygonConnectorMeta>;
  devnetmainnet_optimismConnectorMeta?: Maybe<devnetmainnet_OptimismConnectorMeta>;
  devnetmainnet_optimismConnectorMetas: Array<devnetmainnet_OptimismConnectorMeta>;
  devnetmainnet_bnbConnectorMeta?: Maybe<devnetmainnet_BnbConnectorMeta>;
  devnetmainnet_bnbConnectorMetas: Array<devnetmainnet_BnbConnectorMeta>;
  devnetmainnet_arbitrumConnectorMeta?: Maybe<devnetmainnet_ArbitrumConnectorMeta>;
  devnetmainnet_arbitrumConnectorMetas: Array<devnetmainnet_ArbitrumConnectorMeta>;
  devnetmainnet_gnosisConnectorMeta?: Maybe<devnetmainnet_GnosisConnectorMeta>;
  devnetmainnet_gnosisConnectorMetas: Array<devnetmainnet_GnosisConnectorMeta>;
  devnetmainnet_zkSyncConnectorMeta?: Maybe<devnetmainnet_ZkSyncConnectorMeta>;
  devnetmainnet_zkSyncConnectorMetas: Array<devnetmainnet_ZkSyncConnectorMeta>;
  devnetmainnet_rootMessageProcessed?: Maybe<devnetmainnet_RootMessageProcessed>;
  devnetmainnet_rootMessageProcesseds: Array<devnetmainnet_RootMessageProcessed>;
  /** Access to subgraph metadata */
  devnetmainnet__meta?: Maybe<devnetmainnet__Meta_>;
};


export type Querydevnetmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootAggregated_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootPropagated_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querydevnetmainnet__metaArgs = {
  block?: InputMaybe<devnetmainnet_Block_height>;
};

export type devnetmainnet_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['devnetmainnet_Bytes'];
  index: Scalars['BigInt'];
};

export type devnetmainnet_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type devnetmainnet_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['devnetmainnet_Bytes']>>;
};

export type devnetmainnet_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type devnetmainnet_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['devnetmainnet_Bytes']>;
  caller?: Maybe<Scalars['devnetmainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['devnetmainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type devnetmainnet_RootMessageProcessed_filter = {
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
  root?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  root_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  root_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  root_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  caller?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  caller_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  transactionHash?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
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
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_RootMessageProcessed_orderBy =
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

export type devnetmainnet_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['devnetmainnet_Bytes'];
  domainsHash: Scalars['devnetmainnet_Bytes'];
  count: Scalars['BigInt'];
};

export type devnetmainnet_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count';

export type Subscription = {
  devnetmainnet_rootAggregated?: Maybe<devnetmainnet_RootAggregated>;
  devnetmainnet_rootAggregateds: Array<devnetmainnet_RootAggregated>;
  devnetmainnet_rootPropagated?: Maybe<devnetmainnet_RootPropagated>;
  devnetmainnet_rootPropagateds: Array<devnetmainnet_RootPropagated>;
  devnetmainnet_aggregatedMessageRoot?: Maybe<devnetmainnet_AggregatedMessageRoot>;
  devnetmainnet_aggregatedMessageRoots: Array<devnetmainnet_AggregatedMessageRoot>;
  devnetmainnet_rootManagerMeta?: Maybe<devnetmainnet_RootManagerMeta>;
  devnetmainnet_rootManagerMetas: Array<devnetmainnet_RootManagerMeta>;
  devnetmainnet_polygonConnectorMeta?: Maybe<devnetmainnet_PolygonConnectorMeta>;
  devnetmainnet_polygonConnectorMetas: Array<devnetmainnet_PolygonConnectorMeta>;
  devnetmainnet_optimismConnectorMeta?: Maybe<devnetmainnet_OptimismConnectorMeta>;
  devnetmainnet_optimismConnectorMetas: Array<devnetmainnet_OptimismConnectorMeta>;
  devnetmainnet_bnbConnectorMeta?: Maybe<devnetmainnet_BnbConnectorMeta>;
  devnetmainnet_bnbConnectorMetas: Array<devnetmainnet_BnbConnectorMeta>;
  devnetmainnet_arbitrumConnectorMeta?: Maybe<devnetmainnet_ArbitrumConnectorMeta>;
  devnetmainnet_arbitrumConnectorMetas: Array<devnetmainnet_ArbitrumConnectorMeta>;
  devnetmainnet_gnosisConnectorMeta?: Maybe<devnetmainnet_GnosisConnectorMeta>;
  devnetmainnet_gnosisConnectorMetas: Array<devnetmainnet_GnosisConnectorMeta>;
  devnetmainnet_zkSyncConnectorMeta?: Maybe<devnetmainnet_ZkSyncConnectorMeta>;
  devnetmainnet_zkSyncConnectorMetas: Array<devnetmainnet_ZkSyncConnectorMeta>;
  devnetmainnet_rootMessageProcessed?: Maybe<devnetmainnet_RootMessageProcessed>;
  devnetmainnet_rootMessageProcesseds: Array<devnetmainnet_RootMessageProcessed>;
  /** Access to subgraph metadata */
  devnetmainnet__meta?: Maybe<devnetmainnet__Meta_>;
};


export type Subscriptiondevnetmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootAggregated_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootPropagated_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootManagerMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<devnetmainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<devnetmainnet_OrderDirection>;
  where?: InputMaybe<devnetmainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<devnetmainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiondevnetmainnet__metaArgs = {
  block?: InputMaybe<devnetmainnet_Block_height>;
};

export type devnetmainnet_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['devnetmainnet_Bytes'];
  rootManager: Scalars['devnetmainnet_Bytes'];
  mirrorConnector: Scalars['devnetmainnet_Bytes'];
};

export type devnetmainnet_ZkSyncConnectorMeta_filter = {
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
  amb?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['devnetmainnet_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['devnetmainnet_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<devnetmainnet_BlockChangedFilter>;
};

export type devnetmainnet_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type devnetmainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['devnetmainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type devnetmainnet__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: devnetmainnet__Block_;
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
  devnetmainnet_rootAggregated: InContextSdkMethod<Query['devnetmainnet_rootAggregated'], Querydevnetmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootAggregateds: InContextSdkMethod<Query['devnetmainnet_rootAggregateds'], Querydevnetmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootPropagated: InContextSdkMethod<Query['devnetmainnet_rootPropagated'], Querydevnetmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootPropagateds: InContextSdkMethod<Query['devnetmainnet_rootPropagateds'], Querydevnetmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  devnetmainnet_aggregatedMessageRoot: InContextSdkMethod<Query['devnetmainnet_aggregatedMessageRoot'], Querydevnetmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  devnetmainnet_aggregatedMessageRoots: InContextSdkMethod<Query['devnetmainnet_aggregatedMessageRoots'], Querydevnetmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootManagerMeta: InContextSdkMethod<Query['devnetmainnet_rootManagerMeta'], Querydevnetmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootManagerMetas: InContextSdkMethod<Query['devnetmainnet_rootManagerMetas'], Querydevnetmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_polygonConnectorMeta: InContextSdkMethod<Query['devnetmainnet_polygonConnectorMeta'], Querydevnetmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_polygonConnectorMetas: InContextSdkMethod<Query['devnetmainnet_polygonConnectorMetas'], Querydevnetmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_optimismConnectorMeta: InContextSdkMethod<Query['devnetmainnet_optimismConnectorMeta'], Querydevnetmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_optimismConnectorMetas: InContextSdkMethod<Query['devnetmainnet_optimismConnectorMetas'], Querydevnetmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_bnbConnectorMeta: InContextSdkMethod<Query['devnetmainnet_bnbConnectorMeta'], Querydevnetmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_bnbConnectorMetas: InContextSdkMethod<Query['devnetmainnet_bnbConnectorMetas'], Querydevnetmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_arbitrumConnectorMeta: InContextSdkMethod<Query['devnetmainnet_arbitrumConnectorMeta'], Querydevnetmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_arbitrumConnectorMetas: InContextSdkMethod<Query['devnetmainnet_arbitrumConnectorMetas'], Querydevnetmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_gnosisConnectorMeta: InContextSdkMethod<Query['devnetmainnet_gnosisConnectorMeta'], Querydevnetmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_gnosisConnectorMetas: InContextSdkMethod<Query['devnetmainnet_gnosisConnectorMetas'], Querydevnetmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_zkSyncConnectorMeta: InContextSdkMethod<Query['devnetmainnet_zkSyncConnectorMeta'], Querydevnetmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_zkSyncConnectorMetas: InContextSdkMethod<Query['devnetmainnet_zkSyncConnectorMetas'], Querydevnetmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootMessageProcessed: InContextSdkMethod<Query['devnetmainnet_rootMessageProcessed'], Querydevnetmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootMessageProcesseds: InContextSdkMethod<Query['devnetmainnet_rootMessageProcesseds'], Querydevnetmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetmainnet__meta: InContextSdkMethod<Query['devnetmainnet__meta'], Querydevnetmainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  devnetmainnet_rootAggregated: InContextSdkMethod<Subscription['devnetmainnet_rootAggregated'], Subscriptiondevnetmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootAggregateds: InContextSdkMethod<Subscription['devnetmainnet_rootAggregateds'], Subscriptiondevnetmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootPropagated: InContextSdkMethod<Subscription['devnetmainnet_rootPropagated'], Subscriptiondevnetmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootPropagateds: InContextSdkMethod<Subscription['devnetmainnet_rootPropagateds'], Subscriptiondevnetmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  devnetmainnet_aggregatedMessageRoot: InContextSdkMethod<Subscription['devnetmainnet_aggregatedMessageRoot'], Subscriptiondevnetmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  devnetmainnet_aggregatedMessageRoots: InContextSdkMethod<Subscription['devnetmainnet_aggregatedMessageRoots'], Subscriptiondevnetmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootManagerMeta: InContextSdkMethod<Subscription['devnetmainnet_rootManagerMeta'], Subscriptiondevnetmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootManagerMetas: InContextSdkMethod<Subscription['devnetmainnet_rootManagerMetas'], Subscriptiondevnetmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_polygonConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_polygonConnectorMeta'], Subscriptiondevnetmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_polygonConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_polygonConnectorMetas'], Subscriptiondevnetmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_optimismConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_optimismConnectorMeta'], Subscriptiondevnetmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_optimismConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_optimismConnectorMetas'], Subscriptiondevnetmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_bnbConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_bnbConnectorMeta'], Subscriptiondevnetmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_bnbConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_bnbConnectorMetas'], Subscriptiondevnetmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_arbitrumConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_arbitrumConnectorMeta'], Subscriptiondevnetmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_arbitrumConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_arbitrumConnectorMetas'], Subscriptiondevnetmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_gnosisConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_gnosisConnectorMeta'], Subscriptiondevnetmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_gnosisConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_gnosisConnectorMetas'], Subscriptiondevnetmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_zkSyncConnectorMeta: InContextSdkMethod<Subscription['devnetmainnet_zkSyncConnectorMeta'], Subscriptiondevnetmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  devnetmainnet_zkSyncConnectorMetas: InContextSdkMethod<Subscription['devnetmainnet_zkSyncConnectorMetas'], Subscriptiondevnetmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootMessageProcessed: InContextSdkMethod<Subscription['devnetmainnet_rootMessageProcessed'], Subscriptiondevnetmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  devnetmainnet_rootMessageProcesseds: InContextSdkMethod<Subscription['devnetmainnet_rootMessageProcesseds'], Subscriptiondevnetmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  devnetmainnet__meta: InContextSdkMethod<Subscription['devnetmainnet__meta'], Subscriptiondevnetmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Devnet_Hub_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
