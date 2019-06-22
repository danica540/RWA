import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { errorConstants } from 'src/app/constants/error-constants';
import { fromEvent } from 'rxjs';
import { map, flatMap, filter } from "rxjs/operators";
import { setErrorLabel } from 'src/app/functions/errorLabelFunction';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { AddUser } from 'src/app/store/actions/user.action';
import { selectAllUsers } from 'src/app/store/reducers/user.reducer';
import { setLocalStorage } from 'src/app/functions/localStorageFunctions';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  ifUsernameIsCorrect: boolean = true;
  ifEmailIsCorrect: boolean = true;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    let usernameInput = document.getElementById("username-signUp") as HTMLInputElement;
    let emailInput = document.getElementById("email-signUp") as HTMLInputElement;

    this.makeEmailInputEvent(emailInput);
    this.makeUsernameInputEvent(usernameInput);
  }

  makeEmailInputEvent(emailInput:HTMLInputElement) {
    fromEvent(emailInput, "input").pipe(
      map(ev => (ev.target as any).value)
    ).subscribe(mail => {
      this.ifEmailIsCorrect = true;
      setErrorLabel(errorConstants.NO_ERROR);
      this.store.select(selectAllUsers).pipe(
        flatMap(user => user),
        filter((user: UserModel) => user.email === mail)
      ).subscribe(res => {
        this.ifEmailIsCorrect = false;
        setErrorLabel(errorConstants.EMAIL_TAKEN);
      });
    })
  }

  makeUsernameInputEvent(usernameInput:HTMLInputElement) {
    fromEvent(usernameInput, "input").pipe(
      map(ev => (ev.target as any).value)
    ).subscribe(username => {
      this.ifUsernameIsCorrect = true;
      setErrorLabel(errorConstants.NO_ERROR);
      this.store.select(selectAllUsers).pipe(
        flatMap(user => user),
        filter((user: UserModel) => user.username === username)
      ).subscribe(res => {
        this.ifUsernameIsCorrect = false;
        setErrorLabel(errorConstants.USERNAME_TAKEN);
      });
    })
  }

  onSignUp() {
    let passwordValue = (document.getElementById("password-signUp") as HTMLInputElement).value;
    let usernameValue = (document.getElementById("username-signUp") as HTMLInputElement).value;
    let emailValue = (document.getElementById("email-signUp") as HTMLInputElement).value;

    if (!this.checkEmptyBoxes(passwordValue, usernameValue, emailValue)) {
      setErrorLabel(errorConstants.EMPTY_BOXES);
    }
    else if (this.ifEmailIsCorrect && this.ifUsernameIsCorrect) {
      let newUser = new UserModel();
      newUser.setAttributes(usernameValue, passwordValue, emailValue);
      this.store.dispatch(new AddUser(newUser));
      setLocalStorage(newUser.username,newUser.id.toString());
      location.replace('events');
    }

  }

  checkEmptyBoxes(passwordValue: string, usernameValue: string, emailValue: string): boolean {
    if (!passwordValue || !usernameValue || !emailValue) {
      return false;
    }
    return true;
  }

}
