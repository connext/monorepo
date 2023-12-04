// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {Connector} from "../../../../../../../contracts/messaging/connectors/Connector.sol";
import {SygmaHubConnector, IBridge} from "../../../../../../../contracts/messaging/connectors/sygma/SygmaHubConnector.sol";
import {IFeeRouter} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IFeeRouter.sol";

import "forge-std/Test.sol";

contract Integration_Connector_SygmaHubConnector_SendMessage is Common {
  function test_sendMessage() public {
    // Declare current (origin) domain
    uint8 _ethereumDomainId = 1;
    // Declare destination fomain
    uint8 _cronosDomainId = 4;
    // Get the encoded data
    bytes memory _feeData = "";
    bytes memory _encodedData = abi.encode(_cronosDomainId, _feeData);
    // Get and parse the deposit data
    bytes32 _aggregateRoot = bytes32("aggregateRoot");
    bytes memory _depositData = sygmaHubConnector.parseDepositData(_aggregateRoot, _l2Connector);

    // Get the fee needed to send the message
    vm.startPrank(address(rootManager));
    (uint256 _fee, ) = IFeeRouter(0xC47468aeae431f5D0B7DA50F9f5D8a6c0eca4789).calculateFee(
      address(rootManager),
      _ethereumDomainId,
      _cronosDomainId,
      sygmaHubConnector.PERMISSIONLESS_HANDLER_ID(),
      _depositData,
      _feeData
    );

    console.log("fee: ", _fee);
    // Give the balance to the root manager for the fee
    vm.deal(address(rootManager), _fee);

    // Send the message
    bytes memory _data = abi.encodePacked(_aggregateRoot);
    sygmaHubConnector.sendMessage{value: _fee}(_data, _encodedData);
  }
}
