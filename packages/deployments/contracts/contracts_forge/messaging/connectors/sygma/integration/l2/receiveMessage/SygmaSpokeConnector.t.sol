// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {BridgeForTest} from "../../sygma_for_test/BridgeForTest.sol";
import {Common} from "./Common.sol";

contract Integration_Connector_SygmaSpokeConnector_ReceiveMessage is Common {
  /**
   * @notice Emitted when a root is received by the root manager
   * @param _root The root of the message
   */
  event AggregateRootReceived(bytes32 indexed _root);

  /**
   * @notice Tests it receives a message through the Sygma Bridge using the `receiveMessage` function successfully and it emits
   * the `AggregateRootReceived` event.
   * @param _root The root of the message
   * @param _depositNonce The deposit nonce of the message
   * @param _signature The signature of the message
   */
  function test_receiveMessage(bytes memory _root, uint64 _depositNonce, bytes memory _signature) external {
    vm.assume(bytes32(_root) != bytes32(0));

    /* Prepare the data */
    bytes memory _prepareData = abi.encode(address(0), bytes32(_root));
    bytes memory _data = sygmaSpokeConnector.slice(_prepareData, 32);

    /* Create a new proposal */
    uint16 _lenFunctionSig = 4;
    uint8 _lenAddress = 20;
    bytes memory _proposalData = abi.encodePacked(
      // uint256 maxFee
      _gasCap,
      // uint16 len(executeFuncSignature)
      _lenFunctionSig,
      // bytes executeFuncSignature
      sygmaSpokeConnector.receiveMessage.selector,
      // uint8 len(executeContractAddress)
      _lenAddress,
      // bytes executeContractAddress
      address(sygmaSpokeConnector),
      // uint8 len(executionDataDepositor)
      _lenAddress,
      // bytes executionDataDepositor
      mirrorConnector,
      // bytes executionDataDepositor
      _data
    );

    /* assert an event was emitted on SygmaSpokeConnector */
    vm.expectEmit(true, true, true, true, address(sygmaSpokeConnector));
    emit AggregateRootReceived(bytes32(_root));

    /* Propose the signed proposal */
    vm.prank(_amb);
    BridgeForTest.Proposal memory _proposal = BridgeForTest.Proposal({
      originDomainID: SYGMA_HUB_DOMAIN_ID,
      depositNonce: _depositNonce,
      resourceID: sygmaSpokeConnector.PERMISSIONLESS_HANDLER_ID(),
      data: _proposalData
    });
    sygmaBridge.executeProposal(_proposal, _signature);
  }
}
