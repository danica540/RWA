import { BranchService } from "../services/branch-service";
import { map, flatMap } from "rxjs/operators";
import { zip } from 'rxjs';
const moment = require('moment'); // iz node-a

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export class LibraryBranches {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BranchService();
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
        this._service.getBranches().pipe(
            flatMap(item => item),
            map(branch => ({
                name: branch.name,
                id: branch.id
            }))
        ).subscribe(object => this.drawTableContent(object, table));
    }

    drawTableContent(object, table) {
        //let date = moment().format("DD");
        //let day = date.day;
        console.log(moment().format('dddd'));
        let day=moment().format('dddd');
        day=day.charAt(0).toLowerCase()+day.slice(1);
        console.log(day);
        let libraryDay=object[day];
        let innerContent = `<tr class="branch-table">
                            <td class="branch-table"><a class="library-name" href="#" id="table-${object.id}">${object.name}</a></td>
                            <td class="branch-table">${"Yes"}</td>
                            </tr>`;
        // OPEN NOW SREDITI
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
                        </div>
                    </div>
                    </div>`;
        this._contentDiv.innerHTML = content;
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