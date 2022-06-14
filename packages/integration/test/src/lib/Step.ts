import { Action, ActionListeners, ResultListenerData } from './Action';

enum StepResults  { 
    success = "StepSuccessful", 
    failure = "StepFailure"
}

export class Step { 
    private actions: Action[] = []; 
    private stepFinished: boolean = false;
    //final step result
    private stepResult: StepResults | undefined = undefined;

    constructor(initialActions: Action[]) {
        this.actions = initialActions;
    }

    private stop() {
        
    }

    private failStep() {
        this.stepFinished = true;
        this.stepResult = StepResults.failure;

        return this.stepResult;
    }

    private succeedStep() {
        this.stepFinished = true;
        this.stepResult = StepResults.failure;

        return this.stepResult;
    }

    public start() {
        for (const a of this.actions) {
            a.init();
            a.do();
        }
    }
}

