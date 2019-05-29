import React, { Component } from "react";
import "../style/ErrorPage.css"

class ErrorPage extends Component {


    render() {
        return (
            <div className="error">
                <h1>Error 404</h1>
                <label> Page Not Found</label>
            </div>
        )
    }
}

export default ErrorPage;

