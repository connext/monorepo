// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IResolver} from "../interfaces/IResolver.sol";
import {IConnector} from "../interfaces/IConnector.sol";
import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";

contract SendOutboundRootResolver is IResolver, ProposedOwnable {
  IConnector public immutable CONNECTOR;
  uint256 public EXECUTION_INTERVAL;
  uint256 public lastExecuted;
  bytes32 public lastRootSent;

  constructor(address _connector, uint256 _executionInterval) ProposedOwnable() {
    require(_executionInterval > 0, "SendOutboundRootResolver: execution interval must be > 0");
    _setOwner(msg.sender);
    CONNECTOR = IConnector(_connector);
    EXECUTION_INTERVAL = _executionInterval;
  }

  function changeExecutionInterval(uint256 _executionInterval) public onlyOwner {
    require(_executionInterval > 0, "SendOutboundRootResolver: execution interval must be > 0");
    EXECUTION_INTERVAL = _executionInterval;
  }

  function sendMessage(bytes32 outboundRoot) external {
    CONNECTOR.sendMessage(abi.encode(outboundRoot));
    lastExecuted = block.timestamp;
    lastRootSent = outboundRoot;
  }

  function checker() external view override returns (bool canExec, bytes memory execPayload) {
    bytes32 outboundRoot = CONNECTOR.outboundRoot();
    if ((lastExecuted + EXECUTION_INTERVAL) > block.timestamp) {
      return (false, bytes("EXECUTION_INTERVAL seconds are not passed yet"));
    } else if (lastRootSent == outboundRoot) {
      return (false, bytes("Sent root is the same as the current root"));
    } else {
      execPayload = abi.encodeWithSelector(this.sendMessage.selector, outboundRoot);
      return (true, execPayload);
    }
  }
}
