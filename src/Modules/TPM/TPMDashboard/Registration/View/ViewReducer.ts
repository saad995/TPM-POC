import {
    CatchCertificateViewActionTypes,
    IViewResponseData,
    IChangeCatchCertificateStatusResponseData,
    IViewSDResponseData,
    IViewSDData
} from "./ViewInterfaces";
import {
    CATCH_CERTIFICATE_VIEW_FAILURE,
    CATCH_CERTIFICATE_VIEW_REQUEST,
    CATCH_CERTIFICATE_VIEW_STOP_LOADER,
    CATCH_CERTIFICATE_VIEW_SUCCESS,
    INDEPENDENT_CATCH_CERTIFICATE_VIEW_SUCCESS,
    CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS,
    CATCH_CERTIFICATE_SD_VIEW_SUCCESS
} from "./ViewActionTypes";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import { IErrorType } from "Lib/Types/SharedTypes";

//default state type
interface ICatchCertificateViewState {
    loading: boolean;
    viewCatchCertificate: IViewResponseData;
    viewCatchCertificateSD: IViewSDData;
    changeStatus: IChangeCatchCertificateStatusResponseData;
    rightsReterived: boolean;
    error: IErrorType;
}

//default state
const defaultState: ICatchCertificateViewState = {
    loading: false,
    viewCatchCertificate: {
        catchCertificateId: 0,
        certificateNumber: "",
        catchCertificateStatusID:0,
        agentSubscriptionId: 0,
        traderSubscriptionId: 0,
        ecNumber:"",
        vessels: []
    },
    viewCatchCertificateSD:{
        sdID: "",
        items: []
    },
    changeStatus: { code: 0, description: "" },
    rightsReterived: false,
    error: {
        description: "",
        code: ""
    }
};

//Reducer
const CatchCertificateViewReducer = (
    state: ICatchCertificateViewState = defaultState,
    action: CatchCertificateViewActionTypes
): ICatchCertificateViewState => {
    switch (action.type) {
        case CATCH_CERTIFICATE_VIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CATCH_CERTIFICATE_VIEW_FAILURE:
            return {
                ...state,
                loading: false
            };
        case CATCH_CERTIFICATE_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                viewCatchCertificate: action.payload
            };

            case CATCH_CERTIFICATE_SD_VIEW_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    viewCatchCertificateSD: action.payload
                };

        case CATCH_CERTIFICATE_VIEW_STOP_LOADER:
            return {
                ...state,
                loading: false
            };
        case CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                changeStatus: action.payload ?? defaultState.changeStatus
            };
        case GET_USER_RIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                rightsReterived: false,
                error: action.payload ?? defaultState.error
            };
        default:
            return state;
    }
};

export default CatchCertificateViewReducer;
