// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {LibArbitrumL1} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {IArbitrumInbox} from "../../interfaces/ambs/arbitrum/IArbitrumInbox.sol";
import {IArbitrumOutbox} from "../../interfaces/ambs/arbitrum/IArbitrumOutbox.sol";
import {IArbitrumRollup, Node} from "../../interfaces/ambs/arbitrum/IArbitrumRollup.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";

contract AdminHubConnector is ProposedOwnable, HubConnector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _rootManager
  ) ProposedOwnable() HubConnector(_domain, _mirrorDomain, address(0), _rootManager, address(0)) {
    _setOwner(msg.sender);
  }

  // ============ Admin fns ============
  function addSpokeRootToAggregate(bytes32 _data) external onlyOwner {
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, bytes32(_data));

    // Emit event
    emit MessageProcessed(abi.encode(_data), msg.sender);
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {}

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {}
}
