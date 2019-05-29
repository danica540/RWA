import { Component, FormEvent } from "react";
import React from 'react';
import "../style/SignInComponent.css"
import { Link } from "react-router-dom";
import { setCookie } from "../functions/cookie-functions";

interface Props {
    history: any;
}

interface State {
    email: string;
    password: string;
}

class SignInComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = { 
            email: "", 
            password:"" 
        };
    }

    handleOnChange = (e: any) => {
        const parameter = ((e.target as HTMLInputElement).id).toString();
        const value = (e.target as HTMLInputElement).value;
        if (parameter === "email-si") {
            this.setState({ email: value });
        }
        else if (parameter === "password-si") {
            this.setState({ password: value })
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(this.validateForm()){
            console.log("Validno");
            //kontartiram servis da vidim da li user postoji
            setCookie('logedin','asdasdasda',1);
            this.props.history.push("/");
        }
        
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h1>Sign In</h1>
                    <img src={require("../resources/user.png")}></img>
                    <h4>E-mail</h4>
                    <input type="text" id="email-si" onChange={this.handleOnChange}></input>
                    <h4>Password</h4>
                    <input type="password" id="password-si" onChange={this.handleOnChange}></input>
                    <button>Sign In</button>
                    <label>Don't have an account? <Link to={"/sign-up"}>Sign up</Link></label>
                </form>
            </div>
        )
    }
}

export default SignInComponent;


