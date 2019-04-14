import { NewsListService } from "../services/news-list-service"
import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

const CHARACTER_NUMBER = 100;
// on click eventi

export class NewsListComponent {
    constructor() {
        this._newsService = new NewsListService();
        this._newsListDiv = document.getElementById("news-list-view");
    }

    hide() {
        this._newsListDiv.hideElement();
    }

    makeVisible() {
        this._newsService.getNewsList().subscribe(newsList => this.showNewsList(newsList));
        this._newsListDiv.showElement();
    }

    returnShortVersionOfContent(content) {
        return content.substring(0, CHARACTER_NUMBER).concat("...");
    }

    drawNews(news, container) {
        let divContent = `<div class="card">
        <span class="badge">${news.tag}</span>
        <img src="${news.img}" class="card-img-top">
        <div class="card-body">
        <h4>${news.headline}</h4>
        <h6> ${news.date}</h6>
        <p class="card-text">${this.returnShortVersionOfContent(news.content)}</p>
        <a href="#" class="btn btn-secondary">More</a>
        </div>
        </div>`;
        container.innerHTML += divContent;
    }

    showNewsList(newsList) {
        this._newsListDiv.innerHTML = "";
        this._newsListDiv.innerHTML+="";
        let divContent = `<div class="container" id="right"></div>
                        <div class="container" id="center"></div>
                        <div class="container" id="left"></div>`;
        this._newsListDiv.innerHTML = divContent;

        let left = document.getElementById("left");
        let right = document.getElementById("right");
        let center = document.getElementById("center");

        newsList.forEach((news, index) => {
            if (index % 3 === 0) {
                this.drawNews(news, right);
            }
            else if (index % 3 === 1) {
                this.drawNews(news, center);
            }
            else {
                this.drawNews(news, left);
            }
        })
    }

    getColor(tag) {
        switch (tag) {
            case "politics":
                return "#db6027";
            case "sports":
                return "#7de8d2";
            case "travel":
                return "#156812";
            case "food":
                return "#e7ea3c";
            case "local news":
                return "#783a82";
            case "science":
                return "#4d367c";
            case "technology":
                return "#2c7211";
            case "entertainment":
                return "#962b66";
            case "crime":
                return "#6b1312";
            case "world":
                return "#215e3d";
        }
    }
}