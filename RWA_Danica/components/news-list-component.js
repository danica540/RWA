import * as basic_functions from "../functions/basic-functions";

export class NewsListComponent {
    constructor() {
        this._news_list_div = document.getElementById("news-list-view");
    }

    make_visible() {
        basic_functions.make_element_visible(this._news_list_div);
    }

    draw_news(news, container) {

        let news_div = document.createElement("div");
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

        container.appendChild(news_div);


    }

    show_news_list(news_list) {
        let left = document.createElement("div");
        let right = document.createElement("div");
        let center = document.createElement("div");

        left.className = "container";
        center.className = "container";
        right.className = "container";

        this._news_list_div.appendChild(left);
        this._news_list_div.appendChild(center);
        this._news_list_div.appendChild(right);

        news_list.forEach((news, index) => {
            if (index % 3 === 0) {
                this.draw_news(news, left);
            }
            else if (index % 3 === 1) {
                this.draw_news(news, center);
            }
            else {
                this.draw_news(news, right);
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