// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {MockProvider} from "mockprovider/MockProvider.sol";

import "./ForgeHelper.sol";

import "../contracts/nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract RelayerFeeRouterTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  event Send(
    uint32 domain,
    address recipient,
    uint256 amount,
    bytes32[] _transactionIds,
    bytes32 remote,
    uint32 localDomain,
    bytes message
  );

  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    address indexed recipient,
    uint256 amount,
    bytes32[] transactionIds
  );

  // ============ Storage ============

  RelayerFeeRouter relayerFeeRouter;
  RelayerFeeRouter relayerFeeRouterImplementation;
  ERC1967Proxy proxy;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);

  MockProvider internal xAppConnectionManager;
  MockProvider internal home;
  MockProvider internal connext;

  // ============ Test set up ============

  function setUp() public {
    xAppConnectionManager = new MockProvider();
    home = new MockProvider();
    connext = new MockProvider();

    xAppConnectionManager.givenQueryReturnResponse(
      abi.encodeWithSignature("home()"),
      MockProvider.ReturnData({success: true, data: abi.encodePacked(address(home))}),
      false
    );

    relayerFeeRouterImplementation = new RelayerFeeRouter();

    proxy = new ERC1967Proxy(address(relayerFeeRouterImplementation), bytes("0x"));
    relayerFeeRouter = RelayerFeeRouter(payable(address(relayerFeeRouter)));
    relayerFeeRouter.initialize(address(xAppConnectionManager), address(connext));
  }

  // ============ initialize ============
  function testInitializeParameters() public {
    assertEq(address(relayerFeeRouter.xAppConnectionManager()), address(xAppConnectionManager));
    assertEq(address(relayerFeeRouter.connext()), address(connext));
  }

  // // ============ setMaxRouters ============

  // // Should work
  // function testSetMaxRoutersPerTransfer() public {
  //   require(connext.maxRoutersPerTransfer() != 10);

  //   connext.setMaxRoutersPerTransfer(10);
  //   assertEq(connext.maxRoutersPerTransfer(), 10);
  // }

  // // Fail if not called by owner
  // function testSetMaxRoutersPerTransferOwnable() public {
  //   vm.prank(address(0));
  //   vm.expectRevert(
  //     abi.encodeWithSelector(ProposedOwnableUpgradeable.ProposedOwnableUpgradeable__onlyOwner_notOwner.selector)
  //   );
  //   connext.setMaxRoutersPerTransfer(10);
  // }

  // // Fail maxRouters is 0
  // function testSetMaxRoutersPerTransferZeroValue() public {
  //   vm.expectRevert(
  //     abi.encodeWithSelector(Connext.Connext__setMaxRoutersPerTransfer_invalidMaxRoutersPerTransfer.selector)
  //   );
  //   connext.setMaxRoutersPerTransfer(0);
  // }

  // // Emits MaxRoutersPerTransferUpdated
  // function testSetMaxRoutersPerTransferEvent() public {
  //   vm.expectEmit(true, true, true, true);
  //   emit MaxRoutersPerTransferUpdated(10, address(this));
  //   connext.setMaxRoutersPerTransfer(10);
  // }
}
