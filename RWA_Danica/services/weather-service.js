import { from } from "rxjs";

export class NewsListService {

    //servis
    constructor() {
        this._weatherList = new Array();
    }

    get_weather() {
        return from(
            fetch("http://localhost:3000/week-weather/")
                .then(res => { return res.json() })
        )
    }

}