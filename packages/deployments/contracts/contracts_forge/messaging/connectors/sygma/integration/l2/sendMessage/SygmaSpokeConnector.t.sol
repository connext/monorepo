// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Common} from "./Common.sol";
import {IFeeRouter} from "../../../../../../../contracts/messaging/interfaces/ambs/sygma/IFeeRouter.sol";
import {console} from "forge-std/Test.sol";

contract Integration_Connector_SygmaSpokeConnector_SendMessage is Common {
  function test_sendMessage() public {
    // Get the encoded data
    // Get and parse the deposit data
    bytes32 _aggregateRoot = bytes32("aggregateRoot");
    bytes memory _depositData = sygmaSpokeConnector.parseDepositData(_aggregateRoot, _l2Connector);
    bytes memory _feeData = "";

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
