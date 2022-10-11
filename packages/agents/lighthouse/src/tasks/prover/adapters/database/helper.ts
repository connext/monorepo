import {
  convertFromDbMessage,
  XMessage,
  convertFromDbAggregatedRoot,
  convertFromDbPropagatedRoot,
  AggregatedRoot,
} from "@connext/nxtp-utils";

import { dc, db, pool } from "./index";

export class SpokeDBHelper {
  constructor(private domain: string, private count: number) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    const message: XMessage = convertFromDbMessage(
      await db.selectOne("messages", { origin_domain: this.domain, index: index }).run(pool),
    );
    return message?.leaf;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    const messages = await db
      .select("messages", { origin_domain: this.domain, index: dc.gte(start) && dc.lte(end) })
      .run(pool);
    return messages.map((message) => convertFromDbMessage(message).leaf);
  }

  public async getRoot(path: string): Promise<string | undefined> {
    const root = await db.selectOne("merkle_cache", { domain: this.domain, domain_path: path }).run(pool);
    return root?.tree_root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    const root = { domain: this.domain, domain_path: path, tree_root: hash };
    await db.upsert("merkle_cache", root, ["domain", "domain_path"], { updateColumns: [] }).run(pool);
  }
}

export class HubDBHelper {
  constructor(private domain: string, private count: number) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    const root: AggregatedRoot = convertFromDbAggregatedRoot(
      await db.selectOne("aggregated_roots", { index: index }).run(pool),
    );
    return root?.receivedRoot;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    const roots = await db.select("aggregated_roots", { index: dc.gte(start) && dc.lte(end) }).run(pool);
    return roots.map((root) => convertFromDbAggregatedRoot(root).receivedRoot);
  }

  public async getRoot(path: string): Promise<string | undefined> {
    const root = await db.selectOne("merkle_cache", { domain: this.domain, domain_path: path }).run(pool);
    return root?.tree_root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    const root = { domain: this.domain, domain_path: path, tree_root: hash };
    await db.upsert("merkle_cache", root, ["domain", "domain_path"], { updateColumns: [] }).run(pool);
  }
}
