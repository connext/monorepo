// @ts-nocheck
import { buildSchema, Source } from 'graphql';

const source = new Source(/* GraphQL */`
schema {
  query: Query
  subscription: Subscription
}

"Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive."
directive @entity on OBJECT

"Defined a Subgraph ID for an object type"
directive @subgraphId(id: String!) on OBJECT

"creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API."
directive @derivedFrom(field: String!) on FIELD_DEFINITION

type Asset {
  id: ID!
  local: Bytes!
  adoptedAsset: Bytes!
  canonicalId: Bytes!
  canonicalDomain: BigInt!
  blockNumber: BigInt!
}

type AssetBalance {
  id: ID!
  amount: BigInt!
  router: Router!
  asset: Asset!
}

input AssetBalance_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  amount: BigInt
  amount_not: BigInt
  amount_gt: BigInt
  amount_lt: BigInt
  amount_gte: BigInt
  amount_lte: BigInt
  amount_in: [BigInt!]
  amount_not_in: [BigInt!]
  router: String
  router_not: String
  router_gt: String
  router_lt: String
  router_gte: String
  router_lte: String
  router_in: [String!]
  router_not_in: [String!]
  router_contains: String
  router_contains_nocase: String
  router_not_contains: String
  router_not_contains_nocase: String
  router_starts_with: String
  router_starts_with_nocase: String
  router_not_starts_with: String
  router_not_starts_with_nocase: String
  router_ends_with: String
  router_ends_with_nocase: String
  router_not_ends_with: String
  router_not_ends_with_nocase: String
  asset: String
  asset_not: String
  asset_gt: String
  asset_lt: String
  asset_gte: String
  asset_lte: String
  asset_in: [String!]
  asset_not_in: [String!]
  asset_contains: String
  asset_contains_nocase: String
  asset_not_contains: String
  asset_not_contains_nocase: String
  asset_starts_with: String
  asset_starts_with_nocase: String
  asset_not_starts_with: String
  asset_not_starts_with_nocase: String
  asset_ends_with: String
  asset_ends_with_nocase: String
  asset_not_ends_with: String
  asset_not_ends_with_nocase: String
  """Filter for the block changed event."""
  _change_block: BlockChangedFilter
}

enum AssetBalance_orderBy {
  id
  amount
  router
  asset
}

input Asset_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  local: Bytes
  local_not: Bytes
  local_in: [Bytes!]
  local_not_in: [Bytes!]
  local_contains: Bytes
  local_not_contains: Bytes
  adoptedAsset: Bytes
  adoptedAsset_not: Bytes
  adoptedAsset_in: [Bytes!]
  adoptedAsset_not_in: [Bytes!]
  adoptedAsset_contains: Bytes
  adoptedAsset_not_contains: Bytes
  canonicalId: Bytes
  canonicalId_not: Bytes
  canonicalId_in: [Bytes!]
  canonicalId_not_in: [Bytes!]
  canonicalId_contains: Bytes
  canonicalId_not_contains: Bytes
  canonicalDomain: BigInt
  canonicalDomain_not: BigInt
  canonicalDomain_gt: BigInt
  canonicalDomain_lt: BigInt
  canonicalDomain_gte: BigInt
  canonicalDomain_lte: BigInt
  canonicalDomain_in: [BigInt!]
  canonicalDomain_not_in: [BigInt!]
  blockNumber: BigInt
  blockNumber_not: BigInt
  blockNumber_gt: BigInt
  blockNumber_lt: BigInt
  blockNumber_gte: BigInt
  blockNumber_lte: BigInt
  blockNumber_in: [BigInt!]
  blockNumber_not_in: [BigInt!]
  """Filter for the block changed event."""
  _change_block: BlockChangedFilter
}

enum Asset_orderBy {
  id
  local
  adoptedAsset
  canonicalId
  canonicalDomain
  blockNumber
}

scalar BigDecimal

scalar BigInt

input BlockChangedFilter {
  number_gte: Int!
}

input Block_height {
  hash: Bytes
  number: Int
  number_gte: Int
}

scalar Bytes

"""Defines the order direction, either ascending or descending"""
enum OrderDirection {
  asc
  desc
}

type Query {
  asset(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Asset
  assets(
    skip: Int = 0
    first: Int = 100
    orderBy: Asset_orderBy
    orderDirection: OrderDirection
    where: Asset_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Asset!]!
  assetBalance(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): AssetBalance
  assetBalances(
    skip: Int = 0
    first: Int = 100
    orderBy: AssetBalance_orderBy
    orderDirection: OrderDirection
    where: AssetBalance_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [AssetBalance!]!
  router(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Router
  routers(
    skip: Int = 0
    first: Int = 100
    orderBy: Router_orderBy
    orderDirection: OrderDirection
    where: Router_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Router!]!
  transfer(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Transfer
  transfers(
    skip: Int = 0
    first: Int = 100
    orderBy: Transfer_orderBy
    orderDirection: OrderDirection
    where: Transfer_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Transfer!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type Router {
  id: ID!
  isActive: Boolean!
  owner: Bytes
  recipient: Bytes
  proposedOwner: Bytes
  proposedTimestamp: BigInt
  assetBalances(skip: Int = 0, first: Int = 100, orderBy: AssetBalance_orderBy, orderDirection: OrderDirection, where: AssetBalance_filter): [AssetBalance!]!
}

input Router_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  isActive: Boolean
  isActive_not: Boolean
  isActive_in: [Boolean!]
  isActive_not_in: [Boolean!]
  owner: Bytes
  owner_not: Bytes
  owner_in: [Bytes!]
  owner_not_in: [Bytes!]
  owner_contains: Bytes
  owner_not_contains: Bytes
  recipient: Bytes
  recipient_not: Bytes
  recipient_in: [Bytes!]
  recipient_not_in: [Bytes!]
  recipient_contains: Bytes
  recipient_not_contains: Bytes
  proposedOwner: Bytes
  proposedOwner_not: Bytes
  proposedOwner_in: [Bytes!]
  proposedOwner_not_in: [Bytes!]
  proposedOwner_contains: Bytes
  proposedOwner_not_contains: Bytes
  proposedTimestamp: BigInt
  proposedTimestamp_not: BigInt
  proposedTimestamp_gt: BigInt
  proposedTimestamp_lt: BigInt
  proposedTimestamp_gte: BigInt
  proposedTimestamp_lte: BigInt
  proposedTimestamp_in: [BigInt!]
  proposedTimestamp_not_in: [BigInt!]
  """Filter for the block changed event."""
  _change_block: BlockChangedFilter
}

enum Router_orderBy {
  id
  isActive
  owner
  recipient
  proposedOwner
  proposedTimestamp
  assetBalances
}

type Subscription {
  asset(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Asset
  assets(
    skip: Int = 0
    first: Int = 100
    orderBy: Asset_orderBy
    orderDirection: OrderDirection
    where: Asset_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Asset!]!
  assetBalance(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): AssetBalance
  assetBalances(
    skip: Int = 0
    first: Int = 100
    orderBy: AssetBalance_orderBy
    orderDirection: OrderDirection
    where: AssetBalance_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [AssetBalance!]!
  router(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Router
  routers(
    skip: Int = 0
    first: Int = 100
    orderBy: Router_orderBy
    orderDirection: OrderDirection
    where: Router_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Router!]!
  transfer(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Transfer
  transfers(
    skip: Int = 0
    first: Int = 100
    orderBy: Transfer_orderBy
    orderDirection: OrderDirection
    where: Transfer_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Transfer!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type Transfer {
  id: ID!
  originDomain: BigInt
  destinationDomain: BigInt
  chainId: BigInt
  status: TransferStatus
  to: Bytes
  transferId: Bytes
  callTo: Bytes
  callData: Bytes
  idx: BigInt
  nonce: BigInt
  routers(skip: Int = 0, first: Int = 100, orderBy: Router_orderBy, orderDirection: OrderDirection, where: Router_filter): [Router!]
  relayerFee: BigInt
  xcalledTransactingAsset: Bytes
  xcalledLocalAsset: Bytes
  xcalledTransactingAmount: BigInt
  xcalledLocalAmount: BigInt
  xcalledCaller: Bytes
  xcalledTransactionHash: Bytes
  xcalledTimestamp: BigInt
  xcalledGasPrice: BigInt
  xcalledGasLimit: BigInt
  xcalledBlockNumber: BigInt
  executedCaller: Bytes
  executedTransactingAmount: BigInt
  executedLocalAmount: BigInt
  executedTransactingAsset: Bytes
  executedLocalAsset: Bytes
  executedTransactionHash: Bytes
  executedTimestamp: BigInt
  executedGasPrice: BigInt
  executedGasLimit: BigInt
  executedBlockNumber: BigInt
  reconciledCaller: Bytes
  reconciledLocalAsset: Bytes
  reconciledLocalAmount: BigInt
  reconciledTransactionHash: Bytes
  reconciledTimestamp: BigInt
  reconciledGasPrice: BigInt
  reconciledGasLimit: BigInt
  reconciledBlockNumber: BigInt
}

enum TransferStatus {
  XCalled
  Executed
  Reconciled
}

input Transfer_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  originDomain: BigInt
  originDomain_not: BigInt
  originDomain_gt: BigInt
  originDomain_lt: BigInt
  originDomain_gte: BigInt
  originDomain_lte: BigInt
  originDomain_in: [BigInt!]
  originDomain_not_in: [BigInt!]
  destinationDomain: BigInt
  destinationDomain_not: BigInt
  destinationDomain_gt: BigInt
  destinationDomain_lt: BigInt
  destinationDomain_gte: BigInt
  destinationDomain_lte: BigInt
  destinationDomain_in: [BigInt!]
  destinationDomain_not_in: [BigInt!]
  chainId: BigInt
  chainId_not: BigInt
  chainId_gt: BigInt
  chainId_lt: BigInt
  chainId_gte: BigInt
  chainId_lte: BigInt
  chainId_in: [BigInt!]
  chainId_not_in: [BigInt!]
  status: TransferStatus
  status_not: TransferStatus
  status_in: [TransferStatus!]
  status_not_in: [TransferStatus!]
  to: Bytes
  to_not: Bytes
  to_in: [Bytes!]
  to_not_in: [Bytes!]
  to_contains: Bytes
  to_not_contains: Bytes
  transferId: Bytes
  transferId_not: Bytes
  transferId_in: [Bytes!]
  transferId_not_in: [Bytes!]
  transferId_contains: Bytes
  transferId_not_contains: Bytes
  callTo: Bytes
  callTo_not: Bytes
  callTo_in: [Bytes!]
  callTo_not_in: [Bytes!]
  callTo_contains: Bytes
  callTo_not_contains: Bytes
  callData: Bytes
  callData_not: Bytes
  callData_in: [Bytes!]
  callData_not_in: [Bytes!]
  callData_contains: Bytes
  callData_not_contains: Bytes
  idx: BigInt
  idx_not: BigInt
  idx_gt: BigInt
  idx_lt: BigInt
  idx_gte: BigInt
  idx_lte: BigInt
  idx_in: [BigInt!]
  idx_not_in: [BigInt!]
  nonce: BigInt
  nonce_not: BigInt
  nonce_gt: BigInt
  nonce_lt: BigInt
  nonce_gte: BigInt
  nonce_lte: BigInt
  nonce_in: [BigInt!]
  nonce_not_in: [BigInt!]
  routers: [String!]
  routers_not: [String!]
  routers_contains: [String!]
  routers_contains_nocase: [String!]
  routers_not_contains: [String!]
  routers_not_contains_nocase: [String!]
  relayerFee: BigInt
  relayerFee_not: BigInt
  relayerFee_gt: BigInt
  relayerFee_lt: BigInt
  relayerFee_gte: BigInt
  relayerFee_lte: BigInt
  relayerFee_in: [BigInt!]
  relayerFee_not_in: [BigInt!]
  xcalledTransactingAsset: Bytes
  xcalledTransactingAsset_not: Bytes
  xcalledTransactingAsset_in: [Bytes!]
  xcalledTransactingAsset_not_in: [Bytes!]
  xcalledTransactingAsset_contains: Bytes
  xcalledTransactingAsset_not_contains: Bytes
  xcalledLocalAsset: Bytes
  xcalledLocalAsset_not: Bytes
  xcalledLocalAsset_in: [Bytes!]
  xcalledLocalAsset_not_in: [Bytes!]
  xcalledLocalAsset_contains: Bytes
  xcalledLocalAsset_not_contains: Bytes
  xcalledTransactingAmount: BigInt
  xcalledTransactingAmount_not: BigInt
  xcalledTransactingAmount_gt: BigInt
  xcalledTransactingAmount_lt: BigInt
  xcalledTransactingAmount_gte: BigInt
  xcalledTransactingAmount_lte: BigInt
  xcalledTransactingAmount_in: [BigInt!]
  xcalledTransactingAmount_not_in: [BigInt!]
  xcalledLocalAmount: BigInt
  xcalledLocalAmount_not: BigInt
  xcalledLocalAmount_gt: BigInt
  xcalledLocalAmount_lt: BigInt
  xcalledLocalAmount_gte: BigInt
  xcalledLocalAmount_lte: BigInt
  xcalledLocalAmount_in: [BigInt!]
  xcalledLocalAmount_not_in: [BigInt!]
  xcalledCaller: Bytes
  xcalledCaller_not: Bytes
  xcalledCaller_in: [Bytes!]
  xcalledCaller_not_in: [Bytes!]
  xcalledCaller_contains: Bytes
  xcalledCaller_not_contains: Bytes
  xcalledTransactionHash: Bytes
  xcalledTransactionHash_not: Bytes
  xcalledTransactionHash_in: [Bytes!]
  xcalledTransactionHash_not_in: [Bytes!]
  xcalledTransactionHash_contains: Bytes
  xcalledTransactionHash_not_contains: Bytes
  xcalledTimestamp: BigInt
  xcalledTimestamp_not: BigInt
  xcalledTimestamp_gt: BigInt
  xcalledTimestamp_lt: BigInt
  xcalledTimestamp_gte: BigInt
  xcalledTimestamp_lte: BigInt
  xcalledTimestamp_in: [BigInt!]
  xcalledTimestamp_not_in: [BigInt!]
  xcalledGasPrice: BigInt
  xcalledGasPrice_not: BigInt
  xcalledGasPrice_gt: BigInt
  xcalledGasPrice_lt: BigInt
  xcalledGasPrice_gte: BigInt
  xcalledGasPrice_lte: BigInt
  xcalledGasPrice_in: [BigInt!]
  xcalledGasPrice_not_in: [BigInt!]
  xcalledGasLimit: BigInt
  xcalledGasLimit_not: BigInt
  xcalledGasLimit_gt: BigInt
  xcalledGasLimit_lt: BigInt
  xcalledGasLimit_gte: BigInt
  xcalledGasLimit_lte: BigInt
  xcalledGasLimit_in: [BigInt!]
  xcalledGasLimit_not_in: [BigInt!]
  xcalledBlockNumber: BigInt
  xcalledBlockNumber_not: BigInt
  xcalledBlockNumber_gt: BigInt
  xcalledBlockNumber_lt: BigInt
  xcalledBlockNumber_gte: BigInt
  xcalledBlockNumber_lte: BigInt
  xcalledBlockNumber_in: [BigInt!]
  xcalledBlockNumber_not_in: [BigInt!]
  executedCaller: Bytes
  executedCaller_not: Bytes
  executedCaller_in: [Bytes!]
  executedCaller_not_in: [Bytes!]
  executedCaller_contains: Bytes
  executedCaller_not_contains: Bytes
  executedTransactingAmount: BigInt
  executedTransactingAmount_not: BigInt
  executedTransactingAmount_gt: BigInt
  executedTransactingAmount_lt: BigInt
  executedTransactingAmount_gte: BigInt
  executedTransactingAmount_lte: BigInt
  executedTransactingAmount_in: [BigInt!]
  executedTransactingAmount_not_in: [BigInt!]
  executedLocalAmount: BigInt
  executedLocalAmount_not: BigInt
  executedLocalAmount_gt: BigInt
  executedLocalAmount_lt: BigInt
  executedLocalAmount_gte: BigInt
  executedLocalAmount_lte: BigInt
  executedLocalAmount_in: [BigInt!]
  executedLocalAmount_not_in: [BigInt!]
  executedTransactingAsset: Bytes
  executedTransactingAsset_not: Bytes
  executedTransactingAsset_in: [Bytes!]
  executedTransactingAsset_not_in: [Bytes!]
  executedTransactingAsset_contains: Bytes
  executedTransactingAsset_not_contains: Bytes
  executedLocalAsset: Bytes
  executedLocalAsset_not: Bytes
  executedLocalAsset_in: [Bytes!]
  executedLocalAsset_not_in: [Bytes!]
  executedLocalAsset_contains: Bytes
  executedLocalAsset_not_contains: Bytes
  executedTransactionHash: Bytes
  executedTransactionHash_not: Bytes
  executedTransactionHash_in: [Bytes!]
  executedTransactionHash_not_in: [Bytes!]
  executedTransactionHash_contains: Bytes
  executedTransactionHash_not_contains: Bytes
  executedTimestamp: BigInt
  executedTimestamp_not: BigInt
  executedTimestamp_gt: BigInt
  executedTimestamp_lt: BigInt
  executedTimestamp_gte: BigInt
  executedTimestamp_lte: BigInt
  executedTimestamp_in: [BigInt!]
  executedTimestamp_not_in: [BigInt!]
  executedGasPrice: BigInt
  executedGasPrice_not: BigInt
  executedGasPrice_gt: BigInt
  executedGasPrice_lt: BigInt
  executedGasPrice_gte: BigInt
  executedGasPrice_lte: BigInt
  executedGasPrice_in: [BigInt!]
  executedGasPrice_not_in: [BigInt!]
  executedGasLimit: BigInt
  executedGasLimit_not: BigInt
  executedGasLimit_gt: BigInt
  executedGasLimit_lt: BigInt
  executedGasLimit_gte: BigInt
  executedGasLimit_lte: BigInt
  executedGasLimit_in: [BigInt!]
  executedGasLimit_not_in: [BigInt!]
  executedBlockNumber: BigInt
  executedBlockNumber_not: BigInt
  executedBlockNumber_gt: BigInt
  executedBlockNumber_lt: BigInt
  executedBlockNumber_gte: BigInt
  executedBlockNumber_lte: BigInt
  executedBlockNumber_in: [BigInt!]
  executedBlockNumber_not_in: [BigInt!]
  reconciledCaller: Bytes
  reconciledCaller_not: Bytes
  reconciledCaller_in: [Bytes!]
  reconciledCaller_not_in: [Bytes!]
  reconciledCaller_contains: Bytes
  reconciledCaller_not_contains: Bytes
  reconciledLocalAsset: Bytes
  reconciledLocalAsset_not: Bytes
  reconciledLocalAsset_in: [Bytes!]
  reconciledLocalAsset_not_in: [Bytes!]
  reconciledLocalAsset_contains: Bytes
  reconciledLocalAsset_not_contains: Bytes
  reconciledLocalAmount: BigInt
  reconciledLocalAmount_not: BigInt
  reconciledLocalAmount_gt: BigInt
  reconciledLocalAmount_lt: BigInt
  reconciledLocalAmount_gte: BigInt
  reconciledLocalAmount_lte: BigInt
  reconciledLocalAmount_in: [BigInt!]
  reconciledLocalAmount_not_in: [BigInt!]
  reconciledTransactionHash: Bytes
  reconciledTransactionHash_not: Bytes
  reconciledTransactionHash_in: [Bytes!]
  reconciledTransactionHash_not_in: [Bytes!]
  reconciledTransactionHash_contains: Bytes
  reconciledTransactionHash_not_contains: Bytes
  reconciledTimestamp: BigInt
  reconciledTimestamp_not: BigInt
  reconciledTimestamp_gt: BigInt
  reconciledTimestamp_lt: BigInt
  reconciledTimestamp_gte: BigInt
  reconciledTimestamp_lte: BigInt
  reconciledTimestamp_in: [BigInt!]
  reconciledTimestamp_not_in: [BigInt!]
  reconciledGasPrice: BigInt
  reconciledGasPrice_not: BigInt
  reconciledGasPrice_gt: BigInt
  reconciledGasPrice_lt: BigInt
  reconciledGasPrice_gte: BigInt
  reconciledGasPrice_lte: BigInt
  reconciledGasPrice_in: [BigInt!]
  reconciledGasPrice_not_in: [BigInt!]
  reconciledGasLimit: BigInt
  reconciledGasLimit_not: BigInt
  reconciledGasLimit_gt: BigInt
  reconciledGasLimit_lt: BigInt
  reconciledGasLimit_gte: BigInt
  reconciledGasLimit_lte: BigInt
  reconciledGasLimit_in: [BigInt!]
  reconciledGasLimit_not_in: [BigInt!]
  reconciledBlockNumber: BigInt
  reconciledBlockNumber_not: BigInt
  reconciledBlockNumber_gt: BigInt
  reconciledBlockNumber_lt: BigInt
  reconciledBlockNumber_gte: BigInt
  reconciledBlockNumber_lte: BigInt
  reconciledBlockNumber_in: [BigInt!]
  reconciledBlockNumber_not_in: [BigInt!]
  """Filter for the block changed event."""
  _change_block: BlockChangedFilter
}

enum Transfer_orderBy {
  id
  originDomain
  destinationDomain
  chainId
  status
  to
  transferId
  callTo
  callData
  idx
  nonce
  routers
  relayerFee
  xcalledTransactingAsset
  xcalledLocalAsset
  xcalledTransactingAmount
  xcalledLocalAmount
  xcalledCaller
  xcalledTransactionHash
  xcalledTimestamp
  xcalledGasPrice
  xcalledGasLimit
  xcalledBlockNumber
  executedCaller
  executedTransactingAmount
  executedLocalAmount
  executedTransactingAsset
  executedLocalAsset
  executedTransactionHash
  executedTimestamp
  executedGasPrice
  executedGasLimit
  executedBlockNumber
  reconciledCaller
  reconciledLocalAsset
  reconciledLocalAmount
  reconciledTransactionHash
  reconciledTimestamp
  reconciledGasPrice
  reconciledGasLimit
  reconciledBlockNumber
}

type _Block_ {
  """The hash of the block"""
  hash: Bytes
  """The block number"""
  number: Int!
}

"""The type for the top-level _meta field"""
type _Meta_ {
  """
  Information about a specific subgraph block. The hash of the block
  will be null if the _meta field has a block constraint that asks for
  a block number. It will be filled if the _meta field has no block constraint
  and therefore asks for the latest  block
  
  """
  block: _Block_!
  """The deployment ID"""
  deployment: String!
  """If \`true\`, the subgraph encountered indexing errors at some past block"""
  hasIndexingErrors: Boolean!
}

enum _SubgraphErrorPolicy_ {
  """Data will be returned even if the subgraph has indexing errors"""
  allow
  """
  If the subgraph has indexing errors, data will be omitted. The default.
  """
  deny
}
`, `.graphclient/sources/Connext_Kovan/introspectionSchema`);

export default buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});