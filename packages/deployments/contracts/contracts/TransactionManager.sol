// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ProposedOwnable.sol";
import "./interfaces/IFulfillInterpreter.sol";
import "./interfaces/IWrapped.sol";
import "./interfaces/IStableSwap.sol";
import "./interpreters/FulfillInterpreter.sol";

import "./nomad-xapps/contracts/bridge/TokenRegistry.sol";
import "./nomad-xapps/contracts/bridge/BridgeRouter.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// Open questions:
// 1. How to account for fees/specify amount used on receiving chain?
// 2. Callback interface?
// 3. Best way to preserve "originator" for some permissioning on the receiving chain?

// TODO:
// - decide on interface for the stable swap
// - nomad contract packages not playing nicely
// - make functions metatxable
// - make upgradeable
// - assert the router gas usage in reconcile
// - allow multiple routers
// - allow aave wormhole style collateral for routers
// - identifier returned from nomad/bridge
// - gas optimizations
// - event finalization
// - unit tests
// - restricted router withdrawals
// - fulfill interpreter improvements (from audit and pass through origin domain stuff)
// - batching
// - native metatxs (with any asset)

contract TransactionManager is ReentrancyGuard, ProposedOwnable {

  // ============ Structs ============

  /**
   * @notice These are the call parameters that will remain constant between the
   * two chains. They are supplied on `prepare` and should be asserted on `fulfill`
   * @property recipient - The account that receives funds, in the event of a crosschain call,
   * will receive funds if the call fails.
   * @param callTo - The address of the receiving chain to execute the `callData` on. If no crosschain call is needed, then leave empty.
   * @param callData - The data to execute on the receiving chain. If no crosschain call is needed, then leave empty.
   * @param originDomain - The originating domain (i.e. where `prepare` is called). Must match nomad domain schema
   * @param destinationDomain - The final domain (i.e. where `fulfill` / `reconcile` are called). Must match nomad domain schema
   */
  struct CallParams {
    address recipient;
    address callTo;
    bytes callData;
    uint32 originDomain;
    uint32 destinationDomain;
  }

  /**
   * @notice Contains the external call information
   * @dev Used to create a hash to pass the external call information through the bridge
   * @param recipient - The address that should receive the funds on the destination domain if no call is
   * specified, or the fallback if an external call fails
   * @param callTo - The address of the receiving chain to execute the `callData` on
   * @param callData - The data to execute on the receiving chain
   */
  struct ExternalCall {
    address recipient;
    address callTo;
    bytes callData;
  }

  /**
   * @notice Contains information stored when `fulfill` is used in a fast-liquidity manner on a 
   * transaction to properly reimburse router when funds come through the bridge.
   * @param router - Address of the router that supplied fast-liquidity
   * @param amount - Amount of liquidity router provided. Used to prevent price-gauging when `amount` 
   * user supplied comes through bridge
   * @param externalHash - Hash of the `ExternalCall` router supplied. Used to enforce router executed 
   * the correct calldata under threat of non-repayment
   */
  struct FulfilledTransaction {
    address router;
    uint256 amount;
    bytes32 externalHash;
  }

  /**
   * @notice Contains information about the gas consumed in a `fulfill` call
   * @param gasUsed - The gas consumed for a fulfill transaction (including external call)
   * @param gasPrice - The tx.gasPrice on the fulfill transaction
   */
  struct GasInfo {
    uint256 gasUsed;
    uint256 gasPrice;
  }

  /**
   * @notice Struct containing the information that comes through the bridge provided by the user on `prepare`
   * @param externalHash - Hash of the `ExternalCall`
   * @param local - The address of the bridged asset
   * @param amount - The amount forwarded through the bridge
   * @param recipient - The address that gets the funds on the destination chain
   */
  struct ReconciledTransaction {
    bytes32 externalHash;
    address local;
    uint256 amount;
    address recipient;
  }

  /**
   * @notice The arguments you supply to the `prepare` function called by user on origin domain
   * @param params - The CallParams. These are consistent across sending and receiving chains
   * @param transactingAssetId - The asset the caller sent with the transaction. Can be the adopted, canonical,
   * or the representational asset
   * @param amount - The amount of transacting asset the tx prepared with
   */
  struct PrepareArgs {
    CallParams params;
    address transactingAssetId; // Could be adopted, local, or wrapped
    uint256 amount;
  }

  /**
   * @notice 
   * @param params - The CallParams. These are consistent across sending and receiving chains
   * @param local - The local asset for the transaction, will be swapped to the adopted asset if
   * appropriate
   * @param router - The router who you are sending the funds on behalf of
   * @param nonce - The nonce of the origin domain at the time the transaction was prepared. Used to generate 
   * the transaction id for the crosschain transaction
   * @param amount - The amount of liquidity the router provided or the bridge forwarded, depending on
   * if fast liquidity was used
   * @param feePercentage - The amount over the BASEFEE to tip the relayer
   */
  struct FulfillArgs {
    CallParams params;
    address local;
    address router;
    uint32 feePercentage;
    uint256 nonce;
    uint256 amount;
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
   * @param recipient - The address the funds were withdrawn to
   * @param local - The address of the token withdrawn
   * @param amount - The amount of liquidity withdrawn
   * @param caller - The account that called the function
   */
  event LiquidityRemoved(
    address indexed router,
    address recipient,
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
   * @notice Emitted when `prepare` is called on the origin domain
   * @param transactionId - The unique identifier of the crosschain transaction
   * @param recipient - The CallParams.recipient provided, created as indexed parameter
   * @param params - The CallParams provided to the function
   * @param transactingAsset - The asset the caller sent with the transaction. Can be the adopted, canonical,
   * or the representational asset
   * @param localAsset - The asset sent over the bridge. Will be the local asset of nomad that corresponds
   * to the provided `transactingAsset`
   * @param transactingAmount - The amount of transacting asset the tx prepared with
   * @param localAmount - The amount sent over the bridge (initialAmount with slippage)
   * @param nonce - The nonce of the origin domain contract. Used to create the unique identifier
   * for the transaction
   * @param caller - The account that called the function
   */
  event Prepared(
    bytes32 indexed transactionId,
    address indexed recipient,
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
   * @param transactionId - The unique identifier of the crosschain transaction
   * @param recipient - The CallParams.recipient provided, created as indexed parameter
   * @param router - The router that supplied fast liquidity, if applicable
   * @param localAsset - The asset that was provided by the bridge
   * @param localAmount - The amount that was provided by the bridge
   * @param externalHash - Hash of the `ExternalCall` passed through bridge
   * @param fulfilled - Record of the `FulfilledTransaction` stored onchain if fast liquidity is provided
   * @param caller - The account that called the function
   */
  event Reconciled(
    bytes32 indexed transactionId,
    address indexed recipient,
    address indexed router,
    address localAsset,
    uint256 localAmount,
    bytes32 externalHash,
    FulfilledTransaction fulfilled,
    address caller
  );

  /**
   * @notice Emitted when `fulfill` is called on the destination chain
   * @dev `fulfill` may be called when providing fast liquidity *or* when processing a reconciled transaction
   * @param transactionId - The unique identifier of the crosschain transaction
   * @param recipient - The CallParams.recipient provided, created as indexed parameter
   * @param router - The router that supplied fast liquidity, if applicable
   * @param params - The CallParams provided to the function
   * @param nonce - The nonce of the origin domain contract. Used to create the unique identifier
   * for the transaction
   * @param localAsset - The asset that was provided by the bridge
   * @param transactingAsset - The asset the recipient gets or the external call is executed with. Should be the
   * adopted asset on that chain.
   * @param localAmount - The amount that was provided by the bridge
   * @param transactingAmount - The amount of transacting asset the recipient receives or the external call is
   * executed with
   * @param caller - The account that called the function
   */
  event Fulfilled(
    bytes32 indexed transactionId,
    address indexed recipient,
    address indexed router,
    CallParams params,
    uint256 nonce,
    address localAsset,
    address transactingAsset,
    uint256 localAmount,
    uint256 transactingAmount,
    address caller
  );

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
   * @notice Nonce for the contract, used to keep unique transaction ids.
   * @dev Assigned at first interaction (prepare on origin domain);
   */
  uint256 public nonce = 0;

  /**
   * @notice The external contract that will execute crosschain calldata
   */
  IFulfillInterpreter public interpreter;

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
   * @notice Stores the transactionId => FulfilledTransaction mapping
   * @dev This information is stored onchain if fast liquidity is provided
   */
  mapping(bytes32 => FulfilledTransaction) public routedTransactions;

  /**
   * @notice Stores the transactionId => GasInfo mapping to track gas used on `fulfill`
   * @dev This informaion is stored onchain if fast liquidity is provided
   */
  mapping(bytes32 => GasInfo) public routedTransactionsGas;

  /**
   * @notice Stores hash of the `ReconciledTransaction` (all information passed through bridge) on `reconcile`
   * @dev This information is stored onchain if the transaction has not been fulfilled at the time
   * of reconcile
   */
  mapping(bytes32 => bytes32) public reconciledTransactions;

  /**
   * @notice The domain this contract exists on
   * @dev Must match the nomad domain, which is distinct from the "chainId"
   */
  uint256 public immutable domain;

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


  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to the local bridge router
   */
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
   * @notice Adds a stable swap pool for the local <> adopted asset.
   */
  function addStableSwapPool(
    BridgeMessage.TokenId calldata canonical,
    address stableSwapPool
  ) external onlyOwner {
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
  ) external onlyOwner {
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
   * @notice Used to add relayer fees in the native asset
   * @param router - The router to credit
   */
  function addRelayerFees(address router) external payable {
    routerRelayerFees[router] += msg.value;
  }

  /**
   * @notice Used to remove relayer fee in the native asset
   * @dev Must be called by the router you are decrementing relayer fees for
   * @param amount - The amount of relayer fee to remove
   * @param recipient - Who to send funds to
   */
  function removeRelayerFees(uint256 amount, address payable recipient) external {
    routerRelayerFees[msg.sender] -= amount;
    
    Address.sendValue(recipient, amount);
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
  function addLiquidityFor(uint256 amount, address local, address router) external payable nonReentrant {
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
  function addLiquidity(uint256 amount, address local) external payable nonReentrant {
    _addLiquidityForRouter(amount, local, msg.sender);
  }

  /**
   * @notice This is used by any router to decrease their available liquidity for a given asset.
   * @param amount - The amount of liquidity to remove for the router
   * @param local - The address of the asset you're removing liquidity from. If removing liquidity of the
   * native asset, routers may use `address(0)` or the wrapped asset
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

    // Emit event
    emit LiquidityRemoved(msg.sender, recipient, local, amount, msg.sender);
  }

  /**
   * @notice This function is called by a user who is looking to bridge funds
   * @dev This contract must have approval to transfer the adopted assets. They are then swapped to
   * the local nomad assets via the configured AMM and sent over the bridge router.
   * @param _args - The PrepareArgs
   * @return The transaction id of the crosschain transaction
   */
  // TODO: add indicator if fast liquidity is allowed
  function send(
    PrepareArgs calldata _args
  ) external payable returns (bytes32) {
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
    (uint256 _bridgedAmt, address _bridged) = _swapToLocalAssetIfNeeded(_transactingAssetId, _amount);

    // Compute the transaction id
    bytes32 _transactionId = _getTransactionId(nonce, domain);
    // Update nonce
    nonce++;

    // Call `send` on the bridge router
    _sendMessage(
      _args.params.destinationDomain,
      _args.params.recipient,
      _bridged,
      _bridgedAmt,
      _transactionId,
      _getExternalHash(_args.params.recipient, _args.params.callTo, _args.params.callData)
    );

    // Emit event
    emit Prepared(
      _transactionId,
      _args.params.recipient,
      _args.params,
      _transactingAssetId, // NOTE: this will switch from input to wrapper if native used
      _bridged,
      _amount,
      _bridgedAmt,
      nonce - 1,
      msg.sender
    );

    // Return the transaction id
    return _transactionId;
  }

  /**
   * @notice This function is called by the bridge router to pass through the information provided
   * by the user on prepare.
   * @dev If fast liquidity was provided, the `amount` and `externalHash` are asserted against the
   * `FulfilledTransaction` struct stored onchain. If no fast liqudity was provided, the hash
   * of the `ReconciledTransaction` is stored onchain to enforce correctness when `fulfill` is called
   * @param _id - The transaction id
   * @param _local - The address of the asset delivered by the bridge
   * @param _recipient - The address that will receive funds on the destination domain
   * @param _externalHash - The hash of the `ExternalCall` passed through the bridge
   */
  function reconcile(
    bytes32 _id,
    address _local,
    address _recipient,
    uint256 _amount,
    bytes32 _externalHash
  ) external onlyBridgeRouter payable {
    // Find the router to credit
    FulfilledTransaction memory transaction = routedTransactions[_id];

    if (transaction.router == address(0)) {
      // Nomad bridge fulfilled faster than router, funds should become process-able
      // by the user.
      reconciledTransactions[_id] = _getReconciledHash(_local, _recipient, _amount, _externalHash);
    } else {
      // Ensure the router submitted the correct calldata
      require(transaction.externalHash == _externalHash, "!external");

      // TODO: assert amount

      // Credit router
      routerBalances[transaction.router][_local] += _amount;
    }

    // Emit event
    emit Reconciled(
      _id,
      _recipient,
      transaction.router,
      _local,
      _amount,
      _externalHash,
      transaction,
      msg.sender
    );
  }

  /**
   * @notice This function is called on the destination chain when the bridged asset should be swapped
   * into the adopted asset and the external call executed. Can be used before reconcile (when providing
   * fast liquidity) or after reconcile (when using liquidity from the bridge)
   * @dev Will store the `FulfilledTransaction` if fast liquidity is provided, or assert the hash of the
   * `ReconciledTransaction` when using bridge liquidity
   * @param _args - The `FulfillArgs` for the transaction
   * @return The transaction id of the crosschain transaction
   */
  function fulfill(
    FulfillArgs calldata _args
  ) external returns (bytes32) {
    // Get the starting gas
    uint256 _start = gasleft();

    // Calculate the transaction id
    bytes32 _transactionId = _getTransactionId(_args.nonce, _args.params.originDomain);
    bool _isFast = reconciledTransactions[_transactionId] == bytes32(0);

    _handleLiquidity(_args.params, _transactionId, _args.local, _args.router, _isFast, _args.amount);

    // Execute the the transaction
    // If this is a mad* asset, then swap on local AMM
    (uint256 amount, address adopted) = _swapFromLocalAssetIfNeeded(_args.local, _args.amount);

    if (_args.params.callTo == address(0)) {
      // Send funds to the user
      _transferAssetFromContract(adopted, _args.params.recipient, amount);
    } else {
      // Send funds to interprepter
      _transferAssetFromContract(adopted, address(interpreter), amount);
      interpreter.execute(
        _transactionId,
        payable(_args.params.callTo),
        adopted,
        payable(_args.params.recipient),
        amount,
        _args.params.callData
      );
    }

    // Save gas used
    if (_isFast) {
      routedTransactionsGas[_transactionId] = GasInfo({
        gasPrice: tx.gasprice,
        gasUsed: _start - gasleft()
        // TODO: account for gas used in storage
      });
    }

    // Pay metatx relayer
    // NOTE: if this is done *without* fast liquidity, router will be address(0) and the relayer
    // will always be paid
    _handleRelayerFees(_args.router, _args.nonce, _args.feePercentage, _args.relayerSignature);

    // Emit event
    emit Fulfilled(
      _transactionId,
      _args.params.recipient,
      msg.sender,
      _args.params,
      _args.nonce,
      _args.local,
      adopted,
      _args.amount,
      amount,
      msg.sender
    );

    return _transactionId;
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
    SafeERC20.safeApprove(IERC20(_asset), address(pool), _amount);

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
    SafeERC20.safeApprove(IERC20(_asset), address(pool), _amount);

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
   * @return The transaction id
   */
  function _getTransactionId(uint256 _nonce, uint256 _domain) internal pure returns (bytes32) {
    return keccak256(abi.encode(_nonce, _domain));
  }

  /**
   * @notice Calculates the hash of the executed calldata and recipient on fulfill
   * @param _recipient - The address that will receive funds on the destination domain
   * @param _callTo - The contract address to execute the call data on
   * @param _callData - The data to execute
   * @return The computed hash
   */
  function _getExternalHash(address _recipient, address _callTo, bytes memory _callData) internal pure returns (bytes32) {
    return keccak256(abi.encode(ExternalCall({
      callTo: _callTo,
      callData: _callData,
      recipient: _recipient
    })));
  }

  /**
   * @notice Gets the hash for information returned across the bridge
   * @param _local - The asset delivered by the bridge
   * @param _recipient - The address that should receive the funds, or fallback address if the external call
   * fails
   * @param _amount - The amount delivered through the bridge
   * @param _externalHash - The hash of the `ExternalCall` passed through the bridge
   * @return The hash of the `ReconciledTransaction`
   */
  function _getReconciledHash(
    address _local,
    address _recipient,
    uint256 _amount,
    bytes32 _externalHash
  ) internal pure returns (bytes32) {
    ReconciledTransaction memory transaction = ReconciledTransaction({
      externalHash: _externalHash,
      local: _local,
      amount: _amount,
      recipient: _recipient
    });

    return keccak256(abi.encode(transaction));
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
   * @notice Handles transferring funds from msg.sender to the transaction manager contract.
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
      uint256 starting = IERC20(_assetId).balanceOf(address(this));
      require(msg.value == 0, "#TA:006");
      SafeERC20.safeTransferFrom(IERC20(_assetId), msg.sender, address(this), _specifiedAmount);
      // Calculate the *actual* amount that was sent here
      trueAmount = IERC20(_assetId).balanceOf(address(this)) - starting;
    }

    return (_assetId, trueAmount);
  }

  /**
   * @notice Handles transferring funds from msg.sender to the transaction manager contract.
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
      Address.sendValue(payable(_to), _amount);
    } else {
      // Transfer ERC20 asset
      SafeERC20.safeTransfer(IERC20(_assetId), _to, _amount);
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
    bytes32 _transactionId,
    address _local,
    address _router,
    bool _isFast,
    uint256 _amount
  ) internal {
    // Determine if it is fast (i.e. happened before reconcile called, needs
    // a router to front)
    bytes32 _externalHash = _getExternalHash(_params.recipient, _params.callTo, _params.callData);

    if (_isFast) {
      // Ensure it has not been fulfilled alread
      require(routedTransactions[_transactionId].router == address(0), "!empty");

      // Decrement liquidity
      routerBalances[_router][_local] -= _amount; 

      // Store the router
      routedTransactions[_transactionId] = FulfilledTransaction({
        router: _router,
        externalHash: _externalHash,
        amount: _amount // will be of the mad asset, not adopted
      });
    } else {
      // Check the reconciled transactions to ensure it is the right data
      bytes32 stored = reconciledTransactions[_transactionId];
      require(stored != bytes32(0), "!found");
      require(stored == _getReconciledHash(_local, _params.recipient, _amount, _externalHash), "!params");
    }
  }

  /**
   * @notice Pays the relayer fee on behalf of a router some multiple on the basefee
   * @dev Currently only supported on eip-1559 chains and only handles native assets.
   * Alos only used in `fulfill` transactions
   * @param _router - The router you are sending the tx on behalf of
   * @param _nonce - The nonce of the transaction
   * @param _feePct - The percent over the basefee you are adding
   */
  function _handleRelayerFees(
    address _router,
    uint256 _nonce,
    uint32 _feePct,
    bytes calldata _sig
  ) internal {
    // If the sender *is* the router, do nothing
    if (msg.sender == _router) {
      return;
    }

    // Check the signature of the router on the nonce + fee pct
    require(_router == recoverSignature(abi.encode(_nonce, _feePct), _sig), "!rtr_sig");

    // Otherwise, send the fee percentage
    // TODO: BASEFEE opcode will only be supported if the domain supports EIP1559
    // must be able to detect this dynamically

    uint256 fee = block.basefee * _feePct / 100;

    // Decrement liquidity
    routerRelayerFees[_router] -= fee;

    // Pay sender
    Address.sendValue(payable(msg.sender), fee);
  }

  /**
   * @notice Sends a message over the bridge
   * @param _destination - The destination domain for the message
   * @param _recipient - The address that should receive the funds, or fallback address if the external call
   * fails
   * @param _local - The asset delivered by the bridge
   * @param _amount - The amount delivered through the bridge
   * @param _id - The unique identifier of the transaction
   * @param _callHash - The hash of the `ExternalCall` information
   */
  function _sendMessage(
    uint32 _destination,
    address _recipient,
    address _local,
    uint256 _amount,
    bytes32 _id,
    bytes32 _callHash
  ) internal {
    // Approve the bridge router
    SafeERC20.safeIncreaseAllowance(IERC20(_local), address(bridgeRouter), _amount);

    bridgeRouter.send(
      _local,
      _amount,
      _destination,
      TypeCasts.addressToBytes32(_recipient),
      true,
      _id,
      _callHash
    );
  }

  /**
   * @notice Holds the logic to recover the signer from an encoded payload.
   * @dev Will hash and convert to an eth signed message.
   * @param _encoded The payload that was signed
   * @param _sig The signature you are recovering the signer from
   */
  function recoverSignature(bytes memory _encoded, bytes calldata _sig) internal pure returns (address) {
    // Recover
    return ECDSA.recover(
      ECDSA.toEthSignedMessageHash(keccak256(_encoded)),
      _sig
    );
  }
}