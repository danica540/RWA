import { Controller } from "../modules/controller";
import { UIModule } from "../modules/ui_module";
import { DataModule } from "../modules/data_module";

let ui = new UIModule();
let data = new DataModule();
let con = new Controller(ui, data);

con.on_load_view();




