import * as ActionType from "Elements/Basic/File/FileActionTypes";
import { IError } from "Lib/Types/SharedTypes";

export interface IFileDownloadRequest {
    id: string;
    fileName: string;
}
export interface IFile {
    attachmentId?: number;
    documentExtension: string;
    file?: File | undefined;
    documentName: string;
    documentSize: number;
    fileNestFileId: number;
    fileNestFileIds: string;
    docTypeCode: string;
    docTypeName: string;
    documentDescription?: string;
    altCode?: string;
    documentGroupCode?: string;
}
export interface IGetFilePathRequestData {
    fileId: number;
}
export interface IGetFilePathResponseData {
    fileId: number;
    fileName: string;
    filepath: string;
}
export interface IFileDetails {
    fileId: number;
    fileName: string;
    identification: string;
}

export interface RequestType {
    type: typeof ActionType.FILE_REQUEST;
}
export interface DownloadType {
    type: typeof ActionType.FILE_DOWNLOADED;
}

export interface FailureType {
    type: typeof ActionType.FILE_FAILURE;
    payload: IError;
}
export interface IDownloadFileSuccessType {
    type: typeof ActionType.FILE_DOWNLOAD_SUCCESS;
    payload: any;
}

export interface IUploadFileSuccessType {
    type: typeof ActionType.FILE_UPLOAD_SUCCESS;
    payload: IFile;
}

export interface IUploadFileV2SuccessType {
    type: typeof ActionType.FILE_UPLOAD_SUCCESS_V2;
    payload: any;
}

export interface IUploadSubTypeFileUpload {
    type:typeof ActionType.FILE_SUBTYPE_UPLOAD;
    payload:any;
}


export interface IDeleteFileV2SuccessType {
    type:typeof ActionType.FILE_DELETE_SUCCESS_V2;
    payload:any;
}

export interface IDeleteFileSuccessType {
    type: typeof ActionType.FILE_DELETE_SUCCESS;
    payload: string;
}
export interface IEditFilesSuccessType {
    type: typeof ActionType.EDIT_FILES;
    payload: IFile[];
}

export interface IEditFilesSuccessType {
    type: typeof ActionType.EDIT_FILES;
    payload: IFile[];
}
export interface IClearStateType {
    type: typeof ActionType.FILE_CLEAR_STATE;
}

export interface IDocumentType {
    code: string;
    name: string;
}

export interface IProps {
    roleCode?: string;
    onSave?: any;
    onSubmit?: any;
}

export interface IGetFilePathSuccessType {
    type: typeof ActionType.GET_FILEPATH_SUCCESS;
    payload: IGetFilePathResponseData;
}
export type fileActionTypes =
    | RequestType
    | FailureType
    | DownloadType
    | IDownloadFileSuccessType
    | IUploadFileSuccessType
    | IDeleteFileSuccessType
    | IEditFilesSuccessType
    | IGetFilePathSuccessType
    | IClearStateType
    | IUploadFileV2SuccessType 
    | IDeleteFileV2SuccessType
    | IUploadSubTypeFileUpload
    ;
