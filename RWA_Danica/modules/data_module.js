import { News } from "../classes/news";

export class DataModule {

    constructor() {
        this._news_list = new Array();
        this._user = null;
    }


    fetch_news_list() {
        fetch("http://localhost:3000/news")
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                else {
                    return res.json();
                }
            })
            .then(news_array => {
                this.import_to_array(news_array);
            })
            .catch(err => console.log(err))
    }

    import_to_array(news_array) {
        news_array.forEach(news => {
            let news_tmp = new News(news.id, news.date, news.tag, news.img, news.headline, news.content);
            this._news_list.push(news_tmp);
        });
    }


    get_news_list() {
        this.fetch_news_list();
        return this._news_list;
    }

}