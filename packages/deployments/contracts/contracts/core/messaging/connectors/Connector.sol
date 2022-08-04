// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

abstract contract Connector {
  address public owner;
  address public AMBAddress;
  address public messengerAddress;

  /* ========== Virtual functions ========== */

  modifier verifySource() virtual;

  function _sendToAMB() external virtual;

}
