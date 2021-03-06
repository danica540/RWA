import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cleearLocalStorage } from 'src/app/functions/localStorageFunctions';

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
    if (this.router.url === '/events') {
      location.reload();
    }
  }

  onLogOut() {
    cleearLocalStorage();
    location.reload();
    this.router.navigate(["/events"]);
  }

  onSearchClick(e: Event) {
    let searchValue = (document.getElementById("search-input") as HTMLInputElement).value;
    if (searchValue) {
      this.router.navigate(["/events/search/", searchValue]);
    }
  }
}
