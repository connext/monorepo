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
import {OVMCodec} from "./lib/OVMCodec.sol";
import {SecureMerkleTrie} from "./lib/SecureMerkleTrie.sol";
import {Hashing} from "./lib/Hashing.sol";
import {Types} from "./lib/Types.sol";

import {BaseOptimism} from "./BaseOptimism.sol";

contract OptimismHubConnector is HubConnector, BaseOptimism {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Storage ============
  // IStateCommitmentChain public immutable stateCommitmentChain;
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
    uint256 _gasCap,
    address _optimismPortal,
    address _l2OutputOracle
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

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the
  // `processMessageFromRoot` flow.

  /**
   * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/9973c1da3211e094a180a8a96ba9f8bb1ab1b389/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L165
   */
  function processMessageFromRoot(
    address _target,
    address _sender,
    bytes memory _message,
    uint256 _messageNonce,
    Types.WithdrawalTransaction memory _tx
  ) external {
    // verify the sender is the l2 contract
    require(_sender == mirrorConnector, "!mirrorConnector");

    // verify the target is this contract
    require(_target == address(this), "!this");

    require(_verifyXDomainMessage(_tx), "!proof");

    // NOTE: optimism seems to pad the calldata sent in to include more than the expected
    // 36 bytes, i.e. in this transaction:
    // https://blockscout.com/optimism/goerli/tx/0x440fda036d28eb547394a8689af90c5342a00a8ca2ab5117f2b85f54d1416ddd/logs
    // the corresponding _message is:
    // 0x4ff746f60000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002027ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757
    //
    // this means the length check and byte parsing used in the `ArbitrumHubConnector` would
    // not work here. Instead, take the back 32 bytes of the string

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes29 _view = _message.ref(0);
    bytes32 root = _view.index(_view.len() - 32, 32);

    if (!processed[root]) {
      // set root to processed
      processed[root] = true;
      // update the root on the root manager
      IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);

      emit MessageProcessed(abi.encode(root), msg.sender);
    } // otherwise root was already sent to root manager
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
