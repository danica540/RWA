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

    initializeEvents() {
        

    }

    signInView(){
        this._navBarComponent.makeVisible();
        this._singInComponent.hide();
        this._singInComponent.makeVisibleUserLink();
        this._singInComponent.makeVisibleSingOutLink();
        this._weatherComponent.hide();
        this._newsListComponent.makeVisible();
    }

    notSignInView() {
        this._singInComponent.makeVisible();
        this._singInComponent.hideUserLink();
        this._singInComponent.hideSingInLink();
        this._singInComponent.hideSingOutLink();
        this._weatherComponent.hide();
        this._newsListComponent.hide();
    }

    defaultView() {
        this._navBarComponent.makeVisible();
        this._singInComponent.hide();
        this._singInComponent.hideUserLink();
        this._singInComponent.hideSingOutLink();
        this._weatherComponent.hide();
        this._newsListComponent.makeVisible();
    }
    /*
        newsListView(news_list) {
            this._news_list_div.show_news_list(news_list);
            this._sing_up_form.hide();
            this._weather_view.hide();
        }
    
        weather_view(weather_info) {
            this._news_list_div.hide();
            this._sing_up_form.hide();
            this._weather_view.make_visible();
            this._weather_view.draw_weather_component(weather_info);
        }*/
}