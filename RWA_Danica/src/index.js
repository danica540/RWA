import { Module } from "../modules/module"
import { initialize } from "../functions/prototype_functions";

initialize();

let ui = new Module();
ui.defaultView();
ui.initializeEvents();



