import { SinonStub, stub } from "sinon";
import { expect } from "chai";
import { constants } from "ethers/lib/ethers";
import { createRequestContext, mkAddress, PrepareParams } from "@connext/nxtp-utils";

import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import {
  activeTransactionMock,
  auctionBidMock,
  MUTATED_AMOUNT,
  MUTATED_EXPIRY,
  routerAddrMock,
  txReceiptMock,
} from "../../utils";
import { prepareReceiver } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";

const requestContext = createRequestContext("TEST");

describe("#prepareReceiver", () => {
  beforeEach(() => {
    stub(PrepareHelperFns, "getReceiverAmount").returns(MUTATED_AMOUNT);
    stub(PrepareHelperFns, "getReceiverExpiry").returns(MUTATED_EXPIRY);
    stub(PrepareHelperFns, "recoverAuctionBid").returns(routerAddrMock);
    stub(PrepareHelperFns, "validExpiry").returns(true);
    stub(PrepareHelperFns, "decodeAuctionBid").returns(auctionBidMock);
  });

  it("happy: should send prepare for receiving chain with ETH asset", async () => {
    const ethPrepareDataMock = activeTransactionMock;
    ethPrepareDataMock.crosschainTx.invariant.sendingAssetId = constants.AddressZero;
    ethPrepareDataMock.crosschainTx.invariant.receivingAssetId = constants.AddressZero;

    const receipt = await prepareReceiver(ethPrepareDataMock, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const prepareStub = contractWriterMock.prepare as SinonStub;
    expect(prepareStub.callCount).to.eq(1);
    const call = prepareStub.getCall(0);
    const [chainId, data] = call.args;
    const txData = { ...ethPrepareDataMock.crosschainTx.invariant, ...ethPrepareDataMock.crosschainTx.sending };
    expect(chainId).to.eq(txData.receivingChainId);
    expect(data).to.deep.eq({
      txData,
      amount: MUTATED_AMOUNT,
      expiry: MUTATED_EXPIRY,
      bidSignature: ethPrepareDataMock.bidSignature,
      encodedBid: ethPrepareDataMock.encodedBid,
      encryptedCallData: ethPrepareDataMock.encryptedCallData,
    } as PrepareParams);
  });

  it("happy: should send prepare for receiving chain with token asset", async () => {
    const tokenPrepareData = activeTransactionMock;
    tokenPrepareData.crosschainTx.invariant.sendingAssetId = mkAddress("0x1");
    tokenPrepareData.crosschainTx.invariant.receivingAssetId = mkAddress("0x2");

    const receipt = await prepareReceiver(tokenPrepareData, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const prepareStub = contractWriterMock.prepare as SinonStub;
    expect(prepareStub.callCount).to.eq(1);
    const call = prepareStub.getCall(0);
    const [chainId, data] = call.args;
    const txData = { ...tokenPrepareData.crosschainTx.invariant, ...tokenPrepareData.crosschainTx.sending };
    expect(chainId).to.eq(txData.receivingChainId);
    expect(data).to.deep.eq({
      txData,
      amount: MUTATED_AMOUNT,
      expiry: MUTATED_EXPIRY,
      bidSignature: tokenPrepareData.bidSignature,
      encodedBid: tokenPrepareData.encodedBid,
      encryptedCallData: tokenPrepareData.encryptedCallData,
    } as PrepareParams);
  });
});
