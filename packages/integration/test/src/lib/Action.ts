import * as events from "events";

export enum ActionListeners {
  ResultListener = "ResultListener",
  ErrorListener = "ErrorListener",
  TimeoutListener = "TimeoutListener",
}

export type ResultListenerData = {
  Results: { msg: "Results"; data: any };
};

export class Action {
  private events = new events.EventEmitter();
  //if this action fails should we stop the test entirely?

  private isTerminal = false;

  constructor(listenerCbFn: Function) {
    this.registerResultListener(listenerCbFn);
  }

  public registerResultListener(listenerCb: Function) {
    this.events.on(ActionListeners.ResultListener, function (data: ResultListenerData) {
      console.log("recieved result");
      listenerCb();
    });
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
