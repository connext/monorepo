// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ProposedOwnableUpgradeable.sol";
import "./interfaces/IWrapped.sol";
import "./interfaces/IStableSwap.sol";
import "./interfaces/IConnext.sol";
import "./interpreters/Executor.sol";

import "./nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "./nomad-xapps/contracts/bridge/BridgeRouter.sol";
import "./nomad-core/contracts/Merkle.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

// TODOs:
// Open questions:
// 1. How to account for fees/specify amount used on receiving chain? How to specify slippage in prepare and in AMM?
// 2. Callback interface?
// 3. Is the transfer sufficiently observable offchain if the subgraph isn't working?

// Specs needed:
// 1. Relayer fees -> https://www.notion.so/connext/Cross-Domain-Gas-Fees-7914f10ac441439ca3841495c1b89f6b
// 2. Aave wormhole-style collateral spec -> https://github.com/connext/nxtp/issues/821
// 3. Subsidies

// Nomad side:
// 1. Finalize BridgeMessage / BridgeRouter structure + backwards compatbility
// 2. Gas optimizations

contract Connext is Initializable, ReentrancyGuardUpgradeable, ProposedOwnableUpgradeable, MerkleTreeManager, IConnext {
  // TODO: why is this breaking the build
  // uint256 internal constant 3 = 3;

  // ============ Libraries ============

  using MerkleLib for MerkleLib.Tree;

  // ============ Constants =============

  bytes32 internal EMPTY;

  // ============ Properties ============

  /**
   * @notice The local nomad bridge router
   */
  BridgeRouter public bridgeRouter;

  /**
   * @notice The address of the wrapper for the native asset on this domain
   * @dev Needed because the nomad only handles ERC20 assets
   */
  IWrapped public wrapper;

  /**
   * @notice Nonce for the contract, used to keep unique transfer ids.
   * @dev Assigned at first interaction (xcall on origin domain);
   */
  uint256 public nonce;

  /**
   * @notice The external contract that will execute crosschain calldata
   */
  IExecutor public executor;

  /**
   * @notice The local nomad token registry
   */
  TokenRegistry public tokenRegistry;

  /**
   * @notice Mapping holding the AMMs for swapping in and out of local assets
   * @dev Swaps for an adopted asset <> nomad local asset (i.e. POS USDC <> madUSDC on polygon)
   */
  mapping(bytes32 => IStableSwap) public adoptedToLocalPools;

  /**
   * @notice Stores the transferId => ExecutedTransfer mapping
   * @dev This information is stored onchain if fast liquidity is provided
   */
  mapping(bytes32 => ExecutedTransfer) public routedTransfers;

  /**
   * @notice Stores the transferId => GasInfo mapping to track gas used on `execute`
   * @dev This informaion is stored onchain if fast liquidity is provided
   */
  mapping(bytes32 => GasInfo) public routedTransfersGas;

  /**
   * @notice The domain this contract exists on
   * @dev Must match the nomad domain, which is distinct from the "chainId"
   */
  uint256 public domain;

  /**
   * @notice Mapping of router to available balance of an asset
   * @dev Routers should always store liquidity that they can expect to receive via the bridge on
   * this domain (the nomad local asset)
   */
  mapping(address => mapping(address => uint256)) public routerBalances;

  /**
   * @notice Mapping of router to available relayer fee
   * @dev Right now, routers only store native asset onchain.
   * TODO: allow for approved relaying assets
   */
  mapping(address => uint256) public routerRelayerFees;

  /**
   * @notice Mapping of whitelisted router addresses.
   */
  mapping(address => bool) public approvedRouters;

  /**
   * @notice Mapping of whitelisted assets on same domain as contract
   * @dev Mapping is keyed on the canonical token identifier matching what is stored in the token
   * registry
   */
  mapping(bytes32 => bool) public approvedAssets;

  /**
   * @notice Mapping of canonical to adopted assets on this domain
   * @dev If the adopted asset is the native asset, the keyed address will
   * be the wrapped asset address
   */
  mapping(address => BridgeMessage.TokenId) public adoptedToCanonical;

  /**
   * @notice Mapping of adopted to canonical on this domain
   * @dev If the adopted asset is the native asset, the stored address will be the
   * wrapped asset address
   */
  mapping(bytes32 => address) public canonicalToAdopted;

  /**
   */
  mapping(uint32 => address[3]) public batchAssets;

  /**
   */
  mapping(uint32 => uint256[3]) public batchAmounts;

  /**
   * @notice Latest root passed through nomad system. Should include all transfers
   */
  bytes32 public incomingRoot;

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local bridge router
   */
  modifier onlyBridgeRouter() {
    require(msg.sender == address(bridgeRouter), "!bridge");
    _;
  }

  // ========== Initializer ============

  function initialize(
    uint256 _domain,
    address payable _bridgeRouter,
    address _tokenRegistry, // Nomad token registry
    address _wrappedNative
  ) public override initializer {
    __ProposedOwnable_init();
    __ReentrancyGuard_init();

    nonce = 0;
    domain = _domain;
    bridgeRouter = BridgeRouter(_bridgeRouter);
    executor = new Executor(address(this));
    tokenRegistry = TokenRegistry(_tokenRegistry);
    wrapper = IWrapped(_wrappedNative);
    EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
  }

  // ============ Owner Functions ============

  /**
   * @notice Used to add routers that can transact crosschain
   * @param router Router address to add
   */
  function addRouter(address router) external override onlyOwner {
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
  function removeRouter(address router) external override onlyOwner {
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
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(
    BridgeMessage.TokenId calldata canonical,
    address stableSwapPool
  ) external override onlyOwner {
    _addStableSwapPool(canonical, stableSwapPool);
  }

  /**
   * @notice Used to add supported assets. This is an admin only function
   * @dev When whitelisting the canonical asset, all representational assets would be
   * whitelisted as well. In the event you have a different adopted asset (i.e. PoS USDC
   * on polygon), you should *not* whitelist the adopted asset. The stable swap pool
   * address used should allow you to swap between the local <> adopted asset
   * @param canonical - The canonical asset to add by id and domain. All representations
   * will be whitelisted as well
   * @param adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   * @param stableSwapPool - Address of the pool to swap adopted <> local asset
   */
  function setupAsset(
    BridgeMessage.TokenId calldata canonical,
    address adoptedAssetId,
    address stableSwapPool
  ) external override onlyOwner {
    // Add the asset
    _addAssetId(canonical, adoptedAssetId);

    // Add the swap pool
    _addStableSwapPool(canonical, stableSwapPool);
  }

  /**
   * @notice Used to remove assets from the whitelist
   * @param canonicalId - Token id to remove
   * @param adoptedAssetId - Corresponding adopted asset to remove
   */
  function removeAssetId(bytes32 canonicalId, address adoptedAssetId) external override onlyOwner {
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
   * @notice Used to add relayer fees in the native asset
   * @param router - The router to credit
   */
  function addRelayerFees(address router) external override payable {
    require(msg.value > 0, "!value");
    routerRelayerFees[router] += msg.value;
  }

  /**
   * @notice Used to remove relayer fee in the native asset
   * @dev Must be called by the router you are decrementing relayer fees for
   * @param amount - The amount of relayer fee to remove
   * @param to - Who to send funds to
   */
  function removeRelayerFees(uint256 amount, address payable to) external override {
    routerRelayerFees[msg.sender] -= amount;
    
    AddressUpgradeable.sendValue(to, amount);
  }

  /**
   * @notice This is used by anyone to increase a router's available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param amount - The amount of liquidity to add for the router
   * @param local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param router The router you are adding liquidity on behalf of
   */
  function addLiquidityFor(uint256 amount, address local, address router) external payable override nonReentrant {
    _addLiquidityForRouter(amount, local, router);
  }

  /**
   * @notice This is used by any router to increase their available liquidity for a given asset.
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param amount - The amount of liquidity to add for the router
   * @param local - The address of the asset you're adding liquidity for. If adding liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   */
  function addLiquidity(uint256 amount, address local) external payable override nonReentrant {
    _addLiquidityForRouter(amount, local, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param amount - The amount of liquidity to remove for the router
   * @param local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
   * @param to The address that will receive the liquidity being removed
   */
  function removeLiquidity(
    uint256 amount,
    address local,
    address payable to
  ) external override nonReentrant {
    // Sanity check: to is sensible
    require(to != address(0), "#RL:007");

    // Sanity check: nonzero amounts
    require(amount > 0, "#RL:002");

    uint256 routerBalance = routerBalances[msg.sender][local];
    // Sanity check: amount can be deducted for the router
    require(routerBalance >= amount, "#RL:008");

    // Update router balances
    unchecked {
      routerBalances[msg.sender][local] = routerBalance - amount;
    }

    // Transfer from contract to specified to
    _transferAssetFromContract(local, to, amount);    

    // Emit event
    emit LiquidityRemoved(msg.sender, to, local, amount, msg.sender);
  }

  /**
   * @notice This function is called by a user who is looking to bridge funds
   * @dev This contract must have approval to transfer the adopted assets. They are then swapped to
   * the local nomad assets via the configured AMM and sent over the bridge router.
   * @param _args - The XCallArgs
   * @return The transfer id of the crosschain transfer
   */
  // TODO: add indicator if fast liquidity is allowed
  function xcall(
    XCallArgs calldata _args
  ) external payable override returns (bytes32) {
    // Asset must be either adopted, canonical, or representation
    // TODO: why is this breaking the build
    // require(
    //   adoptedToCanonical[_asset].id != bytes32(0) || 
    //   tokenRegistry.getLocalAddress(domain, _asset) != address(0),
    //   "!supported_asset"
    // );

    require(
      adoptedToCanonical[_args.transactingAssetId == address(0) ? address(wrapper) : _args.transactingAssetId].id != bytes32(0),
      "!supported_asset"
    );

    // Transfer funds to the contract
    (address _transactingAssetId, uint256 _amount) = _transferAssetToContract(_args.transactingAssetId, _args.amount);

    // Swap to the local asset from the adopted
    // TODO: do we want to swap per call or per batch?
    (uint256 _bridgedAmt, address _bridged) = _swapToLocalAssetIfNeeded(_transactingAssetId, _amount);

    // Compute the transfer id
    bytes32 _transferId = _getTransferId(nonce, domain);
    // Update nonce
    nonce++;

    // Add to batch
    _addToBatch(_transferId,  _bridgedAmt, _bridged, _args.params);

    // Emit event
    emit XCalled(
      _transferId,
      count() - 1, // leaf inserted
      _args.params.to,
      _args.params,
      _transactingAssetId, // NOTE: this will switch from input to wrapper if native used
      _bridged,
      _amount,
      _bridgedAmt,
      nonce - 1,
      msg.sender
    );

    // Return the transfer id
    return _transferId;
  }

  /**
   * @notice This function is called by the bridge router to pass through the merkle root of the batch.
   * @param _incomingRoot - The hash of the `ExternalCall` passed through the bridge
   */
  function reconcile(
    bytes32 _incomingRoot // TODO: do we need a batch id?
  ) external payable override onlyBridgeRouter{
    // Store the root
    incomingRoot = _incomingRoot;

    // Emit event
    emit Reconciled(incomingRoot, msg.sender);
  }

  /**
   * @notice Sends a transfer root through nomad
   */
  function dispatch(uint32 _destination) external override {
    // Get the tree, assets, and amounts for the batch
    address[3] memory _tokens = batchAssets[_destination];
    uint256[3] memory _amounts = batchAmounts[_destination];

    // Zero-out the batch tokens and assets
    address empty = address(0);
    batchAssets[_destination] = [empty, empty, empty];
    batchAmounts[_destination] = [0, 0, 0];

    // Approve bridge router for amounts
    for (uint256 i; i < _tokens.length; i++) {
      address batch = _tokens[i];
      if (batch != address(0)) {
        SafeERC20Upgradeable.safeIncreaseAllowance(
          IERC20Upgradeable(batch),
          address(bridgeRouter),
          _amounts[i]
        );
      }
    }

    // Send info over bridge router
    bytes32 _root = tree.root();
    bridgeRouter.send(_tokens, _amounts, _destination, _root);

    emit Dispatched(_destination, _root, _tokens, _amounts, msg.sender);
  }

  /**
   * @notice This function is called on the destination chain when the bridged asset should be swapped
   * into the adopted asset and the external call executed. Can be used before reconcile (when providing
   * fast liquidity) or after reconcile (when using liquidity from the bridge)
   * @dev Will store the `ExecutedTransfer` if fast liquidity is provided, or assert the hash of the
   * `ReconciledTransfer` when using bridge liquidity
   * @param _args - The `ExecuteArgs` for the transfer
   * @return bytes32 The transfer id of the crosschain transfer
   */
  function execute(
    ExecuteArgs calldata _args
  ) external override returns (bytes32) {
    // Get the starting gas
    uint256 _start = gasleft();

    // Get the leaf
    // Get the right asset for the leaf by looking up this-domain asset via canonical
    (, bytes32 canonicalId) = tokenRegistry.getCanonicalTokenId(_args.local);
    address _originAsset = tokenRegistry.getLocalAddress(_args.params.originDomain, canonicalId);
    
    // NOTE: _args.amount is now the **same** as the amount the tx was called xcall with
    // (i.e. the bridged amount after stable swap)
    bool _isFast;
    {
      bytes32 _leaf = getLeaf(_args.transferId, _args.amount, _originAsset, _args.params);
      // Check to see if leaf is included in root, if not it is a fast transfer
      // TODO: keep check or second function to determine fast or slow liq
      bytes32 _calculated = MerkleLib.branchRoot(_leaf, _args.proof, _args.index);
      _isFast = _calculated != incomingRoot;
    }

    _handleLiquidity(_args.params, _args.transferId, _args.local, _args.router, _isFast, _args.amount);

    // Execute the the transfer
    // If this is a mad* asset, then swap on local AMM
    (uint256 amount, address adopted) = _swapFromLocalAssetIfNeeded(_args.local, _args.amount);

    if (keccak256(_args.params.callData) == EMPTY) {
      // Send funds to the user
      _transferAssetFromContract(adopted, _args.params.to, amount);
    } else {
      // Send funds to interprepter
      _transferAssetFromContract(adopted, address(executor), amount);
      executor.execute(
        _args.transferId,
        payable(_args.params.to),
        adopted,
        amount,
        _args.params.callData
      );
    }

    // Save gas used
    if (_isFast) {
      routedTransfersGas[_args.transferId] = GasInfo({
        gasPrice: tx.gasprice,
        gasUsed: _start - gasleft()
        // TODO: account for gas used in storage
      });
    }

    // Pay metatx relayer
    // NOTE: if this is done *without* fast liquidity, router will be address(0) and the relayer
    // will always be paid
    _handleRelayerFees(_args.transferId, _args.router, _args.feePercentage, _args.relayerSignature);

    // Emit event
    emit Executed(
      _args.transferId,
      _args.params.to,
      msg.sender,
      _args.params,
      _args.local,
      adopted,
      _args.amount,
      amount,
      msg.sender
    );

    return _args.transferId;
  }

  /**
   * @notice Called by routers that sent fast liquidity to claim funds once a batch-transfer root
   * has been put onchain via nomad.
   */
  function process(
    bytes32 _transferId,
    uint256 _amount,
    address _local,
    uint256 _index,
    bytes32[32] calldata _proof,
    CallParams calldata _params
  ) external override {
    // Get the right asset in the leaf
    (, bytes32 canonicalId) = tokenRegistry.getCanonicalTokenId(_local);
    address _originAsset = tokenRegistry.getLocalAddress(_params.originDomain, canonicalId);

    // Generate leaf
    bytes32 _leaf = getLeaf(_transferId, _amount, _originAsset, _params);

    // Prove leaf is included in root
    bytes32 _calculated = MerkleLib.branchRoot(_leaf, _proof, _index);
    // require(_calculated == incomingRoot, "!proven");

    // TODO: amount assertion

    // Get the router
    address router = routedTransfers[_transferId].router;
    require(router != address(0), "!router");

    // Reimburse router
    routerBalances[router][_local] += _amount;
  }

  // ============ Private functions ============

  /**
   * @notice Swaps an adopted asset to the local (representation or canonical) nomad asset
   * @dev Will not swap if the asset passed in is the local asset
   * @param _asset - The address of the adopted asset to swap into the local asset
   * @param _amount - The amount of the adopted asset to swap
   * @return The amount of local asset received from swap
   * @return The address of asset received post-swap
   */
  function _swapToLocalAssetIfNeeded(address _asset, uint256 _amount) internal returns (uint256, address) {
    // Check to see if the asset must be swapped because it is not the local asset
    BridgeMessage.TokenId memory canonical = adoptedToCanonical[_asset];
    if (canonical.id == bytes32(0)) {
      // This is *not* the adopted asset, meaning it must be the local asset
      return (_amount, _asset);
    }
  
    // Get the local token for this domain (may return canonical or representation)
    address local = tokenRegistry.getLocalAddress(canonical.domain, canonical.id);

    // Check the case where the adopted asset *is* the local asset
    if (local == _asset) {
      // No need to swap
      return (_amount, _asset);
    }

    // Approve pool
    IStableSwap pool = adoptedToLocalPools[canonical.id];
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(pool), _amount);

    // Swap the asset to the proper local asset
    return (
      pool.swapExact(
        _amount,
        _asset,
        local
      ), 
      local
    );
  }

  /**
   * @notice Swaps a local nomad asset for the adopted asset using the stored stable swap
   * @dev Will not swap if the asset passed in is the adopted asset
   * @param _asset - The address of the local asset to swap into the adopted asset
   * @param _amount - The amount of the local asset to swap
   * @return The amount of adopted asset received from swap
   * @return The address of asset received post-swap
   */
  function _swapFromLocalAssetIfNeeded(address _asset, uint256 _amount) internal returns (uint256, address) {
    // Get the token id
    (, bytes32 id) = tokenRegistry.getCanonicalTokenId(_asset);

    // If the adopted asset is the local asset, no need to swap
    address adopted = canonicalToAdopted[id];
    if (adopted == _asset) {
      return (_amount, _asset);
    }

    // Approve pool
    IStableSwap pool = adoptedToLocalPools[id];
    SafeERC20Upgradeable.safeApprove(IERC20Upgradeable(_asset), address(pool), _amount);

    // Otherwise, swap to adopted asset
    return (
      pool.swapExact(
        _amount,
        _asset,
        adopted
      ), 
      adopted
    );
  }

  /**
   * @notice Gets unique identifier from nonce + domain
   * @param _nonce - The nonce of the contract
   * @param _domain - The origin domain of the transfer
   * @return The transfer id
   */
  function _getTransferId(uint256 _nonce, uint256 _domain) internal pure returns (bytes32) {
    return keccak256(abi.encode(_nonce, _domain));
  }

  /**
   * @notice Calculates the hash of the executed calldata and to on execute
   * @param _to - The address to execute the calldata on
   * @param _callData - The data to execute
   * @return The computed hash
   */
  function _getExternalHash(address _to, bytes memory _callData) internal pure returns (bytes32) {
    return keccak256(abi.encode(ExternalCall({
      callData: _callData,
      to: _to
    })));
  }

  /**
   * @notice Gets the hash for information returned across the bridge
   * @param _local - The asset delivered by the bridge
   * @param _to - The address that should receive the funds, or fallback address if the external call
   * fails
   * @param _amount - The amount delivered through the bridge
   * @param _externalHash - The hash of the `ExternalCall` passed through the bridge
   * @return The hash of the `ReconciledTransfer`
   */
  function _getReconciledHash(
    address _local,
    address _to,
    uint256 _amount,
    bytes32 _externalHash
  ) internal pure returns (bytes32) {
    ReconciledTransfer memory transfer = ReconciledTransfer({
      externalHash: _externalHash,
      local: _local,
      amount: _amount,
      to: _to
    });

    return keccak256(abi.encode(transfer));
  }

  /**
   * @notice Contains the logic to verify + increment a given routers liquidity
   * @dev The liquidity will be held in the local asset, which is the representation if you
   * are *not* on the canonical domain, and the canonical asset otherwise.
   * @param _amount - The amount of liquidity to add for the router
   * @param _local - The address of the nomad representation of the asset
   * @param _router - The router you are adding liquidity on behalf of
   */
  function _addLiquidityForRouter(
    uint256 _amount,
    address _local,
    address _router
  ) internal {
    // Sanity check: router is sensible
    require(_router != address(0), "#AL:001");

    // Sanity check: nonzero amounts
    require(_amount > 0, "#AL:002");

    // Get the canonical asset id from the representation
    (, bytes32 id) = tokenRegistry.getTokenId(_local == address(0) ? address(wrapper) : _local);

    // Router is approved
    require(isRouterOwnershipRenounced() || approvedRouters[_router], "#AL:003");

    // Asset is approved
    require(isAssetOwnershipRenounced() || approvedAssets[id], "#AL:004");

    // Transfer funds to contract
    (address _asset, uint256 _received) = _transferAssetToContract(_local, _amount);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    routerBalances[_router][_asset] += _received;

    // Emit event
    emit LiquidityAdded(_router, _asset, id, _received, msg.sender);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically wrap
   * @param _assetId - The address to transfer
   * @param _specifiedAmount - The specified amount to transfer. May not be the 
   * actual amount transferred (i.e. fee on transfer tokens)
   * @return The assetId of the transferred asset
   * @return The amount of the asset that was seen by the contract (may not be the specifiedAmount
   * if the token is a fee-on-transfer token)
   */
  function _transferAssetToContract(address _assetId, uint256 _specifiedAmount) internal returns (address, uint256) {
    uint256 trueAmount = _specifiedAmount;

    if (_assetId == address(0)) {
      // When transferring native asset to the contract, always make sure that the
      // asset is properly wrapped
      require(msg.value == _specifiedAmount, "!amount");
      wrapper.deposit{ value: _specifiedAmount }();
      _assetId = address(wrapper);
    } else {
      // Validate correct amounts are transferred
      uint256 starting = IERC20Upgradeable(_assetId).balanceOf(address(this));
      require(msg.value == 0, "#TA:006");
      SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(_assetId), msg.sender, address(this), _specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20Upgradeable(_assetId).balanceOf(address(this)) - starting;
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the Connext contract.
   * @dev If using the native asset, will automatically unwrap
   * @param _assetId - The address to transfer
   * @param _to - The account that will receive the withdrawn funds
   * @param _amount - The amount to withdraw from contract
   */
  function _transferAssetFromContract(address _assetId, address _to, uint256 _amount) internal {
    // No native assets should ever be stored on this contract
    require(_assetId != address(0), "!native");

    if (_assetId == address(wrapper)) {
      // If dealing with wrapped assets, make sure they are properly unwrapped
      // before sending from contract
      wrapper.withdraw(_amount);
      AddressUpgradeable.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(_assetId), _to, _amount);
    }
  }

  /**
   * @notice Used to add assets on same chain as contract that can be transferred.
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function _addAssetId(
    BridgeMessage.TokenId calldata _canonical,
    address _adoptedAssetId
  ) internal {
    // Sanity check: needs approval
    require(approvedAssets[_canonical.id] == false, "#AA:032");

    // Update approved assets mapping
    approvedAssets[_canonical.id] = true;

    // Update the adopted mapping
    adoptedToCanonical[_adoptedAssetId] = _canonical;

    // Update the canonical mapping
    address supported = _adoptedAssetId == address(0) ? address(wrapper) : _adoptedAssetId;
    canonicalToAdopted[_canonical.id] = supported;

    // Emit event
    emit AssetAdded(_canonical.id, _canonical.domain, _adoptedAssetId, supported, msg.sender);
  }

  /**
   * @notice Used to add an AMM for adopted <> local assets
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _stableSwap - The address of the amm to add
   */
  function _addStableSwapPool(
    BridgeMessage.TokenId calldata _canonical,
    address _stableSwap
  ) internal {
    // Update the pool mapping
    adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /** */
  function _handleLiquidity(
    CallParams calldata _params,
    bytes32 _transferId,
    address _local,
    address _router,
    bool _isFast,
    uint256 _amount
  ) internal {
    // Determine if it is fast (i.e. happened before reconcile called, needs
    // a router to front)
    bytes32 _externalHash = _getExternalHash(_params.to, _params.callData);

    if (_isFast) {
      // Ensure it has not been executed already
      require(routedTransfers[_transferId].router == address(0), "!empty");

      // Decrement liquidity
      routerBalances[_router][_local] -= _amount; 

      // Store the router
      routedTransfers[_transferId] = ExecutedTransfer({
        router: _router,
        externalHash: _externalHash,
        amount: _amount // will be of the mad asset, not adopted
      });
    }
  }

  /**
   * @notice Pays the relayer fee on behalf of a router some multiple on the basefee
   * @dev Currently only supported on eip-1559 chains and only handles native assets.
   * Also only used in `execute` transfers
   * @param _transferId - The unique identifier of the transfer
   * @param _router - The router you are sending the tx on behalf of
   * @param _feePct - The percent over the basefee you are adding
   */
  function _handleRelayerFees(
    bytes32 _transferId,
    address _router,
    uint32 _feePct,
    bytes calldata _sig
  ) internal {
    // If the sender *is* the router, do nothing
    if (msg.sender == _router) {
      return;
    }

    // Check the signature of the router on the nonce + fee pct
    require(_router == recoverSignature(abi.encode(_transferId, _feePct), _sig), "!rtr_sig");

    // Handle 0 case
    if (_feePct == 0) {
      return;
    }

    // Otherwise, send the fee percentage
    // TODO: BASEFEE opcode will only be supported if the domain supports EIP1559
    // must be able to detect this dynamically

    uint256 fee = block.basefee * _feePct / 100;

    // Decrement liquidity
    routerRelayerFees[_router] -= fee;

    // Pay sender
    AddressUpgradeable.sendValue(payable(msg.sender), fee);
  }

  function getLeaf(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    CallParams calldata _params
  ) internal returns (bytes32) {
    return keccak256(
      abi.encode(
        _transferId,
        _amount,
        _asset,
        _params.to,
        _params.callData,
        _params.originDomain,
        _params.destinationDomain
      )
    );
  }

  /**
   * @notice Adds a leaf into the right root, called by `xcall`
   * @dev Will revert if the batch is full
   */
  function _addToBatch(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    CallParams calldata _params
  ) internal {
    // Create a leaf
    bytes32 _leaf = getLeaf(_transferId, _amount, _asset, _params);

    tree.insert(_leaf);

    // Update the batch asset
    // find the appropriate index
    for (uint256 i; i < batchAssets[_params.destinationDomain].length; i++) {
      address batch = batchAssets[_params.destinationDomain][i];
      if (batch == _asset) {
        // no need to add asset, but should inc. amount
        // at this index
        batchAmounts[_params.destinationDomain][i] += _amount;
        return;
      } else if (batch == address(0)) {
        // uninitialized, set to asset and inc. amount
        batchAssets[_params.destinationDomain][i] = _asset;
        batchAmounts[_params.destinationDomain][i] += _amount;
        return;
      }
    }

    // Should have added the asset and amount in for loop and exited.
    // If here, then the batch is full
    require(false, "batch full");
  }

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _encoded The payload that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function recoverSignature(bytes memory _encoded, bytes calldata _sig) internal pure returns (address) {
    // Recover
    return ECDSAUpgradeable.recover(
      ECDSAUpgradeable.toEthSignedMessageHash(keccak256(_encoded)),
      _sig
    );
  }

  receive() external payable {}


  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[49] private __gap;
}