// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Types} from "../../../connectors/optimism/lib/Types.sol";

/**
 * @dev An informal interface. Technically not an interface but a contract, since we need to reference
 * a mapping when interfacing with the real thing (and mappings cannot be declared in interfaces in solidity).
 */
interface IOptimismPortal {
  /**
   * @notice Proves a withdrawal transaction.
   *
   * @param _tx              Withdrawal transaction to finalize.
   * @param _l2OutputIndex   L2 output index to prove against.
   * @param _outputRootProof Inclusion proof of the L2ToL1MessagePasser contract's storage root.
   * @param _withdrawalProof Inclusion proof of the withdrawal in L2ToL1MessagePasser contract.
   */
  function proveWithdrawalTransaction(
    Types.WithdrawalTransaction memory _tx,
    uint256 _l2OutputIndex,
    Types.OutputRootProof calldata _outputRootProof,
    bytes[] calldata _withdrawalProof
  ) external;
}
