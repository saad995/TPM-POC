import React, { useState, useEffect, memo } from "react";
import _ from "lodash";
import "./FormGenerator.module.scss";
import styles from "./FormGenerator.module.scss";

//Import Components

import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Row, Col } from "react-bootstrap";
import { Button } from "@progress/kendo-react-buttons";
import { FieldControlTypes } from "./FormGeneratorInterface";
import { FormCheckbox, FormComboBox, FormDatePicker, FormInput, FormMaskedTextBox, FormNumericTextBox, FormRadioGroup } from "Elements/Basic/FormComponent/FormComponent";
import { Label } from "@progress/kendo-react-labels";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { addValidationMsg, createEditTreatmentOnBoardDataAction } from "./FormGeneratorAction";
import UploadDocumentFunction from "Modules/TPM/TPMDashboard/Registration/UploadDocumentFunction";
import { IAttachment } from "Modules/TPM/Common/UploadDocuments/UploadDocumentsInterfaces";
import Loader from "Elements/Basic/Loader/Loader";
import TreatmentLicenseGrid from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/RegistrationDetails/TreatmentLicenseGrid";
import { TreatmentTypeLicenseGridColumns } from "Modules/TPM/TPMDashboard/Registration/Grid/GridColumnSize";
import { addressValidator, cellNumberValidator, comboBoxValidator, dateValidator, emailValidator, newEmailValidator, accreditationNoValidator, phoneNumberValidator, textInputValidator  } from "Modules/TPM/TPMDashboard/Registration/Utility";
import validation from "Modules/TPM/Constants/validation";
import { TreatmentType, TreatmentTypeAbbreviation } from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";

const FormFumigationControlType = (props: any) => {
    const { id, config, index, treatmentType,isHideSubmitBtn } = props;
    let { controlType, columns } = config;
    
    const dispatch = useDispatch();
    const createEditTreatmentOnBoardData = useSelector(
        (state: RootStore) => state.FormGeneratorReducer.createEditTreatmentOnBoardData
    );
  
    let selectedTreatmentType: any = createEditTreatmentOnBoardData[treatmentType?.name]
        ? createEditTreatmentOnBoardData[treatmentType?.name]
        : {};
    let validationMsg = useSelector((state:RootStore) => state.FormGeneratorReducer.addValidationMsgs);
    const [mask,setMask] = useState('AAA/AAA/000');  
    
    useEffect(() => {
            console.log('selectedTreatmentType',selectedTreatmentType);
           
                const maskData = settingAbbreviationForMasking();
                setMask(maskData);
                console.log('treatmentType?.name',maskData);
        },[selectedTreatmentType]);



      const  settingAbbreviationForMasking = () => {
            switch(treatmentType?.name)
            {
                case TreatmentType.FormalinTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.FormalinTreatment}/000`
                    
                case TreatmentType.ColdTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.ColdTreatment}/000`
                case TreatmentType.Fumigation:
                    return `DPP/${TreatmentTypeAbbreviation.Fumigation}/000`
                case TreatmentType.HeatTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.HeatTreatment}/000`
                case TreatmentType.HotWaterTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.HotWaterTreatment}/000`
                case TreatmentType.IrradiationTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.IrradiationTreatment}/000`
                case TreatmentType.VaporHeatTreatment:
                    return `DPP/${TreatmentTypeAbbreviation.VaporHeatTreatment}/000`
                default: 
                    return `DPP/AAA/000`

            }

        }





    const handleOnChange = (event: any, apiPropertyName: any, fieldControlTypeID: any) => {
        let val: any = FieldControlTypes.PhoneNumber || FieldControlTypes.COMBOBOX || FieldControlTypes.RADIOGROUP ? event.value : event.target.value;

        let message =   settingValidations(apiPropertyName,val);
                     dispatch(addValidationMsg({
                            ...validationMsg,
                            [apiPropertyName]:message
                        }));
        switch (fieldControlTypeID) {
            case FieldControlTypes.TEXT:
                {
                    if(apiPropertyName === "phoneNumber")
                    {
                        if(validation.Phone.regex.test(event.target.value))
                        {
                            dispatch(
                                createEditTreatmentOnBoardDataAction({
                                    ...createEditTreatmentOnBoardData,
                                    [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                                })
                            );
                        }
                        return;
                    }
                   
                    val = event.target.value
                        .toString()
                        .trimStart()
                        .replace(/<\/?[a-zA-Z]+(?:\s[^>]*)?>|&(?:nbsp|zwnj|raquo|laquo|gt);/g, "");
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
            case FieldControlTypes.MASKED:{
                val = event?.target?.value;
                
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })) 
                    break;
            }
            case FieldControlTypes.DATE:
            case FieldControlTypes.CALENDER:
                {
                   
                    
                    val = event?.target?.value;
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
            case FieldControlTypes.PhoneNumber:
                {
                    val = event?.value;
                  
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
            case FieldControlTypes.COMBOBOX:
                {
                    val = event?.value;
                   
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
            case FieldControlTypes.RADIOGROUP:
                {
                    val = event?.value;
                    
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
            case FieldControlTypes.GROUPCHECKBOX:
                {
                    val = event?.value;
                    let eventId: any = event?.target?.element["id"];
                    let checkBoxData =
                        props?.id == apiPropertyName
                            ? selectedTreatmentType[apiPropertyName].map((item: any) =>
                                  item?.id == eventId ? { ...item, checked: val } : { ...item }
                              )
                            : selectedTreatmentType[apiPropertyName];//config?.data;
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: checkBoxData }
                        })
                    );
                }
                break;
            default:
                {
                    val = event.target.value.toString().trimStart();
                    dispatch(
                        createEditTreatmentOnBoardDataAction({
                            ...createEditTreatmentOnBoardData,
                            [treatmentType?.name]: { ...selectedTreatmentType, [apiPropertyName]: val }
                        })
                    );
                }
                break;
        }
        // }

        //return null;
    };


    const settingValidations = (apiPropertyName:any,fieldValue = "") => {
        let msg = ""
        switch(apiPropertyName)
        {
            case "ispmMark":
                msg =  textInputValidator(fieldValue)
                break;
                
            case "accreditationNo":
                msg =  accreditationNoValidator(fieldValue)
                console.log("Msg",msg);
                break;
                
            case "cellNumber":
                msg =  cellNumberValidator(fieldValue)
               
                break;
            case "emailAddress":
                msg = newEmailValidator(fieldValue)
               
                break;
            case "productionUnitCode":
                msg =  textInputValidator(fieldValue)
               
                break;
            case "plantAddress":
                msg =  addressValidator(fieldValue)
                
                break;
            case "officeAddress":
                msg =  addressValidator(fieldValue)
               
                break;
            case "validUpto":
                msg =  dateValidator(fieldValue)
                
                break;
            case "treatmentSubTypes":
                msg =  comboBoxValidator(fieldValue)
                break;
            default:
                msg =""
                break
        }
        

        return msg;
    }

    const validatorForNumberField = (apiPropertyName:any,fieldValue = "") => (value: string) => {
          
            let val = fieldValue;
            if(val === "")
            {
                val = createEditTreatmentOnBoardData[treatmentType?.name][apiPropertyName];
            }  
          let msg = ""
            switch(apiPropertyName)
            {
                case "ispmMark":
                    msg =  textInputValidator(val)
                    console.log("Msg",msg);
                    break;

                case "accreditationNo":
                    msg =  accreditationNoValidator(val)
                    break;
                    
             
                    
                case "cellNumber":
                    msg =  cellNumberValidator(val)
                   
                    break;
                case "emailAddress":
                    msg = newEmailValidator(val)
                   
                    break;
                case "productionUnitCode":
                    msg =  textInputValidator(val)
                   
                    break;
                case "plantAddress":
                    msg =  addressValidator(val)
                    
                    break;
                case "officeAddress":
                    msg =  addressValidator(val)
                   
                    break;
                case "validUpto":
                    msg =  dateValidator(val)
                    
                    break;
                case "treatmentSubTypes":
                    msg =  comboBoxValidator(val)
                    break;
                default:
                    msg =""
                    break
            }
            

            return msg;
            
            
    };


    return (
        <>
            {selectedTreatmentType && Object.keys(selectedTreatmentType)?.length > 0 ? (
                (() => {
                  
                    switch (controlType) {
                        
                        case FieldControlTypes.TEXT: {
                            return (
                                <Col key={index}>
                                    <Field
                                        type={config.type}
                                        key={index}
                                        id={id}
                                        component={FormInput}
                                        name={config?.name}
                                        onChange={(event: any) => handleOnChange(event, id, controlType)}
                                       validator={validatorForNumberField(id)}
                                        disabled={isHideSubmitBtn || config.disabled}
                                        label={config?.label}
                                        labelClass={config?.labelClass}
                                        placeholder={config?.placeholder}
                                        optional={config?.optional}
                                        // {...config}
                                        maxLength={config?.maxLength}
                                        value={
                                            createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                ? createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                : ""
                                        }
                                    />
                                </Col>
                            );
                        }
                        
                        case FieldControlTypes.COMBOBOX: {
                            return (
                                <Col key={index}>
                                    <Field
                                        {...config}
                                        key={id}
                                        id={id}
                                        component={FormComboBox}
                                        name={config?.name}
                                        disabled={isHideSubmitBtn || config.disabled}
                                        onChange={(event: any) => handleOnChange(event, id, controlType)}
                                        validator={validatorForNumberField(id)}
                                        value={
                                            createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                ? createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                : {}
                                        }
                                    />
                                </Col>
                            );
                        }
                        case FieldControlTypes.RADIOGROUP: {
                            return (
                                <Col key={index}>
                                    <Field
                                        {...config}
                                        key={id}
                                        id={id}
                                        component={FormRadioGroup}
                                        disabled={isHideSubmitBtn || config.disabled}
                                        onChange={(event: any) => handleOnChange(event, id, controlType)}
                                        validator={validatorForNumberField(id)}
                                      
                                        value={
                                           typeof createEditTreatmentOnBoardData[treatmentType?.name][id] == 'boolean'
                                                ? createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                : false
                                        }
                                    />
                                </Col>
                            );
                        }
                        case FieldControlTypes.DATE: {
                            const { min, format, labelClass, value, optional, validator, dataItemKey, label,disabled } = config;
                            return (
                                <Col key={index}>
                                    <Field
                                        // min={min}
                                        // max={undefined}
                                        //validator={validator}
                                        labelClass={labelClass}
                                        format={format}
                                        optional={optional}
                                        label={label}
                                        key={index}
                                        id={index}
                                        onChange={(event: any) => handleOnChange(event, id, controlType)}
                                        validator={validatorForNumberField(id)}
                                        min={new Date()}
                                        type="date"
                                        component={FormDatePicker}
                                     
                                        name={config?.name}
                                        disabled={disabled || isHideSubmitBtn}
                                        value={
                                            createEditTreatmentOnBoardData[treatmentType?.name][id] &&  createEditTreatmentOnBoardData[treatmentType?.name][id] !== "" 
                                                ? createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                : ""
                                        }
                                    />
                                </Col>
                            );
                        }
                        case FieldControlTypes.GROUPCHECKBOX: {
                            const { id, label, name, data, labelClass = "" ,disabled} = config;
                            let checkBoxList: any[] = createEditTreatmentOnBoardData[treatmentType?.name]
                                ? createEditTreatmentOnBoardData[treatmentType?.name][config?.name]
                                : [];

                            return (
                                <>
                                    <Col style={{ marginTop: 20 }}>
                                        <Label
                                            className={"font-semibold " + labelClass}
                                            id={name}
                                            editorId={id}
                                            // editorValid={!showValidationMessage}
                                            // editorDisabled={disabled}
                                            // optional={optional}
                                        >
                                            {label}
                                        </Label>
                                    </Col>
                                    {checkBoxList?.map((obj: any, index: number) => {
                                        const { id, label, checked, name } = obj;
                                        return (
                                            <Col key={index}>
                                                <Field
                                                    id={id}
                                                    name={name}
                                                    label={label}
                                                    component={FormCheckbox}
                                                    
                                                    checked={checked}
                                                    disabled={disabled || isHideSubmitBtn}
                                                    // onChange={(event: any) => handleClickCheckBox(event, obj, config?.name)}
                                                    onChange={(event: any) =>
                                                        handleOnChange(event, props?.id, controlType)
                                                    }
                                                    validator={validatorForNumberField(id)}
                                      
                                                />
                                            </Col>
                                        );
                                    })}
                                </>
                            );
                        }
                        case FieldControlTypes.MASKED: {
                            return (
                                <Col key={index}>
                                    <Field
                                        type={config.type}
                                        key={index}
                                        id={id}
                                        component={FormMaskedTextBox}
                                        mask={mask}
                                        name={config?.name}
                                        onChange={(event: any) => handleOnChange(event, id, controlType)}
                                       validator={validatorForNumberField(id)}
                                        disabled={isHideSubmitBtn || config.disabled}
                                        label={config?.label}
                                        labelClass={config?.labelClass}
                                        placeholder={config?.placeholder}
                                        optional={config?.optional}
                                        // {...config}
                                        maxLength={config?.maxLength}
                                        value={
                                            createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                ? createEditTreatmentOnBoardData[treatmentType?.name][id]
                                                : ""
                                        }
                                    />
                                </Col>
                            );
                        }
                        // case FieldControlTypes.BUTTON: {
                        //     return (
                        //         <Col key={index}>
                        //             {/* <Field
                        //                {...config}
                        //                 key={id}
                        //                 id={id}
                        //                 onChange={(event: any) => handleOnChange(event, id, controlType)}

                        //             /> */}
                        //         </Col>
                        //     );
                        // }
                        // case FieldControlTypes.GRID: {
                        //     return <TreatmentLicenseGrid  {...config} key={index} id={id} columns={columns}/>;
                        // }
                        default: {
                            return null;
                            //return (<p style={{color: 'red'}}>Field not mapped, control type {controlType}</p>);
                        }
                    }
                })()
            ) : (
                <p>Selected data not found</p>
            )}
        </>
    );
};

export default memo(FormFumigationControlType);
