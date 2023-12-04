// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {BaseSygma, IConnector} from "../../../../../contracts/messaging/connectors/sygma/BaseSygma.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";

contract BaseSygmaForTest is BaseSygma {
  constructor(
    address _amb,
    address _permissionlessHandler,
    uint256 _gasCap
  ) BaseSygma(_amb, _permissionlessHandler, _gasCap) {}

  function forTest_checkDataLength(bytes memory _data) public pure returns (bool _validLength) {
    _validLength = _checkDataLength(_data);
  }
}

contract Base is ConnectorHelper {
  bytes32 internal constant _PERMISSIONLESS_HANDLER_ID = bytes32(0);
  uint256 internal constant _ROOT_LENGTH = 32;
  uint8 internal constant _ADDRESS_LEN = 20;
  address internal constant _ZERO_ADDRESS = address(0);
  uint16 internal constant _FUNCTION_SIG_LEN = uint16(4);
  bytes4 internal constant _FUNCTION_SIG = IConnector.receiveMessage.selector;

  IBridge public bridge = IBridge(makeAddr("Bridge"));
  BaseSygmaForTest public baseSygma;
  address user = makeAddr("user");
  address permissionlessHandler = makeAddr("permissionlessHandler");

  function setUp() public {
    baseSygma = new BaseSygmaForTest(address(bridge), permissionlessHandler, _gasCap);
  }
}

contract Unit_Connector_BaseSygma_Deployment is Base {
  function test_constants() public {
    assertEq(baseSygma.PERMISSIONLESS_HANDLER_ID(), _PERMISSIONLESS_HANDLER_ID);
    assertEq(baseSygma.ROOT_LENGTH(), _ROOT_LENGTH);
    assertEq(baseSygma.ADDRESS_LEN(), _ADDRESS_LEN);
    assertEq(baseSygma.ZERO_ADDRESS(), _ZERO_ADDRESS);
    assertEq(baseSygma.FUNCTION_SIG_LEN(), _FUNCTION_SIG_LEN);
    assertEq(baseSygma.FUNCTION_SIG(), _FUNCTION_SIG);
  }

  function test_constructorArgs() public {
    assertEq(address(baseSygma.SYGMA_BRIDGE()), address(bridge));
    assertEq(baseSygma.PERMISSIONLESS_HANDLER(), permissionlessHandler);
    assertEq(baseSygma.gasCap(), _gasCap);
  }
}

contract Unit_Connector_BaseSygma_ParseDepositData is Base {
  function sliceHelper(bytes calldata input, uint256 position) public pure returns (bytes memory _slicedData) {
    _slicedData = input[position:];
  }

  function test_parseDepositData(bytes32 _root, address _mirrorConnector) public {
    bytes memory _message = abi.encode(_ZERO_ADDRESS, _root);
    _message = this.sliceHelper(_message, _ROOT_LENGTH);
    bytes memory _expectedDepositData = abi.encodePacked(
      _gasCap,
      _FUNCTION_SIG_LEN,
      _FUNCTION_SIG, // TODO -> check this could break things
      _ADDRESS_LEN,
      _mirrorConnector,
      _ADDRESS_LEN,
      address(baseSygma),
      _message
    );

    bytes memory _depositData = baseSygma.parseDepositData(_root, _mirrorConnector);
    assertEq(_depositData, _expectedDepositData);
  }
}

contract Unit_Connector_BaseSygma_Slice is Base {
  function test_sliceInput(bytes calldata _input, uint256 _position) public {
    vm.assume(_input.length >= _position);
    bytes memory _expectedSlicedData = _input[_position:];
    bytes memory _slicedData = baseSygma.slice(_input, _position);
    assertEq(_slicedData, _expectedSlicedData);
  }
}

contract Unit_Connector_BaseSygma_CheckDataLength is Base {
  function test_returnFalse(bytes memory _data) public {
    vm.assume(_data.length != baseSygma.ROOT_LENGTH());
    bool _validLength = baseSygma.forTest_checkDataLength(_data);
    assertEq(_validLength, false);
  }

  function test_returnTrue(bytes32 _root) public {
    bytes memory _data = abi.encode(_root);
    bool _validLength = baseSygma.forTest_checkDataLength(_data);
    assertEq(_validLength, true);
  }
}
