import {
    CHANGE_ITEMWISE_STATUS_SUCCESS,
    ITEMWISE_STATUS_FAILURE,
    ITEMWISE_STATUS_REQUEST
} from "./ConsignmentDescriptionActionTypes";

import {
    FailureType,
    RequestType,
    IChangeItemWiseStatusRequestData,
    IChangeItemWiseStatusResponseData,
    IChangeItemWiseStatusSuccessType,
    ItemWiseActionTypes,
    pendingItemsCountRseponseData
} from "./ConsignmentDescriptionInterfaces";

import { IError, IErrorType, Role } from "Lib/Types/SharedTypes";
import { Dispatch } from "redux";
import service from "./ConsignmentDescriptionServices";
import {
    IUserRightsFailureType,
    IUserRightsRequestData,
    IUserRightsResponseData
} from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import rightService from "Modules/TPM/Common/UserRights/UserRightService";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
/************************** Actions Creators************************/
//Change Status of Release Order
export const saveSdItemExtAction = (req: IChangeItemWiseStatusRequestData, callback: any) => async (
    dispatch: Dispatch<ItemWiseActionTypes>
) => {}
/************************** Actions ************************/

// Request action
const request = (): RequestType => {
    return {
        type: ITEMWISE_STATUS_REQUEST
    };
};

// Failure action
const failure = (error: IError): FailureType => {
    return {
        type: ITEMWISE_STATUS_FAILURE,
        payload: error
    };
};
//Change  Item Wise success action
const ChangeItemWiseStatusSuccess = (
    responseDate: IChangeItemWiseStatusResponseData
): IChangeItemWiseStatusSuccessType => {
    //action
    return {
        type: CHANGE_ITEMWISE_STATUS_SUCCESS,
        payload: responseDate
    };
};
// const pendingItemsCount = (responseDate: pendingItemsCountRseponseData): IChangeItemWiseStatusSuccessType => {
//     //action
//     return {
//         type: PENDING_ITEMS_COUNT,
//         payload: responseDate
//     };
// };
//Failure action
const rightsFailure = (error: IErrorType): IUserRightsFailureType => {
    return {
        type: GET_USER_RIGHTS_FAILURE,
        payload: error
    };
};
