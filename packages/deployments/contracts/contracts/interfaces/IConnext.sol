// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "../nomad-xapps/contracts/connext/ConnextMessage.sol";

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
    uint256 amount;
    uint256 nonce;
    address originSender;
  }

  /**
   * @notice Emitted when a router adds liquidity to the contract
   * @param router - The address of the router the funds were credited to
   * @param local - The address of the token added (all liquidity held in local asset)
   * @param amount - The amount of liquidity added
   * @param caller - The account that called the function
   */
  event LiquidityAdded(address indexed router, address local, bytes32 canonicalId, uint256 amount, address caller);

  /**
   * @notice Emitted when `execute` is called on the destination chain
   * @dev `execute` may be called when providing fast liquidity *or* when processing a reconciled transfer
   * @param transferId - The unique identifier of the crosschain transfer
   * @param to - The CallParams.to provided, created as indexed parameter
   * @param args - The ExecuteArgs provided to the function
   * @param transactingAsset - The asset the to gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param transactingAmount - The amount of transferring asset the to address receives or the external call is
   * executed with
   * @param caller - The account that called the function
   */
  event Executed(
    bytes32 indexed transferId,
    address indexed to,
    ExecuteArgs args,
    address transactingAsset,
    uint256 transactingAmount,
    address caller
  );

  // ============ Admin Functions ============

  function initialize(
    uint256 _domain,
    address _xAppConnectionManager,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative
  ) external;

  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external;

  function removeRouter(address router) external;

  function addStableSwapPool(ConnextMessage.TokenId calldata canonical, address stableSwapPool) external;

  function setupAsset(
    ConnextMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external;

  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external;

  function setMaxRoutersPerTransfer(uint256 newMaxRouters) external;

  function addRelayer(address relayer) external;

  function removeRelayer(address relayer) external;

  // ============ Public Functions ===========

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

  function execute(ExecuteArgs calldata _args) external returns (bytes32);
}
