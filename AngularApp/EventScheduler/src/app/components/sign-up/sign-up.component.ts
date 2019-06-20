import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserModel } from 'src/app/models/UserModel';
import { errorConstants } from 'src/app/constants/error-constants';
import { fromEvent } from 'rxjs';
import { map } from "rxjs/operators";
import { setErrorLabel } from 'src/app/functions/errorLabelFunction';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/root.reducer';
import { AddUser } from 'src/app/store/actions/user.action';
import { selectAllUsers } from 'src/app/store/reducers/user.reducer';


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

  makeEmailInputEvent(emailInput) {
    fromEvent(emailInput, "input").pipe(
      map(ev => ev['target'].value)
    ).subscribe(mail=>{
      this.store.select(selectAllUsers).subscribe(allUsersList=>{
        console.log(allUsersList);
      })
    })


    /*(mail => {
      this.userService.checkIfEmailIsAvailable(mail).subscribe(response => {
        if ((response as any).length === 0) {
          this.ifEmailIsCorrect = true;
          if (this.ifUsernameIsCorrect) {
            setErrorLabel(errorConstants.NO_ERROR);
          }
        }
        else {
          this.ifEmailIsCorrect = false;
          setErrorLabel(errorConstants.EMAIL_TAKEN);
        }
      })
    })*/
  }

  makeUsernameInputEvent(usernameInput) {
    fromEvent(usernameInput, "input").pipe(
      map(ev => ev['target'].value)
    ).subscribe(username => {
      // this.userService.checkIfUsernameIsAvailable(username).subscribe(response => {
      //   if ((response as any).length === 0) {
      //     this.ifUsernameIsCorrect = true;
      //     if (this.ifEmailIsCorrect) {
      //       setErrorLabel(errorConstants.NO_ERROR);
      //     }
      //   }
      //   else {
      //     this.ifUsernameIsCorrect = false;
      //     setErrorLabel(errorConstants.USERNAME_TAKEN);
      //   }
      // })
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
      // this.store.dispatch(new AddUser(newUser));
      localStorage.setItem("username", usernameValue);
      localStorage.setItem("userId", (newUser.id).toString());
      localStorage.setItem("isLoggedIn", "true");
      location.replace('events');
    }

  }

  checkUsername(usernameValue: string) {
    // this.userService.checkIfUsernameIsAvailable(usernameValue).subscribe(rez => {
    //   console.log(rez);
    //   if ((rez as any).lenght === 0) {
    //     this.ifUsernameIsCorrect = false;
    //   }
    // })
  }

  checkEmail(emailValue: string) {
    // this.userService.checkIfEmailIsAvailable(emailValue).subscribe(rez => {
    //   if ((rez as any).lenght === 0) {
    //     this.ifEmailIsCorrect = false;
    //   }
    // })
  }

  checkEmptyBoxes(passwordValue: string, usernameValue: string, emailValue: string): boolean {
    if (!passwordValue || !usernameValue || !emailValue) {
      return false;
    }
    return true;
  }

}
