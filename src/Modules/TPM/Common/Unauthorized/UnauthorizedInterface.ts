import { IError, IErrorType } from "Lib/Types/SharedTypes";
import {
    UNAUTORIZED_FAILURE,
    UNAUTORIZED_REQUEST
} from "./UnauthorizedActionTypes";

export interface RequestType {
    type: typeof UNAUTORIZED_REQUEST;
}

export interface FailureType {
    type: typeof UNAUTORIZED_FAILURE;
    payload: IErrorType;
}

export type UnauthorizedActionTypes = RequestType | FailureType;
