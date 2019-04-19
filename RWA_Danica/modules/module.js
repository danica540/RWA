import { SingInComponent } from "../components/sing-in-component";
import { NewsListComponent } from "../components/news-list-component";
import { WeatherComponent } from "../components/weather-component";
import { NavBarComponent } from "../components/nav-bar-component";
import { Subject } from "rxjs";

export class Module {

    constructor() {
        this._navBarComponent = new NavBarComponent();
        this._singInComponent = new SingInComponent();
        this._newsListComponent = new NewsListComponent();
        this._weatherComponent = new WeatherComponent();
    }
    defaultView() {
        this._navBarComponent.makeVisible();
        this._singInComponent.hide();
        this._singInComponent.hideUserLink();
        this._singInComponent.hideSingOutLink();
        this._weatherComponent.hide();
        this._newsListComponent.makeVisible();
    }
}