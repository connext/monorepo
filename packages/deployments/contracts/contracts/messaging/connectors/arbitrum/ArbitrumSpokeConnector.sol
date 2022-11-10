// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {LibArbitrumL2} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IRootManager} from "../../interfaces/IRootManager.sol";
import {ArbitrumL2Amb} from "../../interfaces/ambs/arbitrum/ArbitrumL2Amb.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

contract ArbitrumSpokeConnector is SpokeConnector {
  // ============ Events ============
  /**
   * @notice Emitted when funds are withdrawn by the admin
   * @dev See comments in `withdrawFunds`
   * @param to The recipient of the funds
   * @param amount The amount withdrawn
   */
  event FundsWithdrawn(address indexed to, uint256 amount);

  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {}

  // ============ Receivable ============
  receive() external payable {}

  // ============ Admin fns ============

  /**
   * @notice This function should be callable by owner, and send funds to the
   * provided recipient.
   * @dev Retryables require an address on L2 that can receive funds from gas
   * submission refunds and value refunds. The hub connector will use this address
   * as the beneficiary.
   *
   * Withdraws the entire balance of the contract.
   *
   * @param _to The recipient of the funds withdrawn
   */
  function withdrawFunds(address _to) public onlyOwner {
    uint256 amount = address(this).balance;
    Address.sendValue(payable(_to), amount);
    emit FundsWithdrawn(_to, amount);
  }

  // ============ Private fns ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL2.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Send to L1
    ArbitrumL2Amb(AMB).sendTxToL1(mirrorConnector, _calldata);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    receiveAggregateRoot(bytes32(_data));
  }
}
