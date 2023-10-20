// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {LineaAmb} from "../../interfaces/ambs/LineaAmb.sol";

import {Connector} from "../Connector.sol";
import {HubConnector} from "../HubConnector.sol";

import {LineaBase} from "./LineaBase.sol";

contract LineaHubConnector is HubConnector, LineaBase {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) LineaBase() {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Messaging uses this function to send data to l2 via amb
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");

    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");

    // send message via AMB, should call "processMessage" which will update aggregate root
    LineaAmb(AMB).sendMessage{value: msg.value}(
      mirrorConnector,
      msg.value, // fee is the passed in value
      abi.encodeWithSelector(Connector.processMessage.selector, _data)
    );
  }

  /**
   * @dev L2 connector calls this function to pass down latest outbound root
   */
  function _processMessage(bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l2Connector");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));
  }
}
