/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
}

export interface AssetBalance_filter {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  amount?: Maybe<Scalars["BigInt"]>;
  amount_not?: Maybe<Scalars["BigInt"]>;
  amount_gt?: Maybe<Scalars["BigInt"]>;
  amount_lt?: Maybe<Scalars["BigInt"]>;
  amount_gte?: Maybe<Scalars["BigInt"]>;
  amount_lte?: Maybe<Scalars["BigInt"]>;
  amount_in?: Maybe<Array<Scalars["BigInt"]>>;
  amount_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  router?: Maybe<Scalars["String"]>;
  router_not?: Maybe<Scalars["String"]>;
  router_gt?: Maybe<Scalars["String"]>;
  router_lt?: Maybe<Scalars["String"]>;
  router_gte?: Maybe<Scalars["String"]>;
  router_lte?: Maybe<Scalars["String"]>;
  router_in?: Maybe<Array<Scalars["String"]>>;
  router_not_in?: Maybe<Array<Scalars["String"]>>;
  router_contains?: Maybe<Scalars["String"]>;
  router_not_contains?: Maybe<Scalars["String"]>;
  router_starts_with?: Maybe<Scalars["String"]>;
  router_not_starts_with?: Maybe<Scalars["String"]>;
  router_ends_with?: Maybe<Scalars["String"]>;
  router_not_ends_with?: Maybe<Scalars["String"]>;
}

export enum AssetBalance_orderBy {
  id = "id",
  amount = "amount",
  router = "router",
}

export interface Block_height {
  hash?: Maybe<Scalars["Bytes"]>;
  number?: Maybe<Scalars["Int"]>;
}

export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export interface Router_filter {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
}

export enum Router_orderBy {
  id = "id",
  assetBalances = "assetBalances",
  transactions = "transactions",
}

export enum TransactionStatus {
  Prepared = "Prepared",
  Fulfilled = "Fulfilled",
  Cancelled = "Cancelled",
}

export interface Transaction_filter {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  status?: Maybe<TransactionStatus>;
  status_not?: Maybe<TransactionStatus>;
  chainId?: Maybe<Scalars["BigInt"]>;
  chainId_not?: Maybe<Scalars["BigInt"]>;
  chainId_gt?: Maybe<Scalars["BigInt"]>;
  chainId_lt?: Maybe<Scalars["BigInt"]>;
  chainId_gte?: Maybe<Scalars["BigInt"]>;
  chainId_lte?: Maybe<Scalars["BigInt"]>;
  chainId_in?: Maybe<Array<Scalars["BigInt"]>>;
  chainId_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  user?: Maybe<Scalars["String"]>;
  user_not?: Maybe<Scalars["String"]>;
  user_gt?: Maybe<Scalars["String"]>;
  user_lt?: Maybe<Scalars["String"]>;
  user_gte?: Maybe<Scalars["String"]>;
  user_lte?: Maybe<Scalars["String"]>;
  user_in?: Maybe<Array<Scalars["String"]>>;
  user_not_in?: Maybe<Array<Scalars["String"]>>;
  user_contains?: Maybe<Scalars["String"]>;
  user_not_contains?: Maybe<Scalars["String"]>;
  user_starts_with?: Maybe<Scalars["String"]>;
  user_not_starts_with?: Maybe<Scalars["String"]>;
  user_ends_with?: Maybe<Scalars["String"]>;
  user_not_ends_with?: Maybe<Scalars["String"]>;
  router?: Maybe<Scalars["String"]>;
  router_not?: Maybe<Scalars["String"]>;
  router_gt?: Maybe<Scalars["String"]>;
  router_lt?: Maybe<Scalars["String"]>;
  router_gte?: Maybe<Scalars["String"]>;
  router_lte?: Maybe<Scalars["String"]>;
  router_in?: Maybe<Array<Scalars["String"]>>;
  router_not_in?: Maybe<Array<Scalars["String"]>>;
  router_contains?: Maybe<Scalars["String"]>;
  router_not_contains?: Maybe<Scalars["String"]>;
  router_starts_with?: Maybe<Scalars["String"]>;
  router_not_starts_with?: Maybe<Scalars["String"]>;
  router_ends_with?: Maybe<Scalars["String"]>;
  router_not_ends_with?: Maybe<Scalars["String"]>;
  sendingAssetId?: Maybe<Scalars["Bytes"]>;
  sendingAssetId_not?: Maybe<Scalars["Bytes"]>;
  sendingAssetId_in?: Maybe<Array<Scalars["Bytes"]>>;
  sendingAssetId_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  sendingAssetId_contains?: Maybe<Scalars["Bytes"]>;
  sendingAssetId_not_contains?: Maybe<Scalars["Bytes"]>;
  receivingAssetId?: Maybe<Scalars["Bytes"]>;
  receivingAssetId_not?: Maybe<Scalars["Bytes"]>;
  receivingAssetId_in?: Maybe<Array<Scalars["Bytes"]>>;
  receivingAssetId_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  receivingAssetId_contains?: Maybe<Scalars["Bytes"]>;
  receivingAssetId_not_contains?: Maybe<Scalars["Bytes"]>;
  sendingChainFallback?: Maybe<Scalars["Bytes"]>;
  sendingChainFallback_not?: Maybe<Scalars["Bytes"]>;
  sendingChainFallback_in?: Maybe<Array<Scalars["Bytes"]>>;
  sendingChainFallback_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  sendingChainFallback_contains?: Maybe<Scalars["Bytes"]>;
  sendingChainFallback_not_contains?: Maybe<Scalars["Bytes"]>;
  callTo?: Maybe<Scalars["Bytes"]>;
  callTo_not?: Maybe<Scalars["Bytes"]>;
  callTo_in?: Maybe<Array<Scalars["Bytes"]>>;
  callTo_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  callTo_contains?: Maybe<Scalars["Bytes"]>;
  callTo_not_contains?: Maybe<Scalars["Bytes"]>;
  receivingAddress?: Maybe<Scalars["Bytes"]>;
  receivingAddress_not?: Maybe<Scalars["Bytes"]>;
  receivingAddress_in?: Maybe<Array<Scalars["Bytes"]>>;
  receivingAddress_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  receivingAddress_contains?: Maybe<Scalars["Bytes"]>;
  receivingAddress_not_contains?: Maybe<Scalars["Bytes"]>;
  callDataHash?: Maybe<Scalars["Bytes"]>;
  callDataHash_not?: Maybe<Scalars["Bytes"]>;
  callDataHash_in?: Maybe<Array<Scalars["Bytes"]>>;
  callDataHash_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  callDataHash_contains?: Maybe<Scalars["Bytes"]>;
  callDataHash_not_contains?: Maybe<Scalars["Bytes"]>;
  transactionId?: Maybe<Scalars["Bytes"]>;
  transactionId_not?: Maybe<Scalars["Bytes"]>;
  transactionId_in?: Maybe<Array<Scalars["Bytes"]>>;
  transactionId_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  transactionId_contains?: Maybe<Scalars["Bytes"]>;
  transactionId_not_contains?: Maybe<Scalars["Bytes"]>;
  sendingChainId?: Maybe<Scalars["BigInt"]>;
  sendingChainId_not?: Maybe<Scalars["BigInt"]>;
  sendingChainId_gt?: Maybe<Scalars["BigInt"]>;
  sendingChainId_lt?: Maybe<Scalars["BigInt"]>;
  sendingChainId_gte?: Maybe<Scalars["BigInt"]>;
  sendingChainId_lte?: Maybe<Scalars["BigInt"]>;
  sendingChainId_in?: Maybe<Array<Scalars["BigInt"]>>;
  sendingChainId_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  receivingChainId?: Maybe<Scalars["BigInt"]>;
  receivingChainId_not?: Maybe<Scalars["BigInt"]>;
  receivingChainId_gt?: Maybe<Scalars["BigInt"]>;
  receivingChainId_lt?: Maybe<Scalars["BigInt"]>;
  receivingChainId_gte?: Maybe<Scalars["BigInt"]>;
  receivingChainId_lte?: Maybe<Scalars["BigInt"]>;
  receivingChainId_in?: Maybe<Array<Scalars["BigInt"]>>;
  receivingChainId_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  amount?: Maybe<Scalars["BigInt"]>;
  amount_not?: Maybe<Scalars["BigInt"]>;
  amount_gt?: Maybe<Scalars["BigInt"]>;
  amount_lt?: Maybe<Scalars["BigInt"]>;
  amount_gte?: Maybe<Scalars["BigInt"]>;
  amount_lte?: Maybe<Scalars["BigInt"]>;
  amount_in?: Maybe<Array<Scalars["BigInt"]>>;
  amount_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  expiry?: Maybe<Scalars["BigInt"]>;
  expiry_not?: Maybe<Scalars["BigInt"]>;
  expiry_gt?: Maybe<Scalars["BigInt"]>;
  expiry_lt?: Maybe<Scalars["BigInt"]>;
  expiry_gte?: Maybe<Scalars["BigInt"]>;
  expiry_lte?: Maybe<Scalars["BigInt"]>;
  expiry_in?: Maybe<Array<Scalars["BigInt"]>>;
  expiry_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  preparedBlockNumber?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_not?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_gt?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_lt?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_gte?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_lte?: Maybe<Scalars["BigInt"]>;
  preparedBlockNumber_in?: Maybe<Array<Scalars["BigInt"]>>;
  preparedBlockNumber_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  encryptedCallData?: Maybe<Scalars["String"]>;
  encryptedCallData_not?: Maybe<Scalars["String"]>;
  encryptedCallData_gt?: Maybe<Scalars["String"]>;
  encryptedCallData_lt?: Maybe<Scalars["String"]>;
  encryptedCallData_gte?: Maybe<Scalars["String"]>;
  encryptedCallData_lte?: Maybe<Scalars["String"]>;
  encryptedCallData_in?: Maybe<Array<Scalars["String"]>>;
  encryptedCallData_not_in?: Maybe<Array<Scalars["String"]>>;
  encryptedCallData_contains?: Maybe<Scalars["String"]>;
  encryptedCallData_not_contains?: Maybe<Scalars["String"]>;
  encryptedCallData_starts_with?: Maybe<Scalars["String"]>;
  encryptedCallData_not_starts_with?: Maybe<Scalars["String"]>;
  encryptedCallData_ends_with?: Maybe<Scalars["String"]>;
  encryptedCallData_not_ends_with?: Maybe<Scalars["String"]>;
  prepareCaller?: Maybe<Scalars["Bytes"]>;
  prepareCaller_not?: Maybe<Scalars["Bytes"]>;
  prepareCaller_in?: Maybe<Array<Scalars["Bytes"]>>;
  prepareCaller_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  prepareCaller_contains?: Maybe<Scalars["Bytes"]>;
  prepareCaller_not_contains?: Maybe<Scalars["Bytes"]>;
  bidSignature?: Maybe<Scalars["Bytes"]>;
  bidSignature_not?: Maybe<Scalars["Bytes"]>;
  bidSignature_in?: Maybe<Array<Scalars["Bytes"]>>;
  bidSignature_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  bidSignature_contains?: Maybe<Scalars["Bytes"]>;
  bidSignature_not_contains?: Maybe<Scalars["Bytes"]>;
  encodedBid?: Maybe<Scalars["Bytes"]>;
  encodedBid_not?: Maybe<Scalars["Bytes"]>;
  encodedBid_in?: Maybe<Array<Scalars["Bytes"]>>;
  encodedBid_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  encodedBid_contains?: Maybe<Scalars["Bytes"]>;
  encodedBid_not_contains?: Maybe<Scalars["Bytes"]>;
  relayerFee?: Maybe<Scalars["BigInt"]>;
  relayerFee_not?: Maybe<Scalars["BigInt"]>;
  relayerFee_gt?: Maybe<Scalars["BigInt"]>;
  relayerFee_lt?: Maybe<Scalars["BigInt"]>;
  relayerFee_gte?: Maybe<Scalars["BigInt"]>;
  relayerFee_lte?: Maybe<Scalars["BigInt"]>;
  relayerFee_in?: Maybe<Array<Scalars["BigInt"]>>;
  relayerFee_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  signature?: Maybe<Scalars["Bytes"]>;
  signature_not?: Maybe<Scalars["Bytes"]>;
  signature_in?: Maybe<Array<Scalars["Bytes"]>>;
  signature_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  signature_contains?: Maybe<Scalars["Bytes"]>;
  signature_not_contains?: Maybe<Scalars["Bytes"]>;
  callData?: Maybe<Scalars["String"]>;
  callData_not?: Maybe<Scalars["String"]>;
  callData_gt?: Maybe<Scalars["String"]>;
  callData_lt?: Maybe<Scalars["String"]>;
  callData_gte?: Maybe<Scalars["String"]>;
  callData_lte?: Maybe<Scalars["String"]>;
  callData_in?: Maybe<Array<Scalars["String"]>>;
  callData_not_in?: Maybe<Array<Scalars["String"]>>;
  callData_contains?: Maybe<Scalars["String"]>;
  callData_not_contains?: Maybe<Scalars["String"]>;
  callData_starts_with?: Maybe<Scalars["String"]>;
  callData_not_starts_with?: Maybe<Scalars["String"]>;
  callData_ends_with?: Maybe<Scalars["String"]>;
  callData_not_ends_with?: Maybe<Scalars["String"]>;
  fulfillCaller?: Maybe<Scalars["Bytes"]>;
  fulfillCaller_not?: Maybe<Scalars["Bytes"]>;
  fulfillCaller_in?: Maybe<Array<Scalars["Bytes"]>>;
  fulfillCaller_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  fulfillCaller_contains?: Maybe<Scalars["Bytes"]>;
  fulfillCaller_not_contains?: Maybe<Scalars["Bytes"]>;
  cancelCaller?: Maybe<Scalars["Bytes"]>;
  cancelCaller_not?: Maybe<Scalars["Bytes"]>;
  cancelCaller_in?: Maybe<Array<Scalars["Bytes"]>>;
  cancelCaller_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  cancelCaller_contains?: Maybe<Scalars["Bytes"]>;
  cancelCaller_not_contains?: Maybe<Scalars["Bytes"]>;
}

export enum Transaction_orderBy {
  id = "id",
  status = "status",
  chainId = "chainId",
  user = "user",
  router = "router",
  sendingAssetId = "sendingAssetId",
  receivingAssetId = "receivingAssetId",
  sendingChainFallback = "sendingChainFallback",
  callTo = "callTo",
  receivingAddress = "receivingAddress",
  callDataHash = "callDataHash",
  transactionId = "transactionId",
  sendingChainId = "sendingChainId",
  receivingChainId = "receivingChainId",
  amount = "amount",
  expiry = "expiry",
  preparedBlockNumber = "preparedBlockNumber",
  encryptedCallData = "encryptedCallData",
  prepareCaller = "prepareCaller",
  bidSignature = "bidSignature",
  encodedBid = "encodedBid",
  relayerFee = "relayerFee",
  signature = "signature",
  callData = "callData",
  fulfillCaller = "fulfillCaller",
  cancelCaller = "cancelCaller",
}

export interface User_filter {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
}

export enum User_orderBy {
  id = "id",
  transactions = "transactions",
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = "deny",
}

export const scalarsEnumsHash: import("gqless").ScalarsEnumsHash = {
  AssetBalance_orderBy: true,
  BigDecimal: true,
  BigInt: true,
  Boolean: true,
  Bytes: true,
  ID: true,
  Int: true,
  OrderDirection: true,
  Router_orderBy: true,
  String: true,
  TransactionStatus: true,
  Transaction_orderBy: true,
  User_orderBy: true,
  _SubgraphErrorPolicy_: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    assetBalance: { __type: "AssetBalance", __args: { id: "ID!", block: "Block_height" } },
    assetBalances: {
      __type: "[AssetBalance!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "AssetBalance_orderBy",
        orderDirection: "OrderDirection",
        where: "AssetBalance_filter",
        block: "Block_height",
      },
    },
    router: { __type: "Router", __args: { id: "ID!", block: "Block_height" } },
    routers: {
      __type: "[Router!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Router_orderBy",
        orderDirection: "OrderDirection",
        where: "Router_filter",
        block: "Block_height",
      },
    },
    transaction: { __type: "Transaction", __args: { id: "ID!", block: "Block_height" } },
    transactions: {
      __type: "[Transaction!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Transaction_orderBy",
        orderDirection: "OrderDirection",
        where: "Transaction_filter",
        block: "Block_height",
      },
    },
    user: { __type: "User", __args: { id: "ID!", block: "Block_height" } },
    users: {
      __type: "[User!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "User_orderBy",
        orderDirection: "OrderDirection",
        where: "User_filter",
        block: "Block_height",
      },
    },
    _meta: { __type: "_Meta_", __args: { block: "Block_height" } },
  },
  mutation: {},
  subscription: {
    __typename: { __type: "String!" },
    assetBalance: { __type: "AssetBalance", __args: { id: "ID!", block: "Block_height" } },
    assetBalances: {
      __type: "[AssetBalance!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "AssetBalance_orderBy",
        orderDirection: "OrderDirection",
        where: "AssetBalance_filter",
        block: "Block_height",
      },
    },
    router: { __type: "Router", __args: { id: "ID!", block: "Block_height" } },
    routers: {
      __type: "[Router!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Router_orderBy",
        orderDirection: "OrderDirection",
        where: "Router_filter",
        block: "Block_height",
      },
    },
    transaction: { __type: "Transaction", __args: { id: "ID!", block: "Block_height" } },
    transactions: {
      __type: "[Transaction!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Transaction_orderBy",
        orderDirection: "OrderDirection",
        where: "Transaction_filter",
        block: "Block_height",
      },
    },
    user: { __type: "User", __args: { id: "ID!", block: "Block_height" } },
    users: {
      __type: "[User!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "User_orderBy",
        orderDirection: "OrderDirection",
        where: "User_filter",
        block: "Block_height",
      },
    },
    _meta: { __type: "_Meta_", __args: { block: "Block_height" } },
  },
  AssetBalance: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    amount: { __type: "BigInt!" },
    router: { __type: "Router!" },
  },
  AssetBalance_filter: {
    id: { __type: "ID" },
    id_not: { __type: "ID" },
    id_gt: { __type: "ID" },
    id_lt: { __type: "ID" },
    id_gte: { __type: "ID" },
    id_lte: { __type: "ID" },
    id_in: { __type: "[ID!]" },
    id_not_in: { __type: "[ID!]" },
    amount: { __type: "BigInt" },
    amount_not: { __type: "BigInt" },
    amount_gt: { __type: "BigInt" },
    amount_lt: { __type: "BigInt" },
    amount_gte: { __type: "BigInt" },
    amount_lte: { __type: "BigInt" },
    amount_in: { __type: "[BigInt!]" },
    amount_not_in: { __type: "[BigInt!]" },
    router: { __type: "String" },
    router_not: { __type: "String" },
    router_gt: { __type: "String" },
    router_lt: { __type: "String" },
    router_gte: { __type: "String" },
    router_lte: { __type: "String" },
    router_in: { __type: "[String!]" },
    router_not_in: { __type: "[String!]" },
    router_contains: { __type: "String" },
    router_not_contains: { __type: "String" },
    router_starts_with: { __type: "String" },
    router_not_starts_with: { __type: "String" },
    router_ends_with: { __type: "String" },
    router_not_ends_with: { __type: "String" },
  },
  Block_height: { hash: { __type: "Bytes" }, number: { __type: "Int" } },
  Router: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    assetBalances: {
      __type: "[AssetBalance!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "AssetBalance_orderBy",
        orderDirection: "OrderDirection",
        where: "AssetBalance_filter",
      },
    },
    transactions: {
      __type: "[Transaction!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Transaction_orderBy",
        orderDirection: "OrderDirection",
        where: "Transaction_filter",
      },
    },
  },
  Router_filter: {
    id: { __type: "ID" },
    id_not: { __type: "ID" },
    id_gt: { __type: "ID" },
    id_lt: { __type: "ID" },
    id_gte: { __type: "ID" },
    id_lte: { __type: "ID" },
    id_in: { __type: "[ID!]" },
    id_not_in: { __type: "[ID!]" },
  },
  Transaction: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    status: { __type: "TransactionStatus!" },
    chainId: { __type: "BigInt!" },
    user: { __type: "User!" },
    router: { __type: "Router!" },
    sendingAssetId: { __type: "Bytes!" },
    receivingAssetId: { __type: "Bytes!" },
    sendingChainFallback: { __type: "Bytes!" },
    callTo: { __type: "Bytes!" },
    receivingAddress: { __type: "Bytes!" },
    callDataHash: { __type: "Bytes!" },
    transactionId: { __type: "Bytes!" },
    sendingChainId: { __type: "BigInt!" },
    receivingChainId: { __type: "BigInt!" },
    amount: { __type: "BigInt!" },
    expiry: { __type: "BigInt!" },
    preparedBlockNumber: { __type: "BigInt!" },
    encryptedCallData: { __type: "String!" },
    prepareCaller: { __type: "Bytes" },
    bidSignature: { __type: "Bytes!" },
    encodedBid: { __type: "Bytes!" },
    relayerFee: { __type: "BigInt" },
    signature: { __type: "Bytes" },
    callData: { __type: "String" },
    fulfillCaller: { __type: "Bytes" },
    cancelCaller: { __type: "Bytes" },
  },
  Transaction_filter: {
    id: { __type: "ID" },
    id_not: { __type: "ID" },
    id_gt: { __type: "ID" },
    id_lt: { __type: "ID" },
    id_gte: { __type: "ID" },
    id_lte: { __type: "ID" },
    id_in: { __type: "[ID!]" },
    id_not_in: { __type: "[ID!]" },
    status: { __type: "TransactionStatus" },
    status_not: { __type: "TransactionStatus" },
    chainId: { __type: "BigInt" },
    chainId_not: { __type: "BigInt" },
    chainId_gt: { __type: "BigInt" },
    chainId_lt: { __type: "BigInt" },
    chainId_gte: { __type: "BigInt" },
    chainId_lte: { __type: "BigInt" },
    chainId_in: { __type: "[BigInt!]" },
    chainId_not_in: { __type: "[BigInt!]" },
    user: { __type: "String" },
    user_not: { __type: "String" },
    user_gt: { __type: "String" },
    user_lt: { __type: "String" },
    user_gte: { __type: "String" },
    user_lte: { __type: "String" },
    user_in: { __type: "[String!]" },
    user_not_in: { __type: "[String!]" },
    user_contains: { __type: "String" },
    user_not_contains: { __type: "String" },
    user_starts_with: { __type: "String" },
    user_not_starts_with: { __type: "String" },
    user_ends_with: { __type: "String" },
    user_not_ends_with: { __type: "String" },
    router: { __type: "String" },
    router_not: { __type: "String" },
    router_gt: { __type: "String" },
    router_lt: { __type: "String" },
    router_gte: { __type: "String" },
    router_lte: { __type: "String" },
    router_in: { __type: "[String!]" },
    router_not_in: { __type: "[String!]" },
    router_contains: { __type: "String" },
    router_not_contains: { __type: "String" },
    router_starts_with: { __type: "String" },
    router_not_starts_with: { __type: "String" },
    router_ends_with: { __type: "String" },
    router_not_ends_with: { __type: "String" },
    sendingAssetId: { __type: "Bytes" },
    sendingAssetId_not: { __type: "Bytes" },
    sendingAssetId_in: { __type: "[Bytes!]" },
    sendingAssetId_not_in: { __type: "[Bytes!]" },
    sendingAssetId_contains: { __type: "Bytes" },
    sendingAssetId_not_contains: { __type: "Bytes" },
    receivingAssetId: { __type: "Bytes" },
    receivingAssetId_not: { __type: "Bytes" },
    receivingAssetId_in: { __type: "[Bytes!]" },
    receivingAssetId_not_in: { __type: "[Bytes!]" },
    receivingAssetId_contains: { __type: "Bytes" },
    receivingAssetId_not_contains: { __type: "Bytes" },
    sendingChainFallback: { __type: "Bytes" },
    sendingChainFallback_not: { __type: "Bytes" },
    sendingChainFallback_in: { __type: "[Bytes!]" },
    sendingChainFallback_not_in: { __type: "[Bytes!]" },
    sendingChainFallback_contains: { __type: "Bytes" },
    sendingChainFallback_not_contains: { __type: "Bytes" },
    callTo: { __type: "Bytes" },
    callTo_not: { __type: "Bytes" },
    callTo_in: { __type: "[Bytes!]" },
    callTo_not_in: { __type: "[Bytes!]" },
    callTo_contains: { __type: "Bytes" },
    callTo_not_contains: { __type: "Bytes" },
    receivingAddress: { __type: "Bytes" },
    receivingAddress_not: { __type: "Bytes" },
    receivingAddress_in: { __type: "[Bytes!]" },
    receivingAddress_not_in: { __type: "[Bytes!]" },
    receivingAddress_contains: { __type: "Bytes" },
    receivingAddress_not_contains: { __type: "Bytes" },
    callDataHash: { __type: "Bytes" },
    callDataHash_not: { __type: "Bytes" },
    callDataHash_in: { __type: "[Bytes!]" },
    callDataHash_not_in: { __type: "[Bytes!]" },
    callDataHash_contains: { __type: "Bytes" },
    callDataHash_not_contains: { __type: "Bytes" },
    transactionId: { __type: "Bytes" },
    transactionId_not: { __type: "Bytes" },
    transactionId_in: { __type: "[Bytes!]" },
    transactionId_not_in: { __type: "[Bytes!]" },
    transactionId_contains: { __type: "Bytes" },
    transactionId_not_contains: { __type: "Bytes" },
    sendingChainId: { __type: "BigInt" },
    sendingChainId_not: { __type: "BigInt" },
    sendingChainId_gt: { __type: "BigInt" },
    sendingChainId_lt: { __type: "BigInt" },
    sendingChainId_gte: { __type: "BigInt" },
    sendingChainId_lte: { __type: "BigInt" },
    sendingChainId_in: { __type: "[BigInt!]" },
    sendingChainId_not_in: { __type: "[BigInt!]" },
    receivingChainId: { __type: "BigInt" },
    receivingChainId_not: { __type: "BigInt" },
    receivingChainId_gt: { __type: "BigInt" },
    receivingChainId_lt: { __type: "BigInt" },
    receivingChainId_gte: { __type: "BigInt" },
    receivingChainId_lte: { __type: "BigInt" },
    receivingChainId_in: { __type: "[BigInt!]" },
    receivingChainId_not_in: { __type: "[BigInt!]" },
    amount: { __type: "BigInt" },
    amount_not: { __type: "BigInt" },
    amount_gt: { __type: "BigInt" },
    amount_lt: { __type: "BigInt" },
    amount_gte: { __type: "BigInt" },
    amount_lte: { __type: "BigInt" },
    amount_in: { __type: "[BigInt!]" },
    amount_not_in: { __type: "[BigInt!]" },
    expiry: { __type: "BigInt" },
    expiry_not: { __type: "BigInt" },
    expiry_gt: { __type: "BigInt" },
    expiry_lt: { __type: "BigInt" },
    expiry_gte: { __type: "BigInt" },
    expiry_lte: { __type: "BigInt" },
    expiry_in: { __type: "[BigInt!]" },
    expiry_not_in: { __type: "[BigInt!]" },
    preparedBlockNumber: { __type: "BigInt" },
    preparedBlockNumber_not: { __type: "BigInt" },
    preparedBlockNumber_gt: { __type: "BigInt" },
    preparedBlockNumber_lt: { __type: "BigInt" },
    preparedBlockNumber_gte: { __type: "BigInt" },
    preparedBlockNumber_lte: { __type: "BigInt" },
    preparedBlockNumber_in: { __type: "[BigInt!]" },
    preparedBlockNumber_not_in: { __type: "[BigInt!]" },
    encryptedCallData: { __type: "String" },
    encryptedCallData_not: { __type: "String" },
    encryptedCallData_gt: { __type: "String" },
    encryptedCallData_lt: { __type: "String" },
    encryptedCallData_gte: { __type: "String" },
    encryptedCallData_lte: { __type: "String" },
    encryptedCallData_in: { __type: "[String!]" },
    encryptedCallData_not_in: { __type: "[String!]" },
    encryptedCallData_contains: { __type: "String" },
    encryptedCallData_not_contains: { __type: "String" },
    encryptedCallData_starts_with: { __type: "String" },
    encryptedCallData_not_starts_with: { __type: "String" },
    encryptedCallData_ends_with: { __type: "String" },
    encryptedCallData_not_ends_with: { __type: "String" },
    prepareCaller: { __type: "Bytes" },
    prepareCaller_not: { __type: "Bytes" },
    prepareCaller_in: { __type: "[Bytes!]" },
    prepareCaller_not_in: { __type: "[Bytes!]" },
    prepareCaller_contains: { __type: "Bytes" },
    prepareCaller_not_contains: { __type: "Bytes" },
    bidSignature: { __type: "Bytes" },
    bidSignature_not: { __type: "Bytes" },
    bidSignature_in: { __type: "[Bytes!]" },
    bidSignature_not_in: { __type: "[Bytes!]" },
    bidSignature_contains: { __type: "Bytes" },
    bidSignature_not_contains: { __type: "Bytes" },
    encodedBid: { __type: "Bytes" },
    encodedBid_not: { __type: "Bytes" },
    encodedBid_in: { __type: "[Bytes!]" },
    encodedBid_not_in: { __type: "[Bytes!]" },
    encodedBid_contains: { __type: "Bytes" },
    encodedBid_not_contains: { __type: "Bytes" },
    relayerFee: { __type: "BigInt" },
    relayerFee_not: { __type: "BigInt" },
    relayerFee_gt: { __type: "BigInt" },
    relayerFee_lt: { __type: "BigInt" },
    relayerFee_gte: { __type: "BigInt" },
    relayerFee_lte: { __type: "BigInt" },
    relayerFee_in: { __type: "[BigInt!]" },
    relayerFee_not_in: { __type: "[BigInt!]" },
    signature: { __type: "Bytes" },
    signature_not: { __type: "Bytes" },
    signature_in: { __type: "[Bytes!]" },
    signature_not_in: { __type: "[Bytes!]" },
    signature_contains: { __type: "Bytes" },
    signature_not_contains: { __type: "Bytes" },
    callData: { __type: "String" },
    callData_not: { __type: "String" },
    callData_gt: { __type: "String" },
    callData_lt: { __type: "String" },
    callData_gte: { __type: "String" },
    callData_lte: { __type: "String" },
    callData_in: { __type: "[String!]" },
    callData_not_in: { __type: "[String!]" },
    callData_contains: { __type: "String" },
    callData_not_contains: { __type: "String" },
    callData_starts_with: { __type: "String" },
    callData_not_starts_with: { __type: "String" },
    callData_ends_with: { __type: "String" },
    callData_not_ends_with: { __type: "String" },
    fulfillCaller: { __type: "Bytes" },
    fulfillCaller_not: { __type: "Bytes" },
    fulfillCaller_in: { __type: "[Bytes!]" },
    fulfillCaller_not_in: { __type: "[Bytes!]" },
    fulfillCaller_contains: { __type: "Bytes" },
    fulfillCaller_not_contains: { __type: "Bytes" },
    cancelCaller: { __type: "Bytes" },
    cancelCaller_not: { __type: "Bytes" },
    cancelCaller_in: { __type: "[Bytes!]" },
    cancelCaller_not_in: { __type: "[Bytes!]" },
    cancelCaller_contains: { __type: "Bytes" },
    cancelCaller_not_contains: { __type: "Bytes" },
  },
  User: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    transactions: {
      __type: "[Transaction!]!",
      __args: {
        skip: "Int",
        first: "Int",
        orderBy: "Transaction_orderBy",
        orderDirection: "OrderDirection",
        where: "Transaction_filter",
      },
    },
  },
  User_filter: {
    id: { __type: "ID" },
    id_not: { __type: "ID" },
    id_gt: { __type: "ID" },
    id_lt: { __type: "ID" },
    id_gte: { __type: "ID" },
    id_lte: { __type: "ID" },
    id_in: { __type: "[ID!]" },
    id_not_in: { __type: "[ID!]" },
  },
  _Block_: { __typename: { __type: "String!" }, hash: { __type: "Bytes" }, number: { __type: "Int!" } },
  _Meta_: {
    __typename: { __type: "String!" },
    block: { __type: "_Block_!" },
    deployment: { __type: "String!" },
    hasIndexingErrors: { __type: "Boolean!" },
  },
} as const;

export interface Query {
  __typename: "Query" | undefined;
  assetBalance: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<AssetBalance>;
  assetBalances: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<AssetBalance_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<AssetBalance>;
  router: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<Router>;
  routers: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Router_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Router_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<Router>;
  transaction: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<Transaction>;
  transactions: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Transaction_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<Transaction>;
  user: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<User>;
  users: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<User_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<User_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<User>;
  /**
   * Access to subgraph metadata
   */
  _meta: (args?: { block?: Maybe<Block_height> }) => Maybe<_Meta_>;
}

export interface Mutation {
  __typename: "Mutation" | undefined;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
  assetBalance: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<AssetBalance>;
  assetBalances: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<AssetBalance_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<AssetBalance>;
  router: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<Router>;
  routers: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Router_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Router_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<Router>;
  transaction: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<Transaction>;
  transactions: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Transaction_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<Transaction>;
  user: (args: {
    id: Scalars["ID"]
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Maybe<User>;
  users: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<User_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<User_filter>
    /**
     * The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted.
     */;
    block?: Maybe<Block_height>;
  }) => Array<User>;
  /**
   * Access to subgraph metadata
   */
  _meta: (args?: { block?: Maybe<Block_height> }) => Maybe<_Meta_>;
}

export interface AssetBalance {
  __typename: "AssetBalance" | undefined;
  id: ScalarsEnums["ID"];
  amount: ScalarsEnums["BigInt"];
  router: Router;
}

export interface Router {
  __typename: "Router" | undefined;
  id: ScalarsEnums["ID"];
  assetBalances: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<AssetBalance_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_filter>;
  }) => Array<AssetBalance>;
  transactions: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Transaction_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_filter>;
  }) => Array<Transaction>;
}

export interface Transaction {
  __typename: "Transaction" | undefined;
  id: ScalarsEnums["ID"];
  status: ScalarsEnums["TransactionStatus"];
  chainId: ScalarsEnums["BigInt"];
  user: User;
  router: Router;
  sendingAssetId: ScalarsEnums["Bytes"];
  receivingAssetId: ScalarsEnums["Bytes"];
  sendingChainFallback: ScalarsEnums["Bytes"];
  callTo: ScalarsEnums["Bytes"];
  receivingAddress: ScalarsEnums["Bytes"];
  callDataHash: ScalarsEnums["Bytes"];
  transactionId: ScalarsEnums["Bytes"];
  sendingChainId: ScalarsEnums["BigInt"];
  receivingChainId: ScalarsEnums["BigInt"];
  amount: ScalarsEnums["BigInt"];
  expiry: ScalarsEnums["BigInt"];
  preparedBlockNumber: ScalarsEnums["BigInt"];
  encryptedCallData: ScalarsEnums["String"];
  prepareCaller?: Maybe<ScalarsEnums["Bytes"]>;
  bidSignature: ScalarsEnums["Bytes"];
  encodedBid: ScalarsEnums["Bytes"];
  relayerFee?: Maybe<ScalarsEnums["BigInt"]>;
  signature?: Maybe<ScalarsEnums["Bytes"]>;
  callData?: Maybe<ScalarsEnums["String"]>;
  fulfillCaller?: Maybe<ScalarsEnums["Bytes"]>;
  cancelCaller?: Maybe<ScalarsEnums["Bytes"]>;
}

export interface User {
  __typename: "User" | undefined;
  id: ScalarsEnums["ID"];
  transactions: (args?: {
    /**
     * @defaultValue `0`
     */
    skip?: Maybe<Scalars["Int"]>
    /**
     * @defaultValue `100`
     */;
    first?: Maybe<Scalars["Int"]>;
    orderBy?: Maybe<Transaction_orderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_filter>;
  }) => Array<Transaction>;
}

export interface _Block_ {
  __typename: "_Block_" | undefined;
  /**
   * The hash of the block
   */
  hash?: Maybe<ScalarsEnums["Bytes"]>;
  /**
   * The block number
   */
  number: ScalarsEnums["Int"];
}

/**
 * The type for the top-level _meta field
 */
export interface _Meta_ {
  __typename: "_Meta_" | undefined;
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /**
   * The deployment ID
   */
  deployment: ScalarsEnums["String"];
  /**
   * If `true`, the subgraph encountered indexing errors at some past block
   */
  hasIndexingErrors: ScalarsEnums["Boolean"];
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  AssetBalance: AssetBalance;
  Router: Router;
  Transaction: Transaction;
  User: User;
  _Block_: _Block_;
  _Meta_: _Meta_;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "AssetBalance"
  | "Router"
  | "Transaction"
  | "User"
  | "_Block_"
  | "_Meta_";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  AssetBalance_orderBy: AssetBalance_orderBy | undefined;
  OrderDirection: OrderDirection | undefined;
  Router_orderBy: Router_orderBy | undefined;
  TransactionStatus: TransactionStatus | undefined;
  Transaction_orderBy: Transaction_orderBy | undefined;
  User_orderBy: User_orderBy | undefined;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_ | undefined;
}
