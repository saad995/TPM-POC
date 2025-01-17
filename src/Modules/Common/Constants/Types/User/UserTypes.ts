import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "../../ActionTypes";

export interface User {
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IntialName: string;
    Token: string;
    DateOn: number;
    isAuthenticated: boolean;
    ApplicationID: string;
}

export interface Error {
    error: string;
    status: number;
}

export interface RequestType {
    type: typeof USER_REQUEST;
}

export interface SuccessType {
    type: typeof USER_SUCCESS;
    payload: User;
}

export interface FailureType {
    type: typeof USER_FAILURE;
    payload: Error;
}

export interface ISaveSubscriberRegistrationRequest {
    businessId: number;
    businessAddressId: number;
    userSubTypeId: number;
    agentChallanNumber: string;
    parentCollectorateCode: string;
    registrationType: string;
    ntn: string;
    businessName: string;
    businessAddressFull: string;
}

export type UserActionTypes = SuccessType | RequestType | FailureType;

export type AppActions = UserActionTypes;
