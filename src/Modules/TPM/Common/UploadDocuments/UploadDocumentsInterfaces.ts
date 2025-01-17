import { IClearAlertMessage, IErrorAlertMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { IError } from "Lib/Types/SharedTypes";
import {
    GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS,
    GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS_V2,
    UPLOAD_DOCUMENTS_FAILURE,
    UPLOAD_DOCUMENTS_REQUEST
} from "./UploadDocumentsActionTypes";

export interface IDocumentType {
    id: number;
    code: string;
    name: string;
    isMandatory?: boolean;
    isMandatoryInDocumentGroup?: boolean;
}

export interface IMultipleDocumentType {
    agencyId?: number;
    documentGroupCode: string;
    documentTypes: IDocumentType[];
}
export interface IGetDocTypeByDocGroupCodeRequest {
    agencyId: number;
    documentGroupCode: string;
    altCode?: string;
    documentClassificationCode?: string;
}
export interface IAttachment {
    attachementId: number;
    attachedDocumentTypeCode: string;
    documentTitle: string;
    fileNestFileId?: string;
}
export interface RequestType {
    type: typeof UPLOAD_DOCUMENTS_REQUEST;
}

export interface FailureType {
    type: typeof UPLOAD_DOCUMENTS_FAILURE;
    payload: IError;
}
export interface IGetDocTypeByDocGroupCodeSuccessType {
    type: typeof GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS;
    payload: IDocumentType[];
}

export interface IGetDocTypeByDocGroupCodeSuccessType_V2 {
    type: typeof GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS_V2;
    payload: any; //[] list of documents type with diff doc group codes
}

export type UploadDocumentsReducerTypes =
    | RequestType
    | FailureType
    | IErrorAlertMessage
    | IClearAlertMessage
    | IGetDocTypeByDocGroupCodeSuccessType
    | IGetDocTypeByDocGroupCodeSuccessType_V2;