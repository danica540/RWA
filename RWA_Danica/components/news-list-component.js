import { NewsListService } from "../services/news-list-service"
import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

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
        this._newsService.getNewsList().subscribe(newsList=>this.showNewsList(newsList));
        this._newsListDiv.showElement();
    }

    drawNews(news, container) {
        //div.innerHTML="crtam preko stringa"
        let divContent=`<div class="card">
        <span class="badge">${news.tag}</span>
        <img src="${news.img}" class="card-img-top">
        <div class="card-body">
        <h4>${news.headline}</h4>
        <h6> ${news.date}</h6>
        <p class="card-text">${news.content}</p>
        <a href="#" class="btn btn-secondary">More</a>
        </div>
        </div>`;
        container.innerHTML+=divContent;
        
        /*let news_div = document.createElement("div");
        news_div.className = "card";
        news_div.style.width = "100%";

        let tag = document.createElement("span");
        tag.className = "badge";
        tag.style.background = "#191919";
        tag.style.color = "white";
        tag.style.borderRadius = "0%";
        tag.innerHTML = news.tag;
        tag.style.fontSize = "15px";
        news_div.appendChild(tag);

        let news_img = document.createElement("img");
        news_img.src = news.img;
        news_img.className = "card-img-top";
        news_img.style.borderRadius = "0%";
        news_div.appendChild(news_img);

        let news_body = document.createElement("div");
        news_body.className = "card-body";

        let headline = document.createElement("h4");
        headline.innerHTML = news.headline;
        news_body.appendChild(headline);

        let date = document.createElement("h6");
        date.innerHTML = news.date;
        news_body.appendChild(date);

        let paragraph = document.createElement("p");
        paragraph.innerHTML = news.content;
        paragraph.className = "card-text";
        news_body.appendChild(paragraph);

        let link = document.createElement("a");
        link.href = "#";
        link.className = "btn btn-secondary";
        link.innerHTML = "More";
        news_body.appendChild(link);

        news_div.appendChild(news_body);

        container.appendChild(news_div);*/
    }

    showNewsList(newsList) {
        this._newsListDiv.innerHTML="";
        let divContent=`<div class="container" id="right"></div>
                        <div class="container" id="center"></div>
                        <div class="container" id="left"></div>`;
        this._newsListDiv.innerHTML=divContent;

        let left = document.getElementById("left");
        let right = document.getElementById("right");
        let center = document.getElementById("center");

        /*let left = document.createElement("div");
        let right = document.createElement("div");
        let center = document.createElement("div");

        left.className = "container";
        center.className = "container";
        right.className = "container";

        this._newsListDiv.appendChild(left);
        this._newsListDiv.appendChild(center);
        this._newsListDiv.appendChild(right);*/

        newsList.forEach((news, index) => {
            if (index % 3 === 0) {
                this.drawNews(news, left);
            }
            else if (index % 3 === 1) {
                this.drawNews(news, center);
            }
            else {
                this.drawNews(news, right);
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