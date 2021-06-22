// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "./interfaces/ITransactionManager.sol";
import "./lib/LibAsset.sol";
import "./lib/LibERC20.sol";
import "./lib/LibIterableMapping.sol";
import "@gnosis.pm/safe-contracts/contracts/libraries/MultiSend.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// TODO: add calldata helper (gnosis has one)
// TODO: how can users check pending txs?
contract TransactionManager is ReentrancyGuard, ITransactionManager {

    using LibIterableMapping for LibIterableMapping.IterableMapping;

    // Mapping of router to balance specific to asset
    mapping(address => mapping(address => uint256)) public routerBalances;

    // TODO: perhaps move to user address --> iterable mapping of digests --> timeout
    // Otherwise, there's no way to get the timeout offchain
    // TODO: update on above -- actually this wont work. We *need* to include params that change
    // like amount and timeout in cleartext. Otherwise we would get a sig mismatch on receiver side.
    // TODO: is this still relevant? @arjun -layne

    LibIterableMapping.IterableMapping activeTransactions;


    uint24 public immutable chainId;
    address public immutable multisend;

    // TODO: determine min timeout
    uint256 public constant MIN_TIMEOUT = 0;

    constructor(address _multisend, uint24 _chainId) {
        multisend = _multisend;
        chainId = _chainId;
    }

    function addLiquidity(uint256 amount, address assetId)
        external  
        payable 
        override 
        nonReentrant
    {
        // Validate correct amounts are transferred
        if (LibAsset.isEther(assetId)) {
            require(msg.value == amount, "addLiquidity: VALUE_MISMATCH");
        } else {
            require(msg.value == 0, "addLiquidity: ETH_WITH_ERC_TRANSFER");
            require(
                LibERC20.transferFrom(
                    assetId,
                    msg.sender,
                    address(this),
                    amount
                ),
                "addLiquidity: ERC20_TRANSFER_FAILED"
            );
        }

        // Update the router balances
        // TODO: we are letting anyone be a router here -- is this ok?
        // We are not permitting delegated liquidity here, what other checks
        // would be safe? - layne
        routerBalances[msg.sender][assetId] += amount;

        // Emit event
        emit LiquidityAdded(msg.sender, assetId, amount);
    }

    function removeLiquidity(uint256 amount, address assetId, address payable recipient)
        external
        override
        nonReentrant
    {
        // Check that the amount can be deducted for the router
        require(routerBalances[msg.sender][assetId] >= amount, "removeLiquidity: INSUFFICIENT_FUNDS");

        // Update router balances
        routerBalances[msg.sender][assetId] -= amount;

        // Transfer from contract to router
        require(LibAsset.transferAsset(assetId, recipient, amount), "removeLiquidity: TRANSFER_FAILED");

        // Emit event
        emit LiquidityRemoved(msg.sender, assetId, amount, recipient);
    }

    // TODO: checks effects interactions
    // TODO: does this need to return a `digest`? for composablity..?
    function prepare(
        TransactionData calldata txData
    ) external payable override nonReentrant returns (bytes32) {
        // Make sure the expiry is greater than min
        require((txData.expiry - block.timestamp) >= MIN_TIMEOUT, "prepare: TIMEOUT_TOO_LOW");

        // Make sure the chains are different
        require(txData.sendingChainId != txData.receivingChainId, "prepare: SAME_CHAINIDS");

        // Make sure the chains are relevant
        require(txData.sendingChainId == chainId || 
            txData.receivingChainId == chainId, "prepare: INVALID_CHAINIDS");
        // TODO: Hard require that the transfer is not already active with same txData

        // TODO: how to enforce transactionId validity?
        // TODO: should we enforce a valid `callTo` (not address(0))?

        // First determine if this is sender side or receiver side
        if (txData.sendingChainId == chainId) {
            // This is sender side prepare
            // What validation is needed here?
            // - receivingAssetId is valid?
            // - sendingAssetId is acceptable for receivingAssetId?
            // - enforce the receiving chainId != sendingChainId?

            // Validate correct amounts and transfer
            if (LibAsset.isEther(txData.sendingAssetId)) {
                require(msg.value == txData.amount, "prepare: VALUE_MISMATCH");
            } else {
                require(msg.value == 0, "prepare: ETH_WITH_ERC_TRANSFER");
                require(
                    LibERC20.transferFrom(
                        txData.sendingAssetId,
                        msg.sender,
                        address(this),
                        txData.amount
                    ),
                    "prepare: ERC20_TRANSFER_FAILED"
                );
            }
        } else {
            // This is receiver side prepare

            // Make sure this is the right chain
            require(chainId == txData.receivingChainId, "prepare: INVALID_RECEIVING_CHAIN");

            // Check that the caller is the router
            // TODO: this also prevents delegated liquidity (direct on contract)
            require(msg.sender == txData.router, "prepare: ROUTER_MISMATCH");

            // Check that router has liquidity
            require(routerBalances[txData.router][txData.receivingAssetId] >= txData.amount, "prepare: INSUFFICIENT_LIQUIDITY");

            // NOTE: Timeout and amounts should have been decremented offchain

            // NOTE: after some consideration, it feels like it's better to leave amount/fee
            // validation *outside* the contracts as we likely want the logic to be flexible

            // Pull funds from router balance (use msg.sender here to mitigate 3rd party attack)

            // What would happen if some router tried to swoop in and steal another router's spot?
            // - 3rd party router could EITHER use original txData or replace txData.router with itself
            // - if original txData, 3rd party router would basically be paying for original router
            // - if relaced router address, user sig on digest would not unlock sender side
            routerBalances[txData.router][txData.receivingAssetId] -= txData.amount;
        }

        // Store the transaction variants
        bytes32 digest = hashTransactionData(txData);

        activeTransactions.addTransaction(
          UnsignedTransactionData({ amount: txData.amount, expiry: txData.expiry, digest: digest })
        );

        // Emit event
        emit TransactionPrepared(txData, msg.sender);

        return digest;
    }

    // TODO: need to add fee incentive for router submission
    // ^^ does this need to happen? cant this be included in the offchain
    // fee calculation?
    function fulfill(
        TransactionData calldata txData,
        bytes calldata signature
    ) external override nonReentrant {
        // Make sure params match against stored data
        // Also checks that there is an active transfer here
        // Also checks that sender or receiver chainID is this chainId (bc we checked it previously)
        bytes32 digest = hashTransactionData(txData);

        // Retrieving this will revert if the record does not exist by the
        // digest (which asserts all but tx.amount, tx.expiry)
        UnsignedTransactionData memory record = activeTransactions.getTransactionByDigest(digest);

        // Amount and expiry should be the same as the record
        require(record.amount == txData.amount, "cancel: INVALID_AMOUNT");

        require(record.expiry == txData.expiry, "cancel: INVALID_EXPIRY");

        // Validate signature
        require(ECDSA.recover(digest, signature) == txData.user, "fulfill: INVALID_SIGNATURE");
    
        if (txData.sendingChainId == chainId) {
            // Complete tx to router
            routerBalances[txData.router][txData.sendingAssetId] += txData.amount;
        } else {
            // Complete tx to user
            if (keccak256(txData.callData) == keccak256(new bytes(0))) {
                require(LibAsset.transferAsset(txData.sendingAssetId, payable(txData.receivingAddress), txData.amount), "fulfill: TRANSFER_FAILED");
            } else {
                // TODO: this gnosis contracts support delegate calls as well,
                // should we restrict this behavior?
                try MultiSend(multisend).multiSend(txData.callData) {
                } catch {
                  // One of the transactions reverted, fallback of
                  // send funds to `receivingAddress`
                  LibAsset.transferAsset(txData.receivingAssetId, payable(txData.receivingAddress), txData.amount);
                }
            }
        }

        // Remove the active transaction
        activeTransactions.removeTransaction(digest);

        // Emit event
        emit TransactionFulfilled(txData, signature, msg.sender);
    }

    // Tx can be "collaboratively" cancelled by the receiver at any time and by the sender after expiry
    function cancel(
        TransactionData calldata txData
    ) external override nonReentrant {     
        // Make sure params match against stored data
        // Also checks that there is an active transfer here
        // Also checks that sender or receiver chainID is this chainId (bc we checked it previously)
        bytes32 digest = hashTransactionData(txData);
        
        // Retrieving this will revert if the record does not exist by the
        // digest (which asserts all but tx.amount, tx.expiry)
        UnsignedTransactionData memory record = activeTransactions.getTransactionByDigest(digest);

        // Amount and expiry should be the same as the record
        require(record.amount == txData.amount, "cancel: INVALID_AMOUNT");

        require(record.expiry == txData.expiry, "cancel: INVALID_EXPIRY");

        if (txData.sendingChainId == chainId) {
            // Sender side --> funds go back to user
            if (txData.expiry >= block.timestamp) {
                // Timeout has not expired and tx may only be cancelled by srouter
                require(msg.sender == txData.router, "cancel: ROUTER_MUST_CANCEL");
            }
            // Return to user
            require(LibAsset.transferAsset(txData.sendingAssetId, payable(txData.user), txData.amount), "cancel: TRANSFER_FAILED");

        } else {
            // Receiver side --> funds go back to router
            if (txData.expiry >= block.timestamp) {
                // Timeout has not expired and tx may only be cancelled by user
                // TODO: replace this with signature-based cancellation?
                require(msg.sender == txData.user, "cancel: USER_MUST_CANCEL");
            }
            // Return to router
            routerBalances[txData.router][txData.receivingAssetId] += txData.amount;
        }

        // Remove the active transaction
        activeTransactions.removeTransaction(digest);

        // Emit event
        emit TransactionCancelled(txData, msg.sender);
    }


    // Private functions
    function hashTransactionData(TransactionData calldata txData)
        internal
        pure
        returns (bytes32)
    {
        // TODO: is this the right payload to sign?
        SignedTransactionData memory data = SignedTransactionData({
          user: txData.user,
          router: txData.router,
          sendingAssetId: txData.sendingAssetId,
          receivingAssetId: txData.receivingAssetId,
          sendingChainId: txData.sendingChainId,
          receivingChainId: txData.receivingChainId,
          receivingAddress: txData.receivingAddress,
          callData: txData.callData,
          transactionId: txData.transactionId
        });
        return keccak256(abi.encode(data));
    }
}