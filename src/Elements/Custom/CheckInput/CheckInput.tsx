import React from "react";
import _ from "lodash";

//Import Components
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import InputInstruction from "Elements/Basic/InputInstruction/InputInstruction";


const CheckInput = (fieldRenderProps: any) => {
    const {
        validationMessage,
        label,
        id,
        valid,
        optional,
        visited,
        content,
        styleClass,
        labelClass="",
        ...others
    } = fieldRenderProps;
    return (
        <div>
            <FieldWrapper className={styleClass}>
                <Label
                    editorId={id}
                    editorValid={valid}
                    optional={optional}
                    className={"d-inline " + labelClass}>
                    {label}
                </Label>
                {!_.isEmpty(content) ? (
                    <InputInstruction content={content} />
                ) : (
                    <></>
                )}
                <Input {...others} valid={valid} autoComplete="off" />
                {visited && validationMessage && (
                    <Error>{validationMessage}</Error>
                )}
            </FieldWrapper>
            
        </div>
    );
};

export default CheckInput;
