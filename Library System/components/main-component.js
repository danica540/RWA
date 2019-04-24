import { MainViewService } from "../services/main-view-service";
import { map, flatMap, reduce } from "rxjs/operators";
import { range } from "rxjs";
import { Router } from "../classes/router";

export class MainComponent {
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new MainViewService();
        this._router = new Router();
    }

    drawMainView() {
        let divContent = `<h1>Welcome to Library System of Niš</h1>
                            <div id="container"></div`;
        this._contentDiv.innerHTML = divContent;
        let containerDiv = document.getElementById("container");
        containerDiv.innerHTML = "";
        this._service.getMainViewItemsPromise()
            .then(res => { return res.json() })
            .then(mainItemsList => {
                mainItemsList.forEach(item => this.drawContainerElements(containerDiv, item))
            })
        // this._service.getMainViewItems().pipe(
        //     flatMap(item => item),
        //     map(item => ({
        //         id: item.id,
        //         img: item.img,
        //         description: item.description,
        //         btnContent: "VIEW " + item.title.toUpperCase()
        //     }))
        // )
        //     .subscribe(item => this.drawContainerElements(containerDiv, item));
        this.createClickEvents();
    }

    drawContainerElements(containerDiv, item) {
        let btnContent = "VIEW " + item.title.toUpperCase()
        let divContent = `<div id="${item.id}" class="container-element">
                        <img class="container-img" src=${item.img}></img>
                        <p>${item.description}</p>
                        <p class="button">${btnContent}</p>
                        </div>`;
        containerDiv.innerHTML += divContent;
    }

    createClickEvents() {
        //let numberOfContainerElements = 
        this._service.getMainViewItemsPromise()
        .then(res => { return res.json() })
            .then(mainItemsList => {
                let number=mainItemsList.reduce((acc => acc + 1), 0);
                this.createContainerElementClickEvent(number)
            })
        // .pipe(
        //     flatMap(item => item),
        //     reduce((acc => acc + 1), 0)
        // );
        // numberOfContainerElements.subscribe(number => this.createContainerElementClickEvent(number));
    }

    createContainerElementClickEvent(number) {
        range(1, number).subscribe(val => {
            let singleDiv = document.getElementById(val);
            singleDiv.onclick = () => {
                this._router.navigateToPage(val);
            }
        })
    }
}