// SPPX-LicenseIdentifier: MIT
pragma solidity =0.8.17;

import {Common} from "./Common.sol";
import {ISignalService} from "../../../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";

contract Integration_Connector_TaikoSpokeonnector_ReceiveMessage is Common {
  /**
   * @notice Test that the message is received - we're waiting until we have a reliable RPC or explorer data on Taiko network
   * Tx we use to grab the signal and proof: https://explorer.jolnir.taiko.xyz/tx/0x9603e1800686ee762aba9c78d5e27e072487e4ba76f8ba18b8be91b9b425c7e4
   */
  //   function test_receiveMessage() public {
  //  bytes memory _data = abi.encode(SIGNAL, PROOF);
  //     vm.prank(offChainAgent);
  //     taikoSpokeConnector.processMessage(_data);
  //   }
  /**
   * @notice Test that the signal is received (to assert our contract is not failing) - we're waiting until we have a reliable RPC or explorer data on Taiko network
   */
  // function test_signalReceived() public {
  //   bool _received = SIGNAL_SERVICE.isSignalReceived(11155111, TX_FROM_ADDRESS, SIGNAL, PROOF);
  //   assertTrue(_received);
  // }
}
