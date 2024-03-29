// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IL2OracleGasPrice {
  /**
   * @notice Estimate fee for cross chain message call.
   * @param _gasLimit Gas limit required to complete the message relay on L2.
   * @return _fee The estimated fee.
   */
  function estimateCrossDomainMessageFee(uint256 _gasLimit) external view returns (uint256 _fee);

  /**
   * @notice Estimate intrinsic gas fee for cross chain message call.
   * @param _message The message to be relayed on L2.
   * @return _fee The estimated fee.
   */
  function calculateIntrinsicGasFee(bytes memory _message) external view returns (uint256 _fee);
}
