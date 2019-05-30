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
    brushSize:number;
}

class CanvasComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            id: 1,
            color: "black",
            width: 900,
            height: 600,
            brushSize:2,
            previousDot: null
        }
    }

    setCanvasSize = () => {
        let c: any = document.getElementById("canvas");
        c.width = this.state.width;
        c.height = this.state.height;
        // c.width = c.height *(c.clientWidth / c.clientHeight);
        // c.height = c.width *(c.clientHeight / c.clientWidth);
    }

    componentDidMount = () => {
        // this.props.fetchImages();
        // console.log(this.props);
        fetch("http://localhost:3002/images/1")
            .then(res => res.json())
            .then(img => {
                this.setState({ image: img });
                this.drawImage(img);
            })
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
        // 500, 250 je sredina
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
            //ctx.strokeText(index + 1, coordinate.x + 3, coordinate.y -3);
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
        console.log(e.target.value);
        this.setState({color:e.target.value});
    }

    changeSize=(e:any)=>{
        console.log(e.target.value);
        this.setState({brushSize:e.target.value});
    }

    render() {
        return (
            <div className="canvas-div">

                {/* 
                <button id="1" onClick={() => this.props.handleSelectImage(this.state.id)}>Select image number one</button> */}
                <div className="right">
                    <canvas onClick={this.handleDotConnection} id="canvas"></canvas>
                    <span>
                        <div className="left">
                            <h2>Connect The Dots</h2>
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


