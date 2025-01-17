import React, { useState } from "react";

//Import components
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
    Form,
    Field,
    FormElement,
    FieldWrapper
} from "@progress/kendo-react-form";
// import { Label, Error } from "@progress/kendo-react-labels";
// import { Input } from "@progress/kendo-react-inputs";
import CheckInput from "Elements/Custom/CheckInput/CheckInput";
import Modal from "Elements/Basic/Modal/Modal";

//Import Style
import "./OTPModal.scss";

//Import Validators
import OTPValidator from "Validators/Custom/OTPValidator";

//Import Constants
import validation from "Modules/Common/Constants/validation";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";

import ModalPublish from "Lib/PubSub/ModalPublisher"
import AlertDismissible from "Elements/Basic/AlertDismissible/AlertDismissible";

interface IProps {
    func: any;
    confirm?: any;
    deny?: any;
    title?: string;
    message: string;
    confirmMsg?: string;
    denyMsg?: string;
    variant?: string;
    isAlertVisible?: boolean;
    alertMessage?:string;
}

const OTPModal = (props: IProps) => {
    const state = {
        cellOTP: "",
        emailOTP: "",
        cellOTPValid: false,
        emailOTPValid: false,
    };

    const submit = () => {
        props.confirm(state.cellOTP, state.emailOTP);
    };

    const cellOTPValidator = (value: any = "") => {
        let msg = validation.cellOTP.message;
        state.cellOTPValid = false;
        if (
            value.length === validation.cellOTP.length &&
            validation.cellOTP.regex.test(value)
        ) {
            msg = "";
            state.cellOTP = value;
            state.cellOTPValid = true;
        }
        return msg;
    };

    const emailOTPValidator = (value: any = "") => {
        let msg = validation.emailOTP.message;
        state.emailOTPValid = false;
        if (
            value.length === validation.emailOTP.length &&
            validation.emailOTP.regex.test(value)          
        ) {
            msg = "";
            state.emailOTP = value;
            state.emailOTPValid = true;
        }
        return msg;
    };

    const isOTPValid = () =>
        state.cellOTPValid && state.emailOTPValid;

    return (
        <Dialog title={props.title} onClose={props.func} className="Dialog">
            <p className="p2">{props.message}</p>
            <AlertDismissible
                isAlertVisible={props.isAlertVisible}
                variant={props.variant}
                message={props.alertMessage}
                className="mt-2 mx-auto sub-info-alert"
            />
            <Form
                onSubmit={submit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <div className="mb-3">
                                <Field
                                    placeholder="Enter Mobile OTP"
                                    name={"cellOTP"}
                                    component={CheckInput}
                                    maxLength={validation.cellOTP.length}
                                    validator={cellOTPValidator}
                                    type={"password"}
                                />
                            </div>
                            <div className="mb-3">
                                <Field
                                    placeholder="Enter Email OTP"
                                    name={"emailOTP"}
                                    component={CheckInput}
                                    maxLength={validation.emailOTP.length}
                                    validator={emailOTPValidator}
                                    type={"password"}
                                />
                            </div>
                        </fieldset>
                        <DialogActionsBar>
                            {props.confirm && (
                                <button
                                    onClick={submit}
                                    className="k-button"
                                    disabled={!formRenderProps.allowSubmit || !isOTPValid()}
                                >
                                    {props.confirmMsg}
                                </button>
                            )}
                            {props.deny && (
                                <button className="k-button">
                                    {props.denyMsg}
                                </button>
                            )}
                        </DialogActionsBar>
                    </FormElement>
                )}
            />
        </Dialog>
    );
};

export default OTPModal;
