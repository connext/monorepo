// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

import "../interfaces/ITransactionManager.sol";

/// @title LibIterableMapping
/// @author Connext <support@connext.network>
/// @notice This library provides an efficient way to store and retrieve
///         UnsignedTransactionData. This contract is used to manage the 
///         transactions stored by `TransactionManager.sol`
library LibIterableMapping {
    struct UnsignedTransactionDataWithIndex {
        UnsignedTransactionData transaction;
        uint256 index;
    }

    struct IterableMapping {
        mapping(bytes32 => UnsignedTransactionDataWithIndex) transactions;
        bytes32[] digests;
    }

    function digestEqual(bytes32 s, bytes32 t)
        internal
        pure
        returns (bool)
    {
        return s == t;
    }

    function isEmptyString(bytes32 s) internal pure returns (bool) {
        return digestEqual(s, bytes32(0));
    }

    function digestExists(IterableMapping storage self, bytes32 digest)
        internal
        view
        returns (bool)
    {
        return
            !isEmptyString(digest) &&
            self.digests.length != 0 &&
            digestEqual(self.digests[self.transactions[digest].index], digest);
    }

    function length(IterableMapping storage self)
        internal
        view
        returns (uint256)
    {
        return self.digests.length;
    }

    function getTransactionByDigest(
        IterableMapping storage self,
        bytes32 digest
    ) internal view returns (UnsignedTransactionData memory) {
        require(digestExists(self, digest), "LibIterableMapping: DIGEST_NOT_FOUND");
        return self.transactions[digest].transaction;
    }

    function getTransactionByIndex(
        IterableMapping storage self,
        uint256 index
    ) internal view returns (UnsignedTransactionData memory) {
        require(index < self.digests.length, "LibIterableMapping: INVALID_INDEX");
        return self.transactions[self.digests[index]].transaction;
    }

    function getTransactions(IterableMapping storage self)
        internal
        view
        returns (UnsignedTransactionData[] memory)
    {
        uint256 l = self.digests.length;
        UnsignedTransactionData[] memory transactions = new UnsignedTransactionData[](l);
        for (uint256 i = 0; i < l; i++) {
            transactions[i] = self.transactions[self.digests[i]].transaction;
        }
        return transactions;
    }

    function addTransaction(
        IterableMapping storage self,
        UnsignedTransactionData memory transaction
    ) internal {
        bytes32 digest = transaction.digest;
        require(!isEmptyString(digest), "LibIterableMapping: EMPTY_DIGEST");
        require(!digestExists(self, digest), "LibIterableMapping: DIGEST_ALREADY_ADDED");
        self.transactions[digest] = UnsignedTransactionDataWithIndex({
            transaction: transaction,
            index: self.digests.length
        });
        self.digests.push(digest);
    }

    function removeTransaction(
        IterableMapping storage self,
        bytes32 digest
    ) internal {
        require(!isEmptyString(digest), "LibIterableMapping: EMPTY_DIGEST");
        require(digestExists(self, digest), "LibIterableMapping: DIGEST_NOT_FOUND");
        uint256 index = self.transactions[digest].index;
        bytes32 lastDigest = self.digests[self.digests.length - 1];
        self.transactions[lastDigest].index = index;
        self.digests[index] = lastDigest;
        delete self.transactions[digest];
        self.digests.pop();
    }
}
