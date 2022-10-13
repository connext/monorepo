import { expect } from "@connext/nxtp-utils";

import { HubDBHelper, SpokeDBHelper } from "../../../../../src/tasks/prover/adapters/database/helper";
import { proverCtxMock } from "../../../../globalTestHook";

describe("#Database helper", () => {
  let hubHelper: HubDBHelper;
  let spokeHelper: SpokeDBHelper;

  beforeEach(() => {
    hubHelper = new HubDBHelper("hub", 10, proverCtxMock.adapters.database);
    spokeHelper = new SpokeDBHelper("spoke", 10, proverCtxMock.adapters.database);
  });

  it("hub helper should operate", async () => {
    await hubHelper.getNode(0);
    await hubHelper.getNodes(0, 2);
    await hubHelper.putRoot("0001", "0xROOT");
    await hubHelper.getRoot("0001");
    expect(await hubHelper.getCount()).eq(10);
  });

  it("spoke helper should operate", async () => {
    await spokeHelper.getNode(0);
    await spokeHelper.getNodes(0, 2);
    await spokeHelper.putRoot("0001", "0xROOT");
    await spokeHelper.getRoot("0001");
    expect(await spokeHelper.getCount()).eq(10);
  });
});
