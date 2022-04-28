// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface ISponsorVault {
  // Should be callable by the Connext contract only. Should:
  // - call `addLiquidityFor` to send the calculated fee to the router
  // - return the amount of liquidity router was reimbursed
  function reimburseLiquidityFees(address adopted, uint256 amount) external returns (uint256);

  // Should be callable by the Connext contract only. Should:
  // - take in an amount of relayer fee specified on origin chain
  // - convert that amount to destination domain gas
  // - send the user the destination domain gas
  // -
  function reimburseRelayerFees(uint32 originDomain, address payable to, uint256 relayerFee) external;
}
