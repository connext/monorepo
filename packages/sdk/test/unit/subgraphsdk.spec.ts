import { expect } from "@connext/nxtp-utils/src/expect";
import { GraphQLClient } from "graphql-request";
import { createStubInstance, reset, restore, SinonStubbedInstance } from "sinon";

import { getSdk } from "../../src/subgraph/graphqlsdk";

describe("graphqlsdk", () => {
  let client: SinonStubbedInstance<GraphQLClient>;

  beforeEach(() => {
    client = createStubInstance(GraphQLClient);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("happy getSdk", () => {
    const sdk = getSdk(client as any);

    const a = sdk.GetSenderTransactions({} as any);
    expect(a).to.be.undefined;

    const b = sdk.GetReceiverTransactions({} as any);
    expect(b).to.be.undefined;

    const c = sdk.GetTransaction({} as any);
    expect(c).to.be.undefined;

    const d = sdk.GetTransactionsWithUser({} as any);
    expect(d).to.be.undefined;
  });
});
