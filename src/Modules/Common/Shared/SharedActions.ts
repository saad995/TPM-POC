import { Dispatch } from "react";
import {
    GET_CITIES_BY_COUNTRY_FAILURE,
    GET_CITIES_BY_COUNTRY_SUCCESS,
    GET_COLLECTORATE_CITIES_FAILURE,
    GET_COLLECTORATE_CITIES_SUCCESS,
    SHARED_CLEAR_STATE,
    SHARED_FAILURE,
    SHARED_REQUEST
} from "./SharedActionTypes";
import {
    ICitiesByCountryCodeRequest,
    ICity,
    ICityByCountryFailureType,
    ICityByCountrySuccessType,
    IClearStateType,
    ICollectorateCitiesFailureType,
    ICollectorateCitiesSuccessType,
    IFailureType,
    IRequestType,
    ISharedActionTypes
} from "./SharedTypes";
import service from "./SharedService";
import * as ActionType from "./SharedActionTypes";
import * as Interface from "./SharedTypes";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { IError } from "Elements/Types/SharedTypes";
import { errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
/***************************************************************************/

//Request action
const request = (): IRequestType => {
    return {
        type: SHARED_REQUEST
    };
};

//failure action
const failure = (error: any): IFailureType => {
    return {
        type: SHARED_FAILURE,
        error: error
    };
};

//clear state action
export const clearReducerState = (): IClearStateType => {
    return {
        type: SHARED_CLEAR_STATE
    };
};

export const getCustomsCollectorateAction = (req: any) => async (dispatch: Dispatch<any>) => {
        try {
            dispatch(requestCustomsCollectorate());
            let res = await service.getCustomsCollectorate(req);
            dispatch(requestCustomsCollectorateSuccess(res));
        } catch (e) {
            dispatch(errorAlert(e as IMessage));
            dispatch(requestCustomsCollectorateFailure(e as IError));
        }
    };
    
    const requestCustomsCollectorate = (): Interface.IRequestCustomsCollectorate => {
        return {
            type: ActionType.GET_CUSTOMS_COLLECTORATE_REQUEST
        };
    };
    
    const requestCustomsCollectorateSuccess = (res: any): Interface.IRequestCustomsCollectorateSuccess => {
        return {
            type: ActionType.GET_CUSTOMS_COLLECTORATE_SUCCESS,
            payload: res
        };
    };
    
    const requestCustomsCollectorateFailure = (error: IError): Interface.IRequestCustomsCollectorateFailure => {
        return {
            type: ActionType.GET_CUSTOMS_COLLECTORATE_FAILURE,
            payload: error
        };
    };

export const getCitiesByCountryCodeAction = (
    req: ICitiesByCountryCodeRequest
) => async (dispatch: Dispatch<ISharedActionTypes>) => {
    try {
        // dispatch(request());
        let response: ICity[] = await service.getCitiesByCountryCode(req);
        dispatch(getCitiesByCountryCodeSuccess(response));
    } catch (e) {
        dispatch(getCitiesByCountryCodeFailure());
        dispatch(failure(e));
    }
};

// Get Cities By Country Success Action
export const getCitiesByCountryCodeSuccess = (
    response: ICity[]
): ICityByCountrySuccessType => {
    return {
        type: GET_CITIES_BY_COUNTRY_SUCCESS,
        payload: response
    };
};

// Get Cities By Country Failure Action
export const getCitiesByCountryCodeFailure = (): ICityByCountryFailureType => {
    return {
        type: GET_CITIES_BY_COUNTRY_FAILURE
    };
};

export const getCollectorateCitiesAction = () => async (
    dispatch: Dispatch<ISharedActionTypes>
) => {
    try {
        // dispatch(request());
        let response: ICity[] = await service.getCollectorateCities();
        dispatch(getCollectorateCitiesSuccess(response));
    } catch (e) {
        dispatch(getCollectorateCitiesFailure());
        dispatch(failure(e));
    }
};

// Get Cities By Country Success Action
export const getCollectorateCitiesSuccess = (
    response: ICity[]
): ICollectorateCitiesSuccessType => {
    return {
        type: GET_COLLECTORATE_CITIES_SUCCESS,
        payload: response
    };
};

// Get Cities By Country Failure Action
export const getCollectorateCitiesFailure = (): ICollectorateCitiesFailureType => {
    return {
        type: GET_COLLECTORATE_CITIES_FAILURE
    };
};
