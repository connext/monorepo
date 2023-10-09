// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IHubConnector} from "./IHubConnector.sol";

interface IHubSpokeConnector is IHubConnector {
  function saveAggregateRoot(bytes32 _aggregateRoot) external;
}
