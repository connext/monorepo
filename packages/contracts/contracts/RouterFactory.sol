// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "./interfaces/IRouterFactory.sol";
import "./interfaces/ITransactionManager.sol";
import "./Router.sol";

contract RouterFactory is IRouterFactory, Ownable {
  /**
   * @dev The stored chain id of the contract, may be passed in to avoid any
   *      evm issues
   */
  uint256 private immutable chainId;

  /**
   * @dev The transaction Manager contract
   */
  ITransactionManager public transactionManager;

  /**
   * @dev Mapping of routerSigner to created Router contract address
   */
  mapping(address => address) public routerAddresses;

  constructor(address _transactionManager, uint256 _chainId) {
    chainId = _chainId;
    transactionManager = ITransactionManager(_transactionManager);
  }

  function setTransactionManager(address _transactionManager) external onlyOwner {
    transactionManager = ITransactionManager(_transactionManager);
  }

  /**
   * @notice Allows us to create new router contract
   * @param routerSigner address router signer
   * @param recipient address recipient
   */

  function createRouter(address routerSigner, address recipient) external override returns (address) {
    address router = Create2.deploy(0, generateSalt(routerSigner), getBytecode(routerSigner, recipient, msg.sender));

    routerAddresses[routerSigner] = router;
    emit RouterCreated(router, routerSigner, recipient, msg.sender, address(transactionManager));
    return router;
  }

  /**
   * @notice Allows us to get the address for a new router contract created via `createRouter`
   * @param routerSigner address router signer
   * @param recipient address recipient
   * @param owner address router contract owner
   */
  function getRouterAddress(
    address routerSigner,
    address recipient,
    address owner
  ) external view returns (address) {
    return Create2.computeAddress(generateSalt(routerSigner), keccak256(getBytecode(routerSigner, recipient, owner)));
  }

  ////////////////////////////////////////
  // Internal Methods

  function getBytecode(
    address routerSigner,
    address recipient,
    address owner
  ) internal view returns (bytes memory) {
    bytes memory bytecode = type(Router).creationCode;

    return abi.encodePacked(bytecode, abi.encode(address(transactionManager), routerSigner, recipient, owner, chainId));
  }

  function generateSalt(address routerSigner) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(routerSigner));
  }
}
