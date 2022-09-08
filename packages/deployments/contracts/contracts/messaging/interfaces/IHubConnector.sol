// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IConnector} from "./IConnector.sol";

interface IHubConnector is IConnector {
  function sendMessage(bytes memory _data) external;
}
