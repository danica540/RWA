import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { Book } from "../models/Book";
import BookComponent from "./BookComponent";

interface Props {
    books?: Book[];
}

interface State {
    
}

class BookList extends Component<Props, State> {

    render() {
        if (!this.props.books) {
            return (<h2>No books</h2>);
        }
        return (
            <div>
                {this.props.books.map((book: Book,index:number) =>
                    (
                        <BookComponent key={index} genre={book.genre} cover={book.cover}></BookComponent>
                    )
                )}
            </div>
        );
    }
}

export default BookList;

