// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";
import {IStateCommitmentChain, L2MessageInclusionProof} from "../../interfaces/ambs/optimism-v0/IStateCommitmentChain.sol";

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

import {PredeployAddresses} from "./lib/PredeployAddresses.sol";
import {OVMCodec} from "./lib/OVMCodec.sol";
import {SecureMerkleTrie} from "./lib/SecureMerkleTrie.sol";

import {BaseOptimismV0} from "./BaseOptimismV0.sol";

/**
 * @title OptimismV0HubConnector
 * @notice This is the hub connector that should be deployed on L1 for optimism forked network.
 * @dev OptimismV0 uses a pre-bedrock version of the optimism contracts.
 */
contract OptimismV0HubConnector is HubConnector, BaseOptimismV0 {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  // ============ Storage ============
  IStateCommitmentChain public immutable stateCommitmentChain;

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
    address _stateCommitmentChain,
    uint256 _gasCap
  ) HubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) BaseOptimismV0(_gasCap) {
    stateCommitmentChain = IStateCommitmentChain(_stateCommitmentChain);
  }

  // ============ Override Fns ============
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected);
  }

  /**
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendMessage(bytes memory _data, bytes memory) internal override {
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
    L2MessageInclusionProof memory _proof
  ) external {
    // verify the sender is the l2 contract
    require(_sender == mirrorConnector, "!mirrorConnector");

    // verify the target is this contract
    require(_target == address(this), "!this");

    // Get the encoded data
    bytes memory xDomainData = _encodeXDomainCalldata(_target, _sender, _message, _messageNonce);

    require(_verifyXDomainMessage(xDomainData, _proof), "!proof");

    // get the data
    require(_message.length == 32, "!length");
    bytes32 root = bytes32(_message);

    require(!processed[root], "processed");
    // set root to processed
    processed[root] = true;

    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);
    emit MessageProcessed(_message, msg.sender);
  }

  /**
   * Verifies that the given message is valid.
   * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/9973c1da3211e094a180a8a96ba9f8bb1ab1b389/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L283-L288
   * @param _xDomainCalldata Calldata to verify.
   * @param _proof Inclusion proof for the message.
   * @return Whether or not the provided message is valid.
   */
  function _verifyXDomainMessage(
    bytes memory _xDomainCalldata,
    L2MessageInclusionProof memory _proof
  ) internal view returns (bool) {
    return (_verifyStateRootProof(_proof) && _verifyStorageProof(_xDomainCalldata, _proof));
  }

  /**
   * Verifies that the state root within an inclusion proof is valid.
   * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/9973c1da3211e094a180a8a96ba9f8bb1ab1b389/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L295-L311
   * @param _proof Message inclusion proof.
   * @return Whether or not the provided proof is valid.
   */
  function _verifyStateRootProof(L2MessageInclusionProof memory _proof) internal view returns (bool) {
    return
      stateCommitmentChain.verifyStateCommitment(_proof.stateRoot, _proof.stateRootBatchHeader, _proof.stateRootProof);
  }

  /**
   * Verifies that the storage proof within an inclusion proof is valid.
   * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/9973c1da3211e094a180a8a96ba9f8bb1ab1b389/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L313-L357
   * @param _xDomainCalldata Encoded message calldata.
   * @param _proof Message inclusion proof.
   * @return Whether or not the provided proof is valid.
   */
  function _verifyStorageProof(
    bytes memory _xDomainCalldata,
    L2MessageInclusionProof memory _proof
  ) internal pure returns (bool) {
    bytes32 storageKey = keccak256(
      abi.encodePacked(
        keccak256(abi.encodePacked(_xDomainCalldata, PredeployAddresses.L2_CROSS_DOMAIN_MESSENGER)),
        uint256(0)
      )
    );

    (bool exists, bytes memory encodedMessagePassingAccount) = SecureMerkleTrie.get(
      abi.encodePacked(PredeployAddresses.L2_TO_L1_MESSAGE_PASSER),
      _proof.stateTrieWitness,
      _proof.stateRoot
    );

    require(exists == true, "Message passing predeploy has not been initialized or invalid proof provided.");

    OVMCodec.EVMAccount memory account = OVMCodec.decodeEVMAccount(encodedMessagePassingAccount);

    return
      SecureMerkleTrie.verifyInclusionProof(
        abi.encodePacked(storageKey),
        abi.encodePacked(uint8(1)),
        _proof.storageTrieWitness,
        account.storageRoot
      );
  }

  /**
   * Generates the correct cross domain calldata for a message.
   * @dev taken from: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/Lib_CrossDomainUtils.sol
   * @param _target Target contract address.
   * @param _sender Message sender address.
   * @param _message Message to send to the target.
   * @param _messageNonce Nonce for the provided message.
   * @return ABI encoded cross domain calldata.
   */
  function _encodeXDomainCalldata(
    address _target,
    address _sender,
    bytes memory _message,
    uint256 _messageNonce
  ) internal pure returns (bytes memory) {
    return
      abi.encodeWithSignature("relayMessage(address,address,bytes,uint256)", _target, _sender, _message, _messageNonce);
  }
}
