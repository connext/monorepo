import "../../../lib/ds-test/src/test.sol";
import "../../../lib/forge-std/src/stdlib.sol";
import "../../../lib/forge-std/src/Vm.sol";

import "../../Connext.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract ConnextTest is DSTest {
  using stdStorage for StdStorage;

  Vm public constant vm = Vm(HEVM_ADDRESS);

  StdStorage stdstore;

  Connext connext;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);

  function setUp() public {
    connext = new Connext();
    connext.initialize(domain, payable(bridgeRouter), tokenRegistry, wrapper);
  }

  // Utils
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192
  function setApprovedRouter(address _router, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(connext)).sig(connext.approvedRouters.selector).with_key(_router).checked_write(
      writeVal
    );
  }

  function setApprovedAsset(address _asset, bool _approved) internal {
    uint256 writeVal = _approved ? 1 : 0;
    stdstore.target(address(connext)).sig(connext.approvedAssets.selector).with_key(_asset).checked_write(writeVal);
  }

  /////

  // #addRouter
  function testAddRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.addRouter(address(1));
  }

  function testAddRouterZeroAddress() public {
    vm.expectRevert(bytes("#AR:001"));
    connext.addRouter(address(0));
  }

  function testAddRouterAlreadyApproved() public {
    setApprovedRouter(address(1), true);
    vm.expectRevert(bytes("#AR:032"));
    connext.addRouter(address(1));
  }

  function testAddRouter() public {
    connext.addRouter(address(1));
    assertTrue(connext.approvedRouters(address(1)));
  }

  /////

  // #removeRouter
  function testRemoveRouterOwnable() public {
    vm.prank(address(0));
    vm.expectRevert(bytes("#OO:029"));
    connext.removeRouter(address(1));
  }

  function testRemoveRouterZeroAddress() public {
    vm.expectRevert(bytes("#RR:001"));
    connext.removeRouter(address(0));
  }

  function testAddRouterNotApproved() public {
    setApprovedRouter(address(1), false);
    vm.expectRevert(bytes("#RR:033"));
    connext.removeRouter(address(1));
  }

  function testRemoveRouter() public {
    setApprovedRouter(address(1), true);
    connext.removeRouter(address(1));
    assertTrue(!connext.approvedRouters(address(1)));
  }

  //////
}
