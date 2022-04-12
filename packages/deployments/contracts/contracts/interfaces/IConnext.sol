import "../nomad-xapps/contracts/bridge/BridgeMessage.sol";

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

interface IConnext {
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
   * @notice Contains the external call information
   * @dev Used to create a hash to pass the external call information through the bridge
   * @param to - The address that should receive the funds on the destination domain if no call is
   * specified, or the fallback if an external call fails
   * @param callData - The data to execute on the receiving chain
   */
  struct ExternalCall {
    address to;
    bytes callData;
  }

  /**
   * @notice Contains information stored when `execute` is used in a fast-liquidity manner on a
   * transfer to properly reimburse router when funds come through the bridge.
   * @param router - Address of the router that supplied fast-liquidity
   * @param amount - Amount of liquidity router provided. Used to prevent price-gauging when `amount`
   * user supplied comes through bridge
   */
  struct ExecutedTransfer {
    address[] routers;
    uint256 amount;
  }

  /**
   * @notice Contains information about the gas consumed in a `execute` call
   * @param gasUsed - The gas consumed for a execute transfer (including external call)
   * @param gasPrice - The tx.gasPrice on the execute transfer
   */
  struct GasInfo {
    uint256 gasUsed;
    uint256 gasPrice;
  }

  /**
   * @notice Struct containing the information that comes through the bridge provided by the user on `xcall`
   * @param local - The address of the bridged asset
   * @param amount - The amount forwarded through the bridge
   * @param to - The address that gets the funds on the destination chain
   */
  struct ReconciledTransfer {
    address local;
    uint256 amount;
    address to;
  }

  /**
   * @notice The arguments you supply to the `xcall` function called by user on origin domain
   * @param params - The CallParams. These are consistent across sending and receiving chains
   * @param transactingAssetId - The asset the caller sent with the transfer. Can be the adopted, canonical,
   * or the representational asset
   * @param amount - The amount of transferring asset the tx called xcall with
   */
  struct XCallArgs {
    CallParams params;
    address transactingAssetId; // Could be adopted, local, or wrapped
    uint256 amount;
  }

  /**
   * @notice
   * @param params - The CallParams. These are consistent across sending and receiving chains
   * @param local - The local asset for the transfer, will be swapped to the adopted asset if
   * appropriate
   * @param router - The router who you are sending the funds on behalf of
   * @param amount - The amount of liquidity the router provided or the bridge forwarded, depending on
   * if fast liquidity was used
   * @param feePercentage - The amount over the BASEFEE to tip the relayer
   */
  struct ExecuteArgs {
    CallParams params;
    address local;
    address[] routers;
    uint32 feePercentage;
    uint256 amount;
    uint256 nonce;
    bytes relayerSignature;
    address originSender;
  }
  // ============ Events ============

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(bytes32 canonicalId, uint32 domain, address swapPool, address caller);

  /**
   * @notice Emitted when a new asset is added
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param supportedAsset - The address of the whitelisted asset. If the native asset is to be whitelisted,
   * the address of the wrapped version will be stored
   * @param caller - The account that called the function
   */
  event AssetAdded(bytes32 canonicalId, uint32 domain, address adoptedAsset, address supportedAsset, address caller);

  /**
   * @notice Emitted when an asset is removed from whitelists
   * @param canonicalId - The canonical identifier of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(bytes32 canonicalId, address caller);

  /**
   * @notice Emitted when a rlayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerAdded(address relayer, address caller);

  /**
   * @notice Emitted when a rlayer is added or removed from whitelists
   * @param relayer - The relayer address to be added or removed
   * @param caller - The account that called the function
   */
  event RelayerRemoved(address relayer, address caller);

  /**
   * @notice Emitted when a router withdraws liquidity from the contract
   * @param router - The router you are removing liquidity from
   * @param to - The address the funds were withdrawn to
   * @param local - The address of the token withdrawn
   * @param amount - The amount of liquidity withdrawn
   * @param caller - The account that called the function
   */
  event LiquidityRemoved(address indexed router, address to, address local, uint256 amount, address caller);

  /**
   * @notice Emitted when a router adds liquidity to the contract
   * @param router - The address of the router the funds were credited to
   * @param local - The address of the token added (all liquidity held in local asset)
   * @param amount - The amount of liquidity added
   * @param caller - The account that called the function
   */
  event LiquidityAdded(address indexed router, address local, bytes32 canonicalId, uint256 amount, address caller);

  /**
   * @notice Emitted when the maxRoutersPerTransfer variable is updated
   * @param maxRoutersPerTransfer - The maxRoutersPerTransfer new value
   * @param caller - The account that called the function
   */
  event MaxRoutersPerTransferUpdated(uint256 maxRoutersPerTransfer, address caller);

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   * @param transferId - The unique identifier of the crosschain transfer
   * @param to - The CallParams.to provided, created as indexed parameter
   * @param params - The CallParams provided to the function
   * @param transactingAsset - The asset the caller sent with the transfer. Can be the adopted, canonical,
   * or the representational asset
   * @param localAsset - The asset sent over the bridge. Will be the local asset of nomad that corresponds
   * to the provided `transactingAsset`
   * @param transactingAmount - The amount of transferring asset the tx xcalled with
   * @param localAmount - The amount sent over the bridge (initialAmount with slippage)
   * @param nonce - The nonce of the origin domain contract. Used to create the unique identifier
   * for the transfer
   * @param caller - The account that called the function
   */
  event XCalled(
    bytes32 indexed transferId,
    address indexed to,
    CallParams params,
    address transactingAsset,
    address localAsset,
    uint256 transactingAmount,
    uint256 localAmount,
    uint256 nonce,
    address caller
  );

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param transferId - The unique identifier of the crosschain transaction
   * @param origin - The origin domain of the transfer
   * @param to - The CallParams.recipient provided, created as indexed parameter
   * @param localAsset - The asset that was provided by the bridge
   * @param localAmount - The amount that was provided by the bridge
   * @param executed - Record of the `ExecutedTransfer` stored onchain if fast liquidity is provided
   * @param caller - The account that called the function
   */
  event Reconciled(
    bytes32 indexed transferId,
    uint32 indexed origin,
    address to,
    address localAsset,
    uint256 localAmount,
    ExecutedTransfer executed,
    address caller
  );

  /**
   * @notice Emitted when `execute` is called on the destination chain
   * @dev `execute` may be called when providing fast liquidity *or* when processing a reconciled transfer
   * @param transferId - The unique identifier of the crosschain transfer
   * @param to - The CallParams.to provided, created as indexed parameter
   * @param router - The router that supplied fast liquidity, if applicable
   * @param params - The CallParams provided to the function
   * @param localAsset - The asset that was provided by the bridge
   * @param transactingAsset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param localAmount - The amount that was provided by the bridge
   * @param transactingAmount - The amount of transferring asset the to address receives or the external call is
   * executed with
   * @param caller - The account that called the function
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address indexed router,
    CallParams params,
    address localAsset,
    address transactingAsset,
    uint256 localAmount,
    uint256 transactingAmount,
    address caller
  );

  // ============ Admin Functions ============

  function initialize(
    uint256 _domain,
    address payable _bridgeRouter,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative
  ) external;

  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external;

  function removeRouter(address router) external;

  function addStableSwapPool(BridgeMessage.TokenId calldata canonical, address stableSwapPool) external;

  function setupAsset(
    BridgeMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external;

  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external;

  function setMaxRoutersPerTransfer(uint256 newMaxRouters) external;

  function addRelayer(address relayer) external;

  function removeRelayer(address relayer) external;

  // ============ Public Functions ===========

  function addRelayerFees(address router) external payable;

  function removeRelayerFees(uint256 amount, address payable to) external;

  function addLiquidityFor(
    uint256 amount,
    address local,
    address router
  ) external payable;

  function addLiquidity(uint256 amount, address local) external payable;

  function removeLiquidity(
    uint256 amount,
    address local,
    address payable to
  ) external;

  function xcall(XCallArgs calldata _args) external payable returns (bytes32);

  function reconcile(
    bytes32 _transferId,
    uint32 _origin,
    address _local,
    address _recipient,
    uint256 _amount
  ) external payable;

  function execute(ExecuteArgs calldata _args) external returns (bytes32);
}
