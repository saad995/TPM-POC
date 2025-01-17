import { IAttachment } from "Modules/TPM/Common/UploadDocuments/UploadDocumentsInterfaces";
import {
    FILE_FAILURE,
    FILE_REQUEST,
    FILE_DOWNLOAD_SUCCESS,
    FILE_UPLOAD_SUCCESS,
    FILE_DELETE_SUCCESS,
    EDIT_FILES,
    FILE_CLEAR_STATE,
    GET_FILEPATH_SUCCESS,
    FILE_SECURE_DELETE_SUCCESS,
    FILE_DOWNLOADED,
    FILE_UPLOAD_SUCCESS_V2,
    FILE_DELETE_SUCCESS_V2,
    FILE_SUBTYPE_UPLOAD
} from "./FileActionTypes";
import { fileActionTypes, IDocumentType, IFile, IGetFilePathResponseData } from "./FileTypes";

interface IFileState {
    loading: boolean;
    newFiles: IFile[];
    oldFiles: IFile[];
    deletedFiles: IFile[];
    filePath: IGetFilePathResponseData;
    multipleFilesUploaded: any
}

// Default state
const defaultState: IFileState = {
    loading: false,
    newFiles: [],
    oldFiles: [],
    deletedFiles: [],
    filePath: { fileId: 0, fileName: "", filepath: "" },
    multipleFilesUploaded: {} as any
};

const fileReducer = (state: IFileState = defaultState, action: fileActionTypes): IFileState => {
    switch (action.type) {
        case FILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FILE_DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                newFiles: [...state.newFiles, action.payload],
                loading: false
            };
        case FILE_UPLOAD_SUCCESS_V2:
            let newFilesObj = action.payload
            let newFilesObjkey:any = Object.keys(newFilesObj)[0];
            let _multipleFilesUploaded = {...state.multipleFilesUploaded};

            if(state.multipleFilesUploaded[newFilesObjkey]){
                let updatedNewFilesList = [ ...state.multipleFilesUploaded[newFilesObjkey] , ...newFilesObj[newFilesObjkey]];
                _multipleFilesUploaded = {..._multipleFilesUploaded, ...{[newFilesObjkey]: updatedNewFilesList} }

            }else{
                _multipleFilesUploaded = {..._multipleFilesUploaded, ...{[newFilesObjkey]: [...newFilesObj[newFilesObjkey]]} }
            }

            return {
                ...state,
                loading: false,
                multipleFilesUploaded: _multipleFilesUploaded
            };
        case EDIT_FILES:
            return {
                ...state,
                oldFiles: action.payload,
                newFiles: [],
                deletedFiles: [],
                loading: false
            };
        case FILE_DELETE_SUCCESS:
            return {
                ...state,
                newFiles: state.newFiles.filter((item) => item.fileNestFileIds !== action.payload),
                oldFiles: state.oldFiles.filter((item) => item.fileNestFileIds !== action.payload),
                deletedFiles:
                    state.oldFiles.filter((item) => item.fileNestFileIds === action.payload).length > 0
                        ? [
                              ...state.deletedFiles,
                              state.oldFiles.filter((item) => item.fileNestFileIds === action.payload)[0]
                          ]
                        : state.deletedFiles,
                loading: false
            };

        case FILE_FAILURE:
            return {
                ...state,
                // uploadedFiles: state.uploadedFiles.filter((item: any) => item.fileNestFileId !== action.payload),
                loading: false
            };
        case FILE_DELETE_SUCCESS_V2:
            return {
                ...state,
                loading:false,
                multipleFilesUploaded:action.payload
            }
        case GET_FILEPATH_SUCCESS:
            return {
                ...state,
                filePath: action.payload,
                loading: false
            };

        case FILE_DOWNLOADED:
            return {
                ...state,
                // uploadedFiles: state.uploadedFiles.filter((item: any) => item.fileNestFileId !== action.payload),
                loading: false
            };
        case FILE_CLEAR_STATE:
            return {
                loading: false,
                newFiles: [],
                oldFiles: [],
                deletedFiles: [],
                filePath: { fileId: 0, fileName: "", filepath: "" },
                multipleFilesUploaded: {}
            };
        case FILE_SUBTYPE_UPLOAD: 
           
            return {
                ...state,
                multipleFilesUploaded:action.payload
            }
        default:
            return state;
    }
};

export default fileReducer;
