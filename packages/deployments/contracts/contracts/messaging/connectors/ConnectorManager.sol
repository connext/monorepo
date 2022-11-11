// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IConnectorManager} from "../interfaces/IConnectorManager.sol";
import {IOutbox} from "../interfaces/IOutbox.sol";

/**
 * @notice This is an interface to allow the `Messaging` contract to be used
 * as a `XappConnectionManager` on all router contracts.
 *
 * @dev Each nomad router contract has a `XappConnectionClient`, which references a
 * XappConnectionManager to get the `Home` (outbox) and approved `Replica` (inbox)
 * instances. At any point the client can replace the manager it's pointing to,
 * changing the underlying messaging connection.
 */
abstract contract ConnectorManager is IConnectorManager {
  constructor() {}

  function home() public view returns (IOutbox) {
    return IOutbox(address(this));
  }

  function isReplica(address _potentialReplica) public view returns (bool) {
    return _potentialReplica == address(this);
  }

  function localDomain() external view virtual returns (uint32);
}
