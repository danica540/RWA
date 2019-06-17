import { Component, OnInit } from '@angular/core';
import { errorConstants } from 'src/app/constants/error-constants';
import { setErrorLabel } from 'src/app/functions/errorLabelFunction';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  ifPasswordIsCorrect: boolean = true;
  ifUsernameIsCorrect: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSignIn() {
    let usernameValue = (document.getElementById("username-signIn") as HTMLInputElement).value;
    let passwordValue = (document.getElementById("password-signIn") as HTMLInputElement).value;

    if (!this.checkEmptyBoxes(passwordValue, usernameValue)) {
      setErrorLabel(errorConstants.EMPTY_BOXES);
    }
    else {
      this.userService.getUserByUsername(usernameValue).subscribe(response => {
        if ((response as any).length === 0) {
          this.ifUsernameIsCorrect = false;
          this.ifPasswordIsCorrect=true;
          setErrorLabel(errorConstants.WRONG_USERNAME);
        }
        else {
          this.ifUsernameIsCorrect = true;
          if (response[0].password === passwordValue) {
            this.ifPasswordIsCorrect = true;
            localStorage.setItem("username", usernameValue);
            localStorage.setItem("userId", (response[0].id).toString());
            localStorage.setItem("isLoggedIn", "true");
            location.replace('home');
          }
          else {
            this.ifPasswordIsCorrect=false;
            setErrorLabel(errorConstants.WRONG_PASSWORD);
          }
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
