// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
    @title Interface for handler that handles generic deposits and deposit executions.
    @author ChainSafe Systems.
 */
interface IHandler {
  /**
        @notice It is intended that deposit are made using the Bridge contract.
        @param resourceID ResourceID used to find address of handler to be used for deposit.
        @param depositor Address of account making the deposit in the Bridge contract.
        @param data Consists of additional data needed for a specific deposit.
     */
  function deposit(bytes32 resourceID, address depositor, bytes calldata data) external returns (bytes memory);

  /**
        @notice It is intended that proposals are executed by the Bridge contract.
        @param resourceID ResourceID to be used when making deposits.
        @param data Consists of additional data needed for a specific deposit execution.
     */
  function executeProposal(bytes32 resourceID, bytes calldata data) external returns (bytes memory);

  /**
        @notice Correlates {_resourceIDToContractAddress} with {contractAddress}, {_tokenContractAddressToTokenProperties[tokenAddress].resourceID} with {resourceID} and marks
        {_tokenContractAddressToTokenProperties[tokenAddress].isWhitelisted} to true for {contractAddress} in ERCHandlerHelpers contract.
        @param resourceID ResourceID to be used when making deposits.
        @param contractAddress Address of contract to be called when a deposit is made and a deposited is executed.
        @param args Additional data to be passed to specified handler.
     */
  function setResource(bytes32 resourceID, address contractAddress, bytes calldata args) external;
}
