import { Component } from "react";
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
                    <li id="logo"><Link to={"/"}>Good Reads</Link></li>
                    <li id="my-books"><Link to={"#"}>My Books</Link></li>
                    <li id="browse"><Link to={"#"} onClick={this.browseClick}>Browse</Link></li>
                    <li className="search"><input id="searchInput" type="text" placeholder="Search.."></input></li>
                    <li className="separator"></li>
                    {/* <li ><a href="sign-in">Sign In</a></li> */}
                    <li><Link to={`/sign-in`}>Sign In</Link></li>
                    <li id="my-profile"><Link to={"#"}>My Profile</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Navbar as any);
