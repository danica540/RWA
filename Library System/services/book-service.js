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
}