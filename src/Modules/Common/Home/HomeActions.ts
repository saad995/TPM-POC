//Import Dispatch from redux
import { Dispatch } from "redux";

//Import action types
import {
    DASHBOARD_REQUEST,
    DASHBOARD_FAILURE,
    DASHBOARD_CLEAR_STATE,
    GET_WELCOME_MESSAGE_SUCCESS
} from "./HomeActionTypes";

import {
    FailureType,
    IClearStateType,
    IGetWelcomeMessageSuccessType,
    RequestType,
    IError
} from "./HomeInterfaces";

//Import Services
import service from "./HomeServices";

// Get Welcome Message Action
export const getWelcomeMessageAction = () => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(request());
        let response: string = await service.getWelcomeMessage({});
        dispatch(getWelcomeMessageSuccess(response));
    } catch (e) {
        dispatch(failure(e));
    }
};

// Get Welcome Message Success Action
const getWelcomeMessageSuccess = (
    response: string
): IGetWelcomeMessageSuccessType => {
    return {
        type: GET_WELCOME_MESSAGE_SUCCESS,
        payload: response
    };
};

// Request Action
const request = (): RequestType => {
    return {
        type: DASHBOARD_REQUEST
    };
};

// Failure Action
const failure = (error: IError): FailureType => {
    return {
        type: DASHBOARD_FAILURE,
        payload: error
    };
};

// Clear State Action
export const clearReducerState = (): IClearStateType => {
    return {
        type: DASHBOARD_CLEAR_STATE
    };
};
