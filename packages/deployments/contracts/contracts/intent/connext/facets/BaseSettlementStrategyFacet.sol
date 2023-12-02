// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract BaseSettlementStrategyFacet {
  function handleXCallSettlement() internal // TODO
  {
    /**
     * handleXCallSettlement steps:
     * 1. Wrapping tokens if needed
     * 2. Transferring tokens into contract
     * 3. Burning/etc. tokens if needed
     * 4. Prepare & return the message to be sent via msg layer (this can be empty for cases like CCTP and Frax Ferry where no message is needed)
     */
  }

  function handleReconcileSettlement() internal // TODO
  {
    /**
     * handleReconcileSettlement steps:
     * 1. Call a mint funtion on an external contract if needed
     * NOTE: for the base strategy, we simply credit the router. Maybe should implement sanity checks that contract has enough balance here?
     */
  }
}
