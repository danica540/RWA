import { Component } from "react";
import React from 'react';
import "../style/BookComponent.css";

interface Props {
    genre: string;
    cover: any;
    id: string;
}

interface State {
    wantToRead: boolean;
}

class BookComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            wantToRead: false
        }
    }

    wantToReadClick = (e: any) => {
        const wantToReadTmp = !this.state.wantToRead;
        this.setState({ wantToRead: wantToReadTmp });
        const btn: any = document.getElementById(e.target.id);
        if (wantToReadTmp) {
            btn.style.backgroundColor = "#dde0ce";
            btn.style.color = "black";
        }
        else {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        }
    }

    render() {
        // const image:string = require(this.props.cover);
        // console.log(image);
        // console.log(require("../../public/resources/alchemist.jpg"));
        return (
            <div className="list-item">
                <h3 className="genre">{this.props.genre}</h3>
                <img src={this.props.cover}></img>
                <button id={this.props.id} className="shelf" onClick={this.wantToReadClick}>Want to Read</button>
                <label>Rate this book</label>
                <div className="rating">
                    <span><a href="#" className="star">☆</a></span>
                    <span><a href="#" className="star">☆</a></span>
                    <span><a href="#" className="star">☆</a></span>
                    <span><a href="#" className="star">☆</a></span>
                    <span><a href="#" className="star">☆</a></span>
                </div>
            </div>
        )
    }
}

export default BookComponent;


