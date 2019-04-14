import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";

export class WeatherComponent {
    constructor() {
        this._weather_view = document.getElementById("weather-view");
        this._weather_data = document.getElementById("weather-data");
        this._news_side = document.getElementById("news-side");
    }

    hide() {
        this._weather_view.hideElement();
    }

    makeVisible() {
        this._weather_view.showElement();
    }

    draw_weather_component(weather_info) {
        //console.log(weather_info);

        let weather_table = document.createElement("table");
        //weather_table.className="weather-table";
        let row = document.createElement("tr");
        let column = document.createElement("th");
        column.innerHTML = "Day";
        row.appendChild(column);

        column = document.createElement("th");
        column.innerHTML = "Description";
        row.appendChild(column);

        column = document.createElement("th");
        column.innerHTML = "Temperature";
        row.appendChild(column);

        column = document.createElement("th");
        column.innerHTML = "Precipitation";
        row.appendChild(column);

        column = document.createElement("th");
        column.innerHTML = "Humidity";
        row.appendChild(column);

        column = document.createElement("th");
        column.innerHTML = "Wind";
        row.appendChild(column);

        weather_table.appendChild(row);

        weather_info.forEach(el => {
            this.draw_single_day(weather_table, el);
        });

        this._weather_data.appendChild(weather_table);
    }

    draw_side_news() {
        // code
    }


    return_image(description) {
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


    draw_single_day(weather_table, el) {

        let row = document.createElement("tr");
        let column = document.createElement("td");
        column.innerHTML = el.day;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = el.description;
        let img_div = document.createElement("div");
        let img = document.createElement("img");
        img.src = this.return_image(el.description);
        img.style.width = "70px";
        img.style.height = "70px";
        img_div.appendChild(img);
        column.appendChild(img_div);
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = el.temperature;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = el.precipitation;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = el.humidity;
        row.appendChild(column);

        column = document.createElement("td");
        column.innerHTML = el.wind;
        row.appendChild(column);

        weather_table.appendChild(row);
    }
}