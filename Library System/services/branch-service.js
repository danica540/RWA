import { from } from "rxjs";
import { urlCons } from "../constants/url-constants";

const url=urlCons.URL;

export class BranchService {
    constructor() {
    }

    getBranches() {
        return from(
            fetch(`${url}/branches/`)
                .then(res => { return res.json() })
        )
    }

    getWeekHours() {
        return from(
            fetch(`${url}/week_hours/`)
                .then(res => { return res.json() })
        )
    }

    getBranchesPromise() {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`${url}/branches/`)), randomNumber);
        })
    }

}