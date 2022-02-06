import "ds-test/test.sol";
import "./interfaces/ITransactionManager.sol";
import "./TransactionManager.sol";

contract TransactionManagerTest is DSTest {
    ITransactionManager txManager;

    function setUp() public {
        txManager = new TransactionManager(42);
    }

    function testNumberIs42() public {
        assertEq(txManager.getChainId(), 42);
    }
}
