import { Component } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Navbar.css"

interface Props {
}

interface State {
    browse: boolean;
}

class Navbar extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            browse: false
        }
    }

    browseClick = (ev: any) => {
        console.log(this.state);
        this.setState({
            browse: true
        })
    }
    render() {
        return (
            <div className="navbar">
                <ul>
                    <li id="logo"><a href="#">Good Reads</a></li>
                    <li id="my-books"><a href="#">My Books</a></li>
                    <li id="browse"><a href="#" onClick={this.browseClick}>Browse</a></li>
                    <li className="search"><input id="searchInput" type="text" placeholder="Search.."></input></li>
                    <li className="separator"></li>
                    <li id="my-profile"><a href="#">My Profile</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
