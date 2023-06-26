// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {AxelarSpokeConnector} from "../../../../contracts/messaging/connectors/axelar/AxelarSpokeConnector.sol";
import {AxelarExecutable, IAxelarGateway, IAxelarGasService, StringToAddress, AddressToString} from "../../../../contracts/messaging/connectors/axelar/BaseAxelar.sol";

import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract AxelarSpokeConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;
  using StringToAddress for string;
  using AddressToString for address;
  using AddressToString for address payable;

  event AggregateRootReceived(bytes32 root);

  // ============ Storage ============
  string public BNB_CHAIN_ID = "binance";
  string public MAINNET_CHAIN_ID = "Ethereum";

  address _gasReceiver = address(bytes20(keccak256("_gasReceiver")));

  // ============ Test set up ============
  function setUp() public {
    // Allow future contract mock
    vm.etch(_amb, new bytes(0x42));
    vm.etch(_rootManager, new bytes(0x42));

    // Get the n+1 deployment address
    _l1Connector = payable(address(123123123123));

    _merkle = address(new MerkleTreeManager());

    bytes memory axelarParams = abi.encode(_gasReceiver, MAINNET_CHAIN_ID);

    // Deploy
    vm.prank(_owner);
    _l2Connector = payable(
      address(
        new AxelarSpokeConnector(
          _l2Domain,
          _l1Domain,
          _amb,
          _rootManager,
          _l1Connector,
          _processGas,
          _reserveGas,
          0, // uint256 _delayBlocks
          _merkle,
          address(1), // watcher manager
          axelarParams
        )
      )
    );
    assertEq(_owner, AxelarSpokeConnector(_l2Connector).owner());
  }

  // ============ sendMessage ============
  // Happy path L2
  function test_AxelarSpokeConnector_sendMessage_sendMessageAndEmitEvent() public {
    bytes memory _data = abi.encode(AxelarSpokeConnector(_l2Connector).outboundRoot());
    string memory mirrorConnectorStr = _l1Connector.toString();

    // Mock the call to fees
    vm.mockCall(
      _gasReceiver,
      abi.encodeCall(
        IAxelarGasService.payNativeGasForContractCall,
        (_l2Connector, MAINNET_CHAIN_ID, mirrorConnectorStr, _data, _owner)
      ),
      abi.encode()
    );

    // Mock the call to callContract
    vm.mockCall(
      _amb,
      abi.encodeCall(IAxelarGateway.callContract, (MAINNET_CHAIN_ID, mirrorConnectorStr, _data)),
      abi.encode()
    );

    // Check: call to fees?
    vm.expectCall(
      _gasReceiver,
      1,
      abi.encodeCall(
        IAxelarGasService.payNativeGasForContractCall,
        (_l2Connector, MAINNET_CHAIN_ID, mirrorConnectorStr, _data, _owner)
      )
    );

    // Check: call to axelar contractCall?
    vm.expectCall(_amb, abi.encodeCall(IAxelarGateway.callContract, (MAINNET_CHAIN_ID, mirrorConnectorStr, _data)));

    AxelarSpokeConnector(_l2Connector).send{value: 1}(bytes(""));
  }

  // ============ processMessage ============

  // msg.sender is not the bridge on L2
  function test_AxelarSpokeConnector_processMessage_revertIfSourceChainNotMirror(
    bytes32 commandId,
    address _anySourceAddress,
    bytes calldata _data
  ) public {
    vm.assume(_anySourceAddress != _l1Connector);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));

    bytes32 payloadHash = keccak256(_dataCorrectSize);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, "NotMainnet", _anySourceAddress.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    vm.expectRevert(abi.encodePacked("!source chain"));
    AxelarSpokeConnector(_l2Connector).execute(commandId, "NotMainnet", _anySourceAddress.toString(), _dataCorrectSize);
  }

  // message coming from a wrong sender on the origin chain to L2
  function test_AxelarSpokeConnector_processMessage_revertIfWrongMirror(
    bytes32 commandId,
    address _wrongMirror,
    bytes calldata _data
  ) public {
    vm.assume(_wrongMirror != _l1Connector);

    // Resize fuzzed bytes to 32 bytes long
    bytes memory _dataCorrectSize = abi.encodePacked(bytes32(_data));
    bytes32 payloadHash = keccak256(_dataCorrectSize);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, MAINNET_CHAIN_ID, _wrongMirror.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    vm.expectRevert(abi.encodePacked("!mirrorConnector"));
    AxelarSpokeConnector(_l2Connector).execute(commandId, MAINNET_CHAIN_ID, _wrongMirror.toString(), _dataCorrectSize);
  }

  // message has a length > 32 bytes
  function test_AxelarSpokeConnector_processMessage_revertIfWrongDataLength(
    bytes32 commandId,
    uint8 callDataLength
  ) public {
    vm.assume(callDataLength != 32);

    // Insert mock data in the payload
    bytes memory _wrongLengthCalldata = new bytes(callDataLength);
    for (uint256 i; i < callDataLength; i++) _wrongLengthCalldata[i] = bytes1(keccak256(abi.encode(i)));

    bytes32 payloadHash = keccak256(_wrongLengthCalldata);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, MAINNET_CHAIN_ID, _l1Connector.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    vm.expectRevert(abi.encodePacked("!length"));
    AxelarSpokeConnector(_l2Connector).execute(
      commandId,
      MAINNET_CHAIN_ID,
      _l1Connector.toString(),
      _wrongLengthCalldata
    );
  }

  // message has a length > 32 bytes
  function test_AxelarSpokeConnector_processMessage_shouldWork(bytes32 commandId) public {
    bytes memory _data = abi.encode(bytes32("0x1234"));

    bytes32 payloadHash = keccak256(_data);
    vm.mockCall(
      _amb,
      abi.encodeCall(
        IAxelarGateway.validateContractCall,
        (commandId, MAINNET_CHAIN_ID, _l1Connector.toString(), payloadHash)
      ),
      abi.encode(true)
    );

    vm.expectEmit(true, false, false, true);
    emit AggregateRootReceived(bytes32(_data));

    AxelarSpokeConnector(_l2Connector).execute(commandId, MAINNET_CHAIN_ID, _l1Connector.toString(), _data);
  }
}
