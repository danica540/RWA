import * as basic_functions from "../functions/basic-functions";

export class UIModule {
    constructor() {

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
        let i = document.createElement("i");
        i.className = "fas fa-exclamation-circle";
        error_div.appendChild(i);
        label.id = "error-message";
        label.innerHTML = "Invalid username or password";
        error_div.appendChild(label);
        parent.appendChild(error_div);
    }

    draw_user_password_input(parent) {
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

        let label2 = document.createElement("label");
        label2.className = "log-in-labels";
        label2.innerHTML = "Password";
        parent.appendChild(label2);

        input = document.createElement("input");
        input.className = "sign-in-inputs";
        input.placeholder = "Enter password";
        input.id = "password";
        input.type = "password";
        parent.appendChild(input);

        let button = document.createElement("button");
        button.id = "sign-in-button";
        button.className = "sign-in-button";
        button.innerHTML = "Sign in";
        parent.appendChild(button);

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

    draw_sing_in_form(parent) {
        this.draw_img(parent);
        this.draw_top_labels(parent);
        this.draw_user_password_input(parent);

        let user_link = document.getElementById("user-link");
        let error_div=document.getElementById("error-div");
        basic_functions.hide_element(user_link);
        basic_functions.hide_element(error_div);
    }
}