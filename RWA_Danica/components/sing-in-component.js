import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

export class SingInComponent {
    constructor() {
        this._sing_up_form = document.getElementById("sign-in-form");
    }

    hideUserLink() {
        let user_link = document.getElementById("user-link");
        user_link.hideElement();
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

        fromEvent(button, "click").pipe(
            sampleTime(1000)
        )
            .subscribe(() => {
                console.log("Sing in click");
            })
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

        user_link.hideElement();
        error_div.hideElement();
        this._weather_view.hideElement();
        this._news_list_div.hideElement();
    }

    hide() {
        this._sing_up_form.showElement();
    }
}