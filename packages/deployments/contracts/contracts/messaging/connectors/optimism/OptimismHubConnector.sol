// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";
import {IOptimismPortal, ProvenWithdrawal} from "../../interfaces/ambs/optimism/IOptimismPortal.sol";
import {IL2OutputOracle} from "../../interfaces/ambs/optimism/IL2OutputOracle.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

import {PredeployAddresses} from "./lib/PredeployAddresses.sol";
import {Encoding} from "./lib/Encoding.sol";
import {Hashing} from "./lib/Hashing.sol";
import {Types} from "./lib/Types.sol";
import {SafeCall} from "./lib/SafeCall.sol";

import {BaseOptimism} from "./BaseOptimism.sol";

contract OptimismHubConnector is HubConnector, BaseOptimism {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Storage ============
  IOptimismPortal public immutable OPTIMISM_PORTAL;

  IL2OutputOracle public immutable L2_ORACLE;

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
    address _l2OutputOracle,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BaseOptimism(_gasCap) {
    OPTIMISM_PORTAL = IOptimismPortal(_optimismPortal);
    L2_ORACLE = IL2OutputOracle(_l2OutputOracle);
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
   * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L291
   */
  function processMessageFromRoot(Types.WithdrawalTransaction memory _tx) external {
    // verify the sender is the l2 contract
    require(_tx.sender == PredeployAddresses.L2_CROSS_DOMAIN_MESSENGER, "!l2sender");

    // verify the target is this contract
    require(_tx.target == address(this), "!this");

    require(_verifyXDomainMessage(_tx), "!proof");

    // Extract the argument from the data
    (
      uint256 _nonce,
      address _sender,
      address _target,
      uint256 _value,
      uint256 _minGasLimit,
      bytes memory _message
    ) = Encoding.decodeCrossDomainMessageV1(_tx.data);

    // ensure the l2 connector sent the message
    require(_sender == mirrorConnector, "!mirror connector");

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

  /**
   * Verifies that the given message is valid.
   * @param _tx The WithdrawalTransaction to verify.
   * @return bool Whether or not the provided message is valid.
   */
  function _verifyXDomainMessage(Types.WithdrawalTransaction memory _tx) internal view returns (bool) {
    // Get the proven withdrawal record from the OptimismOracle.
    bytes32 withdrawalHash = Hashing.hashWithdrawal(_tx);
    ProvenWithdrawal memory provenWithdrawal = OPTIMISM_PORTAL.provenWithdrawals(withdrawalHash);

    // Ensure withdrawal was proven.
    require(provenWithdrawal.timestamp != 0, "!proven");

    // Ensure this is a message that has happened after the fork.
    require(provenWithdrawal.timestamp >= L2_ORACLE.startingTimestamp(), "pre-bedrock");

    // Grab the OutputProposal from the L2OutputOracle, will revert if the output that
    // corresponds to the given index has not been proposed yet.
    Types.OutputProposal memory proposal = L2_ORACLE.getL2Output(provenWithdrawal.l2OutputIndex);

    // Check that the output root that was used to prove the withdrawal is the same as the
    // current output root for the given output index. An output root may change if it is
    // deleted by the challenger address and then re-proposed.
    require(proposal.outputRoot == provenWithdrawal.outputRoot, "!outputRoot");

    // Now the message is proven within the L2 root for bedrock. The merkle
    // proof of inclusion is completed via `OptimismPortal.prove`.
    return true;
  }
}
