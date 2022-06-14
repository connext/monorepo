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
        for (const action of initialActions) {
            this.actions.push(action);
        }
    
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
        this.actions[0].init();
        this.actions[0].do();
        
        // for (const a of this.actions) {
        //     a.init();
        //     // const emitter = a.getEEmitter();
        //     // emitter.addListener(ActionListeners.ResultListener, (res:ResultListenerData) => {
        //     //     //fail whole step 
        //     //     if (res.Results) {
        //     //         console.log(`New address ${JSON.stringify(res.Results)}`);
        //     //         this.succeedStep();            
        //     //     }
                
        //     // })
        //     a.do();
        // }
    }
}

