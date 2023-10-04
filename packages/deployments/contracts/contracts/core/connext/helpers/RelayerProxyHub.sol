// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {RelayerProxy} from "./RelayerProxy.sol";

interface IRootManager {
  function lastPropagatedRoot() external view returns (bytes32);

  function propagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData
  ) external payable;

  function dequeue() external returns (bytes32, uint256);
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
  struct OutputRootProof {
    bytes32 version;
    bytes32 stateRoot;
    bytes32 messagePasserStorageRoot;
    bytes32 latestBlockhash;
  }

  struct WithdrawalTransaction {
    uint256 nonce;
    address sender;
    address target;
    uint256 value;
    uint256 gasLimit;
    bytes data;
  }

  struct OptimismRootMessageData {
    WithdrawalTransaction _tx;
    uint256 _l2OutputIndex;
    OutputRootProof _outputRootProof;
    bytes[] _withdrawalProof;
  }

  /**
   * @dev modified from: OptimismPortal contract
   * https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L208
   */
  function processMessageFromRoot(
    WithdrawalTransaction memory _tx,
    uint256 _l2OutputIndex,
    OutputRootProof calldata _outputRootProof,
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
  // ============ Properties ============

  IRootManager public rootManager;
  uint256 public propagateCooldown;
  // Timestamp of the last time the job was worked.
  uint256 public lastPropagateAt;
  mapping(uint32 => mapping(bytes32 => bool)) public processedRootMessages;
  mapping(uint32 => address) public hubConnectors;

  // ============ Events ============
  event RootManagerChanged(address rootManager, address oldRootManager);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  // ============ Errors ============
  error RelayerProxyHub__propagateCooledDown_notCooledDown(uint256 timestamp, uint256 nextWorkable);
  error RelayerProxyHub__processFromRoot_alreadyProcessed(uint32 chain, bytes32 l2Hash);
  error RelayerProxyHub__processFromRoot_noHubConnector(uint32 chain);

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
    address _keep3r,
    address _autonolas,
    uint8 _autonolasPriority,
    uint256 _propagateCooldown,
    address[] memory _hubConnectors,
    uint32[] memory _hubConnectorChains
  ) RelayerProxy(_connext, _spokeConnector, _gelatoRelayer, _feeCollector, _keep3r, _autonolas, _autonolasPriority) {
    _setRootManager(_rootManager);
    _setPropagateCooldown(_propagateCooldown);
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
  function propagateWorkable() public returns (bool) {
    (bytes32 _aggregateRoot, ) = rootManager.dequeue();
    return (rootManager.lastPropagatedRoot() != _aggregateRoot) && _propagateCooledDown();
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
  ) external isWorkableBySender(msg.sender) validateAndPayWithCredits(msg.sender) nonReentrant {
    if (!_propagateCooledDown()) {
      revert RelayerProxyHub__propagateCooledDown_notCooledDown(block.timestamp, lastPropagateAt + propagateCooldown);
    }
    _propagate(_connectors, _messageFees, _encodedData);
    lastPropagateAt = block.timestamp;
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
  ) external isWorkableBySender(msg.sender) validateAndPayWithCredits(msg.sender) {
    _processFromRoot(_encodedData, _fromChain, _l2Hash);
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

  function _setHubConnector(address _hubConnector, uint32 chain) internal {
    emit HubConnectorChanged(_hubConnector, hubConnectors[chain], chain);
    hubConnectors[chain] = _hubConnector;
  }

  function _propagateCooledDown() internal view returns (bool) {
    return block.timestamp > (lastPropagateAt + propagateCooldown);
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

    if (fromChain == 100 || fromChain == 10200) {
      IGnosisHubConnector.GnosisRootMessageData memory data = abi.decode(
        encodedData,
        (IGnosisHubConnector.GnosisRootMessageData)
      );
      IGnosisHubConnector(hubConnectors[fromChain]).executeSignatures(data._data, data._signatures);
    }

    if (fromChain == 42161 || fromChain == 421613) {
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
    }

    if (fromChain == 10 || fromChain == 420) {
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
    }

    if (fromChain == 324 || fromChain == 280) {
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
    }

    if (fromChain == 137 || fromChain == 80001) {
      IPolygonHubConnector(hubConnectors[fromChain]).receiveMessage(encodedData);
    }
  }
}
