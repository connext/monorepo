// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

interface ISettlementStrategy {
  function handleXCallSettlement(

  ) external; // TODO return message 

  function handleExecuteSettlement(
    
  ) external;

  function handleReconcileSettlement(

  ) external;
}
