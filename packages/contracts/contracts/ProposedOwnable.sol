// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

/**
 * @title ProposedOwnable
 * @notice Contract module which provides a basic access control mechanism, 
 * where there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed via a two step process:
 * 1. Call `proposeOwner`
 * 2. Wait out the delay period
 * 3. Call `acceptOwner`
 *
 * @dev This module is used through inheritance. It will make available the 
 * modifier `onlyOwner`, which can be applied to your functions to restrict 
 * their use to the owner.
 * 
 * @dev The majority of this code was taken from the openzeppelin Ownable 
 * contract
 *
 */
abstract contract ProposedOwnable {
  address private _owner;

  address private _proposed;
  uint256 private _proposedOwnershipTimestamp;

  bool private _routerOwnershipRenounced;
  uint256 private _routerOwnershipTimestamp;

  bool private _assetOwnershipRenounced;
  uint256 private _assetOwnershipTimestamp;

  uint256 private constant _delay = 7 days;

  event RouterOwnershipRenunciationProposed(uint256 timestamp);

  event RouterOwnershipRenounced(bool renounced);

  event AssetOwnershipRenunciationProposed(uint256 timestamp);

  event AssetOwnershipRenounced(bool renounced);

  event OwnershipProposed(address indexed proposedOwner);

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  /**
    * @notice Initializes the contract setting the deployer as the initial 
    * owner.
    */
  constructor() {
    _setOwner(msg.sender);
  }

  /**
    * @notice Returns the address of the current owner.
    */
  function owner() public view virtual returns (address) {
    return _owner;
  }

  /**
    * @notice Returns the address of the proposed owner.
    */
  function proposed() public view virtual returns (address) {
    return _proposed;
  }

  /**
    * @notice Returns the address of the proposed owner.
    */
  function proposedTimestamp() public view virtual returns (uint256) {
    return _proposedOwnershipTimestamp;
  }

  /**
    * @notice Returns the timestamp when router ownership was last proposed to be renounced
    */
  function routerOwnershipTimestamp() public view virtual returns (uint256) {
    return _routerOwnershipTimestamp;
  }

  /**
    * @notice Returns the timestamp when asset ownership was last proposed to be renounced
    */
  function assetOwnershipTimestamp() public view virtual returns (uint256) {
    return _assetOwnershipTimestamp;
  }

  /**
    * @notice Returns the delay period before a new owner can be accepted.
    */
  function delay() public view virtual returns (uint256) {
    return _delay;
  }

  /**
    * @notice Throws if called by any account other than the owner.
    */
  modifier onlyOwner() {
      require(_owner == msg.sender, "#OO:029");
      _;
  }

  /**
    * @notice Throws if called by any account other than the proposed owner.
    */
  modifier onlyProposed() {
      require(_proposed == msg.sender, "#OP:035");
      _;
  }

  /** 
    * @notice Indicates if the ownership of the router whitelist has
    * been renounced
    */
  function isRouterOwnershipRenounced() public view returns (bool) {
    return _owner == address(0) || _routerOwnershipRenounced;
  }

  /** 
    * @notice Indicates if the ownership of the router whitelist has
    * been renounced
    */
  function proposeRouterOwnershipRenunciation() public virtual onlyOwner {
    require(!_routerOwnershipRenounced, "#PROR:036");
    _setRouterOwnershipTimestamp();
  }

  /** 
    * @notice Indicates if the ownership of the asset whitelist has
    * been renounced
    */
  function renounceRouterOwnership() public virtual onlyOwner {
    require(!_routerOwnershipRenounced, "#RRO:036");
    require((block.timestamp - _routerOwnershipTimestamp) > _delay, "#RRO:030");
    _setRouterOwnership(true);
  }

  /** 
    * @notice Indicates if the ownership of the asset whitelist has
    * been renounced
    */
  function isAssetOwnershipRenounced() public view returns (bool) {
    return _owner == address(0) || _assetOwnershipRenounced;
  }

  /** 
    * @notice Indicates if the ownership of the asset whitelist has
    * been renounced
    */
  function proposeAssetOwnershipRenunciation() public virtual onlyOwner {
    require(!_assetOwnershipRenounced, "#PAOR:036");
    _setAssetOwnershipTimestamp();
  }

  /** 
    * @notice Indicates if the ownership of the asset whitelist has
    * been renounced
    */
  function renounceAssetOwnership() public virtual onlyOwner {
    require(!_assetOwnershipRenounced, "#RAO:036");
    require((block.timestamp - _assetOwnershipTimestamp) > _delay, "#RAO:030");
    _setAssetOwnership(true);
  }

  /** 
    * @notice Indicates if the ownership has been renounced() by
    * checking if current owner is address(0)
    */
  function renounced() public view returns (bool) {
    return owner() == address(0);
  }

  /**
    * @notice Sets the timestamp for an owner to be proposed, and sets the
    * newly proposed owner as step 1 in a 2-step process
   */
  function proposeNewOwner(address newlyProposed) public virtual onlyOwner {
    _setProposed(newlyProposed);
  }

  /**
    * @notice Renounces ownership of the contract after a delay
    */
  function renounceOwnership() public virtual onlyOwner {
    require((block.timestamp - _proposedOwnershipTimestamp) > _delay, "#APO:030");
    require(_proposed == address(0), "#APO:036");
    _setOwner(_proposed);
  }

  /**
    * @notice Transfers ownership of the contract to a new account (`newOwner`).
    * Can only be called by the current owner.
    */
  function acceptProposedOwner() public virtual onlyProposed {
    require((block.timestamp - _proposedOwnershipTimestamp) > _delay, "#APO:030");
    _setOwner(_proposed);
  }

  ////// INTERNAL //////

  function _setRouterOwnershipTimestamp() private {
    _routerOwnershipTimestamp = block.timestamp;
    emit RouterOwnershipRenunciationProposed(_routerOwnershipTimestamp);
  }

  function _setRouterOwnership(bool value) private {
    _routerOwnershipRenounced = value;
    emit RouterOwnershipRenounced(value);
  }

  function _setAssetOwnershipTimestamp() private {
    _assetOwnershipTimestamp = block.timestamp;
    emit AssetOwnershipRenunciationProposed(_assetOwnershipTimestamp);
  }

  function _setAssetOwnership(bool value) private {
    _assetOwnershipRenounced = value;
    emit AssetOwnershipRenounced(value);
  }

  function _setOwner(address newOwner) private {
    address oldOwner = _owner;
    _owner = newOwner;
    emit OwnershipTransferred(oldOwner, newOwner);
  }

  function _setProposed(address newlyProposed) private {
    _proposedOwnershipTimestamp = block.timestamp;
    _proposed = newlyProposed;
    emit OwnershipProposed(_proposed);
  }
}