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
  kovan_BigDecimal: any;
  BigInt: any;
  kovan_Bytes: any;
  rinkeby_BigDecimal: any;
  rinkeby_Bytes: any;
  stagingkovan_BigDecimal: any;
  stagingkovan_Bytes: any;
  stagingrinkeby_BigDecimal: any;
  stagingrinkeby_Bytes: any;
};

export type Query = {
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_transfer?: Maybe<kovan_Transfer>;
  kovan_transfers: Array<kovan_Transfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_transfer?: Maybe<rinkeby_Transfer>;
  rinkeby_transfers: Array<rinkeby_Transfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
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


export type Querykovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Transfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
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


export type Queryrinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Transfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
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

export type Subscription = {
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_transfer?: Maybe<kovan_Transfer>;
  kovan_transfers: Array<kovan_Transfer>;
  /** Access to subgraph metadata */
  kovan__meta?: Maybe<kovan__Meta_>;
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_transfer?: Maybe<rinkeby_Transfer>;
  rinkeby_transfers: Array<rinkeby_Transfer>;
  /** Access to subgraph metadata */
  rinkeby__meta?: Maybe<rinkeby__Meta_>;
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


export type Subscriptionkovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Transfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
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


export type Subscriptionrinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Transfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
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

/** Defines the order direction, either ascending or descending */
export type kovan_OrderDirection =
  | 'asc'
  | 'desc';

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

export type kovan_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  routers?: Maybe<Array<kovan_Router>>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type kovan_TransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
};

export type kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type kovan_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
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
  reconciledLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type kovan_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'routers'
  | 'relayerFee'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

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

/** Defines the order direction, either ascending or descending */
export type rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

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

export type rinkeby_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  routers?: Maybe<Array<rinkeby_Router>>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type rinkeby_TransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
};

export type rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type rinkeby_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  reconciledLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type rinkeby_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'routers'
  | 'relayerFee'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

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
  kovan_Asset: ResolverTypeWrapper<kovan_Asset>;
  kovan_AssetBalance: ResolverTypeWrapper<kovan_AssetBalance>;
  kovan_AssetBalance_filter: kovan_AssetBalance_filter;
  kovan_AssetBalance_orderBy: kovan_AssetBalance_orderBy;
  kovan_Asset_filter: kovan_Asset_filter;
  kovan_Asset_orderBy: kovan_Asset_orderBy;
  kovan_BigDecimal: ResolverTypeWrapper<Scalars['kovan_BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  kovan_BlockChangedFilter: kovan_BlockChangedFilter;
  kovan_Block_height: kovan_Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  kovan_Bytes: ResolverTypeWrapper<Scalars['kovan_Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  kovan_OrderDirection: kovan_OrderDirection;
  kovan_Router: ResolverTypeWrapper<kovan_Router>;
  kovan_Router_filter: kovan_Router_filter;
  kovan_Router_orderBy: kovan_Router_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  kovan_Transfer: ResolverTypeWrapper<kovan_Transfer>;
  kovan_TransferStatus: kovan_TransferStatus;
  kovan_Transfer_filter: kovan_Transfer_filter;
  kovan_Transfer_orderBy: kovan_Transfer_orderBy;
  kovan__Block_: ResolverTypeWrapper<kovan__Block_>;
  kovan__Meta_: ResolverTypeWrapper<kovan__Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
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
  rinkeby_OrderDirection: rinkeby_OrderDirection;
  rinkeby_Router: ResolverTypeWrapper<rinkeby_Router>;
  rinkeby_Router_filter: rinkeby_Router_filter;
  rinkeby_Router_orderBy: rinkeby_Router_orderBy;
  rinkeby_Transfer: ResolverTypeWrapper<rinkeby_Transfer>;
  rinkeby_TransferStatus: rinkeby_TransferStatus;
  rinkeby_Transfer_filter: rinkeby_Transfer_filter;
  rinkeby_Transfer_orderBy: rinkeby_Transfer_orderBy;
  rinkeby__Block_: ResolverTypeWrapper<rinkeby__Block_>;
  rinkeby__Meta_: ResolverTypeWrapper<rinkeby__Meta_>;
  stagingkovan_Asset: ResolverTypeWrapper<stagingkovan_Asset>;
  stagingkovan_AssetBalance: ResolverTypeWrapper<stagingkovan_AssetBalance>;
  stagingkovan_AssetBalance_filter: stagingkovan_AssetBalance_filter;
  stagingkovan_AssetBalance_orderBy: stagingkovan_AssetBalance_orderBy;
  stagingkovan_Asset_filter: stagingkovan_Asset_filter;
  stagingkovan_Asset_orderBy: stagingkovan_Asset_orderBy;
  stagingkovan_BigDecimal: ResolverTypeWrapper<Scalars['stagingkovan_BigDecimal']>;
  stagingkovan_BlockChangedFilter: stagingkovan_BlockChangedFilter;
  stagingkovan_Block_height: stagingkovan_Block_height;
  stagingkovan_Bytes: ResolverTypeWrapper<Scalars['stagingkovan_Bytes']>;
  stagingkovan_DestinationTransfer: ResolverTypeWrapper<stagingkovan_DestinationTransfer>;
  stagingkovan_DestinationTransfer_filter: stagingkovan_DestinationTransfer_filter;
  stagingkovan_DestinationTransfer_orderBy: stagingkovan_DestinationTransfer_orderBy;
  stagingkovan_OrderDirection: stagingkovan_OrderDirection;
  stagingkovan_OriginTransfer: ResolverTypeWrapper<stagingkovan_OriginTransfer>;
  stagingkovan_OriginTransfer_filter: stagingkovan_OriginTransfer_filter;
  stagingkovan_OriginTransfer_orderBy: stagingkovan_OriginTransfer_orderBy;
  stagingkovan_Router: ResolverTypeWrapper<stagingkovan_Router>;
  stagingkovan_Router_filter: stagingkovan_Router_filter;
  stagingkovan_Router_orderBy: stagingkovan_Router_orderBy;
  stagingkovan_TransferStatus: stagingkovan_TransferStatus;
  stagingkovan__Block_: ResolverTypeWrapper<stagingkovan__Block_>;
  stagingkovan__Meta_: ResolverTypeWrapper<stagingkovan__Meta_>;
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
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  kovan_Asset: kovan_Asset;
  kovan_AssetBalance: kovan_AssetBalance;
  kovan_AssetBalance_filter: kovan_AssetBalance_filter;
  kovan_Asset_filter: kovan_Asset_filter;
  kovan_BigDecimal: Scalars['kovan_BigDecimal'];
  BigInt: Scalars['BigInt'];
  kovan_BlockChangedFilter: kovan_BlockChangedFilter;
  kovan_Block_height: kovan_Block_height;
  Boolean: Scalars['Boolean'];
  kovan_Bytes: Scalars['kovan_Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  kovan_Router: kovan_Router;
  kovan_Router_filter: kovan_Router_filter;
  String: Scalars['String'];
  kovan_Transfer: kovan_Transfer;
  kovan_Transfer_filter: kovan_Transfer_filter;
  kovan__Block_: kovan__Block_;
  kovan__Meta_: kovan__Meta_;
  rinkeby_Asset: rinkeby_Asset;
  rinkeby_AssetBalance: rinkeby_AssetBalance;
  rinkeby_AssetBalance_filter: rinkeby_AssetBalance_filter;
  rinkeby_Asset_filter: rinkeby_Asset_filter;
  rinkeby_BigDecimal: Scalars['rinkeby_BigDecimal'];
  rinkeby_BlockChangedFilter: rinkeby_BlockChangedFilter;
  rinkeby_Block_height: rinkeby_Block_height;
  rinkeby_Bytes: Scalars['rinkeby_Bytes'];
  rinkeby_Router: rinkeby_Router;
  rinkeby_Router_filter: rinkeby_Router_filter;
  rinkeby_Transfer: rinkeby_Transfer;
  rinkeby_Transfer_filter: rinkeby_Transfer_filter;
  rinkeby__Block_: rinkeby__Block_;
  rinkeby__Meta_: rinkeby__Meta_;
  stagingkovan_Asset: stagingkovan_Asset;
  stagingkovan_AssetBalance: stagingkovan_AssetBalance;
  stagingkovan_AssetBalance_filter: stagingkovan_AssetBalance_filter;
  stagingkovan_Asset_filter: stagingkovan_Asset_filter;
  stagingkovan_BigDecimal: Scalars['stagingkovan_BigDecimal'];
  stagingkovan_BlockChangedFilter: stagingkovan_BlockChangedFilter;
  stagingkovan_Block_height: stagingkovan_Block_height;
  stagingkovan_Bytes: Scalars['stagingkovan_Bytes'];
  stagingkovan_DestinationTransfer: stagingkovan_DestinationTransfer;
  stagingkovan_DestinationTransfer_filter: stagingkovan_DestinationTransfer_filter;
  stagingkovan_OriginTransfer: stagingkovan_OriginTransfer;
  stagingkovan_OriginTransfer_filter: stagingkovan_OriginTransfer_filter;
  stagingkovan_Router: stagingkovan_Router;
  stagingkovan_Router_filter: stagingkovan_Router_filter;
  stagingkovan__Block_: stagingkovan__Block_;
  stagingkovan__Meta_: stagingkovan__Meta_;
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
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  kovan_asset?: Resolver<Maybe<ResolversTypes['kovan_Asset']>, ParentType, ContextType, RequireFields<Querykovan_assetArgs, 'id' | 'subgraphError'>>;
  kovan_assets?: Resolver<Array<ResolversTypes['kovan_Asset']>, ParentType, ContextType, RequireFields<Querykovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_assetBalance?: Resolver<Maybe<ResolversTypes['kovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querykovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  kovan_assetBalances?: Resolver<Array<ResolversTypes['kovan_AssetBalance']>, ParentType, ContextType, RequireFields<Querykovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_router?: Resolver<Maybe<ResolversTypes['kovan_Router']>, ParentType, ContextType, RequireFields<Querykovan_routerArgs, 'id' | 'subgraphError'>>;
  kovan_routers?: Resolver<Array<ResolversTypes['kovan_Router']>, ParentType, ContextType, RequireFields<Querykovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_transfer?: Resolver<Maybe<ResolversTypes['kovan_Transfer']>, ParentType, ContextType, RequireFields<Querykovan_transferArgs, 'id' | 'subgraphError'>>;
  kovan_transfers?: Resolver<Array<ResolversTypes['kovan_Transfer']>, ParentType, ContextType, RequireFields<Querykovan_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan__meta?: Resolver<Maybe<ResolversTypes['kovan__Meta_']>, ParentType, ContextType, Partial<Querykovan__metaArgs>>;
  rinkeby_asset?: Resolver<Maybe<ResolversTypes['rinkeby_Asset']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  rinkeby_assets?: Resolver<Array<ResolversTypes['rinkeby_Asset']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_assetBalance?: Resolver<Maybe<ResolversTypes['rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  rinkeby_assetBalances?: Resolver<Array<ResolversTypes['rinkeby_AssetBalance']>, ParentType, ContextType, RequireFields<Queryrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_router?: Resolver<Maybe<ResolversTypes['rinkeby_Router']>, ParentType, ContextType, RequireFields<Queryrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  rinkeby_routers?: Resolver<Array<ResolversTypes['rinkeby_Router']>, ParentType, ContextType, RequireFields<Queryrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_transfer?: Resolver<Maybe<ResolversTypes['rinkeby_Transfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_transferArgs, 'id' | 'subgraphError'>>;
  rinkeby_transfers?: Resolver<Array<ResolversTypes['rinkeby_Transfer']>, ParentType, ContextType, RequireFields<Queryrinkeby_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby__meta?: Resolver<Maybe<ResolversTypes['rinkeby__Meta_']>, ParentType, ContextType, Partial<Queryrinkeby__metaArgs>>;
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
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  kovan_asset?: SubscriptionResolver<Maybe<ResolversTypes['kovan_Asset']>, "kovan_asset", ParentType, ContextType, RequireFields<Subscriptionkovan_assetArgs, 'id' | 'subgraphError'>>;
  kovan_assets?: SubscriptionResolver<Array<ResolversTypes['kovan_Asset']>, "kovan_assets", ParentType, ContextType, RequireFields<Subscriptionkovan_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['kovan_AssetBalance']>, "kovan_assetBalance", ParentType, ContextType, RequireFields<Subscriptionkovan_assetBalanceArgs, 'id' | 'subgraphError'>>;
  kovan_assetBalances?: SubscriptionResolver<Array<ResolversTypes['kovan_AssetBalance']>, "kovan_assetBalances", ParentType, ContextType, RequireFields<Subscriptionkovan_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_router?: SubscriptionResolver<Maybe<ResolversTypes['kovan_Router']>, "kovan_router", ParentType, ContextType, RequireFields<Subscriptionkovan_routerArgs, 'id' | 'subgraphError'>>;
  kovan_routers?: SubscriptionResolver<Array<ResolversTypes['kovan_Router']>, "kovan_routers", ParentType, ContextType, RequireFields<Subscriptionkovan_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan_transfer?: SubscriptionResolver<Maybe<ResolversTypes['kovan_Transfer']>, "kovan_transfer", ParentType, ContextType, RequireFields<Subscriptionkovan_transferArgs, 'id' | 'subgraphError'>>;
  kovan_transfers?: SubscriptionResolver<Array<ResolversTypes['kovan_Transfer']>, "kovan_transfers", ParentType, ContextType, RequireFields<Subscriptionkovan_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  kovan__meta?: SubscriptionResolver<Maybe<ResolversTypes['kovan__Meta_']>, "kovan__meta", ParentType, ContextType, Partial<Subscriptionkovan__metaArgs>>;
  rinkeby_asset?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_Asset']>, "rinkeby_asset", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetArgs, 'id' | 'subgraphError'>>;
  rinkeby_assets?: SubscriptionResolver<Array<ResolversTypes['rinkeby_Asset']>, "rinkeby_assets", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_assetBalance?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_AssetBalance']>, "rinkeby_assetBalance", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetBalanceArgs, 'id' | 'subgraphError'>>;
  rinkeby_assetBalances?: SubscriptionResolver<Array<ResolversTypes['rinkeby_AssetBalance']>, "rinkeby_assetBalances", ParentType, ContextType, RequireFields<Subscriptionrinkeby_assetBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_router?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_Router']>, "rinkeby_router", ParentType, ContextType, RequireFields<Subscriptionrinkeby_routerArgs, 'id' | 'subgraphError'>>;
  rinkeby_routers?: SubscriptionResolver<Array<ResolversTypes['rinkeby_Router']>, "rinkeby_routers", ParentType, ContextType, RequireFields<Subscriptionrinkeby_routersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby_transfer?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby_Transfer']>, "rinkeby_transfer", ParentType, ContextType, RequireFields<Subscriptionrinkeby_transferArgs, 'id' | 'subgraphError'>>;
  rinkeby_transfers?: SubscriptionResolver<Array<ResolversTypes['rinkeby_Transfer']>, "rinkeby_transfers", ParentType, ContextType, RequireFields<Subscriptionrinkeby_transfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  rinkeby__meta?: SubscriptionResolver<Maybe<ResolversTypes['rinkeby__Meta_']>, "rinkeby__meta", ParentType, ContextType, Partial<Subscriptionrinkeby__metaArgs>>;
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

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface kovan_BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['kovan_Bytes'], any> {
  name: 'kovan_Bytes';
}

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

export type kovan_TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['kovan_Transfer'] = ResolversParentTypes['kovan_Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['kovan_TransferStatus']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  idx?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['kovan_Router']>>, ParentType, ContextType, RequireFields<kovan_TransferroutersArgs, 'skip' | 'first'>>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledTransactingAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  xcalledLocalAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  xcalledTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledCaller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  xcalledTransactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  xcalledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedTransactingAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedLocalAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  reconciledLocalAsset?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  reconciledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['kovan_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
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

export type rinkeby_TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['rinkeby_Transfer'] = ResolversParentTypes['rinkeby_Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  destinationDomain?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['rinkeby_TransferStatus']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  transferId?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  callData?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  idx?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  routers?: Resolver<Maybe<Array<ResolversTypes['rinkeby_Router']>>, ParentType, ContextType, RequireFields<rinkeby_TransferroutersArgs, 'skip' | 'first'>>;
  relayerFee?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledTransactingAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledLocalAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledCaller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTransactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  xcalledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  xcalledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedCaller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactingAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedTransactingAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedLocalAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedTransactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  executedTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  executedBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledCaller?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledLocalAsset?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledLocalAmount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledTransactionHash?: Resolver<Maybe<ResolversTypes['rinkeby_Bytes']>, ParentType, ContextType>;
  reconciledTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasPrice?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledGasLimit?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  reconciledBlockNumber?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  kovan_Asset?: kovan_AssetResolvers<ContextType>;
  kovan_AssetBalance?: kovan_AssetBalanceResolvers<ContextType>;
  kovan_BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  kovan_Bytes?: GraphQLScalarType;
  kovan_Router?: kovan_RouterResolvers<ContextType>;
  kovan_Transfer?: kovan_TransferResolvers<ContextType>;
  kovan__Block_?: kovan__Block_Resolvers<ContextType>;
  kovan__Meta_?: kovan__Meta_Resolvers<ContextType>;
  rinkeby_Asset?: rinkeby_AssetResolvers<ContextType>;
  rinkeby_AssetBalance?: rinkeby_AssetBalanceResolvers<ContextType>;
  rinkeby_BigDecimal?: GraphQLScalarType;
  rinkeby_Bytes?: GraphQLScalarType;
  rinkeby_Router?: rinkeby_RouterResolvers<ContextType>;
  rinkeby_Transfer?: rinkeby_TransferResolvers<ContextType>;
  rinkeby__Block_?: rinkeby__Block_Resolvers<ContextType>;
  rinkeby__Meta_?: rinkeby__Meta_Resolvers<ContextType>;
  stagingkovan_Asset?: stagingkovan_AssetResolvers<ContextType>;
  stagingkovan_AssetBalance?: stagingkovan_AssetBalanceResolvers<ContextType>;
  stagingkovan_BigDecimal?: GraphQLScalarType;
  stagingkovan_Bytes?: GraphQLScalarType;
  stagingkovan_DestinationTransfer?: stagingkovan_DestinationTransferResolvers<ContextType>;
  stagingkovan_OriginTransfer?: stagingkovan_OriginTransferResolvers<ContextType>;
  stagingkovan_Router?: stagingkovan_RouterResolvers<ContextType>;
  stagingkovan__Block_?: stagingkovan__Block_Resolvers<ContextType>;
  stagingkovan__Meta_?: stagingkovan__Meta_Resolvers<ContextType>;
  stagingrinkeby_Asset?: stagingrinkeby_AssetResolvers<ContextType>;
  stagingrinkeby_AssetBalance?: stagingrinkeby_AssetBalanceResolvers<ContextType>;
  stagingrinkeby_BigDecimal?: GraphQLScalarType;
  stagingrinkeby_Bytes?: GraphQLScalarType;
  stagingrinkeby_DestinationTransfer?: stagingrinkeby_DestinationTransferResolvers<ContextType>;
  stagingrinkeby_OriginTransfer?: stagingrinkeby_OriginTransferResolvers<ContextType>;
  stagingrinkeby_Router?: stagingrinkeby_RouterResolvers<ContextType>;
  stagingrinkeby__Block_?: stagingrinkeby__Block_Resolvers<ContextType>;
  stagingrinkeby__Meta_?: stagingrinkeby__Meta_Resolvers<ContextType>;
}>;


import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';

import { InContextSdkMethod } from '@graphql-mesh/types';


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

/** Defines the order direction, either ascending or descending */
export type kovan_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  kovan_asset?: Maybe<kovan_Asset>;
  kovan_assets: Array<kovan_Asset>;
  kovan_assetBalance?: Maybe<kovan_AssetBalance>;
  kovan_assetBalances: Array<kovan_AssetBalance>;
  kovan_router?: Maybe<kovan_Router>;
  kovan_routers: Array<kovan_Router>;
  kovan_transfer?: Maybe<kovan_Transfer>;
  kovan_transfers: Array<kovan_Transfer>;
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


export type Querykovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querykovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Transfer_filter>;
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
  kovan_transfer?: Maybe<kovan_Transfer>;
  kovan_transfers: Array<kovan_Transfer>;
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


export type Subscriptionkovan_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Transfer_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Transfer_filter>;
  block?: InputMaybe<kovan_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionkovan__metaArgs = {
  block?: InputMaybe<kovan_Block_height>;
};

export type kovan_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<kovan_TransferStatus>;
  to?: Maybe<Scalars['kovan_Bytes']>;
  transferId?: Maybe<Scalars['kovan_Bytes']>;
  callData?: Maybe<Scalars['kovan_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  routers?: Maybe<Array<kovan_Router>>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['kovan_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['kovan_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['kovan_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type kovan_TransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<kovan_Router_orderBy>;
  orderDirection?: InputMaybe<kovan_OrderDirection>;
  where?: InputMaybe<kovan_Router_filter>;
};

export type kovan_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type kovan_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<kovan_TransferStatus>;
  status_not?: InputMaybe<kovan_TransferStatus>;
  status_in?: InputMaybe<Array<kovan_TransferStatus>>;
  status_not_in?: InputMaybe<Array<kovan_TransferStatus>>;
  to?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not?: InputMaybe<Scalars['kovan_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  to_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
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
  reconciledLocalAsset?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['kovan_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['kovan_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type kovan_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'routers'
  | 'relayerFee'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

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
  kovan_transfer: InContextSdkMethod<ConnextKovanTypes.Query['kovan_transfer'], ConnextKovanTypes.Querykovan_transferArgs, MeshContext>,
  /** null **/
  kovan_transfers: InContextSdkMethod<ConnextKovanTypes.Query['kovan_transfers'], ConnextKovanTypes.Querykovan_transfersArgs, MeshContext>,
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
  kovan_transfer: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_transfer'], ConnextKovanTypes.Subscriptionkovan_transferArgs, MeshContext>,
  /** null **/
  kovan_transfers: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan_transfers'], ConnextKovanTypes.Subscriptionkovan_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  kovan__meta: InContextSdkMethod<ConnextKovanTypes.Subscription['kovan__meta'], ConnextKovanTypes.Subscriptionkovan__metaArgs, MeshContext>
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

/** Defines the order direction, either ascending or descending */
export type rinkeby_OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  rinkeby_asset?: Maybe<rinkeby_Asset>;
  rinkeby_assets: Array<rinkeby_Asset>;
  rinkeby_assetBalance?: Maybe<rinkeby_AssetBalance>;
  rinkeby_assetBalances: Array<rinkeby_AssetBalance>;
  rinkeby_router?: Maybe<rinkeby_Router>;
  rinkeby_routers: Array<rinkeby_Router>;
  rinkeby_transfer?: Maybe<rinkeby_Transfer>;
  rinkeby_transfers: Array<rinkeby_Transfer>;
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


export type Queryrinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryrinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Transfer_filter>;
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
  rinkeby_transfer?: Maybe<rinkeby_Transfer>;
  rinkeby_transfers: Array<rinkeby_Transfer>;
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


export type Subscriptionrinkeby_transferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby_transfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Transfer_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Transfer_filter>;
  block?: InputMaybe<rinkeby_Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionrinkeby__metaArgs = {
  block?: InputMaybe<rinkeby_Block_height>;
};

export type rinkeby_Transfer = {
  id: Scalars['ID'];
  originDomain?: Maybe<Scalars['BigInt']>;
  destinationDomain?: Maybe<Scalars['BigInt']>;
  chainId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<rinkeby_TransferStatus>;
  to?: Maybe<Scalars['rinkeby_Bytes']>;
  transferId?: Maybe<Scalars['rinkeby_Bytes']>;
  callData?: Maybe<Scalars['rinkeby_Bytes']>;
  idx?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  routers?: Maybe<Array<rinkeby_Router>>;
  relayerFee?: Maybe<Scalars['BigInt']>;
  xcalledTransactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAmount?: Maybe<Scalars['BigInt']>;
  xcalledLocalAmount?: Maybe<Scalars['BigInt']>;
  xcalledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  xcalledTimestamp?: Maybe<Scalars['BigInt']>;
  xcalledGasPrice?: Maybe<Scalars['BigInt']>;
  xcalledGasLimit?: Maybe<Scalars['BigInt']>;
  xcalledBlockNumber?: Maybe<Scalars['BigInt']>;
  executedCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAmount?: Maybe<Scalars['BigInt']>;
  executedLocalAmount?: Maybe<Scalars['BigInt']>;
  executedTransactingAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  executedTimestamp?: Maybe<Scalars['BigInt']>;
  executedGasPrice?: Maybe<Scalars['BigInt']>;
  executedGasLimit?: Maybe<Scalars['BigInt']>;
  executedBlockNumber?: Maybe<Scalars['BigInt']>;
  reconciledCaller?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAmount?: Maybe<Scalars['BigInt']>;
  reconciledTransactionHash?: Maybe<Scalars['rinkeby_Bytes']>;
  reconciledTimestamp?: Maybe<Scalars['BigInt']>;
  reconciledGasPrice?: Maybe<Scalars['BigInt']>;
  reconciledGasLimit?: Maybe<Scalars['BigInt']>;
  reconciledBlockNumber?: Maybe<Scalars['BigInt']>;
};


export type rinkeby_TransferroutersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<rinkeby_Router_orderBy>;
  orderDirection?: InputMaybe<rinkeby_OrderDirection>;
  where?: InputMaybe<rinkeby_Router_filter>;
};

export type rinkeby_TransferStatus =
  | 'XCalled'
  | 'Executed'
  | 'Reconciled';

export type rinkeby_Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  chainId?: InputMaybe<Scalars['BigInt']>;
  chainId_not?: InputMaybe<Scalars['BigInt']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']>;
  chainId_lt?: InputMaybe<Scalars['BigInt']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']>;
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<rinkeby_TransferStatus>;
  status_not?: InputMaybe<rinkeby_TransferStatus>;
  status_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  status_not_in?: InputMaybe<Array<rinkeby_TransferStatus>>;
  to?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  to_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  to_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  transferId_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  transferId_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  callData_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  callData_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  idx?: InputMaybe<Scalars['BigInt']>;
  idx_not?: InputMaybe<Scalars['BigInt']>;
  idx_gt?: InputMaybe<Scalars['BigInt']>;
  idx_lt?: InputMaybe<Scalars['BigInt']>;
  idx_gte?: InputMaybe<Scalars['BigInt']>;
  idx_lte?: InputMaybe<Scalars['BigInt']>;
  idx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  idx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  routers?: InputMaybe<Array<Scalars['String']>>;
  routers_not?: InputMaybe<Array<Scalars['String']>>;
  routers_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  routers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  relayerFee?: InputMaybe<Scalars['BigInt']>;
  relayerFee_not?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lt?: InputMaybe<Scalars['BigInt']>;
  relayerFee_gte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_lte?: InputMaybe<Scalars['BigInt']>;
  relayerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  relayerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactionHash_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  xcalledTransactionHash_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTransactionHash_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  xcalledTimestamp?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_not?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledGasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledGasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  xcalledBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  xcalledBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedCaller?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedCaller_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedCaller_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAmount?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedTransactingAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  executedLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedTransactingAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactingAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedTransactingAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedTransactingAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  executedLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  executedLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
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
  reconciledLocalAsset?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_not?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledLocalAsset_not_in?: InputMaybe<Array<Scalars['rinkeby_Bytes']>>;
  reconciledLocalAsset_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAsset_not_contains?: InputMaybe<Scalars['rinkeby_Bytes']>;
  reconciledLocalAmount?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_not?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reconciledLocalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reconciledLocalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

export type rinkeby_Transfer_orderBy =
  | 'id'
  | 'originDomain'
  | 'destinationDomain'
  | 'chainId'
  | 'status'
  | 'to'
  | 'transferId'
  | 'callData'
  | 'idx'
  | 'nonce'
  | 'routers'
  | 'relayerFee'
  | 'xcalledTransactingAsset'
  | 'xcalledLocalAsset'
  | 'xcalledTransactingAmount'
  | 'xcalledLocalAmount'
  | 'xcalledCaller'
  | 'xcalledTransactionHash'
  | 'xcalledTimestamp'
  | 'xcalledGasPrice'
  | 'xcalledGasLimit'
  | 'xcalledBlockNumber'
  | 'executedCaller'
  | 'executedTransactingAmount'
  | 'executedLocalAmount'
  | 'executedTransactingAsset'
  | 'executedLocalAsset'
  | 'executedTransactionHash'
  | 'executedTimestamp'
  | 'executedGasPrice'
  | 'executedGasLimit'
  | 'executedBlockNumber'
  | 'reconciledCaller'
  | 'reconciledLocalAsset'
  | 'reconciledLocalAmount'
  | 'reconciledTransactionHash'
  | 'reconciledTimestamp'
  | 'reconciledGasPrice'
  | 'reconciledGasLimit'
  | 'reconciledBlockNumber';

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
  rinkeby_transfer: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_transfer'], ConnextRinkebyTypes.Queryrinkeby_transferArgs, MeshContext>,
  /** null **/
  rinkeby_transfers: InContextSdkMethod<ConnextRinkebyTypes.Query['rinkeby_transfers'], ConnextRinkebyTypes.Queryrinkeby_transfersArgs, MeshContext>,
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
  rinkeby_transfer: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_transfer'], ConnextRinkebyTypes.Subscriptionrinkeby_transferArgs, MeshContext>,
  /** null **/
  rinkeby_transfers: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby_transfers'], ConnextRinkebyTypes.Subscriptionrinkeby_transfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  rinkeby__meta: InContextSdkMethod<ConnextRinkebyTypes.Subscription['rinkeby__meta'], ConnextRinkebyTypes.Subscriptionrinkeby__metaArgs, MeshContext>
};


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

export type ConnextKovanContext = {
      ["Connext_Kovan"]: { Query: QueryConnextKovanSdk, Mutation: MutationConnextKovanSdk, Subscription: SubscriptionConnextKovanSdk },
    };

export type ConnextRinkebyContext = {
      ["Connext_Rinkeby"]: { Query: QueryConnextRinkebySdk, Mutation: MutationConnextRinkebySdk, Subscription: SubscriptionConnextRinkebySdk },
    };

export type ConnextStagingKovanContext = {
      ["Connext_Staging_Kovan"]: { Query: QueryConnextStagingKovanSdk, Mutation: MutationConnextStagingKovanSdk, Subscription: SubscriptionConnextStagingKovanSdk },
    };

export type ConnextStagingRinkebyContext = {
      ["Connext_Staging_Rinkeby"]: { Query: QueryConnextStagingRinkebySdk, Mutation: MutationConnextStagingRinkebySdk, Subscription: SubscriptionConnextStagingRinkebySdk },
    };

export type MeshContext = ConnextKovanContext & ConnextRinkebyContext & ConnextStagingKovanContext & ConnextStagingRinkebyContext & BaseMeshContext;


import { getMesh, ExecuteMeshFn, SubscribeMeshFn } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
import * as ExternalModule_0 from '@graphql-mesh/cache-localforage';
import * as ExternalModule_1 from '@graphql-mesh/graphql';
import * as ExternalModule_2 from '@graphql-mesh/merger-stitching';
import * as ExternalModule_3 from '@graphql-mesh/transform-prefix';
import * as ExternalModule_4 from './sources/Connext_Kovan/introspectionSchema';
import * as ExternalModule_5 from './sources/Connext_Rinkeby/introspectionSchema';
import * as ExternalModule_6 from './sources/Connext_Staging_Kovan/introspectionSchema';
import * as ExternalModule_7 from './sources/Connext_Staging_Rinkeby/introspectionSchema';

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
  [".graphclient/sources/Connext_Kovan/introspectionSchema"]: ExternalModule_4,
  // @ts-ignore
  [".graphclient/sources/Connext_Rinkeby/introspectionSchema"]: ExternalModule_5,
  // @ts-ignore
  [".graphclient/sources/Connext_Staging_Kovan/introspectionSchema"]: ExternalModule_6,
  // @ts-ignore
  [".graphclient/sources/Connext_Staging_Rinkeby/introspectionSchema"]: ExternalModule_7
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
export const rawConfig: YamlConfig.Config = {"sources":[{"name":"Connext_Kovan","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan","retry":5}},"transforms":[{"prefix":{"value":"kovan_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Staging_Kovan","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-staging-kovan","retry":5}},"transforms":[{"prefix":{"value":"stagingkovan_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Rinkeby","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby","retry":5}},"transforms":[{"prefix":{"value":"rinkeby_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]},{"name":"Connext_Staging_Rinkeby","handler":{"graphql":{"endpoint":"https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-staging-rinkeby","retry":5}},"transforms":[{"prefix":{"value":"stagingrinkeby_","includeRootOperations":true,"ignore":["_SubgraphErrorPolicy_"]}}]}],"documents":["./example-query.graphql"]} as any
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