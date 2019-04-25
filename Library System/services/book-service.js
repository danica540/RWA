import { from } from "rxjs";
import { urlCons } from "../constants/url-constants";

const url=urlCons.URL;

export class BookService {
    constructor() {
    }

    getBooks() {
        return from(
            fetch(`${url}/books/`)
                .then(res => { return res.json() })
        )
    }

    getBooksByPage(ofset,pageSize){
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`${url}/books?_page=${ofset}&_limit=${pageSize}`)), randomNumber);
        })
    }

    getBooksPromise() {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`${url}/books/`)), randomNumber);
        })
    }

    getBookById(id) {
        return from(
            fetch(`${url}/books/` + id)
                .then(res => { return res.json() })
        )
    }

    getBookBySearchValue(text) {
        return from(
            fetch(`${url}/books?q=${text}`)
                .then(res => { return res.json() })
        )
    }

    updateBookAvailability(book) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`${url}/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            }), randomNumber))
        })
    }

    getBooksByPatronId(id) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 100;
            setTimeout(() => resolve(fetch(`${url}/books?patron_id=${id}`)), randomNumber);
        })
    }


}