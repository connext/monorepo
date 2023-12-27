// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {IFeeRouter} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IFeeRouter.sol";
import {console} from "forge-std/Test.sol";

contract Integration_Connector_SygmaSpokeConnector_SendMessage is Common {
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
   * @notice Tests it send a message through the Sygma Bridge using the Sygma Hub Connector successfully
   */
  function test_sendMessage() public {
    // Destination fomain
    uint8 _ethereumDomainId = 1;
    // Get the aggregate root from the Merkle Tree Manager
    bytes32 _aggregateRoot = merkleTreeManager.root();
    // Get and parse the deposit data
    bytes memory _depositData = sygmaSpokeConnector.parseDepositData(_aggregateRoot, mirrorConnector);
    bytes memory _feeData = "";

    // Deposit nonce grabbed from the Sygma Bridge
    uint64 _depositNonce = 2;
    bytes memory _handlerResponse = "";
    // Expect `deposit` event to be emitted on the Sygma Bridge with the correct values
    vm.expectEmit(true, true, true, true, address(sygmaSpokeConnector.SYGMA_BRIDGE()));
    emit Deposit(
      _ethereumDomainId,
      sygmaSpokeConnector.PERMISSIONLESS_HANDLER_ID(),
      _depositNonce,
      address(sygmaSpokeConnector),
      _depositData,
      _handlerResponse
    );

    // Get the fee needed to send the message
    vm.startPrank(address(rootManager));
    (uint256 _fee, ) = FEE_ROUTER.calculateFee(
      address(rootManager),
      SYGMA_HUB_DOMAIN_ID,
      SYGMA_CRONOS_DOMAIN_ID,
      sygmaSpokeConnector.PERMISSIONLESS_HANDLER_ID(),
      _depositData,
      _feeData
    );
    console.log("fee: ", _fee);

    // Give the balance to the root manager for the fee
    vm.deal(address(rootManager), _fee);

    // Send the message
    sygmaSpokeConnector.send{value: _fee}(_feeData);
  }
}
