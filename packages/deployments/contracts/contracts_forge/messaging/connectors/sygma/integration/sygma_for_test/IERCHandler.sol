// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
    @title Interface to be used with handlers that support ERC20s and ERC721s.
    @author ChainSafe Systems.
 */
interface IERCHandler {
  /**
        @notice Marks {contractAddress} as mintable/burnable.
        @param contractAddress Address of contract to be used when making or executing deposits.
     */
  function setBurnable(address contractAddress) external;

  /**
        @notice Withdraw funds from ERC safes.
        @param data ABI-encoded withdrawal params relevant to the handler.
     */
  function withdraw(bytes memory data) external;

  /**
        @notice Exposing getter for {_resourceIDToTokenContractAddress}.
        @param resourceID ResourceID to be used.
        @return address The {tokenContractAddress} that is currently set for the resourceID.
     */
  // Solhint-disable-next-line func-name-mixedcase
  function _resourceIDToTokenContractAddress(bytes32 resourceID) external view returns (address);
}
