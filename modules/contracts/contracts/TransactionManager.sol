pragma solidity ^0.8.1;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";
// TODO Reentrancy guard
// TODO add LibAsset and LibERC20 helpers for unusual tokens
// TODO add calldata helper (gnosis has one)
// TODO how can users check pending txs?
contract TransactionManager is ReentrancyGuard, ITransactionManager {

    struct TransactionData {
        address user;
        address router;
        uint256 amount;
        address sendingAssetId;
        address receivingAssetId;
        uint24 sendingChainId;
        uint24 receivingChainId;
        address callTo;
        bytes callData;
        // TODO consider using global nonce instead of transactionId
        bytes32 transactionId;
        uint256 expiry;
    }

    event LiquidityAdded(
        address router,
        address assetId,
        uint256 amount
    );

    event LiquidityRemoved(
        address router,
        address assetId,
        uint256 amount,
        address recipient
    );

    // Mapping of router to balance specific to asset
    mapping(address => mapping(address => uint256)) public routerBalances;

    // TODO perhaps move to user address --> iterable mapping of digests --> timeout
    // Otherwise, there's no way to get the timeout offchain
    // TODO: update on above -- actually this wont work. We *need* to include params that change
    // like amount and timeout in cleartext. Otherwise we would get a sig mismatch on receiver side.
    mapping(bytes32 => bool) public activeTransactions;
    uint24 public chainId;

    // TODO determine min timeout
    uint256 public constant MIN_TIMEOUT = 0;

    constructor(uint256 _chainId) {
        this.chainId = _chainId;
    }

    function addLiquidity(uint256 amount, address assetId)
        external  
        payable 
        override 
        nonReentrant 
    {
        // Validate correct amounts
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
        // If router amount exists, add to it. Else, create it.
        // TODO we are letting anyone be a router here -- is this ok?
        routerBalances[msg.sender][assetId] += amount;
        emit LiquidityAdded(msg.sender, assetId, amount);
    }

    function removeLiquidity(uint256 amount, address assetId, address recipient)
        external
        override
        nonReentrant
    {
        // TODO is this check necessary now that solidity 0.8.0 has safemath?
        require(routerBalances[msg.sender][assetId] >= amount, "removeLiquidity: INSUFFICIENT_FUNDS");
        routerBalances[msg.sender][assetId]-= amount;
        // TODO use existing transfer utils from vector here
        transferAsset(assetId, recipient, amount);
        emit LiquidityRemoved(msg.sender, assetId, amount, recipient);
    }

    // TODO checks effects interactions
    function prepare(
        TransactionData calldata txData
    ) external payable override nonReentrant returns (bytes32) {
        require((txData.expiry - block.timestamp) >= MIN_TIMEOUT, "prepare: TIMEOUT_TOO_LOW");
        require(txData.sendingChainId == this.chainId || 
            txData.receivingChainId == this.chainId, "prepare: INVALID_CHAINIDS");

        // First determine if this is sender side or receiver side
        if (txData.sendingChainId == this.chainId) {
            // This is sender side prepare
            // What validation is needed here?

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

        // Store the transaction
        bytes32 digest = keccak256(abi.encode(txData));
        // TODO: see above -- need to store more than just boolean for this to work
        activeTransactions[digest] = true;

        // Emit event -- TODO
        emit TransactionPrepared();

        return digest;
    }

    // TODO need to add fee incentive for router submission
    function fulfill(
        TransactionData calldata txData,
        bytes calldata signature
    ) external override nonReentrant {
        // Make sure params match against stored data
        // Also checks that there is an active transfer here
        // Also checks that sender or receiver chainID is this chainId (bc we checked it previously)
        require(activeTransactions[keccak256(abi.encode(txData))] = true, "fulfill: INVALID_PARAMS");

        // Zero out StoredTransaction
        activeTransactions[keccak256(abi.encode(txData))] = false;

        // Validate signature
        require(ECDSA.recover(storedTransactions[txData.transactionId].diges, signature) == storedTransactions[txData.transactionId].user, "fulfill: INVALID_SIGNATURE");
    
        if (txData.senderChainId == this.chainId) {
            // Complete tx to router
            routerBalances[txData.router][txData.sendingAssetId] += txData.amount;
        } else {
            // Complete tx to user
            // TODO How to handle calldata here?
            if (txData.callData == bytes(0)) {
                transferAsset(txData.receivingAssetId, txData.callTo, txData.amount);
            }
        }

        // Emit event -- TODO
        emit TransactionFulfilled();
    }

    // Tx can be "collaboratively" cancelled by the receiver at any time and by the sender after expiry
    function cancel(
        TransactionData calldata txData
    ) external override nonReentrant {     
        // Make sure params match against stored data
        // Also checks that there is an active transfer here
        // Also checks that sender or receiver chainID is this chainId (bc we checked it previously)
        require(activeTransactions[keccak256(abi.encode(txData))] = true, "cancel: INVALID_PARAMS");

        // Zero out StoredTransaction
        activeTransactions[keccak256(abi.encode(txData))] = false;

        if (txData.senderChainId == this.chainId) {
            // Sender side --> funds go back to user
            if(txData.expiry >= block.timestamp) {
                // Timeout has not expired and tx may only be cancelled by router
                require(msg.sender == txData.router);
            }
            // Return to user
            transferAsset(txData.sendingAssetId, txData.user, txData.amount);
            return;
        } else {
            // Receiver side --> funds go back to router
            if(txData.expiry >= block.timestamp) {
                // Timeout has not expired and tx may only be cancelled by user
                // TODO replace this with signature cancellation?
                require(msg.sender == txData.user);
            }
            // Return to router
            routerBalances[txData.router][txData.receivingAssetId] += txData.amount;
            return;
        }

        // Emit event -- TODO
        emit TransactionCancelled();
    }
}