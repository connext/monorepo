// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ProposedOwnableUpgradeable.sol";
import "./RouterPermissionsManager.sol";

import "./interfaces/IWrapped.sol";
import "./interfaces/IStableSwap.sol";
import "./interfaces/IConnext.sol";

import "./interpreters/Executor.sol";

import {AssetLogic} from "./lib/Connext/AssetLogic.sol";
import {ConnextUtils} from "./lib/Connext/ConnextUtils.sol";

import "./nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "./nomad-xapps/contracts/bridge/BridgeRouter.sol";

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

contract Connext is
  Initializable,
  ReentrancyGuardUpgradeable,
  ProposedOwnableUpgradeable,
  RouterPermissionsManager,
  IConnext
{
  // ========== Custom Errors ===========

  error Connext__onlyBridgeRouter_notBridge();
  error Connext__removeAssetId_notAdded();
  error Connext__addRelayerFees_notValue();
  error Connext__removeLiquidity_recipientEmpty();
  error Connext__removeLiquidity_amountIsZero();
  error Connext__removeLiquidity_insufficientFunds();
  error Connext__xcall_notSupportedAsset();
  error Connext__execute_notSlowParams();
  error Connext__addLiquidityForRouter_routerEmpty();
  error Connext__addLiquidityForRouter_amountIsZero();
  error Connext__addLiquidityForRouter_badRouter();
  error Connext__addLiquidityForRouter_badAsset();
  error Connext__addAssetId_alreadyAdded();
  error Connext__decrementLiquidity_notEmpty();
  error Connext__decrementLiquidity_maxRoutersExceeded();
  error Connext__handleRelayerFees_notRtrSig();
  error Connext__handleRelayerFees_notApprovedRelayer();
  error Connext__addRelayer_alreadyApproved();
  error Connext__removeRelayer_notApproved();
  error Connext__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();

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
   * @notice Stores hash of the `ReconciledTransaction` (all information passed through bridge) on `reconcile`
   * @dev This information is stored onchain if the transaction has not been fulfilled at the time
   * of reconcile
   */
  mapping(bytes32 => bytes32) public reconciledTransfers;

  /**
   * @notice Mapping of router to available relayer fee
   * @dev Right now, routers only store native asset onchain.
   * TODO: allow for approved relaying assets
   */
  mapping(address => uint256) public routerRelayerFees;

  /**
   * @notice Mapping of approved relayers
   * @dev Send relayer fee if msg.sender is approvedRelayer. otherwise revert()
   */
  mapping(address => bool) public approvedRelayers;

  /**
   * @notice Mapping of router to available balance of an asset
   * @dev Routers should always store liquidity that they can expect to receive via the bridge on
   * this domain (the nomad local asset)
   */
  mapping(address => mapping(address => uint256)) public routerBalances;

  /**
   * @notice The max amount of routers a payment can be routed through
   */
  uint256 public maxRoutersPerTransfer;

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local bridge router
   */
  modifier onlyBridgeRouter() {
    if (msg.sender != address(bridgeRouter)) revert Connext__onlyBridgeRouter_notBridge();
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
    __RouterPermissionsManager_init();

    nonce = 0;
    domain = _domain;
    bridgeRouter = BridgeRouter(_bridgeRouter);
    executor = new Executor(address(this));
    tokenRegistry = TokenRegistry(_tokenRegistry);
    wrapper = IWrapped(_wrappedNative);
    EMPTY = hex"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
    maxRoutersPerTransfer = 5;
  }

  // ============ Owner Functions ============

  /**
   * @notice Used to set router initial properties
   * @param router Router address to setup
   * @param owner Initial Owner of router
   * @param recipient Initial Recipient of router
   */
  function setupRouter(
    address router,
    address owner,
    address recipient
  ) external onlyOwner {
    _setupRouter(router, owner, recipient);
  }

  /**
   * @notice Used to remove routers that can transact crosschain
   * @param router Router address to remove
   */
  function removeRouter(address router) external override onlyOwner {
    _removeRouter(router);
  }

  /**
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(BridgeMessage.TokenId calldata canonical, address stableSwapPool)
    external
    override
    onlyOwner
  {
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
    if (!approvedAssets[canonicalId]) revert Connext__removeAssetId_notAdded();

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
   * @notice Used to add approved relayer
   * @param relayer - The relayer address to add
   */
  function addRelayer(address relayer) external override onlyOwner {
    if (approvedRelayers[relayer]) revert Connext__addRelayer_alreadyApproved();
    approvedRelayers[relayer] = true;

    emit RelayerAdded(relayer, msg.sender);
  }

  /**
   * @notice Used to remove approved relayer
   * @param relayer - The relayer address to remove
   */
  function removeRelayer(address relayer) external override onlyOwner {
    if (!approvedRelayers[relayer]) revert Connext__removeRelayer_notApproved();
    delete approvedRelayers[relayer];

    emit RelayerRemoved(relayer, msg.sender);
  }

  // ============ Public Functions ============

  /**
   * @notice Used to add relayer fees in the native asset
   * @param router - The router to credit
   */
  function addRelayerFees(address router) external payable override {
    if (msg.value == 0) revert Connext__addRelayerFees_notValue();
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
  function addLiquidityFor(
    uint256 amount,
    address local,
    address router
  ) external payable override nonReentrant {
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
    // transfer to specicfied recipient IF recipient not set
    address _recipient = routerRecipients(msg.sender);
    _recipient = _recipient == address(0) ? to : _recipient;

    // Sanity check: to is sensible
    if (_recipient == address(0)) revert Connext__removeLiquidity_recipientEmpty();

    // Sanity check: nonzero amounts
    if (amount == 0) revert Connext__removeLiquidity_amountIsZero();

    uint256 routerBalance = routerBalances[msg.sender][local];
    // Sanity check: amount can be deducted for the router
    if (routerBalance < amount) revert Connext__removeLiquidity_insufficientFunds();

    // Update router balances
    unchecked {
      routerBalances[msg.sender][local] = routerBalance - amount;
    }

    // Transfer from contract to specified to
    AssetLogic.transferAssetFromContract(local, _recipient, amount, wrapper);

    // Emit event
    emit LiquidityRemoved(msg.sender, _recipient, local, amount, msg.sender);
  }

  /**
   * @notice Used to set the max amount of routers a payment can be routed through
   * @param newMaxRouters The new max amount of routers
   */
  function setMaxRoutersPerTransfer(uint256 newMaxRouters) external override onlyOwner {
    if (newMaxRouters <= 0) revert Connext__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer();

    maxRoutersPerTransfer = newMaxRouters;

    emit MaxRoutersPerTransferUpdated(newMaxRouters, msg.sender);
  }

  /**
   * @notice This function is called by a user who is looking to bridge funds
   * @dev This contract must have approval to transfer the adopted assets. They are then swapped to
   * the local nomad assets via the configured AMM and sent over the bridge router.
   * @param _args - The XCallArgs
   * @return The transfer id of the crosschain transfer
   */
  // TODO: add indicator if fast liquidity is allowed
  function xcall(XCallArgs calldata _args) external payable override returns (bytes32) {
    // Asset must be either adopted, canonical, or representation
    // TODO: why is this breaking the build
    // require(
    //   adoptedToCanonical[_asset].id != bytes32(0) ||
    //   tokenRegistry.getLocalAddress(domain, _asset) != address(0),
    //   "!supported_asset"
    // );

    if (
      adoptedToCanonical[_args.transactingAssetId == address(0) ? address(wrapper) : _args.transactingAssetId].id ==
      bytes32(0)
    ) revert Connext__xcall_notSupportedAsset();

    // Transfer funds to the contract
    (address _transactingAssetId, uint256 _amount) = AssetLogic.transferAssetToContract(
      _args.transactingAssetId,
      _args.amount,
      wrapper
    );

    // Swap to the local asset from the adopted
    // TODO: do we want to swap per call or per batch?
    BridgeMessage.TokenId memory canonical = adoptedToCanonical[_transactingAssetId];
    (uint256 _bridgedAmt, address _bridged) = ConnextUtils.swapToLocalAssetIfNeeded(
      canonical,
      adoptedToLocalPools[canonical.id],
      tokenRegistry,
      _transactingAssetId,
      _amount
    );

    // Compute the transfer id
    bytes32 _transferId = ConnextUtils.getTransferId(nonce, msg.sender, _args.params);
    // Update nonce
    nonce++;

    // Add to batch
    ConnextUtils.sendMessage(
      bridgeRouter,
      _args.params.destinationDomain,
      _args.params.to,
      _bridged,
      _bridgedAmt,
      _transferId
    );

    // Emit event
    emit XCalled(
      _transferId,
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
   * @notice This function is called by the bridge router to pass through the information provided
   * by the user on prepare.
   * @dev If fast liquidity was provided, the `amount` and `externalHash` are asserted against the
   * `ExecutedTransaction` struct stored onchain. If no fast liqudity was provided, the hash
   * of the `ReconciledTransaction` is stored onchain to enforce correctness when `execute` is called
   * @param _transferId - Transfer UUID
   * @param _origin - The origin domain of the transfer
   * @param _local - The address of the asset delivered by the bridge
   * @param _recipient - The address that will receive funds on the destination domain
   * @param _amount - The amount bridged
   */
  function reconcile(
    bytes32 _transferId,
    uint32 _origin,
    address _local,
    address _recipient,
    uint256 _amount
  ) external payable override onlyBridgeRouter {
    // Find the router to credit
    ExecutedTransfer memory transaction = routedTransfers[_transferId];

    if (transaction.routers.length == 0) {
      // Nomad bridge executed faster than router, funds should become process-able
      // by the user.
      reconciledTransfers[_transferId] = ConnextUtils.getReconciledHash(_local, _recipient, _amount);
    } else {
      // TODO: assert amount credited is reasonable (depends on fee scheme)

      uint256 routersLength = transaction.routers.length;
      // This division in some cases will generate a remainder that is not credited to any router
      uint256 routerAmount = _amount / routersLength;

      for (uint256 i; i < routersLength; i++) {
        // Credit router
        routerBalances[transaction.routers[i]][_local] += routerAmount;
      }
    }

    // Emit event
    emit Reconciled(_transferId, _origin, _recipient, _local, _amount, transaction, msg.sender);
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
  function execute(ExecuteArgs calldata _args) external override returns (bytes32) {
    // Get the starting gas
    uint256 _start = gasleft();

    // Calculate the transfer id
    bytes32 _transferId = ConnextUtils.getTransferId(_args.nonce, _args.originSender, _args.params);

    // Determine if this is fast liquidity
    bytes32 _reconciledHash = reconciledTransfers[_transferId];
    bool _isFast = _reconciledHash == bytes32(0);

    // Handle liquidity as needed
    if (_isFast) {
      _decrementLiquidity(_transferId, _args.amount, _args.local, _args.routers);
    } else {
      // Ensure the reconciled hash is correct (user not charged liq fee for slow-liq)
      if (_reconciledHash != ConnextUtils.getReconciledHash(_args.local, _args.params.to, _args.amount))
        revert Connext__execute_notSlowParams();
    }

    // Execute the the transaction
    // If this is a mad* asset, then swap on local AMM
    (uint256 amount, address adopted) = ConnextUtils.swapFromLocalAssetIfNeeded(
      canonicalToAdopted,
      adoptedToLocalPools,
      tokenRegistry,
      _args.local,
      _args.amount
    );

    if (keccak256(_args.params.callData) == EMPTY) {
      // Send funds to the user
      AssetLogic.transferAssetFromContract(adopted, _args.params.to, amount, wrapper);
    } else {
      // Send funds to executor
      AssetLogic.transferAssetFromContract(adopted, address(executor), amount, wrapper);
      executor.execute(
        _transferId,
        amount,
        payable(_args.params.to),
        adopted,
        _isFast
          ? LibCrossDomainProperty.EMPTY_BYTES
          : LibCrossDomainProperty.formatDomainAndSenderBytes(_args.params.originDomain, _args.originSender),
        _args.params.callData
      );
    }

    // Save gas used
    if (_isFast) {
      routedTransfersGas[_transferId] = GasInfo({
        gasPrice: tx.gasprice,
        gasUsed: _start - gasleft()
        // TODO: account for gas used in storage
      });
    }

    // Pay metatx relayer
    // NOTE: if this is done *without* fast liquidity, router will be address(0) and the relayer
    // will always be paid
    _handleRelayerFees(_transferId, _args.routers, _args.feePercentage, _args.relayerSignature);

    // Emit event
    emit Executed(
      _transferId,
      _args.params.to,
      msg.sender,
      _args.params,
      _args.local,
      adopted,
      _args.amount,
      amount,
      msg.sender
    );

    return _transferId;
  }

  // ============ Private functions ============

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
    if (_router == address(0)) revert Connext__addLiquidityForRouter_routerEmpty();

    // Sanity check: nonzero amounts
    if (_amount == 0) revert Connext__addLiquidityForRouter_amountIsZero();

    // Get the canonical asset id from the representation
    (, bytes32 id) = tokenRegistry.getTokenId(_local == address(0) ? address(wrapper) : _local);

    // Router is approved
    if (!isRouterOwnershipRenounced() && !routerInfo.approvedRouters[_router])
      revert Connext__addLiquidityForRouter_badRouter();

    // Asset is approved
    if (!isAssetOwnershipRenounced() && !approvedAssets[id]) revert Connext__addLiquidityForRouter_badAsset();

    // Transfer funds to coethWithErcTransferact
    (address _asset, uint256 _received) = AssetLogic.transferAssetToContract(_local, _amount, wrapper);

    // Update the router balances. Happens after pulling funds to account for
    // the fee on transfer tokens
    routerBalances[_router][_asset] += _received;

    // Emit event
    emit LiquidityAdded(_router, _asset, id, _received, msg.sender);
  }

  /**
   * @notice Used to add assets on same chain as contract that can be transferred.
   * @param _canonical - The canonical TokenId to add (domain and id)
   * @param _adoptedAssetId - The used asset id for this domain (i.e. PoS USDC for
   * polygon)
   */
  function _addAssetId(BridgeMessage.TokenId calldata _canonical, address _adoptedAssetId) internal {
    // Sanity check: needs approval
    if (approvedAssets[_canonical.id]) revert Connext__addAssetId_alreadyAdded();

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
  function _addStableSwapPool(BridgeMessage.TokenId calldata _canonical, address _stableSwap) internal {
    // Update the pool mapping
    adoptedToLocalPools[_canonical.id] = IStableSwap(_stableSwap);

    emit StableSwapAdded(_canonical.id, _canonical.domain, _stableSwap, msg.sender);
  }

  /**
   * @notice Decrements router liquidity for the fast-liquidity case.
   * @dev Stores the router that supplied liquidity to credit on reconcile
   */
  function _decrementLiquidity(
    bytes32 _transferId,
    uint256 _amount,
    address _local,
    address[] calldata _routers
  ) internal {
    // Ensure it has not been executed already
    if (routedTransfers[_transferId].routers.length != 0) revert Connext__decrementLiquidity_notEmpty();

    // Ensure the routers is below max
    uint256 routersLength = _routers.length;
    if (routersLength > maxRoutersPerTransfer) revert Connext__decrementLiquidity_maxRoutersExceeded();

    // This division in some cases will generate a remainder that is not decremented to any router
    uint256 routerAmount = _amount / routersLength;

    for (uint256 i; i < routersLength; i++) {
      // Decrement liquidity
      routerBalances[_routers[i]][_local] -= routerAmount;
    }

    // Store the router
    routedTransfers[_transferId] = ExecutedTransfer({
      routers: _routers,
      amount: _amount // will be of the mad asset, not adopted
    });
  }

  /**
   * @notice Pays the relayer fee on behalf of a router some multiple on the basefee
   * @dev Currently only supported on eip-1559 chains and only handles native assets.
   * Also only used in `execute` transfers
   * @param _transferId - The unique identifier of the transfer
   * @param _routers - The routers you are sending the tx on behalf of
   * @param _feePct - The percent over the basefee you are adding
   */
  function _handleRelayerFees(
    bytes32 _transferId,
    address[] calldata _routers,
    uint32 _feePct,
    bytes calldata _sig
  ) internal {
    // NOTE: To not break the current working implementation in testnet, the first router is selected as the one to pay for the fees.
    // This is a temporary solution until https://github.com/connext/nxtp/discussions/899 is implemented.
    address _router = _routers[0];

    // If the sender *is* the router, do nothing
    if (msg.sender == _router) {
      return;
    }

    // If the sender is not approved relayer, revert()
    if (!approvedRelayers[msg.sender]) {
      revert Connext__handleRelayerFees_notApprovedRelayer();
    }

    // Check the signature of the router on the nonce + fee pct
    if (_router != ConnextUtils.recoverSignature(abi.encode(_transferId, _feePct), _sig))
      revert Connext__handleRelayerFees_notRtrSig();

    // Handle 0 case
    if (_feePct == 0) {
      return;
    }

    // Otherwise, send the fee percentage
    // TODO: BASEFEE opcode will only be supported if the domain supports EIP1559
    // must be able to detect this dynamically

    uint256 fee = (block.basefee * _feePct) / 100;

    // Decrement liquidity
    routerRelayerFees[_router] -= fee;

    // Pay sender
    AddressUpgradeable.sendValue(payable(msg.sender), fee);
  }

  receive() external payable {}

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[49] private __gap;
}
