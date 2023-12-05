// The Licensed Work is (c) 2022 Sygma
// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

import "forge-std/Test.sol";

contract Pausable {
  /**
   * @dev Emitted when the pause is triggered by `account`.
   */
  event Paused(address account);

  /**
   * @dev Emitted when the pause is lifted by `account`.
   */
  event Unpaused(address account);

  bool private _paused;

  /**
   * @dev Initializes the contract in unpaused state.
   */
  constructor() {
    _paused = false;
  }

  /**
   * @dev Returns true if the contract is paused, and false otherwise.
   */
  function paused() public view returns (bool) {
    return _paused;
  }

  /**
   * @dev Modifier to make a function callable only when the contract is not paused.
   *
   * Requirements:
   *
   * - The contract must not be paused.
   */
  modifier whenNotPaused() {
    _whenNotPaused();
    _;
  }

  function _whenNotPaused() private view {
    require(!_paused, "Pausable: paused");
  }

  /**
   * @dev Modifier to make a function callable only when the contract is paused.
   *
   * Requirements:
   *
   * - The contract must be paused.
   */
  modifier whenPaused() {
    _whenPaused();
    _;
  }

  function _whenPaused() private view {
    require(_paused, "Pausable: not paused");
  }

  /**
   * @dev Triggers stopped state.
   * @param sender Address which executes pause.
   *
   * Requirements:
   *
   * - The contract must not be paused.
   */
  function _pause(address sender) internal virtual whenNotPaused {
    _paused = true;
    emit Paused(sender);
  }

  /**
   * @dev Returns to normal state.
   * @param sender Address which executes unpause.
   *
   * Requirements:
   *
   * - The contract must be paused.
   */
  function _unpause(address sender) internal virtual whenPaused {
    _paused = false;
    emit Unpaused(sender);
  }
}

contract BridgeForTest is Pausable, Context, EIP712 {
  using ECDSA for bytes32;

  bytes32 private constant _PROPOSALS_TYPEHASH =
    keccak256(
      "Proposals(Proposal[] proposals)Proposal(uint8 originDomainID,uint64 depositNonce,bytes32 resourceID,bytes data)"
    );
  bytes32 private constant _PROPOSAL_TYPEHASH =
    keccak256("Proposal(uint8 originDomainID,uint64 depositNonce,bytes32 resourceID,bytes data)");

  uint8 public immutable _domainID;
  address public _MPCAddress;

  IFeeHandler public _feeHandler;

  IAccessControlSegregator public _accessControl;

  struct Proposal {
    uint8 originDomainID;
    uint64 depositNonce;
    bytes32 resourceID;
    bytes data;
  }

  // destinationDomainID => number of deposits
  mapping(uint8 => uint64) public _depositCounts;
  // resourceID => handler address
  mapping(bytes32 => address) public _resourceIDToHandlerAddress;
  // forwarder address => is Valid
  mapping(address => bool) public isValidForwarder;
  // origin domainID => nonces set => used deposit nonces
  mapping(uint8 => mapping(uint256 => uint256)) public usedNonces;

  event FeeHandlerChanged(address newFeeHandler);
  event AccessControlChanged(address newAccessControl);
  event Deposit(
    uint8 destinationDomainID,
    bytes32 resourceID,
    uint64 depositNonce,
    address indexed user,
    bytes data,
    bytes handlerResponse
  );
  event ProposalExecution(uint8 originDomainID, uint64 depositNonce, bytes32 dataHash, bytes handlerResponse);

  event FailedHandlerExecution(bytes lowLevelData, uint8 originDomainID, uint64 depositNonce);

  event StartKeygen();

  event EndKeygen();

  event KeyRefresh(string hash);

  event Retry(string txHash);

  error AccessNotAllowed(address sender, bytes4 funcSig);

  error ResourceIDNotMappedToHandler();

  error DepositToCurrentDomain();

  error InvalidProposalSigner();

  error EmptyProposalsArray();

  error NonceDecrementsNotAllowed();

  error MPCAddressAlreadySet();

  error MPCAddressNotSet();

  error MPCAddressIsNotUpdatable();

  error MPCAddressZeroAddress();

  modifier onlyAllowed() {
    _onlyAllowed(msg.sig, _msgSender());
    _;
  }

  function _onlyAllowed(bytes4 sig, address sender) private view {
    if (!_accessControl.hasAccess(sig, sender)) revert AccessNotAllowed(sender, sig);
  }

  function _msgSender() internal view override returns (address) {
    address signer = msg.sender;
    if (msg.data.length >= 20 && isValidForwarder[signer]) {
      assembly {
        signer := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    }
    return signer;
  }

  /**
        @notice Initializes Bridge, creates and grants {_msgSender()} the admin role, sets access control
        contract for bridge and sets the inital state of the Bridge to paused.
        @param domainID ID of chain the Bridge contract exists on.
        @param accessControl Address of access control contract.
     */
  constructor(uint8 domainID, address accessControl) EIP712("Bridge", "3.1.0") {
    _domainID = domainID;
    _accessControl = IAccessControlSegregator(accessControl);

    _pause(_msgSender());
  }

  /**
        @notice Pauses deposits, proposal creation and voting, and deposit executions.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
     */
  function adminPauseTransfers() external onlyAllowed {
    _pause(_msgSender());
  }

  /**
        @notice Unpauses deposits, proposal creation and voting, and deposit executions.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @notice MPC address has to be set before Bridge can be unpaused
     */
  function adminUnpauseTransfers() external onlyAllowed {
    if (_MPCAddress == address(0)) revert MPCAddressNotSet();
    _unpause(_msgSender());
  }

  /**
        @notice Sets a new resource for handler contracts that use the IERCHandler interface,
        and maps the {handlerAddress} to {resourceID} in {_resourceIDToHandlerAddress}.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param handlerAddress Address of handler resource will be set for.
        @param resourceID ResourceID to be used when making deposits.
        @param contractAddress Address of contract to be called when a deposit is made and a deposited is executed.
        @param args Additional data to be passed to specified handler.
     */
  function adminSetResource(
    address handlerAddress,
    bytes32 resourceID,
    address contractAddress,
    bytes calldata args // ) external onlyAllowed {
  ) external {
    _resourceIDToHandlerAddress[resourceID] = handlerAddress;
    IHandler handler = IHandler(handlerAddress);
    handler.setResource(resourceID, contractAddress, args);
  }

  /**
        @notice Sets a resource as burnable for handler contracts that use the IERCHandler interface.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param handlerAddress Address of handler resource will be set for.
        @param tokenAddress Address of contract to be called when a deposit is made and a deposited is executed.
     */
  function adminSetBurnable(address handlerAddress, address tokenAddress) external onlyAllowed {
    IERCHandler handler = IERCHandler(handlerAddress);
    handler.setBurnable(tokenAddress);
  }

  /**
        @notice Sets the nonce for the specific domainID.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param domainID Domain ID for increasing nonce.
        @param nonce The nonce value to be set.
     */
  function adminSetDepositNonce(uint8 domainID, uint64 nonce) external onlyAllowed {
    require(nonce > _depositCounts[domainID], "Does not allow decrements of the nonce");
    _depositCounts[domainID] = nonce;
  }

  /**
        @notice Set a forwarder to be used.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param forwarder Forwarder address to be added.
        @param valid Decision for the specific forwarder.
     */
  function adminSetForwarder(address forwarder, bool valid) external onlyAllowed {
    isValidForwarder[forwarder] = valid;
  }

  /**
        @notice Changes access control contract address.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param newAccessControl Address {_accessControl} will be updated to.
     */
  function adminChangeAccessControl(address newAccessControl) external onlyAllowed {
    _accessControl = IAccessControlSegregator(newAccessControl);
    emit AccessControlChanged(newAccessControl);
  }

  /**
        @notice Changes deposit fee handler contract address.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param newFeeHandler Address {_feeHandler} will be updated to.
     */
  function adminChangeFeeHandler(address newFeeHandler) external onlyAllowed {
    _feeHandler = IFeeHandler(newFeeHandler);
    emit FeeHandlerChanged(newFeeHandler);
  }

  /**
        @notice Used to manually withdraw funds from ERC safes.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param handlerAddress Address of handler to withdraw from.
        @param data ABI-encoded withdrawal params relevant to the specified handler.
     */
  function adminWithdraw(address handlerAddress, bytes memory data) external onlyAllowed {
    IERCHandler handler = IERCHandler(handlerAddress);
    handler.withdraw(data);
  }

  /**
        @notice Initiates a transfer using a specified handler contract.
        @notice Only callable when Bridge is not paused.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID used to find address of handler to be used for deposit.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
        @notice Emits {Deposit} event with all necessary parameters and a handler response.
        @return depositNonce deposit nonce for the destination domain.
        @return handlerResponse a handler response:
        - ERC20Handler: responds with an empty data.
        - ERC721Handler: responds with the deposited token metadata acquired by calling a tokenURI method in the token contract.
        - PermissionedGenericHandler: responds with the raw bytes returned from the call to the target contract.
        - PermissionlessGenericHandler: responds with an empty data.
     */
  function deposit(
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external payable whenNotPaused returns (uint64 depositNonce, bytes memory handlerResponse) {
    console.log("here");

    if (destinationDomainID == _domainID) revert DepositToCurrentDomain();

    address sender = _msgSender();
    if (address(_feeHandler) == address(0)) {
      require(msg.value == 0, "no FeeHandler, msg.value != 0");
    } else {
      // Reverts on failure
      _feeHandler.collectFee{value: msg.value}(
        sender,
        _domainID,
        destinationDomainID,
        resourceID,
        depositData,
        feeData
      );
    }
    address handler = _resourceIDToHandlerAddress[resourceID];
    if (handler == address(0)) revert ResourceIDNotMappedToHandler();

    depositNonce = ++_depositCounts[destinationDomainID];

    IHandler depositHandler = IHandler(handler);
    handlerResponse = depositHandler.deposit(resourceID, sender, depositData);

    emit Deposit(destinationDomainID, resourceID, depositNonce, sender, depositData, handlerResponse);
    return (depositNonce, handlerResponse);
  }

  /**
        @notice Executes a deposit proposal using a specified handler contract (only if signature is signed by MPC).
        @notice Failed executeProposal from handler don't revert, emits {FailedHandlerExecution} event.
        @param proposal Proposal which consists of:
        - originDomainID ID of chain deposit originated from.
        - resourceID ResourceID to be used when making deposits.
        - depositNonce ID of deposit generated by origin Bridge contract.
        - data Data originally provided when deposit was made.
        @param signature bytes memory signature composed of MPC key shares
        @notice Emits {ProposalExecution} event.
        @notice Behaviour of this function is different for {P3ermissionedGenericHandler} and other specific ERC handlers.
        In the case of ERC handler, when execution fails, the handler will terminate the function with revert.
        In the case of {PermissionedGenericHandler}, when execution fails, the handler will emit a failure event and terminate the function normally.
     */
  function executeProposal(Proposal memory proposal, bytes calldata signature) public {
    Proposal[] memory proposalArray = new Proposal[](1);
    proposalArray[0] = proposal;

    executeProposals(proposalArray, signature);
  }

  /**
        @notice Executes a batch of deposit proposals using a specified handler contract for each proposal (only if signature is signed by MPC).
        @notice If executeProposals fails it doesn't revert, emits {FailedHandlerExecution} event.
        @param proposals Array of Proposal which consists of:
        - originDomainID ID of chain deposit originated from.
        - resourceID ResourceID to be used when making deposits.
        - depositNonce ID of deposit generated by origin Bridge contract.
        - data Data originally provided when deposit was made.
        @param signature bytes memory signature for the whole array composed of MPC key shares
        @notice Emits {ProposalExecution} event for each proposal in the batch.
        @notice Behaviour of this function is different for {PermissionedGenericHandler} and other specific handlers.
        In the case of ERC handler, when execution fails, the handler will terminate the function with revert.
        In the case of {PermissionedGenericHandler}, when execution fails, the handler will emit a failure event and terminate the function normally.
     */
  // function executeProposals(Proposal[] memory proposals, bytes calldata signature) public whenNotPaused {
  function executeProposals(Proposal[] memory proposals, bytes calldata signature) public {
    if (proposals.length == 0) revert EmptyProposalsArray();
    // if (!verify(proposals, signature)) revert InvalidProposalSigner();

    for (uint256 i = 0; i < proposals.length; i++) {
      console.log("i: ", i);
      if (isProposalExecuted(proposals[i].originDomainID, proposals[i].depositNonce)) {
        continue;
      }

      address handler = _resourceIDToHandlerAddress[proposals[i].resourceID];
      bytes32 dataHash = keccak256(abi.encodePacked(handler, proposals[i].data));

      IHandler depositHandler = IHandler(handler);

      usedNonces[proposals[i].originDomainID][proposals[i].depositNonce / 256] |=
        1 <<
        (proposals[i].depositNonce % 256);

      try depositHandler.executeProposal(proposals[i].resourceID, proposals[i].data) returns (
        bytes memory handlerResponse
      ) {
        emit ProposalExecution(proposals[i].originDomainID, proposals[i].depositNonce, dataHash, handlerResponse);
      } catch (bytes memory lowLevelData) {
        emit FailedHandlerExecution(lowLevelData, proposals[i].originDomainID, proposals[i].depositNonce);
        usedNonces[proposals[i].originDomainID][proposals[i].depositNonce / 256] &= ~(1 <<
          (proposals[i].depositNonce % 256));
        continue;
      }
    }
  }

  /**
        @notice Once MPC address is set, this method can't be invoked anymore.
        It's used to trigger the belonging process on the MPC side which also handles keygen function calls order.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
     */
  function startKeygen() external onlyAllowed {
    if (_MPCAddress != address(0)) revert MPCAddressAlreadySet();
    emit StartKeygen();
  }

  /**
        @notice This method can be called only once, after the MPC address is set Bridge is unpaused.
        It's used to trigger the belonging process on the MPC side which also handles keygen function calls order.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param MPCAddress Address that will be set as MPC address.
     */
  function endKeygen(address MPCAddress) external onlyAllowed {
    if (MPCAddress == address(0)) revert MPCAddressZeroAddress();
    if (_MPCAddress != address(0)) revert MPCAddressIsNotUpdatable();
    _MPCAddress = MPCAddress;
    _unpause(_msgSender());
    emit EndKeygen();
  }

  /**
        @notice It's used to trigger the belonging process on the MPC side.
        It's used to trigger the belonging process on the MPC side which also handles keygen function calls order.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param hash Topology hash which prevents changes during refresh process.
     */
  function refreshKey(string memory hash) external onlyAllowed {
    emit KeyRefresh(hash);
  }

  /**
        @notice This method is used to trigger the process for retrying failed deposits on the MPC side.
        @notice Only callable by address that has the right to call the specific function,
        which is mapped in {functionAccess} in AccessControlSegregator contract.
        @param txHash Transaction hash which contains deposit that should be retried
        @notice This is not applicable for failed executions on {PermissionedGenericHandler}
     */
  function retry(string memory txHash) external onlyAllowed {
    emit Retry(txHash);
  }

  /**
        @notice Returns a boolean value.
        @param domainID ID of chain deposit originated from.
        @param depositNonce ID of deposit generated by origin Bridge contract.
        @return Boolean value depending if deposit nonce has already been used or not.
     */
  function isProposalExecuted(uint8 domainID, uint256 depositNonce) public view returns (bool) {
    return usedNonces[domainID][depositNonce / 256] & (1 << (depositNonce % 256)) != 0;
  }

  /**
        @notice Verifies that proposal data is signed by MPC address.
        @param proposals array of Proposals.
        @param signature signature bytes memory signature composed of MPC key shares.
        @return Boolean value depending if signer is vaild or not.
     */
  function verify(Proposal[] memory proposals, bytes calldata signature) public view returns (bool) {
    bytes32[] memory keccakData = new bytes32[](proposals.length);
    for (uint256 i = 0; i < proposals.length; i++) {
      keccakData[i] = keccak256(
        abi.encode(
          _PROPOSAL_TYPEHASH,
          proposals[i].originDomainID,
          proposals[i].depositNonce,
          proposals[i].resourceID,
          keccak256(proposals[i].data)
        )
      );
    }

    address signer = _hashTypedDataV4(
      keccak256(abi.encode(_PROPOSALS_TYPEHASH, keccak256(abi.encodePacked(keccakData))))
    ).recover(signature);
    return signer == _MPCAddress;
  }
}

/*
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This is a stripped down version of Open zeppelin's Pausable contract.
 * https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/EnumerableSet.sol
 *
 */

/**
    @title Interface for handler that handles generic deposits and deposit executions.
    @author ChainSafe Systems.
 */
interface IHandler {
  /**
        @notice It is intended that deposit are made using the Bridge contract.
        @param resourceID ResourceID used to find address of handler to be used for deposit.
        @param depositor Address of account making the deposit in the Bridge contract.
        @param data Consists of additional data needed for a specific deposit.
     */
  function deposit(bytes32 resourceID, address depositor, bytes calldata data) external returns (bytes memory);

  /**
        @notice It is intended that proposals are executed by the Bridge contract.
        @param resourceID ResourceID to be used when making deposits.
        @param data Consists of additional data needed for a specific deposit execution.
     */
  function executeProposal(bytes32 resourceID, bytes calldata data) external returns (bytes memory);

  /**
        @notice Correlates {_resourceIDToContractAddress} with {contractAddress}, {_tokenContractAddressToTokenProperties[tokenAddress].resourceID} with {resourceID} and marks
        {_tokenContractAddressToTokenProperties[tokenAddress].isWhitelisted} to true for {contractAddress} in ERCHandlerHelpers contract.
        @param resourceID ResourceID to be used when making deposits.
        @param contractAddress Address of contract to be called when a deposit is made and a deposited is executed.
        @param args Additional data to be passed to specified handler.
     */
  function setResource(bytes32 resourceID, address contractAddress, bytes calldata args) external;
}

/**
    @title Interface to be used with handlers that support ERC20s and ERC721s.
    @author ChainSafe Systems.
 */
interface IERCHandler {
  /**
        @notice Marks {contractAddress} as mintable/burnable.
        @param contractAddress Address of contract to be used when making or executing deposits.
     */
  function setBurnable(address contractAddress) external;

  /**
        @notice Withdraw funds from ERC safes.
        @param data ABI-encoded withdrawal params relevant to the handler.
     */
  function withdraw(bytes memory data) external;

  /**
        @notice Exposing getter for {_resourceIDToTokenContractAddress}.
        @param resourceID ResourceID to be used.
        @return address The {tokenContractAddress} that is currently set for the resourceID.
     */
  // Solhint-disable-next-line func-name-mixedcase
  function _resourceIDToTokenContractAddress(bytes32 resourceID) external view returns (address);
}

/**
    @title Interface to be used with fee handlers.
    @author ChainSafe Systems.
 */
interface IFeeHandler {
  /**
        @notice This event is emitted when the fee is collected.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param fee Collected fee amount.
        @param tokenAddress Address of the token in which the fee was collected (0 for the base currency).
     */
  event FeeCollected(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    uint256 fee,
    address tokenAddress
  );

  /**
        @notice This event is emitted when the fee is distributed to an address.
        @param tokenAddress Address of the token in which the fee was collected (0 for the base currency).
        @param recipient Address that receives the distributed fee.
        @param amount Amount that is distributed.
     */
  event FeeDistributed(address tokenAddress, address recipient, uint256 amount);

  /**
        @notice Collects fee for deposit.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
     */
  function collectFee(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external payable;

  /**
        @notice Calculates fee for deposit.
        @param sender Sender of the deposit.
        @param fromDomainID ID of the source chain.
        @param destinationDomainID ID of chain deposit will be bridged to.
        @param resourceID ResourceID to be used when making deposits.
        @param depositData Additional data to be passed to specified handler.
        @param feeData Additional data to be passed to the fee handler.
        @return Returns the fee amount.
        @return Returns the address of the token to be used for fee.
     */
  function calculateFee(
    address sender,
    uint8 fromDomainID,
    uint8 destinationDomainID,
    bytes32 resourceID,
    bytes calldata depositData,
    bytes calldata feeData
  ) external view returns (uint256, address);
}

/**
    @title Interface to be used with contracts that want per function access control.
    @author ChainSafe Systems.
 */
interface IAccessControlSegregator {
  /**
        @notice Returns boolean value if account has access to function.
        @param sig Function identifier.
        @param account Address of account.
        @return Boolean value depending if account has access.
    */
  function hasAccess(bytes4 sig, address account) external view returns (bool);
}

/**
    @title Facilitates deposits and creation of deposit proposals, and deposit executions.
    @author ChainSafe Systems.
 */

/**
    @title Handles generic deposits and deposit executions.
    @author ChainSafe Systems.
    @notice This contract is intended to be used with the Bridge contract.
 */
contract PermissionlessGenericHandlerForTest is IHandler {
  uint256 public constant MAX_FEE = 1000000;

  address public immutable _bridgeAddress;

  modifier onlyBridge() {
    _onlyBridge();
    _;
  }

  function _onlyBridge() private view {
    require(msg.sender == _bridgeAddress, "sender must be bridge contract");
  }

  /**
        @param bridgeAddress Contract address of previously deployed Bridge.
     */
  constructor(address bridgeAddress) {
    _bridgeAddress = bridgeAddress;
  }

  /**
        @notice Blank function, required in IHandler.
        @param resourceID ResourceID to be used when making deposits.
        @param contractAddress Address of contract to be called when a deposit is made and a deposited is executed.
        @param args Additional data to be passed to specified handler.
     */
  function setResource(bytes32 resourceID, address contractAddress, bytes calldata args) external onlyBridge {}

  /**
        @notice A deposit is initiated by making a deposit in the Bridge contract.
        @param resourceID ResourceID used to find address of contract to be used for deposit.
        @param depositor Address of the account making deposit in the Bridge contract.
        @param data Structure should be constructed as follows:
          maxFee:                       uint256  bytes  0                                                                                           -  32
          len(executeFuncSignature):    uint16   bytes  32                                                                                          -  34
          executeFuncSignature:         bytes    bytes  34                                                                                          -  34 + len(executeFuncSignature)
          len(executeContractAddress):  uint8    bytes  34 + len(executeFuncSignature)                                                              -  35 + len(executeFuncSignature)
          executeContractAddress        bytes    bytes  35 + len(executeFuncSignature)                                                              -  35 + len(executeFuncSignature) + len(executeContractAddress)
          len(executionDataDepositor):  uint8    bytes  35 + len(executeFuncSignature) + len(executeContractAddress)                                -  36 + len(executeFuncSignature) + len(executeContractAddress)
          executionDataDepositor:       bytes    bytes  36 + len(executeFuncSignature) + len(executeContractAddress)                                -  36 + len(executeFuncSignature) + len(executeContractAddress) + len(executionDataDepositor)
          executionData:                bytes    bytes  36 + len(executeFuncSignature) + len(executeContractAddress) + len(executionDataDepositor)  -  END

          executionData is repacked together with executionDataDepositor address for using it in the target contract.
          If executionData contains dynamic types then it is necessary to keep the offsets correct.
          executionData should be encoded together with a 32-byte address and then passed as a parameter without that address.
          If the target function accepts (address depositor, bytes executionData)
          then a function like the following one can be used:

            function prepareDepositData(bytes calldata executionData) view external returns (bytes memory) {
                bytes memory encoded = abi.encode(address(0), executionData);
                return this.slice(encoded, 32);
            }

            function slice(bytes calldata input, uint256 position) pure public returns (bytes memory) {
                return input[position:];
            }
          After this, the target contract will get the following:
          executeFuncSignature(address executionDataDepositor, bytes executionData)

          Another example: if the target function accepts (address depositor, uint[], address)
          then a function like the following one can be used:

            function prepareDepositData(uint[] calldata uintArray, address addr) view external returns (bytes memory) {
                bytes memory encoded = abi.encode(address(0), uintArray, addr);
                return this.slice(encoded, 32);
            }

          After this, the target contract will get the following:
          executeFuncSignature(address executionDataDepositor, uint[] uintArray, address addr)
     */
  function deposit(bytes32 resourceID, address depositor, bytes calldata data) external view returns (bytes memory) {
    require(data.length >= 76, "Incorrect data length"); // 32 + 2 + 1 + 1 + 20 + 20

    uint256 maxFee;
    uint16 lenExecuteFuncSignature;
    uint8 lenExecuteContractAddress;
    uint8 lenExecutionDataDepositor;
    address executionDataDepositor;

    maxFee = uint256(bytes32(data[:32]));
    lenExecuteFuncSignature = uint16(bytes2(data[32:34]));
    lenExecuteContractAddress = uint8(bytes1(data[34 + lenExecuteFuncSignature:35 + lenExecuteFuncSignature]));
    lenExecutionDataDepositor = uint8(
      bytes1(
        data[35 + lenExecuteFuncSignature + lenExecuteContractAddress:36 +
          lenExecuteFuncSignature +
          lenExecuteContractAddress]
      )
    );
    executionDataDepositor = address(
      uint160(
        bytes20(
          data[36 + lenExecuteFuncSignature + lenExecuteContractAddress:36 +
            lenExecuteFuncSignature +
            lenExecuteContractAddress +
            lenExecutionDataDepositor]
        )
      )
    );

    require(maxFee < MAX_FEE, "requested fee too large");
    require(depositor == executionDataDepositor, "incorrect depositor in deposit data");
  }

  /**
        @notice Proposal execution should be initiated when a proposal is finalized in the Bridge contract.
        @param resourceID ResourceID used to find address of contract to be used for deposit.
        @param data Structure should be constructed as follows:
          maxFee:                             uint256  bytes  0                                                             -  32
          len(executeFuncSignature):          uint16   bytes  32                                                            -  34
          executeFuncSignature:               bytes    bytes  34                                                            -  34 + len(executeFuncSignature)
          len(executeContractAddress):        uint8    bytes  34 + len(executeFuncSignature)                                -  35 + len(executeFuncSignature)
          executeContractAddress              bytes    bytes  35 + len(executeFuncSignature)                                -  35 + len(executeFuncSignature) + len(executeContractAddress)
          len(executionDataDepositor):        uint8    bytes  35 + len(executeFuncSignature) + len(executeContractAddress)  -  36 + len(executeFuncSignature) + len(executeContractAddress)
          executionDataDepositor:             bytes    bytes  36 + len(executeFuncSignature) + len(executeContractAddress)                                -  36 + len(executeFuncSignature) + len(executeContractAddress) + len(executionDataDepositor)
          executionData:                      bytes    bytes  36 + len(executeFuncSignature) + len(executeContractAddress) + len(executionDataDepositor)  -  END

          executionData is repacked together with executionDataDepositor address for using it in the target contract.
          If executionData contains dynamic types then it is necessary to keep the offsets correct.
          executionData should be encoded together with a 32-byte address and then passed as a parameter without that address.
          If the target function accepts (address depositor, bytes executionData)
          then a function like the following one can be used:

            function prepareDepositData(bytes calldata executionData) view external returns (bytes memory) {
                bytes memory encoded = abi.encode(address(0), executionData);
                return this.slice(encoded, 32);
            }

            function slice(bytes calldata input, uint256 position) pure public returns (bytes memory) {
                return input[position:];
            }

          After this, the target contract will get the following:
          executeFuncSignature(address executionDataDepositor, bytes executionData)

          Another example: if the target function accepts (address depositor, uint[], address)
          then a function like the following one can be used:

            function prepareDepositData(uint[] calldata uintArray, address addr) view external returns (bytes memory) {
                bytes memory encoded = abi.encode(address(0), uintArray, addr);
                return this.slice(encoded, 32);
            }

          After this, the target contract will get the following:
          executeFuncSignature(address executionDataDepositor, uint[] uintArray, address addr)
     */
  function executeProposal(bytes32 resourceID, bytes calldata data) external onlyBridge returns (bytes memory) {
    uint256 maxFee;
    uint16 lenExecuteFuncSignature;
    bytes4 executeFuncSignature;
    uint8 lenExecuteContractAddress;
    address executeContractAddress;
    uint8 lenExecutionDataDepositor;
    address executionDataDepositor;
    bytes memory executionData;

    maxFee = uint256(bytes32(data[0:32]));
    lenExecuteFuncSignature = uint16(bytes2(data[32:34]));
    executeFuncSignature = bytes4(data[34:34 + lenExecuteFuncSignature]);
    lenExecuteContractAddress = uint8(bytes1(data[34 + lenExecuteFuncSignature:35 + lenExecuteFuncSignature]));
    executeContractAddress = address(
      uint160(bytes20(data[35 + lenExecuteFuncSignature:35 + lenExecuteFuncSignature + lenExecuteContractAddress]))
    );
    lenExecutionDataDepositor = uint8(
      bytes1(
        data[35 + lenExecuteFuncSignature + lenExecuteContractAddress:36 +
          lenExecuteFuncSignature +
          lenExecuteContractAddress]
      )
    );
    executionDataDepositor = address(
      uint160(
        bytes20(
          data[36 + lenExecuteFuncSignature + lenExecuteContractAddress:36 +
            lenExecuteFuncSignature +
            lenExecuteContractAddress +
            lenExecutionDataDepositor]
        )
      )
    );
    executionData = bytes(data[36 + lenExecuteFuncSignature + lenExecuteContractAddress + lenExecutionDataDepositor:]);

    bytes memory callData = abi.encodePacked(executeFuncSignature, abi.encode(executionDataDepositor), executionData);
    console.log("callData: ");
    console.logBytes(callData);

    (bool success, bytes memory returndata) = executeContractAddress.call{gas: maxFee}(callData);
    return abi.encode(success, returndata);
  }
}
