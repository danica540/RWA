import { Controller } from "../modules/controller";
import { UIModule } from "../modules/ui_module";
import { DataModule } from "../modules/data_module";

let ui = new UIModule();
let data = new DataModule();
let con = new Controller(ui, data);

con.on_load_view();

con.create_sing_in_event();
con.create_weather_link_event();
con.create_top_news_event();




