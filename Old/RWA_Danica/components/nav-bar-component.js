import { fromEvent } from "rxjs";
import { NewsListService } from "../services/news-list-service"
import { debounceTime, map, switchMap, flatMap } from "rxjs/operators";
import { Router } from "../classes/router";
import { UserService } from "../services/user-service";

const topicList = ["world", "nation", "local-news", "politics", "crime", "entertainment", "sports", "technology", "science", "food", "travel"];

export class NavBarComponent {
  constructor() {
    this._navBar = document.getElementById("navbar");
    this._router = new Router();
    this._newsService = new NewsListService();
    this._userService = new UserService();
    this._weatherLink;
    this._searchInput;
  }

  hide() {
    this._navBar.hideElement();
  }

  makeVisible() {
    this.drawNavBar();
    this._navBar.showElement();
  }

  drawNavBar() {
    this._navBar.innerHTML = "";
    this._navBar.innerHTML = `
    <a class="navbar-brand" id="home" href="#">News</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Topics
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="world" href="#">World</a>
            <a class="dropdown-item" id="nation" href="#">Nation</a>
            <a class="dropdown-item" id="local-news" href="#">Local news</a>
            <a class="dropdown-item" id="politics" href="#">Politics</a>
            <a class="dropdown-item" id="crime" href="#">Crime</a>
            <a class="dropdown-item" id="entertainment" href="#">Entertainment</a>
            <a class="dropdown-item" id="sports" href="#">Sports</a>
            <a class="dropdown-item" id="technology" href="#">Technology</a>
            <a class="dropdown-item" id="science" href="#">Science</a>
            <a class="dropdown-item" id="food" href="#">Food</a>
            <a class="dropdown-item" id="travel" href="#">Travel</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" id="weather-link" href="#">Weather</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input id="search-input" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
      <div class="text-right">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="user-link" role="button" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">UserName</a>
      <div id="user-sub" class="dropdown-menu" aria-labelledby="navbarDropdown">
      </div>
          <li class="nav-item active">
            <a id="sign-in-link" class="nav-link" href="#">Sign in</a>
          </li>
          <li class="nav-item active">
            <a id="sign-out-link" class="nav-link" href="#">Sign out</a>
          </li>
          </li>
        </ul>
      </div>
    </div>`;

    this.initializeEvents();
  }

  initializeUserSubscriptions(user) {
    let userSubscriptionsDiv = document.getElementById("user-sub");
    this._userService.getUserSubscriptions(user.id)
      .subscribe(sub => this.drawUserSubscriptions(userSubscriptionsDiv, sub));
  }

  drawUserSubscriptions(userSubscriptionsDiv, sub) {
    let divContent = "";
    sub.forEach(el => {
      divContent += `<a class="dropdown-item" id="${el.news_tag}" href="#">${el.news_tag}</a>`;
    })
    userSubscriptionsDiv.innerHTML += divContent;
  }

  initializeEvents() {
    this.initializeNewsLinkEvent();
    this.initializeSearchInputEvent();
    this.initializeTopicEvents();
    this.initializeWeatherClickEvent();
    this.initializeSignInEvent();
  }

  initializeNewsLinkEvent() {
    const newsLink = document.getElementById("home");
    newsLink.onclick = () => {
      this._router.navigateToNewsList();
    }
  }

  initializeTopicEvents() {
    topicList.forEach(topic => {
      this.initializeSingleTopicEvent(topic);
    })
  }

  initializeSingleTopicEvent(topic) {
    let link = document.getElementById(topic);
    link.onclick = () => {
      this._router.navigateToTopic(topic);
    }

  }

  initializeSignInEvent() {
    let singInButton = document.getElementById("sign-in-link");
    singInButton.onclick = () => {
      this._router.navigateToSignIn();
    }
  }

  initializeWeatherClickEvent() {
    this._weatherLink = document.getElementById("weather-link");
    fromEvent(this._weatherLink, "click")
      .subscribe(() => {
        this._router.navigateToWeather();
      });
  }

  initializeSearchInputEvent() {
    this._searchInput = document.getElementById("search-input");
    fromEvent(this._searchInput, "input").pipe(
      debounceTime(1000),
      map(ev => ev.target.value),
      switchMap(text => this._newsService.getNewsByTextSearch(text))
    )
      .subscribe(news => this._router.navigateToSearchedNewsList(news));
  }

  hideSingInLink() {
    let singInLink = document.getElementById("sign-in-link");
    singInLink.hideElement();
  }

  hideUserLink() {
    let userLink = document.getElementById("user-link");
    userLink.hideElement();
  }

  hideSingOutLink() {
    let userLink = document.getElementById("sign-out-link");
    userLink.hideElement();
  }

  makeVisibleSingOutLink() {
    let singInLink = document.getElementById("sign-out-link");
    singInLink.showElement();
  }

  makeVisibleSingInLink() {
    let singInLink = document.getElementById("sign-in-link");
    singInLink.showElement();
  }

  makeVisibleUserLink() {
    let userLink = document.getElementById("user-link");
    userLink.showElement();
  }

  changeUserName(username) {
    let userLink = document.getElementById("user-link");
    const nameCapitalized = username.charAt(0).toUpperCase() + username.slice(1);
    userLink.innerHTML = nameCapitalized;
  }


}
