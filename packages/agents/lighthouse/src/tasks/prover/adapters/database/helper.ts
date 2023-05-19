import { Database } from "@connext/nxtp-adapters-database";
import { DBHelper } from "@connext/nxtp-utils";

export class SpokeDBHelper implements DBHelper {
  private cachedNode: Record<string, string> = {};
  private cachedNodes: Record<string, string[]> = {};
  private cachedRoot: Record<string, string> = {};
  constructor(private domain: string, private count: number, private db: Database) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    let node: string | undefined = this.cachedNode[`${index}`];
    if (!node) {
      node = await this.db.getSpokeNode(this.domain, index, this.count);
      if (node) {
        this.cachedNode[`${index}`] = node;
      }
    }
    return node;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    let nodes: string[] = this.cachedNodes[`${start}-${end}`];
    if (!nodes || nodes.length == 0) {
      nodes = await this.db.getSpokeNodes(this.domain, start, end, this.count);
      this.cachedNodes[`${start}-${end}`] = nodes;
    }
    return nodes;
  }

  public async getRoot(path: string): Promise<string | undefined> {
    let root: string | undefined = this.cachedRoot[path];
    if (!root) {
      root = await this.db.getRoot(this.domain, path);
      if (root) {
        this.cachedRoot[path] = root;
      }
    }
    return root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    return await this.db.putRoot(this.domain, path, hash);
  }
}

export class HubDBHelper implements DBHelper {
  private cachedNode: Record<string, string> = {};
  private cachedNodes: Record<string, string[]> = {};
  private cachedRoot: Record<string, string> = {};
  constructor(private domain: string, private count: number, private db: Database) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    let node: string | undefined = this.cachedNode[`${index}`];
    if (!node) {
      node = await this.db.getHubNode(index, this.count);
      if (node) {
        this.cachedNode[`${index}`] = node;
      }
    }
    return node;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    let nodes: string[] = this.cachedNodes[`${start}-${end}`];
    if (!nodes || nodes.length == 0) {
      nodes = await this.db.getHubNodes(start, end, this.count);
      this.cachedNodes[`${start}-${end}`] = nodes;
    }
    return nodes;
  }

  public async getRoot(path: string): Promise<string | undefined> {
    let root: string | undefined = this.cachedRoot[path];
    if (!root) {
      root = await this.db.getRoot(this.domain, path);
      if (root) {
        this.cachedRoot[path] = root;
      }
    }
    return root;
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    return await this.db.putRoot(this.domain, path, hash);
  }
}
