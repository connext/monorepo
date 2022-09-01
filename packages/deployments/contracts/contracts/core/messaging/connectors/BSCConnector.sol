// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {IRootManager} from "../interfaces/IRootManager.sol";

import {Connector} from "./Connector.sol";

/**
  @dev interface to interact with multicall (prev anyswap) anycall proxy
       see https://github.com/anyswap/multichain-smart-contracts/blob/main/contracts/anycall/AnyswapV6CallProxy.sol
 */
interface MultichainCall {
  function anyCall(
    address _to,
    bytes calldata _data,
    address _fallback,
    uint256 _toChainID,
    uint256 _flags
  ) external;

  function context()
    external
    view
    returns (
      address from,
      uint256 fromChainID,
      uint256 nonce
    );

  function executor() external view returns (address executor);
}

//AMB: MultichainCall(0xC10Ef9F491C9B59f936957026020C321651ac078) -  Chain agnostic
abstract contract BaseMultichainConnector is Connector {
  address internal immutable executor; // Is != amb, used only to retrieve sender context

  // Mirror chain id
  uint256 internal immutable mirrorChainId;

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    uint256 _mirrorChainId,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _mirrorProcessGas, _processGas, _reserveGas)
  {
    executor = MultichainCall(_amb).executor();
    mirrorChainId = _mirrorChainId;
  }

  // ============ Public Fns ============
  function anyExecute(bytes memory _data) external returns (bool success, bytes memory result) {
    _processMessage(msg.sender, _data); // msg.sender not used
  }

  function _verifySender(address _expected) internal override returns (bool) {
    require(msg.sender == AMB, "!bridge");

    (address from, uint256 fromChainId, ) = MultichainCall(executor).context();
    return from == _expected && fromChainId == mirrorChainId;
  }
}

contract BSCL2Connector is BaseMultichainConnector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    uint256 _mirrorChainId,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    BaseMultichainConnector(
      _domain,
      _mirrorDomain,
     _mirrorChainId,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorProcessGas,
      _processGas,
      _reserveGas
    )
  {}

  // ============ Private fns ============
  /**
   * @dev Sends `outboundRoot` to root manager on l1
   */
  function _sendMessage(bytes memory _data) internal override {
    MultichainCall(AMB).anyCall(
      AMB, // Same address on every chain, using AMB as it is immutable
      _data,
      address(0), // fallback address on origin chain
      mirrorChainId,
      0 // fee paid on origin chain
    );
  }

  /**
   * @dev Handles an incoming `aggregateRoot`
   * NOTE: Could store latest root sent and prove aggregate root
   */
  function _processMessage(
    address, // _sender -- unused
    bytes memory _data
  ) internal override {
    // sanity check: data length
    require(_data.length == 32, "!length");
    // set the outbound root for BSC + access control
    update(bytes32(_data));
  }
}

contract BSCL1Connector is BaseMultichainConnector {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    uint256 _mirrorChainId,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorProcessGas,
    uint256 _processGas,
    uint256 _reserveGas
  )
    BaseMultichainConnector(
      _domain,
      _mirrorDomain,
     _mirrorChainId,
      _amb,
      _rootManager,
      _mirrorConnector,
      _mirrorProcessGas,
      _processGas,
      _reserveGas
    )
  {}

  // ============ Private fns ============
  /**
   * @dev Sends `aggregateRoot` to messaging on l2
   */
  function _sendMessage(bytes memory _data) internal override {
    require(msg.sender == ROOT_MANAGER, "!rootManager"); //TODO: change for custom errors

    MultichainCall(AMB).anyCall(
      AMB, // Same address on every chain, using AMB as it is immutable
      _data,
      address(0), // Fallback address on origin chain
      mirrorChainId,
      0 // pay fees on origin chain
    );

    emit MessageSent(_data, msg.sender);
  }

  /**
   * @dev Handles an incoming `outboundRoot`
   */
  function _processMessage(address, bytes memory _data) internal override {
    // enforce this came from connector on l2
    require(_verifySender(mirrorConnector), "!l2Connector");
    // get the data (should be the outbound root)
    require(_data.length == 32, "!length");
    // set the outbound root for BSC domain
    IRootManager(ROOT_MANAGER).setOutboundRoot(mirrorDomain, bytes32(_data));
  }
}
