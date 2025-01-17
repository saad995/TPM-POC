import {
    ISuccessAlertMessage,
    IErrorAlertMessage,
    IClearAlertMessage,
    IInfoAlertMessage,
    IClearAlertMessageModal,
    IErrorAlertMessageModal,
    IMessage,
    ISuccessAlertMessageModal
} from "./AlertDismissibleInterfaces";
import {
    ALERT_SUCCESS,
    ALERT_ERROR,
    ALERT_CLEAR,
    ALERT_INFO,
    MODAL_ALERT_CLEAR,
    MODAL_ALERT_ERROR,
    MODAL_ALERT_SUCCESS
} from "./AlertDismissibleActionTypes";

export const successAlert = (message: IMessage): ISuccessAlertMessage => {
    return {
        type: ALERT_SUCCESS,
        payload: message
    };
};

export const infoAlert = (message: IMessage): IInfoAlertMessage => {
    return {
        type: ALERT_INFO,
        payload: message
    };
};

export const errorAlert = (message: IMessage): IErrorAlertMessage => {
    return {
        type: ALERT_ERROR,
        payload: message
    };
};

export const clearAlert = (message: IMessage): IClearAlertMessage => {
    return {
        type: ALERT_CLEAR,
        payload: message
    };
};

export const errorAlertModal = (message: IMessage): IErrorAlertMessageModal => {
    return {
        type: MODAL_ALERT_ERROR,
        payload: message
    };
};


export const successAlertModal = (message: IMessage): ISuccessAlertMessageModal => {
    return {
        type: MODAL_ALERT_SUCCESS,
        payload: message
    };
};

export const clearAlertModal = (message: IMessage): IClearAlertMessageModal => {
    return {
        type: MODAL_ALERT_CLEAR,
        payload: message
    };
};
