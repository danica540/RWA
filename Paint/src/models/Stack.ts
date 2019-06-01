export class Stack<T> {
    public arrayOfLines: T[];
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
        let tmp = this.arrayOfLines[this.pointer];
        this.arrayOfLines[this.pointer] = null;
        this.pointer--;
        return tmp;
    }

    push = (line: T) => {
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
        return (this.pointer === -1);
    }
}