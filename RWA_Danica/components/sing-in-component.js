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
        parent.innerHTML += `<img id="log-in-pic" src="../resource/users.png">`;
    }

    drawTopLabels(parent) {
        parent.innerHTML += `<label id="sign-in-label">${"Please sing in"}</label>
                            <div id="error-div" class="alert alert-danger" role="alert">
                            ${"Invalid username or password"}
                            </div>`;
    }

    drawSingInButton(parent) {
        parent.innerHTML += `<button id="sign-in-button" class="sign-in-button">${"Sign In"}</button>`;
    }

    drawSingUpDiv(parent) {
        parent.innerHTML += `<div id="sign-up-div">
                            <label>${"Don't have an account?"}</label>
                            <a href="#" id="sign-up-link">${"Sing up"}</a>
                            </div>`;
    }

    drawPasswordInput(parent) {
        parent.innerHTML += `<label class="log-in-labels">${"Password"}</label>
                            <input type="password" id="password" class="sign-in-inputs" placeholder="Enter password">`;
    }

    drawUserInput(parent) {
        parent.innerHTML += `<label class="log-in-labels">${"Username"}</label>
                            <input type="text" id="username" class="sign-in-inputs" placeholder="Enter username">`;
    }

    drawItemsInSingInForm(parent) {
        this.drawUserInput(parent);
        this.drawPasswordInput(parent);
        this.drawSingInButton(parent);
        this.drawSingUpDiv(parent);

    }

    createEventForSingInButton(signInBtn) {
        fromEvent(signInBtn, "click").pipe(
            sampleTime(1000)
        )
            .subscribe(() => {
                console.log("Sing in click");
            })
    }

    drawSingInForm() {
        let parent = this._singUpForm;
        parent.innerHTML = "";
        this.drawImage(parent);
        this.drawTopLabels(parent);
        this.drawItemsInSingInForm(parent);
        let signInBtn = document.getElementById("sign-in-button");
        this.createEventForSingInButton(signInBtn);

        let userLink = document.getElementById("user-link");
        let errorDiv = document.getElementById("error-div");

        //userLink.hideElement();
        errorDiv.hideElement();
        /*this._weather_view.hideElement();
        this._news_list_div.hideElement();*/
    }

    hide() {
        this._singUpForm.showElement();
    }
}