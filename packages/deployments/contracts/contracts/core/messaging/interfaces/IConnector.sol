// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IProposedOwnable} from "../../shared/interfaces/IProposedOwnable.sol";

/**
 * @notice This interface is what the Connext contract will send and receive messages through.
 * The messaging layer should conform to this interface, and should be interchangeable (i.e.
 * could be Nomad or a generic AMB under the hood).
 *
 * @dev This uses the nomad format to ensure nomad can be added in as it comes back online.
 *
 * Flow from transfer from polygon to optimism:
 * 1. User calls `xcall` with destination specified
 * 2. This will swap in to the bridge assets
 * 3. The swapped assets will get burned
 * 4. The Connext contract will call `dispatch` on the messaging contract to add the transfer
 *    to the root
 * 5. [At some time interval] Relayers call `send` to send the current root from polygon to
 *    mainnet. This is done on all "spoke" domains.
 * 6. [At some time interval] Relayers call `propagate` [better name] on mainnet, this generates a new merkle
 *    root from all of the AMBs
 *    - This function must be able to read root data from all AMBs and aggregate them into a single merkle
 *      tree root
 *    - Will send the mixed root from all chains back through the respective AMBs to all other chains
 * 7. AMB will call `update` to update the latest root on the messaging contract on spoke domains
 * 8. [At any point] Relayers can call `proveAndProcess` to prove inclusion of dispatched message, and call
 *    process on the `Connext` contract
 * 9. Takes minted bridge tokens and credits the LP
 *
 * AMB requirements:
 * - Access `msg.sender` both from mainnet -> spoke and vice versa
 * - Ability to read *our root* from the AMB
 *
 * AMBs:
 * - PoS bridge from polygon
 * - arbitrum bridge
 * - optimism bridge
 * - gnosis chain
 * - bsc (use multichain for messaging)
 */
interface IConnector is IProposedOwnable {
  function sendMessage(bytes memory _data) external;

  function processMessage(address _sender, bytes memory _data) external;

  function verifySender(address _expected) external returns (bool);

  /**
   * @notice This function should send a message through the AMB by adding it to the merkle root
   * stored on that chain.
   */
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external;

  /**
   * @notice Must be able to call the `handle` function on the BridgeRouter contract. This is called
   * on the destination domain to handle incoming messages
   */
  function proveAndProcess(
    bytes memory _message,
    bytes32[32] calldata _proof,
    uint256 _index
  ) external;

  /**
   * @notice This is called by relayers to trigger passing of current root to mainnet root manager
   * @dev This is called at specific time intervals
   */
  function send() external;
}
