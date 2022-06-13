// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

import "../core/connext/interfaces/ISponsorVault.sol";

contract TestSponsorVault is ISponsorVault {
  uint256 liquidityFeeToSend;
  uint256 liquidityFeeToReturn;
  uint256 relayerFeeToSend;

  receive() external payable {}

  function setFeeValues(
    uint256 _liquidityFeeToSend,
    uint256 _liquidityFeeToReturn,
    uint256 _relayerFeeToSend
  ) external {
    liquidityFeeToSend = _liquidityFeeToSend;
    liquidityFeeToReturn = _liquidityFeeToReturn;
    relayerFeeToSend = _relayerFeeToSend;
  }

  function reimburseLiquidityFees(
    address adopted,
    uint256 amount,
    address receiver
  ) external override returns (uint256) {
    IERC20Upgradeable(adopted).transfer(msg.sender, liquidityFeeToSend);
    return liquidityFeeToReturn;
  }

  function reimburseRelayerFees(
    uint32 originDomain,
    address payable to,
    uint256 relayerFee
  ) external override {
    to.call{value: relayerFeeToSend}("");
  }

  function deposit(address _token, uint256 _amount) external payable {}

  // Should allow the owner of the vault to withdraw funds put in to a given
  // address
  function withdraw(
    address token,
    address receiver,
    uint256 amount
  ) external {}
}
