import React from "react";
import _ from "lodash";

//Import Components
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Hint, Error } from "@progress/kendo-react-labels";
import { Input, MaskedTextBox } from "@progress/kendo-react-inputs";
import { Row, Col } from "react-bootstrap";
import InputInstruction from "Elements/Basic/InputInstruction/InputInstruction";

const MaskedCellField = (fieldRenderProps: any) => {
    const {
        validationMessage,
        visited,
        label,
        id,
        valid,
        mask,
        defaultValue,
        content,
        touched,
        hint,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    return (
        <>
            <FieldWrapper className="">
                <Row>
                    <Col>
                        <Label
                            className="d-inline mb-1"
                            editorId={id}
                            editorValid={valid}
                            style={{ width: "40%", alignItems: "flex-start" }}
                        >
                            <strong> {label} </strong>
                        </Label>
                    </Col>
                    <Col>
                        {!_.isEmpty(content) ? (
                            <InputInstruction content={content} />
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
                <Row className="no-gutters">
                    <Col xs="auto">
                        <Input value="+92" style={{ width: "55px" }} readOnly />
                    </Col>
                    <Col className="ml-2">
                        <MaskedTextBox
                            ariaDescribedBy={`${hintId} ${errorId}`}
                            valid={valid}
                            id={id}
                            mask={mask}
                            {...others}
                            defaultValue={defaultValue}
                        />
                    </Col>
                </Row>
            </FieldWrapper>
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

export default MaskedCellField;
