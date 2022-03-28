import { expect } from "chai";

import { getAddressFromPublicKey, compressPublicKey } from "../../src";

const testPublicKey = "0x045a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e16257463175c0774b8041f03b66c824a664fa22d719dca18c6cf116f82d278a4"
const testAddress = "0x24EEe0a64ecB052BF4686B35c776d5a97E0934Ac";
const compressedPublicKey = "0x025a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e";

describe("Helpers:Address", () => {
    describe("#getAddressFromPublicKey", () => {
        it(`Should return address ${testAddress} from pub key`, () => {
            expect(getAddressFromPublicKey(testPublicKey)).to.be.deep.eq(
                testAddress,
            );
        });
    })
    
    describe("#compressPublicKey", () => {
        it(`Should get compressed version of public key`, () => {
            expect(compressPublicKey(testPublicKey)).to.be.deep.equal(
                compressedPublicKey
            )
        })
    })
})
