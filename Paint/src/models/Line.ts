import { Dot } from "./Dot";
import { Shape } from "./Shape";

export class Line extends Shape{
    constructor(public firstDot: Dot, public secondDot: Dot,public brushSize: number,public color: string) {
        super(brushSize,color);
    }
}