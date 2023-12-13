// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title IBridge
 * @notice Interface for the Sygma's AMB bridge contract.
 */
interface IBridge {
  /**
   * @notice Proposal data struct
   * @param originDomainID ID of chain deposit originated from
   * @param depositNonce ID of deposit generated by the Bridge contract
   * @param resourceID ResourceID to be used
   * @param data Data originally provided when deposit was made
   */
  struct Proposal {
    uint8 originDomainID;
    uint64 depositNonce;
    bytes32 resourceID;
    bytes data;
  }

  /** 
    * @notice Initiates a transfer using a specified handler contract.
    * @notice Only callable when Bridge is not paused.
    * @param destinationDomainID ID of chain deposit will be bridged to.
    * @param resourceID ResourceID used to find address of handler to be used for deposit.
    * @param depositData Additional data to be passed to specified handler.
    * @param feeData Additional data to be passed to the fee handler.
    * @notice Emits {Deposit} event with all necessary parameters and a handler response.
    * @return depositNonce deposit nonce for the destination domain.
    * @return handlerResponse a handler response:
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

  /**
   * @notice Executes a deposit proposal using a specified handler contract (only if signature is signed by MPC).
   * @notice Failed executeProposal from handler don't revert, emits {FailedHandlerExecution} event.
   * @param proposal Proposal which consists of:
   * - originDomainID ID of chain deposit originated from.
   * - resourceID ResourceID to be used when making deposits.
   * - depositNonce ID of deposit generated by origin Bridge contract.
   * - data Data originally provided when deposit was made.
   * @param signature bytes memory signature composed of MPC key shares
   * @notice Emits {ProposalExecution} event.
   * @notice Behaviour of this function is different for {P3ermissionedGenericHandler} and other specific ERC handlers.
   * In the case of ERC handler, when execution fails, the handler will terminate the function with revert.
   * In the case of {PermissionedGenericHandler}, when execution fails, the handler will emit a failure event and terminate the function normally.
   */
  function executeProposal(Proposal memory proposal, bytes calldata signature) external;

  /**
   * @notice Executes a batch of deposit proposals using a specified handler contract for each proposal (only if signature is signed by MPC).
   * @notice If executeProposals fails it doesn't revert, emits {FailedHandlerExecution} event.
   * @param proposals Array of Proposal which consists of:
   * - originDomainID ID of chain deposit originated from.
   * - resourceID ResourceID to be used when making deposits.
   * - depositNonce ID of deposit generated by origin Bridge contract.
   * - data Data originally provided when deposit was made.
   * @param signature bytes memory signature for the whole array composed of MPC key shares
   * @notice Emits {ProposalExecution} event for each proposal in the batch.
   * @notice Behaviour of this function is different for {PermissionedGenericHandler} and other specific handlers.
   * In the case of ERC handler, when execution fails, the handler will terminate the function with revert.
   * In the case of {PermissionedGenericHandler}, when execution fails, the handler will emit a failure event and terminate the function normally.
   */
  function executeProposals(Proposal[] memory proposals, bytes calldata signature) external;
}
