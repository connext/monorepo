// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../contracts/messaging/connectors/SpokeConnector.sol";

contract WormholeUpgradeTransfers {
  // Define all of the information needed for transfer tests
  struct Transfer {
    address local;
    bytes32 transferId;
    SpokeConnector.Proof proof;
    bytes32 aggregateRoot;
    bytes32[32] aggregatePath;
    uint256 aggregateIndex;
  }

  //   // 1 - transfer we want to be reconciled going to bsc - need prove and process data + transferId + message hash
  //   Transfer public UNRECONCILED_TO_BSC_TRANSFER =
  //     Transfer({
  //       transferId: bytes32(0x83e3fcd235ed97fb94beadb03daea6a67ef8247c410e1cc6d1bfa6e53776840a),
  //       aggregateRoot: bytes32(""),
  //       aggregatePath: AGGREGATE_PATH,
  //       aggregateIndex: 0,
  //       proof: SpokeConnector.Proof({
  //         path: SPOKE_PATH,
  //         index: 6270,
  //         message: bytes(
  //           0x006574680000000000000000000000008898b472c54c31894e3b9bb83cea802a5d0e63c60000034900626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce00657468000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480300000000000000000000000000000000000000000000000000000000001e848083e3fcd235ed97fb94beadb03daea6a67ef8247c410e1cc6d1bfa6e53776840a
  //         )
  //       })
  //     });

  //   // 2 - transfer we want to be reconciled leaving bsc (ideally to mainnet, but another chain works) - need prove and process data + transferId + message hash
  //   Transfer public UNRECONCILED_FROM_BSC_TRANSFER =
  //     Transfer({
  //       transferId: bytes32(0x33193082cf840c03d3a893e490586b4435d37c3e1d83eb7aca5dc8f32b5a1549),
  //       aggregateRoot: bytes32(""),
  //       aggregatePath: AGGREGATE_PATH,
  //       aggregateIndex: 0,
  //       proof: SpokeConnector.Proof({
  //         path: SPOKE_PATH,
  //         index: 30008,
  //         message: bytes(
  //           0x00626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce000008266f7074690000000000000000000000008f7492de823025b4cfaab1d34c58963f2af5deda00657468000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec703000000000000000000000000000000000000000000000000000000002c375b0f33193082cf840c03d3a893e490586b4435d37c3e1d83eb7aca5dc8f32b5a1549
  //         )
  //       })
  //     });

  // 3 - transfer that is completed going to bsc - need prove and process data + transferId + message hash
  // reconcile tx: https://bscscan.com/tx/0x6cdbcc82ab3d92be475aeac9fbc898ccaab38b2d674f0343f2219641d6c410ff#eventlog
  function getCompletedToBscTransfer() public pure returns (Transfer memory) {
    return
      Transfer({
        local: address(0xA9CB51C666D2AF451d87442Be50747B31BB7d805),
        transferId: bytes32(0x0c9e43ab8d0b2eecef801e5b8d53893933bba6964cfb398ebb4730c4e6fdd50c),
        aggregateRoot: bytes32(0x5df44dcea2a8b54decad15f2d5c4b315e848447a6a0870629f4744f151beb4b8),
        aggregatePath: [
          bytes32(0x058a368d2d200ee5b3ed9bcca9686cee2842622b9aaf49b4c6c0169f1ac1976c),
          bytes32(0xad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5),
          bytes32(0x809a7688b6ee600e57db03e2841cc23821d2c4aae8f6010b0727c3ebb95aa9e3),
          bytes32(0x21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85),
          bytes32(0x38937cc741b44d56c8a761de06b31af5e63086e4aa71bfa92ec650a1f4ff4d87),
          bytes32(0xb36da290fb4913bb2b608482e2cbe31832f6b43861a8956dd2842fe6415b63cd),
          bytes32(0x30e955290ccff2768cdd46e855cd8aed17d7f2936167cc94e0184b14d763070e),
          bytes32(0x5afe04b1d1e7c6e444cf7770f6f9cbaebde2c5aa277dac322ce05f45ffb7d0c6),
          bytes32(0x87f71aa506d9a354b78e6b8b3e816ccbedca83ffffee254890edb09b8f229037),
          bytes32(0x8f31546d7c8d6b02d6b32f68974503d957ace340f9f19e0585795afa9d2153f3),
          bytes32(0x28554c2eef24a724ea0370a18129e46d6b8d38847a32d372d80f35d4c4a7625e),
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
        ],
        aggregateIndex: 28661,
        proof: SpokeConnector.Proof({
          path: [
            bytes32(0x60c89483ed7422d805929595521f7c2f75b078bf946b1d4be55878d8a197e7a2),
            bytes32(0xb3f962338ee990252bae020293813616a2b9b00a9ef414fe5d6241a3db6d99f2),
            bytes32(0xaaa599fe7c6d0724e3fbd7407e60d24845248fede4894f01db1a5680420d2d6f),
            bytes32(0x860e671b6172cb2d70417eaeda020a74cba3e179ee6314bb88e10f109d3bcbc9),
            bytes32(0xc7e5e8838462aa999e56c3b670606b5e618ec5cdf0e990c93c959c2c0e3856c3),
            bytes32(0x5ad90192ddfa80cc444f2cd924db271171a5bcef0cabd572be3c48a19422d5e1),
            bytes32(0xe6e7853ee054c0d36a1c5cd0b16a97226b9ab01577dba91081a9b31d800d3d67),
            bytes32(0xdae433aabf587b2f7cdfcbfcc4267dfaf34c405fcf37d5ec451e1bcd5610e253),
            bytes32(0x0767feca6d6cc8b67c0e31dc34582fcfea641a5eda910c84bf76e6c1337e0ab3),
            bytes32(0x2857e8ffc0fbd95676bcbaadd272c9209ac31394ff50bd7ff5a61c2e8777a4fb),
            bytes32(0x6ce14bba88b2cd64d828713542baa756f1939a9a782eacfe1bbf28f992829a00),
            bytes32(0xf8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892),
            bytes32(0x965e1f738aa214682e5847aa2f5afe8348091b3700f76837e074281163955842),
            bytes32(0xc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb),
            bytes32(0x5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc),
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
          index: 6141,
          message: bytes(
            hex"006574680000000000000000000000008898b472c54c31894e3b9bb83cea802a5d0e63c60000034800626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce00657468000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20300000000000000000000000000000000000000000000000001bb356332850d900c9e43ab8d0b2eecef801e5b8d53893933bba6964cfb398ebb4730c4e6fdd50c"
          )
        })
      });
  }
}
