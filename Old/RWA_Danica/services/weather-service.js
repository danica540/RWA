import { from } from "rxjs";

export class WeatherService {

    constructor() {
        this._weatherList = new Array();
    }

    getWeather() {
        return from(
            fetch("http://localhost:3000/week-weather/")
                .then(res => { return res.json() })
        )
    }

}