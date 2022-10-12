import { Database } from "@connext/nxtp-adapters-database";

export class SpokeDBHelper {
  constructor(private domain: string, private count: number, private db: Database) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return await this.db.getSpokeNode(this.domain, index);
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return await this.db.getSpokeNodes(this.domain, start, end);
  }

  public async getRoot(path: string): Promise<string | undefined> {
    return await this.db.getRoot(this.domain, path);
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    return await this.db.putRoot(this.domain, path, hash);
  }
}

export class HubDBHelper {
  constructor(private domain: string, private count: number, private db: Database) {}

  public async getCount(): Promise<number> {
    return this.count;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return await this.db.getHubNode(index);
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return await this.db.getHubNodes(start, end);
  }

  public async getRoot(path: string): Promise<string | undefined> {
    return await this.db.getRoot(this.domain, path);
  }

  public async putRoot(path: string, hash: string): Promise<void> {
    return await this.db.putRoot(this.domain, path, hash);
  }
}
