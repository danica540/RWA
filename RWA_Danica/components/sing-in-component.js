import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

export class SingInComponent {
    constructor() {
        this._singUpForm = document.getElementById("sign-in-form");
    }

    hideUserLink() {
        let userLink = document.getElementById("user-link");
        userLink.hideElement();
    }

    drawImage(parent) {
        let img = document.createElement("img");
        img.id = "log-in-pic";
        img.src = "../resource/users.png";
        parent.appendChild(img);
    }

    drawTopLabels(parent) {
        let label = document.createElement("label");
        label.id = "sign-in-label";
        label.innerHTML = "Please sing in";
        parent.appendChild(label);

        let errorDiv = document.createElement("div");
        errorDiv.id = "error-div";
        errorDiv.className = "alert alert-danger";
        errorDiv.role = "alert";
        errorDiv.innerHTML = "Invalid username or password";
        parent.appendChild(errorDiv);
    }

    drawSingInButton(parent) {
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

    drawSingUpDiv(parent) {
        let singUpDiv = document.createElement("div");
        singUpDiv.id = "sign-up-div";
        let label3 = document.createElement("label");
        label3.innerHTML = "Don't have an account?";
        let link = document.createElement("a");
        link.href = "#";
        link.id = "sign-up-link";
        link.innerHTML = "Sing up";
        label3.appendChild(link);
        singUpDiv.appendChild(label3);
        parent.appendChild(singUpDiv);
    }

    drawPasswordInput(parent) {
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

    drawUserInput(parent) {
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

    drawItemsInSingInForm(parent) {
        this.drawUserInput(parent);
        this.drawPasswordInput(parent);
        this.drawSingInButton(parent);
        this.drawSingUpDiv(parent);

    }

    drawSingInForm() {
        let parent = this._singUpForm;
        this.drawImage(parent);
        this.drawTopLabels(parent);
        this.drawItemsInSingInForm(parent);

        let userLink = document.getElementById("user-link");
        let errorDiv = document.getElementById("error-div");

        userLink.hideElement();
        errorDiv.hideElement();
        /*this._weather_view.hideElement();
        this._news_list_div.hideElement();*/
    }

    hide() {
        this._singUpForm.showElement();
    }
}