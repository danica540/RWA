import { range } from "rxjs";
import { Router } from "../classes/router";

export class NavBarComponent {
    constructor() {
        this._navBar = document.getElementById("nav-bar");
        this._router = new Router();
    }

    onInit() {
        let divContent = `
        <ul>
            <li class="list-item">Library System of Niš</li>
            <li class="separator"></li>
            <li><a class="list-item" id="link-4" href="#home">Home</a></li>
            <li><a class="list-item" id="link-1" href="#catalog">Catalog</a></li>
            <li><a class="list-item" id="link-2" href="#patrons">Patrons</a></li>
            <li><a class="list-item" id="link-3" href="#branches">Branches</a></li>
        </ul>`;
        this._navBar.innerHTML = divContent;

        this.createEvents();
    }

    createEvents() {
        range(1, 4).subscribe(val => this.createLinkClickEvent(val));
    }

    createLinkClickEvent(val) {
        let singleLink = document.getElementById("link-"+val);
        if(!singleLink){
            return;
        }
        singleLink.onclick = () => {
            this._router.navigateToPage(val);
        }
    }
}