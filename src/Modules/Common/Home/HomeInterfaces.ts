import {
    DASHBOARD_REQUEST,
    DASHBOARD_FAILURE,
    DASHBOARD_CLEAR_STATE,
    GET_WELCOME_MESSAGE_SUCCESS
} from "./HomeActionTypes";

export interface RequestType {
    type: typeof DASHBOARD_REQUEST;
}

export interface FailureType {
    type: typeof DASHBOARD_FAILURE;
    payload: IError;
}

export interface IClearStateType {
    type: typeof DASHBOARD_CLEAR_STATE;
}

export interface IGetWelcomeMessageSuccessType {
    type: typeof GET_WELCOME_MESSAGE_SUCCESS;
    payload: string;
}

export interface IError {
    error: string;
    status: number;
}

export enum MenuPosition {
    Left = "L",
    Right = "R",
    Center = "C",
    Bottom = "B",
    Header = "H"
}

export type HomeReducerTypes =
    | RequestType
    | FailureType
    | IGetWelcomeMessageSuccessType
    | IClearStateType;

export type AppActions = HomeReducerTypes;
