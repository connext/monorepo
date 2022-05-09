// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import {XAppConnectionManager} from "../../nomad-core/contracts/XAppConnectionManager.sol";
import {RelayerFeeRouter} from "../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";

import {ITokenRegistry} from "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {IWrapped} from "../../interfaces/IWrapped.sol";
import {IConnextHandler} from "../../interfaces/IConnextHandler.sol";
import {IExecutor} from "../../interfaces/IExecutor.sol";
import {IStableSwap} from "../../interfaces/IStableSwap.sol";

import {ConnextMessage} from "./ConnextMessage.sol";

// ============= Structs =============

/**
 * @notice These are the call parameters that will remain constant between the
 * two chains. They are supplied on `xcall` and should be asserted on `execute`
 * @property to - The account that receives funds, in the event of a crosschain call,
 * will receive funds if the call fails.
 * @param to - The address you are sending funds (and potentially data) to
 * @param callData - The data to execute on the receiving chain. If no crosschain call is needed, then leave empty.
 * @param originDomain - The originating domain (i.e. where `xcall` is called). Must match nomad domain schema
 * @param destinationDomain - The final domain (i.e. where `execute` / `reconcile` are called). Must match nomad domain schema
 */
struct CallParams {
  address to;
  bytes callData;
  uint32 originDomain;
  uint32 destinationDomain;
}

/**
 * @notice The arguments you supply to the `xcall` function called by user on origin domain
 * @param params - The CallParams. These are consistent across sending and receiving chains
 * @param transactingAssetId - The asset the caller sent with the transfer. Can be the adopted, canonical,
 * or the representational asset
 * @param amount - The amount of transferring asset the tx called xcall with
 * @param relayerFee - The amount of relayer fee the tx called xcall with
 */
struct XCallArgs {
  CallParams params;
  address transactingAssetId; // Could be adopted, local, or wrapped
  uint256 amount;
  uint256 relayerFee;
}

/**
 * @notice
 * @param params - The CallParams. These are consistent across sending and receiving chains
 * @param local - The local asset for the transfer, will be swapped to the adopted asset if
 * appropriate
 * @param routers - The routers who you are sending the funds on behalf of
 * @param amount - The amount of liquidity the router provided or the bridge forwarded, depending on
 * if fast liquidity was used
 * @param nonce - The nonce used to generate transfer id
 * @param originSender - The msg.sender of the xcall on origin domain
 */
struct ExecuteArgs {
  CallParams params;
  address local; // local representation of canonical token
  address[] routers;
  bytes[] routerSignatures;
  uint256 amount;
  uint256 nonce;
  address originSender;
}

/**
 * @notice Contains RouterPermissionsManager related state
 * @param approvedRouters - Mapping of whitelisted router addresses
 * @param routerRecipients - Mapping of router withdraw recipient addresses.
 * If set, all liquidity is withdrawn only to this address. Must be set by routerOwner
 * (if configured) or the router itself
 * @param routerOwners - Mapping of router owners
 * If set, can update the routerRecipient
 * @param proposedRouterOwners - Mapping of proposed router owners
 * Must wait timeout to set the
 * @param proposedRouterTimestamp - Mapping of proposed router owners timestamps
 * When accepting a proposed owner, must wait for delay to elapse
 */
struct RouterPermissionsManagerInfo {
  mapping(address => bool) approvedRouters;
  mapping(address => address) routerRecipients;
  mapping(address => address) routerOwners;
  mapping(address => address) proposedRouterOwners;
  mapping(address => uint256) proposedRouterTimestamp;
}

struct AppStorage {
  bool initialized;
  // ConnextHandler

  // TODO: enable setting these constants via admin fn
  uint256 LIQUIDITY_FEE_NUMERATOR;
  uint256 LIQUIDITY_FEE_DENOMINATOR;
  // Contains hash of empty bytes
  bytes32 EMPTY;
  // The local nomad relayer fee router
  RelayerFeeRouter relayerFeeRouter;
  // /**
  // * @notice The address of the wrapper for the native asset on this domain
  // * @dev Needed because the nomad only handles ERC20 assets
  // */
  IWrapped wrapper;
  // /**
  // * @notice Nonce for the contract, used to keep unique transfer ids.
  // * @dev Assigned at first interaction (xcall on origin domain);
  // */
  uint256 nonce;
  // /**
  // * @notice The external contract that will execute crosschain calldata
  // */
  IExecutor executor;
  // /**
  // * @notice The domain this contract exists on
  // * @dev Must match the nomad domain, which is distinct from the "chainId"
  // */
  uint256 domain;
  // /**
  // * @notice The local nomad token registry
  // */
  ITokenRegistry tokenRegistry;
  // /**
  // * @notice Mapping holding the AMMs for swapping in and out of local assets
  // * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
  // */
  mapping(bytes32 => IStableSwap) adoptedToLocalPools;
  // /**
  // * @notice Mapping of whitelisted assets on same domain as contract
  // * @dev Mapping is keyed on the canonical token identifier matching what is stored in the token
  // * registry
  // */
  mapping(bytes32 => bool) approvedAssets;
  // /**
  // * @notice Mapping of canonical to adopted assets on this domain
  // * @dev If the adopted asset is the native asset, the keyed address will
  // * be the wrapped asset address
  // */
  mapping(address => ConnextMessage.TokenId) adoptedToCanonical;
  // /**
  // * @notice Mapping of adopted to canonical on this domain
  // * @dev If the adopted asset is the native asset, the stored address will be the
  // * wrapped asset address
  // */
  mapping(bytes32 => address) canonicalToAdopted;
  // /**
  // * @notice Mapping to determine if transfer is reconciled
  // */
  mapping(bytes32 => bool) reconciledTransfers;
  // /**
  // * @notice Mapping holding router address that provided fast liquidity
  // */
  mapping(bytes32 => address[]) routedTransfers;
  // /**
  // * @notice Mapping of router to available balance of an asset
  // * @dev Routers should always store liquidity that they can expect to receive via the bridge on
  // * this domain (the nomad local asset)
  // */
  mapping(address => mapping(address => uint256)) routerBalances;
  // /**
  // * @notice Mapping of approved relayers
  // * @dev Send relayer fee if msg.sender is approvedRelayer. otherwise revert()
  // */
  mapping(address => bool) approvedRelayers;
  // /**
  // * @notice Stores the relayer fee for a transfer. Updated on origin domain when a user calls xcall or bump
  // * @dev This will track all of the relayer fees assigned to a transfer by id, including any bumps made by the relayer
  // */
  mapping(bytes32 => uint256) relayerFees;
  // /**
  // * @notice Stores the relayer of a transfer. Updated on the destination domain when a relayer calls execute
  // * for transfer
  // * @dev When relayer claims, must check that the msg.sender has forwarded transfer
  // */
  mapping(bytes32 => address) transferRelayer;
  // /**
  // * @notice The max amount of routers a payment can be routed through
  // */
  uint256 maxRoutersPerTransfer;
  //
  // Router
  //
  mapping(uint32 => bytes32) remotes;
  //
  // XAppConnectionClient
  //
  XAppConnectionManager xAppConnectionManager;
  //
  // ProposedOwnable
  //
  address _owner;
  address _proposed;
  uint256 _proposedOwnershipTimestamp;
  bool _routerOwnershipRenounced;
  uint256 _routerOwnershipTimestamp;
  bool _assetOwnershipRenounced;
  uint256 _assetOwnershipTimestamp;
  //
  // RouterPermissionsManager
  //
  uint256 _routerPermissionDelay;
  RouterPermissionsManagerInfo routerPermissionInfo;
}

library LibConnextStorage {
  function connextStorage() internal pure returns (AppStorage storage ds) {
    assembly {
      ds.slot := 0
    }
  }
}
