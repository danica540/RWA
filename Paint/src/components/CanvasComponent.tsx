import { Component, Dispatch } from "react";
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
import { transformX, transformY, returnMaxCoordinates } from "../functions/transformation-functions";
import { enableButton, disableButton, hideButton, makeButtonVisible } from "../functions/html-element-functions";
import { Circle } from "../models/Circle";

const stack: Stack = new Stack();
const redoStack = new Stack();

interface Props {
    handleSelectImage: Function;
    images: Image[];
    fetchImages: Function;
}

interface State {
    previousDot: Dot;
    paintMode: string;
    width: number;
    height: number;
    color: string;
    brushSize: number;
    imageId: number;
    draw: boolean;
    lineCap: CanvasLineCap;
    lastPoint: Circle;
    isImageDrawn: boolean;
    mode: string; // line, pen, cursor, eraser
    mouseDownOrUp: boolean; // false je up, a down je true
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            lastPoint: null,
            paintMode: "connect",
            lineCap: "round",
            isImageDrawn: false,
            mode: "cursor",
            mouseDownOrUp: false,
            draw: false,
            imageId: 0,
            color: "black",
            width: window.innerWidth * 2 / 3,
            height: window.innerHeight,
            brushSize: 4,
            previousDot: null
        }
    }

    saveImage = (e: any) => {
        let canvas: any = document.getElementById("canvas");
        e.target.href = canvas.toDataURL();
        e.target.download = "myPainting.jpg";
    }


    setCanvasSize = () => {
        let c: any = document.getElementById("canvas");
        c.width = this.state.width;
        c.height = this.state.height;
    }

    componentDidUpdate = () => {
        this.handleCanvasLoad();
    }

    componentDidMount = () => {
        this.props.fetchImages();
        disableButton(document.getElementById("undoBtn") as HTMLButtonElement);
        disableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        this.setCanvasSize();
    }

    drawDots = (coordinatesArray, maxCoordinates) => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        coordinatesArray.forEach((coordinate, index) => {
            let x = transformX(coordinate.x, this.state.width, maxCoordinates.x);
            let y = transformY(coordinate.y, this.state.height, maxCoordinates.y);
            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(index + 1, x + 3, y - 3); // pomeraj za brojeve
            ctx.fillRect(x, y, 4, 4); //velicina tacke 4x4
        })
        ctx.closePath();
    }

    drawImage = (img: any) => {
        //color: "black"
        this.setState({ isImageDrawn: true, paintMode: "connect" });
        let maxCoordinates = returnMaxCoordinates(img.dotArray);
        this.drawDots(img.dotArray, maxCoordinates);
    }

    redrawImage(img: any, tempStack: Stack) {
        if (this.state.paintMode === "connect") {
            this.clearCanvas();
            this.drawImage(img);
        }
        tempStack.arrayOfLines.forEach(line => {
            if (line) {
                this.drawLine(line);
            }

        });
    }

    addLineToUndoStack = (line: Line) => {
        stack.push(line);
    }

    addLineToRedoStack = (line: Line) => {
        redoStack.push(line);
    }

    drawLine = (line: Line) => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        ctx.moveTo(line.firstDot.x, line.firstDot.y);
        ctx.lineTo(line.secondDot.x, line.secondDot.y);
        ctx.lineJoin = "round";
        ctx.strokeStyle = line.color;
        ctx.lineCap = this.state.lineCap;
        ctx.lineWidth = line.brushSize;
        ctx.stroke();
        ctx.closePath();
    }

    handleDotConnection = (event: any) => {
        if (this.state.mode === "multiline" || this.state.mode === "line") {
            if (this.state.previousDot) {
                let line = new Line(this.state.previousDot, new Dot(event.clientX, event.clientY), this.state.brushSize, this.state.color);
                this.drawLine(line);
                this.addLineToUndoStack(line);
                enableButton(document.getElementById("undoBtn") as HTMLButtonElement);
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
        this.setState({ color: e.target.value, previousDot: null });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value, previousDot: null });
    }

    handleUndo = () => {
        let line: Line = stack.pop();
        if (!line) {
            disableButton(document.getElementById("undoBtn") as HTMLButtonElement);
            return;
        }
        this.addLineToRedoStack(line);
        enableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        this.redrawImage(this.props.images[this.state.imageId], stack);
    }

    handleRedo = () => {
        let line: Line = redoStack.pop();
        if (!line) {
            disableButton(document.getElementById("redoBtn") as HTMLButtonElement);
            return;
        }
        this.drawLine(line);
        this.addLineToUndoStack(line);
    }

    handleImageChange = (e: any) => {
        this.clearCanvas();
        this.setState({ imageId: e.target.value });
        this.setState({ paintMode: "connect" });
        this.drawImage(this.props.images[e.target.value]);
    }

    handleMode = (e: any) => {
        switch (e.target.value) {
            case "cursor": {
                hideButton(document.getElementById("undoBtn") as HTMLButtonElement);
                hideButton(document.getElementById("redoBtn") as HTMLButtonElement);
                this.setState({ draw: false, mode: "cursor", previousDot: null });
                return;
            }
            case "pen": {
                hideButton(document.getElementById("undoBtn") as HTMLButtonElement);
                hideButton(document.getElementById("redoBtn") as HTMLButtonElement);
                this.setState({ draw: true, mode: "pen", previousDot: null });
                return;
            }
            case "line": {
                this.setState({ draw: true, mode: "line", previousDot: null });
                makeButtonVisible(document.getElementById("undoBtn") as HTMLButtonElement);
                makeButtonVisible(document.getElementById("redoBtn") as HTMLButtonElement);
                return;

            }
            case "multiline": {
                this.setState({ draw: true, mode: "multiline", previousDot: null });
                makeButtonVisible(document.getElementById("undoBtn") as HTMLButtonElement);
                makeButtonVisible(document.getElementById("redoBtn") as HTMLButtonElement);
                return;
            }
            case "eraser": {
                hideButton(document.getElementById("undoBtn") as HTMLButtonElement);
                hideButton(document.getElementById("redoBtn") as HTMLButtonElement);
                this.setState({
                    draw: true,
                    mode: "eraser",
                    previousDot: null
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
            mouseDownOrUp: false,
            lastPoint: null
        });
    }

    isNotLineMode = () => {
        return (this.state.mode !== "line" && this.state.mode !== "multiline");
    }

    drawingIsEnabled = () => {
        return (this.state.draw && this.state.mouseDownOrUp && this.isNotLineMode())
    }

    connectCircles = (previousCircle, currentCircle) => {
        let line = new Line(previousCircle.center, currentCircle.center, currentCircle.brushSize, currentCircle.color);
        this.drawLine(line);
    }

    drawCircle = (circle: Circle) => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.brushSize / 10, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.strokeStyle = circle.color;
        if (this.state.mode === "eraser") {
            ctx.fillStyle = "white";
            ctx.strokeStyle = "white";
        }
        ctx.lineWidth = circle.brushSize;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (this.state.lastPoint) {
            this.connectCircles(this.state.lastPoint, circle);
        }
        this.setState({ lastPoint: circle });
    }

    handleDrawing = (event: any) => {
        if (this.drawingIsEnabled()) {
            let circle = new Circle(new Dot(event.clientX, event.clientY), this.state.brushSize, this.state.color);
            this.drawCircle(circle);
        }
    }

    handleClearCanvas = () => {
        stack.emptyStack();
        redoStack.emptyStack();
        this.clearCanvas();
    }

    clearCanvas = () => {
        const ctx = (document.getElementById("canvas") as any).getContext('2d');
        this.setState({ paintMode: "clear" });
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    }

    handleCanvasLoad = () => {
        if (this.props.images.length !== 0 && !this.state.isImageDrawn && this.state.paintMode === "connect") {
            this.drawImage(this.props.images[this.state.imageId]);
        }
    }

    render() {
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
                                <button onClick={this.handleClearCanvas}>Clear Canvas</button>
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
                                <input onChange={this.changeSize} type="number" name="quantity" min="1" max="20" />
                            </div>
                            <button id="undoBtn" onClick={this.handleUndo}>Undo</button>
                            <button id="redoBtn" onClick={this.handleRedo}>Redo</button>
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