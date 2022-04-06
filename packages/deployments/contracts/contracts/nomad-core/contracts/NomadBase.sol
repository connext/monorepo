// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {Message} from "../libs/Message.sol";
// ============ External Imports ============
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title NomadBase
 * @author Illusory Systems Inc.
 * @notice Shared utilities between Home and Replica.
 */
abstract contract NomadBase is Initializable, OwnableUpgradeable {
  // ============ Enums ============

  // States:
  //   0 - UnInitialized - before initialize function is called
  //   note: the contract is initialized at deploy time, so it should never be in this state
  //   1 - Active - as long as the contract has not become fraudulent
  //   2 - Failed - after a valid fraud proof has been submitted;
  //   contract will no longer accept updates or new messages
  enum States {
    UnInitialized,
    Active,
    Failed
  }

  // ============ Immutable Variables ============

  // Domain of chain on which the contract is deployed
  uint32 public immutable localDomain;

  // ============ Public Variables ============

  // Address of bonded Updater
  address public updater;
  // Current state of contract
  States public state;
  // The latest root that has been signed by the Updater
  bytes32 public committedRoot;

  // ============ Upgrade Gap ============

  // gap for upgrade safety
  uint256[47] private __GAP;

  // ============ Events ============

  /**
   * @notice Emitted when update is made on Home
   * or unconfirmed update root is submitted on Replica
   * @param homeDomain Domain of home contract
   * @param oldRoot Old merkle root
   * @param newRoot New merkle root
   * @param signature Updater's signature on `oldRoot` and `newRoot`
   */
  event Update(uint32 indexed homeDomain, bytes32 indexed oldRoot, bytes32 indexed newRoot, bytes signature);

  /**
   * @notice Emitted when proof of a double update is submitted,
   * which sets the contract to FAILED state
   * @param oldRoot Old root shared between two conflicting updates
   * @param newRoot Array containing two conflicting new roots
   * @param signature Signature on `oldRoot` and `newRoot`[0]
   * @param signature2 Signature on `oldRoot` and `newRoot`[1]
   */
  event DoubleUpdate(bytes32 oldRoot, bytes32[2] newRoot, bytes signature, bytes signature2);

  /**
   * @notice Emitted when Updater is rotated
   * @param oldUpdater The address of the old updater
   * @param newUpdater The address of the new updater
   */
  event NewUpdater(address oldUpdater, address newUpdater);

  // ============ Modifiers ============

  /**
   * @notice Ensures that contract state != FAILED when the function is called
   */
  modifier notFailed() {
    require(state != States.Failed, "failed state");
    _;
  }

  // ============ Constructor ============

  constructor(uint32 _localDomain) {
    localDomain = _localDomain;
  }

  // ============ Initializer ============

  function __NomadBase_initialize(address _updater) internal initializer {
    __Ownable_init();
    _setUpdater(_updater);
    state = States.Active;
  }

  // ============ External Functions ============

  /**
   * @notice Called by external agent. Checks that signatures on two sets of
   * roots are valid and that the new roots conflict with each other. If both
   * cases hold true, the contract is failed and a `DoubleUpdate` event is
   * emitted.
   * @dev When `fail()` is called on Home, updater is slashed.
   * @param _oldRoot Old root shared between two conflicting updates
   * @param _newRoot Array containing two conflicting new roots
   * @param _signature Signature on `_oldRoot` and `_newRoot`[0]
   * @param _signature2 Signature on `_oldRoot` and `_newRoot`[1]
   */
  function doubleUpdate(
    bytes32 _oldRoot,
    bytes32[2] calldata _newRoot,
    bytes calldata _signature,
    bytes calldata _signature2
  ) external notFailed {
    if (
      NomadBase._isUpdaterSignature(_oldRoot, _newRoot[0], _signature) &&
      NomadBase._isUpdaterSignature(_oldRoot, _newRoot[1], _signature2) &&
      _newRoot[0] != _newRoot[1]
    ) {
      _fail();
      emit DoubleUpdate(_oldRoot, _newRoot, _signature, _signature2);
    }
  }

  // ============ Public Functions ============

  /**
   * @notice Hash of Home domain concatenated with "NOMAD"
   */
  function homeDomainHash() public view virtual returns (bytes32);

  // ============ Internal Functions ============

  /**
   * @notice Hash of Home domain concatenated with "NOMAD"
   * @param _homeDomain the Home domain to hash
   */
  function _homeDomainHash(uint32 _homeDomain) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(_homeDomain, "NOMAD"));
  }

  /**
   * @notice Set contract state to FAILED
   * @dev Called when a valid fraud proof is submitted
   */
  function _setFailed() internal {
    state = States.Failed;
  }

  /**
   * @notice Moves the contract into failed state
   * @dev Called when fraud is proven
   * (Double Update is submitted on Home or Replica,
   * or Improper Update is submitted on Home)
   */
  function _fail() internal virtual;

  /**
   * @notice Set the Updater
   * @param _newUpdater Address of the new Updater
   */
  function _setUpdater(address _newUpdater) internal {
    address _oldUpdater = updater;
    updater = _newUpdater;
    emit NewUpdater(_oldUpdater, _newUpdater);
  }

  /**
   * @notice Checks that signature was signed by Updater
   * @param _oldRoot Old merkle root
   * @param _newRoot New merkle root
   * @param _signature Signature on `_oldRoot` and `_newRoot`
   * @return TRUE iff signature is valid signed by updater
   **/
  function _isUpdaterSignature(
    bytes32 _oldRoot,
    bytes32 _newRoot,
    bytes memory _signature
  ) internal view returns (bool) {
    bytes32 _digest = keccak256(abi.encodePacked(homeDomainHash(), _oldRoot, _newRoot));
    _digest = ECDSA.toEthSignedMessageHash(_digest);
    return (ECDSA.recover(_digest, _signature) == updater);
  }
}
