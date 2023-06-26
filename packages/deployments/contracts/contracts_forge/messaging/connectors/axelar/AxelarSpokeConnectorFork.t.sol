// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {MultichainSpokeConnector, SpokeConnector} from "../../../../contracts/messaging/connectors/multichain/MultichainSpokeConnector.sol";
import {AxelarSpokeConnector} from "../../../../contracts/messaging/connectors/axelar/AxelarSpokeConnector.sol";
import {MerkleLib, ProposedOwnable} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {BridgeFacet} from "../../../../contracts/core/connext/facets/BridgeFacet.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";
import "forge-std/console.sol";
import "forge-std/StdJson.sol";

contract AxelarSpokeConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;
  using stdJson for string;
  using MerkleLib for MerkleLib.Tree;

  struct Proof {
    bytes index;
    bytes message;
    bytes32[] path;
  }

  struct RawMessageForProcess {
    bytes index;
    bytes32[] path;
    Proof[] proofs;
    bytes32 root;
  }

  struct MessageForProcess {
    uint256 index;
    bytes32[32] path;
    SpokeConnector.Proof[] proofs;
    bytes32 root;
  }

  // ============ Storage ============
  uint256 bnbFork;

  address public immutable BNB_MULTICHAIN_SPOKE_CONNECTOR = 0x126A99af70eC62921C07E67943aCF61bF304Ef55;
  address public immutable BNB_CONNEXT = 0xCd401c10afa37d641d2F594852DA94C700e4F2CE;
  uint256 public FORK_BlOCK_NUMBER = 29350893; // Last 0x62a9417e67f577cb13478856a18f6835368f7e4b010b06ecc2e5d915a49dce40 AggregateRootReceived event

  uint32 public immutable BNB_DOMAIN = 6450786;
  uint32 public immutable MAINNET_DOMAIN = 6648936;
  address public immutable AXELAR_GATEWAY = 0x304acf330bbE08d1e512eefaa92F6a57871fD895;
  address public immutable AXELAR_GAS_RECEIVER = 0x2d5d7d31F671F86C782533cc367F14109a082712;
  string public BNB_CHAIN_ID = "binance";
  string public MAINNET_CHAIN_ID = "Ethereum";
  address public immutable ROOT_MANAGER = 0xd5d61E9dfb6680Cba8353988Ba0337802811C2e1;
  address public immutable MIRROR_CONNECTOR = 0x0000000000000000000000000000000000000000;
  uint256 public immutable DELAY_BLOCKS = 0;

  MultichainSpokeConnector multichainSpokeConnector;
  AxelarSpokeConnector axelarSpokeConnector;

  string public messagesJson;

  // ============ Test set up ============
  function setUp() public {
    messagesJson = vm.readFile(
      string.concat(vm.projectRoot(), "/contracts_forge/messaging/connectors/axelar/messages.json")
    );
  }

  function utils_setupBNBFork(uint256 blockNumber) public {
    string memory BNB_RPC_URL = "https://bsc-dataseed.binance.org/"; //vm.envString("BNB_RPC_URL");
    bnbFork = vm.createSelectFork(BNB_RPC_URL, blockNumber);

    multichainSpokeConnector = MultichainSpokeConnector(payable(BNB_MULTICHAIN_SPOKE_CONNECTOR));

    bytes memory axelarParams = abi.encode(AXELAR_GAS_RECEIVER, BNB_CHAIN_ID);

    // Deploy
    vm.startPrank(_owner);
    axelarSpokeConnector = new AxelarSpokeConnector(
      BNB_DOMAIN,
      MAINNET_DOMAIN,
      AXELAR_GATEWAY,
      ROOT_MANAGER,
      MIRROR_CONNECTOR,
      _processGas,
      _reserveGas,
      DELAY_BLOCKS,
      address(multichainSpokeConnector.MERKLE()),
      address(multichainSpokeConnector.watcherManager()),
      axelarParams
    );
    vm.stopPrank();
    assertEq(_owner, axelarSpokeConnector.owner());
  }

  function utils_rawToMessage(RawMessageForProcess memory rawMessage) internal pure returns (MessageForProcess memory) {
    MessageForProcess memory m;
    m.index = bytesToUint(rawMessage.index);
    m.root = rawMessage.root;
    bytes32[32] memory path;
    for (uint256 i = 0; i < 32; i++) {
      path[i] = rawMessage.path[i];
    }

    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](rawMessage.proofs.length);
    for (uint256 i = 0; i < rawMessage.proofs.length; i++) {
      bytes32[32] memory path2;
      for (uint256 j = 0; j < 32; j++) {
        path2[j] = rawMessage.proofs[i].path[j];
      }

      proofs[i] = SpokeConnector.Proof({
        index: bytesToUint(rawMessage.proofs[i].index),
        message: rawMessage.proofs[i].message,
        path: path2
      });
    }
    m.path = path;
    m.proofs = proofs;

    return m;
  }

  function utils_readMessageFromJson(string memory json, uint256 index) public pure returns (MessageForProcess memory) {
    string memory key = string(abi.encodePacked(".messages[", vm.toString(index), "]"));
    RawMessageForProcess memory rawMessage = abi.decode(json.parseRaw(key), (RawMessageForProcess));
    return utils_rawToMessage(rawMessage);
  }

  function utils_calculateMessageRoot(
    bytes32 _messageHash,
    bytes32[32] memory _messagePath,
    uint256 _messageIndex
  ) internal view returns (bytes32) {
    // Ensure that the given message has not already been proven and processed.
    //require(messages[_messageHash] == MessageStatus.None, "!MessageStatus.None");

    // Calculate the expected inbound root from the message origin based on the proof.
    // NOTE: Assuming a valid message was submitted with correct path/index, this should be an inbound root
    // that the hub has received. If the message were invalid, the root calculated here would not exist in the
    // aggregate root.
    return MerkleLib.branchRoot(_messageHash, _messagePath, _messageIndex);
  }

  // ============ processMessage ============

  // can't prove old messages on new connector
  function test_AxelarSpokeConnector_processMessage_revertIfAggregateRootNotExist() public {
    utils_setupBNBFork(FORK_BlOCK_NUMBER);
    MessageForProcess memory message = utils_readMessageFromJson(messagesJson, 0);

    bytes32 messageHash = keccak256(message.proofs[0].message);

    // this message should be Processed status on multichain connector
    SpokeConnector.MessageStatus status = multichainSpokeConnector.messages(messageHash);
    assertEq(status == SpokeConnector.MessageStatus.Processed, true);

    // try to prove on axelar connector again
    vm.expectRevert(bytes("aggregateRoot !exist"));
    axelarSpokeConnector.proveAndProcess(message.proofs, message.root, message.path, message.index);
  }

  function test_AxelarSpokeConnector_processMessage_revertIfNotCurrentAggregateRoot() public {
    utils_setupBNBFork(FORK_BlOCK_NUMBER);
    MessageForProcess memory message = utils_readMessageFromJson(messagesJson, 0);

    bytes32 messageHash = keccak256(message.proofs[0].message);

    // this message should be Processed status on multichain connector
    SpokeConnector.MessageStatus status = multichainSpokeConnector.messages(messageHash);
    assertEq(status == SpokeConnector.MessageStatus.Processed, true);

    // try to prove on axelar connector again
    // manually write aggregated root
    stdstore
      .target(address(axelarSpokeConnector))
      .sig("pendingAggregateRoots(bytes32)")
      .with_key(message.root)
      .checked_write(100);
    assertEq(axelarSpokeConnector.pendingAggregateRoots(message.root), 100);

    // should revert because that is not current aggregate root
    vm.expectRevert(bytes("invalid inboundRoot"));

    axelarSpokeConnector.proveAndProcess(message.proofs, message.root, message.path, message.index);
  }

  function test_AxelarSpokeConnector_processMessage_successIfAggregateRootIsCorrect() public {
    // use last aggregated root at block number 29350893
    // https://bscscan.com/tx/0x2590a525a2ab011ea1d1bd7c2e0c8b1b33deb47b7cb191bd87be9d1036273deb
    // ^^ tx is the `proveAndProcess` tx at 29351315 block.
    utils_setupBNBFork(29351314);

    // use `proveAndProcess` params which used above tx.
    // So if this connector received the latest aggregate root from rootManager, it should process properly
    MessageForProcess memory message = utils_readMessageFromJson(messagesJson, 1);

    bytes32 messageHash = keccak256(message.proofs[0].message);
    bytes32 _messageRoot = utils_calculateMessageRoot(messageHash, message.proofs[0].path, message.proofs[0].index);
    bytes32 _calculatedAggregateRoot = utils_calculateMessageRoot(_messageRoot, message.path, message.index);
    assertEq(message.root, _calculatedAggregateRoot);

    // try to prove on axelar connector
    // manually write aggregated root
    stdstore
      .target(address(axelarSpokeConnector))
      .sig("pendingAggregateRoots(bytes32)")
      .with_key(message.root)
      .checked_write(100);

    assertEq(axelarSpokeConnector.pendingAggregateRoots(message.root), 100);

    // setXAppConnectionManager manually
    vm.prank(ProposedOwnable(BNB_CONNEXT).owner());
    BridgeFacet(BNB_CONNEXT).setXAppConnectionManager(address(axelarSpokeConnector));

    axelarSpokeConnector.proveAndProcess(message.proofs, message.root, message.path, message.index);

    assertEq(uint(axelarSpokeConnector.messages(messageHash)), uint(SpokeConnector.MessageStatus.Processed));
  }
}
