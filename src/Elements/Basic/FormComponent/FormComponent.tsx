import { DatePicker } from "@progress/kendo-react-dateinputs";
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import {
    Checkbox,
    Input,
    MaskedTextBox,
    NumericTextBox,
    RadioGroup,
    Switch,
    TextArea
} from "@progress/kendo-react-inputs";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Error, Hint, Label } from "@progress/kendo-react-labels";
import { Upload, UploadOnAddEvent, UploadOnRemoveEvent } from "@progress/kendo-react-upload";
import InputInstruction from "Elements/Basic/InputInstruction/InputInstruction";
import _ from "lodash";
import React, { useState } from "react";
// import { Col, Row } from "react-bootstrap";
import styles from "./FormComponent.module.scss";
import "./FormComponent.scss";
// import { Button } from "@progress/kendo-react-buttons";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IGroupCheckBoxData } from "./FormComponentInterface";

export const FormUpload = (fieldRenderProps: FieldRenderProps) => {
    const {
        valid,
        value,
        id,
        optional,
        label,
        hint,
        validationMessage,
        touched,
        labelClass = "",
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    const onChangeHandler = (event: UploadOnAddEvent) => {
        fieldRenderProps.onChange({ value: event.newState });
    };
    const onRemoveHandler = (event: UploadOnRemoveEvent) => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    return (
        <FieldWrapper>
            <Label
                id={labelId}
                editorId={id}
                editorValid={valid}
                optional={optional}
                className={"font-semibold " + labelClass}>
                {label}
            </Label>
            <Upload
                className={styles.fix}
                id={id}
                //valid={valid}
                autoUpload={false}
                showActionButtons={false}
                multiple={false}
                files={value}
                onAdd={onChangeHandler}
                onRemove={onRemoveHandler}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ariaLabelledBy={labelId}
                {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormComboBox = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        labelClass = "",
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        content,
        ...others
    } = fieldRenderProps;
    const editorRef = React.useRef(null);
    // others?.break is added to add break when field is required in View Panel, to create similar UI as of view panel 
    // to add break set its value to true while creating the field

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper style={wrapperStyle}>
            {/* new comboBox work ------------------*/}
            {others?.break ?
                <>
                    <Label
                        id={labelId}
                        editorRef={editorRef}
                        editorId={id}
                        editorValid={valid}
                        editorDisabled={disabled}
                        optional={optional}
                        className={
                            others?.break
                                ? "d-inline mb-1 text-muted" + labelClass
                                : "d-inline mb-1 text-muted font-semibold" + labelClass
                        }>
                        {" "}
                        {label}
                    </Label>
                    <div className={"k-form-field-wrap"}>
                        {others?.break ? (
                            <>
                                <br></br>
                            </>
                        ) : null}
                        {content && <InputInstruction content={content} />}
                        <ComboBox
                            ariaLabelledBy={labelId}
                            ariaDescribedBy={`${hintId} ${errorId}`}
                            ref={editorRef}
                            valid={valid}
                            id={id}
                            disabled={disabled}
                            {...others}
                        />
                        {showHint && <Hint id={hintId}>{hint}</Hint>}
                        {showValidationMessage && <Error>{validationMessage}</Error>}
                    </div>
                </> :
                <>
                    {/* old comboBox work this will be moditified in future work ------------------*/}
                    <Label
                        id={labelId}
                        editorRef={editorRef}
                        editorId={id}
                        editorValid={valid}
                        editorDisabled={disabled}
                        optional={optional}
                        className={"d-inline mb-1 font-semibold" + labelClass}>
                        {" "}
                        {label}
                    </Label>
                    {content && <InputInstruction content={content} />}
                    <ComboBox
                        ariaLabelledBy={labelId}
                        ariaDescribedBy={`${hintId} ${errorId}`}
                        ref={editorRef}
                        valid={valid}
                        id={id}
                        disabled={disabled}
                        {...others}
                    />
                    {showHint && <Hint id={hintId}>{hint}</Hint>}
                    {showValidationMessage && <Error>{validationMessage}</Error>}
                </>}

        </FieldWrapper>
    );
};

export const FormInput = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        customLabel=false,
        id,
        valid,
        disabled,
        hint,
        value,
        type,
        optional,
        wrapperStyle,
        content,
        modified,
        visited,
        labelClass,
        ...others
    } = fieldRenderProps;
    // others?.break is added to add break when field is required in View Panel, to create similar UI as of view panel 
    // to add break set its value to true while creating the field
    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    return (
        <FieldWrapper style={wrapperStyle}>
            {label && (
                <Label
                    className={others?.break ? "d-inline mb-1 text-muted" : `${labelClass ? labelClass : 'd-inline mb-1 text-muted font-semibold'}`}
                    editorId={id}
                    editorValid={!showValidationMessage}
                    optional={optional}
                    style={{
                        alignItems: "flex-start"
                    }}>
                    {!customLabel ? label : <span className="content" dangerouslySetInnerHTML={{__html: label}}></span>}
                </Label>
            )}

            {content && <InputInstruction content={content} />}
            <div className={"k-form-field-wrap"}>
                {others?.break ? (
                    <>
                        <br></br>
                    </>
                ) : null}{" "}
                <Input
                    valid={!showValidationMessage}
                    type={type}
                    value={value}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    {...others}
                />
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && <Error>{validationMessage}</Error>}
            </div>
        </FieldWrapper>
    );
};
export const FormInputWithList = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        type,
        optional,
        wrapperStyle,
        content,
        modified,
        visited,
        labelClass,
        listOptions,
        editorRef,
        defaultValueDropdown,
        valueDropdown,
        onChangeDropdown,
        dataItemKey,
        dataDropdown,
        iDDropdown,
        textField,
        ...others
    } = fieldRenderProps;
    // others?.break is added to add break when field is required in View Panel, to create similar UI as of view panel 
    // to add break set its value to true while creating the field
    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    return (
        <FieldWrapper style={wrapperStyle}>
            {label && (
                <Label
                    className={others?.break ? "d-inline mb-1 text-muted" : `${labelClass ? labelClass : 'd-inline mb-1 text-muted font-semibold'}`}
                    editorId={id}
                    editorValid={!showValidationMessage}
                    optional={optional}
                    style={{
                        alignItems: "flex-start"
                    }}>
                    {label}
                </Label>
            )}

            {content && <InputInstruction content={content} />}
            <div className={"k-form-field-wrap custom-input-list"}>
                {others?.break ? (
                    <>
                        <br></br>
                    </>
                ) : null}{" "}
                <div className="d-flex">
                    <Input
                        valid={!showValidationMessage}
                        type={type}
                        id={id}
                        disabled={disabled}
                        ariaDescribedBy={`${hintId} ${errorId}`}
                        {...others}
                    />
                    <DropDownList
                        defaultValue={defaultValueDropdown}
                        ariaLabelledBy={labelId}
                        value={valueDropdown}
                        data={dataDropdown}
                        onChange={onChangeDropdown}
                        ariaDescribedBy={`${hintId} ${errorId}`}
                        ref={editorRef}
                        textField={textField}
                        dataItemKey={dataItemKey}
                        style={{
                            width: "100px",
                        }}
                        valid={!showValidationMessage}
                        id={iDDropdown}
                        disabled={disabled}
                        // {...others}
                    />
                </div>
            </div>
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormTextArea = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, hint, disabled, optional, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={!showValidationMessage} optional={optional}>
                {label}
            </Label>
            <TextArea  valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormNumericTextBox = (fieldRenderProps: FieldRenderProps) => {

    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        format,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    // others?.break is added to add break when field is required in View Panel, to create similar UI as of view panel 
    // to add break set its value to true while creating the field
    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                className={others?.break ? "text-muted" : "d-inline mb-1 text-muted font-semibold"}
                // className={"font-semibold"}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}>
                {label}
            </Label>
            {others?.break ? (
                <>
                    <br></br>
                </>
            ) : null}{" "}
            <NumericTextBox
                ariaDescribedBy={`${hintId} ${errorId}`}
                valid={valid}
                id={id}
                disabled={disabled}
                format={format}
                {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const CustomListItemUI = (props: any) => {
    const { files } = props;

    return (
        <ul>
            {files.map((file: any) => (
                <div>
                    <li key={file.name}>{file.name}</li>
                    <strong className="k-upload-status">
                        <button type="button" className="k-button k-button-icon k-flat k-upload-action">
                            <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span>
                        </button>
                    </strong>
                </div>
            ))}
        </ul>
    );
};

export const FormAutoComplete = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        visited,
        ...others
    } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                id={labelId}
                editorRef={editorRef}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}
                className={"font-semibold"}>
                {label}
            </Label>
            <AutoComplete
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={!showValidationMessage}
                id={id}
                disabled={disabled}
                {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormMaskedTextBox = (fieldRenderProps: any) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        optional,
        content,
        defaultValue,
        visited,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper>
            <Label
                className="d-inline mb-1 font-semibold"
                editorId={id}
                editorValid={!showValidationMessage}
                optional={optional}
                style={{
                    width: "40%",
                    alignItems: "flex-start"
                }}>
                {label}
            </Label>
            {content && <InputInstruction content={content} />}
            <div className={"k-form-field-wrap"}>
                <MaskedTextBox
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    valid={!showValidationMessage}
                    id={id}
                    defaultValue={defaultValue}
                    {...others}
                />
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && <Error>{validationMessage}</Error>}
            </div>
        </FieldWrapper>
    );
};

export const MaskedCellField = (fieldRenderProps: any) => {
    const {
        validationMessage,
        visited,
        label,
        id,
        valid,
        mask,
        defaultValue,
        optional,
        content,
        touched,
        hint,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";
    return (
        <>
            <FieldWrapper>
                <Row>
                    <Col>
                        <Label
                            className="d-inline mb-1 font-semibold"
                            editorId={id}
                            editorValid={!showValidationMessage}
                            optional={optional}
                            style={{
                                width: "40%",
                                alignItems: "flex-start"
                            }}>
                            {label}
                        </Label>
                    </Col>
                    <Col>{!_.isEmpty(content) ? <InputInstruction content={content} /> : <></>}</Col>
                </Row>
                <Row className="no-gutters">
                    <Col xs="auto">
                        <Input value="+92" style={{ width: "55px" }} readOnly />
                    </Col>
                    <Col className="ml-2">
                        <MaskedTextBox
                            className="w-100"
                            mask={mask}
                            ariaDescribedBy={`${hintId} ${errorId}`}
                            valid={!showValidationMessage}
                            id={id}
                            defaultValue={defaultValue}
                            {...others}
                        />
                    </Col>
                </Row>
            </FieldWrapper>
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

export const FormRadioGroup = (fieldRenderProps: any) => {
    const {
        validationMessage,
        touched,
        id,
        label,
        labelClass = "",
        layout,
        valid,
        disabled,
        optional,
        hint,
        visited,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hindId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper>
            <Label
                className={"font-semibold " + labelClass}
                id={labelId}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}>
                {label}
            </Label>
            <RadioGroup
                id={id}
                ariaDescribedBy={`${hindId} ${errorId}`}
                ariaLabelledBy={labelId}
                valid={!showValidationMessage}
                disabled={disabled}
                layout={layout}
                {...others}
            />
            {showHint && <Hint id={hindId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormSwitch = (fieldRenderProps: any) => {
    const {
        validationMessage,
        touched,
        id,
        label,
        layout,
        valid,
        disabled,
        optional,
        hint,
        visited,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hindId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper>
            <Label
                className={"font-semibold"}
                id={labelId}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}>
                {label}
            </Label>
            <Switch
                id={id}
                ariaDescribedBy={`${hindId} ${errorId}`}
                ariaLabelledBy={labelId}
                valid={!showValidationMessage}
                disabled={disabled}
                layout={layout}
                {...others}
            />
            {showHint && <Hint id={hindId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormDropDown = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        visited,
        labelClass,
        ...others
    } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = visited && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                className={labelClass}
                id={labelId}
                editorRef={editorRef}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}>
                {label}
            </Label>
            <DropDownList
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={!showValidationMessage}
                id={id}
                disabled={disabled}
                {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormDatePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        labelClass = "",
        id,
        valid,
        disabled,
        hint,
        type,
        optional,
        wrapperStyle,
        defaultShow,
        min,
        max,
        ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                className={"font-semibold " + labelClass + " d-inline mb-1 text-muted"}
                editorId={id}
                editorValid={valid}
                optional={optional}
                editorDisabled={disabled}>
                {label}
            </Label>
            <div className={"k-form-field-wrap"}>
            <DatePicker defaultShow={defaultShow} max={max} min={min} disabled={disabled} {...others} />
                {showHint && <Hint id={hintId}>{hint}</Hint>}
                {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
            </div>
        </FieldWrapper>
    );
};

export const FormEditor = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        hint,
        disabled,
        optional,
        tools,
        onMount,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={!showValidationMessage} optional={optional} className={"font-semibold"}>
                {label}
            </Label>
            {/* <TextArea valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} /> */}
            <Editor tools={tools ?? []} onMount={onMount} {...others} />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormNumericTextBoxWithAdditionalComponent = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        children,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                className={"font-semibold"}
                editorId={id}
                editorValid={!showValidationMessage}
                editorDisabled={disabled}
                optional={optional}>
                {label}
            </Label>
            <span className={`k-textbox k-space-right w-100`}>
                <NumericTextBox
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    valid={valid}
                    id={id}
                    disabled={disabled}
                    {...others}
                />
                <a style={{ borderRadius: "0px 4px 4px 0px" }} className="h-100 k-button position-relative">
                    {children}
                </a>
            </span>

            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error>{validationMessage}</Error>}
        </FieldWrapper>
    );
};
export const FormCheckbox = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, touched, id, valid, disabled, hint, optional, label, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;

    const hindId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";

    return (
        <FieldWrapper>
            <Checkbox
                ariaDescribedBy={`${hindId} ${errorId}`}
                label={label}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {showHint && <Hint id={hindId}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const FormGroupCheckbox = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, labelClass = '', onclick, visited, touched, value, id, data, valid, disabled, hint, optional, label, ...others } = fieldRenderProps;

    const showValidationMessage = visited && touched && validationMessage;
    const showHint = !showValidationMessage && hint;

    const hindId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    // const {label, checked, disabled} = item;
    const [updateddata, setUpdateddata] = useState<IGroupCheckBoxData[]>(data);

    const handleClickCheckBox = (event: any, selectedItemData:any) => {
    if(event?.target?.checked){
        const value = event?.target?.checked;
        let newData = updateddata.map((item:any)=> item?.id == selectedItemData?.id ? {...selectedItemData, checked: value}: {...item})
        
        setUpdateddata((prev:any)=>{
            return prev.map((item:any)=> item?.id == selectedItemData?.id ? {...selectedItemData, checked: value}: {...item})
        });
        if(onclick){
            onclick(newData);
        }
      
    }else{
        const value = event?.target?.checked;
        let newData = updateddata.map((item:any)=> item?.id == selectedItemData?.id ? {...selectedItemData, checked: value}: {...item})

        setUpdateddata((prev:any)=>{
            return prev.map((item:any)=> item?.id == selectedItemData?.id ? {...selectedItemData, checked: value}: {...item})
        });
        if(onclick){
            onclick(newData);
        }
    }
    
    };

    console.log("updateddata",updateddata)
    return (
        <FieldWrapper>
            <Row>
                <Col md={12}>
                    <Label
                        className={"font-semibold " + labelClass}
                        id={labelId}
                        editorId={id}
                        editorValid={!showValidationMessage}
                        editorDisabled={disabled}
                        optional={optional}>
                        {label}
                    </Label>
                </Col>
                {/* <Col>{!_.isEmpty(content) ? <InputInstruction content={content} /> : <></>}</Col> */}
            </Row>
            <Row className="no-gutters">
                {updateddata.map((item: any, index: number) => {
                    return (
                        <Col className="ml-2" key={index}>
                            <Checkbox
                                ariaDescribedBy={`${hindId} ${errorId}`}
                                label={item?.label}
                                 valid={valid}
                                id={item?.id}
                                disabled={item?.disabled}
                                onClick={(event:any)=>handleClickCheckBox(event, item)}
                                checked={item?.checked}

                            />
                            {showHint && <Hint id={hindId}>{hint}</Hint>}
                            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
                        </Col>)
                })}
            </Row>
        </FieldWrapper>
    );
};

export const FormMultiSelect = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        label,
        labelClass = "",
        id,
        valid,
        disabled,
        hint,
        wrapperStyle,
        optional,
        content,
        ...others
    } = fieldRenderProps;
    const editorRef = React.useRef(null);
    // others?.break is added to add break when field is required in View Panel, to create similar UI as of view panel 
    // to add break set its value to true while creating the field

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";
    const labelId = label ? `${id}_label` : "";

    return (
        <FieldWrapper style={wrapperStyle}>
            {/* new multi work ------------------*/}
            {others?.break ? (
                <>
                    <Label
                        id={labelId}
                        editorRef={editorRef}
                        editorId={id}
                        editorValid={valid}
                        editorDisabled={disabled}
                        optional={optional}
                        className={
                            others?.break
                                ? "d-inline mb-1 text-muted" + labelClass
                                : "d-inline mb-1 text-muted font-semibold" + labelClass
                        }>
                        {" "}
                        {label}
                    </Label>
                    <div className={"k-form-field-wrap"}>
                        {others?.break ? (
                            <>
                                <br></br>
                            </>
                        ) : null}
                        {content && <InputInstruction content={content} />}
                        <MultiSelect
                            ariaLabelledBy={labelId}
                            ariaDescribedBy={`${hintId} ${errorId}`}
                            ref={editorRef}
                            valid={valid}
                            id={id}
                            disabled={disabled}
                            // id="roleCode"
                            // name="roleCode"
                            // data={roleCodes}
                            // onChange={handleRoleChange}
                            // value={roleCodeSelected}
                            // textField="roleCode"
                            // dataItemKey="agencyRoleInfoId"
                            // placeholder={resources_EN.AgencySiteInfo_Placeholder_For_Select}
                            // tagRender={handleTagRender}
                            // disabled={!isActiveAgencySite ? true : false}
                            // itemRender={handleItemRender}
                            // filterable={true}
                            // onFilterChange={roleCodeFilterChange}

                            {...others}
                        />
                        {showHint && <Hint id={hintId}>{hint}</Hint>}
                        {showValidationMessage && <Error>{validationMessage}</Error>}
                    </div>
                </>
            ) : (
                <>
                    {/* old comboBox work this will be moditified in future work ------------------*/}
                    <Label
                        id={labelId}
                        editorRef={editorRef}
                        editorId={id}
                        editorValid={valid}
                        editorDisabled={disabled}
                        optional={optional}
                        className={"d-inline mb-1 font-semibold" + labelClass}>
                        {" "}
                        {label}
                    </Label>
                    {content && <InputInstruction content={content} />}
                    <MultiSelect
                            ariaLabelledBy={labelId}
                            ariaDescribedBy={`${hintId} ${errorId}`}
                            ref={editorRef}
                            valid={valid}
                            id={id}
                            disabled={disabled}
                            // id="roleCode"
                            // name="roleCode"
                            // data={roleCodes}
                            // onChange={handleRoleChange}
                            // value={roleCodeSelected}
                            // textField="roleCode"
                            // dataItemKey="agencyRoleInfoId"
                            // placeholder={resources_EN.AgencySiteInfo_Placeholder_For_Select}
                            // tagRender={handleTagRender}
                            // disabled={!isActiveAgencySite ? true : false}
                            // itemRender={handleItemRender}
                            // filterable={true}
                            // onFilterChange={roleCodeFilterChange}

                            {...others}
                        />
                    {showHint && <Hint id={hintId}>{hint}</Hint>}
                    {showValidationMessage && <Error>{validationMessage}</Error>}
                </>
            )}
        </FieldWrapper>
    );
};

export const FormButton = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        id,
        valid,
        disabled,
        type,
        buttonText,
        icon,
        isIconShow,
        hint,
        optional,
        label,
        onClick,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;

    const hindId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";

    return (
        <FieldWrapper>
            {/* <Button primary={true} type={type} onClick={onClick}>
                            {buttonText}
                        </Button> */}

            <Button type={type} onClick={onClick} data-toggle="sidebar-colapse" className="d-none d-md-block" size="sm">
                <span>
                    {isIconShow ? <FontAwesomeIcon icon={icon} /> : ""} {buttonText}
                </span>
            </Button>
        </FieldWrapper>
    );
};