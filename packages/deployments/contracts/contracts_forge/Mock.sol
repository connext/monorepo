// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../contracts/nomad-xapps/contracts/promise-router/PromiseRouter.sol";
import "../contracts/interfaces/ICallback.sol";

contract MockHome {
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external {
    1 == 1;
  }
}

contract MockConnext {
  function claim(address _recipient, bytes32[] calldata _transferIds) external {
    1 == 1;
  }
}

contract MockRelayerFeeRouter {
  function send(
    uint32 _domain,
    address _recipient,
    bytes32[] calldata _transactionIds
  ) external {
    1 == 1;
  }
}

contract MockPromiseRouter is PromiseRouter {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  function mockHandle(
    address callbackAddress,
    bool returnSuccess,
    bytes calldata returnData
  ) public {
    bytes32 transferId = "A";

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, returnSuccess, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    promiseMessages[transferId] = message;
  }
}

contract MockCallback is ICallback {
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external {
    require(data.length != 0);
  }
}
