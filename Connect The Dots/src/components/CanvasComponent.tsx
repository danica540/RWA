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
    handleSelectImage: Function;
    images: Image[];
    fetchImages: Function;
}

interface State {
    id: number;
    previousDot: Dot;
    image?: Image[];
    width: number;
    height: number;
    color: string;
    brushSize: number;
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            id: 1,
            color: "black",
            width: 900,
            height: 600,
            brushSize: 2,
            previousDot: null
        }
    }

    setCanvasSize = () => {
        let c: any = document.getElementById("canvas");
        c.width = this.state.width;
        c.height = this.state.height;
    }

    componentDidMount = () => {
        this.props.fetchImages();
        // fetch("http://localhost:3002/images/1")
        //     .then(res => res.json())
        //     .then(img => {
        //         this.setState({ image: img });
        //         this.drawImage(img);
        //     })
        this.setCanvasSize();
    }

    transformX = (x: number) => {
        //console.log(this.state.width/(this.state.width/x))
        return x * (-20) + this.state.width / 2;
    }

    transformY = (y: number) => {
        //console.log(this.state.height / (this.state.height / y))
        return y * (-15) + this.state.height / 2;
    }

    transform = (image) => {
        image.dotArray.forEach(coordinate => {
            coordinate.x = this.transformX(coordinate.x);
            coordinate.y = this.transformY(coordinate.y);
        })
        return image;
    }

    drawImage = (img: any) => {
        console.log("Image");
        console.log(img)
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
        //console.log(event.clientX + "   " + event.clientY + "---------- CONNECT --------");
        if (this.state.previousDot) {
            //console.log(this.state.previousDot.x + "     " + this.state.previousDot.y + "---------- previous --------");
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

    printCoordinates = (event: any) => {
        console.log(event.clientX + "   " + event.clientY + "---------- PRINT --------");
    }

    changeColor = (e: any) => {
        this.setState({ color: e.target.value });
    }

    changeSize = (e: any) => {
        this.setState({ brushSize: e.target.value });
    }

    handleMode = (e: any) => {
        console.log(e.target.value);
    }

    render() {
        // if(this.props.images.length!==0){
        //     console.log(this.props.images[0]);
        //     this.drawImage(this.props.images[0]);
        // }
        return (
            <div className="canvas-div">
                <div className="right">
                    <canvas onClick={this.handleDotConnection} id="canvas"></canvas>
                    <span>
                        <div className="left">
                            <div>
                                <Link to="/connect_the_dots">Connect The Dots</Link>
                            </div>
                            <div>
                                <Link to="/">Freestyle paint</Link>
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
                                <input onChange={this.changeSize} type="number" name="quantity" min="1" max="10" />
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


