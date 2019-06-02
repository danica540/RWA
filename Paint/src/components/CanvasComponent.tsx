import { Component, Dispatch, FormEvent } from "react";
import React from 'react';
import "../style/CanvasComponent.css";
import { connect } from "react-redux";
import { AppState } from "../store/store";
import { Action } from "redux";
import { Image } from "../models/Image";
import { Dot } from "../models/Dot";
import { Stack } from "../models/Stack";
import { Line } from "../models/Line";
import { images } from '../images/images'
import { transformX, transformY, returnMaxCoordinates } from "../functions/transformation-functions";
import { enableButton, disableButton } from "../functions/html-element-functions";
import { CurveLine } from "../models/CurveLine";
import { getImages } from "../store/image-ARS/actions";
import { paintModeConst, lineConst, toolModeConst, colorsConst, imageConst, fontConst } from "../constants/constants";

const undoStack: Stack<CurveLine> = new Stack<CurveLine>();
const redoStack: Stack<CurveLine> = new Stack<CurveLine>();
let currentCurve: CurveLine = null;

interface Props {
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
    mode: string;
    mouseDown: boolean;
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            lastPointForCurveLine: null,
            paintMode: paintModeConst.CONNECT,
            lineCap: lineConst.ROUND_CAP,
            isImageDrawn: false,
            mode: toolModeConst.CURSOR,
            mouseDown: false,
            draw: false,
            imageId: 0,
            color: colorsConst.BLACK,
            width: window.innerWidth * 2 / 3,
            height: window.innerHeight,
            brushSize: 4,
            previousDot: null
        }
    }

    saveImage = (e: FormEvent): void => {
        let canvas: HTMLElement = document.getElementById("canvas");
        (e.target as HTMLAnchorElement).href = (canvas as HTMLCanvasElement).toDataURL(imageConst.TYPE, 2.0);
        (e.target as HTMLAnchorElement).download = imageConst.IMAGE_NAME;
    }

    componentDidUpdate = () => {
        this.handleCanvasLoad();
        this.refreshRedoState();
        this.refreshUndoState();
        if (this.state.mode !== toolModeConst.ERASER && this.isColorInputNotNull()) {
            let colorValue = (document.getElementById("colorInput") as HTMLInputElement).value;
            this.setState({ color: colorValue });
        }
        this.setBrushSizeLabel();
    }

    isColorInputNotNull(): HTMLElement {
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
        if (this.props.images.length !== 0 && !this.state.isImageDrawn && this.state.paintMode === paintModeConst.CONNECT) {
            this.drawImage(this.props.images[this.state.imageId]);
        }
    }

    drawImage = (img: Image): void => {
        this.clearCanvas();
        this.setState({ isImageDrawn: true, paintMode: paintModeConst.CONNECT });
        let maxCoordinates = returnMaxCoordinates(img.dotArray);
        this.drawDots(img.dotArray, maxCoordinates);
    }

    clearCanvas = (): void => {
        const ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext('2d');
        this.setState({ paintMode: paintModeConst.CLEAR });
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    }

    drawDots = (coordinatesArray: Dot[], maxCoordinates: any): void => {
        let ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
        ctx.beginPath();
        coordinatesArray.forEach((coordinate: Dot, index: number) => {
            let x = transformX(coordinate.x, this.state.width, maxCoordinates.x);
            let y = transformY(coordinate.y, this.state.height, maxCoordinates.y);
            ctx.font = fontConst.DEFAULT_FONT;
            ctx.fillStyle = colorsConst.BLACK;
            ctx.fillText((index + 1).toString(), x + 3, y - 3);
            ctx.fillRect(x, y, 4, 4);
        })
        ctx.closePath();
    }

    componentDidMount = () => {
        this.props.fetchImages();
        this.setCanvasSize();
        this.setBrushSizeInput();
    }

    setBrushSizeInput = (): void => {
        (document.getElementById("slider") as HTMLInputElement).value = this.state.brushSize.toString();
    }

    handleMode = (e: FormEvent): void => {
        switch ((e.target as HTMLInputElement).value) {
            case toolModeConst.CURSOR: {
                this.setState({ draw: false, mode: toolModeConst.CURSOR, previousDot: null });
                return;
            }
            case toolModeConst.PEN: {
                this.setState({ draw: true, mode: toolModeConst.PEN, previousDot: null, color: this.returnColorInput() });
                return;
            }
            case toolModeConst.LINE: {
                this.setState({ draw: true, mode: toolModeConst.LINE, previousDot: null });
                return;

            }
            case toolModeConst.MULTILINE: {
                this.setState({ draw: true, mode: toolModeConst.MULTILINE, previousDot: null });
                return;
            }
            case toolModeConst.ERASER: {
                this.setState({ draw: true, mode: toolModeConst.ERASER, previousDot: null, color: colorsConst.WHITE });
                return;
            }
            default:
                return;
        }
    }

    returnColorInput = (): string => {
        let colorInput: HTMLElement = document.getElementById("colorInput");
        let colorValue;
        (colorInput) ? (colorValue = (colorInput as HTMLInputElement).value) : (colorValue = colorsConst.BLACK);
        return colorValue;
    }

    handleImageChange = (e: FormEvent): void => {
        let id = parseInt((e.target as HTMLSelectElement).value);
        this.setState({ imageId: id });
        this.setState({ paintMode: paintModeConst.CONNECT });
        this.drawImage(this.props.images[id]);
        this.emptyStacks();
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
        if (this.state.paintMode === paintModeConst.CONNECT) {
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
        ctx.lineJoin = lineConst.ROUND_JOIN;
        ctx.strokeStyle = line.color;
        ctx.lineCap = this.state.lineCap;
        ctx.lineWidth = line.brushSize;
        ctx.stroke();
        ctx.closePath();
    }

    handleDotConnection = (event: any) => {
        if (this.state.mode === toolModeConst.MULTILINE || this.state.mode === toolModeConst.LINE) {
            if (this.state.previousDot) {
                let curveLine = new CurveLine();
                let line = new Line(this.state.previousDot, new Dot(event.clientX, event.clientY), this.state.brushSize, this.state.color);
                curveLine.addLine(line);
                this.drawCurveLine(curveLine);
                this.addLineToUndoStack(curveLine);
                if (this.state.mode === toolModeConst.MULTILINE) {
                    this.setState({ previousDot: new Dot(event.clientX, event.clientY) });
                }
                else if (this.state.mode === toolModeConst.LINE) {
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
        currentCurve = new CurveLine();
        this.setState({ mouseDown: true });
    }

    setMouseUpEvent = (): void => {
        undoStack.push(currentCurve);
        redoStack.emptyStack();
        this.setState({ mouseDown: false, lastPointForCurveLine: null });
        currentCurve = null;
    }

    handleDrawing = (event: any): void => {
        if (this.drawingIsEnabled()) {
            let dot = new Dot(event.clientX, event.clientY);
            if (this.state.lastPointForCurveLine) {
                let line = new Line(this.state.lastPointForCurveLine, dot, this.state.brushSize, this.state.color);
                currentCurve.addLine(line);
                this.drawLine(line);
            }
            this.setState({ lastPointForCurveLine: dot });
        }
    }

    drawingIsEnabled = (): boolean => {
        return (this.state.draw && this.state.mouseDown && this.isNotLineMode())
    }

    isNotLineMode = (): boolean => {
        return (this.state.mode !== toolModeConst.LINE && this.state.mode !== toolModeConst.MULTILINE);
    }

    handleClearCanvas = () => {
        this.emptyStacks();
        this.clearCanvas();
    }

    emptyStacks = () => {
        undoStack.emptyStack();
        redoStack.emptyStack();
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
                                <input onClick={this.handleMode} className="img" value="cursor" type="image" src={images.CURSOR_IMG} />
                                <input onClick={this.handleMode} className="img" value="pen" type="image" src={images.PEN_IMG} />
                                <input onClick={this.handleMode} className="img" value="line" type="image" src={images.LINE_IMG} />
                                <input onClick={this.handleMode} className="img" value="multiline" type="image" src={images.MULTILINE_IMG} />
                                <input onClick={this.handleMode} className="img" value="eraser" type="image" src={images.ERASER_IMG} />
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
                            <button id="undoBtn" onClick={this.handleUndo}><img src={images.UNDO_IMG}></img></button>
                            <button id="redoBtn" onClick={this.handleRedo}><img src={images.REDO_IMG}></img></button>
                        </div>
                        <button className="btn" onClick={this.handleClearCanvas}><img src={images.CLEAR_IMG}></img></button>
                        <a className="link" onClick={this.saveImage}>Save Image</a>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        fetchImages: () => dispatch(getImages())
    }
}

function mapStateToProps(state: AppState) {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);