import list from "../resources/lists.jpeg";
import choice from "../resources/choice.jpg";
import recommend from "../resources/recommend.jpg";
import { Component } from "react";
import React from 'react';
import "../style/BrowseComponent.css"
import { Link } from "react-router-dom";

class BrowseComponent extends Component {

    render() {
        return (
            <div className="browse-component">
                <h1>Browse our Books</h1>
                <div className="main">
                    <div className="right">
                        <Link to="/choice-awards">
                            <img src={choice}></img>
                        </Link>
                        <p>View our most rated books</p>
                        <h4>Choice Awards</h4>
                    </div>
                    <div className="center">
                        <Link to="/lists">
                            <img src={list}></img>
                        </Link>
                        <p>View our book lists</p>
                        <h4>Lists</h4>
                    </div>
                    <div className="left">
                        <Link to="/recommendations">
                            <img src={recommend}></img>
                        </Link>
                        <p>View our most recommended books</p>
                        <h4>Recommendations</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default BrowseComponent;
