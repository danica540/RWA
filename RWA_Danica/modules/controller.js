import { fromEvent } from "rxjs";
import { sampleTime } from "rxjs/operators";
import { UIModule } from "./ui_module";
import { DataModule } from "./data_module";

export class Controller {
    constructor(ui_controller, data_controller) {
        this._ui_controller = ui_controller;
        this._data_controller = data_controller;
    }

    draw(parent) {
        this._ui_controller.draw_sing_in_form(parent);
    }

    create_event() {
        let btn = document.getElementById("sign-in-button");
        fromEvent(btn, "click").pipe(
            sampleTime(1000)
        )
            .subscribe(event => console.log(event))
    }

}