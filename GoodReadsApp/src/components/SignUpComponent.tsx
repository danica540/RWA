import { Component, FormEvent } from "react";
import React from 'react';
import "../style/SignInComponent.css"

interface Props {
    history:any;
}

interface State {
    email: string;
    password: string;
    name: string;
}

class SignUpComponent extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
        };
    }

    handleOnChange = (e: any) => {
        const parameter = ((e.target as HTMLInputElement).id).toString();
        const value = (e.target as HTMLInputElement).value;
        if (parameter === "email-su") {
            this.setState({ email: value });
        }
        else if (parameter === "password-su") {
            this.setState({ password: value })
        }
        else if (parameter === "name-su") {
            this.setState({ name: value })
        }

        // console.log(this.state); - stampa prethodno stanje
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(this.validateForm()){
            console.log(this.state);
            this.props.history.push("/sign-in");
        }
        
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


