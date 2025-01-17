import React, { useState, useEffect, memo } from "react";
import _ from "lodash";
import "./FormGenerator.module.scss";
import styles from "./FormGenerator.module.scss";

//Import Components

import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Row, Col } from "react-bootstrap";
import { Button } from "@progress/kendo-react-buttons";
import { FieldControlTypes } from "./FormGeneratorInterface";
import { FormCheckbox } from "Elements/Basic/FormComponent/FormComponent";
import { Label } from "@progress/kendo-react-labels";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";

const FormGenerator = (props: any) => {
    const { formState, handleSubmit, ExportCSV, children, data, oncancel, isHideCancelBtn, isHideSubmitBtn } = props;
    const [updateFormState, setUpdateFormState] = useState<any>(formState);
    const [formArrState, setFormArrState] = useState<any>([]);


    const onChangeHandler = (e: any, id: any, controlType?: number) => {
        const updateOrderForm = { ...updateFormState };
        const obj = { ...updateOrderForm[id] };

        if(controlType == FieldControlTypes.GROUPCHECKBOX){
            obj.data = e?.data;
        }
        let value = e?.target?.value ? e?.target?.value : e?.value;
        obj.value = value;
        if (obj.validator) {
            obj.validationMessage = obj.validator(value);
            obj.valid = obj.validator(value) !== "" ? false : true;
        }
      
        updateOrderForm[id] = obj;
        setUpdateFormState(updateOrderForm);
    };

    const stateArray = () => {
        let arr = [];

        for (let key in updateFormState) {
            arr.push({
                id: key,
                config: updateFormState[key]
            });
        }
        return arr;
    };

    useEffect(() => {
        setUpdateFormState(formState);
    }, [formState]);

    useEffect(() => {
        setFormArrState(stateArray());
    }, [updateFormState]);

    const onSubmit = () => {
        let obj = {};
        for (let key in updateFormState) {
            let data = updateFormState[key];
            const {controlType} = data;
          // console.log("data.name===>>>>", data.name, "====>>>>", data)
            switch (controlType) {
                case FieldControlTypes.TEXT: {
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                }
                break;
                case FieldControlTypes.DATE: {
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                    
                }
                break;
                case FieldControlTypes.COMBOBOX: {
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                    
                }
                break;
                case FieldControlTypes.RADIOGROUP: {
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                    
                }
                break;
                case FieldControlTypes.GROUPCHECKBOX: {
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                    
                }
                break;
                case FieldControlTypes.GRID: { // TODO: not use in other cases except for fumigation
                    obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: updateFormState[key]?.value
                        }
                    );
                    
                }
                break;
                default: {
                     obj = Object.assign(
                        {},
                        {
                            ...obj,
                            [key]: typeof updateFormState[key]?.value === "object" ? (updateFormState[key]?.value?.value ? updateFormState[key]?.value?.value : updateFormState[key]?.value): updateFormState[key]?.value
                        }
                    );
                break;
                }
            }
        }
        handleSubmit({formData: obj, data});
    };

    const handleCancel=()=>{
        oncancel(data)
        clearForm();
        return null;
    };

    const clearForm = () => {
        let formData = _.cloneDeep(updateFormState);
        for (let key in formData) {
            formData[key].value = "";
            formData[key].valid = true;
            formData[key].validationMessage = "";
        }
        setUpdateFormState(formData);
        //handleSubmit({});
    };

    const handleClickCheckBox = (event: any, selectedItemData:any, id:string) => {
        const value = event?.value;
        let formConfigData:any = formArrState.find((item:any)=>item?.config?.controlType == FieldControlTypes.GROUPCHECKBOX && item?.config?.name == id);
        let newData  = [];
        if(formConfigData && formConfigData?.config?.data){
            newData = formConfigData?.config?.data.map((it:any)=> it?.id == selectedItemData?.id ? {...selectedItemData, checked: value}: {...it});
       
        }

        let obj = {
            value: newData,
            data: newData
        }
      //  console.log({updateFormState})
        let new_updateFormState = {...updateFormState, ...{[formConfigData?.id]: formConfigData?.config}}
        //handleSaveData(new_updateFormState)

        onChangeHandler(obj, id, FieldControlTypes.GROUPCHECKBOX)

        return null
    };

    const handleDisableSubmitCheck = () => {
        let isDisabled = false;

        for (let key in updateFormState) {
            let obj = updateFormState[key];
            if (obj?.optional == false) {
                if (obj?.value == '' ||
                    _.isEmpty(obj?.value) ||
                    obj?.value?.length == 0 ||
                    obj?.value == null ||
                    obj?.value == undefined

                ) {
                    isDisabled = true;
                    break;
                }
            }
        };
        return isDisabled
    };
    const CheckboxList = ({ list, parentName }: { list: any[], parentName: string }) => {
        return (<>
            {list && list.length > 0 && list?.map((obj: any, index: number) => {
                const { id, label, checked, name } = obj;
                return <Col key={index}>
                    <Field
                        id={id}
                        name={name}
                        label={label}
                        component={FormCheckbox}
                        checked={checked}
                        onChange={(event: any) => handleClickCheckBox(event, obj, parentName)}
                    />
                </Col>
            })}
        </>)
    }
    return (
        <Form
            onSubmit={() => {}}
            render={(formRenderProps: FormRenderProps) => (
                <FormElement>
                    <fieldset className={"k-form-fieldset"}>
                        <Row xs={1} sm={2} lg={3} xl={4} className={"p-2"}>
                            {formArrState.map((item: any, index: number) => {
                                if(item?.config.name == 'button' || item?.config?.controlType == FieldControlTypes.BUTTON){
                                    return (
                                        <Col>
                                            <Field
                                                key={index}
                                                id={index}
                                                //onChange={(event: any) => onChangeHandler(event, item.id)}
                                                onClick={item?.config?.onclick ? (event: any) => {
                                                        item?.config?.onclick({event, id: item.id, formData: updateFormState, data})
                                                        if(item?.config?.isClearForm){
                                                           // clearForm()
                                                        }
                                                        
                                                }: null}
                                                {...item.config}
                                            />
                                        </Col>
                                    );
                                } else if(item?.config?.controlType == FieldControlTypes.GROUPCHECKBOX){
                                    const { id, label, name, data, labelClass = ''} = item?.config;
                                    return <>
                                        <Col style={{ marginTop: 20 }} >
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
                                        <CheckboxList list={data} parentName={item?.config.name} />
                                        </>

                                }else  if(item?.config?.controlType == FieldControlTypes.TEXT ||
                                    item?.config?.controlType == FieldControlTypes.RADIOGROUP ||
                                    item?.config?.controlType == FieldControlTypes.COMBOBOX 
                                    ){
                                    return (
                                        <Col>
                                            <Field
                                                key={index}
                                                id={index}
                                                onChange={(event: any) => onChangeHandler(event, item.id)}
                                                {...item?.config}
                                                component={item.config?.component}
                                                name={item?.config?.name}
                                            />
                                        </Col>
                                    );
                                } else  if(item?.config?.controlType == FieldControlTypes.DATE){
                                    return (
                                        <Col>
                                            <Field
                                                key={index}
                                                id={index}
                                                onChange={(event: any) => onChangeHandler(event, item.id)}
                                                {...item?.config}
                                                component={item.config?.component}
                                                name={item?.config?.name}
                                            />
                                        </Col>
                                    );
                                }else{
                                    return (
                                        <Col>
                                            {/* <Field
                                                key={index}
                                                id={index}
                                                onChange={(event: any) => onChangeHandler(event, item.id)}
                                                {...item?.config}
                                                component={item.config?.component}
                                                name={item?.config?.name}
                                            /> */}
                                        </Col>
                                    );
                                }
                            })}
                        </Row>
                    </fieldset>
                    {children}
                    <div className="k-form-buttons p-2">
                    {!isHideCancelBtn ? <Button className={`${styles.customButtonStyle} btn-danger`}  type='button' onClick={handleCancel}>Delete</Button>: null}
                        {!isHideSubmitBtn ? <Button primary={true} type={"submit"} onClick={onSubmit} 
                        //disabled={handleDisableSubmitCheck()}
                        >
                            Save
                        </Button>: null}
                    </div>
                </FormElement>
            )}
        />
    );
};

export default memo(FormGenerator);
