import { IError } from "Lib/Types/SharedTypes";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
import { IUserRightsFailureType } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import {
    CATCH_CERTIFICATE_VIEW_FAILURE,
    CATCH_CERTIFICATE_VIEW_REQUEST,
    CATCH_CERTIFICATE_VIEW_STOP_LOADER,
    CATCH_CERTIFICATE_VIEW_SUCCESS,
    INDEPENDENT_CATCH_CERTIFICATE_VIEW_SUCCESS,
    CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS,
    CATCH_CERTIFICATE_SD_VIEW_SUCCESS
} from "./ViewActionTypes";

export interface IViewRequestData {
    catchCertificateId: string;
    sdID: string;
    roleCode: string;
    rights?: string;
    agencyId: number;
}

export interface IUpdateCatchCertificateStatusRequestData {
    command?: IAvailableCommandsType;
    initDocumentId: number;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    // fileId?: string;
    // docTypeCode?: string;
    rights: string;
}

export interface IChangeCatchCertificateStatusResponseData {
    description: string;
    code: number;
}

export interface Commodity {
    gdItemId?: string;
    hsCodeExt?: string;
    importPurpose?: string;
    importPurposeId?: string;
}

export interface IViewResponseData {
    catchCertificateId?: number;
    catchCertificateIDS?: string;
    catchCertificateStatusID: number;
    catchCertificateStatusName?: string;
    certificateNumber: string;
    agentName?: string;
    status?: string;
    requestDocumentTypeCode?: string;
    requestDocumentNumber?: string;
    traderSubscriptionId: number;
    agentSubscriptionId: number;
    agentChalNumber?: String;
    isBillPaid?: boolean;
    psid?: string;
    billId?: number;
    billAmount?: number;
    NTN?: string;
    applicantName?: string;
    agencyID?: string;
    vessels: any[];
    comments?: string;
    agencyName?: string;
    officerName?: string;
    ecNumber?: string;
    date?: string;
    issueDate?: string;

}

export interface IViewSDData {
    sdID: string;
    consigneeName?: string;
    consigneeAddress?: string;
    phoneNumber?: string;
    sdNumber?: string;
    processor?: string;
    singleConsignmentWeight?: string;
    weight?: string;
    items: ISDItemInfo[];
   
}

export interface ISDItemInfo {
    fishSpecies?: string;
    cartons?: string;
    dateOfShipment?: string;
    nameOfFisheryProduct?: string;
    hsCode: string;
    
}

export interface IViewSDResponseData {
    sdID: string;
    consigneeName?: string;
    consigneeAddress?: string;
    phoneNumber?: string;
    sdNumber?: string;
    processor?: string;
    singleConsignmentWeight?: string;
    weight?: string;
    fishSpecies?: string;
    cartons?: string;
    dateOfShipment?: string;
    nameOfFisheryProduct?: string;
    hsCode: string;
}

export interface RequestType {
    type: typeof CATCH_CERTIFICATE_VIEW_REQUEST;
}

export interface FailureType {
    type: typeof CATCH_CERTIFICATE_VIEW_FAILURE;
    payload: IError;
}

export interface StopLoaderType {
    type: typeof CATCH_CERTIFICATE_VIEW_STOP_LOADER;
}

export interface ICatchCertificateViewSuccessType {
    type: typeof CATCH_CERTIFICATE_VIEW_SUCCESS;
    payload: IViewResponseData;
}

export interface ICatchCertificateSDViewSuccessType {
    type: typeof CATCH_CERTIFICATE_SD_VIEW_SUCCESS;
    payload: IViewSDData;
}
export interface ICatchCertificateForIndependentViewSuccessType {
    type: typeof INDEPENDENT_CATCH_CERTIFICATE_VIEW_SUCCESS;
    payload: IViewResponseData[];
}

export interface IChangeCatchCertificateStatusSuccessType {
    type: typeof CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS;
    payload: IChangeCatchCertificateStatusResponseData;
}
export type CatchCertificateViewActionTypes =
    | ICatchCertificateViewSuccessType
    | ICatchCertificateSDViewSuccessType
    | RequestType
    | FailureType
    | StopLoaderType
    | ICatchCertificateForIndependentViewSuccessType
    | IChangeCatchCertificateStatusSuccessType
    | IUserRightsFailureType;
