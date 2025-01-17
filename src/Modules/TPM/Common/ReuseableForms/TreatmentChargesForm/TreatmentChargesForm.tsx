import { TextArea } from "@progress/kendo-react-inputs";
import "../../../TreatmentCertificate/InitiateTreatmentRequest/ConsignmentInfo/ConsignmentInformation.scss";
// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import { LegacyRef, useState } from "react";
import { resources_EN } from "Modules/TPM/Constants/Resources_EN";
import { Col, Row } from "react-bootstrap";
interface Iprops {
    onRejectionHandleSubmit?: any;
    formRef?: LegacyRef<Form> | undefined;
    isLoading?: Boolean;
    underProcessTreatmentInformation: any;
}
export default function TreatmentChargesForm({ underProcessTreatmentInformation, onRejectionHandleSubmit, formRef, isLoading }: Iprops) {
    /**
     * * Rejection Information States Form
     */
    const [treatmentType, setTreatmentType] = useState("");
    const [treatmentCharges, setTreatmentCharges] = useState("");
    
    /** 
     * ! End of Treatment Information States Form
     */
    /**
     * * A general validator function
     */
    const validatorForNumberField = (setter: Function) => (value: string) => {
    
        let msg = "Please enter valid number.";
        let regex = /^(?:[0-9]{1,10})$/;
        // let nameLength = value.replace(/\s/g, "").length;
        if ((value?.length > 10)) {
            return msg = "Invalid input. Only 10-digit numbers are allowed.";
        }
        if (value?.length == 0) {
            setter("");
            return msg;
        }
        if (
            regex.test(value)
        ) {
            msg = "";
            setter(value);
        }
        return msg;
    };

    // ! End of validator
    return (
        <div className="form-group">
            <Form
                ref={formRef}
                onSubmit={onRejectionHandleSubmit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <Row className="pt-2" xs="1" sm="1">
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="treatmentType"
                                        placeholder="Enter Treatment Type"
                                        name="treatmentType"
                                        component={FormInput}

                                        disabled
                                        labelClass={"pb-2"}
                                        value={underProcessTreatmentInformation?.treatmentType?.name}
                                        label="Treatment Type"
                                    // validator={validator(setTreatmentType)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="treatmentCharges"
                                        placeholder="Enter Treatment Charges"
                                        name="treatmentCharges"
                                        maxlength={10}
                                        type="number"
                                        component={FormInput}
                                        labelClass={"pb-2"}
                                        label="Treatment Charges"
                                        validator={validatorForNumberField(setTreatmentCharges)}
                                    />
                                </Col>
                            </Row>
                        </fieldset>
                    </FormElement>
                )}
            />
        </div>
    );
}
