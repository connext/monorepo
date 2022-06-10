enum ActionStatus {
    Fail = "Fail",
    Success = "Success"
}

type ActionResult = {
    data: {}
    status: ActionStatus
}
export class ResultsProcessor {

    private results: { action: { status: ActionStatus; name?: string; }; }[] = [];
    
    public addResult(actionRes: ActionResult, actionTaken: string) {
        const res = { action: { status: ActionStatus.Success, name: "initresult" }, };
        this.results.push(res)  ;
        
    }
}