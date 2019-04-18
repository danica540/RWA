import { NewsListService } from "../services/news-list-service";
import { sampleTime, filter, map, switchMap, tap, flatMap } from "rxjs/operators";

const characterNumber = 100;
// on click eventi

export class NewsListComponent {
    constructor() {
        this._newsService = new NewsListService();
        this._newsListDiv = document.getElementById("news-list-view");
        this._left = document.getElementById("left");
        this._right = document.getElementById("right");
        this._center = document.getElementById("center");
    }

    hide() {
        this._newsListDiv.hideElement();
    }

    initializeComponent(){
        const newsListObs = this._newsService.getNewsList();
        const latestNewsListObs = this._newsService.getNewsList().pipe(
            flatMap(news => news),
            filter(news => news.new === "true"),
            map(news => ({
                headline: news.headline,
                date: news.date
            })
            ));
        newsListObs.subscribe(newsList => this.showNewsList(newsList));
        this.drawLatestNews();
        latestNewsListObs.subscribe(shortNews => this.showLatestNews(shortNews));
    }

    makeVisible() {
        this.initializeComponent();
        this._newsListDiv.showElement();
    }

    drawLatestNews() {
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
        this.drawSingleLatestNews(contentDiv, news)
    }

    drawSingleLatestNews(contentDiv, news) {
        contentDiv.innerHTML += `<div class="tab-pane fade show active" id="latestNews" role="tabpanel" aria-labelledby="latestNews-tab">
        <label class="bold">${news.date}</label><a id="latestHeadline" href="#">${news.headline}</a></div><hr>`;
    }

    returnShortVersionOfContent(content) {
        return content.substring(0, characterNumber).concat("...");
    }

    drawNews(news, container) {
        let divContent = `<div class="card">
        <span id="tag-news" class="badge">${news.tag}</span>
        <img src="${news.img}" class="card-img-top">
        <div class="card-body">
        <h4>${news.headline}</h4>
        <h6> ${news.date}</h6>
        <p class="card-text">${this.returnShortVersionOfContent(news.content)}</p>
        <a href="#" class="btn" id="more-btn">More</a>
        </div>
        </div>`;
        container.innerHTML += divContent;
    }

    showNewsList(newsList) {
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
    }

}