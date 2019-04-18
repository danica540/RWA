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

    getNewsListByDate(date){
        return from(
            fetch("http://localhost:3000/news?q=" + date)
                .then(res => { return res.json() })
        )
    }

    getNewsByTextSearch(headline) {
        return from(
            fetch("http://localhost:3000/news?q=" + headline)
                .then(res => { return res.json() })
        )
    }

}