export class DataModule {

    constructor() {
        this._news_list = [];
        this._user = null;
    }

    import_to_array(news_list) {
        news_list.forEach(news => {
            this._news_list.push(news);
        });
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
            .then(news_list => this.import_to_array(news_list))
            .catch(err => console.log(err))
    }


    get_news_list() {
        this.fetch_news_list();
        return this._news_list;
    }

}