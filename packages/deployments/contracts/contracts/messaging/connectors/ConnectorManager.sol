// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IConnectorManager} from "../interfaces/IConnectorManager.sol";
import {IOutbox} from "../interfaces/IOutbox.sol";

/**
 * @notice This is an interface to allow the `Messaging` contract to be used
 * as a `XappConnectionManager` on all router contracts.
 *
 * @dev Each nomad router contract has a `XappConnectionClient`, which references a
 * XappConnectionManager to get the `Home` (oubtox) and approved `Replica` (inbox)
 * instances. At any point the client can replace the manager it's pointing to,
 * changing the underlying messaging connection.
 */
contract ConnectorManager is IConnectorManager {
  uint32 public immutable domain;

  constructor(uint32 _domain) {
    require(_domain != 0, "!domain");
    domain = _domain;
  }

  function home() public view returns (IOutbox) {
    return IOutbox(address(this));
  }

  function isReplica(address _potentialReplica) public view returns (bool) {
    return _potentialReplica == address(this);
  }

  function localDomain() public view returns (uint32) {
    return domain;
  }
}
