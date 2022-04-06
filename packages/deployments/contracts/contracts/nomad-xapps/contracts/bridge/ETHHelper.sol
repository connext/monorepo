// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {BridgeRouter} from "./BridgeRouter.sol";
import {IWeth} from "../../interfaces/bridge/IWeth.sol";
// ============ External Imports ============
import {TypeCasts} from "../../../nomad-core/contracts/XAppConnectionManager.sol";

contract ETHHelper {
  // ============ Immutables ============

  // wrapped Ether contract
  IWeth public immutable weth;
  // bridge router contract
  BridgeRouter public immutable bridge;

  // ======== Events =========

  /**
   * @notice emitted when Ether is sent from this domain to another domain
   * @param from the address sending tokens
   */
  event Send(address indexed from);

  // ============ Constructor ============

  constructor(address _weth, address payable _bridge) {
    weth = IWeth(_weth);
    bridge = BridgeRouter(_bridge);
    IWeth(_weth).approve(_bridge, uint256(0));
  }

  // ============ External Functions ============

  /**
   * @notice Sends ETH over the Nomad Bridge. Sends to a full-width Nomad
   * identifer on the other side.
   * @dev As with all bridges, improper use may result in loss of funds.
   * @param _domain The domain to send funds to.
   * @param _to The 32-byte identifier of the recipient
   * @param _enableFast True to enable fast liquidity
   */
  function sendTo(
    uint32 _domain,
    bytes32 _to,
    bool _enableFast
  ) public payable {
    // wrap ETH to WETH
    weth.deposit{value: msg.value}();
    // send WETH via bridge
    // bridge.send([address(weth), address(0), address(0)], [msg.value, 0, 0], _domain, _to, _enableFast, bytes32(0), bytes32(0));
    // emit event indicating the original sender of tokens
    emit Send(msg.sender);
  }

  /**
   * @notice Sends ETH over the Nomad Bridge. Sends to the same address on
   * the other side.
   * @dev WARNING: This function should only be used when sending TO an
   * EVM-like domain. As with all bridges, improper use may result in loss of
   * funds.
   * @param _domain The domain to send funds to
   * @param _enableFast True to enable fast liquidity
   */
  function send(uint32 _domain, bool _enableFast) external payable {
    sendTo(_domain, TypeCasts.addressToBytes32(msg.sender), _enableFast);
  }

  /**
   * @notice Sends ETH over the Nomad Bridge. Sends to a specified EVM
   * address on the other side.
   * @dev This function should only be used when sending TO an EVM-like
   * domain. As with all bridges, improper use may result in loss of funds
   * @param _domain The domain to send funds to.
   * @param _to The EVM address of the recipient
   * @param _enableFast True to enable fast liquidity
   */
  function sendToEVMLike(
    uint32 _domain,
    address _to,
    bool _enableFast
  ) external payable {
    sendTo(_domain, TypeCasts.addressToBytes32(_to), _enableFast);
  }
}
