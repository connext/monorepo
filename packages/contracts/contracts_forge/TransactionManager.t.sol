import "ds-test/test.sol";
import "forge-std/stdlib.sol";
import "forge-std/Vm.sol";

import "../contracts/TransactionManager.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract TransactionManagerTest is DSTest {
  using stdStorage for StdStorage;

  Vm public constant vm = Vm(HEVM_ADDRESS);

  StdStorage stdstore;

  TransactionManager txManager;

  function setUp() public {
    txManager = new TransactionManager(42);
  }

  // Utils
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192
  function setApprovedRouter(address _router, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(txManager)).sig(txManager.approvedRouters.selector).with_key(_router).checked_write(
      writeVal
    );
  }

  function setApprovedAsset(address _asset, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(txManager)).sig(txManager.approvedAssets.selector).with_key(_asset).checked_write(writeVal);
  }

  //

  // #getChainId
  function testGetChainId() public {
    assertEq(txManager.getChainId(), 42);
  }

  /////

  // #getStoredChainId
  function testGetStoredChainId() public {
    assertEq(txManager.getStoredChainId(), 42);
  }

  /////

  // #addRouter
  function testAddRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    txManager.addRouter(address(1));
  }

  function testAddRouterZeroAddress() public {
    vm.expectRevert(bytes("#AR:001"));
    txManager.addRouter(address(0));
  }

  function testAddRouterAlreadyApproved() public {
    setApprovedRouter(address(1), true);
    vm.expectRevert(bytes("#AR:032"));
    txManager.addRouter(address(1));
  }

  function testAddRouter() public {
    txManager.addRouter(address(1));
    assertTrue(txManager.approvedRouters(address(1)));
  }

  /////

  // #removeRouter
  function testRemoveRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    txManager.removeRouter(address(1));
  }

  function testRemoveRouterZeroAddress() public {
    vm.expectRevert(bytes("#RR:001"));
    txManager.removeRouter(address(0));
  }

  function testAddRouterNotApproved() public {
    setApprovedRouter(address(1), false);
    vm.expectRevert(bytes("#RR:033"));
    txManager.removeRouter(address(1));
  }

  function testRemoveRouter() public {
    setApprovedRouter(address(1), true);
    txManager.removeRouter(address(1));
    assertTrue(!txManager.approvedRouters(address(1)));
  }

  //////

  // #addAssetId
  function testAddAssetOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    txManager.addAssetId(address(1));
  }

  function testAddAssetAlreadyApproved() public {
    setApprovedAsset(address(1), true);
    vm.expectRevert(bytes("#AA:032"));
    txManager.addAssetId(address(1));
  }

  function testAddAsset() public {
    txManager.addAssetId(address(1));
    assertTrue(txManager.approvedAssets(address(1)));
  }

  /////

  // #removeAssetId
  function testRemoveAssetOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    txManager.removeAssetId(address(1));
  }

  function testAddAssetNotApproved() public {
    setApprovedAsset(address(1), false);
    vm.expectRevert(bytes("#RA:033"));
    txManager.removeAssetId(address(1));
  }

  function testRemoveAsset() public {
    setApprovedAsset(address(1), true);
    txManager.removeAssetId(address(1));
    assertTrue(!txManager.approvedAssets(address(1)));
  }

  //////
}
