// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HubMainnetTypes {
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
};

export type mainnet_AggregatedMessageRoot = {
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  receivedRoot: Scalars['mainnet_Bytes'];
  domain?: Maybe<Scalars['BigInt']>;
};

export type mainnet_AggregatedMessageRoot_filter = {
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
  receivedRoot?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  domain?: InputMaybe<Scalars['BigInt']>;
  domain_not?: InputMaybe<Scalars['BigInt']>;
  domain_gt?: InputMaybe<Scalars['BigInt']>;
  domain_lt?: InputMaybe<Scalars['BigInt']>;
  domain_gte?: InputMaybe<Scalars['BigInt']>;
  domain_lte?: InputMaybe<Scalars['BigInt']>;
  domain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  domain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_AggregatedMessageRoot_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_AggregatedMessageRoot_filter>>>;
};

export type mainnet_AggregatedMessageRoot_orderBy =
  | 'id'
  | 'index'
  | 'receivedRoot'
  | 'domain';

export type mainnet_ArbitrumConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_ArbitrumConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_ArbitrumConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_ArbitrumConnectorMeta_filter>>>;
};

export type mainnet_ArbitrumConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type mainnet_Block_height = {
  hash?: InputMaybe<Scalars['mainnet_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type mainnet_BnbConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_BnbConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_BnbConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_BnbConnectorMeta_filter>>>;
};

export type mainnet_BnbConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet_GnosisConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_GnosisConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_GnosisConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_GnosisConnectorMeta_filter>>>;
};

export type mainnet_GnosisConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet_LineaConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_LineaConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_LineaConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_LineaConnectorMeta_filter>>>;
};

export type mainnet_LineaConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet_OptimismConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_OptimismConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_OptimismConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_OptimismConnectorMeta_filter>>>;
};

export type mainnet_OptimismConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

/** Defines the order direction, either ascending or descending */
export type mainnet_OrderDirection =
  | 'asc'
  | 'desc';

export type mainnet_PolygonConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_PolygonConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_PolygonConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_PolygonConnectorMeta_filter>>>;
};

export type mainnet_PolygonConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type Query = {
  mainnet_rootAggregated?: Maybe<mainnet_RootAggregated>;
  mainnet_rootAggregateds: Array<mainnet_RootAggregated>;
  mainnet_rootPropagated?: Maybe<mainnet_RootPropagated>;
  mainnet_rootPropagateds: Array<mainnet_RootPropagated>;
  mainnet_aggregatedMessageRoot?: Maybe<mainnet_AggregatedMessageRoot>;
  mainnet_aggregatedMessageRoots: Array<mainnet_AggregatedMessageRoot>;
  mainnet_rootManagerMeta?: Maybe<mainnet_RootManagerMeta>;
  mainnet_rootManagerMetas: Array<mainnet_RootManagerMeta>;
  mainnet_polygonConnectorMeta?: Maybe<mainnet_PolygonConnectorMeta>;
  mainnet_polygonConnectorMetas: Array<mainnet_PolygonConnectorMeta>;
  mainnet_optimismConnectorMeta?: Maybe<mainnet_OptimismConnectorMeta>;
  mainnet_optimismConnectorMetas: Array<mainnet_OptimismConnectorMeta>;
  mainnet_bnbConnectorMeta?: Maybe<mainnet_BnbConnectorMeta>;
  mainnet_bnbConnectorMetas: Array<mainnet_BnbConnectorMeta>;
  mainnet_arbitrumConnectorMeta?: Maybe<mainnet_ArbitrumConnectorMeta>;
  mainnet_arbitrumConnectorMetas: Array<mainnet_ArbitrumConnectorMeta>;
  mainnet_gnosisConnectorMeta?: Maybe<mainnet_GnosisConnectorMeta>;
  mainnet_gnosisConnectorMetas: Array<mainnet_GnosisConnectorMeta>;
  mainnet_zkSyncConnectorMeta?: Maybe<mainnet_ZkSyncConnectorMeta>;
  mainnet_zkSyncConnectorMetas: Array<mainnet_ZkSyncConnectorMeta>;
  mainnet_lineaConnectorMeta?: Maybe<mainnet_LineaConnectorMeta>;
  mainnet_lineaConnectorMetas: Array<mainnet_LineaConnectorMeta>;
  mainnet_rootMessageProcessed?: Maybe<mainnet_RootMessageProcessed>;
  mainnet_rootMessageProcesseds: Array<mainnet_RootMessageProcessed>;
  /** Access to subgraph metadata */
  mainnet__meta?: Maybe<mainnet__Meta_>;
};


export type Querymainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootAggregated_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootPropagated_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootManagerMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_LineaConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querymainnet__metaArgs = {
  block?: InputMaybe<mainnet_Block_height>;
};

export type mainnet_RootAggregated = {
  id: Scalars['ID'];
  domain: Scalars['BigInt'];
  receivedRoot: Scalars['mainnet_Bytes'];
  index: Scalars['BigInt'];
};

export type mainnet_RootAggregated_filter = {
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
  receivedRoot?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  receivedRoot_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  receivedRoot_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  receivedRoot_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  index?: InputMaybe<Scalars['BigInt']>;
  index_not?: InputMaybe<Scalars['BigInt']>;
  index_gt?: InputMaybe<Scalars['BigInt']>;
  index_lt?: InputMaybe<Scalars['BigInt']>;
  index_gte?: InputMaybe<Scalars['BigInt']>;
  index_lte?: InputMaybe<Scalars['BigInt']>;
  index_in?: InputMaybe<Array<Scalars['BigInt']>>;
  index_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RootAggregated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootAggregated_filter>>>;
};

export type mainnet_RootAggregated_orderBy =
  | 'id'
  | 'domain'
  | 'receivedRoot'
  | 'index';

export type mainnet_RootManagerMeta = {
  id: Scalars['ID'];
  domains?: Maybe<Array<Scalars['BigInt']>>;
  connectors?: Maybe<Array<Scalars['mainnet_Bytes']>>;
};

export type mainnet_RootManagerMeta_filter = {
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
  connectors?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  connectors_not?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  connectors_contains?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  connectors_contains_nocase?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  connectors_not_contains?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  connectors_not_contains_nocase?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<mainnet_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<mainnet_RootManagerMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootManagerMeta_filter>>>;
};

export type mainnet_RootManagerMeta_orderBy =
  | 'id'
  | 'domains'
  | 'connectors';

export type mainnet_RootMessageProcessed = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  root?: Maybe<Scalars['mainnet_Bytes']>;
  caller?: Maybe<Scalars['mainnet_Bytes']>;
  transactionHash?: Maybe<Scalars['mainnet_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type mainnet_RootMessageProcessed_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_RootMessageProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootMessageProcessed_filter>>>;
};

export type mainnet_RootMessageProcessed_orderBy =
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

export type mainnet_RootPropagated = {
  id: Scalars['ID'];
  aggregate: Scalars['mainnet_Bytes'];
  domainsHash: Scalars['mainnet_Bytes'];
  count: Scalars['BigInt'];
};

export type mainnet_RootPropagated_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  aggregate?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregate_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  aggregate_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  aggregate_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_not?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_gt?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_lt?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_gte?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_lte?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  domainsHash_not_in?: InputMaybe<Array<Scalars['mainnet_Bytes']>>;
  domainsHash_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
  domainsHash_not_contains?: InputMaybe<Scalars['mainnet_Bytes']>;
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
  and?: InputMaybe<Array<InputMaybe<mainnet_RootPropagated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_RootPropagated_filter>>>;
};

export type mainnet_RootPropagated_orderBy =
  | 'id'
  | 'aggregate'
  | 'domainsHash'
  | 'count';

export type Subscription = {
  mainnet_rootAggregated?: Maybe<mainnet_RootAggregated>;
  mainnet_rootAggregateds: Array<mainnet_RootAggregated>;
  mainnet_rootPropagated?: Maybe<mainnet_RootPropagated>;
  mainnet_rootPropagateds: Array<mainnet_RootPropagated>;
  mainnet_aggregatedMessageRoot?: Maybe<mainnet_AggregatedMessageRoot>;
  mainnet_aggregatedMessageRoots: Array<mainnet_AggregatedMessageRoot>;
  mainnet_rootManagerMeta?: Maybe<mainnet_RootManagerMeta>;
  mainnet_rootManagerMetas: Array<mainnet_RootManagerMeta>;
  mainnet_polygonConnectorMeta?: Maybe<mainnet_PolygonConnectorMeta>;
  mainnet_polygonConnectorMetas: Array<mainnet_PolygonConnectorMeta>;
  mainnet_optimismConnectorMeta?: Maybe<mainnet_OptimismConnectorMeta>;
  mainnet_optimismConnectorMetas: Array<mainnet_OptimismConnectorMeta>;
  mainnet_bnbConnectorMeta?: Maybe<mainnet_BnbConnectorMeta>;
  mainnet_bnbConnectorMetas: Array<mainnet_BnbConnectorMeta>;
  mainnet_arbitrumConnectorMeta?: Maybe<mainnet_ArbitrumConnectorMeta>;
  mainnet_arbitrumConnectorMetas: Array<mainnet_ArbitrumConnectorMeta>;
  mainnet_gnosisConnectorMeta?: Maybe<mainnet_GnosisConnectorMeta>;
  mainnet_gnosisConnectorMetas: Array<mainnet_GnosisConnectorMeta>;
  mainnet_zkSyncConnectorMeta?: Maybe<mainnet_ZkSyncConnectorMeta>;
  mainnet_zkSyncConnectorMetas: Array<mainnet_ZkSyncConnectorMeta>;
  mainnet_lineaConnectorMeta?: Maybe<mainnet_LineaConnectorMeta>;
  mainnet_lineaConnectorMetas: Array<mainnet_LineaConnectorMeta>;
  mainnet_rootMessageProcessed?: Maybe<mainnet_RootMessageProcessed>;
  mainnet_rootMessageProcesseds: Array<mainnet_RootMessageProcessed>;
  /** Access to subgraph metadata */
  mainnet__meta?: Maybe<mainnet__Meta_>;
};


export type Subscriptionmainnet_rootAggregatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootAggregatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootAggregated_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootAggregated_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootPropagatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootPropagatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootPropagated_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootPropagated_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregatedMessageRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_aggregatedMessageRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_AggregatedMessageRoot_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_AggregatedMessageRoot_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootManagerMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootManagerMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootManagerMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootManagerMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_polygonConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_polygonConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_PolygonConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_PolygonConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_optimismConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_optimismConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_OptimismConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_OptimismConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_bnbConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_bnbConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_BnbConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_BnbConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_arbitrumConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_arbitrumConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ArbitrumConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ArbitrumConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_gnosisConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_gnosisConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_GnosisConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_GnosisConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_zkSyncConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_zkSyncConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_ZkSyncConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_ZkSyncConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_lineaConnectorMetaArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_lineaConnectorMetasArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_LineaConnectorMeta_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_LineaConnectorMeta_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootMessageProcessedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet_rootMessageProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<mainnet_RootMessageProcessed_orderBy>;
  orderDirection?: InputMaybe<mainnet_OrderDirection>;
  where?: InputMaybe<mainnet_RootMessageProcessed_filter>;
  block?: InputMaybe<mainnet_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionmainnet__metaArgs = {
  block?: InputMaybe<mainnet_Block_height>;
};

export type mainnet_ZkSyncConnectorMeta = {
  id: Scalars['ID'];
  spokeDomain: Scalars['BigInt'];
  hubDomain: Scalars['BigInt'];
  amb: Scalars['mainnet_Bytes'];
  rootManager: Scalars['mainnet_Bytes'];
  mirrorConnector: Scalars['mainnet_Bytes'];
};

export type mainnet_ZkSyncConnectorMeta_filter = {
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
  and?: InputMaybe<Array<InputMaybe<mainnet_ZkSyncConnectorMeta_filter>>>;
  or?: InputMaybe<Array<InputMaybe<mainnet_ZkSyncConnectorMeta_filter>>>;
};

export type mainnet_ZkSyncConnectorMeta_orderBy =
  | 'id'
  | 'spokeDomain'
  | 'hubDomain'
  | 'amb'
  | 'rootManager'
  | 'mirrorConnector';

export type mainnet__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['mainnet_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
  mainnet_rootAggregated: InContextSdkMethod<Query['mainnet_rootAggregated'], Querymainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  mainnet_rootAggregateds: InContextSdkMethod<Query['mainnet_rootAggregateds'], Querymainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  mainnet_rootPropagated: InContextSdkMethod<Query['mainnet_rootPropagated'], Querymainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  mainnet_rootPropagateds: InContextSdkMethod<Query['mainnet_rootPropagateds'], Querymainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  mainnet_aggregatedMessageRoot: InContextSdkMethod<Query['mainnet_aggregatedMessageRoot'], Querymainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  mainnet_aggregatedMessageRoots: InContextSdkMethod<Query['mainnet_aggregatedMessageRoots'], Querymainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  mainnet_rootManagerMeta: InContextSdkMethod<Query['mainnet_rootManagerMeta'], Querymainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  mainnet_rootManagerMetas: InContextSdkMethod<Query['mainnet_rootManagerMetas'], Querymainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  mainnet_polygonConnectorMeta: InContextSdkMethod<Query['mainnet_polygonConnectorMeta'], Querymainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_polygonConnectorMetas: InContextSdkMethod<Query['mainnet_polygonConnectorMetas'], Querymainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_optimismConnectorMeta: InContextSdkMethod<Query['mainnet_optimismConnectorMeta'], Querymainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_optimismConnectorMetas: InContextSdkMethod<Query['mainnet_optimismConnectorMetas'], Querymainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_bnbConnectorMeta: InContextSdkMethod<Query['mainnet_bnbConnectorMeta'], Querymainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_bnbConnectorMetas: InContextSdkMethod<Query['mainnet_bnbConnectorMetas'], Querymainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_arbitrumConnectorMeta: InContextSdkMethod<Query['mainnet_arbitrumConnectorMeta'], Querymainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_arbitrumConnectorMetas: InContextSdkMethod<Query['mainnet_arbitrumConnectorMetas'], Querymainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_gnosisConnectorMeta: InContextSdkMethod<Query['mainnet_gnosisConnectorMeta'], Querymainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_gnosisConnectorMetas: InContextSdkMethod<Query['mainnet_gnosisConnectorMetas'], Querymainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_zkSyncConnectorMeta: InContextSdkMethod<Query['mainnet_zkSyncConnectorMeta'], Querymainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_zkSyncConnectorMetas: InContextSdkMethod<Query['mainnet_zkSyncConnectorMetas'], Querymainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_lineaConnectorMeta: InContextSdkMethod<Query['mainnet_lineaConnectorMeta'], Querymainnet_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_lineaConnectorMetas: InContextSdkMethod<Query['mainnet_lineaConnectorMetas'], Querymainnet_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageProcessed: InContextSdkMethod<Query['mainnet_rootMessageProcessed'], Querymainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageProcesseds: InContextSdkMethod<Query['mainnet_rootMessageProcesseds'], Querymainnet_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mainnet__meta: InContextSdkMethod<Query['mainnet__meta'], Querymainnet__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  mainnet_rootAggregated: InContextSdkMethod<Subscription['mainnet_rootAggregated'], Subscriptionmainnet_rootAggregatedArgs, MeshContext>,
  /** null **/
  mainnet_rootAggregateds: InContextSdkMethod<Subscription['mainnet_rootAggregateds'], Subscriptionmainnet_rootAggregatedsArgs, MeshContext>,
  /** null **/
  mainnet_rootPropagated: InContextSdkMethod<Subscription['mainnet_rootPropagated'], Subscriptionmainnet_rootPropagatedArgs, MeshContext>,
  /** null **/
  mainnet_rootPropagateds: InContextSdkMethod<Subscription['mainnet_rootPropagateds'], Subscriptionmainnet_rootPropagatedsArgs, MeshContext>,
  /** null **/
  mainnet_aggregatedMessageRoot: InContextSdkMethod<Subscription['mainnet_aggregatedMessageRoot'], Subscriptionmainnet_aggregatedMessageRootArgs, MeshContext>,
  /** null **/
  mainnet_aggregatedMessageRoots: InContextSdkMethod<Subscription['mainnet_aggregatedMessageRoots'], Subscriptionmainnet_aggregatedMessageRootsArgs, MeshContext>,
  /** null **/
  mainnet_rootManagerMeta: InContextSdkMethod<Subscription['mainnet_rootManagerMeta'], Subscriptionmainnet_rootManagerMetaArgs, MeshContext>,
  /** null **/
  mainnet_rootManagerMetas: InContextSdkMethod<Subscription['mainnet_rootManagerMetas'], Subscriptionmainnet_rootManagerMetasArgs, MeshContext>,
  /** null **/
  mainnet_polygonConnectorMeta: InContextSdkMethod<Subscription['mainnet_polygonConnectorMeta'], Subscriptionmainnet_polygonConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_polygonConnectorMetas: InContextSdkMethod<Subscription['mainnet_polygonConnectorMetas'], Subscriptionmainnet_polygonConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_optimismConnectorMeta: InContextSdkMethod<Subscription['mainnet_optimismConnectorMeta'], Subscriptionmainnet_optimismConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_optimismConnectorMetas: InContextSdkMethod<Subscription['mainnet_optimismConnectorMetas'], Subscriptionmainnet_optimismConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_bnbConnectorMeta: InContextSdkMethod<Subscription['mainnet_bnbConnectorMeta'], Subscriptionmainnet_bnbConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_bnbConnectorMetas: InContextSdkMethod<Subscription['mainnet_bnbConnectorMetas'], Subscriptionmainnet_bnbConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_arbitrumConnectorMeta: InContextSdkMethod<Subscription['mainnet_arbitrumConnectorMeta'], Subscriptionmainnet_arbitrumConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_arbitrumConnectorMetas: InContextSdkMethod<Subscription['mainnet_arbitrumConnectorMetas'], Subscriptionmainnet_arbitrumConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_gnosisConnectorMeta: InContextSdkMethod<Subscription['mainnet_gnosisConnectorMeta'], Subscriptionmainnet_gnosisConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_gnosisConnectorMetas: InContextSdkMethod<Subscription['mainnet_gnosisConnectorMetas'], Subscriptionmainnet_gnosisConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_zkSyncConnectorMeta: InContextSdkMethod<Subscription['mainnet_zkSyncConnectorMeta'], Subscriptionmainnet_zkSyncConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_zkSyncConnectorMetas: InContextSdkMethod<Subscription['mainnet_zkSyncConnectorMetas'], Subscriptionmainnet_zkSyncConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_lineaConnectorMeta: InContextSdkMethod<Subscription['mainnet_lineaConnectorMeta'], Subscriptionmainnet_lineaConnectorMetaArgs, MeshContext>,
  /** null **/
  mainnet_lineaConnectorMetas: InContextSdkMethod<Subscription['mainnet_lineaConnectorMetas'], Subscriptionmainnet_lineaConnectorMetasArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageProcessed: InContextSdkMethod<Subscription['mainnet_rootMessageProcessed'], Subscriptionmainnet_rootMessageProcessedArgs, MeshContext>,
  /** null **/
  mainnet_rootMessageProcesseds: InContextSdkMethod<Subscription['mainnet_rootMessageProcesseds'], Subscriptionmainnet_rootMessageProcessedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  mainnet__meta: InContextSdkMethod<Subscription['mainnet__meta'], Subscriptionmainnet__metaArgs, MeshContext>
  };

  export type Context = {
      ["Hub_Mainnet"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
