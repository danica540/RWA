import * as basic_functions from "../functions/basic-functions";


export class WeatherComponent {
    constructor() {
        this._weather_view = document.getElementById("weather-view");
    }

    hide() {
        basic_functions.hide_element(this._weather_view);
    }

    make_visible(){
        basic_functions.make_element_visible(this._weather_view);
    }

    draw_weather_component(weather_info){
        weather_info.forEach(el => {
            
        });
    }
}