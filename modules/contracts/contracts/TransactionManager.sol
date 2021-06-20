// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TransactionManager {
    struct TransactionData {
        bytes32 transferId;
        address sender;
        uint transferAmount;
        uint senderChainId;
        address senderAssetId;
        uint receiverChainId;
        address receiverAssetId;
        address routerAddress;
        uint expiry;
    }

    // minimum amount of stored info
    struct StoredTransaction {
        bytes32 digest;
        address signer;
        address routerAddress;
    }

    event TransactionPrepared(
        bytes32 indexed transferId,
        address sender,
        uint transferAmount,
        uint senderChainId,
        address senderAssetId,
        uint receiverChainId,
        address receiverAssetId,
        address routerAddress,
        uint expiry
    );

    mapping(bytes32 => bool) public activeTransactions;

    // called by anyone on behalf of included sender
    function prepare(TransactionData calldata txData) external payable returns (bytes32) {
        bytes32 hashedTransfer = keccak256(abi.encode(txData));

        require(!activeTransactions[hashedTransfer], "Transfer is already active");

        // store hash of transfer data into the contract
        activeTransactions[hashedTransfer] = true;

        // transfer tokens if needed
        if (txData.senderAssetId == address(0)) {
            require(msg.value == txData.transferAmount, "Transfer amount not included with tx");
        } else {
            ERC20(txData.senderAssetId).transferFrom(txData.sender, address(this), txData.transferAmount);
        }

        emit TransactionPrepared(
            txData.transferId,
            txData.sender,
            txData.transferAmount,
            txData.senderChainId,
            txData.senderAssetId,
            txData.receiverChainId,
            txData.receiverAssetId,
            txData.routerAddress,
            txData.expiry
        );

        return hashedTransfer;
    }

    // called by router
    function fulfill(TransactionData calldata txData, bytes calldata signature) external returns (bytes32) {
        bytes32 hashedTransfer = keccak256(abi.encode(txData));

        require(activeTransactions[hashedTransfer], "Transfer is not active");
        require(block.timestamp < txData.expiry, "Transfer expired");

        // verify sig
        require(ECDSA.recover(hashedTransfer, signature) == txData.sender, "Signature not valid");

        // transfer tokens or native asset
        if (txData.senderAssetId == address(0)) {
            address(this).transfer(txData.routerAddress);
        } else {
            ERC20(txData.senderAssetId).transferFrom(address(this), txData.routerAddress, txData.transferAmount);
        }

        // TODO: emit event here
    }
}