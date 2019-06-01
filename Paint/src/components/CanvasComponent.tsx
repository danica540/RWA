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
    lastPoint: Dot;
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

    saveImage = (e: FormEvent) => {
        let canvas: HTMLElement = document.getElementById("canvas");
        (e.target as HTMLAnchorElement).href = (canvas as HTMLCanvasElement).toDataURL();
        (e.target as HTMLAnchorElement).download = "myPainting.jpg";
    }


    setCanvasSize = () => {
        let canvas: HTMLElement = document.getElementById("canvas");
        (canvas as HTMLCanvasElement).width = this.state.width;
        (canvas as HTMLCanvasElement).height = this.state.height;
    }

    refreshUndoState=()=>{
        if(undoStack.isEmpty()){
            disableButton(document.getElementById("undoBtn") as HTMLButtonElement);
        }
        else{
            enableButton(document.getElementById("undoBtn") as HTMLButtonElement);
        }
    }

    refreshRedoState=()=>{
        if(redoStack.isEmpty()){
            disableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        }
        else{
            enableButton(document.getElementById("redoBtn") as HTMLButtonElement);
        }
    }

    componentDidUpdate = () => {
        this.handleCanvasLoad();
        this.refreshRedoState();
        this.refreshUndoState();
        document.getElementById("brushSize").innerHTML = (document.getElementById("slider") as HTMLInputElement).value;

    }

    componentDidMount = () => {
        this.props.fetchImages();
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
            ctx.fillText(index + 1, x + 3, y - 3);
            ctx.fillRect(x, y, 4, 4);
        })
        ctx.closePath();
    }

    drawImage = (img: any) => {
        this.clearCanvas();
        this.setState({ isImageDrawn: true, paintMode: "connect" });
        let maxCoordinates = returnMaxCoordinates(img.dotArray);
        this.drawDots(img.dotArray, maxCoordinates);
    }

    redrawImage(img: any, stack: Stack<CurveLine>) {
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

    addLineToUndoStack = (line: CurveLine) => {
        undoStack.push(line);
    }

    addLineToRedoStack = (line: CurveLine) => {
        redoStack.push(line);
    }
    
    drawCurveLine = (curveLine: CurveLine) => {
        curveLine.lines.forEach(line => {
            this.drawLine(line);
        });
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
        if (this.state.mode === "eraser") {
            ctx.strokeStyle = "white";
        }
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

    changeColor = (e: any) => {
        this.setState({ color: e.target.value, previousDot: null });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value, previousDot: null });
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

    handleImageChange = (e: FormEvent) => {
        let id=parseInt((e.target as HTMLSelectElement).value);
        this.setState({ imageId: id });
        this.setState({ paintMode: "connect" });
        this.drawImage(this.props.images[id]);
    }

    handleMode = (e: FormEvent) => {
        switch ((e.target as HTMLInputElement).value) {
            case "cursor": {
                this.setState({ draw: false, mode: "cursor", previousDot: null });
                return;
            }
            case "pen": {
                this.setState({ draw: true, mode: "pen", previousDot: null });
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

    setMouseDownEvent = () => {
        curve = new CurveLine();
        this.setState({
            mouseDownOrUp: true
        });
    }

    setMouseUpEvent = () => {
        undoStack.push(curve);
        redoStack.emptyStack();
        this.setState({
            mouseDownOrUp: false,
            lastPoint: null
        });
        curve = null;
    }

    isNotLineMode = () => {
        return (this.state.mode !== "line" && this.state.mode !== "multiline");
    }

    drawingIsEnabled = () => {
        return (this.state.draw && this.state.mouseDownOrUp && this.isNotLineMode())
    }

    handleDrawing = (event: any) => {
        if (this.drawingIsEnabled()) {
            let dot=new Dot(event.clientX, event.clientY);
            if (this.state.lastPoint) {
                let line = new Line(this.state.lastPoint, dot,this.state.brushSize,this.state.color);
                curve.addLine(line);
                this.drawLine(line);
            }
            this.setState({ lastPoint: dot });
        }
    }

    handleClearCanvas = () => {
        undoStack.emptyStack();
        redoStack.emptyStack();
        this.clearCanvas();
    }

    clearCanvas = () => {
        const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext('2d');
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
                                <input onChange={this.changeSize} id="slider" type="range" min="1" max="50" />
                            </div>
                            <label id="brushSize"></label>
                            <div>
                                <button id="undoBtn" onClick={this.handleUndo}>Undo</button>
                                <button id="redoBtn" onClick={this.handleRedo}>Redo</button>
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