import { IError } from "Lib/Types/SharedTypes";
import * as ActionType from "./GridActionTypes";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";

export interface ICatchCertificateListRequestData {
    roleCode: string;
}

export interface ICatchCertificateListResponseData {
    catchCertificateId: string;
    traderName: string;
    agentName: string;
    sdNumber:string;
    sdID:string;
    requestDocumentNumber: string;
    submittedOn: string;
    status: string;
    statusId: number;
    assignedDate: string;
    age: string;
    certificateNumber?: string;
}

export interface ICatchCertificateOfficersListResponseData {
    id: string;
    requestId: string;
    importerName: string;
    assignedDate: string;
    age: string;
    status: string;
}

export enum IGridTabs {
    RENEWAL = 1,
    AMENDMENT = 2,
    InQ = 3
}

export interface RequestType {
    type: typeof ActionType.TPM_REGISTRATION_GRID_REQUEST;
}

export interface FailureType {
    type: typeof ActionType.TPM_REGISTRATION_GRID_FAILURE;
    payload: IError;
}
export interface IGetSuccessType {
    type: typeof ActionType.TPM_REGISTRATION_GRID_SUCCESS;
    payload: ICatchCertificateListResponseData[];
}
export interface IGetSuccessDNFType {
    type: typeof ActionType.TPM_REGISTRATION_LIST_SUCCESS_DNF;
    payload?: any;
}
export interface IGetOfficersListSuccessType {
    type: typeof ActionType.TPM_REGISTRATION_OFFICERS_VIEW_LIST_SUCCESS;
    payload: ICatchCertificateOfficersListResponseData[];
}

export interface ITreatmentProviderRegistrationClearType {
    type: typeof ActionType.TPM_REGISTRATION_GRID_CLEAR;
}

export type getAllTreatmentProviderRegistrationTypes =
    | IGetSuccessType
    | IGetSuccessDNFType
    | IGetOfficersListSuccessType
    | RequestType
    | FailureType
    | ITreatmentProviderRegistrationClearType;


    export const searchableColumns = [
        resources_EN.TPM_Grid_ColumnName_sno_Field= "sno",
        resources_EN.TPM_Grid_ColumnName_Trader_Business_Name_Field= "businessName",
        resources_EN.TPM_Grid_ColumnName_Trader_NTN_Field= "ntn",
        resources_EN.TPM_Grid_ColumnName_Principle_Activity_Field= "principalActivity",
        resources_EN.TPM_Grid_ColumnName_Status_Field= "status",
        resources_EN.TPM_Grid_ColumnName_Actions_Field= "",
    
    ];