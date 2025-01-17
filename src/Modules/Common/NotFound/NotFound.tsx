import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="gray-bg">
                    <div className="middle-box text-center loginscreen animated fadeIn">
                        <h1 className="logo-name"> M+ </h1>
                        <Link to="/login">Return to HOME?</Link>
                        <h3> 404 Page Not Found </h3>
                        <p> Route Not Found </p>
                    </div>
                </div>
            </div>
        );
    }
}
