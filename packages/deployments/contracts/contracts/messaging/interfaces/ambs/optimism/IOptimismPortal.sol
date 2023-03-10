// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/**
 * @notice Represents a proven withdrawal.
 * @dev Source:
 * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol
 *
 * @custom:field outputRoot    Root of the L2 output this was proven against.
 * @custom:field timestamp     Timestamp at whcih the withdrawal was proven.
 * @custom:field l2OutputIndex Index of the output this was proven against.
 */
struct ProvenWithdrawal {
  bytes32 outputRoot;
  uint128 timestamp;
  uint128 l2OutputIndex;
}

/**
 * @dev An informal interface. Technically not an interface but a contract, since we need to reference
 * a mapping when interfacing with the real thing (and mappings cannot be declared in interfaces in solidity).
 */
interface IOptimismPortal {
  /**
   * @notice A mapping of withdrawal hashes to `ProvenWithdrawal` data.
   */
  function provenWithdrawals(bytes32 _hash) external view returns (ProvenWithdrawal memory);
}
