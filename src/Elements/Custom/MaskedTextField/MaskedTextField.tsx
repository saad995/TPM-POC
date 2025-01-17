import React from 'react';
import _ from "lodash";

//Import Components
import {
    FieldWrapper
} from "@progress/kendo-react-form";
import { Label, Hint, Error } from "@progress/kendo-react-labels";
import { MaskedTextBox } from "@progress/kendo-react-inputs";
import InputInstruction from "Elements/Basic/InputInstruction/InputInstruction"


const MaskedTextField = (fieldRenderProps: any) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        optional,
        defaultValue,
        content,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional} className={"d-inline"}>
                <strong> {label}</strong>
            </Label>
            {!_.isEmpty(content) ? <InputInstruction content={content} /> : <></>}
            <div className={"k-form-field-wrap"}>
                <MaskedTextBox
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    valid={valid}
                    id={id}
                    {...others}
                    defaultValue={defaultValue}
                />
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && (
                    <Error id={errorId}>{validationMessage}</Error>
                )}
            </div>
        </FieldWrapper>
    );
};


export default MaskedTextField;