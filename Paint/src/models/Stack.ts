import { Line } from "./Line";

export class Stack {

    constructor(public stack: Line[], public pointer: number) {
        this.pointer = -1;
    }

    peak = () => {
        return this.stack[this.pointer];
    }

    pop = () => {
        this.pointer--;
        return this.stack[this.pointer + 1];
    }

    push = (line: Line) => {
        this.pointer++;
        this.stack[this.pointer] = line;
    }

    emptyStack=()=>{
        while(this.pointer!==-1){
            this.stack[this.pointer]=null;
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