// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {TypedMemView} from "../../../shared/libraries/TypedMemView.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {OptimismAmb} from "../../interfaces/ambs/optimism/OptimismAmb.sol";
import {IOptimismPortal} from "../../interfaces/ambs/optimism/IOptimismPortal.sol";

import {HubConnector} from "../HubConnector.sol";
import {Connector} from "../Connector.sol";

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
  function _sendMessage(bytes memory _data, bytes memory) internal override {
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
    (, address _sender, address _target, , , bytes memory _message) = decodeCrossDomainMessageV1(_tx.data);

    // ensure the l2 connector sent the message
    require(_sender == mirrorConnector, "!mirror connector");
    require(_target == address(this), "!target");

    // get the data
    require(_message.length == 100, "!length");

    // NOTE: TypedMemView only loads 32-byte chunks onto stack, which is fine in this case
    bytes29 _view = _message.ref(0);
    bytes32 root = _view.index(_view.len() - 32, 32);

    require(!processed[root], "processed");
    // set root to processed
    processed[root] = true;

    // update the root on the root manager
    IRootManager(ROOT_MANAGER).aggregate(MIRROR_DOMAIN, root);
    emit MessageProcessed(_message, msg.sender);
  }

  /**
   * @notice Encodes a cross domain message based on the V1 (current) encoding.
   *
   * @param _encodedData cross domain message.
   * @return _nonce    Message nonce.
   * @return _sender   Address of the sender of the message.
   * @return _target   Address of the target of the message.
   * @return _value    ETH value to send to the target.
   * @return _gasLimit Gas limit to use for the message.
   * @return _data     Data to send with the message.
   *
   */
  function decodeCrossDomainMessageV1(
    bytes memory _encodedData
  )
    internal
    pure
    returns (uint256 _nonce, address _sender, address _target, uint256 _value, uint256 _gasLimit, bytes memory _data)
  {
    bytes4 selector = bytes4(0);
    assembly {
      selector := mload(add(_encodedData, 32))
    }

    // Make sure the function selector matches
    require(selector == bytes4(keccak256("relayMessage(uint256,address,address,uint256,uint256,bytes)")), "!selector");

    uint256 start = 4;
    uint256 len = _encodedData.length - start;
    bytes memory sliced = new bytes(len);

    assembly {
      // Get the memory pointer to the start of the original data
      let src := add(_encodedData, add(32, start))
      // Get the memory pointer to the start of the new sliced data
      let dest := add(sliced, 32)

      // Copy the data from src to dest
      for {
        let i := 0
      } lt(i, len) {
        i := add(i, 32)
      } {
        mstore(add(dest, i), mload(add(src, i)))
      }
    }

    // Extract the argument from the data
    (_nonce, _sender, _target, _value, _gasLimit, _data) = abi.decode(
      sliced,
      (uint256, address, address, uint256, uint256, bytes)
    );
  }
}
