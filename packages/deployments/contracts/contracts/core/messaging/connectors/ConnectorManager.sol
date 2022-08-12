// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "./Connector.sol";

/**
 * @notice This is an interface to allow the `Messaging` contract to be used
 * as a `XappConnectionManager` on all router contracts.
 *
 * Each nomad router contract has a `XappConnectionClient`, which references a
 * XappConnectionManager to get the `Home` and approved `Replica` instances. At
 * any point the client can replace the manager it's pointing to, thereby changing
 * the underlying messaging connection.
 */
contract ConnectorManager {
  uint32 public immutable domain;

  constructor(uint32 _domain) {
    require(_domain != 0, "!domain");
    domain = _domain;
  }

  function home() public view returns (Connector) {
    return Connector(address(this));
  }

  function isReplica(address _potentialReplica) public view returns (bool) {
    return _potentialReplica == address(this);
  }

  function localDomain() public view returns (uint32) {
    return domain;
  }
}
