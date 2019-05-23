import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { Book } from "../models/Book";
import { RouteProps, RouteComponentProps } from "react-router";


interface Props {
    match: Object;
}

interface State {
    book_id: string;
}

class BookInfo extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state={book_id:" "};
    }

    componentDidMount = () => {
        const id = ((this.props.match as RouteComponentProps<any, any>).params.book_id);
        this.setState({
            book_id:id
        });

    }

    render() {
        return (<h1>Book with id {this.state.book_id}</h1>)
    }
}

export default BookInfo;

