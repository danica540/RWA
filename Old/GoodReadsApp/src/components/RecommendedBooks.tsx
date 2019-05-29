import React, { Component, Dispatch, FormEvent } from "react";
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

class RecommendedBooks extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { books: undefined };
    }

    componentDidMount = () => {
        fetch("http://localhost:3002/books")
        .then(res=>res.json())
        .then(el=>{
            console.log(el);
            this.setState({books:el})
        });
        // let ids = [];
        // let ratings = [];
        // fetch("http://localhost:3002/ratings")
        //     .then(res => res.json())
        //     .then(niz => {
        //         niz.forEach(el => {
        //             if (!ids.includes(el.bookId)) {
        //                 ids.push(el.bookId);
        //                 ratings[ids.indexOf(el.bookId)] = 0;
        //             }
        //             if (el.type === "up") {
        //                 ratings[ids.indexOf(el.bookId)] += 1;
        //             }
        //             else if (el.type === "down") {
        //                 ratings[ids.indexOf(el.bookId)] -= 1;
        //             }
        //         })
        //         const tmp: Book[] = [];
        //         ids.forEach((id, index) => {
        //             if (ratings[ids.indexOf(id)] > 0) {
        //                 console.log("USAO SAM " + id);
        //                 console.log(ratings[index]);
        //                 fetch("http://localhost:3002/books/" + id)
        //                     .then(res => res.json())
        //                     .then(el => {
        //                         console.log("DODAJEM "+(el as Book));
        //                         tmp.push(el as Book);
        //                     })
        //             }
        //         })

        //         console.log(tmp);
        //         this.setState({ books: tmp })

        //     });
    }

    render() {
        if (!this.state.books) {
            return (<label>Loading...</label>);
        }
        return (
            <div className="book-list-component">
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

export default RecommendedBooks;

