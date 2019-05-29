
import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import "../style/Navbar.css"
import { User } from "../models/User";

interface State {
  user?: User;
  logged: boolean;
}

class Navbar extends Component<{}, State> {

  state: State = {
    user: null,
    logged: false
  }

  logOut = () => {
    this.setState({
      logged:false,
      user:null
    })
  }

  render() {
    if(!this.state.user){
      return (
        <div className="navbar">
          <ul>
            <li id="logo"><Link to={"/"}>Good Reads</Link></li>
            <li id="browse"><Link to={"/books"}>Browse</Link></li>
            <li className="separator"></li>
            <li><Link to={`/sign-in`}>Sign In</Link></li>
          </ul>
        </div>
      )
    }
    else{
      return (
        <div className="navbar">
          <ul>
            <li id="logo"><Link to={"/"}>Good Reads</Link></li>
            <li id="my-books"><Link to={"/bookshelves"}>My Books</Link></li>
            <li id="browse"><Link to={"/books"}>Browse</Link></li>
            <li className="separator"></li>
            <li onClick={this.logOut}><Link to={`/`}>Log out</Link></li>
            <li id="my-profile"><Link to={"/profile/"+this.state.user.id}>My Profile</Link></li>
          </ul>
        </div>
      )
    }
  }
}

export default Navbar;
