import { SET_IS_LOADING } from "../InitiateTreatmentRequest/InitiateTreatmentRequestActionTypes";
import { EXPORT_TP_ASSIGN, GET_TREATMENT_REQUEST_DATA, POST_UPDATE_CONTAINER_NUMBER, REJECT_TREATMENT_REQUEST, RE_ASSIGN_TREATMENT_PROVIDER, SET_IS_LOADING_TO_FALSE, SET_IS_RESCIND_VALUE, SET_REASSIGN_LOADER, SUBMIT_TREATMENT_CERTIFICATE, UPDATE_SINGLE_ISSUE_TREATMENT_REQUEST_DATA } from "./PendingTreatmentRequestListActionTypes";

// * default state type
interface IDefaultInfoState {
    loading: boolean;
    singleTreatmentRequestsData: any[];
    reassignResponse: {},
    rejectResponse: {},
    subTreatmentResponse: {},
    isRescind: false,
    tpAssignedResponse:{},
    saveContainerResponse:{},
    isReassignLoader:boolean
}

// * Default state
const defaultState: IDefaultInfoState = {
    loading: false,
    singleTreatmentRequestsData: [],
    reassignResponse: {},
    rejectResponse: {},
    subTreatmentResponse: {},
    isRescind: false,
    tpAssignedResponse:{},
    saveContainerResponse:{},
    isReassignLoader: false
};

// * reducer function
const PendingTreatmentRequestListReducer = (state: IDefaultInfoState = defaultState, action: any): IDefaultInfoState => {
    
    switch (action.type) {
        case SET_IS_LOADING:
            console.log('SET_IS_LOADING: payload received', action.payload);
            return {
                ...state,
                loading: true
            };
        
        case SET_REASSIGN_LOADER:
            console.log('SET_REASSIGN_LOADER: payload received', action.payload);
            return {
                ...state,
                isReassignLoader: action?.payload
            };
        
        case SET_IS_LOADING_TO_FALSE:
            console.log('SET_IS_LOADING_TO_FALSE: payload received', action.payload);
            
            return {
                ...state,
                loading: false
            };
       
        case SET_IS_RESCIND_VALUE:
            console.log('SET_IS_RESCIND_TO_FALSE: payload received', action.payload);
            debugger;
            return {
                ...state,
                isRescind: action.payload
            };

        case GET_TREATMENT_REQUEST_DATA:
            
            return {
                ...state,
                singleTreatmentRequestsData: action.payload,
                loading: false
            };
        
        case POST_UPDATE_CONTAINER_NUMBER:
            console.log("POST_UPDATE_CONTAINER_NUMBER: ",action.payload);
            return {
                ...state,
                saveContainerResponse: action.payload,
                loading: false
            };

        case UPDATE_SINGLE_ISSUE_TREATMENT_REQUEST_DATA:
            console.log('UPDATE_SINGLE_ISSUE_TREATMENT_REQUEST_DATA: payload received', action.payload);
            const getUpdatedsingleTreatmentRequestsData = JSON.parse(JSON.stringify(state.singleTreatmentRequestsData));
            getUpdatedsingleTreatmentRequestsData.treatmentRequestStatusID = 7;
            console.log('getUpdatedsingleTreatmentRequestsData: ', getUpdatedsingleTreatmentRequestsData);
            
            return {
                ...state,
                singleTreatmentRequestsData: getUpdatedsingleTreatmentRequestsData,
                loading: false
            }

        case RE_ASSIGN_TREATMENT_PROVIDER:
            
            return {
                ...state,
                reassignResponse: action.payload,
                loading: false
            };
            
        case EXPORT_TP_ASSIGN:
            console.log('EXPORT_TP_ASSIGN: payload received', action.payload);
            return {
                ...state,
                tpAssignedResponse: action.payload,
                loading: false
            };

        case REJECT_TREATMENT_REQUEST:
            
            return {
                ...state,
                rejectResponse: action.payload,
                loading: false
            };

            case SUBMIT_TREATMENT_CERTIFICATE:
            return {
                ...state,
                subTreatmentResponse: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default PendingTreatmentRequestListReducer;
