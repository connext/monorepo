// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {BridgeForTest} from "../../sygma_for_test/BridgeForTest.sol";

contract Integration_Connector_SygmaHubConnector_ReceiveMessage is Common {
  event RootReceived(uint32 _domain, bytes32 _receivedRoot, uint256 _queueIndex);

  function test_receiveMessage(bytes memory _root, uint64 _depositNonce, bytes memory _signature) external {
    /* Prepare the data */
    bytes memory _prepareData = abi.encode(address(0), bytes32(_root));
    bytes memory _data = sygmaHubConnector.slice(_prepareData, 32);

    // Get the proposal data
    bytes memory _proposalData = abi.encodePacked(
      // uint256 maxFee
      _gasCap,
      // uint16 len(executeFuncSignature)
      sygmaHubConnector.FUNCTION_SIG_LEN(),
      // bytes executeFuncSignature
      sygmaHubConnector.receiveMessage.selector,
      // uint8 len(executeContractAddress)
      sygmaHubConnector.ADDRESS_LEN(),
      // bytes executeContractAddress
      address(sygmaHubConnector),
      // uint8 len(executionDataDepositor)
      sygmaHubConnector.ADDRESS_LEN(),
      // bytes executionDataDepositor
      mirrorConnector,
      // bytes executionDataDepositor
      _data
    );

    /* Create a new proposal */
    uint8 _cronosDomainId = 4;
    BridgeForTest.Proposal memory _proposal = BridgeForTest.Proposal({
      originDomainID: _cronosDomainId,
      depositNonce: _depositNonce,
      resourceID: sygmaHubConnector.PERMISSIONLESS_HANDLER_ID(),
      data: _proposalData
    });

    /* assert an event was emitted on SygmaHubConnector */
    uint256 _queueIndex = 1;
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootReceived(MIRROR_DOMAIN, bytes32(_root), _queueIndex);

    /* Propose the signed proposal */
    vm.startPrank(_amb);
    sygmaBridge.executeProposal(_proposal, _signature);
  }
}
