import { Component, OnInit } from '@angular/core';
import { errorConstants } from 'src/app/constants/error-constants';
import { setErrorLabel } from 'src/app/functions/errorLabelFunction';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllUsers } from 'src/app/store/user/user.reducer';
import { flatMap, filter } from 'rxjs/operators';
import { setLocalStorage } from 'src/app/functions/localStorageFunctions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  ifPasswordIsCorrect: boolean = true;
  ifUsernameIsCorrect: boolean = true;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  onSignIn() {
    let usernameValue = (document.getElementById("username-signIn") as HTMLInputElement).value;
    let passwordValue = (document.getElementById("password-signIn") as HTMLInputElement).value;

    if (!this.checkEmptyBoxes(passwordValue, usernameValue)) {
      setErrorLabel(errorConstants.EMPTY_BOXES);
    }
    else {
      this.signInUser(usernameValue, passwordValue);
    }
  }

  signInUser(usernameValue: string, passwordValue: string) {
    this.passwordIsCorrect();
    this.usernameIsWrong();
    this.store.select(selectAllUsers).pipe(
      flatMap(user => user),
      filter(user => user.username === usernameValue)
    ).subscribe(user => {
      this.usernameIsCorrect();
      if (user.password === passwordValue) {
        setLocalStorage(user.username, user.id.toString());
        location.replace('events');
      }
      else {
        this.passwordIsWrong();
      }
    })
  }

  usernameIsCorrect() {
    setErrorLabel(errorConstants.NO_ERROR);
    this.ifUsernameIsCorrect = true;
  }

  usernameIsWrong() {
    setErrorLabel(errorConstants.WRONG_USERNAME);
    this.ifUsernameIsCorrect = false;
  }

  passwordIsCorrect() {
    setErrorLabel(errorConstants.NO_ERROR);
    this.ifPasswordIsCorrect = true;
  }

  passwordIsWrong() {
    setErrorLabel(errorConstants.WRONG_PASSWORD);
    this.ifPasswordIsCorrect = false;
  }

  checkEmptyBoxes(passwordValue: string, usernameValue: string) {
    if (!passwordValue || !usernameValue) {
      return false;
    }
    return true;
  }

}
