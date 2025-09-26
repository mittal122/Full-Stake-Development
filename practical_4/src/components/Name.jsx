import React, { Component } from "react";
import './Counter.css'

class Name extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="name-container">
                <h1 className="name-title">Welcome to CHARUSAT!!!</h1>
                <div className="input-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="output-group">
                    <p>First Name: {this.state.firstName}</p>
                    <p>Last Name: {this.state.lastName}</p>
                </div>
            </div>
        );
    }
}

export default Name;