import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";
import { WeatherService } from "../services/weather-service";

export class WeatherComponent {
    constructor() {
        this._weatherView = document.getElementById("weather-view");
        this._weatherTable = document.getElementById("weather-data");
        this._weatherService = new WeatherService();
    }

    hide() {
        this._weatherView.hideElement();
    }

    makeVisible() {
        this._weatherService.getWeather().subscribe(weekWeather => this.drawWeatherComponent(weekWeather));
        this._weatherView.showElement();
    }

    drawWeatherComponent(weather_info) {
        this._weatherTable.innerHTML = `<tr>
                                        <th>Day</th>
                                        <th>Description</th>
                                        <th>Temperature</th>
                                        <th>Precipitation</th>
                                        <th>Humidity</th>
                                        <th>Wind</th>
                                        </tr>`;
        weather_info.forEach(el => {
            this.drawSingleDay(this._weatherTable, el);
        });
    }

    drawSideNews() {
        // code
    }


    returnImage(description) {
        switch (description) {
            case "Sunny":
                return "../resource/sun(2).png";
            case "Showers":
                return "../resource/rain(1).png";
            case "Cloudy":
                return "../resource/cloud.png";
            case "Rain":
                return "../resource/rain.png";
            case "Mostly Sunny":
                return "../resource/sun(1).png";
            case "Partly Cloudy":
                return "../resource/cloud(1).png";
            case "Scattered Thunderstorms":
                return "../resource/storm.png";
        }
    }


    drawSingleDay(parent, el) {
        parent.innerHTML += `<tr><td>${el.day}</td>
                            <td>${el.description}
                            <div>
                            <img height="70px" width="70px" src=${this.returnImage(el.description)}>
                            </div>
                            </td>
                            <td>${el.temperature}</td>
                            <td>${el.precipitation}</td>
                            <td>${el.humidity}</td>
                            <td>${el.wind}</td>
                            </tr> `;
    }
}