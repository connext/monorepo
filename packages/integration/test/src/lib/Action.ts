import { TIntegerString } from "@connext/nxtp-utils";
import * as events from "events";

export enum ActionListeners {
  ResultListener = "ResultListener",
  ErrorListener = "ErrorListener",
  TimeoutListener = "TimeoutListener",
}

export type ResultListenerData = {
  Results: { msg: "Results"; data: any };
};

type CallbackFunctionVariadicAnyReturn = (data: ResultListenerData, ...args: any[]) => any;

export class Action {
  private events = new events.EventEmitter();
  //if this action fails should we stop the test entirely?

  private isTerminal = false;

  protected registerResultListener(listenerCb: CallbackFunctionVariadicAnyReturn) {
    this.events.on(ActionListeners.ResultListener, (data: ResultListenerData) => {
      console.log("recieved result");
      listenerCb(data);
    });
  }
  protected deregister() {
    this.events.removeAllListeners();
  }
  public emitResult(res: ResultListenerData) {
    this.events.emit(ActionListeners.ResultListener, res);
  }

  public getEEmitter(): events.EventEmitter {
    return this.events;
  }

  protected setTerminal(tf: boolean) {
    this.isTerminal = tf;
  }

  public init() {
    console.log("Base Action init, probably didnt use right");
  }

  public returnName() {
    return "ACTION NAME";
  }

  public do() {
    console.log("do");
  }
}
