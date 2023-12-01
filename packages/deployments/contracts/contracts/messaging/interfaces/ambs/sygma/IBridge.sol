// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

interface IBridge {
  struct Proposal {
    uint8 originDomainID;
    uint64 depositNonce;
    bytes32 resourceID;
    bytes data;
  }

  /**
        @notice Initiates a transfer using a specified handler contract.
        @notice Only callable when Bridge is not paused.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID used to find address of handler to be used for deposit.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
        @notice Emits {Deposit} event with all necessary parameters and a handler response.
        @return depositNonce deposit nonce for the destination domain.
        @return handlerResponse a handler response:
        - ERC20Handler: responds with an empty data.
        - ERC721Handler: responds with the deposited token metadata acquired by calling a tokenURI method in the token contract.
        - PermissionedGenericHandler: responds with the raw bytes returned from the call to the target contract.
        - PermissionlessGenericHandler: responds with an empty data.
     */
  function deposit(
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external payable returns (uint64 depositNonce, bytes memory handlerResponse);

  function executeProposal(Proposal memory proposal, bytes calldata signature) external;

  function executeProposals(Proposal[] memory proposals, bytes calldata signature) external;
}

interface SygmaFeeRouter {
  /**
        @notice Initiates calculating fee with corresponding fee handler contract using IFeeHandler interface.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
        @return fee Returns the fee amount.
        @return tokenAddress Returns the address of the token to be used for fee.
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
