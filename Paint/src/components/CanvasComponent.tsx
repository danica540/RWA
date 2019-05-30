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
import flower from "../assets/flower.gif";
import pig from "../assets/pig.jpg";
import turtle from "../assets/turtle.jpg";

interface Props {
    handleSelectImage: Function;
    images: Image[];
    fetchImages: Function;
}

interface State {
    previousDot: Dot;
    width: number;
    height: number;
    color: string;
    brushSize: number;
    imageId: number;
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            imageId: 0,
            color: "black",
            width: 900,
            height: 600,
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

    transformX = (x: number) => {
        //console.log(this.state.width/(this.state.width/x))
        return x * (-20) + this.state.width / 2;
    }

    transformY = (y: number) => {
        //console.log(this.state.height / (this.state.height / y))
        return y * (-20) + this.state.height / 2;
    }

    transform = (image) => {
        image.dotArray.forEach(coordinate => {
            coordinate.x = this.transformX(coordinate.x);
            coordinate.y = this.transformY(coordinate.y);
        })
        return image;
    }

    drawImage = (img: any) => {
        let image = this.transform(img);
        let c = document.getElementById("canvas") as any;
        let ctx = c.getContext("2d");
        image.dotArray.forEach((coordinate, index) => {
            ctx.font = "10px Arial";
            ctx.fillText(index + 1, coordinate.x + 3, coordinate.y - 3);
            ctx.fillRect(coordinate.x, coordinate.y, 4, 4);
        })
    }

    handleDotConnection = (event: any) => {
        if (this.state.previousDot) {
            let c = document.getElementById("canvas") as any;
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(this.state.previousDot.x, this.state.previousDot.y);
            ctx.lineTo(event.clientX, event.clientY);
            ctx.strokeStyle = this.state.color;
            ctx.lineWidth = this.state.brushSize;
            ctx.stroke();
            ctx.closePath();
        }
        this.setState({ previousDot: new Dot(event.clientX, event.clientY) });
    }

    changeColor = (e: any) => {
        this.setState({ color: e.target.value });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value });
    }

    handleUndo = () => {

    }

    handleRedo = () => {

    }

    handleImageChange = (e: any) => {
        //   NE RADI SELEKCIJA SLIKE
        console.log(e.target.value);
        this.clearCanvas();
        //this.props.handleSelectImage((e.target.value as number));
        this.setState({ imageId: e.target.value });
        this.drawImage(this.props.images[e.target.value]);
    }

    clearCanvas = () => {
        const ctx = (document.getElementById("canvas") as any).getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
    }

    render() {
        if (this.props.images.length !== 0) {
            console.log(" IZ RENDERA   " + this.props.images);
            console.log(this.state.imageId);
            this.drawImage(this.props.images[this.state.imageId]);
        }
        else {
            console.log("nISta")
        }
        return (
            <div className="canvas-div">
                <div className="right">
                    <canvas onClick={this.handleDotConnection} id="canvas"></canvas>
                    <span>
                        <div className="left">
                            <div>
                                <Link className="link" to="/connect_the_dots">Connect The Dots</Link>
                            </div>
                            <div>
                                <Link className="link" to="/">Paint Freestyle</Link>
                            </div>
                            <div>
                                <h4>Pick an image: </h4>
                                <select onClick={this.handleImageChange}>
                                    <option value="0">Batman Logo</option>
                                    <option value="1">Fish</option>
                                </select>
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
                                <button onClick={this.handleUndo}>Undo</button>
                                <button onClick={this.handleRedo}>Redo</button>
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


