import { MessagesCache } from "@connext/nxtp-adapters-cache";
import { Database } from "@connext/nxtp-adapters-database";
import { DBHelper } from "@connext/nxtp-utils";
import { Pool } from "pg";

export class SpokeDBHelper implements DBHelper {
  private cachedNode: Record<string, string> = {};
  private cachedNodes: Record<string, string[]> = {};
  private cachedRoot: Record<string, string> = {};
  constructor(
    private domain: string,
    private count: number,
    private db: { reader: Database; writer: { database: Database; pool: Pool } },
    private cache: MessagesCache,
  ) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    let node: string | undefined = this.cachedNode[`${index}`];
    if (!node) {
      node = await this.cache.getNode(this.domain, index);
      if (node) this.cachedNode[`${index}`] = node;
    }
    if (!node) {
      node = await this.db.reader.getSpokeNode(this.domain, index, this.count);
      if (node) {
        await this.cache.putNode(this.domain, index, node);
        this.cachedNode[`${index}`] = node;
      }
    }
    return node;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    let nodes: string[] = this.cachedNodes[`${start}-${end}`];
    if (!nodes || nodes.length == 0) {
      nodes = (await this.cache.getNodes(this.domain, start, end)) ?? [];
      this.cachedNodes[`${start}-${end}`] = nodes;
    }
    if (!nodes || nodes.length == 0) {
      nodes = await this.db.reader.getSpokeNodes(this.domain, start, end, this.count);
      // Store in cache if all nodes are returned.
      if (nodes.length == end - start + 1) {
        await this.cache.putNodes(this.domain, start, end, nodes);
        this.cachedNodes[`${start}-${end}`] = nodes;
      }
    }
    return nodes;
  }

  public async getRoot(path: string): Promise<string | undefined> {
    let root: string | undefined = this.cachedRoot[path];
    if (!root) {
      root = await this.cache.getRoot(this.domain, path);
      if (root) this.cachedRoot[path] = root;
    }
    if (!root) {
      root = await this.db.reader.getRoot(this.domain, path);
      if (root) {
        await this.cache.putRoot(this.domain, path, root);
        this.cachedRoot[path] = root;
      }
    }
    return root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    await this.db.writer.database.putRoot(this.domain, path, hash, this.db.writer.pool);
    await this.cache.putRoot(this.domain, path, hash);
    this.cachedRoot[path] = hash;
  }

  public async clearLocalCache(): Promise<void> {
    this.cachedNode;
    try {
      Object.keys(this.cachedNode).map(async (key) => await this.cache.delNode(this.domain, parseInt(key)));
      Object.keys(this.cachedNodes).map(
        async (key) => await this.cache.delNodes(this.domain, parseInt(key.split("-")[0]), parseInt(key.split("-")[1])),
      );
      Object.keys(this.cachedRoot).map(async (key) => await this.cache.delRoot(this.domain, key));
    } catch (err: unknown) {
      this.cachedNode = {};
      this.cachedNodes = {};
      this.cachedRoot = {};
    }
    this.cachedNode = {};
    this.cachedNodes = {};
    this.cachedRoot = {};
  }

  public async clearCache(): Promise<void> {
    this.cachedNode = {};
    this.cachedNodes = {};
    this.cachedRoot = {};
    await this.cache.clearDomain(this.domain);
    return await this.db.writer.database.deleteCache(this.domain, this.db.writer.pool);
  }
}

export class HubDBHelper implements DBHelper {
  private cachedNode: Record<string, string> = {};
  private cachedNodes: Record<string, string[]> = {};
  private cachedRoot: Record<string, string> = {};
  constructor(
    private domain: string,
    private count: number,
    private db: { reader: Database; writer: { database: Database; pool: Pool } },
    private cache: MessagesCache,
  ) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    let node: string | undefined = this.cachedNode[`${index}`];
    if (!node) {
      node = await this.cache.getNode(this.domain, index);
      if (node) this.cachedNode[`${index}`] = node;
    }
    if (!node) {
      node = await this.db.reader.getHubNode(index, this.count);
      if (node) {
        await this.cache.putNode(this.domain, index, node);
        this.cachedNode[`${index}`] = node;
      }
    }
    return node;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    let nodes: string[] = this.cachedNodes[`${start}-${end}`];
    if (!nodes || nodes.length == 0) {
      nodes = (await this.cache.getNodes(this.domain, start, end)) ?? [];
      this.cachedNodes[`${start}-${end}`] = nodes;
    }
    if (!nodes || nodes.length == 0) {
      nodes = await this.db.reader.getHubNodes(start, end, this.count);
      // Store in cache if all nodes are returned.
      if (nodes.length == end - start + 1) {
        await this.cache.putNodes(this.domain, start, end, nodes);
        this.cachedNodes[`${start}-${end}`] = nodes;
      }
    }
    return nodes;
  }

  public async getRoot(path: string): Promise<string | undefined> {
    let root: string | undefined = this.cachedRoot[path];
    if (!root) {
      root = await this.cache.getRoot(this.domain, path);
      if (root) this.cachedRoot[path] = root;
    }
    if (!root) {
      root = await this.db.reader.getRoot(this.domain, path);
      if (root) {
        await this.cache.putRoot(this.domain, path, root);
        this.cachedRoot[path] = root;
      }
    }
    return root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    await this.db.writer.database.putRoot(this.domain, path, hash, this.db.writer.pool);
    await this.cache.putRoot(this.domain, path, hash);
    this.cachedRoot[path] = hash;
  }

  public async clearLocalCache(): Promise<void> {
    this.cachedNode = {};
    this.cachedNodes = {};
    this.cachedRoot = {};
  }

  public async clearCache(): Promise<void> {
    this.cachedNode = {};
    this.cachedNodes = {};
    this.cachedRoot = {};

    await this.cache.clearDomain(this.domain);
    return await this.db.writer.database.deleteCache(this.domain, this.db.writer.pool);
  }
}

export class OptimisticHubDBHelper implements DBHelper {
  constructor(private roots: string[], private count: number) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return this.roots[index];
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return this.roots.slice(start, end + 1);
  }

  public async putRoot() {
    // noop
  }

  public async getRoot() {
    return undefined;
  }
}
