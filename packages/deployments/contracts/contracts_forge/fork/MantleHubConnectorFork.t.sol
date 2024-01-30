// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";
import {ChainBatchHeader, ChainInclusionProof, L2MessageInclusionProof} from "../../contracts/messaging/interfaces/ambs/mantle/IStateCommitmentChain.sol";
import {MantleHubConnector, IStateCommitmentChain} from "../../contracts/messaging/connectors/mantle/MantleHubConnector.sol";
import {OptimismV0HubConnector} from "../../contracts/messaging/connectors/optimism-v0/OptimismV0HubConnector.sol";

import {RootManager, ProposedOwnable} from "../../contracts/messaging/RootManager.sol";

import "../utils/ForgeHelper.sol";

interface IChainStorageContainer {
  /********************
   * Public Functions *
   ********************/

  /**
   * Sets the container's global metadata field. We're using `bytes27` here because we use five
   * bytes to maintain the length of the underlying data structure, meaning we have an extra
   * 27 bytes to store arbitrary data.
   * @param _globalMetadata New global metadata to set.
   */
  function setGlobalMetadata(bytes27 _globalMetadata) external;

  /**
   * Retrieves the container's global metadata field.
   * @return Container global metadata field.
   */
  function getGlobalMetadata() external view returns (bytes27);

  /**
   * Retrieves the number of objects stored in the container.
   * @return Number of objects in the container.
   */
  function length() external view returns (uint256);

  /**
   * Pushes an object into the container.
   * @param _object A 32 byte value to insert into the container.
   */
  function push(bytes32 _object) external;

  /**
   * Pushes an object into the container. Function allows setting the global metadata since
   * we'll need to touch the "length" storage slot anyway, which also contains the global
   * metadata (it's an optimization).
   * @param _object A 32 byte value to insert into the container.
   * @param _globalMetadata New global metadata for the container.
   */
  function push(bytes32 _object, bytes27 _globalMetadata) external;

  /**
   * Retrieves an object from the container.
   * @param _index Index of the particular object to access.
   * @return 32 byte object value.
   */
  function get(uint256 _index) external view returns (bytes32);

  /**
   * Removes all objects after and including a given index.
   * @param _index Object index to delete from.
   */
  function deleteElementsAfterInclusive(uint256 _index) external;

  /**
   * Removes all objects after and including a given index. Also allows setting the global
   * metadata field.
   * @param _index Object index to delete from.
   * @param _globalMetadata New global metadata for the container.
   */
  function deleteElementsAfterInclusive(uint256 _index, bytes27 _globalMetadata) external;
}

contract MantleHubConnectorForkTest is ForgeHelper {
  // ============ libraries
  using stdStorage for StdStorage;

  // ============ mainnet staging contracts
  OptimismV0HubConnector MANTLE_HUB_CONNECTOR =
    OptimismV0HubConnector(payable(0xFD911b58FB5a94FF08f2784F6D36b1eB97AE29C1));
  RootManager ROOT_MANAGER = RootManager(0x0031d290B8526e2Eb6ac22111E5fF96EcA760258);
  address MANTLE_SPOKE_CONNECTOR = address(0x69Dd4385EdC7BDBe221159278981dD81ff792247);

  // ============ domains
  uint32 MANTLE_DOMAIN = 1835101812;
  uint32 ETH_DOMAIN = 6648936;

  // ============ Storage ============
  address watcher = 0x43DB577bB3DD02989Dc3DC8e65E61a27d6914386;
  address owner;

  // ============ Setup ============
  function setUp() public {
    vm.createSelectFork("https://eth.llamarpc.com", 19065219);
    owner = ROOT_MANAGER.owner();
  }

  function test_MantleHubConnector__processMessageFromRoot_works() public {
    // // processMessageFromRoot data for the following L2 -> L1 message:
    // // https://explorer.mantle.xyz/tx/0xf01730300275ec49f5c35e093254c44ce14aa3c9cba325e18e1a1e0b5b1084e0

    ChainBatchHeader memory _stateRootBatchHeader = ChainBatchHeader(
      0x3de6,
      bytes32(0x03333bf8223f52e908d828e8b2750ad919965dcb577b325f35cce5729410ae49),
      0x0fa1,
      0x02f30575,
      bytes(
        hex"ee8e1f23971363cbc5afbe120b8befb67fa04a0aef0b8308bfb2fc2ac6b7fda531f28f3384e18dd73024de0d1f035cdec82f7ab48150702dd0a2aaae575e732e01"
      ),
      bytes(
        hex"0000000000000000000000000000000000000000000000000000000065aecbdf000000000000000000000000d1328c9167e0693b689b5aa5a024379d4e437858"
      )
    );

    bytes32[] memory siblings = new bytes32[](12);
    siblings[0] = bytes32(0xa1891261a2387e4e9f792acc61afdd365bedde432c7169a89de1851067638880);
    siblings[1] = bytes32(0x8125f55cd7992d267a28f626c011584e4a2b1062e47db02a7fcaf4a3d8876a3a);
    siblings[2] = bytes32(0x2afb094d19c6d72647da16082282cb488b5b626db35007de73d2b3edbe206b31);
    siblings[3] = bytes32(0xd0b120a29b7588f0c63f4776cb1fc69416c83d46e4c4e38b44640e675d65f32e);
    siblings[4] = bytes32(0x61234cc6f93d3e187eb73f5c256c47bd9032e70592125c7b484db0992236f70b);
    siblings[5] = bytes32(0xc80922787045f1b8916ff17e3ae88b50b9cbbb79576a6d6b302834c942e1f06e);
    siblings[6] = bytes32(0xc8b9626d99e74b8413cfe05c2bc1299207844989534e45d815a5898eb3d7898c);
    siblings[7] = bytes32(0xa1114397f2736beab380c8a69f7366f6d2beb3f6834ee8c07c1306133596a92f);
    siblings[8] = bytes32(0x3206d1f64eef0646f05b7f8b496dc4c300e42a296062a060bd618d427ef26e9b);
    siblings[9] = bytes32(0xa21aed74bbe84b486e506adfe1fa3b9b8139e1ee9dec9fc211ce2b7d754865f7);
    siblings[10] = bytes32(0x185e00ab86d9da3829441e613976f60ed632fbf6a41f0834732a475a340f8875);
    siblings[11] = bytes32(0xafa4ce7135c92b90bc6cebb1bc0eb8609453234081cf2cba62cc19870e9acf3c);
    ChainInclusionProof memory _stateRootProof = ChainInclusionProof(759, siblings);

    L2MessageInclusionProof memory _proof = L2MessageInclusionProof(
      bytes32(0xaf707816d8f7b3ce67abb0ceaeec79c60c2860a2db0c894c19a7547b253dbf88),
      _stateRootBatchHeader,
      _stateRootProof,
      bytes(
        hex"f90a5eb90214f90211a0c0d5bb8cb2f7a2568ecfc6cf5c2045d84161c847298009b8e8d0ee07e134fa39a0784271298b27b8c6f8dfae68009860d23c3cd7cf5e8b48323d2e7a8d91f502bfa0bb424826ceddf9fd4a7650aec054b003ddab99912e0944593cd4064247ffa40da0a735a505714a33ad02065bba37b6d13cbf8e910cdf772977dcd44e2f396a05dea054c3da42aaf1eeb0fc15fa91a01199a9aa065998c9e4bd13f42692aa87d409eba06432de5182f3a4ee55cc13d2d29b6a59eec7b031b1e3dcfbcd306e458ef5b335a01ca3cb643ae2f1dbd3f85130b3587a698c02acce57d76d4446bb22c241dcbccca0d48caf39eebc91006c5682eda8ebb5fa03d6e8d00eddcfd0e8006d90ec33abe2a0516cac0c47b4848805fa0d6c25b7af654d21d945dce27a812acc9be0824e3efda0532c0da422ee8b8a28e36683bf4745c473bb82366da4157dd93cd4b1725a59f9a042c5def5669bfd350c4ed9940912be674e6884fc6e5f81bc26d95127174b7b46a0cf3a79b19fa75819738bb8cdb2b09cb733ca06288cf1546abd117a92fc95edd0a073836d5d3400a10f5480a4b61426421971634fbb95d21df4e319044391da7beaa0d34b60e6184a1c092969feb2614628570372cc86ffe1705ee780fc98d7ce689da041750d3f5fd7e84d95462121c69a56266acee5da2657b3fba06c74c23663c23aa0c483b26f76771dcfe2f7a5efec559b2fd7ebe5ae290fa9b8c74c4bf5ffc34e4880b90214f90211a0880ac8ebc8ffada1f72b7b21cc0bcebe60d5c8b747ea853ab79e0440266ba6f5a0119163b777a1e6df9b54211b642070be8bb1524ccbf5afde44ead091ad5952e2a0fcac5db025919a402b087bdb3abd1fce95f19b91a9434e8ceb8fb1302eb4b373a041a95739dcf897319e3207bde76e6bcde1b94422c4c413c5f1d1a8e9ca460fd1a013e29fa825632d6da2548580ee597dfff15d285746f1c57aeea3463f3685c02ca0c9102db1f99d8ca278e0bf0cdcdd803c0799d5fd221cd8e5b70693151e4fd5cba0187ed4f06720fab763395f14e97609798170827a203e9bce74fce2156f160ab8a03f67894a552268c88d89ed2d767b7105bdfe05ae3453f004e1e40d130476ac21a0d01d3552934cae47f83bf1d886e6689b04e45cbb6cddc788db0922eb5f22dac1a056d2f72e14fa1590401304ccaa194761cced23f4f87d1f946297127fc939f045a04126d128246300416cee3417865df659c6af449578387c9f8542bf58629d54aca06d73c26f39844494b58e7456bb93a151f46cc5a8cd81658ae655c4ef00f4b14da0a57e2264fa07dbab0f20841c13113b6cab1aaa096e72fd6eafb9f77efc9856dfa047609d4bf10f8cfc718e9476c435409e1cb2dab65d07f6e340ce5493f8b5f762a030dc34503746963fcd247a069b087385871fe6137c99fb37fd1e0efa76edb842a0db042c3232037705e1de6f5048945dc0e05fd43dc5133936b6e7508364ca5b7f80b90214f90211a06b0ede1d8239377f27673346eceadac85534ea5a0c97f0f13929d37639a997c0a0063c6eca2e159e8c556742e513e21130b1dd45a322b9f7a7e67108c080ce4ddfa07111548e258e452beca2fbdab4ac504a28b953cace7ac950b82ee7e65f92aea2a07a65415eeb7cbcaae9962a12a249d6303d63c9cf49dd451b899ddb2e8de1576da05bec242ddca9a0d429ea0b65d3ec501d1e6772c27f2a2f9d0cfbef40c4e9fa08a013655b846089b92c6c14f54ff53e763cfcd2ae30c5134df0585b79908e887cd5a09c8f52d37a3d54f56d74c600f5a3c9c987d760540f7f65d87035a0cd0c59eba9a0ef2b15708b3e7e583c8844a84fee70d84195ae0197adc2619c9d92a91c548fa4a0fa1734da57ba360592838cf12ae71af1098c111874566bad6e8e5d4f1044ac7ca0b6017677ae5b167609c5ffbf169930020b9b7cbf2560c20bb863a37ada041cb8a05005aec687ffe9e6ff2a8c72ee4e4ffdacdd44c7f528797588d369a66d74d0d6a037528016d5f5e0b18ba720495a5544c7b07beeebeb9f3d6c0e53add19665304ca0759a9b3e0a6c28c01fc0346aeaf74936f4cbfa5460d9ff5f97946938cd629c34a01f6613de9ed22cab565ddb14519429d343b5aacf7b0f5b50e8261019b6b787d4a064a68d0f477b3c2536c2bc305a89c3d7917653ed4e76b813b102f8514bd83681a00c35e42c7c3cbd68816f5eb9ea39467ac55c637ce349037a656ce13e2100297880b90214f90211a0a09b1e31828e56a44da3f03028869c47b930ae5d518d2625fd488304ae790bc7a068a15304c64b2d3efd045c48ec3ae077ef61bbb6d3d858024c6b2517ab1c5b98a03dd983091ebd82ef66f862cae731ff1ed2620a486054940caee1ac29cbac325da05aab60a900e58662d21b85f08368bec0cc3694f9d737e1a088b26324931e4f5ca096d121ad2477b91eb9b427522a6537b31a680924d7a024e687639fef70a8345da0681f677e0f867deadb5020bb00d9b5881cb4cdc0e743da2938b6c44f427b0db0a0249c2cfdbaf62ed5c0529db76fedf3e2fd03b133f216c12f637862e68d979263a0c6e816b2f411bf06f76cdc94f2d0f8da46730c84c2b3ce62dca464d2ee227046a031fa06bd7af747982bd9f9f1b5234a8fac6b6987a6edecd728fd4e34fab10d84a0a0a355700654026b7f7c13c109ba3df731137014405feeb28c7f607b85b0368da0f415a40fa93acb3af3ca25e9cd41b7a9fb6f2407fd4d80b3f5d804fef12b3b16a057d85ba092cc9e666ca68c43278b578cf95dfb4d514d77964505dad17056c6aca03549f34d6d45fe68999a8200231b413bbbad9e1c99ef53920b4b1131ecc03cbba038d1ae606f0950f39eb2e734b45a7978ee9ab7d2d369db8acd0e1b3936525892a0bc4b67fc75579d0cf15c0adbe69575fad47f721238ba8760d322e8479ccc902fa0db5b9a362acdd34ee33a08bc787efddd88941fe932cabe3e30db26c8017e4c9e80b90194f9019180a0300056248f4786c434642580e126ed0409744bdd711b888b15d79813f7219b94a0b2b8a079e51e89fed630e17d6e27e10e6c9421243a93c1b74eb8efe5affa9781a03ce60720d8547bc80850b3adc76514b58781adff65e67f687192f88475ba62e080a06d808c1f0f3c9663a440c7fb8fba8b6396d7a79e78071b831071e8cfc545f9ab80a0f18b4ffeffb540e2b47b1d386682de9d62bf15501632e37751b5655a3ee037bea0fbfa95bf8cff089a05b058d39196af8aa05b85b469d6086cf422a3e3fdb1e4f1a06712c47ced1a98d4ffe1b244f8c152a1caabc9c6f8b73d53844ba25c331f98fba01462812e560848ce64c4647c29555c9cff31d1baa9da375bbc4a784c987b8a3180a08113c89e9949d6420211f0da83ceb7f53b7f4851413a983a01c8d53ebca6ba17a02810447b6ee21aedd0a9716de1b76ba09f3bf015c2430ab9887b2aae4fcaeb0fa0ca6b6402b442952ab4b802369fd4a2a8ed6f4b84b20515552c9a88776112da82a08633d58807a3e6884e25f879e7a6aaf6b34739d8a78d1dab484d1b4e9be7759880b869f8679e311b46a2440f3eaf346b6c1ce588ed08712591822a258c5a1c4cf44cd0c9b846f8448080a018babcdbc3dd3854e3801587aa9c09b3aa62bdf1f3f3272ad34d89baa3377cdca0b139321113538ffa52ef410f27f0b2bfabf1f2a467e066d5277df8dbc10769d9"
      ),
      bytes(
        hex"f90a4ab90214f90211a01cf203e37cae8c90020cf564898cc2c5ccc2746dad5f7b8e4819754f0bc82bfda05b1fe4dd9ed9230ad8a8fb1fbdb2ad9d9accb3dc63a4b720f15b76ec89755e6fa0c5b037699a671290b3f16bd1069991709766e957b0c99541150edc714a5f0bd2a06ae48f9815f153d8dfb915757a5ed211d032f47be06dac7e8a3daa88ec489cb4a07f0f45d8495cbd440964a48d7c6caea1df91a7f822c75ebb1561d8c6ab792321a088425431df45342fe8c0e3ab6404f15369eec5b6b97a203e19a5fa188b3791bea0613db3f2b7fbe2fd6c72fc2e372df4059e0ebe7313a0b0511456b5a60c1d28eaa093ec98dc9a2e3a91dd11e43a491b53fd06bc373b0a0b0e6752a7105b11035b54a038fda759f5dfb37a29294317b3178ba4963f80959f59317a98e7590999fdd465a0727808d346f18a493b6604bb38b835dd8081280cfeb47e81fed3473873045865a0d30163486673ffa4f66129cc56815fc6d156c5c7d223559558f588b827dc7435a0ccb1866a0e7e33a2845780186f27042f398e7e98a11326b81e54995ff5292954a0a2a3d35a4f1e37207c9f8e3e3a0756365eaaf07c422ff5ad61cfcd233975dd9aa017229815d682cfc0242bf52d0b69247c61c4f0137abfa27f5255d314bea8eaafa0e7d3b1f7723e19a52d25008bbe96af4c05e36726745396caed892ccbaeac2225a0bb73abef1ecfbcba052135a6a82c5b0754db13a7f75998405d5330e72c03abca80b90214f90211a06f2bd4dca1c170fa58401ad0b73bc2c9b6899e0788c40b20f892ef95896a21a4a019ffe8f096e4432940904623af1b7b254d5d689523313b823c926df66e74fe0da0d39ca34ef7b3920fb8cfc9230f2296428f839dd0a105d8a6e8adcdbe189323a3a0735d7427eb6b0b7bc88354eded6ccc824def96d9c2d6ddc96599f59fec9df675a06ffbb335143b254a416dd2461fa32586f889310fa879b3831f20f47263a59feca0ecbf841a3ca7a3a539563945e571211d9ee0a9db6b032904008de1ab9052684ca01cc7334f01d4b7670eb8083402023e8f922bf56c3a48f01738ddc33a2086a65ba04664dd8711d12ab92cdc4605b41f4aa1ba786acc417e72f7c26aa3dcef58bcc8a02d20309d5db853d5e9bef3ab680860069842de81b9fe0b61ef0269d1eafba423a08389f77a94c613d08fd34956e6afda2b4555dccb643339d4269cd7a3b8ed62c2a0aad97d2b84356caba0246ef9c12a20e84ac27c792e085451b00bb85dd071559aa095eb496980d4fa778e71e2fdbe56c0c074c04474458311532cb9dcd410e22483a0ec6ac0b8c1401ea8796269ff82c2019168ed688e6ab2d6bfe1aa933a60a4f0a7a0d3d018f56f8769a183bf85226c2b42ee82b2684200640414ef09a359c4447faba0a83d6dab4f09cb066a11c022231b4205f164e033a1e91b8f75131a1c7ff7945ca003390316b8243a473a25e7c85d2000e5471cbbbec0e7e99456823939b6b4331f80b90214f90211a014a6489826db3787e2407cdaaa3cc289df3f204d955fab0975d4a165a9a3a468a0748267a754da07a8609eb1ea63481b59e8a3d6a074628cfb89d2e8073b14b2a6a080e340870bc52564feb118a7f744b6648b5ae1404eb5e9ee93f239dd1a897146a0157cc3234832d571e4b1fe824ea87deb7453818b153fa2dc7d302151e4c50e07a05c96bce3f575252d81c6b155ba9f15ec6021990fff592b576d8ea693b07c91f7a0d788ab62c0f365174cdaa8b6c78bbe489a9e061111da5b3315471a69f3f3f550a01c4a6b5c6d09c02080c63cd5dfd7730d10ac440d45544e7498f70b152f72aa3ba09f508c15d27f24eaa035cd9d564f49c508b0650ab7072b45d889c5de979ace6da0bca07b5584c17f0ed71c71e100e6908445581e036ed3d7e80783dfd0b2d1d48aa093d5f4518a5dae10eb3b647bf02edb39d41192a9c5c0bef24648794b3a14eaaea00027cc7d37f47f7c837c4fcb7d9f9cbae57a538bf4579979a3cef09a816099f5a091c2c528d44f46980e68c9f4add5e041da89e812c3b590bd496cd23061047a12a0cca2a36fb6919e0d18470b2c9e613891062fd61bae159ec573379f5b5024ff85a01b0e4f2b6e3dd2a7a52aaa7d212dd62cccfa6ffd83e4fce878f2767161bfe747a03232540a1f5647c49a1fa1e6b83d7de8594143dd2444aed65cf21f0d643339d9a034f94b542ac82ee6e4e302c4b779db408e22770a9bbbcb239e53969d5413535a80b90214f90211a079b32f46ec64a064427934711287f8903291b4d7cbba395be11d0021954a1e2ba0ed210465efaf71315ba9e077d9ef00b7f3a39f870226dc5135c5f984105127e1a024a95c6bcd4a3360a77e858bd998c7c21770b38e8e38f9e06bf54b26a7cd11fca0e59b36a04170485e138202b55603dd16a265136a1dc329847d63846f08dae78ea0200e5f281f68c16e3ba1cd78fbdfd0a4ea5ab15ee71a59242bc42b4fd6fff708a09f355b62a3ffbfc791c9efa780fa69ba1384243e7aac0e9885ab2c5454084b8ea013e945fb748f77f82f4aa0fa7e3cce2c21a5fe0741f185f5349eb9620363e36ea0537cf2df7601a79f248728f10597cdcaa6e3ae6adc95cabc95d1d4edaea1b57fa05bf3aa9ddd6771c01cbb299f523ecb9f3d9effd07c6813d76d3cd155f7508e75a0abdc9a318e15c84f6b84663c6c5db098a93ce49618da3d6ae2fda2b8b13256c9a0882dd5f1a1a8a315eb2d337374f1c92a80be4bcd3fd6f495f1f20cc112630c33a03b013bb12478791bc18e61d893bfeb486b85ce53e95281edac0e93591f71343da00e08b45cd12363b88be1eb11eac3e4336bf1b06f870f47de5b65b4400df667f6a0292bbc7ef08ffb327f3df76d6506ff8c14e661847bdc97c05f99765a0299a3bca03a0941ade179d3f37ecaa094464d25e1b812b20d843789bbd0a276a67d4cb1daa0cc09fc1a080b0a68e513c426eac1213e029030d5f54b5b3f0f4037149021b13680b90154f90151a0886e73fe485861442e623ae881296076a9c02aa76ed9b68d03ed1bfd94ebab56a09020a110ddd6ef24affbdba0aff3cfb8ae498aa596039f183c1f6e665b7ce93a80a0249817a807d86d669ac7bbca9faa49b1ec9f188e63e69bbd7e858f685ade166da0db835478652e270882aed23244693b603f5bd153f6ab349bde8b7300ffa10db880a07eb43b4a22f360d3336cef2c0b86d08c3af4be1b9ca891e1854d0e84999eacfba002cae751f33b665b8f7e6b75fdf0c4cc9babf85794565f4fcb25738d1d065526a09d70edc8540e6f7c323eeffdabe67b018d3ddfa466d4ac41b053ce6e00a44071a024f3dd777fab961a27097a44297d611657ed283a03e280bff6621eb8b1493cf18080a04be844625d4460d8336860b1ba3740c94759369279f1db7ecd767a915ddd38028080a03154feec480b93835ab6b2bf13590834232f35133dcaea536f7cd0af05f5ca1c80b873f871808080808080a0462868568779f6bb7796964c3688b64fcaa09e8b83c73c5f055ed39ef8eaea5d80808080a0da9352a68d2ae7687156e06bff5a0992af46466891fe11a099d9467d18a2964c80a08721443c4aa0851df09220ad83471cf7d6dcb1a520c220e5242a93cb504217cb808080a1e09e20440b835e6c607f4541b0a84f175ed3bd173d90b5053ed774ac8a7c88f901"
      )
    );

    address _target = address(MANTLE_HUB_CONNECTOR);
    address _sender = MANTLE_SPOKE_CONNECTOR;
    bytes memory _message = hex"27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d757";
    uint256 _messageNonce = 0x0c3dcf;

    // sanity check: message is verified
    bool verified = IStateCommitmentChain(address(0x89E9D387555AF0cDE22cb98833Bae40d640AD7fa)).verifyStateCommitment(
      _proof.stateRoot,
      _proof.stateRootBatchHeader,
      _proof.stateRootProof
    );
    assertTrue(verified, "!verified");

    // update existing hub connector with new encoding
    MantleHubConnector connector = new MantleHubConnector(
      ETH_DOMAIN,
      MANTLE_DOMAIN,
      address(0x081D1101855bD523bA69A9794e0217F0DB6323ff),
      address(ROOT_MANAGER),
      MANTLE_SPOKE_CONNECTOR,
      address(0x89E9D387555AF0cDE22cb98833Bae40d640AD7fa),
      1231231231231231
    );

    vm.etch(address(MANTLE_HUB_CONNECTOR), address(connector).code);

    assertTrue(MANTLE_HUB_CONNECTOR.processed(bytes32(_message)) == false, "processed");
    MantleHubConnector(payable(address(MANTLE_HUB_CONNECTOR))).processMessageFromRoot(
      _target,
      _sender,
      _message,
      _messageNonce,
      _proof
    );
    assertTrue(MANTLE_HUB_CONNECTOR.processed(bytes32(_message)), "!processed");
  }

  function _isValidBatchHeader(ChainBatchHeader memory _batchHeader) internal view returns (bool) {
    return hashBatchHeader(_batchHeader) == batches().get(_batchHeader.batchIndex);
  }

  function batches() public pure returns (IChainStorageContainer) {
    return IChainStorageContainer(0xd3f0BD982D72e28cccc69e0A9dA439e9D587b3bD);
  }

  function hashBatchHeader(ChainBatchHeader memory _batchHeader) internal pure returns (bytes32) {
    return
      keccak256(
        abi.encode(
          _batchHeader.batchRoot,
          _batchHeader.batchSize,
          _batchHeader.prevTotalElements,
          _batchHeader.signature,
          _batchHeader.extraData
        )
      );
  }
}
