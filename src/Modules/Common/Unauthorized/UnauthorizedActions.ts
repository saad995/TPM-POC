/************************** Actions Creators************************/

import { IErrorType } from "Lib/Types/SharedTypes";
import {
    UNAUTORIZED_FAILURE,
    UNAUTORIZED_REQUEST
} from "./UnauthorizedActionTypes";
import { FailureType, RequestType } from "./UnauthorizedInterface";

/************************** Actions ************************/

export const request = (): RequestType => {
    return {
        type: UNAUTORIZED_REQUEST
    };
};

//test failure action
export const failure = (error: IErrorType): FailureType => {
    return {
        type: UNAUTORIZED_FAILURE,
        payload: error
    };
};
