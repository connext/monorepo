// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ProposedOwnable.sol";
import "./lib/LibAsset.sol";
import "./interfaces/IFulfillInterpreter.sol";
import "./interfaces/IStableSwap.sol";
import "./interpreters/FulfillInterpreter.sol";

import "./nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "./nomad-xapps/contracts/bridge/BridgeRouter.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// TODO:
// - decide on interface for the stable swap
// - nomad contract packages not playing nicely
// - make functions metatxable
// - how to factor in staking?
// - make upgradeable
// - asset review / handling native assets
// - transaction progress tracking

contract TransactionManagerNew is ReentrancyGuard, ProposedOwnable {

  // ============ Structs ============

  struct CallParams {
    address recipient;
    address callTo;
    bytes callData;
    uint32 originDomain; // must match nomad domain
    uint32 destinationDomain; // must match nomad domain
    // uint256 nonce;
  }

  struct NoncedParams {
    uint256 nonce;
    CallParams params;
  }

  struct ExternalCall {
    address callTo;
    bytes callData;
  }

  // ============ Properties ============

  BridgeRouter public bridgeRouter;

  /**
   * @dev Nonce for the contract, used to keep unique transaction ids.
   * Assigned at first interaction (prepare on sending chain);
   */
  uint256 public nonce = 0;

  /**
   * @dev The external contract that will execute crosschain
   *      calldata
   */
  IFulfillInterpreter public interpreter;

  /**
   * @dev Token registry
   */
  TokenRegistry public tokenRegistry;

  /**
   * @dev Swaps for an adopted asset <> mad asset (i.e. POS USDC <> madUSDC on polygon)
   */
  mapping(address => IStableSwap) public adoptedToLocalPools;

  /**
   * @dev Stores the transactionId => router mapping
   */
  mapping(bytes32 => address) public transactionRouters;

  /**
   * @dev The stored chain id of the contract, may be passed in to avoid any 
   *      evm issues
   */
  uint256 public immutable domain;

  /**
   * @dev Mapping of router to balance specific to asset
   */
  mapping(address => mapping(address => uint256)) public routerBalances;

  /**
   * @dev Mapping of allowed router addresses. Must be added to both
   *      sending and receiving chains when forwarding a transfer.
   */
  mapping(address => bool) public approvedRouters;

  /**
   * @dev Mapping of allowed assetIds on same chain as contract
   */
  mapping(bytes32 => bool) public approvedAssets;
  // TODO: may not want to key ^^ on canonical address

  /**
   * @dev Mapping of canonical to adopted assets on this domain
   */
  mapping(address => BridgeMessage.TokenId) public adoptedToCanonical;

  // TODO: would be great to eliminate this, but need to get local/canonical
  // assets to adopted on fulfill
  mapping(bytes32 => address) public canonicalToAdopted;


  // ============ Modifiers ============

  modifier onlyBridgeRouter() {
    require(msg.sender == bridgeRouter, "!bridge_router");
    _;
  }

  constructor(
    uint256 _domain,
    address _bridgeRouter,
    address _tokenRegistry // Nomad token registry
  ) {
    domain = _domain;
    bridgeRouter = BridgeRouter(_bridgeRouter);
    interpreter = new FulfillInterpreter(address(this));
    tokenRegistry = TokenRegistry(_tokenRegistry);
  }

  // ============ Owner Functions ============

  /**
   * @notice Used to add routers that can transact crosschain
   * @param router Router address to add
   */
  function addRouter(address router) external onlyOwner {
    // Sanity check: not empty
    require(router != address(0), "#AR:001");

    // Sanity check: needs approval
    require(approvedRouters[router] == false, "#AR:032");

    // Update mapping
    approvedRouters[router] = true;

    // Emit event
    emit RouterAdded(router, msg.sender);
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function removeRouter(address router) external onlyOwner {
    // Sanity check: not empty
    require(router != address(0), "#RR:001");

    // Sanity check: needs removal
    require(approvedRouters[router] == true, "#RR:033");

    // Update mapping
    approvedRouters[router] = false;

    // Emit event
    emit RouterRemoved(router, msg.sender);
  }

  /**
   * @notice Used to add supported assets. This is an only owner function.
   * @param canonical The canonical asset to add by id and domain. All representations
   * will be whitelisted as well.
   * @param adoptedAssetId The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   * @param stableSwapPool Address of the pool to swap adopted:local asset
   * @dev This means you would whitelist USDC, and madUSDC on all domains would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. using
   * USDC on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the adopted asset <> representation.
   */
  function setupAsset(
    BridgeMessage.TokenId canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external onlyOwner {
    // Add the asset
    _addAssetId(canonical, adoptedAssetId, stableSwapPool);

    // Add the swap
    addStableSwapPool(canonical, stableSwapPool);
  }

  /**
   * @notice Adds a stable swap pool for the representaional <> adopted asset.
   */
  function addStableSwapPool(
    BridgeMessage.TokenId canonical,
    address stableSwapPool
  ) external onlyOwner {
    // Update the pool mapping
    adoptedToLocalPools[canonical.id] = IStableSwap(stableSwapPool);

    emit StableSwapAdded(canonical.id, canonical.domain, stableSwapPool, msg.sender);
  }

  /**
   * @notice Used to remove assets on same chain as contract that can
   *         be transferred.
   * @param canonicalId TokenId to remove
   * @param adoptedAssetId Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external onlyOwner {
    // Sanity check: already approval
    require(approvedAssets[canonicalId] == true, "#RA:033");

    // Update mapping
    delete approvedAssets[canonicalId];

    // Update pools
    delete adoptedToLocalPools[canonicalId];

    // Update adopted mapping
    delete adoptedToCanonical[adoptedAssetId];

    // Emit event
    emit AssetRemoved(canonicalId, msg.sender);
  }

  /**
   * @notice This is used by anyone to increase a router's available
   *         liquidity for a given asset.
   * @param amount The amount of liquidity to add for the router
   * @param local The address (or `address(0)` if native asset) of the
   *                asset you're adding liquidity for
   * @param router The router you are adding liquidity on behalf of
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   */
  function addLiquidityFor(uint256 amount, address local, address router) external payable nonReentrant {
    _addLiquidityForRouter(amount, local, router);
  }

  /**
   * @notice This is used by any router to increase their available
   *         liquidity for a given asset.
   * @param amount The amount of liquidity to add for the router
   * @param local The address (or `address(0)` if native asset) of the
   *                asset you're adding liquidity for.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   */
  function addLiquidity(uint256 amount, address local) external payable nonReentrant {
    _addLiquidityForRouter(amount, local, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available
   *         liquidity for a given asset.
   * @param amount The amount of liquidity to remove for the router
   * @param local The address (or `address(0)` if native asset) of the
   *                asset you're removing liquidity for. Should be the mad* asset.
   * @param recipient The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 amount,
    address local,
    address payable recipient
  ) external  nonReentrant {
    // Sanity check: recipient is sensible
    require(recipient != address(0), "#RL:007");

    // Sanity check: nonzero amounts
    require(amount > 0, "#RL:002");

    uint256 routerBalance = routerBalances[msg.sender][local];
    // Sanity check: amount can be deducted for the router
    require(routerBalance >= amount, "#RL:008");

    // Update router balances
    unchecked {
      routerBalances[msg.sender][local] = routerBalance - amount;
    }

    // Transfer from contract to specified recipient
    LibAsset.transferAsset(local, recipient, amount);

    // Emit event
    emit LiquidityRemoved(msg.sender, local, amount, recipient);
  }

  /**
   * @notice This function is called by a user who is looking to swap funds
   */
  function prepare(
    CallParams params,
    address transactingAsset,
    uint256 amount
  ) external payable {
    // Assert it is an approved asset
    BridgeMessage.TokenId canonical = adoptedToCanonical[adopted];
    require(approvedAssets[canonical.id], "!supported_asset");

    // Swap to the local asset from the adopted
    (amount, local) = _swapToLocalAssetIfNeeded(transactingAsset, amount);

    // Compute the transaction id
    bytes32 transactionId = getTransactionId(params, nonce);

    // Update nonce
    nonce++;

    // Call `send` on the bridge router
    bridgeRouter.send(
      local,
      amount,
      params.destinationDomain,
      params.recipient,
      true,
      keccak256(
        abi.encode(ExternalCall({ callTo: params.callTo, callData: params.callData }))
      )
    );

    // Emit event
    emit Prepared(transactionId, adopted, amount, params);
  }

  /**
   * @notice This function is called by the bridge router to make the router
   * who supplied liquidity whole.
   */

  // TODO: should the function on fulfill call some type of `prefill` function on the
  // bridge router? the purpose of this would be to give the id to the bridge so it
  // could call it on send. alternatively, the bridgeRouter could return this id on send
  // so we can use it in the event
  function reconcile(bytes32 id, address local, uint256 amount) external onlyBridgeRouter payable {
    // Find the router to credit
    address router = transactionRouters[id];

    if (router == address(0)) {
      // Nomad bridge fulfilled faster than router, funds should go
      // back to user. This will receive nomads-local asset, so must
      // switch to the adopted asset
      (amount, adopted) = _swapFromLocalAssetIfNeeded(local, amount);

      // Send user the adopted asset
      LibAsset.transferAsset(adopted, recipient, amount);
    } else {
      // Otherwise, router
      routerBalances[router][local] += amount;
    }

    // TODO: this is where we get the information from the sending chain
    // back from the bridge. how can we handle that properly to future-
    // proof staking
    // NOTE: if the transaction id is wrong, then router does not get paid

    // Emit event
    emit Reconciled();
  }

  /**
   * @notice This function is called by the router to provide native asset
   * liquidity to the user.
   */
  function fulfill(
    CallParams params,
    address local,
    uint256 amount,
    uint256 nonce
  ) external payable {
    // Calculate the transaction id
    bytes32 transactionId = getTransactionId(params, nonce);

    // Ensure there is sufficient liquidity
    require(routerBalances[msg.sender][local] >= amount, "!liquidity");

    // Decrement router liquidity
    unchecked {
      routerBalances[msg.sender][local] -= amount; 
    }

    // Save router to transaction (this information will *not* be passed
    // through nomad)
    transactionRouters[transactionId] = msg.sender;

    // If this is a mad* asset, then swap on local AMM
    address adopted;
    (amount, adopted) = _swapFromLocalAssetIfNeeded(local, amount);

    if (params.callTo == address(0)) {
      // Send funds to the user
      LibAsset.transferAsset(adopted, params.recipient, amount);
    } else {
      // Send funds to interprepter
      LibAsset.transferAsset(adopted, address(interpreter), amount);
      interpreter.execute(
        transactionId,
        payable(params.callTo),
        adopted,
        payable(params.recipient),
        amount,
        params.callData
      );
    }

    // Emit event
    emit Fulfilled();
  }

  //////////////////////////
  /// Private functions ///
  //////////////////////////

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   */
  function _swapToLocalAssetIfNeeded(address adopted, uint256 amount) internal returns (uint256, address) {
    // User is passing in the adopted asset on the origin domain.
    // The adopted asset can be the canonical, mad asset, or unrelated.

    // Get the canonical id.
    BridgeMessage.TokenId canonical = adoptedToCanonical[adopted];
  
    // Get the local token for this domain (may return canonical or representation)
    address local = tokenRegistry.getLocalAddress(canonical.domain, canonical.id);
    
    // Check the case where the adopted asset *is* the local asset
    if (local == adopted) {
      // No need to swap
      return (amount, local);
    }

    // Swap the asset to the proper local asset
    return (
      adoptedToLocalPools[canonical.id].swapExact(
        amount,
        adopted,
        local
      ), 
      local
    );
  }

  /**
   * @notice Swaps a canonical asset for a mad* asset using the stored
   * stable swap
   */
  function _swapFromLocalAssetIfNeeded(address local, uint256 amount) internal returns (uint256, address) {
    // Get the canonical token id
    (domain, id) = tokenRegistry.getTokenId(local);

    // If the adopted asset is the local asset, no need to swap
    address adopted = canonicalToAdopted[id];
    if (adopted == local) {
      return (amount, local);
    }

    // TODO: if local is the 

    // Otherwise, swap to adopted asset
    return (
      adoptedToLocalPools[canonical.id].swapExact(
        amount,
        local,
        adopted
      ), 
      adopted
    );
  }

  /**
   * @notice Gets unique identifier from nonce + params
   */
  function getTransactionId(CallParams params, uint256 nonce) internal returns (bytes32) {
    return keccak256(abi.encode(NoncedParams({ params: params, nonce })));
  }

  /**
   * @notice Contains the logic to verify + increment a given routers liquidity
   * @param amount The amount of liquidity to add for the router
   * @param local The address of the nomad representation of the asset
   * @param router The router you are adding liquidity on behalf of
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   */
  function _addLiquidityForRouter(
    uint256 amount,
    address local,
    address router
  ) internal {
    // Sanity check: router is sensible
    require(router != address(0), "#AL:001");

    // Sanity check: nonzero amounts
    require(amount > 0, "#AL:002");

    // Get the canonical asset id from the representation
    (domain, id) = tokenRegistry.getTokenId(local);

    // Router is approved
    require(isRouterOwnershipRenounced() || approvedRouters[router], "#AL:003");

    // Asset is approved
    require(isAssetOwnershipRenounced() || approvedAssets[id], "#AL:004");

    // Transfer funds to contract
    amount = transferAssetToContract(local, amount);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    routerBalances[router][local] += amount;

    // Emit event
    emit LiquidityAdded(router, local, id, amount, msg.sender);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the
   *         transaction manager contract. Used in prepare, addLiquidity
   * @param assetId The address to transfer
   * @param specifiedAmount The specified amount to transfer. May not be the 
   *                        actual amount transferred (i.e. fee on transfer 
   *                        tokens)
   */
  function transferAssetToContract(address assetId, uint256 specifiedAmount) internal returns (uint256) {
    uint256 trueAmount = specifiedAmount;

    // Validate correct amounts are transferred
    if (LibAsset.isNativeAsset(assetId)) {
      require(msg.value == specifiedAmount, "#TA:005");
    } else {
      uint256 starting = LibAsset.getOwnBalance(assetId);
      require(msg.value == 0, "#TA:006");
      LibAsset.transferFromERC20(assetId, msg.sender, address(this), specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = LibAsset.getOwnBalance(assetId) - starting;
    }

    return trueAmount;
  }

  /**
   * @notice Used to add assets on same chain as contract that can
   *         be transferred.
   * @param canonical The canonical TokenId to add (domain and id)
   * @param adoptedAssetId The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   * @dev This means you would whitelist USDC, and madUSDC on all domains would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. using
   * USDC on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the adopted asset <> representation.
   */
  function _addAssetId(
    BridgeMessage.TokenId canonical,
    address adoptedAssetId
  ) internal {
    // Sanity check: needs approval
    require(approvedAssets[canonical.id] == false, "#AA:032");

    // Update approved assets mapping
    approvedAssets[canonical.id] = true;

    // Update the adopted mapping
    adoptedToCanonical[adoptedAssetId] = canonical;

    // Update the canonical mapping
    canonicalToAdopted[canonical.id] = adopted;

    // Emit event
    emit AssetAdded(canonical.id, canonical.domain, adoptedAssetId, msg.sender);
  }
}