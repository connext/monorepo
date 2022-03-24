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
   * @param externalHash - Hash of the `ExternalCall` router supplied. Used to enforce router executed 
   * the correct calldata under threat of non-repayment
   */
  struct ExecutedTransfer {
    address router;
    uint256 amount;
    bytes32 externalHash;
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
   * @param externalHash - Hash of the `ExternalCall`
   * @param local - The address of the bridged asset
   * @param amount - The amount forwarded through the bridge
   * @param to - The address that gets the funds on the destination chain
   */
  struct ReconciledTransfer {
    bytes32 externalHash;
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
   * @param nonce - The nonce of the origin domain at the time the transfer was called xcall. Used to generate 
   * the transfer id for the crosschain transfer
   * @param amount - The amount of liquidity the router provided or the bridge forwarded, depending on
   * if fast liquidity was used
   * @param feePercentage - The amount over the BASEFEE to tip the relayer
   */
  struct ExecuteArgs {
    uint256 amount;
    uint256 index;
    bytes32 transferId;
    bytes32[32] proof;
    CallParams params;
    address local;
    address router;
    address originSender;
    uint32 feePercentage;
    bytes relayerSignature;
  }

  // ============ Events ============

  /**
   * @notice Emitted when a new router is added
   * @param router - The address of the added router
   * @param caller - The account that called the function
   */
  event RouterAdded(
    address router,
    address caller
  );

  /**
   * @notice Emitted when an existing router is removed
   * @param router - The address of the removed router
   * @param caller - The account that called the function
   */
  event RouterRemoved(
    address router,
    address caller
  );

  /**
   * @notice Emitted when a new stable-swap AMM is added for the local <> adopted token
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param swapPool - The address of the AMM
   * @param caller - The account that called the function
   */
  event StableSwapAdded(
    bytes32 canonicalId,
    uint32 domain,
    address swapPool,
    address caller
  );

  /**
   * @notice Emitted when a new asset is added
   * @param canonicalId - The canonical identifier of the token the local <> adopted AMM is for
   * @param domain - The domain of the canonical token for the local <> adopted amm
   * @param adoptedAsset - The address of the adopted (user-expected) asset
   * @param supportedAsset - The address of the whitelisted asset. If the native asset is to be whitelisted,
   * the address of the wrapped version will be stored
   * @param caller - The account that called the function
   */
  event AssetAdded(
    bytes32 canonicalId,
    uint32 domain,
    address adoptedAsset,
    address supportedAsset,
    address caller
  );

  /**
   * @notice Emitted when an asset is removed from whitelists
   * @param canonicalId - The canonical identifier of the token removed
   * @param caller - The account that called the function
   */
  event AssetRemoved(
    bytes32 canonicalId,
    address caller
  );

  /**
   * @notice Emitted when a router withdraws liquidity from the contract
   * @param router - The router you are removing liquidity from
   * @param to - The address the funds were withdrawn to
   * @param local - The address of the token withdrawn
   * @param amount - The amount of liquidity withdrawn
   * @param caller - The account that called the function
   */
  event LiquidityRemoved(
    address indexed router,
    address to,
    address local,
    uint256 amount,
    address caller
  );

  /**
   * @notice Emitted when a router adds liquidity to the contract
   * @param router - The address of the router the funds were credited to
   * @param local - The address of the token added (all liquidity held in local asset)
   * @param amount - The amount of liquidity added
   * @param caller - The account that called the function
   */
  event LiquidityAdded(
    address router,
    address local,
    bytes32 canonicalId,
    uint256 amount,
    address caller
  );

  /**
   * @notice Emitted when `xcall` is called on the origin domain
   * @param transferId - The unique identifier of the crosschain transfer
   * @param idx - The leaf index of the transfer in batch tree
   * @param to - The CallParams.to provided, created as indexed parameter
   * @param params - The CallParams provided to the function
   * @param transferringAsset - The asset the caller sent with the transfer. Can be the adopted, canonical,
   * or the representational asset
   * @param localAsset - The asset sent over the bridge. Will be the local asset of nomad that corresponds
   * to the provided `transferringAsset`
   * @param transferringAmount - The amount of transferring asset the tx xcalled with
   * @param localAmount - The amount sent over the bridge (initialAmount with slippage)
   * @param nonce - The nonce of the origin domain contract. Used to create the unique identifier
   * for the transfer
   * @param caller - The account that called the function
   */
  event XCalled(
    bytes32 indexed transferId,
    uint256 indexed idx,
    address indexed to,
    CallParams params,
    address transferringAsset,
    address localAsset,
    uint256 transferringAmount,
    uint256 localAmount,
    uint256 nonce,
    address caller
  );

  /**
   * @notice Emitted when `reconciled` is called by the bridge on the destination domain
   * @param root - the new root delivered by the bridge
   */
  event Reconciled(
    bytes32 root,
    address caller
  );

  /**
   * @notice Emitted when a batch is `dispatched` to destination
   * @dev This function calls `send` on the bridge router
   */
  event Dispatched(
    uint32 destination,
    bytes32 root,
    address[3] tokens,
    uint256[3] amounts,
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
   * @param transferringAsset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param localAmount - The amount that was provided by the bridge
   * @param transferringAmount - The amount of transferring asset the to address receives or the external call is
   * executed with
   * @param caller - The account that called the function
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    address indexed router,
    CallParams params,
    address localAsset,
    address transferringAsset,
    uint256 localAmount,
    uint256 transferringAmount,
    address caller
  );

  // ============ Admin Functions ============

  function initialize(
    uint256 _domain,
    address payable _bridgeRouter,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative
  ) external;

  function addRouter(address router) external;
    
  function removeRouter(address router) external;

  function addStableSwapPool(
    BridgeMessage.TokenId calldata canonical,
    address stableSwapPool
  ) external;

  function setupAsset(
    BridgeMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external;

  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external;

  // ============ Public Functions ===========

  function addRelayerFees(address router) external payable;

  function removeRelayerFees(uint256 amount, address payable to) external;

  function addLiquidityFor(uint256 amount, address local, address router) external payable;

  function addLiquidity(uint256 amount, address local) external payable;

  function removeLiquidity(
    uint256 amount,
    address local,
    address payable to
  ) external;

  function xcall(XCallArgs calldata _args) external payable returns (bytes32);

  function reconcile(bytes32 _incomingRoot) external payable;

  function dispatch(uint32 _destination) external;

  function execute(ExecuteArgs calldata _args) external returns (bytes32);

  function process(
    bytes32 _transferId,
    uint256 _amount,
    address _local,
    address _originSender,
    uint256 _index,
    bytes32[32] calldata _proof,
    CallParams calldata _params
  ) external;
}
