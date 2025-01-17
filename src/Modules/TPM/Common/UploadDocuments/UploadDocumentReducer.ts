import { UploadDocumentsReducerTypes, IDocumentType } from "./UploadDocumentsInterfaces";
import * as ActionTypes from "./UploadDocumentsActionTypes";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { IErrorType } from "Lib/Types/SharedTypes";

//default state type
interface IUploadDocumentState {
    loading: boolean;
    documentTypes: IDocumentType[];
    multipledocumentTypes: any;
    setMessage: IMessage;
    rightsReterived: boolean;
    error: IErrorType;
}

// Default state
const defaultState: IUploadDocumentState = {
    loading: false,
    documentTypes: [],
    multipledocumentTypes: {} as any,
    setMessage: { code: "", description: "" },
    rightsReterived: false,
    error: { description: "", code: "" }
};

const UploadDocumentReducer = (
    state: IUploadDocumentState = defaultState,
    action: UploadDocumentsReducerTypes
): IUploadDocumentState => {
    switch (action.type) {
        // case ActionTypes.GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        // case ActionTypes.GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_FAILURE:
        //     return {
        //         ...state,
        //         loading: false
        //     };

        // case ActionTypes.GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_CLEAR_STATE:
        //     return {
        //         ...defaultState
        //     };
        case ActionTypes.GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    rightsReterived: true,
                    documentTypes: action.payload
            };
        case ActionTypes.GET_DOCUMENT_TYPE_BY_DOC_GROUP_CODE_SUCCESS_V2:
            console.log({state})
            let obj:any = action.payload
            let _multipledocumentTypes = {...state?.multipledocumentTypes, ...obj};
            return {
                    ...state,
                    loading: false,
                    rightsReterived: true,
                    multipledocumentTypes: _multipledocumentTypes
            };
        default:
            return state;
    }
};

export default UploadDocumentReducer;
