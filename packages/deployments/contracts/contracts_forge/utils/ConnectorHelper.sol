// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "./ForgeHelper.sol";

// Holds shared config values
contract ConnectorHelper is ForgeHelper {
  // ======= Connector events =========

  event SenderAdded(address sender);
  event SenderRemoved(address sender);
  event AggregateRootUpdated(bytes32 current, bytes32 previous);
  event Dispatch(bytes32 leaf, uint256 index, bytes32 root, bytes message);
  event Process(bytes32 leaf, bool success, bytes returnData);
  event MessageSent(bytes data, address caller);
  event MessageProcessed(bytes data, address caller);
  event MirrorConnectorUpdated(address previous, address current);

  // ============ Storage ============

  uint32 _l1Domain = 1000;
  uint32 _l2Domain = 2000;

  address _amb = address(bytes20(keccak256("_amb")));
  address _rootManager = address(bytes20(keccak256("_rootManager")));
  address _owner = address(bytes20(keccak256("_owner")));
  uint256 _mirrorGas = 100_000;
  uint256 _processGas = 850_000;
  uint256 _reserveGas = 15_000;

  address _l1Connector;
  address _l2Connector;
}
