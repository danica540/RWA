import { Component, FormEvent, Dispatch } from "react";
import React from 'react';
import "../style/CanvasComponent.css";
import { connect } from "react-redux";
import { AppState } from "../store/store";
import { Action } from "redux";
import { getImage, getImages } from "../store/actions/actions";
import { Image } from "../models/Image";
import { Dot } from "../models/Dot";
import pen from "../assets/pen.png";
import cursor from "../assets/cursor.png";
import eraser from "../assets/er.png";
import line from "../assets/line.png";
import multiline from "../assets/linem.png";
import { Stack } from "../models/Stack";
import { Line } from "../models/Line";

interface Props {
    handleSelectImage: Function;
    images: Image[];
    fetchImages: Function;
}

interface State {
    previousDot: Dot;
    width: number;
    height: number;
    stack: Stack;
    color: string;
    brushSize: number;
    imageId: number;
    draw: boolean;
    lineCap: CanvasLineCap;
    isImageDrawn: boolean;
    mode: string; // line, pen, cursor, eraser
    mouseDownOrUp: boolean; // false je up, a down je true
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            lineCap: "round",
            stack: new Stack(),
            isImageDrawn: false,
            mode: "cursor",
            mouseDownOrUp: false,
            draw: false,
            imageId: 0,
            color: "black",
            width: window.innerWidth * 2 / 3,
            height: window.innerHeight,
            brushSize: 2,
            previousDot: null
        }
    }

    saveImage = (e: any) => {
        let canvas: any = document.getElementById("canvas");
        e.target.href = canvas.toDataURL();
        e.target.download = "mypainting.jpeg";
    }


    setCanvasSize = () => {
        let c: any = document.getElementById("canvas");
        c.width = this.state.width;
        c.height = this.state.height;
    }

    componentDidMount = () => {
        this.props.fetchImages();
        this.setCanvasSize();
    }

    transformX = (x: number, indicator: number) => {
        return (x * (-1 * indicator) + this.state.width / 2);
    }

    transformY = (y: number, indicator: number) => {
        return (y * (-1 * indicator) + this.state.height / 2);
    }

    returnMaxCoordinates = (arrayOfCoordinates) => {
        let maxCoordinates = arrayOfCoordinates.reduce((acc, coordinate) => {
            if (acc.y < coordinate.y) {
                acc.y = coordinate.y;
            }
            if (acc.x < coordinate.x) {
                acc.x = coordinate.x;
            }
            return acc;
        }, { 'x': arrayOfCoordinates[0].x, 'y': arrayOfCoordinates[0].y });
        return maxCoordinates;
    }

    drawDots = (coordinatesArray, maxCoordinates) => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        coordinatesArray.forEach((coordinate, index) => {
            let x = this.transformX(coordinate.x, (this.state.width / 2.3 / maxCoordinates.x));
            let y = this.transformY(coordinate.y, (this.state.height / 2.3 / maxCoordinates.y));
            ctx.font = "10px Arial";
            ctx.fillText(index + 1, x + 3, y - 3); // pomeraj za brojeve
            ctx.fillRect(x, y, 4, 4); //velicina tacke 4x4
        })
    }

    drawImage = (img: any) => {
        this.setState({ isImageDrawn: true });
        let maxCoordinates = this.returnMaxCoordinates(img.dotArray);
        this.drawDots(img.dotArray, maxCoordinates);
    }

    redrawImage(img: any, tempStack: Stack) {
        this.clearCanvas();
        this.drawImage(img);
        tempStack.arrayOfLines.forEach(line => {
            this.drawLine(line.firstDot, line.secondDot, null);
        });

        this.setState({ stack: tempStack });
    }

    addLine = (newDot: Dot) => {
        let line = new Line(this.state.previousDot, newDot, this.state.brushSize);
        let tmpStack: Stack = this.state.stack;
        tmpStack.push(line);
        this.setState({ stack: tmpStack });
    }

    enableUndoButton = () => {
        let undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
        undoBtn.disabled = false;
        undoBtn.style.background = "transparent";
    }

    disableUndoButton = () => {
        let undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
        undoBtn.disabled = true;
        undoBtn.style.background = "#dddddd";
    }

    drawLine = (firstDot: Dot, secondDot: Dot, color: string) => {
        let colorValue = "white";
        if (!color) {
            colorValue = this.state.color;
        }
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        ctx.moveTo(firstDot.x, firstDot.y);
        ctx.lineTo(secondDot.x, secondDot.y);
        ctx.strokeStyle = colorValue;
        ctx.lineCap = this.state.lineCap;
        ctx.lineWidth = this.state.brushSize;
        ctx.stroke();
        ctx.closePath();
    }

    handleDotConnection = (event: any) => {
        if (this.state.mode === "multiline" || this.state.mode === "line") {
            if (this.state.previousDot) {
                this.drawLine(this.state.previousDot, new Dot(event.clientX, event.clientY), null);
                this.addLine(new Dot(event.clientX, event.clientY));
                this.enableUndoButton();
                if (this.state.mode === "multiline") {
                    this.setState({ previousDot: new Dot(event.clientX, event.clientY) });
                }
                else if (this.state.mode === "line") {
                    this.setState({ previousDot: null });
                    return;
                }
            }
            else {
                this.setState({ previousDot: new Dot(event.clientX, event.clientY) });
            }

        }
    }

    changeColor = (e: any) => {
        this.setState({ color: e.target.value });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value });
    }

    handleUndo = () => {
        let tmpState: Stack = this.state.stack;
        let line: Line = tmpState.pop();
        if (!line) {
            this.disableUndoButton();
            return;
        }
        
        //this.drawLine(line.firstDot, line.secondDot, "white");
        this.redrawImage(this.props.images[0], tmpState);
    }

    handleRedo = () => {

    }

    handleImageChange = (e: any) => {
        //   NE RADI SELEKCIJA SLIKE
        //console.log(e.target.value);
        this.clearCanvas();
        //this.props.handleSelectImage((e.target.value as number));
        this.setState({ imageId: e.target.value });
        this.drawImage(this.props.images[e.target.value]);
    }

    handleMode = (e: any) => {
        switch (e.target.value) {
            case "cursor": {
                this.setState({ draw: false, mode: "cursor", previousDot: null });
                return;
            }
            case "pen": {
                this.setState({ draw: true, mode: "pen" });
                return;
            }
            case "line": {
                this.setState({ draw: true, mode: "line" });
                return;

            }
            case "multiline": {
                this.setState({ draw: true, mode: "multiline" });
                return;
            }
            case "eraser": {
                this.setState({
                    draw: true,
                    mode: "eraser"
                });
                return;
            }
            default:
                return;
        }
    }

    setMouseDownEvent = (e: any) => {
        this.setState({
            mouseDownOrUp: true
        });
    }

    setMouseUpEvent = (e: any) => {
        this.setState({
            mouseDownOrUp: false
        });
    }

    isNotLineMode = () => {
        return (this.state.mode !== "line" && this.state.mode !== "multiline");
    }

    drawingIsEnabled = () => {
        return (this.state.draw && this.state.mouseDownOrUp && this.isNotLineMode())
    }

    drawFreestyleLines = (x: number, y: number) => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        ctx.arc(x, y, this.state.brushSize, 0, 2 * Math.PI);
        ctx.fillStyle = this.state.color;
        ctx.strokeStyle = this.state.color;
        if (this.state.mode === "eraser") {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
        }
        ctx.lineWidth = this.state.brushSize;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    handleDrawing = (event: any) => {
        if (this.drawingIsEnabled()) {
            this.drawFreestyleLines(event.clientX, event.clientY)
        }
    }


    clearCanvas = () => {
        const ctx = (document.getElementById("canvas") as any).getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    }

    render() {
        if (this.props.images.length !== 0 && !this.state.isImageDrawn) {
            //console.log(" IZ RENDERA   " + this.props.images);
            //console.log(this.state.imageId);
            this.drawImage(this.props.images[this.state.imageId]);
        }
        else {
            //console.log("nISta")
        }
        return (
            <div className="canvas-div">
                <div className="right">
                    <canvas onMouseDown={this.setMouseDownEvent} onMouseUp={this.setMouseUpEvent} onMouseMove={this.handleDrawing} onClick={this.handleDotConnection} id="canvas"></canvas>
                    <span>
                        <div className="left">
                            <div>
                                <h4>Pick an image: </h4>
                                <select onClick={this.handleImageChange}>
                                    <option value="0">Batman Logo</option>
                                    <option value="1">Fish</option>
                                </select>
                                <button onClick={this.clearCanvas}>Clear Canvas</button>
                            </div>
                            <label>Tools: </label>
                            <div>
                                <input onClick={this.handleMode} className="img" value="cursor" type="image" src={cursor} />
                                <input onClick={this.handleMode} className="img" value="pen" type="image" src={pen} />
                                <input onClick={this.handleMode} className="img" value="line" type="image" src={line} />
                                <input onClick={this.handleMode} className="img" value="multiline" type="image" src={multiline} />
                                <input onClick={this.handleMode} className="img" value="eraser" type="image" src={eraser} />
                            </div>
                            <div>
                                <label>Pick a color: </label>
                                <input onChange={this.changeColor} className="colorInput" type="color" />
                            </div>
                            <div>
                                <label>Pick brush size: </label>
                                <input onChange={this.changeSize} type="number" name="quantity" min="1" max="10" />
                            </div>
                            <div>
                                <button id="undoBtn" onClick={this.handleUndo}>Undo</button>
                                <button onClick={this.handleRedo}>Redo</button>
                            </div>
                            <div>
                                <a className="saveButton" onClick={this.saveImage}> Save Image</a>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        handleSelectImage: (imageId: number) => dispatch(getImage(imageId)),
        fetchImages: () => dispatch(getImages())
    }
}
function mapStateToProps(state: AppState) {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);


