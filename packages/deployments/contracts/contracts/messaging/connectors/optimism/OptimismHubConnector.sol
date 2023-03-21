// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";
import {IOptimismPortal} from "../../interfaces/ambs/optimism/IOptimismPortal.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

import {Encoding} from "./lib/Encoding.sol";
import {Types} from "./lib/Types.sol";

import {BaseOptimism} from "./BaseOptimism.sol";

contract OptimismHubConnector is HubConnector, BaseOptimism {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Storage ============
  IOptimismPortal public immutable OPTIMISM_PORTAL;

  // NOTE: This is needed because we need to track the roots we've
  // already sent across chains. When sending an optimism message, we send calldata
  // for Connector.processMessage. At any point these messages could be processed
  // before the timeout using `processFromRoot` or after the timeout using `process`
  // we track the roots sent here to ensure we process each root once
  mapping(bytes32 => bool) public processed;

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _optimismPortal,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BaseOptimism(_gasCap) {
    OPTIMISM_PORTAL = IOptimismPortal(_optimismPortal);
  }

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Dispatch message
    OptimismAmb(AMB).sendMessage(mirrorConnector, _calldata, uint32(gasCap));
  }

  /**
   * @dev modified from: OptimismPortal contract
   * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L208
   */
  function processMessageFromRoot(
    Types.WithdrawalTransaction memory _tx,
    uint256 _l2OutputIndex,
    Types.OutputRootProof calldata _outputRootProof,
    bytes[] calldata _withdrawalProof
  ) external {
    OPTIMISM_PORTAL.proveWithdrawalTransaction(_tx, _l2OutputIndex, _outputRootProof, _withdrawalProof);

    // Extract the argument from the data
    // uint256 _nonce,
    // address _sender,
    // address _target,
    // uint256 _value,
    // uint256 _minGasLimit,
    // bytes memory _message
    (, address _sender, address _target, , , bytes memory _message) = Encoding.decodeCrossDomainMessageV1(_tx.data);

    // ensure the l2 connector sent the message
    require(_sender == mirrorConnector, "!mirror connector");
    require(_target == address(this), "!target");

    // get the data (should be the outbound root)
    require(_message.length == 36, "!length");

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes29 _view = _message.ref(0);
    bytes32 root = _view.index(_view.len() - 32, 32);

    require(!processed[root], "processed");
    // set root to processed
    processed[root] = true;

    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);
  }
}
