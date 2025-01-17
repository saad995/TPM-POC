import { TextArea } from "@progress/kendo-react-inputs";
import "../../../TreatmentCertificate/InitiateTreatmentRequest/ConsignmentInfo/ConsignmentInformation.scss";
// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import { LegacyRef, useState } from "react";
import { resources_EN } from "Modules/TPM/Constants/Resources_EN";
import "./RemarksForm.scss";

interface Iprops {
    onRemarksSubmit?:  any;
    formRef?: LegacyRef<Form> | undefined;
    isLoading?: Boolean;
    placeHolder?: string;
    label: string;
}

export default function RemarksForm({ label, onRemarksSubmit, formRef, isLoading } : Iprops) {
    /**
     * * Rejection Information States Form
     */
    const [remarks, setremarks] = useState("");

    /**
     * ! End of Treatment Information States Form
     */
    /**
     * * A general validator function
     */
    const validator = (setter: Function) => (value: string) => {
        let msg = "Field is required";
        if (!value) {
            return msg;
        } else {
            setter(value);
            msg = "";
        }
        return msg;
    };
    return (
        <div className="form-group">
            <Form
                ref={formRef}
                onSubmit={onRemarksSubmit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>

                                    <div className="d-flex flex-column custom-col">
                                        <Field
                                            name={"remarks"}
                                            label={label}
                                            placeholder="Enter Remarks"
                                            maxlength={1000}
                                            component={FormTextArea}
                                            dataItemKey={"label"}
                                            textField={"value"}
                                            rows={3}
                                            autoSize={false}
                                            maxLength={1000}
                                            // value={remarks}
                                            // validator={validator(setremarks)}
                                        />
                            </div>
                        </fieldset>
                    </FormElement>
                )}
            />
        </div>
    );
}
