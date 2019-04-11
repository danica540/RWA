import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";
import { UIModule } from "./ui_module";
import { DataModule } from "./data_module";

export class Controller {
    constructor(ui_controller, data_controller) {
        this._ui_controller = ui_controller;
        this._data_controller = data_controller;
    }

    on_load_view() {
        this._ui_controller.default_view();
        this._data_controller.get_news_list().subscribe(news_list => this._ui_controller.news_list_view(news_list));

    }

    create_sing_in_event() {
        let btn = document.getElementById("sign-in-button");
        fromEvent(btn, "click").pipe(
            sampleTime(1000)
        )
            .subscribe(() => {
                console.log("Sing in");
            })
    }



}