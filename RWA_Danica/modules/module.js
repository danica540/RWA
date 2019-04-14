import { SingInComponent } from "../components/sing-in-component";
import { NewsListComponent } from "../components/news-list-component";
import { WeatherComponent } from "../components/weather-component";
import { NavBarComponent } from "../components/nav-bar-component";

/*on_load_view() {
        this._ui_controller.default_view();
        this._data_controller.get_news_list().subscribe(news_list => this._ui_controller.news_list_view(news_list));
    }*/

export class Module {

    //modul
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
        this._weatherComponent.hide();
        this._newsListComponent.makeVisible();
    }

    news_list_view(news_list) {
        this._news_list_div.show_news_list(news_list);
        this._sing_up_form.hide();
        this._weather_view.hide();
    }

    weather_view(weather_info) {
        this._news_list_div.hide();
        this._sing_up_form.hide();
        this._weather_view.make_visible();
        this._weather_view.draw_weather_component(weather_info);
    }



}