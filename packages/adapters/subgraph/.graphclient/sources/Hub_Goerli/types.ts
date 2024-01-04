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

export type goerli_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['goerli_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_AggregatedMessageRoot_filter>>>;
};

export type goerli_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

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
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<goerli_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<goerli_RootPropagated_filter>>>;
};

export type goerli_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count';

export type Subscription = {
  goerli_rootAggregated?: Maybe<goerli_RootAggregated>;
  goerli_rootAggregateds: Array<goerli_RootAggregated>;
  goerli_rootPropagated?: Maybe<goerli_RootPropagated>;
  goerli_rootPropagateds: Array<goerli_RootPropagated>;
  goerli_aggregatedMessageRoot?: Maybe<goerli_AggregatedMessageRoot>;
  goerli_aggregatedMessageRoots: Array<goerli_AggregatedMessageRoot>;
  goerli_rootManagerMeta?: Maybe<goerli_RootManagerMeta>;
  goerli_rootManagerMetas: Array<goerli_RootManagerMeta>;
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
  goerli_rootMessageProcessed?: Maybe<goerli_RootMessageProcessed>;
  goerli_rootMessageProcesseds: Array<goerli_RootMessageProcessed>;
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


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

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
  goerli_rootMessageProcessed: InContextSdkMethod<Query['goerli_rootMessageProcessed'], Querygoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<Query['goerli_rootMessageProcesseds'], Querygoerli_rootMessageProcessedsArgs, MeshContext>,
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
  goerli_rootMessageProcessed: InContextSdkMethod<Subscription['goerli_rootMessageProcessed'], Subscriptiongoerli_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  goerli_rootMessageProcesseds: InContextSdkMethod<Subscription['goerli_rootMessageProcesseds'], Subscriptiongoerli_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<Subscription['goerli__meta'], Subscriptiongoerli__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Goerli"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
