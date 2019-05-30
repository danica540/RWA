import { Component, FormEvent, Dispatch } from "react";
import React from 'react';
import { Link } from "react-router-dom";
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

interface Props {
}

interface State {
    width: number;
    height: number;
    color: string;
    draw: boolean;
    brushSize: number;
    eraser: boolean;
    mouseDownOrUp: boolean; // false je up, a down je true
}

class PaintComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            eraser: false,
            mouseDownOrUp: false,
            draw: false,
            color: "black",
            width: 900,
            height: 600,
            brushSize: 5
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
        this.setCanvasSize();
    }

    handleDrawing = (event: any) => {
        if (this.state.draw && this.state.mouseDownOrUp) {
            let c = document.getElementById("canvas") as any;
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.arc(event.clientX, event.clientY, this.state.brushSize, 0, 2 * Math.PI);
            if(!this.state.eraser){
                ctx.fillStyle = this.state.color;
                ctx.strokeStyle = this.state.color;
            }
            else{
                ctx.fillStyle = "white";
                ctx.strokeStyle = "white";
            }
            ctx.lineWidth = this.state.brushSize;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    changeColor = (e: any) => {
        this.setState({ color: e.target.value });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value });
    }

    handleMode = (e: any) => {
        switch (e.target.value) {
            case "cursor": {
                this.setState({ draw: false,eraser: false });
                return;
            }
            case "pen": {
                this.setState({ draw: true,eraser: false });
                return;
            }
            case "line": {
                //DODATI ZA LINIJE
                return;

            }
            case "eraser": {
                this.setState({
                    draw: true,
                    eraser: true,
                    color: "white"
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

    render() {
        return (
            <div className="canvas-div">
                <div className="right">
                    <canvas onMouseDown={this.setMouseDownEvent} onMouseUp={this.setMouseUpEvent} onMouseMove={this.handleDrawing} id="canvas"></canvas>
                    <span>
                        <div className="left">
                            <div>
                                <Link className="link" to="/connect_the_dots">Connect The Dots</Link>
                            </div>
                            <div>
                                <Link className="link" to="/">Freestyle paint</Link>
                            </div>
                            <label>Tools: </label>
                            <div>
                                <input onClick={this.handleMode} className="img" value="cursor" type="image" src={cursor} />
                                <input onClick={this.handleMode} className="img" value="pen" type="image" src={pen} />
                                <input onClick={this.handleMode} className="img" value="line" type="image" src={line} />
                                <input onClick={this.handleMode} className="img" value="eraser" type="image" src={eraser} />
                            </div>
                            <div>
                                <label>Pick a color: </label>
                                <input onChange={this.changeColor} type="color" />
                            </div>
                            <div>
                                <label>Pick brush size: </label>
                                <input onChange={this.changeSize} type="number" name="quantity" min="1" max="18" />
                            </div>

                            <div>
                                <a className="saveButton" onClick={this.saveImage}>Save image</a>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}


export default PaintComponent;


