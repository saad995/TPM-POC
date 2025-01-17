import * as ActionType from "./RenewalTreatmentTypeActionTypes";
import * as Interfaces from "./RenewalTreatmentTypeInterfaces";

//default state type
interface IRenewalTreatmentType {
    loading: boolean;
    confirmTreatmentTypes: any;
    saveTreatmentType: any;
    addTreatmentTypeLicenseGridData: any[];
    submitRenewalTreatmentTypeData:any[];
}

// Default state
const defaultState: IRenewalTreatmentType = {
    loading: false,
    confirmTreatmentTypes: {},
    saveTreatmentType: {},
    addTreatmentTypeLicenseGridData: [],
    submitRenewalTreatmentTypeData:[],
};

const RenewalTreatmentTypeReducer = (
    state: IRenewalTreatmentType = defaultState,
    action: Interfaces.ICreateEditTPRegistrationFormReducerTypes
): IRenewalTreatmentType => {
    switch (action.type) {
        case ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_FAILURE:
            return {
                ...state,
                loading: true
            };
        case ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_FAILURE:
            return {
                ...state,
                loading: false
            };
        case ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmTreatmentTypes: action.payload
            };
        case ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_FAILURE:
            return {
                ...state,
                loading: true
            };
        case ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_FAILURE:
            return {
                ...state,
                loading: false,
                saveTreatmentType: {}
            };
        case ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_SUCCESS:
            return {
                ...state,
                loading: false,
                saveTreatmentType: action.payload
            };
            
        case ActionType.SAVE_TREATMENT_LICENSE_GRID_DATA:
            let list = [...state?.addTreatmentTypeLicenseGridData,...action.payload].map((item:any, index:any)=> ({...item, sno: index+1}))
            return {
                ...state,
                loading: false,
                addTreatmentTypeLicenseGridData: list
            };
            
        case ActionType.DELETE_TREATMENT_LICENSE_GRID_DATA:{
            let updatedList = state?.addTreatmentTypeLicenseGridData.filter((item:any) => item?.sno !== action.payload?.sno);
            return {
                ...state,
                loading: false,
                addTreatmentTypeLicenseGridData: updatedList
            };}
        case ActionType.SAVE_TREATMENT_LICENSE_GRID_DATA_CLEAR:
            return {
                ...state,
                loading: false,
                addTreatmentTypeLicenseGridData: []
            };
        case ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE:
            return {
                ...defaultState
            };
        case ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE:
            return {
                ...defaultState
            };
        case ActionType.SUBMIT_RENEWAL_TREATMENT_TYPE_DATA:
            return {
                ...state,
                loading: false,
                submitRenewalTreatmentTypeData: action.payload
            };
        default:
            return state;
    }
};

export default RenewalTreatmentTypeReducer;
