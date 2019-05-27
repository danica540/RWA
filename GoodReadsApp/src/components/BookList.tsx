import React, { Component, Dispatch, FormEvent } from "react";
import { Action } from "redux";
import { Book } from "../models/Book";
import BookComponent from "./BookComponent";
import "../style/BookList.css";
import { connect } from "react-redux";
import { AppState } from "../store/store";
import { searchBooks, getBooks } from "../store/actions/book-actions";


interface Props {
    books?: Book[];
    handleSubmit: Function;
    match?: Object;
    fetchBooks:Function;
}

interface State {
    search: string;
    genre: string;
    booksState?:Book[]
}

class BookList extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            search: "",
            genre: ""
        };
    }

    // handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     if (this.validateSearchInput()) {
    //         fetch("http://localhost:3002/books/?q=" + (document.getElementById("searchInput") as HTMLInputElement).value)
    //             .then(res => res.json())
    //             .then(niz => {
    //                 this.setState({ books: niz })
    //             })
    //     }
    // }

    // validateSearchInput = () => {
    //     return (document.getElementById("searchInput") as HTMLInputElement).value.length !== 0;

    // }

    componentDidMount = () => {
        if((this.props.match as any).params.genre!==undefined){
            console.log((this.props.match as any).params.genre);
            console.log("Imam genre")
        }
        else{
            this.props.fetchBooks();
        }
        // const genreValue = ((this.props.match as any).params.genre);
        // this.setState({
        //     genre: genreValue
        // });
        // fetch("http://localhost:3002/books/?genre=" + genreValue)
        //     .then(res => res.json())
        //     .then(bookTmp => {
        //         this.setState({booksState:bookTmp});
        //     })
    }

    handleChange = (e: FormEvent) => {
        this.setState({ search: (e.target as HTMLInputElement).value });
    }

    render() {
        if (!this.props.books) {
            return (<label>Loading...</label>);
        }
        return (
            <div className="book-list-component">
                <form onSubmit={() => this.props.handleSubmit(this.state.search)}>
                    <input onChange={this.handleChange} id="searchInput" type="text" placeholder="Search.."></input>
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


const mapStateToProps = (state: AppState) => {
    return { books: state.books }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        //propName
        handleSubmit: (text: string) => dispatch(searchBooks(text)),
        fetchBooks:()=>dispatch(getBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

