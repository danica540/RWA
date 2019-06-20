import { Component, OnInit } from '@angular/core';
import { errorConstants } from 'src/app/constants/error-constants';
import { setErrorLabel } from 'src/app/functions/errorLabelFunction';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { selectAllUsers } from 'src/app/store/reducers/user.reducer';
import { flatMap, filter } from 'rxjs/operators';

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
      this.ifPasswordIsCorrect = true;
      setErrorLabel(errorConstants.NO_ERROR);
      this.ifUsernameIsCorrect = false;
      setErrorLabel(errorConstants.WRONG_USERNAME);
      this.store.select(selectAllUsers).pipe(
        flatMap(user => user),
        filter(user => user.username === usernameValue)
      ).subscribe(user => {
        setErrorLabel(errorConstants.NO_ERROR);
        this.ifUsernameIsCorrect = true;
        console.log(user);
        if (user.password === passwordValue) {
          localStorage.setItem("username", user.username);
          localStorage.setItem("userId", user.id.toString());
          localStorage.setItem("isLoggedIn", "true");
          location.replace('events');
        }
        else {
          this.ifPasswordIsCorrect = false;
          setErrorLabel(errorConstants.WRONG_PASSWORD);
        }
      })
    }
  }

  checkEmptyBoxes(passwordValue: string, usernameValue: string) {
    if (!passwordValue || !usernameValue) {
      return false;
    }
    return true;
  }

}
