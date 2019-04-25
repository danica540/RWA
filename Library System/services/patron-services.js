import { urlCons } from "../constants/url-constants";

const url=urlCons.URL;

export class PatronService {
    constructor() {
    }

    getAllPatronsWithLibraryIdPromise(id) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`${url}/patrons?library_id=${id}`)), randomNumber);
        })
    }

    getAllPatronsPromise() {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`${url}/patrons/`)), randomNumber);
        })
    }

    getPatronByIdPromise(id) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`${url}/patrons/${id}`)), randomNumber);
        })
    }

}