import { SingInComponent } from "../components/sing-in-component";
import { NewsListComponent } from "../components/news-list-component";
import { WeatherComponent } from "../components/weather-component";
import { NavBarComponent } from "../components/nav-bar-component";

export class Router {
    constructor() {
    }

    navigateToTopic(topic) {
        let singInComponent = new SingInComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        weatherComponent.hide();
        singInComponent.hide();
        newsListComponent.makeCertainTopicVisible(topic);
    }

    navigateToSignIn() {
        let singInComponent = new SingInComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        let navBarComponenet=new NavBarComponent();
        newsListComponent.hide();
        navBarComponenet.hideSingOutLink();
        navBarComponenet.hideUserLink();
        weatherComponent.hide();
        singInComponent.makeVisible();
    }

    navigateToNewsList() {
        let singInComponent = new SingInComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        newsListComponent.makeVisible();
        weatherComponent.hide();
        singInComponent.hide();
    }

    navigateToSearchedNewsList(newsList) {
        let singInComponent = new SingInComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        newsListComponent.showNewsListBySearch(newsList);
        weatherComponent.hide();
        singInComponent.hide();
    }

    navigateToWeather() {
        let singInComponent = new SingInComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        newsListComponent.hide();
        weatherComponent.makeVisible();
        singInComponent.hide();
    }

    navigateToSignInView(user){
        let singInComponent = new SingInComponent();
        let navBarComponenet=new NavBarComponent();
        let newsListComponent = new NewsListComponent();
        let weatherComponent = new WeatherComponent();
        newsListComponent.makeVisible();
        weatherComponent.hide();
        navBarComponenet.makeVisibleSingOutLink();
        navBarComponenet.makeVisibleUserLink();
        navBarComponenet.hideSingInLink();
        navBarComponenet.changeUserName(user.username);
        navBarComponenet.makeVisibleSingOutLink();
        singInComponent.hide();
        navBarComponenet.initializeUserSubscriptions(user);
    }
}