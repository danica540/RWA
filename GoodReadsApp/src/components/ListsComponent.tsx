import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/ListsComponent.css";


interface State {
    genres: string[]
}

interface Props {
}

class ListsComponent extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { genres: [] };
    }

    componentDidMount = () => {
        fetch("http://localhost:3002/genres")
            .then(res => res.json())
            .then(array => {
                this.setState({ genres: array })
            })
    }

    render() {
        return (
                <div className="lists-component">
                    <h1>Select a genre</h1>
                    <ul>
                        {this.state.genres.map((g: string, index: number) =>
                            (
                                <li key={index}><Link to={"/lists/" + g}>{g}</Link></li>
                            )
                        )}
                    </ul>
                </div>
        )
    }
}

export default ListsComponent;

