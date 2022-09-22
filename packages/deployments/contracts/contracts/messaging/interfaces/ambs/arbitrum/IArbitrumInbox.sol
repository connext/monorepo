// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

/**
 * @notice Interface for sending L1 -> L2 messagesto Arbitrum.
 * @dev Arbitrum uses an inbox to aggregate messages going from L1 -> L2, source:
 * https://github.com/OffchainLabs/nitro/blob/master/contracts/src/bridge/Inbox.sol
 *
 */
interface IArbitrumInbox {
  function sendContractTransaction(
    uint256 maxGas,
    uint256 gasPriceBid,
    address destAddr,
    uint256 amount,
    bytes memory data
  ) external payable returns (uint256);
}
