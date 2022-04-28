// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;


import "../interfaces/ISponsorVault.sol";
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

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

  function reimburseLiquidityFees(address adopted, uint256 amount) external override returns (uint256) {
    IERC20Upgradeable(adopted).transfer(msg.sender, liquidityFeeToSend);
    return liquidityFeeToReturn;
  }

  function reimburseRelayerFees(uint32 originDomain, address payable to, uint256 relayerFee) external override {
    to.call{value: relayerFeeToSend}("");
  }

}
