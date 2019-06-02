import { Component, Dispatch, FormEvent } from "react";
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
import undo from "../assets/undo.png";
import redo from "../assets/redo.png";
import clear from "../assets/garbage.png";
import { transformX, transformY, returnMaxCoordinates } from "../functions/transformation-functions";
import { enableButton, disableButton } from "../functions/html-element-functions";
import { CurveLine } from "../models/CurveLine";

const undoStack: Stack<CurveLine> = new Stack<CurveLine>();
const redoStack: Stack<CurveLine> = new Stack<CurveLine>();
let curve = null;

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
    lastPointForCurveLine: Dot;
    isImageDrawn: boolean;
    mode: string; // line, pen, cursor, eraser
    mouseDownOrUp: boolean; // false je up, a down je true
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            lastPointForCurveLine: null,
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

    saveImage = (e: FormEvent): void => {
        let canvas: HTMLElement = document.getElementById("canvas");
        (e.target as HTMLAnchorElement).href = (canvas as HTMLCanvasElement).toDataURL('image/png',2.0);
        (e.target as HTMLAnchorElement).download = 'myPainting.png';
    }

    componentDidUpdate = () => {
        this.handleCanvasLoad();
        this.refreshRedoState();
        this.refreshUndoState();
        if (this.state.mode !== "eraser" && this.isColorNull()) {
            let colorValue = (document.getElementById("colorInput") as HTMLInputElement).value;
            this.setState({ color: colorValue });
        }
        this.setBrushSizeLabel();
    }

    isColorNull(): HTMLElement {
        return (document.getElementById("colorInput"));
    }

    setBrushSizeLabel = (): void => {
        document.getElementById("brushSize").innerHTML = (document.getElementById("slider") as HTMLInputElement).value;
    }

    setCanvasSize = (): void => {
        let canvas: HTMLElement = document.getElementById("canvas");
        (canvas as HTMLCanvasElement).width = this.state.width;
        (canvas as HTMLCanvasElement).height = this.state.height;
    }

    refreshUndoState = (): void => {
        if (undoStack.isEmpty()) {
            disableButton(document.getElementById("undoBtn") as HTMLButtonElement);
        }
        else {
            enableButton(document.getElementById("undoBtn") as HTMLButtonElement);
        }
    }

    refreshRedoState = (): void => {
        if (redoStack.isEmpty()) {
            disableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        }
        else {
            enableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        }
    }

    handleCanvasLoad = (): void => {
        if (this.props.images.length !== 0 && !this.state.isImageDrawn && this.state.paintMode === "connect") {
            this.drawImage(this.props.images[this.state.imageId]);
        }
    }

    drawImage = (img: Image): void => {
        this.clearCanvas();
        this.setState({ isImageDrawn: true, paintMode: "connect" });
        let maxCoordinates = returnMaxCoordinates(img.dotArray);
        this.drawDots(img.dotArray, maxCoordinates);
    }

    clearCanvas = (): void => {
        const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext('2d');
        this.setState({ paintMode: "clear" });
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    }

    drawDots = (coordinatesArray, maxCoordinates): void => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        coordinatesArray.forEach((coordinate, index) => {
            let x = transformX(coordinate.x, this.state.width, maxCoordinates.x);
            let y = transformY(coordinate.y, this.state.height, maxCoordinates.y);
            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(index + 1, x + 3, y - 3);
            ctx.fillRect(x, y, 4, 4);
        })
        ctx.closePath();
    }

    componentDidMount = () => {
        this.props.fetchImages();  // IZBRISATI
        this.setCanvasSize();
        this.setBrushSizeInput();
    }

    setBrushSizeInput = (): void => {
        (document.getElementById("slider") as HTMLInputElement).value = this.state.brushSize.toString();
    }

    handleMode = (e: FormEvent): void => {
        switch ((e.target as HTMLInputElement).value) {
            case "cursor": {
                this.setState({ draw: false, mode: "cursor", previousDot: null });
                return;
            }
            case "pen": {
                this.setState({ draw: true, mode: "pen", previousDot: null, color: this.returnColorInput() });
                return;
            }
            case "line": {
                this.setState({ draw: true, mode: "line", previousDot: null });
                return;

            }
            case "multiline": {
                this.setState({ draw: true, mode: "multiline", previousDot: null });
                return;
            }
            case "eraser": {
                this.setState({ draw: true, mode: "eraser", previousDot: null, color: "white" });
                return;
            }
            default:
                return;
        }
    }

    returnColorInput = (): string => {
        let colorInput: HTMLElement = document.getElementById("colorInput");
        let colorValue;
        (colorInput) ? (colorValue = (colorInput as HTMLInputElement).value) : (colorValue = "black");
        return colorValue;
    }

    handleImageChange = (e: FormEvent): void => {
        let id = parseInt((e.target as HTMLSelectElement).value);
        this.setState({ imageId: id });
        this.setState({ paintMode: "connect" });
        this.drawImage(this.props.images[id]);
    }

    changeColor = (e: FormEvent): void => {
        this.setState({ color: (e.target as HTMLInputElement).value, previousDot: null });
    }

    changeSize = (e: FormEvent): void => {
        this.setState({ brushSize: parseInt((e.target as HTMLInputElement).value), previousDot: null });
    }

    handleUndo = () => {
        let curveLine: CurveLine = undoStack.pop();
        if (!curveLine) {
            return;
        }
        this.addLineToRedoStack(curveLine);
        this.redrawImage(this.props.images[this.state.imageId], undoStack);
    }

    handleRedo = () => {
        let curveLine: CurveLine = redoStack.pop();
        if (!curveLine) {
            return;
        }
        this.drawCurveLine(curveLine);
        this.addLineToUndoStack(curveLine);
        this.redrawImage(this.props.images[this.state.imageId], undoStack);
    }

    addLineToUndoStack = (line: CurveLine): void => {
        undoStack.push(line);
    }

    addLineToRedoStack = (line: CurveLine): void => {
        redoStack.push(line);
    }

    redrawImage = (img: Image, stack: Stack<CurveLine>): void => {
        this.clearCanvas();
        if (this.state.paintMode === "connect") {
            this.drawImage(img);
        }
        stack.arrayOfLines.forEach(curveLine => {
            if (curveLine) {
                this.drawCurveLine(curveLine);
            }
        });
    }

    drawCurveLine = (curveLine: CurveLine): void => {
        curveLine.lines.forEach(line => {
            this.drawLine(line);
        });
    }

    drawLine = (line: Line): void => {
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
                let curveLine = new CurveLine();
                let line = new Line(this.state.previousDot, new Dot(event.clientX, event.clientY), this.state.brushSize, this.state.color);
                curveLine.addLine(line);
                this.drawCurveLine(curveLine);
                this.addLineToUndoStack(curveLine);
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

    setMouseDownEvent = (): void => {
        curve = new CurveLine();
        this.setState({ mouseDownOrUp: true });
    }

    setMouseUpEvent = (): void => {
        undoStack.push(curve);
        redoStack.emptyStack();
        this.setState({ mouseDownOrUp: false, lastPointForCurveLine: null });
        curve = null;
    }

    handleDrawing = (event: any): void => {
        if (this.drawingIsEnabled()) {
            let dot = new Dot(event.clientX, event.clientY);
            if (this.state.lastPointForCurveLine) {
                let line = new Line(this.state.lastPointForCurveLine, dot, this.state.brushSize, this.state.color);
                curve.addLine(line);
                this.drawLine(line);
            }
            this.setState({ lastPointForCurveLine: dot });
        }
    }

    drawingIsEnabled = (): boolean => {
        return (this.state.draw && this.state.mouseDownOrUp && this.isNotLineMode())
    }

    isNotLineMode = (): boolean => {
        return (this.state.mode !== "line" && this.state.mode !== "multiline");
    }

    handleClearCanvas = () => {
        undoStack.emptyStack();
        redoStack.emptyStack();
        this.clearCanvas();
    }

    render() {
        return (
            <div className="canvas-div">
                <div className="left">
                    <canvas onMouseDown={this.setMouseDownEvent} onMouseUp={this.setMouseUpEvent} onMouseMove={this.handleDrawing} onClick={this.handleDotConnection} id="canvas"></canvas>
                    <div className="right">
                        <div>
                            <label>Pick an image:</label>
                            <select onClick={this.handleImageChange}>
                                <option value="0">Batman Logo</option>
                                <option value="1">Fish</option>
                            </select>
                        </div>
                        <div>
                            <label>Tools: </label>
                            <div>
                                <input onClick={this.handleMode} className="img" value="cursor" type="image" src={cursor} />
                                <input onClick={this.handleMode} className="img" value="pen" type="image" src={pen} />
                                <input onClick={this.handleMode} className="img" value="line" type="image" src={line} />
                                <input onClick={this.handleMode} className="img" value="multiline" type="image" src={multiline} />
                                <input onClick={this.handleMode} className="img" value="eraser" type="image" src={eraser} />
                            </div>
                        </div>
                        <div>
                            <label>Pick a color: </label>
                            <input onChange={this.changeColor} className="colorInput" type="color" />
                        </div>
                        <div>
                            <label>Pick brush size: </label>
                            <br />
                            <input onChange={this.changeSize} id="slider" type="range" min="1" max="50" />
                        </div>
                        <label id="brushSize"></label>
                        <div>
                            <button id="undoBtn" onClick={this.handleUndo}><img src={undo}></img></button>
                            <button id="redoBtn" onClick={this.handleRedo}><img src={redo}></img></button>
                        </div>
                        <button className="btn" onClick={this.handleClearCanvas}><img src={clear}></img></button>
                        <a className="link" onClick={this.saveImage}>Save Image</a>
                    </div>
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