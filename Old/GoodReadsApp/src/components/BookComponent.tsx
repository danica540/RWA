import { Component, FormEvent } from "react";
import React from 'react';
import "../style/BookComponent.css";
import { Link } from "react-router-dom";

interface Props {
    genre: string;
    cover: string;
    id: string;
}

interface State {
    wantToRead: boolean;
    ratings: number;
    // imgCover:any;
}

class BookComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            wantToRead: false,
            ratings: 0
            // imgCover:[require("../resources/no.jpg")]
        }
    }

    componentDidMount=()=>{
        fetch("http://localhost:3002/ratings")
        .then(res=>res.json())
        .then(ratings=>{
            let numberOfRatings=ratings.reduce((acc,el)=>{
                if(el.id===this.props.id){
                    acc+=1;
                }
                return acc;
            },0)

            this.setState({ratings:numberOfRatings})
        })
    }

    wantToReadClick = (e: FormEvent<HTMLButtonElement>) => {
        const wantToReadTmp = !this.state.wantToRead;
        this.setState({ wantToRead: wantToReadTmp });
        const btn: HTMLElement = document.getElementById((e.target as any).id);
        if (wantToReadTmp) {
            btn.style.backgroundColor = "#dde0ce";
            btn.style.color = "black";
        }
        else {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        }
    }

    handleRating = (e: FormEvent, bookId) => {
        const upOrDown = (e.target as any).id;
        if (upOrDown === "up") {
            //add rating
            // add userHasRating
            const labela = document.getElementById("rate-" + bookId);
            let content = parseInt(labela.innerHTML);
            content += 1;
            labela.innerHTML = content.toString();
        }
        else if (upOrDown === "down") {
            // delete rating
            // delete userHasRating
            const labela = document.getElementById("rate-" + bookId);
            let content = parseInt(labela.innerHTML);
            content -= 1;
            labela.innerHTML = content.toString();
        }
    }

    render() {
        // this.setState({imgCover:[require(this.props.cover)]});
        const link: string = "/books/" + this.props.id;
        return (
            <div className="list-item">
                <h3 className="genre">{this.props.genre}</h3>
                <Link to={link}><img src={require("../resources/no.jpg")}></img></Link>
                <button id={this.props.id} className="shelf" onClick={this.wantToReadClick}>Want to Read</button>
                <label>Rate this book</label>
                <div className="rating">
                    <img id="up" onClick={(e) => this.handleRating(e, this.props.id)} src={require("../resources/sort-up.png")}></img>
                    <img id="down" onClick={(e) => this.handleRating(e, this.props.id)} src={require("../resources/caret-down.png")}></img>
                </div>
                <label id={"rate-" + this.props.id}> {this.state.ratings} </label>
            </div>
        )
    }
}

export default BookComponent;


