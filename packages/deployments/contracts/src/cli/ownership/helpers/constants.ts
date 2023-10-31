export const SUPPORTED_DOMAINS = {
  mainnet: [
    6648936, // mainnet
    1869640809, // optimism
    6450786, // bnb
    6778479, // gnosis
    1886350457, // polygon
    1634886255, // arbitrum one
  ],
  testnet: [
    1735353714, // goerli
    1735356532, // optimism goerli
    9991, // mumbai
    1734439522, // arbitrum-goerli
    1668247156, // linea-goerli
    2053862260, // zksync2 testnet
  ],
};

type AddressBook = Record<"mainnet" | "testnet", Record<number, string>>;

export const PROTOCOL_ADMINS: AddressBook = {
  mainnet: {
    6648936: "0xf2964cCcB7CDA9e808aaBe8DB0DDDAF7890dd378", // mainnet
    1869640809: "0xDb56Fb8F49997Aa1eaa91ebA578fb5992FE22ceF", // optimism
    6450786: "0x06D63fb4f3F9B8235E71ff4AE82958a45B3dd4A8", // bnb
    6778479: "0xFE431e08C415FA4A4e3778da19bff3c1659154B5", // gnosis
    1886350457: "0x95e687bA2d2A791B0246d66bC4fbdD0457dCab19", // polygon
    1634886255: "0xC1167F7209A7434252e427Ad96693ccf6FB2755F", // arbitrum one
    1818848877: "0x50d22a34183e7cD3164184011998a3D50303f75d", // linea
  },
  testnet: {
    1735353714: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // goerli
    1735356532: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // optimism goerli
    9991: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // mumbai
    1734439522: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // arbitrum-goerli
    1668247156: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // linea-goerli
  },
};

export const DAO_CONTRACTS: AddressBook = {
  mainnet: {
    6648936: "0x4d50a469fc788a3c0CdC8Fd67868877dCb246625", // mainnet
    1869640809: "0x6eCeD04DdC5A7709d5877c963cED0288Fb1c7348", // optimism
    6450786: "0x9435Ba7C661a0Fd477deED640491de8c100325A7", // bnb
    6778479: "0x7616Bc6d0dee5E250BA5b3dDa6cbbB71786FB638", // gnosis
    1886350457: "0x0970Adeb473609F91D03e9Bba85F49C445040cD7", // polygon
    1634886255: "0x5C711DB90dEc0a5B81C626968DEa4187a7f9C1F2", // arbitrum one
    1818848877: "0x8167289250c0cD874cAf63d5C06B08c132d2505d", // linea
  },
  testnet: {
    1735353714: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // goerli
    1735356532: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // optimism goerli
    9991: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // mumbai
    1734439522: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // arbitrum-goerli
    1668247156: "0xa2Ee8DCd2A8A3A54Cf37F6590E5108BbE502B006", // linea-goerli
  },
};

export const HUBS = {
  mainnet: 6648936, // mainnet
  testnet: 1735353714, // goerli
};
