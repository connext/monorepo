// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {console} from "forge-std/Test.sol";

contract Integration_Connector_SygmaHubConnector_SendMessage is Common {
  /**
   * @notice Emitted when a message is deposited on the Sygma Bridge
   * @param destinationDomainID The domain ID of the destination chain
   * @param resourceID The resource ID of the message
   * @param depositNonce The nonce of the message
   * @param user The user who sent the message
   * @param data The data of the message
   * @param handlerResponse The response of the handler
   */
  event Deposit(
    uint8 destinationDomainID,
    bytes32 resourceID,
    uint64 depositNonce,
    address indexed user,
    bytes data,
    bytes handlerResponse
  );

  /**
   * @notice Tests it send a message through the Sygma Bridge using the `sendMessage` function successfully
   */
  function test_sendMessage() public {
    // Current (origin) domain
    uint8 _ethereumDomainId = 1;
    // Destination fomain
    uint8 _cronosDomainId = 4;
    // Get the encoded data
    bytes memory _feeData = "";
    bytes memory _encodedData = abi.encode(_cronosDomainId, _feeData);
    // Get and parse the deposit data
    bytes32 _aggregateRoot = bytes32("aggregateRoot");
    bytes memory _depositData = sygmaHubConnector.parseDepositData(_aggregateRoot, mirrorConnector);

    // Deposit nonce grabbed from the Sygma Bridge
    uint64 _depositNonce = 4;
    bytes memory _handlerResponse = "";
    // Expect `deposit` event to be emitted on the Sygma Bridge with the correct values
    vm.expectEmit(true, true, true, true, address(sygmaHubConnector.SYGMA_BRIDGE()));
    emit Deposit(
      _cronosDomainId,
      sygmaHubConnector.PERMISSIONLESS_HANDLER_ID(),
      _depositNonce,
      address(sygmaHubConnector),
      _depositData,
      _handlerResponse
    );

    // Get the fee needed to send the message
    vm.startPrank(ROOT_MANAGER);
    (uint256 _fee, ) = FEE_ROUTER.calculateFee(
      ROOT_MANAGER,
      _ethereumDomainId,
      _cronosDomainId,
      sygmaHubConnector.PERMISSIONLESS_HANDLER_ID(),
      _depositData,
      _feeData
    );

    console.log("fee: ", _fee);
    // Give the balance to the root manager for the fee
    vm.deal(ROOT_MANAGER, _fee);

    // Send the message
    bytes memory _data = abi.encode(_aggregateRoot);
    sygmaHubConnector.sendMessage{value: _fee}(_data, _encodedData);
  }
}
