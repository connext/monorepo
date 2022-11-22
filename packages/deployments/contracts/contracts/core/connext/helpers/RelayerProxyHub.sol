// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {IRootManager} from "../../../messaging/interfaces/IRootManager.sol";
import {RelayerProxy} from "./RelayerProxy.sol";

interface IHubConnector {
  // Polygon
  function receiveMessage(bytes memory inputData) external;

  // Optimism
  struct ChainBatchHeader {
    uint256 batchIndex;
    bytes32 batchRoot;
    uint256 batchSize;
    uint256 prevTotalElements;
    bytes extraData;
  }

  struct ChainInclusionProof {
    uint256 index;
    bytes32[] siblings;
  }

  struct L2MessageInclusionProof {
    bytes32 stateRoot;
    ChainBatchHeader stateRootBatchHeader;
    ChainInclusionProof stateRootProof;
    bytes stateTrieWitness;
    bytes storageTrieWitness;
  }

  function processMessageFromRoot(
    address _target,
    address _sender,
    bytes memory _message,
    uint256 _messageNonce,
    L2MessageInclusionProof memory _proof
  ) external;

  // Arbitrum
  struct L2Message {
    address l2Sender;
    address to;
    uint256 l2Block;
    uint256 l1Block;
    uint256 l2Timestamp;
    uint256 value;
    bytes callData;
  }

  function processMessageFromRoot(
    uint64 _nodeNum,
    bytes32 _sendRoot,
    bytes32 _blockHash,
    bytes32[] calldata _proof,
    uint256 _index,
    L2Message calldata _message
  ) external;
}

/**
 * @title RelayerProxyHub
 * @author Connext Labs, Inc.
 * @notice This is a temporary contract that wraps the Connext RootManager's propagate() function so that it can be called by
 * Gelato's legacy relayer network. The contract stores native assets and pays them to the relayer on function call.
 */
contract RelayerProxyHub is RelayerProxy {
  // ============ Properties ============

  IRootManager public rootManager;

  IHubConnector public hubConnector;

  // ============ Events ============
  event RootManagerChanged(address rootManager, address oldRootManager);

  event HubConnectorChanged(address hubConnector, address oldHubConnector);

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxyHub instance.
   * @param _connext The address of the Connext on this domain.
   * @param _spokeConnector The address of the SpokeConnector on this domain.
   * @param _gelatoRelayer The address of the Gelato relayer on this domain.
   * @param _feeCollector The address of the Gelato Fee Collector on this domain.
   * @param _rootManager The address of the Root Manager on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _rootManager,
    address _hubConnector
  ) RelayerProxy(_connext, _spokeConnector, _gelatoRelayer, _feeCollector) {
    _setRootManager(_rootManager);
    _setHubConnector(_hubConnector);
  }

  // ============ Admin Functions ============

  /**
   * @notice Updates the RootManager address.
   * @param _rootManager The address of the new RootManager on this domain.
   */
  function setRootManager(address _rootManager) external onlyOwner definedAddress(_rootManager) {
    _setRootManager(_rootManager);
  }

  function setHubConnector(address _hubConnector) external onlyOwner definedAddress(_hubConnector) {
    _setHubConnector(_hubConnector);
  }

  // ============ External Functions ============

  /**
   * @notice Wraps the call to propagate() on RootManager and pays either the caller or hardcoded relayer
   * from this contract's balance for completing the transaction.
   *
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _messageFees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   * @param _relayerFee Fee to be paid to relayer
   */
  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData,
    uint256 _relayerFee
  ) external {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _messageFees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.propagate{value: sum}(_connectors, _messageFees, _encodedData);
    emit FundsDeducted(sum, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  function receiveSpokeRoot(bytes memory _encodedData, uint256 _relayerFee) external onlyRelayer nonReentrant {
    if (block.chainid == 137 || block.chainid == 80001) {
      // hubConnector.receiveMessage(_encodedData);
    } else if (block.chainid == 10 || block.chainid == 420) {
      (
        address _target,
        address _sender,
        bytes memory _message,
        uint256 _messageNonce,
        IHubConnector.L2MessageInclusionProof memory _proof
      ) = abi.decode(_encodedData, (address, address, bytes, uint256, IHubConnector.L2MessageInclusionProof));
      hubConnector.processMessageFromRoot(_target, _sender, _message, _messageNonce, _proof);
    } else if (block.chainid == 42161 || block.chainid == 421613) {
      (
        uint64 _nodeNum,
        bytes32 _sendRoot,
        bytes32 _blockHash,
        bytes32[] memory _proof,
        uint256 _index,
        IHubConnector.L2Message memory _message
      ) = abi.decode(_encodedData, (uint64, bytes32, bytes32, bytes32[], uint256, IHubConnector.L2Message));
      hubConnector.processMessageFromRoot(_nodeNum, _sendRoot, _blockHash, _proof, _index, _message);
    } else {
      revert("Unsupported chain");
    }
    transferRelayerFee(_relayerFee);
  }

  // ============ Internal Functions ============
  function _setRootManager(address _rootManager) internal {
    emit RootManagerChanged(_rootManager, address(rootManager));
    rootManager = IRootManager(_rootManager);
  }

  function _setHubConnector(address _hubConnector) internal {
    emit HubConnectorChanged(_hubConnector, address(hubConnector));
    hubConnector = IHubConnector(_hubConnector);
  }
}
