import { TestManager } from "./lib/Test";
import { PingPongTest } from "./tests/ping_pong/pingPong";

const TestMgmt = new TestManager([PingPongTest]);
TestMgmt.addTest(PingPongTest);
TestMgmt.startTests();


