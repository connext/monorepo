import { Step } from "./Step";

export class Task { 
    private steps: Step[] = [];

    constructor(taskName:string, steps:Step[]) {
        console.log("Starting Task", taskName);
        this.steps = steps;
    }

    public async startTask() {
        this.steps.map((step) => {
            step.start();
        })
    }
}



