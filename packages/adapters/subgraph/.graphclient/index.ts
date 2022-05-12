// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  stagingkovan_BigDecimal: any;
  BigInt: any;
  stagingkovan_Bytes: any;
  kovan_BigDecimal: any;
  kovan_Bytes: any;
  stagingrinkeby_BigDecimal: any;
  stagingrinkeby_Bytes: any;
  goerli_BigDecimal: any;
  goerli_Bytes: any;
  staginggoerli_BigDecimal: any;
  staginggoerli_Bytes: any;
  rinkeby_BigDecimal: any;
  rinkeby_Bytes: any;
};

export type Query = {
  stagingkovan_asset?: Maybe<stagingkovan_Asset>;
  stagingkovan_assets: Array<stagingkovan_Asset>;
  stagingkovan_assetBalance?: Maybe<stagingkovan_AssetBalance>;
  stagingkovan_assetBalances: Array<stagingkovan_AssetBalance>;
  stagingkovan_router?: Maybe<stagingkovan_Router>;
  stagingkovan_routers: Array<stagingkovan_Router>;
  stagingkovan_originTransfer?: Maybe<stagingkovan_OriginTransfer>;
  stagingkovan_originTransfers: Array<stagingkovan_OriginTransfer>;
  stagingkovan_destinationTransfer?: Maybe<stagingkovan_DestinationTransfer>;
  stagingkovan_destinationTransfers: Array<stagingkovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingkovan__meta?: Maybe<stagingkovan__Meta_>;
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_originTransfer?: Maybe<kovan_OriginTransfer>;
  kovan_originTransfers: Array<kovan_OriginTransfer>;
  kovan_destinationTransfer?: Maybe<kovan_DestinationTransfer>;
  kovan_destinationTransfers: Array<kovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
  stagingrinkeby_asset?: Maybe<stagingrinkeby_Asset>;
  stagingrinkeby_assets: Array<stagingrinkeby_Asset>;
  stagingrinkeby_assetBalance?: Maybe<stagingrinkeby_AssetBalance>;
  stagingrinkeby_assetBalances: Array<stagingrinkeby_AssetBalance>;
  stagingrinkeby_router?: Maybe<stagingrinkeby_Router>;
  stagingrinkeby_routers: Array<stagingrinkeby_Router>;
  stagingrinkeby_originTransfer?: Maybe<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_originTransfers: Array<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_destinationTransfer?: Maybe<stagingrinkeby_DestinationTransfer>;
  stagingrinkeby_destinationTransfers: Array<stagingrinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingrinkeby__meta?: Maybe<stagingrinkeby__Meta_>;
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
  staginggoerli_asset?: Maybe<staginggoerli_Asset>;
  staginggoerli_assets: Array<staginggoerli_Asset>;
  staginggoerli_assetBalance?: Maybe<staginggoerli_AssetBalance>;
  staginggoerli_assetBalances: Array<staginggoerli_AssetBalance>;
  staginggoerli_router?: Maybe<staginggoerli_Router>;
  staginggoerli_routers: Array<staginggoerli_Router>;
  staginggoerli_originTransfer?: Maybe<staginggoerli_OriginTransfer>;
  staginggoerli_originTransfers: Array<staginggoerli_OriginTransfer>;
  staginggoerli_destinationTransfer?: Maybe<staginggoerli_DestinationTransfer>;
  staginggoerli_destinationTransfers: Array<staginggoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Querystagingkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Asset_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_OriginTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_DestinationTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan__metaArgs = {
  block?: InputMaybe<stagingkovan_Block_height>;
};


export type Querykovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Asset_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_OriginTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_DestinationTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
};


export type Querystagingrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Asset_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_OriginTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby__metaArgs = {
  block?: InputMaybe<stagingrinkeby_Block_height>;
};


export type Querygoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};


export type Querystaginggoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Asset_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OriginTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_DestinationTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};


export type Queryrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type Subscription = {
  stagingkovan_asset?: Maybe<stagingkovan_Asset>;
  stagingkovan_assets: Array<stagingkovan_Asset>;
  stagingkovan_assetBalance?: Maybe<stagingkovan_AssetBalance>;
  stagingkovan_assetBalances: Array<stagingkovan_AssetBalance>;
  stagingkovan_router?: Maybe<stagingkovan_Router>;
  stagingkovan_routers: Array<stagingkovan_Router>;
  stagingkovan_originTransfer?: Maybe<stagingkovan_OriginTransfer>;
  stagingkovan_originTransfers: Array<stagingkovan_OriginTransfer>;
  stagingkovan_destinationTransfer?: Maybe<stagingkovan_DestinationTransfer>;
  stagingkovan_destinationTransfers: Array<stagingkovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingkovan__meta?: Maybe<stagingkovan__Meta_>;
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_originTransfer?: Maybe<kovan_OriginTransfer>;
  kovan_originTransfers: Array<kovan_OriginTransfer>;
  kovan_destinationTransfer?: Maybe<kovan_DestinationTransfer>;
  kovan_destinationTransfers: Array<kovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
  stagingrinkeby_asset?: Maybe<stagingrinkeby_Asset>;
  stagingrinkeby_assets: Array<stagingrinkeby_Asset>;
  stagingrinkeby_assetBalance?: Maybe<stagingrinkeby_AssetBalance>;
  stagingrinkeby_assetBalances: Array<stagingrinkeby_AssetBalance>;
  stagingrinkeby_router?: Maybe<stagingrinkeby_Router>;
  stagingrinkeby_routers: Array<stagingrinkeby_Router>;
  stagingrinkeby_originTransfer?: Maybe<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_originTransfers: Array<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_destinationTransfer?: Maybe<stagingrinkeby_DestinationTransfer>;
  stagingrinkeby_destinationTransfers: Array<stagingrinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingrinkeby__meta?: Maybe<stagingrinkeby__Meta_>;
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
  staginggoerli_asset?: Maybe<staginggoerli_Asset>;
  staginggoerli_assets: Array<staginggoerli_Asset>;
  staginggoerli_assetBalance?: Maybe<staginggoerli_AssetBalance>;
  staginggoerli_assetBalances: Array<staginggoerli_AssetBalance>;
  staginggoerli_router?: Maybe<staginggoerli_Router>;
  staginggoerli_routers: Array<staginggoerli_Router>;
  staginggoerli_originTransfer?: Maybe<staginggoerli_OriginTransfer>;
  staginggoerli_originTransfers: Array<staginggoerli_OriginTransfer>;
  staginggoerli_destinationTransfer?: Maybe<staginggoerli_DestinationTransfer>;
  staginggoerli_destinationTransfers: Array<staginggoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Subscriptionstagingkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Asset_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_OriginTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_DestinationTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan__metaArgs = {
  block?: InputMaybe<stagingkovan_Block_height>;
};


export type Subscriptionkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Asset_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_OriginTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_DestinationTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
};


export type Subscriptionstagingrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Asset_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_OriginTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby__metaArgs = {
  block?: InputMaybe<stagingrinkeby_Block_height>;
};


export type Subscriptiongoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};


export type Subscriptionstaginggoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Asset_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OriginTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_DestinationTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};


export type Subscriptionrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type stagingkovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['stagingkovan_Bytes'];
  adoptedAsset: Scalars['stagingkovan_Bytes'];
  canonicalId: Scalars['stagingkovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingkovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingkovan_Router;
  asset: stagingkovan_Asset;
};

export type stagingkovan_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingkovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type stagingkovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingkovan_Block_height = {
  hash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingkovan_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingkovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingkovan_Bytes']>;
  callData?: Maybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingkovan_TransferStatus>;
  routers?: Maybe<Array<stagingkovan_Router>>;
  originSender?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingkovan_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
};

export type stagingkovan_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingkovan_TransferStatus>;
  status_not?: InputMaybe<stagingkovan_TransferStatus>;
  status_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingkovan_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingkovan_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingkovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingkovan_Bytes']>;
  callData?: Maybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingkovan_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingkovan_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingkovan_TransferStatus>;
  status_not?: InputMaybe<stagingkovan_TransferStatus>;
  status_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
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
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type stagingkovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingkovan_Bytes']>;
  recipient?: Maybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingkovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingkovan_AssetBalance>;
};


export type stagingkovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
};

export type stagingkovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingkovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type stagingkovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingkovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type stagingkovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingkovan__Block_;
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

export type kovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['kovan_Bytes'];
  adoptedAsset: Scalars['kovan_Bytes'];
  canonicalId: Scalars['kovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type kovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: kovan_Router;
  asset: kovan_Asset;
};

export type kovan_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type kovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['kovan_Bytes']>;
  local_not?: InputMaybe<Scalars['kovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type kovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type kovan_Block_height = {
  hash?: InputMaybe<Scalars['kovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type kovan_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  routers?: Maybe<Array<kovan_Router>>;
  originSender?: Maybe<Scalars['kovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['kovan_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type kovan_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
};

export type kovan_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_not?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type kovan_OrderDirection =
  | 'asc'
  | 'desc';

export type kovan_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['kovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['kovan_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['kovan_Bytes']>;
  transactionHash?: Maybe<Scalars['kovan_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type kovan_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['kovan_Bytes']>;
  message_not?: InputMaybe<Scalars['kovan_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  message_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
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
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type kovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['kovan_Bytes']>;
  recipient?: Maybe<Scalars['kovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['kovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<kovan_AssetBalance>;
};


export type kovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
};

export type kovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type kovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['kovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type kovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: kovan__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type stagingrinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['stagingrinkeby_Bytes'];
  adoptedAsset: Scalars['stagingrinkeby_Bytes'];
  canonicalId: Scalars['stagingrinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingrinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingrinkeby_Router;
  asset: stagingrinkeby_Asset;
};

export type stagingrinkeby_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingrinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type stagingrinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingrinkeby_Block_height = {
  hash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingrinkeby_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingrinkeby_TransferStatus>;
  routers?: Maybe<Array<stagingrinkeby_Router>>;
  originSender?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingrinkeby_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
};

export type stagingrinkeby_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_not?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingrinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingrinkeby_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingrinkeby_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingrinkeby_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_not?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
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
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type stagingrinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  recipient?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingrinkeby_AssetBalance>;
};


export type stagingrinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
};

export type stagingrinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type stagingrinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type stagingrinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type stagingrinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingrinkeby__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type goerli_Asset = {
  id: Scalars['ID'];
  local: Scalars['goerli_Bytes'];
  adoptedAsset: Scalars['goerli_Bytes'];
  canonicalId: Scalars['goerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: goerli_Router;
  asset: goerli_Asset;
};

export type goerli_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type goerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not?: InputMaybe<Scalars['goerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type goerli_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type goerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  routers?: Maybe<Array<goerli_Router>>;
  originSender?: Maybe<Scalars['goerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['goerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type goerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
};

export type goerli_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['goerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['goerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not?: InputMaybe<Scalars['goerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
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
};

export type goerli_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type goerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['goerli_Bytes']>;
  recipient?: Maybe<Scalars['goerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<goerli_AssetBalance>;
};


export type goerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
};

export type goerli_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type goerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type goerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['goerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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

export type staginggoerli_Asset = {
  id: Scalars['ID'];
  local: Scalars['staginggoerli_Bytes'];
  adoptedAsset: Scalars['staginggoerli_Bytes'];
  canonicalId: Scalars['staginggoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type staginggoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: staginggoerli_Router;
  asset: staginggoerli_Asset;
};

export type staginggoerli_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type staginggoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type staginggoerli_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type staginggoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerli_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginggoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginggoerli_Bytes']>;
  callData?: Maybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<staginggoerli_TransferStatus>;
  routers?: Maybe<Array<staginggoerli_Router>>;
  originSender?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type staginggoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
};

export type staginggoerli_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<staginggoerli_TransferStatus>;
  status_not?: InputMaybe<staginggoerli_TransferStatus>;
  status_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type staginggoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginggoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginggoerli_Bytes']>;
  callData?: Maybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<staginggoerli_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<staginggoerli_TransferStatus>;
  status_not?: InputMaybe<staginggoerli_TransferStatus>;
  status_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
};

export type staginggoerli_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type staginggoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['staginggoerli_Bytes']>;
  recipient?: Maybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['staginggoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<staginggoerli_AssetBalance>;
};


export type staginggoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
};

export type staginggoerli_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type staginggoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type staginggoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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

export type rinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['rinkeby_Bytes'];
  adoptedAsset: Scalars['rinkeby_Bytes'];
  canonicalId: Scalars['rinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type rinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: rinkeby_Router;
  asset: rinkeby_Asset;
};

export type rinkeby_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type rinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type rinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type rinkeby_Block_height = {
  hash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type rinkeby_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  routers?: Maybe<Array<rinkeby_Router>>;
  originSender?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type rinkeby_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
};

export type rinkeby_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type rinkeby_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type rinkeby_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type rinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['rinkeby_Bytes']>;
  recipient?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<rinkeby_AssetBalance>;
};


export type rinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
};

export type rinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type rinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['rinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type rinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: rinkeby__Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  stagingkovan_Asset: ResolverTypeWrapper<stagingkovan_Asset>;
  stagingkovan_AssetBalance: ResolverTypeWrapper<stagingkovan_AssetBalance>;
  stagingkovan_AssetBalance_filter: stagingkovan_AssetBalance_filter;
  stagingkovan_AssetBalance_orderBy: stagingkovan_AssetBalance_orderBy;
  stagingkovan_Asset_filter: stagingkovan_Asset_filter;
  stagingkovan_Asset_orderBy: stagingkovan_Asset_orderBy;
  stagingkovan_BigDecimal: ResolverTypeWrapper<Scalars['stagingkovan_BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  stagingkovan_BlockChangedFilter: stagingkovan_BlockChangedFilter;
  stagingkovan_Block_height: stagingkovan_Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  stagingkovan_Bytes: ResolverTypeWrapper<Scalars['stagingkovan_Bytes']>;
  stagingkovan_DestinationTransfer: ResolverTypeWrapper<stagingkovan_DestinationTransfer>;
  stagingkovan_DestinationTransfer_filter: stagingkovan_DestinationTransfer_filter;
  stagingkovan_DestinationTransfer_orderBy: stagingkovan_DestinationTransfer_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  stagingkovan_OrderDirection: stagingkovan_OrderDirection;
  stagingkovan_OriginTransfer: ResolverTypeWrapper<stagingkovan_OriginTransfer>;
  stagingkovan_OriginTransfer_filter: stagingkovan_OriginTransfer_filter;
  stagingkovan_OriginTransfer_orderBy: stagingkovan_OriginTransfer_orderBy;
  stagingkovan_Router: ResolverTypeWrapper<stagingkovan_Router>;
  stagingkovan_Router_filter: stagingkovan_Router_filter;
  stagingkovan_Router_orderBy: stagingkovan_Router_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  stagingkovan_TransferStatus: stagingkovan_TransferStatus;
  stagingkovan__Block_: ResolverTypeWrapper<stagingkovan__Block_>;
  stagingkovan__Meta_: ResolverTypeWrapper<stagingkovan__Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  kovan_Asset: ResolverTypeWrapper<kovan_Asset>;
  kovan_AssetBalance: ResolverTypeWrapper<kovan_AssetBalance>;
  kovan_AssetBalance_filter: kovan_AssetBalance_filter;
  kovan_AssetBalance_orderBy: kovan_AssetBalance_orderBy;
  kovan_Asset_filter: kovan_Asset_filter;
  kovan_Asset_orderBy: kovan_Asset_orderBy;
  kovan_BigDecimal: ResolverTypeWrapper<Scalars['kovan_BigDecimal']>;
  kovan_BlockChangedFilter: kovan_BlockChangedFilter;
  kovan_Block_height: kovan_Block_height;
  kovan_Bytes: ResolverTypeWrapper<Scalars['kovan_Bytes']>;
  kovan_DestinationTransfer: ResolverTypeWrapper<kovan_DestinationTransfer>;
  kovan_DestinationTransfer_filter: kovan_DestinationTransfer_filter;
  kovan_DestinationTransfer_orderBy: kovan_DestinationTransfer_orderBy;
  kovan_OrderDirection: kovan_OrderDirection;
  kovan_OriginTransfer: ResolverTypeWrapper<kovan_OriginTransfer>;
  kovan_OriginTransfer_filter: kovan_OriginTransfer_filter;
  kovan_OriginTransfer_orderBy: kovan_OriginTransfer_orderBy;
  kovan_Router: ResolverTypeWrapper<kovan_Router>;
  kovan_Router_filter: kovan_Router_filter;
  kovan_Router_orderBy: kovan_Router_orderBy;
  kovan_TransferStatus: kovan_TransferStatus;
  kovan__Block_: ResolverTypeWrapper<kovan__Block_>;
  kovan__Meta_: ResolverTypeWrapper<kovan__Meta_>;
  stagingrinkeby_Asset: ResolverTypeWrapper<stagingrinkeby_Asset>;
  stagingrinkeby_AssetBalance: ResolverTypeWrapper<stagingrinkeby_AssetBalance>;
  stagingrinkeby_AssetBalance_filter: stagingrinkeby_AssetBalance_filter;
  stagingrinkeby_AssetBalance_orderBy: stagingrinkeby_AssetBalance_orderBy;
  stagingrinkeby_Asset_filter: stagingrinkeby_Asset_filter;
  stagingrinkeby_Asset_orderBy: stagingrinkeby_Asset_orderBy;
  stagingrinkeby_BigDecimal: ResolverTypeWrapper<Scalars['stagingrinkeby_BigDecimal']>;
  stagingrinkeby_BlockChangedFilter: stagingrinkeby_BlockChangedFilter;
  stagingrinkeby_Block_height: stagingrinkeby_Block_height;
  stagingrinkeby_Bytes: ResolverTypeWrapper<Scalars['stagingrinkeby_Bytes']>;
  stagingrinkeby_DestinationTransfer: ResolverTypeWrapper<stagingrinkeby_DestinationTransfer>;
  stagingrinkeby_DestinationTransfer_filter: stagingrinkeby_DestinationTransfer_filter;
  stagingrinkeby_DestinationTransfer_orderBy: stagingrinkeby_DestinationTransfer_orderBy;
  stagingrinkeby_OrderDirection: stagingrinkeby_OrderDirection;
  stagingrinkeby_OriginTransfer: ResolverTypeWrapper<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_OriginTransfer_filter: stagingrinkeby_OriginTransfer_filter;
  stagingrinkeby_OriginTransfer_orderBy: stagingrinkeby_OriginTransfer_orderBy;
  stagingrinkeby_Router: ResolverTypeWrapper<stagingrinkeby_Router>;
  stagingrinkeby_Router_filter: stagingrinkeby_Router_filter;
  stagingrinkeby_Router_orderBy: stagingrinkeby_Router_orderBy;
  stagingrinkeby_TransferStatus: stagingrinkeby_TransferStatus;
  stagingrinkeby__Block_: ResolverTypeWrapper<stagingrinkeby__Block_>;
  stagingrinkeby__Meta_: ResolverTypeWrapper<stagingrinkeby__Meta_>;
  goerli_Asset: ResolverTypeWrapper<goerli_Asset>;
  goerli_AssetBalance: ResolverTypeWrapper<goerli_AssetBalance>;
  goerli_AssetBalance_filter: goerli_AssetBalance_filter;
  goerli_AssetBalance_orderBy: goerli_AssetBalance_orderBy;
  goerli_Asset_filter: goerli_Asset_filter;
  goerli_Asset_orderBy: goerli_Asset_orderBy;
  goerli_BigDecimal: ResolverTypeWrapper<Scalars['goerli_BigDecimal']>;
  goerli_BlockChangedFilter: goerli_BlockChangedFilter;
  goerli_Block_height: goerli_Block_height;
  goerli_Bytes: ResolverTypeWrapper<Scalars['goerli_Bytes']>;
  goerli_DestinationTransfer: ResolverTypeWrapper<goerli_DestinationTransfer>;
  goerli_DestinationTransfer_filter: goerli_DestinationTransfer_filter;
  goerli_DestinationTransfer_orderBy: goerli_DestinationTransfer_orderBy;
  goerli_OrderDirection: goerli_OrderDirection;
  goerli_OriginTransfer: ResolverTypeWrapper<goerli_OriginTransfer>;
  goerli_OriginTransfer_filter: goerli_OriginTransfer_filter;
  goerli_OriginTransfer_orderBy: goerli_OriginTransfer_orderBy;
  goerli_Router: ResolverTypeWrapper<goerli_Router>;
  goerli_Router_filter: goerli_Router_filter;
  goerli_Router_orderBy: goerli_Router_orderBy;
  goerli_TransferStatus: goerli_TransferStatus;
  goerli__Block_: ResolverTypeWrapper<goerli__Block_>;
  goerli__Meta_: ResolverTypeWrapper<goerli__Meta_>;
  staginggoerli_Asset: ResolverTypeWrapper<staginggoerli_Asset>;
  staginggoerli_AssetBalance: ResolverTypeWrapper<staginggoerli_AssetBalance>;
  staginggoerli_AssetBalance_filter: staginggoerli_AssetBalance_filter;
  staginggoerli_AssetBalance_orderBy: staginggoerli_AssetBalance_orderBy;
  staginggoerli_Asset_filter: staginggoerli_Asset_filter;
  staginggoerli_Asset_orderBy: staginggoerli_Asset_orderBy;
  staginggoerli_BigDecimal: ResolverTypeWrapper<Scalars['staginggoerli_BigDecimal']>;
  staginggoerli_BlockChangedFilter: staginggoerli_BlockChangedFilter;
  staginggoerli_Block_height: staginggoerli_Block_height;
  staginggoerli_Bytes: ResolverTypeWrapper<Scalars['staginggoerli_Bytes']>;
  staginggoerli_DestinationTransfer: ResolverTypeWrapper<staginggoerli_DestinationTransfer>;
  staginggoerli_DestinationTransfer_filter: staginggoerli_DestinationTransfer_filter;
  staginggoerli_DestinationTransfer_orderBy: staginggoerli_DestinationTransfer_orderBy;
  staginggoerli_OrderDirection: staginggoerli_OrderDirection;
  staginggoerli_OriginTransfer: ResolverTypeWrapper<staginggoerli_OriginTransfer>;
  staginggoerli_OriginTransfer_filter: staginggoerli_OriginTransfer_filter;
  staginggoerli_OriginTransfer_orderBy: staginggoerli_OriginTransfer_orderBy;
  staginggoerli_Router: ResolverTypeWrapper<staginggoerli_Router>;
  staginggoerli_Router_filter: staginggoerli_Router_filter;
  staginggoerli_Router_orderBy: staginggoerli_Router_orderBy;
  staginggoerli_TransferStatus: staginggoerli_TransferStatus;
  staginggoerli__Block_: ResolverTypeWrapper<staginggoerli__Block_>;
  staginggoerli__Meta_: ResolverTypeWrapper<staginggoerli__Meta_>;
  rinkeby_Asset: ResolverTypeWrapper<rinkeby_Asset>;
  rinkeby_AssetBalance: ResolverTypeWrapper<rinkeby_AssetBalance>;
  rinkeby_AssetBalance_filter: rinkeby_AssetBalance_filter;
  rinkeby_AssetBalance_orderBy: rinkeby_AssetBalance_orderBy;
  rinkeby_Asset_filter: rinkeby_Asset_filter;
  rinkeby_Asset_orderBy: rinkeby_Asset_orderBy;
  rinkeby_BigDecimal: ResolverTypeWrapper<Scalars['rinkeby_BigDecimal']>;
  rinkeby_BlockChangedFilter: rinkeby_BlockChangedFilter;
  rinkeby_Block_height: rinkeby_Block_height;
  rinkeby_Bytes: ResolverTypeWrapper<Scalars['rinkeby_Bytes']>;
  rinkeby_DestinationTransfer: ResolverTypeWrapper<rinkeby_DestinationTransfer>;
  rinkeby_DestinationTransfer_filter: rinkeby_DestinationTransfer_filter;
  rinkeby_DestinationTransfer_orderBy: rinkeby_DestinationTransfer_orderBy;
  rinkeby_OrderDirection: rinkeby_OrderDirection;
  rinkeby_OriginTransfer: ResolverTypeWrapper<rinkeby_OriginTransfer>;
  rinkeby_OriginTransfer_filter: rinkeby_OriginTransfer_filter;
  rinkeby_OriginTransfer_orderBy: rinkeby_OriginTransfer_orderBy;
  rinkeby_Router: ResolverTypeWrapper<rinkeby_Router>;
  rinkeby_Router_filter: rinkeby_Router_filter;
  rinkeby_Router_orderBy: rinkeby_Router_orderBy;
  rinkeby_TransferStatus: rinkeby_TransferStatus;
  rinkeby__Block_: ResolverTypeWrapper<rinkeby__Block_>;
  rinkeby__Meta_: ResolverTypeWrapper<rinkeby__Meta_>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  stagingkovan_Asset: stagingkovan_Asset;
  stagingkovan_AssetBalance: stagingkovan_AssetBalance;
  stagingkovan_AssetBalance_filter: stagingkovan_AssetBalance_filter;
  stagingkovan_Asset_filter: stagingkovan_Asset_filter;
  stagingkovan_BigDecimal: Scalars['stagingkovan_BigDecimal'];
  BigInt: Scalars['BigInt'];
  stagingkovan_BlockChangedFilter: stagingkovan_BlockChangedFilter;
  stagingkovan_Block_height: stagingkovan_Block_height;
  Boolean: Scalars['Boolean'];
  stagingkovan_Bytes: Scalars['stagingkovan_Bytes'];
  stagingkovan_DestinationTransfer: stagingkovan_DestinationTransfer;
  stagingkovan_DestinationTransfer_filter: stagingkovan_DestinationTransfer_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  stagingkovan_OriginTransfer: stagingkovan_OriginTransfer;
  stagingkovan_OriginTransfer_filter: stagingkovan_OriginTransfer_filter;
  stagingkovan_Router: stagingkovan_Router;
  stagingkovan_Router_filter: stagingkovan_Router_filter;
  String: Scalars['String'];
  stagingkovan__Block_: stagingkovan__Block_;
  stagingkovan__Meta_: stagingkovan__Meta_;
  kovan_Asset: kovan_Asset;
  kovan_AssetBalance: kovan_AssetBalance;
  kovan_AssetBalance_filter: kovan_AssetBalance_filter;
  kovan_Asset_filter: kovan_Asset_filter;
  kovan_BigDecimal: Scalars['kovan_BigDecimal'];
  kovan_BlockChangedFilter: kovan_BlockChangedFilter;
  kovan_Block_height: kovan_Block_height;
  kovan_Bytes: Scalars['kovan_Bytes'];
  kovan_DestinationTransfer: kovan_DestinationTransfer;
  kovan_DestinationTransfer_filter: kovan_DestinationTransfer_filter;
  kovan_OriginTransfer: kovan_OriginTransfer;
  kovan_OriginTransfer_filter: kovan_OriginTransfer_filter;
  kovan_Router: kovan_Router;
  kovan_Router_filter: kovan_Router_filter;
  kovan__Block_: kovan__Block_;
  kovan__Meta_: kovan__Meta_;
  stagingrinkeby_Asset: stagingrinkeby_Asset;
  stagingrinkeby_AssetBalance: stagingrinkeby_AssetBalance;
  stagingrinkeby_AssetBalance_filter: stagingrinkeby_AssetBalance_filter;
  stagingrinkeby_Asset_filter: stagingrinkeby_Asset_filter;
  stagingrinkeby_BigDecimal: Scalars['stagingrinkeby_BigDecimal'];
  stagingrinkeby_BlockChangedFilter: stagingrinkeby_BlockChangedFilter;
  stagingrinkeby_Block_height: stagingrinkeby_Block_height;
  stagingrinkeby_Bytes: Scalars['stagingrinkeby_Bytes'];
  stagingrinkeby_DestinationTransfer: stagingrinkeby_DestinationTransfer;
  stagingrinkeby_DestinationTransfer_filter: stagingrinkeby_DestinationTransfer_filter;
  stagingrinkeby_OriginTransfer: stagingrinkeby_OriginTransfer;
  stagingrinkeby_OriginTransfer_filter: stagingrinkeby_OriginTransfer_filter;
  stagingrinkeby_Router: stagingrinkeby_Router;
  stagingrinkeby_Router_filter: stagingrinkeby_Router_filter;
  stagingrinkeby__Block_: stagingrinkeby__Block_;
  stagingrinkeby__Meta_: stagingrinkeby__Meta_;
  goerli_Asset: goerli_Asset;
  goerli_AssetBalance: goerli_AssetBalance;
  goerli_AssetBalance_filter: goerli_AssetBalance_filter;
  goerli_Asset_filter: goerli_Asset_filter;
  goerli_BigDecimal: Scalars['goerli_BigDecimal'];
  goerli_BlockChangedFilter: goerli_BlockChangedFilter;
  goerli_Block_height: goerli_Block_height;
  goerli_Bytes: Scalars['goerli_Bytes'];
  goerli_DestinationTransfer: goerli_DestinationTransfer;
  goerli_DestinationTransfer_filter: goerli_DestinationTransfer_filter;
  goerli_OriginTransfer: goerli_OriginTransfer;
  goerli_OriginTransfer_filter: goerli_OriginTransfer_filter;
  goerli_Router: goerli_Router;
  goerli_Router_filter: goerli_Router_filter;
  goerli__Block_: goerli__Block_;
  goerli__Meta_: goerli__Meta_;
  staginggoerli_Asset: staginggoerli_Asset;
  staginggoerli_AssetBalance: staginggoerli_AssetBalance;
  staginggoerli_AssetBalance_filter: staginggoerli_AssetBalance_filter;
  staginggoerli_Asset_filter: staginggoerli_Asset_filter;
  staginggoerli_BigDecimal: Scalars['staginggoerli_BigDecimal'];
  staginggoerli_BlockChangedFilter: staginggoerli_BlockChangedFilter;
  staginggoerli_Block_height: staginggoerli_Block_height;
  staginggoerli_Bytes: Scalars['staginggoerli_Bytes'];
  staginggoerli_DestinationTransfer: staginggoerli_DestinationTransfer;
  staginggoerli_DestinationTransfer_filter: staginggoerli_DestinationTransfer_filter;
  staginggoerli_OriginTransfer: staginggoerli_OriginTransfer;
  staginggoerli_OriginTransfer_filter: staginggoerli_OriginTransfer_filter;
  staginggoerli_Router: staginggoerli_Router;
  staginggoerli_Router_filter: staginggoerli_Router_filter;
  staginggoerli__Block_: staginggoerli__Block_;
  staginggoerli__Meta_: staginggoerli__Meta_;
  rinkeby_Asset: rinkeby_Asset;
  rinkeby_AssetBalance: rinkeby_AssetBalance;
  rinkeby_AssetBalance_filter: rinkeby_AssetBalance_filter;
  rinkeby_Asset_filter: rinkeby_Asset_filter;
  rinkeby_BigDecimal: Scalars['rinkeby_BigDecimal'];
  rinkeby_BlockChangedFilter: rinkeby_BlockChangedFilter;
  rinkeby_Block_height: rinkeby_Block_height;
  rinkeby_Bytes: Scalars['rinkeby_Bytes'];
  rinkeby_DestinationTransfer: rinkeby_DestinationTransfer;
  rinkeby_DestinationTransfer_filter: rinkeby_DestinationTransfer_filter;
  rinkeby_OriginTransfer: rinkeby_OriginTransfer;
  rinkeby_OriginTransfer_filter: rinkeby_OriginTransfer_filter;
  rinkeby_Router: rinkeby_Router;
  rinkeby_Router_filter: rinkeby_Router_filter;
  rinkeby__Block_: rinkeby__Block_;
  rinkeby__Meta_: rinkeby__Meta_;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  stagingkovan_asset?: Resolver<Maybe<ResolversTypes['stagingkovan_Asset']>, ParentType, ContextType, RequireFields<Querystagingkovan_assetArgs, 'id' | 'subgraphError'>>;
  stagingkovan_assets?: Resolver<Array<ResolversTypes['stagingkovan_Asset']>, ParentType, ContextType, RequireFields<Querystagingkovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_assetBalance?: Resolver<Maybe<ResolversTypes['stagingkovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querystagingkovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  stagingkovan_assetBalances?: Resolver<Array<ResolversTypes['stagingkovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querystagingkovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_router?: Resolver<Maybe<ResolversTypes['stagingkovan_Router']>, ParentType, ContextType, RequireFields<Querystagingkovan_routerArgs, 'id' | 'subgraphError'>>;
  stagingkovan_routers?: Resolver<Array<ResolversTypes['stagingkovan_Router']>, ParentType, ContextType, RequireFields<Querystagingkovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_originTransfer?: Resolver<Maybe<ResolversTypes['stagingkovan_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystagingkovan_originTransferArgs, 'id' | 'subgraphError'>>;
  stagingkovan_originTransfers?: Resolver<Array<ResolversTypes['stagingkovan_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystagingkovan_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_destinationTransfer?: Resolver<Maybe<ResolversTypes['stagingkovan_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystagingkovan_destinationTransferArgs, 'id' | 'subgraphError'>>;
  stagingkovan_destinationTransfers?: Resolver<Array<ResolversTypes['stagingkovan_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystagingkovan_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan__meta?: Resolver<Maybe<ResolversTypes['stagingkovan__Meta_']>, ParentType, ContextType, Partial<Querystagingkovan__metaArgs>>;
  kovan_asset?: Resolver<Maybe<ResolversTypes['kovan_Asset']>, ParentType, ContextType, RequireFields<Querykovan_assetArgs, 'id' | 'subgraphError'>>;
  kovan_assets?: Resolver<Array<ResolversTypes['kovan_Asset']>, ParentType, ContextType, RequireFields<Querykovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_assetBalance?: Resolver<Maybe<ResolversTypes['kovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querykovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  kovan_assetBalances?: Resolver<Array<ResolversTypes['kovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querykovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_router?: Resolver<Maybe<ResolversTypes['kovan_Router']>, ParentType, ContextType, RequireFields<Querykovan_routerArgs, 'id' | 'subgraphError'>>;
  kovan_routers?: Resolver<Array<ResolversTypes['kovan_Router']>, ParentType, ContextType, RequireFields<Querykovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_originTransfer?: Resolver<Maybe<ResolversTypes['kovan_OriginTransfer']>, ParentType, ContextType, RequireFields<Querykovan_originTransferArgs, 'id' | 'subgraphError'>>;
  kovan_originTransfers?: Resolver<Array<ResolversTypes['kovan_OriginTransfer']>, ParentType, ContextType, RequireFields<Querykovan_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_destinationTransfer?: Resolver<Maybe<ResolversTypes['kovan_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querykovan_destinationTransferArgs, 'id' | 'subgraphError'>>;
  kovan_destinationTransfers?: Resolver<Array<ResolversTypes['kovan_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querykovan_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan__meta?: Resolver<Maybe<ResolversTypes['kovan__Meta_']>, ParentType, ContextType, Partial<Querykovan__metaArgs>>;
  stagingrinkeby_asset?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Asset']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_assets?: Resolver<Array<ResolversTypes['stagingrinkeby_Asset']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_assetBalance?: Resolver<Maybe<ResolversTypes['stagingrinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_assetBalances?: Resolver<Array<ResolversTypes['stagingrinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_router?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Router']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_routers?: Resolver<Array<ResolversTypes['stagingrinkeby_Router']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_originTransfer?: Resolver<Maybe<ResolversTypes['stagingrinkeby_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_originTransferArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_originTransfers?: Resolver<Array<ResolversTypes['stagingrinkeby_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_destinationTransfer?: Resolver<Maybe<ResolversTypes['stagingrinkeby_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_destinationTransferArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_destinationTransfers?: Resolver<Array<ResolversTypes['stagingrinkeby_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystagingrinkeby_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby__meta?: Resolver<Maybe<ResolversTypes['stagingrinkeby__Meta_']>, ParentType, ContextType, Partial<Querystagingrinkeby__metaArgs>>;
  goerli_asset?: Resolver<Maybe<ResolversTypes['goerli_Asset']>, ParentType, ContextType, RequireFields<Querygoerli_assetArgs, 'id' | 'subgraphError'>>;
  goerli_assets?: Resolver<Array<ResolversTypes['goerli_Asset']>, ParentType, ContextType, RequireFields<Querygoerli_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_assetBalance?: Resolver<Maybe<ResolversTypes['goerli_AssetBalance']>, ParentType, ContextType, RequireFields<Querygoerli_assetBalanceArgs, 'id' | 'subgraphError'>>;
  goerli_assetBalances?: Resolver<Array<ResolversTypes['goerli_AssetBalance']>, ParentType, ContextType, RequireFields<Querygoerli_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_router?: Resolver<Maybe<ResolversTypes['goerli_Router']>, ParentType, ContextType, RequireFields<Querygoerli_routerArgs, 'id' | 'subgraphError'>>;
  goerli_routers?: Resolver<Array<ResolversTypes['goerli_Router']>, ParentType, ContextType, RequireFields<Querygoerli_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_originTransfer?: Resolver<Maybe<ResolversTypes['goerli_OriginTransfer']>, ParentType, ContextType, RequireFields<Querygoerli_originTransferArgs, 'id' | 'subgraphError'>>;
  goerli_originTransfers?: Resolver<Array<ResolversTypes['goerli_OriginTransfer']>, ParentType, ContextType, RequireFields<Querygoerli_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_destinationTransfer?: Resolver<Maybe<ResolversTypes['goerli_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querygoerli_destinationTransferArgs, 'id' | 'subgraphError'>>;
  goerli_destinationTransfers?: Resolver<Array<ResolversTypes['goerli_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querygoerli_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli__meta?: Resolver<Maybe<ResolversTypes['goerli__Meta_']>, ParentType, ContextType, Partial<Querygoerli__metaArgs>>;
  staginggoerli_asset?: Resolver<Maybe<ResolversTypes['staginggoerli_Asset']>, ParentType, ContextType, RequireFields<Querystaginggoerli_assetArgs, 'id' | 'subgraphError'>>;
  staginggoerli_assets?: Resolver<Array<ResolversTypes['staginggoerli_Asset']>, ParentType, ContextType, RequireFields<Querystaginggoerli_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_assetBalance?: Resolver<Maybe<ResolversTypes['staginggoerli_AssetBalance']>, ParentType, ContextType, RequireFields<Querystaginggoerli_assetBalanceArgs, 'id' | 'subgraphError'>>;
  staginggoerli_assetBalances?: Resolver<Array<ResolversTypes['staginggoerli_AssetBalance']>, ParentType, ContextType, RequireFields<Querystaginggoerli_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_router?: Resolver<Maybe<ResolversTypes['staginggoerli_Router']>, ParentType, ContextType, RequireFields<Querystaginggoerli_routerArgs, 'id' | 'subgraphError'>>;
  staginggoerli_routers?: Resolver<Array<ResolversTypes['staginggoerli_Router']>, ParentType, ContextType, RequireFields<Querystaginggoerli_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_originTransfer?: Resolver<Maybe<ResolversTypes['staginggoerli_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystaginggoerli_originTransferArgs, 'id' | 'subgraphError'>>;
  staginggoerli_originTransfers?: Resolver<Array<ResolversTypes['staginggoerli_OriginTransfer']>, ParentType, ContextType, RequireFields<Querystaginggoerli_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_destinationTransfer?: Resolver<Maybe<ResolversTypes['staginggoerli_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystaginggoerli_destinationTransferArgs, 'id' | 'subgraphError'>>;
  staginggoerli_destinationTransfers?: Resolver<Array<ResolversTypes['staginggoerli_DestinationTransfer']>, ParentType, ContextType, RequireFields<Querystaginggoerli_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli__meta?: Resolver<Maybe<ResolversTypes['staginggoerli__Meta_']>, ParentType, ContextType, Partial<Querystaginggoerli__metaArgs>>;
  rinkeby_asset?: Resolver<Maybe<ResolversTypes['rinkeby_Asset']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  rinkeby_assets?: Resolver<Array<ResolversTypes['rinkeby_Asset']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_assetBalance?: Resolver<Maybe<ResolversTypes['rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  rinkeby_assetBalances?: Resolver<Array<ResolversTypes['rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_router?: Resolver<Maybe<ResolversTypes['rinkeby_Router']>, ParentType, ContextType, RequireFields<Queryrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  rinkeby_routers?: Resolver<Array<ResolversTypes['rinkeby_Router']>, ParentType, ContextType, RequireFields<Queryrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_originTransfer?: Resolver<Maybe<ResolversTypes['rinkeby_OriginTransfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_originTransferArgs, 'id' | 'subgraphError'>>;
  rinkeby_originTransfers?: Resolver<Array<ResolversTypes['rinkeby_OriginTransfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_destinationTransfer?: Resolver<Maybe<ResolversTypes['rinkeby_DestinationTransfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_destinationTransferArgs, 'id' | 'subgraphError'>>;
  rinkeby_destinationTransfers?: Resolver<Array<ResolversTypes['rinkeby_DestinationTransfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby__meta?: Resolver<Maybe<ResolversTypes['rinkeby__Meta_']>, ParentType, ContextType, Partial<Queryrinkeby__metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  stagingkovan_asset?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan_Asset']>, "stagingkovan_asset", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_assetArgs, 'id' | 'subgraphError'>>;
  stagingkovan_assets?: SubscriptionResolver<Array<ResolversTypes['stagingkovan_Asset']>, "stagingkovan_assets", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan_AssetBalance']>, "stagingkovan_assetBalance", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  stagingkovan_assetBalances?: SubscriptionResolver<Array<ResolversTypes['stagingkovan_AssetBalance']>, "stagingkovan_assetBalances", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_router?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan_Router']>, "stagingkovan_router", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_routerArgs, 'id' | 'subgraphError'>>;
  stagingkovan_routers?: SubscriptionResolver<Array<ResolversTypes['stagingkovan_Router']>, "stagingkovan_routers", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan_OriginTransfer']>, "stagingkovan_originTransfer", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_originTransferArgs, 'id' | 'subgraphError'>>;
  stagingkovan_originTransfers?: SubscriptionResolver<Array<ResolversTypes['stagingkovan_OriginTransfer']>, "stagingkovan_originTransfers", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan_DestinationTransfer']>, "stagingkovan_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_destinationTransferArgs, 'id' | 'subgraphError'>>;
  stagingkovan_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['stagingkovan_DestinationTransfer']>, "stagingkovan_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptionstagingkovan_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingkovan__meta?: SubscriptionResolver<Maybe<ResolversTypes['stagingkovan__Meta_']>, "stagingkovan__meta", ParentType, ContextType, Partial<Subscriptionstagingkovan__metaArgs>>;
  kovan_asset?: SubscriptionResolver<Maybe<ResolversTypes['kovan_Asset']>, "kovan_asset", ParentType, ContextType, RequireFields<Subscriptionkovan_assetArgs, 'id' | 'subgraphError'>>;
  kovan_assets?: SubscriptionResolver<Array<ResolversTypes['kovan_Asset']>, "kovan_assets", ParentType, ContextType, RequireFields<Subscriptionkovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['kovan_AssetBalance']>, "kovan_assetBalance", ParentType, ContextType, RequireFields<Subscriptionkovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  kovan_assetBalances?: SubscriptionResolver<Array<ResolversTypes['kovan_AssetBalance']>, "kovan_assetBalances", ParentType, ContextType, RequireFields<Subscriptionkovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_router?: SubscriptionResolver<Maybe<ResolversTypes['kovan_Router']>, "kovan_router", ParentType, ContextType, RequireFields<Subscriptionkovan_routerArgs, 'id' | 'subgraphError'>>;
  kovan_routers?: SubscriptionResolver<Array<ResolversTypes['kovan_Router']>, "kovan_routers", ParentType, ContextType, RequireFields<Subscriptionkovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['kovan_OriginTransfer']>, "kovan_originTransfer", ParentType, ContextType, RequireFields<Subscriptionkovan_originTransferArgs, 'id' | 'subgraphError'>>;
  kovan_originTransfers?: SubscriptionResolver<Array<ResolversTypes['kovan_OriginTransfer']>, "kovan_originTransfers", ParentType, ContextType, RequireFields<Subscriptionkovan_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['kovan_DestinationTransfer']>, "kovan_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptionkovan_destinationTransferArgs, 'id' | 'subgraphError'>>;
  kovan_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['kovan_DestinationTransfer']>, "kovan_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptionkovan_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan__meta?: SubscriptionResolver<Maybe<ResolversTypes['kovan__Meta_']>, "kovan__meta", ParentType, ContextType, Partial<Subscriptionkovan__metaArgs>>;
  stagingrinkeby_asset?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby_Asset']>, "stagingrinkeby_asset", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_assets?: SubscriptionResolver<Array<ResolversTypes['stagingrinkeby_Asset']>, "stagingrinkeby_assets", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby_AssetBalance']>, "stagingrinkeby_assetBalance", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_assetBalances?: SubscriptionResolver<Array<ResolversTypes['stagingrinkeby_AssetBalance']>, "stagingrinkeby_assetBalances", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_router?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby_Router']>, "stagingrinkeby_router", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_routers?: SubscriptionResolver<Array<ResolversTypes['stagingrinkeby_Router']>, "stagingrinkeby_routers", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby_OriginTransfer']>, "stagingrinkeby_originTransfer", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_originTransferArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_originTransfers?: SubscriptionResolver<Array<ResolversTypes['stagingrinkeby_OriginTransfer']>, "stagingrinkeby_originTransfers", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby_DestinationTransfer']>, "stagingrinkeby_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_destinationTransferArgs, 'id' | 'subgraphError'>>;
  stagingrinkeby_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['stagingrinkeby_DestinationTransfer']>, "stagingrinkeby_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptionstagingrinkeby_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  stagingrinkeby__meta?: SubscriptionResolver<Maybe<ResolversTypes['stagingrinkeby__Meta_']>, "stagingrinkeby__meta", ParentType, ContextType, Partial<Subscriptionstagingrinkeby__metaArgs>>;
  goerli_asset?: SubscriptionResolver<Maybe<ResolversTypes['goerli_Asset']>, "goerli_asset", ParentType, ContextType, RequireFields<Subscriptiongoerli_assetArgs, 'id' | 'subgraphError'>>;
  goerli_assets?: SubscriptionResolver<Array<ResolversTypes['goerli_Asset']>, "goerli_assets", ParentType, ContextType, RequireFields<Subscriptiongoerli_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['goerli_AssetBalance']>, "goerli_assetBalance", ParentType, ContextType, RequireFields<Subscriptiongoerli_assetBalanceArgs, 'id' | 'subgraphError'>>;
  goerli_assetBalances?: SubscriptionResolver<Array<ResolversTypes['goerli_AssetBalance']>, "goerli_assetBalances", ParentType, ContextType, RequireFields<Subscriptiongoerli_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_router?: SubscriptionResolver<Maybe<ResolversTypes['goerli_Router']>, "goerli_router", ParentType, ContextType, RequireFields<Subscriptiongoerli_routerArgs, 'id' | 'subgraphError'>>;
  goerli_routers?: SubscriptionResolver<Array<ResolversTypes['goerli_Router']>, "goerli_routers", ParentType, ContextType, RequireFields<Subscriptiongoerli_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['goerli_OriginTransfer']>, "goerli_originTransfer", ParentType, ContextType, RequireFields<Subscriptiongoerli_originTransferArgs, 'id' | 'subgraphError'>>;
  goerli_originTransfers?: SubscriptionResolver<Array<ResolversTypes['goerli_OriginTransfer']>, "goerli_originTransfers", ParentType, ContextType, RequireFields<Subscriptiongoerli_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['goerli_DestinationTransfer']>, "goerli_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptiongoerli_destinationTransferArgs, 'id' | 'subgraphError'>>;
  goerli_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['goerli_DestinationTransfer']>, "goerli_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptiongoerli_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  goerli__meta?: SubscriptionResolver<Maybe<ResolversTypes['goerli__Meta_']>, "goerli__meta", ParentType, ContextType, Partial<Subscriptiongoerli__metaArgs>>;
  staginggoerli_asset?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli_Asset']>, "staginggoerli_asset", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_assetArgs, 'id' | 'subgraphError'>>;
  staginggoerli_assets?: SubscriptionResolver<Array<ResolversTypes['staginggoerli_Asset']>, "staginggoerli_assets", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli_AssetBalance']>, "staginggoerli_assetBalance", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_assetBalanceArgs, 'id' | 'subgraphError'>>;
  staginggoerli_assetBalances?: SubscriptionResolver<Array<ResolversTypes['staginggoerli_AssetBalance']>, "staginggoerli_assetBalances", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_router?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli_Router']>, "staginggoerli_router", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_routerArgs, 'id' | 'subgraphError'>>;
  staginggoerli_routers?: SubscriptionResolver<Array<ResolversTypes['staginggoerli_Router']>, "staginggoerli_routers", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli_OriginTransfer']>, "staginggoerli_originTransfer", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_originTransferArgs, 'id' | 'subgraphError'>>;
  staginggoerli_originTransfers?: SubscriptionResolver<Array<ResolversTypes['staginggoerli_OriginTransfer']>, "staginggoerli_originTransfers", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli_DestinationTransfer']>, "staginggoerli_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_destinationTransferArgs, 'id' | 'subgraphError'>>;
  staginggoerli_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['staginggoerli_DestinationTransfer']>, "staginggoerli_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptionstaginggoerli_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staginggoerli__meta?: SubscriptionResolver<Maybe<ResolversTypes['staginggoerli__Meta_']>, "staginggoerli__meta", ParentType, ContextType, Partial<Subscriptionstaginggoerli__metaArgs>>;
  rinkeby_asset?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_Asset']>, "rinkeby_asset", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  rinkeby_assets?: SubscriptionResolver<Array<ResolversTypes['rinkeby_Asset']>, "rinkeby_assets", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_AssetBalance']>, "rinkeby_assetBalance", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  rinkeby_assetBalances?: SubscriptionResolver<Array<ResolversTypes['rinkeby_AssetBalance']>, "rinkeby_assetBalances", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_router?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_Router']>, "rinkeby_router", ParentType, ContextType, RequireFields<Subscriptionrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  rinkeby_routers?: SubscriptionResolver<Array<ResolversTypes['rinkeby_Router']>, "rinkeby_routers", ParentType, ContextType, RequireFields<Subscriptionrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_originTransfer?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_OriginTransfer']>, "rinkeby_originTransfer", ParentType, ContextType, RequireFields<Subscriptionrinkeby_originTransferArgs, 'id' | 'subgraphError'>>;
  rinkeby_originTransfers?: SubscriptionResolver<Array<ResolversTypes['rinkeby_OriginTransfer']>, "rinkeby_originTransfers", ParentType, ContextType, RequireFields<Subscriptionrinkeby_originTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_destinationTransfer?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_DestinationTransfer']>, "rinkeby_destinationTransfer", ParentType, ContextType, RequireFields<Subscriptionrinkeby_destinationTransferArgs, 'id' | 'subgraphError'>>;
  rinkeby_destinationTransfers?: SubscriptionResolver<Array<ResolversTypes['rinkeby_DestinationTransfer']>, "rinkeby_destinationTransfers", ParentType, ContextType, RequireFields<Subscriptionrinkeby_destinationTransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby__meta?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby__Meta_']>, "rinkeby__meta", ParentType, ContextType, Partial<Subscriptionrinkeby__metaArgs>>;
}>;

export type stagingkovan_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan_Asset'] = ResolversParentTypes['stagingkovan_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['stagingkovan_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['stagingkovan_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['stagingkovan_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingkovan_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan_AssetBalance'] = ResolversParentTypes['stagingkovan_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['stagingkovan_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['stagingkovan_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface stagingkovan_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['stagingkovan_BigDecimal'], any> {
  name: 'stagingkovan_BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface stagingkovan_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['stagingkovan_Bytes'], any> {
  name: 'stagingkovan_Bytes';
}

export type stagingkovan_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan_DestinationTransfer'] = ResolversParentTypes['stagingkovan_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['stagingkovan_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['stagingkovan_Router']>>, ParentType, ContextType, RequireFields<stagingkovan_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingkovan_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan_OriginTransfer'] = ResolversParentTypes['stagingkovan_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['stagingkovan_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingkovan_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan_Router'] = ResolversParentTypes['stagingkovan_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['stagingkovan_AssetBalance']>, ParentType, ContextType, RequireFields<stagingkovan_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingkovan__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan__Block_'] = ResolversParentTypes['stagingkovan__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['stagingkovan_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingkovan__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingkovan__Meta_'] = ResolversParentTypes['stagingkovan__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['stagingkovan__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_Asset'] = ResolversParentTypes['kovan_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['kovan_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['kovan_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['kovan_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_AssetBalance'] = ResolversParentTypes['kovan_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['kovan_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['kovan_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface kovan_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['kovan_BigDecimal'], any> {
  name: 'kovan_BigDecimal';
}

export interface kovan_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['kovan_Bytes'], any> {
  name: 'kovan_Bytes';
}

export type kovan_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_DestinationTransfer'] = ResolversParentTypes['kovan_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['kovan_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['kovan_Router']>>, ParentType, ContextType, RequireFields<kovan_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_OriginTransfer'] = ResolversParentTypes['kovan_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['kovan_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_Router'] = ResolversParentTypes['kovan_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['kovan_AssetBalance']>, ParentType, ContextType, RequireFields<kovan_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan__Block_'] = ResolversParentTypes['kovan__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type kovan__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan__Meta_'] = ResolversParentTypes['kovan__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['kovan__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby_Asset'] = ResolversParentTypes['stagingrinkeby_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['stagingrinkeby_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['stagingrinkeby_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['stagingrinkeby_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby_AssetBalance'] = ResolversParentTypes['stagingrinkeby_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['stagingrinkeby_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['stagingrinkeby_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface stagingrinkeby_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['stagingrinkeby_BigDecimal'], any> {
  name: 'stagingrinkeby_BigDecimal';
}

export interface stagingrinkeby_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['stagingrinkeby_Bytes'], any> {
  name: 'stagingrinkeby_Bytes';
}

export type stagingrinkeby_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby_DestinationTransfer'] = ResolversParentTypes['stagingrinkeby_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['stagingrinkeby_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['stagingrinkeby_Router']>>, ParentType, ContextType, RequireFields<stagingrinkeby_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby_OriginTransfer'] = ResolversParentTypes['stagingrinkeby_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['stagingrinkeby_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby_Router'] = ResolversParentTypes['stagingrinkeby_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['stagingrinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<stagingrinkeby_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby__Block_'] = ResolversParentTypes['stagingrinkeby__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['stagingrinkeby_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type stagingrinkeby__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['stagingrinkeby__Meta_'] = ResolversParentTypes['stagingrinkeby__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['stagingrinkeby__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli_Asset'] = ResolversParentTypes['goerli_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['goerli_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['goerli_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['goerli_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli_AssetBalance'] = ResolversParentTypes['goerli_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['goerli_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['goerli_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface goerli_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['goerli_BigDecimal'], any> {
  name: 'goerli_BigDecimal';
}

export interface goerli_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['goerli_Bytes'], any> {
  name: 'goerli_Bytes';
}

export type goerli_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli_DestinationTransfer'] = ResolversParentTypes['goerli_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['goerli_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['goerli_Router']>>, ParentType, ContextType, RequireFields<goerli_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli_OriginTransfer'] = ResolversParentTypes['goerli_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['goerli_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli_Router'] = ResolversParentTypes['goerli_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['goerli_AssetBalance']>, ParentType, ContextType, RequireFields<goerli_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli__Block_'] = ResolversParentTypes['goerli__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['goerli_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type goerli__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['goerli__Meta_'] = ResolversParentTypes['goerli__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['goerli__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli_Asset'] = ResolversParentTypes['staginggoerli_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['staginggoerli_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['staginggoerli_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['staginggoerli_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli_AssetBalance'] = ResolversParentTypes['staginggoerli_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['staginggoerli_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['staginggoerli_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface staginggoerli_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['staginggoerli_BigDecimal'], any> {
  name: 'staginggoerli_BigDecimal';
}

export interface staginggoerli_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['staginggoerli_Bytes'], any> {
  name: 'staginggoerli_Bytes';
}

export type staginggoerli_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli_DestinationTransfer'] = ResolversParentTypes['staginggoerli_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['staginggoerli_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['staginggoerli_Router']>>, ParentType, ContextType, RequireFields<staginggoerli_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli_OriginTransfer'] = ResolversParentTypes['staginggoerli_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  forceSlow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receiveLocal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['staginggoerli_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli_Router'] = ResolversParentTypes['staginggoerli_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['staginggoerli_AssetBalance']>, ParentType, ContextType, RequireFields<staginggoerli_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli__Block_'] = ResolversParentTypes['staginggoerli__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['staginggoerli_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type staginggoerli__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['staginggoerli__Meta_'] = ResolversParentTypes['staginggoerli__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['staginggoerli__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby_AssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_Asset'] = ResolversParentTypes['rinkeby_Asset']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  local?: Resolver<ResolversTypes['rinkeby_Bytes'], ParentType, ContextType>;
  adoptedAsset?: Resolver<ResolversTypes['rinkeby_Bytes'], ParentType, ContextType>;
  canonicalId?: Resolver<ResolversTypes['rinkeby_Bytes'], ParentType, ContextType>;
  canonicalDomain?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby_AssetBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_AssetBalance'] = ResolversParentTypes['rinkeby_AssetBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  router?: Resolver<ResolversTypes['rinkeby_Router'], ParentType, ContextType>;
  asset?: Resolver<ResolversTypes['rinkeby_Asset'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface rinkeby_BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['rinkeby_BigDecimal'], any> {
  name: 'rinkeby_BigDecimal';
}

export interface rinkeby_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['rinkeby_Bytes'], any> {
  name: 'rinkeby_Bytes';
}

export type rinkeby_DestinationTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_DestinationTransfer'] = ResolversParentTypes['rinkeby_DestinationTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['rinkeby_TransferStatus']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['rinkeby_Router']>>, ParentType, ContextType, RequireFields<rinkeby_DestinationTransferroutersArgs, 'skip' | 'first'>>;
  originSender?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  localAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  localAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby_OriginTransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_OriginTransfer'] = ResolversParentTypes['rinkeby_OriginTransfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['rinkeby_TransferStatus']>, ParentType, ContextType>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transactingAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  bridgedAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  bridgedAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  caller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  gasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby_RouterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_Router'] = ResolversParentTypes['rinkeby_Router']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  proposedOwner?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  proposedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  assetBalances?: Resolver<Array<ResolversTypes['rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<rinkeby_RouterassetBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby__Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby__Block_'] = ResolversParentTypes['rinkeby__Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type rinkeby__Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby__Meta_'] = ResolversParentTypes['rinkeby__Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['rinkeby__Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  stagingkovan_Asset?: stagingkovan_AssetResolvers<ContextType>;
  stagingkovan_AssetBalance?: stagingkovan_AssetBalanceResolvers<ContextType>;
  stagingkovan_BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  stagingkovan_Bytes?: GraphQLScalarType;
  stagingkovan_DestinationTransfer?: stagingkovan_DestinationTransferResolvers<ContextType>;
  stagingkovan_OriginTransfer?: stagingkovan_OriginTransferResolvers<ContextType>;
  stagingkovan_Router?: stagingkovan_RouterResolvers<ContextType>;
  stagingkovan__Block_?: stagingkovan__Block_Resolvers<ContextType>;
  stagingkovan__Meta_?: stagingkovan__Meta_Resolvers<ContextType>;
  kovan_Asset?: kovan_AssetResolvers<ContextType>;
  kovan_AssetBalance?: kovan_AssetBalanceResolvers<ContextType>;
  kovan_BigDecimal?: GraphQLScalarType;
  kovan_Bytes?: GraphQLScalarType;
  kovan_DestinationTransfer?: kovan_DestinationTransferResolvers<ContextType>;
  kovan_OriginTransfer?: kovan_OriginTransferResolvers<ContextType>;
  kovan_Router?: kovan_RouterResolvers<ContextType>;
  kovan__Block_?: kovan__Block_Resolvers<ContextType>;
  kovan__Meta_?: kovan__Meta_Resolvers<ContextType>;
  stagingrinkeby_Asset?: stagingrinkeby_AssetResolvers<ContextType>;
  stagingrinkeby_AssetBalance?: stagingrinkeby_AssetBalanceResolvers<ContextType>;
  stagingrinkeby_BigDecimal?: GraphQLScalarType;
  stagingrinkeby_Bytes?: GraphQLScalarType;
  stagingrinkeby_DestinationTransfer?: stagingrinkeby_DestinationTransferResolvers<ContextType>;
  stagingrinkeby_OriginTransfer?: stagingrinkeby_OriginTransferResolvers<ContextType>;
  stagingrinkeby_Router?: stagingrinkeby_RouterResolvers<ContextType>;
  stagingrinkeby__Block_?: stagingrinkeby__Block_Resolvers<ContextType>;
  stagingrinkeby__Meta_?: stagingrinkeby__Meta_Resolvers<ContextType>;
  goerli_Asset?: goerli_AssetResolvers<ContextType>;
  goerli_AssetBalance?: goerli_AssetBalanceResolvers<ContextType>;
  goerli_BigDecimal?: GraphQLScalarType;
  goerli_Bytes?: GraphQLScalarType;
  goerli_DestinationTransfer?: goerli_DestinationTransferResolvers<ContextType>;
  goerli_OriginTransfer?: goerli_OriginTransferResolvers<ContextType>;
  goerli_Router?: goerli_RouterResolvers<ContextType>;
  goerli__Block_?: goerli__Block_Resolvers<ContextType>;
  goerli__Meta_?: goerli__Meta_Resolvers<ContextType>;
  staginggoerli_Asset?: staginggoerli_AssetResolvers<ContextType>;
  staginggoerli_AssetBalance?: staginggoerli_AssetBalanceResolvers<ContextType>;
  staginggoerli_BigDecimal?: GraphQLScalarType;
  staginggoerli_Bytes?: GraphQLScalarType;
  staginggoerli_DestinationTransfer?: staginggoerli_DestinationTransferResolvers<ContextType>;
  staginggoerli_OriginTransfer?: staginggoerli_OriginTransferResolvers<ContextType>;
  staginggoerli_Router?: staginggoerli_RouterResolvers<ContextType>;
  staginggoerli__Block_?: staginggoerli__Block_Resolvers<ContextType>;
  staginggoerli__Meta_?: staginggoerli__Meta_Resolvers<ContextType>;
  rinkeby_Asset?: rinkeby_AssetResolvers<ContextType>;
  rinkeby_AssetBalance?: rinkeby_AssetBalanceResolvers<ContextType>;
  rinkeby_BigDecimal?: GraphQLScalarType;
  rinkeby_Bytes?: GraphQLScalarType;
  rinkeby_DestinationTransfer?: rinkeby_DestinationTransferResolvers<ContextType>;
  rinkeby_OriginTransfer?: rinkeby_OriginTransferResolvers<ContextType>;
  rinkeby_Router?: rinkeby_RouterResolvers<ContextType>;
  rinkeby__Block_?: rinkeby__Block_Resolvers<ContextType>;
  rinkeby__Meta_?: rinkeby__Meta_Resolvers<ContextType>;
}>;


import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';

import { InContextSdkMethod } from '@graphql-mesh/types';


    export namespace ConnextStagingKovanTypes {
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
  stagingkovan_BigDecimal: any;
  BigInt: any;
  stagingkovan_Bytes: any;
};

export type stagingkovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['stagingkovan_Bytes'];
  adoptedAsset: Scalars['stagingkovan_Bytes'];
  canonicalId: Scalars['stagingkovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingkovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingkovan_Router;
  asset: stagingkovan_Asset;
};

export type stagingkovan_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingkovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type stagingkovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingkovan_Block_height = {
  hash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingkovan_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingkovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingkovan_Bytes']>;
  callData?: Maybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingkovan_TransferStatus>;
  routers?: Maybe<Array<stagingkovan_Router>>;
  originSender?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingkovan_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
};

export type stagingkovan_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingkovan_TransferStatus>;
  status_not?: InputMaybe<stagingkovan_TransferStatus>;
  status_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingkovan_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingkovan_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingkovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingkovan_Bytes']>;
  callData?: Maybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingkovan_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['stagingkovan_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingkovan_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingkovan_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingkovan_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingkovan_TransferStatus>;
  status_not?: InputMaybe<stagingkovan_TransferStatus>;
  status_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingkovan_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
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
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  stagingkovan_asset?: Maybe<stagingkovan_Asset>;
  stagingkovan_assets: Array<stagingkovan_Asset>;
  stagingkovan_assetBalance?: Maybe<stagingkovan_AssetBalance>;
  stagingkovan_assetBalances: Array<stagingkovan_AssetBalance>;
  stagingkovan_router?: Maybe<stagingkovan_Router>;
  stagingkovan_routers: Array<stagingkovan_Router>;
  stagingkovan_originTransfer?: Maybe<stagingkovan_OriginTransfer>;
  stagingkovan_originTransfers: Array<stagingkovan_OriginTransfer>;
  stagingkovan_destinationTransfer?: Maybe<stagingkovan_DestinationTransfer>;
  stagingkovan_destinationTransfers: Array<stagingkovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingkovan__meta?: Maybe<stagingkovan__Meta_>;
};


export type Querystagingkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Asset_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_OriginTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_DestinationTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingkovan__metaArgs = {
  block?: InputMaybe<stagingkovan_Block_height>;
};

export type stagingkovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingkovan_Bytes']>;
  recipient?: Maybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingkovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingkovan_AssetBalance>;
};


export type stagingkovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
};

export type stagingkovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingkovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingkovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingkovan_BlockChangedFilter>;
};

export type stagingkovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  stagingkovan_asset?: Maybe<stagingkovan_Asset>;
  stagingkovan_assets: Array<stagingkovan_Asset>;
  stagingkovan_assetBalance?: Maybe<stagingkovan_AssetBalance>;
  stagingkovan_assetBalances: Array<stagingkovan_AssetBalance>;
  stagingkovan_router?: Maybe<stagingkovan_Router>;
  stagingkovan_routers: Array<stagingkovan_Router>;
  stagingkovan_originTransfer?: Maybe<stagingkovan_OriginTransfer>;
  stagingkovan_originTransfers: Array<stagingkovan_OriginTransfer>;
  stagingkovan_destinationTransfer?: Maybe<stagingkovan_DestinationTransfer>;
  stagingkovan_destinationTransfers: Array<stagingkovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingkovan__meta?: Maybe<stagingkovan__Meta_>;
};


export type Subscriptionstagingkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Asset_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_AssetBalance_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_Router_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_Router_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_OriginTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingkovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingkovan_OrderDirection>;
  where?: InputMaybe<stagingkovan_DestinationTransfer_filter>;
  block?: InputMaybe<stagingkovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingkovan__metaArgs = {
  block?: InputMaybe<stagingkovan_Block_height>;
};

export type stagingkovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type stagingkovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingkovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type stagingkovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingkovan__Block_;
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
    export type QueryConnextStagingKovanSdk = {
  /** null **/
  stagingkovan_asset: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_asset'], ConnextStagingKovanTypes.Querystagingkovan_assetArgs, MeshContext>,
  /** null **/
  stagingkovan_assets: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_assets'], ConnextStagingKovanTypes.Querystagingkovan_assetsArgs, MeshContext>,
  /** null **/
  stagingkovan_assetBalance: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_assetBalance'], ConnextStagingKovanTypes.Querystagingkovan_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingkovan_assetBalances: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_assetBalances'], ConnextStagingKovanTypes.Querystagingkovan_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingkovan_router: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_router'], ConnextStagingKovanTypes.Querystagingkovan_routerArgs, MeshContext>,
  /** null **/
  stagingkovan_routers: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_routers'], ConnextStagingKovanTypes.Querystagingkovan_routersArgs, MeshContext>,
  /** null **/
  stagingkovan_originTransfer: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_originTransfer'], ConnextStagingKovanTypes.Querystagingkovan_originTransferArgs, MeshContext>,
  /** null **/
  stagingkovan_originTransfers: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_originTransfers'], ConnextStagingKovanTypes.Querystagingkovan_originTransfersArgs, MeshContext>,
  /** null **/
  stagingkovan_destinationTransfer: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_destinationTransfer'], ConnextStagingKovanTypes.Querystagingkovan_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingkovan_destinationTransfers: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan_destinationTransfers'], ConnextStagingKovanTypes.Querystagingkovan_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingkovan__meta: InContextSdkMethod<ConnextStagingKovanTypes.Query['stagingkovan__meta'], ConnextStagingKovanTypes.Querystagingkovan__metaArgs, MeshContext>
};

export type MutationConnextStagingKovanSdk = {

};

export type SubscriptionConnextStagingKovanSdk = {
  /** null **/
  stagingkovan_asset: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_asset'], ConnextStagingKovanTypes.Subscriptionstagingkovan_assetArgs, MeshContext>,
  /** null **/
  stagingkovan_assets: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_assets'], ConnextStagingKovanTypes.Subscriptionstagingkovan_assetsArgs, MeshContext>,
  /** null **/
  stagingkovan_assetBalance: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_assetBalance'], ConnextStagingKovanTypes.Subscriptionstagingkovan_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingkovan_assetBalances: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_assetBalances'], ConnextStagingKovanTypes.Subscriptionstagingkovan_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingkovan_router: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_router'], ConnextStagingKovanTypes.Subscriptionstagingkovan_routerArgs, MeshContext>,
  /** null **/
  stagingkovan_routers: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_routers'], ConnextStagingKovanTypes.Subscriptionstagingkovan_routersArgs, MeshContext>,
  /** null **/
  stagingkovan_originTransfer: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_originTransfer'], ConnextStagingKovanTypes.Subscriptionstagingkovan_originTransferArgs, MeshContext>,
  /** null **/
  stagingkovan_originTransfers: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_originTransfers'], ConnextStagingKovanTypes.Subscriptionstagingkovan_originTransfersArgs, MeshContext>,
  /** null **/
  stagingkovan_destinationTransfer: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_destinationTransfer'], ConnextStagingKovanTypes.Subscriptionstagingkovan_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingkovan_destinationTransfers: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan_destinationTransfers'], ConnextStagingKovanTypes.Subscriptionstagingkovan_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingkovan__meta: InContextSdkMethod<ConnextStagingKovanTypes.Subscription['stagingkovan__meta'], ConnextStagingKovanTypes.Subscriptionstagingkovan__metaArgs, MeshContext>
};


    export namespace ConnextKovanTypes {
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
  kovan_BigDecimal: any;
  BigInt: any;
  kovan_Bytes: any;
};

export type kovan_Asset = {
  id: Scalars['ID'];
  local: Scalars['kovan_Bytes'];
  adoptedAsset: Scalars['kovan_Bytes'];
  canonicalId: Scalars['kovan_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type kovan_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: kovan_Router;
  asset: kovan_Asset;
};

export type kovan_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type kovan_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['kovan_Bytes']>;
  local_not?: InputMaybe<Scalars['kovan_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  local_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type kovan_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type kovan_Block_height = {
  hash?: InputMaybe<Scalars['kovan_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type kovan_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  routers?: Maybe<Array<kovan_Router>>;
  originSender?: Maybe<Scalars['kovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['kovan_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type kovan_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
};

export type kovan_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_not?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type kovan_OrderDirection =
  | 'asc'
  | 'desc';

export type kovan_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['kovan_Bytes']>;
  transactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['kovan_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['kovan_Bytes']>;
  transactionHash?: Maybe<Scalars['kovan_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type kovan_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['kovan_Bytes']>;
  message_not?: InputMaybe<Scalars['kovan_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  message_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
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
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_originTransfer?: Maybe<kovan_OriginTransfer>;
  kovan_originTransfers: Array<kovan_OriginTransfer>;
  kovan_destinationTransfer?: Maybe<kovan_DestinationTransfer>;
  kovan_destinationTransfers: Array<kovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
};


export type Querykovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Asset_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_OriginTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_DestinationTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
};

export type kovan_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['kovan_Bytes']>;
  recipient?: Maybe<Scalars['kovan_Bytes']>;
  proposedOwner?: Maybe<Scalars['kovan_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<kovan_AssetBalance>;
};


export type kovan_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
};

export type kovan_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_not?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_not?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<kovan_BlockChangedFilter>;
};

export type kovan_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_originTransfer?: Maybe<kovan_OriginTransfer>;
  kovan_originTransfers: Array<kovan_OriginTransfer>;
  kovan_destinationTransfer?: Maybe<kovan_DestinationTransfer>;
  kovan_destinationTransfers: Array<kovan_DestinationTransfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
};


export type Subscriptionkovan_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Asset_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Asset_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_AssetBalance_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_OriginTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_DestinationTransfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
};

export type kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type kovan__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['kovan_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type kovan__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: kovan__Block_;
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
    export type QueryConnextKovanSdk = {
  /** null **/
  kovan_asset: InContextSdkMethod<ConnextKovanTypes.Query['kovan_asset'], ConnextKovanTypes.Querykovan_assetArgs, MeshContext>,
  /** null **/
  kovan_assets: InContextSdkMethod<ConnextKovanTypes.Query['kovan_assets'], ConnextKovanTypes.Querykovan_assetsArgs, MeshContext>,
  /** null **/
  kovan_assetBalance: InContextSdkMethod<ConnextKovanTypes.Query['kovan_assetBalance'], ConnextKovanTypes.Querykovan_assetBalanceArgs, MeshContext>,
  /** null **/
  kovan_assetBalances: InContextSdkMethod<ConnextKovanTypes.Query['kovan_assetBalances'], ConnextKovanTypes.Querykovan_assetBalancesArgs, MeshContext>,
  /** null **/
  kovan_router: InContextSdkMethod<ConnextKovanTypes.Query['kovan_router'], ConnextKovanTypes.Querykovan_routerArgs, MeshContext>,
  /** null **/
  kovan_routers: InContextSdkMethod<ConnextKovanTypes.Query['kovan_routers'], ConnextKovanTypes.Querykovan_routersArgs, MeshContext>,
  /** null **/
  kovan_originTransfer: InContextSdkMethod<ConnextKovanTypes.Query['kovan_originTransfer'], ConnextKovanTypes.Querykovan_originTransferArgs, MeshContext>,
  /** null **/
  kovan_originTransfers: InContextSdkMethod<ConnextKovanTypes.Query['kovan_originTransfers'], ConnextKovanTypes.Querykovan_originTransfersArgs, MeshContext>,
  /** null **/
  kovan_destinationTransfer: InContextSdkMethod<ConnextKovanTypes.Query['kovan_destinationTransfer'], ConnextKovanTypes.Querykovan_destinationTransferArgs, MeshContext>,
  /** null **/
  kovan_destinationTransfers: InContextSdkMethod<ConnextKovanTypes.Query['kovan_destinationTransfers'], ConnextKovanTypes.Querykovan_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  kovan__meta: InContextSdkMethod<ConnextKovanTypes.Query['kovan__meta'], ConnextKovanTypes.Querykovan__metaArgs, MeshContext>
};

export type MutationConnextKovanSdk = {

};

export type SubscriptionConnextKovanSdk = {
  /** null **/
  kovan_asset: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_asset'], ConnextKovanTypes.Subscriptionkovan_assetArgs, MeshContext>,
  /** null **/
  kovan_assets: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_assets'], ConnextKovanTypes.Subscriptionkovan_assetsArgs, MeshContext>,
  /** null **/
  kovan_assetBalance: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_assetBalance'], ConnextKovanTypes.Subscriptionkovan_assetBalanceArgs, MeshContext>,
  /** null **/
  kovan_assetBalances: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_assetBalances'], ConnextKovanTypes.Subscriptionkovan_assetBalancesArgs, MeshContext>,
  /** null **/
  kovan_router: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_router'], ConnextKovanTypes.Subscriptionkovan_routerArgs, MeshContext>,
  /** null **/
  kovan_routers: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_routers'], ConnextKovanTypes.Subscriptionkovan_routersArgs, MeshContext>,
  /** null **/
  kovan_originTransfer: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_originTransfer'], ConnextKovanTypes.Subscriptionkovan_originTransferArgs, MeshContext>,
  /** null **/
  kovan_originTransfers: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_originTransfers'], ConnextKovanTypes.Subscriptionkovan_originTransfersArgs, MeshContext>,
  /** null **/
  kovan_destinationTransfer: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_destinationTransfer'], ConnextKovanTypes.Subscriptionkovan_destinationTransferArgs, MeshContext>,
  /** null **/
  kovan_destinationTransfers: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_destinationTransfers'], ConnextKovanTypes.Subscriptionkovan_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  kovan__meta: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan__meta'], ConnextKovanTypes.Subscriptionkovan__metaArgs, MeshContext>
};


    export namespace ConnextStagingRinkebyTypes {
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
  stagingrinkeby_BigDecimal: any;
  BigInt: any;
  stagingrinkeby_Bytes: any;
};

export type stagingrinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['stagingrinkeby_Bytes'];
  adoptedAsset: Scalars['stagingrinkeby_Bytes'];
  canonicalId: Scalars['stagingrinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type stagingrinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: stagingrinkeby_Router;
  asset: stagingrinkeby_Asset;
};

export type stagingrinkeby_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type stagingrinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type stagingrinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type stagingrinkeby_Block_height = {
  hash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type stagingrinkeby_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingrinkeby_TransferStatus>;
  routers?: Maybe<Array<stagingrinkeby_Router>>;
  originSender?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type stagingrinkeby_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
};

export type stagingrinkeby_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_not?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type stagingrinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type stagingrinkeby_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<stagingrinkeby_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type stagingrinkeby_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_not?: InputMaybe<stagingrinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<stagingrinkeby_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  message_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
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
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  stagingrinkeby_asset?: Maybe<stagingrinkeby_Asset>;
  stagingrinkeby_assets: Array<stagingrinkeby_Asset>;
  stagingrinkeby_assetBalance?: Maybe<stagingrinkeby_AssetBalance>;
  stagingrinkeby_assetBalances: Array<stagingrinkeby_AssetBalance>;
  stagingrinkeby_router?: Maybe<stagingrinkeby_Router>;
  stagingrinkeby_routers: Array<stagingrinkeby_Router>;
  stagingrinkeby_originTransfer?: Maybe<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_originTransfers: Array<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_destinationTransfer?: Maybe<stagingrinkeby_DestinationTransfer>;
  stagingrinkeby_destinationTransfers: Array<stagingrinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingrinkeby__meta?: Maybe<stagingrinkeby__Meta_>;
};


export type Querystagingrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Asset_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_OriginTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystagingrinkeby__metaArgs = {
  block?: InputMaybe<stagingrinkeby_Block_height>;
};

export type stagingrinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  recipient?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<stagingrinkeby_AssetBalance>;
};


export type stagingrinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
};

export type stagingrinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['stagingrinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['stagingrinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<stagingrinkeby_BlockChangedFilter>;
};

export type stagingrinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  stagingrinkeby_asset?: Maybe<stagingrinkeby_Asset>;
  stagingrinkeby_assets: Array<stagingrinkeby_Asset>;
  stagingrinkeby_assetBalance?: Maybe<stagingrinkeby_AssetBalance>;
  stagingrinkeby_assetBalances: Array<stagingrinkeby_AssetBalance>;
  stagingrinkeby_router?: Maybe<stagingrinkeby_Router>;
  stagingrinkeby_routers: Array<stagingrinkeby_Router>;
  stagingrinkeby_originTransfer?: Maybe<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_originTransfers: Array<stagingrinkeby_OriginTransfer>;
  stagingrinkeby_destinationTransfer?: Maybe<stagingrinkeby_DestinationTransfer>;
  stagingrinkeby_destinationTransfers: Array<stagingrinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  stagingrinkeby__meta?: Maybe<stagingrinkeby__Meta_>;
};


export type Subscriptionstagingrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Asset_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_AssetBalance_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_Router_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_OriginTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<stagingrinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<stagingrinkeby_OrderDirection>;
  where?: InputMaybe<stagingrinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<stagingrinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstagingrinkeby__metaArgs = {
  block?: InputMaybe<stagingrinkeby_Block_height>;
};

export type stagingrinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type stagingrinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['stagingrinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type stagingrinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: stagingrinkeby__Block_;
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
    export type QueryConnextStagingRinkebySdk = {
  /** null **/
  stagingrinkeby_asset: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_asset'], ConnextStagingRinkebyTypes.Querystagingrinkeby_assetArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assets: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_assets'], ConnextStagingRinkebyTypes.Querystagingrinkeby_assetsArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assetBalance: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_assetBalance'], ConnextStagingRinkebyTypes.Querystagingrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assetBalances: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_assetBalances'], ConnextStagingRinkebyTypes.Querystagingrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingrinkeby_router: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_router'], ConnextStagingRinkebyTypes.Querystagingrinkeby_routerArgs, MeshContext>,
  /** null **/
  stagingrinkeby_routers: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_routers'], ConnextStagingRinkebyTypes.Querystagingrinkeby_routersArgs, MeshContext>,
  /** null **/
  stagingrinkeby_originTransfer: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_originTransfer'], ConnextStagingRinkebyTypes.Querystagingrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  stagingrinkeby_originTransfers: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_originTransfers'], ConnextStagingRinkebyTypes.Querystagingrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  stagingrinkeby_destinationTransfer: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_destinationTransfer'], ConnextStagingRinkebyTypes.Querystagingrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingrinkeby_destinationTransfers: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby_destinationTransfers'], ConnextStagingRinkebyTypes.Querystagingrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingrinkeby__meta: InContextSdkMethod<ConnextStagingRinkebyTypes.Query['stagingrinkeby__meta'], ConnextStagingRinkebyTypes.Querystagingrinkeby__metaArgs, MeshContext>
};

export type MutationConnextStagingRinkebySdk = {

};

export type SubscriptionConnextStagingRinkebySdk = {
  /** null **/
  stagingrinkeby_asset: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_asset'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_assetArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assets: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_assets'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_assetsArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assetBalance: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_assetBalance'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  stagingrinkeby_assetBalances: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_assetBalances'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  stagingrinkeby_router: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_router'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_routerArgs, MeshContext>,
  /** null **/
  stagingrinkeby_routers: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_routers'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_routersArgs, MeshContext>,
  /** null **/
  stagingrinkeby_originTransfer: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_originTransfer'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  stagingrinkeby_originTransfers: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_originTransfers'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  stagingrinkeby_destinationTransfer: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_destinationTransfer'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  stagingrinkeby_destinationTransfers: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby_destinationTransfers'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  stagingrinkeby__meta: InContextSdkMethod<ConnextStagingRinkebyTypes.Subscription['stagingrinkeby__meta'], ConnextStagingRinkebyTypes.Subscriptionstagingrinkeby__metaArgs, MeshContext>
};


    export namespace ConnextGoerliTypes {
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
};

export type goerli_Asset = {
  id: Scalars['ID'];
  local: Scalars['goerli_Bytes'];
  adoptedAsset: Scalars['goerli_Bytes'];
  canonicalId: Scalars['goerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type goerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: goerli_Router;
  asset: goerli_Asset;
};

export type goerli_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type goerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not?: InputMaybe<Scalars['goerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type goerli_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type goerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type goerli_Block_height = {
  hash?: InputMaybe<Scalars['goerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type goerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  routers?: Maybe<Array<goerli_Router>>;
  originSender?: Maybe<Scalars['goerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['goerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type goerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
};

export type goerli_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type goerli_OrderDirection =
  | 'asc'
  | 'desc';

export type goerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['goerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['goerli_Bytes']>;
  callData?: Maybe<Scalars['goerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<goerli_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['goerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['goerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['goerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['goerli_Bytes']>;
  transactionHash?: Maybe<Scalars['goerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type goerli_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not?: InputMaybe<Scalars['goerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<goerli_TransferStatus>;
  status_not?: InputMaybe<goerli_TransferStatus>;
  status_in?: InputMaybe<Array<goerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<goerli_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not?: InputMaybe<Scalars['goerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['goerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['goerli_Bytes']>;
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
};

export type goerli_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Querygoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querygoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['goerli_Bytes']>;
  recipient?: Maybe<Scalars['goerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<goerli_AssetBalance>;
};


export type goerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
};

export type goerli_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['goerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['goerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<goerli_BlockChangedFilter>;
};

export type goerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  goerli_asset?: Maybe<goerli_Asset>;
  goerli_assets: Array<goerli_Asset>;
  goerli_assetBalance?: Maybe<goerli_AssetBalance>;
  goerli_assetBalances: Array<goerli_AssetBalance>;
  goerli_router?: Maybe<goerli_Router>;
  goerli_routers: Array<goerli_Router>;
  goerli_originTransfer?: Maybe<goerli_OriginTransfer>;
  goerli_originTransfers: Array<goerli_OriginTransfer>;
  goerli_destinationTransfer?: Maybe<goerli_DestinationTransfer>;
  goerli_destinationTransfers: Array<goerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  goerli__meta?: Maybe<goerli__Meta_>;
};


export type Subscriptiongoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Asset_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Asset_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_AssetBalance_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_Router_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_Router_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_OriginTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<goerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<goerli_OrderDirection>;
  where?: InputMaybe<goerli_DestinationTransfer_filter>;
  block?: InputMaybe<goerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptiongoerli__metaArgs = {
  block?: InputMaybe<goerli_Block_height>;
};

export type goerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type goerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['goerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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

    }
    export type QueryConnextGoerliSdk = {
  /** null **/
  goerli_asset: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_asset'], ConnextGoerliTypes.Querygoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assets'], ConnextGoerliTypes.Querygoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assetBalance'], ConnextGoerliTypes.Querygoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_assetBalances'], ConnextGoerliTypes.Querygoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_router'], ConnextGoerliTypes.Querygoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_routers'], ConnextGoerliTypes.Querygoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originTransfer'], ConnextGoerliTypes.Querygoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_originTransfers'], ConnextGoerliTypes.Querygoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationTransfer'], ConnextGoerliTypes.Querygoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<ConnextGoerliTypes.Query['goerli_destinationTransfers'], ConnextGoerliTypes.Querygoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<ConnextGoerliTypes.Query['goerli__meta'], ConnextGoerliTypes.Querygoerli__metaArgs, MeshContext>
};

export type MutationConnextGoerliSdk = {

};

export type SubscriptionConnextGoerliSdk = {
  /** null **/
  goerli_asset: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_asset'], ConnextGoerliTypes.Subscriptiongoerli_assetArgs, MeshContext>,
  /** null **/
  goerli_assets: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assets'], ConnextGoerliTypes.Subscriptiongoerli_assetsArgs, MeshContext>,
  /** null **/
  goerli_assetBalance: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assetBalance'], ConnextGoerliTypes.Subscriptiongoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  goerli_assetBalances: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_assetBalances'], ConnextGoerliTypes.Subscriptiongoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  goerli_router: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_router'], ConnextGoerliTypes.Subscriptiongoerli_routerArgs, MeshContext>,
  /** null **/
  goerli_routers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_routers'], ConnextGoerliTypes.Subscriptiongoerli_routersArgs, MeshContext>,
  /** null **/
  goerli_originTransfer: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originTransfer'], ConnextGoerliTypes.Subscriptiongoerli_originTransferArgs, MeshContext>,
  /** null **/
  goerli_originTransfers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_originTransfers'], ConnextGoerliTypes.Subscriptiongoerli_originTransfersArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfer: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationTransfer'], ConnextGoerliTypes.Subscriptiongoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  goerli_destinationTransfers: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli_destinationTransfers'], ConnextGoerliTypes.Subscriptiongoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  goerli__meta: InContextSdkMethod<ConnextGoerliTypes.Subscription['goerli__meta'], ConnextGoerliTypes.Subscriptiongoerli__metaArgs, MeshContext>
};


    export namespace ConnextStagingGoerliTypes {
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
};

export type staginggoerli_Asset = {
  id: Scalars['ID'];
  local: Scalars['staginggoerli_Bytes'];
  adoptedAsset: Scalars['staginggoerli_Bytes'];
  canonicalId: Scalars['staginggoerli_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type staginggoerli_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: staginggoerli_Router;
  asset: staginggoerli_Asset;
};

export type staginggoerli_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type staginggoerli_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  local_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type staginggoerli_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type staginggoerli_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type staginggoerli_Block_height = {
  hash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type staginggoerli_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginggoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginggoerli_Bytes']>;
  callData?: Maybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<staginggoerli_TransferStatus>;
  routers?: Maybe<Array<staginggoerli_Router>>;
  originSender?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type staginggoerli_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
};

export type staginggoerli_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<staginggoerli_TransferStatus>;
  status_not?: InputMaybe<staginggoerli_TransferStatus>;
  status_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type staginggoerli_OrderDirection =
  | 'asc'
  | 'desc';

export type staginggoerli_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['staginggoerli_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['staginggoerli_Bytes']>;
  callData?: Maybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  forceSlow?: Maybe<Scalars['Boolean']>;
  receiveLocal?: Maybe<Scalars['Boolean']>;
  status?: Maybe<staginggoerli_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['staginggoerli_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: Maybe<Scalars['staginggoerli_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type staginggoerli_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  to_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceSlow?: InputMaybe<Scalars['Boolean']>;
  forceSlow_not?: InputMaybe<Scalars['Boolean']>;
  forceSlow_in?: InputMaybe<Array<Scalars['Boolean']>>;
  forceSlow_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_not?: InputMaybe<Scalars['Boolean']>;
  receiveLocal_in?: InputMaybe<Array<Scalars['Boolean']>>;
  receiveLocal_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<staginggoerli_TransferStatus>;
  status_not?: InputMaybe<staginggoerli_TransferStatus>;
  status_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  status_not_in?: InputMaybe<Array<staginggoerli_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  message_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
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
};

export type staginggoerli_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'forceSlow'
  | 'receiveLocal'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  staginggoerli_asset?: Maybe<staginggoerli_Asset>;
  staginggoerli_assets: Array<staginggoerli_Asset>;
  staginggoerli_assetBalance?: Maybe<staginggoerli_AssetBalance>;
  staginggoerli_assetBalances: Array<staginggoerli_AssetBalance>;
  staginggoerli_router?: Maybe<staginggoerli_Router>;
  staginggoerli_routers: Array<staginggoerli_Router>;
  staginggoerli_originTransfer?: Maybe<staginggoerli_OriginTransfer>;
  staginggoerli_originTransfers: Array<staginggoerli_OriginTransfer>;
  staginggoerli_destinationTransfer?: Maybe<staginggoerli_DestinationTransfer>;
  staginggoerli_destinationTransfers: Array<staginggoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Querystaginggoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Asset_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OriginTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_DestinationTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querystaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['staginggoerli_Bytes']>;
  recipient?: Maybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner?: Maybe<Scalars['staginggoerli_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<staginggoerli_AssetBalance>;
};


export type staginggoerli_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
};

export type staginggoerli_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['staginggoerli_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['staginggoerli_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<staginggoerli_BlockChangedFilter>;
};

export type staginggoerli_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  staginggoerli_asset?: Maybe<staginggoerli_Asset>;
  staginggoerli_assets: Array<staginggoerli_Asset>;
  staginggoerli_assetBalance?: Maybe<staginggoerli_AssetBalance>;
  staginggoerli_assetBalances: Array<staginggoerli_AssetBalance>;
  staginggoerli_router?: Maybe<staginggoerli_Router>;
  staginggoerli_routers: Array<staginggoerli_Router>;
  staginggoerli_originTransfer?: Maybe<staginggoerli_OriginTransfer>;
  staginggoerli_originTransfers: Array<staginggoerli_OriginTransfer>;
  staginggoerli_destinationTransfer?: Maybe<staginggoerli_DestinationTransfer>;
  staginggoerli_destinationTransfers: Array<staginggoerli_DestinationTransfer>;
  /** Access to subgraph metadata */
  staginggoerli__meta?: Maybe<staginggoerli__Meta_>;
};


export type Subscriptionstaginggoerli_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Asset_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Asset_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_AssetBalance_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_Router_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_Router_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_OriginTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<staginggoerli_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<staginggoerli_OrderDirection>;
  where?: InputMaybe<staginggoerli_DestinationTransfer_filter>;
  block?: InputMaybe<staginggoerli_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionstaginggoerli__metaArgs = {
  block?: InputMaybe<staginggoerli_Block_height>;
};

export type staginggoerli_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type staginggoerli__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['staginggoerli_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
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

    }
    export type QueryConnextStagingGoerliSdk = {
  /** null **/
  staginggoerli_asset: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_asset'], ConnextStagingGoerliTypes.Querystaginggoerli_assetArgs, MeshContext>,
  /** null **/
  staginggoerli_assets: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_assets'], ConnextStagingGoerliTypes.Querystaginggoerli_assetsArgs, MeshContext>,
  /** null **/
  staginggoerli_assetBalance: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_assetBalance'], ConnextStagingGoerliTypes.Querystaginggoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  staginggoerli_assetBalances: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_assetBalances'], ConnextStagingGoerliTypes.Querystaginggoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  staginggoerli_router: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_router'], ConnextStagingGoerliTypes.Querystaginggoerli_routerArgs, MeshContext>,
  /** null **/
  staginggoerli_routers: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_routers'], ConnextStagingGoerliTypes.Querystaginggoerli_routersArgs, MeshContext>,
  /** null **/
  staginggoerli_originTransfer: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_originTransfer'], ConnextStagingGoerliTypes.Querystaginggoerli_originTransferArgs, MeshContext>,
  /** null **/
  staginggoerli_originTransfers: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_originTransfers'], ConnextStagingGoerliTypes.Querystaginggoerli_originTransfersArgs, MeshContext>,
  /** null **/
  staginggoerli_destinationTransfer: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_destinationTransfer'], ConnextStagingGoerliTypes.Querystaginggoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  staginggoerli_destinationTransfers: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli_destinationTransfers'], ConnextStagingGoerliTypes.Querystaginggoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<ConnextStagingGoerliTypes.Query['staginggoerli__meta'], ConnextStagingGoerliTypes.Querystaginggoerli__metaArgs, MeshContext>
};

export type MutationConnextStagingGoerliSdk = {

};

export type SubscriptionConnextStagingGoerliSdk = {
  /** null **/
  staginggoerli_asset: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_asset'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_assetArgs, MeshContext>,
  /** null **/
  staginggoerli_assets: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_assets'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_assetsArgs, MeshContext>,
  /** null **/
  staginggoerli_assetBalance: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_assetBalance'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_assetBalanceArgs, MeshContext>,
  /** null **/
  staginggoerli_assetBalances: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_assetBalances'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_assetBalancesArgs, MeshContext>,
  /** null **/
  staginggoerli_router: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_router'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_routerArgs, MeshContext>,
  /** null **/
  staginggoerli_routers: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_routers'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_routersArgs, MeshContext>,
  /** null **/
  staginggoerli_originTransfer: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_originTransfer'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_originTransferArgs, MeshContext>,
  /** null **/
  staginggoerli_originTransfers: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_originTransfers'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_originTransfersArgs, MeshContext>,
  /** null **/
  staginggoerli_destinationTransfer: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_destinationTransfer'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_destinationTransferArgs, MeshContext>,
  /** null **/
  staginggoerli_destinationTransfers: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli_destinationTransfers'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  staginggoerli__meta: InContextSdkMethod<ConnextStagingGoerliTypes.Subscription['staginggoerli__meta'], ConnextStagingGoerliTypes.Subscriptionstaginggoerli__metaArgs, MeshContext>
};


    export namespace ConnextRinkebyTypes {
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
  rinkeby_BigDecimal: any;
  BigInt: any;
  rinkeby_Bytes: any;
};

export type rinkeby_Asset = {
  id: Scalars['ID'];
  local: Scalars['rinkeby_Bytes'];
  adoptedAsset: Scalars['rinkeby_Bytes'];
  canonicalId: Scalars['rinkeby_Bytes'];
  canonicalDomain: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
};

export type rinkeby_AssetBalance = {
  id: Scalars['ID'];
  amount: Scalars['BigInt'];
  router: rinkeby_Router;
  asset: rinkeby_Asset;
};

export type rinkeby_AssetBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  router?: InputMaybe<Scalars['String']>;
  router_not?: InputMaybe<Scalars['String']>;
  router_gt?: InputMaybe<Scalars['String']>;
  router_lt?: InputMaybe<Scalars['String']>;
  router_gte?: InputMaybe<Scalars['String']>;
  router_lte?: InputMaybe<Scalars['String']>;
  router_in?: InputMaybe<Array<Scalars['String']>>;
  router_not_in?: InputMaybe<Array<Scalars['String']>>;
  router_contains?: InputMaybe<Scalars['String']>;
  router_contains_nocase?: InputMaybe<Scalars['String']>;
  router_not_contains?: InputMaybe<Scalars['String']>;
  router_not_contains_nocase?: InputMaybe<Scalars['String']>;
  router_starts_with?: InputMaybe<Scalars['String']>;
  router_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_starts_with?: InputMaybe<Scalars['String']>;
  router_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  router_ends_with?: InputMaybe<Scalars['String']>;
  router_ends_with_nocase?: InputMaybe<Scalars['String']>;
  router_not_ends_with?: InputMaybe<Scalars['String']>;
  router_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset?: InputMaybe<Scalars['String']>;
  asset_not?: InputMaybe<Scalars['String']>;
  asset_gt?: InputMaybe<Scalars['String']>;
  asset_lt?: InputMaybe<Scalars['String']>;
  asset_gte?: InputMaybe<Scalars['String']>;
  asset_lte?: InputMaybe<Scalars['String']>;
  asset_in?: InputMaybe<Array<Scalars['String']>>;
  asset_not_in?: InputMaybe<Array<Scalars['String']>>;
  asset_contains?: InputMaybe<Scalars['String']>;
  asset_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_not_contains?: InputMaybe<Scalars['String']>;
  asset_not_contains_nocase?: InputMaybe<Scalars['String']>;
  asset_starts_with?: InputMaybe<Scalars['String']>;
  asset_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_starts_with?: InputMaybe<Scalars['String']>;
  asset_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  asset_ends_with?: InputMaybe<Scalars['String']>;
  asset_ends_with_nocase?: InputMaybe<Scalars['String']>;
  asset_not_ends_with?: InputMaybe<Scalars['String']>;
  asset_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_AssetBalance_orderBy =
  | 'id'
  | 'amount'
  | 'router'
  | 'asset';

export type rinkeby_Asset_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  local?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  local_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  local_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  adoptedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  adoptedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  canonicalId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  canonicalDomain?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_not?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lt?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_gte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_lte?: InputMaybe<Scalars['BigInt']>;
  canonicalDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  canonicalDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Asset_orderBy =
  | 'id'
  | 'local'
  | 'adoptedAsset'
  | 'canonicalId'
  | 'canonicalDomain'
  | 'blockNumber';

export type rinkeby_BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type rinkeby_Block_height = {
  hash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type rinkeby_DestinationTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  routers?: Maybe<Array<rinkeby_Router>>;
  originSender?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  localAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  localAmount?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type rinkeby_DestinationTransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
};

export type rinkeby_DestinationTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  originSender?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  originSender_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originSender_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  localAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  localAmount?: InputMaybe<Scalars['BigInt']>;
  localAmount_not?: InputMaybe<Scalars['BigInt']>;
  localAmount_gt?: InputMaybe<Scalars['BigInt']>;
  localAmount_lt?: InputMaybe<Scalars['BigInt']>;
  localAmount_gte?: InputMaybe<Scalars['BigInt']>;
  localAmount_lte?: InputMaybe<Scalars['BigInt']>;
  localAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  localAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  executedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  executedGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  executedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_DestinationTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'routers'
  | 'originSender'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'localAsset'
  | 'localAmount'
  | 'executedCaller'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

/** Defines the order direction, either ascending or descending */
export type rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type rinkeby_OriginTransfer = {
  id: Scalars['ID'];
  chainId?: Maybe<Scalars['BigInt']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  nonce?: Maybe<Scalars['BigInt']>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  message?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: Maybe<Scalars['BigInt']>;
  bridgedAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: Maybe<Scalars['BigInt']>;
  caller?: Maybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  blockNumber?: Maybe<Scalars['BigInt']>;
};

export type rinkeby_OriginTransfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  originDomain?: InputMaybe<Scalars['BigInt']>;
  originDomain_not?: InputMaybe<Scalars['BigInt']>;
  originDomain_gt?: InputMaybe<Scalars['BigInt']>;
  originDomain_lt?: InputMaybe<Scalars['BigInt']>;
  originDomain_gte?: InputMaybe<Scalars['BigInt']>;
  originDomain_lte?: InputMaybe<Scalars['BigInt']>;
  originDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']>>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  message?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  message_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  message_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactingAmount?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  transactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  bridgedAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  bridgedAmount?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_not?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  caller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  caller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_OriginTransfer_orderBy =
  | 'id'
  | 'chainId'
  | 'transferId'
  | 'nonce'
  | 'to'
  | 'callData'
  | 'originDomain'
  | 'destinationDomain'
  | 'status'
  | 'relayerFee'
  | 'message'
  | 'transactingAsset'
  | 'transactingAmount'
  | 'bridgedAsset'
  | 'bridgedAmount'
  | 'caller'
  | 'transactionHash'
  | 'timestamp'
  | 'gasPrice'
  | 'gasLimit'
  | 'blockNumber';

export type Query = {
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Queryrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type rinkeby_Router = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  owner?: Maybe<Scalars['rinkeby_Bytes']>;
  recipient?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: Maybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: Maybe<Scalars['BigInt']>;
  assetBalances: Array<rinkeby_AssetBalance>;
};


export type rinkeby_RouterassetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
};

export type rinkeby_Router_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  owner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  proposedOwner_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedOwner_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  proposedTimestamp?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  proposedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<rinkeby_BlockChangedFilter>;
};

export type rinkeby_Router_orderBy =
  | 'id'
  | 'isActive'
  | 'owner'
  | 'recipient'
  | 'proposedOwner'
  | 'proposedTimestamp'
  | 'assetBalances';

export type Subscription = {
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_originTransfer?: Maybe<rinkeby_OriginTransfer>;
  rinkeby_originTransfers: Array<rinkeby_OriginTransfer>;
  rinkeby_destinationTransfer?: Maybe<rinkeby_DestinationTransfer>;
  rinkeby_destinationTransfers: Array<rinkeby_DestinationTransfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
};


export type Subscriptionrinkeby_assetArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Asset_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Asset_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_assetBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_AssetBalance_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_AssetBalance_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_routersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_originTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_OriginTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_OriginTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_destinationTransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_DestinationTransfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_DestinationTransfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled'
  | 'Completed';

export type rinkeby__Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['rinkeby_Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type rinkeby__Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: rinkeby__Block_;
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
    export type QueryConnextRinkebySdk = {
  /** null **/
  rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_asset'], ConnextRinkebyTypes.Queryrinkeby_assetArgs, MeshContext>,
  /** null **/
  rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assets'], ConnextRinkebyTypes.Queryrinkeby_assetsArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assetBalance'], ConnextRinkebyTypes.Queryrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_assetBalances'], ConnextRinkebyTypes.Queryrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_router'], ConnextRinkebyTypes.Queryrinkeby_routerArgs, MeshContext>,
  /** null **/
  rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_routers'], ConnextRinkebyTypes.Queryrinkeby_routersArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_originTransfer'], ConnextRinkebyTypes.Queryrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_originTransfers'], ConnextRinkebyTypes.Queryrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_destinationTransfer'], ConnextRinkebyTypes.Queryrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_destinationTransfers'], ConnextRinkebyTypes.Queryrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby__meta'], ConnextRinkebyTypes.Queryrinkeby__metaArgs, MeshContext>
};

export type MutationConnextRinkebySdk = {

};

export type SubscriptionConnextRinkebySdk = {
  /** null **/
  rinkeby_asset: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_asset'], ConnextRinkebyTypes.Subscriptionrinkeby_assetArgs, MeshContext>,
  /** null **/
  rinkeby_assets: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assets'], ConnextRinkebyTypes.Subscriptionrinkeby_assetsArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalance: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assetBalance'], ConnextRinkebyTypes.Subscriptionrinkeby_assetBalanceArgs, MeshContext>,
  /** null **/
  rinkeby_assetBalances: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_assetBalances'], ConnextRinkebyTypes.Subscriptionrinkeby_assetBalancesArgs, MeshContext>,
  /** null **/
  rinkeby_router: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_router'], ConnextRinkebyTypes.Subscriptionrinkeby_routerArgs, MeshContext>,
  /** null **/
  rinkeby_routers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_routers'], ConnextRinkebyTypes.Subscriptionrinkeby_routersArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_originTransfer'], ConnextRinkebyTypes.Subscriptionrinkeby_originTransferArgs, MeshContext>,
  /** null **/
  rinkeby_originTransfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_originTransfers'], ConnextRinkebyTypes.Subscriptionrinkeby_originTransfersArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_destinationTransfer'], ConnextRinkebyTypes.Subscriptionrinkeby_destinationTransferArgs, MeshContext>,
  /** null **/
  rinkeby_destinationTransfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_destinationTransfers'], ConnextRinkebyTypes.Subscriptionrinkeby_destinationTransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby__meta'], ConnextRinkebyTypes.Subscriptionrinkeby__metaArgs, MeshContext>
};

export type ConnextStagingKovanContext = {
      ["Connext_Staging_Kovan"]: { Query: QueryConnextStagingKovanSdk, Mutation: MutationConnextStagingKovanSdk, Subscription: SubscriptionConnextStagingKovanSdk },
    };

export type ConnextKovanContext = {
      ["Connext_Kovan"]: { Query: QueryConnextKovanSdk, Mutation: MutationConnextKovanSdk, Subscription: SubscriptionConnextKovanSdk },
    };

export type ConnextStagingRinkebyContext = {
      ["Connext_Staging_Rinkeby"]: { Query: QueryConnextStagingRinkebySdk, Mutation: MutationConnextStagingRinkebySdk, Subscription: SubscriptionConnextStagingRinkebySdk },
    };

export type ConnextGoerliContext = {
      ["Connext_Goerli"]: { Query: QueryConnextGoerliSdk, Mutation: MutationConnextGoerliSdk, Subscription: SubscriptionConnextGoerliSdk },
    };

export type ConnextStagingGoerliContext = {
      ["Connext_Staging_Goerli"]: { Query: QueryConnextStagingGoerliSdk, Mutation: MutationConnextStagingGoerliSdk, Subscription: SubscriptionConnextStagingGoerliSdk },
    };

export type ConnextRinkebyContext = {
      ["Connext_Rinkeby"]: { Query: QueryConnextRinkebySdk, Mutation: MutationConnextRinkebySdk, Subscription: SubscriptionConnextRinkebySdk },
    };

export type MeshContext = ConnextStagingKovanContext & ConnextKovanContext & ConnextStagingRinkebyContext & ConnextGoerliContext & ConnextStagingGoerliContext & ConnextRinkebyContext & BaseMeshContext;


import { getMesh, ExecuteMeshFn, SubscribeMeshFn } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
import * as ExternalModule_0 from '@graphql-mesh/cache-localforage';
import * as ExternalModule_1 from '@graphql-mesh/graphql';
import * as ExternalModule_2 from '@graphql-mesh/merger-stitching';
import * as ExternalModule_3 from '@graphql-mesh/transform-prefix';
import * as ExternalModule_4 from './sources/Connext_Staging_Kovan/introspectionSchema';
import * as ExternalModule_5 from './sources/Connext_Kovan/introspectionSchema';
import * as ExternalModule_6 from './sources/Connext_Staging_Rinkeby/introspectionSchema';
import * as ExternalModule_7 from './sources/Connext_Goerli/introspectionSchema';
import * as ExternalModule_8 from './sources/Connext_Staging_Goerli/introspectionSchema';
import * as ExternalModule_9 from './sources/Connext_Rinkeby/introspectionSchema';

const importedModules: Record<string, any> = {
  // @ts-ignore
  ["@graphql-mesh/cache-localforage"]: ExternalModule_0,
  // @ts-ignore
  ["@graphql-mesh/graphql"]: ExternalModule_1,
  // @ts-ignore
  ["@graphql-mesh/merger-stitching"]: ExternalModule_2,
  // @ts-ignore
  ["@graphql-mesh/transform-prefix"]: ExternalModule_3,
  // @ts-ignore
  [".graphclient/sources/Connext_Staging_Kovan/introspectionSchema"]: ExternalModule_4,
  // @ts-ignore
  [".graphclient/sources/Connext_Kovan/introspectionSchema"]: ExternalModule_5,
  // @ts-ignore
  [".graphclient/sources/Connext_Staging_Rinkeby/introspectionSchema"]: ExternalModule_6,
  // @ts-ignore
  [".graphclient/sources/Connext_Goerli/introspectionSchema"]: ExternalModule_7,
  // @ts-ignore
  [".graphclient/sources/Connext_Staging_Goerli/introspectionSchema"]: ExternalModule_8,
  // @ts-ignore
  [".graphclient/sources/Connext_Rinkeby/introspectionSchema"]: ExternalModule_9
};

const baseDir = pathModule.join(__dirname, '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  if (!(relativeModuleId in importedModules)) {
    return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
  return Promise.resolve(importedModules[relativeModuleId]);
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: 'ts',
}), {
  readonly: true,
  validate: false
});

import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import { parse } from 'graphql';
import { PubSub } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-localforage';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql'
import StitchingMerger from '@graphql-mesh/merger-stitching';
import PrefixTransform from '@graphql-mesh/transform-prefix';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import { parseWithCache } from '@graphql-mesh/utils';
export const rawConfig: YamlConfig.Config = {"sources":[{"name":"Connext_Kovan","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan","retry":5}},"transforms":[{"prefix":{"value":"kovan_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Staging_Kovan","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-staging-kovan","retry":5}},"transforms":[{"prefix":{"value":"stagingkovan_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Rinkeby","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby","retry":5}},"transforms":[{"prefix":{"value":"rinkeby_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Staging_Rinkeby","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-staging-rinkeby","retry":5}},"transforms":[{"prefix":{"value":"stagingrinkeby_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Goerli","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-goerli","retry":5}},"transforms":[{"prefix":{"value":"goerli_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Staging_Goerli","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-staging-goerli","retry":5}},"transforms":[{"prefix":{"value":"staginggoerli_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]}],"documents":["./example-query.graphql"]} as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const cache = new (MeshCache as any)({
      ...(rawConfig.cache || {}),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
    } as any)
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger('🕸️  Mesh');
const sources = [];
const transforms = [];
const connextKovanTransforms = [];
const connextStagingKovanTransforms = [];
const connextRinkebyTransforms = [];
const connextStagingRinkebyTransforms = [];
const connextGoerliTransforms = [];
const connextStagingGoerliTransforms = [];
const additionalTypeDefs = [] as any[];
const connextKovanHandler = new GraphqlHandler({
              name: rawConfig.sources[0].name,
              config: rawConfig.sources[0].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[0].name),
              logger: logger.child(rawConfig.sources[0].name),
              importFn
            });
const connextStagingKovanHandler = new GraphqlHandler({
              name: rawConfig.sources[1].name,
              config: rawConfig.sources[1].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[1].name),
              logger: logger.child(rawConfig.sources[1].name),
              importFn
            });
const connextRinkebyHandler = new GraphqlHandler({
              name: rawConfig.sources[2].name,
              config: rawConfig.sources[2].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[2].name),
              logger: logger.child(rawConfig.sources[2].name),
              importFn
            });
const connextStagingRinkebyHandler = new GraphqlHandler({
              name: rawConfig.sources[3].name,
              config: rawConfig.sources[3].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[3].name),
              logger: logger.child(rawConfig.sources[3].name),
              importFn
            });
const connextGoerliHandler = new GraphqlHandler({
              name: rawConfig.sources[4].name,
              config: rawConfig.sources[4].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[4].name),
              logger: logger.child(rawConfig.sources[4].name),
              importFn
            });
const connextStagingGoerliHandler = new GraphqlHandler({
              name: rawConfig.sources[5].name,
              config: rawConfig.sources[5].handler["graphql"],
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child(rawConfig.sources[5].name),
              logger: logger.child(rawConfig.sources[5].name),
              importFn
            });
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
connextKovanTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[0].name,
                  config: rawConfig.sources[0].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextStagingKovanTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[1].name,
                  config: rawConfig.sources[1].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextRinkebyTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[2].name,
                  config: rawConfig.sources[2].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextStagingRinkebyTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[3].name,
                  config: rawConfig.sources[3].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextGoerliTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[4].name,
                  config: rawConfig.sources[4].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
connextStagingGoerliTransforms.push(
                new PrefixTransform({
                  apiName: rawConfig.sources[5].name,
                  config: rawConfig.sources[5].transforms[0]["prefix"],
                  baseDir,
                  cache,
                  pubsub,
                  importFn
                })
              );
sources.push({
          name: 'Connext_Kovan',
          handler: connextKovanHandler,
          transforms: connextKovanTransforms
        })
sources.push({
          name: 'Connext_Staging_Kovan',
          handler: connextStagingKovanHandler,
          transforms: connextStagingKovanTransforms
        })
sources.push({
          name: 'Connext_Rinkeby',
          handler: connextRinkebyHandler,
          transforms: connextRinkebyTransforms
        })
sources.push({
          name: 'Connext_Staging_Rinkeby',
          handler: connextStagingRinkebyHandler,
          transforms: connextStagingRinkebyTransforms
        })
sources.push({
          name: 'Connext_Goerli',
          handler: connextGoerliHandler,
          transforms: connextGoerliTransforms
        })
sources.push({
          name: 'Connext_Staging_Goerli',
          handler: connextStagingGoerliHandler,
          transforms: connextStagingGoerliTransforms
        })
const additionalResolversRawConfig = [];
const additionalResolvers = await resolveAdditionalResolvers(
      baseDir,
      additionalResolversRawConfig,
      importFn,
      pubsub
  )
const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
const additionalEnvelopPlugins = [];
const documents = documentsInSDL.map((documentSdl: string, i: number) => ({
              rawSDL: documentSdl,
              document: parseWithCache(documentSdl),
              location: `document_${i}.graphql`,
            }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    liveQueryInvalidations,
    additionalEnvelopPlugins,
    documents,
  };
}

export const documentsInSDL = /*#__PURE__*/ [/* GraphQL */`query ExampleQuery {
  rinkeby_assets(first: 1) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}`];

let meshInstance$: Promise<MeshInstance<MeshContext>>;

export function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh<MeshContext>(meshOptions)).then(mesh => {
      const id$ = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        id$.then(id => mesh.pubsub.unsubscribe(id)).catch(err => console.error(err));
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));

export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { rinkeby_assets: Array<Pick<rinkeby_Asset, 'id' | 'local' | 'adoptedAsset' | 'canonicalId' | 'canonicalDomain' | 'blockNumber'>> };


export const ExampleQueryDocument = gql`
    query ExampleQuery {
  rinkeby_assets(first: 1) {
    id
    local
    adoptedAsset
    canonicalId
    canonicalDomain
    blockNumber
  }
}
    ` as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;


export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    ExampleQuery(variables?: ExampleQueryQueryVariables, options?: C): Promise<ExampleQueryQuery> {
      return requester<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;