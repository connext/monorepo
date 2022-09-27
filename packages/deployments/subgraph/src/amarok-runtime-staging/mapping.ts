/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

import {
  RouterLiquidityAdded,
  RouterLiquidityRemoved,
  RelayerAdded,
  RelayerRemoved,
  StableSwapAdded,
  XCalled,
  Executed,
  Reconciled,
  AssetAdded,
  RouterRemoved,
  RouterAdded,
  RouterOwnerAccepted,
  RouterOwnerProposed,
  RouterRecipientSet,
  MaxRoutersPerTransferUpdated,
} from "../../generated/Connext/ConnextHandler";
import {
  NewConnector,
  Dispatch,
  AggregateRootUpdated,
  MessageSent,
  MessageProcessed,
} from "../../generated/Connector/Connector";
import {
  Asset,
  AssetBalance,
  Router,
  Relayer,
  StableSwap,
  OriginTransfer,
  DestinationTransfer,
  Setting,
  OriginMessage,
  AggregateRoot,
  RootMessageSent,
  RootMessageProcessed,
  ConnectorMeta,
} from "../../generated/schema";

const DEFAULT_MAX_ROUTERS_PER_TRANSFER = 5;

const DEFAULT_CONNECTOR_META_ID = "CONNECTOR_META_ID";

/// MARK - Assets
export function handleAssetAdded(event: AssetAdded): void {
  let assetId = event.params.localAsset.toHex();
  let asset = Asset.load(assetId);
  if (asset == null) {
    asset = new Asset(assetId);
  }
  asset.key = event.params.key;
  asset.canonicalId = event.params.canonicalId;
  asset.canonicalDomain = event.params.domain;
  asset.adoptedAsset = event.params.adoptedAsset;
  asset.blockNumber = event.block.number;
  asset.save();
}

export function handleStableSwapAdded(event: StableSwapAdded): void {
  // StableSwapAdded: bytes32 canonicalId, uint32 domain, address swapPool, address caller
  let stableSwapId = `${event.params.canonicalId.toHex()}-${event.params.domain.toHex()}-${event.params.swapPool.toHex()}`;
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.canonicalId = event.params.canonicalId;
    stableSwap.domain = event.params.domain;
    stableSwap.swapPool = event.params.swapPool;
    stableSwap.save();
  }
}

/// MARK - Relayers
export function handleRelayerAdded(event: RelayerAdded): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(relayerId);
    relayer.isActive = true;
    relayer.relayer = event.params.relayer;
    relayer.save();
  }
}

export function handleRelayerRemoved(event: RelayerRemoved): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(event.params.relayer.toHex());
    relayer.isActive = false;
    relayer.save();
  }
}

/// MARK - Routers
export function handleRouterAdded(event: RouterAdded): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);

  if (router == null) {
    router = new Router(event.params.router.toHex());
    router.isActive = true;
    router.save();
  }

  let settingEntity = Setting.load("1");
  if (settingEntity == null) {
    settingEntity = new Setting("1");
    settingEntity.maxRoutersPerTransfer = BigInt.fromI32(DEFAULT_MAX_ROUTERS_PER_TRANSFER);
    settingEntity.caller = Address.zero();
    settingEntity.save();
  }
}

export function handleRouterRemoved(event: RouterRemoved): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    router = new Router(routerId);
  }
  router.isActive = false;
  router.save();
}

export function handleRouterRecipientSet(event: RouterRecipientSet): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    router = new Router(routerId);
    router.isActive = true;
  }
  router.recipient = event.params.newRecipient;
  router.save();
}

export function handleRouterOwnerProposed(event: RouterOwnerProposed): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    router = new Router(routerId);
    router.isActive = true;
  }
  router.proposedOwner = event.params.newProposed;
  router.proposedTimestamp = event.block.timestamp;
  router.save();
}

export function handleRouterOwnerAccepted(event: RouterOwnerAccepted): void {
  let routerId = event.params.router.toHex();
  let router = Router.load(routerId);
  if (!router) {
    router = new Router(routerId);
    router.isActive = true;
  }
  router.owner = event.params.newOwner;
  router.proposedOwner = null;
  router.proposedTimestamp = null;
  router.save();
}

/**
 * Updates the subgraph records when LiquidityAdded events are emitted. Will create a Router record if it does not exist
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleRouterLiquidityAdded(event: RouterLiquidityAdded): void {
  const assetBalance = getOrCreateAssetBalance(event.params.local, event.params.router);

  // add new amount
  assetBalance.amount = assetBalance.amount.plus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Updates the subgraph records when LiquidityRemoved events are emitted.
 *
 * @param event - The contract event to update the subgraph record with
 */
export function handleRouterLiquidityRemoved(event: RouterLiquidityRemoved): void {
  // ID is of the format ROUTER_ADDRESS-ASSET_ID
  const assetBalance = getOrCreateAssetBalance(event.params.local, event.params.router);

  // update amount
  assetBalance.amount = assetBalance.amount.minus(event.params.amount);

  // save
  assetBalance.save();
}

/**
 * Updates the max amounts of routers the token can be routed through
 */
export function handleMaxRoutersPerTransferUpdated(event: MaxRoutersPerTransferUpdated): void {
  let settingEntity = Setting.load("1");
  if (settingEntity == null) {
    settingEntity = new Setting("1");
  }

  settingEntity.maxRoutersPerTransfer = event.params.maxRoutersPerTransfer;
  settingEntity.caller = event.params.caller;
  settingEntity.save();
}

/// MARK - Connext Bridge
/**
 * Creates subgraph records when TransactionPrepared events are emitted.
 *
 * @param event - The contract event used to create the subgraph record
 */
export function handleXCalled(event: XCalled): void {
  // contract checks ensure that this cannot exist at this point, so we can safely create new
  // NOTE: the above case is not always true since malicious users can reuse IDs to try to break the
  // subgraph. we can protect against this by overwriting if we are able to load a Transaction
  let transfer = OriginTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new OriginTransfer(event.params.transferId.toHexString());
  }

  // Meta
  transfer.chainId = getChainId();
  transfer.transferId = event.params.transferId;
  transfer.nonce = event.params.nonce;
  transfer.status = "XCalled";
  transfer.messageHash = event.params.messageHash;

  // Call Params
  transfer.originDomain = event.params.params.originDomain;
  transfer.destinationDomain = event.params.params.destinationDomain;
  transfer.to = event.params.params.to;
  transfer.delegate = event.params.params.delegate;
  transfer.receiveLocal = event.params.params.receiveLocal;
  transfer.callData = event.params.params.callData;
  transfer.slippage = event.params.params.slippage;
  transfer.originSender = event.params.params.originSender;

  // Assets
  transfer.bridgedAmt = event.params.params.bridgedAmt;
  transfer.normalizedIn = event.params.params.normalizedIn;
  transfer.canonicalId = event.params.params.canonicalId;
  transfer.canonicalDomain = event.params.params.canonicalDomain;
  transfer.asset = getOrCreateAsset(event.params.local).id;

  // Message
  let message = OriginMessage.load(event.params.messageHash.toHex());
  if (message == null) {
    message = new OriginMessage(event.params.messageHash.toHex());
  }
  message.leaf = event.params.messageHash;
  message.destinationDomain = event.params.params.destinationDomain;
  message.transferId = event.params.transferId;
  message.save();
  transfer.message = message.id;

  // XCall Transaction
  // NOTE: Using originSender as the caller, since it should have been set to msg.sender.
  transfer.caller = event.params.params.originSender;
  transfer.transactionHash = event.transaction.hash;
  transfer.timestamp = event.block.timestamp;
  transfer.gasPrice = event.transaction.gasPrice;
  transfer.gasLimit = event.transaction.gasLimit;
  transfer.blockNumber = event.block.number;

  transfer.save();
}

/**
 * Updates subgraph records when Fulfilled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleExecuted(event: Executed): void {
  // Load transfer details
  let transfer = DestinationTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new DestinationTransfer(event.params.transferId.toHexString());
  }

  const routers: string[] = [];
  if (transfer.status != "Reconciled") {
    // Handle router asset balances if this is fast liquidity path.
    const num = event.params.args.routers.length;
    const amount = event.params.args.params.bridgedAmt;
    // TODO: Move from using hardcoded fee calc to using configured liquidity fee numerator.
    const feesTaken = amount.times(BigInt.fromI32(5)).div(BigInt.fromI32(10000));
    const routerAmount = amount.minus(feesTaken).div(BigInt.fromI32(num));
    for (let i = 0; i < num; i++) {
      const param = event.params.args.routers[i].toHex();
      let router = Router.load(param);
      if (router == null) {
        // TODO: Shouldn't we be throwing an error here? How did a transfer get made with a non-existent
        // router?
        router = new Router(param);
        router.isActive = true;
        router.save();
      }

      routers.push(router.id);

      // Update router's liquidity
      const assetBalance = getOrCreateAssetBalance(event.params.local, event.params.args.routers[i]);
      assetBalance.amount = assetBalance.amount.minus(routerAmount);
      assetBalance.save();
    }
  } // otherwise no routers used

  // Meta
  transfer.chainId = getChainId();
  transfer.transferId = event.params.transferId;
  transfer.nonce = event.params.args.params.nonce;
  transfer.amountOut = event.params.amount;

  // Call Params
  transfer.originDomain = event.params.args.params.originDomain;
  transfer.destinationDomain = event.params.args.params.destinationDomain;
  transfer.to = event.params.args.params.to;
  transfer.delegate = event.params.args.params.delegate;
  transfer.receiveLocal = event.params.args.params.receiveLocal;
  transfer.callData = event.params.args.params.callData;
  transfer.slippage = event.params.args.params.slippage;
  transfer.originSender = event.params.args.params.originSender;
  transfer.bridgedAmt = event.params.args.params.bridgedAmt;
  transfer.normalizedIn = event.params.args.params.normalizedIn;
  transfer.canonicalId = event.params.args.params.canonicalId;
  transfer.canonicalDomain = event.params.args.params.canonicalDomain;

  // Assets
  transfer.asset = getOrCreateAsset(event.params.local).id;

  // Event Data
  if (transfer.status == "Reconciled") {
    transfer.status = "CompletedSlow";
  } else {
    transfer.status = "Executed";
  }
  transfer.routers = routers;

  // Executed Transaction
  transfer.executedCaller = event.params.caller;
  transfer.executedTransactionHash = event.transaction.hash;
  transfer.executedTimestamp = event.block.timestamp;
  transfer.executedGasPrice = event.transaction.gasPrice;
  transfer.executedGasLimit = event.transaction.gasLimit;
  transfer.executedBlockNumber = event.block.number;

  transfer.save();
}

/**
 * Updates subgraph records when Reconciled events are emitted
 *
 * @param event - The contract event used to update the subgraph
 */
export function handleReconciled(event: Reconciled): void {
  let transfer = DestinationTransfer.load(event.params.transferId.toHexString());
  if (transfer == null) {
    transfer = new DestinationTransfer(event.params.transferId.toHexString());
  }

  const amount = event.params.amount;
  // If the routers have already been set by an execute event, don't overwrite them.
  const routers: string[] = [];
  if (transfer.routers !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const r: string[] = transfer.routers!;
    const n = r.length;
    for (let i = 0; i < n; i++) {
      const router: string = r[i];
      routers.push(router);

      // Update router's liquidity
      const assetBalance = getOrCreateAssetBalance(event.params.local, Address.fromString(router));
      assetBalance.amount = assetBalance.amount.plus(amount.div(BigInt.fromI32(n)));
      assetBalance.save();
    }
  }

  // Meta
  transfer.chainId = getChainId();
  transfer.transferId = event.params.transferId;

  // Call Params
  transfer.originDomain = event.params.originDomain;

  // Assets
  transfer.asset = getOrCreateAsset(event.params.local).id;

  // Event Data
  if (transfer.status == "Executed") {
    transfer.status = "CompletedFast";
  } else {
    transfer.status = "Reconciled";
  }
  transfer.routers = routers;

  // Reconcile Transaction
  transfer.reconciledCaller = event.params.caller;
  transfer.reconciledTransactionHash = event.transaction.hash;
  transfer.reconciledTimestamp = event.block.timestamp;
  transfer.reconciledGasPrice = event.transaction.gasPrice;
  transfer.reconciledGasLimit = event.transaction.gasLimit;
  transfer.reconciledBlockNumber = event.block.number;

  transfer.save();
}

/// MARK - Connector
export function handleDispatch(event: Dispatch): void {
  // Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);
  let message = OriginMessage.load(event.params.leaf.toHexString());
  if (message == null) {
    message = new OriginMessage(event.params.leaf.toHexString());
  }

  message.leaf = event.params.leaf;
  message.index = event.params.index;
  message.root = event.params.root;
  message.message = event.params.message;
  message.transactionHash = event.transaction.hash;

  message.save();
}

export function handleAggregateRootUpdated(event: AggregateRootUpdated): void {
  let aggregateRoot = AggregateRoot.load(event.params.current.toHexString());
  if (aggregateRoot == null) {
    aggregateRoot = new AggregateRoot(event.params.current.toHexString());
  }

  aggregateRoot.root = event.params.current;
  aggregateRoot.save();
}

export function handleMessageSent(event: MessageSent): void {
  let message = RootMessageSent.load(event.params.data.toHexString());
  if (message == null) {
    message = new RootMessageSent(event.params.data.toHexString());
  }

  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
  }

  message.spokeDomain = meta.spokeDomain;
  message.hubDomain = meta.hubDomain;

  message.root = event.params.data;
  message.caller = event.params.caller;
  message.transactionHash = event.transaction.hash;
  message.timestamp = event.block.timestamp;
  message.gasPrice = event.transaction.gasPrice;
  message.gasLimit = event.transaction.gasLimit;
  message.blockNumber = event.block.number;
  message.save();
}

export function handleMessageProcessed(event: MessageProcessed): void {
  let message = RootMessageProcessed.load(event.params.data.toHexString());
  if (message == null) {
    message = new RootMessageProcessed(event.params.data.toHexString());
  }

  message.root = event.params.data;
  message.caller = event.params.caller;
  message.transactionHash = event.transaction.hash;
  message.timestamp = event.block.timestamp;
  message.gasPrice = event.transaction.gasPrice;
  message.gasLimit = event.transaction.gasLimit;
  message.blockNumber = event.block.number;
  message.save();
}

export function handleNewConnector(event: NewConnector): void {
  let meta = ConnectorMeta.load(DEFAULT_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new ConnectorMeta(DEFAULT_CONNECTOR_META_ID);
  }

  meta.spokeDomain = event.params.domain;
  meta.hubDomain = event.params.mirrorDomain;

  meta.amb = event.params.amb;
  meta.rootManager = event.params.rootManager;
  meta.mirrorConnector = event.params.mirrorConnector;

  meta.save();
}

/// MARK - Helpers
// eslint-disable-next-line @typescript-eslint/ban-types
function getChainId(): BigInt {
  // try to get chainId from the mapping
  let network = dataSource.network();
  // eslint-disable-next-line @typescript-eslint/ban-types
  let chainId: BigInt;
  if (network == "mainnet") {
    chainId = BigInt.fromI32(1);
  } else if (network == "ropsten") {
    chainId = BigInt.fromI32(3);
  } else if (network == "rinkeby") {
    chainId = BigInt.fromI32(4);
  } else if (network == "goerli") {
    chainId = BigInt.fromI32(5);
  } else if (network == "kovan") {
    chainId = BigInt.fromI32(42);
  } else if (network == "bsc") {
    chainId = BigInt.fromI32(56);
  } else if (network == "chapel") {
    chainId = BigInt.fromI32(97);
  } else if (network == "xdai") {
    chainId = BigInt.fromI32(100);
  } else if (network == "matic") {
    chainId = BigInt.fromI32(137);
  } else if (network == "fantom") {
    chainId = BigInt.fromI32(250);
  } else if (network == "optimism-goerli") {
    chainId = BigInt.fromI32(420);
  } else if (network == "mbase") {
    chainId = BigInt.fromI32(1287);
  } else if (network == "arbitrum-one") {
    chainId = BigInt.fromI32(42161);
  } else if (network == "fuji") {
    chainId = BigInt.fromI32(43113);
  } else if (network == "avalanche") {
    chainId = BigInt.fromI32(43114);
  } else if (network == "mumbai") {
    chainId = BigInt.fromI32(80001);
  } else if (network == "arbitrum-rinkeby") {
    chainId = BigInt.fromI32(421611);
  } else {
    throw new Error(`No chainName for network ${network}`);
  }

  return chainId;
}

function getOrCreateAsset(local: Address): Asset {
  let id = local.toHex();
  let asset = Asset.load(id);
  if (asset == null) {
    asset = new Asset(id);
    asset.canonicalId = new Bytes(32);
    asset.canonicalDomain = new BigInt(0);
    asset.adoptedAsset = new Bytes(20);
    asset.key = new Bytes(32);
    asset.blockNumber = new BigInt(0);
    asset.save();
  }
  return asset;
}

function getOrCreateAssetBalance(local: Address, routerAddress: Address): AssetBalance {
  let localAsset = local.toHex();
  let assetBalanceId = localAsset + "-" + routerAddress.toHex();
  let assetBalance = AssetBalance.load(assetBalanceId);

  let router = Router.load(routerAddress.toHex());
  if (router == null) {
    router = new Router(routerAddress.toHex());
    router.isActive = true;
    router.save();
  }

  if (assetBalance == null) {
    let asset = getOrCreateAsset(local);

    assetBalance = new AssetBalance(assetBalanceId);
    assetBalance.asset = asset.id;
    assetBalance.router = router.id;
    assetBalance.amount = new BigInt(0);
  }
  return assetBalance;
}
