import { Line } from "./Line";

export class CurveLine{
    lines:Line[];
    constructor(){
        this.lines=[];
    }

    addLine(line:Line){
        this.lines.push(line);
    }
}