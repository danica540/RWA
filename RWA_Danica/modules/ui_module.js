import * as basic_functions from "../functions/basic-functions";


export class UIModule {
    constructor() {
        this._sing_up_form = document.getElementById("sign-in-form");
        this._news_list_div = document.getElementById("news-list-view");
        this._weather_view = document.getElementById("weather-view");
    }

    draw_img(parent) {
        let img = document.createElement("img");
        img.id = "log-in-pic";
        img.src = "../resource/users.png";
        parent.appendChild(img);
    }

    draw_top_labels(parent) {
        let label = document.createElement("label");
        label.id = "sign-in-label";
        label.innerHTML = "Please sing in";
        parent.appendChild(label);

        let error_div = document.createElement("div");
        error_div.id = "error-div";
        error_div.className = "alert alert-danger";
        error_div.role = "alert";
        error_div.innerHTML = "Invalid username or password";
        parent.appendChild(error_div);
    }

    draw_sing_in_button(parent) {
        let button = document.createElement("button");
        button.id = "sign-in-button";
        button.className = "sign-in-button";
        button.innerHTML = "Sign in";
        parent.appendChild(button);
    }

    draw_sing_up_div(parent) {
        let sing_up_div = document.createElement("div");
        sing_up_div.id = "sign-up-div";
        let label3 = document.createElement("label");
        label3.innerHTML = "Don't have an account?";
        let link = document.createElement("a");
        link.href = "#";
        link.id = "sign-up-link";
        link.innerHTML = "Sing up";
        label3.appendChild(link);
        sing_up_div.appendChild(label3);
        parent.appendChild(sing_up_div);
    }

    draw_password_input(parent) {
        let label2 = document.createElement("label");
        label2.className = "log-in-labels";
        label2.innerHTML = "Password";
        parent.appendChild(label2);

        let input = document.createElement("input");
        input.className = "sign-in-inputs";
        input.placeholder = "Enter password";
        input.id = "password";
        input.type = "password";
        parent.appendChild(input);
    }

    draw_user_input(parent) {
        let label = document.createElement("label");
        label.className = "log-in-labels";
        label.innerHTML = "Username";
        parent.appendChild(label);

        let input = document.createElement("input");
        input.className = "sign-in-inputs";
        input.placeholder = "Enter username";
        input.id = "username";
        input.type = "text";
        parent.appendChild(input);


    }

    draw_items_in_sing_up_form(parent) {
        this.draw_user_input(parent);
        this.draw_password_input(parent);
        this.draw_sing_in_button(parent);
        this.draw_sing_up_div(parent);
    }

    draw_sing_in_form() {
        let parent = this._sing_up_form;
        this.draw_img(parent);
        this.draw_top_labels(parent);
        this.draw_items_in_sing_up_form(parent);

        let user_link = document.getElementById("user-link");
        let error_div = document.getElementById("error-div");

        basic_functions.hide_element(user_link);
        basic_functions.hide_element(error_div);
        basic_functions.hide_element(this._weather_view);
        basic_functions.hide_element(this._news_list_div);
    }

    default_view() {
        let user_link = document.getElementById("user-link");
        basic_functions.hide_element(this._sing_up_form);
        basic_functions.hide_element(user_link);
        basic_functions.hide_element(this._weather_view);
        basic_functions.make_element_visible(this._news_list_div);
    }

    draw_news(news, container) {
        let news_div = document.createElement("div");
        news_div.className = "card";
        news_div.style.width = "100%";


        let news_img = document.createElement("img");
        news_img.src = news.img;
        news_img.className = "card-img-top";
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
        link.className = "btn btn-dark";
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
}