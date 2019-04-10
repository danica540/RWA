import { News } from "../classes/news";
import { from } from "rxjs";

export class DataModule {

    constructor() {
        this._news_list = new Array();
        this._user = null;
    }

    get_news_list() {
        return from(
            fetch("http://localhost:3000/news/")
                .then(res => { return res.json() })
        )
    }

}