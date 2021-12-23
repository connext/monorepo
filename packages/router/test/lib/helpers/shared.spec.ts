import {
  createLoggingContext,
  ERC20Abi,
  expect,
  getChainData,
  getInvariantTransactionDigest,
  getRandomBytes32,
  getVariantTransactionDigest,
  invariantDataMock,
  mkAddress,
  mkBytes32,
  txDataMock,
} from "@connext/nxtp-utils";
import { constants, utils } from "ethers";
import { Interface } from "ethers/lib/utils";
import { BigNumber } from "ethers/lib/ethers";
import { SinonStubbedInstance, createStubInstance, stub, SinonStub, restore, reset } from "sinon";
import { TransactionManagerInterface } from "@connext/nxtp-contracts/typechain/TransactionManager";

import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import * as shared from "../../../src/lib/helpers/shared";
import { ctxMock, txServiceMock, contractReaderMock } from "../../globalTestHook";
import { getDeployedPriceOracleContract } from "@connext/nxtp-txservice";
import { SanitationCheckFailed } from "../../../src/lib/errors";
import { getContext } from "../../../src/router";
import { SingleChainTransaction } from "../../../src/lib/entities";
import { TransactionStatus } from "../../../src/adapters/subgraph/runtime/graphqlsdk";
const { HashZero } = constants;

const { requestContext, methodContext } = createLoggingContext("auctionRequestBinding", undefined, mkBytes32());

const encodedDataMock = "0xabcde";
let interfaceMock: SinonStubbedInstance<Interface>;

describe("getNtpTimeSeconds", () => {
  it("should work", async () => {
    const result = await getNtpTimeSeconds();
    expect(result).to.be.eq(Math.floor(Date.now() / 1000));
  });
});

describe("getMainnetEquivalent", () => {
  it("should work", async () => {
    const result = await shared.getMainnetEquivalent(mkAddress("0xc"), 1337);
    expect(result).to.be.eq(mkAddress("0xd"));
  });
});

describe("getMainnetEquivalentFromChainData", () => {
  it("should work", async () => {
    ctxMock.chainData = await getChainData();
    const result = await shared.getMainnetEquivalentFromChainData(constants.AddressZero, 100);
    expect(result).to.be.eq("0x6B175474E89094C44Da98b954EedeAC495271d0F");
  });
});

describe("getTokenPriceFromOnChain", () => {
  beforeEach(() => {
    txServiceMock.getTokenPriceFromOnChain.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const tokenPrice = await shared.getTokenPriceFromOnChain(1337, mkAddress("0xa"));
    expect(tokenPrice.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFeeInReceivingToken", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFeeInReceivingToken.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFeeInReceivingToken = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0xa"),
      1337,
      mkAddress("0xb"),
      1338,
      18,
      requestContext,
    );

    expect(gasFeeInReceivingToken.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFeeInReceivingTokenForFulfill", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFeeInReceivingTokenForFulfill.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFeeInReceivingToken = await shared.calculateGasFeeInReceivingTokenForFulfill(
      mkAddress("0xa"),
      1337,
      18,
      requestContext,
    );

    expect(gasFeeInReceivingToken.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFee", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFee.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFee = await shared.calculateGasFee(1337, mkAddress("0xa"), 18, "prepare", requestContext, methodContext);

    expect(gasFee.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("isRouterWhitelisted", () => {
  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    stub(shared, "getTxManagerInterface").returns(interfaceMock as unknown as TransactionManagerInterface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
    txServiceMock.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000001");
    interfaceMock.decodeFunctionResult.returns([true]);
  });
  it("should work", async () => {
    const status = await shared.isRouterWhitelisted(mkAddress("0xa"), 1337);

    expect(status).to.be.true;
  });
});

describe("#sanitationCheck", () => {
  beforeEach(() => {
    interfaceMock = createStubInstance(Interface);
    interfaceMock.encodeFunctionData.returns(encodedDataMock);
    interfaceMock.decodeFunctionResult.returns([BigNumber.from(1000)]);
    stub(shared, "getTxManagerInterface").returns(interfaceMock as unknown as TransactionManagerInterface);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should work for cancel if receiving is zero hash", async () => {
    const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
    const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
    interfaceMock.encodeFunctionData.returns(invariantDigest);

    const receivingChainNxtpContractAddress = mkAddress("0xd");
    stub(shared, "getContractAddress")
      .withArgs(txDataMockToCancel.receivingChainId)
      .returns(receivingChainNxtpContractAddress);

    txServiceMock.readTx
      .withArgs({
        chainId: txDataMockToCancel.receivingChainId,
        to: receivingChainNxtpContractAddress,
        data: invariantDigest,
      })
      .resolves(HashZero);

    txServiceMock.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

    await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
    expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
      "variantTransactionData",
      [invariantDigest],
    ]);
    expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
  });

  it("should work for cancel", async () => {
    const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
    const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
    interfaceMock.encodeFunctionData.returns(invariantDigest);

    txServiceMock.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

    const mockReceiverChainTx: SingleChainTransaction = {
      status: TransactionStatus.Cancelled,
      txData: txDataMock,
      encryptedCallData: "0x",
      encodedBid: "0x",
      bidSignature: "0x",
    };
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);

    await shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel");
    expect(interfaceMock.encodeFunctionData.firstCall.args).to.be.deep.eq([
      "variantTransactionData",
      [invariantDigest],
    ]);
    expect(interfaceMock.encodeFunctionData.callCount).to.be.eq(1);
  });

  it("should throw an error if receiving tx status is not Cancelled", async () => {
    const txDataMockToCancel = { ...txDataMock, amount: "0", expiry: 0, preparedBlockNumber: 0 };
    const invariantDigest = getInvariantTransactionDigest(txDataMockToCancel);
    interfaceMock.encodeFunctionData.returns(invariantDigest);

    txServiceMock.readTx.resolves(getVariantTransactionDigest(txDataMockToCancel));

    const mockReceiverChainTx: SingleChainTransaction = {
      status: TransactionStatus.Prepared,
      txData: txDataMock,
      encryptedCallData: "0x",
      encodedBid: "0x",
      bidSignature: "0x",
    };
    (contractReaderMock.getTransactionForChain as SinonStub).onCall(0).resolves(mockReceiverChainTx);

    await expect(shared.sanitationCheck(txDataMock.sendingChainId, txDataMock, "cancel")).to.be.rejectedWith(
      new SanitationCheckFailed("cancel", txDataMock.transactionId, txDataMock.sendingChainId).message,
    );
  });
});

describe("multicall", () => {
  it("should work", async () => {
    const priceOralceOnBsc = getDeployedPriceOracleContract(56);

    const calls = [
      {
        address: priceOralceOnBsc.address,
        name: "getTokenPrice",
        params: [mkAddress("0x0")], // BNB address
      },
      {
        address: priceOralceOnBsc.address,
        name: "getTokenPrice",
        params: ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"], // WBNB address
      },
    ];
    const rpcUrl = "https://bsc-dataseed.binance.org/";
    const multicallAddress = "0x966dc92E72376ae21CC2793333f83B4c394DDC3c";
    const [bnbPrice, wbnbPrice] = await shared.multicall(priceOralceOnBsc.abi, calls, multicallAddress, rpcUrl);
    expect(bnbPrice.toString()).to.be.eq(wbnbPrice.toString());
  });
});
