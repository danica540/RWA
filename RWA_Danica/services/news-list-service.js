import { from } from "rxjs";

export class NewsListService {

    //servis
    constructor() {
    }

    getNewsList() {
        return from(
            fetch("http://localhost:3000/news/")
                .then(res => { return res.json() })
        )
    }

}