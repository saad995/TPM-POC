import { IError } from "Lib/Types/SharedTypes";
import { Dispatch } from "redux";
import {
    EDIT_FILES,
    FILE_CLEAR_STATE,
    FILE_DELETE_SUCCESS,
    FILE_DOWNLOADED,
    FILE_FAILURE,
    FILE_REQUEST,
    FILE_UPLOAD_SUCCESS,
    GET_FILEPATH_SUCCESS,
    FILE_SECURE_DELETE_SUCCESS,
    FILE_UPLOAD_SUCCESS_V2,
    FILE_DELETE_SUCCESS_V2,
    FILE_SUBTYPE_UPLOAD,
} from "./FileActionTypes";

import service from "./FileService";
import {
    DownloadType,
    FailureType,
    fileActionTypes,
    IClearStateType,
    IDeleteFileSuccessType,
    IEditFilesSuccessType,
    IFile,
    IGetFilePathRequestData,
    IFileDownloadRequest,
    IGetFilePathSuccessType,
    IUploadFileSuccessType,
    RequestType,
    IGetFilePathResponseData,
    IUploadFileV2SuccessType,
    IDeleteFileV2SuccessType,
    IUploadSubTypeFileUpload,
    
} from "./FileTypes";
import { createEditTreatmentOnBoardDataAction } from "Elements/Custom/FormGenerator/FormGeneratorAction";
import { subTypeDocumentCode } from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";
//Import Permit In View Mode Download Document
export const DownloadDocumentAction = (data: IFileDownloadRequest) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let responseData = await service.downloadDocument(data);

        
        dispatch(downloaded());
    } catch (e) {
        dispatch(failure(e));
    }
};

export const deleteDocumentAction = (identification: any, callBack?: any) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let response = await service.deleteFile(identification);
        if(callBack){
            callBack(response)
        }
        dispatch(deleteFileSuccess(identification));
    } catch (e) {
        dispatch(failure(e));
    }
};

//For TPM only
export const deleteFileFromTPMAction = (req: any, callBack?: any) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let response = await service.deleteFileTPMService(req);
        if(callBack){
            callBack(response)
        }
        //dispatch(deleteFileSuccess(identification));
    } catch (e) {
        dispatch(failure(e));
    }
};

export const uploadDocumentAction = (req: IFile) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let response: any = await service.uploadFile(req);

        const uploadedFile: IFile = {
            attachmentId: req.attachmentId,
            documentExtension: req.documentExtension,
            file: undefined,
            documentName: req.documentName,
            documentSize: req.documentSize,
            fileNestFileId: response.data.fileID,
            fileNestFileIds: response.data.fileIDs,
            docTypeCode: req.docTypeCode,
            docTypeName: req.docTypeName,
            documentDescription: req.documentDescription
        };

        dispatch(uploadFileSuccess(uploadedFile));
    } catch (e) {
        dispatch(failure(e));
    }
};

export const uploadDocumentV2Action = (req: IFile,formData:any,setFormData:any,name:any) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let response: any = await service.uploadFile(req);

        const uploadedFile: IFile = {
            attachmentId: req.attachmentId,
            documentExtension: req.documentExtension,
            file: undefined,
            documentName: req.documentName,
            documentSize: req.documentSize,
            fileNestFileId: response.data.fileID,
            fileNestFileIds: response.data.fileIDs,
            docTypeCode: req.docTypeCode,
            docTypeName: req.docTypeName,
            documentDescription: req.documentDescription
        };

        let documentGroupCode:any = req.documentGroupCode;
        dispatch(uploadFileV2Success({[documentGroupCode]: [uploadedFile]}));
        if(![subTypeDocumentCode.MB,subTypeDocumentCode.ALP,subTypeDocumentCode.CO2].includes(documentGroupCode))
        {
            let attachmentData = formData[name].treatmentTypeAttachments;
            if(attachmentData && attachmentData.length > 0)
            {

                attachmentData.push(uploadedFile);
            }
            else {
                attachmentData = [uploadedFile];
            }
            dispatch(
                setFormData({
                    ...formData,
                    [name]: { ...formData[name], treatmentTypeAttachments: [...attachmentData] }
                })
            );
        }
        else {
            let filter =  formData[name].treatmentSubTypes.find((val:any) => val.documentTypeCode === documentGroupCode);
            if(filter && Object.keys(filter).length > 0)
            {
                let subTypeAttachments = [...filter.treatmentSubTypeAttachments];
                if(subTypeAttachments && subTypeAttachments.length > 0)
                {
                    subTypeAttachments.push(uploadedFile);
                }
                else {
                    subTypeAttachments = [uploadedFile];
                }
                filter = {...filter, treatmentSubTypeAttachments: [...subTypeAttachments]};
                let filterData = formData[name].treatmentSubTypes.map((val:any) => {
                    
                    if(val.documentTypeCode === documentGroupCode)
                    {
                        return filter;
                    }
                    else {
                        return {...val};
                    }
                    
                }

                );
              
                dispatch(
                    setFormData({
                        ...formData,
                        [name]: { ...formData[name], treatmentSubTypes: [
                          
                            ...filterData,
                        ]}
                    })
                );
            }
        }
        
        
        
    } catch (e) {
        dispatch(failure(e));
    }
};
export const GetFilePathAction = (data: IGetFilePathRequestData) => async (dispatch: Dispatch<fileActionTypes>) => {
    try {
        dispatch(request());
        let responseData = await service.getFilePath(data);

        
        dispatch(getFilePathSuccess(responseData));
    } catch (e) {
        dispatch(failure(e));
    }
};
/***************************************************************************/

/************************** Actions ************************/

// Request Action
const request = (): RequestType => {
    return {
        type: FILE_REQUEST
    };
};
// Request Action
const downloaded = (): DownloadType => {
    return {
        type: FILE_DOWNLOADED
    };
};

// Failure Action
const failure = (error: IError): FailureType => {
    return {
        type: FILE_FAILURE,
        payload: error
    };
};

export const uploadFileSuccess = (response: IFile): IUploadFileSuccessType => {
    return {
        type: FILE_UPLOAD_SUCCESS,
        payload: response
    };
};

export const uploadFileV2Success = (response: any): IUploadFileV2SuccessType => {
    return {
        type: FILE_UPLOAD_SUCCESS_V2,
        payload: response
    };
};


export const uploadSubTypeFile = (response:any): IUploadSubTypeFileUpload => {
    return {
        type:FILE_SUBTYPE_UPLOAD,
        payload:response
    }
}

export const deleteFileV2Success = (response:any): IDeleteFileV2SuccessType => {
    return {
        type:FILE_DELETE_SUCCESS_V2,
        payload:response
    }
}


// Clear State Action
export const clearReducerState = (): IClearStateType => {
    return {
        type: FILE_CLEAR_STATE
    };
};

export const editFilesSuccess = (files: IFile[]): IEditFilesSuccessType => {
    return {
        type: EDIT_FILES,
        payload: files
    };
};
export const deleteFileSuccess = (fileId: string): IDeleteFileSuccessType => {
    return {
        type: FILE_DELETE_SUCCESS,
        payload: fileId
    };
};
export const getFilePathSuccess = (response: IGetFilePathResponseData): IGetFilePathSuccessType => {
    return {
        type: GET_FILEPATH_SUCCESS,
        payload: response
    };
};

export default {
    clearReducerState
};
