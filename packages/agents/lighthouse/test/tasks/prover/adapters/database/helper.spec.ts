import { expect } from "@connext/nxtp-utils";
import { SinonStub } from "sinon";

import {
  HubDBHelper,
  SpokeDBHelper,
  OptimisticHubDBHelper,
} from "../../../../../src/tasks/prover/adapters/database/helper";
import { proverCtxMock } from "../../../../globalTestHook";

describe("#Database helper", () => {
  let hubHelper: HubDBHelper;
  let spokeHelper: SpokeDBHelper;
  let optimisticHubDBHelper: OptimisticHubDBHelper;

  beforeEach(() => {
    hubHelper = new HubDBHelper(
      "hub",
      10,
      {
        reader: proverCtxMock.adapters.database,
        writer: proverCtxMock.adapters.databaseWriter,
      },
      proverCtxMock.adapters.cache.messages,
    );
    spokeHelper = new SpokeDBHelper(
      "spoke",
      10,
      {
        reader: proverCtxMock.adapters.database,
        writer: proverCtxMock.adapters.databaseWriter,
      },
      proverCtxMock.adapters.cache.messages,
    );
    optimisticHubDBHelper = new OptimisticHubDBHelper(["node1", "node2"], 2);
  });

  it("spoke helper should get node", async () => {
    const node = "0xnode1";
    (proverCtxMock.adapters.database.getSpokeNode as SinonStub).returns(node);
    const first = await spokeHelper.getNode(0);
    const second = await spokeHelper.getNode(0);
    expect(first).eq(second);
    expect(node).eq(second);
  });
  it("spoke helper should get nodes", async () => {
    const nodes = ["0xnode1", "0xnode2"];
    (proverCtxMock.adapters.database.getSpokeNodes as SinonStub).returns(nodes);
    const first = await spokeHelper.getNodes(0, 2);
    const second = await spokeHelper.getNodes(0, 2);
    expect(first).eq(second);
    expect(nodes[0]).eq(second[0]);
    expect(nodes[1]).eq(second[1]);
  });

  it("hub helper should get node", async () => {
    const node = "0xnode1";
    (proverCtxMock.adapters.database.getHubNode as SinonStub).returns(node);
    const first = await hubHelper.getNode(0);
    const second = await hubHelper.getNode(0);
    expect(first).eq(second);
    expect(node).eq(second);
  });
  it("hub helper should get nodes", async () => {
    const nodes = ["0xnode1", "0xnode2"];
    (proverCtxMock.adapters.database.getHubNodes as SinonStub).returns(nodes);
    const first = await hubHelper.getNodes(0, 2);
    const second = await hubHelper.getNodes(0, 2);
    expect(first).eq(second);
    expect(nodes[0]).eq(second[0]);
    expect(nodes[1]).eq(second[1]);
  });

  it("spoke helper should get root", async () => {
    const root = "0xnode1";
    const first = await spokeHelper.getRoot("root");
    expect(first).eq(undefined);
    await spokeHelper.putRoot("root", root);
    const second = await spokeHelper.getRoot("root");
    expect(root).eq(second);
  });

  it("hub helper should get root", async () => {
    const root = "0xnode1";
    const first = await hubHelper.getRoot("root");
    expect(first).eq(undefined);
    await hubHelper.putRoot("root", root);
    const second = await hubHelper.getRoot("root");
    expect(root).eq(second);
  });

  it("hub helper should operate", async () => {
    await hubHelper.getNode(0);
    await hubHelper.getNodes(0, 2);
    await hubHelper.getRoot("0001");
    await hubHelper.putRoot("0001", "0xROOT");
    await hubHelper.getRoot("0001");
    await hubHelper.clearLocalCache();
    await hubHelper.clearCache();
    expect(await hubHelper.getCount()).eq(10);
  });

  it("spoke helper should operate", async () => {
    await spokeHelper.getNode(0);
    await spokeHelper.getNodes(0, 2);
    await spokeHelper.getRoot("0001");
    await spokeHelper.putRoot("0001", "0xROOT");
    await hubHelper.getRoot("0001");
    await spokeHelper.clearLocalCache();
    await spokeHelper.clearCache();
    expect(await spokeHelper.getCount()).eq(10);
  });

  it("optimisticHubDBHelper should get node", async () => {
    const node = await optimisticHubDBHelper.getNode(0);
    expect(node).eq("node1");
  });
  it("optimisticHubDBHelper should get count", async () => {
    const node = await optimisticHubDBHelper.getCount();
    expect(node).eq(2);
  });
  it("optimisticHubDBHelper should get nodes", async () => {
    const nodes = await optimisticHubDBHelper.getNodes(0, 1);
    expect(nodes.length).eq(2);
    expect(nodes[0]).eq("node1");
    expect(nodes[1]).eq("node2");
  });
  it("optimisticHubDBHelper putRoot noop", async () => {
    await optimisticHubDBHelper.putRoot();
    expect(optimisticHubDBHelper.putRoot).to.be.returned;
  });
  it("optimisticHubDBHelper should getRoot", async () => {
    const node = await optimisticHubDBHelper.getRoot();
    expect(node).eq(undefined);
  });
  it("optimisticHubDBHelper clearcache noop", async () => {
    await optimisticHubDBHelper.clearCache();
    expect(optimisticHubDBHelper.clearCache).to.be.returned;
  });
});
