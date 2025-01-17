import styles from "./InputTextComponent.module.scss";
import { FieldWrapper, Field, Form, FormElement } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { Loader as Spinner } from "@progress/kendo-react-indicators";
import { FormInput } from "Elements/Basic/FormComponent/FormComponent";
import { useState } from "react";

export const inputFieldWithEdit = (props: any) => {
    const {
        validationMessage,
        label,
        id,
        functionCall,
        modalCall,
        closeCall,
        onChange,
        name,
        showCloseCall,
        disabled,
        defaultValue,
        placeholder,
        required,
        loading,
        visited,
        value
    } = props;
    const [touched, setTouched] = useState(false);
    const showValidationMessage = (visited || touched) && validationMessage;
    return (
        <>
            <FieldWrapper>
                <Label className={`font-semibold ${styles.label}`} editorId={id} editorValid={!showValidationMessage}>
                    {label}
                </Label>
                <span className={`k-textbox k-space-right ${styles.borderRadius}`}>
                    <Form
                        render={(formRenderProps) => (
                            <FormElement className={`${styles.formWidth}`}>
                                <Field
                                    id={id}
                                    name={name}
                                    style={{ borderRadius: "4px 0px 0px 4px" }}
                                    disabled={disabled}
                                    autoComplete="off"
                                    onChange={onChange}
                                    defaultValue={defaultValue}
                                    value={value}
                                    placeholder={placeholder}
                                    required={required}
                                    component={FormInput}
                                    onKeyPress={(e: any) => {
                                        if (e.key === "Enter") {
                                            setTouched(true);
                                            e.preventDefault();
                                            functionCall();
                                        }
                                    }}
                                    onBlur={() => {
                                        setTouched(true);
                                        
                                    }}
                                />
                            </FormElement>
                        )}
                    />
                    {loading ? <Spinner type={"pulsing"} /> : null}
                    {showCloseCall ? (
                        <a onClick={closeCall} className="h-100 k-button position-relative border-right">
                            <span className="k-icon k-i-x position-relative"></span>
                        </a>
                    ) : (
                        <a onClick={functionCall} className="h-100 k-button position-relative border-right">
                            <span className="k-icon k-i-arrow-chevron-right"></span>
                        </a>
                    )}
                    <a onClick={modalCall} className="h-100 k-button position-relative">
                        <span className="k-icon k-i-search position-relative"></span>
                    </a>
                </span>
            </FieldWrapper>
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

export const inputFieldWithModal = (props: any) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        modalCall,
        name,
        defaultValue,
        switchToEditModeCall,
        placeholder,
        value,
        required,
        visited
    } = props;
    const showValidationMessage = (touched || visited) && validationMessage;
    return (
        <>
            <FieldWrapper>
                <Label className={`font-semibold ${styles.label}`} editorId={id + "ForModal"} editorValid={valid}>
                    {label}
                </Label>
                <span className={`k-textbox  k-space-right ${styles.borderRadius}`}>
                    <Form
                        render={(formRenderProps) => (
                            <FormElement className={`${styles.formWidth}`}>
                                <Field
                                    id={id}
                                    name={name}
                                    style={{ borderRadius: "4px 0px 0px 4px", zIndex: 99 }}
                                    disabled={true}
                                    autoComplete="off"
                                    defaultValue={defaultValue}
                                    placeholder={placeholder}
                                    value={value}
                                    required={required}
                                    component={FormInput}
                                />
                            </FormElement>
                        )}
                    />
                    <a onClick={switchToEditModeCall} className="h-100 k-button position-relative border-right">
                        <span className="k-icon k-i-edit-tools position-relative"></span>
                    </a>
                    <a onClick={modalCall} className="h-100 k-button position-relative border-right">
                        <span className="k-icon k-i-search position-relative"></span>
                    </a>
                </span>
            </FieldWrapper>
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

export const inputFieldWithModalAlt = (props: any) => {
    const {
        validationMessage,
        visited,
        label,
        id,
        valid,
        functionCall,
        modalCall,
        onChange,
        name,
        value,
        disabled,
        defaultValue,
        placeholder,
        required,
        manualEditCheck,
        loading,
        disabledTextField
    } = props;
    const showValidationMessage = visited && validationMessage;

    let funcButtonStyleClass = "h-100 k-button position-relative border-right";
    let modalButtonStyleClass = "h-100 k-button position-relative";
    let mutedLabel = disabled ? "k-text-disabled" : "";

    if (disabled) {
        funcButtonStyleClass = funcButtonStyleClass + ` ${styles.noPointer}`;
        modalButtonStyleClass = disabledTextField === false   ? modalButtonStyleClass  : modalButtonStyleClass + ` ${styles.noPointer}`;
    }

    return (
        <>
            <FieldWrapper>
                <Label className={"font-semibold"} editorId={id} editorValid={valid}>
                    {label}
                </Label>

                <span className={`k-textbox k-space-right ${styles.borderRadius}`}>
                    <Form
                        render={(formRenderProps) => (
                            <FormElement className={`${styles.formWidth}`}>
                                <Field
                                    id={id}
                                    name={name}
                                    style={{ borderRadius: "4px 0px 0px 4px" }}
                                    disabled={disabled}
                                    autoComplete="off"
                                    onChange={onChange}
                                    defaultValue={defaultValue}
                                    placeholder={placeholder}
                                    required={required}
                                    value={value}
                                    onKeyPress={(e: any) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            functionCall();
                                        }
                                    }}
                                    component={FormInput}
                                />
                            </FormElement>
                        )}
                    />
                    {loading ? (
                        <Spinner
                            //size={"small"}
                            type={"pulsing"}
                        />
                    ) : null}
                    {manualEditCheck && (
                        <a onClick={functionCall} className={funcButtonStyleClass}>
                            <span className="k-icon k-i-arrow-chevron-right"></span>
                        </a>
                    )}

                    <a onClick={modalCall} className={modalButtonStyleClass}>
                        <span className="k-icon k-i-search position-relative"></span>
                    </a>
                </span>
            </FieldWrapper>
            {validationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

export default inputFieldWithEdit;
