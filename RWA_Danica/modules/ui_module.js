import { SingInComponent } from "../components/sing-in-component";
import { NewsListComponent } from "../components//news-list-component";
import { WeatherComponent } from "../components/weather-component";


export class UIModule {
    constructor() {
        this._sing_up_form = new SingInComponent();
        this._news_list_div = new NewsListComponent();
        this._weather_view = new WeatherComponent();
    }

    default_view() {
        this._sing_up_form.hide();
        this._sing_up_form.hide_user_link();
        this._weather_view.hide();
        this._news_list_div.make_visible();
    }

    news_list_view(news_list) {
        this._news_list_div.show_news_list(news_list);
        this._sing_up_form.hide();
        this._weather_view.hide();
    }

    weather_view(weather_info){
        this._news_list_div.hide();
        this._sing_up_form.hide();
        this._weather_view.make_visible();
        this._weather_view.draw_weather_component(weather_info);
    }



}