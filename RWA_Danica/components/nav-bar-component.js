import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

export class NavBarComponent {
  constructor() {
    this._navBar = document.getElementById("navbar");
    this._topNewsLink;
    this._weatherLink;
  }

  hide() {
    this._navBar.hideElement();
  }

  makeVisible() {
    //this.drawNavBAr();
    this._navBar.showElement();
  }

  drawNavBAr() {
    this._navBar.innerHTML = "";
    this._navBar.innerHTML = `
    <a class="navbar-brand" href="#">News</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a id="top-news" class="nav-link" href="#">Top news <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Topics
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">World</a>
            <a class="dropdown-item" href="#">Nation</a>
            <a class="dropdown-item" href="#">Local news</a>
            <a class="dropdown-item" href="#">Politics</a>
            <a class="dropdown-item" href="#">Crime</a>
            <a class="dropdown-item" href="#">Entertainment</a>
            <a class="dropdown-item" href="#">Sports</a>
            <a class="dropdown-item" href="#">Technology</a>
            <a class="dropdown-item" href="#">Science</a>
            <a class="dropdown-item" href="#">Food</a>
            <a class="dropdown-item" href="#">Travel</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="weather-link" href="#">Weather</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit" id="search-btn">Search</button>
      </form>
      <div class="text-right">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" id="user-link" href="#">UserName</a>
          </li>
          <li class="nav-item active">
            <a id="sign-in-button" class="nav-link" href="#">Sing in</a>
          </li>
        </ul>
      </div>
    </div>`;


    this._topNewsLink = document.getElementById("top-news");
    this._weatherLink = document.getElementById("weather-link");

    fromEvent(this._topNewsLink, "click")
      .subscribe(() => {
        console.log("Top news")
        //this.on_load_view();
      })


    fromEvent(this._weatherLink, "click")
      .subscribe(() => {
        console.log("Weather click");
        // prikazati weather kontejner
      })
  }
}
