import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Unauthorized extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="gray-bg">
                    <div className="pt-5 middle-box text-center loginscreen animated fadeIn">
                        <h1 className="logo-name">
                            <FontAwesomeIcon
                                icon={faUserSecret}
                                title="Unauthorized"
                            />
                        </h1>
                        <Link to="/login">Return to HOME?</Link>
                        <h3> 401 Request Unauthorized </h3>
                        <p> Request Unauthorized </p>
                    </div>
                </div>
            </div>
        );
    }
}
