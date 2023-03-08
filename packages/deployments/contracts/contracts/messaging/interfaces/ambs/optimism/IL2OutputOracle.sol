// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Types} from "../../../connectors/optimism/lib/Types.sol";

/**
 * @dev modified interface for L2OutputOracle. Source:
 * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/L2OutputOracle.sol
 * @dev An informal interface. Technically not an interface but a contract, since we need to reference state
 * variables when interfacing with the real thing (and variables cannot be declared in interfaces in solidity).
 */
contract IL2OutputOracle {
  /**
   * @notice The timestamp of the first L2 block recorded in this contract.
   */
  uint256 public startingTimestamp;

  /**
   * @notice Returns an output by index. Exists because Solidity's array access will return a
   *         tuple instead of a struct.
   *
   * @param _l2OutputIndex Index of the output to return.
   *
   * @return The output at the given index.
   */
  function getL2Output(uint256 _l2OutputIndex) external view returns (Types.OutputProposal memory) {}
}
