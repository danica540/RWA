import { from } from "rxjs";
import { urlCons } from "../constants/url-constants";

const url=urlCons.URL;

export class MainViewService {
    constructor() {
    }

    getMainViewItemsPromise() {

        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`${url}/main_view/`)), randomNumber);
        })
    }

    getMainViewItems() {
        return from(
            fetch(`${url}/main_view/`)
                .then(res => { return res.json() })
        )
    }

}