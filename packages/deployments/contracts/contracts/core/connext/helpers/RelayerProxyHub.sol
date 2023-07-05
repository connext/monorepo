// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ChainIDs} from "../libraries/ChainIDs.sol";
import {Types} from "../../../messaging/connectors/optimism/lib/Types.sol";
import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {RootManager} from "../../../messaging/RootManager.sol";

import {RelayerProxy} from "./RelayerProxy.sol";

interface IRootManager {
  function lastPropagatedRoot(uint32 _domain) external view returns (bytes32);

  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) external payable;

  function dequeue() external returns (bytes32, uint256);

  function proposeAggregateRoot(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes32[] calldata _snapshotsRoots,
    uint32[] calldata _domains
  ) external;

  function allowlistedProposers(address _proposer) external view returns (bool);

  function finalizeAndPropagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData,
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) external payable;
}

interface IGnosisHubConnector {
  struct GnosisRootMessageData {
    bytes _data;
    bytes _signatures;
  }

  function executeSignatures(bytes memory _data, bytes memory _signatures) external;
}

interface IArbitrumHubConnector {
  struct L2Message {
    address l2Sender;
    address to;
    uint256 l2Block;
    uint256 l1Block;
    uint256 l2Timestamp;
    uint256 value;
    bytes callData;
  }

  struct ArbitrumRootMessageData {
    uint64 _nodeNum;
    bytes32 _sendRoot;
    bytes32 _blockHash;
    bytes32[] _proof;
    uint256 _index;
    L2Message _message;
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

interface IOptimismHubConnector {
  struct OptimismRootMessageData {
    Types.WithdrawalTransaction _tx;
    uint256 _l2OutputIndex;
    Types.OutputRootProof _outputRootProof;
    bytes[] _withdrawalProof;
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
  ) external;
}

interface IPolygonHubConnector {
  function receiveMessage(bytes memory inputData) external;
}

interface IZkSyncHubConnector {
  struct ZkSyncRootMessageData {
    uint32 _l2BlockNumber;
    uint256 _l2MessageIndex;
    uint16 _l2TxNumberInBlock;
    bytes _message;
    bytes32[] _proof;
  }

  function processMessageFromRoot(
    // zkSync block number in which the message was sent
    uint32 _l2BlockNumber,
    // Message index, that can be received via API
    uint256 _l2MessageIndex,
    // The L2 transaction number in a block, in which the log was sent
    uint16 _l2TxNumberInBlock,
    // The message that was sent from l2
    bytes calldata _message,
    // Merkle proof for the message
    bytes32[] calldata _proof
  ) external;
}

/**
 * @title RelayerProxyHub
 * @author Connext Labs, Inc.
 * @notice This is a temporary contract that wraps the Connext RootManager's propagate() function so that it can be called by
 * Gelato's legacy relayer network. The contract stores native assets and pays them to the relayer on function call.
 */
contract RelayerProxyHub is RelayerProxy {
  using ECDSA for bytes32;
  // ============ Properties ============

  /**
   * @notice Address of the RootManager contract
   */
  IRootManager public rootManager;

  /**
   * @notice Delay for the propagate function
   */
  uint256 public propagateCooldown;

  /**
   * @notice Delay for the proposeAggregateRoot function
   * @dev Can be updated by admin
   */
  uint256 public proposeAggregateRootCooldown;

  /**
   * @notice Timestamp of the last time the propagate job was worked.
   */
  uint256 public lastPropagateAt;

  /**
   * @notice Timestamp of when last aggregate was proposed
   */
  uint256 public lastProposeAggregateRootAt;

  /**
   * @notice Mapping of identifier to root message hash to boolean indicating if the message has been processed
   */
  mapping(uint32 => mapping(bytes32 => bool)) public processedRootMessages;

  /**
   * @notice Mapping of identifier to hub connector contract address
   */
  mapping(uint32 => address) public hubConnectors;

  // ============ Events ============

  /**
   * @notice Emitted when the root manager is updated by admin
   * @param rootManager New root manager address in the contract
   * @param oldRootManager Old root manager address in the contract
   */
  event RootManagerChanged(address rootManager, address oldRootManager);

  /**
   * @notice Emitted when the cooldown period for propagate is updated
   * @param propagateCooldown New cooldown period
   * @param oldPropagateCooldown Old cooldown period
   */
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);

  /**
   * @notice Emitted when the cooldown period for proposeAggregateRoot is updated
   * @param proposeAggregateRootCooldown New cooldown period
   * @param oldProposeAggregateRootCooldown Old cooldown period
   */
  event ProposeAggregateRootCooldownChanged(
    uint256 proposeAggregateRootCooldown,
    uint256 oldProposeAggregateRootCooldown
  );

  /**
   * @notice Emitted when a new hub connector is updated
   * @param hubConnector New hub connector address
   * @param oldHubConnector Old hub connector address
   * @param chain Chain ID of the hub connector
   */
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  // ============ Errors ============
  error RelayerProxyHub__propagateCooledDown_notCooledDown(uint256 timestamp, uint256 nextWorkable);
  error RelayerProxyHub__finalizeAndPropagateCooledDown_notCooledDown(uint256 timestamp, uint256 nextWorkable);
  error RelayerProxyHub__proposeAggregateRootCooledDown_notCooledDown(uint256 timestamp, uint256 nextWorkable);
  error RelayerProxyHub__validateProposeSignature_notProposer(address proposer);
  error RelayerProxyHub__processFromRoot_alreadyProcessed(uint32 chain, bytes32 l2Hash);
  error RelayerProxyHub__processFromRoot_noHubConnector(uint32 chain);
  error RelayerProxyHub__processFromRoot_unsupportedChain(uint32 chain);

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxyHub instance.
   * @param _connext The address of the Connext on this domain.
   * @param _spokeConnector The address of the SpokeConnector on this domain.
   * @param _gelatoRelayer The address of the Gelato relayer on this domain.
   * @param _feeCollector The address of the Gelato Fee Collector on this domain.
   * @param _keep3r The address of the Keep3r on this domain.
   * @param _rootManager The address of the Root Manager on this domain.
   * @param _propagateCooldown The delay for the propagate function.
   * @param _hubConnectors The addresses of the hub connectors on this domain.
   * @param _hubConnectorChains The identifiers of the hub connectors on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector,
    address _keep3r,
    address _rootManager,
    uint256 _propagateCooldown,
    uint256 _proposeAggregateRootCooldown,
    address[] memory _hubConnectors,
    uint32[] memory _hubConnectorChains
  ) RelayerProxy(_connext, _spokeConnector, _gelatoRelayer, _feeCollector, _keep3r) {
    _setRootManager(_rootManager);
    _setPropagateCooldown(_propagateCooldown);
    _setProposeAggregateRootCooldown(_proposeAggregateRootCooldown);
    for (uint256 i = 0; i < _hubConnectors.length; i++) {
      _setHubConnector(_hubConnectors[i], _hubConnectorChains[i]);
    }
  }

  // ============ Admin Functions ============

  /**
   * @notice Updates the RootManager address.
   * @param _rootManager The address of the new RootManager on this domain.
   */
  function setRootManager(address _rootManager) external onlyOwner definedAddress(_rootManager) {
    _setRootManager(_rootManager);
  }

  /**
   * @notice Updates the propagate cooldown.
   * @param _propagateCooldown The new cooldown in seconds.
   */
  function setPropagateCooldown(uint256 _propagateCooldown) external onlyOwner {
    _setPropagateCooldown(_propagateCooldown);
  }

  /**
   * @notice Updates the HubConnector address.
   * @param _hubConnector The address of the new HubConnector on this domain.
   */
  function setHubConnector(address _hubConnector, uint32 _chain) external onlyOwner definedAddress(_hubConnector) {
    _setHubConnector(_hubConnector, _chain);
  }

  // ============ External Functions ============

  /**
   * @notice Checks if the RootManager has a workable root. Calls the rootManager's dequeue() function to check if the
   * RootManager has a sendable root. This is an expensive function so it should only be called off-chain to determine
   * if the relayer should call the propagate() function.
   *
   * @return True if the RootManager has a workable root.
   */
  function propagateWorkable(uint32[] memory domains) public returns (bool) {
    (bytes32 _aggregateRoot, ) = rootManager.dequeue();
    bool updatedRoot = false;
    for (uint256 i; i < domains.length; i++) {
      updatedRoot = rootManager.lastPropagatedRoot(domains[i]) != _aggregateRoot;
      if (updatedRoot) {
        break;
      }
    }
    return updatedRoot && _propagateCooledDown();
  }

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
  ) external onlyRelayer nonReentrant {
    uint256 sum = _propagate(_connectors, _messageFees, _encodedData);
    emit FundsDeducted(sum, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  /**
   * @notice Wraps the call to propagate() on RootManager and pays with Keep3r credits. Only allowed to be called
   * by registered Keep3r.
   *
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * used here to reduce gas costs, and keep them static regardless of number of supported domains.
   * @param _messageFees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   */
  function propagateKeep3r(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData
  ) external validateAndPayWithCredits(msg.sender) nonReentrant {
    if (!_propagateCooledDown()) {
      revert RelayerProxyHub__propagateCooledDown_notCooledDown(block.timestamp, lastPropagateAt + propagateCooldown);
    }
    _propagate(_connectors, _messageFees, _encodedData);
    lastPropagateAt = block.timestamp;
  }

  /**
   * Wraps the call to processFromRoot() on RootManager. Only allowed to be called by registered relayer.
   *
   * @param _encodedData Array of encoded data for HubConnector function.
   * @param _fromChain Chain ID of the chain the message is coming from.
   * @param _l2Hash Hash of the message on the L2 chain.
   */
  function processFromRoot(
    bytes calldata _encodedData,
    uint32 _fromChain,
    bytes32 _l2Hash
  ) external onlyRelayer nonReentrant {
    _processFromRoot(_encodedData, _fromChain, _l2Hash);
  }

  /**
   * Wraps the call to processFromRoot() on RootManager and pays with Keep3r credits. Only allowed to be called
   * by registered Keep3r.
   *
   * @param _encodedData Array of encoded data for HubConnector function.
   * @param _fromChain Chain ID of the chain the message is coming from.
   * @param _l2Hash Hash of the message on the L2 chain.
   */
  function processFromRootKeep3r(
    bytes calldata _encodedData,
    uint32 _fromChain,
    bytes32 _l2Hash
  ) external validateAndPayWithCredits(msg.sender) {
    _processFromRoot(_encodedData, _fromChain, _l2Hash);
  }

  /**
   * @notice Wraps the `proposeAggregateRoot` function
   * @dev This contract will validate the signer is a whitelisted proposer on the RootManager,
   * and then call `propose` itself. This means this contract must *also* be whitelisted as a
   * proposer on the RootManager.
   * @param _snapshotId The snapshot id of the root to be proposed.
   * @param _aggregateRoot The aggregate root to be proposed.
   * @param _snapshotsRoots The roots of the connectors included in the aggregate.
   * @param _domains The domains of the snapshots to be proposed.
   */
  function proposeAggregateRootKeep3r(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes32[] calldata _snapshotsRoots,
    uint32[] calldata _domains,
    bytes memory _signature
  ) external validateAndPayWithCredits(msg.sender) {
    if (!_proposeAggregateRootCooledDown()) {
      revert RelayerProxyHub__proposeAggregateRootCooledDown_notCooledDown(
        block.timestamp,
        lastProposeAggregateRootAt + proposeAggregateRootCooldown
      );
    }

    lastProposeAggregateRootAt = block.timestamp;

    // Validate the signer
    _validateProposeSignature(_snapshotId, _aggregateRoot, _signature);

    // Propose the aggregate
    rootManager.proposeAggregateRoot(_snapshotId, _aggregateRoot, _snapshotsRoots, _domains);

    lastProposeAggregateRootAt = block.timestamp;
  }

  /**
   * @notice Wraps the `finalizeAndPropagate` function
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * @param _fees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   * @param _proposedAggregateRoot The aggregate root to be proposed.
   * @param _endOfDispute The timestamp when the dispute period ends.
   */
  function finalizeAndPropagateKeep3r(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData,
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) external validateAndPayWithCredits(msg.sender) nonReentrant returns (uint256 _fee) {
    if (!_propagateCooledDown()) {
      revert RelayerProxyHub__propagateCooledDown_notCooledDown(block.timestamp, lastPropagateAt + propagateCooldown);
    }
    _fee = _finalizeAndPropagate(_connectors, _fees, _encodedData, _proposedAggregateRoot, _endOfDispute);
    lastPropagateAt = block.timestamp;
  }

  // ============ Internal Functions ============
  function _setRootManager(address _rootManager) internal {
    emit RootManagerChanged(_rootManager, address(rootManager));
    rootManager = IRootManager(_rootManager);
  }

  function _setPropagateCooldown(uint256 _propagateCooldown) internal {
    emit PropagateCooldownChanged(_propagateCooldown, propagateCooldown);
    propagateCooldown = _propagateCooldown;
  }

  function _setProposeAggregateRootCooldown(uint256 _proposeAggregateRootCooldown) internal {
    emit ProposeAggregateRootCooldownChanged(_proposeAggregateRootCooldown, proposeAggregateRootCooldown);
    proposeAggregateRootCooldown = _proposeAggregateRootCooldown;
  }

  function _setHubConnector(address _hubConnector, uint32 chain) internal {
    emit HubConnectorChanged(_hubConnector, hubConnectors[chain], chain);
    hubConnectors[chain] = _hubConnector;
  }

  function _propagateCooledDown() internal view returns (bool) {
    return block.timestamp > (lastPropagateAt + propagateCooldown);
  }

  function _proposeAggregateRootCooledDown() internal view returns (bool) {
    return block.timestamp > (lastProposeAggregateRootAt + proposeAggregateRootCooldown);
  }

  function _validateProposeSignature(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes memory _signature
  ) internal view {
    // Get the payload
    bytes32 payload = keccak256(abi.encodePacked(_snapshotId, _aggregateRoot));
    // Recover signer
    address signer = payload.toEthSignedMessageHash().recover(_signature);
    if (!rootManager.allowlistedProposers(signer)) {
      revert RelayerProxyHub__validateProposeSignature_notProposer(signer);
    }
  }

  /**
   * @notice Calls propagate function on RootManager.
   */
  function _propagate(
    address[] calldata _connectors,
    uint256[] calldata _messageFees,
    bytes[] memory _encodedData
  ) internal returns (uint256) {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _messageFees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.propagate{value: sum}(_connectors, _messageFees, _encodedData);
    return sum;
  }

  function _finalizeAndPropagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData,
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) internal returns (uint256) {
    uint256 sum = 0;
    uint256 length = _connectors.length;
    for (uint32 i; i < length; ) {
      sum += _fees[i];
      unchecked {
        ++i;
      }
    }

    rootManager.finalizeAndPropagate{value: sum}(
      _connectors,
      _fees,
      _encodedData,
      _proposedAggregateRoot,
      _endOfDispute
    );
    return sum;
  }

  /**
   * @notice Calls processFromRoot function on RootManager.
   * Decodes the encodedData and calls the appropriate HubConnector function.
   */
  function _processFromRoot(bytes calldata encodedData, uint32 fromChain, bytes32 l2Hash) internal {
    if (processedRootMessages[fromChain][l2Hash]) {
      revert RelayerProxyHub__processFromRoot_alreadyProcessed(fromChain, l2Hash);
    }
    if (hubConnectors[fromChain] == address(0)) {
      revert RelayerProxyHub__processFromRoot_noHubConnector(fromChain);
    }

    processedRootMessages[fromChain][l2Hash] = true;

    if (fromChain == ChainIDs.GNOSIS || fromChain == ChainIDs.GNOSIS_CHIADO) {
      IGnosisHubConnector.GnosisRootMessageData memory data = abi.decode(
        encodedData,
        (IGnosisHubConnector.GnosisRootMessageData)
      );
      IGnosisHubConnector(hubConnectors[fromChain]).executeSignatures(data._data, data._signatures);
    } else if (fromChain == ChainIDs.ARBITRUM_ONE || fromChain == ChainIDs.ARBITRUM_GOERLI) {
      IArbitrumHubConnector.ArbitrumRootMessageData memory data = abi.decode(
        encodedData,
        (IArbitrumHubConnector.ArbitrumRootMessageData)
      );
      IArbitrumHubConnector(hubConnectors[fromChain]).processMessageFromRoot(
        data._nodeNum,
        data._sendRoot,
        data._blockHash,
        data._proof,
        data._index,
        data._message
      );
    } else if (fromChain == ChainIDs.OPTIMISM || fromChain == ChainIDs.OPTIMISM_GOERLI) {
      IOptimismHubConnector.OptimismRootMessageData memory data = abi.decode(
        encodedData,
        (IOptimismHubConnector.OptimismRootMessageData)
      );
      IOptimismHubConnector(hubConnectors[fromChain]).processMessageFromRoot(
        data._tx,
        data._l2OutputIndex,
        data._outputRootProof,
        data._withdrawalProof
      );
    } else if (fromChain == ChainIDs.ZKSYNC || fromChain == ChainIDs.ZKSYNC_TEST) {
      IZkSyncHubConnector.ZkSyncRootMessageData memory data = abi.decode(
        encodedData,
        (IZkSyncHubConnector.ZkSyncRootMessageData)
      );
      IZkSyncHubConnector(hubConnectors[fromChain]).processMessageFromRoot(
        data._l2BlockNumber,
        data._l2MessageIndex,
        data._l2TxNumberInBlock,
        data._message,
        data._proof
      );
    } else if (fromChain == ChainIDs.POLYGON_POS || fromChain == ChainIDs.MUMBAI) {
      IPolygonHubConnector(hubConnectors[fromChain]).receiveMessage(encodedData);
    } else {
      revert RelayerProxyHub__processFromRoot_unsupportedChain(fromChain);
    }
  }
}
