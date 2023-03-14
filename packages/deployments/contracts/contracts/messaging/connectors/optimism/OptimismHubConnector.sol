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
   * @dev L2 connector calls this function to pass down latest outbound root
   */
  function _processMessage(bytes memory _data) internal override {
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!l2Connector");

    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");

    bytes32 root = bytes32(_data);
    require(!processed[root], "processed");
    // set root to processed
    processed[root] = true;

    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);
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

    // Trigger the call to the target contract. We use a custom low level method
    // SafeCall.callWithMinGas to ensure two key properties
    //   1. Target contracts cannot force this call to run out of gas by returning a very large
    //      amount of data (and this is OK because we don't care about the returndata here).
    //   2. The amount of gas provided to the call to the target contract is at least the gas
    //      limit specified by the user. If there is not enough gas in the callframe to
    //      accomplish this, `callWithMinGas` will revert.
    // Additionally, if there is not enough gas remaining to complete the execution after the
    // call returns, this function will revert.
    bool success = SafeCall.callWithMinGas(_tx.target, _tx.gasLimit, _tx.value, _tx.data);

    // Reverting here is useful for determining the exact gas cost to successfully execute the
    // sub call to the target contract if the minimum gas limit specified by the user would not
    // be sufficient to execute the sub call.
    // address internal constant ESTIMATION_ADDRESS = address(1);
    if (success == false && tx.origin == address(1)) {
      revert("OptimismPortal: withdrawal failed");
    }
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
