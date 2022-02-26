import { expect } from "chai";
import Sinon, { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, SinonStubbedMember, stub } from "sinon";
import { makeAuctioneer } from "@connext/auctioneer";

describe('Auctioneer Test', () => {
  let auctioneer: SinonStubbedMember<makeAuctioneer
  before(async () => {
    createStubInstance(makeAuctioneer);
    
  });
})