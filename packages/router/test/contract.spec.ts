import {expect} from "chai";
import {createStubInstance, reset, restore, SinonStubbedInstance, stub} from "sinon";
import pino from "pino";
import {Handler} from "../dist/handler";
import { TransactionManager as TxManager } from "../src/contract";
import {SubgraphTransactionManagerListener} from "../dist/transactionManagerListener";
import {TransactionService} from "@connext/nxtp-txservice";
import {
    mkAddress,
    RouterNxtpNatsMessagingService,
    PrepareParams,
    mkBytes32,
    TransactionPreparedEvent, InvariantTransactionData, VariantTransactionData, TransactionData,
} from "@connext/nxtp-utils";
import { constants, providers, Signer } from "ethers";

const fakeTxReceipt = {
    blockHash: "foo",
    blockNumber: 1,
    byzantium: true,
    confirmations: 1,
    contractAddress: mkAddress(),
    cumulativeGasUsed: constants.One,
    from: mkAddress(),
    transactionHash: mkBytes32(),
    gasUsed: constants.One,
    to: mkAddress(),
    logs: [],
    logsBloom: "",
    transactionIndex: 1,
} as unknown as providers.TransactionReceipt;

describe("Router Contract/Transaction Manager Test", ()=>{
    let handler: SinonStubbedInstance<Handler>;
    let txManager: SinonStubbedInstance<TxManager>;
    let txService: SinonStubbedInstance<TransactionService>;
    let subgraph: SinonStubbedInstance<SubgraphTransactionManagerListener>;

    beforeEach(()=>{
        const messaging = createStubInstance(RouterNxtpNatsMessagingService);
        subgraph = createStubInstance(SubgraphTransactionManagerListener);

        const signer = createStubInstance(Signer);
        (signer as any).getAddress = () => Promise.resolve(mkAddress("0xdeadbeef"));

        txManager = createStubInstance(TxManager);

        txService = createStubInstance(TransactionService);
        // txService.sendAndConfirmTx.resolves(faketxreceipt)

    });

    afterEach(()=>{
        restore();
        reset();
    });

    it(`Prepare`, async()=>{
        const MUTATED_AMOUNT = "100";
        const MUTATED_EXPIRY = 123400;
        const rinkebyTestTokenAddress = "0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9";
        const goerliTestTokenAddress = "0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa";


        const invariantDataMock: InvariantTransactionData = {
            user: mkAddress("0xa"),
            router: mkAddress("0xb"),
            sendingAssetId: mkAddress("0xc"),
            receivingAssetId: mkAddress("0xd"),
            sendingChainFallback: mkAddress("0xe"),
            receivingAddress: mkAddress(),
            sendingChainId: 1337,
            receivingChainId: 1338,
            callDataHash: mkBytes32("0xa"),
            transactionId: mkBytes32("0xb"),
        };

        const variantDataMock: VariantTransactionData = {
            amount: "123",
            expiry: "123456",
            preparedBlockNumber: 1234,
        };

        const txDataMock: TransactionData = {
            ...invariantDataMock,
            ...variantDataMock,
        };

        const senderPrepareData: TransactionPreparedEvent = {
            txData: txDataMock,
            caller: mkAddress("0xf"),
            encryptedCallData: "0xabc",
            encodedBid: "0xdef",
            bidSignature: "0xbca",
        };

        const tokenPrepareData = senderPrepareData;
        tokenPrepareData.txData.sendingAssetId = rinkebyTestTokenAddress;
        tokenPrepareData.txData.receivingAssetId = goerliTestTokenAddress;

        const ethPrepareDataMock = senderPrepareData;
        ethPrepareDataMock.txData.sendingAssetId = constants.AddressZero;
        ethPrepareDataMock.txData.receivingAssetId = constants.AddressZero;

        const prepareParams:PrepareParams = {
            txData:{
                user: tokenPrepareData.txData.user,
                router: tokenPrepareData.txData.router,
                sendingAssetId: tokenPrepareData.txData.sendingAssetId,
                receivingAssetId: tokenPrepareData.txData.receivingAssetId,
                sendingChainFallback: tokenPrepareData.txData.sendingChainFallback,
                receivingAddress: tokenPrepareData.txData.receivingAddress,
                sendingChainId: tokenPrepareData.txData.sendingChainId,
                receivingChainId: tokenPrepareData.txData.receivingChainId,
                callDataHash: tokenPrepareData.txData.callDataHash,
                transactionId: tokenPrepareData.txData.transactionId,

            },
            amount: MUTATED_AMOUNT,
            expiry: MUTATED_EXPIRY.toString(),
            bidSignature: ethPrepareDataMock.bidSignature,
            encodedBid: ethPrepareDataMock.encodedBid,
            encryptedCallData: ethPrepareDataMock.encryptedCallData,

        }
        txService.sendAndConfirmTx.resolves(fakeTxReceipt);
        await txManager.prepare(4, prepareParams );
        await txManager.addLiquidity(4, "9", "0xdead")

        const call = txManager.prepare.getCall(0);
    });

})