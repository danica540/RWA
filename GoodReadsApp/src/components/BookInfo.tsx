import React, { Component, Dispatch, FormEvent } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { Book } from "../models/Book";
import { RouteProps, RouteComponentProps } from "react-router";
import "../style/BookInfo.css"


interface Props {
    match?: Object;
}

interface State {
    book_id: string;
    book?: Book;
}

class BookInfo extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { book_id: " " };
    }

    componentDidMount = () => {
        const id = ((this.props.match as any).params.book_id);
        this.setState({
            book_id: id
        });
        fetch("http://localhost:3002/books/" + id)
            .then(res => res.json())
            .then(bookTmp => {
                this.setState({ book: bookTmp });
            })

    }

    wantToReadClick=()=>{
        console.log("I want to read it")
    }

    handleRating=(e:FormEvent,bookId)=>{
        const upOrDown=(e.target as any).id;
        if(upOrDown==="up"){
            const labela=document.getElementById("rate-"+bookId);
            let content=parseInt(labela.innerHTML);
            content+=1;
            labela.innerHTML=content.toString();
        }
        else if(upOrDown==="down"){
            const labela=document.getElementById("rate-"+bookId);
            let content=parseInt(labela.innerHTML);
            content-=1;
            labela.innerHTML=content.toString();
        }
    }

    render() {
        if (!this.state.book) {
            return (<h4>Loading...</h4>)
        }
        else {
            return (
                <div className="single-book">
                    <div className="left">
                        <img src={require("../resources/no.jpg")}></img>
                        <button id={this.state.book.id} className="shelf" onClick={this.wantToReadClick}>Want to Read</button>
                        <label className="rate-label">Rate this book</label>
                        <div className="rating">
                            <img id="up" onClick={(e) => this.handleRating(e, this.state.book.id)} src={require("../resources/sort-up.png")}></img>
                            <img id="down" onClick={(e) => this.handleRating(e, this.state.book.id)} src={require("../resources/caret-down.png")}></img>
                        </div>
                        <label id={"rate-" + this.state.book.id}> 0 </label>
                    </div>
                    <div className="right">
                        <h1>{this.state.book.title}</h1>
                        <label>by {this.state.book.author}</label>

                    </div>
                </div>
            )
        }
    }
}

export default BookInfo;

