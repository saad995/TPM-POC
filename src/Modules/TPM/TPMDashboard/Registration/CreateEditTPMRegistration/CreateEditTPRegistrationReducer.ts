import * as ActionType from "./CreateEditTPMRegistrationActionTypes";
import * as Interfaces from "./CreateEditTPMRegistrationInterfaces";

//default state type
interface ICreatePremiseRegistrationState {
    loading: boolean;
    confirmTreatmentTypes: any;
    saveTreatmentType: any;
}

// Default state
const defaultState: ICreatePremiseRegistrationState = {
    loading: false,
    confirmTreatmentTypes: {},
    saveTreatmentType: {},
};

const CreateEditTPRegistrationReducer = (
    state: ICreatePremiseRegistrationState = defaultState,
    action: Interfaces.ICreateEditTPRegistrationFormReducerTypes
): ICreatePremiseRegistrationState => {
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
        case ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE:
            return {
                ...defaultState
            };
        case ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE:
            return {
                ...defaultState
            };
        default:
            return state;
    }
};

export default CreateEditTPRegistrationReducer;
