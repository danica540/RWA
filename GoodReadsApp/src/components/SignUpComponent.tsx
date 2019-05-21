import { Component, FormEvent } from "react";
import React from 'react';
import "../style/SignInComponent.css"

interface Props {
}

interface State {
    email: string;
    password: string;
    name: string;
}

class SignUpComponent extends Component<Props, State>{

    handleOnChange = (e: any) => {
        const parameter = ((e.target as HTMLInputElement).id).toString();
        const value = (e.target as HTMLInputElement).value;
        if (parameter === "email") {
            this.setState({ email: value });
        }
        else if (parameter === "password") {
            this.setState({ password: value })
        }
        else if (parameter === "name") {
            this.setState({ name: value })
        }

        // console.log(this.state); - stampa prethodno stanje
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e.target);
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <img src={require("../resources/user.png")}></img>
                    <h4>Name</h4>
                    <input type="text" id="name-su" onChange={this.handleOnChange}></input>
                    <h4>E-mail</h4>
                    <input type="text" id="email-su" onChange={this.handleOnChange}></input>
                    <h4>Password</h4>
                    <input type="password" id="password-su" onChange={this.handleOnChange}></input>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUpComponent;


