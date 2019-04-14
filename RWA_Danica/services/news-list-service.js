import { from } from "rxjs";

export class NewsListService {

    //servis
    constructor() {
        this._news_list = new Array();
    }

    getNewsList() {
        return from(
            fetch("http://localhost:3000/news/")
                .then(res => { return res.json() })
        )
    }

}