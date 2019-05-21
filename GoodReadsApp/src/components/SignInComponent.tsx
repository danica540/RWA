import { Component, FormEvent } from "react";
import React from 'react';
import "../style/SignInComponent.css"

interface Props {
}

interface State {
    email: string;
    password: string;
}

class SignInComponent extends Component<Props, State>{

    handleOnChange = (e: any) => {
        const parameter = ((e.target as HTMLInputElement).id).toString();
        const value = (e.target as HTMLInputElement).value;
        if (parameter === "email") {
            this.setState({ email: value });
        }
        else if (parameter === "password") {
            this.setState({ password: value })
        }

        // console.log(this.state); - stampa prethodno stanje
    }

    handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
        console.log(e.target);
        console.log(this.state);
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
                <label>Don't have an account? <a href="sign-up">Sign up</a></label>
                </form>
            </div>
        )
    }
}

export default SignInComponent;


