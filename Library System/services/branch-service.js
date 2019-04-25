import { from } from "rxjs";

export class BranchService {
    constructor() {
    }

    getBranches() {
        return from(
            fetch("http://localhost:3000/branches/")
                .then(res => { return res.json() })
        )
    }

    getWeekHours() {
        return from(
            fetch("http://localhost:3000/week_hours/")
                .then(res => { return res.json() })
        )
    }

}