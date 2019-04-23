import { BranchService } from "../services/branch-service";
import { BookService } from "../services/book-service";
import { map, flatMap, filter, scan } from "rxjs/operators";
import { zip } from 'rxjs';

const moment = require('moment'); // iz node-a

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export class LibraryBranches {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BranchService();
        this._bookService = new BookService();
    }

    drawDefaultView() {
        let divContent = `<h1>Libraries of Niš</h1>
                        <div id="table-div">
                        <div class="side"></div>
                        <div class="center">
                        <table id="branches">
                        <tr class="branch-table">
                        <th class="branch-table">Branch Name</th>
                        <th class="branch-table">Open Now</th>
                        </tr>
                        </table>
                        </div>
                        <div class="side"></div>
                        </div>`;
        this._contentDiv.innerHTML = divContent;
        let table = document.getElementById("branches");
        this.drawTable(table);
    }

    drawTable(table) {
        let branches$ = this._service.getBranches().pipe(
            flatMap(item => item)
        );
        let weekHours$ = this._service.getWeekHours().pipe(
            flatMap(item => item)
        );
        zip(weekHours$, branches$).pipe(
            map(([week, branch]) => ({ week, branch }))
        ).subscribe(object => {
            this.drawTableContent(object, table)
        });
    }

    isLibraryOpen(object) {
        let day = moment().format('dddd');
        day = day.charAt(0).toLowerCase() + day.slice(1);
        let libraryDayTime = object.week[day];
        let currentTime = moment().format('HH:mm');
        let closingHours = libraryDayTime.substr(libraryDayTime.length - 5);
        let openingHours = libraryDayTime.substring(0, 5);
        let isItOpen = "No";
        if (currentTime < closingHours && currentTime > openingHours) {
            isItOpen = "Yes";
        }
        return isItOpen;
    }

    drawTableContent(object, table) {
        let innerContent = `<tr class="branch-table">
                            <td class="branch-table"><a class="library-name" href="#" id="table-${object.branch.id}">${object.branch.name}</a></td>
                            <td class="branch-table">${this.isLibraryOpen(object)}</td>
                            </tr>`;
        table.innerHTML += innerContent;
        this.createClickEvents();
    }

    createClickEvents() {
        let branches$ = this._service.getBranches().pipe(
            flatMap(item => item)
        );
        let weekHours$ = this._service.getWeekHours().pipe(
            flatMap(item => item)
        );
        zip(weekHours$, branches$).pipe(
            map(([week, branch]) => ({ week, branch }))
        ).subscribe(object => {
            let tableLink = document.getElementById("table-" + object.branch.id);
            if (!tableLink) {
                return;
            }
            tableLink.onclick = () => {
                this.drawSingleBranch(object);
            }
        });
    }

    drawSingleBranch(object) {
        let content = `<div id="single-branch">
                        <img class="branch-img" src=${object.branch.img}></img>
                        <div id="all">
                        <div id="left">
                            <h2>${object.branch.name}</h2>
                            <label><span>Address: </span> ${object.branch.address}</label>
                            <label><span>Telephone: </span> ${object.branch.telephone}</label>
                            <label><span>Email: </span>${object.branch.email}</label>
                            <h4>About ${object.branch.name}</h4>
                            <p>${object.branch.about}</p>
                            <h5>Working hours:</h5>` + this.drawWorkingHours(object.week) + `
                        </div>
                        <div id="right">
                            <label><span>Year opened: </span> ${object.branch.year_opened}</label>
                            <label><span>Number Of Patrons: </span> ${object.branch.year_opened}</label>
                            <label id="number-of-assets"></label>
                            <label id="value-of-assets"></label>
                        </div>
                    </div>
                    </div>`;
        this._contentDiv.innerHTML = content;
        this.updateNumberOfAssetsLabel(object.branch.id);
        this.updateNumberOfPatronsLabel(object.branch.id); // DODATI
        this.updateValueOfAssetsLabel(object.branch.id);
    }

    updateNumberOfPatronsLabel(libraryId) {
        // URADITI
    }

    updateValueOfAssetsLabel(libraryId) {
        this._bookService.getBooks().pipe(
            flatMap(book => book),
            filter(book => book.library_id === libraryId),
            scan(((acc, book) => acc + book.value), 0)
        ).subscribe(valueOfBooks => {
            let valueOfAssetsLabel = document.getElementById("value-of-assets");
            valueOfAssetsLabel.innerHTML = `<span>Value Of Assets: </span> ${valueOfBooks.toFixed(2)}`;
        })
    }

    updateNumberOfAssetsLabel(libraryId) {
        this._bookService.getBooks().pipe(
            flatMap(book => book),
            filter(book => book.library_id === libraryId),
            scan((acc => acc + 1), 0)
        ).subscribe(numberOfBooks => {
            let numberOfAssetsLabel = document.getElementById("number-of-assets");
            numberOfAssetsLabel.innerHTML = `<span>Number Of Assets: </span> ${numberOfBooks}`;
        })
    }

    drawWorkingHours(object) {
        let content = `<ul class="working-hours">`;
        weekDays.forEach(day => {
            let weekDay = day.charAt(0).toUpperCase() + day.slice(1);
            content += `<li> <span>${weekDay}</span> ${object[day]}</li>`
        })
        content += `</ul>`;
        return content;
    }
}