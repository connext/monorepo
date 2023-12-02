// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IDiamondCut} from "./IDiamondCut.sol";
import {IDiamondLoupe} from "./IDiamondLoupe.sol";

interface ISettlementStrategy is IDiamondLoupe, IDiamondCut {
  function handleXCallSettlement() external; // TODO return Message ?

  function handleReconcileSettlement() external; // TODO return type?
}
