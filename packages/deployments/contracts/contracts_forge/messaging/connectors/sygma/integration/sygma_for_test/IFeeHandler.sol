// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title Interface to be used with fee handlers.
 */
interface IFeeHandler {
  /**
        @notice This event is emitted when the fee is collected.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param fee Collected fee amount.
        @param tokenAddress Address of the token in which the fee was collected (0 for the base currency).
     */
  event FeeCollected(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    uint256 fee,
    address tokenAddress
  );

  /**
        @notice This event is emitted when the fee is distributed to an address.
        @param tokenAddress Address of the token in which the fee was collected (0 for the base currency).
        @param recipient Address that receives the distributed fee.
        @param amount Amount that is distributed.
     */
  event FeeDistributed(address tokenAddress, address recipient, uint256 amount);

  /**
        @notice Collects fee for deposit.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
     */
  function collectFee(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external payable;

  /**
        @notice Calculates fee for deposit.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
        @return Returns the fee amount.
        @return Returns the address of the token to be used for fee.
     */
  function calculateFee(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external view returns (uint256, address);
}
