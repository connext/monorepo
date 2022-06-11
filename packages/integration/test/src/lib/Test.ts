import { Task } from "./Task";

export class Test {
  private name = "SomeTest";
  private testTasks: Task[] = [];

  constructor(name: string, tasks: Task[]) {
    this.name = name;
    //validate tasks
    this.testTasks = tasks;
  }

  public startTest() {
    for (const task of this.testTasks) {
      task.startTask();
    }
  }
}

export class TestManager {
  private tests: Test[] = [];
  private opts = {};

  private handleOverrides() {
    console.log("not implemented");
  }

  constructor(tests: Test[], opts?: { iterations: 1 }, overrides?: any) {
    this.tests = tests;
    if (opts) {
      this.opts = opts;
    }
    if (overrides) {
      this.handleOverrides();
    }
  }

    public addTest(test:Test) {
        this.tests.push(test);
    }
    public startTests() {
        for (const t of this.tests) {
            t.startTest();
        }
    }
}


