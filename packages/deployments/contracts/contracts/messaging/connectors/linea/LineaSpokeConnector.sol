// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";
import {LineaAmb} from "../../interfaces/ambs/LineaAmb.sol";

import {LineaBase} from "./LineaBase.sol";

contract LineaSpokeConnector is SpokeConnector, LineaBase {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
    LineaBase()
  {}

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");

    // Dispatch message through Linea AMB
    LineaAmb(AMB).sendMessage{value: msg.value}(
      mirrorConnector,
      msg.value, // fee is the passed in value
      abi.encodeWithSelector(Connector.processMessage.selector, _data)
    );
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(bytes memory _data) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // set the aggregate root
    receiveAggregateRoot(bytes32(_data));
  }
}
