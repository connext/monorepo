import { Action } from './Action';

export class Step { 
    private actions: Action[] = []; 
    constructor(initialActions: Action[]) {
        for (const action of initialActions) {
            this.actions.push(action);
        }
    }
    private stop() {
        
    }
    public start() {
        for (const a of this.actions) {
            a.init();
            a.getEEmitter();
            a.do();
        }
    }
}

