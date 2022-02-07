// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ProposedOwnable.sol";
import "./interfaces/IFulfillInterpreter.sol";
import "./interfaces/IWrapped.sol";
import "./interfaces/IStableSwap.sol";
import "./interpreters/FulfillInterpreter.sol";

import "./nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "./nomad-xapps/contracts/bridge/BridgeRouter.sol";
// import "./nomad-core/libs/TypeCasts.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

// TODO:
// - decide on interface for the stable swap
// - nomad contract packages not playing nicely
// - make functions metatxable
// - make upgradeable
// - routing interface vs. always nomad -- WAIT
// - wrapping contracts -- nomad doesnt support native assets
// - assert the router gas usage in reconcile
// - allow multiple routers

contract TransactionManager is ReentrancyGuard, ProposedOwnable {

  // ============= Enums =============
  enum TransactionStatus {
    Fulfilled,
    Reconciled
  }

  // ============ Structs ============

  struct CallParams {
    address recipient;
    address callTo;
    bytes callData;
    uint32 originDomain; // must match nomad domain
    uint32 destinationDomain; // must match nomad domain
  }

  struct NoncedParams {
    uint256 nonce;
    CallParams params;
  }

  struct ExternalCall {
    address callTo;
    bytes callData;
  }

  struct FulfilledTransaction {
    address router;
    uint256 gasUsed;
    uint256 gasPrice;
    uint256 amount;
    bytes32 externalCallHash;
    TransactionStatus status;
  }

  /**
   * @dev All the information that comes through nomad so users can self-process
   */
  struct ProcessedTransaction {
    bytes32 externalCallHash;
    address local;
    uint256 amount;
    address recipient;
  }

  // ============ Events ============

  event RouterAdded(
    address router,
    address caller
  );

  event RouterRemoved(
    address router,
    address caller
  );

  event StableSwapAdded(
    bytes32 canonicalId,
    uint32 domain,
    address swapPool,
    address caller
  );

  event AssetAdded(
    bytes32 canonicalId,
    uint32 domain,
    address adoptedAsset,
    address storedAsset,
    address caller
  );

  event AssetRemoved(
    bytes32 canonicalId,
    address caller
  );

  event LiquidityRemoved(
    address recipient,
    address local,
    uint256 amount,
    address caller
  );

  event LiquidityAdded(
    address router,
    address local,
    bytes32 canonicalId,
    uint256 amount,
    address caller
  );

  event Prepared(
    bytes32 transactionId,
    CallParams params,
    address asset,
    address local,
    uint256 amount,
    uint256 nonce
  );

  event Reconciled();

  event Fulfilled();

  event Processed();

  // ============ Properties ============

  BridgeRouter public bridgeRouter;

  /**
   * @dev Needed because the nomad only handles ERC20 assets
   */
  IWrapped public wrapper;

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
  mapping(bytes32 => IStableSwap) public adoptedToLocalPools;

  /**
   * @dev Stores the transactionId => fulfilled info mapping
   */
  mapping(bytes32 => FulfilledTransaction) public routedTransactions;

  /**
   * @dev Stores all the information about non-fulfilled txs for users to self-process
   */
  mapping(bytes32 => ProcessedTransaction) public unroutedTransactions;

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
   * @notice Mapping of canonical to adopted assets on this domain
   * @dev If the adopted asset is the native asset, the keyed address will
   * be the wrapped asset address
   */
  mapping(address => BridgeMessage.TokenId) public adoptedToCanonical;

  /**
   * @notice Mapping of adopted to canonical on this domain to perform reverse
   * lookups
   * @dev If the adopted asset is the native asset, the value stored should
   * be the wrapped version of that
   */
  mapping(bytes32 => address) public canonicalToAdopted;


  // ============ Modifiers ============

  modifier onlyBridgeRouter() {
    require(msg.sender == address(bridgeRouter), "!bridge");
    _;
  }

  constructor(
    uint256 _domain,
    address payable _bridgeRouter,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative
  ) {
    domain = _domain;
    bridgeRouter = BridgeRouter(_bridgeRouter);
    interpreter = new FulfillInterpreter(address(this));
    tokenRegistry = TokenRegistry(_tokenRegistry);
    wrapper = IWrapped(_wrappedNative);
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
   * @notice Adds a stable swap pool for the representaional <> adopted asset.
   */
  function addStableSwapPool(
    BridgeMessage.TokenId calldata canonical,
    address stableSwapPool
  ) external onlyOwner {
    _addStableSwapPool(canonical, stableSwapPool);
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
    BridgeMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external onlyOwner {
    // Add the asset
    _addAssetId(canonical, adoptedAssetId);

    // Add the swap pool
    _addStableSwapPool(canonical, stableSwapPool);
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
    delete adoptedToCanonical[adoptedAssetId == address(0) ? address(wrapper) : adoptedAssetId];

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
    _transferAssetFromContract(local, recipient, amount);
    // LibAsset.transferAsset(local, recipient, amount);

    // Emit event
    emit LiquidityRemoved(recipient, local, amount, msg.sender);
  }

  /**
   * @notice This function is called by a user who is looking to swap funds
   */
  function prepare(
    CallParams calldata _params,
    address _asset, // Could be adopted, local, or wrapped
    uint256 _amount
  ) external payable {
    // Asset must be either adopted, canonical, or representation
    // TODO: why is this breaking the build
    // require(
    //   adoptedToCanonical[_asset].id != bytes32(0) || 
    //   tokenRegistry.getLocalAddress(domain, _asset) != address(0),
    //   "!supported_asset"
    // );

    // Wrap if needed
    _asset = _wrapIfNeeded(_asset, _amount);

    require(
      adoptedToCanonical[_asset].id != bytes32(0),
      "!supported_asset"
    );

    // Transfer funds to the contract if not wrapped
    if (_asset != address(wrapper)) {
      _transferAssetToContract(_asset, _amount);
    }

    // Swap to the local asset from the adopted
    (uint256 amount, address local) = _swapToLocalAssetIfNeeded(_asset, _amount);

    // Compute the transaction id
    // TODO: can we delegate the id to nomad? otherwise will have to pass through
    // via reconcile
    uint256 usedNonce = nonce;
    bytes32 _transactionId = _getTransactionId(usedNonce, domain);

    // Update nonce
    nonce++;

    // Approve the bridge router
    SafeERC20.safeIncreaseAllowance(IERC20(local), address(bridgeRouter), amount);

    // Call `send` on the bridge router
    _sendMessage(
      _params.destinationDomain,
      _params.recipient,
      local,
      amount,
      _transactionId,
      _getExternalCallHash(_params.callTo, _params.callData)
    );

    // Emit event
    emit Prepared(
      _transactionId,
      _params,
      _asset,
      local,
      amount,
      usedNonce
    );
  }

  /**
   * @notice This function is called by the bridge router to make the router
   * who supplied liquidity whole.
   */
  function reconcile(
    bytes32 _id,
    address _local,
    address _recipient,
    uint256 _amount,
    bytes32 _externalCallHash
  ) external onlyBridgeRouter payable {
    // Find the router to credit
    FulfilledTransaction memory transaction = routedTransactions[_id];
    require(transaction.status == TransactionStatus.Fulfilled, "!status");

    // Update the status record of transaction
    transaction.status = TransactionStatus.Reconciled;

    // Save
    routedTransactions[_id] = transaction;

    if (transaction.router == address(0)) {
      // Nomad bridge fulfilled faster than router, funds should become process-able
      // by the user.
      unroutedTransactions[_id] = ProcessedTransaction({
        externalCallHash: _externalCallHash,
        local: _local,
        amount: _amount,
        recipient: _recipient
      });

    } else {
      // Ensure the router submitted the correct calldata
      require(transaction.externalCallHash == _externalCallHash, "!external");

      // TODO: Ensure the router charged reasonable fee

      // Credit router
      routerBalances[transaction.router][_local] += _amount;
    }

    // NOTE: if the transaction id is wrong, then router does not get paid

    // Emit event
    emit Reconciled();
  }

  /**
   * @notice This function is called by the router to provide native asset
   * liquidity to the user.
   */
  function fulfill(
    CallParams calldata _params,
    uint256 _nonce,
    address _local,
    uint256 _amount
  ) external payable {
    // Get the starting gas
    uint256 start = gasleft();
  
    // Calculate the transaction id
    bytes32 _transactionId = _getTransactionId(_nonce, _params.originDomain);

    // Ensure there is sufficient liquidity
    require(routerBalances[msg.sender][_local] >= _amount, "!liquidity");

    // Decrement router liquidity
    unchecked {
      routerBalances[msg.sender][_local] -= _amount; 
    }

    // Save router to transaction (this information will *not* be passed
    // through nomad)
    routedTransactions[_transactionId] = FulfilledTransaction({
      router: msg.sender,
      gasPrice: tx.gasprice,
      gasUsed: 0,
      externalCallHash: _getExternalCallHash(_params.callTo, _params.callData),
      status: TransactionStatus.Fulfilled,
      amount: _amount // will be of the mad asset, not adopted
    });

    // If this is a mad* asset, then swap on local AMM
    (uint256 amount, address adopted) = _swapFromLocalAssetIfNeeded(_local, _amount);

    // Unwrap if needed
    address assetId = _unwrapIfNeeded(adopted, amount);

    if (_params.callTo == address(0)) {
      // Send funds to the user
      _transferAssetFromContract(assetId, payable(_params.recipient), amount);
      // LibAsset.transferAsset(assetId, payable(_params.recipient), amount);
    } else {
      // Send funds to interprepter
      _transferAssetFromContract(assetId, payable(address(interpreter)), amount);
      // LibAsset.transferAsset(assetId, payable(address(interpreter)), amount);
      interpreter.execute(
        _transactionId,
        payable(_params.callTo),
        assetId,
        payable(_params.recipient),
        amount,
        _params.callData
      );
    }

    uint256 consumed = start - gasleft();

    // Update gas used
    routedTransactions[_transactionId].gasUsed = consumed;

    // Emit event
    emit Fulfilled();
  }
  
  /**
   * @dev Can be called by anyone to process a transaction routers ignored
   */
  function process(
    bytes32 _id,
    address _callTo,
    bytes calldata _callData
  ) external {
    // Get the transaction
    ProcessedTransaction memory transaction = unroutedTransactions[_id];
    require(transaction.externalCallHash != bytes32(0), "!found");

    // Check the calldata is correct
    bytes32 calculated = _getExternalCallHash(_callTo, _callData);
    require(calculated == transaction.externalCallHash, "!data");

    // Swap out of local asset if needed
    (uint256 amount, address adopted) = _swapFromLocalAssetIfNeeded(transaction.local, transaction.amount);

    // Unwrap if needed
    address assetId = _unwrapIfNeeded(adopted, amount);

    // Remove the record
    delete unroutedTransactions[_id];

    // Process the transaction
    if (_callTo == address(0)) {
      // No external call, send funds
      // LibAsset.transferAsset(assetId, payable(transaction.recipient), amount);
      _transferAssetFromContract(assetId, payable(transaction.recipient), amount);
    } else {
      // LibAsset.transferAsset(assetId, payable(address(interpreter)), amount);
      _transferAssetFromContract(assetId, payable(address(interpreter)), amount);
      interpreter.execute(
        _id,
        payable(_callTo),
        assetId,
        payable(transaction.recipient),
        amount,
        _callData
      );
    }

    emit Processed();
  }

  // ============ Private functions ============

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   */
  function _swapToLocalAssetIfNeeded(address asset, uint256 amount) internal returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    BridgeMessage.TokenId memory canonical = adoptedToCanonical[asset];
    if (canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (amount, asset);
    }
  
    // Get the local token for this domain (may return canonical or representation)
    address local = tokenRegistry.getLocalAddress(canonical.domain, canonical.id);

    // Check the case where the adopted asset *is* the local asset
    if (local == asset) {
      // No need to swap
      return (amount, asset);
    }

    // Approve pool
    IStableSwap pool = adoptedToLocalPools[canonical.id];
    SafeERC20.safeApprove(IERC20(asset), address(pool), amount);

    // Swap the asset to the proper local asset
    return (
      pool.swapExact(
        amount,
        asset,
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
    // Get the token id
    (, bytes32 id) = tokenRegistry.getCanonicalTokenId(local);

    // If the adopted asset is the local asset, no need to swap
    address adopted = canonicalToAdopted[id];
    if (adopted == local) {
      return (amount, local);
    }

    // Approve pool
    IStableSwap pool = adoptedToLocalPools[id];
    SafeERC20.safeApprove(IERC20(local), address(pool), amount);

    // Otherwise, swap to adopted asset
    return (
      pool.swapExact(
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
  function _getTransactionId(uint256 _nonce, uint256 _domain) internal view returns (bytes32) {
    return keccak256(abi.encode(_nonce, _domain));
  }

  /**
   * @notice Hashes the executed calldata on fulfill
   */
  function _getExternalCallHash(address _callTo, bytes memory _callData) internal pure returns (bytes32) {
    return keccak256(abi.encode(ExternalCall({
      callTo: _callTo,
      callData: _callData
    })));
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
    (, bytes32 id) = tokenRegistry.getTokenId(local);

    // Router is approved
    require(isRouterOwnershipRenounced() || approvedRouters[router], "#AL:003");

    // Asset is approved
    require(isAssetOwnershipRenounced() || approvedAssets[id], "#AL:004");

    // Transfer funds to contract
    amount = _transferAssetToContract(local, amount);

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
  function _transferAssetToContract(address assetId, uint256 specifiedAmount) internal returns (uint256) {
    uint256 trueAmount = specifiedAmount;

    require(assetId != address(0), "!wrapped");

    // Validate correct amounts are transferred
    // uint256 starting = LibAsset.getOwnBalance(assetId);
    uint256 starting = IERC20(assetId).balanceOf(address(this));
    require(msg.value == 0 || assetId == address(wrapper), "#TA:006");
    // LibAsset.transferFromERC20(assetId, msg.sender, address(this), specifiedAmount);
    SafeERC20.safeTransferFrom(IERC20(assetId), msg.sender, address(this), specifiedAmount);
    // Calculate the *actual* amount that was sent here
    // trueAmount = LibAsset.getOwnBalance(assetId) - starting;
    trueAmount = IERC20(assetId).balanceOf(address(this)) - starting;

    return trueAmount;
  }

  function _transferAssetFromContract(address asset, address to, uint256 amount) internal {
    if (asset == address(0)) {
      Address.sendValue(payable(to), amount);
    } else {
      SafeERC20.safeTransfer(IERC20(asset), to, amount);
    }
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
    BridgeMessage.TokenId calldata canonical,
    address adoptedAssetId
  ) internal {
    // Sanity check: needs approval
    require(approvedAssets[canonical.id] == false, "#AA:032");

    // Update approved assets mapping
    approvedAssets[canonical.id] = true;

    // Update the adopted mapping
    adoptedToCanonical[adoptedAssetId] = canonical;

    // Update the canonical mapping
    address stored = adoptedAssetId == address(0) ? address(wrapper) : adoptedAssetId;
    canonicalToAdopted[canonical.id] = stored;

    // Emit event
    emit AssetAdded(canonical.id, canonical.domain, adoptedAssetId, stored, msg.sender);
  }

  function _addStableSwapPool(
    BridgeMessage.TokenId calldata canonical,
    address stableSwapPool
  ) internal {
    // Update the pool mapping
    adoptedToLocalPools[canonical.id] = IStableSwap(stableSwapPool);

    emit StableSwapAdded(canonical.id, canonical.domain, stableSwapPool, msg.sender);
  }

  /**
   * @dev Returns the address of the asset.
   */
  function _wrapIfNeeded(address assetId, uint256 amount) internal returns (address) {
    // If the asset is not the native asset, return
    if (assetId != address(0)) {
      return assetId;
    }

    // If the native asset on this domain, must wrap
    require(msg.value == amount, "!amount");
    wrapper.deposit{ value: amount }();
    return address(wrapper);
  }

  /**
   * @dev Returns the address of the asset.
   */
  function _unwrapIfNeeded(address holding, uint256 amount) internal returns (address) {
    // If the asset is not the native asset, return
    if (holding != address(wrapper)) {
      return holding;
    }

    // If the native asset on this domain, must wrap
    wrapper.withdraw(amount);
    return address(0);
  }


  function _sendMessage(
    uint32 destination,
    address recipient,
    address local,
    uint256 amount,
    bytes32 id,
    bytes32 callHash
  ) internal {
    bridgeRouter.send(
      local,
      amount,
      destination,
      TypeCasts.addressToBytes32(recipient),
      true,
      id,
      callHash
    );
  }
}