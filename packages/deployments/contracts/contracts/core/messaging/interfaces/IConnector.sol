// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IProposedOwnable} from "../../shared/interfaces/IProposedOwnable.sol";

interface IConnector is IProposedOwnable {
  function sendMessage(bytes memory _data) external;

  function processMessage(address _sender, bytes memory _data) external;

  function verifySender(address _expected) external returns (bool);
}
