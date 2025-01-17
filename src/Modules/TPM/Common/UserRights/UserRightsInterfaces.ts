import { IErrorType } from "Lib/Types/SharedTypes";
import {
    GET_USER_RIGHTS_SUCCESS,
    GET_USER_RIGHTS_REQUEST,
    GET_USER_RIGHTS_FAILURE
} from "./UserRightsActionTypes";

export interface IUserRightsResponseData {
    data: string;
}
export interface IUserRightsRequestData {
    documentClassificationCode?: string;
    documentTypeCode?: string;
    roleCode: string;
    documentId?: number;
    agencyId?:number;
}
export interface IUserRightsSuccessType {
    type: typeof GET_USER_RIGHTS_SUCCESS;
    payload: IUserRightsResponseData;
}
export interface IUserRightsRequestType {
    type: typeof GET_USER_RIGHTS_REQUEST;
}
export interface IUserRightsFailureType {
    type: typeof GET_USER_RIGHTS_FAILURE;
    payload: IErrorType;
}
export type UserRightsReducerTypes =
    | IUserRightsSuccessType
    | IUserRightsRequestType
    | IUserRightsFailureType;
