import { from } from "rxjs";
export class PatronService {
    constructor() {
    }

    getAllPatronsWithLibraryIdPromise(id) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`http://localhost:3000/patrons?library_id=${id}`)), randomNumber);
        })
    }

    getAllPatronsPromise() {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch("http://localhost:3000/patrons/")), randomNumber);
        })
    }

    getPatronByIdPromise(id) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`http://localhost:3000/patrons/${id}`)), randomNumber);
        })
    }

}