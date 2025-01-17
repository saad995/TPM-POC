import React from "react";
import "./Message.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons"

const message = () => (
    <div id="barErrorDiv" className="bar-error-styling barErrorHide">
     
       <p>  <FontAwesomeIcon icon={faExclamationCircle} /> Internal Server Error</p>
    </div>
);

export default message;
