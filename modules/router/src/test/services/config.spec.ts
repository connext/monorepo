import * as config from '../../config';
import {parseEther} from '@ethersproject/units';
import Sinon from "sinon";
import {mkAddress} from "@connext/nxtp-utils/src/test/util";


const testConfig = config.getConfig();
const testName = "Configuration Test";

describe("Nxtp Configuration Test" , ()=>{
    const chainId = parseInt(Object.keys(testConfig.chainProviders)[0]);
    const transferAmount = parseEther("1");
    const fromAssetId: string = mkAddress("0xA");
    const fromChainId: number = 1337;
    const toAssetId: string = mkAddress("0xB");
    const toChainId: number = 1338;
    const routerSignerAddress: string = mkAddress("0xC");
    // let ethReader: Sinon.SinonStubbedInstance<VectorChainReader>;
    beforeEach(async () => {
        Sinon.stub(config, "getConfig").returns({...testConfig});
        // ethReader = Sinon.createStubInstance(VectorChainReader);
    });

    afterEach(() => {
        Sinon.restore();
    });


})