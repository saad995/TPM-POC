import {
    ALERT_SUCCESS,
    ALERT_CLEAR,
    ALERT_ERROR,
    ALERT_INFO,
    MODAL_ALERT_CLEAR,
    MODAL_ALERT_ERROR,
    MODAL_ALERT_SUCCESS
} from "./AlertDismissibleActionTypes";

export interface IMessage {
    code: string;
    description: string;
}
export interface keyValue {
    label: string;
    value: number;
}

export interface IError {
    error: string;
    status: number;
}

export interface ISuccessAlertMessage {
    type: typeof ALERT_SUCCESS;
    payload: IMessage;
}

export interface IInfoAlertMessage {
    type: typeof ALERT_INFO;
    payload: IMessage;
}

export interface IErrorAlertMessage {
    type: typeof ALERT_ERROR;
    payload: IMessage;
}

export interface IClearAlertMessage {
    type: typeof ALERT_CLEAR;
    payload: IMessage;
}

export interface IErrorAlertMessageModal {
    type: typeof MODAL_ALERT_ERROR;
    payload: IMessage;
}


export interface ISuccessAlertMessageModal {
    type: typeof MODAL_ALERT_SUCCESS;
    payload: IMessage;
}

export interface IClearAlertMessageModal {
    type: typeof MODAL_ALERT_CLEAR;
    payload: IMessage;
}

export type AlertReducerTypes =
    | ISuccessAlertMessage
    | IErrorAlertMessage
    | IClearAlertMessage
    | IInfoAlertMessage
    | IErrorAlertMessageModal
    | ISuccessAlertMessageModal
    | IClearAlertMessageModal;
