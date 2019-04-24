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

    changeBookTitle(book) {
        console.log(book);
        return from(
            fetch(`http://localhost:3000/books`, { 
                method: "POST", 
                headers: { "Content-type": "application/json;" },
                body: `{      
                "id": "52",
                "author": "Paulo Coelho222",
                "genre": "novel",
                "title": "Alchemist",
                "img": "../resources/alchemist.jpg",
                "library_id": 1,
                "value": 2040000.36}`
            })
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