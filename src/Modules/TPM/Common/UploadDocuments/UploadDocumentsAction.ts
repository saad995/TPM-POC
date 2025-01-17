import { IError, IErrorType, Role } from "Lib/Types/SharedTypes";
import {
    GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS,
    GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS_V2,
    UPLOAD_DOCUMENTS_FAILURE,
    UPLOAD_DOCUMENTS_REQUEST
} from "./UploadDocumentsActionTypes";
import {
    FailureType,
    IDocumentType,
    IGetDocTypeByDocGroupCodeRequest,
    IGetDocTypeByDocGroupCodeSuccessType,
    IGetDocTypeByDocGroupCodeSuccessType_V2,
    IMultipleDocumentType,
    RequestType,
    UploadDocumentsReducerTypes
} from "./UploadDocumentsInterfaces";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
//Import Dispatch from redux
import { Dispatch } from "redux";
import { clearAlert, errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
//Import Data Types For Action
import service from "./UploadDocumentsService";

//New fetch all support documents
export const getSupportDocTypeByDocGroupCodeAction = (req: IGetDocTypeByDocGroupCodeRequest) => async (
    dispatch: Dispatch<UploadDocumentsReducerTypes>
) => {
    try {
        dispatch(request());
        const response = await service.getSupportDocTypeCode(req);
        dispatch(getDocTypeByDocGroupCodeActionSuccess(response));
        
        const message: IMessage = { code: "", description: "" };
        dispatch(clearAlert(message));
    } catch (e) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

export const getDocTypeByDocGroupCodeAction = (req: IGetDocTypeByDocGroupCodeRequest) => async (
    dispatch: Dispatch<UploadDocumentsReducerTypes>
) => {
    try {
        dispatch(request());
        const response = await service.getDocTypeByDocGroupCode(req);
        dispatch(getDocTypeByDocGroupCodeActionSuccess(response));
        const message: IMessage = { code: "", description: "" };
        dispatch(clearAlert(message));
    } catch (e) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

export const getDocTypeByDocGroupCodeActionV2 = (req: IGetDocTypeByDocGroupCodeRequest, callback?:any) => async (
    dispatch: Dispatch<UploadDocumentsReducerTypes>
) => {
    try {
        dispatch(request());
        const response = await service.getDocTypeByDocGroupCode(req);
        let multipledocumentTypesObj: IMultipleDocumentType = {
            agencyId: req?.agencyId,
            documentTypes: response,
            documentGroupCode: req?.documentGroupCode
        }
        dispatch(getDocTypeByDocGroupCodeActionSuccess_V2({[req?.documentGroupCode]: multipledocumentTypesObj}));
        const message: IMessage = { code: "", description: "" };
        dispatch(clearAlert(message));
    } catch (e) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

// // delete attachments from fss
// export const deleteUploadedFilesFromFSS = (req: any, callback: any = null) => async (
//     dispatch: Dispatch<UploadDocumentsReducerTypes>
// ) => {
//     try {
//         dispatch(request());
//         const response = await service.getDocTypeByDocGroupCode(req);
//         dispatch(getDocTypeByDocGroupCodeActionSuccess(response));
//         const message: IMessage = { code: "", description: "" };
//         dispatch(clearAlert(message));
//     } catch (e) {
//         dispatch(errorAlert(e));
//         dispatch(failure(e));
//     }
// };
/************************** Actions ************************/

// Request Action
const request = (): RequestType => {
    return {
        type: UPLOAD_DOCUMENTS_REQUEST
    };
};

// Failure Action
const failure = (error: IError): FailureType => {
    return {
        type: UPLOAD_DOCUMENTS_FAILURE,
        payload: error
    };
};

export const getDocTypeByDocGroupCodeActionSuccess = (
    response: IDocumentType[]
): IGetDocTypeByDocGroupCodeSuccessType => {
    return {
        type: GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS,
        payload: response
    };
};

export const getDocTypeByDocGroupCodeActionSuccess_V2 = (
    response: any
): IGetDocTypeByDocGroupCodeSuccessType_V2 => {
    return {
        type: GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS_V2,
        payload: response
    };
};
