import { NewsListService } from "../services/news-list-service";
import { filter, map, reduce, flatMap } from "rxjs/operators";
import { range } from "rxjs";

const characterNumber = 100;
const begining = 0;

export class NewsListComponent {
    constructor() {
        this._newsService = new NewsListService();
        this._newsListDiv = document.getElementById("news-list-view");
        this._right = document.getElementById("right");
        this._left = document.getElementById("left");
        this._center = document.getElementById("center");
    }

    hide() {
        this._newsListDiv.hideElement();
    }

    initializeComponent() {
        this.initializeAllNews();
        this.initializeLatestNews();
    }

    initializeAllNews() {
        const newsListObs = this._newsService.getNewsList();
        newsListObs.subscribe(newsList => this.showNewsList(newsList));
    }

    makeCertainTopicVisible(topic) {
        if (this._newsListDiv.style.display === "none") {
            this._newsListDiv.showElement();
        }
        const certainNewsObs = this._newsService.getCertainNews(topic);
        certainNewsObs.subscribe(newsList => this.showNewsList(newsList));
        this.initializeLatestNews();
    }

    initializeLatestNews() {
        const latestNewsListObs = this._newsService.getNewsList().pipe(
            flatMap(news => news),
            filter(news => news.new === "true"),
            map(news => ({
                headline: news.headline,
                date: news.date,
                id: news.id
            })
            ));
        this.drawLatestNewsDiv();
        latestNewsListObs.subscribe(shortNews => this.showLatestNews(shortNews));
    }

    makeVisible() {
        this.initializeComponent();
        this._newsListDiv.showElement();
    }

    drawLatestNewsDiv() {
        this._left.innerHTML = `<ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="latestNews-tab" data-toggle="tab" href="#latestNews" role="tab" aria-controls="latestNews" aria-selected="true">Latest news</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="latestNews" role="tabpanel" aria-labelledby="latestNews-tab"></div>
      </div>`;
    }

    showLatestNews(news) {
        const contentDiv = document.getElementById("myTabContent");
        this.drawSingleLatestNews(contentDiv, news);
        this.createEventsForLatestNewsLinks();
    }

    createEventsForLatestNewsLinks() {

        const latestNewsObs = this._newsService.getNewsList().pipe(
            flatMap(news => news),
            filter(news => news.new === "true")
        );
        latestNewsObs.subscribe(news => this.createLatestNewsClickEvent(news));

    }

    createLatestNewsClickEvent(news) {
        let latestNewsLink = document.getElementById("link" + news.id);

        latestNewsLink.onclick = () => {
            const newsId = latestNewsLink.id.replace("link", "");
            this.getSingleNews(newsId);
        }
    }

    drawSingleLatestNews(contentDiv, news) {
        contentDiv.innerHTML += `<div class="tab-pane fade show active" id="latestNews" role="tabpanel" aria-labelledby="latestNews-tab">
        <label>${news.date}</label><a id="${"link" + news.id}" class="latestHeadline" href="#">${news.headline}</a></div><hr>`;

    }

    returnShortVersionOfContent(content) {
        return content.substring(begining, characterNumber).concat("...");
    }

    drawNews(news, container) {
        let divContent = `<div class="card">
        <span id="tag-news" class="badge">${news.tag}</span>
        <img src="${news.img}" class="card-img-top">
        <div class="card-body">
        <h4>${news.headline}</h4>
        <h6> ${news.date}</h6>
        <p class="card-text">${this.returnShortVersionOfContent(news.content)}</p>
        <a href="#" id="${news.id}"  class="btn">More</a>
        </div>
        </div>`;
        container.innerHTML += divContent;
    }

    numberOfNews() {
        const numberOfNews = this._newsService.getNewsList().pipe(
            flatMap(news => news),
            reduce((acc => acc + 1), 0)
        );
        numberOfNews.subscribe(acc => this.createMoreBtnClickEvent(acc));
    }

    createMoreBtnClickEvent(numberOfNews) {
        range(1, numberOfNews).subscribe(val => {
            let btn = document.getElementById(val);
            if (!btn) {
                return;
            }
            btn.onclick = () => {
                this.getSingleNews(btn.id);
            }
        })
    }

    getSingleNews(id) {
        this._newsService.getNewsById(id).pipe(
            map(news => news[0])
        ).subscribe(news => this.showSingleNews(news))
    }

    showSingleNews(news) {
        this._right.innerHTML = "";
        this._right.hideElement();
        let divContent = `<div class="card">
        <span id="tag-news" class="badge">${news.tag}</span>
        <img src="${news.img}" class="card-img-top">
        <div class="card-body">
        <h4>${news.headline}</h4>
        <h6> ${news.date}</h6>
        <p class="card-text">${news.content}</p>
        </div>
        </div>`;
        this._center.innerHTML = divContent;
    }

    showNewsList(newsList) {
        if (this._right.style.display === "none") {
            this._right.showElementBlock();
        }
        this._right.innerHTML = "";
        this._center.innerHTML = "";

        newsList.forEach((news, index) => {
            if (index % 2 === 0) {
                this.drawNews(news, this._right);
            }
            else {
                this.drawNews(news, this._center);
            }
        })
        this.numberOfNews();
    }

}