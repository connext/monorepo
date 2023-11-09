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

  function finalize(bytes32 _proposedAggregateRoot, uint256 _endOfDispute) external payable;

  function sendRootToHubSpoke() external;
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
   * @notice Timestamp of the last time the propagate job was worked.
   */
  uint256 public lastPropagateAt;

  /**
   * @notice Delay for the finalize function
   */
  uint256 public finalizeCooldown;

  /**
   * @notice Timestamp of the last time the finalize job was worked.
   */
  uint256 public lastFinalizeAt;

  /**
   * @notice Address of Autonolas keeper contract
   * @dev Special consideration for Autonolas keeper
   */
  address public autonolas;

  /**
   * @notice Enum of Autonolas functions with different priorities
   */
  enum AutonolasPriorityFunction {
    Propagate,
    ProcessFromRoot,
    ProposeAggregateRoot,
    FinalizeAndPropagate
  }

  /**
   * @notice Mapping of Autonolas priority function to priority number
   * @dev number between 0 and 10 to determine priority that Autonolas has for jobs.
   * 0 is disabled, 10 will work for every block.
   */
  mapping(AutonolasPriorityFunction => uint8) public autonolasPriority;

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
   * @notice Emitted when the cooldown period for finalize is updated
   * @param finalizeCooldown New cooldown period
   * @param oldFinalizeCooldown Old cooldown period
   */
  event FinalizeCooldownChanged(uint256 finalizeCooldown, uint256 oldFinalizeCooldown);

  /**
   * @notice Emitted when a new hub connector is updated
   * @param hubConnector New hub connector address
   * @param oldHubConnector Old hub connector address
   * @param chain Chain ID of the hub connector
   */
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  /**
   * @notice Emitted when Autonolas address is updated by admin
   * @param updated New Autonolas address in the contract
   * @param previous Old Autonolas address in the contract
   */
  event AutonolasChanged(address updated, address previous);

  /**
   * @notice Emitted when Autonolas priority is updated by admin
   * @param updated New Autonolas priority in the contract
   * @param previous Old Autonolas priority in the contract
   */
  event AutonolasPriorityChanged(AutonolasPriorityFunction fn, uint8 updated, uint8 previous);

  // ============ Errors ============
  error RelayerProxyHub__propagateCooledDown_notCooledDown();
  error RelayerProxyHub__finalizeCooledDown_notCooledDown();
  error RelayerProxyHub__validateProposeSignature_notProposer(address signer);
  error RelayerProxyHub__processFromRoot_alreadyProcessed();
  error RelayerProxyHub__processFromRoot_noHubConnector();
  error RelayerProxyHub__processFromRoot_unsupportedChain();

  // ============ Modifiers ============
  /**
   * @notice Indicates if the job is workable by the sender. Takes into account the Autonolas priority.
   * For example, if priority is 3, then sender will not be able to work on blocks 0, 1, 2, unless they are Autonolas.
   * Priority 0 disables Autonolas priority completely.
   * @param _sender The address of the caller
   */
  modifier isWorkableBySender(AutonolasPriorityFunction _function, address _sender) {
    if (
      _sender != autonolas && autonolasPriority[_function] != 0 && block.number % 10 <= autonolasPriority[_function] - 1
    ) {
      revert RelayerProxy__isWorkableBySender_notWorkable();
    }
    _;
  }

  modifier onlyPropagateCooledDown() {
    if (block.timestamp < lastPropagateAt + propagateCooldown) {
      revert RelayerProxyHub__propagateCooledDown_notCooledDown();
    }
    _;
    lastPropagateAt = block.timestamp;
  }

  modifier onlyFinalizeCooledDown() {
    if (block.timestamp < lastFinalizeAt + finalizeCooldown) {
      revert RelayerProxyHub__finalizeCooledDown_notCooledDown();
    }
    _;
    lastFinalizeAt = block.timestamp;
  }

  // ============ Structs ============

  /**
   * Struct containing the construstor arguments of a RelayerProxyHub
   * @param connext The address of the Connext on this domain.
   * @param spokeConnector The address of the SpokeConnector on this domain.
   * @param gelatoRelayer The address of the Gelato relayer on this domain.
   * @param feeCollector The address of the Gelato Fee Collector on this domain.
   * @param keep3r The address of the Keep3r on this domain.
   * @param rootManager The address of the Root Manager on this domain.
   * @param autonolas The address of the Autonolas keeper contract on this domain.
   * @param propagateCooldown The delay for the propagate function.
   * @param finalizeCooldown The delay for the finalize function.
   * @param proposeAggregateRootCooldown The delay for the proposeAggregateRoot function.
   * @param hubConnectors The addresses of the hub connectors on this domain.
   * @param hubConnectorChains The identifiers of the hub connectors on this domain.
   */
  struct HubConstructorParams {
    address connext;
    address spokeConnector;
    address gelatoRelayer;
    address feeCollector;
    address keep3r;
    address rootManager;
    address autonolas;
    uint256 propagateCooldown;
    uint256 finalizeCooldown;
    uint256 proposeAggregateRootCooldown;
    address[] hubConnectors;
    uint32[] hubConnectorChains;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxyHub instance.
   */
  constructor(
    HubConstructorParams memory _params
  )
    RelayerProxy(
      ConstructorParams(
        _params.connext,
        _params.spokeConnector,
        _params.gelatoRelayer,
        _params.feeCollector,
        _params.keep3r,
        _params.proposeAggregateRootCooldown
      )
    )
  {
    _setRootManager(_params.rootManager);
    _setPropagateCooldown(_params.propagateCooldown);
    _setProposeAggregateRootCooldown(_params.proposeAggregateRootCooldown);
    _setFinalizeCooldown(_params.finalizeCooldown);
    _setAutonolas(_params.autonolas);
    for (uint256 i = 0; i < _params.hubConnectors.length; i++) {
      _setHubConnector(_params.hubConnectors[i], _params.hubConnectorChains[i]);
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

  /**
   * @notice Updates the Autonolas contract address on this contract.
   * @param _autonolas - New Autonolas contract address.
   */
  function setAutonolas(address _autonolas) external onlyOwner definedAddress(_autonolas) {
    _setAutonolas(_autonolas);
  }

  /**
   * @notice Updates the Autonolas priority on this contract.
   * @param _autonolasPriority - New Autonolas priority.
   */
  function setAutonolasPriority(AutonolasPriorityFunction _function, uint8 _autonolasPriority) external onlyOwner {
    _setAutonolasPriority(_function, _autonolasPriority);
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
    return updatedRoot && block.timestamp >= lastPropagateAt + propagateCooldown;
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
  ) external onlyRelayer onlyPropagateCooledDown nonReentrant {
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
  )
    external
    isWorkableBySender(AutonolasPriorityFunction.Propagate, msg.sender)
    validateAndPayWithCredits(msg.sender)
    onlyPropagateCooledDown
    nonReentrant
  {
    _propagate(_connectors, _messageFees, _encodedData);
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
  )
    external
    isWorkableBySender(AutonolasPriorityFunction.ProcessFromRoot, msg.sender)
    validateAndPayWithCredits(msg.sender)
  {
    _processFromRoot(_encodedData, _fromChain, _l2Hash);
  }

  /**
   * @notice Wraps the `proposeAggregateRoot` function of RootManager
   * @dev This contract will validate the signer is a whitelisted proposer on the RootManager,
   * and then call `propose` itself. This means this contract must *also* be whitelisted as a
   * proposer on the RootManager.
   * @param _snapshotId The snapshot id of the root to be proposed.
   * @param _aggregateRoot The aggregate root to be proposed.
   * @param _snapshotsRoots The roots of the connectors included in the aggregate.
   * @param _domains The domains of the snapshots to be proposed.
   */
  function proposeAggregateRootOnRootKeep3r(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes32[] calldata _snapshotsRoots,
    uint32[] calldata _domains,
    bytes memory _signature
  )
    external
    isWorkableBySender(AutonolasPriorityFunction.ProposeAggregateRoot, msg.sender)
    validateAndPayWithCredits(msg.sender)
    onlyProposeCooledDown
  {
    // Validate the signer
    _validateProposeSignature(_snapshotId, _aggregateRoot, lastProposeAggregateRootAt, _signature);

    // Propose the aggregate
    rootManager.proposeAggregateRoot(_snapshotId, _aggregateRoot, _snapshotsRoots, _domains);
  }

  /**
   * @notice Wraps the `proposeAggregateRoot` function of RootManager
   * @dev This contract will validate the signer is a whitelisted proposer on the RootManager,
   * and then call `propose` itself. This means this contract must *also* be whitelisted as a
   * proposer on the RootManager.
   * @param _snapshotId The snapshot id of the root to be proposed.
   * @param _aggregateRoot The aggregate root to be proposed.
   * @param _snapshotsRoots The roots of the connectors included in the aggregate.
   * @param _domains The domains of the snapshots to be proposed.
   * @param _signature Signature from the approved proposer.
   */
  function proposeAggregateRootOnRoot(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    bytes32[] calldata _snapshotsRoots,
    uint32[] calldata _domains,
    bytes memory _signature
  ) external onlyRelayer onlyProposeCooledDown nonReentrant {
    // Validate the signer
    _validateProposeSignature(_snapshotId, _aggregateRoot, lastProposeAggregateRootAt, _signature);

    // Propose the aggregate root
    rootManager.proposeAggregateRoot(_snapshotId, _aggregateRoot, _snapshotsRoots, _domains);
  }

  /**
   * @notice Wraps the `finalizeAndPropagate` function
   * @param _connectors Array of connectors: should match exactly the array of `connectors` in storage;
   * @param _fees Array of fees in native token for an AMB if required
   * @param _encodedData Array of encodedData: extra params for each AMB if required
   * @param _proposedAggregateRoot The aggregate root to be proposed.
   * @param _endOfDispute The timestamp when the dispute period ends.
   */
  function finalizeAndPropagate(
    address[] calldata _connectors,
    uint256[] calldata _fees,
    bytes[] memory _encodedData,
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) external onlyRelayer onlyPropagateCooledDown nonReentrant returns (uint256 _fee) {
    // Finalized the proposed aggregate root
    _fee = _finalizeAndPropagate(_connectors, _fees, _encodedData, _proposedAggregateRoot, _endOfDispute);
  }

  /**
   * @notice Wraps the `finalize` function on root manager
   * @param _proposedAggregateRoot The aggregate root currently proposed
   * @param _endOfDispute          The block in which the dispute period for proposed root finalizes
   */
  function finalize(
    bytes32 _proposedAggregateRoot,
    uint256 _endOfDispute
  ) external onlyFinalizeCooledDown nonReentrant {
    // Finalized the proposed aggregate root
    rootManager.finalize(_proposedAggregateRoot, _endOfDispute);
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
  )
    external
    isWorkableBySender(AutonolasPriorityFunction.Propagate, msg.sender)
    validateAndPayWithCredits(msg.sender)
    onlyPropagateCooledDown
    nonReentrant
    returns (uint256 _fee)
  {
    _fee = _finalizeAndPropagate(_connectors, _fees, _encodedData, _proposedAggregateRoot, _endOfDispute);
  }

  /**
   * @notice Wraps the `sendRootToHubSpoke` function of RootManager
   */
  function sendRootToHubSpoke() external {
    // Send aggregate root to MainnetSpokeConnector
    rootManager.sendRootToHubSpoke();
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

  /**
   * @notice Updates the finalize cooldown period on this contract.
   *
   * @param _finalizeCooldown - Delay for finalize.
   */
  function _setFinalizeCooldown(uint256 _finalizeCooldown) internal {
    emit FinalizeCooldownChanged(_finalizeCooldown, finalizeCooldown);
    finalizeCooldown = _finalizeCooldown;
  }

  function _setHubConnector(address _hubConnector, uint32 chain) internal {
    emit HubConnectorChanged(_hubConnector, hubConnectors[chain], chain);
    hubConnectors[chain] = _hubConnector;
  }

  function _setAutonolas(address _autonolas) internal {
    emit AutonolasChanged(_autonolas, autonolas);
    autonolas = _autonolas;
  }

  function _setAutonolasPriority(AutonolasPriorityFunction _function, uint8 _autonolasPriority) internal {
    emit AutonolasPriorityChanged(_function, _autonolasPriority, autonolasPriority[_function]);
    autonolasPriority[_function] = _autonolasPriority;
  }

  function _validateProposeSignature(
    uint256 _snapshotId,
    bytes32 _aggregateRoot,
    uint256 _lastProposeAggregateRootAt,
    bytes memory _signature
  ) internal view {
    // Get the payload
    // To prevent signature replay, added `snapshotId`, `lastProposeAggregateRootAt` and `domain`.
    // `lastProposeAggregateRootAt` will be strictly increased after proposed, so same signature can't be used again.
    // Also domain will prevent the replay from other chains.
    bytes32 payload = keccak256(abi.encodePacked(_snapshotId, _aggregateRoot, _lastProposeAggregateRootAt, domain));
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
      revert RelayerProxyHub__processFromRoot_alreadyProcessed();
    }
    if (hubConnectors[fromChain] == address(0)) {
      revert RelayerProxyHub__processFromRoot_noHubConnector();
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
      revert RelayerProxyHub__processFromRoot_unsupportedChain();
    }
  }
}
