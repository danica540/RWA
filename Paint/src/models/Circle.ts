import { Shape } from "./Shape";
import { Dot } from "./Dot";

export class Circle extends Shape{
    constructor(public center:Dot,public brushSize: number,public color: string) {
        super(brushSize,color);
    }
}