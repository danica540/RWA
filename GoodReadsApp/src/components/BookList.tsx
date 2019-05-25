import React, { Component, Dispatch, FormEvent } from "react";
import { Action } from "redux";
import { Book } from "../models/Book";
import BookComponent from "./BookComponent";
import "../style/BookList.css";
import { connect } from "react-redux";
import { AppState } from "../store";


interface Props {
    books?: Book[];
}

interface State {

}

class BookList extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        // this.state = { books: undefined };
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (this.validateSearchInput()) {
            fetch("http://localhost:3002/books/?q=" + (document.getElementById("searchInput") as HTMLInputElement).value)
                .then(res => res.json())
                .then(niz => {
                    this.setState({ books: niz })
                })
        }
    }

    validateSearchInput = () => {
        return (document.getElementById("searchInput") as HTMLInputElement).value.length !== 0;

    }

    // componentDidMount = () => {
    //     fetch("http://localhost:3002/books")
    //         .then(res => res.json())
    //         .then(niz => {
    //             this.setState({ books: niz })
    //         })
    // }

    render() {
        console.log(this.props.books);
        if (!this.props.books) {
            return (<label>Loading...</label>);
        }
        return (
            <div className="book-list-component">
                <form onSubmit={this.handleSubmit}>
                    <input id="searchInput" type="text" placeholder="Search.."></input>
                </form>
                <div className="book-list">
                    {this.props.books.map((book: Book, index: number) =>
                        (
                            <BookComponent key={index} id={book.id} cover={book.cover} genre={book.genre}></BookComponent>
                        )
                    )}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    
}

export default connect(mapStateToProps)(BookList);

