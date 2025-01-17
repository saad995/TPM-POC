import {
    GET_USER_RIGHTS_FAILURE,
    GET_USER_RIGHTS_REQUEST,
    GET_USER_RIGHTS_SUCCESS
} from "./UserRightsActionTypes";

import {
    IUserRightsResponseData,
    IUserRightsRequestData,
    IUserRightsFailureType,
    IUserRightsRequestType,
    IUserRightsSuccessType,
    UserRightsReducerTypes
} from "./UserRightsInterfaces";
import { Dispatch } from "redux";
import { IError, IErrorType } from "Lib/Types/SharedTypes";

import service from "./UserRightService";
//Update Store on Edit/View of respective record
export const getUserRightsAction = (data: IUserRightsRequestData) => async (
    dispatch: Dispatch<UserRightsReducerTypes>
) => {
    try {
        dispatch(request());

        const response = await service.userRightsService(data);
        if (response != undefined) {
            const responseData: IUserRightsResponseData = {
                data: response.data
            };
            dispatch(success(responseData));
        }
    } catch (e: any) {
        dispatch(rightsFailure(e));
    }
};
/************************** Actions ************************/

//Request action
const request = (): IUserRightsRequestType => {
    return {
        type: GET_USER_RIGHTS_REQUEST
    };
};

//Failure action
export const rightsFailure = (error: IErrorType): IUserRightsFailureType => {
    return {
        type: GET_USER_RIGHTS_FAILURE,
        payload: error
    };
};

//Get List success action
const success = (
    responseDate: IUserRightsResponseData
): IUserRightsSuccessType => {
    return {
        type: GET_USER_RIGHTS_SUCCESS,
        payload: responseDate
    };
};
