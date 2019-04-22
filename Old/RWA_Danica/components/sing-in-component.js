import { map } from "rxjs/operators";
import { UserService } from "../services/user-service";
import { User } from "../classes/user";
import { Router } from "../classes/router";

export class SingInComponent {
    constructor() {
        this._singUpForm = document.getElementById("sign-in-form");
        this._userService = new UserService();
        this._user = new User();
        this._router=new Router();
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

    }

    createEventForSingInButton(signInBtn) {
        signInBtn.onclick = () => {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            const userObs = this._userService.getUser(username, password).pipe(
                map(user => user[0])
            );
            userObs.subscribe(user => this.validateUser(user));
        }
    }

    validateUser(user) {
        if (!user) {
            let errorDiv = document.getElementById("error-div");
            errorDiv.showElement();
        }
        else {
            this._user.setUserInformation(user.username, user.password);
            this._router.navigateToSignInView(user);
        }
    }

    drawSingInForm() {
        let parent = this._singUpForm;
        parent.innerHTML = "";
        this.drawImage(parent);
        this.drawTopLabels(parent);
        this.drawItemsInSingInForm(parent);
        let signInBtn = document.getElementById("sign-in-button");
        this.createEventForSingInButton(signInBtn);
        let errorDiv = document.getElementById("error-div");
        errorDiv.hideElement();
    }

    makeVisible() {
        this.drawSingInForm();
        this._singUpForm.showElement();
    }

    hide() {
        this._singUpForm.hideElement();
    }
}