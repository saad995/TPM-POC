import { Dispatch } from "redux";
import _ from "lodash";
//Import action types
import {
    ALERT_CLEAR,
    SUBSCRIPTION_CREATE_PASSWORD_CLEAR_STATE,
    FLOW_STATE_CLEAR_STATE,
    FORGOT_PASSWORD_CLEAR_STATE,
    PAYMENT_PROCESS_CLEAR_STATE,
    SUBSCRIPTION_FEE_CLEAR_STATE,
    FORM_STATE_CLEAR_STATE,
    SUBSCRIPTION_INFORMATION_CLEAR_STATE,
    SUBSCRIPTION_TYPE_CLEAR_STATE,
    CLEAR_SUBSCRIPTION_RESUME_STATE,
    CLEAR_BANK_ACC_VERIFICATION_STATE
} from "../Subscription/SubscriptionActionTypes";



export const clearApplicationState = () => async (
    dispatch: Dispatch<any>
) => {
    const message = {
        code: "",
        description: ""
    }
    dispatch(clearAlert(message));
    dispatch(clearCreatePasswordState());
    dispatch(clearFlowState());
    dispatch(clearForgetPasswordState());
    dispatch(clearPaymentProcessState());
    dispatch(clearSubscriptionFeeState());
    dispatch(clearFormState());
    dispatch(clearSubscriptionInformationState());
    dispatch(clearSubscriptionTypeState());
    dispatch(clearSubscritpionResumeState());
    dispatch(clearBankAccVerificationState());
};


export const clearAlert = (
    message: any
) => {
    return {
        type: ALERT_CLEAR,
        payload: message
    };
};


//clear state action
export const clearCreatePasswordState = () => {
    return {
        type: SUBSCRIPTION_CREATE_PASSWORD_CLEAR_STATE
    };
};

export const clearFlowState = () => {
    return { type: FLOW_STATE_CLEAR_STATE };
}

export const clearForgetPasswordState = () => {
    return {
        type: FORGOT_PASSWORD_CLEAR_STATE
    };
};

export const clearPaymentProcessState = () => {
    return {
        type: PAYMENT_PROCESS_CLEAR_STATE
    };
};

export const clearSubscriptionFeeState = () => {
    return {
        type: SUBSCRIPTION_FEE_CLEAR_STATE
    };
};


export const clearFormState = () => {
    return { type: FORM_STATE_CLEAR_STATE };
}

export const clearSubscriptionInformationState = () => {
    return {
        type: SUBSCRIPTION_INFORMATION_CLEAR_STATE
    };
};

export const clearSubscriptionTypeState = () => {
    return {
        type: SUBSCRIPTION_TYPE_CLEAR_STATE
    };
};

export const clearSubscritpionResumeState = (): any => {
    return {
        type: CLEAR_SUBSCRIPTION_RESUME_STATE
    };
};

export const clearBankAccVerificationState = (): any => {
    return {
        type: CLEAR_BANK_ACC_VERIFICATION_STATE
    }
}


