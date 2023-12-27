// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

interface IFeeRouter {
  /**
   * @notice Initiates calculating fee with corresponding fee handler contract using IFeeHandler interface.
   * @param sender Sender of the deposit.
   * @param fromDomainID ID of the source chain.
   * @param destinationDomainID ID of chain deposit will be bridged to.
   * @param resourceID ResourceID to be used when making deposits.
   * @param depositData Additional data to be passed to specified handler.
   * @param feeData Additional data to be passed to the fee handler.
   * @return fee Returns the fee amount.
   * @return tokenAddress Returns the address of the token to be used for fee.
   */
  function calculateFee(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external view returns (uint256 fee, address tokenAddress);
}
