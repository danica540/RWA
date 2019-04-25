import { BranchService } from "../services/branch-service";
import { BookService } from "../services/book-service";
import { map, flatMap, filter, scan } from "rxjs/operators";
import { zip } from 'rxjs';
import { PatronService } from "../services/patron-services";

const moment = require('moment');

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export class LibraryBranchesComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BranchService();
        this._bookService = new BookService();
        this._patronService = new PatronService();
    }

    returnDefaultViewTemplate() {
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
        return divContent;
    }

    drawDefaultView() {
        this._contentDiv.innerHTML = this.returnDefaultViewTemplate();
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
        const libraryDayTime = object.week[day];
        let currentTime = moment().format('HH:mm');
        const closingHours = libraryDayTime.substr(libraryDayTime.length - 5);
        const openingHours = libraryDayTime.substring(0, 5);

        let libraryIsItOpenObj = {
            isItOpen: "No",
            whenItOpens: ""
        }

        if (this.isSunday(day)) {
            libraryIsItOpenObj.whenItOpens = this.returnMondayWorkingHours(object);
        }
        else if (this.isSaturday(day)) {
            if (this.isClosed(openingHours)) {
                libraryIsItOpenObj.whenItOpens = this.returnMondayWorkingHours(object);
            }
            else {
                if (this.isPassClosingHours(closingHours, currentTime)) {
                    libraryIsItOpenObj.whenItOpens = this.returnMondayWorkingHours(object);
                }
                else {
                    libraryIsItOpenObj = this.isPastOrPreWorkingHours(libraryIsItOpenObj, openingHours, currentTime, closingHours);
                }
            }

        }
        else if (this.isFriday(day)) {
            if (this.isSaturdayNonWorkingDay(object) || this.isPassClosingHours(closingHours, currentTime)) {
                libraryIsItOpenObj.whenItOpens = this.returnMondayWorkingHours(object);
            }
            else {
                libraryIsItOpenObj = this.returnLibraryIsItOpenObj(closingHours, currentTime, openingHours, libraryIsItOpenObj);
            }
        }
        else {
            libraryIsItOpenObj = this.returnLibraryIsItOpenObj(closingHours, currentTime, openingHours, libraryIsItOpenObj);
        }
        return (libraryIsItOpenObj.isItOpen + libraryIsItOpenObj.whenItOpens);
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

    returnSingleBranchTemplate(object) {
        let content = `<div id="single-branch">
                        <img class="branch-img" src=${object.branch.img}></img>
                        <div id="all">
                        <div id="left">
                            <h2>${object.branch.name}</h2>
                            <label><span>Address: </span> ${object.branch.address}</label>
                            <label><span>Telephone: </span> ${object.branch.telephone}</label>
                            <label><span>Email: </span>${object.branch.email}</label>
                            <h4>About ${object.branch.name}:</h4>
                            <p>${object.branch.about}</p>
                            <h4>Working hours:</h4>` + this.drawWorkingHours(object.week) + `
                        </div>
                        <div id="right">
                            <label><span>Year opened: </span> ${object.branch.year_opened}</label>
                            <label id="number-of-patrons"></label>
                            <label id="number-of-assets"></label>
                            <label id="value-of-assets"></label>
                        </div>
                    </div>
                    </div>`;
        return content;
    }

    drawSingleBranch(object) {
        this._contentDiv.innerHTML = this.returnSingleBranchTemplate(object);
        this.updateNumberOfAssetsLabel(object.branch.id);
        this.updateNumberOfPatronsLabel(object.branch.id);
        this.updateValueOfAssetsLabel(object.branch.id);
    }

    updateNumberOfPatronsLabel(libraryId) {
        this._patronService.getAllPatronsWithLibraryIdPromise(libraryId)
            .then(res => { return res.json() })
            .then(patronList => {
                let numberOfPatrons = patronList.reduce((acc => { return acc + 1 }), 0);
                let numberOfPatronsLabel = document.getElementById("number-of-patrons");
                numberOfPatronsLabel.innerHTML = `<span>Number Of Patrons: </span> ${numberOfPatrons}`;
            });
    }

    updateValueOfAssetsLabel(libraryId) {
        this._bookService.getBooks().pipe(
            flatMap(book => book),
            filter(book => book.library_id === libraryId),
            scan(((acc, book) => acc + book.value), 0)
        ).subscribe(valueOfBooks => {
            let valueOfAssetsLabel = document.getElementById("value-of-assets");
            valueOfAssetsLabel.innerHTML = `<span>Value Of Assets: </span> ${valueOfBooks.toFixed(2)} €`;
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

    isSunday(day) {
        return (day === weekDays[6])
    }

    isSaturday(day) {
        return (day === weekDays[5]);
    }

    isClosed(openingHours) {
        return (openingHours === "Close");
    }

    returnMondayWorkingHours(object) {
        const mondayOpeningHours = object.week[weekDays[0]].substring(0, 5);
        let mondayWorkingHours = `<h5>Opens Monday at ${mondayOpeningHours} AM</h5>`;
        return mondayWorkingHours;
    }

    isPassClosingHours(closingHours, currentTime) {
        return (currentTime > closingHours);
    }

    isPreOpeningHours(openingHours, currentTime) {
        return (currentTime < openingHours);
    }

    isSaturdayNonWorkingDay(object) {
        return (object.week[weekDays[5]].substring(0, 5) === "Close");
    }

    isFriday(day) {
        return (day === weekDays[4]);
    }

    returnLibraryIsItOpenObj(closingHours, currentTime, openingHours, libraryIsItOpenObj) {
        if (this.isPassClosingHours(closingHours, currentTime)) {
            libraryIsItOpenObj.whenItOpens = `<h5>Opens Tomorrow at ${openingHours} AM</h5>`;
        }
        else {
            libraryIsItOpenObj = this.isPastOrPreWorkingHours(libraryIsItOpenObj, openingHours, currentTime, closingHours);
        }
        return libraryIsItOpenObj;
    }

    isPastOrPreWorkingHours(libraryIsItOpenObj, openingHours, currentTime, closingHours) {
        if (!this.isPassClosingHours(closingHours, currentTime) && !this.isPreOpeningHours(openingHours, currentTime)) {
            libraryIsItOpenObj.isItOpen = "Yes ";
            libraryIsItOpenObj.whenItOpens = `<h5>Closes Today at ${closingHours} PM</h5>`;
        }
        else if (this.isPreOpeningHours(openingHours, currentTime)) {
            libraryIsItOpenObj.whenItOpens = `<h5>Opens Today at ${openingHours} AM</h5>`;
        }
        return libraryIsItOpenObj;
    }
}