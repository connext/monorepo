// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "./interfaces/ITransactionManager.sol";
import "./lib/LibAsset.sol";
import "./lib/LibERC20.sol";
import "./interpreters/MultisendInterpreter.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract TransactionManager is ReentrancyGuard, ITransactionManager {
  /// @dev Mapping of router to balance specific to asset
  mapping(address => mapping(address => uint256)) public routerBalances;

  /// @dev Maping of user address to blocks where active transfers
  ///      were created.
  mapping(address => uint256[]) public activeTransactionBlocks;

  /// @dev Mapping of hash of `TransactionData` to status of a transaction
  mapping(bytes32 => TransactionStatus) public transactionStatus;

  /// @dev The chain id of the contract, is passed in to avoid any evm issues
  uint256 public immutable chainId;

  /// @dev Address of the deployed multisending interpreter contract
  address public immutable iMultisend;

  uint256 public constant MIN_TIMEOUT = 24 hours;

  constructor(address _iMultisend, uint256 _chainId) {
    iMultisend = _iMultisend;
    chainId = _chainId;
  }

  /// @param amount The amount of liquidity to add for the router
  /// @param assetId The address (or `address(0)` if native asset) of the
  ///                asset you're adding liquidity for
  function addLiquidity(uint256 amount, address assetId) external payable override nonReentrant {
    // Validate correct amounts are transferred
    if (LibAsset.isEther(assetId)) {
      require(msg.value == amount, "addLiquidity: VALUE_MISMATCH");
    } else {
      require(msg.value == 0, "addLiquidity: ETH_WITH_ERC_TRANSFER");
      require(LibERC20.transferFrom(assetId, msg.sender, address(this), amount), "addLiquidity: ERC20_TRANSFER_FAILED");
    }

    // Update the router balances
    routerBalances[msg.sender][assetId] += amount;

    // Emit event
    emit LiquidityAdded(msg.sender, assetId, amount);
  }

  function removeLiquidity(
    uint256 amount,
    address assetId,
    address payable recipient
  ) external override nonReentrant {
    // Check that the amount can be deducted for the router
    // TODO is this check worth the extra gas?
    require(routerBalances[msg.sender][assetId] >= amount, "removeLiquidity: INSUFFICIENT_FUNDS");

    // Update router balances
    routerBalances[msg.sender][assetId] -= amount;

    // Transfer from contract to router
    require(LibAsset.transferAsset(assetId, recipient, amount), "removeLiquidity: TRANSFER_FAILED");

    // Emit event
    emit LiquidityRemoved(msg.sender, assetId, amount, recipient);
  }

  function prepare(
    InvariantTransactionData calldata _txData,
    uint256 amount,
    uint256 expiry,
    bytes calldata encodedBid,
    bytes calldata bidSignature
  ) external payable override nonReentrant returns (TransactionData memory) {
    // Make sure the expiry is greater than min
    require((expiry - block.timestamp) >= MIN_TIMEOUT, "prepare: TIMEOUT_TOO_LOW");

    // Make sure the chains are different
    require(_txData.sendingChainId != _txData.receivingChainId, "prepare: SAME_CHAINIDS");

    // Make sure the chains are relevant
    require(_txData.sendingChainId == chainId || _txData.receivingChainId == chainId, "prepare: INVALID_CHAINIDS");

    // Sanity check: valid fallback
    require(_txData.receivingAddress != address(0), "prepare: INVALID_RECEIVING_ADDRESS");

    // Make sure the hash is not a duplicate
    TransactionData memory txData = TransactionData({
      user: _txData.user,
      router: _txData.router,
      sendingAssetId: _txData.sendingAssetId,
      receivingAssetId: _txData.receivingAssetId,
      receivingAddress: _txData.receivingAddress,
      callData: _txData.callData,
      transactionId: _txData.transactionId,
      amount: amount,
      expiry: expiry,
      blockNumber: block.number,
      sendingChainId: _txData.sendingChainId,
      receivingChainId: _txData.receivingChainId
    });
    bytes32 digest = keccak256(abi.encode(txData));
    require(transactionStatus[digest] == TransactionStatus.Empty, "prepare: DIGEST_EXISTS");

    // Store the transaction variants
    transactionStatus[digest] = TransactionStatus.Pending;

    // Store active blocks
    activeTransactionBlocks[txData.user].push(block.number);

    // First determine if this is sender side or receiver side
    if (txData.sendingChainId == chainId) {
      // This is sender side prepare

      // Validate correct amounts and transfer
      if (LibAsset.isEther(txData.sendingAssetId)) {
        require(msg.value == txData.amount, "prepare: VALUE_MISMATCH");
      } else {
        require(msg.value == 0, "prepare: ETH_WITH_ERC_TRANSFER");
        require(
          LibERC20.transferFrom(txData.sendingAssetId, msg.sender, address(this), txData.amount),
          "prepare: ERC20_TRANSFER_FAILED"
        );
      }
    } else {
      // This is receiver side prepare

      // Check that the caller is the router
      require(msg.sender == txData.router, "prepare: ROUTER_MISMATCH");
      require(msg.value == 0, "prepare: ETH_WITH_ROUTER_PREPARE");

      // Check that router has liquidity
      // TODO do we need explicit check vs implicit from safemath below?
      require(
        routerBalances[msg.sender][txData.receivingAssetId] >= txData.amount,
        "prepare: INSUFFICIENT_LIQUIDITY"
      );

      // NOTE: Timeout and amounts should have been decremented offchain

      // NOTE: after some consideration, it feels like it's better to leave amount/fee
      // validation *outside* the contracts as we likely want the logic to be flexible

      // Pull funds from router balance (use msg.sender here to mitigate 3rd party attack)

      // What would happen if some router tried to swoop in and steal another router's spot?
      // - 3rd party router could EITHER use original txData or replace txData.router with itself
      // - if original txData, 3rd party router would basically be paying for original router
      // - if relaced router address, user sig on digest would not unlock sender side
      routerBalances[msg.sender][txData.receivingAssetId] -= txData.amount;
    }

    // Emit event
    emit TransactionPrepared(txData, msg.sender, encodedBid, bidSignature);
    return txData;
  }

  function fulfill(
    TransactionData calldata txData,
    uint256 relayerFee,
    bytes calldata signature // signature on fee + digest
  ) external override nonReentrant returns (TransactionData memory) {
    // Make sure params match against stored data
    // Also checks that there is an active transfer here
    // Also checks that sender or receiver chainID is this chainId (bc we
    // checked it previously)
    bytes32 digest = keccak256(abi.encode(txData));

    require(transactionStatus[digest] == TransactionStatus.Pending, "fulfill: INVALID_TX_STATUS");

    require(txData.expiry > block.timestamp, "fulfill: EXPIRED");

    // Validate signature
    require(recoverFulfillSignature(txData, relayerFee, signature) == txData.user, "fulfill: INVALID_SIGNATURE");

    // Sanity check: fee < amount
    // TODO: Do we need this check? Safemath would catch it below
    require(relayerFee < txData.amount, "fulfill: INVALID_RELAYER_FEE");

    // Mark transaction as fulfilled
    transactionStatus[digest] = TransactionStatus.Completed;

    // Remove active blocks
    removeUserActiveBlocks(txData.user, txData.blockNumber);

    // TODO: user cant accidentally fulfill sender
    if (txData.sendingChainId == chainId) {
      // Complete tx to router
      // NOTE: there is no fee taken on the sending side for the relayer
      routerBalances[txData.router][txData.sendingAssetId] += txData.amount;
    } else {
      // Complete tx to user
      // Get the amount to send
      uint256 toSend = txData.amount - relayerFee;

      // Send the relayer the fee
      if (relayerFee > 0) {
        require(
          LibAsset.transferAsset(txData.receivingAssetId, payable(msg.sender), relayerFee),
          "fulfill: FEE_TRANSFER_FAILED"
        );
      }

      if (keccak256(txData.callData) == keccak256(new bytes(0))) {
        // No external calls, send directly to receiving address
        require(
          LibAsset.transferAsset(txData.receivingAssetId, payable(txData.receivingAddress), toSend),
          "fulfill: TRANSFER_FAILED"
        );
      } else {
        // Handle external calls with a fallback to the receiving
        // address
        // TODO: This would allow us to execute an arbitrary transfer to drain the contracts
        // We'll need to change this to use vector pattern with *explicit* amount.
        // If it is a token, approve the amount to the interpreter
        try
          MultisendInterpreter(iMultisend).execute{value: LibAsset.isEther(txData.receivingAssetId) ? toSend : 0}(
            txData.receivingAssetId,
            toSend,
            txData.callData
          )
        {} catch {
          require(
            LibAsset.transferAsset(txData.receivingAssetId, payable(txData.receivingAddress), toSend),
            "fulfill: TRANSFER_FAILED"
          );
        }
      }
    }

    // Emit event
    emit TransactionFulfilled(txData, relayerFee, signature, msg.sender);

    return txData;
  }

  // Tx can be "collaboratively" cancelled by the receiver at any time and by the sender after expiry
  function cancel(TransactionData calldata txData, bytes calldata signature)
    external
    override
    nonReentrant
    returns (TransactionData memory)
  {
    // Make sure params match against stored data
    // Also checks that there is an active transfer here
    // Also checks that sender or receiver chainID is this chainId (bc we checked it previously)
    bytes32 digest = keccak256(abi.encode(txData));

    require(transactionStatus[digest] == TransactionStatus.Pending, "cancel: INVALID_TX_STATUS");

    // Mark transaction as complete
    transactionStatus[digest] = TransactionStatus.Completed;

    if (txData.sendingChainId == chainId) {
      // Sender side --> funds go back to user
      if (txData.expiry >= block.timestamp) {
        // Timeout has not expired and tx may only be cancelled by router
        require(msg.sender == txData.router, "cancel: ROUTER_MUST_CANCEL");
      }
      // Return to user
      require(
        LibAsset.transferAsset(txData.sendingAssetId, payable(txData.user), txData.amount),
        "cancel: TRANSFER_FAILED"
      );
    } else {
      // Receiver side --> funds go back to router
      if (txData.expiry >= block.timestamp) {
        // Timeout has not expired and tx may only be cancelled by user
        // Validate signature
        require(recoverCancelSignature(txData, signature) == txData.user, "cancel: INVALID_SIGNATURE");
      }
      // Return to router
      routerBalances[txData.router][txData.receivingAssetId] += txData.amount;
    }

    // Remove active blocks
    removeUserActiveBlocks(txData.user, txData.blockNumber);

    // Emit event
    emit TransactionCancelled(txData, msg.sender);

    // Return
    return txData;
  }

  // Private functions
  function removeUserActiveBlocks(address user, uint256 preparedBlock) internal {
    // Remove active blocks
    uint256 newLength = activeTransactionBlocks[user].length - 1;
    uint256[] memory updated = new uint256[](newLength);
    bool removed = false;
    uint256 updatedIdx = 0;
    for (uint256 i; i < newLength + 1; i++) {
      // Handle case where there could be more than one tx added in a block
      // And only one should be removed
      if (!removed && activeTransactionBlocks[user][i] == preparedBlock) {
        removed = true;
        continue;
      }
      updated[updatedIdx] = activeTransactionBlocks[user][i];
      updatedIdx++;
    }
    activeTransactionBlocks[user] = updated;
  }

  function recoverFulfillSignature(
    TransactionData calldata txData,
    uint256 relayerFee,
    bytes calldata signature
  ) internal pure returns (address) {
    // Create the digest
    bytes32 invariantDigest = hashInvariantTransactionData(txData);

    // Create the signed payload
    SignedFulfillData memory payload = SignedFulfillData({invariantDigest: invariantDigest, relayerFee: relayerFee});

    bytes32 signed = keccak256(abi.encode(payload));
    // Recover
    return ECDSA.recover(ECDSA.toEthSignedMessageHash(signed), signature);
  }

  function recoverCancelSignature(TransactionData calldata txData, bytes calldata signature)
    internal
    pure
    returns (address)
  {
    // Create the digest
    bytes32 invariantDigest = hashInvariantTransactionData(txData);

    // Create the signed payload
    SignedCancelData memory payload = SignedCancelData({invariantDigest: invariantDigest, cancel: "cancel"});

    // Recover
    bytes32 signed = keccak256(abi.encode(payload));
    // Recover
    return ECDSA.recover(ECDSA.toEthSignedMessageHash(signed), signature);
  }

  function hashInvariantTransactionData(TransactionData calldata txData) internal pure returns (bytes32) {
    InvariantTransactionData memory invariant = InvariantTransactionData({
      user: txData.user,
      router: txData.router,
      sendingAssetId: txData.sendingAssetId,
      receivingAssetId: txData.receivingAssetId,
      receivingAddress: txData.receivingAddress,
      sendingChainId: txData.sendingChainId,
      receivingChainId: txData.receivingChainId,
      callData: txData.callData,
      transactionId: txData.transactionId
    });
    return keccak256(abi.encode(invariant));
  }
}
