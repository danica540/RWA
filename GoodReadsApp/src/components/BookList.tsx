import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { Book } from "../models/Book";
import BookComponent from "./BookComponent";
import "../style/BookList.css";


interface Props {
}

interface State {
    books?: Book[];
}

class BookList extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { books: undefined };
    }

    handleSubmit() {
        console.log("search");
    }

    componentDidMount() {
        fetch("http://localhost:3002/books")
            .then(res => res.json())
            .then(niz => {
                this.setState({ books: niz })
            })
    }

    render() {
        if (!this.state.books) {
            return (<label>Loading...</label>);
        }
        return (
            <div className="book-list-component">
                <form onSubmit={this.handleSubmit}>
                    <input id="searchInput" type="text" placeholder="Search.."></input>
                </form>
                <div className="book-list">
                    {this.state.books.map((book: Book, index: number) =>
                        (
                            <BookComponent key={index} id={book.id} cover={book.cover} genre={book.genre}></BookComponent>
                        )
                    )}
                </div>
            </div>
        );
    }
}

export default BookList;

