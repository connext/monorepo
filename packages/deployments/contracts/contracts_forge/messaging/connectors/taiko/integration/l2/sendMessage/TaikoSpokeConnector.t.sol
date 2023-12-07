// SPPX-LicenseIdentifier: MIT
pragma solidity =0.8.17;

import {Common} from "./Common.sol";
import {ISignalService} from "../../../../../../../contracts/messaging/interfaces/ambs/taiko/ISignalService.sol";

contract Integration_Connector_TaikoSpokeonnector_SendMessage is Common {
  function test_sendMessage() public {
    // Send message
    vm.prank(offChainAgent);
    bytes memory _encodedData = abi.encode("encodedData");
    taikoSpokeConnector.send(_encodedData);

    // Get the merkle root (the signal that was sent)
    bytes32 _root = merkleTreeManager.root();

    // Check is signal sent to be true
    bool _isSignalSent = SIGNAL_SERVICE.isSignalSent(address(taikoSpokeConnector), _root);
    assertEq(_isSignalSent, true, "signal not sent");
  }
}
