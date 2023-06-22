// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../../../utils/Mock.sol";
import {SpokeConnector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {AdminHubConnector} from "../../../../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {RootManager} from "../../../../contracts/messaging/RootManager.sol";
import {WatcherManager} from "../../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../../contracts/messaging/libraries/RateLimited.sol";

import "../../../utils/ForgeHelper.sol";

contract AdminHubConnectorTest is ForgeHelper {
  event MessageSent(bytes data, bytes encodedData, address caller);

  using stdStorage for StdStorage;

  // ============ Storage ============
  uint32 BNB_DOMAIN = 6450786;
  uint32 ETH_DOMAIN = 6648936;
  address watcher = 0x43DB577bB3DD02989Dc3DC8e65E61a27d6914386;
  address owner = 0x4d50a469fc788a3c0CdC8Fd67868877dCb246625;
  SpokeConnector ETH_SPOKE_CONNECTOR = SpokeConnector(payable(0xF7c4d7dcEc2c09A15f2Db5831d6d25eAEf0a296c));

  // ============ config
  AdminHubConnector adminHubConnector;
  RootManager rootManager = RootManager(0xd5d61E9dfb6680Cba8353988Ba0337802811C2e1);

  // ============ Setup ============
  function setUp() public {
    uint256 forkId = vm.createSelectFork("https://eth.llamarpc.com", 17528353);
    adminHubConnector = new AdminHubConnector(ETH_DOMAIN, BNB_DOMAIN, address(rootManager));
  }

  // ============ utils ============

  function test_AdminHubConnector__connectAndProve_works() public {
    vm.prank(watcher);
    rootManager.removeConnector(BNB_DOMAIN);
    vm.prank(owner);
    rootManager.addConnector(BNB_DOMAIN, address(adminHubConnector));
    // adminHubConnector.addSpokeRootToAggregate(
    //   bytes32(0x80e1ee5091dfa6f8b129e28436d323ed6da70f0a6d39b722323272017001f7e7)
    // );
    // https://connextscan.io/tx/0x6b1bf1bb31f51351083ebb58fbaf16c71eca53f01f02dc3c4efec75ecfadfdf0?src=search
    SpokeConnector.Proof memory proof1 = SpokeConnector.Proof({
      message: "0x00626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce00000499006574680000000000000000000000008898b472c54c31894e3b9bb83cea802a5d0e63c600657468000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4803000000000000000000000000000000000000000000000000000000016f86812bfac98c0aaffb21d46a2bfd0e06338f89e8fc62f82086cdb40df668e08c7ad359",
      path: [
        bytes32(0xb4b92c615db6c76ad35662aaeab6821f735e547a4baf870fc30619ae05e45048),
        bytes32(0x3fdf14836e9cffa66f7aab0567ee7a56db6b6027ee3c49cab4de773cf3e90db0),
        bytes32(0xc435137a3c01eb5316ee5da44f4871746f59a141d520ba2156b9ac68bee576b7),
        bytes32(0x7dd2edd88b80cf050130a799113b5acd50a3390481596e5e9f313de7db87e540),
        bytes32(0xf194834c6f016210c972fe81cfba41134db9311a8dc116fd47a1204025e6bbfc),
        bytes32(0xc2a4ea06fc4c12dfbad918ca6c54563b0123810d608ed0a3651fe25942eeda66),
        bytes32(0xfa42df8714c4317ad1cb72624d7bda89fd2101cc920dae36503af148e8a2eb3f),
        bytes32(0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83),
        bytes32(0x24abb13444fafca905f03eb6d88214071b1ca4502f2f8e469547e58cf7ca4acf),
        bytes32(0x2f8f69bb0864c968b896809e55e53594d6007890b03aeec9ae23d322d021b4f4),
        bytes32(0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5),
        bytes32(0xebee9ed9fc1ee89767a5a3ed64576c619e6a2f9aa0fce7e80b332e4e85b49483),
        bytes32(0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c),
        bytes32(0xad27f7cbb0e3114410594c6d241ba847c773ae1b68c5200439ca41e690811316),
        bytes32(0xee0abffb7c9331805b68828e1e161e07d3cae30bb27ad3c773dda551d56cbbdb),
        bytes32(0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2),
        bytes32(0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f),
        bytes32(0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a),
        bytes32(0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0),
        bytes32(0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0),
        bytes32(0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2),
        bytes32(0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9),
        bytes32(0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377),
        bytes32(0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652),
        bytes32(0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef),
        bytes32(0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d),
        bytes32(0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0),
        bytes32(0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e),
        bytes32(0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e),
        bytes32(0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322),
        bytes32(0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735),
        bytes32(0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9)
      ],
      index: 27454
    });
    SpokeConnector.Proof memory proof2 = SpokeConnector.Proof({
      message: "0x00626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce0000049a006574680000000000000000000000008898b472c54c31894e3b9bb83cea802a5d0e63c600657468000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec703000000000000000000000000000000000000000000000000000000000292c4cd6b1bf1bb31f51351083ebb58fbaf16c71eca53f01f02dc3c4efec75ecfadfdf0",
      path: [
        bytes32(0x90864897f054e3b21cec818a9ba3b92ddd5fdb3d4cf2acc1b215ae19c1b9d6e3),
        bytes32(0x5e92e84e1e115d08531e45d24ff43d42e5056cc13ef8808f0afd91da6d17c2d3),
        bytes32(0x6283355896b665b69f174edc0970021dbb157b9a1fdb614c75413f0247a0525b),
        bytes32(0xf4d1de3cb5be028f1b0b3582918322f4697c38ced71429ddbe31776be962d6aa),
        bytes32(0xfeb7bb66e61db6bb255d33c1b9d0ad6bae7e71fbc35a4253c5733cb09e9ed80a),
        bytes32(0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d),
        bytes32(0x6da707d4baf2fcb5a80c2315e636bbd094ce9b315798a5c41ccd5faaf683f962),
        bytes32(0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83),
        bytes32(0x24abb13444fafca905f03eb6d88214071b1ca4502f2f8e469547e58cf7ca4acf),
        bytes32(0x2f8f69bb0864c968b896809e55e53594d6007890b03aeec9ae23d322d021b4f4),
        bytes32(0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5),
        bytes32(0xebee9ed9fc1ee89767a5a3ed64576c619e6a2f9aa0fce7e80b332e4e85b49483),
        bytes32(0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c),
        bytes32(0xad27f7cbb0e3114410594c6d241ba847c773ae1b68c5200439ca41e690811316),
        bytes32(0xee0abffb7c9331805b68828e1e161e07d3cae30bb27ad3c773dda551d56cbbdb),
        bytes32(0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2),
        bytes32(0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f),
        bytes32(0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a),
        bytes32(0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0),
        bytes32(0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0),
        bytes32(0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2),
        bytes32(0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9),
        bytes32(0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377),
        bytes32(0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652),
        bytes32(0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef),
        bytes32(0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d),
        bytes32(0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0),
        bytes32(0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e),
        bytes32(0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e),
        bytes32(0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322),
        bytes32(0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735),
        bytes32(0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9)
      ],
      index: 27467
    });
    bytes32 _aggregateRoot = bytes32(0xb85efee2c31c8fea21b9d42e42afaf81aa8660096202c596a42b046031cc1fe0);
    bytes32[32] memory _aggregatePath = [
      bytes32(0x98026ae18d9d2fe37128f3c2cd4a4228b5ee23c34937648b42bc2fe48c5bcdce),
      bytes32(0xcb439d8f768847020fd36f9b239006bf9228d3cf15fbcf3d259c63c5e887ee77),
      bytes32(0xac4cdafddd0ea4e54bc4e196f63a65962fcf89b5a2d9bcd2db6daf4b5487d78b),
      bytes32(0xe4e87be4c51f9191dca241e31ca49a58496e84f7b04971e5b083ea18b57ceccb),
      bytes32(0xdb9ef01b1b9cb41b3f8555b3baaa99f14635e02bf0a4e253f97b1a1dc2452a19),
      bytes32(0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d),
      bytes32(0x887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968),
      bytes32(0x092d91fd0e03f8d31517d5515da59c8def3aec6fc9a94395185dd15f218c6e58),
      bytes32(0x613394de52051dfef03c6302a5be56d7eb264de41b286403c9e6a705cc3dbec9),
      bytes32(0xa534d38cdd23d3918f4c3af687a25430e2a3b368df751755e5dba80f3e75c3a7),
      bytes32(0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5),
      bytes32(0x336140b8fc53bebf8e5d693c38d51392ad640a9602633db6a077acf9a8044fd5),
      bytes32(0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c),
      bytes32(0xfdadd8683f031fc5355c66f9e2758ede68912129cb3d8915ac320cf94d692f7a),
      bytes32(0xc25c56bce15abaa44952dc09e997f6aa29809a86537c125e3b2e16e9b25c61ec),
      bytes32(0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2),
      bytes32(0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f),
      bytes32(0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a),
      bytes32(0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0),
      bytes32(0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0),
      bytes32(0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2),
      bytes32(0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9),
      bytes32(0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377),
      bytes32(0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652),
      bytes32(0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef),
      bytes32(0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d),
      bytes32(0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0),
      bytes32(0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e),
      bytes32(0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e),
      bytes32(0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322),
      bytes32(0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735),
      bytes32(0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9)
    ];
    uint256 aggregateIndex = 27537;

    // try to prove old message
    SpokeConnector.Proof[] memory proofs = new SpokeConnector.Proof[](2);
    proofs[0] = proof1;
    proofs[1] = proof2;
    ETH_SPOKE_CONNECTOR.proveAndProcess(proofs, _aggregateRoot, _aggregatePath, aggregateIndex);
  }
}
