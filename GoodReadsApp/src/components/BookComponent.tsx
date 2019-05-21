import { Component } from "react";
import React from 'react';

interface Props {
    genre: string;
    cover: string;
}

interface State {
    wantToRead:boolean;
}

class BookComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            wantToRead:false
        }
    }

    wantToReadClick = (e: any) => {
        console.log(e.target.value);
        this.setState({wantToRead:true});
    }

    render() {
        return (
            <div className="list-item">
                <h3 className="genre">Fiction</h3>
                <img src={require("../resources/alchemist.jpg")}></img>
                <button id="shelf" onClick={this.wantToReadClick}>Want to Read</button>
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


