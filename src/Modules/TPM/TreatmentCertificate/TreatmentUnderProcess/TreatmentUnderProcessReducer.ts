import { SET_IS_LOADING } from "../InitiateTreatmentRequest/InitiateTreatmentRequestActionTypes";
import { SET_IS_LOADING_TO_FALSE } from "../PendingTreatmentRequestList/PendingTreatmentRequestListActionTypes";
import { GET_CONSIGNMENT_MODES, GET_CONTAINER_TYPE, GET_FETCH_SAVE_DATA, GET_TARGET_TREATMENT, GET_TREATMENT_CONDUCTION, SET_TREATMENT_CERTIFICATE_SAVE_ID } from "./TreatmentUnderProcessActionTypes";

// * default state type
interface IDefaultInfoState {
    loading: boolean;
    targetTreatments: [],
    conductionTypes: [],
    containerTypes: [],
    consignmentModes: [],
    fetchSaveData: {},
    fetchSaveDataId: number
}

// * Default state
const defaultState: IDefaultInfoState = {
    loading: false,
    targetTreatments: [],
    conductionTypes: [],
    containerTypes: [],
    consignmentModes: [],
    fetchSaveData: {},
    fetchSaveDataId: 0

};

// * reducer function
const TreatmentUnderProcessReducer = (state: IDefaultInfoState = defaultState, action: any): IDefaultInfoState => {
    
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_IS_LOADING_TO_FALSE:
            debugger;
            return {
                ...state,
                loading: false
            };

        case GET_TARGET_TREATMENT:
            
            return {
                ...state,
                targetTreatments: action.payload,
                loading: false
            }
        case GET_TREATMENT_CONDUCTION:
            
            return {
                ...state,
                conductionTypes: action.payload,
                loading: false
            }
        case GET_CONTAINER_TYPE:
            
            return {
                ...state,
                containerTypes: action.payload,
                loading: false
            }
        case GET_CONSIGNMENT_MODES:
            
            return {
                ...state,
                consignmentModes: action.payload,
                loading: false
            }

        case SET_TREATMENT_CERTIFICATE_SAVE_ID:
            console.log('SET_TREATMENT_CERTIFICATE_SAVE_ID: ',action.payload);
            
            return {
                ...state,
                fetchSaveDataId: action.payload,
                loading:false
            }

        case GET_FETCH_SAVE_DATA:
            
            return {
                ...state,
                fetchSaveData: action.payload,
                loading: false
            }

        default:
            return state;
    }
};

export default TreatmentUnderProcessReducer;
