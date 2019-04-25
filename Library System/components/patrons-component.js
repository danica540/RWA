import { BranchService } from "../services/branch-service";
import { PatronService } from "../services/patron-services";
import { BookService } from "../services/book-service";
import { map, debounceTime, switchMap } from "rxjs/operators";
import { fromEvent, range } from "rxjs";

export class PatronsComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new PatronService();
        this._branchService = new BranchService();
        this._bookService = new BookService();
    }

    returnPatronViewTemplate() {
        let divContent = `<h1>Patron List</h1>
                        <div id="table-div">
                        <div class="side"></div>
                        <div class="center">
                        <table id="patrons">
                        <tr class="patron-table">
                        <th class="patron-table">Profile Link</th>
                        <th class="patron-table">Last Name</th>
                        <th class="patron-table">First Name</th>
                        <th class="patron-table">Home Library</th>
                        </tr>
                        </table>
                        </div>
                        <div class="side"></div>
                        </div>`;
        return divContent;
    }

    drawPatronList() {
        this._contentDiv.innerHTML = this.returnPatronViewTemplate();
        let table = document.getElementById("patrons");
        this.drawTable(table);
    }

    drawTable(table) {
        let promise1 = this._service.getAllPatronsPromise().then(res => { return res.json() });
        let promise2 = this._branchService.getBranchesPromise().then(res => { return res.json() });
        Promise.all([promise1, promise2])
            .then((values) => {
                values[0].forEach(patron => {
                    this.drawPatronTableRow(patron, table, values[1]);
                });
            });
    }

    returnSinglePatronRow(patron, libraryList) {
        let innerContent = `<tr class="patron-table">
                            <td class="patron-table"><a id="profile-link${patron.id}" href="#"><img class="profile-pic" src="../resources/user(4).png"></img></a></td>
                            <td class="patron-table">${patron.last_name}</td>
                            <td class="patron-table">${patron.first_name}</td>
                            <td class="patron-table" id="library-name">${this.getHomeLibraryName(patron.library_id, libraryList)}</td>
                            </tr>`;
        return innerContent;
    }

    drawPatronTableRow(patron, table, libraryList) {
        table.innerHTML += this.returnSinglePatronRow(patron, libraryList);
        this.createClickEvents();
    }

    getHomeLibraryName(patronLibraryId, libraryList) {
        return libraryList.filter(lib => lib.id === patronLibraryId).map(lib => lib.name);
    }

    createClickEvents() {
        this._service.getAllPatronsPromise()
            .then(res => { return res.json() })
            .then(patronList => {
                let userIdList = patronList.map(patron => patron.id);
                userIdList.forEach(id => {
                    let link = document.getElementById(`profile-link${id}`);
                    link.onclick = () => {
                        let libraryName = document.getElementById(`library-name`).innerHTML;
                        this.drawSinglePatron(id, libraryName);
                    }
                })
            })
    }

    drawSinglePatron(id, libraryName) {
        this._service.getPatronByIdPromise(id)
            .then(res => { return res.json() })
            .then(patron => {
                this._contentDiv.innerHTML = this.returnSinglePatronTemplate(patron, libraryName);
                this.drawItemsCurrentlyOnHoldTemplate(patron);
            })
    }

    returnSinglePatronTemplate(patron, libName) {
        let content = `<h1>Patron Information</h1>
                        <div id="all-patron-item">
                        <div class="left-patron-item">
                        <h2>${patron.first_name + " " + patron.last_name}</h2>
                        <label><span>Member since: </span>${patron.member_since}</label>
                        <label><span>Home Library: </span>${libName}</label>
                        </div>
                        <div id="right-patron-item">
                        </div>
                        </div>`;
        return content;
    }

    drawItemsCurrentlyOnHoldTemplate(patron) {
        this._bookService.getBooksByPatronId(patron.id)
            .then(res => { return res.json() })
            .then(bookList => {
                let warning = " ";
                if (bookList.length === 3) {
                    warning = "<h3 id='warning'>You can't reserve any more books.</h3>"
                }
                let rightDiv = document.getElementById("right-patron-item");
                let content = `<h3>Assets Currently On Hold</h3>`;
                if (bookList.length === 0) {
                    content += `<label>No Books On Hold</label>`;
                }
                else {
                    content += `<ul class="patron-ul">`;
                    bookList.forEach(book => {
                        content += `<li>
                                ${"<span>Book: </span>" + book.title + " by " + book.author + " <span>Time placed: </span>" + book.time_placed}
                        </li>`
                    })
                    content += `</ul>`;
                }
                rightDiv.innerHTML = (content + warning);
            })
    }

}