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

    getBranchByIdPromise(id){
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`http://localhost:3000/branches/${id}`)), randomNumber);
        })
    }

    getBranchesPromise(){
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`http://localhost:3000/branches/`)), randomNumber);
        })
    }

}