// import { dc, db, pool } from "./index";

export class SpokeDBHelper {
  constructor(private domain: string) {}

  // Get the current number of nodes in the DB.
  public async getCount(): Promise<number> {
    return 0;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return [];
  }

  public async push(hash: string) {}
}

export class HubDBHelper {
  constructor(private domain: string) {}

  // Get the current number of nodes in the DB.
  public async getCount(): Promise<number> {
    return 0;
  }

  public async getNode(index: number): Promise<string | undefined> {
    return;
  }

  public async getNodes(start: number, end: number): Promise<string[]> {
    return [];
  }

  public async push(hash: string) {}
}
