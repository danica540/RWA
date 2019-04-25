import { from } from "rxjs";

export class MainViewService {
    constructor() {
    }

    getMainViewItemsPromise() {

        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`http://localhost:3000/main_view/`)), randomNumber);
        })
    }

    getMainViewItems() {
        return from(
            fetch("http://localhost:3000/main_view/")
                .then(res => { return res.json() })
        )
    }

}