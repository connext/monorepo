// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {XAppConnectionManager} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

import {RelayerFeeRouter} from "../../relayer-fee/RelayerFeeRouter.sol";
import {PromiseRouter} from "../../promise/PromiseRouter.sol";

import {ITokenRegistry} from "../interfaces/ITokenRegistry.sol";
import {IWrapped} from "../interfaces/IWrapped.sol";
import {IExecutor} from "../interfaces/IExecutor.sol";
import {IStableSwap} from "../interfaces/IStableSwap.sol";
import {ISponsorVault} from "../interfaces/ISponsorVault.sol";

import {ConnextMessage} from "./ConnextMessage.sol";
import {SwapUtils} from "./SwapUtils.sol";

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
 * @param recovery - The address to send funds to if your `Executor.execute call` fails
 * @param callback - The address on the origin domain of the callback contract
 * @param callbackFee - The relayer fee to execute the callback
 * @param forceSlow - If true, will take slow liquidity path even if it is not a permissioned call
 * @param receiveLocal - If true, will use the local nomad asset on the destination instead of adopted.
 */
struct CallParams {
  address to;
  bytes callData;
  uint32 originDomain;
  uint32 destinationDomain;
  address recovery;
  address callback;
  uint256 callbackFee;
  bool forceSlow;
  bool receiveLocal;
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
 * @param relayerFee - The relayer fee amount
 * @param nonce - The nonce used to generate transfer id
 * @param originSender - The msg.sender of the xcall on origin domain
 */
struct ExecuteArgs {
  CallParams params;
  address local; // local representation of canonical token
  address[] routers;
  bytes[] routerSignatures;
  uint256 relayerFee;
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
  //
  // ConnextHandler
  //
  // 0
  uint256 LIQUIDITY_FEE_NUMERATOR;
  // 1
  uint256 LIQUIDITY_FEE_DENOMINATOR;
  // The local nomad relayer fee router
  // 2
  RelayerFeeRouter relayerFeeRouter;
  // The local nomad promise callback router
  // 3
  PromiseRouter promiseRouter;
  // /**
  // * @notice The address of the wrapper for the native asset on this domain
  // * @dev Needed because the nomad only handles ERC20 assets
  // */
  // 4
  IWrapped wrapper;
  // /**
  // * @notice Nonce for the contract, used to keep unique transfer ids.
  // * @dev Assigned at first interaction (xcall on origin domain);
  // */
  // 5
  uint256 nonce;
  // /**
  // * @notice The external contract that will execute crosschain calldata
  // */
  // 6
  IExecutor executor;
  // /**
  // * @notice The domain this contract exists on
  // * @dev Must match the nomad domain, which is distinct from the "chainId"
  // */
  // 7
  uint256 domain;
  // /**
  // * @notice The local nomad token registry
  // */
  // 8
  ITokenRegistry tokenRegistry;
  // /**
  // * @notice Mapping holding the AMMs for swapping in and out of local assets
  // * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
  // */
  // 9
  mapping(bytes32 => IStableSwap) adoptedToLocalPools;
  // /**
  // * @notice Mapping of whitelisted assets on same domain as contract
  // * @dev Mapping is keyed on the canonical token identifier matching what is stored in the token
  // * registry
  // */
  // 10
  mapping(bytes32 => bool) approvedAssets;
  // /**
  // * @notice Mapping of canonical to adopted assets on this domain
  // * @dev If the adopted asset is the native asset, the keyed address will
  // * be the wrapped asset address
  // */
  // 11
  mapping(address => ConnextMessage.TokenId) adoptedToCanonical;
  // /**
  // * @notice Mapping of adopted to canonical on this domain
  // * @dev If the adopted asset is the native asset, the stored address will be the
  // * wrapped asset address
  // */
  // 12
  mapping(bytes32 => address) canonicalToAdopted;
  // /**
  // * @notice Mapping to determine if transfer is reconciled
  // */
  // 13
  mapping(bytes32 => bool) reconciledTransfers;
  // /**
  // * @notice Mapping holding router address that provided fast liquidity
  // */
  // 14
  mapping(bytes32 => address[]) routedTransfers;
  // /**
  // * @notice Mapping of router to available balance of an asset
  // * @dev Routers should always store liquidity that they can expect to receive via the bridge on
  // * this domain (the nomad local asset)
  // */
  // 15
  mapping(address => mapping(address => uint256)) routerBalances;
  // /**
  // * @notice Mapping of approved relayers
  // * @dev Send relayer fee if msg.sender is approvedRelayer. otherwise revert()
  // */
  // 16
  mapping(address => bool) approvedRelayers;
  // /**
  // * @notice Stores the relayer fee for a transfer. Updated on origin domain when a user calls xcall or bump
  // * @dev This will track all of the relayer fees assigned to a transfer by id, including any bumps made by the relayer
  // */
  // 17
  mapping(bytes32 => uint256) relayerFees;
  // /**
  // * @notice Stores the relayer of a transfer. Updated on the destination domain when a relayer calls execute
  // * for transfer
  // * @dev When relayer claims, must check that the msg.sender has forwarded transfer
  // */
  // 18
  mapping(bytes32 => address) transferRelayer;
  // /**
  // * @notice The max amount of routers a payment can be routed through
  // */
  // 19
  uint256 maxRoutersPerTransfer;
  // /**
  //  * @notice The Vault used for sponsoring fees
  //  */
  // 20
  ISponsorVault sponsorVault;
  //
  // Router
  //
  // 21
  mapping(uint32 => bytes32) remotes;
  //
  // XAppConnectionClient
  //
  // 22
  XAppConnectionManager xAppConnectionManager;
  //
  // ProposedOwnable
  //
  // 23
  address _proposed;
  // 24
  uint256 _proposedOwnershipTimestamp;
  // 25
  bool _routerOwnershipRenounced;
  // 26
  uint256 _routerOwnershipTimestamp;
  // 27
  bool _assetOwnershipRenounced;
  // 28
  uint256 _assetOwnershipTimestamp;
  //
  // RouterPermissionsManager
  //
  // 29
  RouterPermissionsManagerInfo routerPermissionInfo;
  //
  // ReentrancyGuard
  //
  // 30
  uint256 _status;
  //
  // StableSwap
  //
  /**
   * @notice Mapping holding the AMM storages for swapping in and out of local assets
   * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
   * Struct storing data responsible for automatic market maker functionalities. In order to
   * access this data, this contract uses SwapUtils library. For more details, see SwapUtils.sol
   */
  // 31
  mapping(bytes32 => SwapUtils.Swap) swapStorages;
  /**
   * @notice Maps token address to an index in the pool. Used to prevent duplicate tokens in the pool.
   * @dev getTokenIndex function also relies on this mapping to retrieve token index.
   */
  // 32
  mapping(bytes32 => mapping(address => uint8)) tokenIndexes;
}

library LibConnextStorage {
  function connextStorage() internal pure returns (AppStorage storage ds) {
    assembly {
      ds.slot := 0
    }
  }
}
