import { BranchService } from "../services/branch-service";
import { BookService } from "../services/book-service";
import { map, flatMap, filter, scan, range } from "rxjs/operators";
import { PatronService } from "../services/patron-services";

export class PatronsComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new PatronService();
        this._branchService = new BranchService();
    }

    drawPatronList() {
        let divContent = `<h1>Patron List</h1>
                        <div id="table-div">
                        <div class="side"></div>
                        <div class="center">
                        <table id="patrons">
                        <tr class="patron-table">
                        <th class="patron-table">Profile Link</th>
                        <th class="patron-table">Last Name</th>
                        <th class="patron-table">First Name</th>
                        <th class="patron-table">Library Card Id</th>
                        <th class="patron-table">Home Library</th>
                        </tr>
                        </table>
                        </div>
                        <div class="side"></div>
                        </div>`;
        this._contentDiv.innerHTML = divContent;
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

    drawPatronTableRow(patron, table, libraryList) {
        let innerContent = `<tr class="patron-table">
                            <td class="patron-table"><a id="profile-link${patron.id}" href="#"><img class="profile-pic" src="../resources/user(4).png"></img></a></td>
                            <td class="patron-table">${patron.last_name}</td>
                            <td class="patron-table">${patron.first_name}</td>
                            <td class="patron-table">${patron.id}</td>
                            <td class="patron-table" id="library-name">${this.getHomeLibraryName(patron.library_id, libraryList)}</td>
                            </tr>`;
        table.innerHTML += innerContent;
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
            })
    }

    returnSinglePatronTemplate(patron, libName) {
        let content = `<h1>Patron Information</h1>
                        <div id="all-patron-item">
                        <div class="left-patron-item">
                        <h2>${patron.first_name + " " + patron.last_name}</h2>
                        <label><span>Library Card ID: </span>${patron.id}</label>
                        <label><span>Member since: </span>${patron.member_since}</label>
                        <label><span>Home Library: </span>${libName}</label>
                        </div>
                        <div class="center-patron-item">
                        <h3>Assets Currently Cheched Out</h3>
                        
                        </div>
                        <div class="right-patron-item">
                        <h3>Assets Currently On Hold</h3>
                        </div>
                        </div>`;
        return content;
    }

}