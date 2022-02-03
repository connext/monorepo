// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

import "./Router.sol";

/// @title Multicall - Aggregate results from multiple read-only function calls

contract Multicall {
  struct FulfillRouterContractParams {
    ITransactionManager.FulfillArgs args;
    address routerRelayerFeeAsset;
    uint256 routerRelayerFee;
    bytes signature;
  }

  enum CallType {
    Sender,
    Receiver
  }

  struct FulfillCall {
    address payable target;
    bytes fulfillData;
    CallType callType;
  }

  function aggregateFulfill(FulfillCall[] memory calls)
    public
    returns (uint256 blockNumber, ITransactionManager.TransactionData[] memory returnData)
  {
    blockNumber = block.number;
    returnData = new ITransactionManager.TransactionData[](calls.length);
    for (uint256 i = 0; i < calls.length; i++) {
      if (calls[i].callType == CallType.Sender) {
        FulfillRouterContractParams memory fulfillData = abi.decode(
          calls[i].fulfillData,
          (FulfillRouterContractParams)
        );
        ITransactionManager.TransactionData memory ret = Router(calls[i].target).fulfill(
          fulfillData.args,
          fulfillData.routerRelayerFeeAsset,
          fulfillData.routerRelayerFee,
          fulfillData.signature
        );
        returnData[i] = ret;
      } else {
        ITransactionManager.FulfillArgs memory fulfillData = abi.decode(
          calls[i].fulfillData,
          (ITransactionManager.FulfillArgs)
        );
        ITransactionManager.TransactionData memory ret = ITransactionManager(calls[i].target).fulfill(fulfillData);
        returnData[i] = ret;
      }
    }
  }
}
