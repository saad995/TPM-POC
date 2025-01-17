import { FieldWrapper } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import React from "react";
import { Button } from "react-bootstrap";
import "./ButtonComponent.scss";

const buttonComponent = (fieldRenderProps: any) => {
    const {
        validationMessage,
        visited,
        label,
        disabled,
        onClick,
        type,
        id,
        title
    } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    return (
        <>
            <FieldWrapper>
                <Button
                    id={id}
                    disabled={disabled}
                    onClick={onClick}
                    type={type}
                    title={title}
                >
                    {label}
                </Button>
            </FieldWrapper>
            {showValidationMessage && (
                <Error style={{ marginLeft: "30%" }}>{validationMessage}</Error>
            )}
        </>
    );
};

export default buttonComponent;
