
import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ConnextTestGoerliTypes {
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
  BigInt: bigint;
  testgoerli_Bytes: any;
};

export type testgoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type testgoerli_Block_height = {
  hash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

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
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
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
  amb_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  amb_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  amb_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  rootManager_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  rootManager_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  mirrorConnector_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  mirrorConnector_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<testgoerli_BlockChangedFilter>;
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
  testgoerli_polygonConnectorMeta?: Maybe<testgoerli_PolygonConnectorMeta>;
  testgoerli_polygonConnectorMetas: Array<testgoerli_PolygonConnectorMeta>;
  testgoerli_optimismConnectorMeta?: Maybe<testgoerli_OptimismConnectorMeta>;
  testgoerli_optimismConnectorMetas: Array<testgoerli_OptimismConnectorMeta>;
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
};

export type testgoerli_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

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
  root_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  root_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  root_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['testgoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['testgoerli_Bytes']>;
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
  domains?: Maybe<Array<Scalars['BigInt']>>;
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
  aggregate_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['testgoerli_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['testgoerli_Bytes']>;
  domains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  domains_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type testgoerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domains'
  | 'count';

export type Subscription = {
  testgoerli_rootAggregated?: Maybe<testgoerli_RootAggregated>;
  testgoerli_rootAggregateds: Array<testgoerli_RootAggregated>;
  testgoerli_rootPropagated?: Maybe<testgoerli_RootPropagated>;
  testgoerli_rootPropagateds: Array<testgoerli_RootPropagated>;
  testgoerli_polygonConnectorMeta?: Maybe<testgoerli_PolygonConnectorMeta>;
  testgoerli_polygonConnectorMetas: Array<testgoerli_PolygonConnectorMeta>;
  testgoerli_optimismConnectorMeta?: Maybe<testgoerli_OptimismConnectorMeta>;
  testgoerli_optimismConnectorMetas: Array<testgoerli_OptimismConnectorMeta>;
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

}
export type QueryConnextTestGoerliSdk = {
  /** null **/
  testgoerli_rootAggregated: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootAggregated'], ConnextTestGoerliTypes.Querytestgoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootAggregateds: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootAggregateds'], ConnextTestGoerliTypes.Querytestgoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagated: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootPropagated'], ConnextTestGoerliTypes.Querytestgoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagateds: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootPropagateds'], ConnextTestGoerliTypes.Querytestgoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMeta: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_polygonConnectorMeta'], ConnextTestGoerliTypes.Querytestgoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMetas: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_polygonConnectorMetas'], ConnextTestGoerliTypes.Querytestgoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMeta: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_optimismConnectorMeta'], ConnextTestGoerliTypes.Querytestgoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMetas: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_optimismConnectorMetas'], ConnextTestGoerliTypes.Querytestgoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcessed: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootMessageProcessed'], ConnextTestGoerliTypes.Querytestgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcesseds: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli_rootMessageProcesseds'], ConnextTestGoerliTypes.Querytestgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<ConnextTestGoerliTypes.Query['testgoerli__meta'], ConnextTestGoerliTypes.Querytestgoerli__metaArgs, MeshContext>
};

export type MutationConnextTestGoerliSdk = {

};

export type SubscriptionConnextTestGoerliSdk = {
  /** null **/
  testgoerli_rootAggregated: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootAggregated'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootAggregatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootAggregateds: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootAggregateds'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootAggregatedsArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagated: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootPropagated'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootPropagatedArgs, MeshContext>,
  /** null **/
  testgoerli_rootPropagateds: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootPropagateds'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootPropagatedsArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMeta: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_polygonConnectorMeta'], ConnextTestGoerliTypes.Subscriptiontestgoerli_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_polygonConnectorMetas: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_polygonConnectorMetas'], ConnextTestGoerliTypes.Subscriptiontestgoerli_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMeta: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_optimismConnectorMeta'], ConnextTestGoerliTypes.Subscriptiontestgoerli_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  testgoerli_optimismConnectorMetas: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_optimismConnectorMetas'], ConnextTestGoerliTypes.Subscriptiontestgoerli_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcessed: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootMessageProcessed'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  testgoerli_rootMessageProcesseds: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli_rootMessageProcesseds'], ConnextTestGoerliTypes.Subscriptiontestgoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  testgoerli__meta: InContextSdkMethod<ConnextTestGoerliTypes.Subscription['testgoerli__meta'], ConnextTestGoerliTypes.Subscriptiontestgoerli__metaArgs, MeshContext>
};
export type ConnextTestGoerliContext = {
      ["Connext_Test_Goerli"]: { Query: QueryConnextTestGoerliSdk, Mutation: MutationConnextTestGoerliSdk, Subscription: SubscriptionConnextTestGoerliSdk },
      
    };