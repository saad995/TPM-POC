import {
    GET_CITIES_BY_COUNTRY_FAILURE,
    GET_CITIES_BY_COUNTRY_SUCCESS,
    GET_COLLECTORATE_CITIES_FAILURE,
    GET_COLLECTORATE_CITIES_SUCCESS,
    SHARED_CLEAR_STATE,
    SHARED_FAILURE,
    SHARED_REQUEST
} from "./SharedActionTypes";

import * as ActionType from "./SharedActionTypes";
import { IError } from "Elements/Types/SharedTypes"
export interface ICity {
    cityId: number | string;
    countryCode: string;
    cityName: string;
    parentCollectorateCode: string;
}

export interface ICitiesByCountryCodeRequest {
    code: string;
}

export interface ICollectorate {
    cityId: string,
    cityName: string,
    countryCode: string,
    parentCollectorateCode: string
}

export type SharedTypes = ICity;

export interface ICityByCountrySuccessType {
    type: typeof GET_CITIES_BY_COUNTRY_SUCCESS;
    payload: ICity[];
}

export interface ICityByCountryFailureType {
    type: typeof GET_CITIES_BY_COUNTRY_FAILURE;
}

export interface ICollectorateCitiesSuccessType {
    type: typeof GET_COLLECTORATE_CITIES_SUCCESS;
    payload: ICity[];
}

export interface ICollectorateCitiesFailureType {
    type: typeof GET_COLLECTORATE_CITIES_FAILURE;
}

export interface IErrorType {
    code: string;
    description: string;
}

export interface IRequestType {
    type: typeof SHARED_REQUEST;
}

export interface IFailureType {
    type: typeof SHARED_FAILURE;
    error: IErrorType;
}
export interface IClearStateType {
    type: typeof SHARED_CLEAR_STATE;
}

export interface ICustomCollectorate {
        collectorateId: number;
        collectorateCode: string;
        description: string;
        parentCollectorate: string;
    }
    export interface IRequestCustomsCollectorate {
        type: typeof ActionType.GET_CUSTOMS_COLLECTORATE_REQUEST;
    }
    export interface IRequestCustomsCollectorateSuccess {
        type: typeof ActionType.GET_CUSTOMS_COLLECTORATE_SUCCESS;
        payload: ICustomCollectorate[];
    }
    export interface IRequestCustomsCollectorateFailure {
        type: typeof ActionType.GET_CUSTOMS_COLLECTORATE_FAILURE;
        payload: IError;
    }

export type ISharedActionTypes =
    | ICityByCountrySuccessType
    | ICityByCountryFailureType
    | ICollectorateCitiesSuccessType
    | ICollectorateCitiesFailureType
    | IFailureType
    |IRequestCustomsCollectorate
    | IRequestCustomsCollectorateSuccess
    | IRequestCustomsCollectorateFailure;
