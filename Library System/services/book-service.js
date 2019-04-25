import { from } from "rxjs";

export class BookService {
    constructor() {
    }

    getBooks() {
        return from(
            fetch("http://localhost:3000/books/")
                .then(res => { return res.json() })
        )
    }

    getBooksByPage(ofset,pageSize){
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`http://localhost:3000/books?_page=${ofset}&_limit=${pageSize}`)), randomNumber);
        })
    }

    getBooksPromise() {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch("http://localhost:3000/books/")), randomNumber);
        })
    }

    getBookById(id) {
        return from(
            fetch("http://localhost:3000/books/" + id)
                .then(res => { return res.json() })
        )
    }

    getBookBySearchValue(text) {
        return from(
            fetch("http://localhost:3000/books?q=" + text)
                .then(res => { return res.json() })
        )
    }

    updateBookAvailability(book) {
        return new Promise((resolve, reject) => {
            const randomNumber = Math.random() * 10;
            setTimeout(() => resolve(fetch(`http://localhost:3000/books/${book.id}`, {
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
            setTimeout(() => resolve(fetch(`http://localhost:3000/books?patron_id=${id}`)), randomNumber);
        })
    }


}