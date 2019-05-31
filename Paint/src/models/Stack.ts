import { Line } from "./Line";

export class Stack {
    public arrayOfLines: Line[];
    public pointer: number;

    constructor() {
        this.pointer = -1;
        this.arrayOfLines = [];
    }

    peak = () => {
        if (this.pointer === -1) {
            return null;
        }
        return this.arrayOfLines[this.pointer];
    }

    pop = () => {
        if (this.pointer === -1) {
            return null;
        }
        this.pointer--;
        return this.arrayOfLines[this.pointer + 1];
    }

    push = (line: Line) => {
        this.pointer++;
        this.arrayOfLines[this.pointer] = line;
    }

    emptyStack = () => {
        while (this.pointer !== -1) {
            this.arrayOfLines[this.pointer] = null;
            this.pointer--;
        }
    }

    isEmpty = () => {
        if (this.pointer === -1) {
            return true;
        }
        return false;
    }
}