import { TextArea } from "@progress/kendo-react-inputs";
import "../../../TreatmentCertificate/InitiateTreatmentRequest/ConsignmentInfo/ConsignmentInformation.scss";
// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import { LegacyRef, SyntheticEvent, useState } from "react";
import { resources_EN } from "Modules/TPM/Constants/Resources_EN";
import { Col, Row } from "react-bootstrap";

interface Iprops {
    onRejectionHandleSubmit: any;
    formRef?: LegacyRef<Form> | undefined;
    isLoading: Boolean;
    placeHolder: string;
    formLimit: number;
}

// export default function RejectionForm({ onRejectionHandleSubmit, formRef, isLoading, placeHolder }) {
export default function RejectionForm(props: Iprops) {
    const { onRejectionHandleSubmit, formRef, isLoading, placeHolder, formLimit } = props;
    /**
     * * Rejection Information States Form
     */
    const [rejectionReason, setRejectionReason] = useState("");

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
                onSubmit={onRejectionHandleSubmit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <Row className="pt-2" xs="1" sm="1">
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={"rejectionReason"}
                                        placeholder={placeHolder}
                                        component={FormTextArea}
                                        maxlength={formLimit}
                                        dataItemKey={"label"}
                                        textField={"value"}
                                        rows={10}
                                        autoSize={false}
                                        // value={rejectionReason}
                                        validator={validator(setRejectionReason)}
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
