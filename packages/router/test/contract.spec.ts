import {expect} from "chai";
import {createStubInstance, reset, restore, SinonStubbedInstance, stub} from "sinon";
import pino from "pino";
import {Handler} from "../dist/handler";
import { TransactionManager as TxManager } from "../src/contract";
import {SubgraphTransactionManagerListener} from "../dist/transactionManagerListener";
import {TransactionService} from "@connext/nxtp-txservice";
import {mkAddress, RouterNxtpNatsMessagingService, PrepareParams} from "@connext/nxtp-utils";
import {Signer} from "ethers";



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

    it(`Should do something with the contract`, async()=>{

    });

})