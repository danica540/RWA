import { BookService } from "../services/book-service";
import { flatMap, take, scan, map, debounceTime, switchMap, filter } from "rxjs/operators";
import { fromEvent, range } from "rxjs";
import { BranchService } from "../services/branch-service";

const selectorValues = [10, 20, 30, 40, 50];

export class LibraryCatalogComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BookService();
        this._branchService = new BranchService();
    }

    drawLibraryCatalog() {
        let content = this.returnLibraryCatalogTemplate();
        this._contentDiv.innerHTML = content;
        let table = document.getElementById("book-catalog");
        this.drawTable(table);
        this.createOptionClickEvents();
        this.createSearchInputEvent();
    }

    returnLibraryCatalogTemplate(){
        let content = `<h1>Library Catalog</h1>
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
                        <input id="search-input" placeholder="Search">
                        </div>
                    </div>
                    <div id="center-table">
                    <table id="book-catalog">
                    <tr>
                            <th>Book Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th></th>
                        </tr>
                    </table>
                    <div>
            <h4 id="statistic"></h4>`;
            return content;
    }

    drawTable(table) {
        let selector = document.getElementById("number-of-books");
        let selectorValue = selector.value;
        this._service.getBooks().pipe(
            flatMap(book => book),
            take(selectorValue)
        ).subscribe(book => this.drawCatalogueContent(book, table, selectorValue));
        this.calculateTotalBookCount(selectorValue);
    }

    returnBookContent(book) {
        let content = `<tr>
                        <td><img class="book-cover" src=${book.img}></img></td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td><a id="book-link${book.id}" href="#">More</a></td>
                    </tr>`;
        return content;
    }

    drawCatalogueContent(book, table, selectorValue) {
        let content = this.returnBookContent(book);
        table.innerHTML += content;
        this.createBookLinkClickEvent(selectorValue);
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
                let table = document.getElementById("book-catalog");
                this.drawTable(table);
            }
        })
    }

    createBookLinkClickEvent(selectorValue) {
        range(1, selectorValue).subscribe(val => {
            let bookLink = document.getElementById("book-link" + val);
            if (!bookLink) {
                return;
            }
            bookLink.onclick = () => {
                this.drawSingleBook(val);
            }
        });
    }

    drawSingleBook(val) {
        this._service.getBookById(val).subscribe(book => {
            this._branchService.getBranches().pipe(
                flatMap(lib => lib),
                filter(lib => lib.id === book.library_id),
                map(lib => lib.name)
            ).subscribe(lib => this.drawSingleBookContent(lib, book));
        });
    }

    drawSingleBookContent(libName, book) {
        this._contentDiv.innerHTML = this.returnSingleBookTemplate(book, libName);
        this.changeBookButtons(book.available);
        this.addReserveEvent(book);
    }

    returnSingleBookTemplate(book, libName) {
        let content = `<h1>View Library Item</h1>
                        <div id="all-library-item">
                        <div>
                        <img id="img-library-item" src=${book.img}></img>
                        </div>
                        <div id="center-library-item">
                        <h3>${book.title}</h3>
                        <h4>${book.author}</h4>
                        <label><span>Last Location: </span>${libName}</label>
                        <button class="library-item-button" id="available"></button>
                        <input class="library-item-button" id="reserve" type = "button" >
                        </div>
                        <div id="right-library-item">
                        <label><span>Book Genre: </span>${book.genre}</label>
                        <label><span>Replacement Cost: </span>${book.value} €</label>
                        </div>
                        </div>`;
        return content;
    }

    addReserveEvent(book) {
        let reserveButton = document.getElementById("reserve");
        reserveButton.onclick = () => {
            this.reserveBook(book);
        }
    }

    reserveBook(book) {
        let patronId = prompt("Enter your patron id : ", "your patron id here");  
        if(this.validatePatronId(patronId)){
            alert(`You reserved ${book.title} by ${book.author}`);
            this.changeBookButtons("false");
        }
        else{
            alert("Wrong patron id");
        }
    }

    validatePatronId(){
        // DODATI
    }

    changeBookButtons(available) {
        let isItAvailable = "Available";
        let checkOut = "Reserve";
        if (available === "false") {
            isItAvailable = "Not Available";
            checkOut = "Reserved";
        }
        let availableButton = document.getElementById("available");
        let reserveButton = document.getElementById("reserve");
        availableButton.innerHTML = isItAvailable;
        reserveButton.value = checkOut;
        this.changeButtonColors(availableButton, reserveButton, isItAvailable);
    }

    changeButtonColors(availableButton, reserveButton, isItAvailable) {
        if (isItAvailable === "Available") {
            availableButton.style.backgroundColor = "#c93a4f";
            reserveButton.style.backgroundColor = "#3a83c9";
            reserveButton.disabled = false;
        }
        else {
            availableButton.style.backgroundColor = "#3a83c9";
            reserveButton.style.backgroundColor = "#c93a4f";
            reserveButton.disabled = true;
        }
    }

    createSearchInputEvent() {
        this._searchInput = document.getElementById("search-input");
        fromEvent(this._searchInput, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
            switchMap(text => this._service.getBookBySearchValue(text))
        )
            .subscribe(bookList => this.drawSearchedBooks(bookList));
    }

    drawSearchedBooks(bookList) {
        console.log(bookList);
        if (bookList.length === 0) {
            this._contentDiv.innerHTML = "<h5>No search results</h5>";
        }
        let table = document.getElementById("book-catalog");
        table.innerHTML = `<tr>
                            <th>Book Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th></th>
                        </tr>`;
        this.drawSearchedContent(bookList, table);
        this.calculateTotalBookCount(bookList.length);
    }

    drawSearchedContent(bookList, table) {
        let content = "";
        bookList.forEach(book => {
            content += this.returnBookContent(book);
        });
        table.innerHTML += content;
    }
}