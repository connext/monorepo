import { expect } from "@connext/nxtp-utils";
import { ContractReaderNotAvailableForChain } from "../../../src/lib/errors";

describe("ContractReaderNotAvailableForChain", () => {
  it("should work", () => {
    const chain = 1445;
    const err = new ContractReaderNotAvailableForChain(chain);
    expect(err.msg).to.be.eq(`Contract reader is not available for chainId ${chain}`);
  });
});
