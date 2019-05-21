import { Component, FormEvent } from "react";
import React from 'react';

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
            <div className="sign-in">
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input type="text" id="email" onChange={this.handleOnChange}></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleOnChange}></input>
                <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SignInComponent;


