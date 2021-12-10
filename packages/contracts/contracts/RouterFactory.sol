// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "./interfaces/IRouterFactory.sol";
import "./Router.sol";

contract RouterFactory is IRouterFactory, Ownable {
  /**
   * @dev The stored chain id of the contract, may be passed in to avoid any
   *      evm issues
   */
  uint256 private chainId;

  /**
   * @dev The transaction Manager contract
   */
  ITransactionManager public transactionManager;

  /**
   * @dev Mapping of routerSigner to created Router contract address
   */
  mapping(address => address) public routerAddresses;

  constructor(address _owner) {
    transferOwnership(_owner);
  }

  function init(address _transactionManager) external onlyOwner {
    require(address(_transactionManager) != address(0), "#RF_I:042");

    transactionManager = ITransactionManager(_transactionManager);
    chainId = ITransactionManager(_transactionManager).getChainId();
  }

  /**
   * @notice Allows us to create new router contract
   * @param routerSigner address router signer
   * @param recipient address recipient
   */

  function createRouter(address routerSigner, address recipient) external override returns (address) {
    require(address(transactionManager) != address(0), "#RF_CR:042");

    require(routerSigner != address(0), "#RF_CR:041");

    require(recipient != address(0), "#RF_CR:007");

    address payable router = payable(Create2.deploy(0, generateSalt(routerSigner), getBytecode()));
    Router(router).init(address(transactionManager), chainId, routerSigner, recipient, msg.sender);

    routerAddresses[routerSigner] = router;
    emit RouterCreated(router, routerSigner, recipient, address(transactionManager));
    return router;
  }

  /**
   * @notice Allows us to get the address for a new router contract created via `createRouter`
   * @param routerSigner address router signer
   */
  function getRouterAddress(address routerSigner) external view override returns (address) {
    return Create2.computeAddress(generateSalt(routerSigner), keccak256(getBytecode()));
  }

  ////////////////////////////////////////
  // Internal Methods

  function getBytecode() internal view returns (bytes memory) {
    bytes memory bytecode = type(Router).creationCode;
    return abi.encodePacked(bytecode, abi.encode(address(this)));
  }

  function generateSalt(address routerSigner) internal pure returns (bytes32) {
    return keccak256(abi.encodePacked(routerSigner));
  }
}
