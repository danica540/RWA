import { SingInComponent } from "../components/sing-in-component";
import { NewsListComponent } from "../components/news-list-component";
import { WeatherComponent } from "../components/weather-component";

export class Router {
    constructor() {
        this._singInComponent = new SingInComponent();
        this._newsListComponent = new NewsListComponent();
        this._weatherComponent = new WeatherComponent();
    }

    navigateToTopic(topic) {
        this._weatherComponent.hide();
        this._singInComponent.hide();
        this._newsListComponent.makeCertainTopicVisible(topic);
    }

    navigateToSignIn() {
        this._newsListComponent.hide();
        this._weatherComponent.hide();
        this._singInComponent.makeVisible();
    }

    navigateToNewsList() {
        this._newsListComponent.makeVisible();
        this._weatherComponent.hide();
        this._singInComponent.hide();
    }

    navigateToWeather() {
        this._newsListComponent.hide();
        this._weatherComponent.makeVisible();
        this._singInComponent.hide();
    }
}