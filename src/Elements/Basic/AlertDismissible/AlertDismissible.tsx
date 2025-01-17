import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearAlert } from "./AlertDismissibleActions";

import { IMessage } from "./AlertDismissibleInterfaces";

const AlertDismissible = (props: any) => {
    const { isAlertVisible, variant, message, className } = props;
    const dispatch = useDispatch();

    function setVisibleFalse(): void {
        const message: IMessage = {
            code: "",
            description: ""
        };
        dispatch(clearAlert(message));
    }

    if (isAlertVisible) {
        return (
            <>
                <Alert className={className} variant={variant} onClose={setVisibleFalse} dismissible>
                    <div dangerouslySetInnerHTML={{__html: message}} />
                </Alert>
            </>
        );
    }

    return <React.Fragment></React.Fragment>;
};

export default AlertDismissible;
