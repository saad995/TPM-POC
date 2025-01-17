import { IError } from "Lib/Types/SharedTypes";
import {
    UPDATE_STORE_OBJECT_ITEM_FAILURE,
    UPDATE_STORE_OBJECT_ITEM_REQUEST,
    UPDATE_STORE_OBJECT_ITEM_SUCCESS
} from "./UpdateStoreObjectActionTypes";

export interface IAmendment {
    initDocumentID: number;
    documentClassificationCode: string;
    initDocumentTypeCode: string;
    initDocumentIDs: string;
}

export interface IRenewal {
    initDocumentID: number;
    documentClassificationCode: string;
    initDocumentTypeCode: string;
    initDocumentIDs: string;
}

export type IIsAmendment = boolean | false;

export interface IGridFuncProps {
    initDocumentID: number;
    agencyId: number;
    action: number;
    initDocumentTypeCode: string;
    documentClassificationCode: string;
    currentRecordId: number;
    uploadPremisesExcelFIle: any;
    sdID?: string | null;
    amendment?: IAmendment;
    isAmendment?: IIsAmendment;
}

export interface IUpdateStoreObject {
    action?: number;
    id?: string;
    initDocumentTypeCode: string;
    documentClassificationCode?: string;
    agencyId? : number;
    extensionId?:number;
    extensionDocumentTypeCode?:string;
    requestDocumentEncryptedID?:string;
    requestDocumentItemRegEncryptedID?:string;
    agencyBusinessRegistrationEncryptedId?:string;
    sdID?: string;
    sdNumber?: string;
    reviewDocumentTypeCode?: string;
    reviewId?: number;
    currentRecordId?: number;
    acrID?:number;
    acrIDs?: string;
    amendment?: IAmendment;
    isAmendment?: boolean;
    isApprove? : boolean;
    isView? : boolean
    actionCode? :string;
    renewal? : IRenewal;
    isRenewal? : boolean;
    documentGroupCode?: string;
    itemId?: string | number;
    initDocumentID?: string;
}

export interface IUpdateStoreSuccessType {
    type: typeof UPDATE_STORE_OBJECT_ITEM_SUCCESS;
    payload: IUpdateStoreObject;
}
export interface IUpdateStoreRequestType {
    type: typeof UPDATE_STORE_OBJECT_ITEM_REQUEST;
}
export interface IUpdateStoreFailureType {
    type: typeof UPDATE_STORE_OBJECT_ITEM_FAILURE;
    payload: IError;
}
export type UpdateStoreReducerTypes = IUpdateStoreSuccessType | IUpdateStoreRequestType | IUpdateStoreFailureType;
