import React, { useState, useEffect, memo } from "react";
import _ from "lodash";
import "./FormGenerator.module.scss";
import styles from "./FormGenerator.module.scss";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Row, Col } from "react-bootstrap";
import { Button } from "@progress/kendo-react-buttons";
import { FormCheckbox } from "Elements/Basic/FormComponent/FormComponent";
import { Label } from "@progress/kendo-react-labels";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import FormGeneratorForFumigation from "./FormFumigationControlType";
import { FieldControlTypes } from "./FormGeneratorInterface";
import TreatmentLicenseGrid from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/RegistrationDetails/TreatmentLicenseGrid";
import Loader from "Elements/Basic/Loader/Loader";
import { TreatmentPurpose } from "Modules/TPM/TPMDashboard/Registration/Renewal/RenewalTreatmentTypeInterfaces";
import Paths from "Modules/TPM/Constants/Paths";
import { useHistory } from "react-router";

const TreatmentTypeForm = (props: any) => {
    const { formState, handleSubmit, ExportCSV, children, treatmentType, oncancel, isHideCancelBtn, isHideSubmitBtn, formConfig } = props;
    const createEditTreatmentOnBoardData = useSelector(
        (state: RootStore) => state.FormGeneratorReducer.createEditTreatmentOnBoardData
    );
    let selectedTreatmentType: any = createEditTreatmentOnBoardData[treatmentType?.name]
        ? createEditTreatmentOnBoardData[treatmentType?.name]
        : {};
    let validationMsg = useSelector((state:RootStore) => state.FormGeneratorReducer.addValidationMsgs);
   
    const [btnDisable,setBtnDisable] = useState<boolean>(false);
    const stateArray = () => {
        let arr = [];

        for (let key in formState) {
            arr.push({
                id: key,
                config: formState[key]
            });
        }
        return arr;
    };
    
    const history = useHistory();


    const handleDelete = ()=>{
        oncancel(treatmentType);
        return null;
    }

    useEffect(() => {
       const disabled =  checkFieldValidations(validationMsg)
       setBtnDisable(disabled);
    },[validationMsg])


    const checkFieldValidations = (messages:any):boolean =>  {

        let disabled = false;
        for(const [key,val] of Object.entries(messages))
        {
        
            if(!_.isEmpty(val))
            {
                disabled = true;
                return disabled;
            }
           
            
        }
        return disabled;
    }


    return (
        <>
            {!(selectedTreatmentType && Object.keys(selectedTreatmentType)?.length > 0) ? (
                <div
                    className="pl-3 pr-3"
                    style={{
                        backgroundColor: "#F5F7FB"
                    }}>
                    <Loader />
                </div>
            ) : (
                <Form
                // onSubmitClick={(values: any) => {
                //     handleSubmit({ formData: selectedTreatmentType, data: treatmentType });
                // }}
                render={(formRenderProps) => {
                    return (
                        <FormElement>
                            <fieldset>
                                <Row xs={1} sm={2} lg={3} xl={4} className={"p-2"}>
                                    {formState &&
                                        Object.keys(formState).length &&
                                        stateArray()
                                            .filter((item) => item.config?.controlType !== FieldControlTypes.GRID)
                                            .map((item: any, index: any) => {
                                                const { id, config } = item;
                                                return (
                                                    <>
                                                        <FormGeneratorForFumigation {...item} index={index} treatmentType={treatmentType} isHideSubmitBtn={isHideSubmitBtn}  />
                                                    </>
                                                );
                                            })}
                                </Row>
                            </fieldset>
                            {stateArray()
                                .filter((item) => item?.config?.controlType === FieldControlTypes.GRID)
                                .map((item: any, index: any) => {
                                    const { id, config } = item;
                                    const { controlType, columns } = config;
                                    return <TreatmentLicenseGrid {...item} key={index} columns={columns} treatmentType={treatmentType} isHideSubmitBtn={isHideSubmitBtn}/>;
                                })}

                            {children}
                            <div className="k-form-buttons p-2">
                                {!isHideCancelBtn ? (
                                    <Button
                                        className={`${styles.customButtonStyle} btn-danger`}
                                        type="button"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                ) : null}
                               { formState.purpose.action === TreatmentPurpose.AMENDMENT ||  formState.purpose.action === TreatmentPurpose.RENEWAL ? 
                               (
                               <div>
                                     <Button
                                        primary={true}
                                        type="button" 
                                        className="mr-3"
                                        onClick={() => history.push(Paths.Registration.Grid)}
                                        //onClick={onSubmit}
                                        // onClick={() =>   handleSubmit({ formData: selectedTreatmentType, data: treatmentType })}
                                        //disabled={handleDisableSubmitCheck()}
                                    >
                                      Back
                                    </Button>
                                    </div> ) : <></> 
                } 
                                {!isHideSubmitBtn ? (
                                    <>
                                    <Button
                                        primary={true}
                                        type={"submit"}
                                        disabled={btnDisable}
                                
                                        //onClick={onSubmit}
                                        onClick={() =>   handleSubmit({ formData: selectedTreatmentType, data: treatmentType })}
                                        //disabled={handleDisableSubmitCheck()}
                                    >
                                        {formState.purpose.buttonText}
                                    </Button>
                                   
                                    </>
                                ) : null}
                            </div>
                           
                        </FormElement>
                    );
                }}
            />
            )}
        
        </>
    );
};

export default TreatmentTypeForm;
