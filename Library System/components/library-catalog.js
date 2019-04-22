import {BookService} from "../services/book-service";
export class LibraryCatalog{
    constructor() {
        this._contentDiv = document.getElementById("content");
        this._service = new BookService();
    }

    draw(){
        this._contentDiv.innerHTML="Div";
    }
}