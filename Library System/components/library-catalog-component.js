import { BookService } from "../services/book-service";
import { flatMap, take, scan, map, debounceTime, switchMap, filter } from "rxjs/operators";
import { fromEvent, range } from "rxjs";
import { BranchService } from "../services/branch-service";
import { PatronService } from "../services/patron-services";

const moment = require('moment');
const selectorValues = [10, 20, 30, 40, 50];

export class LibraryCatalogComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BookService();
        this._branchService = new BranchService();
        this._patronService = new PatronService();
    }

    drawLibraryCatalog() {
        let content = this.returnLibraryCatalogTemplate();
        this._contentDiv.innerHTML = content;
        let table = document.getElementById("book-catalog");
        let selectorValue = document.getElementById("number-of-books").value;
        this.drawTable(table, selectorValue);
        this.createOptionClickEvents();
        this.createSearchInputEvent();
    }

    returnLibraryCatalogTemplate() {
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
                    
                    </table>
                    <div>
            <h4 id="statistic"></h4>
            <div id="pages">
            <button id="previous" class="page-btn">Previous</button>
            <label><span id="page-number">1</span></label>
            <button id="next" class="page-btn">Next</button>
            </div>`;
        return content;
    }

    drawTable(table, selectorValue) {
        table.innerHTML = this.returnTableHeaderTemplate();
        this._service.getBooks().pipe(
            flatMap(book => book),
            take(selectorValue)
        ).subscribe(book => this.drawCatalogueContent(book, table, selectorValue));
        this.updateStatisticsLabel(selectorValue);
        this.createPageBtnClickEvents();
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


    updateStatisticsLabel(selectorValue) {
        let stat = document.getElementById("statistic");
        this._service.getBooks().pipe(
            flatMap(book => book),
            scan((acc => acc + 1), 0)
        ).subscribe(total => stat.innerHTML = "Showing " + selectorValue + " of " + total + " books");
    }

    createOptionClickEvents() {
        document.getElementById("pages").style.display = "flex";
        selectorValues.forEach(val => {
            let option = document.getElementById(val);
            if (!option) {
                return;
            }
            option.onclick = () => {
                document.getElementById("page-number").innerHTML = "1";
                let table = document.getElementById("book-catalog");
                this.drawTable(table, option.value);
            }
        })
    }

    createBookLinkClickEvent(selectorValue) {
        let ofset = parseInt(document.getElementById("page-number").innerHTML);
        range((ofset - 1) * selectorValue + 1, selectorValue).subscribe(val => {
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
                        <label><span>ISBN: </span>${book.id}</label>
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

        // fromEvent(document, "keypress").subscribe(ev => {
        //     if (ev.keyCode === 13) {
        //         console.log("enter");
        //         this.reserveBook(book);
        //     }
        // });
    }

    reserveBook(book) {
        let rightDiv = document.getElementById("right-library-item");
        rightDiv.innerHTML = ``;
        let centerDiv = document.getElementById("center-library-item");
        this.drawIdInput(centerDiv);
        let onHoldBtn = document.getElementById("place-on-hold-button");
        onHoldBtn.onclick = () => {
            let patronId = document.getElementById("library-card-id-input").value;
            this.validatePatronId(patronId, book);
        }
    }

    drawIdInput(centerDiv) {
        let content = `<span>Enter Your Library Card Id</span>
                    <input id="library-card-id-input" type="text">
                    <button id="place-on-hold-button">Place on hold</button>`;
        centerDiv.innerHTML = content;
    }

    validatePatronId(id, book) {
        this._patronService.getPatronByIdPromise(id)
            .then(res => { return res.json() })
            .then(user => {
                if (!user.id) {
                    alert("Invalid Library Card Id");
                }
                else {
                    this._service.getBooksByPatronId(id)
                        .then(res => { return res.json() })
                        .then(bookList => {
                            if (bookList.length === 3) {
                                alert("You can't reserve any more books.\nYou can only have 3 books on hold at the same time!");
                                this.drawSingleBook(book.id)
                                return;
                            }
                            else {
                                this.updateBook(book, user);
                            }
                        });
                }
            })
    }

    updateBook(book, user) {
        alert("Your reservation was a success. \nYou have 24 hours to pick up your book.");
        book.time_placed = moment().format('LLLL');
        book.available = "false";
        book.patron_id = user.id;
        this._service.updateBookAvailability(book)
            .then(res => { return res.json() })
            .then(book => this.drawSingleBook(book.id));
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
        if (bookList.length === 0) {
            this._contentDiv.innerHTML = "<h5>No search results found</h5>";
        }
        let table = document.getElementById("book-catalog");
        table.innerHTML = this.returnTableHeaderTemplate();
        this.drawSearchedContent(bookList, table);
        this.updateStatisticsLabel(bookList.length);
        document.getElementById("pages").style.display = "none";
    }

    drawSearchedContent(bookList, table) {
        let content = "";
        bookList.forEach(book => {
            content += this.returnBookContent(book);
        });
        table.innerHTML += content;
    }

    createPageBtnClickEvents() {
        document.getElementById("pages").style.display = "flex";
        let nextBtn = document.getElementById("next");
        let previousBtn = document.getElementById("previous");
        let ofset = parseInt(document.getElementById("page-number").innerHTML);
        let pageSize = parseInt(document.getElementById("number-of-books").value);

        this.updateNextBtnAppearance(ofset, pageSize, nextBtn);
        this.updatePreviousBtnAppearance(ofset, previousBtn);

        nextBtn.onclick = () => {
            this.createNextClickEvent(ofset, pageSize);
        }
        previousBtn.onclick = () => {
            this.createPreviousClickEvent(ofset, pageSize);
        }
    }

    updatePreviousBtnAppearance(ofset, previousBtn) {
        if (ofset === 1) {
            previousBtn.disabled = true;
        }
        else {
            previousBtn.disabled = false;
        }
    }

    updateNextBtnAppearance(ofset, pageSize, nextBtn) {
        this._service.getBooksPromise()
            .then(res => { return res.json() })
            .then(bookList => {
                return bookList.reduce((acc => acc + 1), 0);
            })
            .then(totalBookCount => {
                if (totalBookCount <= ofset * pageSize) {
                    nextBtn.disabled = true;
                }
                else {
                    nextBtn.disabled = false;
                }
            });
    }

    updatePageNumber(ofset) {
        document.getElementById("page-number").innerHTML = ofset;
    }

    createPreviousClickEvent(ofset, pageSize) {
        let table = document.getElementById("book-catalog");
        this.updatePageNumber(parseInt(ofset - 1));
        this.drawSinglePageOfBooks(table, (ofset - 1), pageSize);
    }

    createNextClickEvent(ofset, pageSize) {
        let table = document.getElementById("book-catalog");
        this.updatePageNumber(parseInt(ofset + 1));
        this.drawSinglePageOfBooks(table, (ofset + 1), pageSize);
    }

    returnTableHeaderTemplate() {
        let content = `<tr>
                        <th>Book Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th></th>
                    </tr>`;
        return content;
    }

    drawSinglePageOfBooks(table, ofset, pageSize) {
        table.innerHTML = this.returnTableHeaderTemplate();
        this._service.getBooksByPage(ofset, pageSize)
            .then(res => { return res.json() })
            .then(bookList => {
                bookList.forEach(book => {
                    this.drawCatalogueContent(book, table, pageSize);
                    this.updateStatisticsLabel(bookList.length);
                })
            })
        this.createPageBtnClickEvents();
    }
}