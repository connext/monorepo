// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GasCap} from "../GasCap.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {Connector} from "../Connector.sol";

abstract contract BaseSygma is GasCap {
  uint256 public constant ROOT_LENGTH = 32;
  IBridge public immutable SYGMA_BRIDGE;

  constructor(address _amb, uint256 _gasCap) GasCap(_gasCap) {
    SYGMA_BRIDGE = IBridge(_amb);
  }

  function _checkDataLength(bytes memory _data) internal pure returns (bool _validLength) {
    _validLength = _data.length == ROOT_LENGTH;
  }

  function _verifyOriginSender(address _sender, address _expected) internal pure returns (bool _validSender) {
    _validSender = _sender == _expected;
  }
}
