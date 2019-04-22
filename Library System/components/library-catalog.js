import { BookService } from "../services/book-service";
import { flatMap, take, scan } from "rxjs/operators";
import { range } from "rxjs";

const selectorValues = [10, 20, 30, 40, 50];

export class LibraryCatalog {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BookService();
    }

    drawLibraryCatalog() {
        let content = `<h3>Library Catalog</h3>
                    <div class="catalog-header">
                    <div class="header-left>
                        <div class="options">
                        <label>Show</label>
                        <select id="number-of-books">
                            <option id="10" value="10">10</option>
                            <option id="20" value="20">20</option>
                            <option id="30" value="30">30</option>
                            <option id="40" value="40">40</option>
                            <option id="50" value="50">50</option>
                        </select>
                        <label> entities</label>
                        </div>
                        <div class="header-right">
                        <input placeholder="Search">
                        </div>
                    </div>
                    <table id="book-catalog">
                    </table>
            <h3 id="statistic"></h3>`;
        this._contentDiv.innerHTML = content;
        let table = document.getElementById("book-catalog");
        this.drawTable(table);
        this.createOptionClickEvents();
        this.createBookLinkClickEvent(selectorValues[0]);
    }

    drawTable(table) {
        let selector = document.getElementById("number-of-books");
        let selectorValue = selector.value;
        table.innerHTML = `<tr>
                            <th>Book Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                        </tr>`;
        this._service.getBooks().pipe(
            flatMap(book => book),
            take(selectorValue)
        ).subscribe(book => this.drawCatalogueContent(book, table));
        this.calculateTotalBookCount(selectorValue);
        this.createBookLinkClickEvent(selectorValue);
    }

    drawCatalogueContent(book, table) {
        let content = `<tr>
                        <td><img class="book-cover" src=${book.img}></img></td>
                        <td><a id=${"book" + book.id} href="#">${book.title}</a></td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                    </tr>`;
        table.innerHTML += content;
    }

    calculateTotalBookCount(selectorValue) {
        let stat = document.getElementById("statistic");
        this._service.getBooks().pipe(
            flatMap(book => book),
            scan((acc => acc + 1), 0)
        ).subscribe(total => stat.innerHTML = "Showing " + selectorValue + " of " + total + " books");
    }

    createOptionClickEvents() {
        selectorValues.forEach(val => {
            let option = document.getElementById(val);
            if (!option) {
                return;
            }
            option.onclick = () => {
                console.log("Click");
                let table = document.getElementById("book-catalog");
                this.drawTable(table);
            }
        })
    }

    createBookLinkClickEvent(selectorValue) {
        // let selector = document.getElementById("number-of-books");
        // let selectorValue = selector.value;
        range(1, selectorValue).subscribe(val => this.clickEvent(val));
    }

    clickEvent(val) {
        let id = "book" + val;
        let bookLink = document.getElementById(id);
        console.log(bookLink);
        if (!bookLink) {
            return;
        }
        bookLink.onclick = () => {
            this.drawSingleBook(val);
        }
    }

    drawSingleBook(val) {
        this._service.getBookById(val).pipe(
            map(book => book[0])
        ).subscribe(x => console.log(x));
    }
}