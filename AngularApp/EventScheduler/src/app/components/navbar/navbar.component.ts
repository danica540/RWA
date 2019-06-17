import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
    }
  }

  onHomeClick() {
    if (this.router.url === '/home') {
      location.reload();
    }
  }

  onLogOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    location.replace("home");
  }

}
