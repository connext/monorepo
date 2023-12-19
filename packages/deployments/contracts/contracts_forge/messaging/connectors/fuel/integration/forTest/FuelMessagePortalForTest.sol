// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {CryptographyLib} from "./Cryptography.sol";
// import {verifyBinaryTree} from "@fuel-contracts/merkle-sol/contracts/tree/binary/BinaryMerkleTree.sol";
// import {FuelChainState} from "./FuelChainState.sol";
// import {FuelBlockHeader, FuelBlockHeaderLib} from "./types/FuelBlockHeader.sol";
// import {FuelBlockHeaderLite, FuelBlockHeaderLiteLib} from "./types/FuelBlockHeaderLite.sol";

/// @notice Structure for proving an element in a merkle tree
struct MerkleProof {
  uint256 key;
  bytes32[] proof;
}

/// @notice Structure containing all message details
struct Message {
  bytes32 sender;
  bytes32 recipient;
  bytes32 nonce;
  uint64 amount;
  bytes data;
}

/// @notice Common predicates for Fuel inputs
library CommonPredicates {
  bytes32 public constant CONTRACT_MESSAGE_PREDICATE =
    0x86a8f7487cb0d3faca1895173d5ff35c1e839bd2ab88657eede9933ea8988815;
}

/// @title FuelMessagePortal
/// @notice The Fuel Message Portal contract sends messages to and from Fuel
contract FuelMessagePortalForTest is
  Initializable,
  PausableUpgradeable,
  AccessControlUpgradeable,
  ReentrancyGuardUpgradeable,
  UUPSUpgradeable
{
  // using FuelBlockHeaderLib for FuelBlockHeader;
  // using FuelBlockHeaderLiteLib for FuelBlockHeaderLite;

  ////////////
  // Events //
  ////////////

  /// @dev Emitted when a message is sent from Ethereum to Fuel
  event MessageSent(
    bytes32 indexed sender,
    bytes32 indexed recipient,
    uint256 indexed nonce,
    uint64 amount,
    bytes data
  );

  /// @dev Emitted when a message is successfully relayed to Ethereum from Fuel
  event MessageRelayed(bytes32 indexed messageId, bytes32 indexed sender, bytes32 indexed recipient, uint64 amount);

  ////////////
  // Errors //
  ////////////

  error UnfinalizedBlock();
  error InvalidBlockInHistoryProof();
  error InvalidMessageInBlockProof();
  error CurrentMessageSenderNotSet();
  error MessageDataTooLarge();
  error AmountPrecisionIncompatibility();
  error AmountTooBig();
  error AlreadyRelayed();

  ///////////////
  // Constants //
  ///////////////

  /// @dev The admin related contract roles
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

  /// @dev The number of decimals that the base Fuel asset uses
  uint256 public constant FUEL_BASE_ASSET_DECIMALS = 9;
  uint256 public constant ETH_DECIMALS = 18;
  uint256 public constant PRECISION = 10 ** (ETH_DECIMALS - FUEL_BASE_ASSET_DECIMALS);

  /// @dev The max message data size in bytes
  uint256 public constant MAX_MESSAGE_DATA_SIZE = 2 ** 16;

  /// @dev Non-zero null value to optimize gas costs
  bytes32 internal constant NULL_MESSAGE_SENDER = 0x000000000000000000000000000000000000000000000000000000000000dead;

  /////////////
  // Storage //
  /////////////

  /// @notice Current message sender for other contracts to reference
  bytes32 internal _incomingMessageSender;

  /// @notice The Fuel chain state contract
  // FuelChainState private _fuelChainState;

  /// @notice Nonce for the next message to be sent
  uint256 internal _outgoingMessageNonce;

  /// @notice Mapping of message hash to boolean success value
  mapping(bytes32 => bool) internal _incomingMessageSuccessful;

  /////////////////////////////
  // Constructor/Initializer //
  /////////////////////////////

  /// @notice Constructor disables initialization for the implementation contract
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  /// @notice Contract initializer to setup starting values
  // function initialize(FuelChainState fuelChainState) public initializer {
  function initialize() public initializer {
    __Pausable_init();
    __AccessControl_init();
    __ReentrancyGuard_init();
    __UUPSUpgradeable_init();

    //grant initial roles
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(PAUSER_ROLE, msg.sender);

    //chain state contract
    // _fuelChainState = fuelChainState;

    //outgoing message data
    _outgoingMessageNonce = 0;

    //incoming message data
    _incomingMessageSender = NULL_MESSAGE_SENDER;
  }

  /////////////////////
  // Admin Functions //
  /////////////////////

  /// @notice Pause outbound messages
  function pause() external virtual onlyRole(PAUSER_ROLE) {
    _pause();
  }

  /// @notice Unpause outbound messages
  function unpause() external virtual onlyRole(DEFAULT_ADMIN_ROLE) {
    _unpause();
  }

  //////////////////////
  // Public Functions //
  //////////////////////

  /// @notice Gets the number of decimals used in the Fuel base asset
  /// @return decimals of the Fuel base asset
  function fuelBaseAssetDecimals() public pure virtual returns (uint8) {
    return uint8(FUEL_BASE_ASSET_DECIMALS);
  }

  /// @notice Gets the set Fuel chain state contract
  /// @return fuel chain state contract
  function fuelChainStateContract() public view virtual returns (address) {
    // return address(_fuelChainState);
  }

  function getNextOutgoingMessageNonce() public view virtual returns (uint256) {
    return _outgoingMessageNonce;
  }

  ///////////////////////////////////////
  // Incoming Message Public Functions //
  ///////////////////////////////////////

  /// @notice Relays a message published on Fuel from a given block
  /// @param message The message to relay
  /// @dev Made payable to reduce gas costs
  function relayMessage(
    Message calldata message
  )
    external
    payable
    virtual
    // FuelBlockHeaderLite calldata rootBlockHeader,
    // FuelBlockHeader calldata blockHeader,
    // MerkleProof calldata blockInHistoryProof,
    // MerkleProof calldata messageInBlockProof
    whenNotPaused
  {
    // //verify root block header
    // if (!_fuelChainState.finalized(rootBlockHeader.computeConsensusHeaderHash(), rootBlockHeader.height)) {
    //   revert UnfinalizedBlock();
    // }

    // //verify block in history
    // if (
    //   !verifyBinaryTree(
    //     rootBlockHeader.prevRoot,
    //     abi.encodePacked(blockHeader.computeConsensusHeaderHash()),
    //     blockInHistoryProof.proof,
    //     blockInHistoryProof.key,
    //     rootBlockHeader.height
    //   )
    // ) revert InvalidBlockInHistoryProof();

    //verify message in block
    bytes32 messageId = CryptographyLib.hash(
      abi.encodePacked(message.sender, message.recipient, message.nonce, message.amount, message.data)
    );
    // if (
    //   !verifyBinaryTree(
    //     blockHeader.outputMessagesRoot,
    //     abi.encodePacked(messageId),
    //     messageInBlockProof.proof,
    //     messageInBlockProof.key,
    //     blockHeader.outputMessagesCount
    //   )
    // ) revert InvalidMessageInBlockProof();

    //execute message
    _executeMessage(messageId, message);
  }

  /// @notice Gets if the given message ID has been relayed successfully
  /// @param messageId Message ID
  /// @return true if message has been relayed successfully
  function incomingMessageSuccessful(bytes32 messageId) public view virtual returns (bool) {
    return _incomingMessageSuccessful[messageId];
  }

  /// @notice Used by message receiving contracts to get the address on Fuel that sent the message
  /// @return sender the address of the sender on Fuel
  function messageSender() external view virtual returns (bytes32) {
    if (_incomingMessageSender == NULL_MESSAGE_SENDER) revert CurrentMessageSenderNotSet();
    return _incomingMessageSender;
  }

  ///////////////////////////////////////
  // Outgoing Message Public Functions //
  ///////////////////////////////////////

  /// @notice Send a message to a recipient on Fuel
  /// @param recipient The target message receiver address or predicate root
  /// @param data The message data to be sent to the receiver
  function sendMessage(bytes32 recipient, bytes calldata data) external payable virtual whenNotPaused {
    _sendOutgoingMessage(recipient, data);
  }

  /// @notice Send only ETH to the given recipient
  /// @param recipient The target message receiver
  function depositETH(bytes32 recipient) external payable virtual whenNotPaused {
    _sendOutgoingMessage(recipient, new bytes(0));
  }

  ////////////////////////
  // Internal Functions //
  ////////////////////////

  /// @notice Performs all necessary logic to send a message to a target on Fuel
  /// @param recipient The message receiver address or predicate root
  /// @param data The message data to be sent to the receiver
  function _sendOutgoingMessage(bytes32 recipient, bytes memory data) internal virtual {
    bytes32 sender = bytes32(uint256(uint160(msg.sender)));
    unchecked {
      //make sure data size is not too large
      if (data.length >= MAX_MESSAGE_DATA_SIZE) revert MessageDataTooLarge();

      //make sure amount fits into the Fuel base asset decimal level
      uint256 precision = 10 ** (ETH_DECIMALS - FUEL_BASE_ASSET_DECIMALS);
      uint256 amount = msg.value / precision;
      if (msg.value > 0) {
        if (amount * PRECISION != msg.value) revert AmountPrecisionIncompatibility();
        if (amount > type(uint64).max) revert AmountTooBig();
      }

      //emit message for Fuel clients to pickup (messageID calculated offchain)
      uint256 nonce = _outgoingMessageNonce;
      emit MessageSent(sender, recipient, nonce, uint64(amount), data);

      // increment nonce for next message
      _outgoingMessageNonce = nonce + 1;
    }
  }

  /// @notice Executes a message in the given header
  /// @param messageId The id of message to execute
  /// @param message The message to execute
  function _executeMessage(bytes32 messageId, Message calldata message) internal virtual nonReentrant {
    if (_incomingMessageSuccessful[messageId]) revert AlreadyRelayed();

    //set message sender for receiving contract to reference
    _incomingMessageSender = message.sender;

    (bool success, bytes memory result) = address(uint160(uint256(message.recipient))).call{
      value: message.amount * (10 ** (ETH_DECIMALS - FUEL_BASE_ASSET_DECIMALS))
    }(message.data);

    if (!success) {
      // Look for revert reason and bubble it up if present
      if (result.length > 0) {
        // The easiest way to bubble the revert reason is using memory via assembly
        /// @solidity memory-safe-assembly
        assembly {
          let returndata_size := mload(result)
          revert(add(32, result), returndata_size)
        }
      }
      revert("Message relay failed");
    }

    //unset message sender reference
    _incomingMessageSender = NULL_MESSAGE_SENDER;

    //keep track of successfully relayed messages
    _incomingMessageSuccessful[messageId] = true;

    //emit event for successful message relay
    emit MessageRelayed(messageId, message.sender, message.recipient, message.amount);
  }

  /// @notice Executes a message in the given header
  // solhint-disable-next-line no-empty-blocks
  function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {
    //should revert if msg.sender is not authorized to upgrade the contract (currently only admin)
  }

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
   */
  uint256[49] private __gap;
}
